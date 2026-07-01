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
function head(title, desc, depth) {
  const base = depth === 0 ? "" : "../";
  return (
    "<!DOCTYPE html>\n" +
    '<html lang="uz">\n<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    "  <title>" + title + "</title>\n" +
    '  <meta name="description" content="' + (desc || "").replace(/"/g, "&quot;") + '">\n' +
    '  <link rel="stylesheet" href="' + base + 'css/style.css">\n' +
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
    '      <a href="' + base + 'index.html">Bosh sahifa</a>\n' +
    '      <a href="' + base + 'index.html#mundarija">Mundarija</a>\n' +
    '      <a href="' + BRAND.github + '" target="_blank" rel="noopener">Muallif</a>\n' +
    "    </nav>\n" +
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
    '    <input type="search" id="lessonSearch" placeholder="🔍 Dars qidirish..." ' +
    'aria-label="Dars qidirish" autocomplete="off">\n' +
    '    <div class="side-noresult" hidden>Hech narsa topilmadi</div>\n' +
    "  </div>\n";

  parts.forEach((part, pi) => {
    const partHasCurrent = part.chapters.some((ch) =>
      ch.lessons.some((l) => l.slug === currentSlug)
    );
    const openPart = partHasCurrent || (currentSlug == null && pi === 0);
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
    '<script src="' + base + 'js/main.js"></script>\n' +
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

  return (
    head(esc(lesson.title) + " — " + esc(BRAND.name), lesson.blurb, 1) +
    header(1) +
    '<div class="layout">\n' +
    sidebar(parts, lesson.slug, 1) +
    '<main class="content article">\n' +
    '<div class="crumbs">' + esc(chapter) + "</div>\n" +
    "<h1>" + esc(lesson.title) + "</h1>\n" +
    renderBody(lesson.body) +
    "\n" + nav +
    "</main>\n</div>\n" +
    footer(1)
  );
}

/* ---------- 5. Bosh sahifa ---------- */
function renderIndex(parts, total) {
  let cards = "";
  let n = 0;
  for (const part of parts) {
    cards += '<h2 class="part-head" id="' + slugify(part.name) + '">' + esc(part.name) + "</h2>\n";
    for (const ch of part.chapters) {
      cards += '<h3 class="chapter-head">' + esc(ch.chapter) + "</h3>\n";
      cards += '<div class="cards">\n';
      for (const l of ch.lessons) {
        n++;
        const num = String(n).padStart(2, "0");
        cards +=
          '  <a class="card" href="lessons/' + l.slug + '.html">' +
          '<div class="num">' + num + "</div>" +
          "<h3>" + esc(l.title) + "</h3>" +
          "<p>" + esc(l.blurb || "") + "</p></a>\n";
      }
      cards += "</div>\n";
    }
  }

  const firstSlug = parts[0] && parts[0].chapters[0] && parts[0].chapters[0].lessons[0]
    ? parts[0].chapters[0].lessons[0].slug
    : "index";

  return (
    head(esc(BRAND.name) + " — " + esc(BRAND.tagline),
      "Web dasturlashni o'zbek tilida noldan, chuqur va batafsil o'rganing: JavaScript, " +
      "brauzer, backend, frontend va DevOps.", 0) +
    header(0) +
    '<div class="layout">\n' +
    sidebar(parts, null, 0) +
    '<main class="content">\n' +
    '<section class="hero">\n' +
    "  <h1>" + esc(BRAND.tagline) + "</h1>\n" +
    "  <p>JavaScript'dan tortib backend, frontend va DevOps'gacha — to'liq o'quv dasturi " +
    "o'zbek tilida, batafsil tushuntirishlar va brauzerda ishlaydigan interaktiv misollar " +
    "bilan. Jami <strong>" + total + "</strong> ta dars.</p>\n" +
    '  <a href="lessons/' + firstSlug + '.html" class="btn">Birinchi darsdan boshlash →</a>\n' +
    "</section>\n" +
    '<h2 id="mundarija" style="font-size:1.7rem;margin:0 0 6px">To\'liq mundarija</h2>\n' +
    '<p style="color:var(--muted);margin:0 0 26px">Web dasturlashning to\'liq yo\'l xaritasi. ' +
    "Har bir dars amaliy misollar bilan.</p>\n" +
    cards +
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

  console.log("✅ Generatsiya tugadi:");
  console.log("   Qismlar:  " + parts.length);
  console.log("   Boblar:   " + chapters.length);
  console.log("   Darslar:  " + count);
}

main();
