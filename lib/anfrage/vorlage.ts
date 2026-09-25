import type { AnfrageDaten } from "./schema";

// Die Push-Nachricht an Luca: reiner Text, eine Quelle. Der Titel bleibt
// ASCII (ntfy-Header), Name und Nachricht stehen im Text.
export function anfrageNachricht(
  a: Pick<AnfrageDaten, "name" | "email" | "telefon" | "nachricht">,
  host: string,
): { titel: string; text: string } {
  const zeilen = [
    `Name: ${a.name}`,
    `E-Mail: ${a.email}`,
    ...(a.telefon ? [`Telefon: ${a.telefon}`] : []),
    "",
    a.nachricht,
    "",
    `Anfrage über ${host}. Nicht gespeichert – nur diese Nachricht.`,
  ];
  return { titel: "Anfrage Website", text: zeilen.join("\n") };
}
