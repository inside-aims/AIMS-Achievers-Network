"use client"

import { motion } from "framer-motion"

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
}

export function Logo() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-12 h-12"
      initial="hidden"
      animate="visible"
    >
      <motion.path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="#FFD700" strokeWidth="4" variants={pathVariants} />
      <motion.circle cx="50" cy="50" r="20" fill="none" stroke="#C0C0C0" strokeWidth="4" variants={pathVariants} />
      <motion.path
        d="M30 50 L70 50 M50 30 L50 70"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
        variants={pathVariants}
      />
    </motion.svg>
  )
}

