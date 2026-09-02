import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/derinles",
        destination: "https://derinles.vercel.app/derinles",
      },
      {
        source: "/derinles/:path*",
        destination: "https://derinles.vercel.app/derinles/:path*",
      },
    ];
  },
};

export default nextConfig;
