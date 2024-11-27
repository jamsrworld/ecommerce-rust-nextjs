import { EmblaCarousel } from "@/components/carousel";
import { Typography } from "@jamsr-ui/react";
import Img1 from "../assets/banner10/1.png";
import Img2 from "../assets/banner10/2.png";
import Img3 from "../assets/banner10/3.png";
import Img4 from "../assets/banner10/4.png";
import Img5 from "../assets/banner10/5.png";
import Img6 from "../assets/banner10/6.png";
import Img7 from "../assets/banner10/7.png";
import Img8 from "../assets/banner10/8.png";
import Img9 from "../assets/banner10/9.png";
import Img10 from "../assets/banner10/10.png";
import Img11 from "../assets/banner10/11.png";
import Img12 from "../assets/banner10/12.png";

import { type BannerItem, ImageBanner } from "./_comps/hero";

const items: BannerItem[] = [
  {
    image: Img1,
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
  {
    image: Img6,
  },
  {
    image: Img7,
  },
  {
    image: Img8,
  },
  {
    image: Img9,
  },
  {
    image: Img10,
  },
  {
    image: Img11,
  },
  {
    image: Img12,
  },
];

export const Banner10Section = () => {
  return (
    <section>
      <Typography
        as="h3"
        variant="body3"
      >
        Featured Category2
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
          isCarousel
        />
      </EmblaCarousel>
    </section>
  );
};
