# Luca Greinecker

Lucas eigene Website. Luca Greinecker aus Bludenz baut Websites und
Web-Apps für Leute und Betriebe in Vorarlberg; hauptberuflich ist er
Lean Leader bei Ball in Ludesch. Die Seite zeigt vor allem seine
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

## Projekt

| Was         | Wert                                                              |
| ----------- | ----------------------------------------------------------------- |
| Kunde       | Luca selbst (Privatperson; Gewerbe für Webprojekte: ‹klären›)     |
| Domain      | `lucagreinecker.at`, Prod bis zum Go-live `neu.lucagreinecker.at` |
| Projekttyp  | einfach (leitfaden/12): Portfolio, Inhalte im Code                |
| Seiten      | Start, je Projekt eine Seite, Über mich, Kontakt, Impressum, DSE  |
| Funktionen  | Kontaktformular → ntfy (Push an Luca), vCard, Mail-Link           |
| Sprache     | Du, locker und regional wie Luca selbst schreibt                  |
| Platzhalter | `[TEXT LUCA]` (`lib/inhalte/statisch.ts`, `PLATZHALTER`)          |
| Sperrzeiten | keine                                                             |

## Stack

Next.js 16 (App Router, `output: "standalone"`), React 19, TypeScript
strict mit `noUncheckedIndexedAccess`, Tailwind 4 CSS-first (`@theme` in
`app/globals.css`), pnpm 11, Node 24, Vitest (`unit`, `ui`), Playwright
mit axe, ESLint 9, Prettier. Build in GitHub Actions → GHCR, Coolify zieht
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
open docs/design/richtungen/index.html        # die zwei Design-Richtungen ansehen
```

## Struktur

```
app/                  Routen. (site) öffentlich mit Kopf, Fuß, Umami: Start, projekte/[slug],
                      ueber-mich, kontakt, impressum, datenschutz; api/ nur für Fremdaufrufer
                      und Nicht-HTML (health, kontakt.vcf, test/anfragen nur mit memory)
app/globals.css       Design-Tokens (@theme), Grundregeln, Utilities inhalt/zahlen
app/sitemap.ts        öffentliche Routen – neue Seiten hier eintragen (E2E liest sie)
components/           KontaktFormular, formular/Feld (Feld, Textbereich), Knopf/KnopfLink,
                      Textlink, Icon, Kopf, MobilMenue, Fuss,
                      Abschnitt (SeitenKopf, Abschnitt, Spalten, Spalte, Fakten), KartenKnoepfe,
                      Rechtstext, SeitenFokus, Analytics, JsonLd, ProjektBild (<picture> aus
                      public/bilder)
lib/inhalte/statisch.ts  Texte und Fakten (SEITE, KONTAKT, PAKET, UEBER_MICH), Navigation,
                      PLATZHALTER, KONTAKTFORMULAR (an/aus)
lib/inhalte/projekte.ts  die vier Projekte: Fakten, Adressen, Lucas Sätze (null = Platzhalter)
lib/anfrage/          Kontaktformular: schema (Zod, Honeypot), drossel (im Prozess), vorlage
                      (Push-Text), ntfy (Transporte konsole/memory/ntfy), actions (Server Action)
lib/env.ts            Zod-Schema aller Laufzeit-Variablen; lib/betrieb/start.ts prüft beim Start
lib/kontakt/          vCard, Kalenderdatei (Serien, Einzeltermine), Links (tel, mail,
                      WhatsApp, Google Maps, Apple Karten) – rein und getestet
lib/site.ts           SITE_URL, OEFFENTLICHE_HOSTS (nur die werden indexiert)
e2e/                  seiten (Rauchtest, Überlauf), a11y (axe, 390/1440), platzhalter,
                      kontaktformular
scripts/              screenshots.mjs, bilder.mjs (Varianten ohne Metadaten), server-einrichten.sh,
                      projekt-screenshots.mjs (Startseiten der Projekte in 390 und 1440 px → public/bilder)
public/bilder/        projekt-<slug>-handy-{390,780} und -desktop-{720,1200,1800} als AVIF/WebP/JPEG
docs/design/richtungen/  Design-Richtungen A und B (index.html = Leinwand, a-*/b-* = Entwürfe), Archiv
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
  Minus.
- **Komponenten:** Server Components by default, `"use client"` nur an der
  Wurzel einer interaktiven Ansicht. Eine Quelle je Look (`knopfKlassen`,
  `textlinkKlassen`), `clsx` ohne `tailwind-merge`, Größen über Props.
  Named Exports, Rest-Props aufs native Element, `type="button"`. Kein
  `new Date()` im Render. Klassen nie von Hand sortieren (Prettier).
- **Env:** Werte nur in Funktionen lesen. `SITE_URL` und `NEXT_PUBLIC_*`
  sind Build-Zeit (Repository-Variablen). Vorlage aller Variablen:
  `.env.tpl`.
- **Commits:** imperativ, kleingeschrieben, Präfix mit Doppelpunkt, Warum
  im Betreff: `site:`, `ui:`, `build:`, `docs:`, `infra:`. Vor jedem Push die
  Prüfkette oben.
- **Deploy:** direkt auf `main` pushen, jeder Push deployt. Bis zum
  Umzug landet das nur auf `neu.lucagreinecker.at` (noindex). Kein
  Staging: keine Zahlung, keine gespeicherten Kundendaten.
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
Kickoff-Wortlaut. Entwürfe in `docs/design/richtungen/` (Leinwand
`index.html`, Artifact `https://claude.ai/artifact/25576desS8jAzH66a8AtPe`);
`ab.css`, `ab-start.html?v=1` und `ab-projekt.html?v=1` sind die Vorlage
für den Code.

- **Farben** (`app/globals.css`, Kontraste gemessen 25.09.2026): Papier
  `#f5f5f2` (grund), Tinte `#000000` (19,3:1), leise `#585856` (6,6:1),
  Fläche `#eeede9` (leise darauf 6,1:1), Zeilenlinie `#d6d6d2` (nur Deko),
  Rahmen `#7a7a76` (4,0:1), Gelb `#ffe600` (akzent; Tinte darauf 16,6:1,
  Hover `#f0d600`), Fehler `#b91c1c` (5,5:1). Gelb ist der Marker: nur als
  Fläche für die eine Hauptaktion je Seite (Knopf „Kontakt"), für den
  Hover auf Links und die Textauswahl.
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
  (`SEITE.satz`), darunter ein Satz über Luca und der gelbe Knopf; die vier
  Handy-Screens in einer Reihe (am Handy Wischleiste mit Scroll-Snap, 76 %
  breit), je mit Name und einer Zeile; „Rundum-sorglos-Paket" (links Titel
  und Lucas Satz, rechts die Punkte als `Fakten`); die Anfrage mittig
  (Satz, zwei, drei Sätze über ihn, „Mail schreiben" gelb, „Kontakt
  speichern" als Textlink); Fuß.
- **Projektseite:** `SeitenKopf` mittig (Titel, Art-Zeile, Lucas Satz als
  Vorspann), dann das Handy-Bild links (max. 420 px, `rounded-bild`,
  Tinte-Linie) und rechts die `Fakten` (Kunde, Zeitraum, Seiten,
  Funktionen, Stack, Betrieb) mit dem gelben Knopf „‹domain› öffnen";
  darunter das Desktop-Bild in voller Breite mit Tinte-Linie; dann
  „Weitere Projekte" als Zeile mit den drei anderen Namen. Am Handy alles
  untereinander, das Handy-Bild 320 px mittig.
- **Bilder:** echte Screenshots (Absatz unten), flach mit 1-px-Linie in
  Tinte; Handy-Bilder 16 px gerundet, Desktop-Bilder eckig. Keine
  Geräterahmen, keine Neigung, kein Anschnitt (ein halber Knopf am Rand
  sieht wie ein Fehler aus, Befund Runde 1).
- **Knöpfe** (`Knopf`, `KnopfLink`): `voll` Gelb mit Tinte (Hauptaktion),
  `umriss` mit Rahmen (Nebenaktion), `text` Tinte unterstrichen; Größen sm
  44 / md 52 / lg 60 nur über `groesse`. Links (`Textlink`,
  `inlineLinkKlassen`, `zeilenLinkKlassen`) Tinte mit Unterstrich, der
  Hover legt Gelb dahinter. Fokusring 2 px Tinte, außen.
- **Kopf:** Name links, ab lg die Navigation, rechts der gelbe Knopf
  „Kontakt", Tinte-Linie darunter; am Handy Knopf und „Menü". `NAVIGATION`
  führt die anderen Seiten (Etappe 2: Projekte, Paket, Über mich); Kontakt
  steht dann nur als Knopf, nicht doppelt im Menü.
- **Fuß:** Tinte-Linie, drei Spalten (Name und Ort, Seiten, Kontakt mit
  Mail, „Kontakt speichern", Profile), darunter Impressum und Datenschutz
  an einer leisen Linie.
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
