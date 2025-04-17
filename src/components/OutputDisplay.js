import React from "react";

const OutputDisplay = ({ output, isLoading }) => {
  return (
    <div className="output-section">
      <h2 className="text-xl font-semibold mb-2">Output</h2>
      <div
        className={`output-container ${isLoading ? "output-loading" : ""}`}
        aria-live="polite"
        dangerouslySetInnerHTML={{
          __html:
            output ||
            `<span class="result">Code output will appear here</span>`,
        }}
      />
    </div>
  );
};

export default OutputDisplay;
