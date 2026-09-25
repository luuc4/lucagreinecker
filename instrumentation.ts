import type { Instrumentation } from "next";

// Beim Start: Umgebung prüfen (lib/betrieb/start.ts). Nur per dynamischem
// Import im Node-Zweig – Next kompiliert diese Datei auch für die
// Edge-Runtime. Mit Jobs kommen hier pg-boss und das geordnete
// Herunterfahren dazu (leitfaden/12, Baustein E).
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { beimStart } = await import("@/lib/betrieb/start");
    beimStart();
  }
}

// Fehler als eine JSON-Zeile nach stdout (Coolify-Log). Pfad ohne Query:
// Tokens, Codes und Adressen in Suchparametern dürfen nie im Log landen.
export const onRequestError: Instrumentation.onRequestError = async (
  fehler,
  request,
  context,
) => {
  const digest =
    typeof fehler === "object" && fehler !== null && "digest" in fehler
      ? String((fehler as { digest?: unknown }).digest)
      : undefined;
  console.error(
    JSON.stringify({
      ereignis: "request_error",
      pfad: request.path.split("?")[0],
      methode: request.method,
      route: context.routePath,
      typ: context.routeType,
      digest,
      fehler: fehler instanceof Error ? fehler.message : String(fehler),
    }),
  );
};
