import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { KONTAKTFORMULAR, PLATZHALTER } from "../lib/inhalte/statisch";

// Kontaktformular gegen den Prod-Build mit MAIL_TRANSPORT=memory: die Mail
// steht danach unter /api/test/mails. Jeder Test nimmt eine eigene Adresse,
// weil die Tests parallel gegen denselben Mailspeicher laufen.
test.skip(!KONTAKTFORMULAR, "Kontaktformular ist ausgeschaltet");

type Mail = { an: string; betreff: string; text: string; replyTo?: string };

function adresse(zweck: string): string {
  return `${zweck}-${Date.now()}-${Math.round(Math.random() * 1e6)}@example.test`;
}

async function mailsAn(
  request: APIRequestContext,
  replyTo: string,
): Promise<Mail[]> {
  const antwort = await request.get("/api/test/mails");
  expect(antwort.status()).toBe(200);
  return ((await antwort.json()) as Mail[]).filter(
    (m) => m.replyTo === replyTo,
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
    .fill("Ich hätte gern einen Termin in der nächsten Woche.");
}

test("anfrage kommt als mail beim betreiber an", async ({ page, request }) => {
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

  await expect.poll(async () => (await mailsAn(request, email)).length).toBe(1);
  const [mail] = await mailsAn(request, email);
  expect(mail!.an).toBe("anfragen@example.test");
  expect(mail!.betreff).toContain("Anna Test");
  expect(mail!.text).toContain("Telefon: +43 660 123 45 67");
  expect(mail!.text).toContain("Termin in der nächsten Woche");
  expect(mail!.text).not.toContain(PLATZHALTER);
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
  expect(await mailsAn(request, email)).toHaveLength(0);
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
    expect(await mailsAn(request, email)).toHaveLength(1);
  });
});
