export const executeCode = async (code) => {
  try {
    const response = await fetch("http://localhost:3001/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
};
