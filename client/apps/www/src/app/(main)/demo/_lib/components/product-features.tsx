import { Typography } from "@jamsr-ui/react";

const items = [
  {
    heading: "R-LENO - Recycled wool",
    description: "Soft, comfortable and light",
  },
  {
    heading: "Designed to last a long time",
    description: "Resistant and easily washable materials",
  },
  {
    heading: "Waterproof",
    description: "To accompany you everywhere even in case of small showers",
  },
  {
    heading: "Outsole - Green EVA",
    description: "Flexible, lightweight and cushioning",
  },
  {
    heading: "Insole - Ortholite",
    description: "Removable and ergonomic",
  },
];

export const ProductFeatures = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="contents">
        <Typography
          as="h3"
          variant="h5"
        >
          NATURAL AND RECYCLED MATERIALS
        </Typography>
        <ul className="flex list-disc flex-col gap-4">
          {items.map((item, index) => {
            return (
              <li
                key={index}
                className="list-inside [&::marker]:text-gray-500"
              >
                <div className="inline-flex flex-col gap-2 pl-4">
                  <Typography
                    as="h5"
                    variant="paragraph"
                    className="font-medium"
                  >
                    {item.heading}
                  </Typography>
                  <Typography
                    as="p"
                    variant="paragraph"
                    className="text-foreground-secondary"
                  >
                    {item.description}
                  </Typography>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="contents">
        <Typography
          as="h3"
          variant="h5"
        >
          MADE LOCALLY
        </Typography>
        <Typography
          as="p"
          variant="paragraph"
          className="text-foreground-secondary"
        >
          France: recycled wool I Portugal: outer sole, laces, packaging I
          Spain: inner sole Handmade in Portugal
        </Typography>
      </div>
    </div>
  );
};
