/* ciaobricks — script condiviso (landing + privacy)
 * - i18n IT/EN/FR con dizionario data-i18n / data-i18n-html
 * - toggle tema chiaro/scuro (persistito)
 * - mosaico live (solo se presente #mosaic)
 */
(function () {
  "use strict";

  /* ═══════════════ TRADUZIONI ═══════════════ */
  var I18N = {
    it: {
      nav_how: "Come funziona", nav_features: "Funzioni", nav_palette: "Palette", nav_faq: "FAQ", nav_appstore: "App Store",
      hero_badge: "Presto su App Store",
      hero_h1: "Trasforma le tue foto<br />in <span class=\"text-grad\">mattoncini</span>.",
      hero_lead: "ciaobricks trasforma qualsiasi foto in un mosaico di mattoncini in stile LEGO®. Scegli la foto, imposta la griglia e ottieni <strong>anteprima live</strong>, <strong>istruzioni di montaggio</strong> e la <strong>lista completa dei pezzi</strong>.",
      hero_as_sub: "Scarica su", hero_btn_how: "Scopri come funziona",
      hero_note: "🔒 100% on-device · Nessun account · Nessun tracking",
      phone_cap: "tocca per rigenerare ↺",
      how_kicker: "Come funziona", how_title: "Da foto a mosaico in 3 passi.",
      step1_t: "Scegli una foto", step1_d: "Scatta al momento o importa dalla libreria. Qualsiasi immagine va bene.",
      step2_t: "Regola la griglia", step2_d: "Imposta la griglia da 16×16 a 64×64 studs e il numero di colori. Applica filtri e ritocchi.",
      step3_t: "Costruisci", step3_d: "Segui le istruzioni passo-passo e ottieni la lista pezzi con ID BrickLink e stima di prezzo.",
      feat_kicker: "Perché ciaobricks", feat_title: "Tutto quello che ti serve per costruire.",
      f1_t: "In pochi secondi", f1_d: "Da foto a opera d'arte in mattoncini quasi in tempo reale.",
      f2_t: "39 colori BrickLink", f2_d: "Palette mappata su codici BrickLink reali: la tua shopping list è già pronta.",
      f3_t: "Filtri artistici", f3_d: "B&N, Seppia, Cyanotype, Pop, Duotone e Game Boy per dare stile alla foto.",
      f4_t: "Regolazioni pro", f4_d: "Esposizione, contrasto, saturazione e cornici per rifinire ogni dettaglio.",
      f5_t: "Ritocco stud-per-stud", f5_d: "Intervieni a mano su ogni singolo mattoncino per un risultato perfetto.",
      f6_t: "LEGO® o generici", f6_d: "Scegli mattoncini LEGO® originali oppure generici senza marca: la lista si adatta.",
      f7_t: "Privacy totale", f7_d: "Tutto avviene sul dispositivo: nessun account, nessun tracking, nessun server.",
      f8_t: "Multilingua", f8_d: "Disponibile in Italiano, Inglese e Francese.",
      pal_kicker: "La palette", pal_title: "39 colori, codici reali.",
      pal_desc: "Ogni colore è mappato su un mattoncino BrickLink reale. Quando il mosaico è pronto, hai già la <strong>lista pezzi</strong> con quantità, colori e ID — pronta per lo shopping.",
      priv_title: "Tutto sul tuo dispositivo. Zero tracking.",
      priv_desc: "Le tue foto non lasciano mai l'iPhone. Nessun server, nessun account, nessun tracciamento. ciaobricks funziona completamente offline: la tua creatività resta privata.",
      faq_kicker: "FAQ", faq_title: "Domande frequenti.",
      q1: "Servono mattoncini LEGO® originali?", a1: "No. Puoi scegliere mattoncini LEGO® originali oppure generici/senza marca: la lista pezzi si adatta automaticamente alla tua scelta.",
      q2: "Su quali dispositivi funziona?", a2: "ciaobricks è un'app nativa per iPhone e iPad con una versione recente di iOS/iPadOS.",
      q3: "Le mie foto sono al sicuro?", a3: "Sì. Tutta l'elaborazione avviene sul tuo dispositivo: nessun caricamento su server, nessun account e nessun tracciamento.",
      q4: "Come faccio a comprare i mattoncini?", a4: "L'app genera la lista completa dei pezzi con quantità, colori e ID BrickLink, più una stima di prezzo: hai già tutto per ordinarli.",
      q5: "In quali lingue è disponibile?", a5: "Italiano, Inglese e Francese.",
      foot_tagline: "Trasforma le tue foto in mosaici di mattoncini, direttamente dal tuo iPhone.",
      foot_app: "App", foot_dl: "Scarica su App Store", foot_contact: "Contatti", foot_privacy: "Privacy Policy",
      disclaimer: "ciaobricks è un'app indipendente e non è affiliata, autorizzata, sponsorizzata né approvata dal Gruppo LEGO o da BrickLink. LEGO® e BrickLink® sono marchi del Gruppo LEGO.",
      /* Privacy Policy */
      pp_title: "Privacy Policy", pp_back: "← Torna alla home",
      pp_intro: "ciaobricks è pensata per funzionare interamente sul tuo dispositivo. Questa pagina spiega quali informazioni gestisce l'app e come.",
      pp_photos_t: "Foto e fotocamera",
      pp_photos_d: "Le foto che scatti o scegli vengono elaborate interamente sul tuo dispositivo per generare il mosaico. Nessuna immagine viene mai caricata o inviata altrove.",
      pp_profile_t: "Informazioni del profilo",
      pp_profile_d: "Nome, contatti o indirizzo che inserisci nel tuo Profilo vengono salvati solo sul tuo dispositivo e non vengono mai trasmessi. Servono a tenere pronte queste informazioni per una futura funzione di ordine; oggi non vengono inviati a noi né a nessun altro.",
      pp_diag_t: "Diagnostica delle prestazioni",
      pp_diag_d: "ciaobricks usa MetricKit di Apple, sul dispositivo, per raccogliere diagnostiche anonime su prestazioni e crash. Questi dati restano sul tuo dispositivo a meno che tu non abbia scelto di condividere le analisi con gli sviluppatori nelle Impostazioni di iOS — una scelta a livello di sistema, non controllata da questa app.",
      pp_track_t: "Tracciamento",
      pp_track_d: "ciaobricks non ti traccia tra app o siti web e non utilizza SDK di analisi o pubblicità di terze parti.",
      pp_contact_t: "Contatti", pp_contact_lead: "Per domande su questa informativa scrivi a:",
      pp_updated: "Ultimo aggiornamento: 1 luglio 2026",
    },
    en: {
      nav_how: "How it works", nav_features: "Features", nav_palette: "Palette", nav_faq: "FAQ", nav_appstore: "App Store",
      hero_badge: "Coming soon to the App Store",
      hero_h1: "Turn your photos<br />into <span class=\"text-grad\">bricks</span>.",
      hero_lead: "ciaobricks turns any photo into a LEGO®-style brick mosaic. Pick a photo, set the grid, and get a <strong>live preview</strong>, <strong>step-by-step building instructions</strong> and the <strong>complete parts list</strong>.",
      hero_as_sub: "Download on the", hero_btn_how: "See how it works",
      hero_note: "🔒 100% on-device · No account · No tracking",
      phone_cap: "tap to rebuild ↺",
      how_kicker: "How it works", how_title: "From photo to mosaic in 3 steps.",
      step1_t: "Choose a photo", step1_d: "Take one now or import from your library. Any image works.",
      step2_t: "Set the grid", step2_d: "Set the grid from 16×16 to 64×64 studs and the number of colours. Apply filters and adjustments.",
      step3_t: "Build", step3_d: "Follow the step-by-step instructions and get the parts list with BrickLink IDs and a price estimate.",
      feat_kicker: "Why ciaobricks", feat_title: "Everything you need to build.",
      f1_t: "In seconds", f1_d: "From photo to brick artwork almost in real time.",
      f2_t: "39 BrickLink colours", f2_d: "Palette mapped to real BrickLink codes: your shopping list is ready.",
      f3_t: "Artistic filters", f3_d: "B&W, Sepia, Cyanotype, Pop, Duotone and Game Boy to style your photo.",
      f4_t: "Pro adjustments", f4_d: "Exposure, contrast, saturation and frames to refine every detail.",
      f5_t: "Stud-by-stud editing", f5_d: "Tweak every single brick by hand for a perfect result.",
      f6_t: "LEGO® or generic", f6_d: "Choose original LEGO® bricks or unbranded generic ones: the list adapts.",
      f7_t: "Total privacy", f7_d: "Everything happens on device: no account, no tracking, no server.",
      f8_t: "Multilingual", f8_d: "Available in Italian, English and French.",
      pal_kicker: "The palette", pal_title: "39 colours, real codes.",
      pal_desc: "Every colour maps to a real BrickLink brick. When the mosaic is ready, you already have the <strong>parts list</strong> with quantities, colours and IDs — ready to shop.",
      priv_title: "All on your device. Zero tracking.",
      priv_desc: "Your photos never leave your iPhone. No server, no account, no tracking. ciaobricks works fully offline: your creativity stays private.",
      faq_kicker: "FAQ", faq_title: "Frequently asked questions.",
      q1: "Do I need original LEGO® bricks?", a1: "No. You can choose original LEGO® bricks or generic/unbranded ones: the parts list adapts automatically to your choice.",
      q2: "Which devices does it work on?", a2: "ciaobricks is a native app for iPhone and iPad running a recent version of iOS/iPadOS.",
      q3: "Are my photos safe?", a3: "Yes. All processing happens on your device: no server uploads, no account and no tracking.",
      q4: "How do I buy the bricks?", a4: "The app generates the full parts list with quantities, colours and BrickLink IDs, plus a price estimate: you have everything to order them.",
      q5: "Which languages is it available in?", a5: "Italian, English and French.",
      foot_tagline: "Turn your photos into brick mosaics, right from your iPhone.",
      foot_app: "App", foot_dl: "Download on the App Store", foot_contact: "Contact", foot_privacy: "Privacy Policy",
      disclaimer: "ciaobricks is an independent app and is not affiliated with, authorized, sponsored, or endorsed by the LEGO Group or BrickLink. LEGO® and BrickLink® are trademarks of the LEGO Group.",
      /* Privacy Policy */
      pp_title: "Privacy Policy", pp_back: "← Back to home",
      pp_intro: "ciaobricks is designed to work entirely on your device. This page explains what information the app handles and how.",
      pp_photos_t: "Photos and Camera",
      pp_photos_d: "Photos you take or choose are processed entirely on your device to generate your mosaic. No image is ever uploaded or sent anywhere.",
      pp_profile_t: "Profile Information",
      pp_profile_d: "Any name, contact, or address details you enter in your Profile are stored only on your device and are never transmitted. They exist so this information is ready ahead of a future ordering feature; they are not sent to us or to anyone else today.",
      pp_diag_t: "Performance Diagnostics",
      pp_diag_d: "ciaobricks uses Apple's on-device MetricKit to collect anonymised performance and crash diagnostics. This data stays on your device unless you've opted into sharing analytics with developers in iOS Settings — a system-level choice, not something this app controls.",
      pp_track_t: "Tracking",
      pp_track_d: "ciaobricks does not track you across apps or websites, and does not use third-party analytics or advertising SDKs.",
      pp_contact_t: "Contact", pp_contact_lead: "Questions about this policy can be sent to:",
      pp_updated: "Last updated: 1 July 2026",
    },
    fr: {
      nav_how: "Comment ça marche", nav_features: "Fonctions", nav_palette: "Palette", nav_faq: "FAQ", nav_appstore: "App Store",
      hero_badge: "Bientôt sur l'App Store",
      hero_h1: "Transformez vos photos<br />en <span class=\"text-grad\">briques</span>.",
      hero_lead: "ciaobricks transforme n'importe quelle photo en mosaïque de briques façon LEGO®. Choisissez une photo, réglez la grille et obtenez un <strong>aperçu en direct</strong>, des <strong>instructions de montage</strong> et la <strong>liste complète des pièces</strong>.",
      hero_as_sub: "Télécharger sur", hero_btn_how: "Voir comment ça marche",
      hero_note: "🔒 100% sur l'appareil · Sans compte · Sans suivi",
      phone_cap: "touchez pour régénérer ↺",
      how_kicker: "Comment ça marche", how_title: "De la photo à la mosaïque en 3 étapes.",
      step1_t: "Choisissez une photo", step1_d: "Prenez-en une ou importez depuis votre galerie. Toute image convient.",
      step2_t: "Réglez la grille", step2_d: "Réglez la grille de 16×16 à 64×64 tenons et le nombre de couleurs. Appliquez filtres et retouches.",
      step3_t: "Construisez", step3_d: "Suivez les instructions pas à pas et obtenez la liste des pièces avec les identifiants BrickLink et une estimation de prix.",
      feat_kicker: "Pourquoi ciaobricks", feat_title: "Tout ce qu'il faut pour construire.",
      f1_t: "En quelques secondes", f1_d: "De la photo à l'œuvre en briques presque en temps réel.",
      f2_t: "39 couleurs BrickLink", f2_d: "Palette associée à de vrais codes BrickLink : votre liste d'achats est prête.",
      f3_t: "Filtres artistiques", f3_d: "N&B, Sépia, Cyanotype, Pop, Duotone et Game Boy pour styliser la photo.",
      f4_t: "Réglages pro", f4_d: "Exposition, contraste, saturation et cadres pour peaufiner chaque détail.",
      f5_t: "Retouche tenon par tenon", f5_d: "Ajustez chaque brique à la main pour un résultat parfait.",
      f6_t: "LEGO® ou génériques", f6_d: "Choisissez des briques LEGO® originales ou génériques sans marque : la liste s'adapte.",
      f7_t: "Confidentialité totale", f7_d: "Tout se passe sur l'appareil : sans compte, sans suivi, sans serveur.",
      f8_t: "Multilingue", f8_d: "Disponible en italien, anglais et français.",
      pal_kicker: "La palette", pal_title: "39 couleurs, codes réels.",
      pal_desc: "Chaque couleur correspond à une vraie brique BrickLink. Une fois la mosaïque prête, vous avez déjà la <strong>liste des pièces</strong> avec quantités, couleurs et identifiants — prête pour l'achat.",
      priv_title: "Tout sur votre appareil. Zéro suivi.",
      priv_desc: "Vos photos ne quittent jamais votre iPhone. Aucun serveur, aucun compte, aucun suivi. ciaobricks fonctionne entièrement hors ligne : votre créativité reste privée.",
      faq_kicker: "FAQ", faq_title: "Questions fréquentes.",
      q1: "Faut-il des briques LEGO® originales ?", a1: "Non. Vous pouvez choisir des briques LEGO® originales ou génériques/sans marque : la liste des pièces s'adapte automatiquement.",
      q2: "Sur quels appareils fonctionne-t-elle ?", a2: "ciaobricks est une app native pour iPhone et iPad avec une version récente d'iOS/iPadOS.",
      q3: "Mes photos sont-elles en sécurité ?", a3: "Oui. Tout le traitement se fait sur votre appareil : aucun envoi vers un serveur, aucun compte et aucun suivi.",
      q4: "Comment acheter les briques ?", a4: "L'app génère la liste complète des pièces avec quantités, couleurs et identifiants BrickLink, plus une estimation de prix : vous avez tout pour les commander.",
      q5: "Dans quelles langues est-elle disponible ?", a5: "Italien, anglais et français.",
      foot_tagline: "Transformez vos photos en mosaïques de briques, directement depuis votre iPhone.",
      foot_app: "App", foot_dl: "Télécharger sur l'App Store", foot_contact: "Contact", foot_privacy: "Politique de confidentialité",
      disclaimer: "ciaobricks est une application indépendante, non affiliée, autorisée, sponsorisée ni approuvée par le groupe LEGO ou BrickLink. LEGO® et BrickLink® sont des marques du groupe LEGO.",
      /* Privacy Policy */
      pp_title: "Politique de confidentialité", pp_back: "← Retour à l'accueil",
      pp_intro: "ciaobricks est conçue pour fonctionner entièrement sur votre appareil. Cette page explique quelles informations l'application traite et comment.",
      pp_photos_t: "Photos et appareil photo",
      pp_photos_d: "Les photos que vous prenez ou choisissez sont traitées entièrement sur votre appareil pour générer votre mosaïque. Aucune image n'est jamais envoyée où que ce soit.",
      pp_profile_t: "Informations du profil",
      pp_profile_d: "Le nom, les coordonnées ou l'adresse que vous saisissez dans votre Profil sont enregistrés uniquement sur votre appareil et ne sont jamais transmis. Ils permettent de préparer ces informations pour une future fonctionnalité de commande ; ils ne nous sont pas envoyés, ni à qui que ce soit d'autre, à ce jour.",
      pp_diag_t: "Diagnostics de performance",
      pp_diag_d: "ciaobricks utilise MetricKit d'Apple, sur l'appareil, pour collecter des diagnostics anonymisés de performance et de plantage. Ces données restent sur votre appareil, sauf si vous avez choisi de partager les statistiques avec les développeurs dans les Réglages iOS — un choix au niveau du système, non contrôlé par cette application.",
      pp_track_t: "Suivi",
      pp_track_d: "ciaobricks ne vous suit pas à travers d'autres applications ou sites web et n'utilise aucun SDK d'analyse ou de publicité tiers.",
      pp_contact_t: "Contact", pp_contact_lead: "Pour toute question sur cette politique, écrivez à :",
      pp_updated: "Dernière mise à jour : 1 juillet 2026",
    },
  };

  function applyLang(lang) {
    if (!I18N[lang]) lang = "it";
    var dict = I18N[lang];
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
    if (document.body.getAttribute("data-page") === "privacy" && dict.pp_title) {
      document.title = dict.pp_title + " — ciaobricks";
    }
    localStorage.setItem("cb-lang", lang);
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
