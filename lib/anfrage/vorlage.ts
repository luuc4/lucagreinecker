import type { AnfrageDaten } from "./schema";

// Die Push-Nachricht an Luca: reiner Text, eine Quelle, immer auf Deutsch
// (sie geht an ihn). Der Titel bleibt ASCII (ntfy-Header), Name und
// Nachricht stehen im Text. Kam die Anfrage über die englische Seite,
// sagt die letzte Zeile das, damit die Antwort in der richtigen Sprache
// rausgeht (28.10.2026).
export function anfrageNachricht(
  a: Pick<AnfrageDaten, "name" | "email" | "telefon" | "nachricht" | "sprache">,
  host: string,
): { titel: string; text: string } {
  const englisch = a.sprache === "en";
  const zeilen = [
    `Name: ${a.name}`,
    `E-Mail: ${a.email}`,
    ...(a.telefon ? [`Telefon: ${a.telefon}`] : []),
    "",
    a.nachricht,
    "",
    englisch
      ? `Anfrage über ${host}/en (englische Seite, auf Englisch antworten). Nicht gespeichert – nur diese Nachricht.`
      : `Anfrage über ${host}. Nicht gespeichert – nur diese Nachricht.`,
  ];
  return {
    titel: englisch ? "Anfrage Website (EN)" : "Anfrage Website",
    text: zeilen.join("\n"),
  };
}
