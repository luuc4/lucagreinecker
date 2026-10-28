import { expect, test } from "@playwright/test";
import { seitenAusSitemap } from "./hilfen";

// Zwei Sprachen (leitfaden/15, „Tests"): jede Seite der Sitemap trägt das
// richtige lang, Canonical auf sich selbst und das hreflang-Paar samt
// x-default; der Sprachlink bleibt auf derselben Seite; ein überflüssiges
// /de leitet auf die Adresse ohne Präfix.

test("jede seite trägt lang, canonical und hreflang", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  for (const pfad of await seitenAusSitemap(request)) {
    await page.goto(pfad);
    const basis = new URL(page.url()).origin;
    const englisch = pfad === "/en" || pfad.startsWith("/en/");
    await expect(page.locator("html"), pfad).toHaveAttribute(
      "lang",
      englisch ? "en-GB" : "de-AT",
    );
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical, pfad).toHaveCount(1);
    // Next schreibt die Startseite ohne Schrägstrich am Ende.
    const ohneSchraegstrich = (url: string) => url.replace(/\/$/, "");
    expect(
      ohneSchraegstrich((await canonical.getAttribute("href")) ?? ""),
      pfad,
    ).toBe(ohneSchraegstrich(new URL(pfad, basis).href));
    for (const hreflang of ["de", "en", "x-default"]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`),
        `${pfad} hreflang=${hreflang}`,
      ).toHaveCount(1);
    }
    // x-default ist die deutsche Fassung, und das Paar zeigt auf beide
    // Adressen derselben Seite.
    const de = await page
      .locator('link[rel="alternate"][hreflang="de"]')
      .getAttribute("href");
    const xDefault = await page
      .locator('link[rel="alternate"][hreflang="x-default"]')
      .getAttribute("href");
    expect(xDefault, pfad).toBe(de);
    expect(de, pfad).not.toMatch(/\/en(\/|$)/);
  }
});

test("der sprachlink bleibt auf derselben seite, hin und zurück", async ({
  page,
}) => {
  await page.goto("/projekte/punktetafel");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/punktetafel$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(
    page.getByRole("heading", { level: 1, name: "Punktetafel" }),
  ).toBeVisible();
  await expect(page.getByText("Own project", { exact: true })).toBeVisible();

  await page
    .getByRole("banner")
    .getByRole("link", { name: "Deutsch", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projekte\/punktetafel$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de-AT");
});

test("am handy steht der sprachlink im menü", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ueber-mich");
  await page.getByRole("button", { name: "Menü" }).click();
  await page
    .locator("header ul")
    .getByRole("link", { name: "English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "About me" }),
  ).toBeVisible();
});

test("englische seiten verlinken englisch, der fuß wechselt zurück", async ({
  page,
}) => {
  await page.goto("/en");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Contact", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Deutsch", exact: true })
    .click();
  await expect(page).toHaveURL(/\/kontakt$/);
});

test("ein überflüssiges /de leitet auf die adresse ohne präfix", async ({
  request,
}) => {
  const antwort = await request.get("/de/ueber-mich", {
    maxRedirects: 0,
  });
  expect([301, 302, 307, 308]).toContain(antwort.status());
  expect(antwort.headers()["location"]).toMatch(/\/ueber-mich$/);
});

test("die sitemap nennt beide sprachen mit hreflang", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("/en/about");
  expect(xml).toContain('hreflang="x-default"');
  expect(xml).toContain('hreflang="en"');
});
