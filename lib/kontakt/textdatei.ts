// Gemeinsames für vCard (RFC 2426) und iCalendar (RFC 5545): Textwerte
// escapen, Zeilen bei 75 Oktetten falten, Datei mit CRLF zusammensetzen.
// Beide Formate teilen sich diese Regeln; die Fehler dabei sind die
// üblichen (Komma in der Adresse, Umlaute beim Falten), deshalb getestet.
// Übernommen aus OZ Calisthenics (lib/inhalte/textdatei.ts).

const ENCODER = new TextEncoder();
const MAX_OKTETTE = 75;

// Backslash, Semikolon, Komma und Zeilenumbruch haben in Textwerten eine
// Bedeutung und werden maskiert.
export function escapeText(wert: string): string {
  return wert
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Faltung nach Oktetten, nicht nach Zeichen: ein Umlaut zählt zwei Bytes,
// und ein Zeichen wird nie in der Mitte geteilt. Folgezeilen beginnen mit
// einem Leerzeichen, das beim Lesen wieder verschwindet.
export function falten(zeile: string): string {
  const teile: string[] = [];
  let aktuell = "";
  let oktette = 0;
  for (const zeichen of zeile) {
    const laenge = ENCODER.encode(zeichen).length;
    if (oktette + laenge > MAX_OKTETTE) {
      teile.push(aktuell);
      aktuell = " ";
      oktette = 1;
    }
    aktuell += zeichen;
    oktette += laenge;
  }
  teile.push(aktuell);
  return teile.join("\r\n");
}

// Eigenschaft „NAME:WERT" – der Wert wird escaped, die Zeile gefaltet.
// Parameter (z. B. „TZID=Europe/Vienna") gehören in den Namen.
export function eigenschaft(name: string, wert: string): string {
  return falten(`${name}:${escapeText(wert)}`);
}

// Rohzeile ohne Escaping, für Werte mit eigener Syntax (Datumsangaben,
// RRULE, URLs) – nur gefaltet.
export function roh(zeile: string): string {
  return falten(zeile);
}

export function datei(zeilen: string[]): string {
  return `${zeilen.join("\r\n")}\r\n`;
}
