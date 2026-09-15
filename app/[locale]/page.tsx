import { Approach } from "@/components/features/approach";
import { Cta } from "@/components/features/cta";
import { FeaturedCases } from "@/components/features/featured-cases";
import { Hero } from "@/components/features/hero";
import { ServiceGrid } from "@/components/features/service-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <FeaturedCases />
      <Approach />
      <Cta />
    </>
  );
}
