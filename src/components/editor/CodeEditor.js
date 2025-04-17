import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import { useTheme } from "../../contexts/ThemeContext";
import { useEditor } from "../../contexts/EditorContext";
import { useEditorResize } from "../../hooks/useEditorResize";
import "./CodeEditor.css";

const CodeEditor = () => {
  const { theme } = useTheme();
  const { code, setCode, editorHeight, setEditorHeight } = useEditor();
  const { handleResizeStart } = useEditorResize(editorHeight);

  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

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
            python(),
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
          python(),
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
  }, [theme, editorHeight, setCode]);

  return (
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
  );
};

export default CodeEditor;
