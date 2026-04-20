import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // localStorage se previous preference lo
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default: dark
  });

  useEffect(() => {
    // <html> tag pe class lagao — Tailwind dark mode ke liye
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — kisi bhi component mein import karo aur use karo
export function useTheme() {
  return useContext(ThemeContext);
}