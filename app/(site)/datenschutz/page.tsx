import type { Metadata } from "next";
import { SeitenKopf } from "@/components/Abschnitt";
import { Rechtstext } from "@/components/Rechtstext";
import { inlineLinkKlassen } from "@/components/Textlink";
import { IMPRESSUM, KONTAKT } from "@/lib/inhalte/statisch";
import { mailLink } from "@/lib/kontakt/links";

export const metadata: Metadata = { title: "Datenschutz" };

// Datenschutzerklärung (DSGVO, TKG 2021). Jeder Punkt beschreibt, was der
// Server wirklich tut (leitfaden/07): Hetzner Cloud in Nürnberg, von Luca
// selbst betrieben (Coolify, Traefik); Umami selbst gehostet ohne Cookies
// (components/Analytics.tsx, data-do-not-track); Kontaktformular als Push
// über Lucas eigene ntfy-Instanz (lib/anfrage/ntfy.ts), nichts in einer
// Datenbank; keine Schriften, Scripts, Karten oder Videos von Dritten
// (next.config.ts, CSP). Entwurf vom 26.09.2026; die Prüfstellen für WKO
// oder Anwalt stehen in TODO.md, Etappe 3, nicht auf der Seite.
export default function Datenschutz() {
  const email = KONTAKT.email ?? "";
  return (
    <>
      <SeitenKopf titel="Datenschutz" />
      <Rechtstext
        stand={IMPRESSUM.stand}
        zeilen={[
          {
            titel: "Verantwortlicher",
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
            titel: "Kurz gesagt",
            inhalt:
              "Diese Website setzt keine Cookies, lädt nichts von fremden Servern (keine Schriften, Scripts, Karten oder Videos von Dritten) und gibt keine Daten an Werbenetzwerke weiter. Was beim Aufruf, bei der Statistik und beim Kontaktformular passiert, steht hier.",
          },
          {
            titel: "Hosting und Server-Protokolle",
            inhalt: (
              <>
                <p>
                  Die Website läuft auf einem Server, den ich selbst betreibe,
                  gemietet bei der Hetzner Online GmbH (Industriestraße 25,
                  91710 Gunzenhausen, Deutschland), Standort Nürnberg. Beim
                  Aufruf einer Seite verarbeitet der Server die IP-Adresse,
                  Datum und Uhrzeit, die aufgerufene Adresse, den übertragenen
                  Umfang und die Kennung des Browsers.
                </p>
                <p>
                  Diese Protokolle brauche ich, um die Seite auszuliefern,
                  Fehler zu finden und Angriffe abzuwehren (Art. 6 Abs. 1 lit. f
                  DSGVO). Ich werte sie nicht aus und gebe sie nicht weiter; sie
                  werden nach kurzer Zeit gelöscht.
                </p>
              </>
            ),
          },
          {
            // Geprüft am 26.09.2026 gegen den Quellcode von Umami 3.0.3 (der
            // Version auf dem Server): Tabelle `session` hat keine IP-Spalte;
            // die Sitzungs-ID ist ein Hash aus Website, IP, Browserkennung und
            // einem monatlich wechselnden Salt (src/app/api/send/route.ts);
            // Land, Region und Stadt kommen aus der MaxMind-Datenbank im
            // Umami-Image, also ohne Fremdaufruf; `data-do-not-track` wird
            // vom Tracker ausgewertet (src/tracker/index.js).
            titel: "Statistik (Umami)",
            inhalt: (
              <>
                <p>
                  Ich messe die Reichweite mit Umami, das samt Datenbank auf
                  meinem eigenen Server läuft. Umami speichert je Aufruf die
                  Seite, die verweisende Seite, Browser, Betriebssystem,
                  Gerätetyp, Bildschirmgröße und Sprache sowie Land, Region und
                  Stadt, die es auf dem Server aus der IP-Adresse ableitet. Die
                  IP-Adresse selbst wird nicht gespeichert: Aus ihr, der
                  Browserkennung und einem Wert, der sich jeden Monat ändert,
                  bildet Umami eine Prüfsumme, mit der Aufrufe innerhalb eines
                  Monats einer Sitzung zugeordnet werden. Danach ist keine
                  Zuordnung mehr möglich.
                </p>
                <p>
                  Umami setzt keine Cookies, die Daten verlassen meinen Server
                  nicht. Sendet dein Browser „Do Not Track“, wird nichts
                  gezählt. Rechtsgrundlage ist mein Interesse zu wissen, welche
                  Seiten gelesen werden (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </>
            ),
          },
          {
            titel: "Kontaktformular",
            inhalt: (
              <>
                <p>
                  Wenn du mir über das Formular schreibst, übermittelt die
                  Website deinen Namen, deine E-Mail-Adresse, wenn angegeben
                  deine Telefonnummer und deine Nachricht als Push-Nachricht an
                  mein Handy. Dafür nutze ich ntfy, einen
                  Benachrichtigungsdienst, der ebenfalls auf meinem eigenen
                  Server läuft. Die Website speichert die Anfrage nicht; ntfy
                  hält sie kurz zum Zustellen vor.
                </p>
                <p>
                  Ich verwende die Angaben nur, um dir zu antworten (Art. 6 Abs.
                  1 lit. b DSGVO). Antworte ich per E-Mail, läuft der
                  Schriftverkehr über mein Postfach bei Microsoft (Outlook.com;
                  Vertragspartner Microsoft Ireland Operations Ltd., Dublin).
                  Microsoft kann Daten dabei auch in den USA verarbeiten und ist
                  nach dem EU‑US Data Privacy Framework zertifiziert. Ist deine
                  Anfrage erledigt, lösche ich sie. Statt des Formulars kannst
                  du mir jederzeit direkt eine E-Mail schreiben.
                </p>
              </>
            ),
          },
          {
            titel: "Kontakt speichern",
            inhalt:
              "Der Knopf „Kontakt speichern“ erzeugt eine Kontaktdatei (vCard) mit meinen Angaben. Dabei werden keine Daten von dir übertragen.",
          },
          {
            titel: "Links zu anderen Websites",
            inhalt:
              "Die Projektseiten verlinken auf die Websites meiner Kunden und auf mein Profil bei LinkedIn. Sobald du einem Link folgst, gilt die Datenschutzerklärung der jeweiligen Seite.",
          },
          {
            titel: "Deine Rechte",
            inhalt: (
              <p>
                Du hast das Recht auf Auskunft, Berichtigung, Löschung,
                Einschränkung der Verarbeitung, Widerspruch und
                Datenübertragbarkeit. Schreib mir dafür an{" "}
                <a href={mailLink(email)} className={inlineLinkKlassen}>
                  {email}
                </a>
                .
              </p>
            ),
          },
          {
            titel: "Beschwerde",
            inhalt: (
              <p>
                Wenn du meinst, dass ich deine Daten nicht rechtmäßig
                verarbeite, kannst du dich bei der Österreichischen
                Datenschutzbehörde beschweren: Barichgasse 40–42, 1030 Wien,{" "}
                <a href="https://www.dsb.gv.at" className={inlineLinkKlassen}>
                  dsb.gv.at
                </a>
                .
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
