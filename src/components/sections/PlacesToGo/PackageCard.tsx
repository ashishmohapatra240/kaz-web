import Image from "next/image";
import { Place } from "./types";
import { FaStar, FaClock, FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "../../ui/Button";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <div className="w-full max-w-[330px] h-full mx-auto rounded-xl overflow-hidden flex flex-col bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-[220px] w-full overflow-hidden flex-shrink-0">
        <Image
          src={place.image}
          alt={place.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${
                  i < place.rating ? "text-[#F2C94C]" : "text-gray-300"
                }`}
              />
            ))}
          </div>
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

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          {/* Title */}
          <h3 className="text-xl font-semibold font-montserrat text-[#333] mb-3 group-hover:text-[#CA6702] transition-colors">
            {place.title}
          </h3>

          {/* Description */}
          <p className="text-[15px] text-gray-600 font-inter leading-[22px] mb-4">
            {place.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {place.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#CA6702]">
                ₹{place.price}
              </span>
              <span className="text-sm text-gray-500">/person</span>
            </div>
          </div>
          <Button variant="solid">Book Now</Button>
        </div>
      </div>
    </div>
  );
};
