import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.builder.io',
        pathname: '/api/v1/image/**',
      },
    ],
  },
};

export default nextConfig;
