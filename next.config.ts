import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slashes keep the served URLs in sync with the trailing-slash
  // canonicals declared in each page's metadata (and match the RestoHost SEO
  // setup this site inherits).
  trailingSlash: true,
  images: {
    // Allow higher-quality optimization for smooth gradient backgrounds
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
