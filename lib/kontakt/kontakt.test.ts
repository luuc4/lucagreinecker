import { describe, expect, it } from "vitest";
import { datumInWien, ersterTermin, kalenderIcs } from "./kalender";
import {
  appleKartenLink,
  googleMapsLink,
  mailLink,
  telLink,
  whatsappLink,
} from "./links";
import { falten } from "./textdatei";
import { vcard } from "./vcard";

describe("textdatei", () => {
  it("faltet nach 75 Oktetten und teilt keinen Umlaut", () => {
    const zeile = `NOTE:${"ä".repeat(60)}`;
    const teile = falten(zeile).split("\r\n");
    expect(teile.length).toBeGreaterThan(1);
    for (const teil of teile) {
      expect(new TextEncoder().encode(teil).length).toBeLessThanOrEqual(75);
    }
    expect(teile.slice(1).every((t) => t.startsWith(" "))).toBe(true);
    expect(teile.map((t, i) => (i === 0 ? t : t.slice(1))).join("")).toBe(
      zeile,
    );
  });
});

describe("vcard", () => {
  it("baut eine Karte mit Person, Adresse und maskiertem Komma", () => {
    const karte = vcard({
      organisation: "Tischlerei Muster",
      person: { vorname: "Anna", nachname: "Muster" },
      telefon: "+43 660 123 45 67",
      email: "anna@example.test",
      adresse: { strasse: "Hauptstraße 1", plz: "6700", ort: "Bludenz" },
      url: "https://example.test",
      notiz: "Termine nach Vereinbarung, auch samstags.",
    });
    const zeilen = karte.split("\r\n");
    expect(zeilen[0]).toBe("BEGIN:VCARD");
    expect(zeilen[1]).toBe("VERSION:3.0");
    expect(zeilen).toContain("N:Muster;Anna;;;");
    expect(zeilen).toContain("FN:Anna Muster");
    expect(zeilen).toContain("TEL;TYPE=CELL,VOICE:+436601234567");
    expect(zeilen).toContain(
      "ADR;TYPE=WORK:;;Hauptstraße 1;Bludenz;;6700;Österreich",
    );
    expect(karte).toContain("NOTE:Termine nach Vereinbarung\\, auch samstags.");
    expect(karte.endsWith("END:VCARD\r\n")).toBe(true);
  });

  it("lässt fehlende Angaben weg und nimmt die Organisation als Namen", () => {
    const karte = vcard({ organisation: "Verein Beispiel" });
    expect(karte).toContain("FN:Verein Beispiel");
    expect(karte).not.toContain("TEL");
    expect(karte).not.toContain("EMAIL");
  });
});

describe("kalender", () => {
  it("rechnet das Datum in Wiener Ortszeit", () => {
    // 22:30 UTC ist in Wien (Sommerzeit) schon der nächste Tag.
    expect(datumInWien(new Date("2026-09-23T22:30:00Z"))).toBe("2026-09-24");
    expect(datumInWien(new Date("2026-12-31T22:59:00Z"))).toBe("2026-12-31");
  });

  it("findet den ersten passenden Wochentag", () => {
    // 23.09.2026 ist ein Mittwoch.
    expect(ersterTermin("2026-09-23", 3)).toBe("2026-09-23");
    expect(ersterTermin("2026-09-23", 4)).toBe("2026-09-24");
    expect(ersterTermin("2026-09-23", 1)).toBe("2026-09-28");
  });

  it("schreibt Serien mit TZID, RRULE und eingebetteter Zeitzone", () => {
    const ics = kalenderIcs({
      name: "Beispiel",
      host: "example.test",
      stand: new Date("2026-09-23T10:00:00Z"),
      serien: [
        {
          id: "kurs-do",
          titel: "Kurs, Bludenz",
          wochentag: 4,
          von: "18:00",
          bis: "19:00",
          ort: "Halle, Hauptstraße 1, 6700 Bludenz",
        },
      ],
      termine: [
        {
          id: "fest-2026",
          titel: "Sommerfest",
          datum: "2026-10-03",
          von: "14:00",
          bis: "18:00",
        },
      ],
    });
    expect(ics).toContain("BEGIN:VTIMEZONE");
    expect(ics).toContain("UID:kurs-do@example.test");
    expect(ics).toContain("DTSTART;TZID=Europe/Vienna:20260924T180000");
    expect(ics).toContain("RRULE:FREQ=WEEKLY;BYDAY=TH");
    expect(ics).toContain("SUMMARY:Kurs\\, Bludenz");
    expect(ics).toContain("DTSTART;TZID=Europe/Vienna:20261003T140000");
    expect(ics).toContain("DTSTAMP:20260923T100000Z");
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });
});

describe("links", () => {
  const ort = {
    name: "Studio Süd",
    strasse: "Hauptstraße 1",
    plz: "6700",
    ort: "Bludenz",
  };

  it("baut tel:, mailto: und WhatsApp mit Text", () => {
    expect(telLink("+43 660 123 45 67")).toBe("tel:+436601234567");
    expect(mailLink("a@example.test", "Anfrage Termin")).toBe(
      "mailto:a@example.test?subject=Anfrage%20Termin",
    );
    expect(whatsappLink("+43 660 123 45 67", "Hallo, gibt's Termine?")).toBe(
      "https://wa.me/436601234567?text=Hallo%2C%20gibt's%20Termine%3F",
    );
  });

  it("öffnet die Route mit Name und Adresse", () => {
    expect(googleMapsLink(ort)).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=Studio%20S%C3%BCd%2C%20Hauptstra%C3%9Fe%201%2C%206700%20Bludenz",
    );
    expect(appleKartenLink(ort)).toBe(
      "https://maps.apple.com/?daddr=Studio%20S%C3%BCd%2C%20Hauptstra%C3%9Fe%201%2C%206700%20Bludenz",
    );
  });
});
