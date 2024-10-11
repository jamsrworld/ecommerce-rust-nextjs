"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Divider, Drawer, Typography } from "@jamsr-ui/react";
import { CartIcon, CrossCircleIcon } from "@repo/icons";
import { CartItems } from "./cart-items";

export const CartDrawer = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button
        onClick={onOpen}
        variant="outlined"
        isIconOnly
      >
        <CartIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="flex w-full flex-col md:min-w-[700px]"
      >
        <div className="flex items-center justify-between p-4 md:justify-center">
          <Typography
            as="h1"
            variant="h3"
            className="text-center uppercase"
          >
            Cart
          </Typography>
          <Button
            isIconOnly
            onClick={onClose}
            className="text-foreground md:hidden"
            variant="light"
          >
            <CrossCircleIcon />
          </Button>
        </div>
        <Divider />
        <div className="grow overflow-y-auto overflow-x-hidden">
          <CartItems />
        </div>
        <Divider className="pb-4" />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Typography
              variant="h6"
              as="p"
              className="uppercase"
            >
              Total
            </Typography>
            <Typography
              variant="h4"
              as="p"
            >
              $699.99
            </Typography>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <Button
              size="lg"
              fullWidth
              variant="outlined"
            >
              Continue Shopping
            </Button>
            <Button
              size="lg"
              fullWidth
            >
              Checkout
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
