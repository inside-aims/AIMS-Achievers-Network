import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PartnershipSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-award-blue/10 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl text-award-gold mb-6 font-cinzel">Partnership Opportunities</h2>
      <p className="text-award-silver mb-6 font-poppins">
        Collaborate with us to create meaningful impact in the academic community. Our partnerships are designed to
        foster innovation, support research, and enhance the educational landscape.
      </p>
      <ul className="list-disc list-inside text-award-silver mb-6 font-poppins">
        <li>Collaborative research initiatives</li>
        <li>Joint educational programs and workshops</li>
        <li>Access to a network of academic institutions and industry leaders</li>
        <li>Opportunities to shape the future of tertiary education</li>
      </ul>
      <Button className="bg-award-gold hover:bg-award-gold/80 text-black font-bold">
        Discuss Partnership Opportunities <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.section>
  )
}

