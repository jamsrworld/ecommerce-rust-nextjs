/* eslint-disable  */
import { type NextConfig } from "next";

// eslint-disable-next-line import/prefer-default-export
export const sharedNextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            // dimensions: false,
            typescript: true,
            ext: "tsx",
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                      // disable minifyStyles
                      minifyStyles: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    contentDispositionType: "inline",
    remotePatterns: [
      {
        hostname: "*.jamsrworld.com",
      },
      {
        hostname: "avatars.jamsrworld.com",
      },
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "img.youtube.com",
      },
      {
        hostname: "*.jamsrworld.dev",
      },
      {
        hostname: "*.cloudfront.net",
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 60 * 60 * 24,
      static: 60 * 60 * 24,
    },
  },
};
