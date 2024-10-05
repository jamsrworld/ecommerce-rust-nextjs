import Image, { type StaticImageData } from "next/image";
import Img1 from "../assets/images/1.jpg";
import Img2 from "../assets/images/2.jpg";
import Img4 from "../assets/images/4.jpg";
import Img5 from "../assets/images/5.jpg";
import Img6 from "../assets/images/6.jpg";
import Img7 from "../assets/images/7.jpg";
import Img8 from "../assets/images/8.jpg";
import Img9 from "../assets/images/9.jpg";

const items: (
  | { type: "image"; item: StaticImageData }
  | { type: "video"; src: string }
)[] = [
  {
    type: "image",
    item: Img1,
  },
  {
    type: "image",
    item: Img2,
  },
  {
    type: "video",
    src: "/product.mp4",
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
  {
    type: "image",
    item: Img9,
  },
];

export const ProductImages = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, index) => {
        if (item.type === "image") {
          const isThumbnail = index === 0;
          return (
            <Image
              alt="product image"
              key={index}
              src={item.item}
              className={isThumbnail ? "col-span-2" : ""}
            />
          );
        }
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={item.src}
            key={index}
            muted
            autoPlay
            loop
          />
        );
      })}
    </div>
  );
};
