import Link from "next/link";
import {
  KONTAKT,
  NAVIGATION,
  RECHTLICHES,
  SEITE,
} from "@/lib/inhalte/statisch";
import { mailLink, telLink } from "@/lib/kontakt/links";
import { zeilenLinkKlassen } from "./Textlink";

// Fuß (Design „Reihe"): Tinte-Linie oben, drei Spalten mit kleinem Titel
// (Marke, Seiten, Kontakt), darunter eine leise Zeile mit Impressum und
// Datenschutz – keine lose Linkwolke (leitfaden/05). Am Handy stehen die
// Spalten untereinander. Telefon steht nur, wenn Luca eines nennt
// (TODO.md, Zuarbeit); eine fehlende Nummer ist keine Lücke.
export function Fuss() {
  const titel = "text-sm font-semibold";
  const liste = "mt-2 flex flex-col gap-1.5 text-fg-leise";
  return (
    <footer className="border-t border-fg print:hidden">
      <div className="inhalt grid gap-7 py-10 text-[0.9375rem] md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className={titel}>{SEITE.name}</p>
          <p className="mt-2 text-fg-leise">{SEITE.ort}</p>
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
            {KONTAKT.email ? (
              <li>
                <a href={mailLink(KONTAKT.email)} className={zeilenLinkKlassen}>
                  {KONTAKT.email}
                </a>
              </li>
            ) : null}
            {KONTAKT.telefon ? (
              <li>
                <a
                  href={telLink(KONTAKT.telefon)}
                  className={zeilenLinkKlassen}
                >
                  {KONTAKT.telefon}
                </a>
              </li>
            ) : null}
            <li>
              <a href="/api/kontakt.vcf" className={zeilenLinkKlassen}>
                Kontakt speichern
              </a>
            </li>
            {KONTAKT.profile.map((profil) => (
              <li key={profil.url}>
                <a
                  href={profil.url}
                  className={zeilenLinkKlassen}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profil.name}
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Rechtliches"
          className="flex flex-wrap gap-x-6 gap-y-2 border-t border-linie pt-4 text-fg-leise md:col-span-3"
        >
          {RECHTLICHES.map((eintrag) => (
            <Link
              key={eintrag.href}
              href={eintrag.href}
              className={zeilenLinkKlassen}
            >
              {eintrag.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
