"use client";

import { Button, Divider } from "@jamsr-ui/react";
import { cn } from "@jamsr-ui/utils";
import { ChevronDownIcon } from "@repo/icons/chevron";
import { AnimatePresence, m } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export type SidebarItemType = {
  heading: string;
  icon?: React.ReactNode;
  path: LinkProps<never>["href"];
  items?: SidebarItemType[];
  className?: string;
};

export const SidebarItem = (props: SidebarItemType) => {
  const { heading, icon, items, path, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const hasItems = items && items.length > 0;
  const Component = items?.length ? undefined : Link;
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <li className={cn("overflow-hidden", className)}>
      <Button
        as={Component}
        href={path}
        variant="light"
        fullWidth
        className={cn("justify-start hover:bg-content2", {
          "bg-content3": isActive,
        })}
        onClick={() => setIsOpen(!isOpen)}
        disableRipple
      >
        {icon}
        
        {heading}
        {hasItems && (
          <m.span
            className="ml-auto"
            transition={{ duration: 0.2 }}
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            <ChevronDownIcon />
          </m.span>
        )}
      </Button>
      <AnimatePresence>
        {isOpen && items && items.length > 0 && (
          <m.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative ml-2"
          >
            <Divider
              orientation="vertical"
              className="absolute left-0 top-0 mt-2 h-full"
            />
            {items.map((item) => {
              return (
                <SidebarItem
                  key={item.heading}
                  {...item}
                  className="px-2"
                />
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
