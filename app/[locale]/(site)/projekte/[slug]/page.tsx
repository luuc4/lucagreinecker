import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Fakten, SeitenKopf } from "@/components/Abschnitt";
import { KnopfLink } from "@/components/KnopfLink";
import { ProjektBild } from "@/components/ProjektBild";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { sprachMetadaten } from "@/i18n/seo";
import { seitenSprache } from "@/i18n/sprache";
import { istProjektSlug, PROJEKT, PROJEKTE } from "@/lib/inhalte/projekte";

// Eine Seite je Projekt und Sprache (Design „Reihe", Vorlage
// ab-projekt.html?v=1 im Tag entwuerfe-2026-09): Titel und Art-Zeile mittig,
// Lucas Satz als Vorspann, dann das Handy-Bild links und die Fakten rechts
// mit dem Knopf zur Seite, darunter das Desktop-Bild in voller Breite,
// zuletzt die drei anderen Projekte als Zeile. Statisch gebaut: Sprachen ×
// Einträge in PROJEKTE; die Texte je Projekt stehen in messages (projekte).
type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJEKTE.map((p) => ({ locale, slug: p.slug })),
  );
}

export const dynamicParams = false;

async function laden(params: Props["params"]) {
  const sprache = await seitenSprache(params);
  const { slug } = await params;
  if (!istProjektSlug(slug)) notFound();
  const [t, m] = await Promise.all([
    getTranslations({ locale: sprache, namespace: "projekt" }),
    getMessages({ locale: sprache }),
  ]);
  return { sprache, slug, projekt: PROJEKT[slug], t, texte: m.projekte[slug] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sprache, slug, projekt, t, texte } = await laden(params);
  return {
    title: projekt.name,
    description: t("beschreibung", {
      name: projekt.name,
      art: texte.art,
      zeitraum: texte.zeitraum,
    }),
    ...(await sprachMetadaten(
      { pathname: "/projekte/[slug]", params: { slug } },
      sprache,
    )),
  };
}

export default async function Projektseite({ params }: Props) {
  const { projekt, t, texte } = await laden(params);
  const andere = PROJEKTE.filter((p) => p.slug !== projekt.slug);

  return (
    <>
      <SeitenKopf titel={projekt.name} art={texte.art} vorspann={texte.satz} />

      <section className="inhalt" aria-label={t("amHandy")}>
        <div className="grid items-start gap-8 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-14">
          <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-[420px]">
            <ProjektBild
              projekt={projekt}
              ansicht="handy"
              alt={t("bildHandy", { name: projekt.name })}
              sizes="(min-width: 1024px) 420px, 320px"
              className="rounded-bild"
              zuerst
            />
          </div>
          <div>
            <Fakten
              zeilen={[
                { begriff: t("kunde"), wert: texte.kunde },
                { begriff: t("zeitraum"), wert: texte.zeitraum },
                ...(texte.stand
                  ? [{ begriff: t("stand"), wert: texte.stand.lang }]
                  : []),
                { begriff: t("seiten"), wert: texte.seiten },
                { begriff: t("funktionen"), wert: texte.funktionen },
                { begriff: t("stack"), wert: texte.stack },
                { begriff: t("betrieb"), wert: texte.betrieb },
              ]}
            />
            {projekt.url && (
              <p className="mt-6">
                <KnopfLink href={projekt.url}>
                  {t("oeffnen", { domain: projekt.domain })}
                </KnopfLink>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="inhalt" aria-label={t("amDesktop")}>
        <div className="pb-abschnitt">
          <ProjektBild
            projekt={projekt}
            ansicht="desktop"
            alt={t("bildDesktop", { name: projekt.name })}
            sizes="(min-width: 1440px) 1328px, 100vw"
          />
        </div>
      </section>

      <nav className="inhalt" aria-label={t("weitere")}>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-fg pt-6 pb-abschnitt">
          <span className="basis-full text-[0.9375rem] text-fg-leise md:basis-auto">
            {t("weitere")}
          </span>
          {andere.map((p) => (
            <Link
              key={p.slug}
              href={{ pathname: "/projekte/[slug]", params: { slug: p.slug } }}
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
