import { Button } from "../../ui/Button";
import Image from "next/image";

export default function CampingHero() {
  return (
    <div className="relative w-full max-w-[1050px] h-[400px] sm:h-[300px] mx-auto overflow-hidden group">
      {/* Background Image */}
      <Image
        src="/images/camping.jpg"
        alt="Camping Ground"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col sm:flex-row items-center justify-between p-8 sm:px-16">
        {/* Left Content */}
        <div className="flex flex-col gap-4 text-center sm:text-left max-w-[594px]">
          <span className="text-white font-opensans font-bold text-sm uppercase tracking-[2px]">
            camping
          </span>

          <h1 className="text-white font-montserrat font-semibold text-3xl sm:text-4xl leading-tight">
            Our Promise to You
          </h1>

          <p className="text-gray-200 font-inter text-base leading-relaxed">
            We craft meaningful adventures. From trek prep and gear selection to
            exploring local culture responsibly, we’re here to help you discover
            new places and enjoy nature. Whether you’re a newbie or a seasoned
            trekker, join us to explore trails and create lasting memories.
          </p>
        </div>

        {/* Right Content - Button */}
        <div className="mt-4 sm:mt-0">
          <Button
            variant="solid"
            className="bg-[#CA6702] text-white hover:bg-[#CA6702]/90 px-6 py-3 whitespace-nowrap"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
