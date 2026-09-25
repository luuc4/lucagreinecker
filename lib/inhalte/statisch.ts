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

// Kontaktformular auf /kontakt (leitfaden/12, Baustein A). Aus, wenn der
// Kunde keins will – dann bleiben Telefon, Mail und WhatsApp. An braucht es
// in Produktion Scaleway (MAIL_TRANSPORT=scaleway) und MAIL_ADMIN.
export const KONTAKTFORMULAR = true;

// Vorgetippte Nachrichten für WhatsApp und Mail-Betreff, in der Stimme
// dessen, der schreibt.
export const ANFRAGE = {
  allgemein: "Hallo, ich habe eine Frage: ",
} as const;

export type NavEintrag = { href: string; label: string };

// Hauptnavigation (Kopf, Menü am Handy, Fuß). Neue Seiten hier eintragen
// und in app/sitemap.ts.
export const NAVIGATION: NavEintrag[] = [
  { href: "/kontakt", label: "Kontakt" },
];

export const RECHTLICHES: NavEintrag[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
