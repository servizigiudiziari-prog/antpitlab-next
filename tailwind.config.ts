import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#000000",
        "bg-secondary": "#0a0a0a",
        "text-primary": "#ffffff",
        "text-secondary": "#a3a3a3",
        border: "#1a1a1a",
        accent: "#3b82f6",
        overlay: "rgba(0, 0, 0, 0.7)",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-lato)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
      },
      spacing: {
        "4": "0.25rem",
        "8": "0.5rem",
        "12": "0.75rem",
        "16": "1rem",
        "24": "1.5rem",
        "32": "2rem",
        "48": "3rem",
        "64": "4rem",
        "96": "6rem",
        "128": "8rem",
      },
      borderWidth: {
        "3": "3px",
      },
    },
  },
  plugins: [],
};

export default config;
