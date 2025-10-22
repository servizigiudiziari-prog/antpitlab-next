# Performance Testing - Quick Start Guide

Guida rapida per testare le performance del portfolio AntPit Lab.

## Quick Commands

```bash
# 1. Build production
npm run build

# 2. Start production server
npm run start

# 3. Analyze bundle (in another terminal)
npm run analyze

# 4. Run Lighthouse audit (while server is running)
npm run lighthouse

# 5. Generate complete performance report
npm run perf:report
```

---

## Step-by-Step Testing

### 1. Build & Analyze Bundle

```bash
# Build with bundle analyzer
ANALYZE=true npm run build

# Or use the script
npm run analyze
```

**Expected Output:**
- Client bundle opens in browser
- First Load JS: < 200KB ✓
- No duplicate dependencies
- No unexpectedly large packages

**Check for:**
- Total bundle size
- Largest packages (should be Next.js, React, Framer Motion)
- Any red flags (large unused dependencies)

---

### 2. Start Production Server

```bash
npm run start
```

**Server should start on:** http://localhost:3000

**Quick Manual Tests:**
1. Open homepage - should load instantly
2. Navigate to /portfolio - check image loading
3. Open a project page - verify LCP image loads fast
4. Test offline mode (DevTools → Network → Offline)

---

### 3. Lighthouse Audit

```bash
# In another terminal (while server is running)
npm run lighthouse
```

**Expected Results:**

```
Lighthouse CI Results:

Performance:      ≥ 90  ✓
Accessibility:    ≥ 95  ✓
Best Practices:   ≥ 90  ✓
SEO:              100   ✓

Core Web Vitals:
  LCP: < 2.5s     ✓
  CLS: < 0.1      ✓
  TBT: < 300ms    ✓
```

**If scores are low:**
1. Check [Troubleshooting](./PERFORMANCE_OPTIMIZATION.md#troubleshooting)
2. Run in incognito mode (no extensions)
3. Test on actual mobile device
4. Check network throttling settings

---

### 4. Chrome DevTools Performance

1. **Open DevTools** (F12)
2. **Go to Lighthouse tab**
3. **Configure:**
   - Mode: Navigation
   - Device: Desktop (or Mobile)
   - Categories: All
4. **Generate Report**
5. **Review:**
   - Performance score
   - Opportunities (things to fix)
   - Diagnostics (issues found)
   - Passed audits

**Key Metrics to Check:**

| Metric | Target | What to Look For |
|--------|--------|------------------|
| First Contentful Paint | < 1.5s | Green |
| Largest Contentful Paint | < 2.5s | Green |
| Cumulative Layout Shift | < 0.1 | Green |
| Total Blocking Time | < 300ms | Green |
| Speed Index | < 3.4s | Green |

---

### 5. Network Analysis

**Chrome DevTools → Network Tab:**

1. **Throttle to Slow 3G**
2. **Disable cache** (for testing)
3. **Reload page**
4. **Check:**
   - Total page weight
   - Number of requests
   - Largest resources
   - Waterfall (blocking resources)

**Expected for Homepage:**

```
Total Size:     < 1MB (first load)
Requests:       < 30
Largest Asset:  Hero image (< 500KB)
DOMContentLoaded: < 2s
Load:           < 3s
```

---

### 6. Web Vitals (Real User Monitoring)

**Option A: Chrome Extension**

1. Install [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
2. Navigate to your site
3. Check overlay for real-time metrics

**Option B: Console Logging**

Open Console in DevTools - you'll see:

```
[Web Vitals] LCP: { value: "1234ms", rating: "good" }
[Web Vitals] CLS: { value: "0.05", rating: "good" }
[Web Vitals] FID: { value: "12ms", rating: "good" }
```

---

### 7. Bundle Analysis Deep Dive

After running `npm run analyze`:

**Look for:**

1. **Largest Dependencies**
   - next.js (~100KB) ✓
   - react (~80KB) ✓
   - framer-motion (~50KB) ✓
   - sanity (~40KB) ✓

2. **Red Flags:**
   - Duplicate packages (same lib multiple versions)
   - Unexpectedly large packages
   - Unused dependencies

3. **Code Splitting**
   - Dynamic imports showing as separate chunks ✓
   - Route-based splitting ✓

**Actions if bundle too large:**

```bash
# Check for duplicate dependencies
npm dedupe

# Update all packages
npm update

# Remove unused dependencies
npm prune
```

---

### 8. PWA Testing

**Service Worker:**

1. **DevTools → Application → Service Workers**
2. Check: Service Worker registered ✓
3. Status: Activated and running ✓

**Offline Mode:**

1. **DevTools → Network → Offline**
2. Navigate through site
3. Should show cached pages ✓
4. Show offline.html when no cache ✓

**Manifest:**

1. **DevTools → Application → Manifest**
2. Check: Manifest loaded ✓
3. Verify icons present ✓

---

## Performance Report Generation

```bash
npm run perf:report
```

**Generates:**

```
reports/performance-YYYY-MM-DD_HH-MM-SS/
├── metrics.txt           # Summary metrics
├── build-output.txt      # Complete build log
└── bundle-analysis.txt   # Bundle size analysis
```

**Review metrics.txt:**

```
Build Metrics - 2025-01-21
================================

Performance Budget:
  ✓ First Load JS target: <200KB
  ✓ LCP target: <2.5s
  ✓ CLS target: <0.1
  ✓ TBT target: <300ms

Next Steps:
  1. Start production server: npm run start
  2. Run Lighthouse audit: npm run lighthouse
  3. Check Web Vitals in browser DevTools
```

---

## Troubleshooting Quick Fixes

### Performance Score < 90

**Quick Checks:**

1. **Run in incognito mode** (extensions can affect score)
2. **Close other tabs** (CPU throttling)
3. **Disable browser extensions**
4. **Check network conditions** (use "No throttling" for baseline)

### LCP > 2.5s

**Quick Fixes:**

1. Check cover image size (should be < 500KB)
2. Verify `fetchPriority="high"` on LCP image
3. Check network waterfall for blocking resources
4. Verify Sanity CDN is responding fast

```bash
# Test Sanity CDN response
curl -w "@curl-format.txt" -o /dev/null -s "https://cdn.sanity.io/images/..."
```

### CLS > 0.1

**Quick Fixes:**

1. Add width/height to all images
2. Check font loading (should use system fonts initially)
3. Reserve space for dynamic content
4. Check for ads/embeds causing shifts

### Bundle Too Large (> 200KB)

**Quick Fixes:**

1. Run bundle analyzer
2. Check for duplicate dependencies
3. Remove unused imports
4. Use dynamic imports for heavy components

```typescript
// Before
import HeavyComponent from './HeavyComponent';

// After
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

---

## Testing Checklist

### Pre-deployment

- [ ] Build completes without errors
- [ ] Bundle size < 200KB
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO = 100
- [ ] LCP < 2.5s (green)
- [ ] CLS < 0.1 (green)
- [ ] TBT < 300ms (green)
- [ ] Service Worker registered
- [ ] Offline mode works
- [ ] PWA manifest valid
- [ ] All images have width/height
- [ ] Fonts load without FOUT

### Post-deployment

- [ ] Vercel Analytics showing data
- [ ] Core Web Vitals in green (Search Console)
- [ ] No errors in Sentry/monitoring
- [ ] Real user metrics < targets
- [ ] Mobile performance good
- [ ] Desktop performance good

---

## Continuous Monitoring

### Daily

- Check Vercel Analytics dashboard
- Review Core Web Vitals trends
- Monitor error rates

### Weekly

- Run Lighthouse CI
- Review bundle size trends
- Check for dependency updates

### Monthly

- Full performance audit
- Update performance budget
- Review and optimize based on data

---

## Resources

### Quick Links

- [Vercel Analytics](https://vercel.com/analytics)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Full Documentation](./PERFORMANCE_OPTIMIZATION.md)

### Chrome DevTools Shortcuts

- Open DevTools: `F12` or `Cmd+Option+I` (Mac)
- Performance panel: `Cmd+Shift+P` → "Show Performance"
- Network panel: `Cmd+Shift+P` → "Show Network"
- Lighthouse panel: `Cmd+Shift+P` → "Show Lighthouse"

### Command Quick Reference

```bash
# Development
npm run dev          # Start dev server

# Build & Production
npm run build        # Build production
npm run start        # Start prod server

# Performance Testing
npm run analyze      # Bundle analysis
npm run lighthouse   # Lighthouse audit
npm run perf:report  # Generate report
npm run perf:all     # Complete test suite
```

---

**Last Updated:** 2025-01-21
