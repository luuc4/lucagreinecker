import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SeitenKopf } from "@/components/Abschnitt";
import { RechtsHinweis, Rechtstext } from "@/components/Rechtstext";
import { inlineLinkKlassen } from "@/components/Textlink";
import { sprachMetadaten } from "@/i18n/seo";
import { seitenSprache } from "@/i18n/sprache";
import { datumText } from "@/lib/inhalte/datum";
import { IMPRESSUM, KONTAKT } from "@/lib/inhalte/statisch";
import { mailLink } from "@/lib/kontakt/links";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sprache = await seitenSprache(params);
  const t = await getTranslations({ locale: sprache, namespace: "impressum" });
  return {
    title: t("titel"),
    ...(await sprachMetadaten("/impressum", sprache)),
  };
}

// Impressum und Offenlegung (§ 5 ECG, § 25 MedienG). Angaben von Luca
// (26.09.2026): Anschrift wie auf der alten Seite, derzeit keine
// Gewerbeberechtigung, keine Telefonnummer. Die Texte stehen in messages
// (impressum); die englische Fassung ist eine Übersetzung mit Hinweis auf
// die verbindliche deutsche (leitfaden/15). Offene Prüfstellen für WKO
// oder Anwalt stehen in TODO.md, Etappe 3 – nicht auf der Seite.
export default async function Impressum({ params }: Props) {
  const sprache = await seitenSprache(params);
  const t = await getTranslations("impressum");
  const email = KONTAKT.email ?? "";
  return (
    <>
      <SeitenKopf
        titel={t("titel")}
        art={<RechtsHinweis bereich="impressum" pfad="/impressum" />}
      />
      <Rechtstext
        stand={t("stand", { datum: datumText(IMPRESSUM.stand, sprache) })}
        zeilen={[
          {
            titel: t("medieninhaber"),
            inhalt: (
              <>
                <p>
                  {IMPRESSUM.name}
                  <br />
                  {IMPRESSUM.strasse}
                  <br />
                  {IMPRESSUM.ort}, {t("land")}
                </p>
                <p>
                  {t("email")}{" "}
                  <a href={mailLink(email)} className={inlineLinkKlassen}>
                    {email}
                  </a>
                </p>
              </>
            ),
          },
          { titel: t("gegenstand.titel"), inhalt: t("gegenstand.text") },
          { titel: t("richtung.titel"), inhalt: t("richtung.text") },
          { titel: t("projekte.titel"), inhalt: t("projekte.text") },
          { titel: t("links.titel"), inhalt: t("links.text") },
          { titel: t("urheberrecht.titel"), inhalt: t("urheberrecht.text") },
        ]}
      />
    </>
  );
}
