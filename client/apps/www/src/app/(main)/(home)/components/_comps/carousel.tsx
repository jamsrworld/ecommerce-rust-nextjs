import { EmblaCarousel } from "@/components/carousel";
import { Typography } from "@jamsr-ui/react";
import { fPrice } from "@repo/utils/number";
import Image, { type ImageProps } from "next/image";

export type CarouselItem = {
  title: string;
  price: number;
  mrp: number;
  image: ImageProps["src"];
};

type Props = {
  heading: string;
  items: CarouselItem[];
};

export const CarouselBase = (props: Props) => {
  const { items, heading } = props;
  return (
    <section className="flex flex-col gap-4">
      <Typography
        as="h3"
        variant="body3"
      >
        {heading}
      </Typography>
      <EmblaCarousel
        options={{
          align: "start",
        }}
      >
        <div className="flex gap-2">
          {items.map((item, idx) => {
            const { title, price, mrp, image } = item;
            return (
              <div
                key={idx}
                className="w-1/2 shrink-0 md:w-1/5"
              >
                <Image
                  src={image}
                  alt={title}
                />
                <div className="mt-2">
                  <Typography
                    as="h3"
                    variant="paragraph"
                  >
                    {title}
                  </Typography>
                  <div className="flex gap-2 text-sm">
                    <Typography as="p">{fPrice(price)}</Typography>
                    <Typography
                      as="p"
                      className="text-foreground-secondary line-through"
                    >
                      {fPrice(mrp)}
                    </Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </EmblaCarousel>
    </section>
  );
};
