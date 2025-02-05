"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Users, Star, Award, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Navbar } from "@/components/Navbar"
import { useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section ref={targetRef} style={{ opacity, scale }} className="relative h-screen overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Most%20Popular%20WordPress%20Themes%20In%20The%20World-tJfOUAOnHEFiQxSXuxjFpeNCB62FuY.jpeg"
            alt="Victory Statue"
            fill
            className="object-cover brightness-50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"
          />
          <div className="container relative h-full flex items-center">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-3xl space-y-8">
              <motion.h1
                variants={fadeInUp}
                className="font-cinzel text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-award-gold via-award-silver to-award-gold"
              >
                Elevating Academic Excellence
              </motion.h1>
              <motion.p variants={fadeInUp} className="font-poppins text-xl text-award-silver md:text-2xl/relaxed">
                Honoring the Brightest Minds in Tertiary Education
              </motion.p>
              <motion.div variants={fadeInUp}>
                <AnimatedButton>Nominate Now</AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <section className="py-24 bg-award-blue/10">
          <div className="container">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2 className="text-4xl font-bold text-award-gold">About AAN</h2>
                <p className="text-award-silver text-lg font-poppins">
                  The Aims Achievers Network (AAN) is dedicated to recognizing and celebrating outstanding achievements
                  in tertiary education. We believe in the power of acknowledging excellence to inspire future
                  generations of scholars and leaders.
                </p>
                <AnimatedButton>Learn More</AnimatedButton>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative h-96">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="Academic Achievement"
                  fill
                  className="object-cover rounded-lg shadow-2xl shadow-award-gold/20"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Awards Categories */}
        <section className="py-24 bg-black">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-award-gold mb-12"
            >
              Award Categories
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Star, title: "Academic Excellence", description: "Recognizing top academic performers" },
                { icon: Zap, title: "Innovation", description: "Honoring groundbreaking research and ideas" },
                { icon: Users, title: "Community Impact", description: "Celebrating contributions to society" },
                { icon: Award, title: "Leadership", description: "Acknowledging exceptional student leaders" },
                { icon: Calendar, title: "Lifetime Achievement", description: "Honoring career-long contributions" },
                { icon: Trophy, title: "Rising Star", description: "Recognizing promising young talents" },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-award-blue/5 border-award-gold/20 hover:border-award-gold/40 transition-colors h-full">
                    <CardContent className="p-6 space-y-4 flex flex-col items-center text-center">
                      <category.icon className="w-12 h-12 text-award-gold" />
                      <h3 className="font-bold text-award-gold text-xl font-poppins">{category.title}</h3>
                      <p className="text-award-silver font-poppins">{category.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-award-blue/10">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-award-gold mb-12"
            >
              What Our Winners Say
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8"
            >
              {[
                {
                  name: "Dr. Jane Smith",
                  title: "Innovation Award Winner",
                  quote:
                    "Winning the AAN Innovation Award was a pivotal moment in my career. It opened doors to collaborations I never thought possible.",
                },
                {
                  name: "Prof. John Doe",
                  title: "Lifetime Achievement Recipient",
                  quote:
                    "The AAN Lifetime Achievement Award is a testament to the impact of dedication and perseverance in academia.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-black/50 p-8 rounded-lg border border-award-gold/20"
                >
                  <p className="text-award-silver italic mb-4 font-poppins">"{testimonial.quote}"</p>
                  <p className="text-award-gold font-bold font-poppins">{testimonial.name}</p>
                  <p className="text-award-silver font-poppins">{testimonial.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-black">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl font-bold text-award-gold font-poppins">Ready to Recognize Excellence?</h2>
              <p className="text-award-silver text-xl max-w-2xl mx-auto font-poppins">
                Join us in celebrating the brightest minds and most impactful contributions in tertiary education.
              </p>
              <AnimatedButton>Nominate Now</AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-award-blue/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container"
          >
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold text-award-gold font-poppins">Stay Informed</h2>
              <p className="text-award-silver text-lg font-poppins">
                Subscribe to our newsletter for updates on upcoming events, award announcements, and inspiring stories
                from our winners.
              </p>
              <motion.div className="flex max-w-md mx-auto" whileHover={{ scale: 1.02 }}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black/50 border-award-gold/20 text-white rounded-r-none"
                />
                <AnimatedButton className="rounded-l-none">Subscribe</AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-award-gold/20 bg-black/95">
        <div className="container py-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                title: "About AAN",
                content: "Recognizing and celebrating excellence in tertiary education since 2010.",
              },
              {
                title: "Quick Links",
                links: ["Events", "Gallery", "Contact", "FAQs"],
              },
              {
                title: "Contact",
                content: "Email: info@aan.com\nPhone: (123) 456-7890\nAddress: 123 Academic Ave, Knowledge City",
              },
              {
                title: "Follow Us",
                links: ["Twitter", "LinkedIn", "Instagram", "Facebook"],
              },
            ].map((section, index) => (
              <motion.div key={index} variants={fadeInUp} className="space-y-4">
                <h4 className="font-bold text-award-gold font-poppins">{section.title}</h4>
                {section.content ? (
                  <p className="text-sm text-award-silver font-poppins">{section.content}</p>
                ) : (
                  <ul className="space-y-2 text-sm text-award-silver">
                    {section.links?.map((link) => (
                      <li key={link}>
                        <Link href="#" className="hover:text-award-gold transition-colors">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-award-gold/20 text-center text-sm text-award-silver font-poppins"
          >
            <p>&copy; 2024 Aims Achievers Network. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

