import { datei, eigenschaft, roh } from "./textdatei";

// vCard 3.0 für „Kontakt speichern": iOS, Android und macOS legen daraus
// direkt einen Kontakt an (Route Handler mit `Content-Disposition: inline`).
// Version 3.0, weil 4.0 auf Android noch nicht überall gelesen wird. Alle
// Angaben außer dem Namen sind optional: was fehlt, steht nicht in der
// Karte. Reine Funktion, damit der Route Handler nur durchreicht.

export type Visitenkarte = {
  // Organisation bzw. Firma; ohne Person ist sie auch der Anzeigename.
  organisation: string;
  person?: { vorname: string; nachname: string } | null;
  titel?: string | null;
  // Internationale Schreibweise, Leerzeichen erlaubt: „+43 660 1234567".
  telefon?: string | null;
  email?: string | null;
  url?: string | null;
  adresse?: { strasse: string; plz: string; ort: string; land?: string } | null;
  notiz?: string | null;
};

export function vcard(karte: Visitenkarte): string {
  const { person } = karte;
  const anzeigename = person
    ? `${person.vorname} ${person.nachname}`.trim()
    : karte.organisation;
  const zeilen = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    person ? roh(`N:${person.nachname};${person.vorname};;;`) : roh(`N:;;;;`),
    eigenschaft("FN", anzeigename),
    eigenschaft("ORG", karte.organisation),
  ];
  if (karte.titel) zeilen.push(eigenschaft("TITLE", karte.titel));
  if (karte.telefon)
    zeilen.push(roh(`TEL;TYPE=CELL,VOICE:${karte.telefon.replace(/\s/g, "")}`));
  if (karte.email) zeilen.push(roh(`EMAIL;TYPE=INTERNET:${karte.email}`));
  if (karte.adresse) {
    const a = karte.adresse;
    const teile = ["", "", a.strasse, a.ort, "", a.plz, a.land ?? "Österreich"];
    zeilen.push(falteAdresse(teile));
  }
  if (karte.url) zeilen.push(roh(`URL:${karte.url}`));
  if (karte.notiz) zeilen.push(eigenschaft("NOTE", karte.notiz));
  zeilen.push("END:VCARD");
  return datei(zeilen);
}

// ADR hat sieben Felder, getrennt durch Semikolon; jedes Feld wird für
// sich escaped (ein Komma in der Straße ist Text, kein Trenner).
function falteAdresse(teile: string[]): string {
  const maskiert = teile.map((t) =>
    t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,"),
  );
  return roh(`ADR;TYPE=WORK:${maskiert.join(";")}`);
}
