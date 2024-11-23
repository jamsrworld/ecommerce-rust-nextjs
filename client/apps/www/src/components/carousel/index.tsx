"use client";

import { Button } from "@jamsr-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@repo/icons/chevron";
import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { usePrevNextButtons } from "./buttons";

type PropType = {
  options?: EmblaOptionsType;
  children: React.ReactNode;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { children, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section>
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        {children}
      </div>
      <div className="flex justify-end gap-4">
        <Button
          onClick={onPrevButtonClick}
          isDisabled={prevBtnDisabled}
          isIconOnly
          isRounded
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={onNextButtonClick}
          isDisabled={nextBtnDisabled}
          isIconOnly
          isRounded
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </section>
  );
};
