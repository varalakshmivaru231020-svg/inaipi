import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["var(--font-figtree)", "Figtree", "sans-serif"],
        inter: ["var(--font-figtree)", "Figtree", "sans-serif"], // mapped to figtree
        outfit: ["var(--font-figtree)", "Figtree", "sans-serif"], // mapped to figtree
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        purple: "rgb(var(--purple) / <alpha-value>)",
        orange: "rgb(var(--orange) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
