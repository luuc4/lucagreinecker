import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { andereSprache } from "@/i18n/routing";
import { NAVIGATION, SEITE } from "@/lib/inhalte/statisch";
import { KnopfLink } from "./KnopfLink";
import { menueZeile, MobilMenue } from "./MobilMenue";
import { NavLink } from "./NavLink";
import { SprachWechsel } from "./SprachWechsel";

// Kopfzeile (Design „Reihe"): Name links, ab lg die Navigation, rechts der
// Sprachlink, die eine Hauptaktion in Gelb und am Handy das Menü; darunter
// die Tinte-Linie, die jede Seite gliedert. Am Handy ein kompakter
// Hauptknopf (44 px, gleich hoch wie der Menü-Knopf); kein zusätzlicher
// Sticky-Streifen unten (leitfaden/05). Ein langer Name bricht am Handy
// um, statt die Knöpfe aus dem Bild zu schieben (Probe 23.09.2026). Die
// Knöpfe schrumpfen nie. Der Sprachlink („English"/„Deutsch") steht ab sm
// im Kopf, darunter als letzter Eintrag im Menü – bei 360 px passte er
// nicht mehr neben Name, Kontakt und Menü (28.10.2026).
export function Kopf() {
  const t = useTranslations();
  const sprache = useLocale();
  // Ohne display: die Nav-Einträge bekommen inline-flex, der Sprachlink
  // hidden sm:inline-flex – zwei display-Klassen nebeneinander gewinnt
  // sonst die zufällig spätere im CSS (Befund 28.10.2026, Link bei 360 px
  // über dem Namen).
  const navLink =
    "min-h-11 items-center rounded-sm px-3.5 font-medium whitespace-nowrap underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";
  const eintraege = NAVIGATION.map((eintrag) => ({
    eintrag,
    label: t(`navigation.${eintrag.label}`),
    anker: eintrag.anker ? t(`anker.${eintrag.anker}`) : undefined,
  }));
  const sprachlink = (className: string) => (
    <SprachWechsel
      ziel={andereSprache(sprache)}
      label={t("sprache.wechsel")}
      className={className}
    />
  );

  return (
    <header className="sticky top-0 z-40 border-b border-fg bg-grund/95 backdrop-blur-md print:hidden">
      <div className="relative inhalt flex h-16 items-center justify-between gap-3 sm:gap-6 lg:h-kopf">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center rounded-sm text-base leading-tight font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg sm:text-lg"
        >
          {SEITE.name}
        </Link>

        <nav aria-label={t("kopf.navigation")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {eintraege.map(({ eintrag, label, anker }) => (
              <li key={`${eintrag.pfad}#${anker ?? ""}`}>
                <NavLink
                  eintrag={eintrag}
                  anker={anker}
                  className={`inline-flex ${navLink}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {sprachlink(`hidden ${navLink} text-fg-leise sm:inline-flex`)}
          {/* Die eine Hauptaktion der Seite. */}
          <KnopfLink href="/kontakt" groesse="sm">
            {t("kopf.kontakt")}
          </KnopfLink>
          <MobilMenue
            eintraege={eintraege}
            texte={{ menue: t("kopf.menue"), schliessen: t("kopf.schliessen") }}
            zusatz={sprachlink(`${menueZeile} sm:hidden`)}
          />
        </div>
      </div>
    </header>
  );
}
