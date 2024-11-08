"use client";

import { type ImageMetadata } from "@repo/types/file";
import { getFileSrc } from "@repo/utils/url";
import Image, { type ImageProps } from "next/image";
import type { LinkProps } from "next/link";
import Link from "next/link";

export const NextLink = (props: LinkProps<unknown>) => (
  <Link
    prefetch
    {...props}
  />
);

export const NextImage = (props: Omit<ImageProps, "src"> & ({ src: ImageProps["src"], image?: undefined } | { image?: ImageMetadata, src?: undefined })) => {
  const { src, image, ...restProps } = props

  if (image) {
    const { height, placeholder, url,
      width
    } = image
    return <Image src={getFileSrc(url)} width={width} height={height} placeholder="blur" blurDataURL={placeholder} {...restProps} />
  }
  if (!src) return null;

  return <Image
    {...(typeof src === "string" ? {
      src: getFileSrc(src),
    } : {
      src
    })}
    {...restProps}
  />
}