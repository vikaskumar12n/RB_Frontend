// helper/PdfHelpers.js

export const saveToAPI = async (resumeData, templateId) => {
  try {
    const res = await fetch("http://13.202.253.175:3000/api/resume/save", {
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