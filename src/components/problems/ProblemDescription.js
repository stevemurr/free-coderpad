import React from "react";
import Button from "../common/Button/Button";
import "./ProblemDescription.css";

const ProblemDescription = ({ problem, onSelectProblem }) => {
  if (!problem) {
    return (
      <div className="problem-description-empty">
        <p>Select a problem from the list to view details</p>
      </div>
    );
  }

  return (
    <div className="problem-description-content">
      <div className="problem-header">
        <h3>{problem.title}</h3>
        <span
          className={`problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`}
        >
          {problem.difficulty}
        </span>
      </div>
      <div className="problem-tags">
        {problem.tags &&
          problem.tags.map((tag, index) => (
            <span key={index} className="problem-tag">
              {tag}
            </span>
          ))}
      </div>
      <div className="problem-body">
        <pre>{problem.description}</pre>
      </div>
      <div className="problem-actions">
        <Button
          onClick={() => onSelectProblem(problem)}
          className="problem-select-btn"
        >
          Select Problem
        </Button>
      </div>
    </div>
  );
};

export default ProblemDescription;
