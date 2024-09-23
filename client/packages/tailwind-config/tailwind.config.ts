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
      screens: {
        _sm: {
          max: "639px",
        },
        _md: {
          max: "767px",
        },
        _lg: {
          max: "1023px",
        },
        _xl: {
          max: "1279px",
        },
        _2xl: {
          max: "1535px",
        },
      },
    },
  },
  plugins: [...jamsrui()],
};
export default config;
