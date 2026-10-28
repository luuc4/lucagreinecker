import { useTranslations } from "next-intl";

// Hinweis für Screenreader hinter Links, die in einem neuen Tab öffnen –
// eine Quelle, in der Sprache der Seite. Server-Komponente.
export function NeuerTab() {
  const t = useTranslations("links");
  return <span className="sr-only"> {t("neuerTab")}</span>;
}
