import React from "react";
import "./ProblemFilters.css";

const ProblemFilters = ({ searchTerm, setSearchTerm, filter, setFilter, companyFilter, setCompanyFilter }) => {
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

      <div className="filter-section">
        <div className="filter-label">Difficulty</div>
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

      <div className="filter-section">
        <div className="filter-label">Company</div>
        <div className="problem-filter-buttons">
          <button
            className={`filter-btn ${companyFilter === "all" ? "active" : ""}`}
            onClick={() => setCompanyFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn company-apple ${companyFilter === "Apple" ? "active" : ""}`}
            onClick={() => setCompanyFilter("Apple")}
          >
            Apple
          </button>
          <button
            className={`filter-btn company-meta ${companyFilter === "Meta" ? "active" : ""}`}
            onClick={() => setCompanyFilter("Meta")}
          >
            Meta
          </button>
          <button
            className={`filter-btn company-microsoft ${companyFilter === "Microsoft" ? "active" : ""}`}
            onClick={() => setCompanyFilter("Microsoft")}
          >
            Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemFilters;
