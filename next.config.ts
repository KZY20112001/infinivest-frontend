import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: false,
    optimizePackageImports: ["@chakra-ui/react"],
  },
  productionBrowserSourceMaps: false, // Disable source maps in development

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
