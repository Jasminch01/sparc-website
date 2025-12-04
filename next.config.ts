import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",     // allow ALL hostnames
      },
      {
        protocol: "http",
        hostname: "**",     // if you also want to allow non-https images
      },
    ],
  },
};

export default nextConfig;
