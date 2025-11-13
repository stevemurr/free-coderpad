import { promises as fs } from 'fs';
import { basename, dirname } from 'path';
import tarStream from 'tar-stream';

class LanguageExecutor {
  constructor(containerPoolManager, languageConfigs) {
    this.poolManager = containerPoolManager;
    this.languageConfigs = languageConfigs;
  }

  /**
   * Execute code in a containerized environment
   */
  async executeCode(code, language) {
    const config = this.languageConfigs[language];

    if (!config) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!config.enabled) {
      throw new Error(`Language ${language} is not enabled`);
    }

    let container = null;
    const tempFileName = `code_${Date.now()}_${this.generateShortId()}${config.fileExtension}`;
    const containerPath = `/tmp/${tempFileName}`;

    try {
      // Get a container from the pool
      container = await this.poolManager.getContainer(language);

      // Write code to container
      await this.writeCodeToContainer(container, containerPath, code);

      // Execute the code
      const result = await this.executeInContainer(
        container,
        config.executor,
        containerPath,
        config.timeout
      );

      return result;

    } catch (error) {
      console.error(`[LanguageExecutor] Execution failed for ${language}:`, error.message);
      throw error;

    } finally {
      // Always release the container back to the pool
      if (container) {
        try {
          // Clean up temp file in container
          await this.cleanupFile(container, containerPath);
          await this.poolManager.releaseContainer(language, container);
        } catch (cleanupError) {
          console.warn(`[LanguageExecutor] Cleanup failed:`, cleanupError.message);
        }
      }
    }
  }

  /**
   * Write code to a file inside the container
   */
  async writeCodeToContainer(container, filePath, code) {
    try {
      // Create a tar archive with the code file
      const pack = tarStream.pack();

      // Add the code file to the archive
      pack.entry({ name: basename(filePath) }, code, (err) => {
        if (err) throw err;
        pack.finalize();
      });

      // Put the archive into the container
      await container.putArchive(pack, { path: dirname(filePath) });

    } catch (error) {
      throw new Error(`Failed to write code to container: ${error.message}`);
    }
  }

  /**
   * Execute code inside the container
   */
  async executeInContainer(container, executor, filePath, timeout) {
    return new Promise(async (resolve, reject) => {
      let timedOut = false;
      let timeoutHandle;

      try {
        // Create exec instance
        const exec = await container.exec({
          Cmd: ['/bin/sh', '-c', `${executor} ${filePath}`],
          AttachStdout: true,
          AttachStderr: true,
        });

        // Start execution
        const stream = await exec.start({
          hijack: true,
          stdin: false,
        });

        let stdout = '';
        let stderr = '';

        // Set timeout
        timeoutHandle = setTimeout(async () => {
          timedOut = true;
          stream.destroy();
          reject(new Error(`Execution timeout after ${timeout}ms`));
        }, timeout);

        // Demultiplex docker stream (stdout/stderr)
        container.modem.demuxStream(stream,
          // stdout
          {
            write: (chunk) => {
              stdout += chunk.toString('utf8');
            }
          },
          // stderr
          {
            write: (chunk) => {
              stderr += chunk.toString('utf8');
            }
          }
        );

        // Wait for stream to end
        stream.on('end', async () => {
          if (timedOut) return; // Already handled by timeout

          clearTimeout(timeoutHandle);

          try {
            // Get exit code
            const inspectData = await exec.inspect();
            const exitCode = inspectData.ExitCode;

            resolve({
              output: stdout,
              error: stderr,
              exitCode: exitCode,
              timedOut: false
            });

          } catch (error) {
            reject(new Error(`Failed to get execution result: ${error.message}`));
          }
        });

        stream.on('error', (error) => {
          if (timedOut) return;
          clearTimeout(timeoutHandle);
          reject(new Error(`Stream error: ${error.message}`));
        });

      } catch (error) {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        reject(new Error(`Failed to execute code: ${error.message}`));
      }
    });
  }

  /**
   * Clean up temporary file in container
   */
  async cleanupFile(container, filePath) {
    try {
      const exec = await container.exec({
        Cmd: ['rm', '-f', filePath],
        AttachStdout: false,
        AttachStderr: false,
      });

      await exec.start({ Detach: true });
    } catch (error) {
      // Ignore cleanup errors
      console.warn(`[LanguageExecutor] Failed to cleanup file ${filePath}:`, error.message);
    }
  }

  /**
   * Generate a short random ID
   */
  generateShortId() {
    return Math.random().toString(36).substring(2, 8);
  }

  /**
   * Get available languages
   */
  getAvailableLanguages() {
    const languages = [];

    for (const [key, config] of Object.entries(this.languageConfigs)) {
      if (config.enabled) {
        languages.push({
          id: key,
          name: config.name,
          fileExtension: config.fileExtension
        });
      }
    }

    return languages;
  }
}

export { LanguageExecutor };
