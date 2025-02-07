"use client";
import MissionSection from "@/components/AboutSection/Mission-Section";
import HistorySection from "@/components/AboutSection/History-Section";
import TeamSection from "@/components/AboutSection/Team-Section";
import { Navbar } from "@/components/shared/Navigation/Navbar";
import Footer from "@/components/shared/Footer/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section id="our-mission">
        <MissionSection />
      </section>
      <section id="our-history">
        <HistorySection />
      </section>
      <section id="team-section">
        <TeamSection />
      </section>
      <Footer />
    </main>
  );
}
