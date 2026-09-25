import type { MetadataRoute } from "next";
import { PROJEKTE } from "@/lib/inhalte/projekte";
import { siteUrl } from "@/lib/site";

// Alle öffentlichen Seiten. Neue Seiten hier eintragen: die E2E-Tests
// (a11y, platzhalter, seiten) lesen die Sitemap und prüfen damit jede
// Seite. Die Projektseiten kommen aus PROJEKTE.
export const OEFFENTLICHE_ROUTEN = [
  "/",
  ...PROJEKTE.map((p) => `/projekte/${p.slug}`),
  "/ueber-mich",
  "/kontakt",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const basis = siteUrl();
  return OEFFENTLICHE_ROUTEN.map((pfad) => ({
    url: `${basis}${pfad}`,
    changeFrequency: pfad === "/" ? "weekly" : "monthly",
    priority: pfad === "/" ? 1 : pfad.startsWith("/projekte/") ? 0.8 : 0.5,
  }));
}
