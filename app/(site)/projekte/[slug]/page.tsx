import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fakten, SeitenKopf } from "@/components/Abschnitt";
import { KnopfLink } from "@/components/Knopf";
import { ProjektBild } from "@/components/ProjektBild";
import { PROJEKTE, projektNachSlug } from "@/lib/inhalte/projekte";
import { PLATZHALTER } from "@/lib/inhalte/statisch";

// Eine Seite je Projekt (Design „Reihe", Vorlage
// docs/design/richtungen/ab-projekt.html?v=1): Titel und Art-Zeile mittig,
// Lucas Satz als Vorspann, dann das Handy-Bild links und die Fakten rechts
// mit dem Knopf zur Seite, darunter das Desktop-Bild in voller Breite,
// zuletzt die drei anderen Projekte als Zeile. Statisch gebaut, eine Seite
// je Eintrag in PROJEKTE.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJEKTE.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projekt = projektNachSlug((await params).slug);
  if (!projekt) return {};
  return {
    title: projekt.name,
    description: `${projekt.name}: ${projekt.art}. Gebaut von Luca Greinecker, ${projekt.zeitraum}.`,
  };
}

export default async function Projektseite({ params }: Props) {
  const projekt = projektNachSlug((await params).slug);
  if (!projekt) notFound();
  const andere = PROJEKTE.filter((p) => p.slug !== projekt.slug);

  return (
    <>
      <SeitenKopf
        titel={projekt.name}
        art={projekt.art}
        vorspann={
          projekt.satz ?? (
            <>
              <span className="platz">{PLATZHALTER}</span> Was der Kunde wollte,
              was schwierig war, worauf du stolz bist.
            </>
          )
        }
      />

      <section className="inhalt" aria-label="Das Projekt am Handy">
        <div className="grid items-start gap-8 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-14">
          <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-[420px]">
            <ProjektBild
              projekt={projekt}
              ansicht="handy"
              sizes="(min-width: 1024px) 420px, 320px"
              className="rounded-bild"
              zuerst
            />
          </div>
          <div>
            <Fakten
              zeilen={[
                { begriff: "Kunde", wert: projekt.kunde },
                { begriff: "Zeitraum", wert: projekt.zeitraum },
                { begriff: "Seiten", wert: projekt.seiten },
                { begriff: "Funktionen", wert: projekt.funktionen },
                { begriff: "Stack", wert: projekt.stack },
                { begriff: "Betrieb", wert: projekt.betrieb },
              ]}
            />
            <p className="mt-6">
              <KnopfLink href={projekt.url}>{projekt.domain} öffnen</KnopfLink>
            </p>
          </div>
        </div>
      </section>

      <section className="inhalt" aria-label="Das Projekt am Desktop">
        <div className="pb-abschnitt">
          <ProjektBild
            projekt={projekt}
            ansicht="desktop"
            sizes="(min-width: 1440px) 1328px, 100vw"
          />
        </div>
      </section>

      <nav className="inhalt" aria-label="Weitere Projekte">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-fg pt-6 pb-abschnitt">
          <span className="basis-full text-[0.9375rem] text-fg-leise md:basis-auto">
            Weitere Projekte
          </span>
          {andere.map((p) => (
            <Link
              key={p.slug}
              href={`/projekte/${p.slug}`}
              className="text-h3 font-medium tracking-tight underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg md:text-h2"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
