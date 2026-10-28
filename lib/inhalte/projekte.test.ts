import { describe, expect, it } from "vitest";
import { PROJEKTE, type Projekt } from "./projekte";

// Ohne die Literaltypen aus `as const`: die Tests prüfen die Regel, nicht
// die aktuellen Werte.
const projekte: readonly Projekt[] = PROJEKTE;

// Der Knopf „<domain> öffnen" darf nur auf die Domain zeigen, die er nennt,
// und nur über HTTPS – keine Übergangsadressen (sslip.io, neu.) auf der
// öffentlichen Seite (Go-live 26.09.2026). Ohne fertige Domain: url null,
// dann gibt es keinen Knopf, und die Texte brauchen einen Stand-Hinweis
// (messages/messages.test.ts).
describe("PROJEKTE", () => {
  it("haben eindeutige Slugs", () => {
    const slugs = projekte.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(projekte.filter((p) => p.url !== null))(
    "$slug verlinkt per https genau auf $domain",
    ({ url, domain }) => {
      const ziel = new URL(url!);
      expect(ziel.protocol).toBe("https:");
      expect(ziel.hostname).toBe(domain);
    },
  );
});
