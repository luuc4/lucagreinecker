import { env } from "@/lib/env";
import { KONTAKTFORMULAR } from "@/lib/inhalte/statisch";

// Was der Node-Prozess beim Start tut (aufgerufen aus instrumentation.ts,
// nur in der Node-Runtime). Ungültige Umgebung → Prozess endet, der
// Healthcheck bleibt rot, Coolify behält den alten Container. Fehlt nur die
// Mail-Einrichtung, läuft die Seite weiter (vor dem Go-live normal), aber
// das Log sagt es bei jedem Start.
export function beimStart(): void {
  let e;
  try {
    e = env();
  } catch (fehler) {
    console.error(fehler instanceof Error ? fehler.message : String(fehler));
    process.exit(1);
  }
  if (KONTAKTFORMULAR && e.NODE_ENV === "production") {
    if (e.MAIL_TRANSPORT === "konsole") {
      console.warn(
        "[betrieb] Kontaktformular an, aber MAIL_TRANSPORT=konsole: Anfragen werden abgelehnt, bis Scaleway eingerichtet ist (leitfaden/04)",
      );
    }
    if (!e.MAIL_ADMIN) {
      console.warn(
        "[betrieb] MAIL_ADMIN fehlt: niemand bekommt die Anfragen aus dem Kontaktformular",
      );
    }
  }
}
