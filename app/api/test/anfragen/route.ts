import { env } from "@/lib/env";
import { anfragenImSpeicher, anfragespeicherLeeren } from "@/lib/anfrage/ntfy";

// Nur bei ANFRAGE_TRANSPORT=memory (E2E-Tests): liefert die im Prozess
// gesammelten Anfragen. Mit jedem anderen Transport gibt es die Adresse
// nicht (404) – in Produktion also nie.
export const dynamic = "force-dynamic";

export function GET(): Response {
  if (env().ANFRAGE_TRANSPORT !== "memory") {
    return new Response(null, { status: 404 });
  }
  return Response.json(anfragenImSpeicher(), {
    headers: { "cache-control": "no-store" },
  });
}

export function DELETE(): Response {
  if (env().ANFRAGE_TRANSPORT !== "memory") {
    return new Response(null, { status: 404 });
  }
  anfragespeicherLeeren();
  return new Response(null, { status: 204 });
}
