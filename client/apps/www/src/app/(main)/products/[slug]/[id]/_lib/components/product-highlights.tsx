import { type Product } from "@/client";
import { Typography } from "@jamsr-ui/react";

type Props = Pick<Product, "highlights">;

export const ProductHighlights = (props: Props) => {
  const { highlights } = props;
  if (highlights.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Highlights
      </Typography>
      <ul className="flex list-disc flex-col gap-1">
        {highlights.map((item, index) => {
          return (
            <li
              key={index}
              className="list-inside [&::marker]:text-gray-500"
            >
              <Typography
                as="h5"
                variant="paragraph2"
                className="inline-flex font-medium"
              >
                {item.highlight}
              </Typography>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
