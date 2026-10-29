import type { InternerPfad } from "@/i18n/routing";
import type { Adresse } from "@/lib/kontakt/links";
import type { Nachrichten } from "@/messages/de";

// Fakten der Seite, die in jeder Sprache gleich sind: Name, Kontaktwege,
// Anschrift fürs Impressum, Schalter, Navigation. Jedes Wort, das ein
// Besucher liest, steht seit dem 28.10.2026 in messages/<sprache>.ts
// (AGENTS.md, Entscheidungen); vorher lagen die deutschen Texte hier.
// Nur echte Inhalte; was fehlt, bleibt `null` bzw. steht als PLATZHALTER
// sichtbar im Text (e2e/platzhalter.spec.ts zählt die Stellen). Nie
// erfinden, auch keine Beispielnummern.
export const PLATZHALTER = "[TEXT LUCA]";

export const SEITE = {
  name: "Luca Greinecker",
  // Wo er sitzt (Fuß). Die Anschrift steht nur im Impressum (IMPRESSUM).
  ort: "Bludenz, Vorarlberg",
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

// LinkedIn stand schon auf der alten Seite; Mail seit 25.10.2026 auf der
// eigenen Domain (iCloud+, vorher Hotmail). Keine Telefonnummer und keine
// Anschrift auf der Seite (Luca, 26.09.2026); die Anschrift steht nur im
// Impressum.
export const KONTAKT: Kontakt = {
  firma: SEITE.name,
  person: { vorname: "Luca", nachname: "Greinecker" },
  telefon: null,
  email: "mail@lucagreinecker.at",
  whatsapp: null,
  adresse: null,
  profile: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/luca-greinecker/" },
  ],
};

// Impressum und Datenschutz (§ 5 ECG, § 25 MedienG, DSGVO). Anschrift wie
// auf der alten Seite (Luca, 26.09.2026); derzeit keine Gewerbeberechtigung.
// Das Land steht je Sprache in den Nachrichten (impressum.land). `stand`
// als ISO-Datum, lib/inhalte/datum.ts schreibt es je Sprache.
export const IMPRESSUM = {
  name: "Luca Greinecker",
  strasse: "Haldenweg 56b/1",
  ort: "6700 Bludenz",
  stand: "2026-10-29",
} as const;

// Kontaktformular auf /kontakt (leitfaden/12, Baustein A), Zustellung als
// Push über ntfy (lib/anfrage/ntfy.ts). An braucht es in Produktion
// ANFRAGE_TRANSPORT=ntfy, NTFY_URL und NTFY_TOKEN (SETUP.md).
export const KONTAKTFORMULAR = true;

// Ein Eintrag der Navigation: interner Pfad ohne Parameter, optional ein
// Anker auf der Startseite (sein Name steht je Sprache in `anker`), dazu
// der Schlüssel des Labels in `navigation`.
export type NavEintrag = {
  pfad: Exclude<InternerPfad, `${string}[${string}`>;
  anker?: keyof Nachrichten["anker"];
  label: keyof Nachrichten["navigation"];
};

// Hauptnavigation (Kopf, Menü am Handy, Fuß). Kontakt steht nicht hier:
// das ist der gelbe Knopf im Kopf (AGENTS.md „Design“), sonst stünde er
// doppelt. Neue Seiten hier eintragen, in i18n/routing.ts (pathnames) und
// in app/sitemap.ts.
export const NAVIGATION: NavEintrag[] = [
  { pfad: "/", anker: "projekte", label: "projekte" },
  { pfad: "/", anker: "paket", label: "paket" },
  { pfad: "/ueber-mich", label: "ueberMich" },
];

export const RECHTLICHES: {
  pfad: "/impressum" | "/datenschutz";
  label: keyof Nachrichten["fuss"];
}[] = [
  { pfad: "/impressum", label: "impressum" },
  { pfad: "/datenschutz", label: "datenschutz" },
];
