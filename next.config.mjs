/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/bingo-batallon-1',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
