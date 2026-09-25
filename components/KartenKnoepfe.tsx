import { clsx } from "clsx";
import {
  adresseText,
  appleKartenLink,
  googleMapsLink,
  type Adresse,
} from "@/lib/kontakt/links";
import { Icon } from "./Icon";
import { KnopfLink } from "./Knopf";

// Zwei Knöpfe, die die Route in Google Maps oder Apple Karten öffnen,
// statt einer eingebetteten Karte (Datenschutz, CSP). Der zugängliche Name
// nennt den Ort, weil auf einer Seite mehrere Paare stehen können.
export function KartenKnoepfe({
  adresse,
  className,
}: {
  adresse: Adresse;
  className?: string;
}) {
  const ort = adresse.name ?? adresseText(adresse);
  return (
    <p className={clsx("flex flex-wrap gap-3", className)}>
      <KnopfLink
        href={googleMapsLink(adresse)}
        variante="umriss"
        groesse="sm"
        aria-label={`Route zu ${ort} in Google Maps`}
      >
        <Icon name="pin" />
        Google Maps
      </KnopfLink>
      <KnopfLink
        href={appleKartenLink(adresse)}
        variante="umriss"
        groesse="sm"
        aria-label={`Route zu ${ort} in Apple Karten`}
      >
        <Icon name="pin" />
        Apple Karten
      </KnopfLink>
    </p>
  );
}
