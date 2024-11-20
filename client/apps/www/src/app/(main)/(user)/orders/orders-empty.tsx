import { APP_ROUTES } from "@/config/routes";
import { Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import Image from "next/image";
import OrdersEmptyImg from "~/orders-empty.png";

export const OrdersEmpty = () => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4 text-center">
      <Image
        src={OrdersEmptyImg}
        alt="empty cart"
        className="size-40"
      />
      <div>
        <Typography
          as="h3"
          variant="h4"
        >
          No Orders
        </Typography>
        <Typography
          as="p"
          className="text-foreground-secondary"
          variant="paragraph2"
        >
          Purchase some products to see them here
        </Typography>
      </div>
      <Link
        color="primary"
        as={NextLink}
        href={APP_ROUTES.home}
        underline="always"
      >
        Continue Shopping
      </Link>
    </div>
  );
};
