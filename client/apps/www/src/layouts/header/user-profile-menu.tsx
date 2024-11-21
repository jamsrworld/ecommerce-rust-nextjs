import { AuthedUserData } from "@/app/_components/user";
import { APP_ROUTES } from "@/config/routes";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  UIStylesProvider,
} from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { AddressIcon, OrdersIcon, UserIcon } from "@repo/icons";
import { Suspense } from "react";
import AvatarIcon from "~/avatar.png";
import { LogoutItem } from "./logout-item";

export const UserProfileMenu = () => {
  return (
    <UIStylesProvider
      menuItem={{
        className: "py-2.5 font-medium",
      }}
    >
      <Menu
        trigger={
          <Button
            isIconOnly
            variant="light"
            color="primary"
            disableRipple
            isRounded
          >
            {/* <UserIcon /> */}
            <Avatar
              src={AvatarIcon}
              alt="user"
            />
          </Button>
        }
        className="min-w-[250px] p-2"
      >
        <MenuItem
          as={NextLink}
          href={APP_ROUTES.profile}
          startContent={
            <UserIcon
              width={20}
              height={20}
            />
          }
        >
          <div className="flex gap-1">
            My Profile{" "}
            <div className="text-foreground-secondary">
              <span>@</span>
              <Suspense>
                <AuthedUserData>{({ fullName }) => fullName}</AuthedUserData>
              </Suspense>
            </div>
          </div>
        </MenuItem>
        <MenuItem
          as={NextLink}
          href={APP_ROUTES.orders.root}
          startContent={
            <OrdersIcon
              width={20}
              height={20}
            />
          }
        >
          Orders
        </MenuItem>
        <MenuItem
          as={NextLink}
          href={APP_ROUTES.addresses}
          startContent={
            <AddressIcon
              width={20}
              height={20}
            />
          }
        >
          Addresses
        </MenuItem>
        <LogoutItem />
      </Menu>
    </UIStylesProvider>
  );
};
