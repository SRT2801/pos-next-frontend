import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http" ,
        hostname: process.env.DOMAIN! ,
      },
      {
        protocol: "https" ,
        hostname: process.env.DOMAIN! ,
      },
      {
        protocol: "https" ,
        hostname: "res.cloudinary.com" ,
      }
    ],
  },
};

export default nextConfig;
