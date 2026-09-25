import Link from "next/link";
import { Fakten } from "@/components/Abschnitt";
import { JsonLd } from "@/components/JsonLd";
import { KnopfLink } from "@/components/Knopf";
import { ProjektBild } from "@/components/ProjektBild";
import { textlinkKlassen } from "@/components/Textlink";
import { PROJEKTE } from "@/lib/inhalte/projekte";
import { KONTAKT, PAKET, PLATZHALTER, SEITE } from "@/lib/inhalte/statisch";
import { siteUrl } from "@/lib/site";

// Startseite (Design „Reihe", Vorlage docs/design/richtungen/ab-start.html?v=1):
// Lucas Satz mittig, die vier Handy-Screens als Reihe (am Handy eine
// Wischleiste), das Rundum-sorglos-Paket als Tabelle, dann die Anfrage.
// Jeder Block trägt pb-abschnitt unten (leitfaden/05). Die Sätze über Luca
// und das Paket kommen von ihm (PLATZHALTER, bis er sie liefert).
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

      <section id="projekte" aria-label="Projekte" className="inhalt">
        <ul className="wischleiste pb-abschnitt">
          {PROJEKTE.map((projekt, i) => (
            <li key={projekt.slug} className="snap-center">
              <figure>
                <Link
                  href={`/projekte/${projekt.slug}`}
                  className="block rounded-bild focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                  aria-label={`${projekt.name}: zur Projektseite`}
                >
                  <ProjektBild
                    projekt={projekt}
                    ansicht="handy"
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 42vw, 76vw"
                    className="rounded-bild"
                    zuerst={i === 0}
                  />
                </Link>
                <figcaption className="pt-3.5">
                  <Link
                    href={`/projekte/${projekt.slug}`}
                    className="text-2xl leading-tight font-medium tracking-tight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                  >
                    {projekt.name}
                  </Link>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-fg-leise">
                    {projekt.kurz}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section id="paket" aria-labelledby="paket-titel" className="inhalt">
        <div className="grid gap-6 border-t border-fg pt-7 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-10 lg:pt-9">
          <div>
            <h2 id="paket-titel" className="max-w-[14ch] text-h2 font-medium">
              {PAKET.titel}
            </h2>
            <p className="mt-3 max-w-[40ch]">
              {PAKET.satz ?? (
                <>
                  <span className="platz">{PLATZHALTER}</span> Ein, zwei Sätze
                  in deinen Worten: was das Paket ist und was der Kunde davon
                  hat.
                </>
              )}
            </p>
          </div>
          <Fakten zeilen={PAKET.punkte} betont="begriff" />
        </div>
      </section>

      <section id="anfrage" aria-labelledby="anfrage-titel" className="inhalt">
        <div className="mx-auto max-w-[62ch] pb-abschnitt text-center">
          <h2 id="anfrage-titel" className="text-h2 font-medium">
            <span className="platz">{PLATZHALTER}</span> Ein Satz, der zur
            Anfrage führt.
          </h2>
          <p className="mt-4">
            <span className="platz">{PLATZHALTER}</span> Zwei, drei Sätze über
            dich: Bludenz, der Job bei Ball, warum du Websites baust.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <KnopfLink href="/kontakt">Nachricht schreiben</KnopfLink>
            <a href="/api/kontakt.vcf" className={textlinkKlassen}>
              Kontakt speichern
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        daten={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: KONTAKT.firma,
          url: siteUrl(),
          jobTitle: "Continuous Improvement / Lean Leader",
          worksFor: {
            "@type": "Organization",
            name: "Ball Beverage Packaging",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ludesch",
              addressCountry: "AT",
            },
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bludenz",
            addressRegion: "Vorarlberg",
            addressCountry: "AT",
          },
          knowsAbout: ["Webentwicklung", "Lean Management"],
          ...(KONTAKT.email ? { email: KONTAKT.email } : {}),
          ...(KONTAKT.profile.length > 0
            ? { sameAs: KONTAKT.profile.map((p) => p.url) }
            : {}),
        }}
      />
    </>
  );
}
