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
#NEXT_PUBLIC_UMAMI_HOST=https://analytics.laendle-isst.at
#NEXT_PUBLIC_UMAMI_WEBSITE_ID=

# R    Kontaktformular → ntfy (Entscheidung 25.09.2026, noch nicht gebaut;
#      Muster punktetafel/app/api/feedback/route.ts): URL inkl. Topic und
#      Token der ntfy-Instanz auf Lucas Server. Wenn das steht, fallen die
#      MAIL_*-Zeilen unten weg.
#NTFY_URL=
#NTFY_TOKEN=

# R    Mail für das Kontaktformular (Starter-Stand, lib/env.ts, leitfaden/04):
#      konsole = Mail im Terminal (lokal; in Produktion lehnt das Formular
#      dann ab), memory = Tests, scaleway = Transactional Email (braucht Key,
#      Projekt und MAIL_FROM auf der verifizierten Domain mail.<domain>).
#      MAIL_ADMIN bekommt die Anfragen (Postfach des Kunden). Die Allowlist
#      ist auf staging. Pflicht (Adressen, @domain oder bewusst *), in Prod leer.
MAIL_TRANSPORT=konsole
MAIL_ADMIN=anfragen@example.test
#MAIL_FROM=kontakt@mail.lucagreinecker.at
#SCALEWAY_TEM_KEY=
#SCALEWAY_PROJECT_ID=
#MAIL_EMPFAENGER_ALLOWLIST=
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
# R    Zahlung (Stripe Hosted Checkout)
#ZAHLUNG_ANBIETER=stripe
#STRIPE_SECRET_KEY=
#STRIPE_WEBHOOK_SECRET=
#STRIPE_LIVEMODE=false
