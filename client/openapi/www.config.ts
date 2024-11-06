import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  base: "http://localhost:5003",
  client: "@hey-api/client-fetch",
  input: "http://localhost:5003/api-docs/openapi.json",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "apps/www/src/client",
  },
  plugins: [
    "@hey-api/schemas",
    "@hey-api/services",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "typescript",
      name: "@hey-api/types",
    },
    "@tanstack/react-query",
  ],
});
