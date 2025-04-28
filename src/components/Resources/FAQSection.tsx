"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the Aims Achievers Network (AAN) Awards?",
    answer:
      "The AAN Awards is an annual recognition program celebrating excellence in tertiary education. It honors outstanding achievements of students, educators, and institutions across various categories.",
  },
  {
    question: "Who is eligible to be nominated for an AAN Award?",
    answer:
      "Students, faculty members, and institutions from accredited tertiary education institutions are eligible for nomination. Specific eligibility criteria may vary by award category.",
  },
  {
    question: "How can I nominate someone for an AAN Award?",
    answer:
      "Nominations can be submitted through our online nomination form. You'll need to provide details about the nominee and a justification for their nomination. The nomination process typically opens several months before the awards ceremony.",
  },
  {
    question: "What are the different award categories?",
    answer:
      "Our award categories include Academic Excellence, Innovation in Education, Community Impact, Leadership in Education, Lifetime Achievement, and Rising Star. Each category has specific criteria and is designed to recognize different aspects of excellence in tertiary education.",
  },
  {
    question: "How are the winners selected?",
    answer:
      "Winners are selected through a rigorous evaluation process. After the nomination period, our panel of expert judges reviews all submissions. Shortlisted nominees may be invited for interviews or to submit additional information. The final winners are chosen based on the judges' scores and deliberations.",
  },
  {
    question: "When and where is the AAN Awards ceremony held?",
    answer:
      "The AAN Awards ceremony is typically held annually in September. The venue may change each year and is announced several months in advance on our website and social media channels.",
  },
]

export default function FAQSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-3xl text-award-gold mb-8 font-cinzel text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-award-silver hover:text-award-gold px-2 py-3 text-left">
                {faq.question}
              </AccordionTrigger>

              {/* ✨ Animate Accordion Content ✨ */}
              <AccordionContent asChild>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-award-silver px-4 py-2"
                >
                  {faq.answer}
                </motion.div>
              </AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>
    </div>
  )
}
