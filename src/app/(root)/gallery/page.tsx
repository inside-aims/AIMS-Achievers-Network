"use client"

import React from 'react'

import HeroBanner from '@/components/Gallery/HeroBanner'
import GalleryGrid from '@/components/Gallery/GalleryGrid'
import FeaturedCarousel from '@/components/Gallery/FeaturedCarousel'
import SocialWall from '@/components/Gallery/SocialWall'
import Footer from '@/components/shared/Footer/Footer'

const page = () => {
  return (
   <>
   <main className="min-h-screen bg-award-customBlack">
      <HeroBanner />
      <GalleryGrid />
      <FeaturedCarousel />
      <SocialWall />
      <Footer />
    </main>
   </>
  )
}

export default page