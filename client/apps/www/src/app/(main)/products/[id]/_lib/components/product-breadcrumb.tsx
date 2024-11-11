import { Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";

export const ProductBreadcrumb = () => {
  const lists = [
    {
      heading: "Home",
      link: "/",
    },
    {
      heading: "Men",
      link: "/",
    },
    {
      heading: "Topwear",
      link: "/",
    },
    {
      heading: "T-shirts",
      link: "/",
    },
    {
      heading: "Loreta Wool-Blend Coat",
      link: "/",
    },
  ] as const;
  return (
    <ul className="flex gap-1 text-[12px] text-foreground-tertiary max-md:hidden">
      {lists.map((list, index) => {
        const isLast = index === lists.length - 1;
        return (
          <li
            key={index}
            className="flex items-center gap-1"
          >
            <Typography
              as={NextLink}
              href={list.link}
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
