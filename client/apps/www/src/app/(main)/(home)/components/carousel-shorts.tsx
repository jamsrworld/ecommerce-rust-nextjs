import Img1 from "../assets/short/1.jpg";
import Img2 from "../assets/short/2.jpg";
import Img3 from "../assets/short/3.jpg";
import Img4 from "../assets/short/4.jpg";
import Img5 from "../assets/short/5.jpg";
import { CarouselBase, type CarouselItem } from "./_comps/carousel";

const items: CarouselItem[] = [
  {
    title: "Topshop training t-shirt",
    mrp: 40.0,
    price: 21,
    image: Img1,
  },
  {
    title: "Asso 175 denim short",
    mrp: 65.0,
    price: 49,
    image: Img2,
  },
  {
    title: "Horizontal stripes t-shirt",
    mrp: 90.0,
    price: 55,
    image: Img3,
  },
  {
    title: "Sleeveless tank t-shirt",
    mrp: 59.0,
    price: 70,
    image: Img4,
  },
  {
    title: "CK polo with tipping",
    mrp: 49.0,
    price: 80,
    image: Img5,
  },
];

export const CarouselShortsSection = () => {
  return (
    <CarouselBase
      heading="Shorts for you"
      items={items}
    />
  );
};
