import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Fakten } from "@/components/Abschnitt";
import { JsonLd } from "@/components/JsonLd";
import { KnopfLink } from "@/components/KnopfLink";
import { ProjektBild } from "@/components/ProjektBild";
import { textlinkKlassen } from "@/components/Textlink";
import { Wischleiste } from "@/components/Wischleiste";
import { Link } from "@/i18n/navigation";
import { sprachMetadaten } from "@/i18n/seo";
import { seitenSprache } from "@/i18n/sprache";
import { PROJEKTE } from "@/lib/inhalte/projekte";
import { KONTAKT } from "@/lib/inhalte/statisch";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sprache = await seitenSprache(params);
  return sprachMetadaten("/", sprache);
}

// Startseite (Design „Reihe", Vorlage ab-start.html?v=1 im Tag entwuerfe-2026-09):
// Lucas Satz mittig, die vier Handy-Screens als Reihe (am Handy eine
// Wischleiste mit Hinweis), das Rundum-sorglos-Paket als Tabelle, dann die Anfrage.
// Jeder Block trägt pb-abschnitt unten (leitfaden/05). Texte in
// messages/<sprache>.ts (seite, start, paket, projekte).
export default async function Startseite({ params }: Props) {
  await seitenSprache(params);
  const t = await getTranslations();
  const m = await getMessages();
  return (
    <>
      <section className="inhalt flex flex-col items-center gap-7 pt-12 pb-abschnitt text-center md:pt-20">
        <h1 className="max-w-[16ch] text-display font-medium">
          {t("seite.satz")}
        </h1>
        <p className="max-w-[48ch] text-lg md:text-xl">
          {t("start.ueberLuca")}
        </p>
        <p>
          <KnopfLink href="/kontakt" groesse="lg">
            {t("start.knopf")}
          </KnopfLink>
        </p>
      </section>

      <section
        id={t("anker.projekte")}
        aria-label={t("start.projekte")}
        className="inhalt"
      >
        <Wischleiste hinweis={t("start.wischen")}>
          {PROJEKTE.map((projekt, i) => {
            const texte = m.projekte[projekt.slug];
            const ziel = {
              pathname: "/projekte/[slug]",
              params: { slug: projekt.slug },
            } as const;
            return (
              <li key={projekt.slug} className="snap-center">
                <figure>
                  <Link
                    href={ziel}
                    className="block rounded-bild focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                    aria-label={t("start.zurProjektseite", {
                      name: projekt.name,
                    })}
                  >
                    <ProjektBild
                      projekt={projekt}
                      ansicht="handy"
                      alt={t("projekt.bildHandy", { name: projekt.name })}
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 42vw, 76vw"
                      className="rounded-bild"
                      zuerst={i === 0}
                    />
                  </Link>
                  <figcaption className="pt-3.5">
                    <Link
                      href={ziel}
                      className="text-2xl leading-tight font-medium tracking-tight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                    >
                      {projekt.name}
                    </Link>
                    <p className="mt-1 text-[0.9375rem] leading-snug text-fg-leise">
                      {texte.kurz}
                    </p>
                    {texte.stand && (
                      <p className="mt-1 text-[0.9375rem] leading-snug">
                        {texte.stand.kurz}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </Wischleiste>
      </section>

      <section
        id={t("anker.paket")}
        aria-labelledby="paket-titel"
        className="inhalt"
      >
        <div className="grid gap-6 border-t border-fg pt-7 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-10 lg:pt-9">
          <div>
            <h2 id="paket-titel" className="max-w-[14ch] text-h2 font-medium">
              {t("paket.titel")}
            </h2>
            <p className="mt-3 max-w-[40ch]">{t("paket.satz")}</p>
          </div>
          <Fakten
            zeilen={m.paket.punkte}
            betont="begriff"
            handy="untereinander"
          />
        </div>
      </section>

      <section id="anfrage" aria-labelledby="anfrage-titel" className="inhalt">
        <div className="mx-auto max-w-[62ch] pb-abschnitt text-center">
          <h2 id="anfrage-titel" className="text-h2 font-medium">
            {t("start.anfrage.titel")}
          </h2>
          <p className="mt-4">{t("start.anfrage.text")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <KnopfLink href="/kontakt">
              {t("start.anfrage.nachricht")}
            </KnopfLink>
            <a href="/api/kontakt.vcf" className={textlinkKlassen}>
              {t("start.anfrage.speichern")}
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        daten={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: KONTAKT.firma,
          url: siteUrl(),
          // Seit Oktober 2026 (ueberMich): eine globale Rolle, deshalb
          // ohne Werk und Ort. Der Titel steht englisch wie bei Ball.
          jobTitle: "Specialist, Data Analytics and Insights",
          worksFor: { "@type": "Organization", name: "Ball Corporation" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bludenz",
            addressRegion: "Vorarlberg",
            addressCountry: "AT",
          },
          knowsAbout: m.start.kenntnisse,
          ...(KONTAKT.email ? { email: KONTAKT.email } : {}),
          ...(KONTAKT.profile.length > 0
            ? { sameAs: KONTAKT.profile.map((p) => p.url) }
            : {}),
        }}
      />
    </>
  );
}
