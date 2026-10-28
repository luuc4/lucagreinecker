import type { ProjektSlug } from "@/lib/inhalte/projekte";
import type { Nachrichten, ProjektTexte } from "./de";

// All English texts, same keys as messages/de.ts (the type enforces it).
// Written by Claude on 28.10.2026 from the German texts as careful human-
// sounding translations in British English; Luca reads them against the
// German ones. Vorarlberg and Bludenz get "Austria" where an international
// reader (LinkedIn) would otherwise not know where that is. Technical
// facts (stacks, product names) stay as they are.
//
// Legal pages: a courtesy translation with a note that the German version
// is the binding one (leitfaden/15, "Recht").

const projekte: Record<ProjektSlug, ProjektTexte> = {
  "oz-calisthenics": {
    art: "Class booking, training plans and website for a calisthenics coach in Bludenz and Rankweil",
    kurz: "Class booking for a calisthenics coach, Bludenz",
    kunde: "Olcay Zengin, calisthenics coach, Bludenz and Rankweil",
    zeitraum: "since September 2026, live since October 2026",
    seiten:
      "Home, classes, prices, about, FAQ, events, news, collaboration, contact, book, buy; account with bookings, credit and training plan; admin",
    funktionen:
      "Book and pay for classes (Stripe or cash on site), buy 5- and 10-class passes online, one-to-one training with a personal quote, account with passkeys, training plan with timer, sets and weekly goal, receipts as PDF, reminders and daily lists by email, cancellation and withdrawal; admin for sessions, classes, bookings, customers, plans, news, events and FAQ",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL with Drizzle, Better Auth (code and passkeys), Stripe, pg-boss, pdfkit, sharp, Scaleway Mail, Umami",
    betrieb:
      "Docker image from GitHub Actions, Coolify on a Hetzner server, staging environment, no deploys during class hours",
    satz: "Olcay wanted his members to book and pay for class spots directly online. It grew into a complete class management system: sessions, bookings, payment via Stripe or in cash, class passes, receipts and reminders, plus training plans for working out at home, all in an admin that Olcay runs from his phone.",
  },
  punktetafel: {
    art: "My own web app: keeping score for card games at the table",
    kurz: "My own web app: keeping score at the games table",
    kunde: "Own project",
    zeitraum: "July to September 2026",
    seiten:
      "Home with 33 games in groups, match and rules per game, games night, card decks",
    funktionen:
      "Score rounds, standings and podium, tie-breaks, players joining or leaving mid-game, teams, games night across several games; works offline as a PWA, the data stays on the device",
    stack: "Next.js 16, React 19, TypeScript, Tailwind 4, motion, Zod, Vitest",
    betrieb:
      "Coolify on a Hetzner server, Cloudflare in front, Umami, feedback via ntfy",
    satz: "My own project: keeping score for card games at the table, no pen and paper, no account. 33 games from Wizard to Jass, runs offline as an app on your phone, and the data stays on the device.",
  },
  "usta-streetfood": {
    art: "Website with a mini CMS for a food truck in Nenzing",
    kurz: "Website with a mini CMS for a food truck, Nenzing",
    kunde: "Akin Akgün, USTA Streetfood, food truck in Nenzing",
    zeitraum: "September 2026",
    seiten:
      "Home (status, news, tiles), menu, about, contact and directions, photos, legal notice, privacy; admin on the phone",
    funktionen:
      "“Sold out” status with a note, opening hours with exceptions, news, menu with “available” toggles, image upload with cropping, texts – Akin manages it all himself from his phone; map buttons, vCard, opening hours as a calendar file",
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind 4, PostgreSQL with Drizzle, Better Auth (code and passkeys), sharp, Umami",
    betrieb:
      "Docker image from GitHub Actions, Coolify on an IONOS VPS, PostgreSQL",
    satz: "Akin wanted to look after his food truck's site himself: mark it sold out, change opening hours, update the menu, upload photos. He now does all of that from his phone in the admin, without having to ask anyone.",
  },
  "jonathan-walch": {
    art: "Portfolio for an InterMedia student at FH Vorarlberg",
    kurz: "Portfolio for an InterMedia student, FH Vorarlberg",
    kunde: "Jonathan Walch, InterMedia student at FH Vorarlberg",
    zeitraum: "January 2026",
    seiten: "Home, projects, legal notice, CV as PDF",
    funktionen:
      "Four project case studies with galleries, mobile menu, no tracking and no cookies",
    stack: "HTML, CSS, JavaScript without a framework",
    betrieb: "GitHub Pages with a custom domain",
    satz: "Jonathan studies InterMedia at FH Vorarlberg and wanted to show his design work: four projects with galleries and his CV as a PDF, as a lean site without a framework.",
  },
};

export const en: Nachrichten = {
  seite: {
    satz: "I build websites and web apps for people and businesses in Vorarlberg.",
    beschreibung:
      "Luca Greinecker from Bludenz builds websites and web apps for people and businesses in Vorarlberg, Austria. Design, development, server and operations from one pair of hands.",
  },
  sprache: {
    wechsel: "Deutsch",
  },
  layout: {
    zumInhalt: "Skip to content",
  },
  kopf: {
    navigation: "Main navigation",
    kontakt: "Contact",
    menue: "Menu",
    schliessen: "Close",
  },
  navigation: {
    projekte: "Projects",
    paket: "Package",
    ueberMich: "About me",
  },
  anker: {
    projekte: "projects",
    paket: "package",
  },
  fuss: {
    seiten: "Pages",
    start: "Home",
    kontakt: "Contact",
    kontaktSpeichern: "Save contact",
    rechtliches: "Legal",
    impressum: "Legal notice",
    datenschutz: "Privacy",
  },
  links: {
    neuerTab: "(opens in a new tab)",
  },
  start: {
    ueberLuca:
      "I'm Luca from Bludenz, Austria. My day job is data analytics for manufacturing at Ball; I build websites on the side, from the first sketch to the running server.",
    // Der Knopf unter dem Satz: sagt, was passiert, und heißt wie der im
    // Anfrage-Block unten – nicht „Kontakt" wie der Knopf im Kopf daneben
    // (Durchsicht 28.10.2026).
    knopf: "Send a message",
    projekte: "Projects",
    zurProjektseite: "{name}: go to the project page",
    wischen: "Swipe",
    anfrage: {
      titel: "Tell me what you need.",
      text: "A few lines are enough: who you are, what the site should do and by when. I'll get back to you with an honest assessment of what's possible and what it costs.",
      nachricht: "Send a message",
      speichern: "Save contact",
    },
    kenntnisse: ["Web development", "Data analytics", "Lean management"],
  },
  paket: {
    titel: "The full package",
    satz: "With me, everything a website needs to run is included: your own server, domain, analytics, updates. You get a site that works and one person to call when something comes up.",
    punkte: [
      {
        begriff: "Website",
        wert: "Design and development, with your texts and images built in",
      },
      {
        begriff: "Server",
        wert: "Your own server, setup and configuration, domain, DNS, certificates, outgoing email",
      },
      {
        begriff: "Analytics",
        wert: "Umami analytics, always included, no cookie banner",
      },
      { begriff: "Operations", wert: "Updates, backups, monitoring" },
      {
        begriff: "Legal",
        wert: "Legal notice and privacy policy drafted, points to check marked",
      },
      {
        begriff: "Handover",
        wert: "A short guide if you want to maintain it yourself; otherwise I make the changes",
      },
    ],
  },
  projekt: {
    beschreibung: "{name}: {art}. Built by Luca Greinecker, {zeitraum}.",
    amHandy: "The project on a phone",
    amDesktop: "The project on a desktop",
    bildHandy: "Home page of {name} on a phone",
    bildDesktop: "Home page of {name} on a desktop",
    kunde: "Client",
    zeitraum: "Timeframe",
    stand: "Status",
    seiten: "Pages",
    funktionen: "Features",
    stack: "Stack",
    betrieb: "Operations",
    oeffnen: "Open {domain}",
    weitere: "More projects",
  },
  projekte,
  ueberMich: {
    titel: "About me",
    beschreibung:
      "Luca Greinecker from Bludenz, Austria: data analytics at Ball, BSc in computer science, builds websites and web apps for Vorarlberg on the side.",
    art: "Luca Greinecker, Bludenz, Austria",
    foto: "Luca Greinecker, portrait",
    zurPerson: "About the person",
    saetze: [
      "I'm Luca Greinecker from Bludenz in Vorarlberg, Austria. I trained as an electrical technician at Ball in Ludesch, then worked in shift maintenance, did my alternative civilian service with the Red Cross and returned to Ball for the trainee programme. From November 2025 I was Continuous Improvement / Lean Leader at the Ludesch plant. Since October 2026 I've been Specialist, Data Analytics and Insights, a global role: I build tools for data analysis, KPIs and automation across Ball's plants.",
      "Alongside work, I studied computer science at FH Vorarlberg, the regional university of applied sciences, with a focus on digital innovation, and completed my bachelor's degree in 2026. Work and study gave me the mix I need for websites: first understand what someone really needs day to day, then build it properly.",
      "I build websites on the side for people and businesses in the region. Punktetafel is my own project: a scoreboard for card games at the table, no pen and paper needed.",
    ],
    fakten: [
      {
        begriff: "Job",
        wert: "Specialist, Data Analytics and Insights at Ball, since October 2026",
      },
      {
        begriff: "Education",
        wert: "BSc Computer Science (Digital Innovation), FH Vorarlberg, part-time alongside work, 2026; apprenticeship in electrical engineering at Ball",
      },
      {
        begriff: "On the side",
        wert: "Websites and web apps for people and businesses in Vorarlberg",
      },
      { begriff: "Off duty", wert: "Hiking, skiing, travelling" },
    ],
    nachricht: "Send a message",
    mail: "Send an email",
    mailBetreff: "Enquiry",
  },
  kontakt: {
    titel: "Contact",
    beschreibung:
      "How to reach {name} in Bludenz, Austria: send a message via the form, email, or save the contact.",
    nachricht: "Send a message",
    direkt: "Write directly",
    anrufenOderSchreiben: "Call or write",
    mailBetreff: "Enquiry",
    whatsapp: "WhatsApp",
    whatsappText: "Hi Luca, I have a question: ",
    speichern: {
      titel: "Save contact",
      text: "Adds {name} with all details to your contacts.",
      knopf: "Save contact",
    },
    adresse: "Address",
  },
  formular: {
    name: "Name",
    email: "Email",
    telefon: "Phone (optional)",
    nachricht: "Message",
    website: "Website (leave empty)",
    hinweis:
      "Your message goes straight to {name} and is not stored on the website.",
    datenschutz: "Privacy",
    senden: "Send message",
    wirdGesendet: "Sending …",
    gesendet: "Message sent",
    antwort: "You'll get my reply at {an}.",
    fehler: {
      drossel:
        "Too many messages in a short time. Please try again later or write to me directly by email.",
      senden:
        "The message couldn't be sent right now. Please write to me directly by email.",
      aus: "The contact form is switched off.",
    },
    feld: {
      nameMin: "Please enter your name.",
      nameMax: "{n} characters at most.",
      emailMin: "Please enter your email address.",
      emailMax: "{n} characters at most.",
      emailFormat: "This email address doesn't look right.",
      telefonMax: "{n} characters at most.",
      telefonFormat: "Digits, spaces and + ( ) / - . only",
      nachrichtMin: "The message needs at least {n} characters.",
      nachrichtMax: "{n} characters at most.",
    },
  },
  impressum: {
    titel: "Legal notice",
    hinweis:
      "Courtesy translation. The <de>German version</de> is the legally binding one.",
    medieninhaber: "Media owner and publisher",
    email: "Email:",
    land: "Austria",
    gegenstand: {
      titel: "Purpose",
      text: "Personal website presenting my own web projects, with a way to get in touch. No trade licence at present.",
    },
    richtung: {
      titel: "Editorial direction",
      text: "Information about Luca Greinecker's web projects and how to reach him (Section 25 (4) of the Austrian Media Act).",
    },
    projekte: {
      titel: "Other people's projects",
      text: "The screenshots and names of client projects (OZ Calisthenics, USTA Streetfood, Jonathan Walch) show websites I built for their respective operators. They are responsible for the content of those websites.",
    },
    links: {
      titel: "Links",
      text: "The operators of linked websites are responsible for their content. No legal violations were apparent when the links were set; if I become aware of one, I will remove the link.",
    },
    urheberrecht: {
      titel: "Copyright",
      text: "Texts, design and code of this website are by Luca Greinecker. Any use beyond what copyright law permits requires written consent.",
    },
    stand: "Last updated: {datum}",
  },
  datenschutz: {
    titel: "Privacy",
    hinweis:
      "Courtesy translation. The <de>German version</de> is the legally binding one.",
    verantwortlicher: "Controller",
    email: "Email:",
    kurz: {
      titel: "In short",
      text: "This website sets no cookies, loads nothing from third-party servers (no external fonts, scripts, maps or videos) and passes no data on to advertising networks. What happens when you visit, in the statistics and in the contact form is described here.",
    },
    hosting: {
      titel: "Hosting and server logs",
      absaetze: [
        "The website runs on a server I operate myself, rented from Hetzner Online GmbH (Industriestraße 25, 91710 Gunzenhausen, Germany), located in Nuremberg. When you open a page, the server processes your device's IP address, the date and time, the address requested and your browser's identifier. This is technically necessary to deliver the page to you (Art. 6(1)(f) GDPR).",
        "The server does not write an access log with this data. The website only logs operational messages and errors, without IP addresses; these logs are overwritten once they reach a size limit (at most 30 MB per service). I do not pass them on.",
      ],
    },
    statistik: {
      titel: "Statistics (Umami)",
      absaetze: [
        "I measure traffic with Umami, which runs together with its database on my own server. For each page view, Umami stores the page, the referring page, browser, operating system, device type, screen size and language, as well as country, region and city, which it derives from the IP address on the server. The IP address itself is not stored: from it, the browser identifier and a value that changes every month, Umami computes a hash that groups page views within one month into a session. After that, no association is possible.",
        "Umami sets no cookies and the data never leaves my server. If your browser sends “Do Not Track”, nothing is counted. The legal basis is my interest in knowing which pages are read (Art. 6(1)(f) GDPR).",
      ],
    },
    formular: {
      titel: "Contact form",
      absaetze: [
        "If you write to me via the form, the website sends your name, your email address, your phone number if provided, and your message as a push notification to my phone. For this I use ntfy, a notification service that also runs on my own server. The website does not store your enquiry; ntfy keeps it for at most 24 hours so it still arrives if my phone happens to be offline, and then deletes it.",
        "So that the message appears on my phone immediately, ntfy only signals via the ntfy.sh service, Google Firebase and Apple's push service that a new message is waiting: with a random identifier, without the content and without your details. The phone then fetches the message itself directly from my server.",
        "To slow down mass submissions, the website keeps your IP address in memory when you submit (at most five enquiries per hour and address). It is not written to disk and is gone with the next restart of the website (Art. 6(1)(f) GDPR).",
        "I use your details only to reply to you (Art. 6(1)(b) GDPR). If I reply by email, the correspondence goes through my mailbox at Apple (iCloud Mail; contracting party Apple Distribution International Ltd., Ireland). Apple generally stores the data with Apple Inc. in the USA; the transfer is safeguarded by standard contractual clauses. Once your enquiry is dealt with, I delete it. Instead of the form, you can always email me directly.",
      ],
    },
    speichern: {
      titel: "Save contact",
      text: "The “Save contact” button creates a contact file (vCard) with my details. No data of yours is transmitted.",
    },
    links: {
      titel: "Links to other websites",
      text: "The project pages link to my clients' websites and to my LinkedIn profile. Once you follow a link, that site's privacy policy applies.",
    },
    rechte: {
      titel: "Your rights",
      text: "You have the right to access, rectification, erasure, restriction of processing, objection and data portability. To exercise them, write to me at <email>{adresse}</email>.",
    },
    beschwerde: {
      titel: "Complaints",
      text: "If you believe I am not processing your data lawfully, you can lodge a complaint with the Austrian Data Protection Authority: Barichgasse 40–42, 1030 Vienna, <dsb>dsb.gv.at</dsb>.",
    },
    stand: "Last updated: {datum}",
  },
  nichtGefunden: {
    titel: "Page not found",
    text: "This address doesn't exist (anymore).",
    zurStartseite: "Go to the home page",
  },
  fehler: {
    titel: "Something went wrong",
    text: "Please try again. If the error keeps coming back, a short message helps.",
    nochmal: "Try again",
  },
  karten: {
    googleName: "Google Maps",
    appleName: "Apple Maps",
    google: "Directions to {ort} in {googleName}",
    apple: "Directions to {ort} in {appleName}",
  },
};
