import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React
import { useRouter } from "next/navigation"

interface EventCardProps {
  title: string
  date: string
  image: string
  description: string
  link: string
  status: "upcoming" | "current" | "past",
  location?: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, image, description, link, status }) => {
  const router = useRouter()
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-award-blue/10 rounded-lg overflow-hidden shadow-lg border border-award-gold/20"
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className={status === "past" ? "grayscale" : ""}
        />
        {status === "past" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Past Event</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-award-gold mb-2 font-cinzel">{title}</h3>
        <p className="text-award-silver mb-4 flex items-center font-poppins">
          <CalendarIcon className="mr-2 h-4 w-4" /> {date}
        </p>
        <p className="text-white mb-4 font-poppins">{description}</p>
        <Button
          variant="outline"
          className="w-full justify-between border-award-gold text-award-gold hover:bg-award-gold hover:text-black"
          onClick={() => router.push(`http://vote.localhost:3000${link}`)}
        >
          Learn More <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default EventCard

