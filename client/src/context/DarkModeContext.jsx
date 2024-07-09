import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext(false);

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === null || savedDarkMode === "undefined") {
      return true;
    } else {
      return JSON.parse(savedDarkMode);
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function changeTheme() {
    setDarkMode((prevVal) => {
      return !prevVal;
    });
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, changeTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
