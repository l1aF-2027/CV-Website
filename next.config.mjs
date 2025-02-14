/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "edge",
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/CV-Website",
  assetPrefix: "/CV-Website",
};

export default nextConfig;
