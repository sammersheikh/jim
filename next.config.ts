import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c.tenor.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
