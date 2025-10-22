import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  output: "standalone",

  // Ottimizzazione PoweredByHeader
  poweredByHeader: false,

  images: {
    // Formato automatico: AVIF primo (migliore compressione), WebP fallback
    formats: ["image/avif", "image/webp"],

    // Remote patterns per Sanity CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],

    // Device sizes per breakpoints responsive
    // Utilizzati per generare srcset ottimizzato
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes per layout specifici (thumbnail, avatar, etc)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache TTL esteso per performance (1 anno)
    minimumCacheTTL: 31536000,

    // Disabilita ottimizzazione per SVG (gestiti diversamente)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers per caching e security
  async headers() {
    return [
      {
        // Cache immutable per static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache per immagini
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
