import { navigationLinks } from "@/src/constants/navigation";
import Link from "next/link";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className="lg:hidden fixed inset-0 bg-dark z-50 pt-20">
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="flex flex-col items-center gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-white hover:text-primary font-bold text-lg uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <div className="flex items-center gap-2 text-primary">
            <span className="font-bold">021 3456 789</span>
            <span>📞</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full max-w-xs"
            onClick={onClose}
          >
            Book Now →
          </Button>
        </div>
      </div>
    </div>
  );
};
