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
