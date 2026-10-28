import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Sprache } from "./routing";

// Die Sprache einer Seite aus ihren Params: geprüft (sonst 404) und für
// das statische Rendern gesetzt (setRequestLocale, vor jedem Zugriff auf
// Nachrichten). Jedes Layout und jede Seite unter app/[locale] ruft das
// zuerst, auch in generateMetadata – Next rendert Layouts und Seiten
// unabhängig voneinander (next-intl-Doku, „Static rendering").
export async function seitenSprache(
  params: Promise<{ locale: string }>,
): Promise<Sprache> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
