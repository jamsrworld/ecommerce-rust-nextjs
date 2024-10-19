import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "openapi.json",
  output: "../../apps/www/src/api",
  plugins: ["@tanstack/react-query"],
});


