import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Alle öffentlichen Seiten. Neue Seiten hier eintragen: die E2E-Tests
// (a11y, platzhalter) lesen die Sitemap und prüfen damit jede Seite.
export const OEFFENTLICHE_ROUTEN = [
  "/",
  "/kontakt",
  "/impressum",
  "/datenschutz",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const basis = siteUrl();
  return OEFFENTLICHE_ROUTEN.map((pfad) => ({
    url: `${basis}${pfad}`,
    changeFrequency: pfad === "/" ? "weekly" : "monthly",
    priority: pfad === "/" ? 1 : 0.5,
  }));
}
