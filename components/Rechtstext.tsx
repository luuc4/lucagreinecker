import type { ReactNode } from "react";

// Impressum und Datenschutz: je Punkt eine Zeile, Titel links, Text rechts,
// Linien dazwischen (Muster aus OZ, DokumentAbschnitte). Am Handy stehen
// Titel und Text untereinander.
export type RechtsZeile = { titel: string; inhalt: ReactNode };

export function Rechtstext({
  zeilen,
  stand,
}: {
  zeilen: RechtsZeile[];
  // „Stand: 23.09.2026" – Datum der geprüften Fassung.
  stand: string;
}) {
  return (
    <div className="inhalt pb-abschnitt">
      <dl className="border-t border-linie">
        {zeilen.map((zeile) => (
          <div
            key={zeile.titel}
            className="grid gap-2 border-b border-linie py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10"
          >
            <dt className="font-semibold">{zeile.titel}</dt>
            <dd className="max-w-prose text-fg-leise">{zeile.inhalt}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-fg-leise">Stand: {stand}</p>
    </div>
  );
}
