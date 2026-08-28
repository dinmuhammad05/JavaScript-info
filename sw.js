/* Kodla — Service Worker (offline). build.js tomonidan yaratilgan. */
const CACHE = "kodla-v11";
const CORE = ["./","index.html","editor.html","css/style.css?v=11","js/main.js?v=11","search-index.json","manifest.webmanifest","icon.svg"];
const PRECACHE = ["./","index.html","editor.html","css/style.css?v=11","js/main.js?v=11","search-index.json","manifest.webmanifest","icon.svg","lessons/js-haqida.html","lessons/qollanmalar.html","lessons/muharrirlar.html","lessons/konsol.html","lessons/salom-dunyo.html","lessons/kod-tuzilishi.html","lessons/use-strict.html","lessons/ozgaruvchilar.html","lessons/malumot-turlari.html","lessons/turlarni-ozgartirish.html","lessons/operatorlar.html","lessons/taqqoslashlar.html","lessons/if-else.html","lessons/mantiqiy-operatorlar.html","lessons/nullish.html","lessons/sikllar.html","lessons/switch.html","lessons/funksiyalar.html","lessons/funksiya-ifodalari.html","lessons/strelka-funksiyalar.html","lessons/debugging.html","lessons/kod-uslubi.html","lessons/izohlar.html","lessons/testlash.html","lessons/polyfill.html","lessons/obyektlar.html","lessons/obyekt-nusxalash.html","lessons/garbage-collection.html","lessons/obyekt-metodlari.html","lessons/new-operator.html","lessons/optional-chaining.html","lessons/symbol.html","lessons/obyekt-primitiv.html","lessons/primitiv-metodlar.html","lessons/sonlar.html","lessons/satrlar.html","lessons/massivlar.html","lessons/massiv-metodlari.html","lessons/iterable.html","lessons/map-set.html","lessons/weakmap-weakset.html","lessons/object-keys.html","lessons/destructuring.html","lessons/sana-vaqt.html","lessons/json-metodlari.html","lessons/rekursiya.html","lessons/rest-spread.html","lessons/closure.html","lessons/eski-var.html","lessons/global-obyekt.html","lessons/funksiya-obyekti.html","lessons/new-function.html","lessons/settimeout.html","lessons/call-apply.html","lessons/bind.html","lessons/strelka-qayta.html","lessons/property-flags.html","lessons/getter-setter.html","lessons/prototip-meros.html","lessons/f-prototype.html","lessons/native-prototype.html","lessons/prototip-metodlari.html","lessons/klass-asoslari.html","lessons/klass-meros.html","lessons/static-metodlar.html","lessons/private-protected.html","lessons/built-in-extend.html","lessons/instanceof.html","lessons/mixin.html","lessons/try-catch.html","lessons/custom-error.html","lessons/callback.html","lessons/promise.html","lessons/promise-chaining.html","lessons/promise-error.html","lessons/promise-api.html","lessons/promisification.html","lessons/microtask.html","lessons/async-await.html","lessons/generator.html","lessons/async-iteration.html","lessons/modul-kirish.html","lessons/export-import.html","lessons/dynamic-import.html","lessons/proxy-reflect.html","lessons/eval.html","lessons/currying.html","lessons/reference-type.html","lessons/bigint.html","lessons/unicode.html","lessons/weakref.html","lessons/brauzer-muhiti.html","lessons/dom-daraxti.html","lessons/dom-boylab.html","lessons/dom-qidirish.html","lessons/node-xossalari.html","lessons/atributlar.html","lessons/dom-ozgartirish.html","lessons/style-class.html","lessons/element-olcham.html","lessons/oyna-olcham.html","lessons/koordinatalar.html","lessons/hodisalar-kirish.html","lessons/bubbling-capturing.html","lessons/event-delegation.html","lessons/default-actions.html","lessons/custom-events.html","lessons/sichqoncha-hodisalari.html","lessons/mouseover-out.html","lessons/drag-drop.html","lessons/pointer-events.html","lessons/klaviatura.html","lessons/scroll.html","lessons/form-xossalari.html","lessons/focus-blur.html","lessons/form-hodisalari.html","lessons/form-submit.html","lessons/page-lifecycle.html","lessons/script-async-defer.html","lessons/resurs-yuklash.html","lessons/mutation-observer.html","lessons/selection-range.html","lessons/event-loop.html","lessons/popup.html","lessons/cross-window.html","lessons/clickjacking.html","lessons/arraybuffer.html","lessons/textdecoder.html","lessons/blob.html","lessons/file-filereader.html","lessons/fetch.html","lessons/fetch-json.html","lessons/formdata.html","lessons/fetch-progress.html","lessons/xhr.html","lessons/websocket.html","lessons/cookie.html","lessons/localstorage.html","lessons/indexeddb.html","lessons/regexp-kirish.html","lessons/regexp-belgilar.html","lessons/regexp-anchor.html","lessons/regexp-quantifiers.html","lessons/regexp-groups.html","lessons/regexp-alternation.html","lessons/regexp-lookahead.html","lessons/git-github-nima.html","lessons/git-ornatish.html","lessons/git-asoslar.html","lessons/git-branch-merge.html","lessons/github-remote.html","lessons/github-jamoa.html","lessons/git-foydali.html","lessons/docker-nima.html","lessons/docker-ornatish.html","lessons/docker-buyruqlar.html","lessons/dockerfile.html","lessons/docker-compose.html","lessons/docker-volume-network.html","lessons/nginx-nima.html","lessons/nginx-ornatish.html","lessons/nginx-config.html","lessons/nginx-static.html","lessons/nginx-reverse-proxy.html","lessons/nginx-ssl.html","lessons/linux-nima.html","lessons/fayl-tizimi.html","lessons/fayl-buyruqlar.html","lessons/huquqlar.html","lessons/jarayon-tarmoq.html","lessons/bash-skript.html","lessons/nodejs-nima.html","lessons/node-modullar.html","lessons/node-fs-http.html","lessons/express-kirish.html","lessons/express-rest.html","lessons/express-middleware.html","lessons/db-nima.html","lessons/sql-asoslar.html","lessons/sql-join.html","lessons/mongodb.html","lessons/node-db.html","lessons/web-xavfsizlik.html","lessons/auth-asoslar.html","lessons/jwt.html","lessons/xss-csrf.html","lessons/sql-injection.html","lessons/nestjs-nima.html","lessons/nestjs-struktura.html","lessons/nestjs-routing.html","lessons/nestjs-di.html","lessons/nestjs-database.html","lessons/nestjs-guard.html","lessons/html-nima.html","lessons/html-teglar.html","lessons/html-form.html","lessons/html-semantik.html","lessons/css-nima.html","lessons/css-box.html","lessons/css-flexbox.html","lessons/css-grid.html","lessons/css-responsive.html","lessons/css-styling.html","lessons/ts-nima.html","lessons/ts-turlar.html","lessons/ts-interface.html","lessons/ts-funksiya.html","lessons/ts-class.html","lessons/react-nima.html","lessons/react-jsx.html","lessons/react-props.html","lessons/react-state.html","lessons/react-effect.html","lessons/react-list-form.html","lessons/testlash-nima.html","lessons/jest-boshlash.html","lessons/jest-async-mock.html","lessons/jest-amaliyot.html","lessons/cicd-nima.html","lessons/actions-asoslar.html","lessons/actions-test.html","lessons/actions-deploy.html","lessons/deploy-nima.html","lessons/deploy-vps.html","lessons/deploy-frontend.html","lessons/deploy-domain-ssl.html","lessons/algoritm-nima.html","lessons/big-o.html","lessons/big-o-amaliy.html","lessons/rekursiya-algoritm.html","lessons/two-pointers.html","lessons/sliding-window.html","lessons/prefix-sum.html","lessons/string-algoritmlari.html","lessons/stack.html","lessons/queue.html","lessons/linked-list.html","lessons/hash-map.html","lessons/binary-search.html","lessons/sorting-oddiy.html","lessons/sorting-tez.html","lessons/tree-asoslari.html","lessons/bst.html","lessons/tree-traversal.html","lessons/graph-asoslari.html","lessons/graph-traversal.html","lessons/backtracking.html","lessons/dynamic-programming.html","lessons/greedy.html","lessons/intervyu-strategiya.html","lessons/kiberxavfsizlik-nima.html","lessons/tahdidlar-turlari.html","lessons/hujum-himoya-jamoalari.html","lessons/etika-qonun-kasb.html","lessons/shifrlash-asoslari.html","lessons/hashing-parol.html","lessons/tls-https-qanday.html","lessons/raqamli-imzo.html","lessons/ikki-faktor-mfa.html","lessons/owasp-top10-kirish.html","lessons/broken-access-control.html","lessons/injection-himoya.html","lessons/xss-chuqur.html","lessons/csrf-ssrf.html","lessons/xavfsizlik-nosozliklari.html","lessons/xavfsizlik-sarlavhalari.html","lessons/firewall-vpn-portlar.html","lessons/server-hardening.html","lessons/secrets-boshqaruv.html","lessons/log-monitoring.html","lessons/xavfsiz-kod-yozish.html","lessons/dependency-xavfsizlik.html","lessons/sast-dast-testlash.html","lessons/ctf-mashq-kasb.html","lessons/incident-response.html","lessons/lab-muhit.html","lessons/nmap.html","lessons/wireshark.html","lessons/burp-suite.html","lessons/metasploit.html"];

self.addEventListener("install", function (e) {
  e.waitUntil((async function () {
    const c = await caches.open(CACHE);
    try { await c.addAll(CORE); } catch (err) {}
    // Darslarni bardoshli tarzda (biri xato bo'lsa ham davom etadi) keshlaymiz
    await Promise.allSettled(PRECACHE.map(function (u) { return c.add(u); }));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    const keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async function () {
    const cached = await caches.match(req);
    if (cached) {
      // Keshdan beramiz, fonda yangilaymiz (stale-while-revalidate)
      e.waitUntil((async function () {
        try { const res = await fetch(req); if (res && res.ok) { const c = await caches.open(CACHE); await c.put(req, res.clone()); } } catch (err) {}
      })());
      return cached;
    }
    try {
      const res = await fetch(req);
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      if (req.mode === "navigate") {
        const idx = (await caches.match("index.html")) || (await caches.match("./"));
        if (idx) return idx;
      }
      return new Response("Oflayn: bu sahifa hali keshda yo'q.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  })());
});
