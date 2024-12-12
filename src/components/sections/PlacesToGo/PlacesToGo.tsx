import { PlaceCard } from "./PlaceCard";
import { PLACES } from "./constants/place";

export const PlacesToGo = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="max-w-[690px] mx-auto flex flex-col items-center gap-8 mb-16">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-[27px] h-[5px] border-[3px] border-[#CA6702]" />
            <span className="text-[#CA6702] text-sm font-bold font-opensans tracking-[2px] uppercase">
              Places to Go
            </span>
            <div className="w-[27px] h-[5px] border-[3px] border-[#CA6702]" />
          </div>
          <h2 className="text-[36px] font-semibold font-montserrat text-[#333] leading-[42px] text-center">
            Explore Ranger State Park
          </h2>
        </div>
        <p className="text-[15px] text-[#333] font-inter text-center leading-[22px]">
          Nullam semper etiam congue lacinia nuncesit quam vel vestibulum
          <br />
          faucibus dolor non semper leo quis pretium quam lacus.
        </p>
      </div>

      {/* Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-[1050px] mx-auto">
        {PLACES.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};
