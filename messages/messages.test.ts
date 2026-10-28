import { describe, expect, it } from "vitest";
import {
  PROJEKTE,
  type Projekt,
  type ProjektSlug,
} from "@/lib/inhalte/projekte";
import { routing } from "@/i18n/routing";
import { de } from "./de";
import { en } from "./en";

// Beide Sprachen haben dieselben Schlüssel (leitfaden/15). TypeScript
// prüft das schon über den Typ `Nachrichten`; der Test fängt, was der Typ
// nicht sieht: ein leerer Text, ein Platzhalter aus einem Satz heraus, ein
// Punkt in einem Schlüssel (next-intl nimmt ihn als Verschachtelung).
function schluessel(wert: unknown, pfad = ""): string[] {
  if (typeof wert !== "object" || wert === null) return [pfad];
  return Object.entries(wert).flatMap(([k, v]) =>
    schluessel(v, pfad ? `${pfad}.${k}` : k),
  );
}

const SPRACHEN = { de, en };

describe("nachrichten", () => {
  it("haben in beiden Sprachen dieselben Schlüssel", () => {
    expect(schluessel(en)).toEqual(schluessel(de));
  });

  it("routing kennt genau die Sprachen mit Nachrichten", () => {
    expect([...routing.locales].sort()).toEqual(Object.keys(SPRACHEN).sort());
  });

  it.each(Object.entries(SPRACHEN))(
    "%s: kein leerer Text außer den erlaubten, kein Punkt in Schlüsseln",
    (_sprache, nachrichten) => {
      // `hinweis` der Rechtstexte darf leer sein (auf Deutsch gibt es keinen
      // Hinweis auf die verbindliche Fassung).
      const erlaubtLeer = new Set(["impressum.hinweis", "datenschutz.hinweis"]);
      const leer: string[] = [];
      const walk = (wert: unknown, pfad: string) => {
        if (typeof wert === "string") {
          if (wert.trim() === "" && !erlaubtLeer.has(pfad)) leer.push(pfad);
          return;
        }
        if (typeof wert === "object" && wert !== null) {
          for (const [k, v] of Object.entries(wert)) {
            expect(k, `Schlüssel ${pfad}.${k}`).not.toContain(".");
            walk(v, pfad ? `${pfad}.${k}` : k);
          }
        }
      };
      walk(nachrichten, "");
      expect(leer).toEqual([]);
    },
  );

  it.each(Object.entries(SPRACHEN))(
    "%s: jedes Projekt hat Texte, ohne Knopf einen Stand-Hinweis",
    (_sprache, nachrichten) => {
      // Ohne die Literaltypen aus `as const`, sonst ist `url === null` für
      // TypeScript unmöglich und der Zweig fällt weg.
      for (const projekt of PROJEKTE as readonly Projekt[]) {
        const texte = nachrichten.projekte[projekt.slug as ProjektSlug];
        expect(texte.satz.length, projekt.slug).toBeGreaterThan(20);
        if (projekt.url === null) {
          expect(texte.stand?.kurz, projekt.slug).toBeTruthy();
          expect(texte.stand?.lang, projekt.slug).toBeTruthy();
        }
      }
    },
  );

  it("die Meta-Beschreibungen bleiben unter 160 Zeichen", () => {
    for (const n of Object.values(SPRACHEN)) {
      for (const text of [
        n.seite.beschreibung,
        n.ueberMich.beschreibung,
        n.kontakt.beschreibung.replace("{name}", "Luca Greinecker"),
      ]) {
        expect(text.length, text).toBeLessThanOrEqual(160);
      }
    }
  });
});
