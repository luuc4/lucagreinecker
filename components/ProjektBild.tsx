import { clsx } from "clsx";
import type { Projekt } from "@/lib/inhalte/projekte";

// Screenshot eines Projekts als <picture> (AVIF, WebP, JPEG; leitfaden/04,
// „Bilder") aus public/bilder, erzeugt von scripts/projekt-screenshots.mjs.
// Handy 390 × 844, Desktop 1440 × 900, jeweils in doppelter Auflösung.
// Kein next/image: die Varianten liegen vorab da, width/height verhindern
// Layoutsprünge. `sizes` beschreibt, wie breit das Bild im Layout steht.
// `alt` kommt von der Seite in ihrer Sprache (messages, projekt.bildHandy).
// Der untere Rand läuft weich in Papier aus (mask-b-from-82%): der
// Screenshot zeigt den ersten Bildschirm einer längeren Seite, und am
// harten Schnitt stand sonst ein halber Knopf („Alle Kurse" bei OZ) – der
// Befund aus Runde 1. Eine Maske in der Transparenz, kein Farbverlauf
// (Luca, 28.10.2026).
const VARIANTEN = {
  handy: { breiten: [390, 560, 780], seite: 844 / 390 },
  desktop: { breiten: [720, 1200, 1440, 1800], seite: 900 / 1440 },
} as const;

export function ProjektBild({
  projekt,
  ansicht,
  alt,
  sizes,
  className,
  zuerst = false,
}: {
  projekt: Pick<Projekt, "slug">;
  ansicht: keyof typeof VARIANTEN;
  alt: string;
  sizes: string;
  className?: string;
  // Das erste Bild im Blick lädt sofort (LCP), alle anderen erst bei Bedarf.
  zuerst?: boolean;
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
        alt={alt}
        loading={zuerst ? "eager" : "lazy"}
        fetchPriority={zuerst ? "high" : undefined}
        decoding="async"
        className={clsx(
          "h-auto w-full border border-fg mask-b-from-82%",
          className,
        )}
      />
    </picture>
  );
}
