import { env } from "@/env";
import { createClient } from "@hey-api/client-fetch";

export const client = createClient({
  
  baseUrl: env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  cache: "force-cache",
  next: {
    revalidate: 60 * 60,
  },
});
