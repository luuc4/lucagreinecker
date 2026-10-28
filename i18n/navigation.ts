import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import { routing } from "./routing";

// Link, redirect, usePathname, useRouter und getPathname, die Sprache und
// übersetzte Adressen kennen: `href="/ueber-mich"` wird auf der englischen
// Seite zu `/en/about`. Interne Links nie über next/link (leitfaden/15).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Ein internes Ziel, wie `Link` es nimmt: ein Pfad ohne Parameter
// („/kontakt") oder ein Objekt mit pathname, params und hash.
export type Ziel = ComponentProps<typeof Link>["href"];

// Dasselbe für getPathname (ohne hash): Canonical, hreflang, Sitemap.
export type Pfad = Parameters<typeof getPathname>[0]["href"];
