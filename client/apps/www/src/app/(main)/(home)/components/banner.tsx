import Img1 from "../assets/banner/1.jpg";
import Img2 from "../assets/banner/2.jpg";
import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "Glasses are the basis",
    subheading: "Fresh Delivery",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "All sweatshirts up to -50%",
    subheading: "Don't miss!",
    image: Img2,
    buttons: ["Shop Now"],
  },
];

export const BannerSection = () => {
  return <ImageBanner items={items} />;
};
