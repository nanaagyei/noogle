"use client";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full p-1 focus:outline-none transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? theme.bg.accent : theme.bg.tertiary,
        border: `1px solid ${theme.border.secondary}`
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Track */}
      <motion.div
        className="w-4 h-4 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: theme.text.accent,
          color: isDark ? theme.bg.primary : theme.bg.card
        }}
        animate={{
          x: isDark ? 0 : 20
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon */}
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 flex items-center justify-center"
        >
          {isDark ? (
            // Moon Icon
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M21.75 12c0 5.385-4.365 9.75-9.75 9.75-2.33 0-4.47-.818-6.154-2.182 1.617.615 3.378.932 5.154.932 7.18 0 13-5.82 13-13 0-1.776-.317-3.537-.932-5.154C20.932 3.53 21.75 5.67 21.75 8v4z"/>
            </svg>
          ) : (
            // Sun Icon  
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          )}
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      <div 
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          backgroundColor: theme.bg.modal,
          color: theme.text.secondary,
          border: `1px solid ${theme.border.primary}`,
          boxShadow: `0 2px 8px ${theme.shadow}`
        }}
      >
        {isDark ? 'Switch to Light' : 'Switch to Dark'}
      </div>
    </motion.button>
  );
} 