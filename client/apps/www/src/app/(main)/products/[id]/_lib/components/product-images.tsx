import Image, { type StaticImageData } from "next/image";
import Img1 from "../assets/images/1.jpg";
import Img2 from "../assets/images/2.jpg";
import Img3 from "../assets/images/3.jpg";
import Img4 from "../assets/images/4.jpg";
import Img5 from "../assets/images/5.jpg";
import Img6 from "../assets/images/6.jpg";
import Img7 from "../assets/images/7.jpg";
import Img8 from "../assets/images/8.jpg";
import { ProductImagesSlider } from "./product-images-slider";

export const imagesItems: { type: "image"; item: StaticImageData }[] = [
  {
    type: "image",
    item: Img1,
  },
  {
    type: "image",
    item: Img2,
  },
  {
    type: "image",
    item: Img3,
  },
  {
    type: "image",
    item: Img4,
  },
  {
    type: "image",
    item: Img5,
  },
  {
    type: "image",
    item: Img6,
  },
  {
    type: "image",
    item: Img7,
  },
  {
    type: "image",
    item: Img8,
  },
];

export const ProductImages = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ProductImagesSlider />
      {imagesItems.map((item, index) => {
        return (
          <Image
            alt="product image"
            key={index}
            src={item.item}
          />
        );
      })}
    </div>
  );
};
