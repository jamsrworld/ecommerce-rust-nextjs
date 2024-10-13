"use client";

import { FollowCursor } from "@/components/follow-cursor";
import { FollowCursorProvider } from "@/components/follow-cursor/provider";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Drawer } from "@jamsr-ui/react";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { imagesItems } from "../image";
import { CloseBtn } from "./close-btn";
import { NavigationNextBtn, NavigationPrevBtn } from "./navigation-btn";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  activeIndex: number;
};

export const ProductImagesSlider = (props: Props) => {
  const { isOpen, onOpenChange, onClose, activeIndex } = props;
  const scrollRef = useRef(null);
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
      <FollowCursorProvider>
        <NavigationPrevBtn />
        <NavigationNextBtn />
        <CloseBtn onClose={onClose} />
        <FollowCursor parentRef={scrollRef} />
      </FollowCursorProvider>
      <HorizontalScroll ref={scrollRef}>
        <ul className="flex">
          {imagesItems.map((item, idx) => {
            return (
              <li
                key={idx}
                className="shrink-0"
                ref={(node) => ref(idx, node)}
              >
                <Image
                  alt="product image"
                  src={item.item}
                  className="pointer-events-none h-dvh w-auto shrink-0"
                />
              </li>
            );
          })}
        </ul>
      </HorizontalScroll>
    </Drawer>
  );
};
