"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import Image from "next/image";
import { useState } from "react";
import { imagesItems } from "./image";
import { ProductImagesSlider } from "./product-images-slider";

export const ProductImages = () => {
  const { isOpen, onClose, onOpen, setIsOpen } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleOnClick = (idx: number) => {
    onOpen();
    setActiveIndex(idx);
  };
  return (
    <div>
      <ProductImagesSlider
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onClose={onClose}
        activeIndex={activeIndex}
      />
      <ul className="grid grid-cols-2 gap-2">
        {imagesItems.map((item, idx) => {
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => handleOnClick(idx)}
              >
                <Image
                  alt="product image"
                  src={item.item}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
