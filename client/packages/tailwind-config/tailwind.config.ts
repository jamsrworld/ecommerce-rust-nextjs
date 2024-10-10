import { jamsrui } from "@jamsr-ui/theme";
import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
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
  plugins: [
    ...jamsrui({
      colors: {
        light: {
          default: {
            DEFAULT: "#000",
            foreground: "#fff",
          },
        },
      },
    }),
  ],
};
export default config;
