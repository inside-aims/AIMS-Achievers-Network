"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredMoments = [
  { src: "/assets/gallery/gallery.webp?height=600&width=800", alt: "Winner's Grand Speech", size: "large" },
  { src: "/assets/gallery/gallery5.webp?height=400&width=400", alt: "Award Presentation", size: "medium" },
  { src: "/assets/gallery/gallery6.webp?height=400&width=400", alt: "Standing Ovation", size: "small" },
  // Add more featured moments...
]

export default function FeaturedCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl mb-6 text-award-gold font-cinzel">Featured Moments</h2>
      <div className="relative">
        <div ref={carouselRef} className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide">
          {featuredMoments.map((moment, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 snap-start
                ${moment.size === "large" ? "w-3/4" : "w-1/2"}
              `}
            >
              <div className="relative aspect-video">
                <Image
                  src={moment.src || "/assets/gallery/gallery5.webp"}
                  alt={moment.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <Button variant="outline" className="font-poppins text-white border-white">
                    View Full Moment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="lg"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-award-silver"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-award-silver"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

