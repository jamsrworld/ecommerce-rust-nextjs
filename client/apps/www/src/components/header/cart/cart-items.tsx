import { type CartItemsWithProduct } from "@/client";
import { Typography } from "@jamsr-ui/react";
import { NextImage } from "@repo/components/next";
import { fPrice } from "@repo/utils/number";
import React from "react";
import { CartDeleteItem } from "./cart-delete-item";
import { QuantityCounter } from "./quantity-counter";

type Props = {
  data: CartItemsWithProduct[];
};

export const CartItems = (props: Props) => {
  const { data } = props;
  return (
    <div className="flex flex-col gap-0.5 bg-background-secondary">
      {data.map((item, index) => {
        const thumbnail = item.product.images[0]!;
        const {
          product: { title, price, color, size },
          quantity,
          id: cartId,
        } = item;
        return (
          <React.Fragment key={index}>
            <div
              key={index}
              className="flex items-center gap-4 bg-background"
            >
              <NextImage
                image={thumbnail}
                alt="product"
                className="size-32 object-cover"
              />
              <div className="grow pr-2">
                <Typography
                  as="h6"
                  className="line-clamp-1 font-bold"
                  variant="paragraph2"
                >
                  {title}
                </Typography>

                <div className="mt-2 flex items-center justify-between">
                  <Typography
                    as="p"
                    className="text-foreground-secondary"
                    variant="paragraph2"
                  >
                    {color} / {size}
                  </Typography>
                  <QuantityCounter defaultValue={quantity} />
                  <CartDeleteItem cartId={cartId} />
                </div>
                <Typography
                  as="p"
                  variant="h6"
                >
                  {fPrice(price)}
                </Typography>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
