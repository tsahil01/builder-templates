import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.worker.buildx.website'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
