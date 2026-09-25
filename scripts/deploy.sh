#!/usr/bin/env bash
# Deploy in Coolify anstoßen und auf das Ergebnis warten – oder das letzte
# Deployment nachsehen. Die CI meldet Erfolg, sobald Coolify den Deploy in
# die Warteschlange nimmt; ob er durchläuft, steht nur im Deployment
# (Befund 25.09.2026: CI grün, Deploy an einem IPv6-Gateway gescheitert).
#
#   bash scripts/deploy.sh            # Image-Tag „main" neu ausrollen, warten
#   bash scripts/deploy.sh status     # letztes Deployment mit Logzeilen
#   bash scripts/deploy.sh status <deployment_uuid>
#
# Liest ~/.config/lucagreinecker/secrets.env (COOLIFY_URL, COOLIFY_TOKEN,
# COOLIFY_APP_UUID); merkt sich die UUID des letzten Deployments daneben.
set -euo pipefail

SECRETS="$HOME/.config/lucagreinecker/secrets.env"
MERKER="$HOME/.config/lucagreinecker/letztes-deployment"
[ -f "$SECRETS" ] || { echo "Fehlt: $SECRETS (SETUP.md, Abschnitt Coolify)" >&2; exit 1; }
set -a
# shellcheck source=/dev/null
. "$SECRETS"
set +a
: "${COOLIFY_URL:?COOLIFY_URL fehlt in $SECRETS}"
: "${COOLIFY_TOKEN:?COOLIFY_TOKEN fehlt in $SECRETS}"
: "${COOLIFY_APP_UUID:?COOLIFY_APP_UUID fehlt in $SECRETS}"
COOLIFY_URL="${COOLIFY_URL%/}"

api() { # METHODE PFAD
  curl -sS --connect-timeout 15 -m 60 -H "Authorization: Bearer $COOLIFY_TOKEN" \
    -X "$1" "$COOLIFY_URL/api/v1$2"
}

# Status und letzte Logzeilen eines Deployments ausgeben; gibt den Status
# auf stdout der letzten Zeile zurück.
zeigen() { # DEPLOYMENT_UUID
  api GET "/deployments/$1" | python3 -c '
import json, sys
d = json.load(sys.stdin)
if "message" in d and "status" not in d:
    print("Antwort:", d["message"]); sys.exit(2)
print("Deployment %s: %s (gestartet %s, fertig %s)" % (d.get("deployment_uuid"), d.get("status"), d.get("created_at"), d.get("finished_at")))
logs = d.get("logs")
try:
    eintraege = json.loads(logs) if isinstance(logs, str) else (logs or [])
except Exception:
    eintraege = []
# Die letzten Zeilen ohne den PHP-Stacktrace; die Fehlermeldung selbst
# steht meist in der Zeile mit „Error" oder „failed".
zeilen = []
for e in eintraege:
    for z in str(e.get("output", "")).splitlines():
        z = z.strip()
        if z and not z.startswith("#") and "/var/www/html" not in z:
            zeilen.append(z[:160])
for z in zeilen[-8:]:
    print("  " + z)
print(d.get("status"))
'
}

if [ "${1:-}" = "status" ]; then
  UUID="${2:-$(cat "$MERKER" 2>/dev/null || true)}"
  [ -n "$UUID" ] || { echo "Keine Deployment-UUID bekannt. Aufruf: deploy.sh status <uuid>" >&2; exit 1; }
  zeigen "$UUID" | sed '$d'
  exit 0
fi

echo "Deploy anstoßen ($COOLIFY_URL, App $COOLIFY_APP_UUID) …"
ANTWORT=$(api POST "/deploy?uuid=$COOLIFY_APP_UUID&force=true")
UUID=$(printf '%s' "$ANTWORT" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d["deployments"][0]["deployment_uuid"])' 2>/dev/null || true)
if [ -z "$UUID" ]; then
  echo "Coolify hat den Deploy nicht angenommen: $ANTWORT" >&2
  exit 1
fi
printf '%s' "$UUID" > "$MERKER"
echo "Deployment $UUID in der Warteschlange, warte …"

for _ in $(seq 1 60); do
  sleep 10
  STATUS=$(zeigen "$UUID" | tail -n 1)
  case "$STATUS" in
    finished) zeigen "$UUID" | sed '$d'; echo "Deploy durch."; exit 0 ;;
    failed|cancelled-by-user) zeigen "$UUID" | sed '$d'; echo "Deploy gescheitert." >&2; exit 1 ;;
    *) printf '%s ' "$STATUS" ;;
  esac
done
echo; echo "Nach 10 Minuten kein Ergebnis; Coolify → App → Deployments nachsehen." >&2
exit 1
