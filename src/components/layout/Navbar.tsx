"use client";

// import { useState } from "react";
import Image from "next/image";
// import { Button } from "../ui/Button";
import { navigationLinks } from "@/src/constants/navigation";
// import { MobileMenu } from "./MobileMenu";
import { useMobileMenu } from "@/src/context/MobileMenuContext";

export const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-dark fixed w-full z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="relative w-24 sm:w-32 h-14 sm:h-14"
            onClick={(e) => handleScroll(e, "#home")}
          >
            <Image
              src="/images/logo.png"
              alt="Koraput Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-white hover:text-primary font-bold text-sm xl:text-[15px] uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact and Book Now - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <div className="flex items-center gap-2 text-primary">
              <span>📞</span>
              <span className="font-bold text-sm xl:text-[15px]">
                7751053999
              </span>
            </div>
            {/* <Button variant="outline" className="text-sm xl:text-[15px]">
              Book Now →
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-dark z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-white hover:text-primary font-bold text-xl uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            {/* Mobile Contact Info */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-primary">
                <span>📞</span>
                <span className="font-bold">7751053999</span>
              </div>
              {/* <Button variant="outline" className="text-base">
                Book Now →
              </Button> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
