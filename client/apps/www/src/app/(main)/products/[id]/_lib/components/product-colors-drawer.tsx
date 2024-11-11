/* eslint-disable tailwindcss/migration-from-tailwind-2 */

"use client";

import { type Product } from "@/client";
import { useDisclosure } from "@jamsr-ui/hooks";
import { Badge, Button, Drawer, Typography } from "@jamsr-ui/react";
import { NextImage } from "@repo/components/next";
import { CloseIcon } from "@repo/icons";
import { type StaticImageData } from "next/image";

type Props = Pick<Product, "title"> & {
  images: {
    thumbnail: StaticImageData;
    color: string;
  }[];
};

export const ProductAvailableColorsDrawer = (props: Props) => {
  const { images, title } = props;
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  return (
    <div>
      <Typography
        className="text-foreground-tertiary underline"
        as="button"
        variant="caption"
        onClick={onOpen}
      >
        Available Colors: 6
      </Typography>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="bg-background scrollbar-hide"
      >
        <div className="flex items-center justify-between p-2">
          <div className="px-4">
            <Typography
              variant="h6"
              as="h1"
            >
              {title}
            </Typography>
            <Typography
              className="text-foreground-tertiary"
              variant="caption"
              as="p"
            >
              Available Colors: 6
            </Typography>
          </div>
          <Button
            onClick={onClose}
            isIconOnly
            isRounded
            className="fixed right-2 top-2 z-10"
          >
            <CloseIcon />
          </Button>
        </div>

        <ul className="grid grid-cols-2 gap-1">
          {images.map((item, index) => {
            const { color, thumbnail } = item;
            return (
              <li
                className="relative"
                key={index}
              >
                <Badge className="absolute bottom-1 right-1 bg-zinc-700 bg-opacity-90 text-white">
                  {color}
                </Badge>
                <NextImage
                  alt={color}
                  src={thumbnail}
                />
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
};
