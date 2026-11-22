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
        yt: {
          red: "#FF0000",
          darkRed: "#CC0000",
          darkBg: "#0F0F0F",
          darkSurface: "#1F1F1F",
          darkElevated: "#282828",
          darkBorder: "#383838",
          lightBg: "#F9F9F9",
          lightSurface: "#FFFFFF",
          lightBorder: "#E5E5E5",
          accentBlue: "#3EA6FF",
          accentGreen: "#2BA640",
          accentAmber: "#F59E0B"
        }
      }
    },
  },
  plugins: [],
};
export default config;
