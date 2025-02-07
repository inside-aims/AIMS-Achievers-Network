"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSection from "./Animated-Section"
export default function TeamSection() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Emma Williams",
      role: "Head of Operations",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter text-deepBlue mb-4 font-cinzel">Our Team</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-poppins">
              Meet the dedicated professionals who make our success possible through their expertise and commitment to
              excellence.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center space-y-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="relative w-40 h-40" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="absolute inset-0 bg-gold/20 rounded-full"></div>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="relative rounded-full object-cover border-4 border-award-gold"
                  width={160}
                  height={160}
                />
              </motion.div>
              <h3 className="text-xl font-semibold text-deepBlue font-cinzel">{member.name}</h3>
              <p className="text-silver font-poppins">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

