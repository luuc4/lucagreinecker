Projekt 1:

Projekt-Header

    Name: OZ Calisthenics
    Domain: oz-calisthenics.at
    Typ: Business Landing Page (Single Page)
    Branche/Kontext: Fitness & Personal Training – Calisthenics Coach in Bludenz, Vorarlberg (AT)

Projektbeschreibung

Webauftritt für den Calisthenics Coach Olcay Zengin in Bludenz. Die Seite informiert über das Trainingsangebot (Gruppenkurse und Personal Training), ermöglicht Online-Buchungen und bietet ein Kontaktformular. Zielgruppe sind Fitness-Interessierte aller Levels in der Region Walgau/Vorarlberg.
Tech-Stack
Bereich	Technologie
Markup	HTML5 (semantisch)
Styling	CSS3 (Custom Properties, Grid, Flexbox)
Interaktivität	Vanilla JavaScript (ES6+)
Schriften	Google Fonts (Inter)
Kontaktformular	Formspree (AJAX)
Buchungssystem	SuperSaaS (Widget-Einbindung)
Analytics	Google Analytics 4 mit Consent Mode V2
Cookie-Consent	TermsFeed
Hosting	GitHub Pages (Custom Domain)
Versionierung	Git / GitHub
Features & Besonderheiten
Architektur

    Statische Single-Page-Architektur ohne Build-Tools oder Frameworks
    CSS Custom Properties für durchgängiges Theming
    Modularer JavaScript-Aufbau mit Event-Delegation und IntersectionObserver

Design & UI

    Dark Theme mit Electric-Lime-Akzentfarbe (#c6ff00)
    Bento-Grid-Layout für die Trainingskonzept-Sektion
    Glassmorphism-Effekte bei Navbar und Buttons
    Scroll-Reveal-Animationen mit IntersectionObserver
    Responsive Design mit Mobile-First-Optimierung
    Skip-Link und aria-Attribute für Barrierefreiheit
    Respektierung von prefers-reduced-motion

Funktionale Komponenten

    Online-Buchungskalender via SuperSaaS-Widget
    AJAX-Kontaktformular mit Formspree-Backend und Validierung
    Preistabelle mit Toggle zwischen Erwachsenen- und Schülertarifen
    FAQ-Akkordeon mit Einzelöffnungs-Logik
    Automatische Berechnung des nächsten Kurstermins (Donnerstag)
    Floating WhatsApp-Button und Back-to-Top-Button
    Aktive Navbar-Hervorhebung basierend auf Scroll-Position

SEO & Structured Data

    Open-Graph-Meta-Tags für Social-Media-Vorschau
    JSON-LD Structured Data (SportsActivityLocation)
    Semantische HTML-Struktur mit beschreibenden Meta-Tags
    Asynchrones Font-Loading mit media="print"-Trick

Datenschutz & Rechtliches

    DSGVO-konformer Cookie-Consent-Banner (Express Consent)
    Google Consent Mode V2 mit granularer Steuerung
    Separate Datenschutz- und Impressum-Seiten
    Standardmäßig alle Tracking-Kategorien blockiert

Seitenstruktur

    Hero – Headline, Call-to-Action-Buttons (Buchen / Kursplan)
    Über mich – Vorstellung des Coaches mit Foto und Zielgruppen-Tags
    Training – Trainingskonzept (Kraft, Skills, Mobility) als Bento-Grid mit Trainingsablauf-Timeline
    Kurse – Aktueller Gruppenkurs mit Termin, Ort, Map-Links und Buchung; Personal-Training-Teaser
    Preise – Drei Preiskarten (Einzeln, 5er-Block, 10er-Block) mit Schüler-Toggle und Zahlungsmethoden
    FAQ – Sechs häufige Fragen als Akkordeon
    Kontakt – Kontaktformular mit Betreff-Auswahl, Direktlinks (E-Mail, WhatsApp, Instagram)
    Impressum – Rechtliche Pflichtangaben (separate Seite)
    Datenschutz – Datenschutzerklärung (separate Seite)

Entwicklung

    Versioniert mit Git auf GitHub, gehostet via GitHub Pages mit Custom Domain
    65 Commits, 11 Pull Requests über einen Zeitraum von ca. 2 Wochen
    Iterative Entwicklung: Grundstruktur, dann schrittweise Feature-Ergänzungen (Buchungssystem, Cookie-Banner, Preismodell, FAQ, SEO-Optimierung, Accessibility-Review)
    Mitwirkende: Luca (Projektinhaber), Claude (KI-gestützte Entwicklung)

Kurzbeschreibung

Statische Business-Website für einen Calisthenics Coach in Vorarlberg, umgesetzt als performante Single Page mit HTML, CSS und Vanilla JavaScript. Integriert Online-Buchung via SuperSaaS, AJAX-Kontaktformular, DSGVO-konformes Cookie-Management und strukturierte Daten für SEO. Gehostet auf GitHub Pages unter eigener Domain.


Projekt 2:
Projekt-Header

    Name: Jonathan Walch Portfolio
    Domain: jonathanwalch.at
    Typ: Persoenliche Portfolio-Website
    Branche/Kontext: UI/UX Design, Hochschulprojekt (InterMedia, FH Vorarlberg)

Projektbeschreibung

Persoenliche Portfolio-Website fuer Jonathan Walch, InterMedia-Student an der FH Vorarlberg mit Schwerpunkt UI/UX Design. Die Seite praesentiert die Person, Kompetenzen und ausgewaehlte Hochschulprojekte aus den Bereichen Interactive Design, Web Design, Game Design und Interface Design. Zielgruppe sind potenzielle Auftraggeber, Arbeitgeber und Kommilitonen.
Tech-Stack
Bereich	Technologie
Markup	HTML5
Styling	CSS3 (Custom Properties, Grid, Flexbox)
Interaktivitaet	JavaScript (Vanilla, kein Framework)
Typografie	Google Fonts (Inter, Space Grotesk)
Hosting	GitHub Pages
Domain	Custom Domain via CNAME
Versionierung	Git / GitHub
Features & Besonderheiten
Design

    Dark Theme mit Akzentfarben-Gradient (Indigo/Violett)
    Durchgaengiges Design-System mit CSS Custom Properties (Farben, Spacing, Radien, Transitions)
    Zwei Display-Schriftarten: Inter (Body) und Space Grotesk (Headlines)

UI-Komponenten

    Custom Cursor mit Hover-Effekt (Dot + Outline, reagiert auf interaktive Elemente)
    Animierte Gradient-Orbs im Hero-Bereich mit Parallax-Effekt bei Mausbewegung
    Floating Cards mit Schwebeanimation
    Scroll-Indikator (animierte Maus-Grafik)
    Bildergalerien mit Overlay-Beschreibungen bei Hover
    Profilbild mit Graustufen-zu-Farbe-Transition bei Hover

Navigation

    Fixierte Navbar mit Blur-Backdrop bei Scroll
    Mobile Hamburger-Menue mit animiertem Fullscreen-Overlay
    Aktive Link-Hervorhebung basierend auf Scroll-Position
    Smooth Scrolling zu Ankerpunkten

Responsive Design

    Vollstaendig responsive Layouts (Desktop, Tablet, Mobile)
    Breakpoints bei 1024px, 768px und 480px
    Angepasste Grid-Layouts pro Viewport (Projektgalerien, Skills, About)
    Touch-Device-Erkennung (Custom Cursor wird auf Touch-Geraeten ausgeblendet)

Animationen

    Scroll-basierte Einblend-Animationen via Intersection Observer
    Seiten-Fade-In beim Laden
    Hover-Transitions auf Cards, Links und Buttons

SEO & Meta

    Open Graph Meta-Tags fuer Social Media Sharing
    Semantisches HTML mit section, article, nav, footer
    Meta-Descriptions pro Seite
    SVG Favicon

Datenschutz & Rechtliches

    Impressum-Seite gemaess oesterreichischem E-Commerce-Gesetz
    Keine externen Tracking-Scripts oder Cookies

Seitenstruktur

    Startseite (index.html) - Hero-Bereich mit Portraet und Intro, Ueber-mich-Sektion mit persoenlichen Details, Skills-Grid (UI Design, UX Research, Prototyping, Disziplin), Werte-Bereich mit Zitat, Kontakt-Sektion mit E-Mail und LinkedIn
    Projekte (projects.html) - Vier Projekt-Case-Studies mit Beschreibung, Meta-Tags und Bildergalerien: Computational Empowerment (TouchDesigner/Arduino), Interactive City Symbols (Web Design/Shopify), Game Add-On Concept (Game Design/Print), Smart Fitness Interface (UI/UX/Figma)
    Impressum (impressum.html) - Rechtliche Angaben, Verantwortlicher, Domaininhaber, Haftungshinweise, Urheberrecht
    Lebenslauf - PDF-Download ueber Navigation (kein separater View)

Entwicklung

    Versionierung mit Git, gehostet auf GitHub
    26 Commits insgesamt, 2 Pull Requests
    3 Mitwirkende
    Entwicklungszeitraum: Januar 2026
    Branch-basierter Workflow mit Feature-Branches und Merge via Pull Requests
    Iterative Bugfixes fuer Cross-Browser-Kompatibilitaet (Chrome-Rendering von Bildern)
    Deployment via GitHub Pages mit Custom Domain (jonathanwalch.at)

Kurzbeschreibung

Persoenliche Portfolio-Website eines InterMedia-Studenten der FH Vorarlberg mit Fokus auf UI/UX Design. Die statische Website zeigt vier Hochschulprojekte aus den Bereichen Interactive Design, Web/Branding, Game Design und Interface Design, ergaenzt durch eine Ueber-mich-Sektion und Kontaktmoeglichkeiten. Umgesetzt als reine HTML/CSS/JS-Seite ohne Framework, gehostet auf GitHub Pages unter eigener Domain.

Projekt 3:
Projekt-Header

    Name: NAD.KAH – Kreativarbeit
    URL: https://nadkah.netlify.app
    Typ: Portfolio-Website / One-Pager mit Detailseiten
    Branche: Kunsthandwerk, Dekoration & Textilplott (Einzelunternehmen)

Projektbeschreibung

Website für NAD.KAH Kreativarbeit, ein kreatives Einzelunternehmen aus Feldkirch (Vorarlberg, Österreich), das Dekorationen und Textilplott anbietet. Die Seite dient als digitale Visitenkarte mit Arbeiten-Portfolio, Markttermin-Übersicht und Kontaktmöglichkeit via Instagram. Inhalte wie Texte, Bilder und Termine sind über ein integriertes CMS direkt von der Inhaberin pflegbar.
Tech-Stack
Bereich	Technologie
Framework	Astro (v5)
Sprache	TypeScript
CMS	Decap CMS (Git-Gateway-Backend)
Hosting	Netlify
Authentifizierung	Netlify Identity
Fonts	Self-hosted (Josefin Sans, WOFF2/WOFF)
Content-Format	Markdown, JSON
Validierung	Zod (via Astro Content Collections)
Features & Besonderheiten
Architektur

    Statische Site-Generierung (SSG) mit Astro
    Content Collections mit Zod-Schema-Validierung für typsichere Inhalte
    File-based Routing mit dynamischen Routen ([...slug].astro)
    Trennung von Content (Markdown/JSON) und Darstellung (Astro-Komponenten)

CMS-Integration

    Decap CMS mit Git-Gateway-Backend für browserbasierte Inhaltspflege
    Drei Content-Typen: Arbeiten (Kategorien), Markttermine, Startseiten-Texte
    Termine mit Unterstützung für mehrtägige Märkte (optionaler zweiter Tag)
    Netlify Identity für geschützten CMS-Zugang mit Invite-Token-Handling

UI & Interaktion

    One-Pager-Struktur mit Scroll-Navigation und aktiver Sektions-Hervorhebung
    Scroll-basierte Fade-In-Animationen via IntersectionObserver
    Responsive Hamburger-Menü mit Scroll-Lock
    Bildergalerie mit Hover-Overlay und Verlinkung zu Detailseiten

Markttermine

    Automatisches Ausblenden vergangener Termine
    Dynamische Badges ("Heute", "Morgen", "in X Tagen") für den nächsten Termin
    Wochentag-Berechnung und formatierte Datumsanzeige
    Unterstützung für zweitägige Märkte mit separaten Uhrzeiten

SEO & Performance

    Open-Graph-Meta-Tags (Titel, Beschreibung, Locale de_AT)
    Self-hosted Webfonts mit font-display: swap
    Lazy Loading für Bilder
    Keine externen Tracking-Scripts oder Cookies

Datenschutz & Recht

    DSGVO-konforme Datenschutzerklärung
    Impressum nach österreichischem ECG und Mediengesetz
    Kein Google Fonts, kein Tracking, keine Analyse-Tools

Seitenstruktur

    Startseite (One-Pager) – Hero-Bereich mit Logo und Tagline, Arbeiten-Galerie, Kreativkopf-Vorstellung, Markttermine-Übersicht, Kontakt-Sektion
    Detailseiten (/detail/[slug]/) – Dynamisch generierte Einzelansicht pro Arbeiten-Kategorie mit Bild, Beschreibung und Instagram-CTA
    Impressum (/impressum/) – Rechtliche Angaben nach ECG/MedG
    Datenschutz (/datenschutz/) – DSGVO-konforme Datenschutzerklärung
    CMS-Backend (/admin/) – Decap CMS Administrationsoberfläche

Entwicklung

    Versionskontrolle mit Git, Repository auf GitHub
    23 Commits, 1 Pull Request (Decap CMS Integration)
    Branch-basierter Workflow: Feature-Branch für CMS-Evaluation, Merge in main
    Entwicklung in zwei Phasen: initiale Website-Erstellung, anschließend CMS-Migration und iterative Verbesserungen (SEO, Responsiveness, UX)
    Netlify-Deployment mit automatischen Builds bei Push

Kurzbeschreibung

Portfolio-Website für NAD.KAH Kreativarbeit aus Feldkirch, Vorarlberg – ein kreatives Einzelunternehmen für Dekorationen und Textilplott. Umgesetzt als statische Astro-Website mit integriertem Decap CMS zur eigenständigen Inhaltspflege, gehostet auf Netlify. Die Seite bietet eine Arbeiten-Galerie, dynamische Markttermin-Verwaltung und ist DSGVO-konform ohne externe Tracking-Dienste.
