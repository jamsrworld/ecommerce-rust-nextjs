import { type LinkProps } from "next/link";
import React from "react";
import { ProfileLinkItem } from "./_lib/components/link-item";

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
    <div className="container flex max-w-screen-2xl py-24">
      <div className="w-full max-w-sm">
        <ul className="flex flex-col gap-2">
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
      </div>
      <div className="max-w-screen-md grow">{children}</div>
    </div>
  );
};

export default Layout;
