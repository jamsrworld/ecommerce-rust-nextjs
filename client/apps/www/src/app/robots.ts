import { env } from "@/env";
import { type MetadataRoute } from "next";

// eslint-disable-next-line import/no-default-export
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
