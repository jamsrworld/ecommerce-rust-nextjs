import { Header } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { CartIcon, UserIcon } from "@repo/icons";
import { AppLogo } from "./app-logo";

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
    <Header
      hideOnScroll
      className="justify-between pr-3"
    >
      <AppLogo />
      <nav>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NextLink
                className="text-sm font-medium uppercase"
                href={item.href}
              >
                {item.name}
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mr-6 flex items-center gap-4">
        <CartIcon />
        <UserIcon />
      </div>
    </Header>
  );
};
