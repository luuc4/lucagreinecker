import { defineConfig, devices } from "@playwright/test";

// E2E gegen den Prod-Build (leitfaden/06): vorher `pnpm build`, dann
// startet die Config `next start` auf Port 3100. E2E_BASE_URL zeigt die
// Tests stattdessen auf einen laufenden Server (z. B. Staging). Läuft auf
// 3100 noch ein alter Server, nimmt Playwright ihn samt seiner Env
// (reuseExistingServer) – vorher `lsof -ti:3100 | xargs kill`.
const PORT = Number(process.env.PORT ?? 3100);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [["html", { open: "never" }], ["github"]] : "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    locale: "de-AT",
    timezoneId: "Europe/Vienna",
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `pnpm start -p ${PORT}`,
        url: `${BASE_URL}/api/health`,
        reuseExistingServer: !isCI,
        timeout: 120_000,
        stdout: "pipe",
        stderr: "pipe",
        // Mails landen im Speicher und sind über /api/test/mails lesbar.
        // Werte aus der Umgebung (CI) haben Vorrang.
        env: {
          SITE_URL: BASE_URL,
          MAIL_TRANSPORT: process.env.MAIL_TRANSPORT ?? "memory",
          MAIL_ADMIN: process.env.MAIL_ADMIN ?? "anfragen@example.test",
        },
      },
});
