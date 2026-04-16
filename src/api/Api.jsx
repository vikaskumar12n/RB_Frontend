// helper/PdfHelpers.js
const API_URL = import.meta.env.VITE_API_URL;
export const saveToAPI = async (resumeData, templateId) => {
  try {
    const res = await fetch(`${API_URL}/api/resume/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...resumeData,
        templateId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("API Save Error:", error);
    throw error; // important
  }
};