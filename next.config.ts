import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://*.sharepoint.com https://teams.microsoft.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
