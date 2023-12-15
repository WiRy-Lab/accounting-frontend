// @ts-check
/** @type {import('next').NextConfig} */

const { API_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path((?!auth).*)',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
