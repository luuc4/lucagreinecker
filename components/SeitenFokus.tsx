"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Nach einem Routenwechsel per Link landet der Fokus auf der ersten h1,
// damit Screenreader und Tastatur wissen, wo die neue Seite anfängt; sonst
// fiele er auf body und die Tastatur begänne wieder ganz oben. Beim ersten
// Laden passiert nichts. Den sichtbaren Ring dafür unterdrückt
// globals.css (am Handy stand er sonst bis zum nächsten Tipp um die
// Überschrift).
export function SeitenFokus() {
  const pfad = usePathname();
  const erster = useRef(true);

  useEffect(() => {
    if (erster.current) {
      erster.current = false;
      return;
    }
    const h1 = document.querySelector<HTMLElement>("main h1");
    if (!h1) return;
    if (!h1.hasAttribute("tabindex")) h1.setAttribute("tabindex", "-1");
    h1.focus({ preventScroll: true });
  }, [pfad]);

  return null;
}
