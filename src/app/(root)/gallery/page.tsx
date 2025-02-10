"use client";

import React from "react";

import HeroBanner from "@/components/Gallery/HeroBanner";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import FeaturedCarousel from "@/components/Gallery/FeaturedCarousel";
import SocialWall from "@/components/Gallery/SocialWall";
;

const page = () => {
  return (
    <>
      <main className="min-h-screen bg-award-customBlack">
        <HeroBanner />
        <GalleryGrid />
        <FeaturedCarousel />
        <SocialWall />
      </main>
    </>
  );
};

export default page;
