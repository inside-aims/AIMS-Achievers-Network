import { motion } from "framer-motion"
import VotingTimer from "./VoteTimer"
import NomineeList from "./NomineeList"


export default function VotingPhase() {
  // In a real application, you would fetch this data from an API
  const nominees = [
    { id: 1, name: "John Doe", category: "Academic Excellence", votes: 120, image: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", category: "Innovation", votes: 98, image: "/placeholder.svg" },
    { id: 3, name: "Alex Johnson", category: "Leadership", votes: 85, image: "/placeholder.svg" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-award-gold mb-4 font-cinzel">Voting Phase</h2>
      <VotingTimer />
      <NomineeList nominees={nominees} />
    </motion.div>
  )
}

