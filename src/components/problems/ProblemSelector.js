import React, { useState, useEffect } from "react";
import ProblemFilters from "./ProblemFilters";
import ProblemList from "./ProblemList";
import ProblemDescription from "./ProblemDescription";
import { filterProblems } from "../../services/problemService";
import "./ProblemSelector.css";

const ProblemSelector = ({ onSelectProblem }) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Filter problems based on search term and difficulty
    const filteredProblems = filterProblems(searchTerm, filter);
    setProblems(filteredProblems);
  }, [searchTerm, filter]);

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
  };

  const handleSelectProblem = (problem) => {
    onSelectProblem(problem);
  };

  return (
    <div className="problem-selector-container">
      <div className="problem-sidebar">
        <div className="problem-sidebar-top">
          <ProblemFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <ProblemList
          problems={problems}
          selectedProblem={selectedProblem}
          onSelectProblem={handleProblemClick}
        />
      </div>
      <div className="problem-details">
        <ProblemDescription
          problem={selectedProblem}
          onSelectProblem={handleSelectProblem}
        />
      </div>
    </div>
  );
};

export default ProblemSelector;
