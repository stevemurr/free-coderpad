import { useState } from "react";

export const useCodeExecution = () => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async (code) => {
    setIsLoading(true);
    setOutput("Running code...");

    try {
      // Use the backend API
      const response = await fetch("http://localhost:3001/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.error) {
        const formattedError = `<span class="stderr">${result.error}</span>`;
        setOutput(formattedError);
      } else {
        const formattedOutput = result.output
          ? `<span class="stdout">${result.output}</span>`
          : `<span class="result">Code executed successfully with no output.</span>`;

        setOutput(formattedOutput);
      }
    } catch (error) {
      setOutput(
        `<span class="stderr">Error: Failed to connect to the execution service. ${error.message}</span>`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    output,
    isLoading,
    runCode,
    setOutput,
  };
};
