"use client";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect } from "react";

export default function LayoutWrapper({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to document body
    document.body.style.backgroundColor = theme.bg.primary;
    document.body.style.color = theme.text.primary;
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  }, [theme]);

  return <>{children}</>;
} 