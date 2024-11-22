import { Typography } from "@jamsr-ui/react";
import { cn } from "@repo/utils/class-name";
import Image, { type ImageProps } from "next/image";

type Props = {
  heading: string;
  subHeading?: string;
  image: ImageProps["src"];
  className?: string;
};

export const EmptyContent = (props: Props) => {
  const { heading, subHeading, image, className } = props;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-8 text-center",
        className,
      )}
    >
      <Image
        src={image}
        alt="empty cart"
        className="size-40"
      />
      <div>
        <Typography
          as="h3"
          variant="h4"
        >
          {heading}
        </Typography>
        {subHeading && (
          <Typography
            as="p"
            className="text-foreground-secondary"
            variant="paragraph2"
          >
            {subHeading}
          </Typography>
        )}
      </div>
    </div>
  );
};
