"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookiesStore = await cookies();
  const host = env.NEXT_PUBLIC_APP_URL;
  const url = new URL(host);
  cookiesStore.delete({ name: "x-session", domain: url.hostname });
};
