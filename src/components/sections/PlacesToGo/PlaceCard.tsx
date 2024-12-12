import Image from "next/image";
import { Place } from "./types";
import { FaStar } from "react-icons/fa";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <div className="w-full max-w-[330px] mx-auto rounded-md overflow-hidden flex flex-col gap-4">
      <div className="relative h-[330px] w-full bg-gray-400 rounded-md overflow-hidden">
        <Image
          src={place.image}
          alt={place.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold font-montserrat text-[#333]">
            {place.title}
          </h3>
          <div className="flex gap-1">
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
        <p className="text-[15px] text-[#333] font-inter leading-[22px]">
          {place.description}
        </p>
      </div>
    </div>
  );
};
