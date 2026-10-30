# Luca Greinecker

Lucas eigene Website. Luca Greinecker aus Bludenz baut Websites und
Web-Apps für Leute und Betriebe in Vorarlberg; hauptberuflich ist er seit
Oktober 2026 Specialist, Data Analytics and Insights bei Ball (vorher Lean
Leader in Ludesch). Die Seite zeigt vor allem seine
Webprojekte (Kundenseiten und eigene Apps) und soll zu Anfragen führen;
der Werdegang kommt nur nebenbei unter „Über mich" vor. Besucher: Leute
und kleine Betriebe aus der Region, die eine Website brauchen, dazu wer
Lucas Namen googelt.

Diese Datei ist die Arbeitsdoku: Stand, Befehle, Struktur, Konventionen,
Design, **Entscheidungen mit Datum und Grund**. Betrieb, Server, Konten:
`SETUP.md`. Backlog und „bewusst nicht": `TODO.md`. Allgemeine Regeln und
Begründungen für Stack, Server, Dienste, UI/UX: der Leitfaden in
`~/projects/webprojekt-vorlage/leitfaden/` (Repo `luuc4/webprojekt-vorlage`).
Was hier steht, geht dem Leitfaden vor.

Stellen mit ‹spitzen Klammern› sind noch auszufüllen.

## Stand

- 25.09.2026 (Etappe 0): Neubau aus dem Starter der webprojekt-vorlage
  im bestehenden Repo. Die alte statische Seite liegt auf Branch `alt`
  und Tag `statisch-2026-09`; GitHub Pages liefert sie bis zum Umzug aus
  `alt` unter `lucagreinecker.at` aus. Kickoff-Antworten unten
  („Projekt", „Entscheidungen"). Platzhalter-Design bis zur Wahl der
  Richtung. Läuft unter `https://neu.lucagreinecker.at` (Coolify auf Lucas
  Server, SETUP.md).
- 25.09.2026 (Etappe 1, Teil 1 – Entwürfe): Zwei Design-Richtungen als
  HTML in `docs/design/richtungen/` (Leinwand `index.html`, dieselbe als
  Artifact `https://claude.ai/artifact/25576desS8jAzH66a8AtPe`): A
  „Schautafel" (hell, IBM Plex Sans, Gelb als Marker, Projekte als Zeilen
  mit Desktop- und Handy-Bild) und B „Vier Handys" (Kobaltblau, Newsreader,
  die vier Handy-Screens als Hero, keine Akzentfarbe). Echte Screenshots der
  vier Projekte per `scripts/projekt-screenshots.mjs` in `public/bilder/`.
  Die Design-Fragen (Fragebogen D) standen auf der Leinwand; Lucas Wahl
  kam am selben Tag (Teil 2). Bis zur Wahl der Version bleibt das
  Platzhalter-Design im Code. Der Coolify-Deploy scheiterte an diesem Tag
  am IPv6-Gateway des Servers (SETUP.md „Deploy"); nach Lucas
  Docker-Neustart um 17:47 lief er wieder durch.
- 25.09.2026 (Etappe 1, Teil 2 – Kombination): Luca wählte Design und
  Schrift von A mit dem Aufbau von B und gab den Inhalt
  „Rundum-sorglos-Paket" dazu (Entscheidungen). Daraus drei Versionen in
  `docs/design/richtungen/` (`ab.css`, `ab-start.html?v=1|2|3`,
  `ab-projekt.html`, oben auf der Leinwand; A und B dort als Archiv):
  1 „Reihe" (Satz mittig, Handys gerundet, Paket als Tabelle), 2 „Kante"
  (alles links, Handys eckig mit Fakten darunter, Paket als Spalten),
  3 „Gelbes Band" (Kopf, Satz und Handys auf der einen gelben Vollfläche).
- 25.09.2026 (Etappe 1, Teil 3 – Umsetzung, Etappe 1 abgeschlossen): Luca
  wählte Version 1 „Reihe" und bestätigte den Kickoff-Wortlaut als Satz
  oben. Umgesetzt: Tokens und Skala (`app/globals.css`), IBM Plex Sans
  (`app/fonts.ts`, Inter entfernt), Kopf, Fuß, Knöpfe, Links, Felder,
  `SeitenKopf` mittig, `Fakten`-Tabelle, Rechtstext, OG-Bild und Icon im
  neuen Design; Regeln unten unter „Design". Die Startseite zeigt vorerst
  den Satz und den Knopf, die vier Handys und das Paket folgen in Etappe 2.
- 26.09.2026 (Etappe 2 – Seiten und Inhalte): Projektdaten in
  `lib/inhalte/projekte.ts` (Fakten aus den Repos, Lucas Sätze `null`),
  Startseite mit den vier Handy-Screens (`wischleiste`), dem
  Rundum-sorglos-Paket und der Anfrage; `/projekte/<slug>` statisch;
  `/ueber-mich` mit dem Werdegang als Fakten; Navigation Projekte, Paket,
  Über mich (Kontakt nur als Knopf); Kontaktformular als Push über ntfy,
  Mail-Stack entfernt; Redirects der alten Adressen (`/index.html`,
  `/impressum.html`, `/datenschutz.html`); JSON-LD `Person`. Offen:
  Lucas Sätze (alle Stellen `[TEXT LUCA]`), die Paket-Punkte bestätigen,
  Etappe 3 (Recht, Umzug). ntfy ist seit dem 26.09.2026 scharf: Zugang und
  Topic vom punktetafel-Feedback übernommen (`scripts/ntfy-uebernehmen.sh`),
  Testanfrage über das Live-Formular mit Bestätigung.
- 26.09.2026 (Etappe 3, Teil 1 – Texte und Recht): Alle Texte stehen
  (`START`, `PAKET`, `UEBER_MICH` in statisch.ts, `satz` je Projekt), auf
  Lucas Wunsch von Claude aus den Fakten geschrieben, Luca liest gegen.
  Impressum (Anschrift Haldenweg 56b/1, Bludenz; kein Gewerbe) und
  Datenschutz (Hetzner Nürnberg, Protokolle, Umami, ntfy, Hotmail, vCard)
  als Entwurf mit sechs Prüfstellen in TODO.md; Platzhalter-Liste leer
  (`PLATZHALTER_STRENG=1` grün). Umami zählt, ntfy stellt zu. Offen: das
  Gegenlesen, die Prüfstellen, Zustimmung der drei Kunden, Renovate, der
  Domainumzug.
- 26.09.2026 (Etappe 3, Teil 2 – Prüfstellen und Messung): Prüfstelle 5
  (Umami) gegen den Quellcode von Umami 3.0.3 geprüft und der Absatz in der
  Datenschutzerklärung danach präzisiert (keine IP-Spalte, Hash mit
  Monats-Salt, Land/Region/Stadt aus der IP am Server, Do Not Track);
  Prüfstelle 4 (Microsoft) mit Vertragspartner und Data Privacy Framework
  konkretisiert, bleibt zur Prüfung. Prüfstellen 2 (Protokolle) und 3
  (ntfy) brauchen Fakten vom Server: `scripts/server-fakten.sh` liest sie
  nur; Claude darf im Auto-Modus nicht auf den Server lesen, Luca führt es
  aus. Lighthouse auf `neu.` gemessen (TODO.md, Etappe 3): Leistung 97–100,
  Barrierefreiheit 100, Best Practices 96–100, SEO 66–69 nur wegen noindex.
  Befund behoben: Zod war über die Feldkonstanten im Client-Bundle (86 KB
  je Seite, CSP-Verletzung durch Zods `Function("")`) →
  `lib/anfrage/felder.ts` ohne Zod, Kontakt danach Best Practices 100.
  Versuch, die Handy-Bilder 2–4 der Startseite eager zu laden, nach der
  Nachmessung zurückgenommen (Entscheidungen). `renovate.json` für dieses
  Repo korrigiert (Base `main`, kein Auto-Merge);
  die Renovate-App installiert Luca (TODO.md). Offen: Gegenlesen, Server-
  Fakten, WKO-Fragen (1, 4), Zustimmungen (6), Renovate-App, Domainumzug.
- 26.09.2026 (Etappe 3, Teil 3 – Updates, Screenshots, Server-Fakten):
  Updates vorgezogen (pnpm 12, TypeScript 6, Vitest 5, Actions, Runner
  26.04; ESLint 10 und TS 7 zurückgehalten, Entscheidungen); Projekt-
  Screenshots neu (USTA neue Startseite) mit 560/1440 px; aus Lucas Lauf
  von `scripts/server-fakten.sh` die Prüfstellen 2 und 3 erledigt:
  kein Zugriffsprotokoll, Betriebslogs ohne IP, ntfy 24 h mit Upstream
  ntfy.sh (nur ID), Drossel-IP im Arbeitsspeicher – Datenschutz danach
  angepasst. Offen für den Go-live: Gegenlesen, WKO (1, 4), Zustimmungen
  (6), Lucas Entscheidung zu OZ/USTA-Links (TODO.md), dann der Umzug.
- 26.09.2026, 21:48 – **Go-live auf `https://lucagreinecker.at`** (Luca:
  „lucagreinecker.at will ich haben", ohne `neu.`). Ablauf mit
  `scripts/golive.sh` (SETUP.md „Go-live"), Zertifikate für Apex und
  `www`, alle Prüfungen grün, Testanfrage gesendet, Lighthouse Start Handy
  99/100/100/100, Desktop 100 überall. OZ ohne „öffnen"-Knopf bis zu
  seinem Umzug, USTA auf `ustastreetfood.com`. Offen: Prüfstellen 1 und 4
  (WKO), Gegenlesen, Zustimmungen, `neu` im DNS löschen, Search Console.
- 07.10.2026: OZ ist seit dem 04.10.2026 unter `oz-calisthenics.at` live –
  Knopf gesetzt, „In Arbeit" weg, Screenshots neu, OZ an erster Stelle
  (Entscheidungen). Selseven kommt erst nach seinem Go-live dazu (TODO.md).
  Danach: Lucas neuer Beruf (Entscheidungen) auf Start, „Über mich", in
  der Meta-Description und im JSON-LD; die OZ-Fakten (Art, Zeitraum,
  Seiten, Funktionen, Stack, Betrieb, Satz) auf den Stand des OZ-Repos vom
  04.10.2026 (Blöcke, Einzeltraining, Trainingsplan, bar vor Ort, Mini-CMS).
- 25.10.2026: Mail auf der eigenen Domain – `mail@lucagreinecker.at` über
  iCloud+ (Entscheidungen), auf der Seite, im Impressum und in der
  Datenschutzerklärung statt Hotmail; Rechtstexte mit Stand 25.10.2026.
  Danach aufgeräumt: die Design-Entwürfe (`docs/design/`) sind raus, die
  Seite steht; erhalten im Tag `entwuerfe-2026-09`.
- 28.10.2026 (Etappe 4 – Englisch): Die Seite gibt es auf Deutsch (wie
  bisher, ohne Präfix) und Englisch unter `/en` (Luca: Leute aus dem
  Ausland kommen über LinkedIn). Aufbau mit next-intl nach leitfaden/15
  (`i18n/`, `proxy.ts`, `app/[locale]/`), alle Texte in
  `messages/de.ts` und `messages/en.ts` (TypeScript statt JSON,
  Entscheidungen), übersetzte Adressen (`/en/about`, `/en/contact`,
  `/en/projects/<slug>`, `/en/legal-notice`, `/en/privacy`), Sprachlink
  „English"/„Deutsch" im Kopf (ab sm), im Menü am Handy und im Fuß,
  Canonical und hreflang mit x-default aus einer Funktion (`i18n/seo.ts`)
  im HTML und in der Sitemap, OG-Bild je Sprache, 404 je Sprache mit Kopf
  und Fuß, Kontaktformular mit Fehlercodes statt Sätzen und Sprachvermerk
  in der Push-Nachricht. Rechtstexte als Übersetzung mit Hinweis auf die
  verbindliche deutsche Fassung. Dabei behoben: die Formular-Fehlermeldungen
  nannten „Telefon", obwohl keine Nummer auf der Seite steht. Review
  (`/code-review`) danach: og:url und og:image deutscher Seiten trugen das
  interne `/de`-Präfix (nur per Umleitung erreichbar, LinkedIn folgt der
  nicht zuverlässig) → og:url und das allgemeine og:image absolut aus
  `i18n/seo.ts` (`/de/opengraph-image`, der Proxy nimmt Bildrouten aus und
  liefert sie direkt; Projektseiten lassen Next ihr eigenes Bild samt
  Hash-Anhang verlinken); Adressen mit
  Punkt (`/impressum.htm`) bekamen Nexts nackte 404 → der Proxy lässt nur
  echte Dateiendungen aus; „Apple Maps" stand fest in der Komponente →
  in die Nachrichten; 404-Titel, Fallback bei Zod-Regeln ohne Code,
  Doppelungen (Rechtshinweis, Menü-Zeile, Projekt-Suche). Offen: Luca
  liest die englischen Texte gegen (TODO.md).
- 28.10.2026 (Durchsicht, Luca: „ja fixe die dinger"): Screenshots laufen
  unten weich in Papier aus (kein halber Knopf mehr am Schnitt),
  Vorschaubild je Projektseite mit dem Handy-Screenshot, der Knopf unter
  dem Satz heißt „Nachricht schreiben" wie der im Anfrage-Block, Paket
  und Über-mich-Fakten stehen am Handy untereinander, die doppelte Zeile
  „Werdegang" ist raus, und auf „Über mich" steht Lucas Porträt
  (`public/bilder/portrait-*`, Ausschnitt 4:5 aus seinem Foto, Original
  in `screenshots/portrait/`, nicht im Repo).
- 28.10.2026 (Dunkelmodus, Luca: „ja dann mach das"): nach
  Systemeinstellung, ohne Schalter – ein Block in `globals.css` tauscht die
  Farbvariablen, Gelb bleibt. Dazu wird beim Link-Hover der Text Tinte
  (sonst Papier auf Gelb), das Fehlerrot ist im Dunkeln heller, die
  Browserleiste kennt beide Farben, gedruckt bleibt es hell.
  `app/globals.test.ts` misst beide Paletten gegen WCAG, axe läuft in
  beiden Schemata, `e2e/farben.spec.ts` prüft den Wechsel; Screenshots
  mit `FARBSCHEMA=dunkel`.
- 29.10.2026 (Selseven, Luca: „können wir selseven auch mit einbauen, noch
  mit verlinken auf neu. und halt release november oder so"): Selseven
  als fünftes Projekt am Ende, Knopf auf `neu.selseven-friseursalon.at`,
  Stand „In Arbeit, online ab November 2026" (Entscheidungen). Fakten aus
  `~/projects/selseven`, Satz von Claude aus den Fakten (Luca liest
  gegen), Screenshots von `neu.` (Selins Begrüßung und das Salonfoto sind
  seit 20.10.2026 im ersten Bildschirm). Die Reihe ab lg hat fünf Spalten;
  angesehen in 390, 1024, 1440 und 1920 px, die Projektseite in 390 und
  1440 (auch englisch). Selseven im Impressum unter „Projekte anderer",
  Stand der Rechtstexte 29.10.2026.
- 29.10.2026 abends (Selseven-Go-live): Knopf und Adresse auf
  `https://selseven-friseursalon.at`, `stand` raus (de und en), Zeitraum
  „online seit Ende Oktober 2026", Kunde mit vollem Namen wie im
  Impressum von Selseven. Screenshots neu von der Domain am 30.10.2026
  um 10:20, während der Öffnungszeiten („Jetzt geöffnet").

## Projekt

| Was         | Wert                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Kunde       | Luca selbst (Privatperson; Gewerbe für Webprojekte: ‹klären›)                                                     |
| Domain      | `lucagreinecker.at` (live seit 26.09.2026)                                                                        |
| Projekttyp  | einfach (leitfaden/12): Portfolio, Inhalte im Code                                                                |
| Seiten      | Start, je Projekt eine Seite, Über mich, Kontakt, Impressum, DSE                                                  |
| Funktionen  | Kontaktformular → ntfy (Push an Luca), vCard, Mail-Link                                                           |
| Sprache     | Deutsch (Du, locker und regional wie Luca selbst schreibt), dazu Englisch unter `/en` (britisch, seit 28.10.2026) |
| Platzhalter | `[TEXT LUCA]` (`PLATZHALTER` in `lib/inhalte/statisch.ts`, sichtbar im Text in `messages/`)                       |
| Sperrzeiten | keine                                                                                                             |

## Stack

Next.js 16 (App Router, `output: "standalone"`), React 19, TypeScript 6
strict mit `noUncheckedIndexedAccess`, Tailwind 4 CSS-first (`@theme` in
`app/globals.css`), next-intl 4 für Deutsch und Englisch (seit
28.10.2026, leitfaden/15), pnpm 12, Node 24, Vitest 5 (`unit`, `ui`),
Playwright mit axe, ESLint 9, Prettier (Stand 26.09.2026; ESLint 10 und
TypeScript 7 bewusst nicht, Entscheidungen). Build in GitHub Actions → GHCR, Coolify zieht
das Image. Umami für Statistik (Pflicht). Zusatzdienste aus Coolify nur
mit Anwendungsfall (leitfaden/11): keine eigenen; die Seite nutzt Umami
und ntfy, die auf Lucas Server schon laufen. Bausteine nach Bedarf (Datenbank, Mail,
Login, Zahlung, CMS): leitfaden/02 und 04; wenn einer dazukommt, hier mit
Datum eintragen.

## Befehle

```bash
pnpm install
pnpm dev                      # http://localhost:3000

pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build   # vor jedem Push
pnpm format                   # Format-Drift ist der häufigste CI-Fehler
pnpm test:e2e --project=chromium   # nach dem Build; startet `next start -p 3100`
PLATZHALTER_STRENG=1 pnpm test:e2e e2e/platzhalter.spec.ts   # vor dem Go-live

pnpm start -p 3100 &          # für Screenshots, dann:
OUT=/tmp/shots node scripts/screenshots.mjs   # alle Seiten der Sitemap in 390/768/1440

node scripts/projekt-screenshots.mjs [slug]   # Projektbilder neu aufnehmen (Live-Adressen im Script)
bash scripts/server-fakten.sh                 # Server nur lesen (Logs, ntfy, Umami, Speicher) – Luca, nicht Claude
```

## Struktur

```
app/[locale]/         Routen je Sprache (de ohne Präfix, en unter /en; proxy.ts verteilt).
                      layout.tsx = Root-Layout (html lang, Schrift, Provider), error.tsx,
                      opengraph-image.tsx je Sprache. (site) öffentlich mit Kopf, Fuß, Umami:
                      Start, projekte/[slug], ueber-mich, kontakt, impressum, datenschutz,
                      not-found + [...rest] (404 je Sprache). Ordnernamen sind die internen
                      Pfade; die englischen Adressen stehen in i18n/routing.ts (pathnames)
app/api/              nur für Fremdaufrufer und Nicht-HTML (health, kontakt.vcf, test/anfragen
                      nur mit memory); ohne Sprache
app/globals.css       Design-Tokens (@theme), Grundregeln, Utilities inhalt/zahlen
app/sitemap.ts        öffentliche Seiten je Sprache mit hreflang – neue Seiten hier eintragen
                      (E2E liest sie)
proxy.ts              next-intl-Middleware (Next 16: proxy statt middleware)
i18n/                 routing (Sprachen, pathnames, HTML_LANG – die eine Stelle), request
                      (Nachrichten je Anfrage), navigation (Link, usePathname, getPathname),
                      sprache (seitenSprache: prüfen + setRequestLocale), seo (Canonical,
                      hreflang, Sitemap aus einer Funktion), next-intl.d.ts (Typen)
messages/             de.ts (die Form, mit Warum-Kommentaren), en.ts (typisiert als
                      Nachrichten), messages.test.ts – jedes Wort, das ein Besucher liest
components/           KontaktFormular (Texte als Props), formular/Feld (Feld, Textbereich),
                      Knopf (Button), KnopfLink, Textlink, Links (Zielsorten), NeuerTab,
                      SprachWechsel, Icon, Kopf, MobilMenue, NavLink, Fuss,
                      Abschnitt (SeitenKopf, Abschnitt, Spalten, Spalte, Fakten), KartenKnoepfe,
                      Rechtstext, SeitenFokus, Analytics, JsonLd, ProjektBild (<picture> aus
                      public/bilder), Wischleiste (Handy-Reihe mit Wisch-Hinweis)
lib/inhalte/statisch.ts  Fakten, die in jeder Sprache gleich sind (SEITE, KONTAKT, IMPRESSUM),
                      NAVIGATION (Pfade + Label-Schlüssel), PLATZHALTER, KONTAKTFORMULAR
lib/inhalte/projekte.ts  die fünf Projekte: Slug, Name, Domain, Knopf-Ziel, Reihenfolge
                      (Texte je Sprache in messages/<sprache>.ts, `projekte`)
lib/inhalte/datum.ts  ISO-Datum → Text je Sprache (Stand der Rechtstexte)
lib/anfrage/          Kontaktformular: felder (Namen, Längen, Fehlercodes – ohne Zod, für den
                      Client), schema (Zod mit Codes, Sprache, Honeypot – nur Server), drossel
                      (im Prozess), vorlage (Push-Text, deutsch, mit Sprachvermerk),
                      ntfy (Transporte konsole/memory/ntfy), actions (Server Action)
lib/env.ts            Zod-Schema aller Laufzeit-Variablen; lib/betrieb/start.ts prüft beim Start
lib/kontakt/          vCard, Kalenderdatei (Serien, Einzeltermine), Links (tel, mail,
                      WhatsApp, Google Maps, Apple Karten) – rein und getestet
lib/site.ts           SITE_URL, OEFFENTLICHE_HOSTS (nur die werden indexiert)
e2e/                  seiten (Rauchtest, Überlauf, 404 je Sprache), a11y (axe, 390/1440),
                      platzhalter, kontaktformular (auch englisch), sprachen (lang, Canonical,
                      hreflang, Sprachlink, /de-Umleitung, Sitemap)
scripts/              screenshots.mjs, bilder.mjs (Varianten ohne Metadaten), server-einrichten.sh,
                      projekt-screenshots.mjs (Startseiten der Projekte in 390 und 1440 px → public/bilder),
                      server-fakten.sh (nur lesen: Log-Rotation, ntfy, Umami, Speicher – Luca führt aus)
public/bilder/        projekt-<slug>-handy-{390,560,780} und -desktop-{720,1200,1440,1800} als AVIF/WebP/JPEG
screenshots/          Originale und Durchsichts-Screenshots, nicht im Repo
```

Alias `@/*` auf das Repo-Root. Kein `src/`.

## Konventionen

- **Sprache:** Kommentare deutsch mit Warum (und Datum bei
  Entscheidungen), Kopfkommentar je Datei. Domänenbegriffe deutsch mit
  umschriebenen Umlauten, Technik englisch.
- **Texte:** nur echte Inhalte vom Kunden oder von Luca, nie erfinden;
  Lücken als `PLATZHALTER`. Keine KI-Floskeln (leitfaden/05, „Texte").
  Knöpfe groß beginnend, Statuszeilen klein, U+202F vor Tausendern, echtes
  Minus. Jedes Wort, das ein Besucher liest, steht in `messages/de.ts`
  und `messages/en.ts` (seit 28.10.2026) – nie in einer Komponente oder
  Seite; `lib/inhalte/` hält nur, was in jeder Sprache gleich ist.
  Server-Komponenten lesen mit `useTranslations`/`getTranslations`
  (Strings, Platzhalter `{name}`) und `getMessages` (Listen);
  Client-Komponenten bekommen ihre Wörter als Props. Englisch britisch,
  „Austria" dazu, wo Vorarlberg oder Bludenz sonst niemand einordnet.
  Interne Links immer über `Link` aus `i18n/navigation`, nie `next/link`.
- **Komponenten:** Server Components by default, `"use client"` nur an der
  Wurzel einer interaktiven Ansicht. Eine Quelle je Look (`knopfKlassen`,
  `textlinkKlassen`), `clsx` ohne `tailwind-merge`, Größen über Props.
  Named Exports, Rest-Props aufs native Element, `type="button"`. Kein
  `new Date()` ohne Argument und kein `Date.now()` im Render (ein festes
  ISO-Datum formatieren, wie `lib/inhalte/datum.ts`, ist in Ordnung: das
  Ergebnis hängt nicht vom Zeitpunkt ab). Klassen nie von Hand sortieren (Prettier).
- **Env:** Werte nur in Funktionen lesen. `SITE_URL` und `NEXT_PUBLIC_*`
  sind Build-Zeit (Repository-Variablen). Vorlage aller Variablen:
  `.env.tpl`.
- **Commits:** imperativ, kleingeschrieben, Präfix mit Doppelpunkt, Warum
  im Betreff: `site:`, `ui:`, `build:`, `docs:`, `infra:`. Vor jedem Push die
  Prüfkette oben.
- **Deploy:** direkt auf `main` pushen, jeder Push deployt auf die
  Live-Seite `lucagreinecker.at` (seit 26.09.2026). Kein Staging: keine
  Zahlung, keine gespeicherten Kundendaten; deshalb vor jedem Push die
  volle Prüfkette samt E2E.
  Nach dem Deploy `curl` auf `/api/health`, `/robots.txt`, `/sitemap.xml`.

## Abschluss einer Etappe – was „fertig" heißt

Verbindlich, in dieser Reihenfolge (leitfaden/06):

1. **Umfang halten** – gebaut wird, was in `TODO.md` zur Etappe steht.
2. **Oberfläche nicht überladen** – je Seite eine Hauptaktion, vorhandene
   Bausteine, keine rohen Werte, jede Option mit Grund aus dem Alltag.
3. **Tests** für jede neue Regel und jeden Hauptfluss, dann Prüfkette und
   E2E.
4. **Oberfläche ansehen** – Screenshots in 390, 768 und 1440 px, selbst
   angesehen, in echten Zuständen; Mails als Text.
5. **Review** mit frischem Blick (`/code-review` oder Review-Agent, zuerst
   im Abschluss), Befunde beheben.
6. **Doku** – hier Stand, Struktur, Entscheidungen; `TODO.md`.
7. **Ausliefern und nachsehen** – Push nach der Regel oben, Ergebnisse
   aller CI-Jobs lesen (`gh run view <id> --json jobs`), Stichprobe nach
   dem Deploy. Kein Commit bleibt nur lokal.
8. **Bericht ohne Schönfärben** – was gebaut, getestet, angesehen wurde und
   was nicht.

## Design

**„Reihe", gewählt von Luca am 25.09.2026.** Runde 1: Typografie und
Farben der Richtung A „Schautafel" mit dem Aufbau der Richtung B „Vier
Handys"; Runde 2: Version 1 von drei („ist am coolsten"), der Satz oben im
Kickoff-Wortlaut. Entwürfe (Leinwand `index.html`, Artifact
`https://claude.ai/artifact/25576desS8jAzH66a8AtPe`) lagen bis zum
25.10.2026 in `docs/design/richtungen/`, seitdem nur noch im Tag
`entwuerfe-2026-09` (`git checkout entwuerfe-2026-09 -- docs/design`);
`ab.css`, `ab-start.html?v=1` und `ab-projekt.html?v=1` waren die Vorlage
für den Code.

- **Farben** (`app/globals.css`, Kontraste gemessen 25.09.2026): Papier
  `#f5f5f2` (grund), Tinte `#000000` (19,3:1), leise `#585856` (6,6:1),
  Fläche `#eeede9` (leise darauf 6,1:1), Zeilenlinie `#d6d6d2` (nur Deko),
  Rahmen `#7a7a76` (4,0:1), Gelb `#ffe600` (akzent; Tinte darauf 16,6:1,
  Hover `#f0d600`), Fehler `#b91c1c` (5,5:1). Gelb ist der Marker: nur als
  Fläche für die eine Hauptaktion je Seite (Knopf „Kontakt"), für den
  Hover auf Links (der Text wird dabei Tinte) und die Textauswahl.
  **Dunkel** (seit 28.10.2026, `@media screen and (prefers-color-scheme:
dark)` in `globals.css`, gemessen und von `app/globals.test.ts`
  geprüft): Grund `#141413`, Fläche `#1f1f1d`, Text Papier `#f5f5f2`
  (16,9:1), leise `#a9a9a4` (7,8:1), Zeilenlinie `#3a3a37`, Rahmen
  `#8c8c87` (5,5:1), Fehler `#f87171` (6,7:1); Gelb, Hover-Gelb und die
  Tinte darauf bleiben gleich (Gelb auf Grund 14,5:1). Kein Schalter, das
  System entscheidet; gedruckt bleibt es hell.
- **Schrift:** IBM Plex Sans variable (`app/fonts.ts`, `--font-plex`), eine
  Schrift für alles. Titel in Gewicht 500 (`font-medium`), Knöpfe 600,
  Text 400 in 17 px / 1,55. Das OG-Bild nimmt die statische WOFF in 500.
- **Skala:** `text-display` clamp(2.5rem, 7.2vw, 6.5rem) / 0,98 / −0,03em
  (der Satz oben, Seitentitel), `text-h2` clamp(1.75rem, 3.4vw, 3rem) /
  1,05, `text-h3` clamp(1.25rem, 1.8vw, 1.5rem) / 1,2. Radius 6 px für
  Knöpfe und Felder (`rounded-sm`), 16 px für Handy-Bilder (`rounded-bild`).
  Ziffern in Fakten tabellarisch (`zahlen`).
- **Linien statt Kästen:** Block-Linien in Tinte (`border-fg`: Kopf unten,
  Fuß oben, Fakten und Rechtstexte oben, `Spalte` oben), Zeilenlinien leise
  (`border-linie`). Keine Karten, keine Schatten, keine Farbverläufe.
- **Startseite** (Etappe 2): Kopf; der Satz mittig im Display-Schnitt
  (`seite.satz`), darunter ein Satz über Luca und der gelbe Knopf
  „Nachricht schreiben" (seit 28.10.2026 derselbe Wortlaut wie unten im
  Anfrage-Block; „Kontakt" heißt nur der Knopf im Kopf); die fünf
  Handy-Screens in einer Reihe (ab lg fünf Spalten, seit 29.10.2026) (am Handy Wischleiste mit Scroll-Snap, 76 %
  breit, darunter bis lg ein Strich je Projekt und „Wischen" mit Pfeil),
  je mit Name und einer Zeile; „Rundum-sorglos-Paket" (links Titel
  und Lucas Satz, rechts die Punkte als `Fakten`); die Anfrage mittig
  (Satz, zwei, drei Sätze über ihn, „Mail schreiben" gelb, „Kontakt
  speichern" als Textlink); Fuß.
- **Projektseite:** `SeitenKopf` mittig (Titel, Art-Zeile, Lucas Satz als
  Vorspann), dann das Handy-Bild links (max. 420 px, `rounded-bild`,
  Tinte-Linie) und rechts die `Fakten` (Kunde, Zeitraum, Seiten,
  Funktionen, Stack, Betrieb) mit dem gelben Knopf „‹domain› öffnen";
  darunter das Desktop-Bild in voller Breite mit Tinte-Linie; dann
  „Weitere Projekte" als Zeile mit den anderen Namen. Am Handy alles
  untereinander, das Handy-Bild 320 px mittig. Eigenes Vorschaubild
  (`opengraph-image.tsx` neben der Seite): Name, Art-Zeile, gelber Balken,
  rechts der Handy-Screenshot.
- **Über mich:** derselbe Aufbau wie die Projektseite: links das Porträt
  (max. 420 px), rechts die Sätze, die `Fakten` (am Handy untereinander)
  und die Knöpfe.
- **Fakten:** zwei Spalten (`handy="spalten"`, Projektfakten: Begriff
  leise, Wert in Tinte) oder am Handy Begriff über Wert
  (`handy="untereinander"`, Paket und Über mich: dort sind die Werte ganze
  Sätze).
- **Bilder:** echte Screenshots (Absatz unten), flach mit 1-px-Linie in
  Tinte; Handy-Bilder 16 px gerundet, Desktop-Bilder eckig. Keine
  Geräterahmen, keine Neigung, kein Anschnitt (ein halber Knopf am Rand
  sieht wie ein Fehler aus, Befund Runde 1). Der untere Rand der
  Screenshots läuft weich in Papier aus (`mask-b-from-82%` in
  `ProjektBild`, seit 28.10.2026): der erste Bildschirm endet sonst an
  einem harten Schnitt mitten in einem Knopf. Das ist eine Maske in der
  Transparenz, kein Farbverlauf. Lucas Porträt auf „Über mich"
  (`components/Portrait.tsx`) bekommt dieselbe Linie und denselben Radius,
  ohne Maske.
- **Knöpfe** (`Knopf`, `KnopfLink`): `voll` Gelb mit Tinte (Hauptaktion),
  `umriss` mit Rahmen (Nebenaktion), `text` Tinte unterstrichen; Größen sm
  44 / md 52 / lg 60 nur über `groesse`. Links (`Textlink`,
  `inlineLinkKlassen`, `zeilenLinkKlassen`) Tinte mit Unterstrich, der
  Hover legt Gelb dahinter. Fokusring 2 px Tinte, außen.
- **Kopf:** Name links, ab lg die Navigation, rechts der Sprachlink
  („English" bzw. „Deutsch", leise wie ein inaktiver Nav-Eintrag, ab sm)
  und der gelbe Knopf „Kontakt", Tinte-Linie darunter; am Handy Knopf und
  „Menü", der Sprachlink unter sm als letzter Menü-Eintrag. `NAVIGATION`
  führt die anderen Seiten (Etappe 2: Projekte, Paket, Über mich); Kontakt
  steht dann nur als Knopf, nicht doppelt im Menü.
- **Fuß:** Tinte-Linie, drei Spalten (Name, Ort und Sprachlink; Seiten;
  Kontakt mit Mail, „Kontakt speichern", Profile), darunter Impressum und
  Datenschutz an einer leisen Linie.
- **Bewegung:** nichts beim Laden, Hover nur Farbwechsel,
  `prefers-reduced-motion` gilt.
- **Verboten:** eine zweite Akzentfarbe, Gelb als Textfarbe, Weiß auf
  Gelb, Karten und Schatten, Farbverläufe, Geräterahmen, Großbuchstaben-
  Labels, Kursive als Akzent, Mono für Daten, Icons ohne Wort, Marken-Logos
  als Icons, eingebettete Karten, Videos oder Feeds, Sätze, die nicht von
  Luca sind.

Fest, unabhängig von der Richtung (Entscheidung 25.09.2026): Die
Projektbilder sind **echte Screenshots der Live-Seiten** (erster Bildschirm
in 390 × 844 und 1440 × 900, doppelte Auflösung), aufgenommen mit
`scripts/projekt-screenshots.mjs` und über `scripts/bilder.mjs` als
AVIF/WebP/JPEG in `public/bilder/`. Keine gestalteten Vorschaubilder, keine
Geräterahmen; ändert sich ein Projekt, wird das Bild neu aufgenommen.

Regeln, die unabhängig von der Richtung gelten (leitfaden/05):

- Handy und Desktop gleich wichtig: jede Seite in 390, 768 und 1440 px
  prüfen, bei Scroll-Leisten und Überlauf auch 1920.
- Kein verwaister Layout-Slot, keine Mini-Abschnitte, nichts doppelt, ein
  Abstand zwischen Blöcken (`pb-abschnitt`), gleich hohe Knöpfe
  nebeneinander, strukturierter Fuß.
- Praktische Handgriffe an jeder Adresse und jedem Kontakt: Karten-Knöpfe,
  vCard, Kalenderdatei, `tel:`, WhatsApp mit vorgetipptem Text.
- WCAG 2.2 AA: 44-px-Ziele, 16-px-Eingaben, sichtbarer Fokus, Sprunglink,
  `aria-disabled` mit Statuszeile, Live-Regionen dauerhaft im Baum.
- Keine eingebetteten Fremddienste (Karte, Video, Social) ohne bewusste
  Entscheidung (Datenschutz, CSP).

## Entscheidungen

- **25.09.2026 – Projekt aus dem Starter.** Stack und Konventionen aus der
  webprojekt-vorlage (Begründungen: leitfaden/02). Abweichungen folgen
  hier mit Datum und Grund.
- **25.09.2026 – Neubau im bestehenden Repo.** Historie und Name bleiben;
  die statische Seite ist als Branch `alt` und Tag `statisch-2026-09`
  gesichert, Pages baut bis zum Umzug aus `alt`. `docs/alt/projekt-notizen.md`
  sind Lucas Rohnotizen zu den Kundenprojekten (Faktenquelle).
- **25.09.2026 – Hosting auf Lucas eigenem Server** (dem punktetafel-Server,
  Hetzner, SETUP.md) statt eines eigenen VPS. Grund: eigene Seite, kein
  Kunde, im Betrieb 50–100 MB RAM; „ein Server je Kunde" (leitfaden/03)
  gilt hier nicht. Gebaut wird in GitHub Actions, auf dem Server nie.
- **25.09.2026 – Repo bleibt vorerst öffentlich.** GitHub Pages braucht im
  Free-Plan ein öffentliches Repo, und Pages liefert bis zum Umzug die alte
  Seite aus. Deshalb gilt doppelt: keine Secrets, keine UUIDs mit Token,
  keine Kundendaten im Repo. Nach dem Umzug entscheidet Luca über privat.
- **25.09.2026 – Umami und ntfy mitbenutzen.** Umami: bestehende Instanz
  `analytics.punktetafel.at` (nicht `analytics.laendle-isst.at`, wie
  ländle-isst `SETUP.md` noch sagt – der Eintrag zeigt ins Leere), eigene
  Website-ID (keine zweite Instanz auf demselben Server). ntfy:
  `ntfy.punktetafel.at`. Kontaktformular schickt an ntfy wie das
  punktetafel-Feedback (`punktetafel/app/api/feedback/route.ts`) statt per
  Mail: kein Versanddienst, keine DNS-Einträge für `mail.`, Luca bekommt die
  Anfrage als Push.
- **25.09.2026 – Projekte auf der Seite:** OZ Calisthenics nur in der neuen
  Version (Next.js, Umami, Buchung mit Stripe, Konto, Admin; Link auf
  `oz-calisthenics.at`, sobald OZ umgezogen ist) – die alte statische Seite
  mit Google Analytics und SuperSaaS geht vom Netz und kommt nicht vor.
  Dazu USTA Streetfood, punktetafel, Jonathan Walch.
  Nicht: NAD.KAH, ländle isst (geparkt), LEX/PRiME (intern bei Ball).
- **25.09.2026 – Texte:** Projektseiten zeigen Fakten aus den Repos als
  Listen (Funktionen, Stack, Zeitraum, gemessene Werte). Jeder Satz über
  Luca und die Projekte kommt von Luca (Stichworte, sein Wortlaut); Lücken
  als `[TEXT LUCA]`. Die Texte der alten Seite werden nicht übernommen,
  weil sie mehrmals mit KI überarbeitet wurden.
- **25.09.2026 – Design: Typografie und Farbe von A, Aufbau von B** (Luca,
  nach den zwei Richtungen). Hell, IBM Plex Sans, Schwarz auf Papier,
  Linien statt Kästen, Gelb `#ffe600` nur als Signal. Startseite: sein
  Satz, die vier Handy-Screens als Hero, Rundum-sorglos-Paket, Anfrage;
  Projektseite: Handy links, Fakten rechts, Desktop-Bild darunter. Welche
  der drei Versionen (Reihe, Kante, Gelbes Band) gebaut wird, entscheidet
  Luca; danach stehen die Regeln unter „Design".
- **25.09.2026 – Inhalt „Rundum-sorglos-Paket"** (Luca: „volles rundum
  sorglos paket … server setup / erstellung, umami reichweitenmessung immer
  dabei usw."). Die Startseite bekommt einen Block, was bei ihm dabei ist:
  Website, Server-Setup und Betrieb (Domain, DNS, Zertifikate, Mails),
  Umami immer, Updates und Backups, Rechtstexte vorbereitet. Die Punkte
  jenseits seiner Stichworte stammen aus dem Leitfaden und werden von ihm
  bestätigt; Sätze dazu nur von ihm (`[TEXT LUCA]`).
- **26.09.2026 – Kontaktformular per ntfy, keine Mails.** Umgesetzt wie am
  25.09. entschieden: `lib/anfrage/ntfy.ts` (Transporte konsole, memory,
  ntfy; Titel nur ASCII, `X-Click` öffnet die Antwortmail), Env
  `ANFRAGE_TRANSPORT`, `NTFY_URL`, `NTFY_TOKEN`. Der Mail-Stand des Starters
  (`lib/mail`, Scaleway, `MAIL_*`) ist raus; kommt je ein Mail-Anlass, aus
  der Vorlage zurückholen.
- **26.09.2026 – Übergangsadressen der Projekte.** OZ und USTA verlinken bis
  zu ihrem Domainumzug auf `neu.oz-calisthenics.at` bzw. die sslip.io-Adresse
  (`url` in `projekte.ts`), angezeigt wird die echte Domain (`domain`).
  Beim Go-live dieser Seite prüfen und umstellen (TODO.md, Etappe 3).
- **26.09.2026 – Texte von Claude, Fakten von Luca.** Luca wollte keine
  Platzhalter mehr („denk dir paar menschliche passende saubere texte
  aus"). Die Sätze sind aus belegten Fakten gebaut (Repos, alte Seite,
  Kickoff), kurz, Du-Form, ohne Floskeln; Luca liest gegen und ändert.
  Erfundene Motive oder Zahlen bleiben tabu (leitfaden/05, „Texte").
- **26.09.2026 – Kein Telefon, keine Anschrift auf der Seite, kein
  Gewerbe.** Kontaktwege sind Formular, Mail, vCard, LinkedIn; die
  Anschrift steht nur im Impressum (`IMPRESSUM` in statisch.ts). Das
  Impressum nennt „derzeit keine Gewerbeberechtigung"; ob das Paket-Angebot
  damit vereinbar ist, ist Prüfstelle 1 (TODO.md). Uptime Kuma braucht
  Luca nicht.
- **26.09.2026 – Zod nur am Server.** Das Formular (Client) las Feldnamen
  und Längen aus `lib/anfrage/schema.ts` und zog damit Zod in den
  Client-Bundle: 86 KB auf jeder Seite (auf der Startseite zu 100 %
  ungenutzt) und eine CSP-Verletzung, weil Zod 4 beim Laden per
  `Function("")` prüft, ob es JIT darf – die CSP hat in Produktion kein
  `'unsafe-eval'`, und das soll so bleiben. Deshalb `lib/anfrage/felder.ts`
  ohne Zod für den Client; `schema.ts` importiert und re-exportiert die
  Werte, damit Server und Tests eine Quelle behalten. Regel: kein Import
  aus `schema.ts` in `"use client"`-Dateien. Gleicher Befund in der
  Vorlage, dort zurückgetragen.
- **26.09.2026 – Renovate gegen `main`, ohne Auto-Merge.** Die Vorlage
  arbeitet gegen `staging` mit Auto-Merge dort; diese Seite hat kein
  Staging, jeder Merge auf `main` deployt. Deshalb `renovate.json` ohne
  `baseBranches`, wöchentliche Sammel-PR (Minor und Patch), Luca merged von
  Hand. Die Regel für `better-auth` und `stripe` ist raus, beides ist hier
  nicht drin.
- **26.09.2026 – Updates vorgezogen, zwei Majors zurückgehalten.** Nach
  einer Probe in einer Wegwerf-Kopie (TODO.md, Etappe 3): Sammel-Updates
  (u. a. `next` 16.3.6), TypeScript 6, Vitest 5, pnpm 12, GitHub Actions
  auf die Node-24-Versionen, Runner `ubuntu-26.04`. Nicht: ESLint 10
  (bricht `eslint-config-next` 16.3) und TypeScript 7 (bricht
  `typescript-eslint`); `renovate.json` hält beide mit `allowedVersions`
  zurück, bis die Peer-Angaben sie nennen. Dazu in `renovate.json`:
  `minimumReleaseAge` 3 Tage (pnpm verweigert seit 11 Versionen unter
  einem Tag, `minimumReleaseAgeStrict`; eine frischere Renovate-PR fiele
  in der CI durch) und Majors nur nach Freigabe im Dashboard. Mit pnpm 12
  startet Playwright den Server direkt (`./node_modules/.bin/next start`),
  sonst hängt der Teardown; das Dockerfile liest die pnpm-Version aus
  `packageManager`, statt sie doppelt zu führen.
- **26.09.2026 – Go-live jetzt, direkt auf `lucagreinecker.at` (Luca).**
  Nicht auf den OZ-Umzug warten (der wartet auf Stripe-Live und
  Rechtsprüfung, Wochen): OZ ohne „öffnen"-Knopf, USTA auf die umgezogene
  Domain. `neu.` fällt weg (Luca: „ohne neu, lucagreinecker.at will ich
  haben"), keine Weiterleitung von `neu.`. Die Rechtstexte gehen ohne
  WKO-Antwort online; Prüfstellen 1 (Gewerbe) und 4 (Hotmail) bleiben in
  TODO.md offen, Luca liest die Texte noch gegen. Ablauf in SETUP.md
  („Go-live") mit `scripts/golive.sh`.
- **26.09.2026 – OZ als „in Arbeit" an 3. Stelle** (Luca: „schreiben wir
  dazu, dass das noch in arbeit ist, release ende oktober, bis dahin ist
  alte version online … an 3. stelle nach punktetafel"). `stand` in
  `projekte.ts`: kurz als eigene Zeile unter der Karte auf der Startseite
  (Tinte statt leise, damit er sich abhebt), lang als Zeile „Stand" in den
  Fakten der Projektseite. Reihenfolge USTA, Punktetafel, OZ, Jonathan.
  Test: ein Projekt ohne Knopf braucht einen Stand-Hinweis.
- **07.10.2026 – Neuer Beruf: Data Analytics statt Lean Leader** (Luca:
  „ich bin nicht mehr lean leader", mit Ausschnitt aus LinkedIn). Seit
  Oktober 2026 Specialist, Data Analytics and Insights bei Ball, eine
  globale Rolle (Werkzeuge für Datenanalyse, Kennzahlen und
  Automatisierung in den Werken); November 2025 bis Oktober 2026
  Continuous Improvement / Lean Leader in Ludesch. Der Titel steht englisch
  wie bei Ball, in den Sätzen auf Deutsch umschrieben. Im JSON-LD
  `worksFor` Ball Corporation ohne Werk und Ort, weil LinkedIn für die neue
  Rolle nur „Hybrid" nennt.
- **07.10.2026 – OZ zuerst, Selseven erst nach dem Go-live** (Luca: „oz
  calisthenics ist neu online … neue reihenfolge dann: ozcalisthenics ->
  punktetafel -> usta streetfood -> jonathanwalch -> selseven"). OZ
  verlinkt auf `https://oz-calisthenics.at`, `stand` ist `null`. Selseven
  läuft noch nicht unter seiner Domain, und der erste Bildschirm auf `neu.`
  zeigt Selins Platzhalter; der Screenshot wäre genau dieser Bildschirm.
  Luca wählte deshalb, Selseven erst nach dessen Go-live ans Ende zu
  setzen (TODO.md, Etappe 3). Die Reihe bleibt bis dahin bei vier.
- **29.10.2026 – Selseven schon vor dem Go-live, mit Link auf `neu.`**
  (Luca: „können wir selseven auch mit einbauen, noch mit verlinken auf
  neu. und halt release november oder so"). Weicht von der Regel vom
  26.09.2026 ab (lieber kein Link als einer auf eine Übergangsadresse);
  bei OZ lief unter der Domain noch die alte Version, bei Selseven zeigt
  `neu.` die fertige Seite. `domain` ist der Host von `url`
  (`neu.selseven-friseursalon.at`), damit der Knopf nennt, was er öffnet;
  dazu ein `stand` trotz Knopf. Der lange Stand-Satz nennt keine Adresse:
  am Handy brach `neu.selseven‑friseursalon.at` mitten im Wort, und der
  Knopf darunter nennt sie ohnehin. Fünf Spalten ab lg statt einer
  zweiten Zeile oder der Wischleiste bis xl: bei 1024 px brechen die
  längeren Namen auf zwei Zeilen, das bleibt ruhig; `sizes` 18vw.
- **27.09.2026 – Wisch-Hinweis unter der Handy-Reihe** (Luca: am Handy
  „checkt" man nicht, dass man zu den anderen Projekten wischen muss; das
  angeschnittene nächste Handy reichte nicht). Unter lg zeigen vier kurze
  Striche, welche Projekte im Blick sind (Tinte, sonst `linie`; mehr als
  60 % sichtbar, per IntersectionObserver), rechts „Wischen" mit Pfeil, der
  am Ende der Reihe zurück zeigt (`components/Wischleiste.tsx`). Statisch
  statt Animation, weil beim Laden nichts sich bewegt (Design, „Bewegung");
  Striche statt Punkte, weil die Seite mit Linien arbeitet. Deko mit
  `aria-hidden`: Tastatur und Screenreader erreichen die Projekte über die
  Liste.
- **26.09.2026 – Nur das erste Handy-Bild lädt sofort, die drei anderen
  lazy – gemessen, nicht geraten.** Chrome (DevTools „Issues") meldete die
  Bilder 2–4 der Startseite als lazy im sichtbaren Bereich; ein Versuch mit
  allen vier `eager` (Commit 69c217e, live etwa 10:38–10:47) machte die
  Startseite am Handy langsamer: LCP 2,0 → 2,8 s, Leistung 99 → 96
  (Lighthouse, gedrosseltes 4G), weil die drei Bilder mit dem ersten um die
  Leitung konkurrieren;
  am Desktop änderte sich nichts (100). Deshalb zurück zu `zuerst` nur für
  das LCP-Bild (`fetchpriority=high`), Rest `loading="lazy"`; Chrome lädt
  lazy Bilder im Viewport ohnehin direkt nach dem Layout. Nach dem Rückbau
  am Handy 97 und 99 (LCP 2,64 und 2,17 s): das Rauschen im gedrosselten
  Lab liegt bei rund 0,5 s, die eager-Variante lag trotzdem am schlechten
  Ende, und der Mechanismus (Bandbreite teilen) spricht gegen sie. Der
  DevTools-Hinweis ist kein Grund, Lighthouse-Zahlen mit Wiederholung sind
  einer.
- **25.10.2026 – Mail über iCloud+ auf der eigenen Domain** (Luca richtet
  es ein, Adresse `mail@lucagreinecker.at`). Postfach statt
  Transaktionsmails: das Kontaktformular bleibt bei ntfy, die Seite
  verschickt nichts. iCloud+ hatte Luca schon (keine Zusatzkosten, Mail auf
  Mac und iPhone); DNS in der cloudpit-Verwaltung (Registrar dogado): MX `mx01`/`mx02.mail.icloud.com`, TXT
  `apple-domain=…`, SPF `v=spf1 include:icloud.com ~all`, DKIM-CNAME
  `sig1._domainkey`, dazu selbst DMARC – erst `p=none`, nach
  erfolgreichen Testmails noch am selben Tag `p=quarantine` (Luca). Datenschutz nach Apples Datenschutzrichtlinie:
  Verantwortlich Apple Distribution International Ltd. (Irland), Speicherung
  in der Regel bei Apple Inc. in den USA, Übermittlung über
  Standardvertragsklauseln (keine DPF-Zertifizierung genannt).
- **28.10.2026 – Englisch mit next-intl, Deutsch bleibt ohne Präfix**
  (Luca: „language switch zu englisch, habe auch leute aus ausland die
  von linkedin zb auf seite stossen. saubere menschliche übersetzungen").
  Aufbau nach leitfaden/15: `localePrefix: "as-needed"`, keine
  Spracherkennung, kein Cookie (stünde in der Datenschutzerklärung), die
  Sprachen stehen nur in `i18n/routing.ts`. Adressen übersetzt
  (`/en/about`, `/en/contact`, `/en/projects/<slug>`, `/en/legal-notice`,
  `/en/privacy`), weil englische Leser sie so erwarten; Projekt-Slugs
  gleich (Eigennamen). `alternateLinks` aus: Canonical, hreflang und
  Sitemap kommen aus `i18n/seo.ts`, damit die drei nie auseinanderlaufen
  (Stolperstein laendle-isst). Englisch britisch (`en-GB`, Texte mit
  programme, licence, travelling), OG-Locale `en_GB`.
- **28.10.2026 – Nachrichten als TypeScript statt JSON.** Die Vorlage
  nennt `messages/de.json`; hier sind es `messages/de.ts` und `en.ts`,
  weil die Sätze ihre Warum-Kommentare (Quelle, Datum, Lucas Wortlaut)
  behalten sollen und `en` als `Nachrichten` typisiert ist – fehlende
  oder überzählige Schlüssel fallen beim Typecheck auf, nicht erst im
  Test. `messages.test.ts` prüft, was der Typ nicht sieht (leere Texte,
  Punkte in Schlüsseln, Stand-Hinweis ohne Knopf, Länge der
  Meta-Beschreibungen). Die Texte je Projekt liegen unter `projekte`
  (Slug als Schlüssel), `lib/inhalte/projekte.ts` behält nur Slug, Name,
  Domain und Knopf-Ziel.
- **28.10.2026 – Keine Nachrichten im Browser, bis auf die Fehlerseite.**
  `NextIntlClientProvider` bekommt nur den Namespace `fehler` (für
  `app/[locale]/error.tsx`); der Provider ist trotzdem nötig, weil `Link`
  und `usePathname` aus `i18n/navigation` die Sprache daraus lesen.
  Client-Komponenten (KontaktFormular, MobilMenue, Wischleiste) bekommen
  ihre Wörter als Props vom Server. `KnopfLink` ist deshalb aus `Knopf.tsx`
  in eine eigene Datei gezogen: er braucht den Hinweis „öffnet in neuem
  Tab" je Sprache, der Button nicht – und Client-Dateien importieren nur
  den Button.
- **28.10.2026 – Formular-Fehler als Codes.** Zod meldet `nameMin`,
  `emailFormat` … (`lib/anfrage/felder.ts`), die Kontaktseite macht
  daraus Sätze in ihrer Sprache und gibt sie dem Formular als Props. So
  bleibt Zod sprachfrei und läuft weiter nur am Server. Das Formular
  schickt die Sprache als verstecktes Feld mit; die Push-Nachricht an Luca
  bleibt deutsch und sagt „englische Seite, auf Englisch antworten".
- **28.10.2026 – Rechtstexte auf Englisch als Übersetzung, Deutsch
  verbindlich.** Impressum („Legal notice") und Datenschutz („Privacy")
  sind übersetzt, mit dem Satz unter dem Titel, dass die deutsche Fassung
  die verbindliche ist (Link dorthin). Die Prüfstellen 1 und 4 (TODO.md)
  gelten für beide Fassungen. Das Datum des Stands steht als ISO in
  `IMPRESSUM.stand`, `lib/inhalte/datum.ts` schreibt es je Sprache.
- **28.10.2026 – Sprachlink im Kopf ab sm, darunter im Menü.** Bei 360
  und 390 px passt „English" nicht mehr neben Name, „Kontakt" und „Menü",
  ohne dass der Name umbricht; deshalb unter sm als letzter Eintrag im
  Menü (dort groß wie die anderen Einträge) und immer im Fuß. Wortlaut
  „English"/„Deutsch" statt „EN"/„DE": Wörter statt Kürzel in
  Großbuchstaben (Design, „Verboten"), jeweils in der Zielsprache mit
  `lang`-Attribut.
- **28.10.2026 – Dunkelmodus nach Systemeinstellung, als Ausnahme vom
  Leitfaden** (Luca, 26.09.2026: „benutzerfreundlich, je nach
  Systemeinstellung voreingestellt"; 28.10.2026: „ja dann mach das"). Der
  Leitfaden sagt „ein Theme, nicht beides" (leitfaden/05); hier bewusst
  beides, weil es Lucas eigene Seite ist und Besucher von LinkedIn oft im
  Dunkelmodus kommen. Umsetzung ohne Klassenänderung: die Utilities
  verweisen auf die Farbvariablen aus `@theme`, ein Block unter `@media
screen and (prefers-color-scheme: dark)` tauscht die Werte. Kein
  Schalter: er bräuchte einen Speicher im Browser und Platz im Kopf, der am
  Handy voll ist. Drei Dinge brauchten mehr als Werte: beim Link-Hover wird
  der Text Tinte (`hover:text-auf-akzent` in den drei Link-Klassen; Papier
  auf Gelb hätte 1,2:1), das Fehlerrot ist im Dunkeln `#f87171` (das helle
  `#b91c1c` hätte 2,8:1), und `theme-color` steht je Schema. Der
  Fokusring braucht nichts: er liegt mit 2 px Abstand außerhalb, also auf
  dem Grund, nie auf Gelb. Gedruckt bleibt die Seite hell (`screen` im
  Media-Query, Druckregeln unverändert). Die Vorschaubilder bleiben hell.
  Gelb auf Papier hat 1,1:1 und braucht keine Grenze: der Knopf lebt von
  Tinte-Text und Form, `globals.test.ts` prüft deshalb Text, Rahmen und
  Fehler, nicht die Gelb-Fläche.
