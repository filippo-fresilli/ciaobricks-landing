# ciaobricks — landing page

Landing page for **ciaobricks**, a native iOS app that turns photos into
LEGO®-style brick mosaics.

Single self-contained `index.html` — Tailwind (Play CDN) + vanilla JS, no build
step. Italian copy, ready to adapt to EN/FR. Includes a dark/light toggle and a
live brick-mosaic mockup rendered on a `<canvas>` (no image assets).

```
index.html          # the whole page (HTML + Tailwind config + JS inline)
assets/favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

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

- **Tailwind via CDN** is used for zero-build convenience; for production you may
  want a compiled build for smaller size.
- The App Store buttons and Privacy Policy link are placeholders (`#`) — wire
  them up once available.
- Legal: the LEGO®/BrickLink® disclaimer in the footer must stay.
