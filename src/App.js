import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { EditorProvider } from "./contexts/EditorContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Timer from "./components/common/Timer/Timer";
import ThemeToggle from "./components/common/ThemeToggle/ThemeToggle";
import SelectedProblemPanel from "./components/problems/SelectedProblemPanel";
import EditorToolbar from "./components/editor/EditorToolbar";
import CodeEditor from "./components/editor/CodeEditor";
import OutputDisplay from "./components/editor/OutputDisplay";
import Modal from "./components/common/Modal/Modal";
import ProblemSelector from "./components/problems/ProblemSelector";
import { useCodeExecution } from "./hooks/useCodeExecution";
import { useEditor } from "./contexts/EditorContext";
import "./App.css";

const EditorWorkspace = () => {
  const [showProblemLibrary, setShowProblemLibrary] = useState(false);
  const { code, selectedProblem, setSelectedProblem } = useEditor();
  const { output, isLoading, runCode } = useCodeExecution();

  const toggleProblemLibrary = () => {
    setShowProblemLibrary(!showProblemLibrary);
  };

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setShowProblemLibrary(false);
  };

  const handleRunCode = () => {
    runCode(code);
  };

  return (
    <div className="python-editor-container">
      <ThemeToggle />
      <Timer />

      <div className="main-workspace-container">
        {/* Left Panel - Problem Statement */}
        <div className="left-panel">
          {selectedProblem ? (
            <SelectedProblemPanel
              problem={selectedProblem}
              onBrowseProblems={toggleProblemLibrary}
            />
          ) : (
            <div className="no-problem-placeholder">
              <h3>No Problem Selected</h3>
              <p>Select a problem from the library to get started</p>
              <button onClick={toggleProblemLibrary} className="browse-problems-btn">
                Browse Problems
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Editor + Output */}
        <div className="right-panel">
          <div className="editor-section">
            <EditorToolbar isLoading={isLoading} runCode={handleRunCode} />
            <CodeEditor />
          </div>

          <OutputDisplay output={output} isLoading={isLoading} />
        </div>
      </div>

      <Modal
        isOpen={showProblemLibrary}
        onClose={toggleProblemLibrary}
        title="Problem Library"
        size="large"
      >
        <ProblemSelector onSelectProblem={handleSelectProblem} />
      </Modal>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <EditorProvider>
          <EditorWorkspace />
        </EditorProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
