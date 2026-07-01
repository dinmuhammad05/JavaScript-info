"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "JavaScript asoslari",
  lessons: [
    {
      slug: "turlarni-ozgartirish",
      title: "Turlarni o'zgartirish",
      blurb: "String, Number va Boolean konvertatsiyasi hamda qanday qiymatlar 0, false yoki NaN bo'lishi.",
      body: [
        { lead: "Ko'pincha operator va funksiyalar bergan qiymatimizni avtomatik ravishda kerakli turga o'giradi. Masalan, <code>alert</code> istalgan qiymatni matnga aylantirib ko'rsatadi. Ba'zan esa biz o'zimiz qiymatni aniq turga o'girishimiz kerak bo'ladi. Bu darsda uchta asosiy konvertatsiyani — matnga, songa va mantiqiy turga o'girishni ko'rib chiqamiz." },

        { note: "Bu darsda obyektlar (objects) haqida gapirmaymiz — obyektlarni o'girishni keyinroq, obyektlar mavzusidan so'ng alohida o'rganamiz. Hozircha faqat oddiy (primitiv) qiymatlar bilan ishlaymiz." },

        { h2: "String konvertatsiyasi (matnga o'girish)" },
        { p: "String konvertatsiyasi biror qiymatning matn ko'rinishi kerak bo'lganda ro'y beradi. Masalan, <code>alert(qiymat)</code> qiymatni ko'rsatish uchun uni matnga o'giradi." },
        { p: "Aniq o'girish uchun <code>String(qiymat)</code> funksiyasini chaqiramiz. U qiymatni matnga (string turiga) aylantiradi:" },
        { pg: "let qiymat = true;\nconsole.log(typeof qiymat); // boolean\n\nqiymat = String(qiymat); // endi qiymat = \"true\" matni\nconsole.log(typeof qiymat); // string\nconsole.log(qiymat); // true (lekin bu endi matn)", file: "string-konvertatsiya.js" },
        { p: "String konvertatsiyasi juda oddiy va oldindan aytsa bo'ladi. <code>false</code> matn sifatida <code>\"false\"</code> bo'ladi, <code>null</code> — <code>\"null\"</code> bo'ladi, va hokazo:" },
        { pg: "console.log( String(false) );     // \"false\"\nconsole.log( String(null) );      // \"null\"\nconsole.log( String(undefined) ); // \"undefined\"\nconsole.log( String(123) );       // \"123\"\nconsole.log( String(3.14) );      // \"3.14\"", file: "string-misollar.js" },
        { tip: "Sonni tez matnga o'girishning yana bir yo'li — bo'sh matnni qo'shish: <code>123 + \"\"</code> natijasi <code>\"123\"</code> bo'ladi. Buni operatorlar darsida batafsil ko'ramiz." },

        { h2: "Number konvertatsiyasi (songa o'girish)" },
        { p: "Songa o'girish matematik amallar va ifodalarda avtomatik sodir bo'ladi. Masalan, matnga bo'lish amalini qo'llaganda:" },
        { pg: "console.log( \"6\" / \"2\" ); // 3 — matnlar songa o'giriladi va bo'linadi", file: "auto-number.js" },
        { p: "Aniq o'girish uchun <code>Number(qiymat)</code> funksiyasidan foydalanamiz. Bu ayniqsa matn shaklidagi qiymatlarni (masalan, forma maydonlaridan olingan) son bilan ishlashdan oldin o'girishda kerak bo'ladi:" },
        { pg: "let matn = \"123\";\nconsole.log(typeof matn); // string\n\nlet son = Number(matn); // \"123\" -> 123\nconsole.log(typeof son); // number\nconsole.log(son + 1);    // 124 — endi haqiqiy son", file: "number-konvertatsiya.js" },
        { warn: "Agar matn son sifatida o'qib bo'lmaydigan bo'lsa, natija <strong>NaN</strong> (Not a Number — \"son emas\") bo'ladi. Bu qiymat qandaydir xatolik ro'y berganini bildiradi." },
        { pg: "let notaSon = Number(\"salom123\");\nconsole.log(notaSon); // NaN — matnni songa o'girib bo'lmadi\n\nconsole.log( Number(\"123abc\") ); // NaN\nconsole.log( Number(\"12.5\") );   // 12.5 — bu ishlaydi", file: "nan-misol.js" },

        { h3: "Number() konvertatsiya qoidalari" },
        { p: "Turli qiymatlar songa qanday o'girilishini quyidagi qoidalar aniqlaydi:" },
        { ul: [
          "<code>undefined</code> &rarr; <code>NaN</code> bo'ladi;",
          "<code>null</code> &rarr; <code>0</code> bo'ladi;",
          "<code>true</code> &rarr; <code>1</code>, <code>false</code> &rarr; <code>0</code> bo'ladi;",
          "<strong>Matn</strong>: boshi va oxiridagi bo'shliqlar (probel, tab, yangi qator) olib tashlanadi. Agar qolgan matn bo'sh bo'lsa &mdash; natija <code>0</code>. Aks holda son \"o'qiladi\"; xatolik bo'lsa &mdash; <code>NaN</code>."
        ] },
        { pg: "console.log( Number(\"   42   \") ); // 42 — bo'shliqlar tashlanadi\nconsole.log( Number(\"\") );        // 0 — bo'sh matn\nconsole.log( Number(true) );      // 1\nconsole.log( Number(false) );     // 0\nconsole.log( Number(null) );      // 0\nconsole.log( Number(undefined) ); // NaN", file: "number-qoidalar.js" },
        { note: "E'tibor bering: <code>null</code> songa o'girilganda <code>0</code> bo'ladi, ammo <code>undefined</code> esa <code>NaN</code> bo'ladi. Bu ikki qiymat o'xshash ko'rinsa-da, konvertatsiyada boshqacha ishlaydi." },

        { h2: "Boolean konvertatsiyasi (mantiqiy turga o'girish)" },
        { p: "Mantiqiy konvertatsiya eng oddiy. U mantiqiy amallarda (masalan, <code>if</code> shartida) avtomatik sodir bo'ladi, lekin aniq holda <code>Boolean(qiymat)</code> orqali ham chaqirsa bo'ladi." },
        { p: "Qoida sodda:" },
        { ul: [
          "Intuitiv ravishda \"bo'sh\" bo'lgan qiymatlar &mdash; <code>0</code>, bo'sh matn <code>\"\"</code>, <code>null</code>, <code>undefined</code> va <code>NaN</code> &mdash; <strong>false</strong> bo'ladi;",
          "Boshqa barcha qiymatlar &mdash; <strong>true</strong> bo'ladi."
        ] },
        { pg: "console.log( Boolean(1) );    // true\nconsole.log( Boolean(0) );    // false\nconsole.log( Boolean(\"salom\") ); // true\nconsole.log( Boolean(\"\") );   // false — bo'sh matn\nconsole.log( Boolean(null) ); // false\nconsole.log( Boolean(undefined) ); // false\nconsole.log( Boolean(NaN) );  // false", file: "boolean-konvertatsiya.js" },
        { warn: "Ko'p tillarda ichi bo'sh bo'lmagan matn <code>\"0\"</code> yolg'on (false) hisoblanadi. JavaScript'da esa <strong>ichida biror belgi bo'lgan har qanday matn true</strong> bo'ladi. Shu jumladan probeldan iborat matn ham!" },
        { pg: "console.log( Boolean(\"0\") );  // true — bu bo'sh emas, ichida \"0\" belgi bor!\nconsole.log( Boolean(\" \") );  // true — probel ham belgi, demak bo'sh emas\nconsole.log( Boolean(\"false\") ); // true — \"false\" matni bo'sh emas", file: "boolean-tuzoq.js" },
        { note: "Songa o'girishdagi <code>Number(\" \")</code> (probel) natijasi <code>0</code>, ammo <code>Boolean(\" \")</code> natijasi <code>true</code>. Ikkalasi turli qoidalarga bo'ysunadi — buni chalkashtirmang." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>String()</strong> — qiymatni matnga o'giradi; deyarli har doim tushunarli natija beradi;",
          "<strong>Number()</strong> — songa o'giradi: <code>undefined</code>&rarr;NaN, <code>null</code>&rarr;0, <code>true/false</code>&rarr;1/0, bo'sh matn&rarr;0, noto'g'ri matn&rarr;NaN;",
          "<strong>Boolean()</strong> — mantiqiy turga: <code>0</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> &rarr; false, qolganlari &rarr; true;",
          "Diqqat: <code>\"0\"</code> va probel <code>\" \"</code> — Boolean sifatida <strong>true</strong>."
        ] }
      ]
    },
    {
      slug: "operatorlar",
      title: "Asosiy operatorlar, matematika",
      blurb: "Matematik amallar, unar operatorlar, ustuvorlik, += kabi qisqartmalar va string+son xatti-harakati.",
      body: [
        { lead: "Ko'pgina operatorlarni maktabdan bilamiz: qo'shish +, ayirish -, ko'paytirish * va hokazo. Bu darsda esa maktabda o'qitilmaydigan tomonlariga — operatorlarning JavaScript'ga xos xususiyatlariga e'tibor beramiz." },

        { h2: "Atamalar: operand va operator" },
        { p: "Davom etishdan oldin ba'zi atamalarni aniqlashtiramiz:" },
        { ul: [
          "<strong>Operand</strong> — operator qo'llaniladigan qiymat. Masalan, <code>5 * 2</code> ifodasida ikkita operand bor: 5 va 2. Ba'zan ularni \"argument\" ham deyishadi;",
          "<strong>Unar</strong> operator — bitta operandga qo'llaniladi. Masalan, unar minus <code>-x</code> sonning ishorasini teskarisiga o'zgartiradi;",
          "<strong>Binar</strong> operator — ikkita operandga qo'llaniladi. Masalan, <code>5 - 2</code> dagi minus binar."
        ] },
        { pg: "let x = 5;\n\nx = -x; // unar minus — ishorani o'zgartirdi\nconsole.log(x); // -5\n\nconsole.log( 8 - 3 ); // 5 — binar minus (ayirish)", file: "unar-binar.js" },

        { h2: "Matematik amallar" },
        { p: "JavaScript quyidagi matematik amallarni qo'llab-quvvatlaydi:" },
        { ul: [
          "Qo'shish <code>+</code>",
          "Ayirish <code>-</code>",
          "Ko'paytirish <code>*</code>",
          "Bo'lish <code>/</code>",
          "Qoldiq (modul) <code>%</code>",
          "Darajaga ko'tarish <code>**</code>"
        ] },
        { h3: "Qoldiq %" },
        { p: "<code>%</code> operatori — bu foiz emas! <code>a % b</code> natijasi <code>a</code> ni <code>b</code> ga bo'lgandagi <strong>qoldiq</strong> bo'ladi:" },
        { pg: "console.log( 5 % 2 );  // 1 — 5 ni 2 ga bo'lganda qoldiq 1\nconsole.log( 8 % 3 );  // 2 — 8 ni 3 ga bo'lganda qoldiq 2\nconsole.log( 6 % 3 );  // 0 — teng bo'linadi\n\n// Qoldiq juft/toq sonni aniqlashda foydali:\nconsole.log( 10 % 2 ); // 0 — juft\nconsole.log( 7 % 2 );  // 1 — toq", file: "modul.js" },
        { h3: "Darajaga ko'tarish **" },
        { p: "<code>a ** b</code> ifodasi <code>a</code> ni <code>b</code>-darajaga ko'taradi:" },
        { pg: "console.log( 2 ** 2 ); // 4  (2 * 2)\nconsole.log( 2 ** 3 ); // 8  (2 * 2 * 2)\nconsole.log( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)\n\n// Kasr daraja ham ishlaydi — 1/2 daraja = kvadrat ildiz:\nconsole.log( 4 ** 0.5 ); // 2 — 4 ning kvadrat ildizi\nconsole.log( 27 ** (1/3) ); // 3 — kub ildizi", file: "daraja.js" },

        { h2: "Plyus (+) va matnlar" },
        { p: "Endi maktab matematikasidan farq qiladigan qismga o'tamiz. Odatda <code>+</code> sonlarni qo'shadi. Ammo agar operandlardan biri <strong>matn</strong> bo'lsa, <code>+</code> ularni songa qo'shmaydi, balki <strong>birlashtiradi</strong> (konkatenatsiya qiladi):" },
        { pg: "console.log( \"salom\" + \" dunyo\" ); // \"salom dunyo\"\nconsole.log( \"1\" + \"2\" ); // \"12\" — ikkalasi matn, birlashdi\nconsole.log( \"1\" + 2 );   // \"12\" — son ham matnga o'girildi\nconsole.log( 1 + \"2\" );   // \"12\" — bir tomoni matn bo'lsa yetarli\nconsole.log( 2 + 2 + \"1\" ); // \"41\" — avval 2+2=4, keyin 4+\"1\"=\"41\"", file: "plyus-matn.js" },
        { warn: "Diqqat qiling: operatorlar chapdan o'ngga ishlaydi. <code>2 + 2 + \"1\"</code> da avval <code>2 + 2 = 4</code> hisoblanadi, so'ng <code>4 + \"1\" = \"41\"</code> bo'ladi. Lekin <code>\"1\" + 2 + 2</code> esa <code>\"122\"</code> beradi — chunki birinchi qadamdan boshlab matn ishtirok etadi." },
        { note: "Bu xatti-harakat faqat <code>+</code> operatoriga xos. Boshqa arifmetik operatorlar (<code>-</code>, <code>*</code>, <code>/</code>) matnni doim songa o'giradi:" },
        { pg: "console.log( \"6\" - \"2\" ); // 4 — matnlar songa o'girildi\nconsole.log( \"6\" / \"2\" ); // 3\nconsole.log( \"6\" * 2 );   // 12\nconsole.log( \"salom\" - 1 ); // NaN — matnni songa o'girib bo'lmadi", file: "boshqa-operatorlar.js" },

        { h2: "Unar plyus va son konvertatsiyasi" },
        { p: "Unar plyus <code>+</code> (bitta operandga qo'llanganda) songa hech qanday ta'sir qilmaydi. Ammo agar operand son bo'lmasa, uni <strong>songa o'giradi</strong> — xuddi <code>Number()</code> kabi, lekin qisqaroq:" },
        { pg: "console.log( +5 );    // 5 — sonda hech nima o'zgarmaydi\nconsole.log( +\"5\" );  // 5 — matn songa o'girildi\nconsole.log( +true ); // 1\nconsole.log( +\"\" );   // 0\n\nlet a = \"10\";\nlet b = \"20\";\nconsole.log( a + b );   // \"1020\" — matnlar birlashdi\nconsole.log( +a + +b ); // 30 — avval har birini songa o'girdik", file: "unar-plyus.js" },
        { tip: "<code>+a + +b</code> yozuvi qisqa va ko'p ishlatiladi. Unar plyuslar birinchi ishlaydi (ustuvorligi yuqori), so'ng ikki son binar plyus bilan qo'shiladi." },

        { h2: "Operatorlar ustuvorligi" },
        { p: "Agar bir ifodada bir nechta operator bo'lsa, ularning bajarilish tartibi <strong>ustuvorlik</strong> (precedence) bilan aniqlanadi. Maktabdan bilamiz: ko'paytirish qo'shishdan oldin bajariladi. Bu — ko'paytirishning ustuvorligi yuqoriroq degani:" },
        { pg: "console.log( 2 + 2 * 2 );   // 6, chunki avval 2*2=4, keyin 2+4\nconsole.log( (2 + 2) * 2 ); // 8, qavs ustuvorlikni o'zgartiradi", file: "ustuvorlik.js" },
        { p: "Ustuvorlik jadvalidan ba'zi qatorlar (yuqoridagilar avval bajariladi):" },
        { ul: [
          "Unar plyus/minus <code>+x</code>, <code>-x</code> — yuqori;",
          "Darajaga ko'tarish <code>**</code>;",
          "Ko'paytirish/bo'lish <code>*</code>, <code>/</code>;",
          "Qo'shish/ayirish <code>+</code>, <code>-</code>;",
          "Tayinlash (assignment) <code>=</code> — eng past."
        ] },

        { h2: "Tayinlash ham qiymat qaytaradi" },
        { p: "JavaScript'da <code>=</code> (tayinlash) ham operator hisoblanadi. U o'zgaruvchiga qiymat yozadi va shu qiymatni <strong>qaytaradi</strong>. Shuning uchun quyidagi kod ishlaydi (garchi o'qish qiyin bo'lsa ham):" },
        { pg: "let a = 1;\nlet b = 2;\n\nlet c = 3 - (a = b + 1);\nconsole.log(a); // 3  (b+1 = 3, a ga yozildi)\nconsole.log(c); // 0  (3 - 3)", file: "assign-qaytaradi.js" },
        { warn: "Bunday yozuv (tayinlashni ifoda ichida ishlatish) kodni tushunarsiz qiladi. Bilib qo'ying, lekin amalda bunday yozmang." },

        { h2: "Qisqartma tayinlash operatorlari" },
        { p: "Bir o'zgaruvchiga amal qo'llab, natijani o'ziga yozish juda ko'p uchraydi. Buning uchun qisqartma operatorlar bor: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>, <code>**=</code>:" },
        { pg: "let n = 2;\nn += 5; // n = n + 5 bilan bir xil\nconsole.log(n); // 7\n\nn *= 2; // n = n * 2\nconsole.log(n); // 14\n\nlet s = \"salom\";\ns += \" dunyo\"; // matnlar uchun ham ishlaydi\nconsole.log(s); // \"salom dunyo\"", file: "qisqartma.js" },
        { note: "Bu operatorlarning ustuvorligi oddiy tayinlash <code>=</code> bilan bir xil — past. Shuning uchun ular boshqa hisoblardan keyin bajariladi: <code>n *= 3 + 5</code> avval <code>3 + 5 = 8</code> ni hisoblab, so'ng <code>n *= 8</code> qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "Matematik operatorlar: <code>+ - * / % **</code>;",
          "<code>+</code> operandlardan biri matn bo'lsa — birlashtiradi (konkatenatsiya), boshqa operatorlar esa songa o'giradi;",
          "Unar plyus <code>+x</code> — qiymatni tez songa o'girish usuli;",
          "Ustuvorlik amallar tartibini belgilaydi; qavs uni o'zgartiradi;",
          "<code>=</code> ham qiymat qaytaradi;",
          "Qisqartmalar: <code>+= -= *= /= %= **=</code>."
        ] }
      ]
    },
    {
      slug: "taqqoslashlar",
      title: "Taqqoslashlar",
      blurb: "Taqqoslash operatorlari, == va === farqi, matnlarni leksikografik taqqoslash, null/undefined tuzoqlari.",
      body: [
        { lead: "Ko'p taqqoslash operatorlarini matematikadan bilamiz. JavaScript'da ular quyidagicha yoziladi: katta/kichik <code>&gt;</code> <code>&lt;</code>, katta yoki teng / kichik yoki teng <code>&gt;=</code> <code>&lt;=</code>, teng <code>==</code>, teng emas <code>!=</code>. Bu darsda ularning JavaScript'ga xos nozik tomonlarini o'rganamiz." },

        { h2: "Taqqoslash natijasi — boolean" },
        { p: "Barcha taqqoslash operatorlari mantiqiy qiymat qaytaradi: <code>true</code> (rost) yoki <code>false</code> (yolg'on):" },
        { pg: "console.log( 2 > 1 );  // true — rost\nconsole.log( 2 == 1 ); // false — yolg'on\nconsole.log( 2 != 1 ); // true — rost\n\n// Natijani o'zgaruvchiga ham yozib olsa bo'ladi:\nlet natija = 5 > 4;\nconsole.log(natija); // true", file: "taqqoslash-boolean.js" },

        { h2: "Matnlarni taqqoslash" },
        { p: "Bir matn ikkinchisidan katta yoki kichikligini bilish uchun JavaScript <strong>leksikografik</strong> (lug'atdagi) tartibdan foydalanadi: matnlar belgi-belgi solishtiriladi:" },
        { pg: "console.log( \"a\" < \"b\" );     // true — \"a\" alifboda oldinroq\nconsole.log( \"Z\" < \"a\" );     // true — katta harflar oldinroq (kod raqami kichik)\nconsole.log( \"olma\" < \"olcha\" ); // false — 3-belga: \"m\" > \"c\"\nconsole.log( \"olma\" < \"olmalar\" ); // true — qisqasi kichik", file: "matn-taqqoslash.js" },
        { p: "Algoritm quyidagicha ishlaydi:" },
        { ol: [
          "Ikki matnning birinchi belgilari solishtiriladi;",
          "Agar birinchisiniki kattaroq bo'lsa — birinchi matn kattaroq va tugadi;",
          "Agar teng bo'lsa — keyingi belgilar solishtiriladi;",
          "Belgilar tugaguncha davom etadi; qaysi matn uzunroq bo'lsa, o'sha kattaroq (agar boshi bir xil bo'lsa)."
        ] },
        { note: "Bu \"lug'atdagi\" tartib emas, balki <strong>Unicode</strong> tartibi. Har bir belgining raqamli kodi bor. Katta harflar (A-Z) kichik harflardan (a-z) oldin keladi, shuning uchun <code>\"B\" < \"a\"</code> rost bo'ladi." },

        { h2: "Turli tur qiymatlarini taqqoslash" },
        { p: "Turli turdagi qiymatlarni <code>&gt;</code>, <code>&lt;</code> bilan solishtirganda JavaScript ularni <strong>songa</strong> o'giradi:" },
        { pg: "console.log( \"2\" > 1 );  // true — \"2\" son 2 ga o'girildi\nconsole.log( \"01\" == 1 ); // true — \"01\" son 1 ga o'girildi\nconsole.log( true == 1 );  // true — true son 1 ga o'girildi\nconsole.log( false == 0 ); // true — false son 0 ga o'girildi", file: "turli-tur.js" },

        { h2: "Qattiq tenglik === (uch teng)" },
        { p: "Oddiy <code>==</code> tekshiruvining muammosi bor: u <strong>0</strong> va <strong>false</strong> ni farqlay olmaydi, chunki turlarni songa o'giradi:" },
        { pg: "console.log( 0 == false );  // true — turlar songa o'girildi\nconsole.log( \"\" == false ); // true — bo'sh matn ham false\n\n// Bu chalkashlikka olib kelishi mumkin!", file: "tenglik-muammo.js" },
        { p: "Bu chalkashlikning oldini olish uchun <strong>qattiq tenglik</strong> operatori <code>===</code> ishlatiladi. U turlarni o'girmaydi — agar <code>a</code> va <code>b</code> turlari boshqa bo'lsa, <code>a === b</code> darhol <code>false</code> qaytaradi:" },
        { pg: "console.log( 0 === false ); // false — turlar boshqa (number va boolean)\nconsole.log( 0 == false );  // true — oddiy tenglik songa o'girdi\n\nconsole.log( \"1\" === 1 );   // false — string va number\nconsole.log( 1 === 1 );     // true — ikkalasi ham son, teng", file: "qattiq-tenglik.js" },
        { p: "Xuddi shunday, qattiq tengsizlik operatori <code>!==</code> ham bor:" },
        { pg: "console.log( \"5\" !== 5 ); // true — turlar boshqa, demak teng emas\nconsole.log( 5 !== 5 );   // false — teng", file: "qattiq-tengsizlik.js" },
        { tip: "Deyarli har doim <code>===</code> va <code>!==</code> dan foydalaning. Ular xatosiz va bashorat qilinadigan natija beradi. <code>==</code> ni faqat aniq maqsad bilan ishlating." },

        { h2: "null va undefined bilan taqqoslash tuzoqlari" },
        { p: "Bu qiymatlar taqqoslashda alohida va \"g'alati\" ishlaydi. Diqqat bilan o'rganamiz." },
        { h3: "Qattiq tenglik ===" },
        { p: "<code>null === undefined</code> — <strong>false</strong> bo'ladi, chunki ular turli turlar:" },
        { pg: "console.log( null === undefined ); // false — turlar boshqa", file: "null-strict.js" },
        { h3: "Oddiy tenglik ==" },
        { p: "<code>null == undefined</code> esa <strong>true</strong> bo'ladi. Bu maxsus qoida: <code>==</code> uchun ular bir-biriga teng, lekin boshqa hech qanday qiymatga teng emas:" },
        { pg: "console.log( null == undefined ); // true — maxsus qoida\nconsole.log( null == 0 );         // false — null 0 ga teng EMAS\nconsole.log( undefined == 0 );    // false — undefined ham 0 ga teng emas", file: "null-loose.js" },
        { h3: "null va matematik taqqoslashlar" },
        { warn: "Eng qiziq tuzoq shu yerda. <code>null &gt; 0</code>, <code>null == 0</code> va <code>null &gt;= 0</code> ni birga ko'rsak, mantiqsizday tuyuladi:" },
        { pg: "console.log( null > 0 );  // false\nconsole.log( null == 0 ); // false\nconsole.log( null >= 0 ); // true — !\n\n// null > 0 false, null == 0 ham false, lekin null >= 0 true?!", file: "null-tuzoq.js" },
        { p: "Sabab: <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> operatorlari <code>null</code> ni <strong>songa</strong> (0 ga) o'giradi. Shuning uchun <code>null &gt;= 0</code> aslida <code>0 &gt;= 0</code> bo'lib, true chiqadi. Ammo <code>==</code> operatori uchun alohida qoida bor: u <code>null</code> ni songa o'girmaydi va <code>null</code> faqat <code>undefined</code> ga teng deb hisoblaydi. Shuning uchun <code>null == 0</code> false." },
        { h3: "undefined bilan taqqoslash" },
        { p: "<code>undefined</code> ni son bilan solishtirsak, natija doim <strong>false</strong> bo'ladi, chunki <code>undefined</code> songa o'girilganda <code>NaN</code> bo'ladi, va NaN har qanday taqqoslashda false beradi:" },
        { pg: "console.log( undefined > 0 );  // false\nconsole.log( undefined < 0 );  // false\nconsole.log( undefined == 0 ); // false", file: "undefined-taqqoslash.js" },
        { tip: "Muammolardan qochish uchun oddiy qoida: <code>null</code> va <code>undefined</code> ni <code>&gt; &lt; &gt;= &lt;=</code> bilan ehtiyotsiz solishtirmang. Agar o'zgaruvchi shu qiymatlarga ega bo'lishi mumkin bo'lsa, avval alohida tekshiring." },

        { h2: "Xulosa" },
        { ul: [
          "Taqqoslash operatorlari boolean qaytaradi;",
          "Matnlar belgi-belgi, Unicode tartibida (leksikografik) solishtiriladi;",
          "Turli tur qiymatlari <code>&gt; &lt;</code> uchun songa o'giriladi;",
          "<code>==</code> turlarni o'giradi, <code>===</code> o'girmaydi — <code>===</code> ni afzal ko'ring;",
          "<code>null == undefined</code> true, lekin ular boshqa hech narsaga teng emas;",
          "<code>null &gt;= 0</code> true, lekin <code>null == 0</code> false — bu tuzoqdan ehtiyot bo'ling."
        ] }
      ]
    },
    {
      slug: "if-else",
      title: "Shartli operatorlar: if, ?",
      blurb: "if/else if/else konstruksiyasi, shartning boolean'ga o'girilishi va ternar operator ? :.",
      body: [
        { lead: "Ba'zan turli shartlarga qarab turli amallarni bajarish kerak bo'ladi. Buning uchun <code>if</code> operatoridan va \"savol belgisi\" deb ataluvchi ternar operatordan <code>?</code> foydalanamiz." },

        { h2: "if operatori" },
        { p: "<code>if(...)</code> operatori qavs ichidagi shartni hisoblaydi va uni <code>true</code> ga o'girsa, ichidagi kodni bajaradi:" },
        { pg: "let yosh = 20;\n\nif (yosh >= 18) {\n  console.log(\"Siz voyaga yetgansiz\");\n}\n\n// Shart false bo'lsa, ichidagi kod bajarilmaydi:\nif (yosh > 100) {\n  console.log(\"Bu satr chiqmaydi\");\n}", file: "if-oddiy.js" },
        { tip: "Agar blok ichida bitta amal bo'lsa ham, uni <code>{ }</code> qavs ichiga olish tavsiya etiladi — bu kodni o'qishni osonlashtiradi va xatolarning oldini oladi." },

        { h2: "Shart boolean'ga o'giriladi" },
        { p: "<code>if</code> qavs ichidagi ifodani hisoblab, natijasini <strong>boolean</strong> turiga o'giradi. Bu o'zgartirish oldingi darsdagi qoidalar bo'yicha ketadi. Eslatib o'tsak:" },
        { ul: [
          "<code>0</code>, bo'sh matn <code>\"\"</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code> &mdash; <strong>false</strong> (\"falsy\" qiymatlar);",
          "Boshqa barcha qiymatlar &mdash; <strong>true</strong> (\"truthy\" qiymatlar)."
        ] },
        { pg: "if (0) {\n  console.log(\"bu hech qachon chiqmaydi\"); // 0 -> false\n}\n\nif (1) {\n  console.log(\"bu doim chiqadi\"); // 1 -> true\n}\n\nlet ism = \"Ali\";\nif (ism) { // bo'sh bo'lmagan matn -> true\n  console.log(\"Ism kiritilgan: \" + ism);\n}", file: "if-boolean.js" },
        { note: "Shartni oldindan hisoblab, keyin <code>if</code> ga berish ham mumkin: <code>let shart = (yosh &gt;= 18); if (shart) {...}</code>. Bu murakkab shartlarni o'qishni osonlashtiradi." },

        { h2: "else bloki" },
        { p: "<code>if</code> ga ixtiyoriy <code>else</code> bloki qo'shsa bo'ladi. U shart <strong>false</strong> bo'lganda bajariladi:" },
        { pg: "let yosh = 15;\n\nif (yosh >= 18) {\n  console.log(\"Voyaga yetgansiz\");\n} else {\n  console.log(\"Hali voyaga yetmagansiz\");\n}\n// Chiqadi: Hali voyaga yetmagansiz", file: "if-else.js" },

        { h2: "Bir nechta shart: else if" },
        { p: "Ba'zan bir nechta variantni tekshirish kerak. Buning uchun <code>else if</code> ishlatiladi:" },
        { pg: "let baho = 4;\n\nif (baho === 5) {\n  console.log(\"A'lo\");\n} else if (baho === 4) {\n  console.log(\"Yaxshi\");\n} else if (baho === 3) {\n  console.log(\"Qoniqarli\");\n} else {\n  console.log(\"Qoniqarsiz\");\n}\n// Chiqadi: Yaxshi", file: "else-if.js" },
        { p: "Shartlar yuqoridan pastga ketma-ket tekshiriladi. Qaysi biri birinchi bo'lib <code>true</code> bersa, o'sha blok ishlaydi va qolganlari tekshirilmaydi. Agar hech biri mos kelmasa — oxirgi <code>else</code> ishlaydi." },

        { h2: "Ternar operator ? :" },
        { p: "Ba'zan bir shartga qarab o'zgaruvchiga qiymat tayinlash kerak bo'ladi. Buni <code>if</code> bilan yozsak, uzun bo'ladi:" },
        { code: "let ruxsat;\nlet yosh = 20;\n\nif (yosh >= 18) {\n  ruxsat = true;\n} else {\n  ruxsat = false;\n}" },
        { p: "Ternar (uchlik) operator <code>?</code> buni bir qatorga jamlaydi. Sintaksisi:" },
        { code: "let natija = shart ? qiymat1 : qiymat2;" },
        { p: "Avval <code>shart</code> hisoblanadi. Agar u <code>true</code> bo'lsa — <code>qiymat1</code> qaytariladi, aks holda <code>qiymat2</code>:" },
        { pg: "let yosh = 20;\nlet ruxsat = (yosh >= 18) ? true : false;\nconsole.log(ruxsat); // true\n\n// Boshqa misol:\nlet narx = 1000;\nlet xabar = (narx > 500) ? \"qimmat\" : \"arzon\";\nconsole.log(xabar); // \"qimmat\"", file: "ternar.js" },
        { note: "Shart atrofidagi qavs shart emas, lekin u kodni o'qishni osonlashtiradi. Yuqoridagi <code>yosh &gt;= 18</code> allaqachon boolean qaytargani uchun <code>? true : false</code> ortiqcha — <code>let ruxsat = (yosh &gt;= 18);</code> deb yozish yetarli. Ternar boshqa qiymatlar qaytaradigan hollarda foydali." },

        { h2: "Ichma-ich (nested) ternar" },
        { p: "Bir nechta shartni ternar orqali ketma-ket tekshirsa bo'ladi:" },
        { pg: "let yosh = 25;\n\nlet toifa = (yosh < 13) ? \"bola\" :\n            (yosh < 18) ? \"o'smir\" :\n            (yosh < 65) ? \"kattalar\" :\n            \"keksa\";\n\nconsole.log(toifa); // \"kattalar\"", file: "nested-ternar.js" },
        { p: "Bu qanday ishlashini ko'raylik. Avval <code>yosh &lt; 13</code> tekshiriladi — false. So'ng <code>yosh &lt; 18</code> — false. Keyin <code>yosh &lt; 65</code> — true, demak <code>\"kattalar\"</code> qaytariladi." },
        { warn: "Ichma-ich ternarni ehtiyotkorlik bilan ishlating. Ikki-uchtadan ortiq shart bo'lsa, kodni o'qish qiyinlashadi. Bunday holatda <code>if / else if</code> ni afzal ko'ring — u aniqroq va tushunarliroq." },
        { tip: "Ternarni faqat qiymat qaytarish uchun ishlating. Agar shartga qarab bir nechta amal bajarish kerak bo'lsa (masalan, funksiyalar chaqirish), <code>if</code> dan foydalaning — bu to'g'ri va tushunarli yondashuv." },

        { h2: "Xulosa" },
        { ul: [
          "<code>if(shart) { ... }</code> — shart true bo'lsa blok bajariladi;",
          "Shart avtomatik boolean'ga o'giriladi (falsy va truthy qoidalari bo'yicha);",
          "<code>else</code> — shart false bo'lgandagi holat; <code>else if</code> — bir nechta variant;",
          "Ternar <code>shart ? a : b</code> — qisqa, qiymat qaytarish uchun ideal;",
          "Ichma-ich ternar mumkin, lekin uni oddiy holatlar bilan cheklang."
        ] }
      ]
    },
    {
      slug: "mantiqiy-operatorlar",
      title: "Mantiqiy operatorlar",
      blurb: "|| && ! operatorlari, qisqa tutashuv (short-circuit) va ularning qiymat qaytarish xususiyati.",
      body: [
        { lead: "JavaScript'da uchta mantiqiy operator bor: <code>||</code> (YOKI), <code>&amp;&amp;</code> (VA) va <code>!</code> (EMAS). Ular \"mantiqiy\" deb atalsa-da, aslida istalgan turdagi qiymatlarga qo'llaniladi va natija sifatida ham istalgan turdagi qiymat qaytarishi mumkin. Keling, chuqur o'rganamiz." },

        { h2: "|| (YOKI)" },
        { p: "Ikki operandli oddiy holatda <code>||</code> agar operandlardan hech bo'lmaganda bittasi <code>true</code> bo'lsa, <code>true</code> qaytaradi:" },
        { pg: "console.log( true || true );   // true\nconsole.log( false || true );  // true\nconsole.log( true || false );  // true\nconsole.log( false || false ); // false", file: "yoki-oddiy.js" },
        { p: "Agar operand boolean bo'lmasa, u tekshirish uchun boolean'ga o'giriladi:" },
        { pg: "let soat = 9;\n\nif (soat < 10 || soat > 18) {\n  console.log(\"Ofis yopiq\");\n}\n// Chiqadi: Ofis yopiq (soat < 10 rost)", file: "yoki-if.js" },

        { h2: "|| birinchi truthy qiymatni topadi (short-circuit)" },
        { p: "Endi <code>||</code> ning JavaScript'ga xos kuchli xususiyatini ko'ramiz. U shunday ishlaydi:" },
        { ol: [
          "Operandlarni chapdan o'ngga baholaydi;",
          "Har birini boolean'ga o'giradi. Agar natija <code>true</code> bo'lsa — to'xtaydi va <strong>o'sha operandning asl (o'girilmagan) qiymatini</strong> qaytaradi;",
          "Agar barcha operandlar false bo'lsa — oxirgi operandni qaytaradi."
        ] },
        { p: "Ya'ni <code>||</code> boolean emas, balki <strong>birinchi truthy qiymatni</strong> yoki barchasi falsy bo'lsa — oxirgisini qaytaradi:" },
        { pg: "console.log( 1 || 0 );       // 1 — birinchi truthy\nconsole.log( null || 1 );    // 1 — birinchi truthy\nconsole.log( null || 0 || 1 ); // 1 — birinchi truthy\nconsole.log( undefined || null || 0 ); // 0 — hammasi falsy, oxirgisi", file: "yoki-qiymat.js" },
        { p: "Bu xususiyatning amaliy qo'llanishi — <strong>ro'yxatdan birinchi \"to'ldirilgan\" qiymatni tanlash</strong>:" },
        { pg: "let ism = \"\";\nlet familiya = null;\nlet taxallus = \"SuperUser\";\n\n// Birinchi bo'sh bo'lmagan qiymatni tanlaymiz:\nconsole.log( ism || familiya || taxallus || \"Anonim\" );\n// Chiqadi: SuperUser", file: "yoki-default.js" },
        { note: "<code>||</code> zanjiri qiymatlarni chapdan o'ngga tekshiradi. Bo'sh matn va <code>null</code> falsy bo'lgani uchun ular o'tkazib yuboriladi, birinchi truthy qiymat — <code>\"SuperUser\"</code> tanlanadi." },

        { h2: "Qisqa tutashuv (short-circuit evaluation)" },
        { p: "<code>||</code> ning yana bir xususiyati — <strong>qisqa tutashuv</strong>. Chapdagi operand truthy bo'lsa, o'ngdagisi umuman baholanmaydi. Bu, agar operandda funksiya chaqiruvi yoki qo'shimcha ta'sir (side effect) bo'lsa, muhim:" },
        { pg: "// Chap tomon true bo'lgani uchun o'ng tomon ISHGA TUSHMAYDI:\ntrue || console.log(\"bu chiqmaydi\");\n\n// Chap tomon false, shuning uchun o'ng tomon ishlaydi:\nfalse || console.log(\"bu chiqadi\");", file: "short-circuit-yoki.js" },
        { warn: "Qisqa tutashuvni amal bajarish uchun <code>if</code> o'rniga ishlatish mumkin, lekin bu kodni o'qishni qiyinlashtiradi. Amallar uchun <code>if</code>, qiymat tanlash uchun <code>||</code> dan foydalaning." },

        { h2: "&& (VA)" },
        { p: "<code>&amp;&amp;</code> operatori oddiy holatda ikkala operand ham <code>true</code> bo'lgandagina <code>true</code> qaytaradi:" },
        { pg: "console.log( true && true );   // true\nconsole.log( false && true );  // false\nconsole.log( true && false );  // false\nconsole.log( false && false ); // false\n\nlet soat = 12, daqiqa = 30;\nif (soat === 12 && daqiqa === 30) {\n  console.log(\"Vaqt: 12:30\");\n}", file: "va-oddiy.js" },

        { h2: "&& birinchi falsy qiymatni topadi" },
        { p: "<code>&amp;&amp;</code> ham xuddi <code>||</code> kabi qiymat qaytaradi, lekin teskarisicha ishlaydi:" },
        { ol: [
          "Operandlarni chapdan o'ngga baholaydi;",
          "Har birini boolean'ga o'giradi. Agar natija <code>false</code> bo'lsa — to'xtaydi va <strong>o'sha operandning asl qiymatini</strong> qaytaradi;",
          "Agar barcha operandlar truthy bo'lsa — oxirgisini qaytaradi."
        ] },
        { p: "Ya'ni <code>&amp;&amp;</code> <strong>birinchi falsy qiymatni</strong>, yoki hech biri falsy bo'lmasa — oxirgisini qaytaradi:" },
        { pg: "console.log( 1 && 0 );       // 0 — birinchi falsy\nconsole.log( 1 && 5 );       // 5 — hammasi truthy, oxirgisi\nconsole.log( null && 5 );    // null — birinchi falsy\nconsole.log( 1 && 2 && 3 );  // 3 — hammasi truthy, oxirgisi\nconsole.log( 1 && null && 2 ); // null — birinchi falsy", file: "va-qiymat.js" },
        { tip: "<code>&amp;&amp;</code> ustuvorligi <code>||</code> dan yuqori. Shuning uchun <code>a || b &amp;&amp; c</code> aslida <code>a || (b &amp;&amp; c)</code> deb hisoblanadi. Chalkashlikdan qochish uchun murakkab ifodalarda qavs ishlating." },

        { h2: "! (EMAS)" },
        { p: "<code>!</code> operatori bitta operandga qo'llaniladi va quyidagicha ishlaydi:" },
        { ol: [
          "Operandni boolean'ga o'giradi: <code>true / false</code>;",
          "Uning teskarisini qaytaradi."
        ] },
        { pg: "console.log( !true );  // false\nconsole.log( !0 );     // true — 0 falsy, teskarisi true\nconsole.log( !\"salom\" ); // false — matn truthy, teskarisi false", file: "emas.js" },
        { p: "Ikki marta <code>!!</code> qo'llash — qiymatni <strong>boolean'ga o'girishning</strong> keng tarqalgan usuli (xuddi <code>Boolean()</code> kabi):" },
        { pg: "console.log( !!\"salom\" ); // true\nconsole.log( !!null );    // false\nconsole.log( !!0 );       // false\nconsole.log( !!1 );       // true\n\n// Boolean() bilan bir xil natija:\nconsole.log( Boolean(\"salom\") ); // true", file: "ikki-emas.js" },
        { note: "<code>!</code> operatorining ustuvorligi barcha mantiqiy operatorlar ichida eng yuqori. Shuning uchun u har doim <code>&amp;&amp;</code> va <code>||</code> dan oldin bajariladi." },

        { h2: "Amaliy qo'llanish" },
        { p: "Mantiqiy operatorlarning qiymat qaytarish xususiyati amalda juda foydali. Masalan, standart (default) qiymat berish:" },
        { pg: "function salomla(ism) {\n  // Agar ism bo'sh bo'lsa, \"mehmon\" ishlatiladi:\n  let natija = ism || \"mehmon\";\n  return \"Salom, \" + natija + \"!\";\n}\n\nconsole.log( salomla(\"Ali\") ); // Salom, Ali!\nconsole.log( salomla(\"\") );    // Salom, mehmon!", file: "amaliy.js" },
        { p: "<code>&amp;&amp;</code> esa \"agar rost bo'lsa, bajar\" mantig'i uchun ishlatiladi:" },
        { pg: "let foydalanuvchi = { ism: \"Ali\", faol: true };\n\n// faol bo'lsagina xabar chiqadi:\nfoydalanuvchi.faol && console.log(\"Foydalanuvchi faol\");\n// Chiqadi: Foydalanuvchi faol", file: "va-amaliy.js" },

        { h2: "Xulosa" },
        { ul: [
          "<code>||</code> — birinchi truthy qiymatni (yoki oxirgisini) qaytaradi;",
          "<code>&amp;&amp;</code> — birinchi falsy qiymatni (yoki oxirgisini) qaytaradi;",
          "<code>!</code> — qiymatni boolean'ga o'girib, teskarisini qaytaradi; <code>!!</code> — boolean'ga o'girish;",
          "Qisqa tutashuv: kerak bo'lmasa, o'ng operand baholanmaydi;",
          "Ustuvorlik: <code>!</code> &gt; <code>&amp;&amp;</code> &gt; <code>||</code>;",
          "Amaliy: default qiymat (<code>||</code>) va shartli bajarish (<code>&amp;&amp;</code>)."
        ] }
      ]
    },
    {
      slug: "nullish",
      title: "Nullish birlashtiruvchi operator ??",
      blurb: "?? operatori nima, uning || dan farqi (0 va bo'sh matn holatlari) va ustuvorligi.",
      body: [
        { lead: "<code>??</code> — nisbatan yangi operator (2020-yilda qo'shilgan). U \"aniqlangan\" birinchi qiymatni topish uchun ishlatiladi va <code>||</code> ning ba'zi kamchiliklarini bartaraf etadi." },

        { h2: "?? operatori nima?" },
        { p: "<code>a ?? b</code> ifodasining natijasi:" },
        { ul: [
          "Agar <code>a</code> <strong>aniqlangan</strong> bo'lsa (ya'ni <code>null</code> ham, <code>undefined</code> ham bo'lmasa) &mdash; <code>a</code> qaytariladi;",
          "Aks holda &mdash; <code>b</code> qaytariladi."
        ] },
        { p: "Boshqacha aytganda, <code>??</code> qiymat <code>null</code> yoki <code>undefined</code> ekanini tekshiradi. Buni oddiy <code>if</code> bilan ham yozsa bo'lardi:" },
        { code: "// a ?? b quyidagiga teng:\nlet natija = (a !== null && a !== undefined) ? a : b;" },
        { pg: "let ism = null;\nconsole.log( ism ?? \"Anonim\" ); // \"Anonim\" — ism null edi\n\nlet familiya = \"Valiyev\";\nconsole.log( familiya ?? \"Noma'lum\" ); // \"Valiyev\" — aniqlangan qiymat", file: "nullish-oddiy.js" },
        { p: "Amaliy qo'llanishi — o'zgaruvchi \"belgilanmagan\" bo'lsa, standart qiymat ko'rsatish:" },
        { pg: "let foydalanuvchi;\nconsole.log( foydalanuvchi ?? \"Mehmon\" ); // \"Mehmon\"\n\nfoydalanuvchi = \"Ali\";\nconsole.log( foydalanuvchi ?? \"Mehmon\" ); // \"Ali\"", file: "nullish-default.js" },

        { h2: "?? va || farqi — eng muhim qism" },
        { p: "Bir qarashda <code>??</code> va <code>||</code> bir xil ko'rinadi. Haqiqatan ham, ko'p holatlarda ular bir xil natija beradi. Ammo muhim farq bor:" },
        { ul: [
          "<code>||</code> birinchi <strong>truthy</strong> qiymatni qaytaradi;",
          "<code>??</code> birinchi <strong>aniqlangan</strong> (null/undefined bo'lmagan) qiymatni qaytaradi."
        ] },
        { p: "Bu farq ayniqsa <code>0</code> va bo'sh matn <code>\"\"</code> uchun juda muhim. Bu qiymatlar falsy, lekin ular aniqlangan (mavjud) qiymatlar!" },
        { pg: "let soni = 0;\n\nconsole.log( soni || 100 ); // 100 — 0 falsy, shuning uchun 100 tanlandi\nconsole.log( soni ?? 100 ); // 0 — 0 aniqlangan qiymat, uni qaytardi", file: "nol-farq.js" },
        { warn: "Farqni yaxshi anglang: agar <code>0</code> yoki <code>\"\"</code> to'g'ri va kutilgan qiymat bo'lsa, <code>||</code> ishlatish xatoga olib keladi — u ularni \"yo'q\" deb hisoblab, standart qiymatga almashtiradi. <code>??</code> esa faqat <code>null/undefined</code> ni almashtiradi." },
        { p: "Yana bir aniq misol — balandlikni saqlash. Foydalanuvchi <code>0</code> ni tanlagan bo'lishi mumkin, va bu haqiqiy qiymat:" },
        { pg: "let balandlik = 0;\n\nconsole.log( balandlik || 100 ); // 100 — noto'g'ri! foydalanuvchi 0 ni xohlagan edi\nconsole.log( balandlik ?? 100 ); // 0 — to'g'ri, foydalanuvchi tanlovi saqlandi", file: "balandlik.js" },
        { pg: "let xabar = \"\"; // foydalanuvchi ataylab bo'sh qoldirgan\n\nconsole.log( xabar || \"standart matn\" ); // \"standart matn\" — bo'sh matn falsy\nconsole.log( xabar ?? \"standart matn\" ); // \"\" — bo'sh matn saqlandi", file: "bosh-matn-farq.js" },
        { tip: "Umumiy tavsiya: agar <code>0</code>, <code>\"\"</code> yoki <code>false</code> qiymatlari ham to'g'ri, mavjud qiymat bo'lishi mumkin bo'lsa — <code>??</code> ishlating. Agar faqat \"bo'sh emas\" qiymatni istasangiz — <code>||</code> ishlating." },

        { h2: "?? ning ustuvorligi" },
        { p: "<code>??</code> ning ustuvorligi past — <code>||</code> va <code>&amp;&amp;</code> bilan bir xil darajada (aniqrog'i, <code>||</code> bilan bir xil). Shuning uchun murakkab ifodalarda uni matematik amallardan keyin ishlashiga e'tibor bering. Odatda qavs qo'yish tavsiya etiladi:" },
        { pg: "let balandlik = null;\nlet eni = null;\n\n// Qavs bilan aniq va xatosiz:\nlet maydon = (balandlik ?? 100) * (eni ?? 50);\nconsole.log(maydon); // 5000  (100 * 50)", file: "ustuvorlik-nullish.js" },
        { warn: "Xavfsizlik uchun JavaScript <code>??</code> ni <code>||</code> yoki <code>&amp;&amp;</code> bilan <strong>qavssiz</strong> birga ishlatishni taqiqlaydi — bu sintaksis xatosi (SyntaxError) beradi. Masalan, <code>a ?? b || c</code> xato. To'g'ri yozish uchun qavs kerak: <code>(a ?? b) || c</code>." },
        { code: "// Bu XATO — SyntaxError beradi:\n// let x = 1 && 2 ?? 3;\n\n// To'g'ri — qavs bilan:\nlet x = (1 && 2) ?? 3;\nconsole.log(x); // 2" },
        { note: "Bu cheklov ataylab qo'yilgan. <code>??</code> va <code>||</code> ning natijalari inson uchun oson chalkashadi, shuning uchun til dizaynerlari qavsni majburiy qildi — bu xatolarning oldini oladi." },

        { h2: "?? bilan zanjir" },
        { p: "Bir nechta <code>??</code> ni ketma-ket ishlatib, birinchi aniqlangan qiymatni tanlash mumkin:" },
        { pg: "let birinchi = null;\nlet ikkinchi = undefined;\nlet uchinchi = \"Topildi!\";\n\nconsole.log( birinchi ?? ikkinchi ?? uchinchi ?? \"standart\" );\n// Chiqadi: Topildi! — birinchi null/undefined bo'lmagan qiymat", file: "nullish-zanjir.js" },

        { h2: "Xulosa" },
        { ul: [
          "<code>??</code> birinchi <strong>aniqlangan</strong> (null/undefined bo'lmagan) qiymatni qaytaradi;",
          "<code>||</code> dan farqi: <code>||</code> falsy qiymatlarni (<code>0</code>, <code>\"\"</code>, <code>false</code>) ham o'tkazib yuboradi, <code>??</code> esa faqat <code>null</code> va <code>undefined</code> ni;",
          "<code>0</code> yoki bo'sh matn haqiqiy qiymat bo'lishi mumkin bo'lsa — <code>??</code> ishlating;",
          "<code>??</code> ni <code>||</code> yoki <code>&amp;&amp;</code> bilan qavssiz ishlatib bo'lmaydi — SyntaxError beradi;",
          "Ketma-ket <code>??</code> zanjiri birinchi aniqlangan qiymatni topadi."
        ] }
      ]
    }
  ]
};
