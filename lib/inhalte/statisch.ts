import type { Adresse } from "@/lib/kontakt/links";

// Alle Texte und Fakten der Seite an einer Stelle. Nur echte Inhalte vom
// Kunden oder von Luca; was fehlt, bleibt `null` bzw. PLATZHALTER und steht
// damit sichtbar auf der Seite (e2e/platzhalter.spec.ts zählt die Stellen,
// vor dem Go-live müssen es null sein). Nie erfinden, auch keine
// Beispielnummern: eine erfundene Telefonnummer gehört womöglich jemandem.

// Texte kommen hier von Luca selbst (AGENTS.md, Entscheidungen 25.09.2026).
export const PLATZHALTER = "[TEXT LUCA]";

export const SEITE = {
  name: "Luca Greinecker",
  // Der Satz oben auf der Startseite und im OG-Bild: Lucas Wortlaut aus dem
  // Kickoff, von ihm am 25.09.2026 bestätigt („kickoff wortlaut ist cool").
  satz: "Ich baue Websites und Web‑Apps für Leute und Betriebe in Vorarlberg.",
  // Wo er sitzt (Fuß). Ob eine Adresse auf die Seite kommt, entscheidet
  // Luca (TODO.md, Zuarbeit); der Ort ist keine Lücke.
  ort: "Bludenz, Vorarlberg",
  // Ein Satz für die Meta-Description (≤ 160 Zeichen): was, für wen, wo.
  beschreibung: `${PLATZHALTER} Ein Satz: was Luca baut, für wen, wo.`,
} as const;

export type Kontakt = {
  firma: string;
  person: { vorname: string; nachname: string } | null;
  // Internationale Schreibweise: „+43 660 123 45 67".
  telefon: string | null;
  email: string | null;
  whatsapp: string | null;
  adresse: Adresse | null;
  // Profil-Links (Instagram, Google-Unternehmensprofil …) als volle URL.
  profile: { name: string; url: string }[];
};

// Mail und LinkedIn standen schon auf der alten Seite. Telefon, WhatsApp und
// Adresse entscheidet Luca (TODO.md, Zuarbeit).
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

// Kontaktformular auf /kontakt (leitfaden/12, Baustein A), Zustellung als
// Push über ntfy (lib/anfrage/ntfy.ts). An braucht es in Produktion
// ANFRAGE_TRANSPORT=ntfy, NTFY_URL und NTFY_TOKEN (SETUP.md).
export const KONTAKTFORMULAR = true;

// Vorgetippte Nachrichten für WhatsApp und Mail-Betreff, in der Stimme
// dessen, der schreibt.
export const ANFRAGE = {
  allgemein: "Hallo, ich habe eine Frage: ",
} as const;

// „Rundum-sorglos-Paket" (Lucas Stichworte, 25.09.2026: „server setup /
// erstellung, umami reichweitenmessung immer dabei usw."). Die Punkte
// jenseits seiner Stichworte stammen aus dem Leitfaden (Server, Domains,
// Mails, Backups, Rechtstexte) und werden von ihm bestätigt (TODO.md,
// Zuarbeit); Sätze dazu nur von ihm.
export const PAKET = {
  titel: "Rundum-sorglos-Paket",
  satz: null as string | null,
  punkte: [
    {
      begriff: "Website",
      wert: "Design und Umsetzung, Texte und Bilder eingebaut",
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
    { begriff: "Recht", wert: "Impressum und Datenschutz vorbereitet" },
    { begriff: PLATZHALTER, wert: "Weitere Punkte des Pakets („usw.“)" },
  ],
} as const;

// Über mich: Fakten aus der alten Startseite (Tag statisch-2026-09,
// Abschnitt „Über mich"); die Sätze dazu schreibt Luca (`saetze`).
export const UEBER_MICH = {
  art: "Luca Greinecker, Bludenz",
  saetze: [] as string[],
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
// das ist der gelbe Knopf im Kopf (AGENTS.md „Design"), sonst stünde er
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
