// Umami, selbst gehostet unter analytics.<domain> (leitfaden/04). Host und
// Website-ID kommen als NEXT_PUBLIC_* beim Image-Build ins Bundle (nur für
// `main`, siehe .github/workflows/ci.yml); fehlt eines, wird nichts
// geladen – lokal, in der CI und auf Staging. Nur im Layout der
// öffentlichen Seite, nie in Admin oder Konto.
//
// Umami setzt keine Cookies und speichert keine IP-Adressen, deshalb kein
// Einwilligungsbanner (Art. 6 Abs. 1 lit. f DSGVO, § 165 Abs. 3 TKG 2021).
// data-do-not-track ist Pflicht: ohne das Attribut wertet das Script den
// DNT-Header nicht aus, und die Zusage in der Datenschutzerklärung stimmte
// nicht. data-exclude-search hält Suchparameter (Codes, Adressen) aus der
// Statistik. Der Host steht auch in der CSP (next.config.ts).
export function Analytics() {
  const host = process.env.NEXT_PUBLIC_UMAMI_HOST?.replace(/\/+$/, "");
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!host || !id) return null;
  return (
    <script
      async
      src={`${host}/script.js`}
      data-website-id={id}
      data-exclude-search="true"
      data-do-not-track="true"
    />
  );
}
