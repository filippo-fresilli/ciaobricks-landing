/* ciaobricks — generatore pagine multilingua
 *
 * Genera le varianti EN/FR statiche a partire dalle pagine IT (sorgente) e
 * dai dizionari in assets/i18n/*.json. Ogni lingua vive in una sua cartella:
 *
 *   /            /privacy/            → IT (sorgente, non toccata)
 *   /en/         /en/privacy/         → generata
 *   /fr/         /fr/privacy/         → generata
 *
 * Le pagine risultanti sono 100% statiche e localizzate (contenuti + meta
 * SEO + hreflang), servibili così come sono da GitHub Pages senza build.
 *
 * Uso:  node build.js
 * Richiede Chromium via Playwright (usato solo come motore DOM).
 */
"use strict";

const fs = require("fs");
const path = require("path");

// Playwright è usato solo come motore DOM. Prova il pacchetto locale
// (`npm install`), poi eventuali installazioni globali note.
function loadChromium() {
  const candidates = [
    "playwright",
    "/opt/node22/lib/node_modules/playwright/index.js",
  ];
  for (const c of candidates) {
    try { return require(c).chromium; } catch (_) { /* prova il prossimo */ }
  }
  throw new Error("Playwright non trovato: esegui `npm install`.");
}
const chromium = loadChromium();

// In alcuni ambienti gestiti il binario Chromium è in un percorso fisso;
// altrimenti si usa quello che Playwright installa da solo.
const LAUNCH = fs.existsSync("/opt/pw-browsers/chromium")
  ? { executablePath: "/opt/pw-browsers/chromium" }
  : {};

const SITE = "https://ciaobricks.app";
const LOCALES = { it: "it_IT", en: "en_US", fr: "fr_FR" };
const GEN_LANGS = ["en", "fr"];

// pageType → { template, url(lang) }
const PAGES = {
  home: {
    template: "index.html",
    out: (lang) => `${lang}/index.html`,
    url: (lang) => (lang === "it" ? "/" : `/${lang}/`),
  },
  privacy: {
    template: "privacy/index.html",
    out: (lang) => `${lang}/privacy/index.html`,
    url: (lang) => (lang === "it" ? "/privacy/" : `/${lang}/privacy/`),
  },
};

// Percorso relativo da una dir URL (con slash finale) a un path URL assoluto.
function relFromDir(fromDir, toPath) {
  const f = fromDir.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const t = toPath.replace(/^\//, "").split("/");
  let i = 0;
  while (i < f.length && i < t.length - 1 && f[i] === t[i]) i++;
  const up = f.length - i;
  const down = t.slice(i);
  let rel = "../".repeat(up) + down.join("/");
  if (rel === "") rel = "./";
  return rel;
}

function readDict(lang) {
  return JSON.parse(fs.readFileSync(path.join("assets/i18n", `${lang}.json`), "utf8"));
}

// Eseguita nel browser: localizza + sistema meta/link/percorsi.
function transformInPage(cfg) {
  const d = document;
  const dict = cfg.dict;

  d.documentElement.lang = cfg.lang;

  d.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  d.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });

  // Titolo + meta SEO
  const setMeta = (sel, val) => {
    if (val == null) return;
    const el = d.querySelector(sel);
    if (el) el.setAttribute("content", val);
  };
  if (cfg.page === "privacy") {
    if (dict.pp_title) d.title = dict.pp_title + " — ciaobricks";
    setMeta('meta[name="description"]', dict.pp_meta_desc);
  } else {
    if (dict.meta_title) d.title = dict.meta_title;
    setMeta('meta[name="description"]', dict.meta_desc);
    setMeta('meta[property="og:title"]', dict.og_title || dict.meta_title);
    setMeta('meta[property="og:description"]', dict.og_desc);
  }

  // Canonical + og per lingua (gli hreflang elencano tutte le lingue e
  // restano identici su ogni variante, quindi non si toccano).
  const can = d.querySelector('link[rel="canonical"]');
  if (can) can.setAttribute("href", cfg.canonical);
  setMeta('meta[property="og:url"]', cfg.canonical);
  setMeta('meta[property="og:locale"]', cfg.locale);
  setMeta('meta[property="og:image"]', cfg.ogImage);
  // og:locale:alternate → le altre lingue (non quella corrente)
  const alts = d.querySelectorAll('meta[property="og:locale:alternate"]');
  cfg.altLocales.forEach((loc, i) => { if (alts[i]) alts[i].setAttribute("content", loc); });

  // Switch lingua → href relativi dalla pagina corrente + lingua attiva
  d.querySelectorAll(".lang-switch [data-lang]").forEach((el) => {
    const l = el.getAttribute("data-lang");
    el.setAttribute("href", cfg.switchHrefs[l]);
    if (l === cfg.lang) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });

  // Risorse condivise (assets/, styles.css, app.js) → un livello più in
  // profondità rispetto al template.
  const bump = (val) =>
    /^(\.\.\/)?(assets\/|styles\.css|app\.js)/.test(val) ? "../" + val : val;
  d.querySelectorAll("[src]").forEach((el) =>
    el.setAttribute("src", bump(el.getAttribute("src")))
  );
  d.querySelectorAll("link[href]").forEach((el) => {
    const rel = el.getAttribute("rel") || "";
    if (rel.includes("icon") || rel === "stylesheet")
      el.setAttribute("href", bump(el.getAttribute("href")));
  });
}

async function main() {
  const browser = await chromium.launch(LAUNCH);
  const page = await browser.newPage();
  const written = [];

  for (const [pageType, def] of Object.entries(PAGES)) {
    for (const lang of GEN_LANGS) {
      const dict = readDict(lang);
      const canonical = SITE + def.url(lang);
      const outDir = "/" + path.dirname(def.out(lang)) + "/";
      const switchHrefs = {};
      for (const l of ["it", "en", "fr"]) switchHrefs[l] = relFromDir(outDir, PAGES[pageType].url(l));

      await page.goto("file://" + path.resolve(def.template), { waitUntil: "load" });
      await page.evaluate(transformInPage, {
        lang,
        page: pageType,
        dict,
        canonical,
        locale: LOCALES[lang],
        altLocales: ["it", "en", "fr"].filter((l) => l !== lang).map((l) => LOCALES[l]),
        ogImage: SITE + "/assets/logo.png",
        switchHrefs,
      });

      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const outPath = def.out(lang);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html + "\n");
      written.push(outPath);
    }
  }

  await browser.close();

  // sitemap.xml con alternate hreflang + robots.txt
  const ALL = ["it", "en", "fr"];
  const alt = (pageType) =>
    ALL.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${PAGES[pageType].url(l)}"/>`)
      .join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${PAGES[pageType].url("it")}"/>`;
  const urls = [];
  for (const pageType of Object.keys(PAGES))
    for (const l of ALL)
      urls.push(`  <url>\n    <loc>${SITE}${PAGES[pageType].url(l)}</loc>\n${alt(pageType)}\n  </url>`);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync("sitemap.xml", sitemap);
  fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  written.push("sitemap.xml", "robots.txt");

  console.log("Generated:\n  " + written.join("\n  "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
