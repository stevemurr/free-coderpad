import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <div className="problem-description-container">
      <div className="problem-modal-header">
        <div className="problem-title-row">
          <h3>{problem.title}</h3>
          <span
            className={`problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>
      <div className="problem-modal-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {problem.description}
        </ReactMarkdown>
      </div>
      <div className="problem-modal-footer">
        <div className="problem-tags">
          {problem.tags &&
            problem.tags.map((tag, index) => (
              <span key={index} className="problem-tag">
                {tag}
              </span>
            ))}
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
    </div>
  );
};

export default ProblemDescription;
