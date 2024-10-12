"use client";

import { Tooltip, Typography } from "@jamsr-ui/react";
import { m } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";
import Img1 from "../assets/images/1.jpg";
import Img2 from "../assets/images/2.jpg";
import Img3 from "../assets/images/3.jpg";
import Img4 from "../assets/images/4.jpg";

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
];

export const SelectColors = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const layoutId = useId();
  return (
    <section className="flex flex-col gap-1">
      <Typography
        className="text-foreground-secondary"
        as="h6"
      >
        Select Color
      </Typography>
      <div className="flex gap-2">
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
                className="relative rounded-md"
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  alt={color}
                  className="max-h-20 w-auto rounded-inherit"
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
