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
    "flex items-center gap-2 px-8 py-4 rounded font-bold text-sm uppercase transition-colors";
  const variants = {
    solid: "bg-primary text-dark",
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
