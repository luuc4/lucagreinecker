"use client";

import { clsx } from "clsx";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

// Die Reihe der Projekt-Handys auf der Startseite (Utility `wischleiste` in
// globals.css). Unter lg läuft sie seitlich; darunter zeigen Striche, welche
// Projekte gerade im Blick sind, und „Wischen" sagt, dass es weitergeht
// (Luca, 27.09.2026: am Handy merkt man nicht, dass man wischen muss). Der
// Hinweis ist Deko (aria-hidden): Tastatur und Screenreader erreichen alle
// Projekte über die Liste. Ohne JavaScript bleibt der erste Strich aktiv.
export function Wischleiste({ children }: { children: ReactNode }) {
  const leiste = useRef<HTMLUListElement>(null);
  const anzahl = Children.count(children);
  const [imBlick, setImBlick] = useState(() =>
    Array.from({ length: anzahl }, (_, i) => i === 0),
  );

  useEffect(() => {
    const ul = leiste.current;
    if (!ul) return;
    const eintraege = Array.from(ul.children);
    // Im Blick heißt: mehr als die Hälfte sichtbar. Das angeschnittene
    // nächste Handy (rund ein Viertel) zählt so nicht mit.
    const beobachter = new IntersectionObserver(
      (meldungen) =>
        setImBlick((alt) => {
          const neu = [...alt];
          for (const m of meldungen) {
            neu[eintraege.indexOf(m.target)] = m.intersectionRatio >= 0.6;
          }
          return neu;
        }),
      { root: ul, threshold: 0.6 },
    );
    for (const eintrag of eintraege) beobachter.observe(eintrag);
    return () => beobachter.disconnect();
  }, []);

  return (
    <div className="pb-abschnitt">
      <ul ref={leiste} className="wischleiste">
        {children}
      </ul>
      <div
        aria-hidden="true"
        className="mt-5 flex items-center justify-between lg:hidden"
      >
        <div className="flex gap-1.5">
          {imBlick.map((aktiv, i) => (
            <span
              key={i}
              className={clsx(
                "h-[3px] w-7 transition-colors duration-200",
                aktiv ? "bg-fg" : "bg-linie",
              )}
            />
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-[0.9375rem] text-fg-leise">
          Wischen
          {/* Am Ende der Reihe geht es nur noch zurück. */}
          <Icon
            name="weiter"
            className={clsx(imBlick.at(-1) && "rotate-180")}
          />
        </p>
      </div>
    </div>
  );
}
