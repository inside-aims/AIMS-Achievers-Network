"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSection from "./Animated-Section"
export default function MissionSection() {
  return (
    <section id="mission" className="w-full py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter text-deepBlue font-cinzel">Our Mission</h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-l-4 border-gold pl-4"
              >
                <p className="text-lg text-gray-700 font-poppins">
                  We strive to deliver excellence in everything we do, pushing the boundaries of innovation while
                  maintaining the highest standards of quality and professionalism.
                </p>
              </motion.div>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-deepBlue/10 rounded-lg"></div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Mission illustration"
                className="relative rounded-lg object-cover transform transition-transform duration-500 hover:scale-105"
                width={400}
                height={400}
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

