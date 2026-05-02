import React, { createContext, useContext, useState } from 'react';
import { applyTheme } from './constants';

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const next = !isDark;
    applyTheme(next);   // mutates COLORS in-place → all components re-read on next render
    setIsDark(next);    // triggers root re-render so the whole tree picks up new colors
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
