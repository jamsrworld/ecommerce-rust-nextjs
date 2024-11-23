import {
  Button,
  Typography,
  type TypographyProps,
  UIStylesProvider,
} from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cn } from "@repo/utils/class-name";
import Image, { type ImageProps } from "next/image";

export type BannerItem = {
  heading: string;
  subheading?: string;
  image: ImageProps["src"];
  buttons: string[];
};

export type BannerProps = {
  items: BannerItem[];
  allowZoom?: boolean;
  align?: "start" | "center" | "end";
  buttonsAlignment?: "space-between" | "evenly" | "left" | "center";
  gap?: boolean;
  buttonsVariant?: "outlined" | "black" | "text";
  headingVariant?: TypographyProps["variant"];
  subheadingVariant?: TypographyProps["variant"];
};

export const ImageBanner = (props: BannerProps) => {
  const {
    items,
    allowZoom = false,
    align = "start",
    buttonsAlignment = "left",
    gap = true,
    buttonsVariant = "outlined",
    headingVariant = "body7",
    subheadingVariant = "paragraph",
  } = props;
  const count = items.length;
  const className =
    (count === 1 && "md:grid-cols-1") ||
    (count === 2 && "md:grid-cols-2") ||
    (count === 3 && "md:grid-cols-3") ||
    (count === 4 && "md:grid-cols-4") ||
    (count === 5 && "md:grid-cols-5") ||
    (count === 6 && "md:grid-cols-6") ||
    "md:grid-cols-3";
  return (
    <section
      className={cn("grid grid-cols-1", className, {
        "gap-2": gap,
      })}
    >
      {items.map((item, index) => {
        const { heading, image, subheading, buttons } = item;
        return (
          <div
            key={index}
            className="group relative overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              className={cn("size-full object-cover", {
                "transition-all duration-300 group-hover:scale-110": allowZoom,
              })}
              sizes="100vw"
              quality={100}
            />
            <div
              className={cn(
                "absolute left-0 top-0 flex size-full flex-col justify-center gap-4 p-8 text-white",
                {
                  "items-center": align === "center",
                },
              )}
            >
              <div
                className={cn("flex flex-col gap-2", {
                  "max-w-screen-lg items-center justify-center text-center":
                    align === "center",
                  "max-w-sm": align === "start",
                })}
              >
                <Typography
                  variant={headingVariant}
                  as="h3"
                >
                  {heading}
                </Typography>
                {subheading && (
                  <Typography
                    variant={subheadingVariant}
                    as="p"
                  >
                    {subheading}
                  </Typography>
                )}
                <div
                  className={cn("flex w-full gap-2", {
                    "justify-evenly": buttonsAlignment === "evenly",
                    "justify-between": buttonsAlignment === "space-between",
                    "justify-center": buttonsAlignment === "center",
                  })}
                >
                  <UIStylesProvider
                    button={{
                      size: "lg",
                      color: "primary",
                      variant: buttonsVariant === "text" ? "text" : undefined,
                      className: cn({
                        "rounded-none bg-white text-black border border-transparent hover:!bg-transparent hover:text-white hover:border-white":
                          buttonsVariant === "outlined",
                        "rounded-none bg-white text-black border border-transparent hover:!bg-black hover:text-white":
                          buttonsVariant === "black",
                        "text-white underline font-normal hover:text-foreground-link":
                          buttonsVariant === "text",
                      }),
                    }}
                  >
                    {buttons.map((item) => {
                      return (
                        <Button
                          as={NextLink}
                          href="/search"
                          key={item}
                        >
                          {item}
                        </Button>
                      );
                    })}
                  </UIStylesProvider>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
