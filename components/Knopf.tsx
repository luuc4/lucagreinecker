import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { linkHoverKlassen } from "./Links";

// Eine Quelle je Look: Knopf für <button>, KnopfLink (eigene Datei, weil
// er Texte je Sprache braucht und Client-Komponenten nur den Knopf
// importieren) für Links, beide über knopfKlassen(). Varianten: voll (die
// Hauptaktion, Gelb mit Tinte – das einzige Gelb einer Seite neben Hover
// und Auswahl), umriss (Nebenaktion, Rahmen), text (Link in Knopfhöhe,
// Gelb erst beim Hover, der Text dann Tinte: linkHoverKlassen in Links.ts). Größen: sm 44 px (Kopf am Handy, Nebenknöpfe wie
// Karten-Links), md 52 px, lg 60 px. Die Größe kommt immer über `groesse`,
// nie über className: ohne tailwind-merge gewinnt bei zwei min-h-Klassen
// die zufällig spätere im CSS (Befund OZ, 17.09.2026). Das Gewicht steht
// deshalb in der Variante, nicht im Sockel.
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
      text: `min-h-11 px-0 font-medium text-fg underline decoration-1 underline-offset-4 ${linkHoverKlassen}`,
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
