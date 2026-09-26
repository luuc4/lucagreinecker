# Multi-Stage-Build (leitfaden/02). Gebaut wird in GitHub Actions, Coolify
# zieht nur das fertige Image aus GHCR – auf dem 4-GB-Server läuft kein
# `next build`. Mit Datenbank kommt ein gebündeltes migrate.js dazu, das
# im Entrypoint vor dem Server läuft (Vorlage: ozcalisthenics/Dockerfile).
FROM node:24-alpine AS base
WORKDIR /app
# pnpm in genau der Version aus `packageManager` (package.json) – eine
# Quelle; ein fester Wert hier lief beim Update auf pnpm 12 auseinander,
# weil Renovate nur package.json hebt (26.09.2026).
COPY package.json ./
RUN npm i -g "$(node -p "require('./package.json').packageManager")"

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# SITE_URL wird in statische Seiten gebacken (Canonicals, Sitemap, robots);
# die Umami-Werte landen im Client-Bundle. Deshalb Build-Args, nicht
# Runtime-Env.
ARG SITE_URL
ARG NEXT_PUBLIC_UMAMI_HOST
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_TELEMETRY_DISABLED=1 \
    SITE_URL=$SITE_URL \
    NEXT_PUBLIC_UMAMI_HOST=$NEXT_PUBLIC_UMAMI_HOST \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
RUN pnpm build

FROM node:24-alpine AS runner
WORKDIR /app
# Kein TZ: der Container rechnet in UTC wie CI und Tests; Zeitzonen sind
# im Code explizit (Europe/Vienna).
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=60s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
# Exec-Form: Node ist PID 1 und bekommt SIGTERM direkt. Mit Migration im
# Entrypoint: ["sh", "-c", "node migrate.js && exec node server.js"] –
# ohne `exec` käme SIGTERM nie an.
CMD ["node", "server.js"]
