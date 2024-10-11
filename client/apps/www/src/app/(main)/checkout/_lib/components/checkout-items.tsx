import { Typography } from "@jamsr-ui/react";
import Image, { type StaticImageData } from "next/image";
import Img1 from "../assets/checkout-1.webp";
import Img2 from "../assets/checkout-2.webp";

const items: {
  title: string;
  info: string;
  thumbnail: StaticImageData;
  count: number;
  price: number;
}[] = [
  {
    title: "terra-e-man",
    info: "Black Night/40",
    count: 2,
    thumbnail: Img1,
    price: 27800,
  },
  {
    title: "vola-female",
    info: "Prune /36",
    count: 11,
    thumbnail: Img2,
    price: 12900,
  },
];

export const CheckoutItems = () => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2 py-4"
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            className="size-12 rounded"
          />
          <div className="grow">
            <Typography as="h3">{item.title}</Typography>
            <Typography
              as="p"
              className="text-foreground-secondary"
            >
              {item.info}
            </Typography>
          </div>
          <Typography as="h3">${item.price}</Typography>
        </div>
      ))}
    </div>
  );
};
