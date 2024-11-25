import { APP_ROUTES } from "@/config/routes";
import { type LinkProps } from "next/link";
import React from "react";
import { ProfileLinkItem } from "./_lib/components/link-item";
import { UserGreeting } from "./_lib/components/user-greeting";

type Props = {
  children: React.ReactNode;
};

const items: { title: string; href: LinkProps<never>["href"] }[] = [
  {
    title: "Orders",
    href: APP_ROUTES.orders.root,
  },
  {
    title: "Profile",
    href: APP_ROUTES.profile,
  },
  {
    title: "Addresses",
    href: APP_ROUTES.addresses,
  },
];

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="container flex max-w-screen-2xl flex-col gap-4 p-2 md:flex-row md:gap-8 md:py-12">
      <aside className="w-full max-w-sm">
        <UserGreeting />
        <ul className="flex gap-2 md:flex-col">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <ProfileLinkItem
                  title={item.title}
                  href={item.href}
                />
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="max-w-screen-md grow">{children}</div>
    </div>
  );
};

export default Layout;
