import { APP_ROUTES } from "@/config/routes";
import { Header } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { AppLogo } from "../app-logo";
import { AuthGuard } from "../auth-guard";
import { HeaderCartBtn } from "./cart/cart-btn";
import { UserMenuitem } from "./user-menuitem";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Men",
    href: "/",
  },
  {
    name: "Women",
    href: "/",
  },
  {
    name: "News",
    href: "/",
  },
  {
    name: "Vision",
    href: "/",
  },
] as const;

export const AppHeader = () => {
  return (
    <Header hideOnScroll>
      <div className="mx-auto flex w-full max-w-screen-2xl shrink-0 items-center justify-between border-none px-1 md:px-2">
        <AppLogo />
        <nav className="max-md:hidden">
          <ul className="flex items-center gap-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NextLink
                  className="text-sm font-medium hover:underline hover:opacity-70"
                  href={item.href}
                >
                  {item.name}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          <AuthGuard
            loggedIn={
              <>
                <HeaderCartBtn />
                <UserMenuitem />
              </>
            }
            loggedOut={
              <NextLink
                className="text-sm font-medium hover:underline hover:opacity-70"
                href={APP_ROUTES.login}
              >
                Login
              </NextLink>
            }
          />
        </div>
      </div>
    </Header>
  );
};
