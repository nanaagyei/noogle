"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  // Theme color palettes
  const themes = {
    dark: {
      // Current dark theme colors
      bg: {
        primary: '#1A1625',
        secondary: '#2A2438', 
        tertiary: '#3A3449',
        accent: '#4A4464',
        card: '#4A4464',
        modal: '#3A3449'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E5E7EB',
        accent: '#C48DF6',
        muted: '#9CA3AF',
        link: '#8AB4F8'
      },
      border: {
        primary: 'rgba(255, 255, 255, 0.1)',
        secondary: 'rgba(196, 141, 246, 0.3)',
        accent: '#C48DF6'
      },
      shadow: 'rgba(0, 0, 0, 0.3)',
      gradient: {
        primary: 'from-purple-500/20 via-blue-500/20 to-purple-500/20',
        secondary: 'from-dark-purple-300 via-dark-purple-200 to-dark-purple-100'
      }
    },
    light: {
      // New light theme with off-white and creative hues
      bg: {
        primary: '#FDFCFF', // Soft off-white with purple hint
        secondary: '#F8F6FC', // Light lavender-grey
        tertiary: '#F1EDF8', // Subtle purple-grey
        accent: '#E8E3F3', // Light purple-grey
        card: '#FFFFFF',
        modal: '#FFFFFF'
      },
      text: {
        primary: '#2D2438', // Dark purple-grey
        secondary: '#4A4464', // Medium purple-grey  
        accent: '#7C3AED', // Rich purple
        muted: '#6B7280', // Neutral grey
        link: '#3B82F6' // Clean blue
      },
      border: {
        primary: 'rgba(0, 0, 0, 0.1)',
        secondary: 'rgba(124, 58, 237, 0.2)',
        accent: '#7C3AED'
      },
      shadow: 'rgba(0, 0, 0, 0.1)',
      gradient: {
        primary: 'from-purple-100/30 via-blue-100/30 to-purple-100/30',
        secondary: 'from-purple-50 via-blue-50 to-purple-50'
      }
    }
  };

  const currentTheme = isDark ? themes.dark : themes.light;

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      // Default to dark mode if no preference is saved
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    theme: currentTheme,
    toggleTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 