import { AppLogo } from "@/components/app-logo";
import { AuthGuard } from "@/components/auth-guard";
import { APP_ROUTES } from "@/config/routes";
import { Header } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { HeaderCartBtn } from "./cart/cart-btn";
import { HeaderSearchItem } from "./header-search";
import { UserProfileMenu } from "./user-menu";
import { ThemeSwitcher } from "./user-menu/theme-switcher";

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
        <div className="flex items-center gap-1">
          <HeaderSearchItem />
          <AuthGuard
            loggedIn={
              <>
                <HeaderCartBtn />
                <UserProfileMenu />
              </>
            }
            loggedOut={
              <div className="flex items-center gap-1">
                <ThemeSwitcher />
                <NextLink
                  className="text-sm font-medium hover:underline hover:opacity-70"
                  href={APP_ROUTES.login}
                >
                  Login
                </NextLink>
              </div>
            }
          />
        </div>
      </div>
    </Header>
  );
};
