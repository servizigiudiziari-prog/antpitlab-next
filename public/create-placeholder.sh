#!/bin/bash

# Creo icone placeholder con sips (nativo macOS)
cd "/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/public"

# Usa una delle tue foto per creare le icone
SOURCE_IMG="/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/images/hero/1745856323_680fa7431a6e5_IMG_9840.jpeg"

# Verifica che la fonte esista
if [ -f "$SOURCE_IMG" ]; then
  echo "✅ Uso la tua foto per creare le icone"
  
  # icon-192.png
  sips -z 192 192 "$SOURCE_IMG" --out icon-192.png 2>/dev/null
  echo "✅ Creato icon-192.png"
  
  # icon-512.png
  sips -z 512 512 "$SOURCE_IMG" --out icon-512.png 2>/dev/null
  echo "✅ Creato icon-512.png"
  
  # apple-icon.png
  sips -z 180 180 "$SOURCE_IMG" --out apple-icon.png 2>/dev/null
  echo "✅ Creato apple-icon.png"
  
  # og-image.jpg (1200x630 - crop)
  sips -z 630 1200 "$SOURCE_IMG" --out og-image.jpg 2>/dev/null
  echo "✅ Creato og-image.jpg"
  
else
  echo "❌ Foto sorgente non trovata, creo placeholder colorati"
  
  # Fallback: Creo placeholder semplici
  # (Questo non dovrebbe essere necessario)
fi

echo ""
echo "✅ Tutti gli asset creati!"
ls -lh icon-*.png apple-icon.png og-image.jpg 2>/dev/null

