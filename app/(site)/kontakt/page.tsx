import type { Metadata } from "next";
import { Abschnitt, SeitenKopf, Spalte, Spalten } from "@/components/Abschnitt";
import { Icon } from "@/components/Icon";
import { KartenKnoepfe } from "@/components/KartenKnoepfe";
import { KontaktFormular } from "@/components/KontaktFormular";
import { Textlink } from "@/components/Textlink";
import {
  ANFRAGE,
  KONTAKT,
  KONTAKTFORMULAR,
  PLATZHALTER,
} from "@/lib/inhalte/statisch";
import {
  adresseText,
  mailLink,
  telLink,
  whatsappLink,
} from "@/lib/kontakt/links";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `So erreichst du ${KONTAKT.firma}: Nachricht, Telefon, E-Mail, WhatsApp und Adresse.`,
};

// Kontakt mit den praktischen Handgriffen (leitfaden/05): Formular (wenn
// KONTAKTFORMULAR an ist), anrufen, Mail mit Betreff, WhatsApp mit
// vorgetipptem Text, Kontakt speichern (vCard), Route in Google Maps oder
// Apple Karten. Mit Formular: am Desktop links das Formular als
// Hauptaktion, rechts die direkten Wege; am Handy untereinander. Ohne
// Formular: die drei Blöcke als Spalten. Fehlt eine Angabe, steht der
// Platzhalter da, bis der Kunde sie liefert.
export default function KontaktSeite() {
  const bloecke = <KontaktBloecke />;
  return (
    <>
      <SeitenKopf titel="Kontakt" />
      {KONTAKTFORMULAR ? (
        <Abschnitt>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <section aria-labelledby="nachricht">
              <h2 id="nachricht" className="mb-6 text-h2 font-medium">
                Nachricht schreiben
              </h2>
              <KontaktFormular empfaenger={KONTAKT.firma} />
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

function KontaktBloecke() {
  const { telefon, email, whatsapp, adresse } = KONTAKT;
  return (
    <>
      <Spalte titel="Anrufen oder schreiben">
        <ul className="flex flex-col">
          <li>
            {telefon ? (
              <Textlink href={telLink(telefon)}>
                <Icon name="telefon" />
                {telefon}
              </Textlink>
            ) : (
              <span className="text-fg-leise">{PLATZHALTER} Telefon</span>
            )}
          </li>
          <li>
            {email ? (
              <Textlink href={mailLink(email, "Anfrage")}>
                <Icon name="mail" />
                {email}
              </Textlink>
            ) : (
              <span className="text-fg-leise">{PLATZHALTER} E-Mail</span>
            )}
          </li>
          {whatsapp ? (
            <li>
              <Textlink href={whatsappLink(whatsapp, ANFRAGE.allgemein)}>
                <Icon name="chat" />
                WhatsApp
              </Textlink>
            </li>
          ) : null}
        </ul>
      </Spalte>

      <Spalte titel="Kontakt speichern">
        <p className="text-fg-leise">
          Legt {KONTAKT.firma} mit allen Angaben in den Kontakten an.
        </p>
        <p>
          <Textlink href="/api/kontakt.vcf">
            <Icon name="kontakt" />
            Kontakt speichern
          </Textlink>
        </p>
      </Spalte>

      <Spalte titel="Adresse">
        {adresse ? (
          <>
            <address className="text-fg-leise not-italic">
              {adresseText(adresse)}
            </address>
            <KartenKnoepfe adresse={adresse} className="mt-2" />
          </>
        ) : (
          <p className="text-fg-leise">{PLATZHALTER} Adresse</p>
        )}
      </Spalte>
    </>
  );
}
