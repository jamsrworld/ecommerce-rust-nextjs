import { APP_ROUTES } from "@/config/routes";
import { Button, Header, Menu, MenuItem } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { UserIcon } from "@repo/icons";
import { AppLogo } from "../app-logo";
import { HeaderCartBtn } from "./cart/cart-btn";

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
      className="shrink-0 justify-between border-none px-1 max-md:h-12 md:px-2"
    >
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
      <div className="flex items-center">
        <HeaderCartBtn />
        <Menu
          trigger={
            <Button
              isIconOnly
              variant="light"
              color="primary"
            >
              <UserIcon />
            </Button>
          }
        >
          <MenuItem
            as={NextLink}
            href={APP_ROUTES.profile}
          >
            Profile
          </MenuItem>
          <MenuItem
            as={NextLink}
            href={APP_ROUTES.logout}
            prefetch={false}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Header>
  );
};
