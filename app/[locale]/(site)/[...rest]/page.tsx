import { notFound } from "next/navigation";

// Fängt jede unbekannte Adresse unter /[locale] und zeigt die 404-Seite in
// der Sprache der Seite (next-intl-Doku, „error files"); ohne diese Datei
// käme Nexts englische Standard-404 ohne Kopf und Fuß. Den Titel setzt
// not-found.tsx; Metadaten von hier verwirft Next beim notFound().
export default function Unbekannt() {
  notFound();
}
