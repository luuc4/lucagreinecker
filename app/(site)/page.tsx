import { JsonLd } from "@/components/JsonLd";
import { KnopfLink } from "@/components/Knopf";
import { KONTAKT, PLATZHALTER, SEITE } from "@/lib/inhalte/statisch";
import { siteUrl } from "@/lib/site";

// Startseite, erster Block (Design „Reihe"): Lucas Satz mittig im
// Display-Schnitt, darunter der Satz über ihn (noch offen) und die eine
// Hauptaktion. Die vier Handy-Screens, das Rundum-sorglos-Paket und die
// Anfrage folgen in Etappe 2 (TODO.md).
export default function Startseite() {
  return (
    <>
      <section className="inhalt flex flex-col items-center gap-7 pt-12 pb-abschnitt text-center md:pt-20">
        <h1 className="max-w-[16ch] text-display font-medium">{SEITE.satz}</h1>
        <p className="max-w-[48ch] text-lg md:text-xl">
          <span className="platz">{PLATZHALTER}</span> Ein Satz: wer du bist,
          wo, wie du arbeitest.
        </p>
        <p>
          <KnopfLink href="/kontakt" groesse="lg">
            Kontakt
          </KnopfLink>
        </p>
      </section>
      <JsonLd
        daten={{
          "@context": "https://schema.org",
          // Lucas eigene Seite: eine Person, keine Organisation (SEO-Punkt
          // in Etappe 2: Beruf, Ort, sameAs).
          "@type": "Person",
          name: KONTAKT.firma,
          url: siteUrl(),
          ...(KONTAKT.telefon ? { telephone: KONTAKT.telefon } : {}),
          ...(KONTAKT.email ? { email: KONTAKT.email } : {}),
          ...(KONTAKT.profile.length > 0
            ? { sameAs: KONTAKT.profile.map((p) => p.url) }
            : {}),
        }}
      />
    </>
  );
}
