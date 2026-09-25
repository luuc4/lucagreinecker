import Link from "next/link";
import { NAVIGATION, SEITE } from "@/lib/inhalte/statisch";
import { KnopfLink } from "./Knopf";
import { MobilMenue } from "./MobilMenue";
import { NavLink } from "./NavLink";

// Kopfzeile (Design „Reihe"): Name links, ab lg die Navigation, rechts die
// eine Hauptaktion in Gelb; darunter die Tinte-Linie, die jede Seite
// gliedert. Am Handy ein kompakter Hauptknopf (44 px, gleich hoch wie der
// Menü-Knopf) und das Menü; kein zusätzlicher Sticky-Streifen unten
// (leitfaden/05). Ein langer Name bricht am Handy um, statt die Knöpfe aus
// dem Bild zu schieben (Probe 23.09.2026). Die Knöpfe schrumpfen nie.
export function Kopf() {
  return (
    <header className="sticky top-0 z-40 border-b border-fg bg-grund/95 backdrop-blur-md print:hidden">
      <div className="relative inhalt flex h-16 items-center justify-between gap-3 sm:gap-6 lg:h-kopf">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center rounded-sm text-base leading-tight font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg sm:text-lg"
        >
          {SEITE.name}
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAVIGATION.map((eintrag) => (
              <li key={eintrag.href}>
                <NavLink
                  href={eintrag.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-3.5 font-medium whitespace-nowrap underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                >
                  {eintrag.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Die eine Hauptaktion der Seite. */}
          <KnopfLink href="/kontakt" groesse="sm">
            Kontakt
          </KnopfLink>
          <MobilMenue eintraege={NAVIGATION} />
        </div>
      </div>
    </header>
  );
}
