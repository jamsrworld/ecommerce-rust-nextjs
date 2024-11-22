import { type Route } from "next";

export type RoutesRecords = {
  [k: string]: Route | ((...args: string[]) => Route) | RoutesRecords;
};

export const APP_ROUTES = {
  home: "/",
  login: "/login",
  loginWithRedirect: (pathname: string) => `/login?redirect=${pathname}`,
  register: "/register",
  logout: "/logout",
  forgotPassword: "/forgot-password",
  orders: {
    root: "/orders",
    view: (id: string) => `/orders/${id}` as Route,
  },
  addresses: "/addresses",
  profile: "/profile",
  products: {
    view: (id: string, slug: string) => `/products/${slug}/${id}` as Route,
  },
  checkout: "/checkout",
  search: (keyword: string) => `/search/${keyword}` as Route,
  aboutUs: "/about",
  contactUs: "/contact",
  privacyPolicy: "/privacy-policy",
  returnPolicy: "/return-policy",
  termsOfUse: "/terms-of-use",
  help: {
    payments: "/help/payments",
    shipping: "/help/shipping",
    faqs: "/help/faqs",
    cancellation: "/help/cancellation",
  },
} satisfies RoutesRecords;

export const protectedRoutes: Route[] = [
  APP_ROUTES.profile,
  APP_ROUTES.orders.root,
  APP_ROUTES.orders.view(""),
  APP_ROUTES.addresses,
  APP_ROUTES.checkout,
];
