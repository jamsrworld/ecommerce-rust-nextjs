import { Button, Show, Typography, UIStylesProvider } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import Image, { type ImageProps } from "next/image";

export type BannerItem = {
  heading: string;
  subheading: string;
  image: ImageProps["src"];
  buttons: string[];
};

export type BannerProps = {
  items: BannerItem[];
  variant: "primary" | "secondary";
};

export const ImageBanner = (props: BannerProps) => {
  const { items, variant } = props;
  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
              className="transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute left-0 top-0 flex size-full flex-col justify-center gap-4 p-16 text-white">
              <div className="flex max-w-sm flex-col gap-2">
                <Show when={variant === "primary"}>
                  <Typography as="h3">{heading}</Typography>
                  <Typography
                    as="p"
                    variant="body7"
                  >
                    {subheading}
                  </Typography>
                </Show>
                <Show when={variant === "secondary"}>
                  <Typography
                    variant="body7"
                    as="p"
                  >
                    {heading}
                  </Typography>
                  <Typography as="h3">{subheading}</Typography>
                </Show>
              </div>
              <div className="flex gap-2">
                <UIStylesProvider
                  button={{
                    size: "lg",
                    color: "primary",
                    className:
                      variant === "primary"
                        ? "rounded-none bg-white text-black border border-transparent hover:!bg-transparent hover:text-white hover:border-white"
                        : "rounded-none bg-white text-black border border-transparent hover:!bg-black hover:text-white",
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
        );
      })}
    </section>
  );
};
