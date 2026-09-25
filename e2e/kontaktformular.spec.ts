import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { KONTAKTFORMULAR, PLATZHALTER } from "../lib/inhalte/statisch";

// Kontaktformular gegen den Prod-Build mit ANFRAGE_TRANSPORT=memory: die
// Push-Nachricht steht danach unter /api/test/anfragen. Jeder Test nimmt
// eine eigene Adresse, weil die Tests parallel gegen denselben Speicher
// laufen.
test.skip(!KONTAKTFORMULAR, "Kontaktformular ist ausgeschaltet");

type Anfrage = { titel: string; text: string; antwortAn: string };

function adresse(zweck: string): string {
  return `${zweck}-${Date.now()}-${Math.round(Math.random() * 1e6)}@example.test`;
}

async function anfragenVon(
  request: APIRequestContext,
  antwortAn: string,
): Promise<Anfrage[]> {
  const antwort = await request.get("/api/test/anfragen");
  expect(antwort.status()).toBe(200);
  return ((await antwort.json()) as Anfrage[]).filter(
    (a) => a.antwortAn === antwortAn,
  );
}

async function ausfuellen(page: Page, email: string) {
  await page.getByLabel("Name", { exact: true }).fill("Anna Test");
  await page.getByLabel("E-Mail", { exact: true }).fill(email);
  await page
    .getByLabel("Telefon (optional)", { exact: true })
    .fill("+43 660 123 45 67");
  await page
    .getByLabel("Nachricht", { exact: true })
    .fill("Ich hätte gern eine Website für meinen Betrieb.");
}

test("anfrage kommt als push-nachricht an", async ({ page, request }) => {
  const email = adresse("anfrage");
  await page.goto("/kontakt");
  await ausfuellen(page, email);
  await page.getByRole("button", { name: "Nachricht senden" }).click();

  const bestaetigung = page.getByRole("heading", {
    name: "Nachricht gesendet",
  });
  await expect(bestaetigung).toBeVisible();
  await expect(bestaetigung).toBeFocused();
  await expect(page.getByText(email)).toBeVisible();

  await expect
    .poll(async () => (await anfragenVon(request, email)).length)
    .toBe(1);
  const [anfrage] = await anfragenVon(request, email);
  // ntfy-Header bleiben ASCII: der Titel ist fest, Name und Text im Body.
  expect(anfrage!.titel).toMatch(/^[\x20-\x7e]+$/);
  expect(anfrage!.text).toContain("Name: Anna Test");
  expect(anfrage!.text).toContain("Telefon: +43 660 123 45 67");
  expect(anfrage!.text).toContain("Website für meinen Betrieb");
  expect(anfrage!.text).not.toContain(PLATZHALTER);
});

test("fehler stehen am feld, eingaben bleiben, fokus im ersten feld", async ({
  page,
}) => {
  await page.goto("/kontakt");
  await page.getByLabel("Name", { exact: true }).fill("Anna Test");
  await page.getByLabel("E-Mail", { exact: true }).fill("keine-adresse");
  await page.getByLabel("Nachricht", { exact: true }).fill("zu kurz");
  await page.getByRole("button", { name: "Nachricht senden" }).click();

  const email = page.getByLabel("E-Mail", { exact: true });
  await expect(
    page.getByText("Diese E-Mail-Adresse stimmt nicht."),
  ).toBeVisible();
  await expect(
    page.getByText("Die Nachricht braucht mindestens 10 Zeichen."),
  ).toBeVisible();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("aria-invalid", "true");
  // React 19 setzt das Formular nach der Action zurück; die Werte kommen
  // aus dem Zustand zurück.
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Anna Test",
  );
  await expect(page.getByLabel("Nachricht", { exact: true })).toHaveValue(
    "zu kurz",
  );
});

test("honeypot: sieht aus wie gesendet, schickt aber nichts", async ({
  page,
  request,
}) => {
  const email = adresse("bot");
  await page.goto("/kontakt");
  await ausfuellen(page, email);
  await page
    .locator("#anfrage-website")
    .evaluate((el: HTMLInputElement) => (el.value = "https://spam.example"));
  await page.getByRole("button", { name: "Nachricht senden" }).click();
  await expect(
    page.getByRole("heading", { name: "Nachricht gesendet" }),
  ).toBeVisible();
  expect(await anfragenVon(request, email)).toHaveLength(0);
});

test.describe("ohne javascript", () => {
  test.use({ javaScriptEnabled: false });

  test("das formular schickt trotzdem ab", async ({ page, request }) => {
    const email = adresse("ohne-js");
    await page.goto("/kontakt");
    await ausfuellen(page, email);
    await page.getByRole("button", { name: "Nachricht senden" }).click();
    await expect(
      page.getByRole("heading", { name: "Nachricht gesendet" }),
    ).toBeVisible();
    expect(await anfragenVon(request, email)).toHaveLength(1);
  });
});
