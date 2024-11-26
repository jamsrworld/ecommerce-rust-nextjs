import { Typography } from "@jamsr-ui/react";
import Img2 from "../assets/banner9/2.png";
import Img3 from "../assets/banner9/3.png";
import Img4 from "../assets/banner9/4.png";
import Img5 from "../assets/banner9/5.png";
import Img6 from "../assets/banner9/6.png";

import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    image: Img6,
  },
  {
    image: Img2,
  },
  {
    image: Img3,
  },
  {
    image: Img4,
  },
  {
    image: Img5,
  },
];

export const Banner9Section = () => {
  return (
    <section>
      <Typography
        as="h3"
        variant="body3"
      >
        Accessories That Grab You The Style
      </Typography>
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
        className="flex"
      />
    </section>
  );
};
