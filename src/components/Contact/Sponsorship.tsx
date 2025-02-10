"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Sponsorship() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-semibold mb-6 text-award-blue">Sponsorship Opportunities</h2>
      <p className="mb-4 text-award-customBlack">
        Interested in sponsoring our awards? We offer various packages to suit different needs and budgets.
      </p>
      <ul className="list-disc list-inside mb-6 text-award-customBlack">
        <li>Increased brand visibility</li>
        <li>Networking opportunities with industry leaders</li>
        <li>Recognition in all event materials</li>
        <li>VIP access to the awards ceremony</li>
      </ul>
      <Button className="bg-award-gold hover:bg-award-silver text-award-customBlack">Request Sponsorship Info</Button>
    </motion.section>
  )
}

