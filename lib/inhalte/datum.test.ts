import { expect, it } from "vitest";
import { datumText } from "./datum";

it("schreibt das Datum je Sprache", () => {
  expect(datumText("2026-10-25", "de")).toBe("25.10.2026");
  expect(datumText("2026-10-25", "en")).toBe("25 October 2026");
  // Ein Tag mit einer Ziffer bleibt zweistellig (Rechtstexte).
  expect(datumText("2026-03-05", "de")).toBe("05.03.2026");
});
