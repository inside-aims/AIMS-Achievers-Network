"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/shared/Navigation/Navbar"
import ContactForm from "@/components/Contacts/ContactsForm"
import SponsorshipSection from "@/components/Contacts/SponsorshipSection"
import PartnershipSection from "@/components/Contacts/PartnershipSection"
import Footer from "@/components/shared/Footer/Footer"
export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8 relative top-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-award-gold mb-12 font-cinzel"
        >
          Contact Us
        </motion.h1>

        <div className="space-y-16">
          <ContactForm />
          <SponsorshipSection />
          <PartnershipSection />
        </div>
      </main>
      <div className="relative top-20">
      <Footer/>

      </div>
    </div>
  )
}

