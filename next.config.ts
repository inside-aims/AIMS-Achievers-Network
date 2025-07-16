/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "rawydxgmhktdgtzfzgae.supabase.co"],
    quality: 75,
  },
}

module.exports = nextConfig

