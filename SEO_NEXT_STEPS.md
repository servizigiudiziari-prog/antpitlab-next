# SEO Implementation - Next Steps

## Prossimi Step da Completare

### 1. Creare Open Graph Image

**Priorità**: ALTA

**File da creare**: `public/og-image.jpg`

**Specifiche**:
- Dimensioni: 1200x630 pixel
- Formato: JPG (quality 90%)
- Peso: < 1MB
- Safe zone: 1200x600 (contenuto importante)

**Contenuto suggerito**:
```
┌─────────────────────────────────────────┐
│                                         │
│          LOGO ANTPIT LAB                │
│          (centrato, alto)               │
│                                         │
│     ┌───────────────────────────┐      │
│     │                           │      │
│     │  Foto Portfolio Sample    │      │
│     │  (sfondo sfocato/overlay) │      │
│     │                           │      │
│     └───────────────────────────┘      │
│                                         │
│  Portfolio Fotografico Professionale    │
│         antpitlab.com                   │
└─────────────────────────────────────────┘
```

**Tools consigliati**:
- Canva (template Social Media > Facebook Post)
- Figma
- Photoshop
- Online: https://www.opengraph.xyz/

**Test dopo creazione**:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

### 2. Generare Favicon Set

**Priorità**: ALTA

**Files da creare**:
```
public/favicon.ico (32x32)
public/icon.png (192x192 e 512x512)
public/apple-icon.png (180x180)
```

**Generator consigliato**: https://realfavicongenerator.net/

**Steps**:
1. Prepara logo quadrato (512x512px, PNG trasparente)
2. Carica su RealFaviconGenerator
3. Configura:
   - iOS: black background
   - Android: theme color #000000
   - Windows: tile color #000000
4. Download package
5. Estrai files in `public/`

**Verifica**:
- Browser mostra favicon
- iOS home screen mostra icona
- Android mostra icona PWA

---

### 3. Google Search Console Verification

**Priorità**: ALTA

**Steps**:

1. **Accedi a Google Search Console**:
   - URL: https://search.google.com/search-console
   - Login con account Google

2. **Aggiungi proprietà**:
   - Click "Aggiungi proprietà"
   - Seleziona "Prefisso URL"
   - Inserisci: `https://antpitlab.com`

3. **Verifica proprietà** (metodo consigliato: HTML tag):
   - Seleziona "Tag HTML"
   - Copia il codice verification: `google-site-verification=XXX`
   - Apri `src/app/layout.tsx`
   - Sostituisci `'google-site-verification-code'` con il codice copiato
   - Deploy su produzione
   - Torna su Search Console e click "Verifica"

4. **Submit sitemap**:
   - Vai su "Sitemaps" nel menu laterale
   - Click "Aggiungi un nuovo sitemap"
   - Inserisci: `sitemap.xml`
   - Click "Invia"

5. **Verifica indicizzazione**:
   - Aspetta 24-48 ore
   - Controlla "Copertura" per stato pagine
   - Usa "Controllo URL" per pagine specifiche

---

### 4. Test Social Media Previews

**Priorità**: MEDIA

**Facebook Debugger**:
1. URL: https://developers.facebook.com/tools/debug/
2. Inserisci URL: `https://antpitlab.com`
3. Click "Debug"
4. Verifica:
   - OG image appare (1200x630)
   - Title corretto
   - Description corretta
   - No warning/errors
5. Click "Scrape Again" se serve refresh

**Twitter Card Validator**:
1. URL: https://cards-dev.twitter.com/validator
2. Inserisci URL: `https://antpitlab.com`
3. Click "Preview card"
4. Verifica:
   - Card type: summary_large_image
   - Image appare
   - Title e description corretti

**LinkedIn Post Inspector**:
1. URL: https://www.linkedin.com/post-inspector/
2. Inserisci URL: `https://antpitlab.com`
3. Click "Inspect"
4. Verifica preview

---

### 5. Lighthouse SEO Audit

**Priorità**: ALTA

**Steps**:

1. **Build production**:
   ```bash
   npm run build
   npm run start
   ```

2. **Apri Chrome DevTools**:
   - F12 o Cmd+Opt+I
   - Tab "Lighthouse"

3. **Configura audit**:
   - Mode: Navigation
   - Device: Desktop + Mobile
   - Categories: SEO (+ Performance, Accessibility)
   - Click "Analyze page load"

4. **Target scores**:
   - SEO: 100/100 ✓
   - Performance: 90+ (target)
   - Accessibility: 90+ (target)
   - Best Practices: 90+ (target)

5. **Fix issues**:
   - Review failed audits
   - Fix uno alla volta
   - Re-test

**Common issues**:
- Missing OG image → Step 1
- Missing favicon → Step 2
- Images without alt → Add alt attributes
- Links not crawlable → Use `<a href>` not `<button onClick>`

---

### 6. Schema Markup Validation

**Priorità**: MEDIA

**Google Rich Results Test**:
1. URL: https://search.google.com/test/rich-results
2. Inserisci URL o paste HTML
3. Test pagine:
   - Homepage (Person + WebSite schema)
   - Portfolio (CreativeWork schema)
   - Singolo progetto (Photograph schema)
4. Expected: "Page is eligible for rich results" (GREEN)

**Schema.org Validator**:
1. URL: https://validator.schema.org/
2. View source della pagina
3. Copia JSON-LD script content
4. Paste nel validator
5. Verifica: No errors

---

### 7. Configurare Analytics (Opzionale)

**Priorità**: BASSA (già integrato Vercel Analytics)

**Google Analytics 4** (se richiesto):
1. Crea property GA4: https://analytics.google.com/
2. Ottieni Measurement ID (G-XXXXXXXXXX)
3. Installa: `npm install @next/third-parties`
4. Aggiungi in `src/app/layout.tsx`:
   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'

   // In <body>
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

**Vercel Analytics** (già presente):
- Già integrato nel layout
- Dashboard su: https://vercel.com/analytics
- Include Core Web Vitals automaticamente

---

### 8. Monitoraggio Continuo

**Priorità**: ONGOING

**Settimanalmente**:
- [ ] Check Google Search Console per errori
- [ ] Review Performance report (clicks, impressions)
- [ ] Monitor Core Web Vitals

**Mensilmente**:
- [ ] Lighthouse audit completo
- [ ] Review keywords performance
- [ ] Update meta descriptions se CTR basso
- [ ] Check broken links

**Trimestralmente**:
- [ ] Review structured data (nuovi schema types?)
- [ ] Audit competitor SEO
- [ ] Update keywords strategy
- [ ] A/B test meta descriptions

---

## Checklist Finale Pre-Launch

Prima del deploy in produzione, verifica:

### Assets
- [ ] `public/og-image.jpg` presente (1200x630)
- [ ] `public/favicon.ico` presente
- [ ] `public/icon.png` presente (192x192, 512x512)
- [ ] `public/apple-icon.png` presente (180x180)

### Meta Tags
- [ ] Title template configurato
- [ ] Description su tutte le pagine (150-160 char)
- [ ] OG images absolute URLs
- [ ] Canonical URLs su tutte le pagine

### Structured Data
- [ ] Person schema su homepage
- [ ] WebSite schema su homepage
- [ ] Photograph schema su progetti
- [ ] Breadcrumb schema su tutte le pagine
- [ ] Validate su schema.org

### Technical
- [ ] `sitemap.xml` accessibile
- [ ] `robots.txt` configurato
- [ ] Google verification code aggiunto
- [ ] Build production successful (`npm run build`)
- [ ] No console errors

### Testing
- [ ] Lighthouse SEO: 100/100
- [ ] Facebook preview OK
- [ ] Twitter card OK
- [ ] LinkedIn preview OK
- [ ] Rich Results Test: PASS

---

## Commands Utili

### Development
```bash
# Start dev server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint check
npm run lint
```

### Testing
```bash
# Test sitemap locally
curl http://localhost:3000/sitemap.xml

# Test robots locally
curl http://localhost:3000/robots.txt

# View page source (metadata)
curl http://localhost:3000 | grep -A 10 "<meta"
```

### Production
```bash
# Deploy su Vercel
git push origin main
# Auto-deploy via Vercel integration

# Force rebuild
vercel --prod
```

---

## Risorse Utili

### Documentazione
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [SEO Implementation Guide](./SEO_IMPLEMENTATION.md)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema Markup Validator](https://validator.schema.org/)

### Generators
- [OG Image](https://www.opengraph.xyz/)
- [Favicon](https://realfavicongenerator.net/)
- [Meta Tags](https://metatags.io/)

---

## Supporto

Per domande o problemi:
1. Consulta `SEO_IMPLEMENTATION.md` (troubleshooting section)
2. Review Next.js docs
3. Test su validators online

---

**Ultimo aggiornamento**: 21 Ottobre 2025

**Obiettivo**: Lighthouse SEO 100/100 - READY TO ACHIEVE ✓
