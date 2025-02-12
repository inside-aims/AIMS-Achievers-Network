"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AIMS Achievers Network?",
  answer: "AIMS Achievers Network is a platform that allows tertiary institutions to host, showcase, and vote on university events and competitions, fostering excellence and student engagement."
  },
  {
    question: "How does the platform work?",
    answer:
      "Universities can list their events, and students can vote for their favorites. The platform ensures fairness and credibility through a transparent voting system.",
  },
  {
    question: "Who can participate?",
    answer:
      "Students, faculty members, and institutions from accredited tertiary institutions can host or engage with events on the platform.",
  },
  {
    question: "What types of events can be hosted?",
    answer:
      "Academic conferences, innovation challenges, cultural festivals, talent shows, sports competitions, and other student-centered events can be featured.",
  },
  {
    question: "How is voting conducted?",
    answer:
      "Voting is done digitally on the platform, ensuring real-time engagement and fair results.",
  },
  {
    question: "Why should universities use AIMS Achievers Network?",
    answer:
      "It enhances visibility, credibility, and participation in campus events, creating a thriving network for collaboration and recognition.",
  },
];

export default function FAQSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="mb-6 font-cinzel text-3xl text-award-gold">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-award-silver hover:text-award-gold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-award-silver">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
