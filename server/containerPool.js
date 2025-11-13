import Docker from 'dockerode';
const docker = new Docker();

class ContainerPool {
  constructor(language, config) {
    this.language = language;
    this.config = config;
    this.availableContainers = [];
    this.busyContainers = new Map(); // container -> execution count
    this.isWarming = false;
  }

  /**
   * Initialize the container pool by warming it up
   */
  async warmPool() {
    if (this.isWarming) {
      return;
    }

    this.isWarming = true;
    console.log(`[ContainerPool] Warming up pool for ${this.language}...`);

    try {
      // Pull the Docker image if not already available
      await this.pullImage();

      // Create initial pool of containers
      const createPromises = [];
      for (let i = 0; i < this.config.poolSize; i++) {
        createPromises.push(this.createContainer());
      }

      await Promise.all(createPromises);
      console.log(`[ContainerPool] ${this.language} pool ready with ${this.availableContainers.length} containers`);
    } catch (error) {
      console.error(`[ContainerPool] Failed to warm pool for ${this.language}:`, error.message);
    } finally {
      this.isWarming = false;
    }
  }

  /**
   * Pull Docker image if not already available
   */
  async pullImage() {
    try {
      const images = await docker.listImages({
        filters: { reference: [this.config.dockerImage] }
      });

      if (images.length === 0) {
        console.log(`[ContainerPool] Pulling image ${this.config.dockerImage}...`);
        await new Promise((resolve, reject) => {
          docker.pull(this.config.dockerImage, (err, stream) => {
            if (err) return reject(err);

            docker.modem.followProgress(stream, (err, output) => {
              if (err) return reject(err);
              resolve(output);
            });
          });
        });
        console.log(`[ContainerPool] Image ${this.config.dockerImage} pulled successfully`);
      }
    } catch (error) {
      console.error(`[ContainerPool] Error pulling image:`, error.message);
      throw error;
    }
  }

  /**
   * Create a new container and add it to the pool
   */
  async createContainer() {
    try {
      const container = await docker.createContainer({
        Image: this.config.dockerImage,
        Tty: false,
        OpenStdin: false,
        HostConfig: {
          Memory: this.parseMemory(this.config.resourceLimits.memory),
          NanoCpus: this.parseCpu(this.config.resourceLimits.cpus),
          NetworkMode: 'none', // Disable network for security
          AutoRemove: false, // We'll manage removal manually
        },
        // Keep container running for reuse
        Cmd: ['tail', '-f', '/dev/null']
      });

      await container.start();
      this.availableContainers.push(container);
      console.log(`[ContainerPool] Created container ${container.id.substring(0, 12)} for ${this.language}`);

      return container;
    } catch (error) {
      console.error(`[ContainerPool] Failed to create container:`, error.message);
      throw error;
    }
  }

  /**
   * Get a container from the pool (or create one if needed)
   */
  async getContainer() {
    // Try to get an available container
    let container = this.availableContainers.pop();

    // If no containers available, create a new one
    if (!container) {
      console.log(`[ContainerPool] No available containers for ${this.language}, creating new one...`);
      container = await this.createContainer();
    }

    // Track execution count
    const execCount = this.busyContainers.get(container) || 0;
    this.busyContainers.set(container, execCount + 1);

    return container;
  }

  /**
   * Release a container back to the pool
   */
  async releaseContainer(container) {
    const execCount = this.busyContainers.get(container) || 0;
    this.busyContainers.delete(container);

    // Check if container has exceeded max executions
    if (execCount >= this.config.maxExecutions) {
      console.log(`[ContainerPool] Container ${container.id.substring(0, 12)} reached max executions, recycling...`);
      await this.recycleContainer(container);
      // Create a replacement container
      if (this.availableContainers.length + this.busyContainers.size < this.config.poolSize) {
        this.createContainer().catch(err => {
          console.error(`[ContainerPool] Failed to create replacement container:`, err.message);
        });
      }
    } else {
      // Return to available pool
      this.availableContainers.push(container);
    }
  }

  /**
   * Recycle (stop and remove) a container
   */
  async recycleContainer(container) {
    try {
      await container.stop({ t: 1 }); // 1 second timeout
      await container.remove();
      console.log(`[ContainerPool] Recycled container ${container.id.substring(0, 12)}`);
    } catch (error) {
      // Container might already be stopped/removed, ignore errors
      console.warn(`[ContainerPool] Error recycling container:`, error.message);
    }
  }

  /**
   * Cleanup all containers in the pool
   */
  async cleanup() {
    console.log(`[ContainerPool] Cleaning up ${this.language} pool...`);

    const allContainers = [
      ...this.availableContainers,
      ...Array.from(this.busyContainers.keys())
    ];

    const cleanupPromises = allContainers.map(container => this.recycleContainer(container));
    await Promise.allSettled(cleanupPromises);

    this.availableContainers = [];
    this.busyContainers.clear();

    console.log(`[ContainerPool] ${this.language} pool cleaned up`);
  }

  /**
   * Parse memory string to bytes
   */
  parseMemory(memStr) {
    const units = { k: 1024, m: 1024 ** 2, g: 1024 ** 3 };
    const match = memStr.toLowerCase().match(/^(\d+)([kmg]?)$/);
    if (!match) throw new Error(`Invalid memory format: ${memStr}`);

    const [, value, unit] = match;
    return parseInt(value) * (units[unit] || 1);
  }

  /**
   * Parse CPU string to nano CPUs
   */
  parseCpu(cpuStr) {
    const cpuFloat = parseFloat(cpuStr);
    return Math.floor(cpuFloat * 1e9); // Convert to nano CPUs
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      language: this.language,
      available: this.availableContainers.length,
      busy: this.busyContainers.size,
      total: this.availableContainers.length + this.busyContainers.size
    };
  }
}

/**
 * Manager for all language container pools
 */
class ContainerPoolManager {
  constructor(languageConfigs) {
    this.pools = new Map();
    this.languageConfigs = languageConfigs;
  }

  /**
   * Initialize pools for all enabled languages
   */
  async initialize() {
    console.log('[ContainerPoolManager] Initializing container pools...');

    for (const [language, config] of Object.entries(this.languageConfigs)) {
      if (config.enabled) {
        const pool = new ContainerPool(language, config);
        this.pools.set(language, pool);

        // Warm up the pool asynchronously
        pool.warmPool().catch(err => {
          console.error(`[ContainerPoolManager] Failed to warm pool for ${language}:`, err.message);
        });
      }
    }

    console.log('[ContainerPoolManager] Container pools initialization started');
  }

  /**
   * Get a container for a specific language
   */
  async getContainer(language) {
    const pool = this.pools.get(language);
    if (!pool) {
      throw new Error(`No container pool found for language: ${language}`);
    }

    return await pool.getContainer();
  }

  /**
   * Release a container back to its pool
   */
  async releaseContainer(language, container) {
    const pool = this.pools.get(language);
    if (!pool) {
      console.warn(`[ContainerPoolManager] No pool found for language ${language}, destroying container`);
      await container.stop({ t: 1 });
      await container.remove();
      return;
    }

    await pool.releaseContainer(container);
  }

  /**
   * Get stats for all pools
   */
  getAllStats() {
    const stats = {};
    for (const [language, pool] of this.pools.entries()) {
      stats[language] = pool.getStats();
    }
    return stats;
  }

  /**
   * Cleanup all pools
   */
  async cleanup() {
    console.log('[ContainerPoolManager] Cleaning up all container pools...');

    const cleanupPromises = Array.from(this.pools.values()).map(pool => pool.cleanup());
    await Promise.allSettled(cleanupPromises);

    this.pools.clear();
    console.log('[ContainerPoolManager] All container pools cleaned up');
  }
}

export { ContainerPoolManager };
