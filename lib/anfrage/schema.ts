import { z } from "zod";
import {
  EMAIL_MAX,
  NACHRICHT_MAX,
  NACHRICHT_MIN,
  NAME_MAX,
  TELEFON_MAX,
} from "./felder";

// Kontaktformular (leitfaden/04, „Kontaktformular"): Name, E-Mail, Telefon
// (freiwillig), Nachricht und ein Honeypot-Feld, das Menschen nicht sehen.
// Die Anfrage wird nur gemailt, nie gespeichert. Die Meldungen sind neutral
// formuliert (weder Du noch Sie), damit sie in jedes Projekt passen.
//
// Nur am Server importieren (actions.ts, Tests): Feldnamen und Längen für
// den Client stehen in felder.ts, damit Zod nicht ins Bundle kommt.

export * from "./felder";

export const Anfrage = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte den Namen angeben.")
    .max(NAME_MAX, `Höchstens ${NAME_MAX} Zeichen.`),
  email: z
    .string()
    .trim()
    .min(1, "Bitte die E-Mail-Adresse angeben.")
    .max(EMAIL_MAX, `Höchstens ${EMAIL_MAX} Zeichen.`)
    .pipe(z.email("Diese E-Mail-Adresse stimmt nicht."))
    .transform((s) => s.toLowerCase()),
  telefon: z
    .string()
    .trim()
    .max(TELEFON_MAX, `Höchstens ${TELEFON_MAX} Zeichen.`)
    .regex(/^[0-9 +()/.-]*$/, "Nur Ziffern, Leerzeichen und + ( ) / - .")
    .default(""),
  nachricht: z
    .string()
    .trim()
    .min(
      NACHRICHT_MIN,
      `Die Nachricht braucht mindestens ${NACHRICHT_MIN} Zeichen.`,
    )
    .max(NACHRICHT_MAX, `Höchstens ${NACHRICHT_MAX} Zeichen.`),
  // Honeypot: bleibt leer, wenn ein Mensch schreibt.
  website: z.string().max(500).default(""),
});

export type AnfrageDaten = z.infer<typeof Anfrage>;
