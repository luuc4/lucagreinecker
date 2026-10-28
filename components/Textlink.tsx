import type { ReactNode } from "react";
import { Link, type Ziel } from "@/i18n/navigation";
import {
  istNacktesA,
  istNeuerTab,
  linkHoverKlassen,
  type ExternerLink,
} from "./Links";
import { NeuerTab } from "./NeuerTab";

// Drei Link-Formen, eine Quelle (Muster aus OZ, 19.09.2026). Links sind
// Tinte mit Unterstrich; beim Hover legt sich der gelbe Marker dahinter
// und der Text wird Tinte (linkHoverKlassen in Links.ts; Design „Reihe":
// Gelb nur als Fläche, nie als Textfarbe).
// - textlinkKlassen: allein in einer Zeile, 44 px hoch für den Daumen.
// - inlineLinkKlassen: im Fließtext, auf der Grundlinie des Satzes.
// - zeilenLinkKlassen: als Wert in einer Datenzeile, Tippfläche unsichtbar
//   auf 48 px vergrößert, ohne die Zeile höher zu machen.
// Die Klassen dürfen Client-Komponenten importieren (reine Strings); die
// Komponente Textlink ist eine Server-Komponente (Hinweis je Sprache).
export const inlineLinkKlassen = `font-medium text-fg underline decoration-1 underline-offset-4 ${linkHoverKlassen} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg`;

export const zeilenLinkKlassen = `relative ${inlineLinkKlassen} after:absolute after:-inset-x-1 after:-inset-y-3 after:content-['']`;

export const textlinkKlassen = `inline-flex min-h-11 items-center gap-2 font-medium text-fg underline decoration-1 underline-offset-[5px] ${linkHoverKlassen} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg`;

export function Textlink({
  href,
  children,
}: {
  href: Ziel | ExternerLink;
  children: ReactNode;
}) {
  if (typeof href === "string" && istNeuerTab(href)) {
    return (
      <a
        href={href}
        className={textlinkKlassen}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <NeuerTab />
      </a>
    );
  }
  if (typeof href === "string" && istNacktesA(href)) {
    return (
      <a href={href} className={textlinkKlassen}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Ziel} className={textlinkKlassen}>
      {children}
    </Link>
  );
}
