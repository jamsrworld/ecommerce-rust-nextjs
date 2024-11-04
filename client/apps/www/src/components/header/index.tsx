import { APP_ROUTES } from "@/config/routes";
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
      <nav className="max-md:hidden">
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
          href={APP_ROUTES.profile}
          color="primary"
        >
          <UserIcon />
        </Button>
      </div>
    </Header>
  );
};
