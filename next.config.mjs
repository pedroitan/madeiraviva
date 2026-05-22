/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      {
        source: '/loja',
        destination: process.env.NEXT_PUBLIC_LOJA_URL ?? 'https://loja.ateliemadeiraviva.com',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
