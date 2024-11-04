import { type Route } from "next";

const products = <T extends string>(path: T) =>
  `/product-management${path}` as const;
const settings = <T extends string>(path: T) => `/settings${path}` as const;
const frontend = <T extends string>(path: T) => `/frontend${path}` as const;
const extra = <T extends string>(path: T) => `/extra${path}` as const;

export type RoutesRecords = {
  [k: string]: Route | ((...args: string[]) => Route) | RoutesRecords;
};

export const APP_ROUTES = {
  settings: {
    staffManagement: {
      root: settings("/staff-management"),
      staffs: settings("/staff-management/staffs"),
      roles: settings("/staff-management/roles"),
    },
    payment: {
      root: settings("/payment-settings"),
      checkout: settings("/payment-settings/checkout"),
    },
    system: {
      root: settings("/system-settings"),
      generalSettings: settings("/system-settings/general-settings"),
      emailSettings: settings("/system-settings/email-settings"),
      extensions: settings("/system-settings/extensions"),
      seo: settings("/system-settings/seo"),
      services: settings("/system-settings/services"),
    },
  },
  productManagement: {
    products: {
      root: products("/products"),
      create: products("/products/create"),
    },
    categories: {
      root: products("/categories"),
      create: products("/categories/create"),
    },
    attributes: { root: products("/attributes") },
  },
  frontend: {
    root: extra(""),
    pages: {
      privacyPolicy: frontend("/pages/privacy-policy"),
      refundPolicy: frontend("/pages/refund-policy"),
      termsOfUse: frontend("/pages/terms-of-use"),
    },
  },
  extra: {
    root: extra(""),
    profile: extra("/profile"),
    loginSessions: extra("/login-sessions"),
    serverInformation: extra("/server-information"),
  },
} satisfies RoutesRecords;
