# Setup und Betrieb

Alles, was nicht im Code steht: Konten, Server, Coolify, Env, DNS, Deploy,
Backups, Notfall. Konventionen und Entscheidungen: `AGENTS.md`. Allgemeine
Anleitungen: `~/projects/webprojekt-vorlage/leitfaden/03` (Server und
Domains) und `08` (Betrieb).

Stellen mit ‹spitzen Klammern› sind noch nachzutragen. Keine Secrets in
dieser Datei.

## Stand

25.09.2026: `https://neu.lucagreinecker.at` läuft (Coolify-App
`lucagreinecker-web`, running:healthy, Let's Encrypt, noindex). Jeder Push
auf `main` deployt dorthin. Die alte statische Seite läuft bis zum Umzug
über GitHub Pages aus Branch `alt` unter `lucagreinecker.at`. Noch offen:
Umami (TODO.md); ntfy läuft seit dem 26.09.2026.

| Was        | Wert                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Konten     | alle auf Luca (eigene Seite)                                                                            |
| Server     | Lucas eigener Server (punktetafel, ländle isst geparkt): Hetzner Cloud CPX22, `178.104.239.44`, ‹RAM›   |
| Coolify    | 4.3.23 (seit 25.09.2026, vorher 4.0.0), `http://178.104.239.44:8000` (von außen erreichbar, TODO.md)    |
| Repo       | `github.com/luuc4/lucagreinecker` (öffentlich, AGENTS.md), `main` → Prod                                |
| Image      | `ghcr.io/luuc4/lucagreinecker:{main,sha-<kurz>}`, gebaut von GitHub Actions                             |
| Domain     | `lucagreinecker.at`, Registrar dogado (nic.at), Nameserver cloudpit (`cns1.cloudpit.de` u. a.)          |
| DNS        | Apex → GitHub Pages (4 × `185.199.10x.153`) bis zum Umzug; `neu` → `178.104.239.44` ‹anlegen›           |
| Postfächer | keine (kein MX am Apex, Stand 25.09.2026); Kontakt über `greineckerluca@hotmail.com`                    |
| Secrets    | `~/.config/lucagreinecker/secrets.env` (chmod 600) und 1Password „‹Eintrag›"                            |
| Umami      | bestehende Instanz `https://analytics.punktetafel.at`, Website-ID ‹…›                                   |
| ntfy       | bestehende Instanz `https://ntfy.punktetafel.at`, dasselbe Topic und Token wie das punktetafel-Feedback |

Coolify-Projekte auf dem Server: „My first project" (punktetafel, Umami
`analytics.punktetafel.at`, ntfy `ntfy.punktetafel.at`, Uptime Kuma
`uptime.punktetafel.at`) und `lucagreinecker`.

Coolify-Ressourcen: UUIDs stehen nur in secrets.env (`COOLIFY_PROJECT_UUID`,
`COOLIFY_APP_UUID`), weil das Repo öffentlich ist. Namen: Projekt
`lucagreinecker`, App `lucagreinecker-web`.

## Zugänge

- **secrets.env** (`set -a; . ~/.config/lucagreinecker/secrets.env; set +a`):
  `COOLIFY_URL`, `COOLIFY_TOKEN` (Root, nur für `scripts/infra.sh`),
  `COOLIFY_DEPLOY_TOKEN` (nur `deploy`, als GitHub-Secret `COOLIFY_TOKEN`),
  `APP_DOMAIN`, optional `NTFY_URL`, `NTFY_TOKEN`, `UMAMI_HOST`,
  `UMAMI_WEBSITE_ID`; das Script ergänzt `COOLIFY_PROJECT_UUID`,
  `COOLIFY_APP_UUID`. Werte in einfachen Anführungszeichen. Nie ins Repo,
  nie in den Chat.
- **SSH:** für diese Seite nicht nötig (Coolify läuft schon, alles über die
  API).
- **GitHub:** `GH_TOKEN=$(gh auth token --user luuc4) gh …`; Push per SSH
  über den 1Password-Agent (`git@github.com:luuc4/lucagreinecker.git`).

## Von null auf laufend

Coolify und Traefik laufen auf dem Server schon (punktetafel). Neu ist nur
die App.

1. **DNS bei cloudpit:** A-Record `neu.lucagreinecker.at` →
   `178.104.239.44`, ohne Proxy. Apex und `www` bleiben bis zum Umzug bei
   GitHub Pages.
2. **Coolify-Dashboard** `http://178.104.239.44:8000`: Settings → Advanced →
   API Access an; Keys & Tokens → API tokens: ein Token mit Root-Recht
   („luca-infra-script") und eines nur mit `deploy`
   („github-actions-deploy").
3. **secrets.env** anlegen (Werte in einfachen Anführungszeichen):
   ```bash
   mkdir -p ~/.config/lucagreinecker && touch ~/.config/lucagreinecker/secrets.env && chmod 600 ~/.config/lucagreinecker/secrets.env
   # COOLIFY_URL='http://178.104.239.44:8000'
   # COOLIFY_TOKEN='…'  COOLIFY_DEPLOY_TOKEN='…'
   # APP_DOMAIN='https://neu.lucagreinecker.at'
   ```
4. **Image:** ist öffentlich, weil das Repo öffentlich ist (anonymer Pull
   am 25.09.2026 geprüft); der Server braucht kein `docker login ghcr.io`.
   Wird das Repo privat, dort `docker login` mit einem PAT nur
   `read:packages` nachholen.
5. **App anlegen und deployen:** `DEPLOYEN=1 bash scripts/infra.sh`
   (Projekt, App vom Typ Docker Image, Domain, Healthcheck
   `/api/health` mit Host `127.0.0.1`, Runtime-Env, Repository-Variablen
   `COOLIFY_URL`, `COOLIFY_APP_UUID_MAIN`, `SITE_URL_MAIN`, Secret
   `COOLIFY_TOKEN`, dann ein CI-Lauf).
6. **Verifizieren:**
   ```bash
   curl -s https://neu.lucagreinecker.at/api/health    # ok
   curl -s https://neu.lucagreinecker.at/robots.txt    # Disallow: / bis zum Go-live
   curl -sI https://neu.lucagreinecker.at/ | grep -i content-security-policy
   ```
7. **Umami:** in `analytics.punktetafel.at` eine Website
   `lucagreinecker.at` anlegen, `UMAMI_HOST` und `UMAMI_WEBSITE_ID` in
   secrets.env, `bash scripts/infra.sh` erneut, dann
   `gh workflow run ci.yml --ref main`.
8. **Speicher messen** (`docker stats --no-stream` auf dem Server) und hier
   eintragen.

## Env-Vars

Kontaktformular → ntfy (seit 26.09.2026, `lib/anfrage/ntfy.ts`): Runtime
in Coolify `ANFRAGE_TRANSPORT=ntfy`, `NTFY_URL` (Topic-Adresse, z. B.
`https://ntfy.punktetafel.at/lucagreinecker-anfragen`) und `NTFY_TOKEN`
(Token mit Schreibrecht auf das Topic). Beides in secrets.env eintragen,
dann `DEPLOYEN=1 bash scripts/infra.sh` (setzt die drei Variablen und
deployt; ohne die beiden Werte setzt das Script nur `SITE_URL`). Ohne sie
lehnt das Formular in Produktion ehrlich ab und das Log warnt beim Start.
Die Seite verschickt keine Mails.

Einfachster Weg: den Zugang vom punktetafel-Feedback übernehmen, das auf
derselben ntfy-Instanz läuft – `bash scripts/ntfy-uebernehmen.sh` liest
`NTFY_FEEDBACK_URL` und `NTFY_TOKEN` der punktetafel-App aus Coolify und
trägt sie als `NTFY_URL`/`NTFY_TOKEN` in secrets.env ein (gleiches Topic,
die Nachrichten unterscheiden sich am Titel; mit Argument ein eigenes
Topic, das braucht Admin-Rechte des Token-Benutzers). Kein SSH nötig.

Alternative, eigenes Topic mit eigenem Token (einmalig, am Server; die
Instanz läuft mit Anmeldung, wie das punktetafel-Feedback):

```bash
ssh root@178.104.239.44
docker ps --format '{{.Names}}' | grep -i ntfy      # Name des ntfy-Containers
docker exec -it <ntfy-container> ntfy user list      # vorhandene Benutzer
docker exec -it <ntfy-container> ntfy access <benutzer> lucagreinecker-anfragen write-only
docker exec -it <ntfy-container> ntfy token add --label lucagreinecker <benutzer>   # gibt tk_… aus
```

Dann in secrets.env: `NTFY_URL='https://ntfy.punktetafel.at/lucagreinecker-anfragen'`
und `NTFY_TOKEN='tk_…'`, Script laufen lassen, Testanfrage über
`/kontakt`. Am Handy das Topic in der ntfy-App mit demselben Benutzer
abonnieren (Lesen braucht die Anmeldung; `write-only` gilt nur für den
Token).

`.env.tpl` ist die vollständige Liste. Build-Zeit über
Repository-Variablen (`SITE_URL_MAIN`, `SITE_URL_STAGING`,
`NEXT_PUBLIC_UMAMI_*`), Runtime in Coolify. Eine Änderung an
Build-Zeit-Werten braucht einen neuen Image-Build
(`gh workflow run ci.yml --ref main`).

## Deploy

Push auf `main` → CI `check` → `e2e` → `image` (Rauchtest, GHCR) →
Coolify-Deploy. Rollback: Coolify → App → Image-Tag auf `sha-<kurz>` →
Redeploy, danach zurück auf `main`. Sperrzeiten: keine. Gleichzeitige
Builds auf dem Server gibt es nicht mehr (Build in der CI); punktetafel
baut laut ländle-isst `SETUP.md` evtl. noch per Nixpacks auf dem Server.

**Deploy prüfen:** Die CI meldet Erfolg, sobald Coolify den Deploy
angenommen hat (`queued`), nicht wenn er durch ist. `bash scripts/deploy.sh`
stößt einen Deploy an (Image-Tag `main`, ohne neuen Build) und wartet auf
`finished` oder `failed`; `bash scripts/deploy.sh status` zeigt nur das
letzte Deployment mit den letzten Logzeilen. Beides liest
`~/.config/lucagreinecker/secrets.env`.

Seit dem Coolify-Update auf 4.3.23 (25.09.2026) scheitert der Deploy auf
diesem Server an `ParseAddr("fde4:…::1/64")` (Docker 27.5.1 meldet das
IPv6-Gateway des `coolify`-Netzes mit Präfix). Abhilfe: Docker auf dem
Server neu starten (TODO.md, „Luca – Server"); hilft das nicht, IPv6 im
Coolify-Netz abschalten oder Docker aktualisieren.

## Backups

Die Seite hält keine Daten (Inhalte im Repo, Anfragen gehen an ntfy). Die
Statistik liegt in der Umami-Datenbank von ländle isst; deren Backup
gehört zu Lucas Server, nicht zu diesem Repo.

## Go-live (Domainumzug)

Checkliste in leitfaden/08, „Domainumzug". Projektspezifisch:

- Alte Seite: GitHub Pages aus Branch `alt` (Tag `statisch-2026-09`),
  Zertifikat bis 06.12.2026.
- Redirects (308) der alten Adressen: `/impressum.html` → `/impressum`,
  `/datenschutz.html` → `/datenschutz`, `/index.html` → `/`. Anker der
  alten Startseite (`#projekte`, `#kontakt`, `#ueber-mich`) laufen ohne
  Redirect auf `/`.
- Reihenfolge: `APP_DOMAIN='https://lucagreinecker.at'` und
  `APP_ALIASE='https://www.lucagreinecker.at'` in secrets.env,
  `bash scripts/infra.sh`, in Coolify die App auf „Redirect to non-www"
  stellen, `gh workflow run ci.yml --ref main`,
  dann DNS bei cloudpit (Apex und `www` → `178.104.239.44`, die vier
  GitHub-Pages-A-Records entfernen – vorher `dig` sichern), danach Pages im
  Repo ausschalten und die `CNAME`-Datei auf `alt` belassen.

## Fallstricke (projektspezifisch)

- Remote war bis 25.09.2026 HTTPS mit gespeicherten Zugangsdaten des
  Kontos `luca-greinecker` (403 beim Push). Jetzt SSH.
