// @ts-check
/** @type {import('next').NextConfig} */

const { API_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/auth/:path(me|register)',
        destination: `${API_URL}/auth/:path*`,
      },
      {
        source: '/api/:path((?!auth).*)',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
