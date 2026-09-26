// Die vier Projekte der Seite (AGENTS.md, Entscheidungen 25.09.2026). Nur
// Fakten aus den Repos (AGENTS.md „Stand", Stack-Tabellen, Routen). Die
// Sätze (`satz`) hat Claude am 26.09.2026 auf Lucas Wunsch aus den Fakten
// geschrieben; Luca liest gegen. `null` würde als PLATZHALTER erscheinen. Reihenfolge = Reihenfolge auf der Startseite (Luca, 26.09.2026: OZ an 3. Stelle nach der Punktetafel, solange es in Arbeit ist).
//
// Bilder: public/bilder/projekt-<slug>-{handy,desktop}-<breite>.{avif,webp,jpg}
// aus scripts/projekt-screenshots.mjs (echte Screenshots der Live-Seiten;
// nach einem Domainumzug neu aufnehmen und `url` umstellen).

export type Projekt = {
  slug: string;
  name: string;
  // Eine Zeile: was es ist, für wen, wo (Art-Zeile unter dem Titel).
  art: string;
  // Kürzer, für die Zeile unter dem Handy auf der Startseite.
  kurz: string;
  kunde: string;
  zeitraum: string;
  seiten: string;
  funktionen: string;
  stack: string;
  betrieb: string;
  // Anzeige der Adresse („oz-calisthenics.at") und das Ziel des Knopfs
  // „<domain> öffnen". `null`: kein Knopf, solange die Domain noch nicht die
  // Seite zeigt, die hier beschrieben ist (OZ bis zum Umzug, Luca
  // 26.09.2026) – lieber kein Link als einer auf eine Übergangsadresse.
  domain: string;
  url: string | null;
  // Lucas Satz zum Projekt (was der Kunde wollte, was schwierig war).
  satz: string | null;
  // Hinweis, solange das Projekt noch nicht unter seiner Domain live ist
  // (Lucas Angaben): `kurz` unter der Zeile auf der Startseite, `lang` als
  // Zeile „Stand" in den Fakten der Projektseite. Nach dem Umzug `null`.
  stand: { kurz: string; lang: string } | null;
};

export const PROJEKTE: readonly Projekt[] = [
  {
    slug: "usta-streetfood",
    name: "USTA Streetfood",
    art: "Website mit Mini‑CMS für einen Foodtruck in Nenzing",
    kurz: "Website mit Mini‑CMS für einen Foodtruck, Nenzing",
    kunde: "Akin Akgün, USTA Streetfood, Foodtruck in Nenzing",
    zeitraum: "September 2026",
    seiten:
      "Start (Status, News, Kacheln), Speisekarte, Über mich, Kontakt und Anfahrt, Bilder, Impressum, Datenschutz; Admin am Handy",
    funktionen:
      "Status „Ausverkauft“ mit Zusatztext, Öffnungszeiten mit Ausnahmen, News, Speisekarte mit „verfügbar“, Bild-Upload mit Zuschnitt, Texte – Akin pflegt alles selbst am Handy; Karten-Knöpfe, vCard, Öffnungszeiten als Kalenderdatei",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL mit Drizzle, Better Auth (Code und Passkeys), sharp, Umami",
    betrieb:
      "Docker-Image aus GitHub Actions, Coolify auf einem IONOS-VPS, PostgreSQL",
    domain: "ustastreetfood.com",
    // Seit 26.09.2026 live unter der Domain (USTA-Go-live).
    url: "https://ustastreetfood.com",
    satz: "Akin wollte seinen Foodtruck selbst pflegen: Ausverkauft melden, Öffnungszeiten ändern, die Speisekarte anpassen, Fotos hochladen. Das macht er jetzt am Handy im Admin, ohne jemanden fragen zu müssen.",
    stand: null,
  },
  {
    slug: "punktetafel",
    name: "Punktetafel",
    art: "Eigene Web‑App: Punkte zählen für Kartenspiele am Tisch",
    kurz: "Eigene Web‑App: Punkte zählen am Spieltisch",
    kunde: "Eigenes Projekt",
    zeitraum: "Juli bis September 2026",
    seiten:
      "Start mit 33 Spielen in Gruppen, Partie und Regeln je Spiel, Spieleabend, Kartenblätter",
    funktionen:
      "Runden anschreiben, Stand und Podium, Stechen bei Gleichstand, Ein- und Ausstieg mitten in der Partie, Teams, Spieleabend über mehrere Spiele; läuft offline als PWA, die Daten bleiben am Gerät",
    stack: "Next.js 16, React 19, TypeScript, Tailwind 4, motion, Zod, Vitest",
    betrieb:
      "Coolify auf einem Hetzner-Server, Cloudflare davor, Umami, Feedback per ntfy",
    domain: "punktetafel.at",
    url: "https://punktetafel.at",
    satz: "Mein eigenes Projekt: Punkte zählen bei Kartenspielen am Tisch, ohne Zettel und ohne Konto. 33 Spiele von Wizard bis Jassen, läuft offline als App am Handy, die Daten bleiben am Gerät.",
    stand: null,
  },
  {
    slug: "oz-calisthenics",
    name: "OZ Calisthenics",
    art: "Kursbuchung und Website für einen Calisthenics‑Coach in Bludenz und Rankweil",
    kurz: "Kursbuchung für einen Calisthenics‑Coach, Bludenz",
    kunde: "Olcay Zengin, Calisthenics-Coach, Bludenz und Rankweil",
    zeitraum: "seit September 2026",
    seiten:
      "Start, Kurse, Preise, Über mich, FAQ, Kontakt, Buchen, Konto, Admin",
    funktionen:
      "Kurse buchen und bezahlen (Stripe Checkout), Konto mit Passkeys, Belege, Erinnerungen und Tageslisten per Mail, Storno und Widerruf; Admin für Termine, Kurse, Buchungen und Kunden",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL mit Drizzle, Better Auth, Stripe, pg-boss, Scaleway Mail, Umami",
    betrieb:
      "Docker-Image aus GitHub Actions, Coolify auf einem Hetzner-Server, Staging vor jeder Änderung an Buchung und Zahlung",
    domain: "oz-calisthenics.at",
    // Kein Knopf bis zum Umzug von OZ: oz-calisthenics.at zeigt noch die
    // alte Seite, neu.oz-calisthenics.at ist nicht öffentlich gedacht.
    // Nach dem Umzug "https://oz-calisthenics.at" (TODO.md).
    url: null,
    satz: "Olcay wollte, dass seine Leute Kursplätze direkt online buchen und bezahlen können. Daraus ist eine komplette Kursverwaltung geworden: Termine, Buchungen, Zahlung über Stripe, Belege und Erinnerungen, alles in einem Admin, das Olcay am Handy bedient.",
    // Luca, 26.09.2026: „noch in arbeit, release ende oktober, bis dahin ist
    // alte version online". In `lang` ein geschützter Bindestrich (U+2011) in
    // der Domain, sonst bricht die Zeile nach „oz-" um; die Faktenwerte
    // tragen wrap-anywhere, 360 px bleibt ohne Überlauf (e2e/seiten).
    stand: {
      kurz: "In Arbeit, online ab Ende Oktober 2026",
      lang: "In Arbeit, geht Ende Oktober 2026 online. Bis dahin läuft unter oz‑calisthenics.at noch die alte Version.",
    },
  },
  {
    slug: "jonathan-walch",
    name: "Jonathan Walch",
    art: "Portfolio für einen InterMedia‑Studenten der FH Vorarlberg",
    kurz: "Portfolio für einen InterMedia‑Studenten, FH Vorarlberg",
    kunde: "Jonathan Walch, InterMedia-Student an der FH Vorarlberg",
    zeitraum: "Januar 2026",
    seiten: "Start, Projekte, Impressum, Lebenslauf als PDF",
    funktionen:
      "Vier Projekt-Case-Studies mit Galerien, Menü am Handy, ohne Tracking und Cookies",
    stack: "HTML, CSS, JavaScript ohne Framework",
    betrieb: "GitHub Pages mit eigener Domain",
    domain: "jonathanwalch.at",
    url: "https://jonathanwalch.at",
    satz: "Jonathan studiert InterMedia an der FH Vorarlberg und wollte seine Design-Projekte zeigen: vier Arbeiten mit Galerien und der Lebenslauf als PDF, als schlanke Seite ohne Framework.",
    stand: null,
  },
];

export function projektNachSlug(slug: string): Projekt | undefined {
  return PROJEKTE.find((p) => p.slug === slug);
}
