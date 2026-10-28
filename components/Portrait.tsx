// Lucas Porträt auf „Über mich" (Luca, 28.10.2026: „foto ist unter
// uploads: Portraitbild-neu.jpg"): als <picture> aus public/bilder wie die
// Projektbilder (scripts/bilder.mjs, AVIF/WebP/JPEG ohne Metadaten),
// Ausschnitt 4:5 um das Gesicht aus dem querformatigen Original
// (screenshots/portrait/, nicht im Repo). Flach mit Tinte-Linie und
// 16 px Radius wie die Handy-Bilder; keine Maske, weil nichts abgeschnitten
// ist. Kein Freistellen: das Studio-Grau ist ruhig und das Bild bleibt ein
// Foto, kein Aufkleber.
const GROESSTE = 840;
const BREITEN = [320, 480, 640, GROESSTE] as const;
const SEITE = 5 / 4;

export function Portrait({ alt, sizes }: { alt: string; sizes: string }) {
  const groesste = GROESSTE;
  const srcset = (endung: string) =>
    BREITEN.map((b) => `/bilder/portrait-${b}.${endung} ${b}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/bilder/portrait-${groesste}.jpg`}
        width={groesste}
        height={Math.round(groesste * SEITE)}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="h-auto w-full rounded-bild border border-fg"
      />
    </picture>
  );
}
