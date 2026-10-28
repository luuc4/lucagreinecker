import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { istProjektSlug, PROJEKT, PROJEKTE } from "@/lib/inhalte/projekte";
import { SEITE } from "@/lib/inhalte/statisch";
import { siteHost } from "@/lib/site";

// Vorschaubild je Projektseite und Sprache (1200 × 630), beim Build
// erzeugt: wer eine Projektseite auf LinkedIn teilt, sieht das Projekt,
// nicht den allgemeinen Satz (Durchsicht 28.10.2026). Design „Reihe":
// links Name, Art-Zeile, der gelbe Balken mit Name und Adresse; rechts der
// Handy-Screenshot mit Tinte-Linie und 16 px Radius, unten vom Rand
// geschnitten wie eine Karte. Schrift: IBM Plex Sans 500 und 400 als
// statische WOFF (Satori liest kein woff2). Der Screenshot kommt als
// Data-URL aus public/bilder (560 px, die kleinste Variante über der
// Zielbreite).
export const alt = SEITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJEKTE.map((p) => ({ locale, slug: p.slug })),
  );
}

const SCHRIFTEN = "node_modules/@fontsource/ibm-plex-sans/files";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!istProjektSlug(slug)) return new Response(null, { status: 404 });
  const sprache = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const projekt = PROJEKT[slug];
  const texte = (await getMessages({ locale: sprache })).projekte[slug];
  const [plex500, plex400, foto] = await Promise.all([
    readFile(
      join(process.cwd(), SCHRIFTEN, "ibm-plex-sans-latin-500-normal.woff"),
    ),
    readFile(
      join(process.cwd(), SCHRIFTEN, "ibm-plex-sans-latin-400-normal.woff"),
    ),
    readFile(
      join(process.cwd(), "public/bilder", `projekt-${slug}-handy-560.jpg`),
    ),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f5f5f2",
        color: "#000000",
        fontFamily: "IBM Plex Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 740,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            {projekt.name}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.3,
              color: "#585856",
              fontWeight: 400,
            }}
          >
            {texte.art}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 96, height: 12, background: "#ffe600" }} />
          <div style={{ fontSize: 28, fontWeight: 500 }}>{SEITE.name}</div>
          <div style={{ fontSize: 28, color: "#585856", fontWeight: 400 }}>
            {siteHost()}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 460,
          paddingTop: 72,
          paddingRight: 72,
          justifyContent: "flex-end",
        }}
      >
        <img
          alt={projekt.name}
          src={`data:image/jpeg;base64,${foto.toString("base64")}`}
          width={388}
          height={Math.round((388 * 844) / 390)}
          style={{ borderRadius: 16, border: "1px solid #000000" }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "IBM Plex Sans", data: plex500, weight: 500 },
        { name: "IBM Plex Sans", data: plex400, weight: 400 },
      ],
    },
  );
}
