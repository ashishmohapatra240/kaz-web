interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
  decorationColor?: "primary" | "secondary";
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  className = "",
  decorationColor = "primary" 
}: SectionTitleProps) {
  const lineColor = decorationColor === "primary" ? "border-primary" : "border-secondary";
  const textColor = decorationColor === "primary" ? "text-primary" : "text-secondary";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-[2px] border-[3px] ${lineColor}`} />
        <span className={`${textColor} font-opensans font-bold text-sm uppercase tracking-[2px]`}>
          {subtitle}
        </span>
        <div className={`w-7 h-[2px] border-[3px] ${lineColor}`} />
      </div>
      <h2 className="font-montserrat font-semibold text-4xl leading-tight">
        {title}
      </h2>
    </div>
  );
} 