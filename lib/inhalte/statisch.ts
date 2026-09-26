import type { Adresse } from "@/lib/kontakt/links";

// Alle Texte und Fakten der Seite an einer Stelle. Nur echte Inhalte; was
// fehlt, bleibt `null` bzw. PLATZHALTER und steht damit sichtbar auf der
// Seite (e2e/platzhalter.spec.ts zählt die Stellen, vor dem Go-live müssen
// es null sein). Nie erfinden, auch keine Beispielnummern.
//
// Die Sätze hier hat Claude am 26.09.2026 auf Lucas Wunsch („denk dir paar
// menschliche passende saubere texte aus") aus den Fakten der Repos und der
// alten Seite geschrieben; Luca liest gegen und ändert, was nicht nach ihm
// klingt (AGENTS.md, Entscheidungen).
export const PLATZHALTER = "[TEXT LUCA]";

export const SEITE = {
  name: "Luca Greinecker",
  // Der Satz oben auf der Startseite und im OG-Bild: Lucas Wortlaut aus dem
  // Kickoff, von ihm am 25.09.2026 bestätigt („kickoff wortlaut ist cool").
  satz: "Ich baue Websites und Web‑Apps für Leute und Betriebe in Vorarlberg.",
  // Wo er sitzt (Fuß). Die Anschrift steht nur im Impressum (IMPRESSUM).
  ort: "Bludenz, Vorarlberg",
  // Meta-Description (≤ 160 Zeichen): was, für wen, wo.
  beschreibung:
    "Luca Greinecker aus Bludenz baut Websites und Web-Apps für Leute und Betriebe in Vorarlberg. Design, Umsetzung, Server und Betrieb aus einer Hand.",
} as const;

// Startseite: der Satz unter dem großen Satz und der Block vor dem Fuß.
export const START = {
  ueberLuca:
    "Ich bin Luca aus Bludenz. Hauptberuflich bin ich Lean Leader bei Ball in Ludesch, Websites baue ich nebenbei, von der ersten Skizze bis zum laufenden Server.",
  anfrage: {
    titel: "Schreib mir, was du brauchst.",
    text: "Kurz reicht: wer du bist, was die Seite können soll und bis wann. Ich melde mich mit einer ehrlichen Einschätzung, was geht und was es kostet.",
  },
} as const;

export type Kontakt = {
  firma: string;
  person: { vorname: string; nachname: string } | null;
  // Internationale Schreibweise: „+43 660 123 45 67“.
  telefon: string | null;
  email: string | null;
  whatsapp: string | null;
  adresse: Adresse | null;
  // Profil-Links (LinkedIn …) als volle URL.
  profile: { name: string; url: string }[];
};

// Mail und LinkedIn standen schon auf der alten Seite. Keine Telefonnummer
// und keine Anschrift auf der Seite (Luca, 26.09.2026); die Anschrift steht
// nur im Impressum.
export const KONTAKT: Kontakt = {
  firma: SEITE.name,
  person: { vorname: "Luca", nachname: "Greinecker" },
  telefon: null,
  email: "greineckerluca@hotmail.com",
  whatsapp: null,
  adresse: null,
  profile: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/luca-greinecker/" },
  ],
};

// Impressum und Datenschutz (§ 5 ECG, § 25 MedienG, DSGVO). Anschrift wie
// auf der alten Seite (Luca, 26.09.2026); derzeit keine Gewerbeberechtigung.
export const IMPRESSUM = {
  name: "Luca Greinecker",
  strasse: "Haldenweg 56b/1",
  ort: "6700 Bludenz",
  land: "Österreich",
  stand: "26.09.2026",
} as const;

// Kontaktformular auf /kontakt (leitfaden/12, Baustein A), Zustellung als
// Push über ntfy (lib/anfrage/ntfy.ts). An braucht es in Produktion
// ANFRAGE_TRANSPORT=ntfy, NTFY_URL und NTFY_TOKEN (SETUP.md).
export const KONTAKTFORMULAR = true;

// Vorgetippte Nachrichten für WhatsApp und Mail-Betreff, in der Stimme
// dessen, der schreibt.
export const ANFRAGE = {
  allgemein: "Hallo Luca, ich hätte eine Frage: ",
} as const;

// „Rundum-sorglos-Paket“ (Lucas Stichworte, 25.09.2026: „server setup /
// erstellung, umami reichweitenmessung immer dabei usw.“). Die Punkte
// jenseits seiner Stichworte stammen aus dem Leitfaden (Server, Domains,
// Mails, Backups, Rechtstexte, Übergabe).
export const PAKET = {
  titel: "Rundum‑sorglos‑Paket",
  satz: "Bei mir gehört alles dazu, was eine Website zum Laufen braucht: eigener Server, Domain, Reichweitenmessung, Updates. Du bekommst eine Seite, die läuft, und einen Ansprechpartner, wenn etwas ist.",
  punkte: [
    {
      begriff: "Website",
      wert: "Design und Umsetzung, deine Texte und Bilder eingebaut",
    },
    {
      begriff: "Server",
      wert: "Eigener Server, Setup und Einrichtung, Domain, DNS, Zertifikate, Mail-Versand",
    },
    {
      begriff: "Reichweite",
      wert: "Umami-Reichweitenmessung, immer dabei, ohne Cookie-Banner",
    },
    { begriff: "Betrieb", wert: "Updates, Backups, Überwachung" },
    {
      begriff: "Recht",
      wert: "Impressum und Datenschutz vorbereitet, Prüfstellen markiert",
    },
    {
      begriff: "Übergabe",
      wert: "Kurze Anleitung, wenn du selbst pflegen willst; sonst mache ich die Änderungen",
    },
  ],
} as const;

// Über mich: Fakten aus der alten Startseite (Tag statisch-2026-09,
// Abschnitt „Über mich“), die Sätze dazu aus denselben Fakten.
export const UEBER_MICH = {
  art: "Luca Greinecker, Bludenz",
  saetze: [
    "Ich bin Luca Greinecker aus Bludenz. Gelernt habe ich Elektrotechniker bei Ball in Ludesch, danach Instandhaltung im Schichtbetrieb, Zivildienst beim Roten Kreuz und zurück zu Ball ins Trainee-Programm. Heute bin ich dort Continuous Improvement / Lean Leader, also zuständig dafür, dass Abläufe in der Produktion besser werden.",
    "Nebenbei habe ich Informatik an der FH Vorarlberg studiert, Schwerpunkt Digital Innovation, seit 2026 mit Bachelor. Aus Job und Studium kommt die Mischung, die ich für Websites brauche: zuerst verstehen, was jemand im Alltag wirklich braucht, dann sauber bauen.",
    "Websites baue ich nebenbei für Leute und Betriebe aus der Region. Die Punktetafel ist mein eigenes Projekt: Punkte zählen bei Kartenspielen am Tisch, ohne Zettel.",
  ],
  fakten: [
    {
      begriff: "Beruf",
      wert: "Continuous Improvement / Lean Leader bei Ball Beverage Packaging in Ludesch",
    },
    {
      begriff: "Ausbildung",
      wert: "Informatik (BSc, Digital Innovation) an der FH Vorarlberg, berufsbegleitend, 2026; Lehre Elektrotechnik bei Ball",
    },
    {
      begriff: "Werdegang",
      wert: "Lehre Elektrotechnik bei Ball, Instandhaltung im Schichtbetrieb, Zivildienst beim Roten Kreuz, Trainee-Programm bei Ball, heute Lean Leader",
    },
    {
      begriff: "Nebenbei",
      wert: "Websites und Web-Apps für Leute und Betriebe in Vorarlberg",
    },
    { begriff: "Abseits", wert: "Wandern, Skifahren, Reisen" },
  ],
} as const;

export type NavEintrag = { href: string; label: string };

// Hauptnavigation (Kopf, Menü am Handy, Fuß). Kontakt steht nicht hier:
// das ist der gelbe Knopf im Kopf (AGENTS.md „Design“), sonst stünde er
// doppelt. Neue Seiten hier eintragen und in app/sitemap.ts.
export const NAVIGATION: NavEintrag[] = [
  { href: "/#projekte", label: "Projekte" },
  { href: "/#paket", label: "Paket" },
  { href: "/ueber-mich", label: "Über mich" },
];

export const RECHTLICHES: NavEintrag[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
