import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Die Farben in globals.css halten WCAG 2.2 AA, hell wie dunkel (AGENTS.md
// „Design", Kontraste gemessen am 25.09.2026 und 28.10.2026). Der Test
// liest beide Paletten aus der CSS-Datei, damit ein neuer Wert nicht
// unbemerkt unter die Grenze rutscht. Linien sind Deko und haben keine
// Grenze.
const css = readFileSync(join(import.meta.dirname, "globals.css"), "utf8");

function palette(block: string): Record<string, string> {
  return Object.fromEntries(
    [...block.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6})/g)].map((m) => [
      m[1]!,
      m[2]!,
    ]),
  );
}

// Ein Block von seinem Anfang bis zur schließenden Klammer auf seiner
// Ebene: `@theme` steht ganz außen („}" in Spalte 0), der Dunkel-Block
// innerhalb von `@layer base` (zwei Leerzeichen davor).
function ausschnitt(start: string, ende: string): string {
  const von = css.indexOf(start);
  expect(von, start).toBeGreaterThanOrEqual(0);
  const bis = css.indexOf(ende, von);
  expect(bis, `${start} … ${ende}`).toBeGreaterThan(von);
  return css.slice(von, bis);
}

const hell = palette(ausschnitt("@theme {", "\n}"));
const dunkel = {
  ...hell,
  ...palette(
    ausschnitt("@media screen and (prefers-color-scheme: dark)", "\n  }"),
  ),
};

function luminanz(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function kontrast(a: string, b: string): number {
  const [hoch, tief] = [luminanz(a), luminanz(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hoch + 0.05) / (tief + 0.05);
}

// [Vordergrund, Hintergrund, Mindestkontrast]: 4,5 für Text, 3 für Rahmen.
// fg auf grund deckt auch den Fokusring ab: er ist fg und liegt mit 2 px
// Abstand außerhalb, also auf grund.
type Regel = [string, string, number];
const REGELN: Regel[] = [
  ["fg", "grund", 4.5],
  ["fg", "flaeche", 4.5],
  ["fg-leise", "grund", 4.5],
  ["fg-leise", "flaeche", 4.5],
  ["fehler", "grund", 4.5],
  ["rahmen", "grund", 3],
  ["auf-akzent", "akzent", 4.5],
  ["auf-akzent", "akzent-hover", 4.5],
];
// Gelb auf Papier hat nur 1,1:1 – der Knopf lebt von Tinte-Text und Form,
// nicht vom Kontrast der Fläche (Design „Reihe"). Im Dunkeln steht Gelb
// als Signal auf fast Schwarz, das soll so bleiben (14,5:1 gemessen).
const NUR_DUNKEL: Regel[] = [["akzent", "grund", 3]];

describe.each([
  ["hell", hell, REGELN],
  ["dunkel", dunkel, [...REGELN, ...NUR_DUNKEL]],
])("palette %s", (_name, farben, regeln) => {
  it("hat alle Rollen", () => {
    for (const rolle of [
      "grund",
      "flaeche",
      "fg",
      "fg-leise",
      "linie",
      "rahmen",
      "akzent",
      "akzent-hover",
      "auf-akzent",
      "fehler",
    ]) {
      expect(farben[rolle], rolle).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it.each(regeln)("%s auf %s hat mindestens %s:1", (vorne, hinten, min) => {
    const wert = kontrast(farben[vorne]!, farben[hinten]!);
    expect(
      wert,
      `${farben[vorne]} auf ${farben[hinten]}`,
    ).toBeGreaterThanOrEqual(min);
  });
});

it("gelb und die tinte darauf sind in beiden paletten gleich", () => {
  for (const rolle of ["akzent", "akzent-hover", "auf-akzent"]) {
    expect(dunkel[rolle]).toBe(hell[rolle]);
  }
});
