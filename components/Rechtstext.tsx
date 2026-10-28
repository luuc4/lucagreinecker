import { useMessages, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { inlineLinkKlassen } from "./Textlink";

// Impressum und Datenschutz: je Punkt eine Zeile, Titel links, Text rechts,
// Linien dazwischen (Muster aus OZ, DokumentAbschnitte). Am Handy stehen
// Titel und Text untereinander. `stand` ist der fertige Satz in der Sprache
// der Seite („Stand: 25.10.2026", „Last updated: 25 October 2026").
export type RechtsZeile = { titel: string; inhalt: ReactNode };

export function Rechtstext({
  zeilen,
  stand,
}: {
  zeilen: RechtsZeile[];
  stand: string;
}) {
  return (
    <div className="inhalt pb-abschnitt">
      <dl className="border-t border-fg">
        {zeilen.map((zeile) => (
          <div
            key={zeile.titel}
            className="grid gap-2 border-b border-linie py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10"
          >
            <dt className="font-medium">{zeile.titel}</dt>
            <dd className="flex max-w-prose flex-col gap-3 text-fg-leise">
              {zeile.inhalt}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-fg-leise">{stand}</p>
    </div>
  );
}

// Der Satz unter dem Titel einer Übersetzung: „Courtesy translation. The
// German version is the legally binding one." mit Link auf die deutsche
// Seite. Auf Deutsch ist `hinweis` leer, dann gibt es den Satz nicht
// (leitfaden/15, „Recht").
export function RechtsHinweis({
  bereich,
  pfad,
}: {
  bereich: "impressum" | "datenschutz";
  pfad: "/impressum" | "/datenschutz";
}) {
  const t = useTranslations(bereich);
  const nachrichten = useMessages();
  if (!nachrichten[bereich].hinweis) return null;
  return t.rich("hinweis", {
    de: (text) => (
      <Link href={pfad} locale="de" lang="de" className={inlineLinkKlassen}>
        {text}
      </Link>
    ),
  });
}
