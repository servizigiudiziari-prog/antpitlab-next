#!/bin/bash

###############################################################################
# Performance Report Generator
# Genera report completo di performance metrics
###############################################################################

set -e

# Colori
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         AntPit Lab - Performance Report Generator          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_DIR="reports/performance-$TIMESTAMP"

echo -e "${BLUE}Creating report directory...${NC}"
mkdir -p "$REPORT_DIR"

echo ""
echo -e "${BLUE}1. Building production bundle...${NC}"
npm run build > "$REPORT_DIR/build-output.txt" 2>&1

echo ""
echo -e "${BLUE}2. Analyzing bundle size...${NC}"
ANALYZE=true npm run build > "$REPORT_DIR/bundle-analysis.txt" 2>&1

echo ""
echo -e "${BLUE}3. Extracting build metrics...${NC}"

# Estrai metriche da build output
BUILD_SIZE=$(grep "First Load JS" .next/build-manifest.json 2>/dev/null | wc -l || echo "N/A")

cat > "$REPORT_DIR/metrics.txt" <<EOF
Build Metrics - $TIMESTAMP
================================

Bundle Information:
  Build completed: $(date)
  Environment: production
  Next.js version: $(npm list next --depth=0 | grep next | head -1)

Performance Budget:
  ✓ First Load JS target: <200KB
  ✓ LCP target: <2.5s
  ✓ CLS target: <0.1
  ✓ TBT target: <300ms

Build Output:
  Check: $REPORT_DIR/build-output.txt
  Bundle Analysis: $REPORT_DIR/bundle-analysis.txt

Next Steps:
  1. Start production server: npm run start
  2. Run Lighthouse audit: npm run lighthouse
  3. Check Web Vitals in browser DevTools
EOF

echo ""
echo -e "${GREEN}✓ Performance report generated!${NC}"
echo ""
echo -e "${YELLOW}Report location:${NC} $REPORT_DIR/"
echo ""
echo -e "${CYAN}Files generated:${NC}"
echo "  • metrics.txt - Performance metrics summary"
echo "  • build-output.txt - Complete build log"
echo "  • bundle-analysis.txt - Bundle size analysis"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Review bundle analysis in .next/analyze/"
echo "  2. Start server and run Lighthouse: ./scripts/lighthouse-audit.sh"
echo ""
