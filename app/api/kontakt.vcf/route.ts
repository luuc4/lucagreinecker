import { KONTAKT } from "@/lib/inhalte/statisch";
import { vcard } from "@/lib/kontakt/vcard";
import { siteUrl } from "@/lib/site";

// „Kontakt speichern": die Visitenkarte aus den Inhalten, beim Build
// erzeugt (force-static: kein Request-Body, keine Datenbank, ändert sich
// nur mit einem Deploy). `inline`, damit iOS und Android die Karte direkt
// als Kontakt öffnen statt eine Datei abzulegen.
export const dynamic = "force-static";

export function GET(): Response {
  const karte = vcard({
    organisation: KONTAKT.firma,
    person: KONTAKT.person,
    telefon: KONTAKT.telefon,
    email: KONTAKT.email,
    adresse: KONTAKT.adresse,
    url: siteUrl(),
  });
  return new Response(karte, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="kontakt.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
