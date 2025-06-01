/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": { 100: "#2B273C", 200: "#211E2E", 300: "#1D1B28" },
        "accent-text": "#ADA6CC",
        "accent-color": "#383251",
        "search-blue": "#93B3F2"
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        ropaSans: ["var(--font-ropa-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
