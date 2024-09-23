const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:tailwindcss/recommended",
    "eslint:recommended",
    "airbnb",
    "airbnb-base",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project,
      },
    },
    tailwindcss: {
      // These are the default values but feel free to customize
      callees: ["classnames", "clsx", "cn", "tv"],
      cssFiles: [
        "**/*.css",
        "!**/node_modules",
        "!**/.*",
        "!**/dist",
        "!**/build",
      ],
      cssFilesRefreshRate: 10_000,
      removeDuplicates: true,
      skipClassAttribute: false,
      whitelist: [],
      tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
      classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    },
  },
  ignorePatterns: [
    ".*.js", // Ignore dotfiles
    "node_modules/",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "import/no-default-export": "error",
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "import/no-extraneous-dependencies": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/no-shadow": "off",
    "no-array-index-key": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-await": "error",
    "react/no-unescaped-entities": "off",
    "react/no-array-index-key": "off",
    "no-underscore-dangle": "off",
    "no-continue": "off",
    "react/jsx-key": "error",
    "react/no-danger": "off",
    "no-void": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
  },
  overrides: [
    {
      files: [
        "{page,layout,loading,error,global-error,not-found,*.stories,*.config,*.d,robots,sitemap}.{js,jsx,ts,tsx,mjs}",
      ],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
      },
    },
  ],
};
