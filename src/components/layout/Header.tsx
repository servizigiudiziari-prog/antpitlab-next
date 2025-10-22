"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  /**
   * If true, the header will have a transparent background (for hero sections)
   */
  transparent?: boolean;
}

/**
 * Fixed header with blur backdrop, logo, and navigation
 */
export function Header({ transparent = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          transparent
            ? "bg-transparent"
            : "bg-bg-primary/80 backdrop-blur-md border-b border-border"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl tracking-wider text-text-primary hover:text-accent transition-colors"
          >
            antpit lab studio
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Navigation />

            {/* Search icon (placeholder) */}
            <button
              className="hidden md:block p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-text-primary"
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
