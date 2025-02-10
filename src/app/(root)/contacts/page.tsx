"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/Contacts/ContactsForm";
import SponsorshipSection from "@/components/Contacts/SponsorshipSection";
import PartnershipSection from "@/components/Contacts/PartnershipSection";
export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-black text-white mb-20">
      <main className="container relative top-20 mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-cinzel text-4xl text-award-gold"
        >
          Contact Us
        </motion.h1>

        <div className="space-y-16">
          <ContactForm />
          <section id="sponsorship">
            <SponsorshipSection />
          </section>
          <section id="partnerships">
            <PartnershipSection />
          </section>
        </div>
      </main>
    </div>
  );
}
