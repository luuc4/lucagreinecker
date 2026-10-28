import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type Ziel } from "@/i18n/navigation";
import { knopfKlassen, type KnopfGroesse, type KnopfVariante } from "./Knopf";
import { istNacktesA, istNeuerTab, type ExternerLink } from "./Links";
import { NeuerTab } from "./NeuerTab";

type KnopfLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  // Interne Ziele wie `Link` sie nimmt („/kontakt", { pathname, params }),
  // sonst eine volle Adresse, mailto:, tel: oder eine Datei unter /api.
  href: Ziel | ExternerLink;
  variante?: KnopfVariante;
  groesse?: KnopfGroesse;
  children: ReactNode;
};

// Ein Link im Look eines Knopfs (Sorten in Links.ts). Server-Komponente:
// der Hinweis „öffnet in neuem Tab" kommt aus den Nachrichten.
export function KnopfLink({
  href,
  variante,
  groesse,
  className,
  children,
  ...rest
}: KnopfLinkProps) {
  const klassen = knopfKlassen({ variante, groesse, className });
  if (typeof href === "string" && istNeuerTab(href)) {
    return (
      <a
        href={href}
        className={klassen}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        <NeuerTab />
      </a>
    );
  }
  if (typeof href === "string" && istNacktesA(href)) {
    return (
      <a href={href} className={klassen} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Ziel} className={klassen} {...rest}>
      {children}
    </Link>
  );
}
