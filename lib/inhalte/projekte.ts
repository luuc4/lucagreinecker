// Die vier Projekte der Seite (AGENTS.md, Entscheidungen 25.09.2026): hier
// nur, was in jeder Sprache gleich ist – Slug, Name, Domain, Ziel des
// Knopfs und die Reihenfolge. Alle Texte dazu (Art, Fakten, Lucas Satz,
// Stand) stehen je Sprache in messages/<sprache>.ts unter `projekte`
// (seit 28.10.2026); vorher lagen sie hier.
// Reihenfolge = Reihenfolge auf der Startseite (Luca, 07.10.2026: OZ,
// Punktetafel, USTA, Jonathan; Selseven kommt nach seinem Go-live ans Ende).
//
// Bilder: public/bilder/projekt-<slug>-{handy,desktop}-<breite>.{avif,webp,jpg}
// aus scripts/projekt-screenshots.mjs (echte Screenshots der Live-Seiten;
// nach einem Domainumzug neu aufnehmen und `url` umstellen).

export type Projekt = {
  slug: string;
  name: string;
  // Anzeige der Adresse („oz-calisthenics.at") und das Ziel des Knopfs
  // „<domain> öffnen". `null`: kein Knopf, solange die Domain noch nicht die
  // Seite zeigt, die hier beschrieben ist (OZ bis zum Umzug, Luca
  // 26.09.2026) – lieber kein Link als einer auf eine Übergangsadresse. Ohne
  // Knopf braucht das Projekt einen `stand` in den Texten (messages.test).
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
