import Img1 from "../assets/banner7/1.png";
import Img2 from "../assets/banner7/2.png";
import Img3 from "../assets/banner7/3.png";

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
    image: Img2,
    buttons: ["Shop Now"],
  },
  {
    heading: "New Arrivals",
    subheading: "Shop Today's Deals & Offers",
    image: Img3,
    buttons: ["Shop Now"],
  },
];

export const Banner7Section = () => {
  return (
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
    />
  );
};
