# Backlog

Die eine Liste für dieses Projekt, chronologisch nach Etappen. Jeder Punkt
steht einmal. Neue Aufgaben, Ideen und Befunde immer hier eintragen, nie
nur im Chat.

## Stand (25.09.2026)

Etappe 0 im Repo erledigt: Starter im bestehenden Repo, alte Seite auf
Branch `alt` (Pages baut von dort), Doku aus dem Kickoff, CI,
`scripts/infra.sh`. Offen aus Etappe 0 ist nur Lucas Teil (Zuarbeit Luca:
DNS, Coolify-Tokens, secrets.env, Image öffentlich, Script).

**Nächste Sitzung zuerst (Luca will die Seite mit Fable bauen):** Skill
`neues-webprojekt`, Phase 4 (Design) für Etappe 1. AGENTS.md
(„Projekt", „Entscheidungen") und diesen Abschnitt lesen. Nichts gestalten,
bevor Luca eine von zwei Richtungen gewählt hat.

Faktenquellen für die Projektseiten (nur Fakten übernehmen, Sätze kommen
von Luca):

| Projekt         | Quelle                                                                        | Live                                                        |
| --------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| OZ Calisthenics | `~/projects/ozcalisthenics` (AGENTS.md „Stand", `docs/konzept/`)              | `https://neu.oz-calisthenics.at` (Apex noch die alte Seite) |
| USTA Streetfood | `~/projects/usta-streetfood` (AGENTS.md „Stand")                              | Übergangsadresse, Domain `ustastreetfood.com` im Umzug      |
| punktetafel     | `~/projects/punktetafel` (AGENTS.md)                                          | `https://punktetafel.at`                                    |
| Jonathan Walch  | `docs/alt/projekt-notizen.md`                                                 | `https://jonathanwalch.at`                                  |
| Werdegang       | alte Startseite (Tag `statisch-2026-09`, `index.html`, Abschnitt „Über mich") | –                                                           |

## Nächste Etappen

Jede Etappe passt in eine Sitzung und endet mit Commit, Deploy und Bericht
(AGENTS.md, „Abschluss einer Etappe").

### Etappe 0 – Fundament

- [x] Fragebogen durchgegangen, Antworten in AGENTS.md und SETUP.md
- [x] Starter im Repo `luuc4/lucagreinecker`, alte Seite auf `alt`, CI
- [ ] `neu.lucagreinecker.at` zeigt die Platzhalterseite (noindex) –
      wartet auf Zuarbeit Luca
- [ ] Umami: Website in `analytics.laendle-isst.at`, ID in secrets.env,
      Rebuild
- [ ] Renovate-App für das Repo (wie bei OZ)

### Etappe 1 – Design (mit Fable)

- [ ] Offene Design-Fragen (leitfaden/fragebogen.md, Teil D): Stimmung,
      Seiten, die Luca gefallen, das tragende Element der Startseite
- [ ] Zwei Richtungen als Entwurf (Start und eine Projektseite, Handy und
      Desktop), Luca wählt; Regeln in AGENTS.md
- [ ] Echte Screenshots der Projekte in 390 und 1440 px
      (`scripts/screenshots.mjs` gegen die Live-Adressen oder die lokalen
      Repos) statt generierter Bilder wie auf der alten Seite

### Etappe 2 – Seiten und Inhalte (mit Fable)

- [ ] Tokens, Schrift, Kopf, Fuß
- [ ] Startseite mit den vier Projekten im Mittelpunkt
- [ ] Eine Seite je Projekt (`/projekte/<slug>`): Fakten als Listen
      (Funktionen, Stack, Zeitraum, gemessene Werte), Screenshots, Link,
      Lucas Sätze oder `[TEXT LUCA]`
- [ ] Über mich: Werdegang kurz und nebensächlich
- [ ] Kontakt: Formular an ntfy statt Mail (Muster
      `punktetafel/app/api/feedback/route.ts`, Drossel und Honeypot aus dem
      Starter), vCard, Mail-Link; `lib/mail/` und die MAIL_*-Variablen
      entfernen, wenn nichts anderes sie braucht
- [ ] SEO: Beschreibungen, OG-Bild, JSON-LD (`Person`), Redirects der
      alten Adressen (SETUP.md, Go-live)
- [ ] Screenshots 390/768/1440 angesehen, axe grün, Lighthouse gemessen

### Etappe 3 – Recht und Umzug

- [ ] Impressum und Datenschutz (Server bei Hetzner, Umami, ntfy,
      Formular), Prüfstellen markiert
- [ ] Platzhalter-Liste leer
- [ ] Domainumzug nach SETUP.md („Go-live"), Search Console

## Zuarbeit

### Luca – Server (Etappe 0)

- [ ] DNS bei cloudpit: A `neu.lucagreinecker.at` → `178.104.239.44`
- [ ] Coolify: API an, zwei Tokens, `~/.config/lucagreinecker/secrets.env`
      (SETUP.md, „Von null auf laufend", Schritt 2–3)
- [ ] Nach dem ersten CI-Lauf: GHCR-Paket `lucagreinecker` auf Public
- [ ] `! DEPLOYEN=1 bash scripts/infra.sh`
- [ ] ntfy: Topic für Anfragen, `NTFY_URL` und `NTFY_TOKEN` in secrets.env
- [ ] Server-Größe nachsehen (Hetzner-Console: RAM), in SETUP.md

### Luca – Inhalte

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

- (keine)

## Ideen (nicht eingeplant)

- Zentrale Überwachung aller Kundenseiten (Uptime Kuma, Beszel-Hub) auf
  diesem Server, wie leitfaden/11 sie vorschlägt

## Bewusst nicht (ohne neuen Grund nicht wieder einbauen)

Aus der Vorlage (leitfaden/02): Bootstrap, tailwind-merge, React Email,
next-safe-action, t3-env, TanStack Table, Recharts, Datepicker-Bibliothek,
Nixpacks, `docker-compose.yml`, Google Fonts per CDN, eingebettete Karte,
YouTube- und Social-iframes, Cookie-Banner-Tool, Hell und Dunkel
gleichzeitig, `src/`-Ordner, GlitchTip und Uptime Kuma auf dem
Kundenserver.

## Erledigt

Eine Zeile je Etappe; Einzelheiten in AGENTS.md („Stand", „Entscheidungen").
