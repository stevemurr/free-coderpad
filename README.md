# Free CoderPad

A browser-based coding interview practice platform with containerized code execution and a pluggable language system.

## Features

- **Containerized Code Execution**: Secure, isolated execution using Docker containers with resource limits
- **Container Pooling**: Production-grade container management for sub-second execution times
- **Language-Agnostic Architecture**: Easily add new programming languages via configuration
- **Rich Problem Library**: 32+ coding problems organized by difficulty (Easy, Medium, Hard)
- **Modern Code Editor**: Powered by CodeMirror 6 with syntax highlighting and theming
- **Problem Management**: JSON-based problem storage for easy creation and editing
- **Built-in Timer**: Practice with time constraints (5, 10, or 15 minutes)
- **Dark/Light Mode**: Comfortable coding in any environment
- **Fully Containerized**: Run the entire stack with `docker-compose up`

## Architecture

### Backend (Node.js + Express)

- **Container Pool Manager** - Maintains pools of warm containers per language for fast execution
- **Language Executor** - Routes code execution through appropriate containerized runtimes
- **Problem Service** - Loads problems from JSON files with lazy loading and caching

### Frontend (React)

- **CodeMirror 6** - Modern code editor with language-specific syntax highlighting
- **Context-Based State** - Theme, Language, and Editor contexts for clean state management
- **Dynamic Language Loading** - CodeMirror extensions loaded based on selected language

### Execution Flow

```
User writes code → Submit → Language Executor
                              ↓
                        Container Pool (Python, Go, etc.)
                              ↓
                        Docker Container (isolated, resource-limited)
                              ↓
                        Execution Result → Output Display
```

## Prerequisites

- **Docker** 20.10+ and Docker Compose
- **Git** (for cloning the repository)

That's it! Everything else runs inside containers.

## Quick Start

### Option 1: Using Docker Compose (Recommended)

**1. Clone the Repository**

```bash
git clone https://github.com/yourusername/free-coderpad.git
cd free-coderpad
```

**2. Start with Docker Compose**

```bash
docker-compose up
```

This will:
1. Build the application container
2. Pull the Python runtime image
3. Start both React (port 3000) and Express (port 3001) servers
4. Initialize container pools
5. Open http://localhost:3000 in your browser

**3. Start Coding!**

- Browse problems from the library
- Select a problem to load starter code
- Write your solution
- Click "Run Code" to execute
- View output and debug

**Stopping the Application**

```bash
docker-compose down
```

### Option 2: Running Locally (Development)

If you prefer to run without Docker for the main app:

**1. Install Dependencies**

```bash
npm install
```

**2. Ensure Docker is Running**

```bash
docker ps  # Should connect successfully
```

**3. Start the Application**

```bash
npm start
```

This starts both the React development server (port 3000) and the Express backend (port 3001).

The application will automatically pull language runtime images as needed.

**Need more details?** See the [Docker Setup Guide](docs/DOCKER_SETUP.md) for architecture details, troubleshooting, and advanced configuration.

## Development

### Project Structure

```
free-coderpad/
├── server.js                          # Express server with container pooling
├── server/
│   ├── config/
│   │   └── languages.json            # Language configurations
│   ├── containerPool.js              # Container pool manager
│   └── languageExecutor.js           # Language execution service
├── src/
│   ├── App.js                         # Main React app
│   ├── components/
│   │   ├── editor/
│   │   │   ├── CodeEditor.js         # CodeMirror integration
│   │   │   ├── EditorToolbar.js      # Run button & controls
│   │   │   └── OutputDisplay.js      # Execution results
│   │   ├── problems/
│   │   │   ├── ProblemSelector.js    # Problem library modal
│   │   │   └── ProblemList.js        # Problem list view
│   │   └── common/
│   │       ├── Timer/Timer.js        # Interview timer
│   │       └── Modal/Modal.js        # Modal component
│   ├── contexts/
│   │   ├── EditorContext.js          # Code & problem state
│   │   ├── LanguageContext.js        # Language selection
│   │   └── ThemeContext.js           # Theme management
│   ├── services/
│   │   ├── problemService.js         # Problem loading & filtering
│   │   └── codeExecutionService.js   # API wrapper
│   ├── hooks/
│   │   ├── useCodeExecution.js       # Execution logic hook
│   │   └── useTimer.js               # Timer management hook
│   └── data/
│       └── problems/
│           ├── schema.json            # Problem JSON schema
│           ├── index.json             # Problem manifest
│           ├── easy/                  # Easy problems
│           ├── medium/                # Medium problems
│           └── hard/                  # Hard problems
├── scripts/
│   ├── migrate-problems.js           # Migration script
│   └── add-problem.js                # Problem creation CLI
├── docs/
│   ├── ADDING_LANGUAGES.md           # Language addition guide
│   ├── ADDING_PROBLEMS.md            # Problem creation guide
│   └── DOCKER_SETUP.md               # Docker architecture guide
├── Dockerfile                        # Container image definition
├── docker-compose.yml                # Docker orchestration
├── .dockerignore                     # Docker build exclusions
└── package.json                      # Dependencies
```

### Available Scripts

**When using Docker Compose:**
- `docker-compose up` - Start all services
- `docker-compose up --build` - Rebuild and start
- `docker-compose down` - Stop and remove containers
- `docker-compose logs -f app` - View application logs

**When running locally:**
- `npm start` - Start both frontend and backend servers
- `npm run server` - Start only the Express backend
- `npm run build` - Build production bundle
- `npm test` - Run tests

### Containerization Details

The application uses a **Docker-in-Docker (DinD)** architecture:

```
Docker Host
└── App Container (Node.js)
    ├── React Dev Server (port 3000)
    ├── Express Server (port 3001)
    └── Docker Socket Mount (/var/run/docker.sock)
        └── Sibling Containers (Language Runtimes)
            ├── Python Container Pool (3x)
            ├── Go Container Pool (3x)
            └── etc.
```

**How it works:**
1. Main app runs inside a Node.js container
2. App container has Docker CLI installed
3. Docker socket is mounted from host (`/var/run/docker.sock`)
4. App spawns **sibling containers** (not child containers) for code execution
5. Language containers run alongside the app container, not inside it

**Benefits:**
- ✅ Fully isolated development environment
- ✅ Consistent across all machines
- ✅ No need to install Node.js locally
- ✅ Hot reload works via volume mounts
- ✅ Production-ready architecture

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/execute` | POST | Execute code in a container |
| `/api/languages` | GET | Get available languages |
| `/api/health` | GET | Server health & pool stats |
| `/api/pool-stats` | GET | Container pool statistics |

## Adding Languages

Python is supported by default. To add more languages:

1. Edit `server/config/languages.json`
2. Install CodeMirror language extension
3. Update frontend language loader
4. Add starter code to problems

See [docs/ADDING_LANGUAGES.md](docs/ADDING_LANGUAGES.md) for detailed instructions.

## Adding Problems

### Using the CLI (Recommended)

```bash
node scripts/add-problem.js
```

### Manual Creation

1. Create JSON file in `src/data/problems/{difficulty}/`
2. Follow the schema in `src/data/problems/schema.json`
3. Update `src/data/problems/index.json`

See [docs/ADDING_PROBLEMS.md](docs/ADDING_PROBLEMS.md) for detailed instructions.

## Container Pooling

The platform uses production-grade container pooling:

- **Warm Containers**: Pools of pre-started containers for each language
- **Fast Execution**: Sub-second response times by reusing containers
- **Resource Limits**: CPU and memory limits prevent resource exhaustion
- **Auto-Recycling**: Containers recycled after N executions to prevent state leaks
- **Graceful Shutdown**: Proper cleanup when server stops

### Monitoring

Check container pool status:

```bash
curl http://localhost:3001/api/pool-stats
```

Example response:
```json
{
  "stats": {
    "python": {
      "language": "python",
      "available": 2,
      "busy": 1,
      "total": 3
    }
  }
}
```

## Configuration

### Language Configuration

Edit `server/config/languages.json`:

```json
{
  "python": {
    "name": "Python 3",
    "dockerImage": "python:3.11-slim",
    "fileExtension": ".py",
    "executor": "python3",
    "enabled": true,
    "poolSize": 3,
    "maxExecutions": 100,
    "timeout": 5000,
    "resourceLimits": {
      "memory": "256m",
      "cpus": "0.5"
    }
  }
}
```

### Resource Limits

Adjust per-language resource limits to prevent abuse:

- **memory**: Container memory limit (e.g., "256m", "512m")
- **cpus**: CPU limit as fraction of cores (e.g., "0.5", "1.0")
- **timeout**: Execution timeout in milliseconds

## Security

- **Network Isolation**: Containers have no network access
- **Resource Limits**: CPU and memory limits per container
- **Execution Timeouts**: Prevent infinite loops
- **Container Recycling**: Fresh state after max executions
- **No Persistent Storage**: Containers don't persist data between runs

## Troubleshooting

### Docker Connection Error

Ensure Docker is running:
```bash
docker ps
```

On macOS/Windows, start Docker Desktop.

### Container Pool Not Starting

Check Docker socket permissions:
```bash
ls -la /var/run/docker.sock
```

View server logs for details:
```bash
# If using Docker Compose
docker-compose logs -f app

# If running locally
npm run server
```

### Slow Execution

Increase pool size in language config:
```json
{
  "poolSize": 5  // Increase from default 3
}
```

### Out of Memory

Increase container memory limit:
```json
{
  "resourceLimits": {
    "memory": "512m"  // Increase from 256m
  }
}
```

## Problem Library

Current library includes 32 problems:

- **10 Easy**: Two Sum, Valid Parentheses, Merge Sorted Lists, etc.
- **18 Medium**: LRU Cache, Clone Graph, Subarray Sum, etc.
- **4 Hard**: Serialize Binary Tree, Merge k Sorted Lists, etc.

Problems tagged by topic: Array, String, Tree, Dynamic Programming, Hash Table, and more.

## Contributing

Contributions welcome! Areas to contribute:

1. **New Problems**: Add more coding problems
2. **Language Support**: Add support for JavaScript, Go, Java, etc.
3. **Features**: Problem difficulty rating, user solutions, hints
4. **UI/UX**: Improve editor experience, add features
5. **Documentation**: Improve guides and examples

## License

MIT License - feel free to use for personal or commercial projects.

## Acknowledgments

- Built with [React](https://react.dev) and [CodeMirror 6](https://codemirror.net)
- Execution powered by [Docker](https://www.docker.com)
- Problems inspired by [LeetCode](https://leetcode.com)

## Support

- Documentation: See `docs/` folder
- Issues: Open an issue on GitHub
- Questions: Check existing issues or start a discussion

---

**Happy Coding!** 🚀
