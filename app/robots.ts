import type { MetadataRoute } from "next";
import { istOeffentlicheDomain, siteUrl } from "@/lib/site";

// Nur die echte Domain wird indexiert; neu., staging. und localhost
// sperren alles. Kein Disallow für Verstecktes (Admin, Konto): das verriete
// nur den Pfad. Solche Seiten tragen selbst noindex.
export default function robots(): MetadataRoute.Robots {
  if (!istOeffentlicheDomain()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
