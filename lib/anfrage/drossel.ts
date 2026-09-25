// Drossel ohne Datenbank (Muster aus punktetafel, app/api/feedback): Zähler
// im Prozess, je Schlüssel in einem gleitenden Fenster. Ein Neustart setzt
// sie zurück; gegen Formular-Schleifen reicht das. Mit Datenbank die
// DB-Drossel aus OZ nehmen (lib/drossel, überlebt Deploys).

export type Regel = { limit: number; fensterMs: number };

const STUNDE = 60 * 60 * 1000;

// Je Absender-IP und für alle zusammen: der Zähler je IP hilft nicht
// gegen viele Adressen, die Obergrenze für alle schon.
export const JE_IP: Regel = { limit: 5, fensterMs: STUNDE };
export const GESAMT: Regel = { limit: 30, fensterMs: STUNDE };

export function neueDrossel() {
  const zeiten = new Map<string, number[]>();
  return {
    // true = darf, und zählt den Versuch; false = zu viele im Fenster.
    erlaubt(schluessel: string, regel: Regel, jetzt: number): boolean {
      const frisch = (zeiten.get(schluessel) ?? []).filter(
        (t) => jetzt - t < regel.fensterMs,
      );
      if (frisch.length >= regel.limit) {
        zeiten.set(schluessel, frisch);
        return false;
      }
      frisch.push(jetzt);
      zeiten.set(schluessel, frisch);
      // Aufräumen, damit die Map nicht unbegrenzt wächst.
      if (zeiten.size > 5000) {
        for (const [k, stempel] of zeiten) {
          if (stempel.every((t) => jetzt - t >= regel.fensterMs)) {
            zeiten.delete(k);
          }
        }
      }
      return true;
    },
  };
}

// Letzter Hop in x-forwarded-for: hinter Traefik ist das die echte
// Client-IP. Mit Cloudflare davor (TRUST_CF_IP) cf-connecting-ip. Ohne
// Header (lokal) null – dann gilt nur die Obergrenze für alle.
export function clientIp(headers: Headers, cloudflare: boolean): string | null {
  const roh = cloudflare
    ? headers.get("cf-connecting-ip")
    : headers.get("x-forwarded-for");
  if (!roh) return null;
  const letzte = roh
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .at(-1);
  if (!letzte || !/^[0-9a-fA-F.:]{3,45}$/.test(letzte)) return null;
  return letzte;
}
