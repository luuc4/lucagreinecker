import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Importregeln (leitfaden/02, „Architektur-Regeln"), greifen, sobald es
// die Dateien gibt:
// - lib/<feature>/engine.ts ist rein: kein next/*, keine DB, keine Mail,
//   kein env. Zeit und Daten kommen als Parameter.
// - Cache leeren (revalidateTag, updateTag …) nur in actions.ts und Route
//   Handlern, nie in lib/** (außerhalb davon wirft Next).
// Achtung: ESLint ersetzt eine Regelkonfiguration, statt sie zu mischen –
// der letzte passende Block gewinnt. Deshalb sind die Verbote benannte
// Bausteine, und jeder Block nennt alle, die für ihn gelten (Befund OZ,
// 19.09.2026).
const CACHE_LEEREN_NUR_ACTIONS = {
  name: "next/cache",
  importNames: ["revalidateTag", "revalidatePath", "updateTag", "refresh"],
  message:
    "Cache leeren nur in actions.ts oder Route Handlern (app/api/**). Jobs und Queries revalidieren nicht.",
};

const ENGINE_REIN = {
  group: [
    "next",
    "next/*",
    "@/lib/db",
    "@/lib/db/*",
    "@/lib/mail",
    "@/lib/mail/*",
    "@/lib/env",
  ],
  message:
    "engine.ts bleibt rein: Zeit und Daten kommen als Parameter, kein next/*, keine DB, keine Mail, kein env.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Vorgaben von eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Worktrees paralleler Agenten-Sitzungen liegen im Repo.
    ".claude/**",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    // Bilder kommen fertig aus public/ (AVIF/WebP-Varianten per
    // scripts/bilder.mjs) als <picture>; next/image würde auf dem kleinen
    // Server zur Laufzeit optimieren.
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { paths: [CACHE_LEEREN_NUR_ACTIONS] }],
    },
  },
  {
    files: ["lib/**/actions.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["lib/**/engine.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [ENGINE_REIN] }],
    },
  },
]);

export default eslintConfig;
