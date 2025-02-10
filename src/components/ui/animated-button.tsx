"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ComponentProps } from "react"
import type React from "react" // Added import for React

interface AnimatedButtonProps extends ComponentProps<typeof Button> {
  children: React.ReactNode
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        {...props}
        className="bg-award-gold text-black hover:bg-award-gold/90 font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-award-gold/20"
      >
        {children}
      </Button>
    </motion.div>
  )
}

