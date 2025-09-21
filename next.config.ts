import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["s3.timeweb.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "256mb",
    },
  },
};

export default nextConfig;
