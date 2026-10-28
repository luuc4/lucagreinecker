import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { HTML_LANG, OG_LOCALE, routing } from "@/i18n/routing";
import { seitenSprache } from "@/i18n/sprache";
import { SEITE } from "@/lib/inhalte/statisch";
import { istOeffentlicheDomain, siteUrl } from "@/lib/site";
import { plex } from "../fonts";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

// Beide Sprachen werden beim Build gebaut (zusammen mit setRequestLocale in
// i18n/sprache.ts); eine unbekannte Sprache im Pfad gibt 404.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "seite" });
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: SEITE.name, template: `%s · ${SEITE.name}` },
    description: t("beschreibung"),
    // Canonical, hreflang und Open Graph mit Adresse setzt jede Seite
    // selbst (i18n/seo.ts); hier nur der Rest für Seiten ohne eigene
    // Metadaten (404). Kein relatives „./": das löste Next gegen den
    // internen Pfad mit /de auf. neu., staging. und localhost bleiben für
    // Suchmaschinen unsichtbar.
    robots: istOeffentlicheDomain()
      ? undefined
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: SEITE.name,
    },
  };
}

export const viewport: Viewport = {
  // Farbe der Browserleiste am Handy = Hintergrund (globals.css, grund).
  themeColor: "#f5f5f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Root-Layout je Sprache: html mit lang, body, Schrift. Kopf und Fuß der
// öffentlichen Seite liegen in (site)/layout.tsx; ein späterer Admin- oder
// Konto-Bereich bekommt eine eigene Routengruppe mit eigenem Layout (ohne
// Analytics). An den Browser gehen nur die Nachrichten der Fehlerseite;
// alle anderen Texte rendert der Server (Client-Komponenten bekommen ihre
// Wörter als Props). Den Provider braucht es trotzdem: Link und
// usePathname aus i18n/navigation lesen die Sprache daraus.
export default async function RootLayout({ children, params }: Props) {
  const locale = await seitenSprache(params);
  const nachrichten = await getMessages();
  return (
    <html lang={HTML_LANG[locale]} className={plex.variable}>
      <body className="min-h-dvh bg-grund font-sans text-fg antialiased">
        <NextIntlClientProvider messages={{ fehler: nachrichten.fehler }}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
