import localFont from "next/font/local";

// PLATZHALTER-SCHRIFT bis zur Design-Richtung. Selbst gehostet aus
// @fontsource-variable (Latin-Subset, variable Gewichtsachse): CSP
// `font-src 'self'`, keine Anfrage an Google, der Build braucht kein Netz.
// Eine andere Schrift: `pnpm add -D @fontsource-variable/<name>`, Pfad
// unten ändern, die Datei im Paketordner unter files/ nachsehen (Achsen im
// Namen: wght, wdth, opsz, standard).
export const inter = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
      style: "normal",
    },
  ],
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});
