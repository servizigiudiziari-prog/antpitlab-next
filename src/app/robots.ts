import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration for AntPit Lab Portfolio
 * Controls search engine crawler access and sitemap location
 *
 * Resources:
 * - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 * - https://developers.google.com/search/docs/crawling-indexing/robots/intro
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',        // Sanity Studio - admin only
          '/studio/*',
          '/api/',           // API routes - not for indexing
          '/api/*',
          '/sanity-test/',   // Test pages
          '/test-components/',
          '/animation-demo/'
        ]
      },
      {
        userAgent: 'GPTBot',  // OpenAI crawler
        disallow: ['/']       // Block AI training crawlers if desired
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/']
      },
      {
        userAgent: 'CCBot',   // Common Crawl
        disallow: ['/']
      },
      {
        userAgent: 'anthropic-ai',  // Anthropic crawler
        disallow: ['/']
      }
    ],
    sitemap: 'https://antpitlab.com/sitemap.xml',
    host: 'https://antpitlab.com'
  }
}
