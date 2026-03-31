import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Fonts ── */
      fontFamily: {
        figtree: ["var(--font-figtree)", "Figtree", "system-ui", "sans-serif"],
        inter:   ["var(--font-figtree)", "Figtree", "system-ui", "sans-serif"],
        outfit:  ["var(--font-figtree)", "Figtree", "system-ui", "sans-serif"],
      },

      /* ── Colors ── */
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary:    "rgb(var(--primary) / <alpha-value>)",
        secondary:  "rgb(var(--secondary) / <alpha-value>)",
        accent:     "rgb(var(--accent) / <alpha-value>)",
        success:    "rgb(var(--success) / <alpha-value>)",
        purple:     "rgb(var(--purple) / <alpha-value>)",
        orange:     "rgb(var(--orange) / <alpha-value>)",
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a8a",
          900: "#1e3a6e",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
      },

      /* ── Type Scale ── */
      fontSize: {
        xs:   ["0.75rem",  { lineHeight: "1rem",    letterSpacing: "0.025em"  }],
        sm:   ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0"        }],
        base: ["1rem",     { lineHeight: "1.5rem",  letterSpacing: "0"        }],
        lg:   ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em"  }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
        "2xl":["1.5rem",   { lineHeight: "2rem",    letterSpacing: "-0.02em"  }],
        "3xl":["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem",  letterSpacing: "-0.03em"  }],
        "5xl":["3rem",     { lineHeight: "1.2",     letterSpacing: "-0.03em"  }],
        "6xl":["3.75rem",  { lineHeight: "1.15",    letterSpacing: "-0.035em" }],
        "7xl":["4rem",     { lineHeight: "1.1",     letterSpacing: "-0.04em"  }],
        "display": ["clamp(2.5rem,5vw,4rem)", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
      },

      /* ── Font Weights ── */
      fontWeight: {
        regular:   "400",
        medium:    "500",
        semibold:  "600",
        bold:      "700",
        extrabold: "800",
        black:     "900",
      },

      /* ── Spacing — 8-point scale ── */
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "28":   "7rem",
        "30":   "7.5rem",
        "34":   "8.5rem",
        "36":   "9rem",
        "section-sm": "3rem",    /* 48px */
        "section-md": "5rem",    /* 80px */
        "section-lg": "6rem",    /* 96px */
      },

      /* ── Border Radius ── */
      borderRadius: {
        "4xl":  "2rem",
        "5xl":  "2.5rem",
        "6xl":  "3rem",
      },

      /* ── Box Shadows ── */
      boxShadow: {
        "xs":       "0 1px 2px 0 rgba(0,0,0,0.05)",
        "card":     "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-md":  "0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)",
        "card-lg":  "0 10px 30px -4px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.06)",
        "blue-sm":  "0 4px 14px 0 rgba(37,99,235,0.2)",
        "blue-md":  "0 8px 30px 0 rgba(37,99,235,0.25)",
        "blue-lg":  "0 16px 48px 0 rgba(37,99,235,0.3)",
        "glow":     "0 0 0 3px rgba(37,99,235,0.15)",
      },

      /* ── Breakpoints ── */
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl":"1440px",
      },

      /* ── Max Widths ── */
      maxWidth: {
        "8xl":  "88rem",
        "9xl":  "96rem",
        "prose":"65ch",
        "section": "80rem",
      },

      /* ── Transitions ── */
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
      },

      transitionTimingFunction: {
        "smooth":  "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce":  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "natural": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },

      /* ── Animation ── */
      animation: {
        "fade-in":    "fade-in 0.5s ease forwards",
        "float":      "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "marquee-left":  "marquee-left 38s linear infinite",
        "marquee-right": "marquee-right 38s linear infinite",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)"   },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)"    },
          "50%":      { opacity: "0.7", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(300%) skewX(-12deg)"  },
        },
        "marquee-left": {
          "0%":   { transform: "translateX(0)"       },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "marquee-right": {
          "0%":   { transform: "translateX(-33.333%)" },
          "100%": { transform: "translateX(0)"        },
        },
      },

      /* ── Background Images ── */
      backgroundImage: {
        "dot-grid":      "radial-gradient(circle, #0f172a 1px, transparent 1px)",
        "gradient-hero": "linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f5f0ff 100%)",
        "gradient-card": "linear-gradient(160deg, #ffffff 0%, #f0f6ff 100%)",
        "gradient-blue": "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
        "gradient-cta":  "linear-gradient(160deg, #f0f4ff 0%, #fafbff 40%, #f5f0ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
