import Link from "next/link";
import type { ReactNode } from "react";

// Drei Link-Formen, eine Quelle (Muster aus OZ, 19.09.2026). Links sind
// Tinte mit Unterstrich; beim Hover legt sich der gelbe Marker dahinter
// (Design „Reihe": Gelb nur als Fläche, nie als Textfarbe).
// - textlinkKlassen: allein in einer Zeile, 44 px hoch für den Daumen.
// - inlineLinkKlassen: im Fließtext, auf der Grundlinie des Satzes.
// - zeilenLinkKlassen: als Wert in einer Datenzeile, Tippfläche unsichtbar
//   auf 48 px vergrößert, ohne die Zeile höher zu machen.
export const inlineLinkKlassen =
  "font-medium text-fg underline decoration-1 underline-offset-4 hover:bg-akzent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";

export const zeilenLinkKlassen = `relative ${inlineLinkKlassen} after:absolute after:-inset-x-1 after:-inset-y-3 after:content-['']`;

export const textlinkKlassen =
  "inline-flex min-h-11 items-center gap-2 font-medium text-fg underline decoration-1 underline-offset-[5px] hover:bg-akzent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";

export function Textlink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        className={textlinkKlassen}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    );
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/api/")) {
    return (
      <a href={href} className={textlinkKlassen}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={textlinkKlassen}>
      {children}
    </Link>
  );
}
