// server.js - Express server for Python code execution
const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Temporary directory for code files
const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

// Execute Python code endpoint
app.post("/api/execute", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Create a unique filename
  const timestamp = Date.now();
  const filename = `python_${timestamp}.py`;
  const filepath = path.join(TEMP_DIR, filename);

  try {
    // Write code to temporary file
    fs.writeFileSync(filepath, code);

    // Set timeout to prevent infinite loops
    const timeoutMs = 5000;

    // Execute Python code (with timeout)
    exec(
      `python3 ${filepath}`,
      { timeout: timeoutMs },
      (error, stdout, stderr) => {
        // Clean up temp file
        fs.unlinkSync(filepath);

        if (error) {
          // Determine if it's a timeout error
          if (error.killed && error.signal === "SIGTERM") {
            return res.status(400).json({
              error:
                "Execution timed out. Check for infinite loops or long-running processes.",
            });
          }

          // Handle syntax or runtime errors
          return res.status(400).json({
            error:
              stderr || error.message || "An error occurred during execution",
          });
        }

        // Log execution result with timestamp and code excerpt
        const excerpt = code.length > 50 ? code.substring(0, 50) + "..." : code;
        console.log(
          `[${new Date().toISOString()}] Execution completed for: ${excerpt}`,
        );
        console.log(`Output (${stdout.length} bytes):\n${stdout.trim()}`);

        // Return successful output
        res.json({
          output: stdout,
          error: stderr,
        });
      },
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// For handling Docker execution (alternative approach)
app.post("/api/execute-docker", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Create a unique filename
  const timestamp = Date.now();
  const filename = `python_${timestamp}.py`;
  const filepath = path.join(TEMP_DIR, filename);

  try {
    // Write code to temporary file
    fs.writeFileSync(filepath, code);

    // Execute in Docker for better isolation
    exec(
      `docker run --rm -v ${filepath}:/code.py python:3.9-alpine python /code.py`,
      { timeout: 10000 }, // 10 second timeout
      (error, stdout, stderr) => {
        // Clean up temp file
        fs.unlinkSync(filepath);

        if (error) {
          return res.status(400).json({
            error:
              stderr || error.message || "An error occurred during execution",
          });
        }

        res.json({
          output: stdout,
          error: stderr,
        });
      },
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start the server
app.listen(port, () => {
  console.log(`Python execution server running at http://localhost:${port}`);
});
