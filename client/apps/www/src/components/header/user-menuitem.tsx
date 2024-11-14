"use client";

import { APP_ROUTES } from "@/config/routes";
import { Button, Menu, MenuItem } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { UserIcon } from "@repo/icons";

export const UserMenuitem = () => {
  return (
    <Menu
      trigger={
        <Button
          isIconOnly
          variant="light"
          color="primary"
        >
          <UserIcon />
        </Button>
      }
    >
      <MenuItem
        as={NextLink}
        href={APP_ROUTES.profile}
      >
        Profile
      </MenuItem>
      <MenuItem
        as={NextLink}
        href={APP_ROUTES.logout}
        prefetch={false}
      >
        Logout
      </MenuItem>
    </Menu>
  );
};
