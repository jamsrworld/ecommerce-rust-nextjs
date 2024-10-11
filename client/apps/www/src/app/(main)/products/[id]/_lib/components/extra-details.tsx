import { Typography } from "@jamsr-ui/react";
import { cn } from "@repo/utils/class-name";
import Image, { type StaticImageData } from "next/image";
import Hightlight1 from "../assets/images/highlight-1.jpg";
import Hightlight2 from "../assets/images/highlight-2.jpg";
import Hightlight3 from "../assets/images/highlight-3.jpg";
import Hightlight4 from "../assets/images/highlight-4.jpg";
import Hightlight5 from "../assets/images/highlight-5.jpg";

const items: {
  heading: string;
  features?: {
    heading: string;
    description: string;
  }[];
  image: StaticImageData;
}[] = [
  {
    heading: " Recycled wool ",
    features: [
      {
        heading: "The benefits of recycled wool",
        description:
          "R-LENO is a recycled wool fabric developed especially for our sneakers. It is strong, soft, light and does not deform. It is also thermoregulating which means it keeps cool in the summer and warm in the winter.",
      },
    ],
    image: Hightlight1,
  },
  {
    heading: "Impact",
    features: [
      {
        heading: "Wool from recycled sweaters in France",
        description:
          "Our wool is recycled in Tarn, France. We use an already existing material, treated without water or dye. Result: it is 98% less impacting than new wool.",
      },
    ],
    image: Hightlight2,
  },
  {
    heading: " Water repellent ",
    features: [
      {
        heading: "VOLA is waterproof and weatherproof",
        description:
          "Thanks to a very dense weave and a water-repellent treatment, you can wear your sneakers in any weather and wash them in the washing machine at 30°C.",
      },
    ],
    image: Hightlight3,
  },
  {
    heading: " Sole ",
    features: [
      {
        heading: "Internal",
        description: `OrthoLite® Hybrid-Eco™
This ergonomic footbed uses production waste and recycled rubber`,
      },
      {
        heading: "External",
        description: `GREEN EVA ®
Natural alternative to the classic sugarcane-based EVA that retains excellent technical properties such as lightness, resistance and cushioning.`,
      },
    ],
    image: Hightlight4,
  },
  {
    heading: " Action",
    features: [
      {
        heading: "1% for the LPO",
        description: `Because nothing beats action, we donate 1% of our turnover to the Ligue pour la Protection des Oiseaux, a French environmental protection association.
    
    Our donations are freely distributed in favor of the protection of species, conservation of spaces or education and awareness.`,
      },
    ],
    image: Hightlight5,
  },
];

export const ProductExtraDetails = () => {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-40"
          >
            <div className={cn("", isEven && "md:order-last")}>
              <Typography
                as="h3"
                variant="h2"
                className="font-bold uppercase"
              >
                {item.heading}
              </Typography>
              <div className="flex flex-col gap-2">
                {item.features?.map((feature, index) => {
                  return (
                    <div key={index}>
                      <Typography
                        as="h5"
                        variant="h5"
                        className="font-medium"
                      >
                        {feature.heading}
                      </Typography>
                      <Typography
                        as="p"
                        variant="body1"
                        className="mt-4 text-foreground-secondary"
                      >
                        {feature.description}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Image
                alt="product image"
                src={item.image}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
