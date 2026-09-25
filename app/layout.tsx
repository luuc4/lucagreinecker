import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SEITE } from "@/lib/inhalte/statisch";
import { istOeffentlicheDomain, siteUrl } from "@/lib/site";
import { plex } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: SEITE.name, template: `%s · ${SEITE.name}` },
  description: SEITE.beschreibung,
  // Relativ, damit jede Route ihren eigenen Canonical bekommt.
  alternates: { canonical: "./" },
  // neu., staging. und localhost bleiben für Suchmaschinen unsichtbar.
  robots: istOeffentlicheDomain() ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: SEITE.name,
    url: "./",
  },
};

export const viewport: Viewport = {
  // Farbe der Browserleiste am Handy = Hintergrund (globals.css, grund).
  themeColor: "#f5f5f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Nur html und body: Kopf und Fuß der öffentlichen Seite liegen in
// app/(site)/layout.tsx; ein späterer Admin- oder Konto-Bereich bekommt
// eine eigene Routengruppe mit eigenem Layout (ohne Analytics).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de-AT" className={plex.variable}>
      <body className="min-h-dvh bg-grund font-sans text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
