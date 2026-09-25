# Vorlage für alle Umgebungsvariablen (leitfaden/03, „Secrets").
# Lokal: nach .env.local kopieren und ausfüllen (.env.local ist in .gitignore).
# Prod/Staging: B = Build-Zeit (Repository-Variable in GitHub, geht als
# Build-Arg ins Image, siehe .github/workflows/ci.yml), R = Runtime (Coolify →
# Environment Variables). Werte hier sind Platzhalter, nie echte Secrets.

# B R  metadataBase, Canonicals, Sitemap, robots. Prod bis zum Go-live
#      https://neu.lucagreinecker.at, danach https://lucagreinecker.at.
#      Nur OEFFENTLICHE_HOSTS in lib/site.ts werden indexiert.
SITE_URL=http://localhost:3000

# B    Umami, bestehende Instanz auf Lucas Server (AGENTS.md, Entscheidungen);
#      ins Bundle gebacken (nur main). Ohne beide Werte lädt die Seite kein Script.
#NEXT_PUBLIC_UMAMI_HOST=https://analytics.punktetafel.at
#NEXT_PUBLIC_UMAMI_WEBSITE_ID=

# R    Kontaktformular → ntfy (lib/anfrage/ntfy.ts; Entscheidung 25.09.2026):
#      konsole = Anfrage im Terminal (lokal; in Produktion lehnt das Formular
#      dann ab), memory = Tests (/api/test/anfragen), ntfy = Push an Lucas
#      ntfy-Instanz. NTFY_URL ist die Topic-Adresse, NTFY_TOKEN ein Token mit
#      Schreibrecht auf das Topic (secrets.env, scripts/infra.sh setzt beides
#      in Coolify). Keine Mails: diese Seite verschickt keine.
ANFRAGE_TRANSPORT=konsole
#NTFY_URL=https://ntfy.punktetafel.at/lucagreinecker-anfragen
#NTFY_TOKEN=
# R    1 erst, wenn Cloudflare davor steht (Client-IP aus cf-connecting-ip)
#TRUST_CF_IP=0

# ------------------------------------------------ später, je nach Bausteinen
# Muster und Erklärungen: ozcalisthenics/.env.tpl, leitfaden/12
# R    Datenbank (Coolify-interner Hostname; lokal Homebrew-Postgres)
#DATABASE_URL=postgres://localhost:5432/lucagreinecker
# R    Login (Better Auth): Secret ≥ 32 Zeichen (`openssl rand -base64 32`),
#      Admins als kommagetrennte Liste, nur in Coolify und secrets.env.
#BETTER_AUTH_SECRET=
#ADMIN_EMAILS=
#PASSKEY_RP_ID=
