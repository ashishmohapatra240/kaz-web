import { navigationLinks } from "@/src/constants/navigation";

interface MobileMenuProps {
  onClose: () => void;
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu = ({handleScroll }: MobileMenuProps) => {
  return (
    <div className="lg:hidden fixed inset-0 bg-dark z-40">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {navigationLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className="text-white hover:text-primary font-bold text-lg uppercase tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
