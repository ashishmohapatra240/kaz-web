"use client";

import Image from "next/image";
import {
  FaStar,
  FaClock,
  FaCheck,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

interface Day {
  title: string;
  activities: string[];
}

interface Place {
  image: string;
  title: string;
  rating: number;
  duration: string;
  description: string;
  features: string[];
  itinerary: Day[];
  price: number;
}
interface GuidedTourCardProps {
  place: Place;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-3 h-3 ${
            i < rating ? "text-[#F2C94C]" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export const GuidedTourCard = ({ place }: GuidedTourCardProps) => {
  const itinerary = Array.isArray(place.itinerary) ? place.itinerary : [];

  return (
    <div className="w-full col-span-full max-w-full mx-auto overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side */}
        <div className="flex flex-col">
          <div className="relative h-[300px] w-full overflow-hidden">
            <Image
              src={place.image}
              alt={place.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <StarRating rating={place.rating} />
              {/* <span className="text-sm font-medium text-gray-700">
                {place.rating}/5
              </span> */}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span className="text-sm font-medium">Koraput, Odisha</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="w-4 h-4" />
                <span className="text-sm font-medium">{place.duration}</span>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-semibold font-montserrat text-[#333] group-hover:text-[#CA6702] transition-colors">
                {place.title}
              </h3>
              <div className="flex items-center text-[#CA6702] font-semibold">
                <FaRupeeSign className="w-4 h-4" />
                <span className="text-xl">{place.price} </span>
                <span className="text-sm text-gray-600">/person</span>
              </div>
            </div>

            <p className="text-[15px] text-gray-600 font-inter leading-[22px] mb-6">
              {place.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {place.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Itinerary */}
        <div className="p-6 bg-gray-50 border-l border-gray-100">
          <h4 className="text-xl font-semibold mb-6 text-[#CA6702]">
            Tour Itinerary
          </h4>
          <div className="space-y-6">
            {itinerary.map((day, index) => (
              <div key={index} className="relative pl-6 pb-6 last:pb-0">
                {/* Timeline line */}
                <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-200" />
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-[#CA6702] bg-white" />

                <div className="space-y-2">
                  <h5 className="font-semibold text-lg text-gray-800">
                    {day.title}
                  </h5>
                  <ul className="space-y-2">
                    {day.activities.map((activity, i) => (
                      <li
                        key={i}
                        className="text-gray-600 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-400 mt-2 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
