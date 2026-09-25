import { expect, it } from "vitest";
import { envAus } from "./env";

it("läuft ohne jede Variable mit Vorgaben", () => {
  const e = envAus({});
  expect(e.ANFRAGE_TRANSPORT).toBe("konsole");
  expect(e.NTFY_URL).toBeUndefined();
  expect(e.TRUST_CF_IP).toBe(false);
});

it("behandelt leere Werte wie nicht gesetzt", () => {
  const e = envAus({ NTFY_URL: "", NTFY_TOKEN: "" });
  expect(e.NTFY_URL).toBeUndefined();
  expect(e.NTFY_TOKEN).toBeUndefined();
});

it("verlangt für ntfy Adresse und Token", () => {
  expect(() => envAus({ ANFRAGE_TRANSPORT: "ntfy" })).toThrow(
    /NTFY_URL.*\n.*NTFY_TOKEN/,
  );
  expect(() =>
    envAus({
      ANFRAGE_TRANSPORT: "ntfy",
      NTFY_URL: "kein-url",
      NTFY_TOKEN: "t",
    }),
  ).toThrow(/NTFY_URL/);
  expect(
    envAus({
      ANFRAGE_TRANSPORT: "ntfy",
      NTFY_URL: "https://ntfy.example.test/anfragen",
      NTFY_TOKEN: "tk_test",
    }).ANFRAGE_TRANSPORT,
  ).toBe("ntfy");
});

it("liest TRUST_CF_IP als Ja/Nein", () => {
  expect(envAus({ TRUST_CF_IP: "1" }).TRUST_CF_IP).toBe(true);
  expect(envAus({ TRUST_CF_IP: "false" }).TRUST_CF_IP).toBe(false);
});
