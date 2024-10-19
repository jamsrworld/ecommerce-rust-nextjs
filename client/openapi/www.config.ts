import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  base: "http://localhost:5003",
  client: "@hey-api/client-fetch",
  input: "http://localhost:5003/api-docs/openapi.json",
  output: "../../apps/www/src/client",
  plugins: ["@tanstack/react-query"],
  types: {
    dates: "types",
    enums: "typescript",
  },
  schemas: false,
});
