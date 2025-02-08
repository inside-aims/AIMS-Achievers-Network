import { motion } from "framer-motion"

const HeroComponent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-award-blue/10 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="h-full w-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center bg-no-repeat opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl text-award-gold font-cinzel mb-4"
        >
          Our Award Winners Over the Years
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-award-silver font-poppins max-w-3xl mx-auto"
        >
          Celebrating excellence and innovation in academia. Explore the achievements of our past winners and be
          inspired by their contributions to the world of education and research.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default HeroComponent

