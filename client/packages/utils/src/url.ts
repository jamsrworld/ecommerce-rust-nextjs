import {
  ADMIN_SERVER_URL,
  APP_SERVER_URL,
  CDN_SERVER_URL,
  SELLER_SERVER_URL,
} from "@repo/shared/config";
import { regex } from "./regex";

export const withAppServerUrl = (path: string) => APP_SERVER_URL + path;
export const withSellerServerUrl = (path: string) => SELLER_SERVER_URL + path;
export const withAdminServerUrl = (path: string) => ADMIN_SERVER_URL + path;
export const withCdnServerUrl = (path: string) => CDN_SERVER_URL + path;

export const getFileSrc = (url: string) => {
  if (!url?.length) return "";
  if (url.startsWith("http")) return url;
  return withCdnServerUrl(url.startsWith("/") ? url : `/${url}`);
};

export const getRootDomain = (url: string) =>
  new URL(url).hostname.split(".").slice(-2).join(".");

export const extractYouTubeVideoId = (url: string) => {
  const match = url.match(regex.youTube);
  if (match) {
    return match[1];
  }
  return null;
};
