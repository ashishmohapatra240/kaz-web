import { IconType } from "react-icons";

interface InfrastructureCardProps {
  title: string;
  description: string;
  icon: IconType;
  highlighted?: boolean;
}

export default function InfrastructureCard({
  title,
  description,
  icon: Icon,
  highlighted = false,
}: InfrastructureCardProps) {
  return (
    <div
      className={`group relative w-full p-8 rounded-xl overflow-hidden flex flex-col items-center gap-6
        transition-all duration-300 ease-in-out
        ${
          highlighted
            ? "bg-secondary/90 shadow-lg"
            : "bg-white hover:bg-secondary/5"
        }
        before:absolute before:inset-0 before:border-2 
        before:border-transparent before:rounded-xl before:transition-all before:duration-500
        hover:before:border-primary/20 hover:before:scale-95
        hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)]
        transform hover:-translate-y-1`}
    >
      {/* Icon Container */}
      <div
        className={`relative w-20 h-20 rounded-full 
          transition-all duration-500 ease-in-out
          ${
            highlighted
              ? "bg-white shadow-inner"
              : "bg-secondary/30 group-hover:bg-primary/20"
          }
          before:absolute before:inset-0 before:rounded-full before:transition-all
          before:duration-500 before:border-2 before:border-transparent
          group-hover:before:border-primary/20 group-hover:before:scale-110`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className={`w-10 h-10 transition-all duration-500
              ${
                highlighted
                  ? "text-primary"
                  : "text-gray-600 group-hover:text-primary group-hover:scale-110"
              }`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-3 text-center z-10">
        <h3
          className={`font-montserrat font-semibold text-xl sm:text-lg md:text-xl
          transition-colors duration-500
          `}
        >
          {title}
        </h3>
        <p
          className="text-gray-600 font-inter text-base sm:text-sm md:text-base 
          leading-relaxed max-w-[100%] transition-colors duration-500
          group-hover:text-gray-700"
        >
          {description}
        </p>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 pointer-events-none"
      >
        <div
          className="absolute top-0 left-0 w-16 h-16 
          border-t-2 border-l-2 border-primary/10 rounded-tl-xl"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-16 h-16 
          border-b-2 border-r-2 border-primary/10 rounded-br-xl"
        ></div>
      </div>
    </div>
  );
}
