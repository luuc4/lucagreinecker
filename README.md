# lucagreinecker.at

Persönliche Website von Luca Greinecker: Vorstellung, Werdegang, Projekte und Kontaktformular.
Statische Seite ohne Build-Schritt, gehostet über GitHub Pages unter der Domain `lucagreinecker.at` (siehe `CNAME`).

## Struktur

| Datei / Ordner | Zweck |
| --- | --- |
| `index.html` | Startseite (Hero, Über mich, Projekte, Kontakt) |
| `impressum.html`, `datenschutz.html` | Rechtliche Seiten, `noindex` |
| `404.html` | Fehlerseite, wird von GitHub Pages automatisch ausgeliefert |
| `styles.css` | Gesamtes Styling inkl. Responsive-Breakpoints (900px, 640px) |
| `script.js` | Fade-in beim Scrollen, Header, Mobile-Menü, Smooth Scroll, Formular-Versand |
| `fonts/` | Self-hosted Webfonts (DM Sans, Playfair Display), keine Google-Fonts-Verbindung |
| `images/og-image.png` | Vorschaubild für LinkedIn, WhatsApp und Co. (1200x630) |
| `images/apple-touch-icon.png` | Icon für den iOS-Homescreen |
| `images/projekte/` | Bilder der Projektkarten (1200x750) |
| `robots.txt`, `sitemap.xml` | Für Suchmaschinen |
| `docs/projekt-notizen.md` | Rohnotizen zu den Kundenprojekten (Stack, Features, Umfang) |

## Projektbilder ersetzen

Die Dateien in `images/projekte/` sind generierte Platzhalter. Echte Screenshots einfach unter demselben Namen ablegen:

- `punktetafel.jpg`
- `oz-calisthenics.jpg`
- `jonathan-walch.jpg`
- `nadkah.jpg`

Empfohlen: 1200x750 Pixel (Seitenverhältnis 16:10), JPG oder WebP, unter 150 KB. Bei WebP zusätzlich die Endung in `index.html` anpassen.

## Kontaktformular

Läuft über Formspree (Formular-ID in `index.html`). Das Formular hat ein verstecktes Honeypot-Feld (`_gotcha`) gegen Spam und setzt den Betreff über `_subject`.

## Lokal ansehen

Kein Build nötig. Ein beliebiger statischer Server reicht, zum Beispiel:

```
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Deployment

Push auf `main` reicht, GitHub Pages liefert die Dateien direkt aus.
