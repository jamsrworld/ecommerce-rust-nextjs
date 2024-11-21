"use client";

import { logout } from "@/app/(auth)/logout/actions";
import { MenuItem } from "@jamsr-ui/react";
import { LoginIcon } from "@repo/icons";
import { useRouter } from "next/navigation";

export const LogoutItem = () => {
  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
    >
      Logout
    </MenuItem>
  );
};
