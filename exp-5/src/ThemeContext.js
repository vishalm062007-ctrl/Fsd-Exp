import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState({
    dark: false,
    accent: "#3b82f6",
    username: "User",
  });

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <ThemeContext.Provider value={{ settings, update }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
