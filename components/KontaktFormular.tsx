"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { Knopf } from "@/components/Knopf";
import { Feld, Textbereich } from "@/components/formular/Feld";
import { inlineLinkKlassen } from "@/components/Textlink";
import { anfrageSenden, type AnfrageZustand } from "@/lib/anfrage/actions";
import {
  EMAIL_MAX,
  FELDER,
  NACHRICHT_MAX,
  NAME_MAX,
  TELEFON_MAX,
} from "@/lib/anfrage/felder";

// Kontaktformular (leitfaden/12, Baustein A). Client-Komponente nur für
// Feldfehler und Fokus; ohne JavaScript schickt das Formular trotzdem ab
// (Server Action). Nach einem Fehler landet der Fokus im ersten falschen
// Feld, nach dem Absenden auf der Bestätigung. Das Feld „website" ist der
// Honeypot: für Menschen unsichtbar, Bots füllen es aus.
const FEHLER: Record<NonNullable<AnfrageZustand["fehler"]>, string> = {
  drossel:
    "Zu viele Nachrichten in kurzer Zeit. Bitte später noch einmal versuchen oder direkt per Telefon oder E-Mail.",
  senden:
    "Die Nachricht konnte gerade nicht gesendet werden. Bitte direkt per Telefon oder E-Mail melden.",
  aus: "Das Kontaktformular ist ausgeschaltet.",
};

export function KontaktFormular({ empfaenger }: { empfaenger: string }) {
  const [zustand, senden, laeuft] = useActionState<AnfrageZustand, FormData>(
    anfrageSenden,
    {},
  );
  const formular = useRef<HTMLFormElement>(null);
  const bestaetigung = useRef<HTMLHeadingElement>(null);
  const f = zustand.feldFehler ?? {};
  const w = zustand.werte ?? {};

  useEffect(() => {
    if (zustand.ok) {
      bestaetigung.current?.focus();
      return;
    }
    const erstes = FELDER.find((feld) => zustand.feldFehler?.[feld]);
    if (erstes) {
      formular.current
        ?.querySelector<HTMLElement>(`[name="${erstes}"]`)
        ?.focus();
    }
  }, [zustand]);

  if (zustand.ok) {
    return (
      <div className="flex flex-col gap-3 border-t border-fg pt-6">
        <h3
          ref={bestaetigung}
          tabIndex={-1}
          className="text-h3 font-medium focus:outline-none"
        >
          Nachricht gesendet
        </h3>
        <p className="text-fg-leise">
          Die Antwort kommt an{" "}
          <span className="font-medium text-fg">{zustand.an}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formular}
      action={senden}
      noValidate
      className="relative flex flex-col gap-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Feld
          id="anfrage-name"
          name="name"
          label="Name"
          autoComplete="name"
          maxLength={NAME_MAX}
          required
          defaultValue={w.name}
          fehler={f.name}
        />
        <Feld
          id="anfrage-email"
          name="email"
          type="email"
          label="E-Mail"
          autoComplete="email"
          inputMode="email"
          maxLength={EMAIL_MAX}
          required
          defaultValue={w.email}
          fehler={f.email}
        />
      </div>
      <Feld
        id="anfrage-telefon"
        name="telefon"
        type="tel"
        label="Telefon (optional)"
        autoComplete="tel"
        inputMode="tel"
        maxLength={TELEFON_MAX}
        defaultValue={w.telefon}
        fehler={f.telefon}
        className="md:max-w-sm"
      />
      <Textbereich
        id="anfrage-nachricht"
        name="nachricht"
        label="Nachricht"
        maxLength={NACHRICHT_MAX}
        required
        rows={6}
        defaultValue={w.nachricht}
        fehler={f.nachricht}
      />
      {/* Honeypot: aus dem Bild geschoben, nicht per display:none, weil
          manche Bots versteckte Felder auslassen. */}
      <div
        className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="anfrage-website">Website (leer lassen)</label>
        <input
          id="anfrage-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <p className="text-sm text-fg-leise">
        Die Nachricht geht direkt an {empfaenger} und wird auf der Website nicht
        gespeichert.{" "}
        <Link href="/datenschutz" className={inlineLinkKlassen}>
          Datenschutz
        </Link>
      </p>
      <div className="flex flex-col items-start gap-3">
        <Knopf type="submit" aria-disabled={laeuft || undefined}>
          {laeuft ? "Wird gesendet …" : "Nachricht senden"}
        </Knopf>
        {/* Dauerhaft im Baum, nur der Text wechselt: eine Live-Region, die
            erst mit Inhalt entsteht, wird oft nicht vorgelesen. */}
        <p role="alert" className="min-h-6 text-sm font-medium text-fehler">
          {zustand.fehler ? FEHLER[zustand.fehler] : ""}
        </p>
      </div>
    </form>
  );
}
