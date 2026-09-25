import type { Metadata } from "next";
import { SeitenKopf } from "@/components/Abschnitt";
import { Rechtstext } from "@/components/Rechtstext";
import { PLATZHALTER } from "@/lib/inhalte/statisch";

export const metadata: Metadata = { title: "Impressum" };

// Impressum und Offenlegung (§ 5 ECG, § 25 MedienG, ggf. § 14 UGB). Alle
// Angaben vom Kunden bestätigen lassen, nichts annehmen – Rechtsform,
// Gewerbe und UID entscheiden, was hier steht (leitfaden/07).
export default function Impressum() {
  return (
    <>
      <SeitenKopf titel="Impressum" />
      <Rechtstext
        stand={PLATZHALTER}
        zeilen={[
          {
            titel: "Medieninhaber",
            inhalt: `${PLATZHALTER} Name bzw. Firma, Anschrift`,
          },
          {
            titel: "Kontakt",
            inhalt: `${PLATZHALTER} E-Mail, Telefon`,
          },
          {
            titel: "Unternehmensgegenstand",
            inhalt: `${PLATZHALTER} Tätigkeit`,
          },
          {
            titel: "Rechtliche Angaben",
            inhalt: `${PLATZHALTER} je nach Fall: Firmenbuch, UID-Nummer oder Kleinunternehmer, Gewerbe und Behörde, Kammer`,
          },
          {
            titel: "Umsetzung",
            inhalt: `${PLATZHALTER} technischer Kontakt, falls gewünscht`,
          },
        ]}
      />
    </>
  );
}
