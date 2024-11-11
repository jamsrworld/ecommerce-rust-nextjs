import { REDIRECT_AFTER_LOGIN } from "@/config/app";
import { type Route } from "next";
import { useSearchParams } from "next/navigation";

export const useLoginRedirect = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  if (redirect) return redirect as Route;
  return REDIRECT_AFTER_LOGIN;
};
