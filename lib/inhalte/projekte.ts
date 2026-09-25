// Die vier Projekte der Seite (AGENTS.md, Entscheidungen 25.09.2026). Nur
// Fakten aus den Repos (AGENTS.md „Stand", Stack-Tabellen, Routen); jeder
// Satz über ein Projekt kommt von Luca (`satz`), bis dahin `null` und damit
// als PLATZHALTER sichtbar. Reihenfolge = Reihenfolge auf der Startseite.
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
  // Anzeige der Adresse („oz-calisthenics.at") und das Ziel des Knopfs;
  // die beiden weichen ab, solange ein Projekt auf einer Übergangsadresse
  // läuft.
  domain: string;
  url: string;
  // Lucas Satz zum Projekt (was der Kunde wollte, was schwierig war).
  satz: string | null;
};

export const PROJEKTE: readonly Projekt[] = [
  {
    slug: "oz-calisthenics",
    name: "OZ Calisthenics",
    art: "Kursbuchung und Website für einen Calisthenics-Coach in Bludenz und Rankweil",
    kurz: "Kursbuchung für einen Calisthenics-Coach, Bludenz",
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
    // Übergangsadresse bis zum Umzug von OZ (TODO.md, Faktenquellen).
    url: "https://neu.oz-calisthenics.at",
    satz: null,
  },
  {
    slug: "usta-streetfood",
    name: "USTA Streetfood",
    art: "Website mit Mini-CMS für einen Foodtruck in Nenzing",
    kurz: "Website mit Mini-CMS für einen Foodtruck, Nenzing",
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
    // Übergangsadresse, bis die Domain zu IONOS umgezogen ist.
    url: "http://usta.31-70-151-189.sslip.io",
    satz: null,
  },
  {
    slug: "punktetafel",
    name: "Punktetafel",
    art: "Eigene Web-App: Punkte zählen für Kartenspiele am Tisch",
    kurz: "Eigene Web-App: Punkte zählen am Spieltisch",
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
    satz: null,
  },
  {
    slug: "jonathan-walch",
    name: "Jonathan Walch",
    art: "Portfolio für einen InterMedia-Studenten der FH Vorarlberg",
    kurz: "Portfolio für einen InterMedia-Studenten, FH Vorarlberg",
    kunde: "Jonathan Walch, InterMedia-Student an der FH Vorarlberg",
    zeitraum: "Januar 2026",
    seiten: "Start, Projekte, Impressum, Lebenslauf als PDF",
    funktionen:
      "Vier Projekt-Case-Studies mit Galerien, Menü am Handy, ohne Tracking und Cookies",
    stack: "HTML, CSS, JavaScript ohne Framework",
    betrieb: "GitHub Pages mit eigener Domain",
    domain: "jonathanwalch.at",
    url: "https://jonathanwalch.at",
    satz: null,
  },
];

export function projektNachSlug(slug: string): Projekt | undefined {
  return PROJEKTE.find((p) => p.slug === slug);
}
