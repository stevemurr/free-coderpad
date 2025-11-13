import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <span className="theme-icon">
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
