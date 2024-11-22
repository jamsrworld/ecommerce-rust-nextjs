"use client";

import { Link } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cn } from "@repo/utils/class-name";
import { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  href: LinkProps<never>["href"];
};

export const ProfileLinkItem = (props: Props) => {
  const { title, href } = props;
  const pathname = usePathname();
  const isActive = typeof href === "string" && pathname.includes(href);
  return (
    <Link
      as={NextLink}
      href={href}
      className={cn("text-base font-medium text-foreground-secondary", {
        "text-primary underline": isActive,
      })}
    >
      {title}
    </Link>
  );
};
