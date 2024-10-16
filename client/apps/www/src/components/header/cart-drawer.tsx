"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Divider, Drawer, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { CartIcon, CloseIcon } from "@repo/icons";
import { m } from "framer-motion";
import { CartItems } from "./cart-items";

export const CartDrawer = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   if (isOpen) onClose();
  // }, [isOpen, onClose, pathname]);

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
        className="flex w-full flex-col md:min-w-[500px]"
      >
        <div className="flex items-center justify-between p-4">
          <div className="hidden md:block" />
          <Typography
            as="h1"
            variant="h3"
            className="text-center uppercase"
          >
            Cart
          </Typography>
          <m.div
            initial={{
              scale: 1,
            }}
            whileHover={{
              scale: 1.3,
              rotate: 90,
            }}
          >
            <Button
              isIconOnly
              onClick={onClose}
              variant="light"
              rounded
            >
              <CloseIcon className="[&>path]:stroke-[3]" />
            </Button>
          </m.div>
        </div>
        <Divider />
        <div className="grow overflow-y-auto overflow-x-hidden">
          <CartItems />
        </div>
        <Divider />
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Typography
                variant="h6"
                as="div"
                className="uppercase"
              >
                Total
              </Typography>
              <Typography
                as="span"
                className="text-foreground-secondary"
              >
                {" "}
                (8 items)
              </Typography>
            </div>
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
              as={NextLink}
              href="/checkout"
              color="primary"
            >
              Place Order
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="outlined"
              color="primary"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
