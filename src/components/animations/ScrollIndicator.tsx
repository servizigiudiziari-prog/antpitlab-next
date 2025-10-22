"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { timings } from "@/lib/utils/motion";

interface ScrollIndicatorProps {
  /**
   * Click handler for scroll action
   */
  onClick?: () => void;
  /**
   * Label text
   */
  label?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Animated scroll indicator with bouncing arrow
 * Perfect for hero sections
 */
export function ScrollIndicator({
  onClick,
  label = "Scroll",
  className,
}: ScrollIndicatorProps) {
  const scrollToContent = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.button
      onClick={scrollToContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: timings.slow, delay: 1 }}
      className={cn(
        "flex flex-col items-center gap-2 text-text-primary hover:text-accent transition-colors cursor-pointer",
        className
      )}
      aria-label="Scroll down"
    >
      <span className="text-xs uppercase tracking-wider font-heading">
        {label}
      </span>
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </motion.button>
  );
}
