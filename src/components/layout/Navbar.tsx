"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { navigationLinks } from "@/src/constants/navigation";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark fixed w-full z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative w-24 sm:w-32 h-16 sm:h-20">
            <Image
              src="/logo.png"
              alt="Ranger Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-primary font-bold text-sm xl:text-[15px] uppercase tracking-wider transition-colors"
              >
                {link.label}
                {link.hasSubmenu && (
                  <span className="ml-1 inline-block">▼</span>
                )}
              </Link>
            ))}
          </div>

          {/* Contact and Book Now - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <div className="flex items-center gap-2 text-primary">
              <span className="font-bold text-sm xl:text-[15px]">021 3456 789</span>
              <span>📞</span>
            </div>
            <Button 
              variant="outline" 
              className="text-sm xl:text-[15px]"
            >
              Book Now →
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </nav>
  );
};
