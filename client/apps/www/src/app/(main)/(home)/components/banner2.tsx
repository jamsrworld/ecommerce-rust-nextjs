import Img1 from "../assets/banner2/1.jpg";
import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "Best Accessories",
    subheading: "Extra battery or case?",
    image: Img1,
    buttons: ["For Drones", "For Cameras", "Other"],
  },
];

export const Banner2Section = () => {
  return <ImageBanner items={items} />;
};
