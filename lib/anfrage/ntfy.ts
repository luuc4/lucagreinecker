import { env } from "@/lib/env";

// Zustellung einer Anfrage als Push über ntfy (AGENTS.md, Entscheidungen
// 25.09.2026; Muster punktetafel/app/api/feedback/route.ts) statt per Mail:
// kein Versanddienst, keine DNS-Einträge, Luca bekommt die Nachricht aufs
// Handy. Drei Transporte wie beim Mail-Stand des Starters:
// - konsole: lokal, die Nachricht steht im Terminal. In Produktion gilt sie
//   als nicht eingerichtet und wirft – sonst sähe der Besucher „gesendet",
//   und die Anfrage stünde nur im Container-Log.
// - memory: im Prozess gesammelt; Playwright liest sie über
//   /api/test/anfragen (den Endpunkt gibt es nur mit diesem Transport).
// - ntfy: POST an NTFY_URL (Topic inklusive) mit NTFY_TOKEN.
// ntfy-Header müssen ASCII bleiben – Umlaute und Namen gehören in den
// Text, der Titel ist fest.

export type Anfrage = {
  // Kopfzeile der Push-Nachricht, nur ASCII.
  titel: string;
  text: string;
  // Adresse aus dem Formular: Tippen auf die Nachricht öffnet die Antwort.
  antwortAn: string;
};

export type Zustellung = { status: "zugestellt" };

const ZEITLIMIT_MS = 15_000;

type Speicher = { anfragen: Anfrage[] };
const global = globalThis as typeof globalThis & { __webAnfragen?: Speicher };

function speicher(): Speicher {
  global.__webAnfragen ??= { anfragen: [] };
  return global.__webAnfragen;
}

export async function anfrageZustellen(anfrage: Anfrage): Promise<Zustellung> {
  const e = env();
  switch (e.ANFRAGE_TRANSPORT) {
    case "memory":
      speicher().anfragen.push(anfrage);
      return { status: "zugestellt" };
    case "konsole":
      if (e.NODE_ENV === "production") {
        throw new Error(
          "ANFRAGE_TRANSPORT=konsole in Produktion – Anfrage nicht zugestellt (ntfy einrichten, SETUP.md)",
        );
      }
      console.log(
        [
          "[anfrage] ---------------------------------------------",
          `[anfrage] ${anfrage.titel}`,
          `[anfrage] Antwort an: ${anfrage.antwortAn}`,
          "[anfrage]",
          ...anfrage.text.split("\n").map((zeile) => `[anfrage] ${zeile}`),
          "[anfrage] ---------------------------------------------",
        ].join("\n"),
      );
      return { status: "zugestellt" };
    case "ntfy":
      return ntfySenden(anfrage);
  }
}

async function ntfySenden(anfrage: Anfrage): Promise<Zustellung> {
  const e = env();
  const kopf: Record<string, string> = {
    Authorization: `Bearer ${e.NTFY_TOKEN ?? ""}`,
    "Content-Type": "text/plain; charset=utf-8",
    "X-Title": anfrage.titel,
    "X-Tags": "envelope",
  };
  // Nur ASCII-Adressen in den Header; Tippen öffnet dann die Antwortmail.
  if (/^[\x21-\x7e]+$/.test(anfrage.antwortAn)) {
    kopf["X-Click"] =
      `mailto:${anfrage.antwortAn}?subject=${encodeURIComponent("Re: Anfrage")}`;
  }
  const antwort = await fetch(e.NTFY_URL ?? "", {
    method: "POST",
    headers: kopf,
    body: anfrage.text,
    signal: AbortSignal.timeout(ZEITLIMIT_MS),
  });
  if (!antwort.ok) {
    throw new Error(`ntfy antwortet ${antwort.status}`);
  }
  return { status: "zugestellt" };
}

// E-Mail-Adressen aus Fehlermeldungen entfernen, bevor sie ins Log gehen.
export function ohneAdressen(text: string): string {
  return text.replace(/<?[^\s@<>"]+@[^\s@<>"]+>?/g, "<adresse>").slice(0, 300);
}

// Nur für Tests und den Test-Endpunkt (ANFRAGE_TRANSPORT=memory).
export function anfragenImSpeicher(): readonly Anfrage[] {
  return speicher().anfragen;
}

export function anfragespeicherLeeren(): void {
  speicher().anfragen = [];
}
