// Die fünf Projekte der Seite (AGENTS.md, Entscheidungen 25.09.2026): hier
// nur, was in jeder Sprache gleich ist – Slug, Name, Domain, Ziel des
// Knopfs und die Reihenfolge. Alle Texte dazu (Art, Fakten, Lucas Satz,
// Stand) stehen je Sprache in messages/<sprache>.ts unter `projekte`
// (seit 28.10.2026); vorher lagen sie hier.
// Reihenfolge = Reihenfolge auf der Startseite (Luca, 07.10.2026: OZ,
// Punktetafel, USTA, Jonathan, Selseven; Selseven seit 29.10.2026, zuerst
// mit Link auf `neu.`, seit seinem Go-live am selben Abend auf der Domain).
//
// Bilder: public/bilder/projekt-<slug>-{handy,desktop}-<breite>.{avif,webp,jpg}
// aus scripts/projekt-screenshots.mjs (echte Screenshots der Live-Seiten;
// nach einem Domainumzug neu aufnehmen und `url` umstellen).

export type Projekt = {
  slug: string;
  name: string;
  // Anzeige der Adresse („oz-calisthenics.at") und das Ziel des Knopfs
  // „<domain> öffnen"; `domain` ist immer der Host von `url`, damit der Knopf
  // nennt, was er öffnet. `null`: kein Knopf, solange die Seite nirgends
  // läuft, wo man sie zeigen kann (OZ bis zum Umzug, Luca 26.09.2026: dort
  // lief unter der Domain noch die alte Version). Ohne Knopf braucht das
  // Projekt einen `stand` in den Texten (messages.test). Eine
  // Übergangsadresse nur, wenn Luca sie will (Selseven auf `neu.`,
  // 29.10.2026), dann mit `stand`.
  domain: string;
  url: `https://${string}` | null;
};

export const PROJEKTE = [
  {
    slug: "oz-calisthenics",
    name: "OZ Calisthenics",
    domain: "oz-calisthenics.at",
    // Seit 04.10.2026 live unter der Domain (OZ-Umzug).
    url: "https://oz-calisthenics.at",
  },
  {
    slug: "punktetafel",
    name: "Punktetafel",
    domain: "punktetafel.at",
    url: "https://punktetafel.at",
  },
  {
    slug: "usta-streetfood",
    name: "USTA Streetfood",
    domain: "ustastreetfood.com",
    // Seit 26.09.2026 live unter der Domain (USTA-Go-live).
    url: "https://ustastreetfood.com",
  },
  {
    slug: "jonathan-walch",
    name: "Jonathan Walch",
    domain: "jonathanwalch.at",
    url: "https://jonathanwalch.at",
  },
  {
    slug: "selseven",
    name: "Selseven",
    // Seit 29.10.2026 live unter der Domain (Selseven-Go-live).
    domain: "selseven-friseursalon.at",
    url: "https://selseven-friseursalon.at",
  },
] as const satisfies readonly Projekt[];

export type ProjektSlug = (typeof PROJEKTE)[number]["slug"];

// Projekt je Slug, typisiert: wer einen ProjektSlug hat (istProjektSlug),
// bekommt sicher ein Projekt.
export const PROJEKT = Object.fromEntries<Projekt>(
  PROJEKTE.map((p): [ProjektSlug, Projekt] => [p.slug, p]),
) as Record<ProjektSlug, Projekt>;

export function istProjektSlug(slug: string): slug is ProjektSlug {
  return slug in PROJEKT;
}
