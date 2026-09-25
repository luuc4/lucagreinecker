"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { NavEintrag } from "@/lib/inhalte/statisch";
import { NavLink } from "./NavLink";

// Menü am Handy (unter lg): Knopf mit aria-expanded, Liste darunter über
// die volle Breite. Schließt mit Escape (Fokus zurück auf den Knopf) und
// nach einem Klick auf einen Eintrag (der Klick steigt zur Liste hoch).
export function MobilMenue({ eintraege }: { eintraege: NavEintrag[] }) {
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
        {offen ? "Schließen" : "Menü"}
      </button>

      <div
        id={listeId}
        hidden={!offen}
        className="absolute inset-x-0 top-full inhalt border-b border-fg bg-grund pb-6"
      >
        <ul className="flex flex-col py-2" onClick={() => setOffen(false)}>
          {eintraege.map((eintrag) => (
            <li
              key={eintrag.href}
              className="border-b border-linie last:border-0"
            >
              <NavLink
                href={eintrag.href}
                className="flex min-h-14 items-center text-2xl font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg"
              >
                {eintrag.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
