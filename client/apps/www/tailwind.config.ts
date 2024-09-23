import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/components/src/**/*.{ts,tsx}",
    // for jamsr-ui
    "./node_modules/@jamsr-ui/**/dist/*.{js,jsx,mjs}",
  ],
  presets: [sharedConfig],
};
export default config;
