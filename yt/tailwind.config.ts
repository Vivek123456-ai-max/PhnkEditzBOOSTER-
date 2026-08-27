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
        phonk: {
          bg: "#08080c",
          surface: "#101016",
          card: "#161620",
          border: "#252535",
          accent: "#ff1a4a",
          purple: "#9333ea",
          neonPurple: "#a855f7",
          neonCyan: "#00f0ff",
          gold: "#f59e0b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "phonk-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 26, 74, 0.15), rgba(255, 255, 255, 0))",
        "purple-glow": "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(147, 51, 234, 0.12), rgba(0, 0, 0, 0))",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(255, 26, 74, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(255, 26, 74, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
