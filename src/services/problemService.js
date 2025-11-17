import problemIndex from "../data/problems/index.json";

// Cache for loaded problems
const problemCache = new Map();

/**
 * Load a problem from its JSON file
 */
async function loadProblem(file) {
  // Check cache first
  if (problemCache.has(file)) {
    return problemCache.get(file);
  }

  try {
    // Dynamically import the problem file
    const problemModule = await import(`../data/problems/${file}`);
    const problem = problemModule.default;

    // Cache the loaded problem
    problemCache.set(file, problem);

    return problem;
  } catch (error) {
    console.error(`Failed to load problem from ${file}:`, error);
    return null;
  }
}

/**
 * Get all problems (loads them lazily)
 */
export const getAllProblems = async () => {
  const loadPromises = problemIndex.problems.map(async (indexEntry) => {
    const problem = await loadProblem(indexEntry.file);
    return problem;
  });

  const problems = await Promise.all(loadPromises);

  // Filter out any failed loads
  return problems.filter(p => p !== null);
};

/**
 * Get a problem by ID
 */
export const getProblemById = async (id) => {
  const indexEntry = problemIndex.problems.find(p => p.id === id);

  if (!indexEntry) {
    return null;
  }

  return await loadProblem(indexEntry.file);
};

/**
 * Filter problems by search term, difficulty, language, and company
 */
export const filterProblems = async (searchTerm, difficulty, language = null, company = null) => {
  // First filter by index metadata (faster)
  let filteredIndex = problemIndex.problems;

  // Filter by difficulty
  if (difficulty && difficulty !== "all") {
    filteredIndex = filteredIndex.filter(
      (p) => p.difficulty === difficulty
    );
  }

  // Filter by company
  if (company && company !== "all") {
    filteredIndex = filteredIndex.filter((p) => {
      return p.company && p.company.includes(company);
    });
  }

  // Filter by search term using index data
  if (searchTerm && searchTerm !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    filteredIndex = filteredIndex.filter((p) => {
      return (
        p.title.toLowerCase().includes(lowerSearch) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerSearch))) ||
        (p.company && p.company.some(c => c.toLowerCase().includes(lowerSearch)))
      );
    });
  }

  // Load the full problems
  const loadPromises = filteredIndex.map(async (indexEntry) => {
    const problem = await loadProblem(indexEntry.file);
    return problem;
  });

  let problems = await Promise.all(loadPromises);
  problems = problems.filter(p => p !== null);

  // Filter by language support if specified
  if (language) {
    problems = problems.filter(p => p.languages && p.languages[language]);
  }

  // Additional text search on description if needed
  if (searchTerm && searchTerm !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    problems = problems.filter(p => {
      return (
        p.title.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch) ||
        (p.company &&
          p.company.some((c) =>
            c.toLowerCase().includes(lowerSearch)
          ))
      );
    });
  }

  return problems;
};

/**
 * Get problem statistics
 */
export const getProblemStats = () => {
  const stats = {
    total: problemIndex.problems.length,
    byDifficulty: {},
    byLanguage: {}
  };

  // Count by difficulty
  problemIndex.problems.forEach(p => {
    stats.byDifficulty[p.difficulty] = (stats.byDifficulty[p.difficulty] || 0) + 1;
  });

  return stats;
};

/**
 * Get starter code for a problem in a specific language
 */
export const getProblemStarterCode = async (problemId, language) => {
  const problem = await getProblemById(problemId);

  if (!problem) {
    return null;
  }

  if (!problem.languages || !problem.languages[language]) {
    return null;
  }

  return problem.languages[language].starterCode;
};

/**
 * Check if a problem supports a specific language
 */
export const problemSupportsLanguage = async (problemId, language) => {
  const problem = await getProblemById(problemId);

  if (!problem) {
    return false;
  }

  return !!(problem.languages && problem.languages[language]);
};
