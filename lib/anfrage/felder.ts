// Feldnamen, Längen und Fehlercodes des Kontaktformulars, ohne Zod. Das
// Formular (Client) braucht nur diese Werte für maxLength und die
// Fehlerliste; importierte es sie aus schema.ts, käme Zod mit in den
// Client-Bundle (rund 86 KB auf jeder Seite) und Zods JIT-Probe
// `Function("")` löste in Produktion eine CSP-Verletzung aus (Befund
// Lighthouse, 26.09.2026). Das Schema selbst bleibt in schema.ts und läuft
// nur am Server.

export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const TELEFON_MAX = 40;
export const NACHRICHT_MIN = 10;
export const NACHRICHT_MAX = 3000;

export const FELDER = ["name", "email", "telefon", "nachricht"] as const;
export type Feldname = (typeof FELDER)[number];

// Was an einem Feld falsch sein kann, als Code: das Schema meldet den Code,
// die Seite macht in ihrer Sprache einen Satz daraus (messages,
// `formular.feld`). So bleibt Zod sprachfrei (28.10.2026).
export const FELD_FEHLER = [
  "nameMin",
  "nameMax",
  "emailMin",
  "emailMax",
  "emailFormat",
  "telefonMax",
  "telefonFormat",
  "nachrichtMin",
  "nachrichtMax",
] as const;
export type FeldFehlerCode = (typeof FELD_FEHLER)[number];

export function istFeldFehlerCode(wert: string): wert is FeldFehlerCode {
  return (FELD_FEHLER as readonly string[]).includes(wert);
}
