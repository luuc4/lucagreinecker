import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Fakten, SeitenKopf } from "@/components/Abschnitt";
import { KnopfLink } from "@/components/KnopfLink";
import { NeuerTab } from "@/components/NeuerTab";
import { Portrait } from "@/components/Portrait";
import { textlinkKlassen } from "@/components/Textlink";
import { sprachMetadaten } from "@/i18n/seo";
import { seitenSprache } from "@/i18n/sprache";
import { KONTAKT } from "@/lib/inhalte/statisch";
import { mailLink } from "@/lib/kontakt/links";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sprache = await seitenSprache(params);
  const t = await getTranslations({ locale: sprache, namespace: "ueberMich" });
  return {
    title: t("titel"),
    description: t("beschreibung"),
    ...(await sprachMetadaten("/ueber-mich", sprache)),
  };
}

// Über mich, kurz und nebensächlich (AGENTS.md „Projekt"): links das
// Porträt (seit 28.10.2026, Aufbau wie die Projektseite: Bild links,
// Text rechts), rechts Lucas Sätze, die Fakten aus der alten Seite als
// Tabelle und die Wege zu ihm. Am Handy alles untereinander, das Bild
// 320 px mittig.
export default async function UeberMich({ params }: Props) {
  await seitenSprache(params);
  const t = await getTranslations("ueberMich");
  const m = await getMessages();
  return (
    <>
      <SeitenKopf titel={t("titel")} art={t("art")} />
      <section className="inhalt" aria-label={t("zurPerson")}>
        <div className="grid items-start gap-8 pb-abschnitt lg:grid-cols-[5fr_7fr] lg:gap-x-14">
          <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-[420px]">
            <Portrait
              alt={t("foto")}
              sizes="(min-width: 1024px) 420px, 320px"
            />
          </div>
          <div>
            <div className="flex flex-col gap-4 text-lg">
              {m.ueberMich.saetze.map((satz) => (
                <p key={satz}>{satz}</p>
              ))}
            </div>
            <Fakten
              zeilen={m.ueberMich.fakten}
              betont="begriff"
              handy="untereinander"
              className="mt-8"
            />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <KnopfLink href="/kontakt">{t("nachricht")}</KnopfLink>
              {KONTAKT.email ? (
                <a
                  href={mailLink(KONTAKT.email, t("mailBetreff"))}
                  className={textlinkKlassen}
                >
                  {t("mail")}
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
                  <NeuerTab />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
