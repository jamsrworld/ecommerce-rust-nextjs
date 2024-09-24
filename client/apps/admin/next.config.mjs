/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
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
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
