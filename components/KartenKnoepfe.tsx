import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import {
  adresseText,
  appleKartenLink,
  googleMapsLink,
  type Adresse,
} from "@/lib/kontakt/links";
import { Icon } from "./Icon";
import { KnopfLink } from "./KnopfLink";

// Zwei Knöpfe, die die Route in Google Maps oder Apple Karten öffnen,
// statt einer eingebetteten Karte (Datenschutz, CSP). Der zugängliche Name
// nennt den Ort, weil auf einer Seite mehrere Paare stehen können, und
// enthält den sichtbaren Namen der App (WCAG 2.5.3, Review 28.10.2026).
export function KartenKnoepfe({
  adresse,
  className,
}: {
  adresse: Adresse;
  className?: string;
}) {
  const t = useTranslations("karten");
  const ort = adresse.name ?? adresseText(adresse);
  return (
    <p className={clsx("flex flex-wrap gap-3", className)}>
      <KnopfLink
        href={googleMapsLink(adresse)}
        variante="umriss"
        groesse="sm"
        aria-label={t("google", { ort, googleName: t("googleName") })}
      >
        <Icon name="pin" />
        {t("googleName")}
      </KnopfLink>
      <KnopfLink
        href={appleKartenLink(adresse)}
        variante="umriss"
        groesse="sm"
        aria-label={t("apple", { ort, appleName: t("appleName") })}
      >
        <Icon name="pin" />
        {t("appleName")}
      </KnopfLink>
    </p>
  );
}
