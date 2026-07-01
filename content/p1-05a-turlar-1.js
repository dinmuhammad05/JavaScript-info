"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Ma'lumot turlari",
  lessons: [
    {
      slug: "primitiv-metodlar",
      title: "Primitivlar metodlari",
      blurb: "Primitiv qiymatlar (satr, son, mantiqiy) ustida ham metod chaqirish mumkin. Bu qanday ishlaydi va \"obyekt o'ramchasi\" nima?",
      body: [
        { lead: "JavaScript primitivlar (satrlar, sonlar) bilan xuddi ular obyektdek ishlashga imkon beradi: ularda metodlar chaqirish mumkin. Ushbu darsda buning sirini — \"obyekt o'ramchasi\" (wrapper) g'oyasini o'rganamiz." },

        { h2: "Primitiv va obyekt farqi" },
        { p: "Avval ikki tushunchani aniq ajratamiz. <strong>Primitiv</strong> — bu bitta oddiy qiymat. JavaScript'da 7 ta primitiv tur bor: <code>string</code>, <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>symbol</code>, <code>null</code> va <code>undefined</code>." },
        { p: "<strong>Obyekt</strong> — bu bir nechta qiymatni xususiyatlar (properties) sifatida saqlay oladigan murakkab tuzilma. U jingalak qavslar <code>{...}</code> yordamida yaratiladi va ichida metodlar (funksiya bo'lgan xususiyatlar) saqlashi mumkin." },
        { code: "// obyekt — ichida ma'lumot va metod bor\nlet foydalanuvchi = {\n  ism: \"Ali\",\n  salom: function() {\n    return \"Salom!\";\n  }\n};\n\n// obyektning metodini chaqiramiz\nfoydalanuvchi.salom();  // \"Salom!\"" },
        { p: "Obyektlar primitivlarga qaraganda \"og'irroq\" — ular xotirada ko'proq joy egallaydi va ularni boshqarish uchun ichki mexanizmlar kerak bo'ladi." },

        { h2: "Muammo: primitivda ham metod kerak" },
        { p: "Til yaratuvchilari qiyin masalaga duch kelishgan. Bir tomondan, satrlar yoki sonlar bilan ko'p foydali amallar bajarish qulay bo'lardi. Masalan, satrni katta harflarga o'girish yoki uning uzunligini bilish. Bu amallar metodlar orqali ifodalansa juda qulay." },
        { p: "Ikkinchi tomondan, primitivlar imkon qadar tez va yengil bo'lishi kerak. Agar har bir son yoki satr og'ir obyekt bo'lsa, dastur juda sekinlashib qolardi." },
        { p: "Yechim ancha nafis. Mana uning mohiyati:" },
        { ol: [
          "Primitivlar oddiy va yengil qiymatlar bo'lib qolaveradi;",
          "Til esa satr, son, mantiqiy qiymat va symbol'lar uchun metod hamda xususiyatlarga kirishga ruxsat beradi;",
          "Buning ishlashi uchun primitivda metod chaqirilganida, maxsus \"obyekt o'ramchasi\" (wrapper) yaratiladi. U kerakli funksionallikni beradi va shundan keyin yo'q qilinadi."
        ] },

        { h2: "Obyekt o'ramchasi (wrapper) qanday ishlaydi?" },
        { p: "\"O'ramchi obyektlar\" har bir primitiv tur uchun mavjud va ular quyidagicha nomlanadi: <code>String</code>, <code>Number</code>, <code>Boolean</code>, <code>BigInt</code> va <code>Symbol</code>. Ular turli xil metodlar to'plamini taqdim etadi." },
        { p: "Masalan, satr uchun <code>str.toUpperCase()</code> metodi mavjud — u satrni katta harflarga o'giradi. Uni chaqirganingizda nima ro'y beradi:" },
        { ol: [
          "<code>str</code> — bu primitiv satr. Unga murojaat qilingan payt maxsus obyekt yaratiladi, u satr qiymatini va <code>toUpperCase()</code> kabi foydali metodlarni biladi;",
          "Metod bajariladi va yangi satr qaytaradi (buni konsol ko'rsatadi);",
          "Maxsus obyekt yo'q qilinadi, primitiv <code>str</code> esa o'zgarmasdan qoladi."
        ] },
        { p: "Ya'ni primitivlar metod bera oladi, lekin o'zi baribir yengil bo'lib qolaveradi. JavaScript dvigateli bu jarayonni juda samarali optimallashtiradi, hatto ko'pincha hech qanday qo'shimcha obyekt yaratmaydi." },
        { p: "Quyidagi misolni ishga tushiring — satr metodlari qanday natija berishini ko'ring:" },
        { pg: "let matn = \"Salom Dunyo\";\n\n// katta harflarga o'girish\nconsole.log(matn.toUpperCase());  // SALOM DUNYO\n\n// kichik harflarga o'girish\nconsole.log(matn.toLowerCase());  // salom dunyo\n\n// asl satr o'zgarmagan!\nconsole.log(matn);  // Salom Dunyo", file: "primitiv-satr.js" },
        { note: "Diqqat qiling: <code>toUpperCase()</code> asl satrni o'zgartirmaydi, balki <strong>yangi</strong> satr qaytaradi. Primitivlar o'zgarmas (immutable) — ularni tahrirlab bo'lmaydi, faqat yangi qiymat yaratish mumkin." },

        { h2: "Sonlarda ham metodlar bor" },
        { p: "Sonlar ham primitiv, lekin ularda ham metodlar mavjud. Masalan, <code>toFixed(n)</code> — sonni kasr qismidagi belgilar sonini <code>n</code> ga qadar yaxlitlaydi va satr qaytaradi:" },
        { pg: "let narx = 12.34567;\n\n// 2 ta kasr belgisiga yaxlitlash\nconsole.log(narx.toFixed(2));  // 12.35\n\n// mantiqiy qiymatning metodi\nlet rost = true;\nconsole.log(rost.toString());  // \"true\"", file: "primitiv-son.js" },
        { warn: "Butun sonda to'g'ridan-to'g'ri metod chaqirmoqchi bo'lsangiz, ikki nuqta qo'ying yoki qavsdan foydalaning. Masalan, <code>123456..toString()</code> yoki <code>(123456).toString()</code>. Chunki bitta nuqta <code>123456.toString()</code>'da JavaScript nuqtani o'nlik kasr deb o'ylab, xatoga yo'l qo'yishi mumkin." },

        { h2: "null va undefined'da metod yo'q" },
        { p: "Ikkita alohida primitiv — <code>null</code> va <code>undefined</code> — bu qoidadan istisno. Ular o'ramchi obyektga ega emas va hech qanday metod bermaydi. Ular \"eng bo'sh\" primitivlar hisoblanadi." },
        { code: "// bu XATO beradi!\nnull.test;       // TypeError\nundefined.test;  // TypeError" },
        { p: "Agar <code>null</code> yoki <code>undefined</code>'da metod yoki xususiyatga murojaat qilsangiz, dastur <code>TypeError</code> xatosi bilan to'xtaydi. Shu sabab qiymat bilan ishlashdan oldin uning <code>null</code>/<code>undefined</code> emasligiga ishonch hosil qilish muhim." },
        { tip: "Amalda ko'p xatolar aynan <code>null</code> yoki <code>undefined</code>'da metod chaqirishdan kelib chiqadi. Masalan, mavjud bo'lmagan obyekt xususiyatidan qiymat olmoqchi bo'lganda. Bunga e'tibor bering." },

        { h2: "O'ramchi obyektni qo'lda yaratmang" },
        { p: "Nazariy jihatdan <code>new Number(5)</code> yoki <code>new String(\"salom\")</code> orqali o'ramchi obyektni qo'lda yaratish mumkin, lekin buni <strong>hech qachon qilmang</strong>. Bu chalkashlik va kutilmagan xatolarga olib keladi:" },
        { pg: "// new bilan yaratilgan \"son\" aslida OBYEKT\nlet son = new Number(0);\n\nif (son) {\n  // obyekt har doim \"rost\", shuning uchun bu bajariladi!\n  console.log(\"Bu satr bajarildi, chunki obyekt har doim true\");\n}\n\nconsole.log(typeof son);  // \"object\", \"number\" emas!", file: "wrapper-xato.js" },
        { warn: "<code>new String</code>, <code>new Number</code>, <code>new Boolean</code>'ni <strong>hech qachon</strong> ishlatmang. Lekin <code>new</code>siz oddiy funksiya sifatida chaqirish (masalan <code>Number(\"123\")</code>) — bu boshqa narsa va foydali, u qiymatni tegishli turga o'giradi." },

        { h2: "Xulosa" },
        { ul: [
          "Primitivlar (<code>null</code> va <code>undefined</code>dan tashqari) metodlarga ega bo'la oladi;",
          "Metod chaqirilganda vaqtinchalik <strong>o'ramchi obyekt</strong> (wrapper) yaratiladi, ish tugagach yo'q qilinadi;",
          "Primitivlar <strong>o'zgarmas</strong> (immutable) — metodlar yangi qiymat qaytaradi, aslini o'zgartirmaydi;",
          "<code>null</code> va <code>undefined</code>'da metod yo'q — ularda murojaat <code>TypeError</code> beradi;",
          "<code>new String</code>, <code>new Number</code>, <code>new Boolean</code>'ni ishlatmang — bu obyekt yaratadi va chalkashlik keltiradi."
        ] }
      ]
    },

    {
      slug: "sonlar",
      title: "Sonlar",
      blurb: "Sonlarni yozish usullari, sanoq tizimlari, yaxlitlash, aniqlik muammolari va Math obyekti bilan ishlash.",
      body: [
        { lead: "Zamonaviy JavaScript'da sonlarning ikki turi bor: oddiy sonlar (<code>number</code>) va juda katta butun sonlar (<code>bigint</code>). Ushbu darsda asosan oddiy sonlar bilan ishlashni chuqur o'rganamiz." },

        { h2: "Sonlarni yozishning ko'p usullari" },
        { p: "Katta sonni yozganda uni o'qish qiyin bo'ladi. Masalan, million: <code>1000000</code>. Nollarni sanashga to'g'ri keladi. Buning uchun bir nechta qulay usul bor." },
        { p: "Birinchisi — nollar o'rniga <code>e</code> harfidan foydalanish. <code>e</code> undan keyingi nol sonini bildiradi:" },
        { pg: "// 1e6 = 1 va 6 ta nol = million\nconsole.log(1e6);     // 1000000\nconsole.log(1e9);     // 1000000000 (milliard)\nconsole.log(7.3e3);   // 7300  (7.3 * 1000)\n\n// manfiy daraja — kichik sonlar uchun\nconsole.log(1e-6);    // 0.000001 (millionда bir)\nconsole.log(2.5e-3);  // 0.0025", file: "son-yozuv.js" },
        { p: "Ikkinchisi — o'rinlar orasiga ajratuvchi ostki chiziq <code>_</code> qo'yish. U shunchaki bezak, JavaScript uni e'tiborsiz qoldiradi, lekin sonni o'qishni osonlashtiradi:" },
        { code: "let million = 1_000_000;  // 1000000 bilan bir xil\nconsole.log(million);" },

        { h2: "Boshqa sanoq tizimlari" },
        { p: "Sonlarni turli sanoq tizimlarida yozish mumkin, buning uchun maxsus prefikslar bor:" },
        { ul: [
          "<code>0x</code> — o'n oltilik (hexadecimal), masalan ranglar uchun ishlatiladi;",
          "<code>0b</code> — ikkilik (binary);",
          "<code>0o</code> — sakkizlik (octal)."
        ] },
        { pg: "// o'n oltilik son (0x prefiksi bilan)\nconsole.log(0xff);    // 255\nconsole.log(0xFF);    // 255 (katta-kichik harf farq qilmaydi)\n\n// ikkilik son (0b)\nconsole.log(0b1111);  // 15\n\n// sakkizlik son (0o)\nconsole.log(0o377);   // 255", file: "sanoq-tizimi.js" },

        { h2: "toString(base) — sonni matnga o'girish" },
        { p: "<code>num.toString(base)</code> metodi sonni berilgan sanoq tizimidagi <code>base</code> asosidagi satr ko'rinishida qaytaradi. <code>base</code> 2 dan 36 gacha bo'lishi mumkin, standart qiymat 10." },
        { pg: "let son = 255;\n\nconsole.log(son.toString(2));   // \"11111111\" (ikkilik)\nconsole.log(son.toString(16));  // \"ff\" (o'n oltilik)\nconsole.log(son.toString(8));   // \"377\" (sakkizlik)\n\nlet katta = 123456;\nconsole.log(katta.toString(36)); // \"2n9c\"", file: "tostring-base.js" },
        { note: "36-asos maksimal — bunda 0-9 raqamlar va a-z lotin harflari ishlatiladi. Uni uzun raqamli identifikatorni qisqartirish uchun ishlatish mumkin." },

        { h2: "Yaxlitlash" },
        { p: "Sonlar bilan ishlashda eng ko'p kerak bo'ladigan amallardan biri — yaxlitlash. Bir necha usul bor:" },
        { ul: [
          "<code>Math.floor</code> — pastga yaxlitlaydi: <code>3.9</code> → <code>3</code>;",
          "<code>Math.ceil</code> — yuqoriga yaxlitlaydi: <code>3.1</code> → <code>4</code>;",
          "<code>Math.round</code> — eng yaqiniga yaxlitlaydi: <code>3.5</code> → <code>4</code>;",
          "<code>Math.trunc</code> — kasr qismini shunchaki tashlaydi (yaxlitlamaydi): <code>3.9</code> → <code>3</code>."
        ] },
        { pg: "console.log(Math.floor(3.9));  // 3\nconsole.log(Math.ceil(3.1));   // 4\nconsole.log(Math.round(3.5));  // 4\nconsole.log(Math.trunc(3.9));  // 3\n\n// manfiy sonlarda farqni ko'ring:\nconsole.log(Math.floor(-1.1)); // -2 (pastga, ya'ni kichikroqqa)\nconsole.log(Math.trunc(-1.1)); // -1 (faqat kasrni tashlaydi)", file: "yaxlitlash.js" },
        { p: "Sonni kasrdan keyingi ma'lum belgigacha yaxlitlash uchun ikki asosiy yo'l bor. Birinchisi — <code>toFixed(n)</code> metodi. U sonni <code>n</code> ta kasr belgisiga yaxlitlaydi va <strong>satr</strong> qaytaradi:" },
        { pg: "let pi = 3.14159;\n\nconsole.log(pi.toFixed(2));  // \"3.14\"\nconsole.log(pi.toFixed(0));  // \"3\"\n\n// natija SATR ekanini unutmang\nconsole.log(typeof pi.toFixed(2));  // \"string\"\n\n// yetishmagan joyni nol bilan to'ldiradi\nconsole.log((5.1).toFixed(3));  // \"5.100\"", file: "tofixed.js" },
        { tip: "Agar <code>toFixed</code> natijasini yana son sifatida ishlatmoqchi bo'lsangiz, uni <code>Number(...)</code> yoki oldiga <code>+</code> qo'yib songa qaytaring: <code>+pi.toFixed(2)</code>." },

        { h2: "Aniqlik muammosi: 0.1 + 0.2" },
        { p: "JavaScript'dagi eng mashhur \"g'alati\" hodisalardan biri — bu quyidagi natija:" },
        { pg: "console.log(0.1 + 0.2);          // 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3);  // false (!)", file: "aniqlik.js" },
        { p: "Bu JavaScript'ning xatosi emas! Sabab shundaki, sonlar xotirada ikkilik (binary) formatda saqlanadi. <code>0.1</code>, <code>0.2</code> kabi kasrlar ikkilik tizimda cheksiz davriy kasrga aylanadi — xuddi biz o'nlik tizimda <code>1/3</code>ni <code>0.333...</code> deb aniq yoza olmasligimizdek. Shuning uchun ozgina yaxlitlash xatosi paydo bo'ladi." },
        { note: "Bu muammo faqat JavaScript'da emas — Python, Java, C va boshqa deyarli barcha tillarda ham bor, chunki ular bir xil (IEEE-754) standart formatdan foydalanadi." },
        { p: "Yechim: taqqoslashda yoki natijani ko'rsatishda <code>toFixed</code> ishlatish yoki natijani yaxlitlash:" },
        { pg: "let yigindi = 0.1 + 0.2;\n\n// ko'rsatishda yaxlitlaymiz\nconsole.log(yigindi.toFixed(2));       // \"0.30\"\nconsole.log(+yigindi.toFixed(2));      // 0.3 (son)\n\n// taqqoslash to'g'ri ishlaydi\nconsole.log(+yigindi.toFixed(10) === 0.3);  // true", file: "aniqlik-yechim.js" },
        { warn: "Pul bilan ishlaganda bu muammo jiddiy bo'ladi. Ko'pincha summani eng kichik birlikda (masalan, tiyin/sent) butun son sifatida saqlash va faqat ko'rsatishda bo'lish tavsiya etiladi." },

        { h2: "isNaN va isFinite" },
        { p: "Sonlar bilan ishlashda ikki maxsus qiymat bor: <code>NaN</code> (Not a Number — \"son emas\") va <code>Infinity</code> (cheksizlik). Ularni tekshirish uchun maxsus funksiyalar mavjud." },
        { p: "<code>isNaN(qiymat)</code> — qiymatni songa o'giradi va u <code>NaN</code> emasligini tekshiradi. Nega alohida funksiya kerak? Chunki <code>NaN</code> o'z-o'ziga ham teng emas:" },
        { pg: "console.log(NaN === NaN);      // false (!) — o'z-o'ziga teng emas\nconsole.log(isNaN(NaN));       // true\nconsole.log(isNaN(\"matn\"));    // true (songa o'gira olmaydi)\nconsole.log(isNaN(\"123\"));     // false (\"123\" son bo'la oladi)", file: "isnan.js" },
        { p: "<code>isFinite(qiymat)</code> — qiymat oddiy chekli son ekanini tekshiradi. Ya'ni u <code>NaN</code> ham, <code>Infinity</code> ham, <code>-Infinity</code> ham emasligini bildiradi:" },
        { pg: "console.log(isFinite(123));        // true\nconsole.log(isFinite(Infinity));   // false\nconsole.log(isFinite(NaN));        // false\nconsole.log(isFinite(\"15\"));       // true (\"15\" son bo'ladi)\nconsole.log(isFinite(\"matn\"));     // false", file: "isfinite.js" },
        { note: "Aniqroq tekshirish uchun <code>Number.isNaN</code> va <code>Number.isFinite</code> ham bor. Ular qiymatni songa o'girmaydi, faqat u haqiqatan son turida ekanini tekshiradi. Masalan, <code>Number.isNaN(\"matn\")</code> → <code>false</code>, chunki <code>\"matn\"</code> satr, <code>NaN</code> emas." },

        { h2: "parseInt va parseFloat" },
        { p: "<code>Number(qiymat)</code> orqali o'girish qat'iy: agar satr toza son bo'lmasa, natija <code>NaN</code> bo'ladi. Masalan, <code>\"100px\"</code>ni songa o'gira olmaydi." },
        { p: "<code>parseInt</code> va <code>parseFloat</code> esa \"yumshoqroq\": ular satrni boshidan o'qib, imkoni boricha ko'proq sonni ajratib oladi va son bo'lmagan belgida to'xtaydi:" },
        { pg: "console.log(Number(\"100px\"));     // NaN — o'gira olmadi\n\nconsole.log(parseInt(\"100px\"));   // 100 — sonni ajratdi\nconsole.log(parseFloat(\"12.5em\")); // 12.5\nconsole.log(parseInt(\"12.9\"));    // 12 — parseInt faqat butun qism\nconsole.log(parseFloat(\"12.3.4\")); // 12.3 — ikkinchi nuqtada to'xtadi\n\n// boshi son bo'lmasa NaN\nconsole.log(parseInt(\"a123\"));    // NaN", file: "parseint.js" },
        { tip: "<code>parseInt</code>ning ikkinchi argumenti — sanoq tizimi asosi. Masalan, <code>parseInt(\"ff\", 16)</code> → <code>255</code>. O'n oltilik satrlarni o'qishda juda foydali." },

        { h2: "Math obyekti" },
        { p: "<code>Math</code> — matematik funksiyalar va konstantalar to'plami bo'lgan o'rnatilgan obyekt. Eng ko'p ishlatiladiganlari:" },
        { pg: "// kvadrat ildiz\nconsole.log(Math.sqrt(16));    // 4\n\n// daraja: 2 ning 10-darajasi\nconsole.log(Math.pow(2, 10));  // 1024\n\n// eng katta va eng kichik\nconsole.log(Math.max(3, 5, 1, 9, 2));  // 9\nconsole.log(Math.min(3, 5, 1, 9, 2));  // 1\n\n// mutlaq qiymat\nconsole.log(Math.abs(-7));     // 7\n\n// Pi soni\nconsole.log(Math.PI);          // 3.141592653589793", file: "math.js" },
        { p: "<code>Math.random()</code> — 0 (kiritiladi) dan 1 (kiritilmaydi) gacha tasodifiy son qaytaradi. Undan foydalanib kerakli oraliqda tasodifiy son olish mumkin:" },
        { pg: "// 0 dan 1 gacha tasodifiy son (har safar boshqacha)\nconsole.log(Math.random());\n\n// 1 dan 6 gacha tasodifiy butun son (zar tashlash)\nlet zar = Math.floor(Math.random() * 6) + 1;\nconsole.log(\"Zar:\", zar);", file: "random.js" },

        { h2: "Xulosa" },
        { ul: [
          "Sonlarni <code>1e6</code>, <code>0x</code>, <code>0b</code>, <code>0o</code> va <code>_</code> bilan qulay yozish mumkin;",
          "<code>toString(base)</code> — sonni boshqa sanoq tizimidagi satrga o'giradi;",
          "Yaxlitlash: <code>Math.floor/ceil/round/trunc</code> va <code>toFixed(n)</code> (satr qaytaradi);",
          "<code>0.1 + 0.2 !== 0.3</code> — bu ikkilik saqlash natijasi, JavaScript xatosi emas;",
          "<code>isNaN</code>, <code>isFinite</code> — maxsus son qiymatlarini tekshiradi;",
          "<code>parseInt</code>/<code>parseFloat</code> — satr boshidan sonni ajratib oladi;",
          "<code>Math</code> — matematik funksiyalar (<code>sqrt</code>, <code>pow</code>, <code>max</code>, <code>random</code>)."
        ] }
      ]
    },

    {
      slug: "satrlar",
      title: "Satrlar",
      blurb: "Matn ma'lumotlari: tirnoq turlari, shablon satrlar, maxsus belgilar, uzunlik, belgilarga murojaat va satr metodlari.",
      body: [
        { lead: "Matnli ma'lumot JavaScript'da <strong>satr</strong> (string) sifatida saqlanadi. Bitta belgi uchun alohida tur yo'q — hamma matn satrdir. Ushbu darsda satrlar bilan ishlashni chuqur o'rganamiz." },

        { h2: "Tirnoq turlari" },
        { p: "JavaScript'da satrni uch xil tirnoq bilan yozish mumkin:" },
        { ul: [
          "Qo'shtirnoq: <code>\"Salom\"</code>;",
          "Bir tirnoq (apostrof): <code>'Salom'</code>;",
          "Teskari tirnoq (backtick): shablon satrlar uchun."
        ] },
        { p: "Qo'shtirnoq va bir tirnoq amalda bir xil ishlaydi. Teskari tirnoq esa qo'shimcha imkoniyat beradi." },
        { pg: "let a = \"qo'shtirnoq\";\nlet b = 'bir tirnoq';\nconsole.log(a);\nconsole.log(b);", file: "tirnoqlar.js" },

        { h2: "Shablon satrlar (template literals)" },
        { p: "Teskari tirnoq (backtick) bilan yozilgan satrlar <strong>shablon satrlar</strong> deyiladi. Ular ichiga <code>${...}</code> orqali istalgan ifoda joylashtirish mumkin — o'zgaruvchilar va hisob-kitoblar." },
        { p: "Quyida shablon satr sintaksisi ko'rsatilgan (teskari tirnoq belgisi \\` bilan ifodalangan):" },
        { code: "let ism = \"Ali\";\nlet yosh = 25;\n\n// ${...} ichida o'zgaruvchi va ifoda ishlaydi\nlet xabar = \\`Salom, ${ism}! Sizga ${yosh} yosh.\\`;\n// natija: \"Salom, Ali! Sizga 25 yosh.\"\n\nlet natija = \\`2 + 2 = ${2 + 2}\\`;\n// natija: \"2 + 2 = 4\"" },
        { p: "Shablon satrlarning yana bir foydasi — ular <strong>ko'p qatorli</strong> bo'la oladi. Oddiy tirnoqlarda satrni bir necha qatorga bo'lish mumkin emas, teskari tirnoqda esa mumkin. Quyidagi interaktiv misolda oddiy birlashtirish orqali xuddi shu natijani ko'ramiz:" },
        { pg: "let ism = \"Vali\";\nlet yosh = 30;\n\n// oddiy birlashtirish (+) orqali\nlet xabar = \"Salom, \" + ism + \"! Yoshingiz: \" + yosh;\nconsole.log(xabar);\n\n// arifmetik ifoda ham mumkin\nconsole.log(\"Kelasi yil: \" + (yosh + 1));", file: "birlashtirish.js" },
        { tip: "Amalda satr yaratganda deyarli har doim shablon satrlar (backtick) ishlatiladi, chunki <code>${...}</code> bilan yozish <code>+</code> bilan birlashtirishdan ancha o'qilishi oson." },

        { h2: "Maxsus belgilar" },
        { p: "Ba'zi belgilarni to'g'ridan-to'g'ri yozib bo'lmaydi, ular uchun <strong>maxsus belgilar</strong> (escape ketma-ketligi) bor. Ular teskari chiziq <code>\\</code> bilan boshlanadi:" },
        { ul: [
          "<code>\\n</code> — yangi qatorga o'tish;",
          "<code>\\t</code> — tabulyatsiya (bo'sh joy);",
          "<code>\\\\</code> — teskari chiziqning o'zi;",
          "<code>\\'</code> va <code>\\\"</code> — tirnoqning o'zi (satr ichida)."
        ] },
        { pg: "// \\n yangi qator qo'shadi\nconsole.log(\"Birinchi qator\\nIkkinchi qator\");\n\n// \\t tabulyatsiya\nconsole.log(\"Ism:\\tAli\");\n\n// tirnoqni satr ichida ko'rsatish\nconsole.log(\"U \\\"kitob\\\" dedi\");", file: "maxsus-belgi.js" },
        { note: "Agar satr bir tirnoqda bo'lsa, ichidagi qo'shtirnoqni eskeyplashga hojat yo'q: <code>'U \"salom\" dedi'</code>. Va aksincha. Bu ko'pincha kodni tozaroq qiladi." },

        { h2: "Uzunlik va belgilarga murojaat" },
        { p: "Satr uzunligini <code>length</code> xususiyati beradi. Diqqat: bu metod emas, xususiyat — qavs qo'yilmaydi (<code>str.length</code>, <code>str.length()</code> emas)." },
        { p: "Alohida belgiga ikki yo'l bilan murojaat qilinadi: to'rtburchak qavs <code>[...]</code> yoki <code>at(...)</code> metodi orqali. Indekslar 0 dan boshlanadi." },
        { pg: "let matn = \"JavaScript\";\n\nconsole.log(matn.length);   // 10 (belgilar soni)\n\nconsole.log(matn[0]);       // \"J\" (birinchi belgi)\nconsole.log(matn[4]);       // \"S\"\n\n// at() manfiy indeksni ham qo'llaydi!\nconsole.log(matn.at(-1));   // \"t\" (oxirgi belgi)\nconsole.log(matn.at(-2));   // \"p\"", file: "uzunlik.js" },
        { p: "<code>at()</code> ning ustunligi — manfiy indeks bilan oxiridan sanash. <code>[]</code> bilan bu ishlamaydi: <code>matn[-1]</code> → <code>undefined</code>, <code>matn.at(-1)</code> esa oxirgi belgini beradi." },

        { h2: "Katta va kichik harflar" },
        { p: "Satrni butunlay katta yoki kichik harflarga o'girish uchun ikki metod bor. Ular yangi satr qaytaradi, aslini o'zgartirmaydi (satrlar o'zgarmas):" },
        { pg: "let matn = \"Salom Dunyo\";\n\nconsole.log(matn.toUpperCase());  // \"SALOM DUNYO\"\nconsole.log(matn.toLowerCase());  // \"salom dunyo\"\n\n// bitta belgini ham o'girish mumkin\nconsole.log(\"salom\"[0].toUpperCase());  // \"S\"", file: "harflar.js" },

        { h2: "Qism satr izlash: indexOf, includes" },
        { p: "Satr ichida boshqa satrni izlash uchun bir nechta metod bor. <code>indexOf(qism)</code> — qism satr birinchi uchragan indeksni qaytaradi, topilmasa <code>-1</code> qaytaradi:" },
        { pg: "let matn = \"Men JavaScript'ni yaxshi ko'raman\";\n\nconsole.log(matn.indexOf(\"JavaScript\"));  // 4\nconsole.log(matn.indexOf(\"Python\"));      // -1 (yo'q)\n\n// indexOf'ni shartda ishlatish\nif (matn.indexOf(\"yaxshi\") !== -1) {\n  console.log(\"'yaxshi' so'zi bor\");\n}", file: "indexof.js" },
        { p: "Ko'pincha shunchaki \"bormi yoki yo'q\" degan javob kerak bo'ladi. Buning uchun qulayroq metodlar bor:" },
        { ul: [
          "<code>includes(qism)</code> — qism satr bor bo'lsa <code>true</code>, aks holda <code>false</code>;",
          "<code>startsWith(qism)</code> — satr shu bilan boshlanadimi;",
          "<code>endsWith(qism)</code> — satr shu bilan tugaydimi."
        ] },
        { pg: "let fayl = \"rasm.png\";\n\nconsole.log(fayl.includes(\"png\"));      // true\nconsole.log(fayl.startsWith(\"rasm\"));   // true\nconsole.log(fayl.endsWith(\".png\"));     // true\nconsole.log(fayl.endsWith(\".jpg\"));     // false", file: "includes.js" },
        { tip: "<code>includes</code>, <code>startsWith</code>, <code>endsWith</code> to'g'ridan-to'g'ri <code>true</code>/<code>false</code> qaytargani uchun shartlarda <code>indexOf</code>dan qulayroq. Zamonaviy kodda ularni afzal ko'ring." },

        { h2: "Qism satrni ajratish: slice, substring" },
        { p: "Satrdan bir qismini ajratib olish uchun asosan uch metod bor. Eng ko'p ishlatiladigani va tavsiya etilgani — <code>slice(boshi, oxiri)</code>. U <code>boshi</code>dan <code>oxiri</code>gacha (oxiri kirmaydi) qismni qaytaradi:" },
        { pg: "let matn = \"JavaScript\";\n\nconsole.log(matn.slice(0, 4));   // \"Java\" (0,1,2,3)\nconsole.log(matn.slice(4));      // \"Script\" (4-dan oxirigacha)\n\n// manfiy indeks — oxiridan sanaydi\nconsole.log(matn.slice(-6));     // \"Script\"\nconsole.log(matn.slice(-6, -3)); // \"Scr\"", file: "slice.js" },
        { p: "<code>substring(start, end)</code> ham o'xshash, lekin manfiy indekslarni <code>0</code> deb qabul qiladi va argumentlar tartibi teskari bo'lsa ularni almashtiradi. <code>substr(start, uzunlik)</code> esa eskirgan (deprecated) — ikkinchi argument uzunlik, imkon boricha ishlatmang." },
        { pg: "let matn = \"JavaScript\";\n\n// substring argumentlarni almashtira oladi\nconsole.log(matn.substring(4, 0));  // \"Java\" (slice'da bo'sh chiqardi)\nconsole.log(matn.slice(4, 0));      // \"\" (bo'sh)\n\n// substr: boshi va UZUNLIK\nconsole.log(matn.substr(4, 6));     // \"Script\"", file: "substring.js" },
        { note: "Uchtasidan <strong>slice</strong>ni yodda saqlash yetarli — u eng moslashuvchan (manfiy indekslar bilan) va massivlarda ham xuddi shunday ishlaydi." },

        { h2: "Satrlarni taqqoslash" },
        { p: "Satrlar belgilarning ichki raqamli kodlari (Unicode) bo'yicha taqqoslanadi. Shuning uchun taqqoslash ba'zan kutilmagan natija beradi — masalan, barcha katta harflar kichik harflardan \"kichik\" hisoblanadi:" },
        { pg: "// harflar Unicode kodi bo'yicha taqqoslanadi\nconsole.log(\"a\" > \"Z\");   // true (kichik harf kodi kattaroq)\nconsole.log(\"a\" < \"b\");   // true\n\n// belgining kodini olish\nconsole.log(\"A\".codePointAt(0));  // 65\nconsole.log(\"a\".codePointAt(0));  // 97", file: "taqqoslash.js" },
        { warn: "Turli tildagi harflarni to'g'ri (til qoidalari bo'yicha) taqqoslash uchun <code>str.localeCompare(str2)</code> ishlatiladi. U <code>-1</code>, <code>0</code> yoki <code>1</code> qaytaradi va milliy alifbolarni to'g'ri tartiblaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Satrlar uch tirnoqda yoziladi; teskari tirnoq (backtick) shablon satr va <code>${...}</code> beradi;",
          "Maxsus belgilar: <code>\\n</code> (yangi qator), <code>\\t</code> (tab), <code>\\\\</code>;",
          "<code>length</code> — uzunlik; <code>[i]</code> va <code>at(i)</code> — belgiga murojaat (<code>at</code> manfiy indeksni qo'llaydi);",
          "<code>toUpperCase</code>/<code>toLowerCase</code> — harf o'lchamini o'zgartiradi;",
          "Izlash: <code>indexOf</code>, va qulay <code>includes</code>/<code>startsWith</code>/<code>endsWith</code>;",
          "Ajratish: <code>slice</code> (tavsiya etiladi), <code>substring</code>, eskirgan <code>substr</code>;",
          "Satrlar Unicode kodi bo'yicha taqqoslanadi; milliy tartiblash uchun <code>localeCompare</code>."
        ] }
      ]
    },

    {
      slug: "massivlar",
      title: "Massivlar",
      blurb: "Tartiblangan ma'lumotlar to'plami: yaratish, indekslar, uzunlik, qo'shish/o'chirish metodlari va aylanish (loop).",
      body: [
        { lead: "Obyektlar ma'lumotni nomlar bilan saqlaydi. Ammo ko'pincha bizga <strong>tartiblangan</strong> to'plam kerak bo'ladi: ro'yxat, navbat, elementlar ketma-ketligi. Buning uchun <strong>massiv</strong> (array) maxsus tur mavjud." },

        { h2: "Massiv yaratish" },
        { p: "Massiv yaratishning ikki sintaksisi bor, lekin amalda deyarli har doim to'rtburchak qavs <code>[...]</code> ishlatiladi:" },
        { pg: "// bo'sh massiv\nlet bosh = [];\n\n// elementlar bilan\nlet mevalar = [\"olma\", \"nok\", \"uzum\"];\nconsole.log(mevalar);\n\n// massivda turli turdagi qiymatlar bo'la oladi\nlet aralash = [\"matn\", 42, true, null];\nconsole.log(aralash);", file: "massiv-yaratish.js" },

        { h2: "Indekslar orqali murojaat" },
        { p: "Massiv elementlari <strong>0 dan boshlab</strong> raqamlanadi. Bu raqam <strong>indeks</strong> deyiladi. Elementga to'rtburchak qavs orqali murojaat qilinadi:" },
        { pg: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\n\nconsole.log(mevalar[0]);  // \"olma\" (birinchi)\nconsole.log(mevalar[1]);  // \"nok\"\nconsole.log(mevalar[2]);  // \"uzum\" (oxirgi)\n\n// elementni o'zgartirish\nmevalar[1] = \"banan\";\nconsole.log(mevalar);  // [ 'olma', 'banan', 'uzum' ]\n\n// yangi element qo'shish\nmevalar[3] = \"anor\";\nconsole.log(mevalar);", file: "indeks.js" },
        { p: "Satrlardagi kabi, oxiridan sanash uchun <code>at()</code> metodini ishlatish mumkin — u manfiy indeksni qo'llaydi:" },
        { pg: "let sonlar = [10, 20, 30, 40];\n\nconsole.log(sonlar.at(-1));  // 40 (oxirgi)\nconsole.log(sonlar.at(-2));  // 30", file: "massiv-at.js" },

        { h2: "length — uzunlik" },
        { p: "<code>length</code> xususiyati massivdagi elementlar sonini beradi. Aniqrog'i, u eng katta indeksdan bittaga ko'p qiymatni qaytaradi:" },
        { pg: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\nconsole.log(mevalar.length);  // 3\n\n// length'ni o'zgartirsak massiv qisqaradi!\nmevalar.length = 2;\nconsole.log(mevalar);  // [ 'olma', 'nok' ] — \"uzum\" yo'qoldi\n\n// 0 qilsak — butunlay tozalanadi\nmevalar.length = 0;\nconsole.log(mevalar);  // []", file: "length.js" },
        { note: "<code>length</code>ga qiymat berish orqali massivni qisqartirish mumkin. Uni <code>0</code> qilish — massivni tozalashning eng oson yo'llaridan biri." },

        { h2: "Qo'shish va o'chirish metodlari" },
        { p: "Massiv \"navbat\" yoki \"stek\" sifatida ishlashi mumkin. Buning uchun to'rtta asosiy metod bor. Oxiri bilan ishlash tez, boshi bilan ishlash sekinroq." },
        { ul: [
          "<code>push(el)</code> — <strong>oxiriga</strong> element qo'shadi;",
          "<code>pop()</code> — <strong>oxirgi</strong> elementni oladi va o'chiradi;",
          "<code>unshift(el)</code> — <strong>boshiga</strong> element qo'shadi;",
          "<code>shift()</code> — <strong>birinchi</strong> elementni oladi va o'chiradi."
        ] },
        { pg: "let navbat = [\"a\", \"b\", \"c\"];\n\n// oxiriga qo'shish va olish\nnavbat.push(\"d\");\nconsole.log(navbat);       // [ 'a', 'b', 'c', 'd' ]\nconsole.log(navbat.pop()); // \"d\" (olindi va o'chdi)\nconsole.log(navbat);       // [ 'a', 'b', 'c' ]\n\n// boshiga qo'shish va olish\nnavbat.unshift(\"x\");\nconsole.log(navbat);         // [ 'x', 'a', 'b', 'c' ]\nconsole.log(navbat.shift()); // \"x\"\nconsole.log(navbat);         // [ 'a', 'b', 'c' ]", file: "push-pop.js" },
        { tip: "<code>push</code> va <code>pop</code> tez ishlaydi, chunki ular boshqa elementlarga tegmaydi. <code>shift</code> va <code>unshift</code> esa sekinroq, chunki qolgan barcha elementlarni surib chiqishga to'g'ri keladi." },

        { h2: "Massivning ichki tuzilishi" },
        { p: "Massiv aslida — bu maxsus turdagi <strong>obyekt</strong>. To'rtburchak qavs <code>arr[0]</code> obyekt sintaksisining qisqartmasidir. Massivni obyektdan ajratib turadigan narsa — tartiblangan sonli indekslar va <code>length</code> hamda maxsus metodlar." },
        { p: "Aynan shu \"obyekt\" tabiati tufayli massivni noto'g'ri ishlatib \"buzish\" mumkin. Massiv bilan faqat tartibli, sonli indekslar orqali ishlash kerak:" },
        { code: "let arr = [1, 2, 3];\n\n// bunday qilmang — massiv \"optimallashtirishini\" buzasiz:\narr.name = \"salom\";     // xususiyat qo'shish\narr[99] = \"uzoq\";        // katta bo'shliq (\"teshik\")\n// bunday hollarda dvigatel massivni oddiy obyektdek sekin ishlaydi" },
        { warn: "Massivni qo'lda \"nosonli\" indeks yoki katta bo'sh oraliqlar bilan ishlatmang. Aks holda JavaScript dvigateli uni maxsus tez massiv sifatida emas, oddiy sekin obyekt sifatida ishlaydi." },

        { h2: "Massiv bo'ylab aylanish (loop)" },
        { p: "Massiv elementlarini birma-bir ko'rib chiqishning ikki asosiy usuli bor. Birinchisi — klassik <code>for</code> sikli, unda indeks orqali murojaat qilamiz:" },
        { pg: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\n\n// klassik for — indeks orqali\nfor (let i = 0; i < mevalar.length; i++) {\n  console.log(i + \": \" + mevalar[i]);\n}", file: "for.js" },
        { p: "Ikkinchisi va qulayrog'i — <code>for..of</code> sikli. U to'g'ridan-to'g'ri elementlarning o'zini beradi, indeks bilan ovora bo'lmaysiz:" },
        { pg: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\n\n// for..of — to'g'ridan-to'g'ri element\nfor (let meva of mevalar) {\n  console.log(meva);\n}", file: "for-of.js" },
        { note: "Massivda <code>for..in</code> siklini <strong>ishlatmang</strong>. U obyektlar uchun mo'ljallangan va massivda sekinroq hamda ba'zan keraksiz xususiyatlarni ham aylanib chiqadi. Massiv uchun <code>for</code> yoki <code>for..of</code> ishlating." },

        { h2: "Ko'p o'lchamli massivlar" },
        { p: "Massiv elementlari ham massiv bo'lishi mumkin. Bunday tuzilma <strong>ko'p o'lchamli massiv</strong> deyiladi va, masalan, jadval yoki matritsani ifodalash uchun ishlatiladi:" },
        { pg: "// 3x3 matritsa\nlet matritsa = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\n\n// ikkita indeks: [qator][ustun]\nconsole.log(matritsa[0][0]);  // 1 (birinchi qator, birinchi ustun)\nconsole.log(matritsa[1][2]);  // 6\nconsole.log(matritsa[2][1]);  // 8", file: "matritsa.js" },

        { h2: "toString — matnga o'girish" },
        { p: "Massivda <code>toString</code> metodi bor — u elementlarni vergul bilan birlashtirib satr qaytaradi. Massiv satr bilan birlashtirilganda ham xuddi shu ro'y beradi:" },
        { pg: "let sonlar = [1, 2, 3];\n\nconsole.log(sonlar.toString());   // \"1,2,3\"\nconsole.log(String(sonlar));      // \"1,2,3\"\n\n// satr bilan birlashtirish avtomatik toString chaqiradi\nconsole.log(\"Ro'yxat: \" + sonlar);  // \"Ro'yxat: 1,2,3\"", file: "tostring.js" },
        { tip: "Elementlarni boshqa ajratuvchi bilan birlashtirish uchun <code>join</code> metodini ishlatishingiz mumkin: <code>[1,2,3].join(\" - \")</code> → <code>\"1 - 2 - 3\"</code>." },

        { h2: "Xulosa" },
        { ul: [
          "Massiv — <strong>tartiblangan</strong> to'plam, <code>[...]</code> bilan yaratiladi;",
          "Elementlar <strong>0 dan</strong> indekslanadi; murojaat <code>arr[i]</code> yoki <code>arr.at(-1)</code> (oxiridan);",
          "<code>length</code> — uzunlik; unga qiymat berib massivni qisqartirish/tozalash mumkin;",
          "<code>push/pop</code> — oxiri bilan (tez); <code>shift/unshift</code> — boshi bilan (sekinroq);",
          "Massiv — aslida maxsus obyekt; uni faqat sonli indekslar bilan ishlating;",
          "Aylanish uchun <code>for</code> yoki <code>for..of</code> (lekin <code>for..in</code> emas);",
          "Element massiv bo'lsa — ko'p o'lchamli massiv; <code>toString</code>/<code>join</code> matnga o'giradi."
        ] }
      ]
    }
  ]
};
