import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512, 640],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.3.11"],
};

export default nextConfig;
