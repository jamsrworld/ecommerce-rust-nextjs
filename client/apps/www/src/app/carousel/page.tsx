"use client";

import { type EmblaOptionsType } from "embla-carousel";
import { EmblaCarousel } from "./embla-carousel";

const OPTIONS: EmblaOptionsType = { dragFree: false };
const SLIDE_COUNT = 16;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Page = () => {
  return (
    <div className="dark h-dvh bg-background">
      <EmblaCarousel
        slides={SLIDES}
        options={OPTIONS}
      />
    </div>
  );
};

export default Page;
