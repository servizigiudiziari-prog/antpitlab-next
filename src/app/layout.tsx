import type { Metadata } from "next";
import { Montserrat, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AntPit Lab - Portfolio Fotografico",
  description: "Portfolio fotografico professionale di Antonio Pitocco",
  keywords: ["fotografia", "portfolio", "fotografo", "antonio pitocco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${montserrat.variable} ${lato.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
