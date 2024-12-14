"use client";
import { useState } from "react";
import { PlaceCard } from "./PackageCard";
import { TREK_PACKAGES, CAMPING_PACKAGES, GUIDED_TOUR_PACKAGES } from "./constants/package";
import { GuidedTourCard } from "./GuidedTourCard";

export const Packages = () => {
  const [activeTab, setActiveTab] = useState<"trek" | "camping" | "guided">("trek");

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

      {/* Tab Bar */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg border border-[#CA6702] p-1">
          <button
            onClick={() => setActiveTab("trek")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "trek"
                ? "bg-[#CA6702] text-white"
                : "text-[#CA6702] hover:bg-[#CA6702]/10"
            }`}
          >
            Trek Packages
          </button>
          <button
            onClick={() => setActiveTab("camping")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "camping"
                ? "bg-[#CA6702] text-white"
                : "text-[#CA6702] hover:bg-[#CA6702]/10"
            }`}
          >
            Camping Packages
          </button>
          <button
            onClick={() => setActiveTab("guided")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "guided"
                ? "bg-[#CA6702] text-white"
                : "text-[#CA6702] hover:bg-[#CA6702]/10"
            }`}
          >
            Guided Tours
          </button>
        </div>
      </div>

      {/* Grid of Packages */}
      <div className={`grid ${activeTab === "guided" ? "" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} gap-8 max-w-[1150px] mx-auto`}>
        {activeTab === "trek" && TREK_PACKAGES.map((package_) => (
          <PlaceCard key={package_.id} place={package_} />
        ))}
        {activeTab === "camping" && CAMPING_PACKAGES.map((package_) => (
          <PlaceCard key={package_.id} place={package_} />
        ))}
        {activeTab === "guided" && GUIDED_TOUR_PACKAGES.map((package_) => (
          <GuidedTourCard key={package_.id} place={package_} />
        ))}
      </div>
    </section>
  );
};
