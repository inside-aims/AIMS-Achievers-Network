"use client";

import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Trophy, Calendar, Users, Star, Award, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/shared/Navigation/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Footer from "@/components/shared/Footer/Footer";
import { Carousel } from "@/components/Carosel/Carosel";
import Link from "next/link";
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const carouselImages = [
  "/assets/about.webp",
  "/assets/about1.webp",
  "/assets/about2.webp",
];
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          ref={targetRef}
          style={{ opacity, scale }}
          className="relative h-screen overflow-hidden"
        >
          <Image
            src="/assets/heroimage4.webp"
            alt="Victory Statue"
            fill
            className="h-full w-full object-cover brightness-50"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"
          />
          <div className="container relative flex h-full items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-3xl space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="bg-gradient-to-r from-award-gold via-award-silver to-award-gold bg-clip-text font-cinzel text-6xl font-bold tracking-tighter text-transparent sm:text-7xl md:text-8xl"
              >
                Elevating Academic Excellence
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="font-poppins text-xl text-award-silver md:text-2xl/relaxed"
              >
                Honoring the Brightest Minds in Tertiary Education
              </motion.p>
              <motion.div variants={fadeInUp}>
                <AnimatedButton size="lg">Nominate Now</AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <section className="bg-award-blue/10 py-24">
          <div className="container">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid items-center gap-12 md:grid-cols-2"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2 className="font-cinzel text-4xl font-bold text-award-gold">
                  About Aims Achievers Network
                </h2>
                <p className="font-poppins text-lg text-award-silver">
                  The Aims Achievers Network (AAN) is dedicated to recognizing
                  and celebrating outstanding achievements in tertiary
                  education. We believe in the power of acknowledging excellence
                  to inspire future generations of scholars and leaders.
                </p>
                <Link href="/about"passHref className="relative top-5">
                  <AnimatedButton size="lg">Learn More</AnimatedButton>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative h-96">
                <Carousel images={carouselImages} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Awards Categories */}
        <section className="bg-black py-24">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center text-4xl font-bold text-award-gold"
            >
              Award Categories
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-3"
            >
              {[
                {
                  icon: Star,
                  title: "Academic Excellence",
                  description: "Recognizing top academic performers",
                },
                {
                  icon: Zap,
                  title: "Innovation",
                  description: "Honoring groundbreaking research and ideas",
                },
                {
                  icon: Users,
                  title: "Community Impact",
                  description: "Celebrating contributions to society",
                },
                {
                  icon: Award,
                  title: "Leadership",
                  description: "Acknowledging exceptional student leaders",
                },
                {
                  icon: Calendar,
                  title: "Lifetime Achievement",
                  description: "Honoring career-long contributions",
                },
                {
                  icon: Trophy,
                  title: "Rising Star",
                  description: "Recognizing promising young talents",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -10px rgba(255, 215, 0, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card>
                    <CardHeader>
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mb-2"
                      >
                        <category.icon className="h-12 w-12 text-award-gold" />
                      </motion.div>
                      <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-award-blue/10 py-24">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center text-4xl font-bold text-award-gold"
            >
              What Our Winners Say
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2"
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
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardContent className="p-6">
                      <p className="mb-4 font-poppins italic text-award-silver">
                        "{testimonial.quote}"
                      </p>
                      <CardTitle className="mb-1 text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.title}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-black py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-center"
            >
              <h2 className="font-poppins text-4xl font-bold text-award-gold">
                Ready to Recognize Excellence?
              </h2>
              <p className="mx-auto max-w-2xl font-poppins text-xl text-award-silver">
                Join us in celebrating the brightest minds and most impactful
                contributions in tertiary education.
              </p>
              <AnimatedButton size="lg">Nominate Now</AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-award-blue/10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container"
          >
            <div className="mx-auto max-w-2xl space-y-8 text-center">
              <h2 className="font-cinzel text-3xl font-bold text-award-gold">
                Stay Informed
              </h2>
              <p className="font-poppins text-lg text-award-silver">
                Subscribe to our newsletter for updates on upcoming events,
                award announcements, and inspiring stories from our winners.
              </p>
              <motion.div
                className="mx-auto flex max-w-md items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow rounded-r-none"
                />
                <AnimatedButton size="lg" className="rounded-l-none">
                  Subscribe
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
