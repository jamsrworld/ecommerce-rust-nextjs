"use client";

import { APP_ROUTES } from "@/config/routes";
import { Button, Repeater } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";

type Props = {
  total: number;
  activePage: number;
};

export const OrderPagination = (props: Props) => {
  const { total, activePage } = props;
  return (
    <div className="mx-auto flex gap-2">
      <Repeater count={total}>
        {(index) => (
          <Button
            as={NextLink}
            href={`${APP_ROUTES.orders.root}?page=${index + 1}`}
            isIconOnly
            variant={activePage === index + 1 ? "solid" : "light"}
          >
            {index + 1}
          </Button>
        )}
      </Repeater>
    </div>
  );
};
