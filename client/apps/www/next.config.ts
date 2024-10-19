import { sharedNextConfig } from "@repo/config/next.config";
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  ...sharedNextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
    typedEnv: true,
    scrollRestoration: false,
  },
};

export default nextConfig;
