import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daioi4xdbqyhz.cloudfront.net",
        pathname: "/radio/**",
      },
      {
        protocol: "https",
        hostname: "daioi4xdbqyhz.cloudfront.net",
        pathname: "/radio-lyric-ads/**",
      },
    ],
  },
};

export default nextConfig;
