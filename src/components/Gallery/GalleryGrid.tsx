"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // animation

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
    size: "medium",
    category: "Ceremony",
  },
  // Add more...
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState<ImageType | null>(null);

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="sticky top-0 z-10 mb-8 flex gap-2 overflow-x-auto bg-award-customBlack px-4 py-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className={`font-poppins transition-all duration-300 whitespace-nowrap ${
              activeFilter === filter ? "border-b-2 border-award-gold" : ""
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
        {filteredImages.map((img, index) => {
          const sizeClass =
            img.size === "large"
              ? "sm:col-span-2 sm:row-span-2"
              : img.size === "medium"
              ? "sm:col-span-2 sm:row-span-1"
              : "";

          return (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-xl ${sizeClass}`}
              onClick={() => setSelectedImg(img)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-lg object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Overlay text for desktops */}
              <div className="hidden sm:flex absolute inset-0 items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300">
                <p className="text-white text-lg opacity-0 hover:opacity-100 transition-opacity font-poppins">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative w-full max-w-3xl aspect-[4/3]">
            <Image
              src={selectedImg.src}
              alt={selectedImg.alt}
              fill
              className="object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
