import { afterEach, expect, it, vi } from "vitest";
import { envAus } from "./env";

afterEach(() => {
  vi.unstubAllEnvs();
});

it("läuft ohne jede Variable mit Vorgaben", () => {
  const e = envAus({});
  expect(e.MAIL_TRANSPORT).toBe("konsole");
  expect(e.MAIL_EMPFAENGER_ALLOWLIST).toEqual([]);
  expect(e.TRUST_CF_IP).toBe(false);
});

it("behandelt leere Werte wie nicht gesetzt", () => {
  const e = envAus({ MAIL_ADMIN: "", SCALEWAY_REGION: "" });
  expect(e.MAIL_ADMIN).toBeUndefined();
  expect(e.SCALEWAY_REGION).toBe("fr-par");
});

it("verlangt für Scaleway Key, Projekt und Absender", () => {
  expect(() => envAus({ MAIL_TRANSPORT: "scaleway" })).toThrow(
    /SCALEWAY_TEM_KEY.*\n.*SCALEWAY_PROJECT_ID.*\n.*MAIL_FROM/,
  );
  expect(
    envAus({
      MAIL_TRANSPORT: "scaleway",
      SCALEWAY_TEM_KEY: "k",
      SCALEWAY_PROJECT_ID: "p",
      MAIL_FROM: "kontakt@mail.example.test",
    }).MAIL_TRANSPORT,
  ).toBe("scaleway");
});

it("verlangt auf staging. eine Empfänger-Allowlist", () => {
  vi.stubEnv("SITE_URL", "https://staging.example.test");
  const basis = {
    MAIL_TRANSPORT: "scaleway",
    SCALEWAY_TEM_KEY: "k",
    SCALEWAY_PROJECT_ID: "p",
    MAIL_FROM: "kontakt@mail.example.test",
  };
  expect(() => envAus(basis)).toThrow(/MAIL_EMPFAENGER_ALLOWLIST/);
  expect(
    envAus({ ...basis, MAIL_EMPFAENGER_ALLOWLIST: "@example.test, *" })
      .MAIL_EMPFAENGER_ALLOWLIST,
  ).toEqual(["@example.test", "*"]);
});

it("lehnt unbekannte Transporte und kaputte Adressen ab", () => {
  expect(() => envAus({ MAIL_TRANSPORT: "smtp" })).toThrow();
  expect(() => envAus({ MAIL_ADMIN: "keine-adresse" })).toThrow(/MAIL_ADMIN/);
  expect(() => envAus({ MAIL_EMPFAENGER_ALLOWLIST: "foo" })).toThrow();
});
