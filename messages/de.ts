import type { ProjektSlug } from "@/lib/inhalte/projekte";

// Alle deutschen Texte der Seite, nach Bereichen (leitfaden/15). Diese
// Datei ist die Form: messages/en.ts muss dieselben Schlüssel haben
// (Typ `Nachrichten`, dazu messages.test.ts). TypeScript statt JSON, damit
// Kommentare mit Quelle und Datum bei den Sätzen stehen bleiben
// (Entscheidung 28.10.2026). Platzhalter in geschweiften Klammern füllt
// `t()`; Listen liest `getMessages()`.
//
// Die Sätze hat Claude am 26.09.2026 auf Lucas Wunsch („denk dir paar
// menschliche passende saubere texte aus") aus den Fakten der Repos und der
// alten Seite geschrieben; Luca liest gegen und ändert, was nicht nach ihm
// klingt (AGENTS.md, Entscheidungen). Nur echte Inhalte, nie erfinden;
// eine Lücke steht als [TEXT LUCA] sichtbar im Text (PLATZHALTER).

// Texte je Projekt. Fakten aus den Repos (AGENTS.md „Stand",
// Stack-Tabellen, Routen); `satz` ist Lucas Satz zum Projekt (was der
// Kunde wollte, was schwierig war). `stand` nur, solange ein Projekt noch
// nicht unter seiner Domain live ist (ohne Knopf wie OZ bis 04.10.2026, oder
// mit Knopf auf die Übergangsadresse wie Selseven): `kurz` unter der Zeile
// auf der Startseite, `lang` als Zeile in den Fakten.
export type ProjektTexte = {
  // Eine Zeile: was es ist, für wen, wo (Art-Zeile unter dem Titel).
  art: string;
  // Kürzer, für die Zeile unter dem Handy auf der Startseite.
  kurz: string;
  kunde: string;
  zeitraum: string;
  seiten: string;
  funktionen: string;
  stack: string;
  betrieb: string;
  satz: string;
  stand?: { kurz: string; lang: string };
};

const projekte: Record<ProjektSlug, ProjektTexte> = {
  "oz-calisthenics": {
    art: "Kursbuchung, Trainingspläne und Website für einen Calisthenics‑Coach in Bludenz und Rankweil",
    kurz: "Kursbuchung für einen Calisthenics‑Coach, Bludenz",
    kunde: "Olcay Zengin, Calisthenics-Coach, Bludenz und Rankweil",
    // Fakten nachgezogen am 07.10.2026 aus ~/projects/ozcalisthenics
    // (AGENTS.md „Stand" bis zur Barzahlung vom 04.10.2026, Routen,
    // package.json); Prod kann seit dem 04.10.2026 alles, was Staging kann.
    zeitraum: "seit September 2026, online seit Oktober 2026",
    seiten:
      "Start, Kurse, Preise, Über mich, FAQ, Events, News, Zusammenarbeit, Kontakt, Buchen, Kaufen; Konto mit Buchungen, Guthaben und Trainingsplan; Admin",
    funktionen:
      "Kurse buchen und bezahlen (Stripe oder bar vor Ort), 5er- und 10er-Blöcke online kaufen, Einzeltraining mit persönlichem Angebot, Konto mit Passkeys, Trainingsplan mit Timer, Sätzen und Wochenziel, Belege als PDF, Erinnerungen und Tageslisten per Mail, Storno und Widerruf; Admin für Termine, Kurse, Buchungen, Kunden, Pläne, News, Events und FAQ",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL mit Drizzle, Better Auth (Code und Passkeys), Stripe, pg-boss, pdfkit, sharp, Scaleway Mail, Umami",
    betrieb:
      "Docker-Image aus GitHub Actions, Coolify auf einem Hetzner-Server, Staging-Umgebung, kein Deploy während der Kurszeiten",
    satz: "Olcay wollte, dass seine Leute Kursplätze direkt online buchen und bezahlen können. Daraus ist eine komplette Kursverwaltung geworden: Termine, Buchungen, Zahlung über Stripe oder bar, Blöcke, Belege und Erinnerungen, dazu Trainingspläne fürs Training zuhause, alles in einem Admin, das Olcay am Handy bedient.",
  },
  punktetafel: {
    art: "Eigene Web‑App: Punkte zählen für Kartenspiele am Tisch",
    kurz: "Eigene Web‑App: Punkte zählen am Spieltisch",
    kunde: "Eigenes Projekt",
    zeitraum: "Juli bis September 2026",
    seiten:
      "Start mit 33 Spielen in Gruppen, Partie und Regeln je Spiel, Spieleabend, Kartenblätter",
    funktionen:
      "Runden anschreiben, Stand und Podium, Stechen bei Gleichstand, Ein- und Ausstieg mitten in der Partie, Teams, Spieleabend über mehrere Spiele; läuft offline als PWA, die Daten bleiben am Gerät",
    stack: "Next.js 16, React 19, TypeScript, Tailwind 4, motion, Zod, Vitest",
    betrieb:
      "Coolify auf einem Hetzner-Server, Cloudflare davor, Umami, Feedback per ntfy",
    satz: "Mein eigenes Projekt: Punkte zählen bei Kartenspielen am Tisch, ohne Zettel und ohne Konto. 33 Spiele von Wizard bis Jassen, läuft offline als App am Handy, die Daten bleiben am Gerät.",
  },
  "usta-streetfood": {
    art: "Website mit Mini‑CMS für einen Foodtruck in Nenzing",
    kurz: "Website mit Mini‑CMS für einen Foodtruck, Nenzing",
    kunde: "Akin Akgün, USTA Streetfood, Foodtruck in Nenzing",
    zeitraum: "September 2026",
    seiten:
      "Start (Status, News, Kacheln), Speisekarte, Über mich, Kontakt und Anfahrt, Bilder, Impressum, Datenschutz; Admin am Handy",
    funktionen:
      "Status „Ausverkauft“ mit Zusatztext, Öffnungszeiten mit Ausnahmen, News, Speisekarte mit „verfügbar“, Bild-Upload mit Zuschnitt, Texte – Akin pflegt alles selbst am Handy; Karten-Knöpfe, vCard, Öffnungszeiten als Kalenderdatei",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL mit Drizzle, Better Auth (Code und Passkeys), sharp, Umami",
    betrieb:
      "Docker-Image aus GitHub Actions, Coolify auf einem IONOS-VPS, PostgreSQL",
    satz: "Akin wollte seinen Foodtruck selbst pflegen: Ausverkauft melden, Öffnungszeiten ändern, die Speisekarte anpassen, Fotos hochladen. Das macht er jetzt am Handy im Admin, ohne jemanden fragen zu müssen.",
  },
  "jonathan-walch": {
    art: "Portfolio für einen InterMedia‑Studenten der FH Vorarlberg",
    kurz: "Portfolio für einen InterMedia‑Studenten, FH Vorarlberg",
    kunde: "Jonathan Walch, InterMedia-Student an der FH Vorarlberg",
    zeitraum: "Januar 2026",
    seiten: "Start, Projekte, Impressum, Lebenslauf als PDF",
    funktionen:
      "Vier Projekt-Case-Studies mit Galerien, Menü am Handy, ohne Tracking und Cookies",
    stack: "HTML, CSS, JavaScript ohne Framework",
    betrieb: "GitHub Pages mit eigener Domain",
    satz: "Jonathan studiert InterMedia an der FH Vorarlberg und wollte seine Design-Projekte zeigen: vier Arbeiten mit Galerien und der Lebenslauf als PDF, als schlanke Seite ohne Framework.",
  },
  selseven: {
    art: "Website mit Mini‑CMS für einen Friseursalon in Feldkirch",
    kurz: "Website mit Mini‑CMS für einen Friseursalon, Feldkirch",
    // Fakten am 29.10.2026 aus ~/projects/selseven (AGENTS.md „Projekt",
    // „Stack", „Stand", Routen, package.json). Selins Nachname steht dort
    // noch nicht, deshalb nur der Vorname.
    kunde: "Selin, Friseursalon Selseven in der Altstadt von Feldkirch",
    zeitraum: "seit Oktober 2026, online ab November 2026",
    seiten:
      "Start (Status, Anrufen und WhatsApp, Leistungen, Über den Salon), Leistungen & Preise, News, Kontakt mit Anfahrt und Öffnungszeiten, Impressum, Datenschutz; Admin am Handy",
    funktionen:
      "Status „Jetzt geöffnet“ aus den Öffnungszeiten, Betriebsurlaub und Feiertage als Ausnahmen, Preisliste mit Preisen nach Haarlänge, News, Texte, Kontaktformular – Selin pflegt alles selbst im Admin, Anmeldung mit Code oder Passkey",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL mit Drizzle, Better Auth (Code und Passkeys), pg-boss, Umami",
    betrieb:
      "Docker-Image aus GitHub Actions, Coolify auf einem Hetzner-Server (gemeinsam mit OZ Calisthenics)",
    // Von Claude am 29.10.2026 aus den Fakten geschrieben wie die anderen
    // Sätze (26.09.2026); Luca liest gegen.
    satz: "Selin wollte, dass man in Feldkirch schnell sieht, ob ihr Salon offen hat, was es kostet und wo er ist, und dann gleich anruft oder auf WhatsApp schreibt. Öffnungszeiten, Betriebsurlaub, Preise und News pflegt sie selbst im Admin am Handy.",
    // Luca, 29.10.2026: „release november oder so". Ohne Adresse im Satz:
    // der Knopf darunter nennt sie, und am Handy brach sie mitten im Wort.
    stand: {
      kurz: "In Arbeit, online ab November 2026",
      lang: "In Arbeit, geht im November 2026 unter der eigenen Domain online. Bis dahin läuft sie unter einer Vorschau-Adresse.",
    },
  },
};

export const de = {
  seite: {
    // Der Satz oben auf der Startseite und im OG-Bild: Lucas Wortlaut aus
    // dem Kickoff, von ihm am 25.09.2026 bestätigt („kickoff wortlaut ist
    // cool").
    satz: "Ich baue Websites und Web‑Apps für Leute und Betriebe in Vorarlberg.",
    // Meta-Description (≤ 160 Zeichen): was, für wen, wo.
    beschreibung:
      "Luca Greinecker aus Bludenz baut Websites und Web-Apps für Leute und Betriebe in Vorarlberg. Design, Umsetzung, Server und Betrieb aus einer Hand.",
  },
  sprache: {
    // Der Link im Kopf, im Menü und im Fuß nennt die andere Sprache in
    // deren eigener Schreibweise (mit lang-Attribut).
    wechsel: "English",
  },
  layout: {
    zumInhalt: "Zum Inhalt springen",
  },
  kopf: {
    navigation: "Hauptnavigation",
    kontakt: "Kontakt",
    menue: "Menü",
    schliessen: "Schließen",
  },
  // Labels der Hauptnavigation (NAVIGATION in lib/inhalte/statisch.ts).
  navigation: {
    projekte: "Projekte",
    paket: "Paket",
    ueberMich: "Über mich",
  },
  // Anker auf der Startseite, je Sprache lesbar in der Adresse.
  anker: {
    projekte: "projekte",
    paket: "paket",
  },
  fuss: {
    seiten: "Seiten",
    start: "Start",
    kontakt: "Kontakt",
    kontaktSpeichern: "Kontakt speichern",
    rechtliches: "Rechtliches",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },
  links: {
    neuerTab: "(öffnet in neuem Tab)",
  },
  // Startseite: der Satz unter dem großen Satz und der Block vor dem Fuß.
  start: {
    ueberLuca:
      "Ich bin Luca aus Bludenz. Hauptberuflich mache ich bei Ball Datenanalyse für die Produktion, Websites baue ich nebenbei, von der ersten Skizze bis zum laufenden Server.",
    // Der Knopf unter dem Satz: sagt, was passiert, und heißt wie der im
    // Anfrage-Block unten – nicht „Kontakt" wie der Knopf im Kopf daneben
    // (Durchsicht 28.10.2026).
    knopf: "Nachricht schreiben",
    projekte: "Projekte",
    zurProjektseite: "{name}: zur Projektseite",
    wischen: "Wischen",
    anfrage: {
      titel: "Schreib mir, was du brauchst.",
      text: "Kurz reicht: wer du bist, was die Seite können soll und bis wann. Ich melde mich mit einer ehrlichen Einschätzung, was geht und was es kostet.",
      nachricht: "Nachricht schreiben",
      speichern: "Kontakt speichern",
    },
    // knowsAbout im JSON-LD der Startseite.
    kenntnisse: ["Webentwicklung", "Datenanalyse", "Lean Management"],
  },
  // „Rundum-sorglos-Paket“ (Lucas Stichworte, 25.09.2026: „server setup /
  // erstellung, umami reichweitenmessung immer dabei usw.“). Die Punkte
  // jenseits seiner Stichworte stammen aus dem Leitfaden (Server, Domains,
  // Mails, Backups, Rechtstexte, Übergabe).
  paket: {
    titel: "Rundum‑sorglos‑Paket",
    satz: "Bei mir gehört alles dazu, was eine Website zum Laufen braucht: eigener Server, Domain, Reichweitenmessung, Updates. Du bekommst eine Seite, die läuft, und einen Ansprechpartner, wenn etwas ist.",
    punkte: [
      {
        begriff: "Website",
        wert: "Design und Umsetzung, deine Texte und Bilder eingebaut",
      },
      {
        begriff: "Server",
        wert: "Eigener Server, Setup und Einrichtung, Domain, DNS, Zertifikate, Mail-Versand",
      },
      {
        begriff: "Reichweite",
        wert: "Umami-Reichweitenmessung, immer dabei, ohne Cookie-Banner",
      },
      { begriff: "Betrieb", wert: "Updates, Backups, Überwachung" },
      {
        begriff: "Recht",
        wert: "Impressum und Datenschutz vorbereitet, Prüfstellen markiert",
      },
      {
        begriff: "Übergabe",
        wert: "Kurze Anleitung, wenn du selbst pflegen willst; sonst mache ich die Änderungen",
      },
    ],
  },
  // Projektseite: Beschriftungen, die für jedes Projekt gleich sind.
  projekt: {
    beschreibung: "{name}: {art}. Gebaut von Luca Greinecker, {zeitraum}.",
    amHandy: "Das Projekt am Handy",
    amDesktop: "Das Projekt am Desktop",
    bildHandy: "Startseite von {name} am Handy",
    bildDesktop: "Startseite von {name} am Desktop",
    kunde: "Kunde",
    zeitraum: "Zeitraum",
    stand: "Stand",
    seiten: "Seiten",
    funktionen: "Funktionen",
    stack: "Stack",
    betrieb: "Betrieb",
    oeffnen: "{domain} öffnen",
    weitere: "Weitere Projekte",
  },
  projekte,
  // Über mich: Fakten aus der alten Startseite (Tag statisch-2026-09,
  // Abschnitt „Über mich“), die Sätze dazu aus denselben Fakten. Beruf seit
  // Oktober 2026 nach Lucas LinkedIn-Profil (07.10.2026): Specialist, Data
  // Analytics and Insights, eine globale Rolle bei Ball; vorher Continuous
  // Improvement / Lean Leader in Ludesch (November 2025 bis Oktober 2026).
  ueberMich: {
    titel: "Über mich",
    beschreibung:
      "Luca Greinecker aus Bludenz: Datenanalyse bei Ball, Informatiker (BSc), baut nebenbei Websites und Web‑Apps für Vorarlberg.",
    art: "Luca Greinecker, Bludenz",
    foto: "Luca Greinecker, Porträt",
    zurPerson: "Zur Person",
    saetze: [
      "Ich bin Luca Greinecker aus Bludenz. Gelernt habe ich Elektrotechniker bei Ball in Ludesch, danach Instandhaltung im Schichtbetrieb, Zivildienst beim Roten Kreuz und zurück zu Ball ins Trainee-Programm. Ab November 2025 war ich dort Continuous Improvement / Lean Leader im Werk Ludesch. Seit Oktober 2026 bin ich Specialist, Data Analytics and Insights, eine globale Rolle: Ich baue Werkzeuge für Datenanalyse, Kennzahlen und Automatisierung in den Werken von Ball.",
      "Nebenbei habe ich Informatik an der FH Vorarlberg studiert, Schwerpunkt Digital Innovation, seit 2026 mit Bachelor. Aus Job und Studium kommt die Mischung, die ich für Websites brauche: zuerst verstehen, was jemand im Alltag wirklich braucht, dann sauber bauen.",
      "Websites baue ich nebenbei für Leute und Betriebe aus der Region. Die Punktetafel ist mein eigenes Projekt: Punkte zählen bei Kartenspielen am Tisch, ohne Zettel.",
    ],
    // Ohne Zeile „Werdegang": die stand schon im ersten Absatz (Durchsicht
    // 28.10.2026).
    fakten: [
      {
        begriff: "Beruf",
        wert: "Specialist, Data Analytics and Insights bei Ball, seit Oktober 2026",
      },
      {
        begriff: "Ausbildung",
        wert: "Informatik (BSc, Digital Innovation) an der FH Vorarlberg, berufsbegleitend, 2026; Lehre Elektrotechnik bei Ball",
      },
      {
        begriff: "Nebenbei",
        wert: "Websites und Web-Apps für Leute und Betriebe in Vorarlberg",
      },
      { begriff: "Abseits", wert: "Wandern, Skifahren, Reisen" },
    ],
    nachricht: "Nachricht schreiben",
    mail: "Mail schreiben",
    mailBetreff: "Anfrage",
  },
  kontakt: {
    titel: "Kontakt",
    beschreibung:
      "So erreichst du {name} in Bludenz: Nachricht über das Formular, E-Mail oder Kontakt speichern.",
    nachricht: "Nachricht schreiben",
    direkt: "Direkt schreiben",
    anrufenOderSchreiben: "Anrufen oder schreiben",
    mailBetreff: "Anfrage",
    whatsapp: "WhatsApp",
    // Vorgetippt, in der Stimme dessen, der schreibt.
    whatsappText: "Hallo Luca, ich hätte eine Frage: ",
    speichern: {
      titel: "Kontakt speichern",
      text: "Legt {name} mit allen Angaben in den Kontakten an.",
      knopf: "Kontakt speichern",
    },
    adresse: "Adresse",
  },
  // Kontaktformular: Beschriftungen, Zustände und die Meldungen je Fehler.
  // Die Feldfehler kommen vom Server als Code (lib/anfrage/felder.ts) und
  // werden hier zu Sätzen.
  formular: {
    name: "Name",
    email: "E-Mail",
    telefon: "Telefon (optional)",
    nachricht: "Nachricht",
    website: "Website (leer lassen)",
    hinweis:
      "Die Nachricht geht direkt an {name} und wird auf der Website nicht gespeichert.",
    datenschutz: "Datenschutz",
    senden: "Nachricht senden",
    wirdGesendet: "Wird gesendet …",
    gesendet: "Nachricht gesendet",
    antwort: "Die Antwort kommt an {an}.",
    fehler: {
      // Seit 28.10.2026 ohne „Telefon“: auf der Seite steht keine Nummer.
      drossel:
        "Zu viele Nachrichten in kurzer Zeit. Bitte später noch einmal versuchen oder direkt per E-Mail schreiben.",
      senden:
        "Die Nachricht konnte gerade nicht gesendet werden. Bitte direkt per E-Mail schreiben.",
      aus: "Das Kontaktformular ist ausgeschaltet.",
    },
    feld: {
      nameMin: "Bitte den Namen angeben.",
      nameMax: "Höchstens {n} Zeichen.",
      emailMin: "Bitte die E-Mail-Adresse angeben.",
      emailMax: "Höchstens {n} Zeichen.",
      emailFormat: "Diese E-Mail-Adresse stimmt nicht.",
      telefonMax: "Höchstens {n} Zeichen.",
      telefonFormat: "Nur Ziffern, Leerzeichen und + ( ) / - .",
      nachrichtMin: "Die Nachricht braucht mindestens {n} Zeichen.",
      nachrichtMax: "Höchstens {n} Zeichen.",
    },
  },
  // Impressum und Offenlegung (§ 5 ECG, § 25 MedienG). Angaben von Luca
  // (26.09.2026). Offene Prüfstellen für WKO oder Anwalt stehen in TODO.md,
  // Etappe 3 – nicht auf der Seite. `hinweis` bleibt auf Deutsch leer: die
  // deutsche Fassung ist die verbindliche, die englische sagt das dazu.
  impressum: {
    titel: "Impressum",
    hinweis: "",
    medieninhaber: "Medieninhaber und Herausgeber",
    email: "E-Mail:",
    land: "Österreich",
    gegenstand: {
      titel: "Unternehmensgegenstand",
      text: "Persönliche Website: Vorstellung eigener Webprojekte und Kontaktmöglichkeit. Derzeit keine Gewerbeberechtigung.",
    },
    richtung: {
      titel: "Grundlegende Richtung",
      text: "Information über die Webprojekte von Luca Greinecker und den Weg, ihn zu erreichen (§ 25 Abs. 4 MedienG).",
    },
    // Bis 26.09.2026 stand hier „mit Zustimmung der jeweiligen Betreiber" –
    // das stimmt erst, wenn alle vier zugesagt haben (TODO.md, Prüfstelle
    // 6). Für den Go-live ohne diese Aussage.
    projekte: {
      titel: "Projekte anderer",
      text: "Die Bildschirmfotos und Namen der Kundenprojekte (OZ Calisthenics, USTA Streetfood, Jonathan Walch, Selseven) zeigen Websites, die ich für die jeweiligen Betreiber gebaut habe. Für die Inhalte dieser Websites sind sie selbst verantwortlich.",
    },
    links: {
      titel: "Links",
      text: "Für Inhalte verlinkter Seiten sind deren Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar; wird mir einer bekannt, entferne ich den Link.",
    },
    urheberrecht: {
      titel: "Urheberrecht",
      text: "Texte, Gestaltung und Code dieser Website stammen von Luca Greinecker. Verwendung außerhalb des Urheberrechts nur mit schriftlicher Zustimmung.",
    },
    stand: "Stand: {datum}",
  },
  // Datenschutzerklärung (DSGVO, TKG 2021). Jeder Punkt beschreibt, was der
  // Server wirklich tut (leitfaden/07): Hetzner Cloud in Nürnberg, von Luca
  // selbst betrieben (Coolify, Traefik); Umami selbst gehostet ohne Cookies
  // (components/Analytics.tsx, data-do-not-track); Kontaktformular als Push
  // über Lucas eigene ntfy-Instanz (lib/anfrage/ntfy.ts), nichts in einer
  // Datenbank; keine Schriften, Scripts, Karten oder Videos von Dritten
  // (next.config.ts, CSP). Entwurf vom 26.09.2026; die Prüfstellen für WKO
  // oder Anwalt stehen in TODO.md, Etappe 3, nicht auf der Seite. Die
  // Belege zu den einzelnen Absätzen (Server-Fakten, Umami-Quellcode, ntfy)
  // stehen in TODO.md, Etappe 3, Prüfstellen 2, 3 und 5.
  datenschutz: {
    titel: "Datenschutz",
    hinweis: "",
    verantwortlicher: "Verantwortlicher",
    email: "E-Mail:",
    kurz: {
      titel: "Kurz gesagt",
      text: "Diese Website setzt keine Cookies, lädt nichts von fremden Servern (keine Schriften, Scripts, Karten oder Videos von Dritten) und gibt keine Daten an Werbenetzwerke weiter. Was beim Aufruf, bei der Statistik und beim Kontaktformular passiert, steht hier.",
    },
    hosting: {
      titel: "Hosting und Server-Protokolle",
      absaetze: [
        "Die Website läuft auf einem Server, den ich selbst betreibe, gemietet bei der Hetzner Online GmbH (Industriestraße 25, 91710 Gunzenhausen, Deutschland), Standort Nürnberg. Beim Aufruf einer Seite verarbeitet der Server die IP-Adresse deines Geräts, Datum und Uhrzeit, die aufgerufene Adresse und die Kennung des Browsers. Das ist technisch nötig, um dir die Seite zu schicken (Art. 6 Abs. 1 lit. f DSGVO).",
        "Ein Zugriffsprotokoll mit diesen Daten schreibt der Server nicht. Die Website protokolliert nur Betriebsmeldungen und Fehler, ohne IP-Adresse; diese Protokolle werden nach Größe überschrieben (höchstens 30 MB je Dienst). Ich gebe sie nicht weiter.",
      ],
    },
    statistik: {
      titel: "Statistik (Umami)",
      absaetze: [
        "Ich messe die Reichweite mit Umami, das samt Datenbank auf meinem eigenen Server läuft. Umami speichert je Aufruf die Seite, die verweisende Seite, Browser, Betriebssystem, Gerätetyp, Bildschirmgröße und Sprache sowie Land, Region und Stadt, die es auf dem Server aus der IP-Adresse ableitet. Die IP-Adresse selbst wird nicht gespeichert: Aus ihr, der Browserkennung und einem Wert, der sich jeden Monat ändert, bildet Umami eine Prüfsumme, mit der Aufrufe innerhalb eines Monats einer Sitzung zugeordnet werden. Danach ist keine Zuordnung mehr möglich.",
        "Umami setzt keine Cookies, die Daten verlassen meinen Server nicht. Sendet dein Browser „Do Not Track“, wird nichts gezählt. Rechtsgrundlage ist mein Interesse zu wissen, welche Seiten gelesen werden (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    formular: {
      titel: "Kontaktformular",
      absaetze: [
        "Wenn du mir über das Formular schreibst, übermittelt die Website deinen Namen, deine E-Mail-Adresse, wenn angegeben deine Telefonnummer und deine Nachricht als Push-Nachricht an mein Handy. Dafür nutze ich ntfy, einen Benachrichtigungsdienst, der ebenfalls auf meinem eigenen Server läuft. Die Website speichert die Anfrage nicht; ntfy hält sie höchstens 24 Stunden vor, damit sie auch ankommt, wenn mein Handy gerade offline ist, und löscht sie dann.",
        "Damit die Nachricht sofort am Handy erscheint, meldet ntfy über den Dienst ntfy.sh, Google Firebase und Apples Push-Dienst nur, dass eine neue Nachricht wartet: mit einer zufälligen Kennung, ohne Inhalt und ohne deine Angaben. Die Nachricht selbst holt das Handy direkt von meinem Server.",
        "Um Massen-Anfragen zu bremsen, merkt sich die Website beim Absenden deine IP-Adresse im Arbeitsspeicher (höchstens fünf Anfragen je Stunde und Adresse). Sie wird nicht auf die Festplatte geschrieben und ist mit dem nächsten Neustart der Website weg (Art. 6 Abs. 1 lit. f DSGVO).",
        "Ich verwende die Angaben nur, um dir zu antworten (Art. 6 Abs. 1 lit. b DSGVO). Antworte ich per E-Mail, läuft der Schriftverkehr über mein Postfach bei Apple (iCloud Mail; Vertragspartner Apple Distribution International Ltd., Irland). Apple speichert die Daten in der Regel bei Apple Inc. in den USA; die Übermittlung ist über Standardvertragsklauseln abgesichert. Ist deine Anfrage erledigt, lösche ich sie. Statt des Formulars kannst du mir jederzeit direkt eine E-Mail schreiben.",
      ],
    },
    speichern: {
      titel: "Kontakt speichern",
      text: "Der Knopf „Kontakt speichern“ erzeugt eine Kontaktdatei (vCard) mit meinen Angaben. Dabei werden keine Daten von dir übertragen.",
    },
    links: {
      titel: "Links zu anderen Websites",
      text: "Die Projektseiten verlinken auf die Websites meiner Kunden und auf mein Profil bei LinkedIn. Sobald du einem Link folgst, gilt die Datenschutzerklärung der jeweiligen Seite.",
    },
    rechte: {
      titel: "Deine Rechte",
      text: "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit. Schreib mir dafür an <email>{adresse}</email>.",
    },
    beschwerde: {
      titel: "Beschwerde",
      text: "Wenn du meinst, dass ich deine Daten nicht rechtmäßig verarbeite, kannst du dich bei der Österreichischen Datenschutzbehörde beschweren: Barichgasse 40–42, 1030 Wien, <dsb>dsb.gv.at</dsb>.",
    },
    stand: "Stand: {datum}",
  },
  nichtGefunden: {
    titel: "Seite nicht gefunden",
    text: "Diese Adresse gibt es nicht (mehr).",
    zurStartseite: "Zur Startseite",
  },
  // Fehlerseite (app/[locale]/error.tsx, Client): der eine Namespace, der
  // an den Browser geht (NextIntlClientProvider im Root-Layout).
  fehler: {
    titel: "Da ist etwas schiefgegangen",
    text: "Bitte noch einmal versuchen. Bleibt der Fehler, hilft eine kurze Nachricht.",
    nochmal: "Noch einmal versuchen",
  },
  karten: {
    googleName: "Google Maps",
    appleName: "Apple Karten",
    google: "Route zu {ort} in {googleName}",
    apple: "Route zu {ort} in {appleName}",
  },
};

export type Nachrichten = typeof de;
