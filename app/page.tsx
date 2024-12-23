import { Hero } from "@/src/components/sections/Hero/Hero";
import { Packages } from "@/src/components/sections/PlacesToGo/Packages";
import CampInfrastructure from "../src/components/sections/camping/CampInfrastructure";
import AboutSection from "@/src/components/sections/about/AboutSection";
import PhotoGallery from "@/src/components/sections/Gallery/PhotoGallery";
import { Testimonials } from "@/src/components/sections/Testimonials/Testimonials";
import { BookingForm } from "@/src/components/sections/Hero/BookingForm";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingForm />
      <section id="packages">
        <Packages />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="gallery">
        <PhotoGallery />
      </section>
      <section id="camping">
        <CampInfrastructure />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
    </>
  );
}
