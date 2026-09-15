import { Approach } from "@/components/features/approach";
import { Hero } from "@/components/features/hero";
import { SelectedWorks } from "@/components/features/selected-works";
import { Services } from "@/components/features/services";
import { StatsBand } from "@/components/features/stats-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="grid grid-cols-1 border-t-2 border-ink-700 md:grid-cols-[1fr_1.6fr]">
        <Services />
        <SelectedWorks />
      </section>
      <StatsBand />
      <Approach />
    </>
  );
}
