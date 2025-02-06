import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <motion.div initial={{ scale: 1 }} whileFocus={{ scale: 1.02 }} className="relative">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-award-gold/20 bg-black px-3 py-2 text-sm text-award-silver placeholder:text-award-silver/50 focus:outline-none focus:ring-2 focus:ring-award-gold focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <motion.div
        className="absolute inset-0 rounded-md bg-award-gold/10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileFocus={{ opacity: 1 }}
      />
    </motion.div>
  )
})
Input.displayName = "Input"

export { Input }

