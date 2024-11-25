import { type Product } from "@/client";
import { Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cn } from "@repo/utils/class-name";

type Props = Pick<Product, "title">;

export const ProductBreadcrumb = (props: Props) => {
  const { title } = props;
  const lists = [
    {
      heading: "Home",
      link: "/",
    },
    {
      heading: title,
      link: null,
    },
  ] as const;
  return (
    <ul className="flex w-full gap-1 max-md:hidden">
      {lists.map((list, index) => {
        const isLast = index === lists.length - 1;
        return (
          <li
            key={index}
            className="flex w-full max-w-min items-center gap-1 overflow-hidden"
          >
            <Typography
              variant="lead"
              as="p"
              {...(list.link && { as: NextLink, href: list.link })}
              className={cn(
                "truncate",
                isLast
                  ? "text-foreground-tertiary"
                  : "text-foreground-secondary",
              )}
            >
              {list.heading}
            </Typography>
            <span className="font-bold">{!isLast && "/"}</span>
          </li>
        );
      })}
    </ul>
  );
};
