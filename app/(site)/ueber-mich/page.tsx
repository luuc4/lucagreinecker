import type { Metadata } from "next";
import { Fakten, SeitenKopf } from "@/components/Abschnitt";
import { KnopfLink } from "@/components/Knopf";
import { textlinkKlassen } from "@/components/Textlink";
import { KONTAKT, PLATZHALTER, UEBER_MICH } from "@/lib/inhalte/statisch";
import { mailLink } from "@/lib/kontakt/links";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Luca Greinecker aus Bludenz: Lean Leader bei Ball in Ludesch, Informatiker (BSc), baut nebenbei Websites und Web‑Apps für Vorarlberg.",
};

// Über mich, kurz und nebensächlich (AGENTS.md „Projekt"): links Lucas
// Sätze (bis dahin Platzhalter), rechts die Fakten aus der alten Seite als
// Tabelle, darunter die Wege zu ihm. Kein Foto, solange Luca keines will
// (TODO.md, Zuarbeit).
export default function UeberMich() {
  return (
    <>
      <SeitenKopf titel="Über mich" art={UEBER_MICH.art} />
      <section className="inhalt" aria-label="Zur Person">
        <div className="grid gap-8 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-14">
          <div className="flex flex-col gap-4 text-lg">
            {UEBER_MICH.saetze.length > 0 ? (
              UEBER_MICH.saetze.map((satz) => <p key={satz}>{satz}</p>)
            ) : (
              <>
                <p>
                  <span className="platz">{PLATZHALTER}</span> Wer du bist, wo
                  du herkommst, was du bei Ball machst.
                </p>
                <p>
                  <span className="platz">{PLATZHALTER}</span> Warum du nebenbei
                  Websites baust und wie du arbeitest.
                </p>
              </>
            )}
          </div>
          <div>
            <Fakten zeilen={UEBER_MICH.fakten} betont="begriff" />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <KnopfLink href="/kontakt">Nachricht schreiben</KnopfLink>
              {KONTAKT.email ? (
                <a
                  href={mailLink(KONTAKT.email, "Anfrage")}
                  className={textlinkKlassen}
                >
                  Mail schreiben
                </a>
              ) : null}
              {KONTAKT.profile.map((profil) => (
                <a
                  key={profil.url}
                  href={profil.url}
                  className={textlinkKlassen}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profil.name}
                  <span className="sr-only"> (öffnet in neuem Tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
