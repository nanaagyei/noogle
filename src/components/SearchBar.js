"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchBar({ query }) {
  const [search, setSearch] = useState("Search (N)oogle");
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searches = [
    { search: "nana's projects", param: "nana-projects" },
    { search: "life", param: "life" },
    { search: "why hire a nana", param: "why-hire-a-nana" },
  ];
  const path = usePathname();

  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);

  // Animation variants for the letters
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.3,
      rotate: -10
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 8
      }
    }),
    hover: (index) => ({
      scale: 1.2,
      rotate: 5,
      y: -12,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }),
    floating: (index) => ({
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3 + (index * 0.2),
        repeat: Infinity,
        delay: index * 0.2,
        ease: "easeInOut"
      }
    })
  };

  // Sophisticated color palette that blends with dark purple background
  const letterColors = [
    "#9CA3AF", // ( - Cool grey
    "#C48DF6", // N - Your signature purple
    "#9CA3AF", // ) - Cool grey
    "#E5E7EB", // o - Light grey
    "#A78BFA", // o - Medium purple
    "#93C5FD", // g - Soft blue
    "#D1D5DB", // l - Warm grey
    "#B4A7D6"  // e - Muted lavender
  ];

  // Enhanced hover colors for transitions
  const hoverColors = [
    "#D1D5DB", // ( - Lighter grey
    "#DDA8F8", // N - Brighter purple
    "#D1D5DB", // ) - Lighter grey
    "#F3F4F6", // o - Bright grey
    "#C4B5FD", // o - Bright purple
    "#BFDBFE", // g - Bright blue
    "#E5E7EB", // l - Bright grey
    "#D8B4FE"  // e - Bright lavender
  ];

  // Split (N)oogle into individual letters
  const letters = ["(", "N", ")", "o", "o", "g", "l", "e"];

  useEffect(() => {
    setShowSearch(false);
  }, [search, path]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearch(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full gap-y-6 font-ropaSans ${
        path === "/" && "relative"
      }`}
      style={{ zIndex: 80 }}
    >
      {path === "/" && (
        <motion.div 
          className="absolute -top-24 lg:-top-32 xl:-top-36 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-slate-500/10 to-blue-500/10 blur-3xl rounded-full transform scale-150" />
          
          {/* Main letters container */}
          <div className="relative text-7xl lg:text-8xl xl:text-9xl flex items-center justify-center">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate={["visible", "floating"]}
                whileHover="hover"
                variants={letterVariants}
                className="inline-block cursor-pointer select-none relative"
                style={{
                  color: letterColors[index],
                  textShadow: `0 0 20px ${letterColors[index]}40`
                }}
              >
                {/* Letter background glow that appears on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 0.4,
                    scale: 1.6,
                    background: `radial-gradient(circle, ${letterColors[index]}30 0%, transparent 70%)`
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Enhanced hover color and glow */}
                <motion.span
                  className="relative z-10"
                  initial={{ color: letterColors[index] }}
                  whileHover={{ 
                    color: hoverColors[index],
                    textShadow: [
                      `0 0 20px ${letterColors[index]}40`,
                      `0 0 40px ${hoverColors[index]}80`,
                      `0 0 60px ${hoverColors[index]}60`
                    ]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {letter}
                </motion.span>
              </motion.span>
            ))}
          </div>
          
          {/* Floating particles effect */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-purple-400/60' : 
                i % 3 === 1 ? 'bg-slate-400/60' : 'bg-blue-400/60'
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -40, -80],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
              style={{
                left: `${15 + i * 8}%`,
                top: "60%"
              }}
            />
          ))}
        </motion.div>
      )}

      <div
        ref={dropdownRef} // Attach ref to the dropdown container
        className={`flex flex-col items-center shadow-lg ${
          (path !== "/" && "md:absolute w-full top-6 left-48 md:w-2/5 ") ||
          "absolute w-11/12 md:w-2/3 lg:w-2/5"
        } ${showSearch ? "rounded-3xl" : "rounded-full"} py-2 bg-accent-color`}
      >
        <div className="flex items-center w-full px-4">
          <div
            className="bg-no-repeat w-5 h-5 bg-cover"
            style={{
              backgroundImage: showSearch
                ? "url(icons/arrow.svg)"
                : "url(icons/search.svg)",
            }}
            onClick={() => setShowSearch(!showSearch)}
          />
          <div
            className={`flex-grow px-4 py-2 bg-accent-color focus:outline-none ${
              search === "Search (N)oogle" ? "text-accent-text" : "text-white"
            }`}
            onClick={() => setShowSearch(!showSearch)}
          >
            {(query && searches.find((item) => item.param === query)?.search) ||
              search}
          </div>

          <div className="flex flex-row justify-center items-center gap-x-2">
            <div
              className="bg-no-repeat w-5 h-5 bg-cover cursor-pointer"
              onMouseEnter={() => setTooltip2(!tooltip2)}
              onMouseLeave={() => setTooltip2(!tooltip2)}
              style={{ backgroundImage: "url(icons/microphone.svg)" }}
            />
            <Link
              className="bg-no-repeat w-5 h-5 bg-cover"
              href={"https://calendly.com/tuffourp/zoom-meeting"}
              target="_blank"
              onMouseEnter={() => setTooltip(!tooltip)}
              onMouseLeave={() => setTooltip(!tooltip)}
              style={{ backgroundImage: "url(icons/calendar.svg)" }}
            />
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              book a call
            </div>
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip2 ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              this just looks cool
            </div>
          </div>
        </div>

        {showSearch && (
          <AnimatePresence>
            <motion.div
              className="w-full overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="border-b border-accent-text mx-4" />
              <h2 className="px-4 font-semibold text-md text-accent-text mt-2">
                Trending searches
              </h2>
              {searches.map((item, idx) => (
                <Link
                  className="px-4 flex flex-row items-center w-full gap-x-2 text-[#E5DFFF] py-2 rounded-lg hover:bg-white hover:bg-opacity-5 transition duration-200"
                  href={`/search?q=${encodeURIComponent(item.param)}`}
                  key={idx}
                  onClick={() => setShowSearch(false)}
                >
                  <div
                    className="bg-no-repeat w-5 h-3 bg-cover"
                    style={{ backgroundImage: "url(icons/trending.svg)" }}
                  />
                  {item.search}
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
