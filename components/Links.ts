// Welche Sorte Ziel ein Link hat (KnopfLink, Textlink): Seiten der App
// gehen über den sprachbewussten Link aus i18n/navigation; http(s) öffnet
// in einem neuen Tab mit Hinweis für Screenreader; alles mit Schema
// (mailto:, tel:) und Dateien aus Route Handlern unter /api (vCard,
// Kalender) bleiben ein nacktes <a>, damit der Client-Router sie nicht
// anfasst.
export type ExternerLink =
  | `http://${string}`
  | `https://${string}`
  | `mailto:${string}`
  | `tel:${string}`
  | `/api/${string}`;

export function istNeuerTab(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function istNacktesA(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/api/");
}
