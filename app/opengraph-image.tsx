import { ImageResponse } from "next/og";
import { SEITE } from "@/lib/inhalte/statisch";
import { siteHost } from "@/lib/site";

// Vorschaubild für geteilte Links (1200 × 630), beim Build erzeugt. Die
// Schrift ist die Standardschrift von next/og (Satori lädt kein woff2).
// Mit der Design-Richtung Farben und Aufbau anpassen, mit echtem Logo oder
// Foto ergänzen.
export const alt = SEITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#fafaf9",
        color: "#1c1917",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: 160,
          height: 12,
          background: "#1d4ed8",
          marginBottom: 36,
        }}
      />
      <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
        {SEITE.name}
      </div>
      <div style={{ marginTop: 32, fontSize: 32, color: "#57534e" }}>
        {siteHost()}
      </div>
    </div>,
    size,
  );
}
