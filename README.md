# ciaobricks — landing page

Landing page for **ciaobricks**, a native iOS app that turns photos into
LEGO®-style brick mosaics.

Trilingual (**IT / EN / FR**) with a dedicated, SEO-friendly URL per language
(`/`, `/en/`, `/fr/`) — each page is fully static and localized, with the right
`<title>`, meta description, Open Graph tags and `hreflang` alternates. Vanilla
HTML/CSS/JS; a small Node script generates the EN/FR pages from the Italian
source and the translation files. Includes a dark/light toggle and a live
brick-mosaic mockup rendered on a `<canvas>`.

```
index.html              # landing — Italian (source, also x-default)
privacy/index.html      # privacy policy — Italian (source)
en/, fr/                # generated: en/index.html, fr/index.html,
                        #            en/privacy/index.html, fr/privacy/index.html
styles.css              # styles
app.js                  # shared JS: theme toggle, live mosaic, active-lang marker
build.js                # generates en/, fr/, sitemap.xml, robots.txt
assets/
  logo.png              # brand logo / favicon / og:image
  favicon.svg
  i18n/
    it.json             # translations + meta strings, one file per language
    en.json
    fr.json
```

## Internationalization (i18n)

- **Source of truth for structure:** the Italian pages `index.html` and
  `privacy/index.html`. Every localizable element is marked with
  `data-i18n="key"` (text) or `data-i18n-html="key"` (rich text).
- **Source of truth for copy:** `assets/i18n/<lang>.json` — one file per
  language, each holding the UI strings **and** the SEO meta strings
  (`meta_title`, `meta_desc`, `og_desc`, `pp_meta_desc`, …).
- **`build.js`** reads the Italian pages as templates plus the JSON and writes
  the static `en/` and `fr/` pages: localized content, localized meta, correct
  `hreflang`/`canonical`, per-language `og:locale`, and rewritten asset paths.

Each language lives at its own URL, so search engines and social scrapers get
correct per-language content without needing to run JavaScript. The language
switch in the header is a set of links between these URLs.

### Editing copy / adding a language

1. Edit the relevant `assets/i18n/<lang>.json` (for Italian text, edit the
   Italian HTML directly).
2. To add a language: add `<lang>.json`, add its code to `GEN_LANGS` in
   `build.js`, and add a link in the `.lang-switch` group.
3. Regenerate:

```bash
npm install        # first time only (installs Playwright, used as a DOM engine)
npm run build      # regenerates en/ and fr/
```

The generated pages are committed to the repo, so **deploying needs no build
step** — only re-run `npm run build` after changing structure or EN/FR copy.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Serve the folder over HTTP (don't open `index.html` via `file://`, so that the
language links and relative paths resolve correctly).

## Deploy on GitHub Pages

Meant to live at the **root** of the public `ciaobricks-landing` repo:

1. **Settings → Pages → Source:** `Deploy from a branch`
2. **Branch:** `main` · **Folder:** `/ (root)` → Save.

## Custom domain

The `hreflang`/`canonical`/`og:url` tags use the absolute base
`https://ciaobricks.app` (set as `SITE` in `build.js` — change it there and
rebuild if the domain differs).

When you buy the domain, add a `CNAME` file at the repo root (e.g.
`ciaobricks.app`) and set the same domain under **Settings → Pages → Custom
domain**. DNS: four `A` records to `185.199.108/109/110/111.153` for the apex,
and a `CNAME` for `www` → `<user>.github.io`. Enable **Enforce HTTPS**.

## Notes

- Styling is hand-written in `styles.css`, aligned to the app's design system:
  **DM Sans** (weights 400–700, from Google Fonts), yellow `#FFCC00` as the
  single action colour, adaptive system text colours, and the 3D hard-shadow
  primary button. The design tokens live in the `:root` block of `styles.css`.
- The App Store buttons point to the `#scarica` download section — replace with
  the real App Store URL at launch (see the `TODO` in `index.html`).
- Legal: the LEGO®/BrickLink® disclaimer in the footer must stay.
