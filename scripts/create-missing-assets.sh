#!/bin/bash

# ============================================================================
# Create Missing Assets Script
# ============================================================================
# This script creates placeholder assets for PWA and social media
# Replace these with professional assets later
#
# Requirements:
#   - ImageMagick (brew install imagemagick)
#   - Run from project root
#
# Usage:
#   chmod +x scripts/create-missing-assets.sh
#   ./scripts/create-missing-assets.sh
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Creating Missing Assets for AntPit Lab${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick not found${NC}"
    echo -e "${YELLOW}Install with: brew install imagemagick${NC}"
    exit 1
fi

# Ensure we're in project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from project root${NC}"
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

echo -e "${YELLOW}Creating PWA Icons...${NC}"

# Create 192x192 icon
echo "  Creating icon-192.png..."
convert -size 192x192 \
  -background "#000000" \
  -fill white \
  -gravity center \
  -pointsize 72 \
  -font Arial-Bold \
  label:"AP" \
  public/icon-192.png

# Create 512x512 icon
echo "  Creating icon-512.png..."
convert -size 512x512 \
  -background "#000000" \
  -fill white \
  -gravity center \
  -pointsize 192 \
  -font Arial-Bold \
  label:"AP" \
  public/icon-512.png

echo -e "${GREEN}✓ PWA icons created${NC}"
echo ""

echo -e "${YELLOW}Creating Open Graph Image...${NC}"

# Create OG image with branding
convert -size 1200x630 \
  -background "#000000" \
  -fill white \
  -gravity center \
  \( -pointsize 72 -font Arial-Bold label:"AntPit Lab" \) \
  -geometry +0-50 -composite \
  \( -pointsize 36 -font Arial label:"Portfolio Fotografico Professionale" \) \
  -geometry +0+50 -composite \
  -quality 90 \
  public/og-image.jpg

echo -e "${GREEN}✓ Open Graph image created${NC}"
echo ""

echo -e "${YELLOW}Creating Favicon...${NC}"

# Create favicon from 192 icon
convert public/icon-192.png \
  -resize 32x32 \
  public/favicon.ico

echo -e "${GREEN}✓ Favicon created${NC}"
echo ""

echo -e "${YELLOW}Creating Apple Touch Icon...${NC}"

# Create Apple touch icon
convert -size 180x180 \
  -background "#000000" \
  -fill white \
  -gravity center \
  -pointsize 68 \
  -font Arial-Bold \
  label:"AP" \
  public/apple-touch-icon.png

echo -e "${GREEN}✓ Apple touch icon created${NC}"
echo ""

echo -e "${YELLOW}Creating PWA Screenshots (optional)...${NC}"

# Create mobile screenshot placeholder
convert -size 540x720 \
  -background "#000000" \
  -fill white \
  -gravity center \
  \( -pointsize 42 -font Arial-Bold label:"AntPit Lab" \) \
  -geometry +0-100 -composite \
  \( -pointsize 24 -font Arial label:"Portfolio" \) \
  -geometry +0-50 -composite \
  \( -pointsize 24 -font Arial label:"Mobile View" \) \
  -geometry +0+50 -composite \
  -quality 90 \
  public/screenshot-mobile.jpg

# Create desktop screenshot placeholder
convert -size 1280x720 \
  -background "#000000" \
  -fill white \
  -gravity center \
  \( -pointsize 64 -font Arial-Bold label:"AntPit Lab" \) \
  -geometry +0-80 -composite \
  \( -pointsize 32 -font Arial label:"Portfolio Fotografico Professionale" \) \
  -geometry +0+20 -composite \
  \( -pointsize 24 -font Arial label:"Desktop View" \) \
  -geometry +0+80 -composite \
  -quality 90 \
  public/screenshot-desktop.jpg

echo -e "${GREEN}✓ PWA screenshots created${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Assets Created Successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${YELLOW}Created files:${NC}"
ls -lh public/*.png public/*.jpg public/*.ico 2>/dev/null || true

echo ""
echo -e "${YELLOW}File sizes:${NC}"
du -h public/icon-192.png
du -h public/icon-512.png
du -h public/og-image.jpg
du -h public/favicon.ico
du -h public/apple-touch-icon.png
du -h public/screenshot-mobile.jpg
du -h public/screenshot-desktop.jpg

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}IMPORTANT: These are placeholder assets${NC}"
echo -e "${YELLOW}Replace with professional assets before final deploy${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review created assets in /public/"
echo "  2. Replace placeholders with your logo/photos"
echo "  3. Run: npm run build"
echo "  4. Test: npm start"
echo -e "${GREEN}========================================${NC}"
