import { type Product } from "@/client";
import { Repeater } from "@jamsr-ui/react";
import { NextImage } from "@repo/components/next";
import { cn } from "@repo/utils/class-name";
import { AnimatePresence, m, type PanInfo } from "framer-motion";
import { useState } from "react";

type Props = Pick<Product, "images">;

export const MobileImageSlider = (props: Props) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const handleDotClick = (index: number) => {
    setDirection(index > currentImage ? "left" : "right");
    setCurrentImage(index);
  };

  const handleNext = () => {
    setDirection("left");
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection("right");
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // swiped right
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      // swiped left
      handleNext();
    }
  };

  const motionDivProps = {
    initial: (direction: "left" | "right") => {
      console.log("initial:->", direction);
      return {
        x: direction === "left" ? "100%" : "-100%",
      };
    },
    animate: { x: "0" },
    // exit: { x: direction === "left" ? "-100%" : "100%" },
    exit: (direction: "left" | "right") => {
      console.log("exit:->", direction);
      return {
        x: direction === "left" ? "-100%" : "100%",
      };
    },
    transition: { type: "spring", duration: 1 },
    drag: "x",
    dragConstraints: { left: 0, right: 0 },
    onDragEnd: handleDragEnd,
  };

  return (
    <div className="relative -m-2 flex flex-col gap-2 overflow-hidden md:hidden">
      <AnimatePresence
        initial={false}
        mode="popLayout"
        custom={direction}
      >
        <m.div
          key={currentImage}
          custom={direction}
          {...motionDivProps}
        >
          <NextImage
            alt="product image"
            placeholder="blur"
            image={images[currentImage]!}
          />
        </m.div>
      </AnimatePresence>
      <div className="flex justify-center gap-1">
        <Repeater count={images.length}>
          {(index) => {
            return (
              <button
                type="button"
                aria-label={`Active Carousel ${index + 1}`}
                onClick={() => handleDotClick(index)}
                className={cn("size-1.5 rounded-full bg-foreground", {
                  "bg-content4": index === currentImage,
                })}
              />
            );
          }}
        </Repeater>
      </div>
    </div>
  );
};
