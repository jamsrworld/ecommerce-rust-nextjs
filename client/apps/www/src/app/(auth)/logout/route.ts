import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete({ name: "x-session", domain: ".jamsrworld.com" });
  cookiesStore.delete("x-session");
  redirect("/");
};
