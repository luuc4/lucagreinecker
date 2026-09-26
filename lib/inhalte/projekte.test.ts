import { describe, expect, it } from "vitest";
import { PROJEKTE } from "./projekte";

// Der Knopf „<domain> öffnen" darf nur auf die Domain zeigen, die er nennt,
// und nur über HTTPS – keine Übergangsadressen (sslip.io, neu.) auf der
// öffentlichen Seite (Go-live 26.09.2026). Ohne fertige Domain: url null,
// dann gibt es keinen Knopf.
describe("PROJEKTE", () => {
  it("haben eindeutige Slugs", () => {
    const slugs = PROJEKTE.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(PROJEKTE.filter((p) => p.url === null))(
    "$slug hat ohne Knopf einen Stand-Hinweis",
    ({ stand }) => {
      expect(stand?.kurz).toBeTruthy();
      expect(stand?.lang).toBeTruthy();
    },
  );

  it.each(PROJEKTE.filter((p) => p.url !== null))(
    "$slug verlinkt per https genau auf $domain",
    ({ url, domain }) => {
      const ziel = new URL(url!);
      expect(ziel.protocol).toBe("https:");
      expect(ziel.hostname).toBe(domain);
    },
  );
});
