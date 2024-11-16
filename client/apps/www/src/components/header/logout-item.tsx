"use client";

import { logout } from "@/app/(auth)/logout/actions";
import { MenuItem } from "@jamsr-ui/react";
import { useRouter } from "next/navigation";

export const LogoutItem = () => {
  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
    router.refresh();
  };

  return <MenuItem onClick={handleClick}>Logout</MenuItem>;
};
