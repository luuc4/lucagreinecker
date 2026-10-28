import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import { Fuss } from "@/components/Fuss";
import { Kopf } from "@/components/Kopf";
import { SeitenFokus } from "@/components/SeitenFokus";
import { seitenSprache } from "@/i18n/sprache";

// Öffentliche Seite: Sprunglink, Kopf, Inhalt, Fuß, Umami. Analytics gibt
// es nur hier, nie in einem späteren Admin- oder Konto-Bereich. Die Spalte
// ist mindestens so hoch wie das Fenster, damit der Fuß auf kurzen Seiten
// unten steht statt über einem leeren Streifen zu hängen.
export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await seitenSprache(params);
  const t = await getTranslations("layout");
  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-akzent focus:px-4 focus:py-2 focus:font-semibold focus:text-auf-akzent"
      >
        {t("zumInhalt")}
      </a>
      <div className="flex min-h-dvh flex-col">
        <Kopf />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Fuss />
      </div>
      <SeitenFokus />
      <Analytics />
    </>
  );
}
