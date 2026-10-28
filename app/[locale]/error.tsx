"use client";

import { useTranslations } from "next-intl";
import { Knopf } from "@/components/Knopf";

// Fehlergrenze für alle Routen unter dem Root-Layout. Details stehen im
// Server-Log (instrumentation.ts, onRequestError), nicht auf der Seite.
// Die Texte kommen aus dem Provider im Root-Layout (Namespace `fehler`).
export default function Fehler({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("fehler");
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-h2 font-medium">{t("titel")}</h1>
      <p className="text-fg-leise">{t("text")}</p>
      <p>
        <Knopf variante="umriss" onClick={reset}>
          {t("nochmal")}
        </Knopf>
      </p>
    </main>
  );
}
