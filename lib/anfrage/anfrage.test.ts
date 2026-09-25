import { describe, expect, it } from "vitest";
import { PLATZHALTER } from "@/lib/inhalte/statisch";
import { empfaengerErlaubt, ohneAdressen } from "@/lib/mail/allowlist";
import { clientIp, neueDrossel } from "./drossel";
import { Anfrage } from "./schema";
import { anfrageMail } from "./vorlage";

const gueltig = {
  name: "Anna Muster",
  email: "Anna@Example.test ",
  telefon: "+43 660 123 45 67",
  nachricht: "Ich hätte gern einen Termin nächste Woche.",
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

describe("mail an den betreiber", () => {
  it("nennt alle Angaben, ohne Platzhalter", () => {
    const { betreff, text } = anfrageMail(
      Anfrage.parse(gueltig),
      "Tischlerei Muster",
      "tischlerei-muster.at",
    );
    expect(betreff).toBe("Anfrage an Tischlerei Muster: Anna Muster");
    expect(text).toContain("E-Mail: anna@example.test");
    expect(text).toContain("Telefon: +43 660 123 45 67");
    expect(text).toContain("Ich hätte gern einen Termin");
    expect(text).not.toContain(PLATZHALTER);
  });

  it("lässt die Telefonzeile weg, wenn keine Nummer da ist", () => {
    const { text } = anfrageMail(
      Anfrage.parse({ ...gueltig, telefon: "" }),
      "X",
      "x.at",
    );
    expect(text).not.toContain("Telefon:");
  });
});

describe("allowlist", () => {
  it("erlaubt alles bei leerer Liste oder *, sonst nur Adressen und Domains", () => {
    expect(empfaengerErlaubt("a@b.at", [])).toBe(true);
    expect(empfaengerErlaubt("a@b.at", ["*"])).toBe(true);
    expect(empfaengerErlaubt("A@B.at", ["a@b.at"])).toBe(true);
    expect(empfaengerErlaubt("x@b.at", ["@b.at"])).toBe(true);
    expect(empfaengerErlaubt("x@c.at", ["@b.at", "a@b.at"])).toBe(false);
  });

  it("entfernt Adressen aus Fehlermeldungen", () => {
    expect(ohneAdressen("mailbox <a@b.at> not found")).toBe(
      "mailbox <adresse> not found",
    );
  });
});
