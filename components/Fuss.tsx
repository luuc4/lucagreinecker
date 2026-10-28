import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { andereSprache } from "@/i18n/routing";
import {
  KONTAKT,
  NAVIGATION,
  RECHTLICHES,
  SEITE,
} from "@/lib/inhalte/statisch";
import { mailLink, telLink } from "@/lib/kontakt/links";
import { NeuerTab } from "./NeuerTab";
import { SprachWechsel } from "./SprachWechsel";
import { zeilenLinkKlassen } from "./Textlink";

// Fuß (Design „Reihe"): Tinte-Linie oben, drei Spalten mit kleinem Titel
// (Marke mit Ort und Sprachlink, Seiten, Kontakt), darunter eine leise
// Zeile mit Impressum und Datenschutz – keine lose Linkwolke
// (leitfaden/05). Am Handy stehen die Spalten untereinander. Telefon steht
// nur, wenn Luca eines nennt (TODO.md, Zuarbeit); eine fehlende Nummer ist
// keine Lücke.
export function Fuss() {
  const t = useTranslations();
  const sprache = useLocale();
  const titel = "text-sm font-semibold";
  const liste = "mt-2 flex flex-col gap-1.5 text-fg-leise";
  return (
    <footer className="border-t border-fg print:hidden">
      <div className="inhalt grid gap-7 py-10 text-[0.9375rem] md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className={titel}>{SEITE.name}</p>
          <p className="mt-2 text-fg-leise">{SEITE.ort}</p>
          <p className="mt-2 text-fg-leise">
            <SprachWechsel
              ziel={andereSprache(sprache)}
              label={t("sprache.wechsel")}
              className={zeilenLinkKlassen}
            />
          </p>
        </div>

        <nav aria-label={t("fuss.seiten")}>
          <h2 className={titel}>{t("fuss.seiten")}</h2>
          <ul className={liste}>
            <li>
              <Link href="/" className={zeilenLinkKlassen}>
                {t("fuss.start")}
              </Link>
            </li>
            {NAVIGATION.map((eintrag) => (
              <li key={`${eintrag.pfad}#${eintrag.anker ?? ""}`}>
                <Link
                  href={
                    eintrag.anker
                      ? {
                          pathname: eintrag.pfad,
                          hash: t(`anker.${eintrag.anker}`),
                        }
                      : eintrag.pfad
                  }
                  className={zeilenLinkKlassen}
                >
                  {t(`navigation.${eintrag.label}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/kontakt" className={zeilenLinkKlassen}>
                {t("fuss.kontakt")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={titel}>{t("fuss.kontakt")}</h2>
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
                {t("fuss.kontaktSpeichern")}
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
                  <NeuerTab />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label={t("fuss.rechtliches")}
          className="flex flex-wrap gap-x-6 gap-y-2 border-t border-linie pt-4 text-fg-leise md:col-span-3"
        >
          {RECHTLICHES.map((eintrag) => (
            <Link
              key={eintrag.pfad}
              href={eintrag.pfad}
              className={zeilenLinkKlassen}
            >
              {t(`fuss.${eintrag.label}`)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
