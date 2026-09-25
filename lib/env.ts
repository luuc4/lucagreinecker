import { z } from "zod";

// Alle Laufzeit-Variablen laufen durch dieses Schema (Muster aus OZ). Werte
// nur in Funktionen lesen: ein `process.env.X` auf Modulebene würde der
// Build einbacken, und der Build läuft ohne Secrets. instrumentation.ts
// prüft beim Start; ist etwas ungültig, endet der Prozess, der
// Healthcheck bleibt rot, und Coolify behält den alten Container.
//
// SITE_URL fehlt hier absichtlich: sie wird auch beim Build gebraucht und
// liegt in lib/site.ts. Jede neue Variable auch in .env.tpl und SETUP.md.
//
// Diese Seite verschickt keine Mails: das Kontaktformular geht als Push an
// ntfy (AGENTS.md, Entscheidungen 25.09.2026); der Mail-Stand des Starters
// (MAIL_*, Scaleway) ist am 26.09.2026 entfallen.

// Leere Werte (Coolify legt Variablen gern leer an) gelten als nicht
// gesetzt.
const leerIstNichts = (wert: unknown) => (wert === "" ? undefined : wert);
const text = z.preprocess(leerIstNichts, z.string().min(1).optional());
const url = z.preprocess(leerIstNichts, z.url().optional());

const jaNein = z
  .enum(["true", "false", "1", "0", ""])
  .default("false")
  .transform((v) => v === "true" || v === "1");

const schema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    // konsole: Anfrage steht im Terminal (lokal); memory: im Prozess, für
    // E2E-Tests über /api/test/anfragen; ntfy: Push an Lucas ntfy.
    ANFRAGE_TRANSPORT: z.enum(["konsole", "memory", "ntfy"]).default("konsole"),
    // Topic-Adresse der ntfy-Instanz (https://ntfy.punktetafel.at/<topic>)
    // und ein Token mit Schreibrecht auf das Topic.
    NTFY_URL: url,
    NTFY_TOKEN: text,
    // 1 erst, wenn Cloudflare davor steht und die Firewall nur Cloudflare
    // durchlässt (leitfaden/03); dann kommt die Client-IP aus
    // cf-connecting-ip.
    TRUST_CF_IP: jaNein,
  })
  .superRefine((e, ctx) => {
    if (e.ANFRAGE_TRANSPORT === "ntfy") {
      for (const name of ["NTFY_URL", "NTFY_TOKEN"] as const) {
        if (!e[name]) {
          ctx.addIssue({
            code: "custom",
            path: [name],
            message: "Pflicht bei ANFRAGE_TRANSPORT=ntfy",
          });
        }
      }
    }
  });

export type Umgebung = z.infer<typeof schema>;

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
