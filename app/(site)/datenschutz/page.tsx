import type { Metadata } from "next";
import { SeitenKopf } from "@/components/Abschnitt";
import { Rechtstext } from "@/components/Rechtstext";
import { PLATZHALTER } from "@/lib/inhalte/statisch";

export const metadata: Metadata = { title: "Datenschutz" };

// Gliederung der Datenschutzerklärung. Jeder Punkt beschreibt, was der
// Server tatsächlich tut – vorher am Server nachsehen (leitfaden/07). Der
// Text entsteht als Entwurf mit markierten Prüfstellen und geht erst nach
// der Prüfung (WKO-Rechtsservice oder Anwalt) live.
export default function Datenschutz() {
  return (
    <>
      <SeitenKopf titel="Datenschutz" />
      <Rechtstext
        stand={PLATZHALTER}
        zeilen={[
          {
            titel: "Verantwortlicher",
            inhalt: `${PLATZHALTER} Name, Anschrift, E-Mail`,
          },
          {
            titel: "Hosting",
            inhalt: `${PLATZHALTER} Anbieter und Standort des Servers`,
          },
          {
            titel: "Server-Protokolle",
            inhalt: `${PLATZHALTER} was der Server speichert und wie lange`,
          },
          {
            titel: "Statistik (Umami)",
            inhalt: `${PLATZHALTER} ohne Cookies, ohne IP-Adresse, Widerspruch über „Do Not Track“`,
          },
          {
            titel: "Kontakt",
            inhalt: `${PLATZHALTER} Anfragen per E-Mail, Telefon, WhatsApp`,
          },
          {
            titel: "Kontaktformular",
            inhalt: `${PLATZHALTER} Angaben gehen als Push-Nachricht über Lucas eigene ntfy-Instanz (Server bei Hetzner) an sein Handy, keine Speicherung auf der Website`,
          },
          {
            titel: "Rechte",
            inhalt: `${PLATZHALTER} Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit`,
          },
          {
            titel: "Beschwerde",
            inhalt: `${PLATZHALTER} Österreichische Datenschutzbehörde`,
          },
        ]}
      />
    </>
  );
}
