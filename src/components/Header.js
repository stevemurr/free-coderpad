import React from "react";
import Button from "./common/Button/Button";
import { useTheme } from "../contexts/ThemeContext";
import "./Header.css";

const Header = ({ toggleProblemLibrary }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="editor-header">
      <h2 className="header-title">Python Playground</h2>
      <div className="header-actions">
        <Button onClick={toggleProblemLibrary} className="problem-library-btn">
          Browse Problems
        </Button>
        <Button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
