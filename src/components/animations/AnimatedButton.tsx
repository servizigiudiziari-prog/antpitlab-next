"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { hoverAnimations, tapAnimations, timings } from "@/lib/utils/motion";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "ghost";
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Animation style
   */
  animationStyle?: "lift" | "scale" | "glow";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button with smooth hover and tap animations
 */
export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  animationStyle = "scale",
  className,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = "font-heading uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-transparent border-2 border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary",
    secondary: "bg-text-primary border-2 border-text-primary text-bg-primary hover:bg-transparent hover:text-text-primary",
    ghost: "bg-transparent text-text-primary hover:text-accent",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const getHoverAnimation = () => {
    switch (animationStyle) {
      case "lift":
        return hoverAnimations.lift;
      case "scale":
        return hoverAnimations.scaleSubtle;
      case "glow":
        return hoverAnimations.glow;
      default:
        return hoverAnimations.scale;
    }
  };

  return (
    <motion.button
      whileHover={getHoverAnimation()}
      whileTap={tapAnimations.subtle}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
