import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { seitenAusSitemap } from "./hilfen";

// Barrierefreiheit mit axe gegen den Prod-Build: jede Seite der Sitemap am
// Handy und am Desktop ohne Verstoß gegen WCAG 2.2 AA. Ein neuer Verstoß
// bricht die CI. Seiten außerhalb der Sitemap (Formulare hinter Login,
// Fehlerseiten) hier zusätzlich eintragen.
const ZUSAETZLICH = ["/gibt-es-nicht"];

const BREITEN: [string, number, number][] = [
  ["handy", 390, 844],
  ["desktop", 1440, 900],
];

for (const [name, width, height] of BREITEN) {
  test(`keine axe-verstöße (${name})`, async ({ page, request }) => {
    test.setTimeout(90_000);
    const pfade = [...(await seitenAusSitemap(request)), ...ZUSAETZLICH];
    await page.setViewportSize({ width, height });
    const befunde: unknown[] = [];
    for (const pfad of pfade) {
      await page.goto(pfad);
      const ergebnis = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const v of ergebnis.violations) {
        befunde.push({
          pfad,
          id: v.id,
          wirkung: v.impact,
          hilfe: v.help,
          stellen: v.nodes.map((n) => n.target.join(" ")),
        });
      }
    }
    expect(befunde).toEqual([]);
  });
}
