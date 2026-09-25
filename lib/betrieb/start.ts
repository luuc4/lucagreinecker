import { env } from "@/lib/env";
import { KONTAKTFORMULAR } from "@/lib/inhalte/statisch";

// Was der Node-Prozess beim Start tut (aufgerufen aus instrumentation.ts,
// nur in der Node-Runtime). Ungültige Umgebung → Prozess endet, der
// Healthcheck bleibt rot, Coolify behält den alten Container. Fehlt nur
// die ntfy-Einrichtung, läuft die Seite weiter (vor dem Go-live normal),
// aber das Log sagt es bei jedem Start.
export function beimStart(): void {
  let e;
  try {
    e = env();
  } catch (fehler) {
    console.error(fehler instanceof Error ? fehler.message : String(fehler));
    process.exit(1);
  }
  if (
    KONTAKTFORMULAR &&
    e.NODE_ENV === "production" &&
    e.ANFRAGE_TRANSPORT !== "ntfy"
  ) {
    console.warn(
      `[betrieb] Kontaktformular an, aber ANFRAGE_TRANSPORT=${e.ANFRAGE_TRANSPORT}: Anfragen werden abgelehnt, bis ntfy eingerichtet ist (SETUP.md, Env-Vars)`,
    );
  }
}
