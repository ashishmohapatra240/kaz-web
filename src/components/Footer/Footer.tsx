import { SocialLink, FooterSection as FooterSectionType } from "./types";
import { FooterSection } from "./FooterSection";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "#", icon: <FaFacebookF size={18} /> },
  { platform: "twitter", url: "#", icon: <FaTwitter size={18} /> },
  { platform: "instagram", url: "#", icon: <FaInstagram size={18} /> },
  { platform: "youtube", url: "#", icon: <FaYoutube size={18} /> },
];

const footerSections: FooterSectionType[] = [
  {
    title: "Contact",
    links: [
      { label: "Koraput, Odisha", href: "#" },
      {
        label: "koraputcamping@gmail.com",
        href: "mailto:koraputcamping@gmail.com",
      },
      { label: "+91 9876543210", href: "tel:+919876543210" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Camping", href: "#" },
      { label: "Lodging", href: "#" },
      { label: "Harbor", href: "#" },
      { label: "Day Use", href: "#" },
    ],
  },
  {
    title: "Menu",
    links: [
      { label: "About", href: "#" },
      { label: "Services", href: "#" },
      { label: "Booking", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-10 lg:mb-14">
          {/* Logo and Social Section */}
          <div className="flex flex-col items-center lg:items-start gap-6 mb-8 lg:mb-0">
            <div className="relative w-40 h-24">
              <Image
                src="/images/logo.png"
                alt="Koraput Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="w-8 h-8 bg-white/10 flex items-center justify-center
                    text-white hover:bg-[#389844] transition-all duration-200"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {footerSections.map((section) => (
              <FooterSection key={section.title} section={section} />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Koraput Camping. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
