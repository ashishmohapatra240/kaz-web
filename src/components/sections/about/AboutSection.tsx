import { stats } from "@/src/constants/about-stats";
import { Button } from "../../ui/Button";
import SectionTitle from "../../ui/SectionTitle";
import StatsCard from "./StatsCard";



export default function AboutSection() {
  return (
    <section className="relative w-full h-[618px] flex">
      {/* Left Section */}
      <div className="w-[55%] bg-[#4A5759] relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex items-center">
          <div className="max-w-[600px] pl-[275px] pr-16 flex flex-col gap-8">
            <SectionTitle
              title="About Ranger"
              subtitle="about"
              className="text-white"
              decorationColor="secondary"
            />

            <div className="space-y-8">
              <p className="text-white/90 font-inter text-base leading-relaxed">
                Nullam semper etiam congue lacinia nunc, sit. Quam vel
                vestibulum faucibus dolor non semper leo quis. Pretium quam
                lacus.
              </p>

              <p className="text-white/90 font-inter text-base leading-relaxed">
                Pretium quam lacus interdum ultrices velit elementum idicul
                netus faucibus. Venenatis quam diam nisi id viverra dui proin
                quisque. Ridiculus adipiscing massa at amet, mi at auctor onec
                vestibulum
              </p>

              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[45%] bg-[#37973D] bg-opacity-90">
        <div className="h-full flex items-center">
          <div className="max-w-[450px] pl-16 pr-8 flex flex-col gap-8">
            <div className="space-y-4">
              <SectionTitle
                title="Ranger State Park in Stats"
                subtitle="stats"
                className="text-white"
                decorationColor="secondary"
              />

              <p className="text-white/90 font-inter text-base leading-relaxed">
                Nullam semper etiam congue lacinia nunc, sit. Quam vel
                vestibulum faucibus dolor non semper leo quis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
