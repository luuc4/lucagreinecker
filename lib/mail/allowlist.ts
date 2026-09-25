// Empfänger-Allowlist (leitfaden/04): auf Staging gehen Mails nur an die
// eingetragenen Adressen oder Domains (`@example.test`), alles andere wird
// unterdrückt – nie Post aus der Testumgebung an echte Menschen. Leere
// Liste = alles erlaubt (Prod), `*` = ausdrücklich alles. Aus OZ übernommen.
export function empfaengerErlaubt(
  an: string,
  liste: readonly string[],
): boolean {
  if (liste.length === 0 || liste.includes("*")) return true;
  const adresse = an.trim().toLowerCase();
  const at = adresse.lastIndexOf("@");
  if (at < 0) return false;
  const domain = adresse.slice(at);
  return liste.some(
    (eintrag) =>
      eintrag === adresse || (eintrag.startsWith("@") && eintrag === domain),
  );
}

// E-Mail-Adressen aus Fehlermeldungen entfernen, bevor sie ins Log gehen.
export function ohneAdressen(text: string): string {
  return text.replace(/<?[^\s@<>"]+@[^\s@<>"]+>?/g, "<adresse>").slice(0, 300);
}
