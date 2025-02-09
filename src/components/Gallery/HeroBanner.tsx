import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="relative h-[60vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/gallery/galleryhero1.webp" // Ensure this path is correct
          alt="Award Event"
          layout="fill"
          objectFit="cover"
          objectPosition="center-right"
          quality={90} // Adjust quality for optimization
          priority // Ensures fast loading
        />
      </div>

      {/* Black Gradient Mask with Framer Motion */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-award-customBlack to-award-customBlack/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }} // 50% black opacity
        transition={{ duration: 1.2, ease: "easeOut" }} // Smooth transition
      />

      {/* Overlay and Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl text-gradient-to-t from-award-gold via-award-gold to-award-silver mb-4 font-cinzel">
            Relive the Moments. Celebrate Excellence.
          </h1>
        </div>
      </div>
    </section>
  )
}
