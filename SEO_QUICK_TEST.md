# SEO Quick Test Guide

## Test Rapidi da Eseguire Localmente

### 1. Test Sitemap

```bash
# Start dev server
npm run dev

# In another terminal, test sitemap
curl http://localhost:3000/sitemap.xml

# Expected output: XML con tutte le pagine
```

**Verifica**:
- XML ben formato
- URLs includono dominio completo: `https://antpitlab.com`
- Tutti i progetti Sanity presenti
- Static pages presenti (/, /portfolio, /about, /contact)

---

### 2. Test Robots.txt

```bash
curl http://localhost:3000/robots.txt

# Expected output:
# User-agent: *
# Allow: /
# Disallow: /studio/
# ...
# Sitemap: https://antpitlab.com/sitemap.xml
```

**Verifica**:
- Disallow paths corretti
- Sitemap URL presente
- Host specificato

---

### 3. Test Metadata Homepage

```bash
curl http://localhost:3000 | grep -i "<meta"

# Oppure view-source nel browser
```

**Cerca**:
- `<meta name="description" content="Portfolio fotografico...">`
- `<meta property="og:title" content="AntPit Lab...">`
- `<meta property="og:image" content="https://antpitlab.com/og-image.jpg">`
- `<meta name="twitter:card" content="summary_large_image">`

---

### 4. Test Structured Data

**Browser**:
1. Apri: http://localhost:3000
2. Right-click > View Page Source
3. Cerca: `<script type="application/ld+json">`
4. Verifica JSON ben formato:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "AntPit Lab",
     ...
   }
   ```

**Copy & Validate**:
1. Copia il contenuto del tag script
2. Vai su: https://validator.schema.org/
3. Paste e verifica: "No errors detected"

---

### 5. Test Dynamic Project Page

```bash
# Assumendo un progetto con slug "test-project"
curl http://localhost:3000/portfolio/test-project | grep -i "og:image"

# Expected:
# <meta property="og:image" content="https://cdn.sanity.io/images/...">
```

**Browser test**:
1. Vai su: http://localhost:3000/portfolio/[any-slug]
2. View source
3. Verifica:
   - Title = Nome progetto
   - Description = Descrizione progetto
   - OG Image = Cover image del progetto
   - Photograph schema presente
   - Breadcrumb schema presente

---

### 6. Build Production Test

```bash
# Build
npm run build

# Expected output:
# ✓ Creating an optimized production build
# ✓ Collecting page data
# ✓ Generating static pages (X/X)
# ✓ Collecting build traces
# ✓ Finalizing page optimization

# Start production
npm run start

# Test sitemap in production mode
curl http://localhost:3000/sitemap.xml
```

**Verifica build**:
- No TypeScript errors
- No ESLint errors
- All pages generated successfully
- Routes list includes dynamic routes

---

## Test Prima del Deploy

### Checklist Pre-Deployment

**Assets**:
```bash
ls -la public/
# Verifica presenza:
# - og-image.jpg (o placeholder)
# - favicon.ico
# - icon.png
# - apple-icon.png
```

**Code Quality**:
```bash
npm run lint
# Expected: ✓ No ESLint warnings or errors

npm run build
# Expected: ✓ Compiled successfully
```

**Runtime Test**:
```bash
npm run start
# Visit in browser:
# - http://localhost:3000
# - http://localhost:3000/portfolio
# - http://localhost:3000/about
# - http://localhost:3000/contact

# Check console: No errors
```

---

## Common Issues & Fixes

### Issue: Sitemap shows "undefined" URLs

**Cause**: `metadataBase` not set or Sanity connection failed

**Fix**:
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://antpitlab.com'), // ← Check this
  ...
}
```

---

### Issue: OG Images not absolute URLs

**Cause**: Missing `metadataBase`

**Fix**: Same as above, ensure `metadataBase` is set in root layout

---

### Issue: Structured Data invalid

**Test**:
1. Copy JSON-LD from page source
2. Paste in https://validator.schema.org/
3. Review errors

**Common fixes**:
- Missing required fields (name, url)
- Invalid URL format (use absolute URLs)
- Wrong data type (string vs number)

---

### Issue: Build fails with TypeScript errors

**Check**:
```bash
npm run build 2>&1 | grep "error TS"
```

**Common errors**:
- Missing type imports
- Incorrect type annotations
- Undefined properties

**Fix**: Review error messages and fix types

---

### Issue: Sanity queries return empty

**Test Sanity connection**:
```typescript
// Test in page.tsx or create test route
const test = await client.fetch('*[_type == "project"][0]')
console.log('Sanity test:', test)
```

**Fix**:
- Check `.env.local` has correct Sanity credentials
- Verify Sanity dataset has published projects
- Check CORS settings in Sanity project

---

## Performance Quick Check

```bash
# After build
npm run start

# Open Chrome DevTools
# Network tab > Disable cache > Reload
```

**Check**:
- HTML loaded: < 1s
- Images lazy loaded: Yes
- Fonts preloaded: Yes
- No blocking resources: Check

---

## Final Checklist

Prima del deploy su produzione:

- [ ] `npm run build` successful
- [ ] `npm run lint` no errors
- [ ] Sitemap accessible (http://localhost:3000/sitemap.xml)
- [ ] Robots accessible (http://localhost:3000/robots.txt)
- [ ] Homepage metadata visible in source
- [ ] Project pages have dynamic metadata
- [ ] Structured data validates on schema.org
- [ ] OG images are absolute URLs
- [ ] No console errors in browser
- [ ] All assets present in public/

---

## Deploy Commands

### Vercel (Recommended)

```bash
# Automatic deploy on git push
git add .
git commit -m "SEO implementation complete"
git push origin main

# Or manual deploy
npx vercel --prod
```

### After Deploy

1. Wait for deployment (2-3 min)
2. Visit: https://antpitlab.com
3. Test sitemap: https://antpitlab.com/sitemap.xml
4. Test robots: https://antpitlab.com/robots.txt
5. Run Lighthouse audit
6. Submit to Google Search Console

---

## Post-Deploy Monitoring

### First 24 Hours
- [ ] Check Vercel deployment logs
- [ ] Test all routes work
- [ ] Verify Sanity data loads
- [ ] Check browser console for errors

### First Week
- [ ] Google Search Console verification
- [ ] Submit sitemap to GSC
- [ ] Monitor Coverage report
- [ ] Check Core Web Vitals

### First Month
- [ ] Review search impressions
- [ ] Check for indexing errors
- [ ] Monitor CTR by page
- [ ] Update meta if needed

---

**Quick Reference**: See `SEO_IMPLEMENTATION.md` for full documentation
