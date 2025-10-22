import Link from "next/link";

const socialLinks = [
  {
    href: "https://instagram.com/antpitlab",
    label: "Instagram",
    icon: (
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
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "mailto:info@antpitlab.com",
    label: "Email",
    icon: (
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

/**
 * Footer component with copyright, quote, social links, and admin access
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Quote */}
          <div className="text-center md:text-left">
            <p className="font-accent italic text-text-secondary text-sm">
              Le immagini parlano quando le parole tacciono
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              &copy; {currentYear} AntPit Lab
            </p>
            <p className="text-text-secondary text-xs mt-1">
              Tutti i diritti riservati
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}

            {/* Admin link (hidden icon) */}
            <Link
              href="/admin"
              className="p-2 text-text-secondary hover:text-accent transition-colors opacity-50 hover:opacity-100"
              aria-label="Admin access"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
