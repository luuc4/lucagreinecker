import { JsonLd } from "@/components/JsonLd";
import { KnopfLink } from "@/components/Knopf";
import { KONTAKT, SEITE } from "@/lib/inhalte/statisch";
import { siteUrl } from "@/lib/site";

// PLATZHALTER-STARTSEITE: Name, ein Satz, die eine Hauptaktion. Der echte
// Aufbau entsteht mit der gewählten Design-Richtung (leitfaden/01,
// Phase 4) aus den Inhalten des Kunden.
export default function Startseite() {
  return (
    <>
      <section className="inhalt flex min-h-[70dvh] flex-col justify-center gap-8 py-16 pb-abschnitt">
        <h1 className="max-w-4xl text-display font-bold">{SEITE.name}</h1>
        <p className="max-w-2xl text-xl text-fg-leise">{SEITE.beschreibung}</p>
        <p>
          <KnopfLink href="/kontakt" groesse="lg">
            Kontakt aufnehmen
          </KnopfLink>
        </p>
      </section>
      <JsonLd
        daten={{
          "@context": "https://schema.org",
          // Je nach Kunde: LocalBusiness (mit Adresse und Öffnungszeiten),
          // Organization, SportsActivityLocation, Restaurant …
          "@type": "Organization",
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
