"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Hujjat va resurs yuklanishi",
  lessons: [
    {
      slug: "page-lifecycle",
      title: "Sahifa: DOMContentLoaded, load, beforeunload, unload",
      blurb: "HTML sahifaning hayot sikli: DOMContentLoaded, load, beforeunload va unload hodisalari qachon yuz beradi, readyState, sahifadan chiqishdan oldin ogohlantirish va sendBeacon.",
      body: [
        { lead: "HTML sahifaning hayot sikli (lifecycle) uchta muhim hodisaga ega: <code>DOMContentLoaded</code> — brauzer HTML'ni to'liq yuklab, DOM daraxtini qurganida; <code>load</code> — nafaqat HTML, balki barcha tashqi resurslar (rasm, stil, skript) yuklanganida; <code>beforeunload</code> va <code>unload</code> — foydalanuvchi sahifani tark etayotganida. Har bir hodisa foydali bo'lishi mumkin: <code>DOMContentLoaded</code> — DOM tayyor bo'lgach initsializatsiya qilish uchun, <code>load</code> — barcha resurslar yuklanganini tekshirish uchun, <code>beforeunload/unload</code> — foydalanuvchi ketayotganda o'zgarishlarni saqlash uchun. Bu darsda ularni chuqur o'rganamiz." },

        { warn: "Bu bo'limdagi barcha misollar brauzer muhitiga (DOM, <code>document</code>, <code>window</code>) tegishli. Kurs sahifasidagi interaktiv maydoncha Node.js muhitida ishlaydi va DOM'ga ega emas — shu sabab bu darsdagi kod misollari <strong>statik</strong> bo'lib, faqat o'qib o'rganish uchun keltiriladi. Ularni ishga tushirib bo'lmaydi." },

        { h2: "DOMContentLoaded" },
        { p: "<code>DOMContentLoaded</code> hodisasi <code>document</code> obyektida yuz beradi. Uni kuzatish uchun albatta <code>addEventListener</code>dan foydalanish kerak:" },
        { code: "document.addEventListener('DOMContentLoaded', ready);\n// funksiya sifatida yozamiz, chaqirmaymiz: ready() emas, balki ready" },
        { p: "Masalan:" },
        { code: "&lt;script&gt;\n  function ready() {\n    alert('DOM tayyor');\n\n    // rasm hali yuklanmagan bo'lishi mumkin (agar keshda bo'lmasa),\n    // shu sabab o'lchami 0x0 bo'lishi mumkin\n    alert(`Rasm o'lchami: ${img.offsetWidth}x${img.offsetHeight}`);\n  }\n\n  document.addEventListener('DOMContentLoaded', ready);\n&lt;/script&gt;\n\n&lt;img id=\"img\" src=\"https://en.js.cx/clipart/train.gif?speed=1&amp;cache=0\"&gt;" },
        { p: "Bu misolda <code>DOMContentLoaded</code> ishlaganida hujjat butunlay yuklangan — brauzer barcha HTML elementlarni ko'rgan va ularga qo'l uzata oladi. Lekin rasm (<code>&lt;img&gt;</code>) hali yuklanib ulgurmagan bo'lishi mumkin, shuning uchun uning o'lchami ko'pincha <code>0x0</code> chiqadi." },
        { note: "<code>DOMContentLoaded</code> — bu <strong>DOM daraxti tayyor</strong> degani, resurslar tayyor emas. Rasm va boshqa tashqi fayllar hali yuklanayotgan bo'lishi mumkin. Agar sizga faqat DOM elementlari kerak bo'lsa (masalan, tugmaga hodisa biriktirish), bu hodisadan foydalanish eng to'g'ri yechim." },

        { h2: "DOMContentLoaded va skriptlar" },
        { p: "Brauzer HTML'ni qayta ishlaganda, agar <code>&lt;script&gt;</code> tegiga duch kelsa, DOM qurishni <strong>to'xtatib</strong>, uni bajarishi shart. Buning sababi bor: skript DOM'ni o'zgartirishi yoki hatto <code>document.write</code> orqali yangi HTML qo'shishi mumkin, shuning uchun brauzer skript tugaguncha kutadi." },
        { p: "Demak, <code>DOMContentLoaded</code> hodisasi <strong>skriptlar bajarilib bo'lgach</strong> sodir bo'ladi:" },
        { code: "&lt;script&gt;\n  document.addEventListener('DOMContentLoaded', () => {\n    alert('DOM tayyor!');\n  });\n&lt;/script&gt;\n\n&lt;script src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n\n&lt;script&gt;\n  alert('Kutubxona yuklandi, kod ishga tayyor');\n&lt;/script&gt;" },
        { p: "Bu misolda avval \"Kutubxona yuklandi\", so'ng \"DOM tayyor!\" ko'rsatiladi. Ya'ni <code>DOMContentLoaded</code> barcha skriptlar bajarilishini kutadi." },
        { warn: "Yuqoridagi qoidaning ikkita <strong>istisnosi</strong> bor. Bular <code>DOMContentLoaded</code>ni bloklamaydi: <code>async</code> atributiga ega skriptlar va <code>document.createElement('script')</code> orqali dinamik qo'shilgan skriptlar. Ular mustaqil yuklanadi va DOM qurilishini kutmaydi. Bularni keyingi darslarda batafsil ko'rib chiqamiz." },

        { h2: "DOMContentLoaded va stillar" },
        { p: "Tashqi stil jadvallari (<code>&lt;link rel=\"stylesheet\"&gt;</code>) DOM'ga ta'sir qilmaydi, shuning uchun <code>DOMContentLoaded</code> ularni kutmaydi." },
        { p: "Lekin bir nozik holat bor: agar stildan <strong>keyin</strong> skript kelsa, u skript stil yuklanguncha kutadi:" },
        { code: "&lt;link type=\"text/css\" rel=\"stylesheet\" href=\"style.css\"&gt;\n&lt;script&gt;\n  // skript style.css yuklanmaguncha bajarilmaydi\n  alert(getComputedStyle(document.body).marginTop);\n&lt;/script&gt;" },
        { p: "Sababi shundaki: skript elementlarning haqiqiy koordinatalari va boshqa stilga bog'liq xossalarini o'qishga muhtoj bo'lishi mumkin. Shu sababdan skript oldidagi stil to'liq yuklanishini kutadi. Bu esa o'z navbatida <code>DOMContentLoaded</code>ni ham kechiktiradi." },

        { h2: "Brauzerning avto-to'ldirishi (autofill)" },
        { p: "Firefox, Chrome va Opera <code>DOMContentLoaded</code> hodisasida formalarni avtomatik to'ldiradi (autofill). Masalan, agar sahifada login/parol formasi bo'lsa va foydalanuvchi qiymatlarini saqlagan bo'lsa, brauzer <code>DOMContentLoaded</code>da ularni qo'yib chiqadi." },
        { p: "Shuning uchun agar sahifada ko'p yuklanadigan skriptlar tufayli <code>DOMContentLoaded</code> kechiksa, avto-to'ldirish ham kechikadi. Buni foydalanuvchilar sahifa \"sekin\" ochilayotgandek his qilishi mumkin." },

        { h2: "load, unload va readyState" },
        { p: "Endi qolgan hodisalarni ko'rib chiqamiz." },

        { h3: "window.onload" },
        { p: "<code>load</code> hodisasi <code>window</code> obyektida yuz beradi va u <strong>barcha resurslar</strong> — rasm, stil, skriptlar — yuklanib bo'lgach ishga tushadi:" },
        { code: "&lt;script&gt;\n  window.onload = function() {\n    alert('Sahifa to'liq yuklandi');\n\n    // endi rasm haqiqiy o'lchamiga ega\n    alert(`Rasm o'lchami: ${img.offsetWidth}x${img.offsetHeight}`);\n  };\n&lt;/script&gt;\n\n&lt;img id=\"img\" src=\"https://en.js.cx/clipart/train.gif?speed=1&amp;cache=0\"&gt;" },
        { p: "Bu yerda <code>DOMContentLoaded</code>dan farqli o'laroq, rasm yuklangan va uning to'g'ri o'lchamlari ko'rsatiladi." },

        { h3: "window.onunload" },
        { p: "Foydalanuvchi sahifadan ketganda <code>window</code> obyektida <code>unload</code> hodisasi ishga tushadi. Bu yerda pop-up oynalar ochish kabi kechiktirishga imkon bermaydigan ishlar mumkin emas, lekin analitika ma'lumotlarini yuborish uchun ishlatiladi:" },
        { code: "window.addEventListener('unload', function() {\n  // ma'lumotni ketishdan oldin yuborish\n});" },
        { p: "Amaliyotda <code>unload</code>da tarmoq so'rovlarini yuborish qiyin, chunki sahifa yopilib qolishi mumkin. Buning uchun maxsus <code>navigator.sendBeacon</code> metodi mavjud (quyida ko'ramiz)." },

        { h3: "document.readyState" },
        { p: "<code>document.readyState</code> xossasi hujjatning joriy yuklanish holatini bildiradi. Uning uchta qiymati bor:" },
        { ul: [
          "<code>'loading'</code> — hujjat hali yuklanmoqda;",
          "<code>'interactive'</code> — hujjat to'liq o'qildi, DOM tayyor (bu <code>DOMContentLoaded</code> bilan bir vaqtga to'g'ri keladi);",
          "<code>'complete'</code> — hujjat va barcha resurslar to'liq yuklandi (bu <code>window.onload</code> bilan bir vaqtga to'g'ri keladi)."
        ] },
        { p: "Uni tekshirib, holatga qarab ish yuritishimiz mumkin. Ba'zan skript kechroq ishga tushadi va <code>DOMContentLoaded</code> allaqachon o'tib ketgan bo'ladi. Bunday holda hodisani kutish behuda bo'ladi, shuning uchun <code>readyState</code>ni tekshirish kerak:" },
        { code: "function work() { /* ... */ }\n\nif (document.readyState == 'loading') {\n  // hali yuklanmoqda — hodisani kutamiz\n  document.addEventListener('DOMContentLoaded', work);\n} else {\n  // DOM allaqachon tayyor!\n  work();\n}" },
        { p: "Holatning o'zgarishini kuzatish uchun <code>readystatechange</code> hodisasi ham bor, lekin bu bugungi kunda kam ishlatiladi — <code>DOMContentLoaded</code> va <code>load</code> yetarli:" },
        { code: "// joriy holat\nconsole.log(document.readyState);\n\n// har o'zgarishda\ndocument.addEventListener('readystatechange', () => {\n  console.log(document.readyState);\n});" },
        { note: "Hodisalarning odatiy ketma-ketligi: <code>readyState:loading</code> → <code>readyState:interactive</code> → <code>DOMContentLoaded</code> → (rasm/resurslar yuklanadi) → <code>readyState:complete</code> → <code>window.onload</code>. Ya'ni <code>interactive</code> <code>DOMContentLoaded</code>dan biroz oldin, <code>complete</code> esa <code>load</code>dan biroz oldin belgilanadi." },

        { h2: "beforeunload bilan ogohlantirish" },
        { p: "Agar foydalanuvchi sahifadan ketmoqchi bo'lsa yoki oynani yopmoqchi bo'lsa, <code>beforeunload</code> ishlovchisi qo'shimcha tasdiqni so'rashi mumkin. Bu ayniqsa foydalanuvchi to'ldirilmagan formani tashlab ketayotganda foydali — \"O'zgarishlar saqlanmagan, chindan ham ketmoqchimisiz?\" degan savol chiqarish uchun." },
        { p: "Agar biz <code>beforeunload</code> hodisasini bekor qilsak, brauzer foydalanuvchidan tasdiq so'raydi:" },
        { code: "window.addEventListener('beforeunload', function(event) {\n  event.preventDefault();\n\n  // eski brauzerlar uchun returnValue kerak bo'lishi mumkin\n  event.returnValue = '';\n});" },
        { warn: "Zamonaviy brauzerlarda <code>event.returnValue</code>ga qo'ygan matningizni ko'rsatib bo'lmaydi — brauzer o'zining standart xabarini chiqaradi (masalan, \"Ushbu sahifani tark etmoqchimisiz?\"). Bu foydalanuvchini yolg'on xabarlar bilan aldashning oldini olish uchun qilingan. Shu sabab matnni maxsuslashtirishga urinmang — u baribir ko'rinmaydi." },
        { p: "Muhim nozik jihat: bu ishlovchi faqat foydalanuvchi sahifa bilan <strong>o'zaro aloqada bo'lgan</strong> (bosgan, matn kiritgan) holatda ishlaydi. Agar foydalanuvchi sahifa bilan hech qanday muloqot qilmasa, ba'zi brauzerlar ogohlantirishni ko'rsatmaydi." },

        { h2: "navigator.sendBeacon" },
        { p: "Foydalanuvchi sahifadan ketayotganda ko'pincha serverga analitika yoki statistika ma'lumotlarini yuborishimiz kerak bo'ladi. Muammo shundaki, <code>unload</code>da oddiy <code>fetch</code> yoki <code>XMLHttpRequest</code> so'rovi ko'pincha bekor qilinadi, chunki sahifa yopilib qolyapti." },
        { p: "Bu vazifa uchun maxsus <code>navigator.sendBeacon(url, data)</code> metodi mavjud. U ma'lumotni fon rejimida yuboradi va sahifa yopilsa ham so'rovni yakunlaydi:" },
        { code: "let analyticsData = { /* ma'lumotlar obyekti */ };\n\nwindow.addEventListener('unload', function() {\n  navigator.sendBeacon('/analytics', JSON.stringify(analyticsData));\n});" },
        { ul: [
          "So'rov <strong>POST</strong> metodi bilan yuboriladi;",
          "Nafaqat satr, balki forma va boshqa formatlarni ham yuborish mumkin, lekin odatda satrli obyekt yuboriladi;",
          "Ma'lumot hajmi 64 KB dan oshmasligi kerak;",
          "So'rov tugaganini kutib bo'lmaydi — <code>sendBeacon</code> hech qanday javob (response) qaytarmaydi va <code>unload</code>da javobni kutib bo'lmaydi ham."
        ] },
        { tip: "<code>sendBeacon</code> yuborilgach, brauzer sahifa yopilgan taqdirda ham so'rovni yakunlashga harakat qiladi. Shu sababdan ketish paytida analitika yuborishning eng ishonchli usuli aynan shu. Zamonaviy alternativa: <code>fetch(url, { keepalive: true })</code> ham xuddi shunday vazifani bajaradi." },

        { h2: "Xulosa" },
        { p: "Sahifa hayot sikli hodisalari:" },
        { ul: [
          "<code>DOMContentLoaded</code> (<code>document</code>da) — DOM tayyor, lekin rasm/stillar hali yuklanmagan bo'lishi mumkin. Skriptlarni kutadi (<code>async</code> va dinamik skriptlardan tashqari). Element bilan ishlashni shu yerda boshlash mumkin;",
          "<code>load</code> (<code>window</code>da) — nafaqat DOM, balki barcha tashqi resurslar (rasm, stil) yuklandi. Endi o'lchamlar aniq;",
          "<code>beforeunload</code> (<code>window</code>da) — foydalanuvchi ketmoqchi. Bekor qilinsa, brauzer tasdiq so'raydi (matnni maxsuslashtirib bo'lmaydi);",
          "<code>unload</code> (<code>window</code>da) — foydalanuvchi deyarli ketdi. Faqat oddiy amallar, ketish ma'lumotini <code>navigator.sendBeacon</code> orqali yuborish mumkin."
        ] },
        { p: "<code>document.readyState</code> orqali istalgan paytda holatni tekshirish mumkin: <code>loading</code>, <code>interactive</code> yoki <code>complete</code>. Bu skript kech ishga tushganda <code>DOMContentLoaded</code> o'tib ketgan-ketmaganini bilishga yordam beradi." }
      ]
    },

    {
      slug: "script-async-defer",
      title: "Skriptlar: async, defer",
      blurb: "Skriptlarni yuklashda bloklovchi muammo, defer va async atributlari, ularning farqi, dinamik skriptlar va qaysi birini qachon ishlatish.",
      body: [
        { lead: "Zamonaviy saytlarda skriptlar ko'pincha HTML'dan \"og'irroq\" bo'ladi: ular hajmi katta, yuklanishi va ishga tushishi vaqt oladi. Brauzer HTML'ni o'qib turib <code>&lt;script&gt;</code> tegiga duch kelsa, u DOM qurishni to'xtatib skriptni yuklab bajarishi kerak. Bu esa sahifaning ko'rinishini kechiktiradi. Bu muammoni hal qilish uchun ikkita atribut bor: <code>defer</code> va <code>async</code>. Ushbu darsda ular qanday ishlashini va farqini chuqur o'rganamiz." },

        { warn: "Bu darsdagi HTML/DOM misollari brauzer muhitiga tegishli. Kurs sahifasidagi maydoncha Node.js muhitida ishlaydi, shu sabab bu misollar <strong>statik</strong> — faqat o'qish uchun, ishga tushirib bo'lmaydi." },

        { h2: "Bloklovchi skript muammosi" },
        { p: "Ikkita muhim muammo bor. Birinchidan, skriptlar undan <strong>keyingi</strong> DOM elementlarini ko'ra olmaydi. Shuning uchun ularga hodisa biriktira olmaydi:" },
        { code: "&lt;p&gt;...skriptdan oldingi kontent...&lt;/p&gt;\n\n&lt;script src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n\n&lt;!-- bu tugmani skript ko'rmaydi --&gt;\n&lt;p&gt;...skriptdan keyingi kontent...&lt;/p&gt;" },
        { p: "Ikkinchidan, agar sahifaning yuqorisida katta skript bo'lsa, u \"bloklovchi\" — brauzer skriptni yuklab bajarmaguncha, undan pastdagi sahifani ko'rsata olmaydi:" },
        { code: "&lt;p&gt;...skriptdan oldingi kontent...&lt;/p&gt;\n\n&lt;script src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n\n&lt;!-- bu skript yuklanmaguncha ko'rinmaydi --&gt;\n&lt;p&gt;...skriptdan keyingi kontent...&lt;/p&gt;" },
        { p: "Bunga qisman yechim bor — skriptni sahifaning eng oxiriga, <code>&lt;/body&gt;</code> yopilishidan oldin qo'yish. Unda skript o'zidan yuqoridagi barcha elementlarni ko'radi va sahifa ko'rsatilishini bloklamaydi:" },
        { code: "&lt;body&gt;\n  ...barcha kontent skriptdan yuqorida...\n\n  &lt;script src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n&lt;/body&gt;" },
        { p: "Lekin bu yechim ideal emas: brauzer skriptni faqat butun HTML hujjatni yuklab bo'lgach ko'radi va yuklashni boshlaydi. Katta HTML'larda bu sezilarli kechikish beradi. Bu muammoni <code>defer</code> va <code>async</code> atributlari hal qiladi." },

        { h2: "defer" },
        { p: "<code>defer</code> atributi brauzerga skriptni \"fon rejimida\" yuklashni buyuradi: brauzer skriptni yuklab olishda kutmaydi, HTML'ni qurishda davom etadi. Skript esa DOM to'liq tayyor bo'lgach bajariladi:" },
        { code: "&lt;p&gt;...skriptdan oldingi kontent...&lt;/p&gt;\n\n&lt;script defer src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n\n&lt;!-- darhol ko'rinadi, skriptni kutmaydi --&gt;\n&lt;p&gt;...skriptdan keyingi kontent...&lt;/p&gt;" },
        { p: "Boshqacha aytganda:" },
        { ul: [
          "<code>defer</code>li skriptlar sahifani <strong>hech qachon bloklamaydi</strong>;",
          "<code>defer</code>li skriptlar har doim to'liq DOM tayyor bo'lgach, lekin <code>DOMContentLoaded</code> hodisasidan <strong>oldin</strong> bajariladi."
        ] },
        { p: "Quyidagi misol buni ko'rsatadi. Kontent darhol ko'rinadi, <code>DOMContentLoaded</code> esa skriptni kutadi:" },
        { code: "&lt;p&gt;...skriptdan oldingi kontent...&lt;/p&gt;\n\n&lt;script&gt;\n  document.addEventListener('DOMContentLoaded', () =&gt; alert('DOM tayyor (skriptdan keyin)'));\n&lt;/script&gt;\n\n&lt;script defer src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;" },
        { p: "Bu yerda <code>DOMContentLoaded</code> <code>defer</code>li skript yuklanib bajarilishini kutadi." },

        { h3: "defer skriptlar tartibni saqlaydi" },
        { p: "Bir necha <code>defer</code>li skript bo'lsa, ular <strong>hujjatdagi tartibda</strong> bajariladi — xuddi oddiy skriptlar kabi:" },
        { code: "&lt;script defer src=\"long.js\"&gt;&lt;/script&gt;\n&lt;script defer src=\"small.js\"&gt;&lt;/script&gt;" },
        { p: "Bu yerda <code>long.js</code> hajmi katta bo'lsa-da, u avval yuklab bo'lingandek kutiladi va <code>small.js</code>dan oldin bajariladi. Brauzer skriptlarni parallel yuklaydi (tezlik uchun), lekin ularni belgilangan tartibda ishga tushiradi." },
        { tip: "<code>defer</code> — kodning to'g'ri tartibda bajarilishi muhim bo'lganda ajoyib. Masalan, ikkinchi skript birinchisiga bog'liq bo'lsa (kutubxona + uni ishlatuvchi kod), <code>defer</code> tartibni kafolatlaydi." },
        { note: "<code>defer</code> atributi faqat tashqi skriptlar uchun, ya'ni <code>src</code> ga ega skriptlar uchun ishlaydi. Agar <code>&lt;script&gt;</code>da <code>src</code> bo'lmasa (kodni to'g'ridan-to'g'ri yozgan bo'lsangiz), <code>defer</code> e'tiborga olinmaydi." },

        { h2: "async" },
        { p: "<code>async</code> atributi ham skriptni fon rejimida yuklaydi, lekin butunlay boshqacha mustaqillik beradi. <code>async</code>li skript to'liq mustaqil:" },
        { ul: [
          "Sahifa <code>async</code>li skriptni kutmaydi: kontent ko'rsatiladi, <code>DOMContentLoaded</code> hodisasi ham skriptni kutmasligi mumkin;",
          "<code>async</code>li skriptlar boshqa skriptlarni kutmaydi va ularni ham kutib turmaydi — tartib yo'q. Qaysi biri avval yuklansa, o'sha avval bajariladi (\"load-first\" tartibi)."
        ] },
        { code: "&lt;p&gt;...skriptdan oldingi kontent...&lt;/p&gt;\n\n&lt;script&gt;\n  document.addEventListener('DOMContentLoaded', () =&gt; alert('DOM tayyor!'));\n&lt;/script&gt;\n\n&lt;script async src=\"https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js\"&gt;&lt;/script&gt;\n&lt;script async src=\"https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js\"&gt;&lt;/script&gt;" },
        { p: "Bu yerdagi tartib \"belgilanmagan\":" },
        { ul: [
          "Sahifa kontenti darhol ko'rsatiladi: <code>async</code> bloklamaydi;",
          "<code>DOMContentLoaded</code> va <code>async</code> bir-birini kutmaydi — <code>DOMContentLoaded</code> <code>async</code>dan oldin ham, keyin ham bo'lishi mumkin (yuklanish tezligiga qarab);",
          "<code>async</code> skriptlar bir-birini kutmaydi: qaysi biri oldin yuklansa (kichikroq yoki keshdan olingan), o'sha oldin bajariladi."
        ] },
        { tip: "<code>async</code> boshqa skriptlarga bog'liq bo'lmagan mustaqil skriptlar uchun ideal: hisoblagichlar (counters), reklama, analitika kabi uchinchi tomon skriptlari. Ular sahifangizning boshqa kodiga bog'liq emas va sizning kodingiz ham ularga bog'liq emas." },

        { h2: "async va defer farqi" },
        { p: "Ikkalasi ham skriptni bloklamasdan fon rejimida yuklaydi. Asosiy farq — <strong>tartib</strong> va <strong>qachon bajarilishi</strong>:" },
        { ul: [
          "<strong>Tartib (order):</strong> <code>defer</code> — hujjatdagi tartibda bajariladi; <code>async</code> — qaysi biri oldin yuklansa, o'sha oldin (load-first, tartib yo'q).",
          "<strong>DOMContentLoaded:</strong> <code>defer</code> — DOM qurilib bo'lgach, lekin <code>DOMContentLoaded</code>dan <strong>oldin</strong> bajariladi (uni kutadi); <code>async</code> — istalgan vaqtda, <code>DOMContentLoaded</code> bilan bog'liq emas.",
          "<strong>Foydalanish:</strong> <code>defer</code> — tartib va DOM muhim bo'lganda (bog'liq skriptlar, DOM bilan ishlash); <code>async</code> — mustaqil, boshqa hech narsaga bog'liq bo'lmagan skriptlar uchun."
        ] },
        { p: "Uni jadval ko'rinishida umumlashtiramiz:" },
        { code: "                Tartib               DOMContentLoaded\n-----------------------------------------------------------\ndefer   |  hujjatdagi tartibda     |  KUTADI (undan oldin)\nasync   |  load-first tartibida    |  BOG'LIQ EMAS (kutmaydi)" },
        { warn: "Amaliyotda <code>defer</code> odatda DOM'ga muhtoj yoki bir-biriga bog'liq skriptlar uchun, <code>async</code> esa mustaqil skriptlar (analitika, reklama) uchun ishlatiladi. Ko'p hollarda dasturchilar bosh sahifa kodini <code>defer</code> bilan, uchinchi tomon vidjetlarini <code>async</code> bilan yuklaydi." },
        { note: "Agar skriptda ham <code>async</code>, ham <code>defer</code> yozilsa, zamonaviy brauzerlarda <code>async</code> ustunlik qiladi. Eski, <code>async</code>ni qo'llab-quvvatlamaydigan brauzerlarda esa <code>defer</code> zaxira sifatida ishlaydi." },

        { h2: "Dinamik skriptlar" },
        { p: "Skriptni HTML'da yozish shart emas — uni JavaScript orqali dinamik ravishda ham qo'shishimiz mumkin. Buning uchun element yaratib, uni hujjatga qo'shamiz:" },
        { code: "let script = document.createElement('script');\nscript.src = '/article/dynamic-scripts/long.js';\n\ndocument.body.append(script); // shu paytda yuklanish va bajarilish boshlanadi" },
        { p: "Muhim nozik jihat: <strong>dinamik qo'shilgan skriptlar sukut bo'yicha <code>async</code> kabi harakat qiladi.</strong> Ya'ni:" },
        { ul: [
          "Ular hech narsani kutmaydi va ularni ham hech kim kutmaydi;",
          "Avval yuklangan skript avval bajariladi (load-first tartibi)."
        ] },
        { p: "Buni o'zgartirib, aniq tartibni tiklash mumkin — <code>script.async = false</code> qo'yish orqali. Unda skriptlar oddiy <code>defer</code> kabi hujjatdagi tartibda bajariladi:" },
        { code: "function loadScript(src) {\n  let script = document.createElement('script');\n  script.src = src;\n  script.async = false; // tartibni saqlash uchun\n  document.body.append(script);\n}\n\n// long.js avval bajariladi, chunki oldin qo'shildi (async=false tufayli)\nloadScript('/article/dynamic-scripts/long.js');\nloadScript('/article/dynamic-scripts/small.js');" },
        { p: "Agar <code>script.async = false</code> qo'ymasak, tartib \"load-first\" bo'lardi — kichikroq <code>small.js</code> ehtimol oldin yuklanib, oldin bajarilardi." },
        { tip: "<code>script.async = false</code> — bir necha dinamik skriptni to'g'ri tartibda yuklashning oddiy usuli. Bu ayniqsa modulli kutubxonalarni tartib bilan yuklashda foydali." },

        { h2: "Xulosa" },
        { p: "<code>async</code> va <code>defer</code> ikkalasi ham skript yuklanishini bloklamasdan amalga oshiradi va foydalanuvchi sahifani deyarli darhol ko'radi. Farqlar:" },
        { ul: [
          "<code>defer</code>: tartibni saqlaydi (hujjatdagi kabi), <code>DOMContentLoaded</code>dan oldin bajariladi, DOM tayyor bo'lishini kutadi. To'g'ri tartib va DOM muhim bo'lganda ishlating;",
          "<code>async</code>: mustaqil, load-first tartibi (belgilanmagan), <code>DOMContentLoaded</code> bilan bog'liq emas. Reklama, analitika kabi mustaqil skriptlar uchun;",
          "Dinamik skriptlar sukut bo'yicha <code>async</code> — tartibni tiklash uchun <code>script.async = false</code> qo'ying."
        ] },
        { warn: "Muhim tavsiya: <code>defer</code> yoki <code>async</code> ishlatganda skript yuklanmasdan turib sahifa ko'rsatilishini yodda tuting. Foydalanuvchi skript hali ishga tushmagan sahifani ko'radi — ba'zi tugmalar hali \"jonlanmagan\" bo'lishi mumkin. Shu sabab yuklanish holatini ko'rsatuvchi indikator qo'shish yoki funksionallikni asta-sekin yoqish yaxshi amaliyot hisoblanadi." }
      ]
    },

    {
      slug: "resurs-yuklash",
      title: "Resurs yuklash: onload va onerror",
      blurb: "Tashqi resurslarni (skript, rasm, iframe) yuklash holatini kuzatish: onload va onerror hodisalari, crossorigin atributi va resursning tayyor bo'lishini aniqlash.",
      body: [
        { lead: "Brauzer bizga tashqi resurslar — skriptlar, rasm, iframe va boshqalar — yuklanishini kuzatish imkonini beradi. Buning uchun ikkita asosiy hodisa bor: <code>load</code> — resurs muvaffaqiyatli yuklandi va <code>error</code> — yuklashda xatolik yuz berdi. Bu, masalan, skriptni dinamik yuklab, u tayyor bo'lgach undagi funksiyalarni chaqirish uchun, yoki rasm yuklanmaganda zaxira rasmni ko'rsatish uchun kerak bo'ladi. Ushbu darsda resurs yuklanishini kuzatishni chuqur o'rganamiz." },

        { warn: "Bu darsdagi misollar brauzer muhitiga (DOM elementlari, <code>document</code>) tegishli. Kurs maydonchasi Node.js muhitida ishlaydi va DOM'ga ega emas — shu sabab misollar <strong>statik</strong>, faqat o'qish uchun keltiriladi." },

        { h2: "load va error hodisalari" },
        { p: "Ko'pchilik resurslar, ya'ni tashqi <code>src</code>ga ega elementlar (rasm, tashqi skript va h.k.) ikkita hodisani generatsiya qiladi:" },
        { ul: [
          "<code>load</code> — resurs muvaffaqiyatli yuklanganda;",
          "<code>error</code> — resursni yuklashda xatolik yuz berganda."
        ] },
        { p: "Istisno: <code>&lt;iframe&gt;</code> — u tarixiy sabablarga ko'ra yuklash tugagach har doim <code>load</code>ni generatsiya qiladi, hatto sahifa topilmasa ham." },

        { h2: "Skriptni yuklashni kuzatish (script.onload)" },
        { p: "Aytaylik, biz tashqi skriptdagi funksiyani chaqirmoqchimiz. Skriptni dinamik yuklaymiz:" },
        { code: "let script = document.createElement('script');\nscript.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';\ndocument.head.append(script);" },
        { p: "Lekin skript yuklanguncha undagi funksiyalarni chaqira olmaymiz. Skript qachon tayyor bo'lishini bilish uchun <code>load</code> hodisasidan foydalanamiz:" },
        { code: "let script = document.createElement('script');\nscript.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';\ndocument.head.append(script);\n\nscript.onload = function() {\n  // skript yuklandi, endi undagi o'zgaruvchi va funksiyalar mavjud\n  alert(_.VERSION); // lodash kutubxonasi versiyasi\n};" },
        { p: "<code>onload</code> ishlovchisi skript yuklanib, bajarilib bo'lgach ishga tushadi. Shu paytda skript e'lon qilgan barcha o'zgaruvchi va funksiyalardan foydalanish mumkin." },

        { h2: "script.onerror" },
        { p: "Skriptni yuklashda xatoliklarni ham kuzatishimiz kerak. <code>error</code> hodisasi yuklash muvaffaqiyatsiz bo'lganda ishga tushadi:" },
        { code: "let script = document.createElement('script');\nscript.src = 'https://example.com/mavjud-emas.js'; // bunday skript yo'q\ndocument.head.append(script);\n\nscript.onerror = function() {\n  alert('Xatolik: ' + this.src + ' yuklanmadi');\n};" },
        { p: "Bu yerda mavjud bo'lmagan skript yuklanishga urinilgani uchun <code>onerror</code> ishga tushadi." },
        { warn: "Muhim: <code>onload/onerror</code> faqat yuklash jarayonining o'zini kuzatadi — resurs olindimi yoki yo'qmi. Agar skript <strong>yuklandi</strong>, lekin uning ichida xatolik bo'lsa (masalan, kod ichida <code>throw</code> yoki sintaksis xatosi), buni <code>onerror</code> ushlamaydi. Yuklash muvaffaqiyatli bo'lgani uchun <code>onload</code> baribir ishga tushadi. Kod ichidagi xatoliklarni kuzatish uchun <code>window.onerror</code> global ishlovchisidan foydalaniladi." },

        { h2: "Boshqa resurslar (rasm, iframe)" },
        { p: "<code>load</code> va <code>error</code> hodisalari boshqa resurslar uchun ham ishlaydi, ba'zi nozikliklar bilan." },
        { p: "Rasmlar (<code>&lt;img&gt;</code>), tashqi stillar, skriptlar va boshqa resurslarda <code>onload</code> va <code>onerror</code> hodisalari mavjud:" },
        { code: "let img = document.createElement('img');\nimg.src = 'https://js.cx/clipart/train.gif'; // yuklashni boshlaydi\n\nimg.onload = function() {\n  alert(`Rasm yuklandi, o'lchami: ${img.width}x${img.height}`);\n};\n\nimg.onerror = function() {\n  alert('Rasm yuklashda xatolik');\n};" },
        { p: "Rasm uchun ba'zi nozikliklar bor: aksariyat brauzerlarda rasmni yuklash <code>src</code> tayinlangan zahoti boshlanadi (elementni <code>document</code>ga qo'shish shart emas). Shu sabab <code>onload</code>ni <code>src</code>dan <strong>oldin</strong> tayinlash yaxshi amaliyot — aks holda keshdagi rasm darhol yuklanib, hodisani \"o'tkazib yuborish\" ehtimoli bor:" },
        { code: "let img = document.createElement('img');\n\n// avval hodisa ishlovchilarini tayinlaymiz\nimg.onload = () =&gt; alert('Yuklandi');\nimg.onerror = () =&gt; alert('Xatolik');\n\n// keyin src — shu paytda yuklash boshlanadi\nimg.src = 'https://js.cx/clipart/train.gif';" },
        { note: "<code>&lt;iframe&gt;</code> uchun <code>load</code> hodisasi iframe ichidagi sahifa yuklanib bo'lgach ishlaydi — muvaffaqiyatli ham, muvaffaqiyatsiz ham (masalan, 404). Bu tarixiy xususiyat, shuning uchun iframe'da <code>error</code> hodisasiga ishonib bo'lmaydi." },

        { h2: "Crossorigin siyosati (crossorigin atributi)" },
        { p: "Bir muhim qoida bor: bir saytdagi (origin) skript boshqa saytning ichki ma'lumotlariga kira olmaydi. Aniqrog'i, bitta <strong>origin</strong> (domen/port/protokol) boshqasidagi resurs tarkibiga to'liq kira olmaydi. Bu \"Same-Origin Policy\" (bir manba siyosati) deb ataladi va xavfsizlik uchun mavjud." },
        { p: "Agar boshqa domendan (masalan, CDN'dan) yuklangan skriptda xatolik yuz bersa, <code>window.onerror</code> global ishlovchisi bu haqda batafsil ma'lumot ololmaydi — u faqat qisqa \"Script error\" xabarini oladi, satr raqami yoki xato tafsilotlarisiz. Bu xavfsizlik cheklovi." },
        { p: "Buning sababi — skript boshqa domendan bo'lsa, uning ichki xatolik ma'lumotini ko'rsatish maxfiy ma'lumotning sizib chiqishiga olib kelishi mumkin. Masalan, boshqa domendagi skript ichida foydalanuvchiga xos ma'lumot bo'lsa, xato xabari orqali uni o'g'irlash mumkin bo'lardi." },
        { p: "To'liq xatolik ma'lumotini olish uchun ikki narsa kerak:" },
        { ol: [
          "Tashqi skriptda <code>crossorigin</code> atributi bo'lishi;",
          "Uzoq server esa <code>Access-Control-Allow-Origin</code> HTTP sarlavhasini yuborishi."
        ] },
        { p: "<code>crossorigin</code> atributining uch varianti bor:" },
        { ul: [
          "<code>crossorigin</code> yo'q — kirish taqiqlangan (to'liq xato ma'lumoti berilmaydi);",
          "<code>crossorigin=\"anonymous\"</code> — server <code>Access-Control-Allow-Origin</code> yuborsa, kirishga ruxsat. Cookie va autentifikatsiya ma'lumotlari yuborilmaydi;",
          "<code>crossorigin=\"use-credentials\"</code> — server maxsus sarlavhalar yuborsa, kirishga ruxsat. Cookie va autentifikatsiya ma'lumotlari ham yuboriladi."
        ] },
        { code: "&lt;script crossorigin=\"anonymous\" src=\"https://another-site.com/script.js\"&gt;&lt;/script&gt;" },
        { tip: "Aksariyat hollarda uchinchi tomon skriptlari uchun <code>crossorigin=\"anonymous\"</code> yetarli. Bu esa <code>window.onerror</code>da to'liq xato tafsilotlarini olish imkonini beradi — bu, ayniqsa, ishlab chiqarishda (production) xatolarni kuzatuvchi tizimlar (Sentry va h.k.) uchun muhim." },

        { h2: "Resurs holatini kuzatish (amaliy misol)" },
        { p: "Yuqoridagi bilimlarni birlashtirib, resursni yuklab, uni kuzatuvchi umumiy funksiya yozamiz. Bu funksiya skriptni yuklaydi va <code>callback</code> orqali natijani (xato yoki muvaffaqiyat) qaytaradi:" },
        { code: "function loadScript(src, callback) {\n  let script = document.createElement('script');\n  script.src = src;\n  document.head.append(script);\n\n  script.onload = () =&gt; callback(null, script);\n  script.onerror = () =&gt; callback(new Error('Skript yuklashda xatolik: ' + src));\n}\n\n// ishlatish:\nloadScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js', function(error, script) {\n  if (error) {\n    // xatolikni qayta ishlash\n    alert(error.message);\n  } else {\n    // skript muvaffaqiyatli yuklandi\n    alert('Yuklandi: ' + script.src);\n  }\n});" },
        { p: "Bu Node.js uslubidagi (error-first) callback pattern — birinchi argument xato, ikkinchisi natija. Uni Promise'ga o'rab, <code>async/await</code> bilan ishlatish ham mumkin:" },
        { code: "function loadScriptPromise(src) {\n  return new Promise((resolve, reject) =&gt; {\n    let script = document.createElement('script');\n    script.src = src;\n    document.head.append(script);\n\n    script.onload = () =&gt; resolve(script);\n    script.onerror = () =&gt; reject(new Error('Xatolik: ' + src));\n  });\n}\n\n// ishlatish:\nloadScriptPromise('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js')\n  .then(script =&gt; alert('Yuklandi'))\n  .catch(error =&gt; alert(error.message));" },
        { tip: "Bir necha resursni ketma-ket yoki parallel yuklashda Promise varianti juda qulay: <code>Promise.all</code> bilan hammasini parallel yuklab, hammasi tayyor bo'lishini kutish mumkin." },

        { h2: "Xulosa" },
        { p: "Tashqi resurslarni yuklashni kuzatish:" },
        { ul: [
          "Rasmlar (<code>img</code>), tashqi stillar, skriptlar va boshqa resurslar <code>load</code> va <code>error</code> hodisalarini generatsiya qiladi;",
          "<code>load</code> — resurs muvaffaqiyatli yuklanganda; <code>error</code> — yuklashda xatolik bo'lganda;",
          "Istisno — <code>&lt;iframe&gt;</code>: u har doim <code>load</code>ni generatsiya qiladi (muvaffaqiyat/xatolikdan qat'i nazar);",
          "<code>load/onerror</code> faqat yuklashni kuzatadi — skript <strong>ichidagi</strong> ishlash xatolarini ko'rmaydi (buning uchun <code>window.onerror</code>)."
        ] },
        { p: "Crossorigin (bir manba) siyosati: boshqa domendan yuklangan skript xatoliklarining to'liq ma'lumotini olish uchun <code>crossorigin</code> atributi va server tomonida <code>Access-Control-Allow-Origin</code> sarlavhasi kerak. <code>crossorigin=\"anonymous\"</code> odatda yetarli." },
        { note: "Amaliyotda resurs yuklashni kuzatish ko'p ishlatiladi: dinamik skript va stillarni yuklash, rasm yuklanmaganda zaxira ko'rsatish, ko'p resurslarni <code>Promise.all</code> bilan boshqarish. Bu texnikalar zamonaviy SPA (Single Page Application) ilovalarida asos hisoblanadi." }
      ]
    }
  ]
};
