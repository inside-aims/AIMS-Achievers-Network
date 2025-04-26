"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Partnership() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-semibold mb-6 text-award-blue">Partnership Proposals</h2>
      <p className="mb-4 text-award-customBlack">
        We&apos;re always open to exploring new partnerships that can bring value to our awards and the wider community.
      </p>
      <ul className="list-disc list-inside mb-6 text-award-customBlack">
        <li>Co-branded events and initiatives</li>
        <li>Collaborative content creation</li>
        <li>Joint research projects</li>
        <li>Cross-promotion opportunities</li>
      </ul>
      <Button className="bg-award-deepBlue hover:bg-award-blue text-white">Discuss Partnership</Button>
    </motion.section>
  )
}

