"use client";

import { logout } from "@/app/(auth)/logout/actions";
import { MenuItem } from "@jamsr-ui/react";
import { LoginIcon } from "@repo/icons";
import { useRouter } from "next/navigation";

export const MenuLogoutItem = () => {
  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    await logout();
    router.refresh();
  };

  return (
    <MenuItem
      startContent={
        <LoginIcon
          width={20}
          height={20}
          className="rotate-180"
        />
      }
      onClick={handleClick}
      className="hover:bg-danger hover:text-white"
    >
      Logout
    </MenuItem>
  );
};
