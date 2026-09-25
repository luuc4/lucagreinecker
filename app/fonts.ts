import localFont from "next/font/local";

// IBM Plex Sans, die eine Schrift der Seite (Design „Reihe", 25.09.2026):
// variable Gewichtsachse 100–700, Latin-Subset, selbst gehostet aus
// @fontsource-variable/ibm-plex-sans. CSP `font-src 'self'`, keine Anfrage
// an Google, der Build braucht kein Netz. Das OG-Bild nutzt die statische
// WOFF aus @fontsource/ibm-plex-sans (Satori liest kein woff2).
export const plex = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2",
      style: "normal",
    },
  ],
  weight: "100 700",
  variable: "--font-plex",
  display: "swap",
});
