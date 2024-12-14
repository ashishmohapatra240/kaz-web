import { infrastructureData } from "./constants/infrastructure-data";
import InfrastructureCard from "./InfrastructureCard";
import CampingHero from "./CampingHero";

export default function CampInfrastructure() {
  return (
    <section className="bg-[#F1F1F1] py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <CampingHero />
        </div>

        {/* Section Title */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-[2px] border-[3px] border-[#CA6702]"></div>
            <span className="text-[#CA6702] font-opensans font-bold text-sm tracking-[2px] uppercase">
              featured
            </span>
            <div className="w-7 h-[2px] border-[3px] border-[#CA6702]"></div>
          </div>

          <h2 className="text-dark font-montserrat font-semibold text-3xl sm:text-4xl text-center">
            Camp Infrastructures
          </h2>

          <p className="text-center text-gray-600 font-inter text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nullam semper etiam congue lacinia nuncesit quam vel vestibulum
            faucibus dolor non semper leo quis pretium quam lacus.
          </p>
        </div>

        {/* Infrastructure Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-[1200px] mx-auto">
          {infrastructureData.map((item, index) => (
            <InfrastructureCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
