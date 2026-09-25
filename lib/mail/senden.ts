import { env } from "@/lib/env";
import { SEITE } from "@/lib/inhalte/statisch";
import { empfaengerErlaubt, ohneAdressen } from "./allowlist";

// Mailversand über drei Transporte (Muster aus OZ, lib/mail/senden.ts):
// - konsole: lokal, die Mail steht im Terminal. In Produktion gilt sie als
//   nicht eingerichtet und wirft – sonst sähe der Besucher „gesendet",
//   und die Anfrage stünde nur im Container-Log.
// - memory: im Prozess gesammelt; Playwright liest sie über
//   /api/test/mails (den Endpunkt gibt es nur mit diesem Transport).
// - scaleway: Transactional Email über die HTTP-API (leitfaden/04).
// Die Allowlist gilt für jeden Transport. Mails mit Anhängen, HTML oder
// Wiederholung (Postausgang) kommen mit leitfaden/12, Baustein F.

export type Mail = {
  an: string;
  betreff: string;
  text: string;
  replyTo?: string | null;
};

export type Versand = { status: "gesendet" } | { status: "unterdrueckt" };

const ZEITLIMIT_MS = 15_000;

type Speicher = { mails: Mail[] };
const global = globalThis as typeof globalThis & { __webMails?: Speicher };

function speicher(): Speicher {
  global.__webMails ??= { mails: [] };
  return global.__webMails;
}

export async function mailSenden(mail: Mail): Promise<Versand> {
  const e = env();
  if (!empfaengerErlaubt(mail.an, e.MAIL_EMPFAENGER_ALLOWLIST)) {
    // Weder Adresse noch Betreff ins Log.
    console.log("[mail] unterdrückt (Empfänger nicht in der Allowlist)");
    return { status: "unterdrueckt" };
  }
  switch (e.MAIL_TRANSPORT) {
    case "memory":
      speicher().mails.push(mail);
      return { status: "gesendet" };
    case "konsole":
      if (e.NODE_ENV === "production") {
        throw new Error(
          "MAIL_TRANSPORT=konsole in Produktion – Mail nicht zugestellt (Scaleway einrichten, leitfaden/04)",
        );
      }
      console.log(
        [
          "[mail] ---------------------------------------------",
          `[mail] An: ${mail.an}`,
          `[mail] Antwort an: ${mail.replyTo ?? "–"}`,
          `[mail] Betreff: ${mail.betreff}`,
          "[mail]",
          ...mail.text.split("\n").map((zeile) => `[mail] ${zeile}`),
          "[mail] ---------------------------------------------",
        ].join("\n"),
      );
      return { status: "gesendet" };
    case "scaleway":
      return scalewaySenden(mail);
  }
}

async function scalewaySenden(mail: Mail): Promise<Versand> {
  const e = env();
  const antwort = await fetch(
    `https://api.scaleway.com/transactional-email/v1alpha1/regions/${e.SCALEWAY_REGION}/emails`,
    {
      method: "POST",
      headers: {
        "X-Auth-Token": e.SCALEWAY_TEM_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: e.SCALEWAY_PROJECT_ID,
        from: { email: e.MAIL_FROM, name: SEITE.name },
        to: [{ email: mail.an }],
        subject: mail.betreff,
        text: mail.text,
        additional_headers: mail.replyTo
          ? [{ key: "Reply-To", value: mail.replyTo }]
          : undefined,
      }),
      signal: AbortSignal.timeout(ZEITLIMIT_MS),
    },
  );
  if (!antwort.ok) {
    let meldung = "";
    try {
      const json = (await antwort.json()) as { message?: unknown };
      meldung = typeof json.message === "string" ? json.message : "";
    } catch {
      // kein JSON – der Status reicht
    }
    throw new Error(
      `Scaleway antwortet ${antwort.status}${meldung ? `: ${ohneAdressen(meldung)}` : ""}`,
    );
  }
  return { status: "gesendet" };
}

// Nur für Tests und den Test-Endpunkt (MAIL_TRANSPORT=memory).
export function mailsImSpeicher(): readonly Mail[] {
  return speicher().mails;
}

export function mailspeicherLeeren(): void {
  speicher().mails = [];
}
