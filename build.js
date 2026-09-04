#!/usr/bin/env node
/* ===========================================================
   JavaScript.info — O'zbekcha variant
   Statik sayt generatori.

   content/ papkasidagi bob fayllarini o'qib, ular asosida:
     - index.html (bosh sahifa, to'liq mundarija)
     - lessons/<slug>.html (har bir dars)
   fayllarini yaratadi.

   Ishga tushirish:  node build.js
   =========================================================== */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, "content");
const LESSONS_DIR = path.join(ROOT, "lessons");

/* ---------- Brend va muallif sozlamalari ----------
   Nomni o'zgartirish uchun faqat shu yerni tahrirlang — butun sayt
   bo'ylab avtomatik yangilanadi. */
/* Statik fayllar (css/js) versiyasi — brauzer keshini yangilash uchun.
   CSS yoki JS o'zgarganda bu raqamni oshiring. */
const ASSET_VER = "14";

/* Saytning jonli manzili (SEO, sitemap va ulashish uchun).
   Agar domen boshqa bo'lsa — faqat shu qatorni o'zgartiring. */
const SITE_URL = "https://dinmuhammad05.github.io/javascript-info";

/* Har bir qism (yo'nalish) uchun ikon va qisqa tavsif — bosh sahifadagi
   "Yo'nalishlar" sharhi uchun. Kalit — qism nomi. */
const PART_META = {
  "1-qism: JavaScript tili": { icon: "🟨", blurb: "Til asoslari: o'zgaruvchilar, funksiyalar, obyektlar, klasslar, promise va modullar." },
  "2-qism: Brauzer — hujjat, hodisalar, interfeyslar": { icon: "🌐", blurb: "DOM, hodisalar, formalar va brauzer API'lari bilan jonli sahifalar." },
  "3-qism: Qo'shimcha bo'limlar": { icon: "🧩", blurb: "Tarmoq so'rovlari, fayllar, ma'lumot saqlash va muntazam ifodalar (RegExp)." },
  "4-qism: Amaliy vositalar": { icon: "🛠️", blurb: "Git, Docker, Nginx va Linux terminal — professional ish qurollari." },
  "5-qism: Backend dasturlash": { icon: "⚙️", blurb: "Node.js, Express, NestJS, ma'lumotlar bazalari va autentifikatsiya." },
  "6-qism: Frontend asoslari": { icon: "🎨", blurb: "HTML, CSS, TypeScript va React bilan zamonaviy interfeyslar." },
  "7-qism: Testlash va yetkazib berish": { icon: "🚀", blurb: "Jest testlash, CI/CD (GitHub Actions) va loyihani deploy qilish." },
  "8-qism: Algoritmlar va ma'lumotlar tuzilmalari": { icon: "🧠", blurb: "Big O, massiv/satr, stack, daraxt/graf, saralash va intervyu masalalari." },
  "9-qism: Kiberxavfsizlik": { icon: "🛡️", blurb: "Himoya asoslari, kriptografiya, OWASP, tarmoq xavfsizligi va amaliy vositalar." },
};

/* Header navigatsiyasi uchun kichik SVG ikonlar */
const _ic = (paths) =>
  '<svg class="nav-ico" viewBox="0 0 24 24" width="15" height="15" fill="none" ' +
  'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + "</svg>";
const NAV_ICON = {
  home: _ic('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'),
  book: _ic('<path d="M3 6h.01M3 12h.01M3 18h.01"/><path d="M8 6h13M8 12h13M8 18h13"/>'),
  code: _ic('<path d="M8 6l-5 6 5 6"/><path d="M16 6l5 6-5 6"/>'),
  user: _ic('<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/>'),
};

const BRAND = {
  name: "Kodla",
  mark: "K",                                  // logotipdagi harf
  short: "dasturlash — o'zbekcha",            // logo yonidagi kichik yozuv
  tagline: "Dasturlashni noldan, o'zbek tilida o'rgan",
  author: "dinMuhammad05",
  github: "https://github.com/dinmuhammad05",
  telegram: "https://t.me/dinMuhammad05",
};

/* ---------- 1. Bob fayllarini yuklash ---------- */
function loadChapters() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /^p\d.*\.js$/.test(f)) // p1-01-..., p2-..., p3-...
    .sort();

  const chapters = [];
  for (const f of files) {
    const full = path.join(CONTENT_DIR, f);
    delete require.cache[require.resolve(full)];
    const mod = require(full);
    if (!mod || !Array.isArray(mod.lessons)) {
      console.warn("⚠️  E'tibor bering: " + f + " noto'g'ri formatda, o'tkazib yuborildi");
      continue;
    }
    chapters.push({ file: f, part: mod.part, chapter: mod.chapter, lessons: mod.lessons });
  }
  return chapters;
}

/* ---------- 2. Yordamchi HTML bo'laklari ---------- */
function attr(s) { return String(s || "").replace(/"/g, "&quot;"); }

function head(title, desc, depth, pagePath) {
  const base = depth === 0 ? "" : "../";
  const d = (desc || "").replace(/"/g, "&quot;");
  const url = SITE_URL + "/" + (pagePath || "");
  const img = SITE_URL + "/og-image.png";
  return (
    "<!DOCTYPE html>\n" +
    '<html lang="uz">\n<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    "  <title>" + title + "</title>\n" +
    '  <meta name="description" content="' + d + '">\n' +
    '  <link rel="canonical" href="' + url + '">\n' +
    // Open Graph (Telegram, Facebook, LinkedIn ulashish)
    '  <meta property="og:type" content="website">\n' +
    '  <meta property="og:site_name" content="' + attr(BRAND.name) + '">\n' +
    '  <meta property="og:locale" content="uz">\n' +
    '  <meta property="og:title" content="' + attr(title) + '">\n' +
    '  <meta property="og:description" content="' + d + '">\n' +
    '  <meta property="og:url" content="' + url + '">\n' +
    '  <meta property="og:image" content="' + img + '">\n' +
    '  <meta property="og:image:width" content="1200">\n' +
    '  <meta property="og:image:height" content="630">\n' +
    // Twitter/X
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <meta name="twitter:title" content="' + attr(title) + '">\n' +
    '  <meta name="twitter:description" content="' + d + '">\n' +
    '  <meta name="twitter:image" content="' + img + '">\n' +
    '  <link rel="manifest" href="' + base + 'manifest.webmanifest">\n' +
    '  <meta name="theme-color" content="#1a1a2e">\n' +
    '  <link rel="icon" type="image/svg+xml" href="' + base + 'icon.svg">\n' +
    '  <link rel="apple-touch-icon" href="' + base + 'icon.svg">\n' +
    '  <link rel="stylesheet" href="' + base + 'css/style.css?v=' + ASSET_VER + '">\n' +
    "  <script>(function(){try{var t=localStorage.getItem('theme');" +
    "if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))" +
    "document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();</script>\n" +
    "</head>\n<body>\n"
  );
}

function header(depth) {
  const base = depth === 0 ? "" : "../";
  return (
    '<header class="site-header">\n' +
    '  <div class="inner">\n' +
    '    <a href="' + base + 'index.html" class="logo"><span class="mark">' + esc(BRAND.mark) + "</span> " +
    esc(BRAND.name) + " <small style=\"font-weight:400;color:#9ca3af\">" + esc(BRAND.short) + "</small></a>\n" +
    '    <nav class="site-nav">\n' +
    '      <a href="' + base + 'index.html">' + NAV_ICON.home + "Bosh sahifa</a>\n" +
    '      <a href="' + base + 'index.html#mundarija">' + NAV_ICON.book + "Mundarija</a>\n" +
    '      <a href="' + base + 'editor.html">' + NAV_ICON.code + "Muharrir</a>\n" +
    '      <a href="' + BRAND.github + '" target="_blank" rel="noopener">' + NAV_ICON.user + "Muallif</a>\n" +
    "    </nav>\n" +
    '    <button class="theme-toggle" id="themeToggle" aria-label="Kunduzgi/kechki rejim" title="Kunduzgi/kechki rejim">' +
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>\n' +
    '    <button class="menu-toggle" aria-label="Menyu">☰</button>\n' +
    "  </div>\n</header>\n"
  );
}

/* Yon menyu: qismlar → boblar → darslar (yig'iladigan), qidiruv bilan.
   Faqat joriy qism va bob ochiq turadi; bosh sahifada birinchi qism ochiq. */
function sidebar(parts, currentSlug, depth) {
  const base = depth === 0 ? "" : "../";
  let html = '<aside class="sidebar" id="sidebar">\n';
  // Jonli qidiruv maydoni
  html +=
    '  <div class="side-search">\n' +
    '    <input type="search" id="lessonSearch" placeholder="🔍 Qidirish (mavzu + matn)..." ' +
    'aria-label="Dars qidirish" autocomplete="off">\n' +
    '    <div class="side-noresult" hidden>Hech narsa topilmadi</div>\n' +
    "  </div>\n";

  parts.forEach((part, pi) => {
    const partHasCurrent = part.chapters.some((ch) =>
      ch.lessons.some((l) => l.slug === currentSlug)
    );
    // Qismlar sukut bo'yicha yig'iq turadi; faqat joriy dars qaysi qismda
    // bo'lsa, o'sha qism ochiladi. Bosh sahifada hammasi yig'iq (toza 1-2-3 ro'yxat).
    const openPart = partHasCurrent;
    html += '  <details class="part-group"' + (openPart ? " open" : "") + ">\n";
    html += '    <summary class="part-summary">' + esc(part.name) + "</summary>\n";
    for (const ch of part.chapters) {
      const isCurrentChapter = ch.lessons.some((l) => l.slug === currentSlug);
      html += '    <details class="chapter-group"' + (isCurrentChapter ? " open" : "") + ">\n";
      html += "      <summary>" + esc(ch.chapter) + "</summary>\n";
      html += "      <ol>\n";
      for (const l of ch.lessons) {
        const active = l.slug === currentSlug ? ' class="active"' : "";
        html +=
          '        <li><a' + active + ' href="' + base + "lessons/" + l.slug + '.html">' +
          esc(l.title) + "</a></li>\n";
      }
      html += "      </ol>\n    </details>\n";
    }
    html += "  </details>\n";
  });
  html += "</aside>\n";
  return html;
}

function footer(depth) {
  const base = depth === 0 ? "" : "../";
  return (
    '<footer class="site-footer">\n  <div class="inner">\n' +
    "    <span>© 2026 " + esc(BRAND.name) + " — Ta'lim maqsadida yaratilgan.</span>\n" +
    '    <span class="author">Muallif: <strong>' + esc(BRAND.author) + "</strong> · " +
    '<a href="' + BRAND.github + '" target="_blank" rel="noopener">GitHub</a> · ' +
    '<a href="' + BRAND.telegram + '" target="_blank" rel="noopener">Telegram</a></span>\n' +
    "  </div>\n</footer>\n" +
    '<script src="' + base + 'js/main.js?v=' + ASSET_VER + '"></script>\n' +
    "</body>\n</html>\n"
  );
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* Ba'zi kontent fayllari kod bloklari ICHIGA ham HTML entity yozgan
   (masalan {code:"&lt;script&gt;"}). esc() ularni yana eskeyp qilib,
   ikki karra eskeyp (&amp;lt;) hosil qiladi. Buni oldini olish uchun
   kodni avval "unescape" qilamiz, so'ng bir marta esc() qilamiz —
   natija ham xom (&lt;script&gt;), ham oldindan eskeyplangan kirish
   uchun bir xil to'g'ri chiqadi (idempotent). */
function unescapeEntities(s) {
  return String(s)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/* Kod bloklari uchun bir marta, ishonchli eskeyp */
function escCode(s) {
  return esc(unescapeEntities(s));
}

/* ---------- Blok asosidagi dars tanasini render qilish ----------
   Har bir dars body: [] massiv bo'lib, elementlari quyidagi
   ko'rinishdagi obyektlar:
     { lead: "..." }         katta kirish paragrafi
     { p: "..." }            oddiy paragraf (inline HTML mumkin)
     { h2: "..." } / { h3 }  sarlavhalar
     { ul: [..] } / { ol }   ro'yxatlar (har element HTML)
     { code: "..." }         statik kod bloki
     { pg: "...", file }     interaktiv kod maydonchasi
     { note|tip|warn: "..." } chaqiruv qutichalari
     { html: "..." }         xom HTML (zaxira)
*/
function pgHtml(codeText, file) {
  file = file || "misol.js";
  return (
    '<div class="playground">' +
    '<div class="pg-bar"><span class="dots"><span class="r"></span>' +
    '<span class="y"></span><span class="g"></span></span>' +
    "<span>" + esc(file) + "</span></div>" +
    '<textarea spellcheck="false">' + escCode(codeText) + "</textarea>" +
    '<div class="pg-actions"><button class="pg-run">▶ Ishga tushirish</button>' +
    '<button class="pg-clear">Tozalash</button></div>' +
    '<div class="pg-output"><span class="muted">// natija shu yerda chiqadi</span></div>' +
    "</div>"
  );
}

function renderBlock(b) {
  if (typeof b === "string") return "<p>" + b + "</p>";
  if (b.lead != null) return '<p class="lead">' + b.lead + "</p>";
  if (b.p != null) return "<p>" + b.p + "</p>";
  if (b.h2 != null) return "<h2>" + b.h2 + "</h2>";
  if (b.h3 != null) return "<h3>" + b.h3 + "</h3>";
  if (b.ul != null) return "<ul>" + b.ul.map((i) => "<li>" + i + "</li>").join("") + "</ul>";
  if (b.ol != null) return "<ol>" + b.ol.map((i) => "<li>" + i + "</li>").join("") + "</ol>";
  if (b.code != null) return '<pre class="code"><code>' + escCode(b.code) + "</code></pre>";
  if (b.pg != null) return pgHtml(b.pg, b.file);
  if (b.note != null) return '<div class="note">' + b.note + "</div>";
  if (b.tip != null) return '<div class="tip">' + b.tip + "</div>";
  if (b.warn != null) return '<div class="warn">' + b.warn + "</div>";
  if (b.html != null) return b.html;
  return "";
}

function renderBody(body) {
  if (typeof body === "string") return body; // orqaga moslik
  if (!Array.isArray(body)) return "";
  return body.map(renderBlock).join("\n");
}

/* Sarlavhalardan matn ajratish (id va TOC uchun) */
function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function uniqueId(base, used) {
  base = base || "bolim";
  let id = base, i = 2;
  while (used[id]) { id = base + "-" + i; i++; }
  used[id] = true;
  return id;
}

/* Dars tanasini render qilib, bir vaqtda h2/h3  larga id beradi va
   "Ushbu sahifada" ro'yxati (TOC) uchun sarlavhalarni yig'adi. */
function buildArticle(body) {
  if (!Array.isArray(body)) return { html: renderBody(body), toc: [] };
  const used = {};
  const toc = [];
  const html = body
    .map((b) => {
      if (b && b.h2 != null) {
        const id = uniqueId(slugify(stripTags(b.h2)), used);
        toc.push({ level: 2, id: id, text: stripTags(b.h2) });
        return '<h2 id="' + id + '">' + b.h2 + "</h2>";
      }
      if (b && b.h3 != null) {
        const id = uniqueId(slugify(stripTags(b.h3)), used);
        toc.push({ level: 3, id: id, text: stripTags(b.h3) });
        return '<h3 id="' + id + '">' + b.h3 + "</h3>";
      }
      return renderBlock(b);
    })
    .join("\n");
  return { html: html, toc: toc };
}

function tocHtml(toc) {
  if (toc.length < 3) return "";
  const items = toc
    .map((t) => '<li class="lvl' + t.level + '"><a href="#' + t.id + '">' + esc(t.text) + "</a></li>")
    .join("\n");
  return (
    '<details class="toc" open>\n' +
    '  <summary>📑 Ushbu sahifada</summary>\n' +
    "  <ul>\n" + items + "\n  </ul>\n" +
    "</details>\n"
  );
}

/* Dars tanasidan toza matn ajratib olish (qidiruv indeksi uchun).
   HTML teglari va entity'lar olib tashlanadi, kichik harfga o'giriladi. */
function lessonText(lesson) {
  const body = lesson.body;
  if (!Array.isArray(body)) return "";
  const chunks = [];
  for (const b of body) {
    if (typeof b === "string") chunks.push(b);
    else if (b.lead != null) chunks.push(b.lead);
    else if (b.p != null) chunks.push(b.p);
    else if (b.h2 != null) chunks.push(b.h2);
    else if (b.h3 != null) chunks.push(b.h3);
    else if (b.ul != null) chunks.push(b.ul.join(" "));
    else if (b.ol != null) chunks.push(b.ol.join(" "));
    else if (b.code != null) chunks.push(b.code);
    else if (b.pg != null) chunks.push(b.pg);
    else if (b.note != null) chunks.push(b.note);
    else if (b.tip != null) chunks.push(b.tip);
    else if (b.warn != null) chunks.push(b.warn);
    else if (b.html != null) chunks.push(b.html);
  }
  let t = chunks.join(" ");
  t = t.replace(/<[^>]+>/g, " ")
       .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
       .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&[a-z]+;/g, " ");
  t = t.replace(/\s+/g, " ").trim().toLowerCase();
  return t;
}

/* Ba'zi kontent fayllarida o'zbekcha apostrof (') xato ravishda
   ortiqcha \ bilan yozilgan (masalan "o\'rganaman"). Bu faqat harflar
   orasidagi \' ni ' ga tuzatadi. "&lt;code&gt;\'&lt;/code&gt;" kabi
   qonuniy eskeyp misollariga tegmaydi (ular harflar bilan o'ralmagan). */
function fixOverEscapedApostrophe(s) {
  // Lookaround (letterlar iste'mol qilinmaydi) — shu bois ketma-ket
  // kelgan \'...\' holatlari ham to'g'ri tuzatiladi (masalan "noto\'g\'ri").
  return s.replace(/(?<=\p{L})\\'(?=\p{L})/gu, "'");
}

/* ---------- 3. Parts strukturasini qurish ---------- */
function buildParts(chapters) {
  const parts = [];
  const partByName = {};
  for (const ch of chapters) {
    const pname = ch.part || "1-qism: JavaScript tili";
    let part = partByName[pname];
    if (!part) {
      part = { name: pname, chapters: [], _chByName: {} };
      partByName[pname] = part;
      parts.push(part);
    }
    // Bir xil nomli boblar (bir necha faylga bo'lingan) birlashtiriladi
    let c = part._chByName[ch.chapter];
    if (!c) {
      c = { chapter: ch.chapter, lessons: [] };
      part._chByName[ch.chapter] = c;
      part.chapters.push(c);
    }
    c.lessons = c.lessons.concat(ch.lessons);
  }
  return parts;
}

/* Tekis dars ro'yxati (oldingi/keyingi navigatsiya uchun) */
function flatLessons(chapters) {
  const flat = [];
  for (const ch of chapters) {
    for (const l of ch.lessons) {
      flat.push({ slug: l.slug, title: l.title, chapter: ch.chapter });
    }
  }
  return flat;
}

/* ---------- 4. Dars sahifasi ---------- */
function renderLesson(lesson, chapter, parts, prev, next) {
  let nav = '<nav class="lesson-nav">\n';
  if (prev) {
    nav +=
      '  <a href="' + prev.slug + '.html"><span class="dir">← Oldingi</span>' +
      '<span class="ttl">' + esc(prev.title) + "</span></a>\n";
  } else {
    nav += '  <a href="../index.html"><span class="dir">← Ortga</span><span class="ttl">Bosh sahifa</span></a>\n';
  }
  if (next) {
    nav +=
      '  <a class="next" href="' + next.slug + '.html"><span class="dir">Keyingi →</span>' +
      '<span class="ttl">' + esc(next.title) + "</span></a>\n";
  } else {
    nav += '  <a class="next" href="../index.html"><span class="dir">Yakun →</span><span class="ttl">Bosh sahifa</span></a>\n';
  }
  nav += "</nav>\n";

  const art = buildArticle(lesson.body);

  return (
    head(esc(lesson.title) + " — " + esc(BRAND.name), lesson.blurb, 1, "lessons/" + lesson.slug + ".html") +
    header(1) +
    '<div class="reading-progress"><span id="readingBar"></span></div>\n' +
    '<div class="layout">\n' +
    sidebar(parts, lesson.slug, 1) +
    '<main class="content article">\n' +
    '<div class="crumbs">' + esc(chapter) + "</div>\n" +
    "<h1>" + esc(lesson.title) + "</h1>\n" +
    tocHtml(art.toc) +
    art.html +
    "\n" + nav +
    "</main>\n</div>\n" +
    footer(1)
  );
}

/* ---------- 5. Bosh sahifa ---------- */
function renderIndex(parts, total) {
  let tracks = '<div class="tracks">\n';
  let acc = "";
  let n = 0;

  for (const part of parts) {
    const id = slugify(part.name);
    const meta = PART_META[part.name] || { icon: "📘", blurb: "" };
    const shortName = part.name.replace(/^\d+-qism:\s*/, "");
    const lessonCount = part.chapters.reduce((s, c) => s + c.lessons.length, 0);
    const chapterCount = part.chapters.length;

    // Yo'nalishlar sharhi (tepadagi karta)
    tracks +=
      '  <a class="track" href="#' + id + '">' +
      '<span class="track-ico">' + meta.icon + "</span>" +
      '<span class="track-body">' +
      '<span class="track-title">' + esc(shortName) + "</span>" +
      '<span class="track-desc">' + esc(meta.blurb) + "</span>" +
      '<span class="track-meta">' + lessonCount + " dars · " + chapterCount + " bo'lim</span>" +
      "</span></a>\n";

    // To'liq mundarija — yig'iladigan qism (accordion)
    acc += '<details class="part-block" id="' + id + '">\n';
    acc +=
      '  <summary><span class="pb-ico">' + meta.icon + "</span>" +
      '<span class="pb-name">' + esc(part.name) + "</span>" +
      '<span class="pb-count">' + lessonCount + " dars</span></summary>\n";
    acc += '  <div class="part-inner">\n';
    for (const ch of part.chapters) {
      acc += '    <h3 class="chapter-head">' + esc(ch.chapter) + "</h3>\n";
      acc += '    <div class="cards">\n';
      for (const l of ch.lessons) {
        n++;
        const num = String(n).padStart(2, "0");
        acc +=
          '      <a class="card" href="lessons/' + l.slug + '.html">' +
          '<div class="num">' + num + "</div>" +
          "<h3>" + esc(l.title) + "</h3>" +
          "<p>" + esc(l.blurb || "") + "</p></a>\n";
      }
      acc += "    </div>\n";
    }
    acc += "  </div>\n</details>\n";
  }
  tracks += "</div>\n";

  const firstSlug = parts[0] && parts[0].chapters[0] && parts[0].chapters[0].lessons[0]
    ? parts[0].chapters[0].lessons[0].slug
    : "index";

  return (
    head(esc(BRAND.name) + " — " + esc(BRAND.tagline),
      "Web dasturlashni o'zbek tilida noldan, chuqur va batafsil o'rganing: JavaScript, " +
      "brauzer, backend, frontend, DevOps, algoritmlar va kiberxavfsizlik.", 0, "") +
    header(0) +
    '<div class="layout">\n' +
    sidebar(parts, null, 0) +
    '<main class="content">\n' +
    '<section class="hero">\n' +
    "  <h1>" + esc(BRAND.tagline) + "</h1>\n" +
    "  <p>JavaScript'dan tortib backend, frontend, DevOps, algoritmlar va kiberxavfsizlikkacha " +
    "— to'liq o'quv dasturi o'zbek tilida, brauzerda ishlaydigan interaktiv misollar bilan. " +
    "Jami <strong>" + total + "</strong> ta dars, <strong>" + parts.length + "</strong> ta yo'nalish.</p>\n" +
    '  <a href="lessons/' + firstSlug + '.html" class="btn">Birinchi darsdan boshlash →</a>\n' +
    "</section>\n" +
    '<h2 class="sec-head">Yo\'nalishlar</h2>\n' +
    '<p class="sec-sub">Saytda 9 ta asosiy yo\'nalish bor. Kerakligini tanlang — yoki pastdagi mundarijadan qism ustiga bosib mavzularni oching.</p>\n' +
    tracks +
    '<h2 id="mundarija" class="sec-head">To\'liq mundarija</h2>\n' +
    '<p class="sec-sub">Qism ustiga bosing — ichidagi barcha mavzular ochiladi.</p>\n' +
    acc +
    "</main>\n</div>\n" +
    footer(0)
  );
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ---------- 6. Generatsiya ---------- */
function main() {
  const chapters = loadChapters();
  if (!chapters.length) {
    console.error("❌ content/ papkasida bob fayllari topilmadi.");
    process.exit(1);
  }
  const parts = buildParts(chapters);
  const flat = flatLessons(chapters);

  if (!fs.existsSync(LESSONS_DIR)) fs.mkdirSync(LESSONS_DIR);

  // Dars sahifalari
  let count = 0;
  for (let i = 0; i < flat.length; i++) {
    // Tegishli lesson obyektini va bobni topamiz
    let lessonObj = null, chapterName = null;
    for (const ch of chapters) {
      const found = ch.lessons.find((l) => l.slug === flat[i].slug);
      if (found) { lessonObj = found; chapterName = ch.chapter; break; }
    }
    const prev = i > 0 ? flat[i - 1] : null;
    const next = i < flat.length - 1 ? flat[i + 1] : null;
    let htmlOut = renderLesson(lessonObj, chapterName, parts, prev, next);
    htmlOut = fixOverEscapedApostrophe(htmlOut);
    fs.writeFileSync(path.join(LESSONS_DIR, lessonObj.slug + ".html"), htmlOut);
    count++;
  }

  // Bosh sahifa
  fs.writeFileSync(path.join(ROOT, "index.html"), renderIndex(parts, flat.length));

  // Qidiruv indeksi (dars ichidagi so'zlarni topish uchun)
  const searchIndex = [];
  for (const ch of chapters) {
    for (const l of ch.lessons) {
      searchIndex.push({ slug: l.slug, title: l.title, chapter: ch.chapter, text: lessonText(l) });
    }
  }
  fs.writeFileSync(path.join(ROOT, "search-index.json"), JSON.stringify(searchIndex));

  // Online muharrir sahifasi
  writeEditor();

  // SEO: sitemap.xml va robots.txt
  writeSeoFiles(flat);

  // PWA: manifest, ikon va service worker (offline ishlash uchun)
  writePwaFiles(flat);

  console.log("✅ Generatsiya tugadi:");
  console.log("   Qismlar:  " + parts.length);
  console.log("   Boblar:   " + chapters.length);
  console.log("   Darslar:  " + count);
  console.log("   Qidiruv indeksi: search-index.json (" + searchIndex.length + " dars)");
  console.log("   PWA: manifest.webmanifest, icon.svg, sw.js (offline)");
}

/* ---------- Online muharrir sahifasi ---------- */
function writeEditor() {
  const body =
    '<main class="content editor-page">\n' +
    '<h1>Online muharrir</h1>\n' +
    '<p class="sec-sub">HTML, CSS va JavaScript yozing — natijani darhol yoningizda ko\'ring. ' +
    "Hamma narsa brauzeringizda ishlaydi, internetsiz ham. Yozganlaringiz avtomatik saqlanadi.</p>\n" +
    '<div class="editor" id="editor">\n' +
    '  <div class="ed-col">\n' +
    '    <div class="ed-tabs">\n' +
    '      <button class="active" data-lang="html">HTML</button>\n' +
    '      <button data-lang="css">CSS</button>\n' +
    '      <button data-lang="js">JS</button>\n' +
    '      <span class="ed-spacer"></span>\n' +
    '      <button id="ed-run" class="ed-run">▶ Ishga tushirish</button>\n' +
    '      <button id="ed-sample" class="ed-reset" title="Namuna kodni yuklash">Namuna</button>\n' +
    '      <button id="ed-reset" class="ed-reset" title="Kodni bo\'shatish">Tozalash</button>\n' +
    "    </div>\n" +
    '    <div class="ed-stack">\n' +
    '      <div class="ed-editor" data-lang="html">' +
    '<pre class="ed-hl" aria-hidden="true"><code id="hl-html"></code></pre>' +
    '<textarea id="ed-html" class="ed-area" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="HTML"></textarea></div>\n' +
    '      <div class="ed-editor" data-lang="css" hidden>' +
    '<pre class="ed-hl" aria-hidden="true"><code id="hl-css"></code></pre>' +
    '<textarea id="ed-css" class="ed-area" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="CSS"></textarea></div>\n' +
    '      <div class="ed-editor" data-lang="js" hidden>' +
    '<pre class="ed-hl" aria-hidden="true"><code id="hl-js"></code></pre>' +
    '<textarea id="ed-js" class="ed-area" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="JavaScript"></textarea></div>\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="ed-col ed-preview-col">\n' +
    '    <div class="ed-tabs ed-out-tabs">\n' +
    '      <button class="active" data-out="preview">🖥️ Natija</button>\n' +
    '      <button data-out="console">▚ Console</button>\n' +
    '      <span class="ed-spacer"></span>\n' +
    '      <button id="ed-clear" class="ed-clear" title="Console\'ni tozalash" hidden>🗑 Tozalash</button>\n' +
    "    </div>\n" +
    '    <div class="ed-out-stack">\n' +
    '      <iframe id="ed-preview" title="Natija" sandbox="allow-scripts allow-modals"></iframe>\n' +
    '      <div class="ed-console" id="ed-console" aria-live="polite" hidden></div>\n' +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</main>\n";
  const htmlOut =
    head("Online muharrir — " + esc(BRAND.name),
      "HTML, CSS va JavaScript'ni brauzerda yozib, natijasini darhol ko'ring — offline ishlaydigan online muharrir.",
      0, "editor.html") +
    header(0) +
    '<div class="editor-wrap">\n' + body + "</div>\n" +
    footer(0);
  fs.writeFileSync(path.join(ROOT, "editor.html"), htmlOut);
}

/* ---------- SEO fayllari: sitemap.xml va robots.txt ---------- */
function writeSeoFiles(flat) {
  const urls = [SITE_URL + "/", SITE_URL + "/editor.html"];
  for (const l of flat) urls.push(SITE_URL + "/lessons/" + l.slug + ".html");
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) => "  <url><loc>" + u + "</loc><lastmod>" + today + "</lastmod></url>")
      .join("\n") +
    "\n</urlset>\n";
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

  const robots =
    "User-agent: *\n" +
    "Allow: /\n\n" +
    "Sitemap: " + SITE_URL + "/sitemap.xml\n";
  fs.writeFileSync(path.join(ROOT, "robots.txt"), robots);
}

/* ---------- PWA fayllari: manifest + ikon + service worker ---------- */
function writePwaFiles(flat) {
  // Ikon (brend "K" — sariq fon)
  const icon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<rect width="512" height="512" rx="104" fill="#f0db4f"/>' +
    '<text x="50%" y="53%" font-family="monospace" font-size="300" font-weight="900" ' +
    'fill="#1a1a2e" text-anchor="middle" dominant-baseline="central">' + esc(BRAND.mark) + "</text></svg>\n";
  fs.writeFileSync(path.join(ROOT, "icon.svg"), icon);

  // Manifest
  const manifest = {
    name: BRAND.name + " — " + BRAND.tagline,
    short_name: BRAND.name,
    description: "Web dasturlashni o'zbek tilida o'rgatuvchi interaktiv o'quv sayti.",
    start_url: "./",
    scope: "./",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "uz",
    dir: "ltr",
    background_color: "#14141c",
    theme_color: "#1a1a2e",
    icons: [
      { src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };
  fs.writeFileSync(path.join(ROOT, "manifest.webmanifest"), JSON.stringify(manifest, null, 2));

  // Barcha keshlanadigan manzillar (offline uchun)
  const core = [
    "./",
    "index.html",
    "editor.html",
    "css/style.css?v=" + ASSET_VER,
    "js/main.js?v=" + ASSET_VER,
    "search-index.json",
    "manifest.webmanifest",
    "icon.svg",
  ];
  const lessons = flat.map((l) => "lessons/" + l.slug + ".html");
  const precache = core.concat(lessons);

  const sw =
    '/* Kodla — Service Worker (offline). build.js tomonidan yaratilgan. */\n' +
    'const CACHE = "kodla-v' + ASSET_VER + '";\n' +
    "const CORE = " + JSON.stringify(core) + ";\n" +
    "const PRECACHE = " + JSON.stringify(precache) + ";\n\n" +
    'self.addEventListener("install", function (e) {\n' +
    "  e.waitUntil((async function () {\n" +
    "    const c = await caches.open(CACHE);\n" +
    "    try { await c.addAll(CORE); } catch (err) {}\n" +
    "    // Darslarni bardoshli tarzda (biri xato bo'lsa ham davom etadi) keshlaymiz\n" +
    "    await Promise.allSettled(PRECACHE.map(function (u) { return c.add(u); }));\n" +
    "    self.skipWaiting();\n" +
    "  })());\n" +
    "});\n\n" +
    'self.addEventListener("activate", function (e) {\n' +
    "  e.waitUntil((async function () {\n" +
    "    const keys = await caches.keys();\n" +
    "    await Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));\n" +
    "    await self.clients.claim();\n" +
    "  })());\n" +
    "});\n\n" +
    'self.addEventListener("fetch", function (e) {\n' +
    "  const req = e.request;\n" +
    '  if (req.method !== "GET") return;\n' +
    "  const url = new URL(req.url);\n" +
    "  if (url.origin !== location.origin) return;\n" +
    "  e.respondWith((async function () {\n" +
    "    const cached = await caches.match(req);\n" +
    "    if (cached) {\n" +
    "      // Keshdan beramiz, fonda yangilaymiz (stale-while-revalidate)\n" +
    "      e.waitUntil((async function () {\n" +
    "        try { const res = await fetch(req); if (res && res.ok) { const c = await caches.open(CACHE); await c.put(req, res.clone()); } } catch (err) {}\n" +
    "      })());\n" +
    "      return cached;\n" +
    "    }\n" +
    "    try {\n" +
    "      const res = await fetch(req);\n" +
    "      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }\n" +
    "      return res;\n" +
    "    } catch (err) {\n" +
    '      if (req.mode === "navigate") {\n' +
    '        const idx = (await caches.match("index.html")) || (await caches.match("./"));\n' +
    "        if (idx) return idx;\n" +
    "      }\n" +
    '      return new Response("Oflayn: bu sahifa hali keshda yo\'q.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });\n' +
    "    }\n" +
    "  })());\n" +
    "});\n";
  fs.writeFileSync(path.join(ROOT, "sw.js"), sw);
}

main();
