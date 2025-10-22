"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface LoadingSpinnerProps {
  /**
   * Spinner size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Spinner color
   */
  color?: "primary" | "accent" | "white";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Animated loading spinner
 */
export function LoadingSpinner({
  size = "md",
  color = "primary",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  const colorClasses = {
    primary: "border-text-primary border-t-transparent",
    accent: "border-accent border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <motion.div
      className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
      aria-label="Loading"
      role="status"
    />
  );
}
