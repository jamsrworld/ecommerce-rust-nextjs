import type { ImageMetadata } from "@repo/types/file";
import { getFileSrc } from "@repo/utils/url";
import type {
  ImageProps as ImagePropsUI,
  StaticImageData,
} from "next/image";
import NextImage from "next/image";

export type ImageProps = Omit<ImagePropsUI, "src"> & {
  src: ImageMetadata | string | StaticImageData;
};

export const Image = (props: ImageProps) => {
  const { placeholder, alt, src, ...restProps } = props;
  if (typeof src === "object" && "placeholder" in src) {
    const { height, placeholder, url, width } = src;
    return (
      <NextImage
        src={getFileSrc(url)}
        width={width}
        height={height}
        {...(placeholder && {
          placeholder: "blur",
          blurDataURL: placeholder,
        })}
        alt={alt}
        title={alt}
        {...restProps}
      />
    );
  }

  if (typeof src === "object" && "src" in src) {
    return (
      <NextImage
        src={src}
        alt={alt}
        title={alt}
        {...restProps}
      />
    );
  }

  return (
    <NextImage
      src={getFileSrc(src)}
      {...(placeholder && {
        placeholder: "blur",
        blurDataURL: placeholder,
      })}
      alt={alt}
      title={alt}
      {...restProps}
    />
  );
};
