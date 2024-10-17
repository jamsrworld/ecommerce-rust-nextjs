import { Button, Header } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { UserIcon } from "@repo/icons";
import { AppLogo } from "../app-logo";
import { CartDrawer } from "./cart-drawer";

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
    <Header className="shrink-0 justify-between pr-3">
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
        <CartDrawer />
        <Button
          isIconOnly
          variant="outlined"
          as={NextLink}
          href="/user/profile"
        >
          <UserIcon />
        </Button>
      </div>
    </Header>
  );
};
