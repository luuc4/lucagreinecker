import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SEITE } from "@/lib/inhalte/statisch";
import { siteHost } from "@/lib/site";

// Vorschaubild für geteilte Links (1200 × 630), beim Build erzeugt, im
// Design „Reihe": Papier, der Satz in Tinte, der gelbe Marker als Balken,
// unten der Name und die Adresse. Schrift: IBM Plex Sans 500 als statische
// WOFF aus @fontsource/ibm-plex-sans (Satori liest kein woff2).
export const alt = SEITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const plex = await readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f5f2",
        color: "#000000",
        padding: 72,
        fontFamily: "IBM Plex Sans",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          fontSize: 76,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          maxWidth: 1000,
        }}
      >
        {SEITE.satz}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ width: 120, height: 14, background: "#ffe600" }} />
        <div style={{ fontSize: 34 }}>{SEITE.name}</div>
        <div style={{ fontSize: 34, color: "#585856" }}>{siteHost()}</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "IBM Plex Sans", data: plex, weight: 500 }] },
  );
}
