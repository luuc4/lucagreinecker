// Links für die praktischen Handgriffe (leitfaden/05, „Praktische
// Handgriffe"): anrufen, Mail mit Betreff, WhatsApp mit vorgetipptem Text,
// Route in Google Maps oder Apple Karten. Keine eingebettete Karte: die
// schickte bei jedem Aufruf Daten an Google; die Knöpfe tun das erst auf
// Wunsch.

export type Adresse = {
  // Name des Orts (Studio, Geschäft); hilft der Karten-App beim Finden.
  name?: string | null;
  strasse: string;
  plz: string;
  ort: string;
};

// „+43 660 123 45 67" → „tel:+436601234567".
export function telLink(nummer: string): string {
  return `tel:${nummer.replace(/[^\d+]/g, "")}`;
}

export function mailLink(adresse: string, betreff?: string): string {
  return betreff
    ? `mailto:${adresse}?subject=${encodeURIComponent(betreff)}`
    : `mailto:${adresse}`;
}

// wa.me will die Nummer ohne „+" und ohne Leerzeichen. Der Text steht in
// der Stimme dessen, der schreibt („Hallo, ich hätte gern einen Termin …").
export function whatsappLink(nummer: string, text?: string): string {
  const basis = `https://wa.me/${nummer.replace(/\D/g, "")}`;
  return text ? `${basis}?text=${encodeURIComponent(text)}` : basis;
}

export function adresseText(a: Adresse): string {
  const zeile = `${a.strasse}, ${a.plz} ${a.ort}`;
  return a.name ? `${a.name}, ${zeile}` : zeile;
}

// Route zum Ziel in Google Maps (Maps URLs, funktioniert in App und Web).
export function googleMapsLink(a: Adresse): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(adresseText(a))}`;
}

// Route zum Ziel in Apple Karten (öffnet auf iPhone und Mac die App).
export function appleKartenLink(a: Adresse): string {
  return `https://maps.apple.com/?daddr=${encodeURIComponent(adresseText(a))}`;
}
