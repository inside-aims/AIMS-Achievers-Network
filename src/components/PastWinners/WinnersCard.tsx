import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type React from "react"

interface WinnerCardProps {
  image: string
  name: string
  eventTitle: string
  year: number
  description: string
  link: string
}

const WinnerCardComponent: React.FC<WinnerCardProps> = ({ image, name, eventTitle, year, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-award-blue/10 rounded-lg overflow-hidden shadow-lg border border-award-gold/20"
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name} - ${eventTitle} winner`}
          fill
          objectFit="contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-award-gold mb-2 font-cinzel">{name}</h3>
        <p className="text-award-silver mb-2 font-poppins">
          {eventTitle} - {year}
        </p>
        <p className="text-white mb-4 font-poppins">{description}</p>
        <Button
          asChild
          variant="outline"
          className="w-full justify-center border-award-gold text-award-gold hover:bg-award-gold hover:text-black"
        >
          <a href={link}>Learn More</a>
        </Button>
      </div>
    </motion.div>
  )
}

export default WinnerCardComponent

