import { type CheckoutItemsWithProduct } from "@/client";
import { Typography } from "@jamsr-ui/react";
import { NextImage } from "@repo/components/next";
import { fPrice } from "@repo/utils/number";

type Props = { items: CheckoutItemsWithProduct[] };

export const CheckoutItems = (props: Props) => {
  const { items } = props;
  return (
    <div className="flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden py-4">
      {items.map((item, idx) => {
        const {
          quantity,
          product: { title, brand, color, size, price, images },
        } = item;
        const thumbnail = images[0]!;
        return (
          <div
            key={idx}
            className="flex gap-4"
          >
            <div className="relative">
              <NextImage
                image={thumbnail}
                alt={title}
                className="max-h-20 w-auto rounded"
              />
              <div className="absolute right-0 top-0 grid size-5 -translate-y-1/2 translate-x-1/2 place-content-center rounded-full bg-black/70 text-xs font-bold text-white">
                {quantity}
              </div>
            </div>
            <div className="grow">
              <Typography
                as="h3"
                className="line-clamp-2"
                variant="paragraph2"
              >
                {title}
              </Typography>
              <Typography
                as="p"
                className="text-foreground-secondary"
                variant="paragraph2"
              >
                {size} {color} {brand}
              </Typography>
            </div>
            <Typography
              as="h3"
              className="pl-4"
            >
              {fPrice(price)}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
