// server.js - Express server for containerized code execution
import express, { json } from "express";
import cors from "cors";
import { ContainerPoolManager } from "./server/containerPool.js";
import { LanguageExecutor } from "./server/languageExecutor.js";

const app = express();
const port = 3001;

// Load language configurations
import languageConfigs from "./server/config/languages.json" with { type: "json" };

// Initialize container pool manager and language executor
let containerPoolManager;
let languageExecutor;

// Enable CORS for frontend requests
app.use(cors());
app.use(json());

// Initialize container pools on startup
async function initializeContainerPools() {
  try {
    console.log("[Server] Initializing container pools...");
    containerPoolManager = new ContainerPoolManager(languageConfigs);
    await containerPoolManager.initialize();

    languageExecutor = new LanguageExecutor(containerPoolManager, languageConfigs);
    console.log("[Server] Container pools initialized successfully");
  } catch (error) {
    console.error("[Server] Failed to initialize container pools:", error.message);
    console.error("[Server] The server will start but code execution may fail");
  }
}

// Execute code endpoint
app.post("/api/execute", async (req, res) => {
  const { code, language = "python" } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  if (!languageExecutor) {
    return res.status(503).json({
      error: "Code execution service is not ready yet. Please try again in a moment."
    });
  }

  try {
    console.log(`[Server] Executing ${language} code...`);

    const result = await languageExecutor.executeCode(code, language);

    // Log execution result
    const excerpt = code.length > 50 ? code.substring(0, 50) + "..." : code;
    console.log(`[${new Date().toISOString()}] Execution completed for: ${excerpt}`);
    console.log(`Output (${result.output.length} bytes)${result.error ? ' with errors' : ''}`);

    // Return result
    res.json({
      output: result.output,
      error: result.error,
      exitCode: result.exitCode,
      timedOut: result.timedOut
    });

  } catch (error) {
    console.error("[Server] Execution error:", error.message);

    // Handle different types of errors
    if (error.message.includes("timeout")) {
      return res.status(408).json({
        error: "Execution timed out. Check for infinite loops or long-running processes.",
        timedOut: true
      });
    }

    if (error.message.includes("Unsupported language") || error.message.includes("not enabled")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({
      error: error.message || "An error occurred during execution"
    });
  }
});

// Get available languages
app.get("/api/languages", (req, res) => {
  if (!languageExecutor) {
    return res.status(503).json({
      error: "Language service is not ready yet"
    });
  }

  try {
    const languages = languageExecutor.getAvailableLanguages();
    res.json({ languages });
  } catch (error) {
    console.error("[Server] Error getting languages:", error.message);
    res.status(500).json({ error: "Failed to get available languages" });
  }
});

// Get container pool statistics (for monitoring)
app.get("/api/pool-stats", (req, res) => {
  if (!containerPoolManager) {
    return res.status(503).json({
      error: "Container pool manager is not ready yet"
    });
  }

  try {
    const stats = containerPoolManager.getAllStats();
    res.json({ stats });
  } catch (error) {
    console.error("[Server] Error getting pool stats:", error.message);
    res.status(500).json({ error: "Failed to get pool statistics" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const health = {
    status: "ok",
    containerPoolsReady: !!containerPoolManager,
    languageExecutorReady: !!languageExecutor,
    timestamp: new Date().toISOString()
  };

  if (containerPoolManager) {
    health.poolStats = containerPoolManager.getAllStats();
  }

  res.json(health);
});

// Graceful shutdown handler
async function gracefulShutdown(signal) {
  console.log(`\n[Server] ${signal} received. Starting graceful shutdown...`);

  if (containerPoolManager) {
    await containerPoolManager.cleanup();
  }

  process.exit(0);
}

// Register shutdown handlers
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Start the server
app.listen(port, async () => {
  console.log(`Code execution server running at http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);

  // Initialize container pools after server starts
  await initializeContainerPools();
});
