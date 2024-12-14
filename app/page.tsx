import { Hero } from "@/src/components/sections/Hero/Hero";
import { Packages } from "@/src/components/sections/PlacesToGo/Packages";
import CampInfrastructure from "../src/components/sections/camping/CampInfrastructure";
import AboutSection from "@/src/components/sections/about/AboutSection";
import PhotoGallery from "@/src/components/sections/Gallery/PhotoGallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <Packages />
      <AboutSection />
      <PhotoGallery />
      <CampInfrastructure />
    </main>
  );
}
