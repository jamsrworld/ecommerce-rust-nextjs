import { Typography } from "@jamsr-ui/react";
import { EmblaCarousel } from "@/components/carousel";
import Img1 from "../assets/banner8/1.jpg";

import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "Smart Offer",
    subheading: "Save 20% on Woman Bag",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Sale off",
    subheading: "Great Summer Collection",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "New Arrivals",
    subheading: "Shop Today's Deals & Offers",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Smart Offer",
    subheading: "Save 20% on Woman Bag",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Sale off",
    subheading: "Great Summer Collection",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "New Arrivals",
    subheading: "Shop Today's Deals & Offers",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Smart Offer",
    subheading: "Save 20% on Woman Bag",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Sale off",
    subheading: "Great Summer Collection",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "New Arrivals",
    subheading: "Shop Today's Deals & Offers",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Smart Offer",
    subheading: "Save 20% on Woman Bag",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "Sale off",
    subheading: "Great Summer Collection",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "New Arrivals",
    subheading: "Shop Today's Deals & Offers",
    image: Img1,
    buttons: ["Shop Now"],
  },
];

export const Banner8Section = () => {
  return (
    <section>
      <Typography
        as="h3"
        variant="body3"
      >
        Featured Category
      </Typography>
      <EmblaCarousel>
        <ImageBanner
          items={items}
          align="start"
          buttonsAlignment="left"
          headingVariant="paragraph2"
          subheadingVariant="h4"
          buttonsVariant="text"
          headingColor="text-gray-900"
          subheadingColor="text-black"
          buttonColor="text-primary hover:text-primary"
          columns={5}
        />
      </EmblaCarousel>
    </section>
  );
};
