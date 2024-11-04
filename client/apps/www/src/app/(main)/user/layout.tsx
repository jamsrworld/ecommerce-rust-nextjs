import { type LinkProps } from "next/link";
import React from "react";
import { ProfileLinkItem } from "./_lib/components/link-item";
import { UserGreeting } from "./_lib/components/user-greeting";

type Props = {
  children: React.ReactNode;
};

const items: { title: string; href: LinkProps<never>["href"] }[] = [
  {
    title: "Profile",
    href: "/user/profile",
  },
  {
    title: "Orders",
    href: "/user/orders",
  },
  {
    title: "Addresses",
    href: "/user/addresses",
  },
];

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="container flex max-w-screen-2xl flex-col gap-8 p-2 md:flex-row md:py-24">
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
