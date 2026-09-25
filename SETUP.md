# Setup und Betrieb

Alles, was nicht im Code steht: Konten, Server, Coolify, Env, DNS, Deploy,
Backups, Notfall. Konventionen und Entscheidungen: `AGENTS.md`. Allgemeine
Anleitungen: `~/projects/webprojekt-vorlage/leitfaden/03` (Server und
Domains) und `08` (Betrieb).

Stellen mit ‹spitzen Klammern› sind noch nachzutragen. Keine Secrets in
dieser Datei.

## Stand

25.09.2026: Repo und CI stehen, die Coolify-App ist noch nicht angelegt
(TODO.md, Zuarbeit Luca). Die alte statische Seite läuft bis zum Umzug
über GitHub Pages aus Branch `alt` unter `lucagreinecker.at`.

| Was        | Wert                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Konten     | alle auf Luca (eigene Seite)                                                                          |
| Server     | Lucas eigener Server (punktetafel, ländle isst geparkt): Hetzner Cloud CPX22, `178.104.239.44`, ‹RAM› |
| Coolify    | ‹Version›, `http://178.104.239.44:8000` (von außen erreichbar, TODO.md)                               |
| Repo       | `github.com/luuc4/lucagreinecker` (öffentlich, AGENTS.md), `main` → Prod                              |
| Image      | `ghcr.io/luuc4/lucagreinecker:{main,sha-<kurz>}`, gebaut von GitHub Actions                           |
| Domain     | `lucagreinecker.at`, Registrar dogado (nic.at), Nameserver cloudpit (`cns1.cloudpit.de` u. a.)        |
| DNS        | Apex → GitHub Pages (4 × `185.199.10x.153`) bis zum Umzug; `neu` → `178.104.239.44` ‹anlegen›         |
| Postfächer | keine (kein MX am Apex, Stand 25.09.2026); Kontakt über `greineckerluca@hotmail.com`                  |
| Secrets    | `~/.config/lucagreinecker/secrets.env` (chmod 600) und 1Password „‹Eintrag›"                          |
| Umami      | bestehende Instanz `https://analytics.laendle-isst.at`, Website-ID ‹…›                                |
| ntfy       | bestehende Instanz auf Lucas Server (wie punktetafel-Feedback), Topic ‹…›                             |

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
4. **Image öffentlich:** nach dem ersten CI-Lauf auf GitHub → Packages →
   `lucagreinecker` → Package settings → Change visibility → Public. Das
   Repo ist öffentlich, das Image enthält nichts anderes; so braucht der
   Server kein `docker login ghcr.io`.
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
7. **Umami:** in `analytics.laendle-isst.at` eine Website
   `lucagreinecker.at` anlegen, `UMAMI_HOST` und `UMAMI_WEBSITE_ID` in
   secrets.env, `bash scripts/infra.sh` erneut, dann
   `gh workflow run ci.yml --ref main`.
8. **Speicher messen** (`docker stats --no-stream` auf dem Server) und hier
   eintragen.

## Env-Vars

Kontaktformular: soll an ntfy gehen (`NTFY_URL`, `NTFY_TOKEN`, Runtime,
Coolify; AGENTS.md, Entscheidungen 25.09.2026), ist aber noch der
Mail-Stand des Starters. Bis zum Umbau lehnt das Formular in Produktion
ehrlich ab.

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
