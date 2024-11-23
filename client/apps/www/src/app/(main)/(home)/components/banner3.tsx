import Img1 from "../assets/banner3/1.jpg";
import Img2 from "../assets/banner3/2.jpg";
import Img3 from "../assets/banner3/3.jpg";
import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "ALL FOR TENNIS",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "GYM ACCESSORIES",
    image: Img2,
    buttons: ["Shop Now"],
  },
  {
    heading: "BE SAFE ON BIKE",
    image: Img3,
    buttons: ["Shop Now"],
  },
];

export const Banner3Section = () => {
  return (
    <ImageBanner
      items={items}
      align="center"
      buttonsAlignment="center"
      gap={false}
      allowZoom
      buttonsVariant="text"
    />
  );
};
