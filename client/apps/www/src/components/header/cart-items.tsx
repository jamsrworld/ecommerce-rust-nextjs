import { Typography } from "@jamsr-ui/react";
import Image from "next/image";
import ProductImg from "./cart-item.jpg";

const products = [
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
];

export const CartItems = () => {
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <Image
              src={product.thumbnail}
              alt="product"
              className="size-24 rounded object-cover"
            />
            <div>
              <Typography
                as="h6"
                variant="h6"
                className="font-bold"
              >
                {product.title}
              </Typography>
              <Typography
                as="p"
                variant="body1"
                className="text-foreground-secondary"
              >
                1 x $ 99.99
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};
