# ciaobricks — Design System

Reference for building/updating the **landing page** so it matches the app 1:1.
Extracted from the app's source of truth (`ciaobricks/Theme/CiaobricksTheme.swift`).
Values are given as web-ready CSS; the app itself is SwiftUI but the tokens map directly.

---

## 0. Brand personality

App that turns a photo into a **LEGO-brick mosaic**. The look is **playful, tactile, warm**:

- **Yellow** is the one and only action colour — CTAs, selections, highlights.
- Signature interaction: **3D hard-shadow buttons** that physically *sink* when pressed.
- **DM Sans** everywhere. Soft, continuous rounded corners. No sharp edges.
- Text/chrome uses **system label colours** (adaptive black/white) — never a coloured accent for body text.
- Warm off-white page background (never pure white). Full **light + dark** support.

> There is **no orange/red** in the palette. If you see orange-red anywhere in an old mockup, replace it with **yellow** (for actions) or the **system text colour** (for labels/icons).

---

## 1. Typography — DM Sans

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```


```css
:root { --font-sans: "DM Sans", system-ui, -apple-system, sans-serif; }
* { font-family: var(--font-sans); }
```

Weights used: **400** regular · **500** medium · **600** semibold · **700** bold.

| Role | Size (px) | Weight |
|---|---|---|
| Hero / Large title | 34 | 700 |
| Title | 28 | 700 |
| Title 2 | 22 | 600 |
| Title 3 / stat value | 20 | 600 |
| Headline | 17 | 600 |
| Body | 17 | 400 |
| Callout | 16 | 400 |
| Subheadline / section label | 15 | 600 (label) / 400 |
| Footnote | 13 | 400 |
| Caption | 12 | 400 |
| Caption 2 | 11 | 400 |
| Badge / chip micro-label | 9–11 | 600–700 |

> Purely functional numerals (order IDs, aligned counters) use a **monospaced** font, not DM Sans.

---

## 2. Colour tokens

```css
:root {
  /* ── PRIMARY — the only action colour: CTAs, selection, highlights ── */
  --c-primary:         #FFCC00;   /* yellow */
  --c-primary-shadow:  #CC8C00;   /* hard 3D shadow under primary buttons */
  --c-primary-text:    #1A1A1A;   /* text/icon ON yellow → black */

  /* ── TEXT & CHROME — system label colours (adaptive) ── */
  --c-text:            #1A1A1A;   /* titles, body, icons, section-label accents */
  --c-text-secondary:  #6B6B6B;   /* subtitles, captions, secondary labels */

  /* ── SUPPORT ── */
  --c-success:         #33B873;   /* completed CTA (e.g. "added to cart") */
  --c-success-shadow:  #1A6B42;
  --c-select:          #217DE8;   /* selected chip inside config forms (text: white) */
  --c-highlight:       #FFC733;   /* minor amber highlight */

  /* ── SURFACES ── */
  --c-bg:              #F7F5F0;   /* page — warm off-white, NOT pure white */
  --c-card:            #FFFFFF;

  /* ── SHADOWS / ELEVATION ── */
  --shadow-card: 0 6px 14px rgba(0,0,0,.06);   /* elevated card */
  --shadow-row:  0 3px 8px  rgba(0,0,0,.05);   /* list-row card */
}

@media (prefers-color-scheme: dark) {
  :root {
    --c-text:           #FFFFFF;
    --c-text-secondary: #A0A0A0;
    --c-bg:             #141414;
    --c-card:           #1F1F1F;
    --shadow-card: 0 6px 14px rgba(0,0,0,.40);
    --shadow-row:  0 3px 8px  rgba(0,0,0,.30);
  }
}
```

**Usage rules**
- Anything the user taps to *act* or *select* → `--c-primary` (yellow).
- All text, icons, section-label accents, and default control tint → `--c-text` / `--c-text-secondary`.
- Blue `--c-select` is reserved for chip selection inside forms/config only.
- Green `--c-success` marks a completed/confirmed action.

---

## 3. Spacing & radius

```css
:root {
  --space-xs: 6px;  --space-s: 10px; --space-m: 16px;
  --space-l: 20px;  --space-xl: 28px;

  --radius-xs: 10px;      /* swatches, tiny chips   */
  --radius-s: 12px;       /* select chips           */
  --radius-thumb: 14px;   /* thumbnails             */
  --radius-m: 16px;       /* selectable cards       */
  --radius-l: 20px;       /* primary buttons        */
  --radius-card: 22px;    /* elevated cards         */
  --radius-xl: 28px;      /* hero / large surfaces  */
}
```

Always use soft, continuous corners (radius ≥ 10px). Never sharp edges.

---

## 4. Components

### 4a. Primary CTA — 3D hard-shadow button (signature)
The single most recognisable element. Yellow, black label, **hard** (0-blur) shadow.
On press it sinks by `depth − 1` px and the shadow shrinks to 1px, keeping the visual stack constant.

```css
.btn-primary {
  font: 700 17px/1 var(--font-sans);
  color: var(--c-primary-text);
  background: var(--c-primary);
  border: 0; border-radius: 999px;      /* capsule; use var(--radius-l) for a rounded rect */
  padding: 16px 28px;
  box-shadow: 0 5px 0 var(--c-primary-shadow);
  cursor: pointer;
  transition: transform .08s ease-out, box-shadow .08s ease-out;
}
.btn-primary:active {
  transform: translateY(4px);
  box-shadow: 0 1px 0 var(--c-primary-shadow);
}
.btn-primary:disabled { background: rgba(128,128,128,.3); box-shadow: none; }

/* Success variant (completed action) */
.btn-success { background: var(--c-success); box-shadow: 0 5px 0 var(--c-success-shadow); color: #fff; }
.btn-success:active { box-shadow: 0 1px 0 var(--c-success-shadow); }
```

The round "+" capture button uses the exact same recipe with `border-radius: 50%` and a fixed square size (52px in-app).

### 4b. Card

```css
.card {
  background: var(--c-card);
  border-radius: var(--radius-card);
  padding: 18px;
  box-shadow: var(--shadow-card);
}
/* Non-interactive / informational card: drop the shadow (no false affordance). */
.card--flat { box-shadow: none; }
```

### 4c. Selectable card (option picker)
Selected = soft yellow fill + yellow border. Unselected = faint neutral fill.

```css
.selectable {
  border-radius: var(--radius-m);
  background: rgba(0,0,0,.05);
  border: 1.5px solid transparent;
  transition: .25s cubic-bezier(.34,1.4,.64,1);
}
.selectable[aria-selected="true"] {
  background: color-mix(in srgb, var(--c-primary) 15%, transparent);
  border-color: var(--c-primary);
}
```

### 4d. Select chip (form / config)
Selected = solid blue, white text. Unselected = faint neutral, primary text.

```css
.chip {
  border-radius: var(--radius-s);
  padding: 10px 16px;
  background: rgba(0,0,0,.07); color: var(--c-text);
  transition: .3s cubic-bezier(.34,1.4,.64,1);
}
.chip[aria-selected="true"] { background: var(--c-select); color: #fff; }
```

### 4e. Section label
Small icon (use lucide/feather on web) + 15px/600 label in the **text colour** (not yellow).

```css
.section-label { display:flex; gap:6px; align-items:center;
  font: 600 15px/1 var(--font-sans); color: var(--c-text); }
```

### 4f. Stats strip
Row of values separated by dividers: value 20px/700 (colour per stat) over label 12px/400 secondary.

### 4g. Progress bar

```css
.progress { height:6px; border-radius:4px; background: rgba(0,0,0,.08); overflow:hidden; }
.progress > span { display:block; height:100%; background: var(--c-primary); border-radius:4px; }
```

### 4h. Badge (counter, e.g. cart)
Yellow circle, black micro-label (9–11px/700), 1.5px white ring, sits top-right of an icon.

```css
.badge { background: var(--c-primary); color:#000; font:700 11px/1 var(--font-sans);
  border:1.5px solid #fff; border-radius:50%; padding:3px 5px; }
```

### 4i. Toast / floating pill (glass)
Capsule with a frosted-glass background and a soft shadow.

```css
.toast {
  border-radius: 999px; padding: 14px 20px;
  background: rgba(255,255,255,.6);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 12px rgba(0,0,0,.15);
}
@media (prefers-color-scheme: dark){ .toast { background: rgba(30,30,30,.6);} }
```

The app uses iOS 26 "Liquid Glass" for floating controls; on web reproduce with `backdrop-filter: blur()`.

---

## 5. Motion

```css
--ease-press:  .08s ease-out;                       /* tactile button sink        */
--ease-spring: .3s  cubic-bezier(.34, 1.4, .64, 1); /* selections, badges (spring)*/
--ease-fade:   .2s  ease-in-out;                     /* enabled/disabled, opacity  */
```

Decorative motif: **brick studs** — grids of soft circles with a subtle top highlight, used as low-opacity background texture on hero surfaces.

---

## 6. Do / Don't

**Do**
- DM Sans for everything.
- Yellow `#FFCC00` as the single action colour (CTAs, selection, highlights).
- Text, icons, and label accents in the **system text colour** (adaptive).
- Hard 3D shadow on primary buttons; they sink on press.
- Warm off-white page background; soft rounded corners; light + dark.

**Don't**
- No orange/red anywhere.
- No system/SF font — DM Sans only.
- No sharp corners.
- No blurred/soft shadow on the primary CTA (it must be a **hard** 0-blur shadow).
- No coloured accent for body text — text stays system label colour.
- No pure-white page background — use the warm off-white.
