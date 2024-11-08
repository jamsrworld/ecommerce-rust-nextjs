import { Divider, Header, Menu, MenuItem, Typography } from "@jamsr-ui/react";
import { HeaderTitle } from "./header-title";

export const AppHeader = () => {
  return (
    <Header className="flex items-center justify-between bg-background px-4">
      <HeaderTitle />
      <Menu
        offset={4}
        trigger={
          <button
            type="button"
            className="size-12 rounded-full bg-content2"
          >
            Me!
          </button>
        }
      >
        <div className="p-2">
          <Typography
            as="p"
            className="font-bold"
          >
            Hola, Admin
          </Typography>
          <Typography
            as="p"
            className="text-foreground-secondary"
          >
            Super Admin
          </Typography>
        </div>
        <Divider className="mb-2" />
        <MenuItem>Profile</MenuItem>
        <MenuItem className="ui-hover:bg-danger">Logout</MenuItem>
      </Menu>
    </Header>
  );
};
