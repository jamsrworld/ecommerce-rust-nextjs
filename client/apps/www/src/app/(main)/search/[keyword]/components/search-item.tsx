"use client";

import { useHover } from "@/hooks/use-hover";
import { Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import Image from "next/image";
import { ProductSlider } from "./product-slider";

type Props = {
  title: string;
  thumbnail: string;
};

export const SearchItem = (props: Props) => {
  const { thumbnail, title } = props;
  const price = 293;
  const mrp = 500;
  const { handleMouseEnter, handleMouseLeave, isHovered } = useHover(500);
  return (
    <li className="relative cursor-pointer transition-all duration-300">
      <Link
        as={NextLink}
        href="/"
        className="group/top relative block overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={600}
          className="aspect-[9/12]"
        />
        <ProductSlider isHovered={isHovered} />
      </Link>
      <div className="p-2">
        <Link
          className="font-medium text-foreground"
          as={NextLink}
          href="/"
        >
          {title}
        </Link>
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
};
