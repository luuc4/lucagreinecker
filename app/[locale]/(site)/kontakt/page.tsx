import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Abschnitt, SeitenKopf, Spalte, Spalten } from "@/components/Abschnitt";
import { Icon } from "@/components/Icon";
import { KartenKnoepfe } from "@/components/KartenKnoepfe";
import {
  KontaktFormular,
  type FormularTexte,
} from "@/components/KontaktFormular";
import { Textlink } from "@/components/Textlink";
import type { Sprache } from "@/i18n/routing";
import { sprachMetadaten } from "@/i18n/seo";
import { seitenSprache } from "@/i18n/sprache";
import {
  EMAIL_MAX,
  NACHRICHT_MAX,
  NACHRICHT_MIN,
  NAME_MAX,
  TELEFON_MAX,
} from "@/lib/anfrage/felder";
import { KONTAKT, KONTAKTFORMULAR } from "@/lib/inhalte/statisch";
import {
  adresseText,
  mailLink,
  telLink,
  whatsappLink,
} from "@/lib/kontakt/links";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sprache = await seitenSprache(params);
  const t = await getTranslations({ locale: sprache, namespace: "kontakt" });
  return {
    title: t("titel"),
    description: t("beschreibung", { name: KONTAKT.firma }),
    ...(await sprachMetadaten("/kontakt", sprache)),
  };
}

// Kontakt mit den praktischen Handgriffen (leitfaden/05): Formular (wenn
// KONTAKTFORMULAR an ist), anrufen, Mail mit Betreff, WhatsApp mit
// vorgetipptem Text, Kontakt speichern (vCard), Route in Google Maps oder
// Apple Karten. Mit Formular: am Desktop links das Formular als
// Hauptaktion, rechts die direkten Wege; am Handy untereinander. Ohne
// Formular: die Blöcke als Spalten. Telefon, WhatsApp und Adresse
// erscheinen nur, wenn sie in KONTAKT stehen (Luca will keine auf der
// Seite, 26.09.2026). Das Formular bekommt alle Wörter fertig in der
// Sprache der Seite, damit der Client keine Nachrichten braucht.
export default async function KontaktSeite({ params }: Props) {
  const sprache = await seitenSprache(params);
  const t = await getTranslations();
  const bloecke = <KontaktBloecke />;
  return (
    <>
      <SeitenKopf titel={t("kontakt.titel")} />
      {KONTAKTFORMULAR ? (
        <Abschnitt>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <section aria-labelledby="nachricht">
              <h2 id="nachricht" className="mb-6 text-h2 font-medium">
                {t("kontakt.nachricht")}
              </h2>
              <KontaktFormular
                texte={await formularTexte(sprache)}
                sprache={sprache}
              />
            </section>
            <div className="flex flex-col gap-12">{bloecke}</div>
          </div>
        </Abschnitt>
      ) : (
        <Abschnitt>
          <Spalten>{bloecke}</Spalten>
        </Abschnitt>
      )}
    </>
  );
}

async function formularTexte(sprache: Sprache): Promise<FormularTexte> {
  const t = await getTranslations({ locale: sprache, namespace: "formular" });
  const m = await getMessages({ locale: sprache });
  return {
    ...m.formular,
    hinweis: t("hinweis", { name: KONTAKT.firma }),
    // Die Längen stehen in lib/anfrage/felder.ts; hier werden sie in die
    // Sätze gefüllt, damit Meldung und Regel nie auseinanderlaufen.
    feld: {
      nameMin: t("feld.nameMin"),
      nameMax: t("feld.nameMax", { n: NAME_MAX }),
      emailMin: t("feld.emailMin"),
      emailMax: t("feld.emailMax", { n: EMAIL_MAX }),
      emailFormat: t("feld.emailFormat"),
      telefonMax: t("feld.telefonMax", { n: TELEFON_MAX }),
      telefonFormat: t("feld.telefonFormat"),
      nachrichtMin: t("feld.nachrichtMin", { n: NACHRICHT_MIN }),
      nachrichtMax: t("feld.nachrichtMax", { n: NACHRICHT_MAX }),
    },
  };
}

async function KontaktBloecke() {
  const t = await getTranslations("kontakt");
  const { telefon, email, whatsapp, adresse } = KONTAKT;
  return (
    <>
      <Spalte titel={telefon ? t("anrufenOderSchreiben") : t("direkt")}>
        <ul className="flex flex-col">
          {telefon ? (
            <li>
              <Textlink href={telLink(telefon)}>
                <Icon name="telefon" />
                {telefon}
              </Textlink>
            </li>
          ) : null}
          {email ? (
            <li>
              <Textlink href={mailLink(email, t("mailBetreff"))}>
                <Icon name="mail" />
                {email}
              </Textlink>
            </li>
          ) : null}
          {whatsapp ? (
            <li>
              <Textlink href={whatsappLink(whatsapp, t("whatsappText"))}>
                <Icon name="chat" />
                {t("whatsapp")}
              </Textlink>
            </li>
          ) : null}
        </ul>
      </Spalte>

      <Spalte titel={t("speichern.titel")}>
        <p className="text-fg-leise">
          {t("speichern.text", { name: KONTAKT.firma })}
        </p>
        <p>
          <Textlink href="/api/kontakt.vcf">
            <Icon name="kontakt" />
            {t("speichern.knopf")}
          </Textlink>
        </p>
      </Spalte>

      {adresse ? (
        <Spalte titel={t("adresse")}>
          <address className="text-fg-leise not-italic">
            {adresseText(adresse)}
          </address>
          <KartenKnoepfe adresse={adresse} className="mt-2" />
        </Spalte>
      ) : null}
    </>
  );
}
