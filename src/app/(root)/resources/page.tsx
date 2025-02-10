"use client";

import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer/Footer";
import GuidelinesSection from "@/components/Resources/Guidlines";
import FAQSection from "@/components/Resources/FAQSection";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8 relative top-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-cinzel text-4xl text-award-gold"
        >
          Resources
        </motion.h1>

        <div className="space-y-16">
          <section id="faqs">
            <FAQSection />
          </section>
          <section id="guidlines">
            <GuidelinesSection />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
