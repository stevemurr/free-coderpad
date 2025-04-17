import React from "react";
import "./SelectedProblemPanel.css";

const SelectedProblemPanel = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="selected-problem-panel">
      <div className="problem-header">
        <h3>{problem.title}</h3>
        <span
          className={`problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`}
        >
          {problem.difficulty}
        </span>
      </div>
      <div className="problem-description-content">
        <pre>{problem.description}</pre>
      </div>
      <div className="problem-tags">
        {problem.tags &&
          problem.tags.map((tag, index) => (
            <span key={index} className="problem-tag">
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default SelectedProblemPanel;
