import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../common/Button/Button";
import "./SelectedProblemPanel.css";

const SelectedProblemPanel = ({ problem, onBrowseProblems }) => {
  if (!problem) return null;

  return (
    <div className="selected-problem-panel">
      <div className="problem-panel-header">
        <div className="problem-title-row">
          <h3>{problem.title}</h3>
          <span
            className={`problem-difficulty difficulty-${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <Button onClick={onBrowseProblems} className="browse-problems-header-btn">
          Browse Problems
        </Button>
      </div>
      <div className="problem-description-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {problem.description}
        </ReactMarkdown>
      </div>
      {problem.company && problem.company.length > 0 && problem.company[0] !== "" && (
        <div className="problem-companies-section">
          <div className="section-label">Companies:</div>
          <div className="problem-companies-list">
            {problem.company.map((comp, index) => (
              <span key={index} className={`problem-company company-${comp.toLowerCase()}`}>
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
      {problem.tags && problem.tags.length > 0 && (
        <div className="problem-tags-section">
          <div className="section-label">Topics:</div>
          <div className="problem-tags">
            {problem.tags.map((tag, index) => (
              <span key={index} className="problem-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedProblemPanel;
