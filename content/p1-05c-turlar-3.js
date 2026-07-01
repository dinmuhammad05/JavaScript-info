"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Ma'lumot turlari",
  lessons: [
    {
      slug: "object-keys",
      title: "Object.keys, values, entries",
      blurb: "Obyekt kalitlari, qiymatlari va juftliklarini massiv sifatida olish; ular ustida aylanish va qayta yig'ish.",
      body: [
        { lead: "Massivlarda <code>map</code>, <code>filter</code>, <code>reduce</code> kabi qulay metodlar bor edi. Oddiy obyektlar uchun ham xuddi shunga o'xshash universal metodlar mavjud: <code>Object.keys</code>, <code>Object.values</code> va <code>Object.entries</code>. Ushbu darsda ular bilan chuqur tanishamiz." },

        { h2: "Nima uchun kerak?" },
        { p: "Ba'zan obyektning barcha kalitlari yoki qiymatlari ustida aylanish (iteratsiya) kerak bo'ladi. Buni <code>for..in</code> orqali qilsak bo'ladi, ammo ko'pincha bizga <strong>massiv</strong> qulayroq — chunki massivda <code>map</code>, <code>filter</code>, <code>sort</code> kabi kuchli metodlar bor." },
        { p: "Aynan shu yerda uch metod yordamga keladi. Ular obyektni <strong>massivga</strong> aylantirib beradi:" },
        { ul: [
          "<code>Object.keys(obj)</code> — kalitlar massivini qaytaradi;",
          "<code>Object.values(obj)</code> — qiymatlar massivini qaytaradi;",
          "<code>Object.entries(obj)</code> — <code>[kalit, qiymat]</code> juftliklari massivini qaytaradi."
        ] },

        { h2: "Sintaksis va birinchi misol" },
        { p: "E'tibor bering: bu metodlar <code>obj.keys()</code> emas, balki <code>Object.keys(obj)</code> ko'rinishida chaqiriladi — ya'ni obyekt argument sifatida uzatiladi. Bu ataylab shunday qilingan, sababini keyinroq tushuntiramiz." },
        { pg: "let user = {\n  ism: \"Jasur\",\n  yosh: 30\n};\n\nconsole.log( Object.keys(user) );    // [ 'ism', 'yosh' ]\nconsole.log( Object.values(user) );  // [ 'Jasur', 30 ]\nconsole.log( Object.entries(user) ); // [ [ 'ism', 'Jasur' ], [ 'yosh', 30 ] ]", file: "object-keys.js" },
        { p: "Ko'rib turganingizdek, uchala metod ham natijani <strong>haqiqiy massiv</strong> sifatida qaytaradi. Demak, ular ustida massivning barcha metodlarini bemalol ishlatishimiz mumkin." },
        { note: "Bu metodlar faqat obyektning <strong>o'ziga tegishli</strong> (own) kalitlarini oladi — prototipdan meros qilib olingan xossalarni hisobga olmaydi. Bu odatda aynan bizga kerak bo'lgan xatti-harakat." },

        { h2: "for..of bilan aylanish" },
        { p: "Bu metodlar massiv qaytargani uchun, ular ustida <code>for..of</code> sikli bilan qulay aylanamiz. Obyektning o'zi ustida <code>for..of</code> ishlamaydi (chunki oddiy obyekt iterable emas), lekin metodlar qaytargan massiv ustida ishlaydi." },
        { pg: "let narxlar = {\n  non: 4000,\n  sut: 12000,\n  choy: 8000\n};\n\n// qiymatlar ustida aylanish\nfor (let narx of Object.values(narxlar)) {\n  console.log(narx);\n}\n// 4000, 12000, 8000\n\n// kalitlar ustida aylanish\nfor (let mahsulot of Object.keys(narxlar)) {\n  console.log(mahsulot);\n}\n// non, sut, choy", file: "for-of-values.js" },

        { p: "<code>Object.entries</code> bilan aylanganda, har bir element <code>[kalit, qiymat]</code> massivi bo'ladi. Uni to'g'ridan-to'g'ri destrukturizatsiya (keyingi darsda) bilan ochib olsa juda qulay:" },
        { pg: "let narxlar = {\n  non: 4000,\n  sut: 12000,\n  choy: 8000\n};\n\nfor (let [mahsulot, narx] of Object.entries(narxlar)) {\n  console.log(mahsulot + \": \" + narx + \" so'm\");\n}\n// non: 4000 so'm\n// sut: 12000 so'm\n// choy: 8000 so'm", file: "entries-loop.js" },

        { h2: "Amaliy misol: qiymatlar yig'indisi" },
        { p: "Aytaylik, barcha narxlar yig'indisini hisoblamoqchimiz. <code>Object.values</code> massiv qaytargani uchun, biz massivning <code>reduce</code> metodidan foydalanamiz:" },
        { pg: "let narxlar = {\n  non: 4000,\n  sut: 12000,\n  choy: 8000\n};\n\nlet jami = Object.values(narxlar).reduce((sum, narx) => sum + narx, 0);\n\nconsole.log(jami); // 24000", file: "values-sum.js" },
        { tip: "Xuddi shunday, obyektning qiymatlarini filtrlash, saralash yoki o'zgartirish kerak bo'lsa — avval <code>Object.values</code> (yoki <code>entries</code>) bilan massivga o'ting, so'ng massiv metodlaridan foydalaning." },

        { h2: "Obyektni o'zgartirish: entries + fromEntries" },
        { p: "Massivlarda <code>map</code>, <code>filter</code> bor, lekin obyektlarda yo'q. Shuning uchun obyektni o'zgartirishning eng qulay yo'li shunday:" },
        { ol: [
          "<code>Object.entries(obj)</code> orqali <code>[kalit, qiymat]</code> juftliklari massivini olamiz;",
          "Massivning <code>map</code> yoki <code>filter</code> metodini qo'llaymiz;",
          "Natijani <code>Object.fromEntries(massiv)</code> orqali yana obyektga aylantiramiz."
        ] },
        { p: "<code>Object.fromEntries</code> — bu <code>Object.entries</code>ning teskarisi: u <code>[kalit, qiymat]</code> juftliklari massivini olib, obyekt yasaydi." },
        { pg: "let narxlar = {\n  non: 4000,\n  sut: 12000,\n  choy: 8000\n};\n\n// har bir narxni ikki barobar oshiramiz\nlet ikkilangan = Object.fromEntries(\n  Object.entries(narxlar).map(([kalit, qiymat]) => [kalit, qiymat * 2])\n);\n\nconsole.log(ikkilangan.non);  // 8000\nconsole.log(ikkilangan.sut);  // 24000\nconsole.log(ikkilangan.choy); // 16000", file: "from-entries.js" },
        { p: "Filtrlash misoli — faqat 10000 so'mdan qimmat mahsulotlarni qoldiramiz:" },
        { pg: "let narxlar = {\n  non: 4000,\n  sut: 12000,\n  choy: 8000,\n  yogh: 25000\n};\n\nlet qimmatlar = Object.fromEntries(\n  Object.entries(narxlar).filter(([kalit, qiymat]) => qiymat > 10000)\n);\n\nconsole.log( Object.keys(qimmatlar) ); // [ 'sut', 'yogh' ]", file: "filter-entries.js" },

        { h2: "Map bilan farqi" },
        { p: "<code>Map</code>, <code>Set</code> kabi ma'lumot tuzilmalarida ham <code>keys()</code>, <code>values()</code>, <code>entries()</code> metodlari bor. Ammo ular orasida muhim farqlar mavjud:" },
        { ul: [
          "<strong>Chaqirish shakli:</strong> Map'da bu <code>map.keys()</code> (metod sifatida), oddiy obyektda esa <code>Object.keys(obj)</code> (statik funksiya sifatida);",
          "<strong>Qaytaradigan qiymat:</strong> Map'ning metodlari <em>iterable</em> obyekt qaytaradi (haqiqiy massiv emas), obyektning metodlari esa <strong>haqiqiy massiv</strong> qaytaradi;",
          "<strong>Kalit turlari:</strong> Map'da kalit istalgan tur bo'la oladi (obyekt, funksiya ham), oddiy obyektda esa kalitlar faqat satr yoki simvol."
        ] },
        { p: "Nima uchun <code>Object.keys(obj)</code> shaklida, ya'ni <code>obj.keys()</code> emas? Sabab — moslashuvchanlik. JavaScript'da obyektlar turli tuzilmalarning asosi bo'lib xizmat qiladi. Agar bizning obyektimizda o'zining <code>keys</code> nomli metodi bo'lsa, uni buzib qo'ymaslik uchun tashqi <code>Object.keys(obj)</code> shakli ishlatiladi." },
        { note: "Agar Map'ning metodlari qaytargan iterable ustida massiv metodlarini ishlatmoqchi bo'lsangiz, uni <code>Array.from(map.keys())</code> yoki <code>[...map.keys()]</code> orqali massivga aylantiring." },

        { h2: "Xulosa" },
        { ul: [
          "<code>Object.keys(obj)</code> — kalitlar massivini qaytaradi;",
          "<code>Object.values(obj)</code> — qiymatlar massivini qaytaradi;",
          "<code>Object.entries(obj)</code> — <code>[kalit, qiymat]</code> juftliklari massivini qaytaradi;",
          "Uchala metod ham <strong>haqiqiy massiv</strong> qaytaradi va faqat o'ziga tegishli xossalarni oladi;",
          "<code>Object.fromEntries(massiv)</code> — juftliklar massivini yana obyektga aylantiradi;",
          "Obyektni o'zgartirish uchun: <code>entries</code> → <code>map/filter</code> → <code>fromEntries</code>."
        ] }
      ]
    },
    {
      slug: "destructuring",
      title: "Destrukturizatsiya",
      blurb: "Massiv va obyektlarni alohida o'zgaruvchilarga qulay tarzda ajratib olish.",
      body: [
        { lead: "JavaScript'da ma'lumotlar ko'pincha massiv yoki obyektlarda saqlanadi. <strong>Destrukturizatsiya</strong> (destructuring assignment) — bu massiv yoki obyektni alohida o'zgaruvchilarga bir satrda \"ochib\" olishning qulay usuli." },

        { h2: "Massiv destrukturizatsiyasi" },
        { p: "Massivni o'zgaruvchilarga ajratib olishga misol:" },
        { pg: "let arr = [\"Jasur\", \"Karimov\"];\n\n// destrukturizatsiya\nlet [ism, familiya] = arr;\n\nconsole.log(ism);      // Jasur\nconsole.log(familiya); // Karimov", file: "arr-destr.js" },
        { p: "Endi <code>arr[0]</code> va <code>arr[1]</code> o'rniga ma'noli nomdagi o'zgaruvchilar bilan ishlaymiz. Bu shunchaki qisqartma — asl massiv o'zgarmaydi." },
        { note: "\"Destructuring\" so'zi \"buzish\" degani emas. U massivni nusxa qilib o'zgaruvchilarga ko'chiradi, asl massivga tegmaydi." },

        { p: "Keraksiz elementlarni vergul bilan tashlab ketish mumkin:" },
        { pg: "let [, , unvon] = [\"Janob\", \"Xonim\", \"Direktor\"];\n\nconsole.log(unvon); // Direktor", file: "skip-comma.js" },
        { p: "Chap tomonda istalgan <em>iterable</em> tursa bo'ladi — masalan, satrni ham ajratish mumkin:" },
        { pg: "let [a, b, c] = \"abc\";\n\nconsole.log(a); // a\nconsole.log(b); // b\nconsole.log(c); // c", file: "str-destr.js" },

        { h2: "Standart (default) qiymatlar" },
        { p: "Agar massivda o'zgaruvchilardan kamroq element bo'lsa, ortiqcha o'zgaruvchilar <code>undefined</code> bo'ladi. Buning oldini olish uchun standart qiymat berish mumkin:" },
        { pg: "let [ism = \"Mehmon\", familiya = \"Noma'lum\"] = [\"Jasur\"];\n\nconsole.log(ism);      // Jasur (massivdan olindi)\nconsole.log(familiya); // Noma'lum (standart qiymat)", file: "default-values.js" },
        { tip: "Standart qiymat sifatida murakkab ifoda yoki hatto funksiya chaqiruvi ham berish mumkin. Ular faqat tegishli qiymat massivda bo'lmagandagina bajariladi." },

        { h2: "Qiymatlarni almashtirish (swap)" },
        { p: "Destrukturizatsiya yordamida ikki o'zgaruvchining qiymatini vaqtinchalik o'zgaruvchisiz almashtirish mumkin — bu juda mashhur usul:" },
        { pg: "let mehmon = \"Ali\";\nlet admin = \"Vali\";\n\n// bir satrda almashtiramiz\n[mehmon, admin] = [admin, mehmon];\n\nconsole.log(mehmon); // Vali\nconsole.log(admin);  // Ali", file: "swap.js" },
        { p: "Bu yerda o'ng tomonda vaqtinchalik <code>[admin, mehmon]</code> massivi yasaladi va darhol chap tomondagi o'zgaruvchilarga ajratib beriladi." },

        { h2: "Qoldiq \"...rest\"" },
        { p: "Agar massiv o'zgaruvchilardan uzun bo'lsa, qolgan barcha elementlarni bitta massivga yig'ib olish uchun <code>...rest</code> ishlatiladi:" },
        { pg: "let [birinchi, ikkinchi, ...qolganlari] = [\"Bahor\", \"Yoz\", \"Kuz\", \"Qish\"];\n\nconsole.log(birinchi);        // Bahor\nconsole.log(ikkinchi);        // Yoz\nconsole.log(qolganlari);      // [ 'Kuz', 'Qish' ]\nconsole.log(qolganlari.length); // 2", file: "rest.js" },
        { warn: "<code>...rest</code> har doim eng oxirida turishi shart. <code>[...boshi, oxirgi]</code> ko'rinishida yozib bo'lmaydi — bu xatolik beradi." },

        { h2: "Obyekt destrukturizatsiyasi" },
        { p: "Obyektlarni ham destrukturizatsiya qilish mumkin. Bu holda kvadrat qavs <code>[]</code> o'rniga jingalak qavs <code>{}</code> ishlatiladi va o'zgaruvchi nomlari <strong>kalitlarga mos</strong> bo'lishi kerak:" },
        { pg: "let sozlamalar = {\n  kenglik: 100,\n  balandlik: 200,\n  sarlavha: \"Menyu\"\n};\n\nlet { sarlavha, kenglik, balandlik } = sozlamalar;\n\nconsole.log(sarlavha);  // Menyu\nconsole.log(kenglik);   // 100\nconsole.log(balandlik); // 200", file: "obj-destr.js" },
        { p: "E'tibor bering: massivdan farqli o'laroq, obyektda <strong>tartib muhim emas</strong>. O'zgaruvchi nomi kalitga mos kelsa bo'ldi." },

        { h2: "Yangi nom berish" },
        { p: "Agar o'zgaruvchiga kalitdan boshqa nom bermoqchi bo'lsak, <code>kalit: yangiNom</code> sintaksisidan foydalanamiz:" },
        { pg: "let sozlamalar = {\n  kenglik: 100,\n  balandlik: 200\n};\n\n// kenglik -> k, balandlik -> b\nlet { kenglik: k, balandlik: b } = sozlamalar;\n\nconsole.log(k); // 100\nconsole.log(b); // 200", file: "obj-rename.js" },
        { p: "Yangi nom va standart qiymatni birga ishlatish ham mumkin:" },
        { pg: "let sozlamalar = {\n  sarlavha: \"Menyu\"\n};\n\nlet {\n  sarlavha: s = \"Standart\",\n  kenglik: kn = 100,\n  balandlik: bl = 200\n} = sozlamalar;\n\nconsole.log(s);  // Menyu (obyektdan)\nconsole.log(kn); // 100 (standart)\nconsole.log(bl); // 200 (standart)", file: "obj-rename-default.js" },

        { h2: "Ichma-ich (nested) destrukturizatsiya" },
        { p: "Agar obyekt ichida boshqa obyekt yoki massiv bo'lsa, tuzilmani takrorlab, ichki qiymatlarni ham ajratib olish mumkin:" },
        { pg: "let sozlamalar = {\n  olcham: {\n    kenglik: 100,\n    balandlik: 200\n  },\n  ranglar: [\"qora\", \"oq\"],\n  ekstra: true\n};\n\nlet {\n  olcham: { kenglik, balandlik },\n  ranglar: [asosiy, ikkilamchi],\n  ekstra\n} = sozlamalar;\n\nconsole.log(kenglik);     // 100\nconsole.log(balandlik);   // 200\nconsole.log(asosiy);      // qora\nconsole.log(ikkilamchi);  // oq\nconsole.log(ekstra);      // true", file: "nested-destr.js" },
        { note: "<code>olcham</code> va <code>ranglar</code> nomlari bu yerda o'zgaruvchiga aylanmaydi — ular faqat ichkariga \"kirish\" uchun ishlatiladi. Faqat eng ichki qiymatlar o'zgaruvchi bo'ladi." },

        { h2: "Funksiya parametrlarida destrukturizatsiya" },
        { p: "Destrukturizatsiyaning eng foydali qo'llanilishlaridan biri — funksiya ko'p parametr olganda. Agar ularni bitta obyekt sifatida uzatsak, funksiya ichida ularni qulay ajratib olamiz:" },
        { pg: "function menyuYasa({\n  sarlavha = \"Sarlavhasiz\",\n  kenglik = 200,\n  balandlik = 100\n} = {}) {\n  console.log(sarlavha + \": \" + kenglik + \"x\" + balandlik);\n}\n\nmenyuYasa({ sarlavha: \"Fayl\", kenglik: 300 });\n// Fayl: 300x100\n\nmenyuYasa({});\n// Sarlavhasiz: 200x100\n\nmenyuYasa();\n// Sarlavhasiz: 200x100", file: "func-params.js" },
        { p: "Bu usul \"nomlangan argumentlar\" (named arguments) ta'sirini beradi — chaqirishda argumentlar tartibini eslab qolish shart emas, faqat kerakli kalitlarni ko'rsatamiz." },
        { tip: "Oxiridagi <code>= {}</code> juda muhim: u funksiya <strong>hech qanday argumentsiz</strong> chaqirilganda ham xatolik bermasligini ta'minlaydi. Aks holda <code>menyuYasa()</code> chaqiruvi <code>undefined</code>ni destrukturizatsiya qilishga urinib xatolik beradi." },

        { h2: "Xulosa" },
        { ul: [
          "Destrukturizatsiya — massiv/obyektni bir satrda o'zgaruvchilarga ochish usuli;",
          "Massivda tartib muhim (<code>[a, b]</code>), obyektda esa kalit nomi muhim (<code>{a, b}</code>);",
          "Standart qiymat: <code>[a = 5]</code> yoki <code>{a = 5}</code>;",
          "Almashtirish: <code>[x, y] = [y, x]</code>;",
          "Qoldiq: <code>[a, ...rest]</code> — qolgan elementlarni massivga yig'adi;",
          "Obyektda yangi nom: <code>{kalit: yangiNom}</code>;",
          "Funksiya parametrlarida qo'llasa, \"nomlangan argumentlar\" hosil bo'ladi."
        ] }
      ]
    },
    {
      slug: "sana-vaqt",
      title: "Sana va vaqt (Date)",
      blurb: "Date obyekti bilan sana yasash, komponentlarini olish, timestamp va sanalar ayirmasini hisoblash.",
      body: [
        { lead: "Sana va vaqt bilan ishlash uchun JavaScript'da o'rnatilgan <code>Date</code> obyekti mavjud. U orqali sanani yasash, uning yil, oy, kunini olish, ikki sana ayirmasini hisoblash mumkin." },

        { h2: "Date obyektini yaratish" },
        { p: "Yangi sana <code>new Date()</code> orqali yaratiladi. Argumentga qarab, bir necha xil ishlaydi:" },
        { p: "<strong>Argumentsiz</strong> — joriy sana va vaqtni beradi:" },
        { pg: "let hozir = new Date();\nconsole.log(hozir); // joriy sana va vaqt", file: "date-now.js" },
        { p: "<strong>Satr bilan</strong> — matndan sana o'qiladi (parse qilinadi):" },
        { pg: "let sana = new Date(\"2026-07-01\");\nconsole.log(sana); // 2026-yil 1-iyul (00:00 UTC)", file: "date-string.js" },
        { p: "<strong>Komponentlar bilan</strong> — yil, oy, kun va h.k. alohida beriladi:" },
        { pg: "// new Date(yil, oy, kun, soat, minut, sekund, ms)\nlet sana = new Date(2026, 6, 1, 14, 30, 0);\n// 2026-yil 1-iyul, 14:30\n\nconsole.log(sana.getFullYear()); // 2026\nconsole.log(sana.getDate());     // 1", file: "date-components.js" },
        { warn: "Diqqat! Komponentlar bilan yaratganda <strong>oy 0'dan boshlanadi</strong>: 0 = yanvar, 1 = fevral, ..., 6 = iyul, 11 = dekabr. Shuning uchun iyul uchun 6 yozdik, 7 emas! Bu eng ko'p uchraydigan xatolardan biri." },

        { h2: "Sana komponentlarini olish" },
        { p: "Yaratilgan sanadan uning qismlarini olish uchun quyidagi metodlar bor:" },
        { ul: [
          "<code>getFullYear()</code> — yilni beradi (4 xonali, masalan 2026);",
          "<code>getMonth()</code> — oyni beradi (<strong>0'dan 11'gacha</strong>!);",
          "<code>getDate()</code> — oyning kunini beradi (1'dan 31'gacha);",
          "<code>getDay()</code> — hafta kunini beradi (<strong>0 = yakshanba</strong>, 1 = dushanba, ..., 6 = shanba);",
          "<code>getHours()</code>, <code>getMinutes()</code>, <code>getSeconds()</code>, <code>getMilliseconds()</code> — soat, minut, sekund, millisekund."
        ] },
        { pg: "let sana = new Date(2026, 6, 1, 14, 30, 45);\n// 2026-yil 1-iyul (chorshanba), 14:30:45\n\nconsole.log(sana.getFullYear()); // 2026\nconsole.log(sana.getMonth());    // 6 (iyul, chunki 0'dan sanaladi!)\nconsole.log(sana.getDate());     // 1\nconsole.log(sana.getDay());      // 3 (chorshanba: 0=yakshanba)\nconsole.log(sana.getHours());    // 14\nconsole.log(sana.getMinutes());  // 30", file: "get-components.js" },
        { note: "<code>getDay()</code> ham 0'dan boshlanadi va <strong>yakshanba</strong>ga to'g'ri keladi (AQSh an'anasi). Ya'ni 0 = yakshanba, 1 = dushanba, 6 = shanba." },
        { tip: "Yuqoridagi metodlar mahalliy vaqt zonasida ishlaydi. UTC (Greenwich) vaqti kerak bo'lsa, ularning UTC versiyasi bor: <code>getUTCFullYear()</code>, <code>getUTCHours()</code> va hokazo." },

        { h2: "Timestamp — getTime()" },
        { p: "Har bir sana ichida <strong>timestamp</strong> saqlanadi — bu 1970-yil 1-yanvar UTC 00:00:00'dan beri o'tgan <strong>millisekundlar soni</strong>. Bu boshlang'ich nuqta \"Unix epoch\" deb ataladi." },
        { pg: "let sana = new Date(2026, 6, 1);\n\nconsole.log(sana.getTime());\n// katta son — 1970'dan beri o'tgan millisekundlar\n\n// timestamp'dan sana yasash ham mumkin:\nlet epoch = new Date(0);\nconsole.log(epoch.getFullYear()); // 1970", file: "timestamp.js" },
        { p: "Timestamp bilan ishlash qulay — chunki u oddiy son. Sanalarni solishtirish yoki ular orasidagi ayirmani hisoblashda aynan shu son ishlatiladi." },

        { h2: "Sanalar ayirmasi" },
        { p: "Ikki sanani bir-biridan ayirsak, natija <strong>millisekundlardagi</strong> farq bo'ladi (chunki sanalar avtomatik timestamp'ga aylanadi):" },
        { pg: "let boshlanish = new Date(2026, 6, 1);\nlet tugash = new Date(2026, 6, 10);\n\nlet farqMs = tugash - boshlanish;\nconsole.log(farqMs); // 777600000 (millisekundlarda)\n\n// kunlarga aylantiramiz:\nlet farqKun = farqMs / (1000 * 60 * 60 * 24);\nconsole.log(farqKun); // 9", file: "date-diff.js" },
        { p: "Bu yerda <code>1000 * 60 * 60 * 24</code> — bir kundagi millisekundlar soni (1000 ms × 60 sek × 60 min × 24 soat)." },
        { note: "Kod tezligini o'lchash uchun ham shu usul ishlatiladi: kod boshida va oxirida vaqtni olib, ayirmasini topamiz." },

        { h2: "Date.now()" },
        { p: "Agar bizga faqat joriy timestamp kerak bo'lsa (sana obyektining o'zi emas), <code>Date.now()</code> ishlatgan ma'qul. U to'g'ridan-to'g'ri sonni qaytaradi va ortiqcha <code>Date</code> obyekti yasamaydi — bu tezroq:" },
        { pg: "let boshlandi = Date.now(); // joriy timestamp (son)\n\n// biror \"og'ir\" ish qilamiz\nlet yigindi = 0;\nfor (let i = 0; i < 1000000; i++) {\n  yigindi += i;\n}\n\nlet tugadi = Date.now();\n\nconsole.log(\"Ish \" + (tugadi - boshlandi) + \" ms davom etdi\");", file: "date-now-perf.js" },
        { tip: "<code>Date.now()</code> = <code>new Date().getTime()</code>, lekin oraliq obyekt yaratmaydi. Ko'p marta chaqiriladigan joylarda aynan <code>Date.now()</code> ishlating." },

        { h2: "Avtomatik tuzatish (autocorrection)" },
        { p: "<code>Date</code> obyektining qiziq xususiyati bor: chegaradan tashqari qiymat bersangiz, u o'zini avtomatik tuzatadi. Masalan, \"32-yanvar\" beradigan bo'lsangiz, u \"1-fevral\"ga aylanadi:" },
        { pg: "// 2026-yil 32-yanvar (oy=0 yanvar)\nlet sana = new Date(2026, 0, 32);\n\nconsole.log(sana.getDate());  // 1\nconsole.log(sana.getMonth()); // 1 (fevral)", file: "autocorrect.js" },
        { p: "Bu xususiyat foydali: \"bugundan 90 kun keyin\" kabi hisoblarni sodda qiladi — chegaradan chiqib ketishdan qo'rqmasdan istalgan kun sonini qo'shaverasiz." },

        { h2: "Xulosa" },
        { ul: [
          "<code>new Date()</code> — joriy, satr yoki komponentlardan sana yasaydi;",
          "<strong>Oy 0'dan sanaladi</strong> (0 = yanvar, 11 = dekabr) — eng ko'p yo'l qo'yiladigan xato!;",
          "<code>getFullYear</code>, <code>getMonth</code>, <code>getDate</code>, <code>getDay</code> — komponentlarni oladi (<code>getDay</code>: 0 = yakshanba);",
          "<code>getTime()</code> — 1970-yildan beri o'tgan millisekundlar (timestamp);",
          "Sanalar ayirmasi millisekundlarda bo'ladi;",
          "<code>Date.now()</code> — obyekt yaratmasdan joriy timestamp'ni beradi (tezroq)."
        ] }
      ]
    },
    {
      slug: "json-metodlari",
      title: "JSON metodlari, toJSON",
      blurb: "Obyektni JSON satriga aylantirish (stringify) va qayta o'qish (parse); replacer, bo'shliq, reviver va toJSON.",
      body: [
        { lead: "Obyektni tarmoq orqali yuborish yoki faylda saqlash uchun uni matnga aylantirish kerak. <strong>JSON</strong> (JavaScript Object Notation) — bu ma'lumotni almashish uchun umumiy qabul qilingan format. JavaScript'da <code>JSON.stringify</code> va <code>JSON.parse</code> metodlari mavjud." },

        { h2: "JSON.stringify" },
        { p: "<code>JSON.stringify(obj)</code> — obyektni JSON <strong>satriga</strong> aylantiradi:" },
        { pg: "let user = {\n  ism: \"Jasur\",\n  yosh: 30,\n  faol: true\n};\n\nlet json = JSON.stringify(user);\n\nconsole.log(typeof json); // string\nconsole.log(json);\n// {\"ism\":\"Jasur\",\"yosh\":30,\"faol\":true}", file: "stringify.js" },
        { p: "Hosil bo'lgan satr <em>JSON-kodlangan</em> (JSON-encoded) deb ataladi. Uning JavaScript obyektidan farqlari:" },
        { ul: [
          "Satrlar faqat <strong>ikki tirnoq</strong>da bo'ladi (bitta tirnoq yoki backtick yo'q);",
          "Obyekt kalitlari ham har doim ikki tirnoqda bo'ladi (<code>\"ism\"</code>, <code>ism</code> emas);",
          "Ortiqcha bo'shliqlar olib tashlanadi."
        ] },

        { h2: "Qo'llab-quvvatlanadigan turlar" },
        { p: "<code>JSON.stringify</code> quyidagi turlarni qo'llab-quvvatlaydi: obyektlar, massivlar, satrlar, sonlar, mantiqiy qiymatlar (<code>true/false</code>) va <code>null</code>." },
        { pg: "console.log( JSON.stringify(42) );          // 42\nconsole.log( JSON.stringify(\"salom\") );     // \"salom\"\nconsole.log( JSON.stringify(true) );        // true\nconsole.log( JSON.stringify([1, 2, 3]) );   // [1,2,3]\nconsole.log( JSON.stringify(null) );        // null", file: "supported-types.js" },
        { p: "Ammo ba'zi turlar <strong>e'tiborsiz qoldiriladi</strong> yoki tashlab ketiladi:" },
        { ul: [
          "Funksiyalar (metodlar);",
          "<code>undefined</code> qiymatlar;",
          "Simvol (Symbol) kalitlari va qiymatlari."
        ] },
        { pg: "let obj = {\n  ism: \"Jasur\",\n  salom() { return \"Salom\"; }, // funksiya - tashlab ketiladi\n  yosh: undefined,              // undefined - tashlab ketiladi\n  faol: true\n};\n\nconsole.log( JSON.stringify(obj) );\n// {\"ism\":\"Jasur\",\"faol\":true}", file: "ignored-types.js" },
        { warn: "JSON <strong>halqasimon (circular) havolalarni</strong> qo'llab-quvvatlamaydi. Agar obyekt o'z-o'ziga havola qilsa, <code>JSON.stringify</code> xatolik beradi." },

        { h2: "Ichma-ich obyektlar" },
        { p: "<code>JSON.stringify</code> ichma-ich obyekt va massivlarni ham to'liq aylantiradi — hech qanday qo'shimcha kod kerak emas:" },
        { pg: "let kompaniya = {\n  nom: \"TechUz\",\n  xodimlar: [\n    { ism: \"Ali\", yosh: 25 },\n    { ism: \"Vali\", yosh: 28 }\n  ],\n  manzil: {\n    shahar: \"Toshkent\"\n  }\n};\n\nconsole.log( JSON.stringify(kompaniya) );", file: "nested-stringify.js" },

        { h2: "Bo'shliq (space) argumenti — chiroyli chiqarish" },
        { p: "<code>JSON.stringify</code>ning <strong>uchinchi</strong> argumenti — chiroyli, o'qish oson formatlash uchun. Odatda unga bo'shliqlar soni beriladi:" },
        { pg: "let user = {\n  ism: \"Jasur\",\n  yosh: 30,\n  manzil: {\n    shahar: \"Toshkent\"\n  }\n};\n\nlet json = JSON.stringify(user, null, 2);\nconsole.log(json);\n// {\n//   \"ism\": \"Jasur\",\n//   \"yosh\": 30,\n//   \"manzil\": {\n//     \"shahar\": \"Toshkent\"\n//   }\n// }", file: "pretty.js" },
        { tip: "Ikkinchi argument (bu yerda <code>null</code>) — replacer bo'lib, uni keyingi bo'limda tushuntiramiz. Chiroyli chiqarish faqat logga qarash uchun kerak; tarmoq orqali yuborishda odatda bo'shliqsiz (kichikroq) satr ishlatiladi." },

        { h2: "Replacer — nimalarni saqlashni tanlash" },
        { p: "Ikkinchi argument <strong>replacer</strong> — u qaysi xossalarni JSON'ga kiritishni boshqaradi. U ikki xil bo'lishi mumkin:" },
        { p: "<strong>Massiv</strong> — faqat sanab o'tilgan kalitlar saqlanadi:" },
        { pg: "let user = {\n  ism: \"Jasur\",\n  yosh: 30,\n  parol: \"maxfiy123\"\n};\n\n// faqat ism va yosh saqlanadi, parol chiqib ketadi\nlet json = JSON.stringify(user, [\"ism\", \"yosh\"]);\n\nconsole.log(json);\n// {\"ism\":\"Jasur\",\"yosh\":30}", file: "replacer-array.js" },
        { p: "<strong>Funksiya</strong> — har bir kalit-qiymat juftligi uchun chaqiriladi. Qaytargan qiymat saqlanadi; <code>undefined</code> qaytarsa, xossa tashlab ketiladi:" },
        { pg: "let user = {\n  ism: \"Jasur\",\n  yosh: 30,\n  parol: \"maxfiy123\"\n};\n\nlet json = JSON.stringify(user, function(kalit, qiymat) {\n  if (kalit === \"parol\") return undefined; // parolni yashiramiz\n  return qiymat;\n});\n\nconsole.log(json);\n// {\"ism\":\"Jasur\",\"yosh\":30}", file: "replacer-func.js" },

        { h2: "JSON.parse" },
        { p: "<code>JSON.parse(str)</code> — JSON satrini yana JavaScript obyektiga aylantiradi (bu <code>stringify</code>ning teskarisi):" },
        { pg: "let json = '{\"ism\":\"Jasur\",\"yosh\":30,\"faol\":true}';\n\nlet user = JSON.parse(json);\n\nconsole.log(user.ism);  // Jasur\nconsole.log(user.yosh); // 30\nconsole.log(user.faol); // true", file: "parse.js" },
        { p: "Massivlarni ham xuddi shunday o'qiydi:" },
        { pg: "let json = '[1, 2, 3, [4, 5]]';\n\nlet massiv = JSON.parse(json);\n\nconsole.log(massiv[0]);    // 1\nconsole.log(massiv[3][0]); // 4", file: "parse-array.js" },
        { warn: "JSON juda qat'iy: kalitlar va satrlar <strong>ikki tirnoqda</strong> bo'lishi shart, oxirida ortiqcha vergul bo'lmasligi kerak, izohlar (comment) qo'yib bo'lmaydi. Aks holda <code>JSON.parse</code> xatolik beradi." },

        { h2: "Reviver — o'qishda qiymatlarni tiklash" },
        { p: "<code>JSON.parse(str, reviver)</code> — ikkinchi argument sifatida funksiya berilsa, u har bir kalit-qiymat juftligini o'qishda chaqiriladi. Bu, masalan, sana satrini yana <code>Date</code> obyektiga aylantirish uchun kerak:" },
        { pg: "let json = '{\"sarlavha\":\"Uchrashuv\",\"sana\":\"2026-07-01T10:00:00.000Z\"}';\n\n// reviver'siz \"sana\" oddiy satr bo'lib qoladi\nlet oddiy = JSON.parse(json);\nconsole.log(typeof oddiy.sana); // string\n\n// reviver bilan Date obyektiga aylantiramiz\nlet tadbir = JSON.parse(json, function(kalit, qiymat) {\n  if (kalit === \"sana\") return new Date(qiymat);\n  return qiymat;\n});\n\nconsole.log(tadbir.sana.getFullYear()); // 2026", file: "reviver.js" },

        { h2: "toJSON metodi" },
        { p: "Obyektlar <code>toString</code> metodiga o'xshab, <code>toJSON</code> metodiga ega bo'lishi mumkin. Agar u mavjud bo'lsa, <code>JSON.stringify</code> obyektni to'g'ridan-to'g'ri aylantirish o'rniga aynan shu metodni chaqiradi:" },
        { pg: "let sana = {\n  yil: 2026,\n  oy: 7,\n  kun: 1,\n  // maxsus JSON ko'rinishi\n  toJSON() {\n    return this.yil + \"-\" + this.oy + \"-\" + this.kun;\n  }\n};\n\nlet tadbir = {\n  nom: \"Konferensiya\",\n  vaqti: sana\n};\n\nconsole.log( JSON.stringify(tadbir) );\n// {\"nom\":\"Konferensiya\",\"vaqti\":\"2026-7-1\"}", file: "tojson.js" },
        { note: "Aslida o'rnatilgan <code>Date</code> obyektida ham <code>toJSON</code> mavjud. Shuning uchun <code>JSON.stringify</code> sanalarni avtomatik ravishda standart ISO satr formatida saqlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>JSON.stringify(obj)</code> — obyektni JSON satriga aylantiradi;",
          "<code>JSON.parse(str)</code> — JSON satrini yana obyektga o'giradi;",
          "Qo'llab-quvvatlanadi: obyekt, massiv, satr, son, boolean, <code>null</code>;",
          "Tashlab ketiladi: funksiya, <code>undefined</code>, simvol;",
          "<strong>3-argument</strong> (bo'shliq) — chiroyli, o'qish oson formatlash uchun;",
          "<strong>Replacer</strong> (2-argument) — qaysi xossalarni saqlashni tanlaydi;",
          "<strong>Reviver</strong> (parse'ning 2-argumenti) — o'qishda qiymatlarni qayta tiklaydi;",
          "<code>toJSON</code> — obyektning maxsus JSON ko'rinishini belgilaydi."
        ] }
      ]
    }
  ]
};
