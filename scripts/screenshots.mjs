// Screenshots der Seiten gegen einen laufenden Server, für die Durchsicht
// vor jedem Push (leitfaden/06): jede neue oder geänderte Seite in 390, 768
// und 1440 px, selbst ansehen. Vorher `pnpm build` und `pnpm start -p 3100`,
// dann:
//   OUT=/tmp/shots PFADE=/,/kontakt VIEWPORTS=390x844,768x1024,1440x900 node scripts/screenshots.mjs
// Ohne PFADE nimmt das Script alle Seiten aus der Sitemap.
//
// Vor dem Bild scrollt das Script einmal durch die Seite und wartet, bis
// alle Bilder geladen sind: Bilder mit loading="lazy" unterhalb des ersten
// Bildschirms blieben im Vollbild-Screenshot sonst leer (Befund 26.09.2026,
// Desktop-Bild der Projektseite).
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.env.BASE ?? "http://localhost:3100";
const out = process.env.OUT ?? "screenshots";
const viewports = (process.env.VIEWPORTS ?? "390x844,768x1024,1440x900")
  .split(",")
  .map((v) => v.split("x").map(Number));

async function pfadeAusSitemap() {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (t) => new URL(t[1]).pathname,
  );
}

async function allesLaden(page) {
  await page.evaluate(async () => {
    const schritt = Math.max(200, window.innerHeight - 100);
    for (let y = 0; y < document.body.scrollHeight; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images]
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            }),
        ),
    );
    await document.fonts.ready;
  });
}

const pfade = process.env.PFADE
  ? process.env.PFADE.split(",")
  : await pfadeAusSitemap();

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [width, height] of viewports) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  for (const pfad of pfade) {
    await page.goto(base + pfad, { waitUntil: "load", timeout: 60_000 });
    await allesLaden(page);
    await page.waitForTimeout(300);
    const name = pfad === "/" ? "start" : pfad.replace(/\//g, "_").slice(1);
    const datei = `${out}/${width}_${name}.png`;
    await page.screenshot({ path: datei, fullPage: true });
    console.log(datei);
  }
  await page.close();
}
await browser.close();
