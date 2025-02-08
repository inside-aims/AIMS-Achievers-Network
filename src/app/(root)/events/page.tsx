"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/shared/Navigation/Navbar";
import EventCard from "@/components/Events/EventCard";
import NewsCard from "@/components/Events/NewsCrad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, SearchIcon } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EventsPage() {
  return (
    <>
    <div className="mt-20 min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.h1
            className="mb-4 font-cinzel text-5xl font-bold text-award-gold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AimsAchieversNetwork Events
          </motion.h1>
          <motion.p
            className="mb-8 font-poppins text-xl text-award-silver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover and celebrate excellence in academia
          </motion.p>

          {/* Search and Filter */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative max-w-md flex-grow">
              <Input
                type="text"
                placeholder="Search events"
                className="border-award-gold/20 bg-award-blue/10 pl-10 text-white"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-award-silver" />
            </div>
            <Button
              variant="outline"
              className="border-award-gold text-award-gold hover:bg-award-gold hover:text-black"
            >
              <CalendarIcon className="mr-2 h-4 w-4" /> Filter by Date
            </Button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="mb-8 font-cinzel text-3xl font-bold text-award-gold">
            Upcoming Events
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <EventCard
              title="Annual AAN Awards Ceremony"
              date="September 15, 2024"
              image="/placeholder.svg?height=400&width=600"
              description="Join us for a night of celebration as we honor the brightest minds in academia."
              link="#"
              status="upcoming"
            />
            <EventCard
              title="Research Symposium"
              date="October 5-7, 2024"
              image="/placeholder.svg?height=400&width=600"
              description="A three-day event showcasing groundbreaking research from across the globe."
              link="#"
              status="upcoming"
            />
            <EventCard
              title="Leadership in Education Conference"
              date="November 20, 2024"
              image="/placeholder.svg?height=400&width=600"
              description="Exploring the future of educational leadership and innovation."
              link="#"
              status="upcoming"
            />
          </motion.div>
        </section>

        {/* Current Events */}
        <section className="mb-16">
          <h2 className="mb-8 font-cinzel text-3xl font-bold text-award-gold">
            Current Events
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <EventCard
              title="Summer Research Program"
              date="June 1 - August 31, 2024"
              image="/placeholder.svg?height=400&width=600"
              description="Ongoing summer research opportunities for undergraduate students."
              link="#"
              status="current"
            />
            <EventCard
              title="Virtual Lecture Series"
              date="Every Tuesday, 7 PM EST"
              image="/placeholder.svg?height=400&width=600"
              description="Weekly lectures from distinguished professors and industry leaders."
              link="#"
              status="current"
            />
          </motion.div>
        </section>

        {/* Past Events */}
        <section className="mb-16">
          <h2 className="mb-8 font-cinzel text-3xl font-bold text-award-gold">
            Past Events
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <EventCard
              title="COMPSSA X-CLUSIVE AWARDS"
              date="September 15, 2024"
              image="/assets/pastevent1.webp"
              description="Relive the moments from last year's spectacular awards ceremony."
              link="#"
              status="past"
            />
            <EventCard
              title="International Education Forum"
              date="March 10-12, 2023"
              image="/placeholder.svg?height=400&width=600"
              description="A global discussion on the future of international education and collaboration."
              link="#"
              status="past"
            />
            <EventCard
              title="Emerging Scholars Symposium"
              date="May 5, 2023"
              image="/placeholder.svg?height=400&width=600"
              description="Showcasing the work of promising early-career researchers and academics."
              link="#"
              status="past"
            />
          </motion.div>
        </section>

        {/* News and Announcements */}
        <section>
          <h2 className="mb-8 font-cinzel text-3xl font-bold text-award-gold">
            News and Announcements
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <NewsCard
              title="AAN Launches New Research Grant Program"
              date="July 1, 2024"
              excerpt="The Aims Achievers Network is proud to announce a new $5 million research grant program to support innovative projects in STEM fields."
              link="#"
            />
            <NewsCard
              title="Call for Nominations: 2024 AAN Awards"
              date="June 15, 2024"
              excerpt="Nominations are now open for the 2024 AAN Awards. Submit your nominations for outstanding achievements in academia."
              link="#"
            />
            <NewsCard
              title="AAN Partners with Global Universities for Exchange Program"
              date="May 30, 2024"
              excerpt="A new partnership program aims to facilitate international academic exchanges and collaborations."
              link="#"
            />
            <NewsCard
              title="Annual Report: Impact of AAN Awards on Academic Careers"
              date="April 22, 2024"
              excerpt="Our latest report shows the significant positive impact of AAN awards on recipients' career trajectories and research output."
              link="#"
            />
          </motion.div>
        </section>
      </main>
    </div>
    <Navbar />

    </>
    
  );
}
