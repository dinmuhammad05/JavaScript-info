"use strict";

module.exports = {
  part: "6-qism: Frontend asoslari",
  chapter: "CSS",
  lessons: [
    {
      slug: "css-nima",
      title: "CSS nima?",
      blurb: "CSS — veb-sahifalarni bezash tili. Sintaksis (selektor { xossa: qiymat; }), CSS'ni HTML'ga ulash usullari (inline, internal, external), asosiy selektorlar (element, class, id), ularni kombinatsiyalash va spetsifiklik tushunchasi.",
      body: [
        { lead: "<strong>CSS</strong> (Cascading Style Sheets — \"kaskadli uslublar jadvali\") — veb-sahifaning <strong>tashqi ko'rinishini</strong> boshqaradigan til. Agar HTML sahifaning \"skeleti\" (matn, tugmalar, rasmlar) bo'lsa, CSS uning \"kiyimi\" — ranglar, shriftlar, joylashuv, masofalar va animatsiyalar. Ushbu darsda CSS nima ekanligini, u qanday yozilishini va HTML bilan qanday bog'lanishini noldan o'rganamiz." },

        { note: "Bu bob — <strong>brauzer</strong> muhitiga oid. Bu yerdagi barcha misollar HTML va CSS kodidan iborat. Ularni tushunib o'qing va o'z kompyuteringizda oddiy <code>.html</code> fayl yaratib, brauzerda ochib sinab ko'ring. Barcha kod bloklari <strong>statik</strong> — ya'ni namuna sifatida keltirilgan." },

        { h2: "CSS nega kerak?" },
        { p: "HTML'ning o'zi bilan ham sahifa yaratish mumkin, lekin u juda oddiy va bir xil ko'rinadi: qora matn, oq fon, ko'k havolalar. HTML'ning vazifasi — <strong>mazmun va tuzilma</strong> (bu — sarlavha, bu — paragraf, bu — ro'yxat). CSS'ning vazifasi esa — <strong>ko'rinish</strong> (sarlavha qanday rangda, qanchalik katta, qayerda joylashgan)." },
        { p: "Bu ikkisini ajratib turish juda muhim tamoyil. Mazmun (HTML) va bezak (CSS) alohida bo'lgani uchun, siz bir xil HTML'ni turlicha bezashingiz yoki barcha sahifalar uchun bitta CSS faylini ishlatishingiz mumkin. Bu kodni tartibli va oson boshqariladigan qiladi." },
        { ul: [
          "<strong>HTML</strong> — <em>nima</em> ko'rsatilishi (mazmun va tuzilma);",
          "<strong>CSS</strong> — <em>qanday</em> ko'rsatilishi (rang, shrift, joylashuv);",
          "<strong>JavaScript</strong> — <em>qanday harakat qilishi</em> (bosishga javob, o'zgarishlar)."
        ] },

        { h2: "CSS sintaksisi: qoida (rule)" },
        { p: "CSS eng kichik birligi — <strong>qoida (rule)</strong>. Har bir qoida ikki qismdan iborat: <strong>selektor</strong> (nimani bezamoqchisiz) va <strong>e'lonlar bloki</strong> (qanday bezamoqchisiz). E'lonlar bloki jingalak qavslar <code>{ }</code> ichida yoziladi." },
        { code: [
          "selektor {",
          "  xossa: qiymat;",
          "  xossa: qiymat;",
          "}"
        ].join("\n") },
        { p: "Har bir <strong>e'lon (declaration)</strong> ikki qismdan iborat: <strong>xossa (property)</strong> — nimani o'zgartirmoqchisiz (masalan, rang), va <strong>qiymat (value)</strong> — qanday qilib (masalan, qizil). Ular orasida <strong>ikki nuqta</strong> <code>:</code>, oxirida esa <strong>nuqtali vergul</strong> <code>;</code> qo'yiladi." },
        { code: [
          "p {",
          "  color: red;",
          "  font-size: 18px;",
          "  text-align: center;",
          "}"
        ].join("\n") },
        { p: "Yuqoridagi qoida shunday o'qiladi: \"Barcha <code>&lt;p&gt;</code> (paragraf) elementlarining <strong>matn rangi</strong> qizil, <strong>shrift o'lchami</strong> 18 piksel va <strong>matni markazda</strong> tekislangan bo'lsin\"." },
        { tip: "Oxirgi e'londan keyin nuqtali vergul (<code>;</code>) qo'yish shart emas, lekin har doim qo'yish yaxshi odat. Chunki keyinchalik yangi e'lon qo'shsangiz, unutib qolish xatosi kelib chiqmaydi." },

        { h2: "CSS'ni HTML'ga ulashning 3 usuli" },
        { p: "CSS'ni HTML sahifaga bog'lashning uchta usuli bor. Har birining o'z o'rni bor, lekin amalda deyarli har doim uchinchi usul (external) ishlatiladi." },

        { h3: "1. Inline (element ichida)" },
        { p: "CSS to'g'ridan-to'g'ri HTML elementining <code>style</code> atributi ichida yoziladi. Bu faqat o'sha bitta elementga ta'sir qiladi." },
        { code: '<p style="color: blue; font-size: 20px;">Ko\'k matn</p>' },
        { warn: "Inline uslub — eng yomon usul. U mazmun bilan bezakni aralashtirib yuboradi, qayta ishlatib bo'lmaydi va kodni o'qishni qiyinlashtiradi. Undan faqat juda zarur bo'lganda (masalan, JavaScript orqali dinamik o'zgartirishda) foydalaning." },

        { h3: "2. Internal (sahifa ichida)" },
        { p: "CSS HTML faylning <code>&lt;head&gt;</code> qismidagi <code>&lt;style&gt;</code> tegi ichida yoziladi. Bu butun sahifaga ta'sir qiladi, lekin faqat shu bitta faylda ishlaydi." },
        { code: [
          "<!DOCTYPE html>",
          "<html>",
          "<head>",
          "  <style>",
          "    p {",
          "      color: green;",
          "      font-size: 18px;",
          "    }",
          "  </style>",
          "</head>",
          "<body>",
          "  <p>Yashil matn</p>",
          "</body>",
          "</html>"
        ].join("\n") },
        { note: "Internal uslub kichik, bitta sahifalik loyihalarda yoki tez sinash uchun qulay. Lekin ko'p sahifali saytda har bir faylga alohida yozish kerak bo'lib, takrorlanish yuzaga keladi." },

        { h3: "3. External (tashqi fayl) — eng yaxshi usul" },
        { p: "CSS alohida <code>.css</code> faylida saqlanadi va HTML'ga <code>&lt;link&gt;</code> tegi orqali ulanadi. Bir CSS faylni <strong>cheksiz ko'p</strong> HTML sahifaga ulash mumkin." },
        { code: '<link rel="stylesheet" href="style.css">' },
        { p: "Bu qator HTML faylning <code>&lt;head&gt;</code> qismiga yoziladi. <code>href</code> — CSS faylining manzili (yo'li). Endi <code>style.css</code> faylining o'zida odatiy CSS qoidalarini yozasiz:" },
        { code: [
          "/* style.css fayli */",
          "body {",
          "  background-color: #f0f0f0;",
          "  font-family: Arial, sans-serif;",
          "}",
          "",
          "p {",
          "  color: #333333;",
          "}"
        ].join("\n") },
        { tip: "Deyarli har doim <strong>external</strong> usulni tanlang. Uning afzalliklari: bezak mazmundan ajratilgan, bitta faylni ko'p sahifada ishlatasiz, brauzer CSS faylni bir marta yuklab olib keshlaydi (tezlashadi) va kodni boshqarish osonlashadi." },
        { note: "CSS'da izoh (comment) <code>/* ... */</code> ko'rinishida yoziladi. U bir qatorli ham, ko'p qatorli ham bo'lishi mumkin. Izohlar brauzer tomonidan e'tiborga olinmaydi, faqat dasturchi uchun eslatma sifatida xizmat qiladi." },

        { h2: "Asosiy selektorlar" },
        { p: "Selektor — CSS qoidasi qaysi elementlarga qo'llanishini belgilaydi. Uch xil asosiy selektor bor, ularni yaxshi o'zlashtirish CSS'ning yarmini bilish demakdir." },

        { h3: "Element (teg) selektori" },
        { p: "Element nomi bo'yicha tanlaydi. Masalan, <code>p</code> selektori sahifadagi <strong>barcha</strong> <code>&lt;p&gt;</code> elementlariga ta'sir qiladi." },
        { code: [
          "h1 {",
          "  color: navy;",
          "}",
          "",
          "a {",
          "  text-decoration: none;",
          "}"
        ].join("\n") },

        { h3: "Class (sinf) selektori — nuqta (.)" },
        { p: "Class selektori nuqta bilan boshlanadi (<code>.nom</code>) va HTML'da <code>class</code> atributi orqali qo'llaniladi. Bitta class'ni <strong>ko'p</strong> elementga berish mumkin — bu eng ko'p ishlatiladigan selektor." },
        { code: [
          "/* CSS */",
          ".tugma {",
          "  background-color: dodgerblue;",
          "  color: white;",
          "  padding: 10px;",
          "}"
        ].join("\n") },
        { code: [
          "<!-- HTML -->",
          '<button class="tugma">Yubor</button>',
          '<a class="tugma">Havola</a>'
        ].join("\n") },
        { note: "Bir elementga <strong>bir nechta</strong> class berish mumkin, ular bo'sh joy bilan ajratiladi: <code>&lt;div class=\"karta katta ko'k\"&gt;</code>. Bu holda elementga uchta class ham qo'llaniladi." },

        { h3: "Id (identifikator) selektori — panjara (#)" },
        { p: "Id selektori panjara belgisi bilan boshlanadi (<code>#nom</code>) va HTML'da <code>id</code> atributi orqali qo'llaniladi. <strong>Id sahifada faqat bitta bo'lishi kerak</strong> — u noyob (unique) identifikator." },
        { code: [
          "/* CSS */",
          "#asosiy-sarlavha {",
          "  font-size: 40px;",
          "  color: black;",
          "}"
        ].join("\n") },
        { code: '<h1 id="asosiy-sarlavha">Salom dunyo</h1>' },
        { tip: "Amalda bezash uchun ko'pincha <strong>class</strong> ishlatiladi, id emas. Sababi: class qayta ishlatiluvchan, id esa juda \"kuchli\" (yuqori spetsifiklikka ega) bo'lgani uchun keyinchalik uni bekor qilish qiyin bo'ladi. Id'lar ko'proq JavaScript uchun yoki sahifa ichidagi havolalar (anchor) uchun ishlatiladi." },

        { h2: "Selektorlarni kombinatsiyalash" },
        { p: "Selektorlarni birlashtirib, aniqroq nishonlash mumkin. Bir nechta muhim kombinatsiyalar:" },
        { ul: [
          "<strong>Guruh</strong> — <code>h1, h2, h3 { }</code> — vergul bilan ajratilgan, uch element ham bir xil uslub oladi;",
          "<strong>Avlod (descendant)</strong> — <code>div p { }</code> — bo'sh joy bilan, <code>div</code> ichidagi barcha <code>p</code>'larni tanlaydi;",
          "<strong>Bevosita farzand</strong> — <code>ul &gt; li { }</code> — faqat <code>ul</code>ning bevosita <code>li</code> farzandlarini;",
          "<strong>Element + class</strong> — <code>p.katta { }</code> — faqat <code>katta</code> class'iga ega <code>p</code>'larni."
        ] },
        { code: [
          "/* .menyu ichidagi barcha havolalar */",
          ".menyu a {",
          "  color: white;",
          "}",
          "",
          "/* h1, h2 va h3 birdaniga */",
          "h1, h2, h3 {",
          "  font-family: Georgia, serif;",
          "}"
        ].join("\n") },

        { h2: "Spetsifiklik (specificity) — qaysi qoida g'olib?" },
        { p: "Ba'zan bitta elementga bir nechta qoida bir xil xossani (masalan, <code>color</code>) turlicha belgilaydi. Bunday to'qnashuvda brauzer qaysi qoidani qo'llashni <strong>spetsifiklik</strong> qoidasiga ko'ra hal qiladi. Sodda tartibda \"kuchdan kuchsizga\":" },
        { ol: [
          "<strong>Inline uslub</strong> (<code>style=\"...\"</code>) — eng kuchli;",
          "<strong>Id selektori</strong> (<code>#nom</code>) — juda kuchli;",
          "<strong>Class selektori</strong> (<code>.nom</code>) — o'rtacha;",
          "<strong>Element selektori</strong> (<code>p</code>) — eng kuchsiz."
        ] },
        { p: "Ya'ni <code>#nom</code> qoidasi <code>.nom</code> qoidasidan ustun keladi, u esa <code>p</code> qoidasidan ustun. Agar spetsifiklik <strong>teng</strong> bo'lsa, u holda CSS faylida <strong>keyinroq</strong> yozilgan qoida g'olib chiqadi (\"kaskad\" so'zining ma'nosi ham shu)." },
        { code: [
          "p { color: black; }        /* kuchsiz */",
          ".matn { color: blue; }     /* kuchliroq */",
          "#salom { color: red; }     /* eng kuchli */"
        ].join("\n") },
        { p: "Agar bir <code>&lt;p id=\"salom\" class=\"matn\"&gt;</code> elementiga uchala qoida ham to'g'ri kelsa, matn <strong>qizil</strong> (red) bo'ladi — chunki id selektori eng kuchli." },
        { warn: "CSS'da <code>!important</code> degan maxsus belgi bor: <code>color: red !important;</code>. U barcha spetsifiklik qoidalarini chetlab o'tib, majburan g'olib chiqadi. Undan iloji boricha <strong>foydalanmang</strong> — u kodni chalkashtiradi va keyinchalik uslubni o'zgartirishni juda qiyinlashtiradi. U — oxirgi chora." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>CSS</strong> — veb-sahifaning tashqi ko'rinishini (rang, shrift, joylashuv) boshqaradigan til;",
          "Sintaksis: <code>selektor { xossa: qiymat; }</code>;",
          "Ulash usullari: <strong>inline</strong> (yomon), <strong>internal</strong> (<code>&lt;style&gt;</code>), <strong>external</strong> (<code>&lt;link&gt;</code> — eng yaxshi);",
          "Asosiy selektorlar: element (<code>p</code>), class (<code>.nom</code>), id (<code>#nom</code>);",
          "Selektorlarni guruhlash va kombinatsiyalash mumkin;",
          "To'qnashuvda <strong>spetsifiklik</strong> hal qiladi: inline &gt; id &gt; class &gt; element;",
          "Amalda deyarli har doim <strong>external CSS</strong> va <strong>class</strong> selektorlarini ishlating."
        ] }
      ]
    },

    {
      slug: "css-box",
      title: "Box model",
      blurb: "CSS'da har bir element to'rtburchak qutidir. Content, padding, border va margin qatlamlari; width/height; box-sizing: border-box; display xossasi (block, inline, inline-block, none) va overflow.",
      body: [
        { lead: "CSS'ning eng muhim tushunchasi — <strong>Box Model (quti modeli)</strong>. Brauzer uchun sahifadagi <strong>har bir element</strong> — matn, rasm, tugma yoki div — bu to'rtburchak <strong>quti</strong>. Bu qutining o'lchami va uning ichki/tashqi bo'shliqlarini qanday hisoblashini tushunmasangiz, CSS'da joylashuv har doim sirli tuyuladi. Bu darsda quti modelini to'liq o'zlashtiramiz." },

        { note: "Maslahat: brauzerda F12 tugmasini bosib <strong>Developer Tools</strong>ni oching, biror elementni tanlang va o'ng tomonda \"Box Model\" diagrammasini ko'ring. U content, padding, border, margin qatlamlarini rangli ko'rsatadi — bu tushunishga juda yordam beradi." },

        { h2: "Quti to'rtta qatlamdan iborat" },
        { p: "Har bir element — ichkaridan tashqariga qarab — to'rtta qatlamdan tashkil topgan quti:" },
        { ol: [
          "<strong>Content (mazmun)</strong> — markazdagi haqiqiy mazmun: matn, rasm. Uning o'lchami <code>width</code> va <code>height</code> bilan belgilanadi;",
          "<strong>Padding (ichki bo'shliq)</strong> — mazmun bilan chegara orasidagi bo'shliq. Element fonining rangi shu qatlamgacha yoyiladi;",
          "<strong>Border (chegara)</strong> — qutini o'rab turadigan ramka (chiziq);",
          "<strong>Margin (tashqi bo'shliq)</strong> — qutining tashqi chegarasi bilan qo'shni elementlar orasidagi bo'shliq. U doim shaffof."
        ] },
        { code: [
          "  +-----------------------------+  <- margin (tashqi)",
          "  |  +-----------------------+  |  <- border (chegara)",
          "  |  |  +-----------------+  |  |  <- padding (ichki)",
          "  |  |  |    CONTENT      |  |  |  <- mazmun (width x height)",
          "  |  |  +-----------------+  |  |",
          "  |  +-----------------------+  |",
          "  +-----------------------------+"
        ].join("\n") },

        { h2: "Padding — ichki bo'shliq" },
        { p: "<code>padding</code> mazmun bilan element chegarasi orasiga bo'shliq qo'shadi. Uni har tomon uchun alohida yoki birdaniga belgilash mumkin." },
        { code: [
          "/* Barcha tomondan bir xil */",
          ".karta { padding: 20px; }",
          "",
          "/* Yuqori-past 10px, o'ng-chap 30px */",
          ".karta { padding: 10px 30px; }",
          "",
          "/* Yuqori, o'ng, past, chap (soat mili bo'yicha) */",
          ".karta { padding: 10px 20px 30px 40px; }",
          "",
          "/* Faqat bitta tomon */",
          ".karta { padding-left: 15px; }"
        ].join("\n") },
        { tip: "To'rtta qiymat berilganda tartib doim <strong>soat mili bo'yicha</strong>: yuqori (top) &rarr; o'ng (right) &rarr; past (bottom) &rarr; chap (left). Buni eslab qolish uchun \"TRBL\" (yoki \"trouble\") deb yodlash mumkin." },

        { h2: "Border — chegara" },
        { p: "<code>border</code> element atrofida chiziq (ramka) chizadi. U uchta qismdan iborat: qalinlik, uslub va rang." },
        { code: [
          "/* qalinlik | uslub | rang */",
          ".quti {",
          "  border: 2px solid black;",
          "}",
          "",
          "/* Faqat pastki chegara */",
          ".sarlavha {",
          "  border-bottom: 3px dashed red;",
          "}"
        ].join("\n") },
        { ul: [
          "<code>solid</code> — to'liq chiziq;",
          "<code>dashed</code> — chiziqchali;",
          "<code>dotted</code> — nuqtali;",
          "<code>none</code> — chegara yo'q."
        ] },

        { h2: "Margin — tashqi bo'shliq" },
        { p: "<code>margin</code> elementni qo'shni elementlardan uzoqlashtiradi. Uning sintaksisi <code>padding</code> bilan bir xil (bir, ikki yoki to'rt qiymat)." },
        { code: [
          ".blok {",
          "  margin: 20px;",
          "  margin-top: 40px;",
          "}"
        ].join("\n") },
        { p: "Elementni gorizontal markazga qo'yishning mashhur usuli — chap va o'ng margin'ni <code>auto</code> qilish. Buning uchun elementning <code>width</code>i belgilangan bo'lishi kerak:" },
        { code: [
          ".markaz {",
          "  width: 600px;",
          "  margin: 0 auto;",
          "}"
        ].join("\n") },
        { warn: "<strong>Margin collapse (margin yig'ilishi):</strong> agar ikki blok element yuqori-pastma-past joylashsa va biri pastki margin, ikkinchisi yuqori marginga ega bo'lsa, ular <strong>qo'shilmaydi</strong> — kattarog'i g'olib chiqadi. Masalan 30px va 20px margin uchrashsa, orada 50px emas, 30px bo'shliq qoladi. Bu boshlang'ich dasturchilarni ko'p chalkashtiradi." },

        { h2: "width, height va box-sizing muammosi" },
        { p: "<code>width</code> va <code>height</code> odatda faqat <strong>content</strong> qatlamining o'lchamini belgilaydi. Bu jiddiy muammoga olib keladi. Quyidagi qutini ko'ring:" },
        { code: [
          ".quti {",
          "  width: 200px;",
          "  padding: 20px;",
          "  border: 5px solid black;",
          "}"
        ].join("\n") },
        { p: "Siz \"quti kengligi 200px\" deb o'ylaysiz, lekin brauzer standart holatda uni shunday hisoblaydi: 200 (content) + 20 (chap padding) + 20 (o'ng padding) + 5 (chap border) + 5 (o'ng border) = <strong>250px</strong>. Ya'ni haqiqiy quti siz kutgandan kengroq bo'lib qoladi va joylashuvni buzadi." },

        { h2: "Yechim: box-sizing: border-box" },
        { p: "<code>box-sizing: border-box</code> xossasi bu muammoni hal qiladi. U bilan <code>width</code> endi <strong>butun qutini</strong> (content + padding + border) o'z ichiga oladi. Ya'ni <code>width: 200px</code> desangiz, quti aniq 200px bo'ladi — padding va border shu 200px <em>ichida</em> hisoblanadi." },
        { code: [
          ".quti {",
          "  box-sizing: border-box;",
          "  width: 200px;",
          "  padding: 20px;",
          "  border: 5px solid black;",
          "  /* Haqiqiy kenglik: aniq 200px */",
          "}"
        ].join("\n") },
        { tip: "Deyarli barcha zamonaviy loyihalar CSS faylining boshida quyidagi qoidani yozadi. U <strong>barcha</strong> elementlarni <code>border-box</code>ga o'tkazadi va o'lcham hisoblashni ancha soddalashtiradi. Buni odat qiling:" },
        { code: [
          "* {",
          "  box-sizing: border-box;",
          "}"
        ].join("\n") },

        { h2: "display xossasi" },
        { p: "<code>display</code> element qanday \"quti\" bo'lishini va boshqa elementlar bilan qanday joylashishini belgilaydi. Eng muhim qiymatlar:" },

        { h3: "block" },
        { p: "Block element har doim <strong>butun qatorni</strong> egallaydi va yangi qatordan boshlanadi. Unga <code>width</code>, <code>height</code>, yuqori/pastki <code>margin</code> berish mumkin. Misollar: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;section&gt;</code>." },

        { h3: "inline" },
        { p: "Inline element faqat <strong>o'z mazmuni qadar</strong> joy egallaydi va yangi qator boshlamaydi — bir qatorda yonma-yon turadi. Unga <code>width</code>/<code>height</code> va yuqori/pastki margin <strong>ta'sir qilmaydi</strong>. Misollar: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>." },

        { h3: "inline-block" },
        { p: "\"Ikkalasining eng yaxshisi\": element inline kabi yonma-yon turadi, lekin block kabi <code>width</code>, <code>height</code> va margin qabul qiladi. Tugmalar yoki yonma-yon kartalar uchun qulay." },

        { h3: "none" },
        { p: "Element <strong>butunlay yashiriladi</strong> — u sahifada ko'rinmaydi va joy ham egallamaydi. Ko'pincha JavaScript orqali elementni ko'rsatish/yashirish uchun ishlatiladi." },
        { code: [
          ".yashirin { display: none; }",
          "",
          ".menyu-element {",
          "  display: inline-block;",
          "  width: 120px;",
          "  padding: 10px;",
          "}"
        ].join("\n") },
        { note: "<code>display: none</code> bilan <code>visibility: hidden</code> farqli: birinchisida element umuman joy egallamaydi, ikkinchisida element ko'rinmaydi, lekin o'z joyini bo'sh saqlab qoladi." },

        { h2: "overflow — mazmun sig'masa nima bo'ladi?" },
        { p: "Agar element ichidagi mazmun uning o'lchamidan katta bo'lsa (masalan, <code>height</code> kichik, matn ko'p), <code>overflow</code> xossasi ortiqcha mazmun bilan nima qilishni belgilaydi:" },
        { ul: [
          "<code>visible</code> — sukut bo'yicha; mazmun quti chegarasidan tashqariga chiqib \"toshib\" ketadi;",
          "<code>hidden</code> — sig'magan qism kesib tashlanadi (ko'rinmaydi);",
          "<code>scroll</code> — har doim aylantirish paneli (scrollbar) qo'shiladi;",
          "<code>auto</code> — faqat kerak bo'lgandagina scrollbar qo'shadi (eng ko'p ishlatiladi)."
        ] },
        { code: [
          ".oyna {",
          "  height: 150px;",
          "  overflow: auto;",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "Har bir element — to'rt qatlamli <strong>quti</strong>: content, padding, border, margin;",
          "<strong>padding</strong> — ichki bo'shliq, <strong>margin</strong> — tashqi bo'shliq, <strong>border</strong> — ramka;",
          "Qiymatlar tartibi soat mili bo'yicha: yuqori &rarr; o'ng &rarr; past &rarr; chap;",
          "Standart holatda <code>width</code> faqat content'ni hisoblaydi, bu chalkashlik keltiradi;",
          "<code>box-sizing: border-box</code> — width'ni butun qutiga tenglashtiradi, buni odat qiling;",
          "<code>display</code>: <strong>block</strong> (butun qator), <strong>inline</strong> (yonma-yon), <strong>inline-block</strong> (ikkalasi), <strong>none</strong> (yashirin);",
          "<code>overflow: auto</code> — sig'magan mazmun uchun scroll qo'shadi."
        ] }
      ]
    },

    {
      slug: "css-flexbox",
      title: "Flexbox",
      blurb: "display: flex bilan elementlarni bir o'lchamli joylashtirish. Asosiy va ko'ndalang o'q, justify-content, align-items, flex-direction, flex-wrap, gap; flex-grow/shrink/basis va amaliy joylashuvlar.",
      body: [
        { lead: "<strong>Flexbox</strong> (Flexible Box Layout) — elementlarni bir qator yoki bir ustunda oson va moslashuvchan joylashtirish uchun mo'ljallangan CSS moduli. Flexbox'gacha elementlarni yonma-yon terish, markazga qo'yish yoki teng taqsimlash juda qiyin edi (<code>float</code> va boshqa \"hiyla\"lar bilan). Flexbox bularning barchasini bir necha qatorda hal qiladi. Bu — zamonaviy CSS'ning eng muhim vositalaridan biri." },

        { note: "Flexbox — <strong>bir o'lchamli</strong> (one-dimensional) joylashuv tizimi: u elementlarni <em>bir yo'nalishda</em> — yo qator (row) bo'ylab, yo ustun (column) bo'ylab tartibga soladi. Ikki o'lchamli (qator VA ustun birga) joylashuv uchun keyingi darsdagi CSS Grid ishlatiladi." },

        { h2: "Asosiy tushuncha: konteyner va elementlar" },
        { p: "Flexbox ikki qismdan iborat: <strong>flex-konteyner</strong> (ota element, unga <code>display: flex</code> beriladi) va uning ichidagi <strong>flex-elementlar</strong> (bevosita farzandlar). Konteynerga <code>display: flex</code> berishingiz bilan uning barcha bevosita farzandlari avtomatik yonma-yon (bir qatorga) tiziladi." },
        { code: [
          "<!-- HTML -->",
          '<div class="konteyner">',
          "  <div>1</div>",
          "  <div>2</div>",
          "  <div>3</div>",
          "</div>"
        ].join("\n") },
        { code: [
          "/* CSS */",
          ".konteyner {",
          "  display: flex;",
          "}"
        ].join("\n") },
        { p: "Faqat shu bitta qatordan keyin uchta <code>div</code> bir-birining yoniga chiziladi (odatiy holatda ular bir-birining ostida bo'lardi, chunki div — block element)." },

        { h2: "Ikkita o'q: asosiy va ko'ndalang" },
        { p: "Flexbox'ni tushunish uchun uning <strong>ikki o'qini</strong> bilish shart:" },
        { ul: [
          "<strong>Asosiy o'q (main axis)</strong> — elementlar tiziladigan asosiy yo'nalish. Standart holatda u <strong>gorizontal</strong> (chapdan o'ngga);",
          "<strong>Ko'ndalang o'q (cross axis)</strong> — asosiy o'qqa perpendikulyar. Standart holatda u <strong>vertikal</strong> (yuqoridan pastga)."
        ] },
        { p: "Bu ikkisini eslab qolish muhim, chunki <code>justify-content</code> — asosiy o'q bo'yicha, <code>align-items</code> esa ko'ndalang o'q bo'yicha ishlaydi." },

        { h2: "justify-content — asosiy o'q bo'yicha tekislash" },
        { p: "Elementlarni asosiy o'q (odatda gorizontal) bo'ylab qanday taqsimlashni belgilaydi:" },
        { code: [
          ".konteyner {",
          "  display: flex;",
          "  justify-content: center;",
          "}"
        ].join("\n") },
        { ul: [
          "<code>flex-start</code> — boshiga (chapga) yig'iladi (standart);",
          "<code>flex-end</code> — oxiriga (o'ngga) yig'iladi;",
          "<code>center</code> — markazga yig'iladi;",
          "<code>space-between</code> — birinchi va oxirgi chetga, oralar teng bo'shliq;",
          "<code>space-around</code> — har bir element atrofida teng bo'shliq;",
          "<code>space-evenly</code> — barcha bo'shliqlar (chetlar ham) mutlaqo teng."
        ] },

        { h2: "align-items — ko'ndalang o'q bo'yicha tekislash" },
        { p: "Elementlarni ko'ndalang o'q (odatda vertikal) bo'yicha qanday tekislashni belgilaydi:" },
        { code: [
          ".konteyner {",
          "  display: flex;",
          "  height: 300px;",
          "  align-items: center;",
          "}"
        ].join("\n") },
        { ul: [
          "<code>stretch</code> — elementlar konteyner balandligiga cho'ziladi (standart);",
          "<code>flex-start</code> — yuqoriga tekislanadi;",
          "<code>flex-end</code> — pastga tekislanadi;",
          "<code>center</code> — vertikal markazga tekislanadi;",
          "<code>baseline</code> — matn asos chizig'i bo'yicha tekislanadi."
        ] },
        { tip: "Elementni <strong>to'liq markazga</strong> (ham gorizontal, ham vertikal) qo'yish — Flexbox'ning eng mashhur \"sehri\". Faqat uch qator: <code>display: flex; justify-content: center; align-items: center;</code>. Bu klassik \"markazga qo'yish\" muammosini bir zumda hal qiladi." },
        { code: [
          ".markaz {",
          "  display: flex;",
          "  justify-content: center;",
          "  align-items: center;",
          "  height: 100vh;",
          "}"
        ].join("\n") },

        { h2: "flex-direction — yo'nalishni o'zgartirish" },
        { p: "Asosiy o'qning yo'nalishini o'zgartiradi. Buni o'zgartirsangiz, <code>justify-content</code> va <code>align-items</code>ning o'qlari ham almashadi (chunki ular o'qlarga bog'langan):" },
        { ul: [
          "<code>row</code> — gorizontal, chapdan o'ngga (standart);",
          "<code>row-reverse</code> — gorizontal, o'ngdan chapga;",
          "<code>column</code> — vertikal, yuqoridan pastga (elementlar ustun bo'lib tiziladi);",
          "<code>column-reverse</code> — vertikal, pastdan yuqoriga."
        ] },
        { code: [
          ".ustun {",
          "  display: flex;",
          "  flex-direction: column;",
          "  gap: 10px;",
          "}"
        ].join("\n") },
        { warn: "<code>flex-direction: column</code> qo'ysangiz, asosiy o'q endi <strong>vertikal</strong> bo'ladi. Shuning uchun <code>justify-content</code> endi vertikal joylashuvni, <code>align-items</code> esa gorizontal joylashuvni boshqaradi — ular \"o'rin almashadi\". Bu ko'p yangi dasturchini chalkashtiradi, shuni yodda tuting." },

        { h2: "flex-wrap — qatorga sig'masa o'tkazish" },
        { p: "Standart holatda flex-elementlar bitta qatorga majburan siqiladi (sig'masa ham). <code>flex-wrap: wrap</code> ularga sig'magan elementlarni keyingi qatorga o'tishga ruxsat beradi:" },
        { code: [
          ".galereya {",
          "  display: flex;",
          "  flex-wrap: wrap;",
          "  gap: 15px;",
          "}"
        ].join("\n") },
        { note: "<code>flex-wrap: wrap</code> responsive (moslashuvchan) galereyalar uchun juda foydali: ekran torayganda kartalar avtomatik keyingi qatorga tushadi." },

        { h2: "gap — elementlar orasidagi bo'shliq" },
        { p: "<code>gap</code> flex-elementlar orasiga bir tekis bo'shliq qo'shadi. Ilgari buning uchun har bir elementga <code>margin</code> berish kerak edi (va oxirgisini olib tashlash muammo edi). <code>gap</code> buni juda soddalashtirdi:" },
        { code: [
          ".konteyner {",
          "  display: flex;",
          "  gap: 20px;         /* barcha tomondan 20px */",
          "}",
          "",
          "/* Qator va ustun uchun alohida */",
          ".panjara {",
          "  display: flex;",
          "  flex-wrap: wrap;",
          "  gap: 10px 30px;    /* qatorlar orasi 10px, ustunlar orasi 30px */",
          "}"
        ].join("\n") },

        { h2: "flex-grow, flex-shrink, flex-basis — elementlarning egiluvchanligi" },
        { p: "Bu uch xossa <strong>flex-elementlarning o'ziga</strong> (konteynerga emas) beriladi va ularning bo'sh joyni qanday egallashini boshqaradi:" },
        { ul: [
          "<strong>flex-basis</strong> — elementning boshlang'ich o'lchami (masalan <code>200px</code> yoki <code>auto</code>);",
          "<strong>flex-grow</strong> — bo'sh joy bo'lsa, element qanchalik <em>o'sishi</em> (0 = o'smaydi, 1 = o'sadi);",
          "<strong>flex-shrink</strong> — joy yetmasa, element qanchalik <em>kichrayishi</em> (0 = kichraymaydi)."
        ] },
        { p: "Ko'pincha ular bitta qisqartirilgan <code>flex</code> xossasi orqali yoziladi: <code>flex: grow shrink basis</code>." },
        { code: [
          "/* Element barcha bo'sh joyni egallasin */",
          ".katta {",
          "  flex: 1;          /* = flex: 1 1 0 */",
          "}",
          "",
          "/* To'liq yozuv */",
          ".element {",
          "  flex-grow: 1;",
          "  flex-shrink: 1;",
          "  flex-basis: 200px;",
          "}"
        ].join("\n") },
        { tip: "<code>flex: 1</code> — eng ko'p ishlatiladigan qiymat. Agar bir konteynerdagi barcha elementlarga <code>flex: 1</code> bersangiz, ular mavjud joyni <strong>teng bo'lib</strong> egallaydi. Bu bir necha ustunni teng kenglikda qilishning eng oson usuli." },

        { h2: "Amaliy misol: sayt navigatsiya paneli" },
        { p: "Flexbox uchun eng keng tarqalgan amaliy holat — sayt tepasidagi navigatsiya paneli: chapda logotip, o'ngda menyu havolalari." },
        { code: [
          "<!-- HTML -->",
          '<nav class="navbar">',
          '  <div class="logo">MySite</div>',
          '  <div class="menyu">',
          "    <a>Bosh sahifa</a>",
          "    <a>Xizmatlar</a>",
          "    <a>Aloqa</a>",
          "  </div>",
          "</nav>"
        ].join("\n") },
        { code: [
          "/* CSS */",
          ".navbar {",
          "  display: flex;",
          "  justify-content: space-between;  /* logo chapda, menyu o'ngda */",
          "  align-items: center;            /* vertikal markazda */",
          "  padding: 15px 30px;",
          "}",
          "",
          ".menyu {",
          "  display: flex;",
          "  gap: 20px;                       /* havolalar orasi bo'shliq */",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Flexbox</strong> — bir o'lchamli (qator yoki ustun) joylashuv tizimi;",
          "Konteynerga <code>display: flex</code> beriladi, farzandlar avtomatik yonma-yon tiziladi;",
          "<strong>asosiy o'q</strong> (justify-content) va <strong>ko'ndalang o'q</strong> (align-items);",
          "Markazga qo'yish: <code>justify-content: center; align-items: center;</code>;",
          "<code>flex-direction</code> — yo'nalish (row/column), o'zgarganda o'qlar almashadi;",
          "<code>flex-wrap: wrap</code> — sig'magan elementlarni keyingi qatorga o'tkazadi;",
          "<code>gap</code> — elementlar orasidagi bo'shliq;",
          "<code>flex: 1</code> — element bo'sh joyni egallaydi (teng ustunlar uchun ideal)."
        ] }
      ]
    },

    {
      slug: "css-grid",
      title: "CSS Grid",
      blurb: "display: grid bilan ikki o'lchamli joylashuv. grid-template-columns/rows (fr, repeat, minmax), gap, elementlarni joylashtirish (grid-column/row), Flexbox bilan farqi va qachon qaysi birini tanlash.",
      body: [
        { lead: "<strong>CSS Grid</strong> — elementlarni <strong>qator VA ustun</strong> bo'yicha bir vaqtda joylashtirish uchun mo'ljallangan eng kuchli CSS joylashuv tizimi. Flexbox bir yo'nalishda ishlagani (qator YOKI ustun) uchun murakkab jadval kabi tuzilmalarni yasash qiyin edi. Grid esa haqiqiy <strong>ikki o'lchamli</strong> \"panjara\" yaratadi — bu bilan butun sahifa maketini (layout) oson qurish mumkin." },

        { note: "Grid va Flexbox — raqib emas, hamkor. <strong>Grid</strong> — butun sahifa maketi (ikki o'lchamli katta tuzilma) uchun; <strong>Flexbox</strong> — kichik komponent ichidagi elementlarni bir qatorga terish uchun. Ko'pincha ular birga ishlatiladi." },

        { h2: "Grid asoslari" },
        { p: "Konteynerga <code>display: grid</code> berasiz, so'ng ustunlar va qatorlarni belgilaysiz. Panjara ustun va qatorlardan tashkil topadi, ularning kesishmasi — <strong>katak (cell)</strong>. Farzand elementlar shu kataklarga joylashadi." },
        { code: [
          "<!-- HTML -->",
          '<div class="panjara">',
          "  <div>1</div>",
          "  <div>2</div>",
          "  <div>3</div>",
          "  <div>4</div>",
          "</div>"
        ].join("\n") },

        { h2: "grid-template-columns — ustunlarni belgilash" },
        { p: "Bu xossa nechta ustun bo'lishini va ularning kengligini belgilaydi. Har bir qiymat — bitta ustun kengligi:" },
        { code: [
          "/* 3 ta ustun: har biri 100px */",
          ".panjara {",
          "  display: grid;",
          "  grid-template-columns: 100px 100px 100px;",
          "}"
        ].join("\n") },
        { p: "Farzandlar bu 3 ustunga birin-ketin joylashadi. To'rtinchi element avtomatik yangi qatorga o'tadi." },

        { h2: "fr birligi — moslashuvchan ulush" },
        { p: "<code>fr</code> (fraction — ulush) — Grid'ning maxsus birligi. U mavjud bo'sh joyni <strong>ulushlarga</strong> bo'ladi. Masalan <code>1fr 1fr 1fr</code> — joyni teng uch ulushga bo'ladi, har bir ustun teng kenglikda:" },
        { code: [
          "/* 3 ta teng ustun */",
          ".panjara {",
          "  display: grid;",
          "  grid-template-columns: 1fr 1fr 1fr;",
          "}",
          "",
          "/* O'rtadagi ustun 2 barobar keng */",
          ".panjara2 {",
          "  display: grid;",
          "  grid-template-columns: 1fr 2fr 1fr;",
          "}"
        ].join("\n") },
        { tip: "<code>fr</code> — piksellardan ustun, chunki u moslashuvchan: ekran o'lchami o'zgarganda ustunlar avtomatik moslashadi. Aralashtirish ham mumkin: <code>grid-template-columns: 200px 1fr;</code> — birinchi ustun qat'iy 200px, ikkinchisi qolgan barcha joyni egallaydi (masalan, yon panel + asosiy kontent)." },

        { h2: "repeat() — takrorlashni qisqartirish" },
        { p: "Bir xil ustunni ko'p marta yozish o'rniga <code>repeat()</code> funksiyasidan foydalaning. <code>repeat(3, 1fr)</code> — \"1fr'ni 3 marta takrorla\" degani:" },
        { code: [
          "/* Bu ikkisi bir xil: */",
          "grid-template-columns: 1fr 1fr 1fr 1fr;",
          "grid-template-columns: repeat(4, 1fr);",
          "",
          "/* 12 ustunli maket (juda keng tarqalgan) */",
          ".panjara {",
          "  display: grid;",
          "  grid-template-columns: repeat(12, 1fr);",
          "}"
        ].join("\n") },

        { h2: "minmax() — eng kichik va eng katta o'lcham" },
        { p: "<code>minmax(min, max)</code> ustunning eng kichik va eng katta kengligini belgilaydi. Bu responsive dizaynda juda foydali. Quyidagi mashhur uslub — ekran kengligiga qarab ustunlar sonini <strong>avtomatik</strong> moslaydigan galereya yaratadi:" },
        { code: [
          ".galereya {",
          "  display: grid;",
          "  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));",
          "  gap: 20px;",
          "}"
        ].join("\n") },
        { p: "Bu shunday o'qiladi: \"Har bir ustun kamida 200px bo'lsin, joy bo'lsa 1fr'gacha cho'zilsin; nechta sig'sa, shuncha ustun avtomatik yaratilsin\". Ekran torayganda ustunlar soni o'z-o'zidan kamayadi — media query'siz responsive galereya!" },

        { h2: "grid-template-rows va gap" },
        { p: "Ustunlar kabi qatorlar balandligini <code>grid-template-rows</code> belgilaydi. <code>gap</code> esa kataklar orasidagi bo'shliqni beradi (Flexbox'dagi kabi):" },
        { code: [
          ".panjara {",
          "  display: grid;",
          "  grid-template-columns: repeat(3, 1fr);",
          "  grid-template-rows: 100px 200px;",
          "  gap: 15px;              /* barcha kataklar orasi */",
          "  /* yoki alohida: */",
          "  /* gap: 10px 20px;  qator-oralar 10px, ustun-oralar 20px */",
          "}"
        ].join("\n") },

        { h2: "Elementlarni joylashtirish: grid-column va grid-row" },
        { p: "Grid'ning kuchli jihati — bitta elementni <strong>bir necha katakka</strong> cho'zish mumkin. Buni <code>grid-column</code> va <code>grid-row</code> orqali qilasiz. Panjara chiziqlari 1'dan boshlab raqamlanadi." },
        { code: [
          "/* Element 1-ustundan 3-ustungacha (2 ustun eni) */",
          ".katta {",
          "  grid-column: 1 / 3;",
          "}",
          "",
          "/* span bilan: 2 ustun eni egalla */",
          ".keng {",
          "  grid-column: span 2;",
          "}",
          "",
          "/* Ham ustun, ham qator bo'yicha cho'zish */",
          ".ulkan {",
          "  grid-column: 1 / 3;",
          "  grid-row: 1 / 3;",
          "}"
        ].join("\n") },
        { note: "<code>grid-column: 1 / 3</code> — \"1-chiziqdan 3-chiziqgacha\", ya'ni ikki ustunni egallaydi. Diqqat: bu chiziq raqamlari, katak raqami emas. 3 ta ustunlik panjarada 4 ta vertikal chiziq bo'ladi (1, 2, 3, 4)." },

        { h2: "Amaliy misol: sahifa maketi" },
        { p: "Grid butun sahifa maketini yasashga ideal: tepada sarlavha (header), chapda yon panel, o'rtada kontent, pastda futer. Bularni <code>grid-template-areas</code> bilan nomli hududlar orqali chizish mumkin:" },
        { code: [
          ".sahifa {",
          "  display: grid;",
          "  grid-template-columns: 200px 1fr;",
          "  grid-template-rows: auto 1fr auto;",
          '  grid-template-areas:',
          '    "header header"',
          '    "sidebar kontent"',
          '    "footer footer";',
          "  gap: 10px;",
          "  min-height: 100vh;",
          "}",
          "",
          ".header  { grid-area: header; }",
          ".sidebar { grid-area: sidebar; }",
          ".kontent { grid-area: kontent; }",
          ".footer  { grid-area: footer; }"
        ].join("\n") },

        { h2: "Grid va Flexbox: qaysi birini tanlash?" },
        { p: "Ikkalasi ham joylashuv uchun, lekin ular turli vazifalar uchun optimal:" },
        { ul: [
          "<strong>Flexbox</strong> — <em>bir o'lchamli</em>: elementlarni bir qatorga yoki bir ustunga terish. Menyu, tugmalar guruhi, karta ichidagi elementlar uchun;",
          "<strong>Grid</strong> — <em>ikki o'lchamli</em>: qator va ustun birga. Butun sahifa maketi, galereya, jadval kabi tuzilmalar uchun;",
          "<strong>Mazmun boshqarsa</strong> (element o'z o'lchamiga qarab joylashsin) &rarr; Flexbox;",
          "<strong>Maket boshqarsa</strong> (avval panjara chizib, keyin to'ldirsangiz) &rarr; Grid."
        ] },
        { tip: "Oddiy qoida: <strong>umumiy sahifa tuzilishi</strong> uchun Grid, o'sha tuzilma ichidagi <strong>kichik komponentlar</strong> uchun Flexbox. Masalan, sahifani Grid bilan hududlarga bo'lasiz, keyin har bir hudud ichidagi menyuni Flexbox bilan tizasiz. Ular birga eng yaxshi ishlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>CSS Grid</strong> — ikki o'lchamli (qator + ustun) joylashuv tizimi;",
          "<code>display: grid</code> + <code>grid-template-columns</code> bilan ustunlarni belgilaysiz;",
          "<code>fr</code> — moslashuvchan ulush birligi (teng ustunlar uchun ideal);",
          "<code>repeat(n, 1fr)</code> — takrorlashni qisqartiradi;",
          "<code>minmax()</code> + <code>auto-fill</code> — media query'siz responsive galereya;",
          "<code>gap</code> — kataklar orasidagi bo'shliq;",
          "<code>grid-column</code>/<code>grid-row</code> — elementni bir necha katakka cho'zadi;",
          "Grid — sahifa maketi uchun, Flexbox — komponentlar uchun; ular birga ishlaydi."
        ] }
      ]
    },

    {
      slug: "css-responsive",
      title: "Responsive dizayn",
      blurb: "Sayt barcha ekran o'lchamlariga moslashishi. Birliklar (px, %, em, rem, vw/vh), media query (@media), mobile-first yondashuv, moslashuvchan rasm va matn, breakpointlar.",
      body: [
        { lead: "<strong>Responsive dizayn</strong> (moslashuvchan dizayn) — saytning telefon, planshet va kompyuterning turli ekran o'lchamlarida bir xil chiroyli va qulay ko'rinishini ta'minlash usuli. Bugungi kunda internet trafikning katta qismi telefonlardan keladi, shuning uchun sayt <strong>har qanday ekranga moslashishi</strong> — majburiy talab. Bu darsda saytni moslashuvchan qilishning barcha asosiy vositalarini o'rganamiz." },

        { note: "Responsive dizaynning uch ustuni: <strong>moslashuvchan birliklar</strong> (px o'rniga %, rem, vw), <strong>media query'lar</strong> (ekran o'lchamiga qarab uslubni o'zgartirish) va <strong>moslashuvchan rasmlar</strong>. Bularni birga ishlatib, bitta kod bilan barcha qurilmalarga xizmat qilasiz." },

        { h2: "Nega px yetarli emas?" },
        { p: "<code>px</code> (piksel) — qat'iy (fixed) birlik. Agar butun saytni piksellar bilan qursangiz (masalan, <code>width: 960px</code>), u telefon ekranida (kengligi ~360px) sig'may qoladi va foydalanuvchi gorizontal aylantirishga majbur bo'ladi. Shuning uchun moslashuvchan birliklar kerak." },

        { h2: "CSS birliklari" },
        { p: "Bir necha muhim birlik bor. Ularni to'g'ri tanlash — responsive dizaynning yarmini hal qiladi:" },

        { h3: "px — piksel (mutlaq)" },
        { p: "Qat'iy o'lcham. Chegara qalinligi (<code>border</code>) yoki juda aniq bo'lishi kerak bo'lgan kichik o'lchamlar uchun mos. Katta joylashuvlar uchun tavsiya etilmaydi." },

        { h3: "% — foiz (nisbiy)" },
        { p: "<strong>Ota elementga nisbatan</strong> o'lcham. <code>width: 50%</code> — ota elementning yarmi kengligi. Ota o'zgarsa, farzand ham moslashadi. Moslashuvchan kengliklar uchun juda foydali." },
        { code: [
          ".yon-panel {",
          "  width: 30%;",
          "}",
          ".asosiy {",
          "  width: 70%;",
          "}"
        ].join("\n") },

        { h3: "em — ota shriftga nisbatan" },
        { p: "<code>1em</code> = ota elementning shrift o'lchami. Agar ota shrifti 16px bo'lsa, <code>2em</code> = 32px. Muammosi: em'lar bir-birining ichida <strong>ko'payib ketishi</strong> mumkin (ichma-ich elementlarda)." },

        { h3: "rem — ildiz shriftga nisbatan (eng tavsiya etiladigan)" },
        { p: "<code>rem</code> (root em) har doim <strong>ildiz elementga</strong> (<code>&lt;html&gt;</code>) nisbatan hisoblanadi. Standart holatda <code>html</code> shrifti 16px, demak <code>1rem = 16px</code>, <code>1.5rem = 24px</code>. em'ning ko'payib ketish muammosi rem'da yo'q, shuning uchun rem — o'lcham va masofalar uchun eng ishonchli tanlov." },
        { code: [
          "html {",
          "  font-size: 16px;   /* 1rem = 16px */",
          "}",
          "",
          "h1 {",
          "  font-size: 2rem;   /* 32px */",
          "}",
          ".karta {",
          "  padding: 1.5rem;   /* 24px */",
          "}"
        ].join("\n") },
        { tip: "Amaliy maslahat: shriftlar va masofalar (padding, margin) uchun <strong>rem</strong>ni asosiy birlik qiling. Foydalanuvchi brauzer sozlamasida shrift o'lchamini kattalashtirsa, butun sayt (rem'ga asoslangani uchun) mutanosib ravishda kattalashadi — bu qulaylik uchun juda muhim." },

        { h3: "vw va vh — ekran o'lchamiga nisbatan" },
        { p: "<code>vw</code> (viewport width) — ekran kengligining 1%'i; <code>vh</code> (viewport height) — ekran balandligining 1%'i. <code>100vw</code> = butun ekran kengligi, <code>100vh</code> = butun ekran balandligi. To'liq ekranli bo'limlar (hero section) uchun juda qulay:" },
        { code: [
          ".hero {",
          "  width: 100vw;",
          "  height: 100vh;   /* butun ekranni egallaydi */",
          "}"
        ].join("\n") },

        { h2: "Viewport meta tegi — birinchi qadam" },
        { p: "Responsive sayt yaratishning <strong>eng birinchi</strong> va majburiy qadami — HTML'ning <code>&lt;head&gt;</code> qismiga viewport meta tegini qo'yish. Usiz media query'lar telefonda to'g'ri ishlamaydi:" },
        { code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
        { warn: "Bu qatorni unutmang! U bo'lmasa, telefon saytni kompyuter kengligida ko'rsatib, keyin kichraytiradi — natijada matn juda mayda bo'lib qoladi va media query'lar ishlamaydi. Bu — boshlang'ich dasturchilarning eng ko'p qiladigan xatosi." },

        { h2: "Media query — @media" },
        { p: "<strong>Media query</strong> — ekran o'lchamiga (yoki boshqa shartga) qarab turli CSS qoidalarini qo'llash imkonini beradi. U <code>@media</code> bilan boshlanadi va ichida shart hamda odatiy CSS qoidalari bo'ladi:" },
        { code: [
          "/* Ekran kengligi 600px yoki undan kichik bo'lsa */",
          "@media (max-width: 600px) {",
          "  .konteyner {",
          "    flex-direction: column;",
          "  }",
          "  h1 {",
          "    font-size: 1.5rem;",
          "  }",
          "}"
        ].join("\n") },
        { p: "Bu shunday ishlaydi: ekran 600px'dan keng bo'lsa, ichkaridagi qoidalar <strong>e'tiborga olinmaydi</strong>; ekran 600px yoki tor bo'lsa, ular qo'llaniladi. Shu tarzda telefonda joylashuvni gorizontaldan vertikalga o'zgartirasiz." },
        { ul: [
          "<code>max-width: 600px</code> — ekran shu qiymat yoki undan <strong>tor</strong> bo'lganda;",
          "<code>min-width: 600px</code> — ekran shu qiymat yoki undan <strong>keng</strong> bo'lganda."
        ] },

        { h2: "Mobile-first yondashuv" },
        { p: "Ikki xil yondashuv bor: <strong>desktop-first</strong> (avval katta ekran, keyin <code>max-width</code> bilan kichraytirish) va <strong>mobile-first</strong> (avval telefon, keyin <code>min-width</code> bilan kattalashtirish). Zamonaviy amaliyot — <strong>mobile-first</strong>." },
        { p: "Mobile-first'da asosiy CSS'ni eng kichik (telefon) ekran uchun yozasiz, so'ng <code>min-width</code> media query'lari bilan kattaroq ekranlarga qo'shimchalar qo'shasiz:" },
        { code: [
          "/* Asosiy uslub — telefon uchun (mobile-first) */",
          ".karta {",
          "  width: 100%;",
          "}",
          "",
          "/* Planshet: 768px va undan keng */",
          "@media (min-width: 768px) {",
          "  .karta {",
          "    width: 50%;",
          "  }",
          "}",
          "",
          "/* Kompyuter: 1024px va undan keng */",
          "@media (min-width: 1024px) {",
          "  .karta {",
          "    width: 33.33%;",
          "  }",
          "}"
        ].join("\n") },
        { tip: "Mobile-first afzalliklari: telefonlar ko'pchilikda, shuning uchun asosiy kod ular uchun optimallashadi; kod soddaroq va progressiv (kichikdan kattaga) bo'ladi; kam quvvatli qurilmalar keraksiz uslublarni yuklamaydi." },

        { h2: "Breakpointlar" },
        { p: "<strong>Breakpoint</strong> — joylashuv o'zgaradigan ekran kengligi (media query'dagi qiymat). Universal standart yo'q, lekin keng tarqalgan qiymatlar:" },
        { ul: [
          "<strong>~480px</strong> — kichik telefonlar;",
          "<strong>~768px</strong> — planshetlar;",
          "<strong>~1024px</strong> — kichik noutbuklar;",
          "<strong>~1280px va undan katta</strong> — katta ekranlar."
        ] },
        { note: "Breakpointlarni qat'iy qurilma o'lchamiga emas, saytingiz <strong>joylashuvi buzilgan</strong> nuqtaga qarab tanlang. Sahifani asta-sekin toraytirib, dizayn qachon \"buzila\" boshlasa, o'sha yerga breakpoint qo'ying — bu eng amaliy usul." },

        { h2: "Moslashuvchan rasm va matn" },
        { p: "Rasmlar ota elementdan chiqib ketmasligi uchun ularga oddiy, lekin muhim qoida beriladi:" },
        { code: [
          "img {",
          "  max-width: 100%;",
          "  height: auto;",
          "}"
        ].join("\n") },
        { p: "<code>max-width: 100%</code> — rasm ota elementdan kengroq bo'lmaydi (kichrayadi, lekin haqiqiy o'lchamidan kattalashmaydi). <code>height: auto</code> — balandlik nisbatini saqlaydi, rasm cho'zilib buzilmaydi." },
        { p: "Matnni ham moslashuvchan qilish mumkin. Zamonaviy <code>clamp()</code> funksiyasi shrift o'lchamini ekranga qarab avtomatik moslaydi — eng kichik va eng katta chegara orasida:" },
        { code: [
          "h1 {",
          "  /* min 1.5rem, ideal 5vw, max 3rem */",
          "  font-size: clamp(1.5rem, 5vw, 3rem);",
          "}"
        ].join("\n") },
        { p: "Bu shuni anglatadi: shrift ekran bilan (5vw) o'sadi, lekin hech qachon 1.5rem'dan kichik yoki 3rem'dan katta bo'lmaydi. Media query'siz moslashuvchan sarlavha!" },

        { h2: "Amaliy misol: moslashuvchan karta panjarasi" },
        { p: "Grid va media query birgalikda — telefonda 1 ustun, planshetda 2, kompyuterda 3 ustunli galereya:" },
        { code: [
          "/* Mobile-first: 1 ustun */",
          ".galereya {",
          "  display: grid;",
          "  grid-template-columns: 1fr;",
          "  gap: 1rem;",
          "}",
          "",
          "@media (min-width: 768px) {",
          "  .galereya { grid-template-columns: repeat(2, 1fr); }",
          "}",
          "",
          "@media (min-width: 1024px) {",
          "  .galereya { grid-template-columns: repeat(3, 1fr); }",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Responsive dizayn</strong> — sayt barcha ekranlarga moslashishi;",
          "Birliklar: <code>px</code> (qat'iy), <code>%</code> (otaga nisbatan), <code>rem</code> (ildizga — tavsiya etiladi), <code>vw</code>/<code>vh</code> (ekranga);",
          "Majburiy birinchi qadam — <strong>viewport meta tegi</strong>;",
          "<code>@media</code> — ekran o'lchamiga qarab uslubni o'zgartiradi (<code>min-width</code>/<code>max-width</code>);",
          "<strong>Mobile-first</strong> — avval telefon uchun, keyin <code>min-width</code> bilan kattalashtirish;",
          "<strong>Breakpoint</strong>larni dizayn buzilgan nuqtaga qarab tanlang;",
          "<code>img { max-width: 100%; height: auto; }</code> — moslashuvchan rasm;",
          "<code>clamp()</code> — media query'siz moslashuvchan shrift o'lchami."
        ] }
      ]
    },

    {
      slug: "css-styling",
      title: "Ranglar, shrift va bezaklar",
      blurb: "color/background va rang formatlari (hex, rgb, hsl); shrift (font-family, size, weight, line-height); matn bezaklari (text-align, text-decoration); border-radius, box-shadow va transition asoslari.",
      body: [
        { lead: "Endi saytimizni chiroyli qilishga o'tamiz. Bu darsda <strong>ranglar</strong>, <strong>shriftlar</strong> va <strong>vizual bezaklar</strong> (yumaloq burchaklar, soyalar, silliq o'tishlar) bilan tanishamiz. Aynan shu detallar saytni oddiy va professional ko'rinishlar orasidagi farqni belgilaydi. Ularni o'zlashtirsangiz, har qanday dizaynni hayotga tatbiq eta olasiz." },

        { note: "Bu dars — asosan <strong>ko'rinish</strong> haqida. Har bir xossani o'z kompyuteringizda sinab ko'ring: qiymatlarni o'zgartirib, brauzerdagi natijaga qarang. Rang, shrift va soyalar bilan \"o'ynash\" — CSS'ni his qilishning eng yaxshi usuli." },

        { h2: "Ranglar: color va background" },
        { p: "<code>color</code> — <strong>matn rangini</strong>, <code>background-color</code> — elementning <strong>fon rangini</strong> belgilaydi. Bu ikkisi — eng ko'p ishlatiladigan CSS xossalari:" },
        { code: [
          ".ogohlantirish {",
          "  color: white;",
          "  background-color: red;",
          "}"
        ].join("\n") },

        { h2: "Rang formatlari" },
        { p: "CSS'da rangni bir necha usulda yozish mumkin. Ularning barchasi bir xil rangni bera oladi, lekin har birining o'z qulayligi bor:" },

        { h3: "1. Nom bo'yicha (nomli ranglar)" },
        { p: "Eng oddiy usul — rangning inglizcha nomini yozish. CSS'da ~140 ta nomli rang bor. Tez sinash uchun qulay, lekin cheklangan:" },
        { code: "color: tomato;   /* red, blue, green, black, white, gray... */" },

        { h3: "2. HEX (o'n oltilik kod)" },
        { p: "Panjara belgisidan (<code>#</code>) keyin 6 ta belgi: har juftlik qizil, yashil, ko'k (RGB) miqdorini bildiradi. Eng ko'p ishlatiladigan format. Dizaynerlar odatda ranglarni aynan HEX kodida beradi:" },
        { code: [
          "color: #ff0000;   /* sof qizil */",
          "color: #ffffff;   /* oq */",
          "color: #000000;   /* qora */",
          "color: #3498db;   /* ko'k */",
          "color: #333;      /* qisqa yozuv = #333333 */"
        ].join("\n") },

        { h3: "3. RGB va RGBA" },
        { p: "<code>rgb(qizil, yashil, ko'k)</code> — har biri 0'dan 255'gacha. <code>rgba()</code> qo'shimcha <strong>shaffoflik</strong> (alpha, 0'dan 1'gacha) qiymatini oladi. Shaffof rang kerak bo'lganda RGBA juda foydali:" },
        { code: [
          "color: rgb(52, 152, 219);        /* ko'k */",
          "background: rgba(0, 0, 0, 0.5);  /* 50% shaffof qora */"
        ].join("\n") },

        { h3: "4. HSL va HSLA" },
        { p: "<code>hsl(rang, to'yinganlik, yorug'lik)</code> — Hue (rang chizig'i, 0-360 daraja), Saturation (to'yinganlik, %) va Lightness (yorug'lik, %). Bu format inson uchun eng tushunarli: bitta rangni ochroq/to'qroq qilish uchun faqat yorug'likni o'zgartirasiz:" },
        { code: [
          "color: hsl(204, 70%, 53%);   /* ko'k */",
          "color: hsl(204, 70%, 30%);   /* to'qroq ko'k (yorug'lik kam) */",
          "color: hsl(204, 70%, 75%);   /* ochroq ko'k (yorug'lik ko'p) */"
        ].join("\n") },
        { tip: "Boshlang'ich uchun <strong>HEX</strong> yetarli va universal. Lekin rang gammasini (ochdan to'qgacha) yaratishda <strong>HSL</strong> ancha qulay, chunki faqat yorug'lik foizini o'zgartirib bir xil rangning turli soyalarini olasiz." },

        { h2: "background — kengroq imkoniyatlar" },
        { p: "<code>background</code> nafaqat rang, balki rasm va gradient (rang o'tishi) ham bo'lishi mumkin:" },
        { code: [
          "/* Rang */",
          ".blok { background-color: #f0f0f0; }",
          "",
          "/* Rasm */",
          ".hero {",
          "  background-image: url('rasm.jpg');",
          "  background-size: cover;      /* butun blokni qoplaydi */",
          "  background-position: center; /* markazga tekislaydi */",
          "}",
          "",
          "/* Gradient (rang o'tishi) */",
          ".tugma {",
          "  background: linear-gradient(to right, #3498db, #2ecc71);",
          "}"
        ].join("\n") },

        { h2: "Shriftlar: font-family" },
        { p: "<code>font-family</code> matn shriftini belgilaydi. Unga bir necha shrift <strong>ro'yxat</strong> sifatida beriladi: brauzer birinchisini topolmasa, keyingisiga o'tadi. Oxirida umumiy \"zaxira\" oila (<code>sans-serif</code> yoki <code>serif</code>) yoziladi:" },
        { code: [
          "body {",
          "  font-family: Arial, Helvetica, sans-serif;",
          "}",
          "",
          "code {",
          '  font-family: "Courier New", monospace;',
          "}"
        ].join("\n") },
        { ul: [
          "<strong>serif</strong> — harflarda \"oyoqchalari\" bor (Times New Roman) — rasmiy, kitobiy;",
          "<strong>sans-serif</strong> — oyoqchasiz, sodda (Arial) — zamonaviy, ekran uchun eng qulay;",
          "<strong>monospace</strong> — har bir harf teng kenglikda (kod uchun)."
        ] },
        { note: "Zamonaviy saytlar ko'pincha Google Fonts kabi tashqi shriftlarni ulaydi. Buning uchun HTML'ning <code>&lt;head&gt;</code> qismiga <code>&lt;link&gt;</code> qo'shib, so'ng CSS'da <code>font-family</code>da o'sha shrift nomini yozasiz." },

        { h2: "font-size, font-weight, line-height" },
        { p: "Shriftning boshqa muhim xossalari:" },
        { ul: [
          "<strong>font-size</strong> — shrift o'lchami (<code>16px</code>, <code>1.2rem</code>);",
          "<strong>font-weight</strong> — qalinlik: <code>normal</code> (400), <code>bold</code> (700), yoki raqam (100-900);",
          "<strong>line-height</strong> — qatorlar orasidagi balandlik (o'qishga ta'sir qiladi);",
          "<strong>font-style</strong> — <code>italic</code> (kursiv) yoki <code>normal</code>."
        ] },
        { code: [
          "p {",
          "  font-size: 1rem;",
          "  font-weight: 400;",
          "  line-height: 1.6;    /* shrift o'lchamining 1.6 baravari */",
          "}",
          "",
          "h1 {",
          "  font-size: 2.5rem;",
          "  font-weight: 700;",
          "}"
        ].join("\n") },
        { tip: "<code>line-height</code>ni birliksiz raqam (masalan <code>1.6</code>) bilan bering — bu shrift o'lchamiga nisbatan hisoblanadi va eng moslashuvchan. Uzun matnlar uchun <strong>1.5-1.7</strong> oralig'i o'qishni ancha qulaylashtiradi — bu kichik detal, katta farq qiladi." },

        { h2: "Matn bezaklari" },
        { p: "Matnni tekislash va bezash xossalari:" },
        { code: [
          "h1 {",
          "  text-align: center;        /* left, right, center, justify */",
          "}",
          "",
          "a {",
          "  text-decoration: none;     /* havola tagidagi chiziqni olib tashlaydi */",
          "}",
          "",
          ".sarlavha {",
          "  text-transform: uppercase; /* BOSH HARFLARGA aylantiradi */",
          "  letter-spacing: 2px;       /* harflar orasi masofa */",
          "}"
        ].join("\n") },
        { ul: [
          "<strong>text-align</strong> — matnni tekislash (chap, o'ng, markaz, ikki chetga);",
          "<strong>text-decoration</strong> — <code>underline</code> (tagchiziq), <code>none</code>, <code>line-through</code> (ustidan chiziq);",
          "<strong>text-transform</strong> — <code>uppercase</code>, <code>lowercase</code>, <code>capitalize</code>;",
          "<strong>letter-spacing</strong> — harflar orasidagi masofa."
        ] },

        { h2: "border-radius — yumaloq burchaklar" },
        { p: "<code>border-radius</code> element burchaklarini yumaloqlaydi. Zamonaviy dizaynda tugma va kartalar deyarli har doim yumaloq burchakli bo'ladi:" },
        { code: [
          ".karta {",
          "  border-radius: 8px;      /* yengil yumaloq */",
          "}",
          "",
          ".tugma {",
          "  border-radius: 25px;     /* kuchli yumaloq (kapsula) */",
          "}",
          "",
          ".avatar {",
          "  width: 100px;",
          "  height: 100px;",
          "  border-radius: 50%;      /* to'liq doira */",
          "}"
        ].join("\n") },
        { note: "<code>border-radius: 50%</code> — kvadrat elementni <strong>ideal doira</strong>ga aylantiradi. Bu profil rasmlari (avatar) uchun eng ko'p ishlatiladigan hiyla." },

        { h2: "box-shadow — soya" },
        { p: "<code>box-shadow</code> element atrofiga soya qo'shib, unga \"hajm\" va \"chuqurlik\" beradi. Sintaksisi: <code>gorizontal vertikal yumshoqlik rang</code>:" },
        { code: [
          ".karta {",
          "  /* o'ng-past 4px, yumshoqlik 8px, shaffof qora */",
          "  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);",
          "}",
          "",
          "/* Yumshoqroq, tarqoq soya */",
          ".modal {",
          "  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);",
          "}"
        ].join("\n") },
        { tip: "Chiroyli soya siri — <strong>yumshoq va nozik</strong> bo'lishida. To'q, keskin soyalar eskicha ko'rinadi. Buning o'rniga past shaffoflik (masalan <code>0.1</code>-<code>0.2</code>) va kattaroq yumshoqlik (blur) ishlating — natija zamonaviy va tabiiy bo'ladi." },

        { h2: "transition — silliq o'tishlar" },
        { p: "<code>transition</code> xossa qiymati o'zgarganda o'zgarishni <strong>silliq (animatsiyali)</strong> qiladi — keskin sakramaydi. Ko'pincha <code>:hover</code> (sichqoncha ustiga kelganda) bilan birga ishlatiladi:" },
        { code: [
          ".tugma {",
          "  background-color: #3498db;",
          "  transition: background-color 0.3s;",
          "}",
          "",
          "/* Sichqoncha ustiga kelganda */",
          ".tugma:hover {",
          "  background-color: #2980b9;",
          "}"
        ].join("\n") },
        { p: "Bu misolda tugma ustiga kelganda rang <strong>0.3 sekundda</strong> silliq o'zgaradi. <code>transition</code> bo'lmasa, rang darhol \"sakrab\" o'zgargan bo'lardi. Sintaksis: <code>xossa davomiylik</code>. Bir necha xossani birdaniga ham berish mumkin:" },
        { code: [
          ".karta {",
          "  transition: transform 0.3s, box-shadow 0.3s;",
          "}",
          "",
          ".karta:hover {",
          "  transform: translateY(-5px);   /* biroz yuqoriga ko'tariladi */",
          "  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);",
          "}"
        ].join("\n") },
        { warn: "<code>transition: all</code> yozib, barcha xossalarni animatsiyalash mumkin, lekin bundan <strong>ehtiyot bo'ling</strong> — u ba'zan kutilmagan animatsiyalarga va sekinlashishga olib keladi. Faqat kerakli xossalarni aniq sanang (masalan <code>transition: background-color 0.3s</code>)." },

        { h2: "Amaliy misol: chiroyli tugma" },
        { p: "Ushbu darsda o'rgangan barcha bilimlarni birlashtirib, professional ko'rinadigan tugma yaratamiz:" },
        { code: [
          ".btn {",
          "  color: white;",
          "  background-color: #3498db;",
          "  padding: 12px 28px;",
          "  border: none;",
          "  border-radius: 8px;",
          "  font-size: 1rem;",
          "  font-weight: 600;",
          "  cursor: pointer;",
          "  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.3);",
          "  transition: background-color 0.3s, transform 0.2s;",
          "}",
          "",
          ".btn:hover {",
          "  background-color: #2980b9;",
          "  transform: translateY(-2px);",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<code>color</code> — matn rangi, <code>background-color</code> — fon rangi;",
          "Rang formatlari: <strong>nom</strong>, <strong>HEX</strong> (<code>#3498db</code>), <strong>RGB(A)</strong> (shaffoflik bilan), <strong>HSL</strong> (soyalarni yaratishga qulay);",
          "<code>font-family</code> — shrift ro'yxati (oxirida zaxira oila); <code>font-size</code>, <code>font-weight</code>, <code>line-height</code>;",
          "Uzun matn uchun <code>line-height: 1.5-1.7</code> — o'qishni yaxshilaydi;",
          "<code>text-align</code>, <code>text-decoration</code>, <code>text-transform</code> — matn bezaklari;",
          "<code>border-radius</code> — yumaloq burchak (<code>50%</code> = doira);",
          "<code>box-shadow</code> — yumshoq, nozik soya zamonaviy ko'rinadi;",
          "<code>transition</code> — <code>:hover</code> bilan silliq o'tishlar (<code>all</code>dan qoching)."
        ] }
      ]
    }
  ]
};
