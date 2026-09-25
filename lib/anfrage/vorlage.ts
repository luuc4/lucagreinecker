import type { AnfrageDaten } from "./schema";

// Die Mail an den Betreiber: reiner Text, eine Quelle. Antworten geht per
// „Antworten" im Postfach, weil Reply-To die Adresse aus dem Formular ist.
export function anfrageMail(
  a: Pick<AnfrageDaten, "name" | "email" | "telefon" | "nachricht">,
  seitenname: string,
  host: string,
): { betreff: string; text: string } {
  const zeilen = [
    `Neue Anfrage über das Kontaktformular auf ${host}.`,
    "",
    `Name: ${a.name}`,
    `E-Mail: ${a.email}`,
    ...(a.telefon ? [`Telefon: ${a.telefon}`] : []),
    "",
    "Nachricht:",
    a.nachricht,
    "",
    "–",
    `„Antworten“ geht direkt an ${a.email}. Die Anfrage ist nirgends sonst gespeichert.`,
  ];
  return {
    betreff: `Anfrage an ${seitenname}: ${a.name}`,
    text: zeilen.join("\n"),
  };
}
