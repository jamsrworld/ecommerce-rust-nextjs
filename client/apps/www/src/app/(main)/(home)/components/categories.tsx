import { Typography } from "@jamsr-ui/react";
import Image, { type ImageProps } from "next/image";
import GlassesImg from "../assets/categories/glasses.jpg";
import HatsImg from "../assets/categories/hats.jpg";
import JacketsImg from "../assets/categories/jackets.jpg";
import JeansImg from "../assets/categories/jeans.jpg";
import PulloversImg from "../assets/categories/pullovers.jpg";
import SneakersImg from "../assets/categories/sneakers.jpg";
import SocksImg from "../assets/categories/socks.jpg";
import SuitsImg from "../assets/categories/suits.jpg";
import TShirtsImg from "../assets/categories/t-shirts.jpg";
import WatchesImg from "../assets/categories/watches.jpg";

const items: {
  category: string;
  image: ImageProps["src"];
}[] = [
  {
    category: "Sneakers",
    image: SneakersImg,
  },
  {
    category: "Jeans",
    image: JeansImg,
  },
  {
    category: "Hats",
    image: HatsImg,
  },
  {
    category: "Pullovers",
    image: PulloversImg,
  },
  {
    category: "T-Shirts",
    image: TShirtsImg,
  },
  {
    category: "Suits",
    image: SuitsImg,
  },
  {
    category: "Watches",
    image: WatchesImg,
  },
  {
    category: "Socks",
    image: SocksImg,
  },
  {
    category: "Glasses",
    image: GlassesImg,
  },
  {
    category: "Jackets",
    image: JacketsImg,
  },
];

export const CategoriesSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <Typography
        as="h3"
        variant="body3"
      >
        Categories
      </Typography>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-10">
        {items.map((item, index) => {
          const { category, image } = item;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center overflow-hidden bg-content2 pb-4"
            >
              <Image
                src={image}
                alt={category}
              />
              <Typography as="h3">{category}</Typography>
            </div>
          );
        })}
      </div>
    </section>
  );
};
