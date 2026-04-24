// helper/PdfHelpers.js
const API_URL = import.meta.env.VITE_API_URL;
export const saveToAPI = async (resumeData, templateId) => {
  try {

    const isLocal = window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    let url;
    if (isLocal) {
      // Local development - direct backend call
      url = 'http://13.202.253.175:3000/api/resume/save';
    } else {
      // Production (Vercel/Netlify) - use proxy
      url = '/api/resume/save';
    }

    console.log("Calling API URL:", url);
    console.log("Resume Data:", resumeData);
    console.log("Template ID:", templateId);
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
export const loginUser = async (data) => {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const url = isLocal
    ? "http://13.202.253.175:3000/api/login"
    : "/api/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return await res.json();
};

export const registerUser = async (data) => {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const url = isLocal
    ? "http://13.202.253.175:3000/api/register"
    : "/api/register";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Agar response sahi nahi hai (e.g. 400, 401, 500)
  if (!res.ok) {
    const errorData = await res.json(); // Server ka bheja hua JSON yahan hai
    // Pura error object throw karein taaki onSubmit usey read kar sake
    const error = new Error(errorData.message || "Register failed");
    error.response = { data: errorData };
    throw error;
  }

  return await res.json();
};

export const submitQuery = async (data) => {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const url = isLocal
    ? "http://13.202.253.175:3000/api/query"
    : "/api/query";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const error = new Error(errorData.message || "Query submission failed");
    error.response = { data: errorData };
    throw error;
  }

  return await res.json();
};