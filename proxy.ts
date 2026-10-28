import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Sprach-Proxy (Next 16: proxy.ts statt middleware.ts, der Import heißt
// weiter next-intl/middleware). `/` und `/ueber-mich` laufen intern unter
// `/de/…`, `/en/about` unter `/en/ueber-mich`; ein überflüssiges `/de/…`
// leitet auf die Adresse ohne Präfix. Nicht betroffen: /api, Next-Interna
// und Dateien mit einer Endung, die es wirklich gibt (Bilder in
// public/bilder, icon.svg, robots.txt, sitemap.xml, Schriften, Scripts).
// Alles andere mit Punkt (`/impressum.htm`, `/kontakt.vcf`) läuft durch den
// Proxy, damit es die 404-Seite in der Sprache der Seite bekommt statt
// Nexts nackter Standardseite (Review 28.10.2026). Ebenfalls ausgenommen:
// die Vorschaubilder (`…/opengraph-image…`), die Next unter dem internen
// Pfad mit Sprache verlinkt (`/de/opengraph-image`, bei Projektseiten mit
// Hash-Anhang) – so liefert der Server sie direkt, statt `/de` per
// Umleitung abzustreifen, und LinkedIn bekommt ein Bild ohne Umweg.
export default createMiddleware(routing);

export const config = {
  matcher:
    "/((?!api|_next|_vercel|.*opengraph-image|.*\\.(?:avif|webp|jpe?g|png|gif|svg|ico|txt|xml|json|webmanifest|woff2?|js|css|map)$).*)",
};
