import type { TypographyProps } from "@jamsr-ui/react";
import { Typography } from "@jamsr-ui/react";
import { cn } from "@repo/utils/class-name";
import Image, { type ImageProps } from "next/image";
import { type ComponentPropsWithoutRef } from "react";

type Props = {
  src?: ImageProps["src"];
  heading: string;
  subHeading?: string;
  image?: React.ReactNode;
  slotProps?: {
    heading?: TypographyProps;
    subHeading?: TypographyProps;
    image?: Partial<ImageProps>;
  };
} & ComponentPropsWithoutRef<"div">;

export const EmptyState = (props: Props) => {
  const {
    heading,
    src,
    subHeading,
    className,
    image,
    slotProps,
    ...restProps
  } = props;
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 overflow-hidden px-8",
        className,
      )}
      {...restProps}
    >
      {image}
      {src && (
        <Image
          alt={heading}
          src={src}
          height={200}
          {...slotProps?.image}
        />
      )}
      <Typography
        as="p"
        variant="h6"
        gradient="foreground"
        {...slotProps?.heading}
      >
        {heading}
      </Typography>
      {subHeading && (
        <Typography
          as="p"
          className="text-foreground-secondary"
          {...slotProps?.subHeading}
        >
          {subHeading}
        </Typography>
      )}
    </div>
  );
};
