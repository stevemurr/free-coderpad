import { sampleProblems } from "../data/problemLibrary";

export const getAllProblems = () => {
  return sampleProblems;
};

export const getProblemById = (id) => {
  return sampleProblems.find((problem) => problem.id === id);
};

export const filterProblems = (searchTerm, difficulty) => {
  const problems = sampleProblems;

  return problems.filter((problem) => {
    const searchMatch =
      searchTerm === "" ||
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (problem.company &&
        problem.company.some((c) =>
          c.toLowerCase().includes(searchTerm.toLowerCase()),
        ));

    const difficultyMatch =
      difficulty === "all" || problem.difficulty === difficulty;

    return searchMatch && difficultyMatch;
  });
};
