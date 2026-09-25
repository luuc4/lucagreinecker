import { expect, test } from "@playwright/test";
import { PLATZHALTER } from "../lib/inhalte/statisch";
import { seitenAusSitemap } from "./hilfen";

// Offene Stellen (leitfaden/05, „Texte"; Go-live-Bedingung): fehlende
// Fakten stehen als PLATZHALTER sichtbar auf der Seite, bis der Kunde sie
// liefert. Hier steht, welche Seiten noch welche offenen Stellen haben –
// die Liste darf nur schrumpfen: eine neue Seite mit Platzhalter bricht den
// Lauf ebenso wie ein Eintrag, der erledigt ist und hier noch steht. Mit
// PLATZHALTER_STRENG=1 (vor dem Domainumzug) muss sie leer sein.
const OFFEN: Record<string, string> = {
  "/": "Beschreibung der Seite (SEITE.beschreibung)",
  "/kontakt": "Telefon, E-Mail, Adresse",
  "/impressum": "alle Angaben (Kunde bestätigt, leitfaden/07)",
  "/datenschutz": "ganzer Text (Entwurf, dann Prüfung)",
};

test("offene stellen stehen nur auf den bekannten seiten", async ({
  page,
  request,
}) => {
  const pfade = await seitenAusSitemap(request);
  const mitOffenem: string[] = [];
  for (const pfad of pfade) {
    await page.goto(pfad);
    // Nur der Inhalt: Kopf und Fuß zeigen dieselben Daten wie die Seiten
    // oben. textContent zählt auch Zugeklapptes (FAQ).
    const text = (await page.locator("main").textContent()) ?? "";
    if (text.includes(PLATZHALTER)) mitOffenem.push(pfad);
  }
  const erwartet =
    process.env.PLATZHALTER_STRENG === "1" ? [] : Object.keys(OFFEN);
  expect(mitOffenem.sort()).toEqual(erwartet.sort());
});
