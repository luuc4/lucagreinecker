import { expect, test } from "@playwright/test";

// Dunkelmodus nach Systemeinstellung (globals.css): Grund und Text
// wechseln, Gelb bleibt, und beim Hover auf einem Link wird der Text Tinte
// (sonst stünde Papier auf Gelb). Hell bleibt der Standard und die
// Browserleiste kennt beide Farben.

test("hell ist der standard", async ({ page }) => {
  await page.goto("/ueber-mich");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(245, 245, 242)",
  );
  await expect(page.locator("body")).toHaveCSS("color", "rgb(0, 0, 0)");
});

test.describe("dunkelmodus", () => {
  test.use({ colorScheme: "dark" });

  test("grund, text, linien und link-hover passen", async ({ page }) => {
    await page.goto("/ueber-mich");
    const body = page.locator("body");
    await expect(body).toHaveCSS("background-color", "rgb(20, 20, 19)");
    await expect(body).toHaveCSS("color", "rgb(245, 245, 242)");
    // Die Tinte-Linie unter dem Kopf ist jetzt Papier.
    await expect(page.getByRole("banner")).toHaveCSS(
      "border-bottom-color",
      "rgb(245, 245, 242)",
    );
    // Der gelbe Knopf sieht in beiden Modi gleich aus.
    const kontakt = page.getByRole("banner").getByRole("link", {
      name: "Kontakt",
      exact: true,
    });
    await expect(kontakt).toHaveCSS("background-color", "rgb(255, 230, 0)");
    await expect(kontakt).toHaveCSS("color", "rgb(0, 0, 0)");
    // Link: Papier, beim Hover Gelb dahinter und Tinte als Text.
    const link = page.getByRole("link", { name: "Mail schreiben" });
    await expect(link).toHaveCSS("color", "rgb(245, 245, 242)");
    await link.hover();
    await expect(link).toHaveCSS("background-color", "rgb(255, 230, 0)");
    await expect(link).toHaveCSS("color", "rgb(0, 0, 0)");
  });

  test("die browserleiste bekommt die dunkle farbe", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator(
        'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
      ),
    ).toHaveAttribute("content", "#141413");
    await expect(
      page.locator(
        'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
      ),
    ).toHaveAttribute("content", "#f5f5f2");
  });
});
