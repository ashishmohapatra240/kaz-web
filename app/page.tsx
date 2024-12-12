import { Hero } from "@/src/components/sections/Hero/Hero";
import { PlacesToGo } from "@/src/components/sections/PlacesToGo/PlacesToGo";
import CampInfrastructure from "../src/components/sections/camping/CampInfrastructure";
import AboutSection from "@/src/components/sections/about/AboutSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PlacesToGo />
      <CampInfrastructure />
      <AboutSection />
    </main>
  );
}
