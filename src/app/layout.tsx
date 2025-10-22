import type { Metadata } from "next";
import { Montserrat, Lato, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { PageTransition } from "@/components/animations/PageTransition";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";

// Font optimization con preload e fallback
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false, // Loaded only when needed (decorative font)
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://antpitlab.com'),
  title: {
    default: 'AntPit Lab - Portfolio Fotografico Professionale',
    template: '%s | AntPit Lab'
  },
  description: 'Portfolio fotografico di AntPit Lab. Esplora progetti fotografici di ritratti, paesaggi, eventi e street photography. Fotografia professionale made in Italy.',
  keywords: [
    'fotografia',
    'portfolio fotografico',
    'fotografo professionista',
    'AntPit Lab',
    'Antonio Pitocco',
    'ritratti',
    'paesaggi',
    'eventi',
    'street photography',
    'fotografia professionale',
    'servizi fotografici'
  ],
  authors: [{ name: 'AntPit Lab', url: 'https://antpitlab.com' }],
  creator: 'AntPit Lab',
  publisher: 'AntPit Lab',
  category: 'Photography',
  // Open Graph per social sharing
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://antpitlab.com',
    title: 'AntPit Lab - Portfolio Fotografico Professionale',
    description: 'Portfolio fotografico di AntPit Lab. Esplora progetti fotografici di ritratti, paesaggi, eventi e street photography.',
    siteName: 'AntPit Lab',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AntPit Lab - Portfolio Fotografico',
        type: 'image/jpeg'
      }
    ]
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'AntPit Lab - Portfolio Fotografico Professionale',
    description: 'Portfolio fotografico professionale. Ritratti, paesaggi, eventi e street photography.',
    images: ['/og-image.jpg'],
    creator: '@antpitlab'
  },
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  // Verification (da aggiornare con i codici reali)
  verification: {
    google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
    // other: {
    //   'facebook-domain-verification': 'facebook-verification-code'
    // }
  },
  // Canonical alternates
  alternates: {
    canonical: 'https://antpitlab.com',
    languages: {
      'it-IT': 'https://antpitlab.com',
    }
  },
  // Performance hints
  other: {
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${montserrat.variable} ${lato.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect a Sanity CDN per performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Preconnect to Google Fonts (già gestito da next/font ma aggiungiamo per sicurezza) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-body antialiased">
        <ServiceWorkerRegistration />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}

/**
 * Export per Web Vitals monitoring
 * Utilizzato da Next.js per tracciare Core Web Vitals
 *
 * In development: log su console
 * In production: invia a analytics (Google Analytics, Vercel Analytics, etc.)
 */
export { reportWebVitals } from "@/lib/utils/performance";
