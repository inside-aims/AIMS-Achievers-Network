import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SponsorshipSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-award-blue/10 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-award-gold mb-6 font-cinzel">Sponsorship Opportunities</h2>
      <p className="text-award-silver mb-6 font-poppins">
        Join us in celebrating excellence in academia. By becoming a sponsor, you'll gain visibility among the brightest
        minds in tertiary education and contribute to the recognition of outstanding achievements.
      </p>
      <ul className="list-disc list-inside text-award-silver mb-6 font-poppins">
        <li>Brand exposure to a highly engaged academic audience</li>
        <li>Networking opportunities with industry leaders and innovators</li>
        <li>Demonstrate your commitment to educational excellence</li>
        <li>Tailored sponsorship packages to suit your goals and budget</li>
      </ul>
      <Button className="bg-award-gold hover:bg-award-gold/80 text-black font-bold">
        Explore Sponsorship Packages <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.section>
  )
}

