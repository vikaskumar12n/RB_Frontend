// helper/PdfHelpers.js
const API_URL = import.meta.env.VITE_API_URL;
export const saveToAPI = async (resumeData, templateId) => {
  try {
    console.log("API received data:", resumeData);
    console.log("Template ID:", templateId);
    // const res = await fetch(`${API_URL}/api/resume/save`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...resumeData,
    //     templateId,
    //   }),
    // });
    const url = '/api/resume/save';

    console.log("🌐 Calling API URL:", url);
    console.log("📦 Resume Data:", resumeData);
    console.log("🏷️ Template ID:", templateId);
    const res = await fetch(url, {
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