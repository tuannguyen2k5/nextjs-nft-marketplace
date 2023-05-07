/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataApiSecret: process.env.PINATA_API_SECRET
  },
}

module.exports = nextConfig
