"use client";

import { type Product } from "@/client";
import { Button, Repeater } from "@jamsr-ui/react";
import { NextImage } from "@repo/components/next";
import { ChevronLeftIcon, ChevronRightIcon } from "@repo/icons/chevron";
import { cn } from "@repo/utils/class-name";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Props = {
  isHovered: boolean;
  images: Product["images"];
};

export const ProductSlider = (props: Props) => {
  const { isHovered, images } = props;
  const imageCount = images.length;
  const [currentImage, setCurrentImage] = useState(0);
  const [isInterrupted, setIsInterrupted] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleOnClickPagination = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    preventDefault(e);
    setIsInterrupted(true);
    setCurrentImage(idx);
  };

  const handleOnClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    preventDefault(e);
    setIsInterrupted(true);
    nextImage();
  };

  const handleOnClickPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    preventDefault(e);
    setIsInterrupted(true);
    prevImage();
  };

  const handleOnMouseLeave = () => {
    setIsInterrupted(false);
  };

  useEffect(() => {
    if (isInterrupted || !isHovered) return () => {};
    const timeoutId = setInterval(() => {
      nextImage();
    }, 2000);
    return () => {
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [isHovered, isInterrupted, nextImage]);

  return (
    <div
      onMouseLeave={handleOnMouseLeave}
      className={cn("absolute inset-0 z-10 hidden overflow-hidden", {
        block: isHovered,
      })}
    >
      <AnimatePresence>
        <m.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="absolute inset-0"
        >
          <NextImage
            image={images[currentImage]!}
            alt={`Image ${currentImage + 1}`}
            className="aspect-[9/12]"
            width={400}
            height={600}
          />
        </m.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          type="button"
          onClick={handleOnClickPrev}
          aria-label="Previous"
          isIconOnly
          isRounded
          size="sm"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          type="button"
          onClick={handleOnClickNext}
          aria-label="Next"
          isIconOnly
          isRounded
          size="sm"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      {/*  */}
      <div className="absolute bottom-4 flex w-full justify-center">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <ul
          className="group flex gap-1"
          onClick={preventDefault}
        >
          <Repeater count={imageCount}>
            {(idx) => {
              const isActive = idx === currentImage;
              return (
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOnClickPagination(e, idx)}
                    className={cn(
                      "h-0.5 w-8 shrink-0 rounded-md bg-black transition-all duration-500 group-hover:h-2",
                      {
                        "bg-white": isActive,
                      },
                    )}
                    aria-label="product-slider"
                  />
                </li>
              );
            }}
          </Repeater>
        </ul>
      </div>
    </div>
  );
};
