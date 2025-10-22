import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   */
  size?: ButtonSize;
  /**
   * Button content
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-text-primary bg-transparent text-text-primary hover:bg-text-primary hover:text-bg-primary transition-all duration-300",
  secondary:
    "text-text-primary hover:text-accent relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-text-primary hover:after:w-full after:transition-all after:duration-300",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Button component with multiple variants and sizes
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-heading uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
