"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const path = usePathname();
  const [tooltip, setTooltip] = useState(false)
  return (
    <div 
      className="flex flex-col w-full font-ropaSans justify-center gap-y-4 py-4 relative"
      style={{ 
        backgroundColor: theme.bg.tertiary,
        color: theme.text.muted
      }}
    >
      <div className="flex items-center px-4">
        <div className="cursor-pointer" onMouseEnter={() => setTooltip(!tooltip)} onMouseLeave={() => setTooltip(!setTooltip)} >Austin, TX</div>
      </div>

      <div 
        className={`hidden md:${tooltip ? "block" : "hidden"} absolute p-2 rounded-xl px-4 left-[4.5rem] top-2`}
        style={{
          backgroundColor: theme.bg.modal,
          color: theme.text.primary,
          border: `1px solid ${theme.border.primary}`
        }}
      >
        pls fly me out
      </div>

      <div 
        className="border borber-b border-1" 
        style={{ borderColor: theme.border.primary }}
      />

      <div className="flex flex-row w-full justify-between px-4">
        <div className="flex flex-row gap-x-6">
          <Link
            href="https://nkagyei.substack.com/"
            className="hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.secondary }}
          >
            Newsletter
          </Link>

          <div className="cursor-pointer">{currentYear} © Prince Agyei-Tuffour</div>
        </div>

        {path == "/search" && (
          <Link
            href="/about"
            className="hover:opacity-70 transform transition-all duration-300"
            style={{ color: theme.text.secondary }}
          >
            About
          </Link>
        )}
      </div>
    </div>
  );
}
