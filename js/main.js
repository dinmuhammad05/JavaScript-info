/* ===========================================================
   JavaScript.info — O'zbekcha variant
   Umumiy skript: interaktiv "playground" va mobil menyu
   =========================================================== */

(function () {
  "use strict";

  /* --------- Mobil yon menyu: kontent ustida "drawer" (overlay) --------- */
  const toggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    // Orqa fon (backdrop) — bosilganda menyu yopiladi
    const backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    document.body.appendChild(backdrop);

    // Drawer tepasiga yopish tugmasi (faqat mobil ko'rinadi)
    const closeBar = document.createElement("div");
    closeBar.className = "side-close";
    closeBar.innerHTML = "<span>Menyu</span><button aria-label=\"Yopish\">✕</button>";
    sidebar.insertBefore(closeBar, sidebar.firstChild);

    // Mobil menyu (drawer) ichiga asosiy havolalar — telefonda header nav yashirin
    var navBase = /\/lessons\//.test(location.pathname) ? "../" : "";
    var dnav = document.createElement("nav");
    dnav.className = "drawer-nav";
    dnav.innerHTML =
      '<a href="' + navBase + 'index.html">🏠 Bosh sahifa</a>' +
      '<a href="' + navBase + 'index.html#mundarija">📚 Mundarija</a>' +
      '<a href="' + navBase + 'editor.html">💻 Online muharrir</a>' +
      '<a href="https://github.com/dinmuhammad05" target="_blank" rel="noopener">👤 Muallif</a>';
    sidebar.insertBefore(dnav, closeBar.nextSibling);

    function openNav() {
      sidebar.classList.add("open");
      backdrop.classList.add("show");
      document.body.classList.add("nav-open");
    }
    function closeNav() {
      sidebar.classList.remove("open");
      backdrop.classList.remove("show");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      if (sidebar.classList.contains("open")) closeNav();
      else openNav();
    });
    backdrop.addEventListener("click", closeNav);
    closeBar.querySelector("button").addEventListener("click", closeNav);
    // Dars havolasiga bosilganda ham yopamiz
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // Escape tugmasi menyuni yopadi
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar.classList.contains("open")) closeNav();
    });
  }

  /* --------- Joriy sahifani yon menyuda belgilash --------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar a").forEach(function (a) {
    const href = a.getAttribute("href");
    if (href && href.split("/").pop() === here) {
      a.classList.add("active");
    }
  });

  /* --------- Interaktiv kod maydonchasi (playground) ---------
     Har bir .playground bloki ichida <textarea> va natija uchun
     .pg-output bo'ladi. "Ishga tushirish" tugmasi kodni xavfsizroq
     tarzda ishga tushiradi va console.log natijalarini ko'rsatadi. */

  document.querySelectorAll(".playground").forEach(function (pg) {
    const ta = pg.querySelector("textarea");
    const out = pg.querySelector(".pg-output");
    const runBtn = pg.querySelector(".pg-run");
    const clearBtn = pg.querySelector(".pg-clear");
    if (!ta || !out) return;

    // Boshlang'ich kodni saqlab qo'yamiz ("tozalash" uchun)
    const initial = ta.value;

    function run() {
      const logs = [];
      const push = function (kind, args) {
        const line = Array.prototype.map
          .call(args, format)
          .join(" ");
        logs.push({ kind: kind, line: line });
      };

      // Foydalanuvchi koddagi console.* chaqiruvlarini ushlaymiz
      const sandboxConsole = {
        log: function () { push("log", arguments); },
        info: function () { push("log", arguments); },
        warn: function () { push("warn", arguments); },
        error: function () { push("err", arguments); },
      };

      try {
        // Kodni funksiya ichida ishga tushiramiz; global console emas,
        // bizning sandboxConsole ishlatiladi.
        const fn = new Function("console", '"use strict";\n' + ta.value);
        const result = fn(sandboxConsole);
        if (result !== undefined) {
          push("log", ["⇒ " + format(result)]);
        }
      } catch (e) {
        logs.push({ kind: "err", line: "Xatolik: " + e.message });
      }

      render(logs);
    }

    function render(logs) {
      if (!logs.length) {
        out.innerHTML = '<span class="muted">// natija yo\'q (console.log ishlating)</span>';
        return;
      }
      out.innerHTML = logs
        .map(function (l) {
          const cls = l.kind === "err" ? "err" : l.kind === "warn" ? "warn" : "";
          return cls
            ? '<span class="' + cls + '">' + escapeHtml(l.line) + "</span>"
            : escapeHtml(l.line);
        })
        .join("\n");
    }

    runBtn && runBtn.addEventListener("click", run);
    clearBtn &&
      clearBtn.addEventListener("click", function () {
        ta.value = initial;
        out.innerHTML = '<span class="muted">// tozalandi</span>';
      });

    // Ctrl/Cmd + Enter bilan ishga tushirish
    ta.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run();
      }
      // Tab tugmasi 2 bo'sh joy qo'shsin (fokusni yo'qotmasin)
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart;
        const ePos = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "  " + ta.value.slice(ePos);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
  });

  /* --------- Yordamchi funksiyalar --------- */
  function format(v) {
    if (typeof v === "string") return v;
    if (v === null) return "null";
    if (v === undefined) return "undefined";
    if (typeof v === "function") return v.toString();
    try {
      return JSON.stringify(v, null, 0);
    } catch (e) {
      return String(v);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();

/* ===========================================================
   Yon menyu jonli qidiruvi — darslarni sarlavha bo'yicha filtrlaydi
   =========================================================== */
(function () {
  "use strict";
  var input = document.getElementById("lessonSearch");
  var sidebar = document.getElementById("sidebar");
  if (!input || !sidebar) return;

  var noResult = sidebar.querySelector(".side-noresult");
  var parts = Array.prototype.slice.call(sidebar.querySelectorAll(".part-group"));

  // Boshlang'ich ochiq/yopiq holatni saqlab qo'yamiz (qidiruv tugagach tiklash uchun)
  var details = Array.prototype.slice.call(sidebar.querySelectorAll("details"));
  var origOpen = details.map(function (d) { return d.open; });

  // Har bir <li> uchun slug'ni oldindan hisoblab olamiz
  var items = Array.prototype.slice.call(sidebar.querySelectorAll(".chapter-group li")).map(function (li) {
    var a = li.querySelector("a");
    var href = a ? a.getAttribute("href") : "";
    var slug = href.split("/").pop().replace(".html", "");
    return { li: li, slug: slug, title: li.textContent.toLowerCase() };
  });

  // Dars ichidagi matnni qidirish uchun indeks (bir marta yuklanadi)
  var contentIndex = null, indexLoading = false;
  function loadIndex(cb) {
    if (contentIndex) { cb(); return; }
    if (indexLoading) return;
    indexLoading = true;
    var base = /\/lessons\//.test(location.pathname) ? "../" : "";
    fetch(base + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        contentIndex = {};
        data.forEach(function (it) { contentIndex[it.slug] = it.text; });
        cb();
      })
      .catch(function () { contentIndex = {}; cb(); });
  }

  function reset() {
    sidebar.querySelectorAll(".hidden").forEach(function (el) { el.classList.remove("hidden"); });
    details.forEach(function (d, i) { d.open = origOpen[i]; });
    if (noResult) noResult.hidden = true;
  }

  function applyFilter(q) {
    var anyMatch = false;
    parts.forEach(function (part) {
      var partMatch = false;
      part.querySelectorAll(".chapter-group").forEach(function (ch) {
        var chMatch = false;
        ch.querySelectorAll("li").forEach(function (li) {
          var slug = li.getAttribute("data-slug");
          var title = li.textContent.toLowerCase();
          var inContent = contentIndex && contentIndex[slug] && contentIndex[slug].indexOf(q) !== -1;
          var hit = title.indexOf(q) !== -1 || inContent;
          li.classList.toggle("hidden", !hit);
          // Dars ichidan topilganini belgilaymiz
          li.classList.toggle("content-hit", !!(inContent && title.indexOf(q) === -1));
          if (hit) chMatch = true;
        });
        ch.classList.toggle("hidden", !chMatch);
        ch.open = chMatch;
        if (chMatch) partMatch = true;
      });
      part.classList.toggle("hidden", !partMatch);
      part.open = partMatch;
      if (partMatch) anyMatch = true;
    });
    if (noResult) noResult.hidden = anyMatch;
  }

  // slug'larni <li>ga yozib qo'yamiz (applyFilter tez ishlashi uchun)
  items.forEach(function (it) { it.li.setAttribute("data-slug", it.slug); });

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    if (!q) { reset(); return; }
    applyFilter(q);                       // darhol: sarlavha (va indeks yuklangan bo'lsa, matn)
    if (!contentIndex) {
      loadIndex(function () {
        if (input.value.trim().toLowerCase() === q) applyFilter(q);  // matn bo'yicha qayta filtrlash
      });
    }
  });

  // Esc tugmasi qidiruvni tozalaydi
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; reset(); }
  });
})();

/* ===========================================================
   UX: kechki rejim, o'qish progressi, kod nusxalash,
   yon menyu avto-siljish, TOC scrollspy
   =========================================================== */
(function () {
  "use strict";
  var root = document.documentElement;

  /* --- Kechki/kunduzgi rejim --- */
  var toggle = document.getElementById("themeToggle");
  var ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/></svg>';
  function isDark() { return root.getAttribute("data-theme") === "dark"; }
  function paintToggle() { if (toggle) toggle.innerHTML = isDark() ? ICON_SUN : ICON_MOON; }
  paintToggle();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paintToggle();
    });
  }

  /* --- O'qish progressi --- */
  var bar = document.getElementById("readingBar");
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* --- Kodni nusxalash tugmasi (pre.code) --- */
  Array.prototype.forEach.call(document.querySelectorAll("pre.code"), function (pre) {
    if (pre.parentNode && pre.parentNode.classList.contains("code-wrap")) return;
    var wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Nusxalash";
    wrap.appendChild(btn);
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        btn.textContent = "✓ Nusxalandi";
        btn.classList.add("copied");
        setTimeout(function () { btn.textContent = "Nusxalash"; btn.classList.remove("copied"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        try {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select();
          document.execCommand("copy"); document.body.removeChild(ta); done();
        } catch (e) {}
      }
    });
  });

  /* --- Bosh sahifada: yo'nalish (track) bosilsa, o'sha qism ochilsin --- */
  function openTarget() {
    var h = location.hash.replace("#", "");
    if (!h) return;
    var el = document.getElementById(h);
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      try { el.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { el.scrollIntoView(); }
    }
  }
  window.addEventListener("hashchange", openTarget);
  openTarget();

  /* --- Yon menyu joriy darsga avto-siljish --- */
  var sb = document.getElementById("sidebar");
  var active = sb && sb.querySelector("a.active");
  if (sb && active) {
    try { sb.scrollTop = active.offsetTop - sb.clientHeight / 2; } catch (e) {}
  }

  /* --- TOC scrollspy: joriy bo'limni belgilash --- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (tocLinks.length) {
    var heads = tocLinks.map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return document.getElementById(id);
    });
    var spy = function () {
      var pos = window.scrollY + 90;
      var idx = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i] && heads[i].offsetTop <= pos) idx = i;
      }
      tocLinks.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }
})();

/* ===========================================================
   PWA: service worker'ni ro'yxatdan o'tkazish (offline ishlash)
   =========================================================== */
(function () {
  "use strict";
  if (!("serviceWorker" in navigator)) return;
  // file:// da ishlamaydi — faqat http(s)
  if (location.protocol !== "http:" && location.protocol !== "https:") return;
  var swPath = (/\/lessons\//.test(location.pathname) ? "../" : "") + "sw.js";
  window.addEventListener("load", function () {
    navigator.serviceWorker.register(swPath).catch(function () {});
  });
})();

/* ===========================================================
   Online muharrir (editor.html) — HTML/CSS/JS + jonli natija
   =========================================================== */
(function () {
  "use strict";
  var iframe = document.getElementById("ed-preview");
  if (!iframe) return;
  var ta = {
    html: document.getElementById("ed-html"),
    css: document.getElementById("ed-css"),
    js: document.getElementById("ed-js"),
  };
  var hlEl = {
    html: document.getElementById("hl-html"),
    css: document.getElementById("hl-css"),
    js: document.getElementById("hl-js"),
  };
  var wraps = {};
  Array.prototype.forEach.call(document.querySelectorAll(".ed-editor"), function (w) {
    wraps[w.getAttribute("data-lang")] = w;
  });
  var tabs = document.querySelectorAll(".ed-tabs button[data-lang]");
  var runBtn = document.getElementById("ed-run");
  var resetBtn = document.getElementById("ed-reset");
  var consoleEl = document.getElementById("ed-console");
  var KEY = "kodla-editor-v2";
  var DEFAULT = {
    html: "<h1>Mening birinchi sahifam</h1>\n<p>Quyidagi ro'yxatni JavaScript chizdi:</p>\n<ul id=\"royxat\"></ul>",
    css: "body { font-family: sans-serif; padding: 20px; color: #1a1a2e; }\nh1 { color: #d9a400; }\nli { margin: 6px 0; font-size: 18px; }",
    js: "// Bu kod sahifa ochilishi bilan darhol ishlaydi\nconst mevalar = ['Olma', 'Banan', 'Uzum'];\nconst royxat = document.getElementById('royxat');\n\nmevalar.forEach(function (meva) {\n  const li = document.createElement('li');\n  li.textContent = meva;\n  royxat.appendChild(li);\n});\n\nconsole.log('Jami', mevalar.length, 'ta meva chizildi');",
  };

  /* ---- Syntax highlighting ---- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var KW = { "function":1,"return":1,"var":1,"let":1,"const":1,"if":1,"else":1,"for":1,"while":1,"do":1,"switch":1,"case":1,"break":1,"continue":1,"new":1,"class":1,"extends":1,"super":1,"this":1,"typeof":1,"instanceof":1,"in":1,"of":1,"try":1,"catch":1,"finally":1,"throw":1,"delete":1,"void":1,"yield":1,"await":1,"async":1,"default":1,"export":1,"import":1,"from":1 };
  var LIT = { "true":1,"false":1,"null":1,"undefined":1,"NaN":1,"Infinity":1 };
  function hlJS(code) {
    var re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`\\])*`|"(?:\\[\s\S]|[^"\\\n])*"|'(?:\\[\s\S]|[^'\\\n])*')|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)|(\s+)|([\s\S])/g;
    var out = "";
    code.replace(re, function (m, c, s, n, id, ws, ch, off, str) {
      if (c) out += '<span class="tk-c">' + esc(c) + "</span>";
      else if (s) out += '<span class="tk-s">' + esc(s) + "</span>";
      else if (n) out += '<span class="tk-n">' + esc(n) + "</span>";
      else if (id) {
        if (KW[id]) out += '<span class="tk-k">' + id + "</span>";
        else if (LIT[id]) out += '<span class="tk-l">' + id + "</span>";
        else out += (str.charAt(off + m.length) === "(") ? '<span class="tk-f">' + esc(id) + "</span>" : esc(id);
      }
      else if (ws) out += esc(ws);
      else out += esc(m);
      return m;
    });
    return out;
  }
  function hlHTML(code) {
    var re = /(<!--[\s\S]*?-->)|(<\/?)([A-Za-z][\w-]*)|([A-Za-z-]+)(=)|("[^"]*"|'[^']*')|([\s\S])/g;
    var out = "";
    code.replace(re, function (m, cm, br, tag, attr, eq, s) {
      if (cm) out += '<span class="tk-c">' + esc(cm) + "</span>";
      else if (tag) out += esc(br) + '<span class="tk-t">' + esc(tag) + "</span>";
      else if (attr && eq) out += '<span class="tk-a">' + esc(attr) + "</span>" + esc(eq);
      else if (s) out += '<span class="tk-s">' + esc(s) + "</span>";
      else out += esc(m);
      return m;
    });
    return out;
  }
  function hlCSS(code) {
    var re = /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(@[\w-]+)|([.#]?-?[A-Za-z_][\w-]*)(\s*:)?|([\s\S])/g;
    var out = "";
    code.replace(re, function (m, cm, s, at, word, colon) {
      if (cm) out += '<span class="tk-c">' + esc(cm) + "</span>";
      else if (s) out += '<span class="tk-s">' + esc(s) + "</span>";
      else if (at) out += '<span class="tk-k">' + esc(at) + "</span>";
      else if (word != null && word !== "") {
        out += colon
          ? '<span class="tk-a">' + esc(word) + "</span>" + esc(colon)
          : '<span class="tk-t">' + esc(word) + "</span>";
      }
      else out += esc(m);
      return m;
    });
    return out;
  }
  var HL = { html: hlHTML, css: hlCSS, js: hlJS };

  function paint(lang) { hlEl[lang].innerHTML = HL[lang](ta[lang].value) + "\n"; }
  function sync(lang) {
    var pre = hlEl[lang].parentNode;
    pre.scrollTop = ta[lang].scrollTop;
    pre.scrollLeft = ta[lang].scrollLeft;
  }

  /* ---- Console / xatolar paneli ---- */
  function clearConsole() { if (consoleEl) consoleEl.innerHTML = ""; }
  function logLine(text, cls) {
    if (!consoleEl) return;
    var d = document.createElement("span");
    d.className = "ln" + (cls ? " " + cls : "");
    d.textContent = text;
    consoleEl.appendChild(d);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (d && d.__ed) logLine(d.text, d.type === "error" ? "err" : d.type === "warn" ? "warn" : "");
  });

  /* ---- Ishga tushirish ---- */
  function buildDoc() {
    var safeJS = ta.js.value.replace(/<\/script>/gi, "<\\/script>");
    var instrument =
      "(function(){var send=function(t,a){try{parent.postMessage({__ed:1,type:t,text:a},'*')}catch(e){}};" +
      "['log','info','warn','error'].forEach(function(m){var o=console[m];console[m]=function(){" +
      "send(m==='error'?'error':m==='warn'?'warn':'log',Array.prototype.map.call(arguments,function(x){" +
      "try{return typeof x==='object'?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(' '));" +
      "o&&o.apply(console,arguments)}});" +
      "window.onerror=function(msg,src,line){send('error','Xatolik: '+msg+(line?(' (qator '+line+')'):''));return false};" +
      "window.addEventListener('unhandledrejection',function(e){send('error','Promise xatosi: '+((e.reason&&e.reason.message)||e.reason))});})();";
    return "<!doctype html><html><head><meta charset='utf-8'><style>" + ta.css.value +
      "</style></head><body>" + ta.html.value +
      "<script>" + instrument + "<\/script><script>" + safeJS + "<\/script></body></html>";
  }
  function render() {
    clearConsole();
    try { new Function(ta.js.value); }
    catch (e) { logLine("Sintaksis xatosi: " + e.message, "err"); }
    iframe.srcdoc = buildDoc();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ html: ta.html.value, css: ta.css.value, js: ta.js.value })); } catch (e) {}
  }

  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  var data = (saved && saved.html != null) ? saved : DEFAULT;
  ["html", "css", "js"].forEach(function (k) { ta[k].value = data[k]; paint(k); });

  var timer;
  ["html", "css", "js"].forEach(function (k) {
    ta[k].addEventListener("input", function () {
      paint(k); sync(k); save();
      clearTimeout(timer); timer = setTimeout(render, 500);
    });
    ta[k].addEventListener("scroll", function () { sync(k); });
    ta[k].addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var s = this.selectionStart, en = this.selectionEnd;
        this.value = this.value.slice(0, s) + "  " + this.value.slice(en);
        this.selectionStart = this.selectionEnd = s + 2;
        paint(k);
      }
    });
  });

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      tabs.forEach(function (b) { b.classList.toggle("active", b === btn); });
      ["html", "css", "js"].forEach(function (k) { wraps[k].hidden = (k !== lang); });
      paint(lang); sync(lang); ta[lang].focus();
    });
  });
  runBtn && runBtn.addEventListener("click", render);
  resetBtn && resetBtn.addEventListener("click", function () {
    ["html", "css", "js"].forEach(function (k) { ta[k].value = DEFAULT[k]; paint(k); });
    save(); render();
  });
  var clearBtn = document.getElementById("ed-clear");
  clearBtn && clearBtn.addEventListener("click", clearConsole);
  render();
})();
