"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Navigationslink mit aktivem Zustand: die aktuelle Seite bekommt
// aria-current und volle Textfarbe, alle anderen bleiben leiser. Keine
// Funktions-Props (Next-Warnung 71007); wer auf Klicks reagieren will,
// hängt den Handler an das umgebende Element.
export function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pfad = usePathname();
  const aktiv = pfad === href || (href !== "/" && pfad.startsWith(`${href}/`));
  return (
    <Link
      href={href}
      aria-current={aktiv ? "page" : undefined}
      className={clsx(className, aktiv ? "text-fg" : "text-fg-leise")}
    >
      {children}
    </Link>
  );
}
