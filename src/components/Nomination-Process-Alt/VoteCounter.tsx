import { motion } from "framer-motion"

interface VoteCounterProps {
  votes: number
}

export default function VoteCounter({ votes }: VoteCounterProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-lg font-semibold text-award-gold"
    >
      {votes} votes
    </motion.div>
  )
}

