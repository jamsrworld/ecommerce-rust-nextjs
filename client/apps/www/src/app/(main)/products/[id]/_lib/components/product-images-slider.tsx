"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";
import Image from "next/image";
import { imagesItems } from "./product-images";

export const ProductImagesSlider = () => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return null;
  return (
    <div>
      <Button onClick={onOpen}>Open</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // className=""
      >
        <ul>
          {imagesItems.map((item, index) => {
            return (
              <li key={index}>
                <Image
                  alt="product image"
                  src={item.item}
                />
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
};
