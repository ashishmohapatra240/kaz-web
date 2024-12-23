"use client";

// import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] bg-[#556B63] pt-20">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.jsdelivr.net/gh/ashishmohapatra240/kaz-web/public/videos/HERODJI.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-[#000000]/30" />
      </div>

      {/* Content */}
      <Container className="relative h-full py-4 md:pb-2 md:pt-12 overflow-hidden">
        <div className="flex flex-col items-center justify-center max-w-[900x] mx-auto text-center">
          {/* Camp Label */}
          {/* <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-[30px] h-[5px] border-[3px] border-primary" />
            <span className="text-primary text-sm sm:text-[20px] font-bold tracking-[2px] uppercase">
              Koraput Adventure Zone
            </span>
            <div className="w-[30px] h-[5px] border-[3px] border-primary" />
          </div> */}

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-5xl lg:text-5xl font-medium text-white leading-tight mb-10">
            Taking camps to personalized level
          </h1>

          {/* Description */}
          {/* <p className="text-sm sm:text-lg text-white leading-relaxed max-w-[800px] mb-8">
            At Koraput Adventure Zone, we craft outdoor adventures that blend comfort with excitement, helping everyone connect with nature and create lasting memories.
          </p> */}
        </div>
      </Container>

      {/* Bottom Curve */}
      {/* <div className="absolute bottom-0 left-0 right-0 w-full">
        <div className="h-[30px] sm:h-[30px] bg-[#F0BB62]" /> */}
        {/* <div className="h-[25px] sm:h-[42.5px] bg-white translate-y-[0px]" /> */}
      {/* </div> */}
    </section>
  );
};
