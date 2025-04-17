import { sampleProblems } from "../data/problemLibrary";

export const getAllProblems = () => {
  return sampleProblems;
};

export const getProblemById = (id) => {
  return sampleProblems.find((problem) => problem.id === id);
};

export const filterProblems = (searchTerm, difficulty) => {
  return sampleProblems.filter((problem) => {
    const matchesTerm = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficulty === "all" || problem.difficulty.toLowerCase() === difficulty;
    return matchesTerm && matchesDifficulty;
  });
};
