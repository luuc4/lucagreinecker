import { clsx } from "clsx";
import type { ReactNode } from "react";

// Seitenaufbau mit einem Rhythmus (leitfaden/05): jeder Block trägt den
// Abstand `pb-abschnitt` unten, keiner oben, keine negativen Ränder.
// Titel stehen in Gewicht 500 (Design „Reihe"), nie fett.

// Kopf einer Unterseite: Titel und Art-Zeile mittig (Aufbau der Richtung
// B), optional darunter der Vorspann – der erste echte Satz der Seite oder
// nichts; nie ein Hinweis („Ein Formular folgt"), nie ein Halbsatz, der
// allein hängt (Befund OZ, 17.09.2026).
export function SeitenKopf({
  titel,
  art,
  vorspann,
}: {
  titel: string;
  // Eine Zeile unter dem Titel, leise: was die Seite ist.
  art?: ReactNode;
  vorspann?: ReactNode;
}) {
  return (
    <header className="inhalt flex flex-col items-center gap-3 pt-10 pb-8 text-center md:pt-16 md:pb-12">
      <h1 className="text-display font-medium">{titel}</h1>
      {art ? (
        <p className="max-w-[40ch] text-lg text-fg-leise md:text-xl">{art}</p>
      ) : null}
      {vorspann ? (
        <p className="mt-3 max-w-[48ch] text-lg md:text-xl">{vorspann}</p>
      ) : null}
    </header>
  );
}

// Ein Abschnitt mit großem Titel – nur, wenn darunter ein ganzer Block
// steht. Kurze Inhalte gehören als Spalten in ein Raster, nicht in einen
// eigenen Abschnitt.
export function Abschnitt({
  titel,
  children,
  className,
}: {
  titel?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("inhalt pb-abschnitt", className)}>
      {titel ? <h2 className="mb-8 text-h2 font-medium">{titel}</h2> : null}
      {children}
    </section>
  );
}

// Spalten mit Tinte-Linie oben statt Kästen (Muster aus OZ): 1 Spalte am
// Handy, 2 ab md, bis 3 ab lg.
export function Spalten({
  anzahl = 3,
  children,
}: {
  anzahl?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "grid gap-x-10 gap-y-12 md:grid-cols-2",
        anzahl === 3 && "lg:grid-cols-3",
      )}
    >
      {children}
    </div>
  );
}

export function Spalte({
  titel,
  children,
  className,
}: {
  titel: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx("flex flex-col gap-3 border-t border-fg pt-4", className)}
    >
      <h3 className="text-h3 font-medium">{titel}</h3>
      {children}
    </div>
  );
}

// Fakten als Tabelle mit Linien (Design „Reihe"): Begriff links, Wert
// rechts, Tinte-Linie oben, leise Linien zwischen den Zeilen. Am Handy
// bleibt es zweispaltig mit schmaler Begriffsspalte.
export type Fakt = { begriff: string; wert: ReactNode };

export function Fakten({
  zeilen,
  betont = "wert",
  className,
}: {
  zeilen: readonly Fakt[];
  // Was in Tinte steht: der Wert (Projektfakten) oder der Begriff (Paket,
  // dort ist der Begriff die Aussage und der Wert die Erklärung).
  betont?: "wert" | "begriff";
  className?: string;
}) {
  return (
    <dl className={clsx("border-t border-fg", className)}>
      {zeilen.map((zeile) => (
        <div
          key={zeile.begriff}
          className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-b border-linie py-3 lg:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <dt
            className={betont === "begriff" ? "font-medium" : "text-fg-leise"}
          >
            {zeile.begriff}
          </dt>
          {/* wrap-anywhere: ein langes Wort (Domain, Fachbegriff) bricht in
              der schmalen Spalte, statt die Seite bei 360 px zu verbreitern. */}
          <dd
            className={clsx(
              "wrap-anywhere zahlen",
              betont === "begriff" && "text-fg-leise",
            )}
          >
            {zeile.wert}
          </dd>
        </div>
      ))}
    </dl>
  );
}
