"use client";

// import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { BookingForm } from "./BookingForm";

export const Hero = () => {
  return (
    <section className="relative min-h-5/6 bg-[#556B63] pt-20">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/videos/HERODJI.mp4.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-[#556B63]/60" />
      </div>

      {/* Content */}
      <Container className="relative h-full py-12 md:py-20">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-8 max-w-[1050px] mx-auto">
          {/* Left Content */}
          <div className="w-full lg:w-[600px] px-4 sm:px-6 lg:px-0">
            {/* Camp Label */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-4 lg:mb-2">
              <div className="w-[30px] h-[5px] border-[3px] border-primary" />
              <span className="text-primary text-sm sm:text-[20px] font-bold tracking-[2px] uppercase">
                Koraput Adventure Zone
              </span>
              <div className="w-[27px] h-[5px] border-[3px] border-primary" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 lg:mb-8 text-center lg:text-left">
              Taking camps to personalized level
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-[16px] text-white leading-relaxed lg:leading-[22px] mb-6 lg:mb-4 max-w-[594px] text-center lg:text-left">
            At Koraput Adventure Zone, we craft outdoor adventures that blend comfort with excitement, helping everyone connect with nature and create lasting memories.
            </p>

            {/* Learn More Button
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="outline"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-[15px] font-bold capitalize"
              >
                Learn More →
              </Button>
            </div>*/}
          </div>

          {/* Booking Form */}
          <div className="w-full max-w-[420px] px-4 sm:px-6 lg:px-0">
            <BookingForm />
          </div>
        </div>
      </Container>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <div className="h-[30px] sm:h-[30px] bg-[#F0BB62]" />
        {/* <div className="h-[25px] sm:h-[42.5px] bg-white translate-y-[0px]" /> */}
      </div>
    </section>
  );
};
