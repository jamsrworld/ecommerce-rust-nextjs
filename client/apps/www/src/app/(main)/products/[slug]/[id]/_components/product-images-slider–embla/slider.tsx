import { type Product } from "@/client";
import { FollowCursor } from "@/components/follow-cursor";
import { FollowCursorProvider } from "@/components/follow-cursor/provider";
import { NextImage } from "@repo/components/next";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
import { CloseBtn } from "./close-btn";
import {
  NavigationNextBtn,
  NavigationPrevBtn,
  usePrevNextButtons,
} from "./navigation-btn";

type Props = Pick<Product, "images"> & {
  onClose: () => void;
  activeIndex: number;
};

export const ProductImagesSlider = (props: Props) => {
  const { images, onClose, activeIndex } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    dragThreshold: 100,
    duration: 30,
  });
  const parentRef = useRef<HTMLDivElement | null>(null);

  const {
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    setTimeout(() => {
      emblaApi?.scrollTo(activeIndex);
    }, 1000);
  }, [activeIndex, emblaApi]);

  return (
    <div>
      <div
        className="cursor-grab overflow-hidden"
        ref={(node) => {
          emblaRef(node);
          parentRef.current = node;
        }}
      >
        <ul className="flex">
          {images.map((item, index) => (
            <li
              className="shrink-0"
              key={index}
            >
              <NextImage
                alt="product image"
                image={item}
                className="h-dvh w-auto shrink-0 select-none"
              />
            </li>
          ))}
        </ul>
        <FollowCursorProvider>
          <FollowCursor parentRef={parentRef} />
          <NavigationPrevBtn
            onClick={onPrevButtonClick}
            isDisabled={isPrevBtnDisabled}
          />
          <NavigationNextBtn
            onClick={onNextButtonClick}
            isDisabled={isNextBtnDisabled}
          />
          <CloseBtn onClose={onClose} />
        </FollowCursorProvider>
      </div>
    </div>
  );
};
