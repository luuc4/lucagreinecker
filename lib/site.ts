// SITE_URL mit Fallback (Muster aus punktetafel und OZ): ohne gesetzte
// Variable läuft die Seite auf localhost weiter, warnt aber in Produktion –
// ein Deploy ohne SITE_URL würde sonst Canonicals und Sitemap still auf
// localhost zeigen lassen. Gelesen wird in Funktionen, nie auf Modulebene.
// SITE_URL muss beim Build gesetzt sein (Repository-Variable → Build-Arg),
// weil statische Seiten, robots und Metadata sie einbacken.
const FALLBACK = "http://localhost:3000";

// Die Hosts, die in Suchmaschinen erscheinen dürfen. neu., staging. und
// localhost bleiben unsichtbar (robots.ts und das Root-Layout lesen das).
// Beim Domainumzug reicht deshalb ein Rebuild mit neuer SITE_URL.
export const OEFFENTLICHE_HOSTS = [
  "lucagreinecker.at",
  "www.lucagreinecker.at",
] as const;

export function siteUrl(): string {
  const roh = process.env.SITE_URL?.trim();
  if (!roh) {
    if (process.env.NODE_ENV === "production") {
      console.warn(`[site] SITE_URL fehlt, Fallback ${FALLBACK}`);
    }
    return FALLBACK;
  }
  return roh.replace(/\/+$/, "");
}

export function siteHost(): string {
  return new URL(siteUrl()).hostname;
}

export function istOeffentlicheDomain(): boolean {
  return (OEFFENTLICHE_HOSTS as readonly string[]).includes(siteHost());
}
