import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "http://localhost:5003/api-docs/openapi-admin.json",
  output: "apps/admin/src/client",
  plugins: ["@tanstack/react-query"],
  types: {
    dates: "types",
    enums: "typescript",
  },
  schemas: false,
});
