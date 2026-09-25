import { datei, eigenschaft, roh } from "./textdatei";

// Kalenderdateien (iCalendar, RFC 5545) für „In den Kalender": wöchentliche
// Serien (Kurszeiten, Sprechstunden) und einzelne Termine (Events). Zeiten
// sind Wandzeit in Wien mit TZID und eingebetteter Zeitzone, damit 18:00
// auch nach der Zeitumstellung 18:00 bleibt und Outlook die Zone kennt.
// METHOD:PUBLISH legt Termine an, ohne Zusage-Dialog. Reine Funktionen;
// nach dem Muster von OZ Calisthenics (lib/inhalte/kalender.ts).

// Europe/Vienna nach RFC 5545: Sommerzeit ab dem letzten Sonntag im März,
// Normalzeit ab dem letzten Sonntag im Oktober.
const ZEITZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Vienna",
  "BEGIN:STANDARD",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "END:STANDARD",
  "BEGIN:DAYLIGHT",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "END:DAYLIGHT",
  "END:VTIMEZONE",
];

// ISO-Wochentag: 1 = Montag … 7 = Sonntag.
export type Wochentag = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const BYDAY: Record<Wochentag, string> = {
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
  7: "SU",
};

type TerminBasis = {
  // Stabil über Deploys, sonst legt der Kalender beim nächsten Import
  // einen zweiten Eintrag an.
  id: string;
  titel: string;
  // Wandzeit in Wien, „HH:MM".
  von: string;
  bis: string;
  ort?: string | null;
  beschreibung?: string | null;
  url?: string | null;
};

export type Serie = TerminBasis & { wochentag: Wochentag };
export type Einzeltermin = TerminBasis & { datum: string }; // „YYYY-MM-DD"

// Kalenderdatum in Wien für einen Zeitpunkt, „YYYY-MM-DD". Über
// formatToParts statt toLocaleString, weil dessen Ausgabe je nach ICU
// abweicht.
export function datumInWien(zeitpunkt: Date): string {
  const teile = new Intl.DateTimeFormat("de-AT", {
    timeZone: "Europe/Vienna",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(zeitpunkt);
  const wert = (typ: string) => teile.find((t) => t.type === typ)?.value ?? "";
  return `${wert("year")}-${wert("month")}-${wert("day")}`;
}

// Erster Tag ab `ab` (inklusive), der auf den Wochentag fällt.
export function ersterTermin(ab: string, wochentag: Wochentag): string {
  const [j, m, t] = ab.split("-").map(Number) as [number, number, number];
  const tag = new Date(Date.UTC(j, m - 1, t));
  const isoTag = ((tag.getUTCDay() + 6) % 7) + 1;
  tag.setUTCDate(tag.getUTCDate() + ((wochentag - isoTag + 7) % 7));
  return tag.toISOString().slice(0, 10);
}

function stempel(datum: string, zeit: string): string {
  return `${datum.replace(/-/g, "")}T${zeit.replace(":", "")}00`;
}

function utcStempel(zeitpunkt: Date): string {
  return `${zeitpunkt.toISOString().slice(0, 19).replace(/[-:]/g, "")}Z`;
}

function vevent(
  t: TerminBasis,
  datum: string,
  host: string,
  stand: Date,
  extra: string[],
): string[] {
  return [
    "BEGIN:VEVENT",
    roh(`UID:${t.id}@${host}`),
    `DTSTAMP:${utcStempel(stand)}`,
    `DTSTART;TZID=Europe/Vienna:${stempel(datum, t.von)}`,
    `DTEND;TZID=Europe/Vienna:${stempel(datum, t.bis)}`,
    ...extra,
    eigenschaft("SUMMARY", t.titel),
    ...(t.ort ? [eigenschaft("LOCATION", t.ort)] : []),
    ...(t.beschreibung ? [eigenschaft("DESCRIPTION", t.beschreibung)] : []),
    ...(t.url ? [roh(`URL:${t.url}`)] : []),
    "END:VEVENT",
  ];
}

export function kalenderIcs({
  name,
  host,
  stand,
  serien = [],
  termine = [],
}: {
  // Name des Kalenders in der Kalender-App.
  name: string;
  // Host für eindeutige UIDs, z. B. „lucagreinecker.at".
  host: string;
  // Zeitpunkt der Erzeugung (DTSTAMP); Serien beginnen am Tag davon in Wien.
  stand: Date;
  serien?: Serie[];
  termine?: Einzeltermin[];
}): string {
  const ab = datumInWien(stand);
  const zeilen = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    roh(`PRODID:-//${host}//Kalender//DE`),
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    eigenschaft("X-WR-CALNAME", name),
    "X-WR-TIMEZONE:Europe/Vienna",
    ...ZEITZONE,
  ];
  for (const s of serien) {
    zeilen.push(
      ...vevent(s, ersterTermin(ab, s.wochentag), host, stand, [
        `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY[s.wochentag]}`,
      ]),
    );
  }
  for (const t of termine) {
    zeilen.push(...vevent(t, t.datum, host, stand, []));
  }
  zeilen.push("END:VCALENDAR");
  return datei(zeilen);
}
