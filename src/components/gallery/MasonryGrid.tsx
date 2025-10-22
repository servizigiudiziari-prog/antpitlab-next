"use client";

import { ReactNode, Children } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { containerVariants, itemVariants } from "@/lib/utils/motion";

interface ColumnConfig {
  sm: number;
  md: number;
  lg: number;
}

interface MasonryGridProps {
  /**
   * Grid items (ImageCard components)
   */
  children: ReactNode;
  /**
   * Number of columns per breakpoint
   */
  columns?: ColumnConfig;
  /**
   * Gap between items in pixels
   */
  gap?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

// Map column numbers to Tailwind classes
const getColumnClasses = (config: ColumnConfig) => {
  const smClass =
    config.sm === 1
      ? "grid-cols-1"
      : config.sm === 2
        ? "grid-cols-2"
        : config.sm === 3
          ? "grid-cols-3"
          : "grid-cols-4";

  const mdClass =
    config.md === 1
      ? "md:grid-cols-1"
      : config.md === 2
        ? "md:grid-cols-2"
        : config.md === 3
          ? "md:grid-cols-3"
          : "md:grid-cols-4";

  const lgClass =
    config.lg === 1
      ? "lg:grid-cols-1"
      : config.lg === 2
        ? "lg:grid-cols-2"
        : config.lg === 3
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";

  return `${smClass} ${mdClass} ${lgClass}`;
};

/**
 * Responsive masonry-style grid with stagger animations
 * Inspired by daniferrerfoto.com minimal gap design
 */
export function MasonryGrid({
  children,
  columns = { sm: 2, md: 3, lg: 4 },
  gap = 5,
  className,
}: MasonryGridProps) {
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={cn("grid w-full", getColumnClasses(columns), className)}
      style={{ gap: `${gap}px` }}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
