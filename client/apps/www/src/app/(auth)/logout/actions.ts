"use server";

import { env } from "@/env";
import { SessionKey } from "@repo/config/enums";
import { cookies } from "next/headers";

const domain = (_url: string) => {
  const { hostname } = new URL(_url);
  const parts = hostname.split(".");
  if (parts.length > 1) {
    // Combine the second-level domain and top-level domain
    return `.${parts.at(-2)}.${parts.at(-1)}`;
  }
  return undefined;
};

export const logout = async () => {
  const cookiesStore = await cookies();
  const url = env.NEXT_PUBLIC_APP_URL;
  cookiesStore.delete({ name: SessionKey.User, domain: domain(url) });
};
