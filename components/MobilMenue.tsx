"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { NavEintrag } from "@/lib/inhalte/statisch";
import { NavLink } from "./NavLink";

// Eine Zeile im Menü; der Kopf gibt sie dem Sprachlink (zusatz) mit.
export const menueZeile =
  "flex min-h-14 items-center text-2xl font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg";

export type MenueEintrag = {
  eintrag: NavEintrag;
  label: string;
  anker?: string;
};

// Menü am Handy (unter lg): Knopf mit aria-expanded, Liste darunter über
// die volle Breite. Schließt mit Escape (Fokus zurück auf den Knopf) und
// nach einem Klick auf einen Eintrag (der Klick steigt zur Liste hoch).
// Texte kommen vom Server (Kopf), damit die Komponente keine Nachrichten
// im Client braucht; `zusatz` ist der Sprachlink als letzter Eintrag.
export function MobilMenue({
  eintraege,
  texte,
  zusatz,
}: {
  eintraege: MenueEintrag[];
  texte: { menue: string; schliessen: string };
  zusatz?: ReactNode;
}) {
  const [offen, setOffen] = useState(false);
  const listeId = useId();
  const knopf = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!offen) return;
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOffen(false);
      knopf.current?.focus();
    };
    window.addEventListener("keydown", beiTaste);
    return () => window.removeEventListener("keydown", beiTaste);
  }, [offen]);

  return (
    <div className="lg:hidden">
      <button
        ref={knopf}
        type="button"
        aria-expanded={offen}
        aria-controls={listeId}
        onClick={() => setOffen((o) => !o)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-rahmen px-4 font-medium text-fg transition-colors duration-150 hover:border-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        {offen ? texte.schliessen : texte.menue}
      </button>

      <div
        id={listeId}
        hidden={!offen}
        className="absolute inset-x-0 top-full inhalt border-b border-fg bg-grund pb-6"
      >
        <ul className="flex flex-col py-2" onClick={() => setOffen(false)}>
          {eintraege.map(({ eintrag, label, anker }) => (
            <li
              key={`${eintrag.pfad}#${anker ?? ""}`}
              className="border-b border-linie last:border-0"
            >
              <NavLink eintrag={eintrag} anker={anker} className={menueZeile}>
                {label}
              </NavLink>
            </li>
          ))}
          {zusatz ? (
            <li className="border-b border-linie last:border-0 [&>a]:text-fg-leise">
              {zusatz}
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
