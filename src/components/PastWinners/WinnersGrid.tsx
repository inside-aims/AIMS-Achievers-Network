import type React from "react"
import { motion } from "framer-motion"
import WinnerCardComponent from "./WinnersCard"
interface Winner {
  id: string
  image: string
  name: string
  eventTitle: string
  year: number
  description: string
  link: string
}

interface WinnersGridProps {
  winners: Winner[]
}

const WinnersGridComponent: React.FC<WinnersGridProps> = ({ winners }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {winners.map((winner) => (
        <WinnerCardComponent
          key={winner.id}
          image={winner.image}
          name={winner.name}
          eventTitle={winner.eventTitle}
          year={winner.year}
          description={winner.description}
          link={winner.link}
        />
      ))}
    </motion.div>
  )
}

export default WinnersGridComponent

