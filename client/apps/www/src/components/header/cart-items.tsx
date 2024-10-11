import { Button, Divider, Typography } from "@jamsr-ui/react";
import Image from "next/image";
import ProductImg from "./cart-item.jpg";

const products = [
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
  {
    title: "Terra -E",
    thumbnail: ProductImg,
  },
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
          <>
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
              <div className="flex items-center gap-1">
                <Button
                  isIconOnly
                  variant="link"
                  className="text-foreground"
                >
                  -
                </Button>
                <div className="grid size-8 place-content-center border-[1.5px] border-divider p-1">
                  2
                </div>
                <Button
                  isIconOnly
                  variant="link"
                  className="text-foreground"
                >
                  +
                </Button>
              </div>
              <div>
                <Typography
                  as="p"
                  variant="h3"
                >
                  $293
                </Typography>
              </div>
              <div>
                <Button
                  variant="link"
                  color="danger"
                  disableRipple
                >
                  DELETE
                </Button>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
    </div>
  );
};
