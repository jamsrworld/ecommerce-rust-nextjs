import { type Route } from "next";

export type RoutesRecords = {
  [k: string]: Route | ((...args: string[]) => Route) | RoutesRecords;
};

export const APP_ROUTES = {
  home: "/",
  login: "/login",
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
    view: (id: string) => `/products/${id}` as Route,
  },
  checkout: "/checkout",
  search: (keyword: string) => `/search/${keyword}` as Route,
} satisfies RoutesRecords;
