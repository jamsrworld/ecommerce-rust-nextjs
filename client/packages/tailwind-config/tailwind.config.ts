import { semanticColors, withJamsrUI } from "@jamsr-ui/theme";
import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = withJamsrUI(
  {
    content: [],
    theme: {
      extend: {
        container: {
          center: true,
        },
        screens: {
          sm: "640px", // Default Tailwind sm
          md: "768px", // Default Tailwind md
          lg: "1024px", // Default Tailwind lg
          xl: "1280px", // Default Tailwind xl
          "2xl": "1536px", // Default Tailwind 2xl
          "3xl": "1728px", // Custom 3xl for slightly larger screens
          "4xl": "1920px", // Custom 4xl for Full HD desktop monitors
          "5xl": "2048px", // Custom 5xl for larger screens or wider 4K displays
          "6xl": "2560px", // Custom 6xl for ultra-wide monitors or 4K displays
          "7xl": "2880px", // Custom 7xl for very large 5K displays
        },
        fontFamily: {
          inter: ["var(--font-inter)"],
          opensans: ["var(--font-opensans)"],
        },
      },
    },
    darkMode: "class",
  },
  {
    colors: {
      light: {
        primary: {
          DEFAULT: "#000000",
          foreground: "#fff",
          "50": "#e6e6e6",
          "100": "#cccccc",
          "200": "#b3b3b3",
          "300": "#999999",
          "400": "#808080",
          "500": "#666666",
          "600": "#4d4d4d",
          "700": "#333333",
          "800": "#1a1a1a",
          "900": "#000000",
        },
        secondary: semanticColors.light.primary,
      },
    },
  }
);
export default config;
