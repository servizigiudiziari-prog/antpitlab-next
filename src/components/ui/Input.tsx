"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label
   */
  label: string;
  /**
   * Error message to display
   */
  error?: string;
}

/**
 * Styled input with floating label and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 bg-bg-secondary border-2 border-border text-text-primary font-body transition-all duration-300 outline-none",
            "focus:border-accent",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 text-text-secondary transition-all duration-300 pointer-events-none",
            isFocused || hasValue || props.value
              ? "top-2 text-xs"
              : "top-1/2 -translate-y-1/2 text-base",
            isFocused && "text-accent",
            error && "text-red-500"
          )}
        >
          {label}
          {props.required && <span className="text-accent ml-1">*</span>}
        </label>
        {error && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
