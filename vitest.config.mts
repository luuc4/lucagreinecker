import path from "node:path";
import { defineConfig } from "vitest/config";

// Projekte nach Dateiname (leitfaden/06):
// - unit: reine Funktionen, node, *.test.ts
// - ui:   *.ui.test.tsx in jsdom mit Testing Library
// Mit Datenbank kommt ein Projekt `db` für *.db.test.ts gegen ein echtes
// Postgres dazu (Vorlage: ozcalisthenics/vitest.config.mts und
// vitest.db.setup.ts). .mts, weil Vitest die Config sonst als CommonJS lädt.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: ["{lib,app,components,scripts}/**/*.test.{ts,tsx}"],
          exclude: [
            "**/*.db.test.ts",
            "**/*.ui.test.tsx",
            "**/node_modules/**",
            "**/.next/**",
          ],
        },
      },
      {
        extends: true,
        test: {
          name: "ui",
          environment: "jsdom",
          include: ["{app,components}/**/*.ui.test.tsx"],
          setupFiles: ["./vitest.ui.setup.ts"],
        },
      },
    ],
  },
});
