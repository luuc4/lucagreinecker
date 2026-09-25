import Link from "next/link";
import {
  KONTAKT,
  NAVIGATION,
  PLATZHALTER,
  RECHTLICHES,
  SEITE,
} from "@/lib/inhalte/statisch";
import { mailLink, telLink } from "@/lib/kontakt/links";
import { Icon } from "./Icon";
import { zeilenLinkKlassen } from "./Textlink";

// Fuß mit Spalten und kleinem Titel je Spalte, keine lose Linkwolke
// (leitfaden/05, „Aufbau einer Seite"): Marke, Seiten, Kontakt,
// Rechtliches. Am Handy untereinander, ab md zwei, ab lg vier Spalten.
export function Fuss() {
  const titel = "text-sm font-semibold text-fg";
  const liste = "mt-3 flex flex-col gap-2 text-fg-leise";
  return (
    <footer className="border-t border-linie bg-flaeche print:hidden">
      <div className="inhalt grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight">{SEITE.name}</p>
          <p className="mt-3 max-w-xs text-fg-leise">{SEITE.beschreibung}</p>
        </div>

        <nav aria-label="Seiten">
          <h2 className={titel}>Seiten</h2>
          <ul className={liste}>
            <li>
              <Link href="/" className={zeilenLinkKlassen}>
                Start
              </Link>
            </li>
            {NAVIGATION.map((eintrag) => (
              <li key={eintrag.href}>
                <Link href={eintrag.href} className={zeilenLinkKlassen}>
                  {eintrag.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={titel}>Kontakt</h2>
          <ul className={liste}>
            <li className="flex items-center gap-2">
              <Icon name="telefon" />
              {KONTAKT.telefon ? (
                <a
                  href={telLink(KONTAKT.telefon)}
                  className={zeilenLinkKlassen}
                >
                  {KONTAKT.telefon}
                </a>
              ) : (
                <span>{PLATZHALTER} Telefon</span>
              )}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" />
              {KONTAKT.email ? (
                <a href={mailLink(KONTAKT.email)} className={zeilenLinkKlassen}>
                  {KONTAKT.email}
                </a>
              ) : (
                <span>{PLATZHALTER} E-Mail</span>
              )}
            </li>
          </ul>
        </div>

        <nav aria-label="Rechtliches">
          <h2 className={titel}>Rechtliches</h2>
          <ul className={liste}>
            {RECHTLICHES.map((eintrag) => (
              <li key={eintrag.href}>
                <Link href={eintrag.href} className={zeilenLinkKlassen}>
                  {eintrag.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
