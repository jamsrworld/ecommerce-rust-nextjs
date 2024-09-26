import { APP_NAME, APP_SERVER_URL, COUNTRY_NAME } from "@repo/config/app";
import { APP_SEO_CONFIG } from "@repo/config/seo";
import type { Metadata } from "next";
import { withAppServerUrl } from "./url";

type Params = Metadata & { title: NonNullable<Metadata["title"]> };

export const createMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
  ...restProps
}: Params): Metadata => {
  return {
    title,
    description,
    keywords,
    publisher: APP_NAME,
    authors: [{ name: APP_NAME }],
    category: "E-commerce",
    openGraph: {
      locale: "en-US",
      type: "website",
      title,
      description: description ?? APP_SEO_CONFIG.description,
      countryName: COUNTRY_NAME,
      siteName: APP_NAME,
      url: APP_SERVER_URL,
      ...(openGraph?.images
        ? {}
        : {
            images: {
              url: withAppServerUrl("/og-image.png"),
              width: 429,
              height: 81,
            },
          }),
      ...openGraph,
    },
    twitter: {
      title,
      description: description ?? APP_SEO_CONFIG.description,
      ...twitter,
    },
    ...restProps,
  };
};
