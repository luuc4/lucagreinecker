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
// og:url und og:image stehen absolut und ohne das interne `/de`-Präfix:
// ein relatives „./" löste Next gegen den umgeschriebenen Pfad auf
// (`/de/ueber-mich`), und das OG-Bild unter app/[locale] hieße sonst
// `/de/opengraph-image` – beides Adressen, die der Proxy nur per
// Umleitung bedient, und LinkedIn folgt Umleitungen für Vorschauen nicht
// zuverlässig (Review 28.10.2026).
export async function sprachMetadaten(
  href: Pfad,
  sprache: Sprache,
): Promise<Pick<Metadata, "alternates" | "openGraph">> {
  const varianten = await sprachvarianten(href);
  const canonical = varianten[sprache];
  const start = (await getPathname({ locale: sprache, href: "/" })).replace(
    /\/$/,
    "",
  );
  return {
    alternates: { canonical, languages: varianten },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[sprache],
      siteName: SEITE.name,
      url: canonical,
      images: [
        {
          url: `${siteUrl()}${start}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: SEITE.name,
        },
      ],
    },
  };
}
