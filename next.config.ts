import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: false,
    optimizePackageImports: ["@chakra-ui/react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
