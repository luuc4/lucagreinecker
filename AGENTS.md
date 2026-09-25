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
  **Luca hat noch nicht gewählt**; die Design-Fragen (Fragebogen D) stehen
  auf der Leinwand. Bis zur Wahl bleibt das Platzhalter-Design im Code.
  CI grün, aber der Coolify-Deploy dieses Stands ist fehlgeschlagen
  (IPv6-Gateway, TODO.md „Luca – Server"); `neu.` läuft weiter mit dem
  Image von Etappe 0, sichtbar ist kein Unterschied.

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
app/                  Routen. (site) öffentlich mit Kopf, Fuß, Umami; api/ nur für
                      Fremdaufrufer und Nicht-HTML (health, kontakt.vcf)
app/globals.css       Design-Tokens (@theme), Grundregeln, Utilities inhalt/zahlen
app/sitemap.ts        öffentliche Routen – neue Seiten hier eintragen (E2E liest sie)
components/           KontaktFormular, formular/Feld (Feld, Textbereich), Knopf/KnopfLink,
                      Textlink, Icon, Kopf, MobilMenue, Fuss,
                      Abschnitt (SeitenKopf, Abschnitt, Spalten, Spalte), KartenKnoepfe,
                      Rechtstext, SeitenFokus, Analytics, JsonLd
lib/inhalte/statisch.ts  alle Texte und Fakten, Navigation, PLATZHALTER, KONTAKTFORMULAR (an/aus)
lib/anfrage/          Kontaktformular: schema (Zod, Honeypot), drossel (im Prozess), vorlage
                      (Mail an den Betreiber), actions (Server Action)
lib/mail/             senden (Transporte konsole/memory/scaleway), allowlist
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

Noch Platzhalter-Design (neutral, hell). Zwei Richtungen liegen seit dem
25.09.2026 in `docs/design/richtungen/` (Leinwand `index.html`; Tokens,
Schrift und Kontraste stehen als Kommentar in jedem Entwurf). ‹Nach der
Wahl der Richtung (leitfaden/01, Phase 4) hier festhalten: Richtung und
Datum, Farben mit Kontrastwerten, Schrift, Skala, Bildbehandlung, was
verboten ist.›

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
