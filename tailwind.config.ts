import type { Config } from "tailwindcss";

const palette = {
  black: {
    DEFAULT: "#000000",
    soft: "#050505",
    panel: "#0a0908",
    raised: "#111008",
  },
  gold: {
    DEFAULT: "#C9A227",
    bright: "#E7C766",
    light: "#F2DE9B",
    pale: "#F7ECCB",
    dark: "#9C7A1A",
    deep: "#6E5411",
  },
  ivory: {
    DEFAULT: "#F4EAD3",
    soft: "#EFE2C6",
    muted: "#C9BE9F",
  },
  ink: {
    DEFAULT: "#0B0A07",
    soft: "#1A1813",
  },
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: palette,
      fontFamily: {
        sans: ["\"Cormorant Garamond\"", "Georgia", "serif"],
        display: ["\"Playfair Display\"", "Georgia", "serif"],
        cormorant: ["\"Cormorant Garamond\"", "Georgia", "serif"],
        cinzel: ["Cinzel", "Georgia", "serif"],
        script: ["\"Great Vibes\"", "\"Brush Script MT\"", "cursive"],
        arabic: ["Amiri", "\"Scheherazade New\"", "serif"],
      },
      letterSpacing: {
        widest2: "0.32em",
        widest3: "0.5em",
      },
      boxShadow: {
        gold: "0 18px 50px -22px rgba(201, 162, 39, 0.55)",
        glow: "0 0 42px -6px rgba(201, 162, 39, 0.35)",
        panel: "0 30px 70px -40px rgba(0, 0, 0, 0.95)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #6E5411 0%, #C9A227 22%, #F7ECCB 50%, #C9A227 78%, #6E5411 100%)",
        "gold-sheen":
          "linear-gradient(100deg, transparent 20%, rgba(247,236,203,0.85) 50%, transparent 80%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "draw-line": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        draw: "draw-line 1.6s cubic-bezier(0.22,0.61,0.36,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
