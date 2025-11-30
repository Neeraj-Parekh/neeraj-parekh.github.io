'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '@/types';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'sepia'].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Apply to both html and body for full coverage
    document.documentElement.classList.remove('light-theme', 'dark-theme', 'sepia-theme');
    document.body.classList.remove('light-theme', 'dark-theme', 'sepia-theme');
    
    document.documentElement.classList.add(`${newTheme}-theme`);
    document.body.classList.add(`${newTheme}-theme`);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'sepia'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
