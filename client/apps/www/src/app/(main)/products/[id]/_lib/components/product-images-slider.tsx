"use client";

import { Button, Drawer } from "@jamsr-ui/react";
import { CloseIcon } from "@repo/icons";
import { m } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { imagesItems } from "./image";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  activeIndex: number;
};

export const ProductImagesSlider = (props: Props) => {
  const { isOpen, onOpenChange, onClose, activeIndex } = props;
  const ref = useCallback(
    (idx: number, node: HTMLLIElement | null) => {
      if (activeIndex === idx && node) {
        setTimeout(() => {
          node.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });
        }, 500);
      }
    },
    [activeIndex],
  );

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      anchor="bottom"
      className="relative"
    >
      <m.div
        initial={{
          scale: 1.3,
        }}
        whileHover={{
          scale: 1.5,
          rotate: 90,
        }}
        className="absolute right-0 top-0"
      >
        <Button
          isIconOnly
          onClick={onClose}
          variant="light"
          rounded
          size="lg"
        >
          <CloseIcon className="[&>path]:stroke-[2]" />
        </Button>
      </m.div>
      <ul className="flex overflow-x-auto">
        {imagesItems.map((item, idx) => {
          return (
            <li
              key={idx}
              className="shrink-0"
              id={`img-li-${idx}`}
              ref={(node) => ref(idx, node)}
            >
              <Image
                alt="product image"
                src={item.item}
                className="h-dvh w-auto shrink-0"
              />
            </li>
          );
        })}
      </ul>
    </Drawer>
  );
};
