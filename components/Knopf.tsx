import { clsx } from "clsx";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

// Eine Quelle je Look: Knopf für <button>, KnopfLink für Links, beide über
// knopfKlassen(). Varianten: voll (die Hauptaktion, Gelb mit Tinte – das
// einzige Gelb einer Seite neben Hover und Auswahl), umriss (Nebenaktion,
// Rahmen), text (Link in Knopfhöhe, Gelb erst beim Hover). Größen: sm 44 px
// (Kopf am Handy, Nebenknöpfe wie Karten-Links), md 52 px, lg 60 px. Die
// Größe kommt immer über `groesse`, nie über className: ohne tailwind-merge
// gewinnt bei zwei min-h-Klassen die zufällig spätere im CSS (Befund OZ,
// 17.09.2026). Das Gewicht steht deshalb in der Variante, nicht im Sockel.
export type KnopfVariante = "voll" | "umriss" | "text";
export type KnopfGroesse = "sm" | "md" | "lg";

export function knopfKlassen({
  variante = "voll",
  groesse = "md",
  className,
}: {
  variante?: KnopfVariante;
  groesse?: KnopfGroesse;
  className?: string;
} = {}): string {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-sm whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
    variante !== "text" &&
      {
        sm: "min-h-11 px-4 text-base",
        md: "min-h-13 px-6 text-[1.0625rem]",
        lg: "min-h-15 px-8 text-lg",
      }[groesse],
    {
      voll: "bg-akzent font-semibold text-auf-akzent hover:bg-akzent-hover",
      umriss: "border border-rahmen font-medium text-fg hover:border-fg",
      text: "min-h-11 px-0 font-medium text-fg underline decoration-1 underline-offset-4 hover:bg-akzent",
    }[variante],
    className,
  );
}

type KnopfProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: KnopfVariante;
  groesse?: KnopfGroesse;
};

export function Knopf({
  variante,
  groesse,
  className,
  type = "button",
  ...rest
}: KnopfProps) {
  return (
    <button
      type={type}
      className={knopfKlassen({ variante, groesse, className })}
      {...rest}
    />
  );
}

type KnopfLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variante?: KnopfVariante;
  groesse?: KnopfGroesse;
  children: ReactNode;
};

// Drei Sorten Ziel: Seiten der App über next/link; http(s) in einem neuen
// Tab mit Hinweis für Screenreader; alles mit Schema (mailto:, tel:) und
// Dateien aus Route Handlern unter /api (vCard, Kalender) als nacktes <a>,
// damit der Client-Router sie nicht anfasst.
export function KnopfLink({
  href,
  variante,
  groesse,
  className,
  children,
  ...rest
}: KnopfLinkProps) {
  const klassen = knopfKlassen({ variante, groesse, className });
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        className={klassen}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        <span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    );
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("/api/")) {
    return (
      <a href={href} className={klassen} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={klassen} {...rest}>
      {children}
    </Link>
  );
}
