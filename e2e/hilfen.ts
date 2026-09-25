import type { APIRequestContext } from "@playwright/test";

// Alle öffentlichen Seiten aus der Sitemap: neue Seiten kommen damit von
// selbst in die Prüfung auf Barrierefreiheit und offene Stellen.
export async function seitenAusSitemap(
  request: APIRequestContext,
): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (treffer) => new URL(treffer[1]!).pathname,
  );
}
