import React from "react";
import "./ProblemFilters.css";

const ProblemFilters = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <div className="problem-filters">
      <div className="problem-search">
        <span className="problem-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="problem-filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "easy" ? "active" : ""}`}
          onClick={() => setFilter("easy")}
        >
          Easy
        </button>
        <button
          className={`filter-btn ${filter === "medium" ? "active" : ""}`}
          onClick={() => setFilter("medium")}
        >
          Medium
        </button>
        <button
          className={`filter-btn ${filter === "hard" ? "active" : ""}`}
          onClick={() => setFilter("hard")}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default ProblemFilters;
