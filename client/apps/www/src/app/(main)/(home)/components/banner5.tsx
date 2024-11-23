import { Typography } from "@jamsr-ui/react";
import Img1 from "../assets/banner5/1.jpg";
import Img2 from "../assets/banner5/2.jpg";
import Img3 from "../assets/banner5/3.jpg";
import Img4 from "../assets/banner5/4.jpg";

import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    heading: "STAY WILD BONES",
    image: Img1,
    buttons: ["Shop Now"],
  },
  {
    heading: "THE BEIGE",
    image: Img2,
    buttons: ["Shop Now"],
  },
  {
    heading: "CITY SUITS",
    image: Img3,
    buttons: ["Shop Now"],
  },
  {
    heading: "STREET STYLE",
    image: Img4,
    buttons: ["Shop Now"],
  },
];

export const Banner5Section = () => {
  return (
    <section className="flex flex-col gap-4">
      <Typography
        as="h3"
        variant="body3"
      >
        Featured offers
      </Typography>
      <ImageBanner
        items={items}
        align="center"
        buttonsAlignment="center"
      />
    </section>
  );
};
