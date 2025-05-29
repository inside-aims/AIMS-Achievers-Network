"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/Events/EventCard";
import NewsCard from "@/components/Events/NewsCrad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CalendarIcon, SearchIcon } from "lucide-react";
import { getSupabaseBrowserClient } from "@/supabase/client";
import { Event, EventStatus } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 },
// };

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EventsPage() {
  const voteDomain = process.env.NEXT_PUBLIC_VOTE_DOMAIN;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from('event')
      .select('*')
      .order('eventDate', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };

  const filterEvents = (status: EventStatus) => {
    const currentDate = new Date();
    
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      const voteStartDate = event.voteStartDate ? new Date(event.voteStartDate) : null;

      switch (status) {
        case 'upcoming':
          return voteStartDate && currentDate < voteStartDate;
        case 'current':
          return voteStartDate && 
                 currentDate >= voteStartDate && 
                 currentDate <= eventDate;
        case 'past':
          return currentDate > eventDate;
        default:
          return false;
      }
    }).filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderEventSection = (status: EventStatus, title: string) => (
    <section className="mb-16">
      <h2 className="mb-8 font-cinzel text-3xl text-award-gold">{title}</h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {loading ? (
          <div className="col-span-full text-center text-award-silver">Loading events...</div>
        ) : filterEvents(status).length > 0 ? (
          filterEvents(status).map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={new Date(event.eventDate).toLocaleDateString()}
              image={event.image || "/assets/default-event.webp"}
              description={event.description}
              link={`${voteDomain}/event/${event.id}/categories`}
              status={status}
              location={event.location}
              disabled={status === 'past'}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-award-silver">
            No {status} events available at this time.
          </div>
        )}
      </motion.div>
    </section>
  );

  return (
    <div className="mt-20 min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.h1
            className="mb-4 font-cinzel text-3xl text-award-gold lg:text-5xl"
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="mt-8">
          <Alert variant="default" className=" w-full md:w-1/2 animate-pulse">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads Up!</AlertTitle>
      <AlertDescription>
        Nominations for the <span className="font-bold text-award-gold">2025 PINNACLE FAST AWARD</span> are now open! <br />
        1. Please click on the event card to view the categories . <br />
        2. Click on the category you want to nominate for. <br />
        3. Click the Nominate Someone button to nominate your candidate or yourself . <br />
        
        
      </AlertDescription>
    </Alert>
          </div>
        </section>

        {renderEventSection('upcoming', 'Upcoming Events')}
        {renderEventSection('current', 'Current Events')}
        {renderEventSection('past', 'Past Events')}

        {/* Keep the News and Announcements section as is */}
         {/* News and Announcements */}
         <section>
            <h2 className="mb-8 font-cinzel text-3xl text-award-gold">
              News and Announcements
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {/* <NewsCard
                title="AAN Launches New Research Grant Program"
                date="July 1, 2024"
                excerpt="The Aims Achievers Network is proud to announce a new $5 million research grant program to support innovative projects in STEM fields."
                link="#"
              /> */}
              <NewsCard
                title="Call for Nominations: 2025 PINNACLE FAST AWARD "
                date="June 15, 2024"
                excerpt="Nominations are now open for the 2025 PINNACLE FAST AWARD. Submit your nominations for outstanding achievements in academia."
                link="vote.campushonorshub.com/event/5/categories"
              />
             
            </motion.div>
          </section>
      </main>
    </div>
  );
}
