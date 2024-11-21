"use client";

import { type Product } from "@/client";
import { FollowCursor } from "@/components/follow-cursor";
import { FollowCursorProvider } from "@/components/follow-cursor/provider";
import {
  HorizontalScroll,
  type ScrollHandle,
} from "@/components/horizontal-scroll";
import { NextImage } from "@repo/components/next";
import { useCallback, useState } from "react";
import { CloseBtn } from "./close-btn";
import { NavigationNextBtn, NavigationPrevBtn } from "./navigation-btn";

type Props = Pick<Product, "images"> & {
  onClose: () => void;
  activeIndex: number;
};

export const ProductImagesSlider = (props: Props) => {
  const { images, onClose, activeIndex } = props;
  const [scrollRef, setScrollRef] = useState<ScrollHandle | null>(null);
  const handleNext = () => {
    scrollRef?.slideRight();
  };
  const handlePrev = () => {
    scrollRef?.slideLeft();
  };

  const targetRef = useCallback((node: HTMLLIElement | null) => {
    if (!node) return;
    setTimeout(() => {
      node.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 1000);
  }, []);

  return (
    <>
      <FollowCursorProvider>
        <NavigationPrevBtn
          onClick={handlePrev}
          isDisabled={!scrollRef?.canSlideLeft}
        />
        <NavigationNextBtn
          onClick={handleNext}
          isDisabled={!scrollRef?.canSlideRight}
        />
        <FollowCursor parentRef={scrollRef?.containerRef} />
        <CloseBtn onClose={onClose} />
      </FollowCursorProvider>
      <HorizontalScroll ref={setScrollRef}>
        <ul className="flex">
          {images.map((item, idx) => {
            return (
              <li
                key={idx}
                className="shrink-0"
                ref={activeIndex === idx ? targetRef : null}
              >
                <NextImage
                  alt="product image"
                  image={item}
                  className="pointer-events-none h-dvh w-auto shrink-0"
                  loading="eager"
                />
              </li>
            );
          })}
        </ul>
      </HorizontalScroll>
    </>
  );
};
