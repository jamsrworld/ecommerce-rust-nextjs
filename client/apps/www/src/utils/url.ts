import { env } from "@/env";

export const withAppServerUrl = (path: string) =>
  env.NEXT_PUBLIC_APP_URL + (path === "/" ? "" : path);
