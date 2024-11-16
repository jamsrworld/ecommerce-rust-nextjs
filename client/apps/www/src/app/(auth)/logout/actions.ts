"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete({ name: "x-session", domain: ".jamsrworld.com" });
  cookiesStore.delete("x-session");
};
