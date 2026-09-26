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

**Nächste Sitzung zuerst:** Lucas Texte einsetzen (Etappe 2, letzte
Punkte) und ntfy scharf schalten; dann Etappe 3 (Impressum, Datenschutz,
Platzhalter-Liste leer, Domainumzug nach SETUP.md). Vor dem Umzug die
Übergangsadressen in `projekte.ts` prüfen (OZ, USTA) und Olcay, Akin und
Jonathan fragen (Zuarbeit).

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
- [ ] Umami: Website in `analytics.punktetafel.at`, ID in secrets.env,
      Rebuild
- [ ] Renovate-App für das Repo (wie bei OZ)

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
- [ ] Lighthouse messen (Chrome DevTools auf `neu.`), Werte hier eintragen
- [ ] Lucas Texte einsetzen, sobald da (Zuarbeit unten): `SEITE.beschreibung`,
      Satz über ihn, `PAKET.satz` und -Punkte, `UEBER_MICH.saetze`, je Projekt
      `satz`, die Anfrage-Sätze auf der Startseite (`app/(site)/page.tsx`)
- [ ] ntfy scharf schalten: Topic und Token in secrets.env, dann
      `! DEPLOYEN=1 bash scripts/infra.sh` (setzt `ANFRAGE_TRANSPORT=ntfy`),
      Testanfrage über `/kontakt`, Push kommt an

### Etappe 3 – Recht und Umzug

- [ ] Impressum und Datenschutz (Server bei Hetzner, Umami, ntfy,
      Formular), Prüfstellen markiert
- [ ] Platzhalter-Liste leer
- [ ] Domainumzug nach SETUP.md („Go-live"), Search Console

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
- [ ] ntfy: `! bash scripts/ntfy-uebernehmen.sh` (übernimmt Topic und Token
      vom punktetafel-Feedback aus Coolify in secrets.env, kein SSH), dann
      `! DEPLOYEN=1 bash scripts/infra.sh`; eigenes Topic siehe SETUP.md
- [ ] Uptime Kuma (`uptime.punktetafel.at`): Monitor auf
      `https://neu.lucagreinecker.at/api/health`, Schlüsselwort `ok`
- [ ] Server-Größe nachsehen (Hetzner-Console: RAM), in SETUP.md

### Luca – Inhalte

- [ ] Rundum-sorglos-Paket: die sechs Punkte auf der Leinwand bestätigen
      oder ändern (Website, Server, Reichweite, Betrieb, Recht, „usw."),
      dazu ein, zwei Sätze in deinen Worten
- [ ] Stichworte je Projekt: wer, was wollte der Kunde, was war schwierig,
      worauf du stolz bist
- [ ] Ein Satz für die Beschreibung der Seite, ein paar Sätze über dich
- [ ] Foto von dir (ja/nein) – bestimmt, ob die Startseite typografisch wird
- [ ] Telefon oder WhatsApp auf der Seite (ja/nein)
- [ ] Impressum: Gewerbe für Webprojekte ja/nein, Adresse wie bisher
      (Haldenweg, Bludenz)?
- [ ] Olcay, Akin und Jonathan fragen, ob ihre Seite mit Screenshots und
      Namen auf deiner Seite stehen darf (OZ neu und USTA sind noch nicht
      unter der echten Domain live)

## Offene Entscheidungen

- Repo nach dem Umzug privat? (AGENTS.md, Entscheidungen)
- Coolify-Dashboard auf Port 8000 ist von außen offen: Instanz-Domain mit
  HTTPS und Port 8000 in der Hetzner-Firewall schließen (betrifft auch
  punktetafel)

## Betrieb, mit Termin

- (keine; die Seite hat keine Schlüssel mit Ablauf)

## Bugs und Kleinigkeiten

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

Eine Zeile je Etappe; Einzelheiten in AGENTS.md („Stand", „Entscheidungen").
