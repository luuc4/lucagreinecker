import { describe, expect, it } from "vitest";
import { PLATZHALTER } from "@/lib/inhalte/statisch";
import { clientIp, neueDrossel } from "./drossel";
import { ohneAdressen } from "./ntfy";
import { Anfrage } from "./schema";
import { anfrageNachricht } from "./vorlage";

const gueltig = {
  name: "Anna Muster",
  email: "Anna@Example.test ",
  telefon: "+43 660 123 45 67",
  nachricht: "Ich hätte gern eine Website für meinen Betrieb.",
  website: "",
};

describe("schema", () => {
  it("nimmt eine gültige Anfrage und normalisiert die Adresse", () => {
    const e = Anfrage.parse(gueltig);
    expect(e.email).toBe("anna@example.test");
    expect(e.telefon).toBe("+43 660 123 45 67");
  });

  it("meldet jedes falsche Feld mit eigener Meldung", () => {
    const e = Anfrage.safeParse({
      name: "",
      email: "keine-adresse",
      telefon: "abc",
      nachricht: "kurz",
    });
    expect(e.success).toBe(false);
    const felder = e.error?.issues.map((i) => i.path[0]);
    expect(felder).toEqual(
      expect.arrayContaining(["name", "email", "telefon", "nachricht"]),
    );
  });

  it("Telefon ist freiwillig", () => {
    expect(Anfrage.safeParse({ ...gueltig, telefon: "" }).success).toBe(true);
  });
});

describe("drossel", () => {
  it("lässt je Schlüssel nur das Limit im Fenster durch", () => {
    const d = neueDrossel();
    const regel = { limit: 2, fensterMs: 1000 };
    expect(d.erlaubt("ip:1", regel, 0)).toBe(true);
    expect(d.erlaubt("ip:1", regel, 10)).toBe(true);
    expect(d.erlaubt("ip:1", regel, 20)).toBe(false);
    expect(d.erlaubt("ip:2", regel, 20)).toBe(true);
    // Nach dem Fenster wieder frei.
    expect(d.erlaubt("ip:1", regel, 1011)).toBe(true);
  });

  it("liest die Client-IP als letzten Hop, mit Cloudflare aus dessen Header", () => {
    const h = new Headers({
      "x-forwarded-for": "10.0.0.1, 203.0.113.7",
      "cf-connecting-ip": "198.51.100.2",
    });
    expect(clientIp(h, false)).toBe("203.0.113.7");
    expect(clientIp(h, true)).toBe("198.51.100.2");
    expect(clientIp(new Headers(), false)).toBeNull();
    expect(
      clientIp(new Headers({ "x-forwarded-for": "<script>" }), false),
    ).toBeNull();
  });
});

describe("push-nachricht an luca", () => {
  it("nennt alle Angaben, ohne Platzhalter, mit ASCII-Titel", () => {
    const { titel, text } = anfrageNachricht(
      Anfrage.parse(gueltig),
      "lucagreinecker.at",
    );
    expect(titel).toMatch(/^[\x20-\x7e]+$/);
    expect(text).toContain("Name: Anna Muster");
    expect(text).toContain("E-Mail: anna@example.test");
    expect(text).toContain("Telefon: +43 660 123 45 67");
    expect(text).toContain("Website für meinen Betrieb");
    expect(text).toContain("lucagreinecker.at");
    expect(text).not.toContain(PLATZHALTER);
  });

  it("lässt die Telefonzeile weg, wenn keine Nummer da ist", () => {
    const { text } = anfrageNachricht(
      Anfrage.parse({ ...gueltig, telefon: "" }),
      "x.at",
    );
    expect(text).not.toContain("Telefon:");
  });

  it("entfernt Adressen aus Fehlermeldungen", () => {
    expect(ohneAdressen("mailbox <a@b.at> not found")).toBe(
      "mailbox <adresse> not found",
    );
  });
});
