/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true
  }
}
