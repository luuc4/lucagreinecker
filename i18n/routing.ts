import { defineRouting } from "next-intl/routing";

// Die eine Stelle für die Sprachen der Seite (leitfaden/15). Deutsch ohne
// Präfix (`/ueber-mich`), Englisch unter `/en/about`: jede Seite hat genau
// eine Adresse je Sprache. Keine Spracherkennung und kein Cookie: wer auf
// `/` kommt, sieht Deutsch und wechselt bewusst über den Link im Kopf. Eine
// automatische Weiterleitung kostete in laendle-isst rund 780 ms, und ein
// Cookie stünde in der Datenschutzerklärung. hreflang baut i18n/seo.ts
// selbst (alternateLinks aus), damit HTML und Sitemap aus einer Funktion
// kommen (Entscheidung 28.10.2026).
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  // Interne Pfade (die Ordner unter app/[locale]) → Adresse je Sprache. Die
  // Projekt-Slugs bleiben in beiden Sprachen gleich (Eigennamen). Nach dem
  // Go-live nie mehr ändern: Links von außen und Suchmaschinen.
  pathnames: {
    "/": "/",
    "/projekte/[slug]": { de: "/projekte/[slug]", en: "/projects/[slug]" },
    "/ueber-mich": { de: "/ueber-mich", en: "/about" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
    "/impressum": { de: "/impressum", en: "/legal-notice" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  },
});

export type Sprache = (typeof routing.locales)[number];
export type InternerPfad = keyof typeof routing.pathnames;

// Die andere Sprache, für den Wechsel-Link. Bei mehr als zwei Sprachen
// würde daraus eine Liste.
export function andereSprache(sprache: Sprache): Sprache {
  return sprache === "de" ? "en" : "de";
}

// `lang` am html-Element und Kennung für Intl-Formate: Deutsch in der
// österreichischen Fassung, Englisch britisch (so sind die Texte
// geschrieben: programme, licence, travelling).
export const HTML_LANG: Record<Sprache, string> = {
  de: "de-AT",
  en: "en-GB",
};
export const OG_LOCALE: Record<Sprache, string> = {
  de: "de_AT",
  en: "en_GB",
};
