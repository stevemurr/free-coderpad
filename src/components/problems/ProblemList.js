import React from "react";
import "./ProblemList.css";

const ProblemList = ({ problems, selectedProblem, onSelectProblem }) => {
  return (
    <div className="problem-list-container">
      {problems.length > 0 ? (
        <ul className="problem-list">
          {problems.map((problem) => (
            <li
              key={problem.id}
              className={`problem-item ${selectedProblem && selectedProblem.id === problem.id ? "active" : ""}`}
              onClick={() => onSelectProblem(problem)}
            >
              {problem.title}
              <span
                className={`problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`}
              >
                {problem.difficulty}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-problems-found">
          No problems match your search criteria
        </div>
      )}
    </div>
  );
};

export default ProblemList;
