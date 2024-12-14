import { stats } from "@/src/constants/about-stats";
// import { Button } from "../../ui/Button";
import SectionTitle from "../../ui/SectionTitle";
import StatsCard from "./StatsCard";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-[618px] flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="w-full lg:w-[55%] bg-[#4A5759] relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex items-center py-16 lg:py-0">
          <div className="w-full max-w-[600px] mx-auto lg:mx-0 px-6 sm:px-8 lg:pl-[160px] lg:pr-16 flex flex-col gap-8">
            <SectionTitle
              title="Who We Are?"
              subtitle="about"
              className="text-white text-center lg:text-left"
              decorationColor="secondary"
            />

            <div className="space-y-6 lg:space-y-8">
              <p className="text-white/90 font-inter text-sm sm:text-base leading-relaxed text-center lg:text-left">
                At Koraput Adventure Zone, we believe that exploring the
                outdoors should be exciting, safe, and memorable. Our founder,
                Soumya Mishra, who spent 12 years as a project trainer, followed
                his true passion - leading people into the mountains and sharing
                the joy of nature. He left his old career to create
                unforgettable trekking and camping adventures.
              </p>

              {/* <p className="text-white/90 font-inter text-sm sm:text-base leading-relaxed text-center lg:text-left">
                Pretium quam lacus interdum ultrices velit elementum idicul
                netus faucibus. Venenatis quam diam nisi id viverra dui proin
                quisque. Ridiculus adipiscing massa at amet, mi at auctor onec
                vestibulum
              </p> */}

              {/* <div className="flex justify-center lg:justify-start">
                <Button
                  variant="solid"
                  className="bg-[#CA6702] text-white hover:bg-[#CA6702]/90 px-6 py-3 whitespace-nowrap"
                >
                  Learn More
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[45%] bg-[#37973D] bg-opacity-90">
        <div className="h-full flex items-center py-16 lg:py-0">
          <div className="w-full max-w-[600px] mx-auto lg:mx-0 px-6 sm:px-8 lg:pl-16 lg:pr-8 flex flex-col gap-8">
            <div className="space-y-4">
              <SectionTitle
                title="How did we start?"
                subtitle="stats"
                className="text-white text-center lg:text-left"
                decorationColor="secondary"
              />

              <p className="text-white/90 font-inter text-sm sm:text-base leading-relaxed text-center lg:text-left">
                In 2022, we began offering organized camping trips around the
                scenic areas near Deomali. Over time, we have grown our
                services, guiding adventurers through some of the most stunning
                trails and peaks in India and beyond. Our founder is a certified
                high-altitude trekking guide and trained mountaineer. His
                experience ensures every journey with us is well-planned, safe,
                and fun. We pay close attention to proper acclimatization, gear
                selection, and safety measures so that you can focus on
                enjoying the adventure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
