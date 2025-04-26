"use client";

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react"

const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }
const Footer = () => {
  return (
    <>
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
                  <div>
                    {section.title === "Follow Us" ? (
                      <div className="flex space-x-4 mt-2">
                        <a
                          href="#"
                          aria-label="Twitter"
                          className="text-award-silver hover:text-award-gold transition-colors"
                        >
                          <Twitter className="w-6 h-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          className="text-award-silver hover:text-award-gold transition-colors"
                        >
                          <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="Instagram"
                          className="text-award-silver hover:text-award-gold transition-colors"
                        >
                          <Instagram className="w-6 h-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="Facebook"
                          className="text-award-silver hover:text-award-gold transition-colors"
                        >
                          <Facebook className="w-6 h-6" />
                        </a>
                      </div>
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
                  </div>
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
    </>
  )
}

export default Footer