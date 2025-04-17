import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { EditorProvider } from "./contexts/EditorContext";
import Header from "./components/Header";
import Timer from "./components/common/Timer/Timer";
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
      <Header toggleProblemLibrary={toggleProblemLibrary} />

      <Timer />

      <div className="editor-output-container">
        <div className="editor-section">
          <EditorToolbar isLoading={isLoading} runCode={handleRunCode} />
          <CodeEditor />
        </div>

        <OutputDisplay output={output} isLoading={isLoading} />
      </div>
      <br />
      {selectedProblem && <SelectedProblemPanel problem={selectedProblem} />}
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
      <EditorProvider>
        <EditorWorkspace />
      </EditorProvider>
    </ThemeProvider>
  );
};

export default App;
