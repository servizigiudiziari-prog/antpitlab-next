# Pre-Deploy Checklist - AntPit Lab Portfolio

**Project:** AntPit Lab Portfolio
**Version:** 1.0.0
**Target:** Production Deployment
**Date:** 2025-10-21

---

## Critical Blockers (MUST FIX)

### 1. Dependencies

- [ ] Install @vercel/analytics
  ```bash
  npm install @vercel/analytics
  ```

### 2. PWA Assets

- [ ] Create `/public/icon-192.png` (192x192 pixels, PNG)
- [ ] Create `/public/icon-512.png` (512x512 pixels, PNG)

### 3. Social Media / SEO Assets

- [ ] Create `/public/og-image.jpg` (1200x630 pixels, JPEG)

### 4. Configuration

- [ ] Replace or comment out Google verification placeholder in `src/app/layout.tsx`

---

## High Priority (RECOMMENDED)

### 5. Additional Icons

- [ ] Create `/public/favicon.ico` (32x32 pixels)
- [ ] Create `/public/apple-touch-icon.png` (180x180 pixels)

### 6. PWA Screenshots (Optional but Recommended)

- [ ] Create `/public/screenshot-mobile.jpg` (540x720 pixels)
- [ ] Create `/public/screenshot-desktop.jpg` (1280x720 pixels)

### 7. ESLint Migration

- [ ] Migrate from `next lint` to ESLint CLI
  ```bash
  npx @next/codemod@canary next-lint-to-eslint-cli .
  ```

---

## Build Verification

### 8. Clean Build

- [ ] Clear build cache
  ```bash
  rm -rf .next node_modules/.cache tsconfig.tsbuildinfo
  ```

- [ ] Run production build
  ```bash
  npm run build
  ```

- [ ] Build completes successfully (exit code 0)
- [ ] Build time < 3 minutes
- [ ] No TypeScript errors
- [ ] No ESLint errors (warnings acceptable)

---

## Testing

### 9. Local Production Test

- [ ] Start production server
  ```bash
  npm start
  ```

- [ ] Server starts on port 3000
- [ ] Homepage loads without errors
- [ ] Portfolio page loads
- [ ] About page loads
- [ ] Contact page loads
- [ ] Individual project pages load
- [ ] No console errors (open DevTools F12)

### 10. Asset Verification

- [ ] All icons load (check Network tab)
- [ ] OG image loads at `/og-image.jpg`
- [ ] Manifest loads at `/manifest.json`
- [ ] No 404 errors in Network tab

### 11. Mobile Testing (DevTools)

- [ ] Mobile view (375px) looks correct
- [ ] Tablet view (768px) looks correct
- [ ] Desktop view (1920px) looks correct
- [ ] No horizontal scroll on any viewport
- [ ] Images load correctly on mobile
- [ ] Navigation menu works (mobile hamburger)

---

## Performance Checks

### 12. Lighthouse Audit (After Deploy)

- [ ] Performance score ≥ 85 (target: 90+)
- [ ] Accessibility score ≥ 90 (target: 95+)
- [ ] Best Practices score ≥ 90
- [ ] SEO score = 100
- [ ] PWA installable (if PWA screenshots added)

### 13. Core Web Vitals

- [ ] LCP < 2.5s (green)
- [ ] FID/INP < 100ms (green)
- [ ] CLS < 0.1 (green)

---

## SEO Verification

### 14. Meta Tags

- [ ] Title tag present on all pages
- [ ] Meta description present on all pages
- [ ] OG tags present
- [ ] Twitter cards present
- [ ] Canonical URLs set

### 15. Structured Data

- [ ] Person schema on About page
- [ ] Breadcrumb schema on all pages
- [ ] ImageObject schema on project pages
- [ ] Validate at https://search.google.com/test/rich-results

### 16. Sitemaps & Robots

- [ ] Sitemap generates at `/sitemap.xml`
- [ ] Robots.txt available at `/robots.txt`
- [ ] Submit sitemap to Google Search Console after deploy

---

## Post-Deploy Actions

### 17. Google Search Console

- [ ] Add property for antpitlab.com
- [ ] Verify ownership (use meta tag or DNS)
- [ ] Submit sitemap
- [ ] Check for crawl errors

### 18. Analytics

- [ ] Vercel Analytics working (check dashboard)
- [ ] Web Vitals being tracked
- [ ] No tracking errors in console

### 19. Monitoring

- [ ] Set up uptime monitoring (optional)
- [ ] Configure error tracking (Sentry, optional)
- [ ] Monitor Core Web Vitals in production

---

## Sign-Off

### Pre-Deploy Sign-Off

I confirm that:

- [ ] All critical blockers are resolved
- [ ] Build completes successfully
- [ ] Local testing passes
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] SEO is configured correctly

**Signed:** _______________
**Date:** _______________

### Post-Deploy Sign-Off

I confirm that:

- [ ] Site is live and accessible
- [ ] All pages load correctly
- [ ] Lighthouse scores meet targets
- [ ] Google Search Console configured
- [ ] No production errors in console
- [ ] Analytics working

**Signed:** _______________
**Date:** _______________

---

## Quick Command Reference

```bash
# 1. Install dependency
npm install @vercel/analytics

# 2. Clear and build
rm -rf .next node_modules/.cache tsconfig.tsbuildinfo
npm run build

# 3. Test locally
npm start

# 4. Deploy (Vercel)
vercel --prod

# 5. Check deployed site
curl -I https://antpitlab.com
```

---

## Contact / Support

If issues arise:

1. Check `QA_TEST_REPORT.md` for detailed findings
2. Check `CRITICAL_FIXES_REQUIRED.md` for step-by-step fixes
3. Review build logs for specific errors
4. Check browser console (F12) for client-side errors

---

**Status:** BLOCKED - See CRITICAL_FIXES_REQUIRED.md
**After Fixes:** READY FOR PRODUCTION

**Next Steps:**
1. Complete all checkboxes in "Critical Blockers" section
2. Run build verification
3. Deploy to production
4. Complete post-deploy checklist
