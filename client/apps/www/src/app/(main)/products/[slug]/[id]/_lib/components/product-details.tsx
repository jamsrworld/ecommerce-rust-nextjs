import { type Product } from "@/client";
import { Typography } from "@jamsr-ui/react";

type Props = { product: Product };

export const ProductDetails = (props: Props) => {
  const {
    product: { brand, category, color, size, style },
  } = props;
  const highlights = [
    { label: "Brand", value: brand },
    { label: "Category", value: category },
    { label: "Color", value: color },
    { label: "Size", value: size },
    { label: "Style", value: style },
  ];
  return (
    <ul className="flex flex-col gap-1">
      {highlights.map((item, index) => {
        return (
          <li key={index}>
            <div className="flex justify-between">
              <Typography
                as="h5"
                variant="paragraph2"
              >
                {item.label}
              </Typography>
              <Typography
                as="h5"
                variant="paragraph2"
              >
                {item.value}
              </Typography>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
