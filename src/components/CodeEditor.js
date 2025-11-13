import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import React, { useState, useEffect, useRef } from "react";
import ProblemSelector from "./Selector/ProblemSelector";
import OutputDisplay from "./OutputDisplay";
import { useLanguage } from "../contexts/LanguageContext";

// Language extension loader
const getLanguageExtension = (languageId) => {
  switch (languageId) {
    case "python":
      return python();
    // Add more languages here when supported
    default:
      return python(); // Default to Python
  }
};

const CodeEditor = () => {
  const { selectedLanguage, getCurrentLanguage } = useLanguage();

  const [code, setCode] = useState(
    '# Write your Python code here\nprint("Hello, World!")\n\n# Try using some Python features\ndef greet(name):\n    return f"Hello, {name}!"\n\nfor i in range(3):\n    print(greet(f"user {i+1}"))',
  );
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [editorHeight, setEditorHeight] = useState(500);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemLibrary, setShowProblemLibrary] = useState(false);
  // Timer states
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerIntervalRef = useRef(null);

  const editorRef = useRef(null);
  const editorViewRef = useRef(null);
  const resizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const modalRef = useRef(null);

  // Apply the theme class to the container
  const themeClass = theme === "light" ? "light-mode" : "dark-mode";

  useEffect(() => {
    // Apply theme to the body element to ensure full page theming
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";

    return () => {
      // Clean up when component unmounts
      document.body.className = "";
    };
  }, [theme]);

  // Timer functionality
  const startTimer = (minutes) => {
    // Clear any existing timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    const durationInSeconds = minutes * 60;
    setTimerDuration(durationInSeconds);
    setTimeRemaining(durationInSeconds);
    setTimerActive(true);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer complete
          clearInterval(timerIntervalRef.current);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimerActive(false);
    setTimeRemaining(0);
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the editor on component mount
    const setupEditor = () => {
      if (editorRef.current && !editorViewRef.current) {
        // Choose the theme based on current theme state
        const themeExtension =
          theme === "light"
            ? syntaxHighlighting(defaultHighlightStyle)
            : oneDark;

        const editorTheme = EditorView.theme(
          {
            "&": {
              height: `${editorHeight}px`,
              border:
                theme === "light" ? "1px solid #dee2e6" : "1px solid #495057",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: theme === "light" ? "#fff" : "#282c34",
            },
            ".cm-scroller": {
              overflow: "auto",
              fontFamily: "'Fira Code', monospace",
            },
            ".cm-content": {
              caretColor: theme === "light" ? "#000" : "#fff",
              color: theme === "light" ? "#000" : "#fff",
            },
            ".cm-line": {
              padding: "0 8px",
            },
          },
          [],
        );

        const startState = EditorState.create({
          doc: code,
          extensions: [
            lineNumbers(),
            getLanguageExtension(selectedLanguage),
            themeExtension,
            editorTheme,
            keymap.of([indentWithTab, ...defaultKeymap]),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                setCode(update.state.doc.toString());
              }
            }),
          ],
        });

        const view = new EditorView({
          state: startState,
          parent: editorRef.current,
        });

        editorViewRef.current = view;
      }
    };

    setupEditor();

    // Clean up on unmount
    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // When theme or height changes, recreate the editor
    if (editorViewRef.current) {
      // Store the current code
      const currentCode = editorViewRef.current.state.doc.toString();

      // Destroy the current editor instance
      editorViewRef.current.destroy();
      editorViewRef.current = null;

      // Create a new editor with the appropriate theme
      const themeExtension =
        theme === "light" ? syntaxHighlighting(defaultHighlightStyle) : oneDark;

      const editorTheme = EditorView.theme({
        "&": {
          height: `${editorHeight}px`,
          border: theme === "light" ? "1px solid #dee2e6" : "1px solid #495057",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: theme === "light" ? "#fff" : "#282c34",
        },
        ".cm-scroller": {
          overflow: "auto",
          fontFamily: "'Fira Code', monospace",
        },
        ".cm-content": {
          caretColor: theme === "light" ? "#000" : "#fff",
          color: theme === "light" ? "#000" : "#fff",
        },
        ".cm-line": {
          padding: "0 8px",
        },
      });

      // Create new state with the current code and theme
      const newState = EditorState.create({
        doc: currentCode,
        extensions: [
          lineNumbers(),
          getLanguageExtension(selectedLanguage),
          themeExtension,
          editorTheme,
          keymap.of([indentWithTab, ...defaultKeymap]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setCode(update.state.doc.toString());
            }
          }),
        ],
      });

      // Create new view
      if (editorRef.current) {
        editorViewRef.current = new EditorView({
          state: newState,
          parent: editorRef.current,
        });
      }
    }
  }, [theme, editorHeight, selectedLanguage]);

  // Handle problem selection
  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setShowProblemLibrary(false);

    // Update the editor content with the problem starter code
    if (editorViewRef.current) {
      const transaction = editorViewRef.current.state.update({
        changes: {
          from: 0,
          to: editorViewRef.current.state.doc.length,
          insert: problem.code,
        },
      });
      editorViewRef.current.dispatch(transaction);
    } else {
      setCode(problem.code);
    }

    // Clear output when loading a new problem
    setOutput("");
  };

  // Handle resize events
  const handleResizeStart = (e) => {
    resizingRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = editorHeight;

    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);

    // Prevent text selection during resize
    e.preventDefault();
  };

  const handleResizeMove = (e) => {
    if (!resizingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    const newHeight = Math.max(100, startHeightRef.current + deltaY); // Minimum height of 100px

    setEditorHeight(newHeight);
  };

  const handleResizeEnd = () => {
    resizingRef.current = false;
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  // Cleanup resize event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, []);

  const runCode = async () => {
    setIsLoading(true);
    setOutput("Running code...");

    try {
      // Use the backend API
      const response = await fetch("http://localhost:3001/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language: selectedLanguage }),
      });

      const result = await response.json();

      if (result.error) {
        // Preserve error formatting with newlines
        // Display error as stderr (will be styled with the stderr class)
        const formattedError = `<span class="stderr">${result.error}</span>`;
        setOutput(formattedError);
      } else {
        // Preserve all whitespace and newlines in the output
        // Wrap stdout in a span for potential styling
        const formattedOutput = result.output
          ? `<span class="stdout">${result.output}</span>`
          : `<span class="result">Code executed successfully with no output.</span>`;

        setOutput(formattedOutput);
      }
    } catch (error) {
      // Handle network or other client-side errors
      setOutput(
        `<span class="stderr">Error: Failed to connect to the execution service at http://localhost:3001. ${error.message}</span>`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleProblemLibrary = () => {
    setShowProblemLibrary(!showProblemLibrary);

    // When opening the modal, we need to handle keyboard trap
    if (!showProblemLibrary && modalRef.current) {
      setTimeout(() => {
        modalRef.current.focus();
      }, 100);
    }
  };

  // Handle escape key to close modal
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowProblemLibrary(false);
    }
  };

  // Handle modal background click to close
  const handleModalBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowProblemLibrary(false);
    }
  };

  return (
    <div className={`python-editor-container ${themeClass} p-4 min-h-screen`}>
      <div className="editor-header mb-4">
        <h2 className="header-title">Python Playground</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleProblemLibrary}
            className="problem-library-btn"
          >
            Browse Problems
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="timer-container mb-4">
        <div className="timer-controls flex space-x-2">
          {!timerActive ? (
            <>
              <button onClick={() => startTimer(5)} className="timer-btn">
                5 Min Timer
              </button>
              <button onClick={() => startTimer(10)} className="timer-btn">
                10 Min Timer
              </button>
              <button onClick={() => startTimer(15)} className="timer-btn">
                15 Min Timer
              </button>
            </>
          ) : (
            <button onClick={stopTimer} className="timer-stop-btn">
              Stop Timer
            </button>
          )}
        </div>
        {timerActive && (
          <div
            className={`timer-display ${timeRemaining < 60 ? "timer-ending" : ""}`}
          >
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Problem Library Modal */}
      <div
        className={`modal-overlay ${showProblemLibrary ? "open" : ""}`}
        onClick={handleModalBackgroundClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        ref={modalRef}
        aria-modal="true"
        aria-labelledby="problem-library-title"
        role="dialog"
      >
        <div className="problem-library-modal">
          <div className="modal-header">
            <h3 id="problem-library-title" className="modal-title">
              Problem Library
            </h3>
            <button
              className="modal-close"
              onClick={() => setShowProblemLibrary(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="modal-content">
            <ProblemSelector
              onSelectProblem={handleSelectProblem}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Selected Problem Panel (shows when a problem is selected) */}
      {selectedProblem && (
        <div className="selected-problem-panel mb-4">
          <div className="problem-header">
            <h3>{selectedProblem.title}</h3>
            <span
              className={`problem-difficulty difficulty-${selectedProblem.difficulty.toLowerCase()}`}
            >
              {selectedProblem.difficulty}
            </span>
          </div>
          <div className="problem-description-content">
            <pre>{selectedProblem.description}</pre>
          </div>
          <div className="mt-4">
            {selectedProblem.tags &&
              selectedProblem.tags.map((tag, index) => (
                <span key={index} className="problem-tag">
                  {tag}
                </span>
              ))}
          </div>
        </div>
      )}
      <div className="editor-output-container">
        <div className="editor-section">
          <div className="editor-top-bar">
            <h2 className="editor-title">Code Editor</h2>
            <button
              onClick={runCode}
              disabled={isLoading}
              className={`run-button ${isLoading ? "opacity-60" : ""}`}
            >
              {isLoading ? "Running..." : "Run Code"}
            </button>
          </div>

          <div
            className="editor-wrapper"
            style={{ position: "relative", width: "100%" }}
          >
            <div
              ref={editorRef}
              className="editor-container"
              style={{ width: "100%" }}
            />
            <div
              className="resize-handle"
              onMouseDown={handleResizeStart}
              style={{
                height: "6px",
                width: "100%",
                backgroundColor: theme === "light" ? "#e5e7eb" : "#4b5563",
                cursor: "ns-resize",
                position: "relative",
                marginTop: "1px",
                borderRadius: "0 0 4px 4px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "2px",
                  transform: "translateX(-50%)",
                  width: "30px",
                  height: "2px",
                  backgroundColor: theme === "light" ? "#9ca3af" : "#6b7280",
                  borderRadius: "1px",
                }}
              />
            </div>
          </div>
        </div>

        <OutputDisplay output={output} isLoading={isLoading} />
      </div>
    </div>
  );
};
export default CodeEditor;
