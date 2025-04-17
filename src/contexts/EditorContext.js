import React, { createContext, useState, useContext } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [code, setCode] = useState(
    '# Write your Python code here\nprint("Hello, World!")\n\n# Try using some Python features\ndef greet(name):\n    return f"Hello, {name}!"\n\nfor i in range(3):\n    print(greet(f"user {i+1}"))',
  );
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [editorHeight, setEditorHeight] = useState(500);

  return (
    <EditorContext.Provider
      value={{
        code,
        setCode,
        selectedProblem,
        setSelectedProblem,
        editorHeight,
        setEditorHeight,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
