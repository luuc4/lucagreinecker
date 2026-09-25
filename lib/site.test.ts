import { afterEach, expect, it, vi } from "vitest";
import { istOeffentlicheDomain, siteHost, siteUrl } from "./site";

afterEach(() => {
  vi.unstubAllEnvs();
});

it("nimmt SITE_URL ohne Schrägstrich am Ende", () => {
  vi.stubEnv("SITE_URL", "https://neu.lucagreinecker.at/");
  expect(siteUrl()).toBe("https://neu.lucagreinecker.at");
  expect(siteHost()).toBe("neu.lucagreinecker.at");
});

it("fällt ohne SITE_URL auf localhost zurück", () => {
  vi.stubEnv("SITE_URL", "");
  expect(siteUrl()).toBe("http://localhost:3000");
});

it("indexiert nur die echte Domain, nicht neu. oder staging.", () => {
  vi.stubEnv("SITE_URL", "https://lucagreinecker.at");
  expect(istOeffentlicheDomain()).toBe(true);
  vi.stubEnv("SITE_URL", "https://www.lucagreinecker.at");
  expect(istOeffentlicheDomain()).toBe(true);
  vi.stubEnv("SITE_URL", "https://neu.lucagreinecker.at");
  expect(istOeffentlicheDomain()).toBe(false);
  vi.stubEnv("SITE_URL", "https://staging.lucagreinecker.at");
  expect(istOeffentlicheDomain()).toBe(false);
});
