import type { MetadataRoute } from "next";
import type { Pfad } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { sprachvarianten } from "@/i18n/seo";
import { PROJEKTE } from "@/lib/inhalte/projekte";

// Alle öffentlichen Seiten, je Sprache ein Eintrag mit den Sprachvarianten
// (hreflang in der Sitemap, aus derselben Funktion wie im HTML). Neue
// Seiten hier eintragen: die E2E-Tests (a11y, platzhalter, seiten,
// sprachen) lesen die Sitemap und prüfen damit jede Seite in jeder Sprache.
// Die Projektseiten kommen aus PROJEKTE.
export const OEFFENTLICHE_SEITEN: Pfad[] = [
  "/",
  ...PROJEKTE.map((p) => ({
    pathname: "/projekte/[slug]" as const,
    params: { slug: p.slug },
  })),
  "/ueber-mich",
  "/kontakt",
  "/impressum",
  "/datenschutz",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eintraege: MetadataRoute.Sitemap = [];
  for (const seite of OEFFENTLICHE_SEITEN) {
    const varianten = await sprachvarianten(seite);
    const start = seite === "/";
    const projekt = typeof seite === "object";
    for (const sprache of routing.locales) {
      eintraege.push({
        url: varianten[sprache],
        changeFrequency: start ? "weekly" : "monthly",
        priority: start ? 1 : projekt ? 0.8 : 0.5,
        alternates: { languages: varianten },
      });
    }
  }
  return eintraege;
}
