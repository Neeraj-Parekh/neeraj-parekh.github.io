/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/gh/devicons/devicon/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
