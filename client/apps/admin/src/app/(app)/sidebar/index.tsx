import { sidebarLinkList } from "./paths";
import { SidebarGroupItem } from "./sidebar-group-item";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-dvh w-full max-w-[280px] flex-col gap-4 overflow-y-auto overflow-x-hidden border-r p-4">
      {sidebarLinkList.map((item) => {
        const { heading, items } = item;
        return (
          <SidebarGroupItem
            key={heading}
            items={items}
            heading={heading}
          />
        );
      })}
    </aside>
  );
};
