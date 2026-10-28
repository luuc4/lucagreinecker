import type { Metadata } from "next";
import { SEITE } from "@/lib/inhalte/statisch";
import { siteUrl } from "@/lib/site";
import { getPathname, type Pfad } from "./navigation";
import { OG_LOCALE, type Sprache } from "./routing";

// Die Sprachvarianten einer Seite als absolute Adressen, aus einer
// Funktion für Canonical, hreflang im HTML, Open Graph und die Sitemap
// (leitfaden/15: die müssen zusammenpassen; next-intls eigener Link-Header
// ist aus). x-default zeigt auf Deutsch, die Sprache ohne Präfix.
export type Sprachvarianten = Record<Sprache | "x-default", string>;

export async function sprachvarianten(href: Pfad): Promise<Sprachvarianten> {
  const basis = siteUrl();
  const de = basis + (await getPathname({ locale: "de", href }));
  const en = basis + (await getPathname({ locale: "en", href }));
  return { de, en, "x-default": de };
}

// Metadaten je Seite und Sprache: Canonical, hreflang und Open Graph mit
// der öffentlichen Adresse. Jede Seite setzt das selbst (`generateMetadata`),
// weil ein `alternates` oder `openGraph` auf einer Seite das des Layouts
// vollständig ersetzt (Next merged nicht tief, Stolperstein laendle-isst).
// og:url steht absolut und ohne das interne `/de`-Präfix: ein relatives
// „./" löste Next gegen den umgeschriebenen Pfad auf (`/de/ueber-mich`),
// eine Adresse, die der Proxy nur per Umleitung bedient (Review
// 28.10.2026). og:image: Weil eine Seite mit eigenem `openGraph` das
// dateibasierte Bild des Layouts (app/[locale]/opengraph-image.tsx)
// verliert, steht das allgemeine Bild hier ausdrücklich, mit Sprache im
// Pfad (`/de/opengraph-image`): proxy.ts nimmt Bildrouten aus, der Server
// liefert sie so direkt. Projektseiten haben ein eigenes Bild im selben
// Segment (`bild: "eigenes"`): das merged Next selbst – mit einem
// Hash-Anhang, den nur Next kennt, deshalb nicht von Hand.
export async function sprachMetadaten(
  href: Pfad,
  sprache: Sprache,
  bild: "allgemein" | "eigenes" = "allgemein",
): Promise<Pick<Metadata, "alternates" | "openGraph">> {
  const varianten = await sprachvarianten(href);
  const canonical = varianten[sprache];
  return {
    alternates: { canonical, languages: varianten },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[sprache],
      siteName: SEITE.name,
      url: canonical,
      ...(bild === "allgemein"
        ? {
            images: [
              {
                url: `${siteUrl()}/${sprache}/opengraph-image`,
                width: 1200,
                height: 630,
                alt: SEITE.name,
              },
            ],
          }
        : {}),
    },
  };
}
