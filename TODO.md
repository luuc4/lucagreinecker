# Backlog

Die eine Liste für dieses Projekt, chronologisch nach Etappen. Jeder Punkt
steht einmal. Neue Aufgaben, Ideen und Befunde immer hier eintragen, nie
nur im Chat.

## Stand (25.09.2026)

Etappe 0 erledigt: Starter im bestehenden Repo, alte Seite auf Branch
`alt` (Pages baut von dort), Doku aus dem Kickoff, CI, `scripts/infra.sh`;
`https://neu.lucagreinecker.at` zeigt die Platzhalterseite (health ok,
robots sperrt, noindex, CSP und HSTS da). Offen: Umami, ntfy, Renovate.

Etappe 1 abgeschlossen (25.09.2026): zwei Richtungen, Lucas Wahl (Design
von A, Aufbau von B, dazu der Inhalt „Rundum-sorglos-Paket"), drei
Versionen, Wahl Version 1 „Reihe" mit dem Kickoff-Wortlaut; Tokens,
Schrift und Bausteine im Code (AGENTS.md „Design"). Entwürfe in
`docs/design/richtungen/` (Artifact
`https://claude.ai/artifact/25576desS8jAzH66a8AtPe`), echte Screenshots der
vier Projekte in `public/bilder/`. Der Deploy läuft seit Lucas
Docker-Neustart wieder; `neu.` zeigt den jeweils letzten Push.

Etappe 2 abgeschlossen (26.09.2026): Startseite mit den vier Handys und
dem Paket, Projektseiten, Über mich, Kontaktformular per ntfy, Redirects,
JSON-LD. `neu.lucagreinecker.at` zeigt den Stand. Alle Sätze sind noch
`[TEXT LUCA]`.

Etappe 3, Teil 1 erledigt (26.09.2026): alle Texte stehen (von Claude aus
den Fakten geschrieben, Luca liest gegen), Impressum und Datenschutz als
Entwurf, Platzhalter-Liste leer, Umami und ntfy laufen. `neu.` zeigt die
komplette Seite.

Etappe 3, Teil 2 erledigt (26.09.2026): Prüfstelle 5 (Umami) am Quellcode
von 3.0.3 geprüft und der Absatz präzisiert, Prüfstelle 4 (Microsoft)
konkretisiert; Lighthouse gemessen (Werte in Etappe 3) und den Befund
behoben (Zod aus dem Client-Bundle samt CSP-Verletzung); ein Versuch mit
eager geladenen Hero-Bildern nach der Nachmessung zurückgenommen;
`renovate.json` auf dieses Repo umgestellt;
`scripts/server-fakten.sh` für die Prüfstellen 2 und 3 liegt bereit.

**Nächste Sitzung zuerst:** Lucas Zuarbeit einarbeiten (unten, „Luca –
Etappe 3"): Rückmeldung zu den Texten, Ausgabe von
`scripts/server-fakten.sh` in die Absätze „Server-Protokolle" und
„Kontaktformular" der Datenschutzerklärung, WKO-Antworten zu 1 und 4,
Zustimmungen; Lighthouse auf `neu.` nachmessen (Kontakt Best Practices,
LCP). Der Domainumzug nach SETUP.md „Go-live" erst danach und nach dem
OZ-Umzug (frühestens nach dem 03.10.2026): Übergangsadressen in
`projekte.ts` umstellen, Screenshots neu aufnehmen (dabei die Varianten 560
und 1440 px ergänzen, Etappe 3), `SITE_URL_MAIN` auf
`https://lucagreinecker.at`, DNS, Search Console.

Faktenquellen für die Projektseiten (nur Fakten übernehmen, Sätze kommen
von Luca). OZ nur in der neuen Version: Die alte statische OZ-Seite (Google
Analytics, SuperSaaS, Formspree) geht vom Netz; was die alte
lucagreinecker-Seite und `docs/alt/projekt-notizen.md` dazu sagen, gilt
nicht mehr.

| Projekt         | Quelle                                                                        | Live                                                                                                              |
| --------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| OZ Calisthenics | `~/projects/ozcalisthenics` (AGENTS.md „Stand", `docs/konzept/`)              | `https://neu.oz-calisthenics.at`, nach dem OZ-Umzug (frühestens nach dem 03.10.2026) `https://oz-calisthenics.at` |
| USTA Streetfood | `~/projects/usta-streetfood` (AGENTS.md „Stand")                              | Übergangsadresse, Domain `ustastreetfood.com` im Umzug                                                            |
| punktetafel     | `~/projects/punktetafel` (AGENTS.md)                                          | `https://punktetafel.at`                                                                                          |
| Jonathan Walch  | `docs/alt/projekt-notizen.md`                                                 | `https://jonathanwalch.at`                                                                                        |
| Werdegang       | alte Startseite (Tag `statisch-2026-09`, `index.html`, Abschnitt „Über mich") | –                                                                                                                 |

## Nächste Etappen

Jede Etappe passt in eine Sitzung und endet mit Commit, Deploy und Bericht
(AGENTS.md, „Abschluss einer Etappe").

### Etappe 0 – Fundament

- [x] Fragebogen durchgegangen, Antworten in AGENTS.md und SETUP.md
- [x] Starter im Repo `luuc4/lucagreinecker`, alte Seite auf `alt`, CI
- [x] `neu.lucagreinecker.at` zeigt die Platzhalterseite (noindex)
- [x] Umami: Website in `analytics.punktetafel.at`, ID in secrets.env,
      Rebuild (26.09.2026, Script auf `neu.` geladen, CSP passt)
- [x] Renovate: Konfiguration für dieses Repo (26.09.2026); die App
      installiert Luca (Etappe 3)

### Etappe 1 – Design (mit Fable)

- [x] Offene Design-Fragen (leitfaden/fragebogen.md, Teil D) gestellt,
      als „Was du entscheidest" auf der Leinwand; Antworten offen
- [x] Zwei Richtungen als Entwurf (Start und Projektseite OZ, Handy und
      Desktop): A „Schautafel", B „Vier Handys"
- [x] Luca wählt: Design und Schrift von A, Aufbau von B (25.09.2026)
- [x] Drei Versionen der Kombination: 1 „Reihe", 2 „Kante", 3 „Gelbes
      Band" (`ab.css`, `ab-start.html?v=`, `ab-projekt.html`)
- [x] Luca wählt Version 1 „Reihe", Satz oben im Kickoff-Wortlaut
      (25.09.2026)
- [x] Regeln in AGENTS.md („Design"), Tokens, IBM Plex Sans, Kopf, Fuß,
      Knöpfe, Links, Felder, Fakten-Tabelle, OG-Bild, Icon
- [x] Echte Screenshots der Projekte in 390 und 1440 px
      (`scripts/projekt-screenshots.mjs` gegen die Live-Adressen, Varianten
      über `scripts/bilder.mjs` in `public/bilder/`); OZ und USTA nach ihrem
      Domainumzug neu aufnehmen (Adressen im Script)

### Etappe 2 – Seiten und Inhalte (mit Fable)

- [x] `lib/inhalte/projekte.ts`: die vier Projekte als Daten, Fakten wie in
      den Entwürfen; OZ und USTA mit Übergangsadresse (26.09.2026)
- [x] Startseite nach `ab-start.html?v=1`: Satz, die vier Handys als
      Wischleiste, „Rundum-sorglos-Paket" als `Fakten`, Anfrage-Block
- [x] `NAVIGATION`: Projekte, Paket, Über mich; Kontakt nur als Knopf
- [x] Eine Seite je Projekt (`/projekte/<slug>`) nach `ab-projekt.html?v=1`
- [x] Über mich: Werdegang als Fakten, Sätze offen
- [x] Kontakt: Formular an ntfy statt Mail, `lib/mail/` und MAIL_* entfernt
- [x] SEO: Beschreibungen, OG-Bild, JSON-LD `Person`, Redirects
      `/index.html`, `/impressum.html`, `/datenschutz.html`
- [x] Screenshots 360/390/768/1440 angesehen, axe grün
- [x] Lighthouse gemessen (26.09.2026, Werte in Etappe 3)
- [x] Texte an allen Stellen (26.09.2026, von Claude aus den Fakten; das
      Gegenlesen steht in Etappe 3)
- [x] ntfy scharf (26.09.2026): Zugang vom punktetafel-Feedback übernommen,
      `ANFRAGE_TRANSPORT=ntfy` in Coolify, Testanfrage über `/kontakt` mit
      Bestätigung, Push am Handy angekommen (Luca)

### Etappe 3 – Recht und Umzug

- [x] Texte für alle Stellen (26.09.2026, von Claude aus den Fakten, Luca
      liest gegen): Satz über Luca, Paket, Anfrage, Über mich, je Projekt
- [x] Impressum und Datenschutz als Entwurf (Hetzner Nürnberg,
      Server-Protokolle, Umami, ntfy, Hotmail, vCard, Links, Rechte, DSB)
- [x] Platzhalter-Liste leer (`PLATZHALTER_STRENG=1` grün)
- [ ] Luca liest alle Texte gegen und ändert, was nicht nach ihm klingt
      (`lib/inhalte/statisch.ts`: START, PAKET, UEBER_MICH;
      `lib/inhalte/projekte.ts`: `satz`)
- [ ] Prüfstellen der Rechtstexte (Stand 26.09.2026; nicht auf der Seite):
  1. **WKO/Anwalt:** Angebot „Rundum-sorglos-Paket" ohne
     Gewerbeberechtigung – ist die Seite damit ein kommerzieller Dienst
     (§ 5 ECG), reicht das Impressum, braucht es ein Gewerbe?
  2. **Server-Fakten:** Server-Protokolle – Docker-Log-Rotation
     (`daemon.json`), Traefik-Access-Log an oder aus, journald; danach
     „nach kurzer Zeit" im Absatz „Hosting und Server-Protokolle" durch die
     Frist ersetzen (oder den Absatz kürzen, wenn Traefik gar kein
     Access-Log schreibt). Ausgabe: `scripts/server-fakten.sh` (Zuarbeit).
  3. **Server-Fakten:** ntfy `cache-duration` (Standard 12 h) und Version;
     „hält sie kurz zum Zustellen vor" im Absatz „Kontaktformular" durch die
     Frist ersetzen. Ausgabe: `scripts/server-fakten.sh`.
  4. **WKO/Anwalt:** Antwort per Hotmail. Der Absatz nennt seit dem
     26.09.2026 Microsoft Ireland Operations Ltd. als Vertragspartner, die
     Verarbeitung in den USA und die Zertifizierung nach dem EU‑US Data
     Privacy Framework – reicht das als Hinweis auf die Drittland-
     übermittlung (Art. 13 Abs. 1 lit. f DSGVO)?
  5. ~~Umami~~ erledigt 26.09.2026: gegen den Quellcode von Umami 3.0.3
     geprüft (Version laut `docker ps`): Tabelle `session` hat keine
     IP-Spalte (browser, os, device, screen, language, country, region,
     city, distinct_id, created_at); Sitzungs-ID = UUID v5 aus Website, IP,
     Browserkennung und einem Salt, der monatlich wechselt
     (`src/app/api/send/route.ts`); Land/Region/Stadt aus der
     MaxMind-Datenbank im Image, kein Fremdaufruf; `data-do-not-track` wird
     vom Tracker ausgewertet (`src/tracker/index.js`, im Live-Script
     enthalten); Datenbank-Container auf demselben Server. Absatz danach
     neu geschrieben. `scripts/server-fakten.sh` zeigt die Spalten der
     laufenden Datenbank zur Bestätigung.
  6. **Zustimmung:** Impressum „mit Zustimmung der jeweiligen Betreiber"
     stimmt erst, wenn Olcay, Akin und Jonathan zugesagt haben (Zuarbeit).
- [x] Renovate läuft (26.09.2026, 11:39: Issue #7 „Dependency Dashboard").
      App von Luca freigegeben, danach stand das Repo im Mend-Portal auf
      „Silent" (kein Dashboard, keine PR); Luca stellte es auf „Interactive"
      (leitfaden/04, „Renovate"). `renovate.json`: Base `main`, kein
      Auto-Merge, `renovate-config-validator --strict` grün. Am Montag,
      28.09.2026, vor 6 Uhr kommen die Sammel-PR „wöchentliche Updates"
      (u. a. `next` 16.3.6) und je eine PR pro Major-Update (ESLint 10,
      TypeScript 7, Vitest 5, pnpm 12, GitHub Actions, Ubuntu-Runner 26.04),
      dazu Lock-File-Pflege (Liste „Awaiting Schedule" im Dashboard)
- [x] Updates vorgezogen (26.09.2026, statt der Renovate-PRs vom 28.09.):
      Sammel-Updates, TypeScript 6, Vitest 5, pnpm 12 mit direktem
      `next start` in Playwright, GitHub Actions, Runner `ubuntu-26.04`;
      ESLint 10 und TypeScript 7 per `renovate.json` zurückgehalten (AGENTS.md,
      Entscheidungen). Grundlage war die Probe in einer Wegwerf-Kopie (git
      worktree), jedes Major einzeln und kombiniert:

      | Update                           | Ergebnis                                                                                                                                                                                                                                              |
      | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
      | Sammelgruppe (next 16.3.6 u. a.) | alles grün, auch Prettier 3.9.9 ohne Formatänderung                                                                                                                                                                                                   |
      | ESLint 10 (10.11.0)              | **nicht nehmen.** Lint stürzt ab: `eslint-plugin-react` 7.37.5 (aus `eslint-config-next` 16.3.6) ruft `context.getFilename()`, das ESLint 10 entfernt hat. Mit fester React-Version in den Settings läuft es, aber react, import und jsx-a11y erlauben laut Peer-Angaben nur ESLint ≤ 9 |
      | TypeScript 7 (7.0.2)             | **nicht nehmen.** Typecheck und Build grün, Lint bricht ab: „typescript-eslint does not support TS 7.0" (8.70.1 erlaubt TypeScript < 6.1); TS 7 hat keine klassische JS-API mehr                                                                    |
      | TypeScript 6 (6.0.3)             | alles grün – der sinnvolle Schritt statt 7                                                                                                                                                                                                            |
      | Vitest 5 (5.0.2)                 | alle 25 Tests grün, keine Änderung nötig                                                                                                                                                                                                              |
      | pnpm 12 (12.6.0)                 | Install, Lint, Tests, Build grün, aber **E2E hängt**: Playwright startet den Server mit `pnpm start`, pnpm 12 legt Next in eine eigene Prozessgruppe, das Beenden erreicht ihn nicht → „Timed out waiting … for the teardown". Mit `./node_modules/.bin/next start` im `webServer` von `playwright.config.ts` 3 s statt Hänger |
      | Kombination Sammel + TS 6 + Vitest 5 + pnpm 12, ESLint 9 | Prüfkette grün, keine Peer-Konflikte, 14 E2E grün – bis auf den pnpm-12-Hänger                                                                                                                                                            |
      | GitHub Actions (checkout 7, setup-node 7, cache 6, upload-artifact 7, docker/* neu) | laut Release-Notes vor allem Node-24-Laufzeit; unsere Inputs sind nicht betroffen; die CI der Renovate-PR zeigt es                                                                                             |
      | Ubuntu-Runner 26.04              | nicht lokal prüfbar; die CI der PR entscheidet (Playwright-Abhängigkeiten)                                                                                                                                                                             |

- [ ] ESLint 10 und TypeScript 7 freigeben, sobald `eslint-config-next`
      bzw. `typescript-eslint` sie in den Peer-Angaben nennen
      (`npm view eslint-config-next peerDependencies dependencies`, `npm view
typescript-eslint peerDependencies`); dann `allowedVersions` in
      `renovate.json` entfernen und die Probe wiederholen

- [x] Lighthouse gemessen (26.09.2026, Lighthouse 12 headless gegen `neu.`,
      alle neun Seiten, Handy und Desktop). Leistung 97–100 (Handy: Start
      99, OZ 97, Rest 100; Desktop überall 100), Barrierefreiheit 100,
      Best Practices 100 (Kontakt 96), SEO 66–69. SEO unter 100 nur wegen
      `is-crawlable` (noindex und robots auf `neu.`), fällt mit dem Go-live
      weg. Kontakt 96: CSP-Verletzung durch Zods `Function("")` im
      Client-Bundle – behoben (`lib/anfrage/felder.ts`). LCP Handy: Start
      2,0 s, OZ 2,6 s (das Handy-Bild), übrige 1,1–1,9 s; Desktop 0,3–0,8 s;
      CLS überall 0. Übrige Hinweise: `uses-responsive-images` (Handy-Bild
      780 px bei rund 550 px Bedarf, Desktop-Bild 1800 px bei 1350 px
      Bedarf, je 30–60 KB AVIF) und der Next-Polyfill-Chunk (86 KB,
      `noModule`, moderne Browser laden ihn nicht aus).
- [x] Lighthouse nach dem Deploy vom 26.09.2026 nachgemessen: Kontakt Best
      Practices 100 (Handy und Desktop, keine CSP-Meldung mehr), OZ am Handy
      99 mit LCP 2,05 s (vorher 2,6 s). Der Versuch, die Handy-Bilder 2–4 der
      Startseite eager zu laden, kostete am Handy LCP 2,0 → 2,8 s und
      Leistung 99 → 96 → zurückgenommen (AGENTS.md, Entscheidungen). Nach
      dem Rückbau (live etwa 10:47) Startseite am Handy in zwei Läufen 97 und
      99 mit LCP 2,64 s und 2,17 s, Desktop 100 mit 0,79 s: das Lab-Rauschen
      am gedrosselten Handy liegt bei rund 0,5 s, die eager-Variante lag am
      schlechten Ende. Das LCP-Bild ist das erste Handy-Bild (780 px, 43–71
      KB AVIF); die 560-px-Variante bei der Neuaufnahme (unten) ist der
      nächste Hebel
- [x] Screenshots neu aufgenommen (26.09.2026, Luca: USTA hat eine neue
      Startseite): alle vier Projekte, nur USTA hat sich sichtbar geändert.
      Dabei die Varianten 560 px (Handy) und 1440 px (Desktop) ergänzt
      (`scripts/projekt-screenshots.mjs`, `ProjektBild` `VARIANTEN`) –
      Lighthouse-Befund `uses-responsive-images`, siehe oben. Nach den
      Domainumzügen von OZ und USTA noch einmal aufnehmen (Adressen im
      Script)
- [ ] Domainumzug nach SETUP.md („Go-live"), Search Console – erst nach
      Prüfung der Rechtstexte, Zustimmungen und OZ-Umzug (Übergangsadressen
      in `projekte.ts` umstellen, Screenshots neu aufnehmen)

## Zuarbeit

### Luca – Server (Etappe 0)

- [x] DNS bei cloudpit: A `neu.lucagreinecker.at` → `178.104.239.44`
- [x] Coolify: API an, zwei Tokens, `~/.config/lucagreinecker/secrets.env`
- [x] `! DEPLOYEN=1 bash scripts/infra.sh`
- [x] Deploy repariert (25.09.2026, Luca): Nach dem Coolify-Update auf
      4.3.23 scheiterte jeder Deploy an `ParseAddr("fde4:…::1/64")`
      (Docker 27.5.1, Coolify-Issue 8649). `systemctl restart docker` auf
      dem Server, danach `bash scripts/deploy.sh` – Deployment um 17:47
      durch, seither deployt jeder Push wieder (SETUP.md, „Deploy").
- [x] ntfy: Zugang vom punktetafel-Feedback übernommen
      (`scripts/ntfy-uebernehmen.sh`, 26.09.2026); eigenes Topic bei Bedarf
      nach SETUP.md
- [x] Uptime Kuma: braucht es nicht (Luca, 26.09.2026)
- [x] Server-Größe: CPX22, 8 GB (laendle-isst SETUP.md), in SETUP.md

### Luca – Inhalte

- [x] Texte: Luca hat Claude am 26.09.2026 gebeten, sie aus den Fakten zu
      schreiben; Gegenlesen steht in Etappe 3
- [ ] Foto von dir (ja/nein) – die Seite kommt ohne aus; mit Foto käme es
      auf „Über mich"
- [x] Telefon oder WhatsApp auf der Seite: nein (26.09.2026)
- [x] Impressum: kein Gewerbe derzeit, Anschrift wie bisher (Haldenweg
      56b/1, 6700 Bludenz), nur im Impressum (26.09.2026)
- [ ] Olcay, Akin und Jonathan fragen, ob ihre Seite mit Screenshots und
      Namen auf deiner Seite stehen darf (OZ neu und USTA sind noch nicht
      unter der echten Domain live)

### Luca – Etappe 3 (Stand 26.09.2026)

- [ ] Texte auf `https://neu.lucagreinecker.at` gegenlesen (Start, die vier
      Projektseiten, Über mich, Kontakt) und sagen, was nicht nach dir klingt
- [ ] `! bash scripts/server-fakten.sh` – liest nur (Log-Rotation, Traefik,
      ntfy, Umami, Speicher), die Ausgabe darf in den Chat; daraus werden
      die Prüfstellen 2 und 3 und die Zeile ‹RAM› in SETUP.md
- [x] Renovate-App für `lucagreinecker` freigegeben und im Mend-Portal auf
      „Interactive" gestellt, ebenso `ozcalisthenics` (26.09.2026).
      `usta-streetfood` bleibt still, bis dessen `renovate.json` passt
      (arbeitet gegen `staging`, das Repo hat nur `main`)
- [ ] WKO-Rechtsservice (oder Anwalt) zu den Prüfstellen 1 und 4 fragen
      (Etappe 3); Antworten in TODO.md, Texte danach anpassen

## Offene Entscheidungen

- Repo nach dem Umzug privat? (AGENTS.md, Entscheidungen)
- Coolify-Dashboard auf Port 8000 ist von außen offen: Instanz-Domain mit
  HTTPS und Port 8000 in der Hetzner-Firewall schließen (betrifft auch
  punktetafel)

## Betrieb, mit Termin

- (keine; die Seite hat keine Schlüssel mit Ablauf)

## Bugs und Kleinigkeiten

- `bash scripts/deploy.sh status` ohne UUID zeigt das Deployment aus dem
  Merker (das letzte, das das Script selbst angestoßen hat, am 26.09.2026
  eines vom Vortag), nicht das jüngste der App – CI-Deploys sieht man so
  nicht. Der Deploy wurde heute stattdessen über die Live-Seite geprüft
  (neuer Text, Bild-Attribute, Chunk-Hashes). Besser: das jüngste
  Deployment der App per API holen (Coolify listet Deployments je
  Application-UUID) und den Merker nur als Fallback nehmen.
- Coolify-Deploy-Log zeigt „Healthcheck logs: /bin/sh: curl: not found" (Alpine-Image ohne curl); der Status ist trotzdem „healthy" über den HEALTHCHECK im Dockerfile. Prüfen, ob Coolifys eigener Check damit überhaupt greift (Coolify → App → Healthcheck), sonst auf den Docker-Check stellen.
- CI meldet Erfolg, obwohl der Coolify-Deploy scheitert: der Schritt
  „Coolify deployen" stellt nur in die Warteschlange (`queued`). Der
  Schritt soll das Deployment (`/api/v1/deployments/<uuid>`) bis `finished`
  oder `failed` abfragen und bei `failed` den Job rot machen; danach in die
  Vorlage (`starter/.github/workflows/ci.yml`).

## Ideen (nicht eingeplant)

- **Dunkelmodus nach Systemeinstellung** (Luca, 26.09.2026: „benutzerfreundlich,
  je nach Systemeinstellung voreingestellt"). Passt zum Design „Reihe" nur
  mit eigenem Entwurf: Grund Tinte statt Papier, Text Papier, Gelb bleibt
  als einziges Signal (auf Dunkel rund 14:1), Linien heller, die dunklen
  Projektbilder brauchen dann eine helle Linie zur Abgrenzung. Kein
  Schalter, `prefers-color-scheme` entscheidet; Kontraste neu messen,
  Screenshots in beiden Modi. Die Vorlage sagt „ein Theme, nicht beides"
  (leitfaden/05) – hier bewusst als Ausnahme, weil es Lucas eigene Seite
  ist. Frühestens nach dem Go-live, als eigene kleine Etappe.
- Zentrale Überwachung (leitfaden/11): Uptime Kuma läuft schon auf diesem
  Server; OZ und USTA dort eintragen, Beszel-Hub dazu

## Bewusst nicht (ohne neuen Grund nicht wieder einbauen)

Aus der Vorlage (leitfaden/02): Bootstrap, tailwind-merge, React Email,
next-safe-action, t3-env, TanStack Table, Recharts, Datepicker-Bibliothek,
Nixpacks, `docker-compose.yml`, Google Fonts per CDN, eingebettete Karte,
YouTube- und Social-iframes, Cookie-Banner-Tool, Hell und Dunkel
gleichzeitig, `src/`-Ordner, GlitchTip und Uptime Kuma auf dem
Kundenserver.

## Erledigt

- 25.09.2026: Coolify auf Lucas Server von 4.0.0 auf 4.3.23 (Luca); danach punktetafel, `neu.` und Umami (`analytics.punktetafel.at`) geprüft.
- 25.09.2026: Etappe 1 – zwei Richtungen, Lucas Wahl (A-Design, B-Aufbau), drei Versionen, Version 1 „Reihe" umgesetzt (Tokens, Schrift, Bausteine); echte Projekt-Screenshots.
- 26.09.2026: Etappe 2 – Startseite, Projektseiten, Über mich, Kontakt per ntfy, Redirects, JSON-LD; Texte von Luca offen.
- 26.09.2026: Etappe 3, Teil 1 – Texte, Impressum, Datenschutz, Platzhalter leer; Umami und ntfy scharf. Offen: Gegenlesen, Prüfstellen, Zustimmungen, Umzug.
- 26.09.2026: Etappe 3, Teil 2 – Prüfstelle 5 am Umami-Quellcode erledigt, 4 konkretisiert, Lighthouse gemessen und nachgemessen, Zod aus dem Client-Bundle (CSP), renovate.json für dieses Repo, `scripts/server-fakten.sh`. Offen: Zuarbeit Luca (Gegenlesen, Server-Fakten, Renovate-App, WKO, Zustimmungen), Umzug.

Eine Zeile je Etappe; Einzelheiten in AGENTS.md („Stand", „Entscheidungen").
