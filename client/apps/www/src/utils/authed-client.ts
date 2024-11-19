import { env } from "@/env";
import { createClient } from "@hey-api/client-fetch";
import { cookies } from "next/headers";

export const authedClient = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const client = createClient({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      Cookie: cookieString,
    },
  });
  return client;
};
