import React from "react";
import Button from "../common/Button/Button";
import "./EditorToolbar.css";

const EditorToolbar = ({ isLoading, runCode }) => {
  return (
    <div className="editor-top-bar">
      <h2 className="editor-title">Code Editor</h2>
      <Button
        onClick={runCode}
        disabled={isLoading}
        variant="success"
        className="run-button"
      >
        {isLoading ? "Running..." : "Run Code"}
      </Button>
    </div>
  );
};

export default EditorToolbar;
