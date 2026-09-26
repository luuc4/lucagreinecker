import { clsx } from "clsx";
import type { Projekt } from "@/lib/inhalte/projekte";

// Screenshot eines Projekts als <picture> (AVIF, WebP, JPEG; leitfaden/04,
// „Bilder") aus public/bilder, erzeugt von scripts/projekt-screenshots.mjs.
// Handy 390 × 844, Desktop 1440 × 900, jeweils in doppelter Auflösung.
// Kein next/image: die Varianten liegen vorab da, width/height verhindern
// Layoutsprünge. `sizes` beschreibt, wie breit das Bild im Layout steht.
const VARIANTEN = {
  handy: { breiten: [390, 780], seite: 844 / 390 },
  desktop: { breiten: [720, 1200, 1800], seite: 900 / 1440 },
} as const;

export function ProjektBild({
  projekt,
  ansicht,
  sizes,
  className,
  laden = "bedarf",
}: {
  projekt: Pick<Projekt, "slug" | "name">;
  ansicht: keyof typeof VARIANTEN;
  sizes: string;
  className?: string;
  // `zuerst`: das größte Bild im ersten Blick (LCP) lädt sofort mit hoher
  // Priorität. `sichtbar`: die anderen Bilder im ersten Blick laden sofort,
  // aber ohne Vorrang (Chrome meldet lazy geladene Bilder im sichtbaren
  // Bereich als Befund, 26.09.2026). `bedarf`: alles unterhalb lädt beim
  // Scrollen.
  laden?: "zuerst" | "sichtbar" | "bedarf";
}) {
  const { breiten, seite } = VARIANTEN[ansicht];
  const basis = `/bilder/projekt-${projekt.slug}-${ansicht}`;
  const groesste = breiten[breiten.length - 1]!;
  const srcset = (endung: string) =>
    breiten.map((b) => `${basis}-${b}.${endung} ${b}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`${basis}-${groesste}.jpg`}
        width={groesste}
        height={Math.round(groesste * seite)}
        alt={`Startseite von ${projekt.name} am ${ansicht === "handy" ? "Handy" : "Desktop"}`}
        loading={laden === "bedarf" ? "lazy" : "eager"}
        fetchPriority={laden === "zuerst" ? "high" : undefined}
        decoding="async"
        className={clsx("h-auto w-full border border-fg", className)}
      />
    </picture>
  );
}
