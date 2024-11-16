import { APP_ROUTES } from "@/config/routes";
import { redirect } from "next/navigation";
import { logout } from "./actions";

export const GET = async () => {
  await logout();
  redirect(APP_ROUTES.home);
};
