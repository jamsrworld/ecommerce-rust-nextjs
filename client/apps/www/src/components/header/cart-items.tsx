import { Button, Divider, Typography } from "@jamsr-ui/react";
import Image from "next/image";
import React from "react";
import ProductImg from "./cart-item.jpg";
import { QuantityCounter } from "./quantity-counter";

const products = [
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    thumbnail: ProductImg,
  },
];

export const CartItems = () => {
  return (
    <div>
      {products.map((product, index) => {
        return (
          <React.Fragment key={index}>
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <Image
                src={product.thumbnail}
                alt="product"
                className="size-32 object-cover"
              />
              <div className="grow">
                <Typography
                  as="h6"
                  className="line-clamp-1 font-bold"
                  variant="paragraph2"
                >
                  {product.title}
                </Typography>

                <div className="mt-2 flex items-center justify-between">
                  <Typography
                    as="p"
                    className="text-foreground-secondary"
                    variant="paragraph2"
                  >
                    Blue / Large
                  </Typography>
                  <QuantityCounter />
                  <Button
                    variant="text"
                    color="danger"
                    disableRipple
                  >
                    DELETE
                  </Button>
                </div>

                <Typography
                  as="p"
                  variant="h6"
                >
                  $293
                </Typography>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};
