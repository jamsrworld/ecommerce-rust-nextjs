"use client";

import { useCart } from "@/hooks/use-cart";
import { MenuItem } from "@jamsr-ui/react";
import { CartIcon } from "@repo/icons";

export const MenuCartItem = () => {
  const { onOpen } = useCart();
  const handleOnClick = () => {
    onOpen();
  };
  return (
    <MenuItem
      onClick={handleOnClick}
      startContent={
        <CartIcon
          width={20}
          height={20}
        />
      }
    >
      Cart
    </MenuItem>
  );
};
