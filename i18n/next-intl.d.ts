import type { Nachrichten } from "@/messages/de";
import type { routing } from "./routing";

// Typen für next-intl: `t("…")` kennt nur Schlüssel aus messages/de.ts,
// `useLocale()` liefert "de" | "en". Die englische Datei muss dieselbe
// Form haben (messages/en.ts ist als `Nachrichten` deklariert).
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Nachrichten;
  }
}
