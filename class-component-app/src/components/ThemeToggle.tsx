import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button onClick={toggleTheme} className={`switcher ${theme}-theme`}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
};

export default ThemeToggle;
