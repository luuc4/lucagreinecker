import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
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
  const t = await getTranslations({
    locale: sprache,
    namespace: "datenschutz",
  });
  return {
    title: t("titel"),
    ...(await sprachMetadaten("/datenschutz", sprache)),
  };
}

// Datenschutzerklärung (DSGVO, TKG 2021). Jeder Punkt beschreibt, was der
// Server wirklich tut (leitfaden/07); die Texte und die Belege dazu stehen
// in messages/de.ts (datenschutz). Die englische Fassung ist eine
// Übersetzung mit Hinweis auf die verbindliche deutsche (leitfaden/15).
// Entwurf vom 26.09.2026; die Prüfstellen für WKO oder Anwalt stehen in
// TODO.md, Etappe 3, nicht auf der Seite.
export default async function Datenschutz({ params }: Props) {
  const sprache = await seitenSprache(params);
  const t = await getTranslations("datenschutz");
  const m = await getMessages();
  const email = KONTAKT.email ?? "";
  const absaetze = (texte: readonly string[]) =>
    texte.map((text) => <p key={text}>{text}</p>);
  return (
    <>
      <SeitenKopf
        titel={t("titel")}
        art={<RechtsHinweis bereich="datenschutz" pfad="/datenschutz" />}
      />
      <Rechtstext
        stand={t("stand", { datum: datumText(IMPRESSUM.stand, sprache) })}
        zeilen={[
          {
            titel: t("verantwortlicher"),
            inhalt: (
              <>
                <p>
                  {IMPRESSUM.name}
                  <br />
                  {IMPRESSUM.strasse}
                  <br />
                  {IMPRESSUM.ort}, {m.impressum.land}
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
          { titel: t("kurz.titel"), inhalt: t("kurz.text") },
          {
            titel: t("hosting.titel"),
            inhalt: absaetze(m.datenschutz.hosting.absaetze),
          },
          {
            titel: t("statistik.titel"),
            inhalt: absaetze(m.datenschutz.statistik.absaetze),
          },
          {
            titel: t("formular.titel"),
            inhalt: absaetze(m.datenschutz.formular.absaetze),
          },
          { titel: t("speichern.titel"), inhalt: t("speichern.text") },
          { titel: t("links.titel"), inhalt: t("links.text") },
          {
            titel: t("rechte.titel"),
            inhalt: (
              <p>
                {t.rich("rechte.text", {
                  adresse: email,
                  email: (text) => (
                    <a href={mailLink(email)} className={inlineLinkKlassen}>
                      {text}
                    </a>
                  ),
                })}
              </p>
            ),
          },
          {
            titel: t("beschwerde.titel"),
            inhalt: (
              <p>
                {t.rich("beschwerde.text", {
                  dsb: (text) => (
                    <a
                      href="https://www.dsb.gv.at"
                      className={inlineLinkKlassen}
                    >
                      {text}
                    </a>
                  ),
                })}
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
