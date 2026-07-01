/* ===========================================================
   JavaScript.info — O'zbekcha variant
   Umumiy skript: interaktiv "playground" va mobil menyu
   =========================================================== */

(function () {
  "use strict";

  /* --------- Mobil yon menyu ochish/yopish --------- */
  const toggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
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
