import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Nachrichten je Anfrage: die Sprache kommt aus dem Segment [locale]
// (geprüft, sonst Deutsch), die Texte aus messages/<sprache>.ts. Die Module
// stehen hier ausgeschrieben statt als Import-Schablone, damit der Bundler
// beide sicher kennt. timeZone fest, sonst formatierte der Container
// (UTC) Daten einen Tag daneben (leitfaden/15).
const NACHRICHTEN = {
  de: () => import("@/messages/de").then((m) => m.de),
  en: () => import("@/messages/en").then((m) => m.en),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const angefragt = await requestLocale;
  const locale = hasLocale(routing.locales, angefragt)
    ? angefragt
    : routing.defaultLocale;
  return {
    locale,
    messages: await NACHRICHTEN[locale](),
    timeZone: "Europe/Vienna",
  };
});
