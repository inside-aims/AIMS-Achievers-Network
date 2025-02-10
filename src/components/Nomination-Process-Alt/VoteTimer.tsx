"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function VotingTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 6,
    minutes: 32,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.days === 0 && prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer)
          return prevTime
        }

        const newTime = { ...prevTime }
        if (newTime.seconds > 0) {
          newTime.seconds--
        } else {
          newTime.seconds = 59
          if (newTime.minutes > 0) {
            newTime.minutes--
          } else {
            newTime.minutes = 59
            if (newTime.hours > 0) {
              newTime.hours--
            } else {
              newTime.hours = 23
              newTime.days--
            }
          }
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center text-award-silver mb-6"
    >
      <p className="text-lg">
        Voting closes in{" "}
        <span className="font-bold text-award-gold">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </p>
    </motion.div>
  )
}

