"use server";

import { headers } from "next/headers";
import { env } from "@/lib/env";
import { KONTAKTFORMULAR } from "@/lib/inhalte/statisch";
import { siteHost } from "@/lib/site";
import { clientIp, GESAMT, JE_IP, neueDrossel } from "./drossel";
import { anfrageZustellen, ohneAdressen } from "./ntfy";
import { Anfrage, FELDER, type Feldname } from "./schema";
import { anfrageNachricht } from "./vorlage";

// Kontaktformular: Zod → Honeypot → Drossel → Push an Luca über ntfy
// (lib/anfrage/ntfy.ts). Nicht gespeichert: Freitext mit Personendaten
// soll nicht in einer Datenbank liegen. Ein gefülltes Honeypot-Feld bekommt
// dieselbe Antwort wie ein Erfolg, nur ohne Zustellung. Die Eingaben gehen
// bei Fehlern zurück, weil React 19 das Formular nach der Action
// zurücksetzt – sonst wäre der Text weg.

export type AnfrageZustand = {
  ok?: boolean;
  an?: string;
  fehler?: "drossel" | "senden" | "aus";
  feldFehler?: Partial<Record<Feldname, string>>;
  werte?: Partial<Record<Feldname, string>>;
};

const global = globalThis as typeof globalThis & {
  __anfrageDrossel?: ReturnType<typeof neueDrossel>;
};

function drossel() {
  global.__anfrageDrossel ??= neueDrossel();
  return global.__anfrageDrossel;
}

export async function anfrageSenden(
  _vorher: AnfrageZustand,
  formData: FormData,
): Promise<AnfrageZustand> {
  if (!KONTAKTFORMULAR) return { fehler: "aus" };

  const werte = Object.fromEntries(
    FELDER.map((f) => [f, String(formData.get(f) ?? "")]),
  ) as Record<Feldname, string>;
  const eingabe = Anfrage.safeParse({
    ...werte,
    website: String(formData.get("website") ?? ""),
  });
  if (!eingabe.success) {
    const feldFehler: Partial<Record<Feldname, string>> = {};
    for (const fehler of eingabe.error.issues) {
      const feld = fehler.path[0] as Feldname;
      feldFehler[feld] ??= fehler.message;
    }
    return { feldFehler, werte };
  }
  const daten = eingabe.data;
  if (daten.website) return { ok: true, an: daten.email };

  const e = env();
  const jetzt = Date.now();
  const ip = clientIp(await headers(), e.TRUST_CF_IP);
  if (
    (ip && !drossel().erlaubt(`ip:${ip}`, JE_IP, jetzt)) ||
    !drossel().erlaubt("gesamt", GESAMT, jetzt)
  ) {
    return { fehler: "drossel", werte };
  }

  try {
    const { titel, text } = anfrageNachricht(daten, siteHost());
    await anfrageZustellen({ titel, text, antwortAn: daten.email });
  } catch (fehler) {
    console.error(
      "[anfrage] zustellen fehlgeschlagen:",
      ohneAdressen(fehler instanceof Error ? fehler.message : String(fehler)),
    );
    return { fehler: "senden", werte };
  }
  return { ok: true, an: daten.email };
}
