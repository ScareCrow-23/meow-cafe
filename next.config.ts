import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // Helps catch bugs in dev and prod
  swcMinify: true, // Faster minification for production
  images: {
    domains: [
      "res.cloudinary.com", // if you're using Cloudinary
      "images.unsplash.com", // example if you fetch images externally
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // ensures TS errors break the build
  },
};

export default nextConfig;
