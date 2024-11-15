import { type CartItemsWithProduct } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { Typography } from "@jamsr-ui/react";
import { NextImage, NextLink } from "@repo/components/next";
import { fPrice } from "@repo/utils/number";
import { CartDeleteItem } from "./cart-delete-item";
import { CartEmpty } from "./cart-empty";
import { QuantityCounter } from "./quantity-counter";

type Props = {
  data: CartItemsWithProduct[];
  onClose: () => void;
};

export const CartItems = (props: Props) => {
  const { data, onClose } = props;
  if (data.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }
  return (
    <div className="flex flex-col gap-0.5 bg-background-secondary">
      {data.map((item, index) => {
        const thumbnail = item.product.images[0]!;
        const {
          product: { title, price, color, size, id, slug },
          quantity,
          id: cartId,
        } = item;
        const productUrl = APP_ROUTES.products.view(id, slug);
        return (
          <div
            key={index}
            className="flex h-[130px] items-center gap-4 bg-background"
          >
            <NextLink
              href={productUrl}
              className="shrink-0"
            >
              <NextImage
                image={thumbnail}
                alt="product"
                className="h-auto w-24 shrink-0 object-cover"
              />
            </NextLink>
            <div className="grow pr-2">
              <Typography
                as={NextLink}
                className="line-clamp-1 font-bold"
                variant="paragraph2"
                href={productUrl}
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
        );
      })}
    </div>
  );
};
