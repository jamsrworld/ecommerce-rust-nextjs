import { Typography } from "@jamsr-ui/react";
import Image, { type StaticImageData } from "next/image";
import Img1 from "../assets/checkout-1.jpg";
import Img2 from "../assets/checkout-2.jpg";

const items: {
  title: string;
  info: string;
  thumbnail: StaticImageData;
  count: number;
  price: number;
}[] = [
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title:
      "Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite Super Combed Cotton French Terry Solid Sweatshirt with Ribbed Cuffs - Graphite",
    info: "Blue / Large",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
];

export const CheckoutItems = () => {
  return (
    <div className="flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden py-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex gap-2"
        >
          <div className="relative w-44">
            <Image
              src={item.thumbnail}
              alt={item.title}
              className="max-h-20 w-auto rounded"
            />
            <div className="absolute right-0 top-0 grid size-5 -translate-y-1/2 translate-x-1/2 place-content-center rounded-full bg-black/70 text-xs font-bold text-white">
              3
            </div>
          </div>
          <div className="grow">
            <Typography
              as="h3"
              className="line-clamp-2"
              variant="paragraph2"
            >
              {item.title}
            </Typography>
            <Typography
              as="p"
              className="text-foreground-secondary"
              variant="paragraph2"
            >
              {item.info}
            </Typography>
          </div>
          <Typography
            as="h3"
            className="pl-4"
          >
            ${item.price}
          </Typography>
        </div>
      ))}
    </div>
  );
};
