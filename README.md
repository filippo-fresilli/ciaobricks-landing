# ciaobricks — landing page

Landing page for **ciaobricks**, a native iOS app that turns photos into
LEGO®-style brick mosaics.

Vanilla HTML/CSS/JS, no build step. Fully trilingual (**IT / EN / FR**) with a
language switch: UI copy **and** SEO meta (title, description, Open Graph) are
localized at runtime. Includes a dark/light toggle and a live brick-mosaic
mockup rendered on a `<canvas>`.

```
index.html            # landing page
privacy/index.html    # privacy policy
styles.css            # styles
app.js                # shared JS: i18n loader, theme toggle, live mosaic
assets/
  logo.png            # brand logo / favicon / og:image
  favicon.svg
  i18n/
    it.json           # translations + meta strings, one file per language
    en.json
    fr.json
```

## Internationalization (i18n)

All strings live in `assets/i18n/<lang>.json` (one file per language). Markup
carries `data-i18n="key"` (text) or `data-i18n-html="key"` (rich text), and
`app.js` fetches the right JSON and fills them in — plus it localizes the
`<title>` and the description / Open Graph meta tags.

To edit copy or add a language, just edit/add a JSON file (and add a button in
the `.lang-switch` group). No build step.

## Run locally

The translations are loaded with `fetch()`, so the site **must be served over
HTTP** — opening `index.html` directly via `file://` leaves it in the default
(Italian) copy because browsers block `file://` fetches.

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy on GitHub Pages

Meant to live at the **root** of the public `ciaobricks-landing` repo:

1. **Settings → Pages → Source:** `Deploy from a branch`
2. **Branch:** `main` · **Folder:** `/ (root)` → Save.

## Custom domain

When you buy the domain, add a `CNAME` file at the repo root (e.g.
`ciaobricks.app`) and set the same domain under **Settings → Pages → Custom
domain**. DNS: four `A` records to `185.199.108/109/110/111.153` for the apex,
and a `CNAME` for `www` → `<user>.github.io`. Enable **Enforce HTTPS**.

## Notes

- Styling is hand-written in `styles.css`; the **Nunito** webfont is loaded from
  Google Fonts.
- The App Store buttons are placeholders (`#`) — wire them up once available.
- Legal: the LEGO®/BrickLink® disclaimer in the footer must stay.
