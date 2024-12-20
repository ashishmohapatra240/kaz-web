interface StatsCardProps {
  value: string;
  label: string;
}

export default function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="bg-white p-4 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:shadow-lg">
      <span className="text-dark font-montserrat font-semibold text-3xl leading-tight">
        {value}
      </span>
      <span className="text-gray-600/60 font-opensans text-xs">
        {label}
      </span>
    </div>
  );
} 