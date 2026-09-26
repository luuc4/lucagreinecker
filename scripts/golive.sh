#!/usr/bin/env bash
# Umzug von neu.lucagreinecker.at auf lucagreinecker.at (SETUP.md „Go-live",
# Luca 26.09.2026: „lucagreinecker.at will ich haben", ohne neu.).
#
#   bash scripts/golive.sh vorbereiten   # 1. vor der DNS-Umstellung
#   … DNS bei cloudpit umstellen (das Script sagt, was) …
#   bash scripts/golive.sh pruefen       # 2. danach
#
# vorbereiten: sichert secrets.env, setzt APP_DOMAIN auf die Domain und www
#   als Alias, lässt scripts/infra.sh Coolify-Domains, Runtime-SITE_URL und
#   SITE_URL_MAIN setzen und die CI neu bauen (SITE_URL ist Build-Zeit),
#   wartet auf CI und Deploy. Bis zur DNS-Umstellung zeigt die Domain noch
#   die alte Pages-Seite; neu. fällt mit dem Deploy weg.
# pruefen: wartet, bis die Nameserver von cloudpit den Server nennen,
#   stößt einen Deploy an (dann holt Traefik die Zertifikate für Domain und
#   www per Let's Encrypt), wartet auf ein gültiges Zertifikat und prüft
#   Health, robots, Sitemap, Redirects und noindex – gegen die Server-IP,
#   damit ein alter DNS-Cache am Mac nicht stört.
#
# Luca führt es aus (Coolify ändern und Repository-Variablen setzen blockt
# der Klassifizierer für Claude). Gibt keine Secrets aus.
set -euo pipefail

SECRETS="$HOME/.config/lucagreinecker/secrets.env"
REPO=luuc4/lucagreinecker
DOMAIN=lucagreinecker.at
SERVER_IP=178.104.239.44
NS=cns1.cloudpit.de

[ -f "$SECRETS" ] || { echo "Fehlt: $SECRETS" >&2; exit 1; }
cd "$(dirname "$0")/.."
GH_TOKEN=$(gh auth token --user luuc4)
export GH_TOKEN

setzen() { # NAME WERT – ersetzt die Zeile in secrets.env oder hängt sie an
  python3 - "$SECRETS" "$1" "$2" <<'PY'
import re, sys
pfad, name, wert = sys.argv[1:]
text = open(pfad).read()
zeile = f"{name}='{wert}'"
if re.search(rf"^{name}=", text, re.M):
    text = re.sub(rf"^{name}=.*$", zeile, text, count=1, flags=re.M)
else:
    text = text.rstrip("\n") + "\n" + zeile + "\n"
open(pfad, "w").write(text)
PY
}

letztes_deployment() { # Status des jüngsten Deployments der App
  set -a; . "$SECRETS"; set +a
  curl -sS -m 30 -H "Authorization: Bearer $COOLIFY_TOKEN" \
    "${COOLIFY_URL%/}/api/v1/deployments/applications/$COOLIFY_APP_UUID?skip=0&take=1" |
    python3 -c "
import json, sys
d = json.load(sys.stdin)
x = (d.get('deployments') if isinstance(d, dict) else d) or [{}]
x = x[0]
print(x.get('deployment_uuid', '?'), x.get('status', '?'), x.get('created_at', '?'))"
}

auf_deploy_warten() { # UUID_VORHER – wartet auf ein neueres, fertiges Deployment
  local vorher="$1" stand
  for _ in $(seq 1 60); do
    stand=$(letztes_deployment || true)
    case "$stand" in
      "$vorher "*) ;; # noch das alte Deployment
      *" finished "*) echo "Deploy fertig: $stand"; return 0 ;;
      *" failed "* | *" cancelled"*) echo "Deploy gescheitert: $stand" >&2; return 1 ;;
    esac
    sleep 10
  done
  echo "Deploy nach 10 Minuten nicht fertig: $stand" >&2
  return 1
}

vorbereiten() {
  cp -p "$SECRETS" "$SECRETS.vor-golive"
  chmod 600 "$SECRETS.vor-golive"
  echo "== secrets.env gesichert: $SECRETS.vor-golive"
  setzen APP_DOMAIN "https://$DOMAIN"
  setzen APP_ALIASE "https://www.$DOMAIN"
  echo "== APP_DOMAIN https://$DOMAIN, APP_ALIASE https://www.$DOMAIN"

  local vorher deploy_vorher
  vorher=$(gh run list --repo "$REPO" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
  deploy_vorher=$(letztes_deployment | cut -d' ' -f1)
  DEPLOYEN=1 bash scripts/infra.sh

  echo "== warte auf den neuen CI-Lauf (Build für https://$DOMAIN)"
  local lauf=""
  for _ in $(seq 1 30); do
    lauf=$(gh run list --repo "$REPO" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
    [ "$lauf" != "$vorher" ] && break
    sleep 5
  done
  [ "$lauf" != "$vorher" ] || { echo "Kein neuer CI-Lauf gestartet" >&2; exit 1; }
  gh run watch "$lauf" --repo "$REPO" --exit-status --interval 20 > /dev/null ||
    { echo "CI-Lauf $lauf rot: gh run view $lauf --repo $REPO --log-failed" >&2; exit 1; }
  echo "CI-Lauf $lauf grün"
  auf_deploy_warten "$deploy_vorher"

  cat <<EOF

== Teil 1 fertig. Jetzt DNS bei cloudpit (Zone $DOMAIN):
   - die vier A-Records für @ löschen:
       185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - einen A-Record für @ anlegen: $SERVER_IP
   - www (CNAME auf $DOMAIN) bleibt, er zieht mit.
   - neu (A $SERVER_IP) kann danach weg, er zeigt auf nichts mehr.
   Danach: bash scripts/golive.sh pruefen
EOF
}

pruefen() {
  echo "== warte, bis $NS für $DOMAIN $SERVER_IP nennt"
  for _ in $(seq 1 60); do
    if [ "$(dig +short A "$DOMAIN" @"$NS" | sort | tr '\n' ' ')" = "$SERVER_IP " ]; then
      break
    fi
    sleep 10
  done
  [ "$(dig +short A "$DOMAIN" @"$NS" | sort | tr '\n' ' ')" = "$SERVER_IP " ] ||
    { echo "$NS nennt noch: $(dig +short A "$DOMAIN" @"$NS" | tr '\n' ' ') – DNS prüfen" >&2; exit 1; }
  echo "DNS bei cloudpit stimmt"

  echo "== Deploy anstoßen, damit Traefik die Zertifikate holt"
  bash scripts/deploy.sh

  echo "== warte auf ein gültiges Zertifikat"
  local r=(--resolve "$DOMAIN:443:$SERVER_IP" --resolve "www.$DOMAIN:443:$SERVER_IP")
  for _ in $(seq 1 30); do
    curl -fsS -m 10 "${r[@]}" "https://$DOMAIN/api/health" > /dev/null 2>&1 && break
    sleep 10
  done

  local fehler=0 start robots sitemap www alt
  pruefe() { # BESCHREIBUNG ERWARTET IST
    if [ "$2" = "$3" ]; then echo "ok    $1"; else echo "FEHLT $1: erwartet „$2“, ist „$3“"; fehler=1; fi
  }
  enthaelt() { # TEXT MUSTER → ja/nein (ohne Pipe, sonst stört pipefail)
    if grep -q -- "$2" <<< "$1"; then echo ja; else echo nein; fi
  }
  ziel() { # URL → „Code Ziel“ ohne Schrägstrich am Ende
    # Ohne Zertifikat scheitert curl (Code 000) – das soll als FEHLT
    # erscheinen, nicht das Script beenden (set -e, pipefail).
    { curl -s -o /dev/null -m 10 "${r[@]}" -w '%{http_code} %{redirect_url}' "$1" || true; } | sed 's#/$##'
  }
  pruefe "Health mit gültigem Zertifikat" ok "$(curl -fsS -m 10 "${r[@]}" "https://$DOMAIN/api/health" 2>&1 || true)"
  start=$(curl -fsS -m 10 "${r[@]}" "https://$DOMAIN/" || true)
  robots=$(curl -fsS -m 10 "${r[@]}" "https://$DOMAIN/robots.txt" || true)
  sitemap=$(curl -fsS -m 10 "${r[@]}" "https://$DOMAIN/sitemap.xml" || true)
  pruefe "robots sperrt nicht alles" nein "$(enthaelt "$robots" '^Disallow: /$')"
  pruefe "Sitemap nennt die Domain" ja "$(enthaelt "$sitemap" "<loc>https://$DOMAIN")"
  pruefe "kein noindex auf der Startseite" nein "$(enthaelt "$start" 'noindex')"
  pruefe "Umami-Script eingebunden" ja "$(enthaelt "$start" 'analytics.punktetafel.at/script.js')"
  www=$(ziel "https://www.$DOMAIN/" || true)
  alt=$(ziel "https://$DOMAIN/impressum.html" || true)
  pruefe "www leitet per 308 auf die Domain" "308 https://$DOMAIN" "$www"
  pruefe "alte Adresse /impressum.html" "308 https://$DOMAIN/impressum" "$alt"
  echo "Zertifikat: $( (echo | openssl s_client -connect "$SERVER_IP:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -issuer -enddate 2>/dev/null | tr '\n' ' ') || true)"

  if [ "$fehler" = 0 ]; then
    cat <<EOF

== Live: https://$DOMAIN
   Danach (TODO.md, Go-live): GitHub Pages im Repo ausschalten, sobald
   der DNS-Cache überall durch ist (morgen); DNS-Eintrag neu löschen;
   Search Console mit Sitemap; eine Testanfrage über /kontakt.
EOF
  else
    echo; echo "== Nicht alles grün – Ausgabe an Claude geben." >&2
    exit 1
  fi
}

case "${1:-}" in
  vorbereiten) vorbereiten ;;
  pruefen) pruefen ;;
  *) echo "Aufruf: bash scripts/golive.sh vorbereiten|pruefen" >&2; exit 1 ;;
esac
