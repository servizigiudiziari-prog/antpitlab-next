#!/bin/bash

###############################################################################
# Bundle Analysis Script
# Analizza il bundle size e genera report HTML
###############################################################################

set -e

echo "🔍 Analyzing bundle size..."
echo ""

# Colori per output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build con analyzer abilitato
echo -e "${BLUE}Building production bundle with analyzer...${NC}"
ANALYZE=true npm run build

echo ""
echo -e "${GREEN}✓ Bundle analysis complete!${NC}"
echo ""
echo -e "${YELLOW}Results:${NC}"
echo "  Client bundle: .next/analyze/client.html"
echo "  Server bundle: .next/analyze/server.html"
echo ""
echo -e "${BLUE}Opening browser...${NC}"

# Apri i report in browser (se disponibile)
if command -v open &> /dev/null; then
  # macOS
  open .next/analyze/client.html
elif command -v xdg-open &> /dev/null; then
  # Linux
  xdg-open .next/analyze/client.html
else
  echo "Please open .next/analyze/client.html manually"
fi

echo ""
echo -e "${GREEN}Done!${NC}"
