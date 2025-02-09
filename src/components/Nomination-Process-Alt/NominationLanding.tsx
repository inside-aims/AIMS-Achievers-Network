import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface NominationLandingProps {
  onStart: () => void
}

export default function NominationLanding({ onStart }: NominationLandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-award-gold mb-4 font-cinzel">
        Nominate the Best Minds in Tertiary Education
      </h2>
      <p className="text-lg text-award-silver mb-6 font-poppins">
        Recognize outstanding achievements and contribute to the future of academia. Nominations close in 30 days.
      </p>
      <Button onClick={onStart} size="lg" className="bg-award-gold hover:bg-award-gold/80 text-black font-bold">
        Start Nomination
      </Button>
    </motion.div>
  )
}

