"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavEintrag } from "@/lib/inhalte/statisch";

// Navigationslink mit aktivem Zustand: die aktuelle Seite bekommt
// aria-current und volle Textfarbe, alle anderen bleiben leiser. Ein
// Eintrag mit Anker (Startseite) ist nie „aktiv": er führt zu einem Block,
// nicht zu einer Seite. usePathname aus i18n/navigation liefert den
// internen Pfad ohne Sprachpräfix („/ueber-mich" auch auf /en/about).
// Keine Funktions-Props (Next-Warnung 71007); wer auf Klicks reagieren
// will, hängt den Handler an das umgebende Element.
export function NavLink({
  eintrag,
  anker,
  className,
  children,
}: {
  eintrag: Pick<NavEintrag, "pfad">;
  // Der Anker in der Sprache der Seite (messages, `anker`), falls einer.
  anker?: string;
  className?: string;
  children: ReactNode;
}) {
  const pfad = usePathname();
  const aktiv =
    !anker &&
    (pfad === eintrag.pfad ||
      (eintrag.pfad !== "/" && pfad.startsWith(`${eintrag.pfad}/`)));
  return (
    <Link
      href={anker ? { pathname: eintrag.pfad, hash: anker } : eintrag.pfad}
      aria-current={aktiv ? "page" : undefined}
      className={clsx(className, aktiv ? "text-fg" : "text-fg-leise")}
    >
      {children}
    </Link>
  );
}
