/* ciaobricks — script condiviso (landing + privacy)
 * - i18n IT/EN/FR caricato da file esterni (assets/i18n/<lang>.json)
 *   applicato via data-i18n / data-i18n-html + meta SEO localizzati
 * - toggle tema chiaro/scuro (persistito)
 * - mosaico live (solo se presente #mosaic)
 *
 * NOTA: le traduzioni sono caricate con fetch(), quindi la pagina va servita
 * via HTTP (es. GitHub Pages o `python3 -m http.server`). Aprendola da
 * file:// il fetch è bloccato dal browser e resta il contenuto HTML di
 * default (italiano).
 */
(function () {
  "use strict";

  /* ═══════════════ I18N (IT/EN/FR da file esterni) ═══════════════ */
  var LANGS = ["it", "en", "fr"];
  var isPrivacy = document.body.getAttribute("data-page") === "privacy";
  var I18N_BASE = isPrivacy ? "../assets/i18n/" : "assets/i18n/";
  var CACHE = {};

  function loadDict(lang) {
    if (CACHE[lang]) return Promise.resolve(CACHE[lang]);
    return fetch(I18N_BASE + lang + ".json")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { CACHE[lang] = d; return d; });
  }

  function setMeta(selector, val) {
    if (val == null) return;
    var el = document.querySelector(selector);
    if (el) el.setAttribute("content", val);
  }

  function render(lang, dict) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    /* Meta SEO localizzati */
    if (isPrivacy) {
      if (dict.pp_title) document.title = dict.pp_title + " — ciaobricks";
      setMeta('meta[name="description"]', dict.pp_meta_desc);
    } else {
      if (dict.meta_title) document.title = dict.meta_title;
      setMeta('meta[name="description"]', dict.meta_desc);
      setMeta('meta[property="og:title"]', dict.og_title || dict.meta_title);
      setMeta('meta[property="og:description"]', dict.og_desc);
    }
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "it";
    loadDict(lang).then(function (dict) {
      render(lang, dict);
      localStorage.setItem("cb-lang", lang);
    }).catch(function () {
      /* fallback: su file:// il fetch fallisce — resta il contenuto HTML
         di default (italiano). Nessuna azione necessaria. */
    });
  }

  document.querySelectorAll(".lang-switch button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });
  applyLang(window.__cbLang || "it");

  /* ═══════════════ TOGGLE TEMA ═══════════════ */
  var toggle = document.getElementById("theme-toggle");
  function syncIcons() {
    var dark = document.documentElement.classList.contains("dark");
    var sun = document.querySelector(".ico-sun"), moon = document.querySelector(".ico-moon");
    if (sun && moon) { sun.style.display = dark ? "block" : "none"; moon.style.display = dark ? "none" : "block"; }
  }
  syncIcons();
  if (toggle) toggle.addEventListener("click", function () {
    var root = document.documentElement;
    root.classList.toggle("dark");
    localStorage.setItem("cb-theme", root.classList.contains("dark") ? "dark" : "light");
    syncIcons();
  });

  /* ═══════════════ ANNO FOOTER ═══════════════ */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ═══════════════ MOSAICO LIVE (solo landing) ═══════════════ */
  var canvas = document.getElementById("mosaic");
  var ctx = canvas && canvas.getContext("2d");
  if (!ctx) return;
  var SUBJECTS = ["🐶","🌺","🦊","🏝️","🐱","🍓","🦜","🌻"];
  var COLS = 26, idx = 0, grid = null, start = 0, DUR = 950;
  var src = document.createElement("canvas"), sctx = src.getContext("2d");
  function buildGrid() {
    var rows = Math.round(COLS * (canvas.height / canvas.width));
    src.width = COLS; src.height = rows;
    sctx.clearRect(0, 0, COLS, rows);
    sctx.fillStyle = "#f3ede2"; sctx.fillRect(0, 0, COLS, rows);
    sctx.textAlign = "center"; sctx.textBaseline = "middle";
    sctx.font = (Math.min(COLS, rows) * 0.92) + "px serif";
    sctx.fillText(SUBJECTS[idx], COLS / 2, rows / 2 + rows * 0.02);
    var d = sctx.getImageData(0, 0, COLS, rows).data;
    var cells = [], cx = COLS / 2, cy = rows / 2, maxD = Math.hypot(cx, cy);
    for (var r = 0; r < rows; r++) for (var c = 0; c < COLS; c++) {
      var i = (r * COLS + c) * 4;
      cells.push({ c: c, r: r, color: "rgb(" + d[i] + "," + d[i+1] + "," + d[i+2] + ")",
        delay: Math.hypot(c - cx, r - cy) / maxD + Math.random() * 0.12 });
    }
    return { cells: cells };
  }
  function rr(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function draw(now) {
    if (!grid) return;
    var p = Math.min(1, (now - start) / DUR), w = canvas.width, h = canvas.height, size = w / COLS, pad = size * 0.1;
    ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#1b1b1f"; ctx.fillRect(0, 0, w, h);
    grid.cells.forEach(function (cell) {
      var l = (p - cell.delay) / 0.25; if (l <= 0) return;
      var a = Math.min(1, l), sc = 0.55 + 0.45 * a;
      var x = cell.c * size + size / 2, y = cell.r * size + size / 2, s = (size - pad) * sc;
      ctx.globalAlpha = a; rr(x - s/2, y - s/2, s, s, s * 0.24); ctx.fillStyle = cell.color; ctx.fill();
      ctx.globalAlpha = a * 0.16; ctx.beginPath(); ctx.arc(x, y - s*0.13, s*0.17, 0, Math.PI*2); ctx.fillStyle = "#fff"; ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (p < 1) requestAnimationFrame(draw);
  }
  function rebuild() { grid = buildGrid(); start = performance.now(); requestAnimationFrame(draw); }
  rebuild();
  canvas.addEventListener("click", function () { idx = (idx + 1) % SUBJECTS.length; rebuild(); });
})();
