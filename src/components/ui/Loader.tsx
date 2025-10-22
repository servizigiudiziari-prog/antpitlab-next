import { cn } from "@/lib/utils/cn";

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  /**
   * Size of the loader
   */
  size?: LoaderSize;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const sizeStyles: Record<LoaderSize, string> = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-3",
  lg: "w-16 h-16 border-4",
};

/**
 * Elegant circular loading spinner
 */
export function Loader({ size = "md", className }: LoaderProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-text-primary border-t-transparent",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
