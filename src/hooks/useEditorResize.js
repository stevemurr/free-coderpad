import { useState, useRef, useEffect } from "react";

export const useEditorResize = (initialHeight = 500) => {
  const [editorHeight, setEditorHeight] = useState(initialHeight);
  const resizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

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

  return {
    editorHeight,
    setEditorHeight,
    handleResizeStart,
  };
};
