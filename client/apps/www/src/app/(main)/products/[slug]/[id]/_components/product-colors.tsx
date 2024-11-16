"use client";

import { type Product } from "@/client";
import { Tooltip, Typography } from "@jamsr-ui/react";
import { m } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";
import Img1 from "../assets/images/1.jpg";
import Img2 from "../assets/images/2.jpg";
import Img3 from "../assets/images/3.jpg";
import Img4 from "../assets/images/4.jpg";
import Img5 from "../assets/images/5.jpg";
import Img6 from "../assets/images/6.jpg";
import { ProductAvailableColorsDrawer } from "./product-colors-drawer";

const colorsItemList = [
  {
    thumbnail: Img1,
    color: "Black",
  },
  {
    thumbnail: Img2,
    color: "Blue",
  },
  {
    thumbnail: Img3,
    color: "Green",
  },
  {
    thumbnail: Img4,
    color: "Red",
  },
  {
    thumbnail: Img5,
    color: "Yellow",
  },
  {
    thumbnail: Img6,
    color: "Orange",
  },
  {
    thumbnail: Img1,
    color: "Black",
  },
  {
    thumbnail: Img2,
    color: "Blue",
  },
  {
    thumbnail: Img3,
    color: "Green",
  },
  {
    thumbnail: Img4,
    color: "Red",
  },
  {
    thumbnail: Img5,
    color: "Yellow",
  },
  {
    thumbnail: Img6,
    color: "Orange",
  },
];

type Props = Pick<Product, "title">;

export const ProductColors = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const layoutId = useId();
  return (
    <section className="flex flex-col gap-1">
      <div className="flex justify-between">
        <Typography
          className="text-foreground-secondary"
          as="h6"
          variant="paragraph2"
        >
          Color: Green
        </Typography>
        <ProductAvailableColorsDrawer
          {...props}
          images={colorsItemList}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {colorsItemList.map((item, index) => {
          const { color, thumbnail } = item;
          const isSelected = index === activeIndex;
          return (
            <Tooltip
              title={color}
              key={index}
            >
              <button
                type="button"
                className="relative shrink-0 rounded"
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  alt={color}
                  className="max-h-24 w-auto rounded-inherit"
                  src={thumbnail}
                />
                {isSelected && (
                  <m.div
                    layoutId={layoutId}
                    className="absolute inset-0 z-10 size-full rounded-inherit border-2 border-black"
                  />
                )}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
};
