import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  children: ReactNode;
}

export const Button = ({
  variant = "solid",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center gap-2 px-8 py-4 font-bold text-sm uppercase transition-colors";
  const variants = {
    solid: "bg-[#389844]/90 text-white",
    outline: "border border-primary text-primary hover:bg-primary/10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
