"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSection from "./Animated-Section"
export default function HistorySection() {
  return (
    <section id="history" className="w-full py-12 bg-silver/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatedSection className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-award-deepBlue/10 rounded-lg"></div>
              <Image
                src="/assets/about.webp"
                alt="History illustration"
                className="relative rounded-lg object-cover transform transition-transform duration-500 hover:scale-105"
                width={700}
                height={400}
              />
            </motion.div>
          </AnimatedSection>
          <AnimatedSection className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl tracking-tighter text-deepBlue font-cinzel">Our History</h2>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="border-l-4 border-gold pl-4"
              >
                <p className="text-lg text-gray-700 font-poppins">
                  Founded with a vision of excellence, our journey spans decades of innovation, growth, and unwavering
                  commitment to quality. Each milestone in our history represents a step forward in our mission to serve
                  and excel.
                </p>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

