import { Button, Divider, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { cn } from "@repo/utils/class-name";
import Image, { type StaticImageData } from "next/image";
import React from "react";
import Img1 from "./1.webp";
import Img2 from "./2.webp";
import Img3 from "./3.webp";
import Img4 from "./4.webp";

const items: {
  thumbnail: StaticImageData;
  status: "Confirmed" | "Cancelled" | "Return Created";
  title: string;
  size: string;
  style: string;
  subtitle: string;
}[] = [
  {
    thumbnail: Img1, // URL for the first item's image
    status: "Confirmed",
    title: "Nike Everyday Plus Cushioned",
    size: "Size L (W 10-13 / M 8-12)",
    style: "DD2795-602",
    subtitle: "Training Crew Socks",
  },
  {
    thumbnail: Img2, // URL for the second item's image
    status: "Cancelled",
    title: "Nike Everyday Plus Cushioned",
    size: "Size L (W 10-13 / M 8-12)",
    style: "DD2795-301",
    subtitle: "Training Crew Socks",
  },
  {
    thumbnail: Img3, // URL for the third item's image
    status: "Cancelled",
    title: "Nike Swoosh",
    size: "One Size",
    style: "NNN07-101",
    subtitle: "Headband",
  },
  {
    thumbnail: Img4, // URL for the fourth item's image
    status: "Confirmed",
    title: "Nike",
    size: "One Size",
    style: "BA6208-492",
    subtitle: "Kids' Printed Gym Sack",
  },
  {
    thumbnail: Img1, // URL for the fifth item's image
    status: "Return Created",
    title: "Nike",
    size: "Size 0-6M",
    style: "AN0048-A4Y",
    subtitle: "Baby (0-6M) Booties (2 Pairs)",
  },
  {
    thumbnail: Img2, // URL for the sixth item's image
    status: "Cancelled",
    title: "Nike",
    size: "Size 0-6M",
    style: "AN0048-A4Y",
    subtitle: "Baby (0-6M) Booties (2 Pairs)",
  },
];

export const OrdersList = () => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      {items.map((item, idx) => {
        const { size, status, style, subtitle, thumbnail, title } = item;
        return (
          <React.Fragment key={idx}>
            <div className="flex gap-4">
              <NextLink href="/products/id">
                <Image
                  src={thumbnail}
                  alt={title}
                  className="size-32 rounded-lg"
                />
              </NextLink>
              <div className="flex grow flex-col gap-1 text-foreground-secondary">
                <Typography
                  as="p"
                  className={cn("text-foreground-secondary", {
                    "text-success": status === "Confirmed",
                    "text-danger": status === "Cancelled",
                    "text-warning": status === "Return Created",
                  })}
                >
                  {status}
                </Typography>
                <Typography
                  as="p"
                  className="font-medium text-foreground"
                >
                  {title}
                </Typography>
                <Typography as="p">{size}</Typography>
                <Typography as="p">{style}</Typography>
                <Typography as="p">{subtitle}</Typography>
              </div>
              <div className="flex flex-col gap-2 max-md:hidden">
                <Button
                  isRounded
                  color="primary"
                >
                  Track Package
                </Button>
                <Button
                  isRounded
                  variant="outlined"
                  color="primary"
                >
                  View Or Manage
                </Button>
                <Button
                  isRounded
                  variant="light"
                  color="secondary"
                >
                  Invoice
                </Button>
              </div>
            </div>
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};
