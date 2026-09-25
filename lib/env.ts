import { z } from "zod";
import { siteHost } from "@/lib/site";

// Alle Laufzeit-Variablen laufen durch dieses Schema (Muster aus OZ). Werte
// nur in Funktionen lesen: ein `process.env.X` auf Modulebene würde der
// Build einbacken, und der Build läuft ohne Secrets. instrumentation.ts
// prüft beim Start; ist etwas ungültig, endet der Prozess, der
// Healthcheck bleibt rot, und Coolify behält den alten Container.
//
// SITE_URL fehlt hier absichtlich: sie wird auch beim Build gebraucht und
// liegt in lib/site.ts. Jede neue Variable auch in .env.tpl und SETUP.md.

// Leere Werte (Coolify legt Variablen gern leer an) gelten als nicht
// gesetzt.
const leerIstNichts = (wert: unknown) => (wert === "" ? undefined : wert);
const text = z.preprocess(leerIstNichts, z.string().min(1).optional());
const adresse = z.preprocess(leerIstNichts, z.email().optional());

// Empfänger-Allowlist: Adressen oder Domains (`@example.test`), `*` erlaubt
// ausdrücklich alles. Leer = alles erlaubt (Prod); auf staging. Pflicht.
const empfaengerliste = z
  .string()
  .default("")
  .transform((wert) =>
    wert
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0),
  )
  .pipe(
    z.array(
      z.union([
        z.literal("*"),
        z.email(),
        z.string().regex(/^@[a-z0-9.-]+\.[a-z]{2,}$/, "Domain als @example.at"),
      ]),
    ),
  );

const jaNein = z
  .enum(["true", "false", "1", "0", ""])
  .default("false")
  .transform((v) => v === "true" || v === "1");

const schema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    // konsole: Mail steht im Terminal (lokal); memory: im Prozess, für
    // E2E-Tests über /api/test/mails; scaleway: Transactional Email.
    MAIL_TRANSPORT: z
      .enum(["konsole", "memory", "scaleway"])
      .default("konsole"),
    SCALEWAY_TEM_KEY: text,
    SCALEWAY_PROJECT_ID: text,
    SCALEWAY_REGION: z.preprocess(leerIstNichts, z.string().default("fr-par")),
    // Absender (verifizierte Domain bei Scaleway, z. B. kontakt@mail.<domain>)
    MAIL_FROM: adresse,
    // Empfänger der Anfragen aus dem Kontaktformular (Postfach des Kunden).
    MAIL_ADMIN: adresse,
    MAIL_EMPFAENGER_ALLOWLIST: empfaengerliste,
    // 1 erst, wenn Cloudflare davor steht und die Firewall nur Cloudflare
    // durchlässt (leitfaden/03); dann kommt die Client-IP aus
    // cf-connecting-ip.
    TRUST_CF_IP: jaNein,
  })
  .superRefine((e, ctx) => {
    if (e.MAIL_TRANSPORT === "scaleway") {
      for (const name of [
        "SCALEWAY_TEM_KEY",
        "SCALEWAY_PROJECT_ID",
        "MAIL_FROM",
      ] as const) {
        if (!e[name]) {
          ctx.addIssue({
            code: "custom",
            path: [name],
            message: "Pflicht bei MAIL_TRANSPORT=scaleway",
          });
        }
      }
    }
    if (e.MAIL_TRANSPORT === "scaleway" && istStaging()) {
      if (e.MAIL_EMPFAENGER_ALLOWLIST.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["MAIL_EMPFAENGER_ALLOWLIST"],
          message:
            "Pflicht auf staging.: sonst geht Post aus der Testumgebung an echte Adressen (Adressen, @domain oder bewusst *)",
        });
      }
    }
  });

export type Umgebung = z.infer<typeof schema>;

function istStaging(): boolean {
  return siteHost().startsWith("staging.");
}

// Reine Auswertung, für Tests mit eigener Quelle.
export function envAus(quelle: Record<string, string | undefined>): Umgebung {
  const ergebnis = schema.safeParse(quelle);
  if (!ergebnis.success) {
    const zeilen = ergebnis.error.issues.map(
      (i) => `  ${i.path.join(".") || "(env)"}: ${i.message}`,
    );
    throw new Error(`Ungültige Umgebung:\n${zeilen.join("\n")}`);
  }
  return ergebnis.data;
}

let zwischenspeicher: Umgebung | null = null;

export function env(): Umgebung {
  zwischenspeicher ??= envAus(process.env);
  return zwischenspeicher;
}
