// Echte Screenshots der Projektseiten für das Portfolio (TODO.md, Etappe 1):
// je Projekt die Startseite in 390 × 844 (Handy) und 1440 × 900 (Desktop),
// nur der erste Bildschirm, in doppelter Auflösung, gegen die Live-Adresse.
// Danach entstehen daraus mit scripts/bilder.mjs die Varianten in
// public/bilder (AVIF/WebP/JPEG, ohne Metadaten). Die Originale landen in
// screenshots/projekte/ (nicht im Repo).
//
//   node scripts/projekt-screenshots.mjs            # alle Projekte
//   node scripts/projekt-screenshots.mjs punktetafel # eines
//
// Warum Screenshots statt gestalteter Bilder: die alte Seite zeigte
// generierte Vorschaubilder; die neue zeigt, was wirklich live ist, und die
// Bilder lassen sich mit einem Aufruf erneuern, wenn ein Projekt sich ändert.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

// Adressen, unter denen die Projekte gerade erreichbar sind. OZ und USTA
// laufen bis zu ihrem Umzug auf Übergangsadressen (TODO.md, Faktenquellen);
// danach hier die echte Domain eintragen und neu aufnehmen.
const PROJEKTE = [
  { slug: "oz-calisthenics", url: "https://neu.oz-calisthenics.at/" },
  { slug: "usta-streetfood", url: "https://ustastreetfood.com/" },
  { slug: "punktetafel", url: "https://punktetafel.at/" },
  { slug: "jonathan-walch", url: "https://jonathanwalch.at/" },
];

// Breiten der Varianten je Ansicht, passend zu `VARIANTEN` in
// components/ProjektBild.tsx: das Handybild steht höchstens 420 px breit auf
// der Seite, am Handy meist rund 280 px (560 = ×2, Lighthouse-Befund
// 26.09.2026: 780 px war dort zu groß), das Desktopbild bis 1328 px.
const ANSICHTEN = [
  { name: "handy", width: 390, height: 844, breiten: "390,560,780" },
  {
    name: "desktop",
    width: 1440,
    height: 900,
    breiten: "720,1200,1440,1800",
  },
];

const nurSlug = process.argv[2];
const projekte = nurSlug
  ? PROJEKTE.filter((p) => p.slug === nurSlug)
  : PROJEKTE;
if (projekte.length === 0) {
  console.error(
    `Unbekanntes Projekt „${nurSlug}". Bekannt: ${PROJEKTE.map((p) => p.slug).join(", ")}`,
  );
  process.exit(1);
}

const out = "screenshots/projekte";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const { slug, url } of projekte) {
  for (const { name, width, height, breiten } of ANSICHTEN) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
      locale: "de-AT",
      timezoneId: "Europe/Vienna",
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    // Schriften und Bilder, die nach „networkidle" noch dekodiert werden.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const datei = `${out}/${slug}-${name}.png`;
    await page.screenshot({ path: datei, fullPage: false });
    await page.close();
    console.log(datei);
    execFileSync(
      "node",
      ["scripts/bilder.mjs", datei, `projekt-${slug}-${name}`, breiten],
      { stdio: ["ignore", "ignore", "inherit"] },
    );
  }
}
await browser.close();
