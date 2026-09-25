// Reine Liveness für den Coolify-Healthcheck (Host 127.0.0.1, nicht
// localhost – im Alpine-Container löst localhost zu ::1 auf). Mit
// Datenbank kommt `SELECT 1` dazu, sonst nichts: ein Geschäftsindikator
// hier nähme bei einem Problem die ganze Seite vom Netz (leitfaden/04).
export const dynamic = "force-dynamic";

export function GET(): Response {
  return new Response("ok", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
