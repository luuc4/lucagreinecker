import { z } from "zod";
import { routing } from "@/i18n/routing";
import {
  EMAIL_MAX,
  NACHRICHT_MAX,
  NACHRICHT_MIN,
  NAME_MAX,
  TELEFON_MAX,
  type FeldFehlerCode,
} from "./felder";

// Kontaktformular (leitfaden/04, „Kontaktformular"): Name, E-Mail, Telefon
// (freiwillig), Nachricht, die Sprache der Seite und ein Honeypot-Feld, das
// Menschen nicht sehen. Die Anfrage wird nur zugestellt, nie gespeichert.
// Die Meldungen sind Codes (felder.ts), die Seite macht daraus Sätze in
// ihrer Sprache (messages, `formular.feld`).
//
// Nur am Server importieren (actions.ts, Tests): Feldnamen und Längen für
// den Client stehen in felder.ts, damit Zod nicht ins Bundle kommt.

export * from "./felder";

const code = (c: FeldFehlerCode) => c;

export const Anfrage = z.object({
  name: z
    .string()
    .trim()
    .min(2, code("nameMin"))
    .max(NAME_MAX, code("nameMax")),
  email: z
    .string()
    .trim()
    .min(1, code("emailMin"))
    .max(EMAIL_MAX, code("emailMax"))
    .pipe(z.email(code("emailFormat")))
    .transform((s) => s.toLowerCase()),
  telefon: z
    .string()
    .trim()
    .max(TELEFON_MAX, code("telefonMax"))
    .regex(/^[0-9 +()/.-]*$/, code("telefonFormat"))
    .default(""),
  nachricht: z
    .string()
    .trim()
    .min(NACHRICHT_MIN, code("nachrichtMin"))
    .max(NACHRICHT_MAX, code("nachrichtMax")),
  // Sprache der Seite, auf der geschrieben wurde: steht in der
  // Push-Nachricht, damit Luca in derselben Sprache antwortet. Alles
  // Unbekannte zählt als Deutsch.
  sprache: z.enum(routing.locales).catch(routing.defaultLocale),
  // Honeypot: bleibt leer, wenn ein Mensch schreibt. Ohne Längenregel: die
  // hätte keinen Code, und jede Regel hier muss einen haben (Test), sonst
  // stünde der Besucher vor einem Formular ohne Meldung.
  website: z.string().default(""),
});

export type AnfrageDaten = z.infer<typeof Anfrage>;
