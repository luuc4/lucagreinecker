import type { NextConfig } from "next";

// Sicherheits-Header für alle Antworten (Block aus punktetafel und OZ). Die
// Seite lädt außer dem optionalen Umami-Script nichts von fremden Hosts,
// also darf die CSP eng sein. 'unsafe-inline' bleibt nötig: Next und
// Tailwind setzen style-Attribute, die Seiten tragen JSON-LD-Blöcke.
// 'unsafe-eval' verlangt nur der Dev-Modus von Turbopack. Stripe Hosted
// Checkout bräuchte nichts davon (Client-Navigation, kein Script, kein
// Frame). Jede Ausnahme hier (Karten-iframe, Video, Fremd-Script) ist eine
// Entscheidung mit Datenschutz-Folgen (leitfaden/07).
const umami = process.env.NEXT_PUBLIC_UMAMI_HOST?.replace(/\/$/, "") ?? "";
const dev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  ["script-src 'self' 'unsafe-inline'", dev && "'unsafe-eval'", umami]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  ["connect-src 'self'", umami].filter(Boolean).join(" "),
  "manifest-src 'self'",
  "worker-src 'self'",
  // Keine Plugins, keine eingebetteten Objekte – nichts davon kommt vor.
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Das Docker-Image enthält nur server.js samt getracten Abhängigkeiten.
  output: "standalone",
  // sharp ist nur für scripts/bilder.mjs da (Bildvarianten vorab). Next
  // würde es sonst für next/image ins Image tracen (rund 19 MB), das die
  // Seite nicht nutzt.
  outputFileTracingExcludes: {
    "*": [
      "node_modules/sharp/**",
      "node_modules/@img/**",
      "node_modules/.pnpm/sharp@*/**",
      "node_modules/.pnpm/@img+*/**",
    ],
  },
  // „X-Powered-By: Next.js" verrät nur die Technik.
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Hinter Traefik kommt die Anfrage mit x-forwarded-host an; Next
      // prüft den Origin einer Server Action gegen diese Liste.
      allowedOrigins: [
        "lucagreinecker.at",
        "www.lucagreinecker.at",
        "neu.lucagreinecker.at",
        "staging.lucagreinecker.at",
      ],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            // Ein Jahr HTTPS-Pflicht für die Domain selbst. Ohne
            // includeSubDomains und Preload – beides wäre eine Entscheidung
            // für alles, was sonst noch unter der Domain hängt (auch
            // Dienste des Kunden), und ließe sich kaum zurücknehmen.
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // www → Apex (308). Greift erst, wenn www beim Go-live auf den
        // Server zeigt.
        source: "/:path*",
        has: [{ type: "host", value: "www.lucagreinecker.at" }],
        destination: "https://lucagreinecker.at/:path*",
        permanent: true,
      },
      // Adressen der alten Seite des Kunden hier umleiten (308), z. B.:
      // { source: "/kontakt.html", destination: "/kontakt", permanent: true },
    ];
  },
};

export default nextConfig;
