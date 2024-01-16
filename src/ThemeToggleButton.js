import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from './ThemeContext';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme} 
      className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} absolute top-0 right-0 m-4`}
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </button>
  );
}

export default ThemeToggleButton;