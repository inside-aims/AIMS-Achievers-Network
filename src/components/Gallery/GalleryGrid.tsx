"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const filters = ["All", "Nominees", "Winners", "Ceremony", "Behind-the-Scenes"];

type ImageType = {
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
  category: string;
};

const images: ImageType[] = [
  {
    src: "/assets/gallery/gallery4.webp",
    alt: "Winner Announcement",
    size: "large",
    category: "Ceremony",
  },
  {
    src: "/assets/gallery/gallery2.webp",
    alt: "Nominee Snapshot",
    size: "small",
    category: "Ceremony",
  },
  {
    src: "/assets/gallery/gallery3.webp",
    alt: "Reaction Shot",
    size: "small",
    category: "Ceremony",
  },

  // Add more images here...
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter(img => img.category === activeFilter);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Filter Buttons */}
      <div className="sticky top-0 z-10 mb-8 flex gap-2 overflow-x-auto bg-award-customBlack px-4 py-4">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="font-poppins transition-all duration-300"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${img.size === "large" ? "md:col-span-2 md:row-span-2" : ""} ${img.size === "medium" ? "md:col-span-2 md:row-span-1" : ""} `}
          >
            {/* Image */}
            <Image
              src={img.src}
              alt={img.alt}
              layout="responsive"
              width={400}
              height={400}
              objectFit="cover"
              className="rounded-lg"
            />

            {/* Overlay with Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-60">
              <p className="font-poppins text-lg text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
