import type { Metadata } from "next";
import Link from "next/link";
import { inlineLinkKlassen } from "@/components/Textlink";

export const metadata: Metadata = { title: "Seite nicht gefunden" };

export default function NichtGefunden() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-h2 font-bold">Seite nicht gefunden</h1>
      <p className="text-fg-leise">
        Diese Adresse gibt es nicht (mehr).{" "}
        <Link href="/" className={inlineLinkKlassen}>
          Zur Startseite
        </Link>
      </p>
    </main>
  );
}
