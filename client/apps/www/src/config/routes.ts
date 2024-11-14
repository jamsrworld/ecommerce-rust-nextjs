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
    root: "/user/orders",
    view: (id: string) => `/user/orders/${id}` as Route,
  },
  addresses: "/user/addresses",
  profile: "/user/profile",
  products: {
    view: (id: string, slug: string) => `/products/${slug}/${id}` as Route,
  },
  checkout: "/checkout",
  search: (keyword: string) => `/search/${keyword}` as Route,
} satisfies RoutesRecords;

export const protectedRoutes: Route[] = [
  APP_ROUTES.profile,
  APP_ROUTES.orders.root,
  APP_ROUTES.orders.view(""),
  APP_ROUTES.addresses,
];
