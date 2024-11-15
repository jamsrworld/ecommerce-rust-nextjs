"use client";

import { type GetCartDataResponse } from "@/client";
import { getCartDataOptions } from "@/client/@tanstack/react-query.gen";
import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Divider, Drawer, Typography } from "@jamsr-ui/react";
import { CartIcon, CloseIcon } from "@repo/icons";
import { fPrice } from "@repo/utils/number";
import { useQuery } from "@tanstack/react-query";
import { m } from "framer-motion";
import { usePathname } from "next/navigation";
import { startTransition, useEffect } from "react";
import { CartItems } from "./cart-items";
import { CartPlaceOrder } from "./cart-place-order";

type Props = { initialData: GetCartDataResponse };

export const HeaderCartDrawer = (props: Props) => {
  const { initialData } = props;
  const { data } = useQuery({
    ...getCartDataOptions(),
    initialData,
  });

  const { isOpen, setIsOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      onClose();
    });
  }, [onClose, pathname]);
  return (
    <div>
      <Button
        onClick={onOpen}
        variant="light"
        isIconOnly
        color="primary"
      >
        <CartIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="flex h-dvh w-full flex-col bg-background"
        size="lg"
      >
        <div className="flex grow flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-between p-2 md:p-4">
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
                isRounded
              >
                <CloseIcon />
              </Button>
            </m.div>
          </div>
          <Divider

            classNames={{
              divider: "bg-background-secondary h-[2px]",
            }}
          />
          <CartItems
            onClose={onClose}
            data={data.items}
          />
        </div>
        <Divider
          classNames={{
            divider: "bg-background-secondary h-[2px]",
          }}
        />
        {data.count > 0 && (
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
                  ({data.count} items)
                </Typography>
              </div>
              <Typography
                variant="h4"
                as="p"
              >
                {fPrice(data.totalAmount)}
              </Typography>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <CartPlaceOrder onClose={onClose} />
              <Button
                size="lg"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
