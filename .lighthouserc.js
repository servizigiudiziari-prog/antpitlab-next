/**
 * Lighthouse CI Configuration
 * Per audit automatizzati delle performance
 */

module.exports = {
  ci: {
    collect: {
      // URLs da testare
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/portfolio',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
      ],
      // Numero di run per ogni URL (per media)
      numberOfRuns: 3,
      // Configurazione Chrome
      settings: {
        // Throttling presets
        preset: 'desktop',
        // o per mobile: preset: 'mobile'
      },
    },
    upload: {
      // Target per salvare risultati
      target: 'temporary-public-storage',
      // In futuro puoi usare: target: 'lhci' con server proprio
    },
    assert: {
      // Assertions che devono passare
      assertions: {
        // Performance
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 1.0 }],

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // Performance metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],

        // Best Practices
        'uses-http2': 'warn',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',

        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',

        // SEO
        'meta-description': 'error',
        'document-title': 'error',
        'robots-txt': 'off', // Dipende da deployment
      },
    },
  },
};
