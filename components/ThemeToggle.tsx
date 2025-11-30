'use client';

import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        id="switch-container"
        className="fixed top-[14px] right-[20px] md:right-[60px] z-50"
      >
        <div className="w-[40px] h-[40px]" />
      </div>
    );
  }

  // Get icon based on current theme
  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return '/assets/icons/moon.svg';
      case 'sepia':
        return '/assets/icons/read.webp';
      default:
        return '/assets/icons/light.webp';
    }
  };

  // Get label for next theme
  const getNextThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to Reading Mode';
      default:
        return 'Switch to Light Mode';
    }
  };

  return (
    <div
      id="switch-container"
      className="fixed top-[14px] right-[20px] md:right-[60px] z-50"
    >
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        title={getNextThemeLabel()}
        aria-label={getNextThemeLabel()}
      >
        <Image
          src={getIcon()}
          alt="Toggle theme"
          width={24}
          height={24}
          className="theme-icon"
        />
      </button>
    </div>
  );
}
