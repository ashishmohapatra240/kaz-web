import { FooterSection as FooterSectionType } from './types';

interface FooterSectionProps {
  section: FooterSectionType;
}

export const FooterSection = ({ section }: FooterSectionProps) => {
  return (
    <div className="flex flex-col items-center sm:items-start gap-4">
      <h3 className="text-white text-base font-semibold">
        {section.title}
      </h3>
      <ul className="flex flex-col gap-2">
        {section.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-white/70 text-sm hover:text-white transition-colors duration-200 block py-1"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};