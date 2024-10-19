import { createClient, createConfig } from "@hey-api/client-fetch";

export const client = createClient(
  createConfig({
    baseUrl: "http://localhost:5003",
    credentials: "include",
  }),
);