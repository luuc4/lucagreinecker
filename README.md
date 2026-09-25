# Luca Greinecker

Lucas eigene Website: seine Webprojekte, kurz über ihn, Kontakt.
Die alte statische Seite liegt auf Branch `alt` (Tag `statisch-2026-09`).

Entstanden aus dem Starter der webprojekt-vorlage
(`luuc4/webprojekt-vorlage`). Arbeitsdoku für Claude Code und alle
Konventionen: `AGENTS.md`. Server, Konten, Deploy: `SETUP.md`. Backlog:
`TODO.md`.

## Entwickeln

```bash
pnpm install
pnpm dev
```

Vor jedem Push, identisch mit der CI:

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm test:e2e --project=chromium
```

## Was der Starter mitbringt

- Next.js 16 mit `output: "standalone"`, Tailwind 4 mit Design-Tokens,
  TypeScript strict, pnpm 11, Node 24
- Sicherheits-Header und enge CSP (`next.config.ts`), `robots` sperrt alles
  außer der echten Domain (`lib/site.ts`), Sitemap, OG-Bild, JSON-LD
- Kopf mit Menü am Handy, Fuß mit Spalten, Sprunglink, Fokus auf die h1
  nach Seitenwechsel, Fehler- und 404-Seiten
- Kontaktformular als Push über ntfy (statt Mail), Honeypot und Drossel,
  ohne Speicherung, an- und abschaltbar (`KONTAKTFORMULAR`)
- Kontakt-Handgriffe: `tel:`, Mail mit Betreff, WhatsApp mit Text, vCard
  (`/api/kontakt.vcf`), Karten-Knöpfe, Kalenderdateien (`lib/kontakt/`)
- Umami-Einbindung ohne Cookie-Banner (`components/Analytics.tsx`)
- Tests: Vitest (`unit`, `ui`), Playwright mit Rauchtest, axe (WCAG 2.2 AA,
  390 und 1440 px) und Platzhalter-Liste
- CI: Prüfkette, E2E, Docker-Image mit Rauchtest nach GHCR, Coolify-Deploy
- Scripts: Screenshots in mehreren Breiten, Bildvarianten ohne Metadaten
  (`scripts/bilder.mjs`), Server-Grundeinrichtung
- Doku-Vorlagen: `AGENTS.md`, `SETUP.md`, `TODO.md`, `.env.tpl`

Design, Texte und Schrift sind Platzhalter, bis Luca eine Richtung gewählt
hat und der Kunde Inhalte liefert.
