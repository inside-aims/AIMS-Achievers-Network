"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  Star,
  Award,
  Zap,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import path from "path";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
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
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              {
                title: "About AAN",
                content:
                  "Recognizing and celebrating excellence in tertiary education since 2010.",
              },
              {
                title: "Quick Links",
                links: [
                  { name: "Events", path: "/events" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Contact", path: "/contacts" },
                  { name: "FAQ's", path: "/resources" },
                ],
              },
              {
                title: "Contact",
                content:
                  "Email: a.i.m.s582024@gmail.com\nPhone: (123) 456-7890\nAddress: Koforidua Technical University - Koforidua",
              },
              {
                title: "Follow Us",
                links: [
                  {
                    name: "Twitter",
                    icon: <Twitter className="h-6 w-6" />,
                    url: "#",
                  },
                  {
                    name: "LinkedIn",
                    icon: <Linkedin className="h-6 w-6" />,
                    url: "#",
                  },
                  {
                    name: "Instagram",
                    icon: <Instagram className="h-6 w-6" />,
                    url: "#",
                  },
                  {
                    name: "Facebook",
                    icon: <Facebook className="h-6 w-6" />,
                    url: "#",
                  },
                ],
              },
            ].map((section, index) => (
              <motion.div key={index} variants={fadeInUp} className="space-y-4">
                <h4 className="font-poppins font-bold text-award-gold">
                  {section.title}
                </h4>
                {section.content ? (
                  <p className="font-poppins text-sm text-award-silver">
                    {section.content}
                  </p>
                ) : (
                  <div>
                    {section.title === "Follow Us" ? (
                      <div className="mt-2 flex space-x-4">
                        <a
                          href="#"
                          aria-label="Twitter"
                          className="text-award-silver transition-colors hover:text-award-gold"
                        >
                          <Twitter className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          className="text-award-silver transition-colors hover:text-award-gold"
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="Instagram"
                          className="text-award-silver transition-colors hover:text-award-gold"
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                        <a
                          href="#"
                          aria-label="Facebook"
                          className="text-award-silver transition-colors hover:text-award-gold"
                        >
                          <Facebook className="h-6 w-6" />
                        </a>
                      </div>
                    ) : (
                      <ul className="space-y-2 text-sm text-award-silver">
                        {section.links?.map(link => (
                          <li key={link.name}>
                            {" "}
                            {/* Use link.name as the unique key */}
                            <Link
                              href={link.path}
                              className="transition-colors hover:text-award-gold"
                            >
                              {link.name}
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
            className="mt-12 border-t border-award-gold/20 pt-8 text-center font-poppins text-sm text-award-silver"
          >
            <p>&copy; 2024 Aims Achievers Network. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
