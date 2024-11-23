import Img1 from "../assets/banner4/1.jpg";
import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "GET INSPIRED BY READY-MADE SETS OF CLOTHES",
    subheading: "Save time on complete sets",
    image: Img1,
    buttons: ["Sets for Women", "Sets for Men"],
  },
];

export const Banner4Section = () => {
  return (
    <ImageBanner
      items={items}
      align="center"
      buttonsAlignment="space-between"
    />
  );
};
