import { Typography } from "@jamsr-ui/react";
import { SidebarItem, type SidebarItemType } from "./sidebar-item";

export type SidebarGroupItemType = {
  heading: string;
  items: SidebarItemType[];
};

export const SidebarGroupItem = (props: SidebarGroupItemType) => {
  const { heading, items } = props;
  return (
    <div className="flex flex-col gap-2">
      <Typography
        className="font-bold uppercase text-foreground-secondary"
        as="h6"
        variant="caption"
      >
        {heading}
      </Typography>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          return (
            <SidebarItem
              key={item.heading}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};
