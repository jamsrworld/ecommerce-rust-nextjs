import { type Product } from "@/client";
import { Typography } from "@jamsr-ui/react";

type Props = Pick<Product, "highlights">;

export const ProductFeatures = (props: Props) => {
  const { highlights } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="contents">
        <Typography
          as="h3"
          variant="h5"
        >
          HIGHLIGHTS
        </Typography>
        <ul className="flex list-disc flex-col gap-4">
          {highlights.map((item, index) => {
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
                    {item.highlight}
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
