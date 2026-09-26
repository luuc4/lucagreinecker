import type { Metadata } from "next";
import { SeitenKopf } from "@/components/Abschnitt";
import { Rechtstext } from "@/components/Rechtstext";
import { inlineLinkKlassen } from "@/components/Textlink";
import { IMPRESSUM, KONTAKT } from "@/lib/inhalte/statisch";
import { mailLink } from "@/lib/kontakt/links";

export const metadata: Metadata = { title: "Impressum" };

// Impressum und Offenlegung (§ 5 ECG, § 25 MedienG). Angaben von Luca
// (26.09.2026): Anschrift wie auf der alten Seite, derzeit keine
// Gewerbeberechtigung, keine Telefonnummer. Offene Prüfstellen für
// WKO oder Anwalt stehen in TODO.md, Etappe 3 – nicht auf der Seite.
export default function Impressum() {
  const email = KONTAKT.email ?? "";
  return (
    <>
      <SeitenKopf titel="Impressum" />
      <Rechtstext
        stand={IMPRESSUM.stand}
        zeilen={[
          {
            titel: "Medieninhaber und Herausgeber",
            inhalt: (
              <>
                <p>
                  {IMPRESSUM.name}
                  <br />
                  {IMPRESSUM.strasse}
                  <br />
                  {IMPRESSUM.ort}, {IMPRESSUM.land}
                </p>
                <p>
                  E-Mail:{" "}
                  <a href={mailLink(email)} className={inlineLinkKlassen}>
                    {email}
                  </a>
                </p>
              </>
            ),
          },
          {
            titel: "Unternehmensgegenstand",
            inhalt:
              "Persönliche Website: Vorstellung eigener Webprojekte und Kontaktmöglichkeit. Derzeit keine Gewerbeberechtigung.",
          },
          {
            titel: "Grundlegende Richtung",
            inhalt:
              "Information über die Webprojekte von Luca Greinecker und den Weg, ihn zu erreichen (§ 25 Abs. 4 MedienG).",
          },
          {
            titel: "Projekte anderer",
            inhalt:
              "Die Bildschirmfotos und Namen der Kundenprojekte (OZ Calisthenics, USTA Streetfood, Jonathan Walch) stehen hier mit Zustimmung der jeweiligen Betreiber. Für die Inhalte dieser Websites sind sie selbst verantwortlich.",
          },
          {
            titel: "Links",
            inhalt:
              "Für Inhalte verlinkter Seiten sind deren Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar; wird mir einer bekannt, entferne ich den Link.",
          },
          {
            titel: "Urheberrecht",
            inhalt:
              "Texte, Gestaltung und Code dieser Website stammen von Luca Greinecker. Verwendung außerhalb des Urheberrechts nur mit schriftlicher Zustimmung.",
          },
        ]}
      />
    </>
  );
}
