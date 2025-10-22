#!/bin/bash

###############################################################################
# Lighthouse Audit Script
# Esegue audit Lighthouse su build production
###############################################################################

set -e

# Colori per output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔦 Running Lighthouse Performance Audit"
echo "========================================"
echo ""

# Check se server è running
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
  echo -e "${RED}Error: Next.js server not running on port 3000${NC}"
  echo ""
  echo "Please run in another terminal:"
  echo "  npm run build"
  echo "  npm run start"
  echo ""
  exit 1
fi

echo -e "${GREEN}✓ Server detected on port 3000${NC}"
echo ""

# Run Lighthouse CI
echo -e "${BLUE}Running Lighthouse audits...${NC}"
echo ""

lhci autorun

echo ""
echo -e "${GREEN}✓ Lighthouse audit complete!${NC}"
echo ""
echo -e "${YELLOW}Check the output above for:${NC}"
echo "  • Performance score (target: >90)"
echo "  • Largest Contentful Paint (target: <2.5s)"
echo "  • Cumulative Layout Shift (target: <0.1)"
echo "  • Total Blocking Time (target: <300ms)"
echo ""
