// Bildvarianten für public/bilder (leitfaden/04, „Bilder"): ein Original als
// AVIF, WebP und JPEG in mehreren Breiten, ausgeliefert als <picture> mit
// srcset, width und height. Kein next/image zur Laufzeit.
//
//   node scripts/bilder.mjs <original> <name> [breiten]
//   node scripts/bilder.mjs ~/Downloads/IMG_1234.jpg portrait 480,800,1200
//
// HEIC vom iPhone liest sharp ohne HEVC-Lizenz nicht; am Mac wandelt das
// Script es vorher mit sips in ein JPEG (dessen Metadaten sharp danach
// ebenfalls entfernt).
//
// Warum sharp statt sips/cwebp/avifenc (Probe 24.09.2026): sips übernimmt
// die EXIF-Daten des Originals (bei Handyfotos oft mit GPS-Standort) und
// dreht die Pixel nicht; cwebp ignoriert die Drehung, ein Hochformat-Foto
// käme als WebP seitlich heraus. sharp dreht nach EXIF, rechnet in sRGB um
// und entfernt alle Metadaten (Standort, Kamera, Datum).
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import sharp from "sharp";

const [original, name, breitenText = "480,800,1200"] = process.argv.slice(2);
if (!original || !name || !/^[a-z0-9-]+$/.test(name)) {
  console.error(
    "Aufruf: node scripts/bilder.mjs <original> <name a-z0-9-> [breiten, z. B. 480,800,1200]",
  );
  process.exit(1);
}

let quelle = original;
if (/\.hei[cf]$/i.test(original)) {
  if (process.platform !== "darwin") {
    console.error(
      "HEIC bitte vorher als JPEG exportieren (Fotos → Exportieren).",
    );
    process.exit(1);
  }
  quelle = join(mkdtempSync(join(tmpdir(), "bilder-")), "original.jpg");
  execFileSync("sips", ["-s", "format", "jpeg", original, "--out", quelle], {
    stdio: "ignore",
  });
}

const ziel = "public/bilder";
mkdirSync(ziel, { recursive: true });

// .rotate() ohne Winkel übernimmt die Drehung aus EXIF in die Pixel.
const basis = sharp(quelle).rotate();
const { width: breite = 0, height: hoehe = 0 } = await basis
  .clone()
  .toBuffer({ resolveWithObject: true })
  .then((r) => r.info);

const breiten = breitenText
  .split(",")
  .map(Number)
  .filter((b) => b > 0 && b <= breite);
if (breiten.length === 0) {
  console.error(
    `Original ist nur ${breite} px breit – kleinere Breiten wählen.`,
  );
  process.exit(1);
}

const varianten = [];
for (const b of breiten) {
  const h = Math.round((hoehe * b) / breite);
  const stufe = basis.clone().resize({ width: b });
  await stufe
    .clone()
    .avif({ quality: 60, effort: 6 })
    .toFile(`${ziel}/${name}-${b}.avif`);
  await stufe.clone().webp({ quality: 82 }).toFile(`${ziel}/${name}-${b}.webp`);
  await stufe
    .clone()
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${ziel}/${name}-${b}.jpg`);
  varianten.push({ b, h });
  console.log(`${name}-${b}: ${b}×${h}`);
}

// Vorlage für die Einbindung: größte Variante als Fallback, width/height
// gegen Layoutsprünge, sizes je nach Layout anpassen.
const groesste = varianten.at(-1);
const srcset = (endung) =>
  varianten.map(({ b }) => `/bilder/${name}-${b}.${endung} ${b}w`).join(", ");
console.log(`
Quelle: ${basename(original)} (${breite}×${hoehe}, Metadaten entfernt)

<picture>
  <source type="image/avif" srcSet="${srcset("avif")}" sizes="(min-width: 1024px) 50vw, 100vw" />
  <source type="image/webp" srcSet="${srcset("webp")}" sizes="(min-width: 1024px) 50vw, 100vw" />
  <img src="/bilder/${name}-${groesste.b}.jpg" width={${groesste.b}} height={${groesste.h}} alt="‹Beschreibung›" />
</picture>`);
