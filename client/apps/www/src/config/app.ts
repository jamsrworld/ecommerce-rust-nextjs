import { type Route } from "next";
import { APP_ROUTES } from "./routes";

export const REDIRECT_AFTER_LOGIN: Route = APP_ROUTES.home;

export const THEME_LOCAL_STORAGE_KEY = "theme";