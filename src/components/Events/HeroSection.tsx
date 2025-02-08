import Image from "next/image"
import { AnimatedButton } from "@/components/ui/animated-button"

export function HeroSection() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <Image src="/assets/featured-event-banner.jpg" alt="Featured Event" fill className="object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Annual Awards Gala</h1>
          <p className="text-xl mb-6">Join us for a night of celebration - June 15, 2025</p>
          <AnimatedButton size="lg">Learn More</AnimatedButton>
        </div>
      </div>
    </section>
  )
}

