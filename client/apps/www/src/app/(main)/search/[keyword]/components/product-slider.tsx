"use client";

import { Button, Repeater } from "@jamsr-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@repo/icons/chevron";
import { cn } from "@repo/utils/class-name";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Img1 from "../assets/1.jpg";
import Img2 from "../assets/2.jpg";
import Img3 from "../assets/3.jpg";
import Img4 from "../assets/4.jpg";
import Img5 from "../assets/5.jpg";
import Img6 from "../assets/6.jpg";

const images = [Img1, Img2, Img3, Img4, Img5, Img6];

export const ProductSlider = () => {
  const imageCount = images.length;
  const [currentImage, setCurrentImage] = useState(0);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleOnClickPagination = (idx: number) => {
    setIsInterrupted(true);
    setCurrentImage(idx);
  };

  const handleOnClickNext = () => {
    setIsInterrupted(true);
    nextImage();
  };

  const handleOnClickPrev = () => {
    setIsInterrupted(true);
    prevImage();
  };

  const handleOnMouseEnter = () => {
    setIsHovered(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
    setIsInterrupted(false);
  };

  useEffect(() => {
    if (isInterrupted || !isHovered) return () => {};
    const timeoutId = setInterval(() => {
      nextImage();
    }, 2500);
    return () => {
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [isHovered, isInterrupted]);

  return (
    <div
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="absolute inset-0 z-10 hidden overflow-hidden group-hover:block"
    >
      <AnimatePresence>
        <m.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]!}
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
          rounded
          size="sm"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          type="button"
          onClick={handleOnClickNext}
          aria-label="Next"
          isIconOnly
          rounded
          size="sm"
        >
          <ChevronRightIcon />
        </Button>
      </div>
      {/*  */}
      <ul className="absolute bottom-4 flex w-full justify-center gap-1">
        <Repeater count={imageCount}>
          {(idx) => {
            const isActive = idx === currentImage;
            return (
              <li>
                <button
                  type="button"
                  onClick={() => handleOnClickPagination(idx)}
                  className={cn(
                    "h-0.5 w-8 shrink-0 rounded-md bg-black transition-all hover:h-2",
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
  );
};
