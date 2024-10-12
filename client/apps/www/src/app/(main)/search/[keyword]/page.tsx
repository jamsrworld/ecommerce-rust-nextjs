import { Typography } from "@jamsr-ui/react";
import Image from "next/image";
import { searchProducts } from "./list";

type Props = {
  params: {
    keyword: string;
  };
};

const Page = (props: Props) => {
  const price = 293;
  const mrp = 500;
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {searchProducts.map((item, idx) => {
          const { thumbnail, title } = item;
          return (
            <li
              key={idx}
              className="cursor-pointer rounded-md transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={thumbnail}
                alt={title}
                width={400}
                height={600}
                className="aspect-[9/12]"
              />
              <div className="p-2">
                <Typography as="p">{title}</Typography>
                <div className="flex items-center gap-1">
                  <Typography
                    as="p"
                    className="font-bold text-default"
                  >
                    ${price}
                  </Typography>
                  <Typography
                    as="p"
                    variant="caption"
                    className="font-medium text-foreground-tertiary line-through"
                  >
                    ${mrp}
                  </Typography>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
