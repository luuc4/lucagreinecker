import { clsx } from "clsx";
import type { ReactNode } from "react";

// Seitenaufbau mit einem Rhythmus (leitfaden/05): jeder Block trägt den
// Abstand `pb-abschnitt` unten, keiner oben, keine negativen Ränder.

// Kopf einer Unterseite: h1 und optional ein Vorspann. Der Vorspann ist der
// erste echte Satz der Seite oder entfällt – nie ein Hinweis („Ein
// Formular folgt"), nie ein Halbsatz, der allein hängt (Befund OZ,
// 17.09.2026).
export function SeitenKopf({
  titel,
  vorspann,
}: {
  titel: string;
  vorspann?: ReactNode;
}) {
  return (
    <header className="inhalt grid gap-6 pt-12 pb-12 md:pt-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end">
      <h1 className="text-display font-bold">{titel}</h1>
      {vorspann ? <p className="text-lg text-fg-leise">{vorspann}</p> : null}
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
      {titel ? <h2 className="mb-8 text-h2 font-bold">{titel}</h2> : null}
      {children}
    </section>
  );
}

// Spalten mit Linie oben statt Kästen (Muster aus OZ): 1 Spalte am Handy,
// 2 ab md, bis 3 ab lg.
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
      className={clsx(
        "flex flex-col gap-3 border-t border-rahmen pt-5",
        className,
      )}
    >
      <h3 className="text-h3 font-semibold">{titel}</h3>
      {children}
    </div>
  );
}
