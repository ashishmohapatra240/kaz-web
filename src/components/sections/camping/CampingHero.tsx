import { Button } from "../../ui/Button";
import Image from "next/image";

export default function CampingHero() {
  return (
    <div className="relative w-full max-w-[1050px] h-[300px] mx-auto rounded-xl overflow-hidden group">
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
      <div className="relative h-full px-16 py-20 flex justify-between items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-opensans font-bold text-sm uppercase tracking-[2px]">
            camping
          </span>

          <h1 className="text-white font-montserrat font-semibold text-4xl leading-tight">
            Your Best Camping Ground
          </h1>

          <p className="text-gray-200 font-inter text-base leading-relaxed max-w-[594px]">
            Nullam semper etiam congue lacinia nunc, sit. Quam vel vestibulum
            faucibus dolor non semper leo quis. Pretium quam lacus.
          </p>
        </div>

        {/* Right Content - Button */}
        <Button
          variant="solid"
          className="bg-white text-gray-900 hover:bg-secondary/90 px-8"
        >
          Learn More
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
