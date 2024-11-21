import { type EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-buttons";
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay,
} from "./embla-carousel-selected-snap-display";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className="container mx-auto max-w-xl py-12">
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((index) => (
            <div
              className="min-w-0 flex-[0_0_50%] pl-4"
              key={index}
            >
              <div className="flex h-80 select-none items-center justify-center rounded-md text-4xl font-bold text-foreground shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)]">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[auto_1fr] justify-between gap-3">
        <div className="grid grid-cols-2 items-center gap-2">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  );
};
