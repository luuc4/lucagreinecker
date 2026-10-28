import { expect, test } from "@playwright/test";
import { seitenAusSitemap } from "./hilfen";

// Rauchtest gegen den Prod-Build: jede Seite der Sitemap antwortet mit 200
// und genau einer h1; Health, robots, vCard und 404 verhalten sich.

test("jede seite der sitemap antwortet mit genau einer h1", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const pfade = await seitenAusSitemap(request);
  // Je Sprache: Start, vier Projekte, Über mich, Kontakt, Impressum,
  // Datenschutz.
  expect(pfade.length).toBeGreaterThanOrEqual(18);
  for (const pfad of pfade) {
    const antwort = await page.goto(pfad);
    expect(antwort?.status(), pfad).toBe(200);
    await expect(page.locator("main h1"), pfad).toHaveCount(1);
  }
});

// Seitliches Scrollen ist am Handy fast immer ein Fehler: ein langer Name,
// eine Tabelle, ein Wort im Display-Schnitt. Geprüft wird die kleinste
// übliche Breite (360) und ein großer Monitor (1920), an dem Scroll-Leisten
// abgeschnitten wirken (leitfaden/05).
for (const [breite, hoehe] of [
  [360, 740],
  [1920, 1080],
] as const) {
  test(`kein seitlicher überlauf bei ${breite} px`, async ({
    page,
    request,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: breite, height: hoehe });
    const zuBreit: string[] = [];
    for (const pfad of await seitenAusSitemap(request)) {
      await page.goto(pfad);
      const weite = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      if (weite > breite) zuBreit.push(`${pfad}: ${weite} px`);
    }
    expect(zuBreit).toEqual([]);
  });
}

test("health, robots, sicherheits-header", async ({ request }) => {
  const health = await request.get("/api/health");
  expect(health.status()).toBe(200);
  expect(await health.text()).toBe("ok");

  // localhost ist keine öffentliche Domain: alles gesperrt.
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");

  const start = await request.get("/");
  expect(start.headers()["content-security-policy"]).toContain(
    "default-src 'self'",
  );
  expect(start.headers()["x-powered-by"]).toBeUndefined();
});

test("kontakt speichern liefert eine vcard", async ({ request }) => {
  const antwort = await request.get("/api/kontakt.vcf");
  expect(antwort.status()).toBe(200);
  expect(antwort.headers()["content-type"]).toContain("text/vcard");
  expect(await antwort.text()).toContain("BEGIN:VCARD");
});

test("unbekannte adresse liefert 404 mit eigener seite, je sprache", async ({
  page,
}) => {
  const antwort = await page.goto("/gibt-es-nicht");
  expect(antwort?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Seite nicht gefunden" }),
  ).toBeVisible();
  // Mit Kopf und Fuß, nicht Nexts nackte Standardseite.
  await expect(page.getByRole("banner")).toBeVisible();

  const englisch = await page.goto("/en/does-not-exist");
  expect(englisch?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  // Der Titel „Page not found" steht im gelieferten HTML (not-found.tsx,
  // generateMetadata – für Suchmaschinen und Verlauf); nach der Hydration
  // setzt Next ihn auf den Standard zurück, deshalb hier nicht geprüft.

  // Eine Adresse mit Punkt, die keine Datei ist, läuft durch den Proxy
  // (proxy.ts, Endungen) und bekommt dieselbe Seite – nicht Nexts nackte.
  const mitPunkt = await page.goto("/impressum.htm");
  expect(mitPunkt?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Seite nicht gefunden" }),
  ).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
});

test("menü am handy öffnet, führt zur seite und setzt den fokus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menü" }).click();
  // Die Navigation ab lg ist am Handy ausgeblendet und zählt für
  // getByRole nicht; übrig bleibt der Eintrag in der Liste des Menüs.
  await page
    .locator("header ul")
    .getByRole("link", { name: "Über mich", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ueber-mich$/);
  // SeitenFokus: nach dem Wechsel liegt der Fokus auf der h1.
  await expect(page.locator("main h1")).toBeFocused();
});
