const assetPrefix = process.env.ASSET_PREFIX;

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: "fullscreen=()",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Cache-control",
            value: "no-store",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://api.giftlo.ng https://res.cloudinary.com; font-src 'self'; connect-src 'self' https://api.giftlo.ng https://docs.google.com; frame-src 'self' https://docs.google.com https://res.cloudinary.com https://view.officeapps.live.com https://api.giftlo.ng;"
          }
        ],
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
    // path: `${assetPrefix}/_next/image/`,
  },
};

export default nextConfig;
