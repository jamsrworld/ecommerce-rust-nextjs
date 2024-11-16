"use client";

import { type Product } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { useHover } from "@/hooks/use-hover";
import { Link, Typography } from "@jamsr-ui/react";
import { NextImage, NextLink } from "@repo/components/next";
import { ProductSlider } from "./product-slider";

type Props = Product;

export const SearchItem = (props: Props) => {
  const { images, title, id, slug } = props;
  const price = 293;
  const mrp = 500;
  const { handleMouseEnter, handleMouseLeave, isHovered } = useHover(500);
  const thumbnail = images[0]!;
  const productUrl = APP_ROUTES.products.view(id, slug);
  return (
    <li className="relative cursor-pointer transition-all duration-300">
      <Link
        as={NextLink}
        href={productUrl}
        className="group/top relative block overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NextImage
          alt={title}
          image={thumbnail}
          className="aspect-[9/12]"
        />
        <ProductSlider
          images={images}
          isHovered={isHovered}
        />
      </Link>
      <div className="py-0.5">
        <Link
          className="line-clamp-2 text-xs font-medium text-foreground md:text-sm"
          as={NextLink}
          href={productUrl}
        >
          {title}
        </Link>
        <div className="flex items-center gap-1">
          <Typography
            as="p"
            className="font-bold"
            variant="paragraph2"
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
