import Img1 from "../assets/hero/img-1.jpg";
import Img2 from "../assets/hero/img-2.jpg";
import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "Fresh Delivery",
    subheading: "Street Style",
    image: Img1,
    buttons: ["Clothes", "Shoes"],
  },
  {
    heading: "Always Classy!",
    subheading: "Casual Collection",
    image: Img2,
    buttons: ["Suits", "Jackets"],
  },
];

export const HeroSection = () => {
  return (
    <ImageBanner
      items={items}
      variant="primary"
    />
  );
};
