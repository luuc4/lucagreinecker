#!/usr/bin/env bash
# Fakten vom Server für die Prüfstellen der Datenschutzerklärung (TODO.md,
# Etappe 3) und für SETUP.md („Speicher messen"):
#
#   - Server-Protokolle: rotiert Docker die Container-Logs (daemon.json),
#     schreibt Traefik ein Access-Log, wie lange hält journald?
#   - ntfy: Version, cache-duration (wie lange eine Anfrage vorgehalten wird)
#   - Umami: Version, Env, Spalten der Tabellen session und website_event
#     (steht dort eine IP-Adresse?), Datenbank auf demselben Server
#   - RAM, Platte, Speicher je Container
#
# Nur Lesezugriffe, ändert nichts. Tokens, Passwörter, Salts und
# Datenbank-URLs werden herausgefiltert; die Ausgabe darf in den Chat.
#
#   bash scripts/server-fakten.sh                 # Server aus SETUP.md
#   SERVER=root@1.2.3.4 bash scripts/server-fakten.sh
#
# Warum ein Script: Claude darf im Auto-Modus nicht auf den
# Produktionsserver lesen (Klassifizierer, 26.09.2026); Luca führt es
# selbst aus und die Ausgabe landet im Chat (`! bash scripts/server-fakten.sh`).
set -euo pipefail

SERVER="${SERVER:-root@178.104.239.44}"

ssh -o BatchMode=yes -o ConnectTimeout=10 "$SERVER" 'bash -s' <<'REMOTE'
set +e
geheim='TOKEN|PASSWORD|SECRET|DATABASE_URL|HASH_SALT|APP_KEY|_KEY='

echo "## Server"
hostname
free -m | awk 'NR==2{print "RAM MB gesamt/benutzt:", $2, $3}'
df -h / | awk 'NR==2{print "Platte:", $2, "belegt", $5}'

echo; echo "## Speicher je Container"
docker stats --no-stream --format '{{.Name}}\t{{.MemUsage}}'

echo; echo "## Docker-Logs (Rotation)"
docker info --format 'Treiber: {{.LoggingDriver}}'
echo "daemon.json:"
cat /etc/docker/daemon.json 2>/dev/null || echo "(fehlt: dann keine Rotation, Logs wachsen unbegrenzt)"
app=$(docker ps --format '{{.Names}}\t{{.Image}}' | awk '/lucagreinecker/{print $1; exit}')
echo "App-Container $app:"
docker inspect --format '{{json .HostConfig.LogConfig}}' "$app"

echo; echo "## Traefik (coolify-proxy)"
echo "Parameter mit log:"
docker inspect --format '{{range .Config.Cmd}}{{println .}}{{end}}' coolify-proxy | grep -i 'log' \
  || echo "(kein accesslog-Parameter: Access-Log aus, Traefik protokolliert keine Aufrufe)"
docker inspect --format 'LogConfig: {{json .HostConfig.LogConfig}}' coolify-proxy
ls -la /data/coolify/proxy/ 2>/dev/null

echo; echo "## journald"
journalctl --disk-usage
grep -E '^(SystemMaxUse|MaxRetentionSec|MaxFileSec)' /etc/systemd/journald.conf 2>/dev/null \
  || echo "(journald.conf: Standardwerte, Größe statt Frist)"

echo; echo "## ntfy"
ntfy=$(docker ps --format '{{.Names}}' | grep -m1 ntfy)
echo "Container: $ntfy"
docker exec "$ntfy" ntfy --version 2>&1 | head -1
echo "Env (NTFY_*):"
docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$ntfy" | grep '^NTFY_' | grep -v -E "$geheim" \
  || echo "(keine NTFY_-Variablen)"
echo "server.yml (ohne Kommentare):"
docker exec "$ntfy" sh -c 'grep -v -E "^[[:space:]]*#|^[[:space:]]*$" /etc/ntfy/server.yml 2>/dev/null' | grep -v -i -E "$geheim" \
  || echo "(kein server.yml: Standardwerte, cache-duration 12h)"

echo; echo "## Umami"
umami=$(docker ps --format '{{.Names}}\t{{.Image}}' | awk '/umami-software\/umami/{print $1; exit}')
echo "Container: $umami"
docker inspect --format 'Image: {{.Config.Image}}' "$umami"
echo "Env:"
docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$umami" | grep -v -E "$geheim" | grep -v -E '^(PATH|NODE_|HOSTNAME|YARN|PORT|HOME)=' || true
suffix=${umami##*-}
db=$(docker ps --format '{{.Names}}' | grep -m1 "postgresql-$suffix")
echo "Datenbank-Container: $db (derselbe Server)"
echo "Spalten der Tabelle session:"
docker exec "$db" sh -c "psql -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -v t=session -Atc \"select string_agg(column_name, ', ' order by ordinal_position) from information_schema.columns where table_name = :'t'\"" 2>&1
echo "Spalten der Tabelle website_event:"
docker exec "$db" sh -c "psql -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -v t=website_event -Atc \"select string_agg(column_name, ', ' order by ordinal_position) from information_schema.columns where table_name = :'t'\"" 2>&1
REMOTE
