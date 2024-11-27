"use client";

import { type Product } from "@/client";
import { Drawer } from "@jamsr-ui/react";
import { ProductImagesSlider } from "./slider";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  activeIndex: number;
} & Pick<Product, "images">;

export const ProductImagesSliderDialog = (props: Props) => {
  const { isOpen, onOpenChange, onClose, activeIndex, images } = props;
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      anchor="bottom"
      className="relative overflow-hidden"
      closeButton={null}
    >
      <ProductImagesSlider
        activeIndex={activeIndex}
        images={images}
        onClose={onClose}
      />
    </Drawer>
  );
};
