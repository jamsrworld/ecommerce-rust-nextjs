"use client";

import { type Product } from "@/client";
import { useDisclosure } from "@jamsr-ui/hooks";
import { NextImage } from "@repo/components/next";
import { YoutubeEmbed } from "@repo/components/youtube-embed";
import { useState } from "react";
import { MobileImageSlider } from "./mobile-image-slider";
import { ProductImagesSlider } from "./product-images-slider";

type Props = Pick<Product, "images" | "video">;

export const ProductImages = (props: Props) => {
  const { isOpen, onClose, onOpen, setIsOpen } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleOnClick = (idx: number) => {
    onOpen();
    setActiveIndex(idx);
  };
  const { images, video } = props;
  const { url } = video;
  return (
    <div>
      <ProductImagesSlider
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onClose={onClose}
        activeIndex={activeIndex}
        images={images}
      />
      <MobileImageSlider images={images} />
      <ul className="grid grid-cols-2 gap-2 max-md:hidden">
        {images.map((item, idx) => {
          return (
            <li
              key={idx}
              className="leading-0"
            >
              <button
                type="button"
                onClick={() => handleOnClick(idx)}
              >
                <NextImage
                  alt="product image"
                  placeholder="blur"
                  image={item}
                />
              </button>
            </li>
          );
        })}
        {url && (
          <li className="leading-0">
            <YoutubeEmbed src={url} />
          </li>
        )}
      </ul>
    </div>
  );
};
