import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  /**
   * Card content
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Enable hover effect with border offset
   */
  hover?: boolean;
}

/**
 * Card container with optional border offset hover effect (daniferrerfoto style)
 */
export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-bg-secondary p-6 transition-all duration-300",
        hover &&
          "before:absolute before:inset-0 before:border-3 before:border-black before:transition-all before:duration-300 hover:before:-translate-x-2 hover:before:-translate-y-2",
        className
      )}
    >
      {children}
    </div>
  );
}
