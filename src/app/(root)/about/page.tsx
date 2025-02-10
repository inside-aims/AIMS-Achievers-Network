import MissionSection from "@/components/AboutSection/Mission-Section";
import HistorySection from "@/components/AboutSection/History-Section";
import TeamSection from "@/components/AboutSection/Team-Section";

export default function Page() {
  return (
    <main className="relative top-20 min-h-screen mb-24">
      <MissionSection />
      <HistorySection />
      <TeamSection />
    </main>
  );
}
