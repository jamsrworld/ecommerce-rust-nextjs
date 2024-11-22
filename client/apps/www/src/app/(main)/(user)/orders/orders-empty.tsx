import { EmptyContent } from "@/components/empty-content";
import { APP_ROUTES } from "@/config/routes";
import { Link } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import OrdersEmptyImg from "~/empty-order.webp";

export const OrdersEmpty = () => {
  return (
    <div className="flex flex-col items-center">
      <EmptyContent
        image={OrdersEmptyImg}
        heading="No Orders"
        subHeading="Start shopping to fill this space with your products!"
      />
      <Link
        color="primary"
        as={NextLink}
        href={APP_ROUTES.home}
        underline="always"
        className="font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
};
