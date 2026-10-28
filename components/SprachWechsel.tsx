"use client";

import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import type { Sprache } from "@/i18n/routing";

// Der Link zur anderen Sprache, der auf derselben Seite bleibt: aus dem
// internen Pfad („/projekte/[slug]") und den Parametern der Route baut
// `Link` die Adresse der Zielsprache („/en/projects/punktetafel"). Das
// Label steht in der Zielsprache und trägt deren lang-Attribut; hreflang
// setzt Link selbst. Ohne JavaScript ist es ein normaler Link.
export function SprachWechsel({
  ziel,
  label,
  className,
}: {
  ziel: Sprache;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const params = useParams();
  return (
    <Link
      // @ts-expect-error -- pathname und params gehören zur aktuellen
      // Route und passen deshalb zusammen; TypeScript kann das Paar aus
      // zwei Hooks nicht prüfen (Muster aus der next-intl-Doku).
      href={{ pathname, params }}
      locale={ziel}
      lang={ziel}
      className={className}
    >
      {label}
    </Link>
  );
}
