import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow higher-quality optimization for smooth gradient backgrounds
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
