"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { variants, timings, easings } from "@/lib/utils/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Direction of entrance animation
   */
  direction?: Direction;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Trigger animation only once
   */
  once?: boolean;
  /**
   * Viewport margin for triggering animation
   */
  margin?: string;
}

/**
 * Scroll-triggered reveal animation
 * Reveals content when it enters the viewport
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = timings.medium,
  className,
  once = true,
  margin = "-100px",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin,
  });

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getAnimateState = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: easings.easeOut,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
