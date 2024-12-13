import { PlaceCard } from "./PackageCard";
import { PACKAGES } from "./constants/package";

export const Packages = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-gray-50">
      {/* Header */}
      <div className="max-w-[690px] mx-auto flex flex-col items-center gap-8 mb-16">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-[27px] h-[5px] border-[3px] border-[#CA6702]" />
            <span className="text-[#CA6702] text-sm font-bold font-opensans tracking-[2px] uppercase">
              Travel Packages
            </span>
            <div className="w-[27px] h-[5px] border-[3px] border-[#CA6702]" />
          </div>
          <h2 className="text-[36px] font-semibold font-montserrat text-[#333] leading-[42px] text-center">
            Explore Koraput State Park Packages
          </h2>
        </div>
        <p className="text-[15px] text-[#333] font-inter text-center leading-[22px]">
          Choose from our carefully curated packages to experience the best of
          Koraput State Park. Each package is designed to provide you with an
          unforgettable adventure.
        </p>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1150px] mx-auto">
        {PACKAGES.map((packages) => (
          <PlaceCard key={packages.id} place={packages} />
        ))}
      </div>
    </section>
  );
};
