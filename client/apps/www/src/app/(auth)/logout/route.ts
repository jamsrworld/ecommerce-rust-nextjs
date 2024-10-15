import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = () => {
  cookies().delete("x-session");
  redirect("/");
};
