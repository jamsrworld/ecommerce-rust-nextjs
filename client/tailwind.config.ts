import type { Config } from "tailwindcss";
import { jamsrui } from "@jamsr-ui/theme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // for jamsr-ui
    "./node_modules/@jamsr-ui/**/dist/*.{js,jsx,mjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        opensans: ["var(--font-opensans)"],
      },
    },
  },
  plugins: [
    ...jamsrui(),
    plugin(({ addBase }) => {
      addBase({
        ".full-container": {
          width: "99.5dvw",
          "margin-left": "calc(50% - 50dvw)",
        },
      });
    }),
  ],
};
export default config;
