"use client";

import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Trophy, Calendar, Users, Star, Award, Zap } from "lucide-react";
import TourGuideButton from "@/components/ui/pulsating-button"; // Ensure correct path
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

  const startTour = () => {
    console.log("Tour Guide Activated!");
    // Trigger your tour guide functionality here
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
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
              className="bg-gradient-to-r from-award-gold via-award-silver to-award-gold bg-clip-text font-cinzel text-6xl tracking-tighter text-transparent sm:text-7xl md:text-8xl"
            >
              Elevating Academic Excellence
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-poppins text-xl text-award-silver md:text-2xl/relaxed"
            >
              Honoring the Brightest Minds in Tertiary Education
            </motion.p>
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
              <h2 className="font-cinzel text-4xl text-award-gold">
                About Aims Achievers Network
              </h2>
              <p className="font-poppins text-lg text-award-silver">
                The Aims Achievers Network (AAN) is dedicated to recognizing and
                celebrating outstanding achievements in tertiary education. We
                believe in the power of acknowledging excellence to inspire
                future generations of scholars and leaders.
              </p>
              <Link href="/about" passHref className="relative top-5">
                <AnimatedButton size="lg">Learn More</AnimatedButton>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative h-96">
              <Carousel images={carouselImages} />
            </motion.div>
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
            <h2 className="text-4xl font-cinzel text-award-gold">
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
            <h2 className="font-cinzel text-3xl text-award-gold">
              Stay Informed
            </h2>
            <p className="font-poppins text-lg text-award-silver">
              Subscribe to our newsletter for updates on upcoming events, award
              announcements, and inspiring stories from our winners.
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

      {/* Tour Guide Button */}
      <div className="fixed bottom-8 right-8">
        <TourGuideButton onClick={startTour} />
      </div>
    </main>
  );
}
