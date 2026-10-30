import { useEffect, useState } from 'react';

function getStartingTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-schema: dark)').matches
    ? 'dark'
    : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getStartingTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      className='icon-btn'
      onClick={toggleTheme}
      aria-label='Toggle dark mode'
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
