import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },

  // Keep production builds clean and deterministic.
  poweredByHeader: false,

  // Compress server responses.
  compress: true,

  // Prevent unnecessary source-map generation in production.
  productionBrowserSourceMaps: false,
};

export default nextConfig;