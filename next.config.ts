import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["localhost", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/400/400",
      },
      {
        protocol: "https",
        hostname: "qcloudimg.tencent-cloud.cn",
      }
    ],
  },
  reactStrictMode: false
};

export default nextConfig;
