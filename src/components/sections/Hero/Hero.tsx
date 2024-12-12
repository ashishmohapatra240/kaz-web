"use client";

import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { BookingForm } from "./BookingForm";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#556B63] pt-20">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/videos/Hero.mp4"
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
              <div className="w-[27px] h-[5px] border-[3px] border-primary" />
              <span className="text-primary text-sm sm:text-[15px] font-bold tracking-[2px] uppercase">
                ranger camp
              </span>
              <div className="w-[27px] h-[5px] border-[3px] border-primary" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[72px] font-bold text-white leading-tight lg:leading-[82px] mb-4 lg:mb-8 text-center lg:text-left">
              Taking camps to personalized level
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-white leading-relaxed lg:leading-[22px] mb-6 lg:mb-8 max-w-[594px] text-center lg:text-left">
              Nullam semper etiam congue lacinia nuncsit quam vel vestibulum
              faucibus dolor non semper leo quis retium quam lacus interdum
              ultrices velit elementum.
            </p>

            {/* Learn More Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="outline"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-[15px] font-bold capitalize"
              >
                Learn More →
              </Button>
            </div>
          </div>

          {/* Booking Form */}
          <div className="w-full max-w-[420px] px-4 sm:px-6 lg:px-0">
            <BookingForm />
          </div>
        </div>
      </Container>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <div className="h-[30px] sm:h-[54px] bg-[#F0BB62]" />
        <div className="h-[25px] sm:h-[42.5px] bg-white translate-y-[-11.5px]" />
      </div>
    </section>
  );
};
