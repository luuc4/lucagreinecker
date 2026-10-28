import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { inlineLinkKlassen } from "@/components/Textlink";

// Titel fürs gelieferte HTML (Suchmaschinen, Verlauf). Im Browser setzt
// Next ihn nach der Hydration auf den Standard zurück (Next-16-Verhalten
// bei not-found, 28.10.2026); die h1 sagt es trotzdem.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nichtGefunden");
  return { title: t("titel") };
}

// 404 in der Sprache der Seite, mit Kopf und Fuß (liegt in (site)). Hierher
// führt [...rest]/page.tsx für jede unbekannte Adresse unter /[locale].
export default function NichtGefunden() {
  const t = useTranslations("nichtGefunden");
  return (
    <section className="inhalt flex flex-col gap-4 pt-16 pb-abschnitt md:pt-24">
      <h1 className="text-h2 font-medium">{t("titel")}</h1>
      <p className="text-fg-leise">
        {t("text")}{" "}
        <Link href="/" className={inlineLinkKlassen}>
          {t("zurStartseite")}
        </Link>
      </p>
    </section>
  );
}
