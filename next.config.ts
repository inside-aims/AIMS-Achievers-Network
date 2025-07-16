/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "rawydxgmhktdgtzfzgae.supabase.co"],
    qualities: [75],
  },
}

module.exports = nextConfig

