"use client";

import { Button, Divider } from "@jamsr-ui/react";
import { cn } from "@jamsr-ui/utils";
import { ChevronDownIcon } from "@repo/icons/chevron";
import { AnimatePresence, m } from "framer-motion";
import React, { useState } from "react";

export type SidebarItemType = {
  heading: string;
  icon?: React.ReactNode;
  path: "/";
  items?: SidebarItemType[];
  className?: string;
};

export const SidebarItem = (props: SidebarItemType) => {
  const { heading, icon, items, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const hasItems = items && items.length > 0;
  return (
    <li className={cn("overflow-hidden", className)}>
      <Button
        variant="light"
        fullWidth
        className="justify-start hover:bg-content2"
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
