import { HTML_LANG, type Sprache } from "@/i18n/routing";

// Ein Datum aus ISO („2026-10-25") als Text je Sprache: „25.10.2026" und
// „25 October 2026". Zeitzone fest, damit der Container (UTC) nicht einen
// Tag daneben liegt. Für den Stand der Rechtstexte; Inhalte tragen Daten
// als ISO, nie als fertigen Text.
export function datumText(iso: string, sprache: Sprache): string {
  return new Intl.DateTimeFormat(HTML_LANG[sprache], {
    day: "2-digit",
    month: sprache === "de" ? "2-digit" : "long",
    year: "numeric",
    timeZone: "Europe/Vienna",
  }).format(new Date(iso));
}
