"use client";

import { useActionState, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import type { Sprache } from "@/i18n/routing";
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
  type FeldFehlerCode,
} from "@/lib/anfrage/felder";

// Alle Wörter des Formulars, vom Server in der Sprache der Seite gefüllt
// (app/[locale]/(site)/kontakt/page.tsx): so braucht der Client keine
// Nachrichten. `antwort` enthält {an} für die Adresse aus dem Formular.
export type FormularTexte = {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  website: string;
  hinweis: string;
  datenschutz: string;
  senden: string;
  wirdGesendet: string;
  gesendet: string;
  antwort: string;
  fehler: Record<NonNullable<AnfrageZustand["fehler"]>, string>;
  feld: Record<FeldFehlerCode, string>;
};

// Kontaktformular (leitfaden/12, Baustein A). Client-Komponente nur für
// Feldfehler und Fokus; ohne JavaScript schickt das Formular trotzdem ab
// (Server Action). Nach einem Fehler landet der Fokus im ersten falschen
// Feld, nach dem Absenden auf der Bestätigung. Das Feld „website" ist der
// Honeypot: für Menschen unsichtbar, Bots füllen es aus. `sprache` reist
// als verstecktes Feld mit, damit die Push-Nachricht sagt, auf welcher
// Sprache der Seite geschrieben wurde.
export function KontaktFormular({
  texte,
  sprache,
}: {
  texte: FormularTexte;
  sprache: Sprache;
}) {
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
    const [vor, nach] = texte.antwort.split("{an}");
    return (
      <div className="flex flex-col gap-3 border-t border-fg pt-6">
        <h3
          ref={bestaetigung}
          tabIndex={-1}
          className="text-h3 font-medium focus:outline-none"
        >
          {texte.gesendet}
        </h3>
        <p className="text-fg-leise">
          {vor}
          <span className="font-medium text-fg">{zustand.an}</span>
          {nach}
        </p>
      </div>
    );
  }

  const meldung = (code?: FeldFehlerCode) =>
    code ? texte.feld[code] : undefined;

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
          label={texte.name}
          autoComplete="name"
          maxLength={NAME_MAX}
          required
          defaultValue={w.name}
          fehler={meldung(f.name)}
        />
        <Feld
          id="anfrage-email"
          name="email"
          type="email"
          label={texte.email}
          autoComplete="email"
          inputMode="email"
          maxLength={EMAIL_MAX}
          required
          defaultValue={w.email}
          fehler={meldung(f.email)}
        />
      </div>
      <Feld
        id="anfrage-telefon"
        name="telefon"
        type="tel"
        label={texte.telefon}
        autoComplete="tel"
        inputMode="tel"
        maxLength={TELEFON_MAX}
        defaultValue={w.telefon}
        fehler={meldung(f.telefon)}
        className="md:max-w-sm"
      />
      <Textbereich
        id="anfrage-nachricht"
        name="nachricht"
        label={texte.nachricht}
        maxLength={NACHRICHT_MAX}
        required
        rows={6}
        defaultValue={w.nachricht}
        fehler={meldung(f.nachricht)}
      />
      <input type="hidden" name="sprache" value={sprache} />
      {/* Honeypot: aus dem Bild geschoben, nicht per display:none, weil
          manche Bots versteckte Felder auslassen. */}
      <div
        className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="anfrage-website">{texte.website}</label>
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
        {texte.hinweis}{" "}
        <Link href="/datenschutz" className={inlineLinkKlassen}>
          {texte.datenschutz}
        </Link>
      </p>
      <div className="flex flex-col items-start gap-3">
        <Knopf type="submit" aria-disabled={laeuft || undefined}>
          {laeuft ? texte.wirdGesendet : texte.senden}
        </Knopf>
        {/* Dauerhaft im Baum, nur der Text wechselt: eine Live-Region, die
            erst mit Inhalt entsteht, wird oft nicht vorgelesen. */}
        <p role="alert" className="min-h-6 text-sm font-medium text-fehler">
          {zustand.fehler ? texte.fehler[zustand.fehler] : ""}
        </p>
      </div>
    </form>
  );
}
