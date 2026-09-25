"use client";

import { Knopf } from "@/components/Knopf";

// Fehlergrenze für alle Routen unter dem Root-Layout. Details stehen im
// Server-Log (instrumentation.ts, onRequestError), nicht auf der Seite.
export default function Fehler({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-h2 font-bold">Da ist etwas schiefgegangen</h1>
      <p className="text-fg-leise">
        Bitte noch einmal versuchen. Bleibt der Fehler, hilft eine kurze
        Nachricht.
      </p>
      <p>
        <Knopf variante="umriss" onClick={reset}>
          Noch einmal versuchen
        </Knopf>
      </p>
    </main>
  );
}
