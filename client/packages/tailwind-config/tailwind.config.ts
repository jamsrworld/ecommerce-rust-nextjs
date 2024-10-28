import { withJamsrUI } from "@jamsr-ui/theme";
import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = withJamsrUI(
  {
    content: [],
    theme: {
      extend: {
        fontFamily: {
          inter: ["var(--font-inter)"],
          opensans: ["var(--font-opensans)"],
        },
        container: {
          center: true,
        },
      },
    },
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
      },
    },
  }
);
export default config;
