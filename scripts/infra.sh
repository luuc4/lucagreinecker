#!/bin/bash
# Legt die Coolify-App für lucagreinecker.at auf Lucas eigenem Server an
# (dem punktetafel-Server, SETUP.md) und setzt die GitHub-Variablen –
# idempotent, mehrfach ausführbar. Nach dem Muster von
# usta-streetfood/scripts/infra.sh, aber nur über die Coolify-API: Coolify
# und Traefik laufen dort schon, der Server wird nicht angefasst.
#
#   bash scripts/infra.sh              # anlegen bzw. nachziehen
#   DEPLOYEN=1 bash scripts/infra.sh   # am Ende sofort einen Deploy anstoßen
#
# Voraussetzungen (SETUP.md, „Von null auf laufend"):
# ~/.config/lucagreinecker/secrets.env (chmod 600) mit COOLIFY_URL,
# COOLIFY_TOKEN (Root-Token aus dem Dashboard, nur für dieses Script),
# COOLIFY_DEPLOY_TOKEN (nur „deploy", geht als Secret an GitHub),
# APP_DOMAIN; optional NTFY_URL, NTFY_TOKEN (Kontaktformular),
# UMAMI_HOST, UMAMI_WEBSITE_ID. gh mit Konto luuc4, python3.
# Schreibt UUIDs nach secrets.env, nie ins Repo (das Repo ist öffentlich).
# Gibt nie ein Secret aus.
set -euo pipefail

SECRETS="$HOME/.config/lucagreinecker/secrets.env"
REPO=luuc4/lucagreinecker
IMAGE=ghcr.io/luuc4/lucagreinecker
PROJEKT=lucagreinecker
APP=lucagreinecker-web

[ -f "$SECRETS" ] || { echo "fehlt: $SECRETS (Vorlage in SETUP.md, Zugänge)"; exit 1; }
# Werte mit '|' (Coolify-Tokens) müssen quotiert sein, sonst führt die Shell
# den Rest als Befehl aus.
sed -i '' -E "s/^([A-Za-z_]+)=([^'\"].*\|.*)\$/\1='\2'/" "$SECRETS"
set -a
# shellcheck disable=SC1090
. "$SECRETS"
set +a
: "${COOLIFY_URL:?COOLIFY_URL fehlt in $SECRETS}"
: "${COOLIFY_TOKEN:?COOLIFY_TOKEN fehlt in $SECRETS}"
: "${COOLIFY_DEPLOY_TOKEN:?COOLIFY_DEPLOY_TOKEN fehlt in $SECRETS}"
: "${APP_DOMAIN:?APP_DOMAIN fehlt in $SECRETS}"
COOLIFY_URL="${COOLIFY_URL%/}"

merken() { # NAME WERT → secrets.env, falls noch nicht vorhanden
  grep -q "^$1=" "$SECRETS" || printf "%s='%s'\n" "$1" "$2" >> "$SECRETS"
}
feld() { # Python-Ausdruck über dem JSON `d` von stdin; leer statt None oder bei Nicht-JSON
  python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    v = $1
except Exception:
    v = None
print('' if v is None else v)"
}
api() { # METHODE PFAD [JSON]
  curl -sS --connect-timeout 15 -m 90 -H "Authorization: Bearer $COOLIFY_TOKEN" \
    -H "Content-Type: application/json" -X "$1" "$COOLIFY_URL/api/v1$2" ${3:+-d "$3"}
}

echo "== 1/4 Coolify erreichbar?"
if [ -z "$(api GET /version || true)" ]; then
  echo "Coolify-API antwortet nicht ($COOLIFY_URL). API unter Settings → Advanced eingeschaltet? Token gültig?" >&2
  exit 1
fi
SERVER_UUID=$(api GET /servers | feld "next((s['uuid'] for s in d if s.get('name')=='localhost'), d[0]['uuid'] if d else None)")
[ -n "$SERVER_UUID" ] || { echo "keine Serverressource in Coolify gefunden" >&2; exit 1; }
echo "server $SERVER_UUID"

echo "== 2/4 Coolify-Projekt $PROJEKT"
PROJ=$(api GET /projects | feld "next((p['uuid'] for p in d if p['name']=='$PROJEKT'), None)")
if [ -z "$PROJ" ]; then
  PROJ=$(api POST /projects "{\"name\":\"$PROJEKT\",\"description\":\"Website lucagreinecker.at\"}" | feld "d['uuid']")
fi
[ -n "$PROJ" ] || { echo "Projekt konnte nicht angelegt werden" >&2; exit 1; }
merken COOLIFY_PROJECT_UUID "$PROJ"
echo "projekt $PROJ"

echo "== 3/4 App $APP ($IMAGE:main → $APP_DOMAIN)"
APPU=$(api GET /applications | feld "next((x['uuid'] for x in d if x['name']=='$APP'), None)")
if [ -z "$APPU" ]; then
  APPU=$(api POST /applications/dockerimage "{\"project_uuid\":\"$PROJ\",\"server_uuid\":\"$SERVER_UUID\",\"environment_name\":\"production\",\"name\":\"$APP\",\"description\":\"Next.js-App, Image aus GHCR (main)\",\"docker_registry_image_name\":\"$IMAGE\",\"docker_registry_image_tag\":\"main\",\"ports_exposes\":\"3000\",\"domains\":\"$APP_DOMAIN\",\"health_check_enabled\":true,\"health_check_host\":\"127.0.0.1\",\"health_check_path\":\"/api/health\",\"health_check_port\":\"3000\",\"health_check_interval\":10,\"health_check_timeout\":3,\"health_check_retries\":5,\"health_check_start_period\":60,\"instant_deploy\":false}" | feld "d['uuid']")
fi
[ -n "$APPU" ] || { echo "App konnte nicht angelegt werden" >&2; exit 1; }
# Domain und Healthcheck nachziehen (Domainumzug = APP_DOMAIN ändern und
# Script erneut laufen lassen). Health-Host 127.0.0.1, nicht localhost
# (Alpine löst localhost zu ::1 auf, Next lauscht nur auf IPv4).
api PATCH "/applications/$APPU" "{\"domains\":\"$APP_DOMAIN\",\"health_check_host\":\"127.0.0.1\",\"health_check_enabled\":true,\"health_check_path\":\"/api/health\",\"health_check_port\":\"3000\"}" > /dev/null
# Runtime-Env. SITE_URL und Umami sind Build-Zeit (Repository-Variablen,
# ci.yml); SITE_URL steht zusätzlich hier, weil lib/site.ts sie auch zur
# Laufzeit liest. ntfy nur, wenn gesetzt.
ENV_JSON=$(python3 - "$APP_DOMAIN" "${NTFY_URL:-}" "${NTFY_TOKEN:-}" <<'PY'
import json, sys
domain, ntfy_url, ntfy_token = sys.argv[1:4]
werte = {
    "SITE_URL": domain,
    "NTFY_URL": ntfy_url,
    "NTFY_TOKEN": ntfy_token,
}
print(json.dumps({"data": [
    {"key": k, "value": v, "is_build_time": False, "is_preview": False, "is_literal": True}
    for k, v in werte.items() if v != ""
]}))
PY
)
api PATCH "/applications/$APPU/envs/bulk" "$ENV_JSON" > /dev/null
unset ENV_JSON
merken COOLIFY_APP_UUID "$APPU"
echo "app $APPU"

echo "== 4/4 GitHub: Repository-Variablen und Secret"
GH_TOKEN=$(gh auth token --user luuc4); export GH_TOKEN
printf '%s' "$COOLIFY_DEPLOY_TOKEN" | gh secret set COOLIFY_TOKEN --repo "$REPO"
gh variable set COOLIFY_URL --repo "$REPO" --body "$COOLIFY_URL"
gh variable set COOLIFY_APP_UUID_MAIN --repo "$REPO" --body "$APPU"
gh variable set SITE_URL_MAIN --repo "$REPO" --body "$APP_DOMAIN"
if [ -n "${UMAMI_HOST:-}" ] && [ -n "${UMAMI_WEBSITE_ID:-}" ]; then
  gh variable set NEXT_PUBLIC_UMAMI_HOST --repo "$REPO" --body "$UMAMI_HOST"
  gh variable set NEXT_PUBLIC_UMAMI_WEBSITE_ID --repo "$REPO" --body "$UMAMI_WEBSITE_ID"
  echo "umami gesetzt ($UMAMI_HOST)"
else
  echo "hinweis: UMAMI_HOST/UMAMI_WEBSITE_ID fehlen – Seite läuft ohne Statistik, bis beide in $SECRETS stehen."
fi
echo "variablen gesetzt"

if [ "${DEPLOYEN:-0}" = "1" ]; then
  # Neues Image mit den Build-Zeit-Werten bauen; die CI stößt am Ende Coolify an.
  gh workflow run ci.yml --repo "$REPO" --ref main
  echo "ci-lauf gestartet: gh run list --repo $REPO --limit 1"
fi
echo "fertig. Prüfen: curl -s $APP_DOMAIN/api/health"
