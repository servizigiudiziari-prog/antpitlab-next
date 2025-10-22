"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "Chi Sono" },
  { href: "/contact", label: "Contatti" },
];

/**
 * Desktop navigation component with underline animation
 */
export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative py-2 font-heading text-sm uppercase tracking-wider transition-colors duration-300",
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {link.label}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1px] bg-text-primary transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
