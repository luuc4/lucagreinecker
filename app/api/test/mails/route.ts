import { env } from "@/lib/env";
import { mailsImSpeicher, mailspeicherLeeren } from "@/lib/mail/senden";

// Nur bei MAIL_TRANSPORT=memory (E2E-Tests): liefert die im Prozess
// gesammelten Mails. Mit jedem anderen Transport gibt es die Adresse
// nicht (404) – in Produktion also nie.
export const dynamic = "force-dynamic";

export function GET(): Response {
  if (env().MAIL_TRANSPORT !== "memory") {
    return new Response(null, { status: 404 });
  }
  return Response.json(mailsImSpeicher(), {
    headers: { "cache-control": "no-store" },
  });
}

export function DELETE(): Response {
  if (env().MAIL_TRANSPORT !== "memory") {
    return new Response(null, { status: 404 });
  }
  mailspeicherLeeren();
  return new Response(null, { status: 204 });
}
