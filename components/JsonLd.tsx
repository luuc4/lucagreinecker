// Strukturierte Daten als JSON-LD (LocalBusiness, Organization, FAQPage,
// Event …). `<` wird escaped, damit kein Inhalt das Script-Tag beenden
// kann.
export function JsonLd({ daten }: { daten: Record<string, unknown> }) {
  const json = JSON.stringify(daten).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
