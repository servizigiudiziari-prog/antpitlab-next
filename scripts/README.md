# Performance Testing Scripts

Scripts automatici per analisi performance e testing del portfolio AntPit Lab.

## Available Scripts

### 1. Bundle Analysis

```bash
npm run analyze
# or
./scripts/analyze-bundle.sh
```

**What it does:**
- Builds production con `ANALYZE=true`
- Genera visualizzazioni interattive del bundle
- Apre automaticamente il report in browser

**Output:**
- `.next/analyze/client.html` - Client bundle breakdown
- `.next/analyze/server.html` - Server bundle breakdown

**When to use:**
- Prima del deploy per verificare bundle size
- Dopo aggiunta di nuove dipendenze
- Per identificare package pesanti
- Per trovare duplicati

---

### 2. Lighthouse Audit

```bash
npm run lighthouse
# or
./scripts/lighthouse-audit.sh
```

**Prerequisites:**
- Server running su `localhost:3000`
- Production build (`npm run build && npm run start`)

**What it does:**
- Esegue Lighthouse CI su multiple pagine
- Run multipli (3x) per media accurata
- Valida assertions (performance >90, etc.)

**Assertions:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: 100
- LCP: < 2500ms
- CLS: < 0.1
- TBT: < 300ms

**When to use:**
- Dopo implementazione ottimizzazioni
- Prima del deploy a production
- Test di regressione performance
- Validazione Core Web Vitals

---

### 3. Performance Report

```bash
npm run perf:report
# or
./scripts/performance-report.sh
```

**What it does:**
- Build production
- Analizza bundle size
- Estrae metriche build
- Genera report completo con timestamp

**Output:**
```
reports/performance-YYYY-MM-DD_HH-MM-SS/
├── metrics.txt           # Summary metriche
├── build-output.txt      # Log completo build
└── bundle-analysis.txt   # Analisi bundle
```

**When to use:**
- Report periodici (weekly/monthly)
- Tracking performance nel tempo
- Documentazione deployment
- Performance audit

---

### 4. Complete Test Suite

```bash
npm run perf:all
```

**What it does:**
1. Production build
2. Bundle analysis
3. Lighthouse audit (se server running)

**Prerequisites:**
- Server non deve essere running (viene fatto build)
- Per Lighthouse: avviare server manualmente dopo

**When to use:**
- Test completo pre-deployment
- CI/CD pipeline
- Validazione major changes

---

## Usage Examples

### Workflow Standard

```bash
# 1. Build & analyze
npm run build
npm run analyze

# 2. Start server (in another terminal)
npm run start

# 3. Run Lighthouse (in original terminal)
npm run lighthouse
```

### Quick Check

```bash
# Build e verifica bundle solo
ANALYZE=true npm run build
```

### Complete Audit

```bash
# Terminal 1
npm run build && npm run start

# Terminal 2
npm run lighthouse
npm run perf:report
```

---

## Script Details

### analyze-bundle.sh

**Environment Variables:**
- `ANALYZE=true` - Abilita bundle analyzer

**Dependencies:**
- `@next/bundle-analyzer`

**Browser Opening:**
- macOS: usa `open`
- Linux: usa `xdg-open`
- Windows: manual open required

---

### lighthouse-audit.sh

**Port Check:**
- Verifica server su port 3000
- Errore se server non running

**Configuration:**
- `.lighthouserc.js` file
- Multiple URLs tested
- 3 runs per URL (average)

**Output:**
- Console con risultati
- `.lighthouseci/` directory con dati

---

### performance-report.sh

**Report Structure:**

```
metrics.txt:
  - Build timestamp
  - Next.js version
  - Performance budget
  - Next steps

build-output.txt:
  - Complete build log
  - All warnings/errors
  - Bundle sizes

bundle-analysis.txt:
  - Detailed bundle breakdown
```

---

## Troubleshooting

### "Server not running on port 3000"

**Solution:**
```bash
# Start server first
npm run build
npm run start

# Then run Lighthouse in another terminal
npm run lighthouse
```

### "ANALYZE=true not working"

**Windows Users:**
```powershell
# PowerShell
$env:ANALYZE="true"
npm run build

# CMD
set ANALYZE=true
npm run build
```

### "Permission denied"

**Make scripts executable:**
```bash
chmod +x scripts/*.sh
```

### "Browser not opening"

**Manual open:**
```bash
# After running analyze
open .next/analyze/client.html

# Or navigate to:
# file:///.../antpitlab-next/.next/analyze/client.html
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Performance Test

on: [push, pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build

      # Bundle analysis
      - run: ANALYZE=true npm run build

      # Lighthouse CI
      - run: npm run start &
      - run: sleep 10
      - run: npm run lighthouse

      # Upload artifacts
      - uses: actions/upload-artifact@v3
        with:
          name: performance-reports
          path: |
            .next/analyze
            .lighthouseci
```

### Vercel Deploy Hooks

```bash
# Add to package.json
{
  "scripts": {
    "vercel-build": "npm run build && npm run analyze"
  }
}
```

---

## Performance Metrics Reference

### Bundle Size Targets

| Metric | Target | Critical |
|--------|--------|----------|
| First Load JS | < 200KB | ✓ |
| Route JS | < 100KB | - |
| Shared JS | < 80KB | - |

### Lighthouse Scores

| Category | Target | Critical |
|----------|--------|----------|
| Performance | ≥ 90 | ✓ |
| Accessibility | ≥ 95 | ✓ |
| Best Practices | ≥ 90 | ✓ |
| SEO | 100 | ✓ |

### Core Web Vitals

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5s - 4.0s | > 4.0s |
| FID/INP | < 100ms | 100ms - 300ms | > 300ms |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |

---

## Additional Resources

- [PERFORMANCE_OPTIMIZATION.md](../PERFORMANCE_OPTIMIZATION.md) - Complete guide
- [PERFORMANCE_TESTING.md](../PERFORMANCE_TESTING.md) - Testing procedures
- [PERFORMANCE_SUMMARY.md](../PERFORMANCE_SUMMARY.md) - Implementation summary

---

**Last Updated:** 2025-01-21
