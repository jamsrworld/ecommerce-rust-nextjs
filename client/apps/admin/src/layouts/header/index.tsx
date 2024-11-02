import { Avatar, Header, Menu, MenuItem } from "@jamsr-ui/react";
import { HeaderTitle } from "./header-title";

export const AppHeader = () => {
  return (
    <Header className="flex items-center justify-between bg-background px-4">
      <HeaderTitle />
      <Menu
        trigger={
          <button type="button">
            <Avatar
              alt="user"
              src=""
            />
          </button>
        }
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Header>
  );
};
