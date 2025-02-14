/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "edge",
  },

  basePath: "/CV-Website",
  assetPrefix: "/CV-Website/public",
};

export default nextConfig;
