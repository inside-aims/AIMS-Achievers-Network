import { motion } from "framer-motion"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

interface NewsCardProps {
  title: string
  date: string
  excerpt: string
  link: string
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, excerpt, link }) => {
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
      className="bg-award-blue/10 rounded-lg overflow-hidden shadow-lg border border-award-gold/20 p-6"
    >
      <h3 className="text-xl font-bold text-award-gold mb-2 font-cinzel">{title}</h3>
      <p className="text-award-silver mb-4 flex items-center font-poppins">
        <CalendarIcon className="mr-2 h-4 w-4" /> {date}
      </p>
      <p className="text-white mb-4 font-poppins">{excerpt}</p>
      <Button
        variant="outline"
        className="w-full justify-between border-award-gold text-award-gold hover:bg-award-gold hover:text-black"
      >
        Read More <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}

export default NewsCard

