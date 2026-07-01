"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Muntazam ifodalar (RegExp)",
  lessons: [
    {
      slug: "regexp-kirish",
      title: "Muntazam ifodalar: kirish",
      blurb: "Muntazam ifoda (RegExp) nima, /pattern/flags sintaksisi, g/i/m/s/u/y flaglari, str.match, str.replace, str.search, regexp.test metodlari va regexp yaratishning ikki usuli.",
      body: [
        { lead: "<strong>Muntazam ifodalar</strong> (regular expressions, qisqacha <em>regexp</em> yoki <em>regex</em>) — matnda naqsh (pattern) bo'yicha qidirish va almashtirishning kuchli usulidir. Ular JavaScript'ga tilning o'zi orqali <code>RegExp</code> obyekti ko'rinishida chuqur singdirilgan va satrlarning bir qator metodlari bilan birgalikda ishlaydi. Ushbu darsda muntazam ifoda nima ekanligini, uni qanday yaratishni, flaglarini va asosiy metodlarini chuqur o'rganamiz." },

        { h2: "Muntazam ifoda nima?" },
        { p: "Muntazam ifoda — bu <strong>naqsh</strong>dan (pattern) va ixtiyoriy <strong>flaglar</strong>dan (flags) tashkil topgan matn qidiruv shabloni. Naqsh matnda nimani qidirayotganimizni tavsiflaydi, flaglar esa qidiruvni qanday amalga oshirishni sozlaydi." },
        { p: "JavaScript'da muntazam ifoda o'rnatilgan <code>RegExp</code> tipiga tegishli obyekt bo'lib, uni yaratishning ikki usuli mavjud." },

        { h2: "Regexp yaratishning ikki usuli" },
        { p: "Birinchi va eng keng tarqalgan usul — <strong>slash (qiya chiziq) sintaksisi</strong>. Naqsh ikkita qiya chiziq <code>/.../</code> orasiga yoziladi:" },
        { code: "let regexp = /naqsh/;         // flagsiz\nlet regexp2 = /naqsh/gmi;     // g, m, i flaglari bilan" },
        { p: "Ikkinchi usul — <strong>konstruktor sintaksisi</strong>. Naqsh satr ko'rinishida <code>new RegExp</code>ga uzatiladi:" },
        { code: "let regexp = new RegExp('naqsh');\nlet regexp2 = new RegExp('naqsh', 'gmi');" },
        { p: "Ikkalasi ham bir xil <code>RegExp</code> obyektini yaratadi. Asosiy farq: <strong>slash sintaksisi</strong> naqshni to'g'ridan-to'g'ri kod ichida yozishga imkon beradi va u <em>statik</em> — kod yozilayotganda naqsh aniq bo'lishi kerak. <strong>Konstruktor</strong> esa naqshni satr sifatida qabul qiladi, shu sabab u <em>dinamik</em> — naqshni ish vaqtida shakllantirishga imkon beradi." },
        { pg: "// naqshni dinamik shakllantirish\nlet nima = 'olma';\nlet regexp = new RegExp(nima);\n\nconsole.log('men olma yeyman'.match(regexp)[0]); // olma\n\n// slash sintaksisida bunday qilib bo'lmaydi:\n// /nima/ — bu literal 'nima' so'zini qidiradi, o'zgaruvchini emas", file: "dinamik-regexp.js" },
        { warn: "Konstruktorda naqsh satr bo'lgani uchun, unda <strong>ikkilangan backslash</strong> kerak bo'ladi. Masalan, <code>/\\d/</code> naqshini konstruktor orqali yozsangiz, <code>new RegExp('\\\\d')</code> deb yozishga to'g'ri keladi, chunki satr ichida <code>\\d</code> avval JavaScript satr eskeypi sifatida qayta ishlanadi. Slash sintaksisida bunday muammo yo'q." },

        { h2: "Flaglar" },
        { p: "Muntazam ifodalarning oltita flagi bor. Ular qidiruvning xatti-harakatini o'zgartiradi va ixtiyoriy tartibda birga yozilishi mumkin:" },
        { ul: [
          "<code>g</code> — <strong>global</strong> qidiruv: birinchi mos kelishdan keyin to'xtamasdan, barcha mosliklarni topadi;",
          "<code>i</code> — <strong>ignore case</strong>: katta-kichik harflarni farqlamaydi (<code>A</code> va <code>a</code> bir xil hisoblanadi);",
          "<code>m</code> — <strong>multiline</strong>: ko'p qatorli rejim (langarlar <code>^</code> va <code>$</code> ni ta'sirlaydi);",
          "<code>s</code> — <strong>dotall</strong> rejimi: nuqta <code>.</code> qatorga o'tish belgisini <code>\\n</code> ham qamrab oladi;",
          "<code>u</code> — <strong>unicode</strong>: to'liq unicode qo'llab-quvvatlashini yoqadi (surrogat juftliklarni to'g'ri ishlaydi);",
          "<code>y</code> — <strong>sticky</strong> (yopishqoq) rejim: aynan berilgan pozitsiyadan qidiradi."
        ] },
        { p: "Eng ko'p ishlatiladigan flaglar — <code>g</code> va <code>i</code>. Boshqalarini keyingi darslarda batafsil ko'rib chiqamiz." },
        { pg: "// i flagi — katta-kichik harflarni e'tiborsiz qoldiradi\nlet matn = 'Salom SALOM salom';\n\n// flagsiz — faqat aynan 'salom'\nconsole.log(matn.match(/salom/g)); // ['salom']\n\n// i flagi bilan — hammasi\nconsole.log(matn.match(/salom/gi)); // ['Salom', 'SALOM', 'salom']", file: "flag-i.js" },

        { h2: "str.search — pozitsiyani topish" },
        { p: "<code>str.search(regexp)</code> metodi birinchi moslikning <strong>pozitsiyasini</strong> (indeksini) qaytaradi, moslik topilmasa <code>-1</code> qaytaradi. U faqat birinchi moslikni qidiradi (<code>g</code> flagini e'tiborsiz qoldiradi)." },
        { pg: "let matn = 'JavaScript juda qiziqarli til';\n\nconsole.log(matn.search(/juda/));   // 11 (pozitsiya)\nconsole.log(matn.search(/Python/)); // -1 (topilmadi)", file: "search.js" },

        { h2: "regexp.test — moslik bor-yo'qligini tekshirish" },
        { p: "<code>regexp.test(str)</code> metodi satrda naqshga mos keluvchi qism <strong>bor-yo'qligini</strong> tekshiradi va <code>true</code> yoki <code>false</code> qaytaradi. U eng tez va sodda usul — faqat \"bormi yoki yo'qmi\" degan savolga javob kerak bo'lganda ishlatiladi." },
        { pg: "// e'tibor: bu yerda metod regexp obyektiga tegishli\nconsole.log(/dunyo/.test('salom dunyo'));  // true\nconsole.log(/kosmos/.test('salom dunyo')); // false\n\nlet regexp = /qush/i;\nconsole.log(regexp.test('QUSH uchdi'));    // true (i flagi tufayli)", file: "test.js" },

        { h2: "str.match — mosliklarni topish" },
        { p: "<code>str.match(regexp)</code> metodining xatti-harakati <code>g</code> flagining bor-yo'qligiga bog'liq — bu juda muhim nozik jihat." },
        { h3: "g flagisiz" },
        { p: "<code>g</code> flagi bo'lmasa, <code>str.match</code> faqat <strong>birinchi</strong> moslikni qaytaradi. Natija — massivsimon obyekt: <code>[0]</code> — topilgan matn, <code>index</code> — pozitsiya, <code>input</code> — asl satr:" },
        { pg: "let matn = 'Yil: 2026, oy: 07';\nlet natija = matn.match(/\\d+/); // g yo'q\n\nconsole.log(natija[0]);     // 2026 (birinchi moslik)\nconsole.log(natija.index);  // 5 (pozitsiya)\nconsole.log(natija.input);  // Yil: 2026, oy: 07", file: "match-birinchi.js" },
        { h3: "g flagi bilan" },
        { p: "<code>g</code> flagi bilan <code>str.match</code> barcha mosliklarni oddiy <strong>massiv</strong> ko'rinishida qaytaradi (pozitsiya va boshqa qo'shimcha ma'lumotsiz):" },
        { pg: "let matn = 'Yil: 2026, oy: 07, kun: 01';\nlet natija = matn.match(/\\d+/g); // g bor\n\nconsole.log(natija); // ['2026', '07', '01']", file: "match-hammasi.js" },
        { warn: "Agar moslik topilmasa, <code>str.match</code> massiv emas, <strong><code>null</code></strong> qaytaradi (bo'sh massiv emas!). Shu sabab natijani ishlatishdan oldin tekshirish yaxshi odat: <code>let m = str.match(...); if (m) { ... }</code>." },
        { pg: "let natija = 'faqat harflar'.match(/\\d+/g);\n\nconsole.log(natija); // null (bo'sh massiv EMAS)\n\n// xavfsiz ishlash usuli:\nlet raqamlar = 'faqat harflar'.match(/\\d+/g) || [];\nconsole.log(raqamlar.length); // 0", file: "match-null.js" },

        { h2: "str.replace — almashtirish" },
        { p: "<code>str.replace(regexp, replacement)</code> metodi mos kelgan qismlarni almashtiradi. <code>g</code> flagisiz faqat birinchi moslikni, <code>g</code> flagi bilan esa <strong>barcha</strong> mosliklarni almashtiradi:" },
        { pg: "let matn = 'olma-olma-olma';\n\n// g flagisiz — faqat birinchi\nconsole.log(matn.replace(/olma/, 'nok')); // nok-olma-olma\n\n// g flagi bilan — hammasi\nconsole.log(matn.replace(/olma/g, 'nok')); // nok-nok-nok", file: "replace.js" },
        { p: "Almashtiruvchi matnda maxsus belgilar ishlatish mumkin. Masalan, <code>$&amp;</code> — topilgan butun moslikni bildiradi:" },
        { pg: "let matn = 'Ali va Vali';\n\n// har bir topilgan ismni qavsga olamiz\nconsole.log(matn.replace(/\\w+/g, '[$&]'));\n// [Ali] [va] [Vali]", file: "replace-belgi.js" },
        { tip: "<code>str.replace</code>ning ikkinchi argumenti sifatida funksiya ham berish mumkin — u har bir moslik uchun chaqiriladi va uning qaytargan qiymati almashtiruvchi bo'ladi. Bu murakkab, kontekstga bog'liq almashtirishlar uchun juda foydali." },
        { pg: "let matn = 'narx: 100, chegirma: 50';\n\n// har bir sonni ikki barobar oshiramiz\nlet natija = matn.replace(/\\d+/g, function(son) {\n  return Number(son) * 2;\n});\n\nconsole.log(natija); // narx: 200, chegirma: 100", file: "replace-funksiya.js" },

        { h2: "Xulosa" },
        { ul: [
          "Muntazam ifoda — naqsh va flaglardan iborat qidiruv shabloni; <code>/naqsh/flaglar</code> yoki <code>new RegExp('naqsh', 'flaglar')</code> orqali yaratiladi;",
          "asosiy flaglar: <code>g</code> (global), <code>i</code> (harf farqsiz), <code>m</code>, <code>s</code>, <code>u</code>, <code>y</code>;",
          "<code>regexp.test(str)</code> — moslik bor-yo'qligini <code>true/false</code> qaytaradi;",
          "<code>str.search(regexp)</code> — birinchi moslik pozitsiyasi yoki <code>-1</code>;",
          "<code>str.match(regexp)</code> — <code>g</code> flagisiz birinchi moslik (index bilan), <code>g</code> bilan hamma mosliklar massivi; moslik yo'q bo'lsa <code>null</code>;",
          "<code>str.replace(regexp, ...)</code> — almashtirish; <code>g</code> flagi hamma mosliklarga ta'sir qiladi; ikkinchi argument funksiya ham bo'lishi mumkin."
        ] }
      ]
    },

    {
      slug: "regexp-belgilar",
      title: "Belgilar sinflari",
      blurb: "Belgi sinflari \\d \\D \\s \\S \\w \\W, ularning teskarilari, nuqta (.) va s flagi, unicode haqida qisqacha hamda telefon raqamini ajratish kabi amaliy misollar.",
      body: [
        { lead: "<strong>Belgi sinfi</strong> (character class) — muntazam ifodada belgilarning ma'lum bir <em>turini</em> bildiruvchi maxsus yozuv. Masalan, \"istalgan raqam\" yoki \"istalgan bo'shliq belgisi\". Belgi sinflari muntazam ifodalarning eng ko'p ishlatiladigan qismlaridan biridir. Ushbu darsda barcha asosiy belgi sinflarini, nuqta belgisini va ularni amaliy misollarda qo'llashni o'rganamiz." },

        { h2: "Belgi sinfi nima?" },
        { p: "Ba'zan biz aniq bir belgini emas, balki butun bir <em>toifadagi</em> belgini qidiramiz. Masalan, telefon raqamidagi barcha raqamlarni topmoqchimiz, ammo qaysi raqamlar ekanini oldindan bilmaymiz. Aynan shunday holatlarda belgi sinflari yordamga keladi." },
        { p: "Eng muhim belgi sinfi — <strong>raqam (digit)</strong>. U <code>\\d</code> deb yoziladi va istalgan bitta raqamga (0 dan 9 gacha) mos keladi:" },
        { pg: "let telefon = '+998 90 123 45 67';\n\n// birinchi raqamni topamiz\nconsole.log(telefon.match(/\\d/)[0]); // 9\n\n// hamma raqamlarni topamiz (g flagi bilan)\nconsole.log(telefon.match(/\\d/g).join(''));\n// 998901234567", file: "digit.js" },

        { h2: "Asosiy belgi sinflari" },
        { p: "JavaScript'da uchta asosiy belgi sinfi va ularning har biri uchun <strong>teskari</strong> (inkor) varianti mavjud:" },
        { ul: [
          "<code>\\d</code> — <strong>raqam</strong> (digit): 0 dan 9 gacha bo'lgan belgi;",
          "<code>\\D</code> — <strong>raqam bo'lmagan</strong>: <code>\\d</code>dan tashqari istalgan belgi;",
          "<code>\\s</code> — <strong>bo'shliq belgisi</strong> (space): probel, tabulyatsiya <code>\\t</code>, qatorga o'tish <code>\\n</code> va shu kabilar;",
          "<code>\\S</code> — <strong>bo'shliq bo'lmagan</strong>: <code>\\s</code>dan tashqari istalgan belgi;",
          "<code>\\w</code> — <strong>so'z belgisi</strong> (word): lotin harfi, raqam yoki pastki chiziq <code>_</code> (ya'ni <code>[a-zA-Z0-9_]</code>);",
          "<code>\\W</code> — <strong>so'z belgisi bo'lmagan</strong>: <code>\\w</code>dan tashqari istalgan belgi."
        ] },
        { note: "Diqqat qiling: <strong>katta harfli</strong> variant har doim <em>teskari</em> ma'noni bildiradi. Ya'ni <code>\\d</code> raqam bo'lsa, <code>\\D</code> — raqam <em>bo'lmagan</em> hamma narsa. Bu qoida barcha juftliklar uchun amal qiladi." },
        { pg: "let matn = 'A1 b2';\n\nconsole.log(matn.match(/\\d/g)); // ['1', '2'] — raqamlar\nconsole.log(matn.match(/\\D/g)); // ['A', ' ', 'b'] — raqam emaslar\nconsole.log(matn.match(/\\s/g)); // [' '] — bo'shliq\nconsole.log(matn.match(/\\w/g)); // ['A', '1', 'b', '2'] — so'z belgilari", file: "sinflar.js" },

        { h2: "Nuqta (.) — istalgan belgi" },
        { p: "Nuqta <code>.</code> — bu maxsus belgi sinfi bo'lib, <strong>qatorga o'tish belgisidan tashqari istalgan bitta belgiga</strong> mos keladi:" },
        { pg: "// C, keyin istalgan belgi, keyin T\nconsole.log('CAT'.match(/C.T/)[0]); // CAT\nconsole.log('C9T'.match(/C.T/)[0]); // C9T\nconsole.log('C.T'.match(/C.T/)[0]); // C.T\n\n// lekin ikki belgi bo'lsa — mos kelmaydi\nconsole.log('CATT'.match(/^C.T$/)); // null", file: "nuqta.js" },
        { warn: "Nuqta <em>istalgan</em> belgiga mos keladi, lekin odatiy holda <strong>qatorga o'tish belgisi</strong> <code>\\n</code> ga mos <strong>kelmaydi</strong>. Shuning uchun ko'p qatorli matnda nuqta bir qator ichida qoladi." },
        { pg: "// nuqta \\n ga mos kelmaydi\nlet matn = 'A\\nB';\nconsole.log(matn.match(/A.B/)); // null", file: "nuqta-newline.js" },

        { h2: "s flagi — nuqta har qanday belgiga" },
        { p: "Agar nuqta qatorga o'tish belgisini ham qamrab olishini istasangiz, <code>s</code> (dotall) flagini qo'shing. U bilan nuqta <strong>haqiqatan ham istalgan belgiga</strong>, jumladan <code>\\n</code> ga ham mos keladi:" },
        { pg: "let matn = 'A\\nB';\n\n// s flagisiz — mos kelmaydi\nconsole.log(matn.match(/A.B/)); // null\n\n// s flagi bilan — mos keladi\nconsole.log(matn.match(/A.B/s)[0]); // 'A\\nB' (ichida yangi qator)", file: "s-flag.js" },
        { tip: "Agar muhitingizda negadir <code>s</code> flagi qo'llab-quvvatlanmasa, uning muqobili sifatida <code>[\\s\\S]</code> yozuvini ishlatish mumkin — u \"bo'shliq belgisi YOKI bo'shliq bo'lmagan belgi\" degani bo'lib, amalda mutlaqo istalgan belgiga mos keladi." },
        { pg: "let matn = 'A\\nB';\n\n// [\\s\\S] — mutlaqo istalgan belgi (s flagisiz ham ishlaydi)\nconsole.log(matn.match(/A[\\s\\S]B/)[0]); // 'A\\nB'", file: "s-muqobil.js" },

        { h2: "Unicode haqida qisqacha" },
        { p: "Belgi sinflari birinchi navbatda ASCII (lotin) belgilariga mo'ljallangan. Masalan, <code>\\w</code> faqat lotin harflari, raqamlar va <code>_</code> ga mos keladi — o'zbek, kirill yoki boshqa alifbolarga <strong>mos kelmaydi</strong>:" },
        { pg: "// \\w kirill/o'zbek harflarini qamramaydi\nconsole.log('Salom'.match(/\\w/g)); // ['S', 'a', 'l', 'o', 'm'] — lotin OK\nconsole.log('Привет'.match(/\\w/g)); // null — kirill mos kelmaydi", file: "unicode-w.js" },
        { note: "To'liq unicode qo'llab-quvvatlash uchun <code>u</code> flagi va unicode xossalari (masalan <code>\\p{L}</code> — istalgan alifbodagi harf) ishlatiladi. Bu ilg'or mavzu bo'lib, alohida darsda batafsil ko'rib chiqiladi. Hozircha shuni yodda tuting: <code>\\w</code> — bu faqat lotin so'z belgilari." },

        { h2: "Amaliy misol: telefon raqamini ajratish" },
        { p: "Endi belgi sinflarini amaliyotda qo'llaymiz. Foydalanuvchi telefon raqamini turli formatlarda kiritishi mumkin — probellar, chiziqchalar, qavslar bilan. Bizga esa faqat raqamlar kerak. <code>\\d</code> va <code>g</code> flagi bu vazifani oson hal qiladi:" },
        { pg: "let kirim = '+998 (90) 123-45-67';\n\n// faqat raqamlarni ajratib olamiz\nlet raqamlar = kirim.match(/\\d/g).join('');\n\nconsole.log(raqamlar); // 998901234567\nconsole.log('Uzunligi:', raqamlar.length); // 12", file: "telefon-ajratish.js" },
        { p: "Aksincha, biz raqam bo'lmagan barcha belgilarni <strong>o'chirib</strong> tashlashimiz ham mumkin — buning uchun <code>\\D</code> (raqam bo'lmagan) sinfini <code>replace</code> bilan ishlatamiz:" },
        { pg: "let kirim = '+998 (90) 123-45-67';\n\n// raqam bo'lmagan hamma narsani o'chiramiz\nlet toza = kirim.replace(/\\D/g, '');\n\nconsole.log(toza); // 998901234567", file: "telefon-tozalash.js" },
        { p: "Yana bir amaliy vazifa — matndan barcha \"so'z\"larni ajratib olish. Buning uchun <code>\\w+</code> naqshi ishlatiladi (bu yerda <code>+</code> — \"bir yoki undan ko'p\" belgisi, uni keyingi darslarda o'rganamiz):" },
        { pg: "let jumla = 'Bugun havo issiq, ammo shamol bor';\n\n// har bir so'zni ketma-ket \\w belgilaridan iborat deb olamiz\nlet sozlar = jumla.match(/\\w+/g);\n\nconsole.log(sozlar);\n// ['Bugun', 'havo', 'issiq', 'ammo', 'shamol', 'bor']\nconsole.log('Sozlar soni:', sozlar.length); // 6", file: "sozlarni-ajratish.js" },

        { h2: "Bo'shliq belgisiga e'tibor" },
        { p: "Ko'pchilik <code>\\s</code> (bo'shliq) belgisini e'tiborsiz qoldiradi, ammo u juda muhim. Bo'shliq nafaqat probel, balki tabulyatsiya va qatorga o'tish belgilarini ham o'z ichiga oladi — matnni to'g'ri tozalashda buni hisobga olish kerak:" },
        { pg: "let matn = 'so\\tz   bo\\nsh liq';\n\n// barcha bo'shliq belgilarini bitta probelga almashtiramiz\nlet natija = matn.replace(/\\s+/g, ' ');\n\nconsole.log(natija); // so z bo sh liq", file: "bosliq.js" },

        { h2: "Xulosa" },
        { ul: [
          "belgi sinflari belgilarning ma'lum turiga mos keladi: <code>\\d</code> (raqam), <code>\\s</code> (bo'shliq), <code>\\w</code> (so'z belgisi);",
          "katta harfli variantlar teskari ma'noni bildiradi: <code>\\D</code>, <code>\\S</code>, <code>\\W</code>;",
          "nuqta <code>.</code> qatorga o'tishdan tashqari istalgan belgiga mos keladi; <code>s</code> flagi bilan esa <code>\\n</code> ga ham mos keladi;",
          "<code>[\\s\\S]</code> — <code>s</code> flagisiz ham istalgan belgiga mos keluvchi muqobil yozuv;",
          "<code>\\w</code> faqat lotin harflari, raqamlar va <code>_</code> ga mos keladi; to'liq unicode uchun <code>u</code> flagi va <code>\\p{...}</code> kerak;",
          "amaliyotda <code>\\d</code> va <code>\\D</code> yordamida telefon raqamlarini tozalash, <code>\\w+</code> bilan so'zlarni ajratish juda qulay."
        ] }
      ]
    },

    {
      slug: "regexp-anchor",
      title: "Langarlar: ^ va $, ko'p qatorli rejim",
      blurb: "Boshlanish langari ^, tugash langari $, to'liq moslikni tekshirish, ko'p qatorli m rejimi va so'z chegarasi \\b.",
      body: [
        { lead: "<strong>Langarlar</strong> (anchors) — muntazam ifodada belgiga emas, balki <em>pozitsiyaga</em> mos keluvchi maxsus belgilardir. Ular hech qanday belgini \"iste'mol qilmaydi\", faqat satrning boshi, oxiri yoki so'z chegarasi kabi maxsus joylarni belgilaydi. Ushbu darsda <code>^</code>, <code>$</code> langarlarini, ko'p qatorli rejimni va so'z chegarasi <code>\\b</code>ni chuqur o'rganamiz." },

        { h2: "Langar nima?" },
        { p: "Oddiy belgi sinflari (<code>\\d</code>, <code>\\w</code> va h.k.) belgiga mos keladi. Langarlar esa <strong>pozitsiyaga</strong> mos keladi. Ular quyidagilar:" },
        { ul: [
          "<code>^</code> (karet) — matnning <strong>boshiga</strong> mos keladi;",
          "<code>$</code> (dollar) — matnning <strong>oxiriga</strong> mos keladi."
        ] },
        { p: "Boshqacha aytganda, <code>^</code> \"bu yerdan naqsh <em>boshlanishi</em> kerak\", <code>$</code> esa \"bu yerda naqsh <em>tugashi</em> kerak\" deganidir." },

        { h2: "^ — matnning boshi" },
        { p: "Karet <code>^</code> naqsh matnning aynan <strong>boshidan</strong> boshlanishini talab qiladi:" },
        { pg: "// matn 'Salom' bilan boshlanadimi?\nconsole.log(/^Salom/.test('Salom dunyo')); // true\nconsole.log(/^Salom/.test('Ha, Salom'));   // false — boshida emas\n\n// pozitsiyani ko'ramiz\nconsole.log('Salom dunyo'.match(/^Salom/)[0]); // Salom", file: "karet.js" },

        { h2: "$ — matnning oxiri" },
        { p: "Dollar <code>$</code> naqsh matnning aynan <strong>oxiriga</strong> to'g'ri kelishini talab qiladi:" },
        { pg: "// matn 'dunyo' bilan tugaydimi?\nconsole.log(/dunyo$/.test('Salom dunyo')); // true\nconsole.log(/dunyo$/.test('dunyo bor'));   // false — oxirida emas\n\nconsole.log('Salom dunyo'.match(/dunyo$/)[0]); // dunyo", file: "dollar.js" },

        { h2: "To'liq moslikni tekshirish: ^...$" },
        { p: "<code>^</code> va <code>$</code> ni <strong>birga</strong> ishlatish juda kuchli usul — u naqsh butun matnga <em>to'liq</em> mos kelishini tekshiradi, ya'ni matnning bir qismiga emas, balki hammasiga. Bu forma tekshiruvida (validatsiya) juda muhim:" },
        { pg: "// faqat raqamlardan iborat matnmi? (validatsiya)\nlet regexp = /^\\d+$/;\n\nconsole.log(regexp.test('12345'));   // true — hammasi raqam\nconsole.log(regexp.test('123a45')); // false — harf bor\nconsole.log(regexp.test(''));        // false — kamida bitta raqam kerak\nconsole.log(regexp.test('12 45'));   // false — probel bor", file: "toliq-moslik.js" },
        { note: "<code>^\\d+$</code> naqshini so'z bilan o'qib ko'ring: \"boshidan (<code>^</code>), bir yoki undan ko'p raqam (<code>\\d+</code>), keyin darrov oxir (<code>$</code>)\". Ya'ni matn faqat raqamlardan iborat bo'lishi shart. Bu forma tekshiruvining klassik naqshidir." },
        { pg: "// oddiy vaqt formatini tekshirish: SS:DD\nlet vaqtRegexp = /^\\d\\d:\\d\\d$/;\n\nconsole.log(vaqtRegexp.test('12:30')); // true\nconsole.log(vaqtRegexp.test('9:30'));  // false — bitta raqam\nconsole.log(vaqtRegexp.test('12:300')); // false — ortiqcha raqam", file: "vaqt-validatsiya.js" },

        { h2: "m flagi — ko'p qatorli rejim" },
        { p: "Odatiy holda <code>^</code> va <code>$</code> butun matnning <strong>boshi va oxiriga</strong> mos keladi, matn ichidagi qator uzilishlarini hisobga olmaydi. <code>m</code> (multiline) flagi bu xatti-harakatni o'zgartiradi: <code>^</code> va <code>$</code> endi <strong>har bir qatorning</strong> boshi va oxiriga mos keladi." },
        { p: "Avval flagsiz holatni ko'ramiz — faqat birinchi qator boshiga mos keladi:" },
        { pg: "let matn = '1-qator\\n2-qator\\n3-qator';\n\n// m flagisiz — faqat butun matn boshidagi raqam\nconsole.log(matn.match(/^\\d/g)); // ['1']", file: "m-flagsiz.js" },
        { p: "Endi <code>m</code> flagi bilan — har bir qator boshidagi raqamlar topiladi:" },
        { pg: "let matn = '1-qator\\n2-qator\\n3-qator';\n\n// m flagi bilan — har qator boshidagi raqam\nconsole.log(matn.match(/^\\d/gm)); // ['1', '2', '3']", file: "m-flag.js" },
        { p: "Xuddi shunday, <code>$</code> ham <code>m</code> flagi bilan har bir qator oxiriga mos keladi:" },
        { pg: "let matn = 'olma1\\nnok2\\nuzum3';\n\n// har qator oxiridagi raqam\nconsole.log(matn.match(/\\d$/gm)); // ['1', '2', '3']", file: "m-dollar.js" },
        { tip: "<code>m</code> flagini <code>s</code> flagi bilan aralashtirib yubormang. <code>m</code> — <code>^</code> va <code>$</code> langarlarining har qatorga ta'sirini yoqadi. <code>s</code> — nuqta <code>.</code> ning <code>\\n</code> ga mos kelishini yoqadi. Ular butunlay boshqa vazifalarni bajaradi." },

        { h2: "\\b — so'z chegarasi" },
        { p: "<code>\\b</code> — bu <strong>so'z chegarasi</strong> (word boundary) langari. U so'z belgisi (<code>\\w</code>) va so'z belgisi bo'lmagan belgi (<code>\\W</code>) orasidagi pozitsiyaga mos keladi. Boshqacha aytganda, u \"so'zning boshi yoki oxiri\" degan joyni belgilaydi." },
        { p: "So'z chegarasi uchta holatda mavjud bo'ladi:" },
        { ul: [
          "matn boshida, agar birinchi belgi so'z belgisi (<code>\\w</code>) bo'lsa;",
          "matn oxirida, agar oxirgi belgi so'z belgisi bo'lsa;",
          "matn ichida, so'z belgisi va so'z bo'lmagan belgi tutashgan joyda."
        ] },
        { pg: "let matn = 'Men olma yeyman';\n\n// aynan 'olma' so'zini topamiz (qism emas)\nconsole.log(matn.match(/\\bolma\\b/)); // ['olma', index: 4, ...]\n\n// 'ol' esa so'z chegarasida tugamaydi\nconsole.log('olma'.match(/\\bol\\b/)); // null", file: "b-chegara.js" },
        { p: "<code>\\b</code> ning eng foydali jihati — u <strong>so'zning bir qismini</strong> emas, balki <em>butun so'zni</em> topishga imkon beradi. Masalan, <code>Java</code> so'zini <code>JavaScript</code> ichidan ajratamiz:" },
        { pg: "let matn = 'Java va JavaScript';\n\n// \\b bilan — faqat mustaqil 'Java' so'zi\nconsole.log(matn.match(/\\bJava\\b/g)); // ['Java']\n\n// \\b siz — 'JavaScript' ichidagi 'Java' ham topiladi\nconsole.log(matn.match(/Java/g)); // ['Java', 'Java']", file: "b-butun-soz.js" },
        { warn: "<code>\\b</code> raqamlar bilan ham ishlaydi (chunki raqam ham <code>\\w</code> ga kiradi), lekin u lotin bo'lmagan alifbolarda (kirill, o'zbek maxsus harflari) kutilganidek ishlamaydi, chunki <code>\\w</code> ularni so'z belgisi deb hisoblamaydi." },
        { pg: "// raqamlar bilan \\b ishlaydi\nconsole.log('bir 25 uch'.match(/\\b\\d+\\b/)); // ['25', ...]\n\n// chegarani so'z bilan izohlash:\n// probel/matn oxiri bilan o'ralgan raqam guruhi", file: "b-raqam.js" },

        { h2: "Amaliy misol: so'zni almashtirish" },
        { p: "<code>\\b</code> va langarlarni birga ishlatib, matndagi aynan kerakli so'zni xavfsiz almashtirish mumkin — so'zning boshqa so'zlar ichiga kirib ketgan qismlariga tegmasdan:" },
        { pg: "let matn = 'kot kotlet kotel';\n\n// faqat mustaqil 'kot' so'zini almashtiramiz\nlet natija = matn.replace(/\\bkot\\b/g, 'MUSHUK');\n\nconsole.log(natija); // MUSHUK kotlet kotel", file: "b-almashtirish.js" },

        { h2: "Xulosa" },
        { ul: [
          "langarlar belgiga emas, <strong>pozitsiyaga</strong> mos keladi va hech qanday belgini iste'mol qilmaydi;",
          "<code>^</code> — matn (yoki <code>m</code> flagida qator) boshi; <code>$</code> — matn (yoki qator) oxiri;",
          "<code>^...$</code> birga — naqsh butun matnga <strong>to'liq</strong> mos kelishini tekshiradi (validatsiya uchun ideal);",
          "<code>m</code> (multiline) flagi <code>^</code> va <code>$</code> ni har bir qatorning boshi/oxiriga mos qiladi;",
          "<code>\\b</code> — so'z chegarasi; <code>\\w</code> va <code>\\W</code> tutashgan joyga mos keladi va butun so'zni topishga yordam beradi;",
          "<code>\\b</code> lotin harflari va raqamlar bilan ishlaydi, lekin lotin bo'lmagan alifbolarda ishonchli emas."
        ] }
      ]
    }
  ]
};
