#!/usr/bin/env bash
# ntfy-Zugang vom punktetafel-Feedback übernehmen, statt Topic und Token
# per SSH neu anzulegen: liest NTFY_FEEDBACK_URL und NTFY_TOKEN der
# punktetafel-App aus Coolify (gleicher Server, gleiche ntfy-Instanz) und
# trägt NTFY_URL und NTFY_TOKEN in secrets.env ein. Werte werden nie
# ausgegeben.
#
#   bash scripts/ntfy-uebernehmen.sh                      # dasselbe Topic wie das Feedback
#   bash scripts/ntfy-uebernehmen.sh lucagreinecker-anfragen   # eigenes Topic, gleicher Token
#
# Ein eigenes Topic geht nur, wenn der Benutzer des Tokens auf der
# ntfy-Instanz Admin ist oder Schreibrecht auf das neue Topic bekommt
# (SETUP.md, Env-Vars). Dasselbe Topic geht immer; die Push-Nachrichten
# unterscheiden sich am Titel („Anfrage Website" gegenüber
# „Punktetafel Feedback"). Danach: DEPLOYEN=1 bash scripts/infra.sh
set -euo pipefail

SECRETS="$HOME/.config/lucagreinecker/secrets.env"
TOPIC="${1:-}"
[ -f "$SECRETS" ] || { echo "Fehlt: $SECRETS (SETUP.md, Abschnitt Coolify)" >&2; exit 1; }
set -a
# shellcheck source=/dev/null
. "$SECRETS"
set +a
: "${COOLIFY_URL:?COOLIFY_URL fehlt in $SECRETS}"
: "${COOLIFY_TOKEN:?COOLIFY_TOKEN fehlt in $SECRETS}"
COOLIFY_URL="${COOLIFY_URL%/}"

if grep -q -E '^NTFY_(URL|TOKEN)=' "$SECRETS"; then
  echo "NTFY_URL oder NTFY_TOKEN stehen schon in secrets.env – nichts geändert. Zum Erneuern die Zeilen dort löschen." >&2
  exit 1
fi

api() { # PFAD
  curl -sS --connect-timeout 15 -m 60 -H "Authorization: Bearer $COOLIFY_TOKEN" \
    "$COOLIFY_URL/api/v1$1"
}

PT=$(api /applications | python3 -c '
import json, sys
apps = json.load(sys.stdin)
print(next((a["uuid"] for a in apps if "punktetafel" in (a.get("name") or "").lower()), ""))
')
[ -n "$PT" ] || { echo "Keine App mit „punktetafel" im Namen in Coolify gefunden." >&2; exit 1; }

# Beide Werte in einem Rutsch nach secrets.env, ohne sie anzuzeigen.
api "/applications/$PT/envs" | TOPIC="$TOPIC" python3 -c '
import json, os, sys
werte = {e["key"]: e.get("value") or "" for e in json.load(sys.stdin)}
url, token = werte.get("NTFY_FEEDBACK_URL", ""), werte.get("NTFY_TOKEN", "")
if not url or not token:
    print("punktetafel hat NTFY_FEEDBACK_URL oder NTFY_TOKEN nicht gesetzt.", file=sys.stderr)
    sys.exit(1)
topic = os.environ.get("TOPIC", "")
if topic:
    url = url.rstrip("/").rsplit("/", 1)[0] + "/" + topic
for name, wert in (("NTFY_URL", url), ("NTFY_TOKEN", token)):
    if "\x27" in wert:
        print(f"{name} enthält ein Anführungszeichen – bitte von Hand eintragen.", file=sys.stderr)
        sys.exit(1)
with open(os.path.expanduser("~/.config/lucagreinecker/secrets.env"), "a", encoding="utf-8") as f:
    f.write(f"\nNTFY_URL=\x27{url}\x27\nNTFY_TOKEN=\x27{token}\x27\n")
print("eingetragen: NTFY_URL (Topic " + url.rsplit("/", 1)[-1] + ") und NTFY_TOKEN")
'
echo "jetzt: DEPLOYEN=1 bash scripts/infra.sh"
