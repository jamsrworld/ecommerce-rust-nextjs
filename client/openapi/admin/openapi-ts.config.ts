import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "openapi-admin.json",
  output: "../../apps/admin/src/api",
  plugins: ["@tanstack/react-query"],
});


