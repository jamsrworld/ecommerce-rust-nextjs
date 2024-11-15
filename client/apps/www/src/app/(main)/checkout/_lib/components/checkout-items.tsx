import { type CheckoutItemsWithProduct } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { Typography } from "@jamsr-ui/react";
import { NextImage, NextLink } from "@repo/components/next";
import { fPrice } from "@repo/utils/number";

type Props = { items: CheckoutItemsWithProduct[] };

export const CheckoutItems = (props: Props) => {
  const { items } = props;
  return (
    <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden py-4">
      {items.map((item, idx) => {
        const {
          quantity,
          product: { title, brand, color, size, price, images, id, slug },
        } = item;
        const thumbnail = images[0]!;
        const productUrl = APP_ROUTES.products.view(id, slug);
        return (
          <div
            key={idx}
            className="flex gap-4"
          >
            <NextLink
              href={productUrl}
              className="relative shrink-0"
            >
              <div className="flex h-[90px] w-16 items-center overflow-hidden rounded border-[1.5px] border-divider">
                <NextImage
                  image={thumbnail}
                  alt={title}
                  className="rounded-inherit"
                />
              </div>
              <div className="absolute right-0 top-0 grid size-5 -translate-y-1/2 translate-x-1/2 place-content-center rounded-full bg-black/70 text-xs font-bold text-white">
                {quantity}
              </div>
            </NextLink>
            <div className="grow">
              <Typography
                as={NextLink}
                className="line-clamp-2"
                variant="paragraph2"
                href={productUrl}
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
              variant="paragraph2"
            >
              {fPrice(price)}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
