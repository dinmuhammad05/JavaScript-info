"use strict";

module.exports = {
  part: "6-qism: Frontend asoslari",
  chapter: "TypeScript",
  lessons: [
    {
      slug: "ts-nima",
      title: "TypeScript nima?",
      blurb: "TypeScript — JavaScript ustiga turlarni qo'shadigan til; nega kerak, o'rnatish, tsc bilan kompilyatsiya va .ts fayllari.",
      body: [
        { lead: "Agar siz JavaScript'ni yaxshi bilsangiz, <strong>TypeScript</strong> (qisqacha TS) o'rganish sizga oson bo'ladi. Chunki TypeScript — bu mutlaqo yangi til emas. U aynan JavaScript'ning ustiga qurilgan: JS'ning barcha imkoniyatlarini saqlab qoladi va ustiga bitta katta qo'shimcha beradi — <strong>statik turlar tizimi</strong> (static type system). Ushbu bobda biz JavaScript'ni bilgan holda TypeScript'ni tez o'zlashtirishga harakat qilamiz." },

        { h2: "TypeScript — JavaScript'ning \"kengaytmasi\"" },
        { p: "TypeScript'ni ko'pincha \"JavaScript ustiga turlar qo'shadigan til\" deb ta'riflashadi. Bu ta'rifni to'g'ri tushunish muhim:" },
        { ul: [
          "Har qanday to'g'ri (valid) JavaScript kodi — bir vaqtning o'zida to'g'ri TypeScript kodi hamdir. Ya'ni TS — JS'ning <em>ustki to'plami</em> (superset);",
          "TypeScript'ga siz <strong>tur izohlari</strong> (type annotations) qo'shasiz — o'zgaruvchi, funksiya parametri yoki qaytish qiymati qanday turda bo'lishini yozib qo'yasiz;",
          "Brauzer yoki Node.js TypeScript'ni to'g'ridan-to'g'ri <em>tushunmaydi</em>. TS kodi avval oddiy JavaScript'ga <strong>kompilyatsiya</strong> (aylantirish) qilinadi, so'ng ishga tushadi."
        ] },
        { p: "Oddiy JavaScript'da o'zgaruvchi turi haqida hech narsa yozmaymiz:" },
        { code: "// JavaScript\nlet message = \"Salom\";\nmessage = 42; // JS uchun bu mutlaqo normal" },
        { p: "TypeScript'da esa turni ochiq belgilashimiz mumkin. Endi noto'g'ri turni berishga urinsak, kompilyator xatoni ko'rsatadi:" },
        { code: "// TypeScript\nlet message: string = \"Salom\";\nmessage = 42;\n// Xato: Type 'number' is not assignable to type 'string'." },
        { note: "Diqqat qiling: bu xato kod <strong>ishga tushmasdan oldin</strong>, ya'ni yozayotgan paytingizda tahririyingiz (IDE) ichida chiqadi. Bu TypeScript'ning asosiy ustunligi." },

        { h2: "Nega TypeScript kerak?" },
        { p: "JavaScript — <strong>dinamik turli</strong> (dynamically typed) til. Bu qulay, lekin katta loyihalarda muammolar keltirib chiqaradi. Xatolar ko'pincha faqat dastur ishga tushganda, ba'zan esa foydalanuvchi qo'lida sezilib qoladi. TypeScript quyidagi muammolarni hal qiladi:" },
        { ul: [
          "<strong>Xatoni erta topish.</strong> Turlar mos kelmasligi, mavjud bo'lmagan xossaga murojaat, funksiyaga noto'g'ri argument — bularning barchasi kompilyatsiya bosqichida aniqlanadi, ishga tushmasdan oldin;",
          "<strong>IDE yordami.</strong> Turlar aniq bo'lgani uchun tahririy avtomatik to'ldirish (autocomplete), xossalar ro'yxati va aniq maslahatlarni ko'rsatadi;",
          "<strong>Hujjat vazifasini bajaradi.</strong> Tur izohlari kodning o'zi qanday ma'lumot kutayotganini aniq ko'rsatadi — alohida izoh yozish shart emas;",
          "<strong>Ishonchli refaktoring.</strong> Nom o'zgartirilganda yoki tuzilma o'zgarganda kompilyator buzilgan barcha joylarni ko'rsatadi."
        ] },
        { p: "Klassik misol — funksiyaga noto'g'ri tur uzatish. JavaScript'da bu jimgina noto'g'ri natija beradi:" },
        { code: "function summa(a: number, b: number): number {\n  return a + b;\n}\n\nsumma(2, 3);      // 5 — to'g'ri\nsumma(\"2\", \"3\");  // Xato: Argument of type 'string'\n                  // is not assignable to parameter of type 'number'." },
        { p: "JavaScript'da <code>summa(\"2\", \"3\")</code> hech qanday xatosiz <code>\"23\"</code> qaytarardi — bu esa yashirin nosozlik. TypeScript esa buni darrov ushlaydi." },
        { tip: "TypeScript ishga tushish paytida (runtime) hech qanday tekshiruv qo'shmaydi. Barcha tekshiruv <em>kompilyatsiya</em> bosqichida bo'ladi. Shuning uchun TS kodi tayyor JS'dan sekinroq ishlamaydi." },

        { h2: "TypeScript'ni o'rnatish" },
        { p: "TypeScript'ni Node.js va npm orqali o'rnatamiz. Uni butun tizim bo'ylab (global) o'rnatish eng oson yo'l:" },
        { code: "npm install -g typescript" },
        { p: "O'rnatilganini tekshirish uchun versiyani so'raymiz. Bu buyruq <code>tsc</code> (TypeScript Compiler) dasturi ishlayotganini bildiradi:" },
        { code: "tsc --version\n// Version 5.x.x" },
        { p: "Aksariyat loyihalarda TypeScript'ni <em>global</em> emas, balki loyihaning o'ziga (local) o'rnatish afzalroq. Shunda jamoaning har bir a'zosi bir xil versiyadan foydalanadi:" },
        { code: "npm install --save-dev typescript\n// keyin: npx tsc --version" },
        { note: "<code>tsc</code> — bu <strong>TypeScript Compiler</strong>. Uning yagona vazifasi: <code>.ts</code> fayllarni o'qib, ulardan oddiy <code>.js</code> fayllar yasab berish." },

        { h2: "Birinchi .ts fayl va kompilyatsiya" },
        { p: "TypeScript kodi <code>.ts</code> kengaytmali fayllarda yoziladi (JS'da <code>.js</code> bo'lgani kabi). Keling, <code>salom.ts</code> nomli fayl yaratamiz:" },
        { code: "// salom.ts\nfunction salomBer(ism: string): string {\n  return \"Salom, \" + ism + \"!\";\n}\n\nconsole.log(salomBer(\"Ali\"));" },
        { p: "Bu faylni ishga tushira olmaymiz — Node.js <code>.ts</code>ni tushunmaydi. Avval uni kompilyatsiya qilamiz:" },
        { code: "tsc salom.ts" },
        { p: "Bu buyruq yonida <code>salom.js</code> faylini yasaydi. Uning ichida turlar butunlay olib tashlangan, sof JavaScript qoladi:" },
        { code: "// salom.js (natija)\nfunction salomBer(ism) {\n  return \"Salom, \" + ism + \"!\";\n}\nconsole.log(salomBer(\"Ali\"));" },
        { p: "Endi bu oddiy JS faylni Node.js orqali ishga tushiramiz:" },
        { code: "node salom.js\n// Salom, Ali!" },

        { h2: "Kompilyatsiya jarayonini tushunish" },
        { p: "TypeScript'ning ish tartibi ikki asosiy bosqichdan iborat. Buni tushunish TS bilan ishlashda muhim:" },
        { ol: [
          "<strong>Tur tekshiruvi</strong> (type checking): kompilyator turlar to'g'ri ishlatilganini tekshiradi. Xato topsa, sizga xabar beradi;",
          "<strong>Turlarni o'chirish</strong> (type erasure): tekshiruvdan so'ng barcha tur izohlari olib tashlanadi va sof JavaScript hosil bo'ladi."
        ] },
        { p: "Ya'ni turlar faqat <em>dasturchi uchun</em> va <em>kompilyator uchun</em> mavjud. Tayyor JS kodda ular umuman yo'q — bu \"turlarni o'chirish\" deb ataladi." },
        { warn: "Muhim nozik jihat: standart holatda TypeScript tur xatosi bo'lsa ham, baribir <code>.js</code> faylni yaratib beradi. Ya'ni xato kodni ham \"ishlaydigan\" JS'ga aylantiradi. Bunday xatti-harakatni <code>noEmitOnError</code> sozlamasi bilan o'chirish mumkin (bu haqda oxirgi darsda gaplashamiz)." },

        { h2: "Kuzatuv rejimi (watch mode)" },
        { p: "Har safar qo'lda <code>tsc</code> yozish noqulay. TypeScript o'zgarishlarni avtomatik kuzatib, faylni har o'zgartirganingizda qayta kompilyatsiya qila oladi. Buning uchun <code>--watch</code> (yoki <code>-w</code>) bayrog'i ishlatiladi:" },
        { code: "tsc salom.ts --watch" },
        { p: "Endi <code>salom.ts</code>ni saqlaganingizda kompilyator darhol ishga tushadi va yangi <code>salom.js</code> yasaydi. Bu ishlab chiqish jarayonini ancha tezlashtiradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>TypeScript</strong> — JavaScript ustiga statik turlarni qo'shadigan til; har qanday JS kodi ayni paytda TS kodi hamdir;",
          "Turlar <strong>xatoni erta topishga</strong> (ishga tushmasdan oldin) va IDE yordamini yaxshilashga xizmat qiladi;",
          "TS'ni <code>npm install -g typescript</code> orqali o'rnatamiz, <code>tsc</code> kompilyatoridan foydalanamiz;",
          "<code>.ts</code> fayl <code>tsc</code> orqali oddiy <code>.js</code> faylga aylantiriladi — <strong>turlar o'chiriladi</strong>, sof JS qoladi;",
          "Turlar faqat kompilyatsiya paytida yashaydi; ishga tushishda hech qanday qo'shimcha xarajat bo'lmaydi;",
          "<code>--watch</code> rejimi fayllarni avtomatik qayta kompilyatsiya qiladi."
        ] }
      ]
    },

    {
      slug: "ts-turlar",
      title: "Asosiy turlar",
      blurb: "Tur izohlari, string/number/boolean, massiv va tuple, any va unknown, void, null/undefined, tur xulosasi va literal turlar.",
      body: [
        { lead: "TypeScript'ning yuragi — uning <strong>turlar tizimi</strong>. Ushbu darsda biz asosiy turlar bilan tanishamiz: qanday qilib o'zgaruvchiga tur berish, massiv va kortejlar (tuple) bilan ishlash, hamda <code>any</code>, <code>unknown</code>, <code>void</code> kabi maxsus turlarni tushunish. JavaScript'ning <code>typeof</code> qaytaradigan turlarini bilsangiz, bu dars siz uchun tanish tuyuladi." },

        { h2: "Tur izohi (type annotation)" },
        { p: "O'zgaruvchining turini belgilash uchun uning nomidan keyin <strong>ikki nuqta</strong> va tur nomini yozamiz. Bu <strong>tur izohi</strong> deyiladi:" },
        { code: "let yosh: number = 25;\nlet ism: string = \"Ali\";\nlet faol: boolean = true;" },
        { p: "Bu yerda umumiy shakl: <code>let &lt;nom&gt;: &lt;tur&gt; = &lt;qiymat&gt;</code> ko'rinishida. Agar noto'g'ri turdagi qiymat berilsa, kompilyator xato beradi:" },
        { code: "let yosh: number = 25;\nyosh = \"o'ttiz\";\n// Xato: Type 'string' is not assignable to type 'number'." },

        { h2: "Ibtidoiy (primitive) turlar: string, number, boolean" },
        { p: "JavaScript'da uchta asosiy ibtidoiy tur bor va TypeScript ularni bir xil nomlar bilan ataydi. Muhim: tur nomlari <strong>kichik harflar bilan</strong> yoziladi (<code>string</code>, <code>number</code>, <code>boolean</code>) — katta harfli <code>String</code>, <code>Number</code> emas:" },
        { code: "let salom: string = \"Salom dunyo\";\nlet narx: number = 199.99;\nlet ochiq: boolean = false;\n\n// number barcha sonlar uchun: butun, kasr, manfiy\nlet butun: number = 42;\nlet kasr: number = 3.14;\nlet oltilik: number = 0xff;" },
        { warn: "Tur nomlarini kichik harf bilan yozing. <code>String</code>, <code>Number</code> (katta harfli) — bular JavaScript'ning o'rovchi obyekt (wrapper) turlari bo'lib, ularni tur izohida ishlatish tavsiya etilmaydi." },

        { h2: "Massivlar (arrays)" },
        { p: "Massiv turini yozishning ikkita usuli bor va ikkalasi bir xil ma'noni bildiradi. Birinchisi — element turidan keyin <code>[]</code> qo'yish:" },
        { code: "let sonlar: number[] = [1, 2, 3];\nlet ismlar: string[] = [\"Ali\", \"Vali\"];\nlet bayroqlar: boolean[] = [true, false, true];" },
        { p: "Ikkinchisi — generik <code>Array</code> sintaksisi. Bu yozuv burchak qavslar ichida element turini oladi:" },
        { code: "let sonlar: Array<number> = [1, 2, 3];\nlet ismlar: Array<string> = [\"Ali\", \"Vali\"];" },
        { p: "Endi massivga noto'g'ri turdagi element qo'shsak, xato chiqadi:" },
        { code: "let sonlar: number[] = [1, 2, 3];\nsonlar.push(4);       // OK\nsonlar.push(\"besh\");  // Xato: Argument of type 'string'\n                      // is not assignable to parameter of type 'number'." },
        { note: "<code>number[]</code> va <code>Array&lt;number&gt;</code> — bir xil narsa. <code>number[]</code> shakli qisqaroq bo'lgani uchun ko'proq ishlatiladi." },

        { h2: "Kortej (tuple)" },
        { p: "<strong>Kortej</strong> (tuple) — bu uzunligi va har bir pozitsiyadagi elementning turi <em>aniq belgilangan</em> massiv. Oddiy massivda barcha elementlar bir turda bo'ladi; kortejda esa har bir o'rin o'z turiga ega bo'lishi mumkin:" },
        { code: "// birinchi element — string, ikkinchisi — number\nlet odam: [string, number] = [\"Ali\", 25];\n\nconsole.log(odam[0]); // \"Ali\" (string)\nconsole.log(odam[1]); // 25 (number)" },
        { p: "Tartibni buzsak yoki noto'g'ri tur bersak, xato chiqadi:" },
        { code: "let odam: [string, number] = [\"Ali\", 25];\nodam = [25, \"Ali\"];\n// Xato: Type 'number' is not assignable to type 'string'." },
        { p: "Kortejlar, masalan, funksiyadan bir nechta bog'liq qiymatni qaytarishda qulay:" },
        { code: "function koordinata(): [number, number] {\n  return [41.31, 69.24];\n}\n\nlet [x, y] = koordinata();" },

        { h2: "any — turlar tekshiruvidan chiqish" },
        { p: "<code>any</code> — bu maxsus tur bo'lib, u \"har qanday qiymat bo'lishi mumkin, tekshirma\" degan ma'noni bildiradi. <code>any</code> turli o'zgaruvchi bilan hamma narsani qilish mumkin — TypeScript tur tekshiruvini butunlay o'chiradi:" },
        { code: "let biror: any = \"matn\";\nbiror = 42;        // OK\nbiror = true;      // OK\nbiror.hohla();     // OK (lekin ishga tushganda buziladi!)\nbiror.foo.bar.baz; // OK (tekshirilmaydi)" },
        { warn: "<code>any</code> — TypeScript'ning barcha himoyasini o'chiradi. Uni ishlatganingizda kod aslida oddiy JavaScript'ga aylanadi. Iloji boricha <code>any</code>dan qoching — u faqat vaqtinchalik yechim yoki tashqi kutubxonalar bilan ishlashda kerak bo'ladi." },

        { h2: "unknown — xavfsiz \"noma'lum\"" },
        { p: "<code>unknown</code> — <code>any</code>ning xavfsiz muqobili. U ham \"tur noma'lum\" degani, lekin farqi shundaki: <code>unknown</code> turli qiymat bilan biror amal qilishdan oldin uning turini <strong>tekshirishga majbur</strong> qiladi:" },
        { code: "let biror: unknown = \"matn\";\n\n// to'g'ridan-to'g'ri ishlatib bo'lmaydi:\nbiror.toUpperCase();\n// Xato: 'biror' is of type 'unknown'.\n\n// avval turni tekshirish kerak:\nif (typeof biror === \"string\") {\n  console.log(biror.toUpperCase()); // endi OK\n}" },
        { note: "Qoida: agar tur haqiqatan noma'lum bo'lsa, <code>any</code> o'rniga <code>unknown</code> ishlating. U sizni turni tekshirishga undaydi va shu bilan xatolardan himoyalaydi." },

        { h2: "void — qaytarilmaydigan qiymat" },
        { p: "<code>void</code> — funksiya hech narsa <em>qaytarmasligini</em> bildirish uchun ishlatiladi. Odatda faqat yon ta'sir (masalan, konsolga chop etish) qiladigan funksiyalarning qaytish turi:" },
        { code: "function xabarBer(matn: string): void {\n  console.log(matn);\n  // return yo'q\n}" },
        { p: "<code>void</code> asosan funksiyalar kontekstida ma'noli. O'zgaruvchiga <code>void</code> tur berish deyarli hech qachon kerak bo'lmaydi." },

        { h2: "null va undefined" },
        { p: "JavaScript'dagi <code>null</code> va <code>undefined</code> qiymatlari TypeScript'da o'zining nomdosh turlariga ega:" },
        { code: "let bosh: null = null;\nlet aniqmas: undefined = undefined;" },
        { p: "Ko'pincha bu turlar <strong>union</strong> orqali boshqa turlar bilan birga ishlatiladi — bu \"qiymat bor yoki yo'q\" holatini ifodalash uchun (union haqida keyingi darsda batafsil):" },
        { code: "let ism: string | null = \"Ali\";\nism = null; // OK — endi null ham ruxsat etilgan" },
        { tip: "<code>strictNullChecks</code> sozlamasi yoqilganda (tavsiya etiladi) TypeScript <code>null</code> va <code>undefined</code>ni jiddiy tekshiradi va \"null bo'lishi mumkin\" qiymatlarni tasodifan ishlatishdan himoya qiladi." },

        { h2: "Tur xulosasi (type inference)" },
        { p: "TypeScript juda aqlli: agar o'zgaruvchini boshlang'ich qiymat bilan e'lon qilsangiz, u turni <strong>o'zi topib oladi</strong>. Bunga <strong>tur xulosasi</strong> (type inference) deyiladi. Ya'ni har doim ham tur yozish shart emas:" },
        { code: "let ism = \"Ali\";   // TS o'zi biladi: string\nlet yosh = 25;      // TS o'zi biladi: number\nlet faol = true;    // TS o'zi biladi: boolean\n\nism = 42; // Xato: Type 'number' is not assignable to type 'string'." },
        { p: "Bu yerda <code>ism</code>ga tur yozmaganimiz bilan, TypeScript uni <code>string</code> deb hisoblaydi (chunki boshlang'ich qiymati matn). Shuning uchun keyin son berishga urinsak, xato chiqadi." },
        { note: "Amaliy qoida: agar o'zgaruvchi darrov qiymat bilan e'lon qilinsa, turni <em>yozmaslik</em> odatiy hol. Turni funksiya parametrlariga, murakkab holatlarga yoki qiymat keyinroq beriladigan o'zgaruvchilarga yozamiz." },

        { h2: "Literal turlar" },
        { p: "TypeScript'da tur nafaqat <code>string</code> yoki <code>number</code> kabi keng bo'lishi, balki <em>aniq bir qiymat</em> ham bo'lishi mumkin. Bu <strong>literal tur</strong> deyiladi:" },
        { code: "let yonalish: \"chap\" | \"o'ng\" = \"chap\";\nyonalish = \"o'ng\";  // OK\nyonalish = \"orqa\";  // Xato: Type '\"orqa\"' is not\n                    // assignable to type '\"chap\" | \"o'ng\"'." },
        { p: "Bu yerda <code>yonalish</code> faqat <code>\"chap\"</code> yoki <code>\"o'ng\"</code> qiymatlaridan birini qabul qiladi. Literal turlar <code>union</code> bilan birga sanab o'tiladigan (enum kabi) holatlarni ifodalash uchun juda kuchli:" },
        { code: "type Holat = \"kutilyapti\" | \"tayyor\" | \"bekor\";\n\nfunction holatOrnat(h: Holat): void {\n  console.log(\"Holat: \" + h);\n}\n\nholatOrnat(\"tayyor\"); // OK\nholatOrnat(\"xato\");   // Xato: noto'g'ri literal" },

        { h2: "Xulosa" },
        { ul: [
          "Tur izohi <code>nom: tur</code> shaklida yoziladi; asosiy turlar: <code>string</code>, <code>number</code>, <code>boolean</code> (kichik harflar bilan);",
          "Massivlar: <code>number[]</code> yoki <code>Array&lt;number&gt;</code> — ikkalasi bir xil;",
          "<strong>Kortej</strong> (tuple) — uzunligi va pozitsiya turlari aniq belgilangan massiv: <code>[string, number]</code>;",
          "<code>any</code> tur tekshiruvini o'chiradi (undan qoching); <code>unknown</code> — xavfsiz muqobili, turni tekshirishga majbur qiladi;",
          "<code>void</code> — hech narsa qaytarmaydigan funksiyalar uchun; <code>null</code> va <code>undefined</code> o'z turlariga ega;",
          "<strong>Tur xulosasi</strong> tufayli boshlang'ich qiymatli o'zgaruvchiga turni yozish shart emas;",
          "<strong>Literal turlar</strong> aniq qiymatlarni ifodalaydi va <code>union</code> bilan enum kabi ishlaydi."
        ] }
      ]
    },

    {
      slug: "ts-interface",
      title: "Interfeys va tip aliaslari",
      blurb: "interface bilan obyekt shaklini tavsiflash, type alias, ixtiyoriy va readonly xossalar, union va intersection, interface vs type.",
      body: [
        { lead: "Haqiqiy dasturlarda biz ko'pincha oddiy sonlar yoki matnlar emas, balki murakkab <strong>obyektlar</strong> bilan ishlaymiz — foydalanuvchi, buyurtma, mahsulot. TypeScript bunday obyektlarning \"shaklini\" tavsiflash uchun ikkita asosiy vosita beradi: <strong>interface</strong> (interfeys) va <strong>type alias</strong> (tip aliasi). Ushbu darsda ularni chuqur o'rganamiz." },

        { h2: "interface — obyekt shaklini tavsiflash" },
        { p: "<strong>Interfeys</strong> — obyekt qanday xossalarga va qanday turlarga ega bo'lishi kerakligini tavsiflaydigan \"shartnoma\". Uni <code>interface</code> kalit so'zi bilan e'lon qilamiz:" },
        { code: "interface Foydalanuvchi {\n  ism: string;\n  yosh: number;\n  faol: boolean;\n}" },
        { p: "Endi bu interfeysni tur sifatida ishlatishimiz mumkin. Obyekt interfeysga to'liq mos kelishi shart:" },
        { code: "let user: Foydalanuvchi = {\n  ism: \"Ali\",\n  yosh: 25,\n  faol: true\n};" },
        { p: "Agar biror xossani tushirib qoldirsak yoki noto'g'ri tur bersak, kompilyator darrov xato ko'rsatadi:" },
        { code: "let user: Foydalanuvchi = {\n  ism: \"Ali\",\n  yosh: 25\n};\n// Xato: Property 'faol' is missing in type\n// '{ ism: string; yosh: number; }' but required in type 'Foydalanuvchi'." },
        { note: "Interfeys nomlarini odatda katta harf bilan boshlaymiz (masalan <code>Foydalanuvchi</code>, <code>Mahsulot</code>). Bu — kelishuv (konvensiya), majburiy emas, lekin kodni o'qishni osonlashtiradi." },

        { h2: "type alias — tur uchun taxallus" },
        { p: "<strong>Tip alias</strong> (type alias) — bu istalgan turga <em>nom berish</em> usuli. Uni <code>type</code> kalit so'zi bilan yaratamiz. Obyekt shakli uchun u interfeysga juda o'xshaydi:" },
        { code: "type Foydalanuvchi = {\n  ism: string;\n  yosh: number;\n  faol: boolean;\n};\n\nlet user: Foydalanuvchi = {\n  ism: \"Ali\",\n  yosh: 25,\n  faol: true\n};" },
        { p: "Lekin <code>type</code> faqat obyektlar uchun emas — u istalgan turga nom berishi mumkin. Masalan, ibtidoiy turlar, union yoki kortejlar uchun:" },
        { code: "type Yosh = number;\ntype Ism = string;\ntype Koordinata = [number, number];\ntype Holat = \"tayyor\" | \"kutilyapti\";" },
        { tip: "Interfeys faqat obyekt shakllari uchun ishlatiladi. <code>type</code> esa ancha keng — u har qanday turga (union, kortej, ibtidoiy) nom bera oladi." },

        { h2: "Ixtiyoriy xossalar (?)" },
        { p: "Ba'zi xossalar majburiy bo'lmasligi mumkin. Bunday xossa nomidan keyin <strong>savol belgisi</strong> <code>?</code> qo'yamiz. Bu \"bu xossa bo'lishi ham, bo'lmasligi ham mumkin\" degani:" },
        { code: "interface Foydalanuvchi {\n  ism: string;\n  yosh: number;\n  email?: string; // ixtiyoriy\n}\n\n// email'siz ham to'g'ri:\nlet u1: Foydalanuvchi = { ism: \"Ali\", yosh: 25 };\n\n// email bilan ham to'g'ri:\nlet u2: Foydalanuvchi = { ism: \"Vali\", yosh: 30, email: \"vali@mail.uz\" };" },
        { p: "Ixtiyoriy xossaning turi aslida <code>string | undefined</code> bo'ladi — ya'ni u yo bor, yo <code>undefined</code>. Shuning uchun uni ishlatishdan oldin tekshirish yaxshi odat:" },
        { code: "function emailKorsat(u: Foydalanuvchi): void {\n  if (u.email) {\n    console.log(u.email.toUpperCase());\n  } else {\n    console.log(\"Email yo'q\");\n  }\n}" },

        { h2: "readonly xossalar" },
        { p: "Ba'zi xossalarni yaratilgandan keyin <em>o'zgartirib bo'lmasligi</em> kerak. Bunday xossa oldiga <code>readonly</code> yozamiz. Bu JavaScript'dagi <code>const</code>ning obyekt xossalari uchun o'xshashi:" },
        { code: "interface Foydalanuvchi {\n  readonly id: number;\n  ism: string;\n}\n\nlet user: Foydalanuvchi = { id: 1, ism: \"Ali\" };\n\nuser.ism = \"Vali\"; // OK\nuser.id = 2;\n// Xato: Cannot assign to 'id' because it is a read-only property." },
        { note: "<code>readonly</code> faqat kompilyatsiya paytida ishlaydi. Tayyor JavaScript'da bunday cheklov qolmaydi — bu shunchaki dasturchi uchun xavfsizlik qatlami." },

        { h2: "Union turlar (|)" },
        { p: "<strong>Union</strong> (birlashma) tur — bu \"bir nechta turdan biri\" degani. Turlar orasiga <strong>vertikal chiziq</strong> <code>|</code> qo'yamiz. Bu \"yoki\" ma'nosini beradi:" },
        { code: "let qiymat: string | number;\nqiymat = \"matn\"; // OK\nqiymat = 42;      // OK\nqiymat = true;    // Xato: boolean ruxsat etilmagan" },
        { p: "Union tur bilan ishlashda TypeScript sizni <strong>turni tekshirishga</strong> undaydi. Chunki har bir turda mavjud amallar farq qiladi. Buni <em>tur torayishi</em> (narrowing) deyiladi:" },
        { code: "function idKorsat(id: string | number): void {\n  if (typeof id === \"string\") {\n    // bu blokda id — string\n    console.log(id.toUpperCase());\n  } else {\n    // bu blokda id — number\n    console.log(id.toFixed(2));\n  }\n}" },

        { h2: "Intersection turlar (&)" },
        { p: "<strong>Intersection</strong> (kesishma) tur — union'ning aksi. U bir nechta turni <em>birlashtirib</em>, hammasini birdaniga talab qiladi. Bunda <strong>ampersand</strong> <code>&</code> ishlatiladi:" },
        { code: "interface Ism {\n  ism: string;\n}\n\ninterface Yosh {\n  yosh: number;\n}\n\n// ikkala interfeysni birlashtiradi:\ntype Odam = Ism & Yosh;\n\nlet odam: Odam = {\n  ism: \"Ali\",\n  yosh: 25\n};\n// ikkala xossa ham majburiy" },
        { p: "Ya'ni <code>Ism &amp; Yosh</code> — bu <code>ism</code> <em>va</em> <code>yosh</code> xossalariga ega bo'lgan obyekt. Union \"yoki\" bo'lsa, intersection \"va\" degani." },
        { tip: "Eslab qolish uchun: <code>|</code> (union) — \"yo bu, yo u\"; <code>&amp;</code> (intersection) — \"ham bu, ham u\"." },

        { h2: "interface va type: farqi qanday?" },
        { p: "Ikkalasi ham obyekt shaklini tavsiflay oladi, shuning uchun ko'pincha almashtirsa bo'ladi. Lekin bir nechta muhim farq bor:" },
        { ul: [
          "<strong>Kengayish (extends):</strong> interfeyslar <code>extends</code> orqali meros oladi; <code>type</code> esa intersection (<code>&amp;</code>) bilan birlashtiriladi;",
          "<strong>Deklaratsiya birlashuvi:</strong> bir nomdagi interfeysni bir necha marta e'lon qilsangiz, ular <em>birlashadi</em>. <code>type</code>da bunday emas — takror e'lon qilish xato beradi;",
          "<strong>Kenglik:</strong> <code>type</code> union, kortej, ibtidoiy turlarga ham nom bera oladi; interface faqat obyekt shakllari uchun."
        ] },
        { p: "Interfeysning <code>extends</code> orqali meros olishi:" },
        { code: "interface Hayvon {\n  ism: string;\n}\n\ninterface It extends Hayvon {\n  zot: string;\n}\n\nlet it: It = { ism: \"Rex\", zot: \"Ovcharka\" };" },
        { p: "Interfeysning deklaratsiya birlashuvi — bir nomdagi ikkita interfeys avtomatik birlashadi:" },
        { code: "interface Oyna {\n  eni: number;\n}\n\ninterface Oyna {\n  bo'yi: number;\n}\n\n// endi Oyna'da ikkala xossa bor:\nlet o: Oyna = { eni: 100, bo'yi: 200 };" },
        { note: "Amaliy maslahat: obyekt shakllari uchun ko'pincha <code>interface</code> tavsiya etiladi (ayniqsa kutubxona/API tavsiflarida). Union, kortej yoki murakkab turlar uchun esa <code>type</code> ishlatiladi. Ko'p loyihalar shu qoidaga amal qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>interface</code> obyekt shaklini tavsiflaydi — qanday xossalar va turlar bo'lishini belgilaydi;",
          "<code>type</code> (alias) istalgan turga nom beradi — obyekt, union, kortej, ibtidoiy;",
          "<code>?</code> — ixtiyoriy xossa; <code>readonly</code> — o'zgartirib bo'lmaydigan xossa;",
          "<code>|</code> (union) — \"turlardan biri\"; <code>&amp;</code> (intersection) — \"turlarning barchasi birga\";",
          "Union bilan ishlashda TypeScript turni tekshirishga (narrowing) undaydi;",
          "<code>interface</code> <code>extends</code> va deklaratsiya birlashuvini qo'llab-quvvatlaydi; <code>type</code> esa ancha keng qo'llaniladi."
        ] }
      ]
    },

    {
      slug: "ts-funksiya",
      title: "Funksiyalar va generiklar",
      blurb: "Parametr va qaytish turlari, ixtiyoriy va standart parametrlar, generiklar, generic interfeys va klass, cheklovlar (extends).",
      body: [
        { lead: "Funksiyalar — har qanday dasturning asosi. TypeScript funksiyalarga ikkita muhim narsa qo'shadi: <strong>parametr turlari</strong> va <strong>qaytish turi</strong>. Ushbu darsda biz bularni, hamda TypeScript'ning eng kuchli va boshda biroz murakkab tuyuladigan imkoniyati — <strong>generiklar</strong>ni chuqur o'rganamiz." },

        { h2: "Parametr va qaytish turlari" },
        { p: "Funksiyada har bir parametrga tur beramiz, qaytish turini esa parametrlar qavsidan keyin, ikki nuqta orqali yozamiz:" },
        { code: "function qoshish(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(qoshish(2, 3)); // 5" },
        { p: "Bu yerda <code>a: number</code> va <code>b: number</code> — parametr turlari; oxirdagi <code>: number</code> — qaytish turi. Endi funksiyani noto'g'ri ishlatib bo'lmaydi:" },
        { code: "qoshish(2, 3);        // OK\nqoshish(\"2\", 3);      // Xato: string number o'rniga\nqoshish(2);           // Xato: ikkita argument kerak\nqoshish(2, 3, 4);     // Xato: ortiqcha argument" },
        { p: "Ok ifodali (arrow) funksiyalarda ham xuddi shunday:" },
        { code: "const kopaytir = (a: number, b: number): number => a * b;\n\nconsole.log(kopaytir(4, 5)); // 20" },
        { tip: "Qaytish turini ko'pincha yozmasa ham bo'ladi — TypeScript uni tur xulosasi orqali o'zi topadi. Lekin uni ochiq yozish kodni o'qishni osonlashtiradi va tasodifiy xatolardan himoya qiladi." },

        { h2: "Ixtiyoriy parametrlar (?)" },
        { p: "Ba'zi parametrlar majburiy bo'lmasligi mumkin. Ularni ixtiyoriy qilish uchun nomidan keyin <code>?</code> qo'yamiz. Ixtiyoriy parametr berilmasa, uning qiymati <code>undefined</code> bo'ladi:" },
        { code: "function salom(ism: string, unvon?: string): string {\n  if (unvon) {\n    return \"Salom, \" + unvon + \" \" + ism;\n  }\n  return \"Salom, \" + ism;\n}\n\nconsole.log(salom(\"Ali\"));            // Salom, Ali\nconsole.log(salom(\"Ali\", \"janob\"));  // Salom, janob Ali" },
        { warn: "Ixtiyoriy parametrlar har doim majburiy parametrlardan <strong>keyin</strong> kelishi shart. <code>function f(a?: string, b: number)</code> — xato, chunki ixtiyoriy parametr majburiydan oldin turibdi." },

        { h2: "Standart (default) parametrlar" },
        { p: "JavaScript'dagi kabi, parametrga <strong>standart qiymat</strong> berish mumkin. Argument berilmasa, shu qiymat ishlatiladi. Bunda tur ko'pincha standart qiymatdan avtomatik aniqlanadi:" },
        { code: "function kutlash(ism: string, salom: string = \"Salom\"): string {\n  return salom + \", \" + ism + \"!\";\n}\n\nconsole.log(kutlash(\"Ali\"));                // Salom, Ali!\nconsole.log(kutlash(\"Vali\", \"Xush kelibsiz\")); // Xush kelibsiz, Vali!" },
        { note: "Standart qiymatli parametr avtomatik ixtiyoriy hisoblanadi — unga alohida <code>?</code> qo'yish shart emas." },

        { h2: "Generiklar nima uchun kerak?" },
        { p: "Tasavvur qiling, siz massivning birinchi elementini qaytaradigan funksiya yozmoqchisiz. Turini qanday belgilaymiz? Agar <code>number[]</code> desak, faqat sonlar uchun ishlaydi. Agar <code>any[]</code> desak, tur xavfsizligini yo'qotamiz:" },
        { code: "function birinchi(arr: any[]): any {\n  return arr[0];\n}\n\nlet n = birinchi([1, 2, 3]); // n turi — any (yomon!)" },
        { p: "Bu yerda muammo: natija <code>any</code> bo'lib qoldi, ya'ni TypeScript endi <code>n</code>ning haqiqiy turini bilmaydi. Yechim — <strong>generiklar</strong>." },

        { h2: "Generik funksiyalar" },
        { p: "<strong>Generik</strong> — bu turni <em>parametr sifatida</em> qabul qiladigan funksiya. Turni burchak qavslar ichida, odatda <code>T</code> harfi bilan e'lon qilamiz. Bu \"tur o'zgaruvchisi\" chaqirilganda haqiqiy turga aylanadi:" },
        { code: "function birinchi<T>(arr: T[]): T {\n  return arr[0];\n}\n\nlet son = birinchi([1, 2, 3]);        // son turi — number\nlet matn = birinchi([\"a\", \"b\", \"c\"]); // matn turi — string" },
        { p: "Bu yerda sehr shundaki: <code>T</code> — bu qat'iy tur emas, balki \"o'rin\". Funksiya chaqirilganda TypeScript argumentga qarab <code>T</code> nima ekanini o'zi aniqlaydi. Massiv sonlardan iborat bo'lsa, <code>T = number</code>; matnlardan bo'lsa, <code>T = string</code>." },
        { p: "Klassik generik misol — <em>identity</em> funksiyasi (kelgan qiymatni o'zgarishsiz qaytaradi):" },
        { code: "function identity<T>(x: T): T {\n  return x;\n}\n\nlet a = identity<string>(\"salom\"); // T ni ochiq berdik: string\nlet b = identity(42);              // T avtomatik: number" },
        { note: "Turni ochiq berish (<code>identity&lt;string&gt;(...)</code>) mumkin, lekin ko'pincha shart emas — TypeScript uni argumentdan o'zi aniqlaydi. <code>T</code> nomi shartli; <code>U</code>, <code>K</code>, <code>Element</code> kabi istalgan nom ishlatilishi mumkin." },

        { h2: "Bir nechta tur parametri" },
        { p: "Generik funksiya bir nechta tur parametri qabul qilishi mumkin. Ularni vergul bilan ajratamiz. Masalan, ikkita turdan juftlik (pair) yasaydigan funksiya:" },
        { code: "function juftlik<K, V>(kalit: K, qiymat: V): [K, V] {\n  return [kalit, qiymat];\n}\n\nlet p = juftlik(\"yosh\", 25);\n// p turi — [string, number]" },

        { h2: "Generik interfeys va klasslar" },
        { p: "Generiklar faqat funksiyalarda emas — interfeys va klasslarda ham ishlatiladi. Bu bir xil tuzilmani turli turlar bilan qayta ishlatishga imkon beradi. Generik interfeys:" },
        { code: "interface Quti<T> {\n  ichidagi: T;\n  ol(): T;\n}\n\nlet sonQuti: Quti<number> = {\n  ichidagi: 42,\n  ol() { return this.ichidagi; }\n};\n\nlet matnQuti: Quti<string> = {\n  ichidagi: \"salom\",\n  ol() { return this.ichidagi; }\n};" },
        { p: "Generik klass — masalan, oddiy stek (stack) tuzilmasi. U istalgan turdagi elementlarni saqlay oladi:" },
        { code: "class Stek<T> {\n  private elementlar: T[] = [];\n\n  push(element: T): void {\n    this.elementlar.push(element);\n  }\n\n  pop(): T | undefined {\n    return this.elementlar.pop();\n  }\n}\n\nlet sonStek = new Stek<number>();\nsonStek.push(1);\nsonStek.push(2);\nconsole.log(sonStek.pop()); // 2" },

        { h2: "Generik cheklovlar (extends)" },
        { p: "Ba'zan generik turga <em>cheklov</em> qo'yish kerak — masalan, \"T qanday tur bo'lishi mumkin, lekin unda albatta <code>length</code> xossasi bo'lsin\". Buning uchun <code>extends</code> ishlatiladi:" },
        { code: "interface Uzunlikli {\n  length: number;\n}\n\nfunction uzunlik<T extends Uzunlikli>(x: T): number {\n  return x.length;\n}\n\nuzunlik(\"salom\");      // OK — string'da length bor\nuzunlik([1, 2, 3]);    // OK — massivda length bor\nuzunlik(42);           // Xato: number'da length yo'q" },
        { p: "Cheklovsiz generikda biz <code>T</code> haqida hech narsa bilmaymiz, shuning uchun uning xossalarini ishlata olmaymiz. <code>T extends Uzunlikli</code> deyish orqali TypeScript'ga \"<code>T</code>da albatta <code>length</code> bor\" deb kafolat beramiz va shu xossani xavfsiz ishlatamiz." },
        { p: "Yana bir foydali naqsh — <code>keyof</code> bilan obyekt kalitini cheklash. Bu obyektdan xavfsiz qiymat olish uchun:" },
        { code: "function xossaOl<T, K extends keyof T>(obj: T, kalit: K): T[K] {\n  return obj[kalit];\n}\n\nlet user = { ism: \"Ali\", yosh: 25 };\n\nxossaOl(user, \"ism\");  // OK — turi string\nxossaOl(user, \"yosh\"); // OK — turi number\nxossaOl(user, \"boo\");  // Xato: 'boo' user kaliti emas" },
        { tip: "<code>keyof T</code> — obyekt <code>T</code>ning barcha kalitlaridan iborat union tur. <code>T[K]</code> esa \"<code>T</code>ning <code>K</code> kalitidagi qiymatning turi\" degani. Bu ikkalasi birga juda kuchli va aniq turlarni yozishga imkon beradi." },

        { h2: "Xulosa" },
        { ul: [
          "Funksiya parametrlariga tur beramiz; qaytish turi qavsdan keyin <code>: tur</code> shaklida yoziladi;",
          "<code>?</code> — ixtiyoriy parametr (majburiylardan keyin turishi shart); <code>= qiymat</code> — standart parametr;",
          "<strong>Generiklar</strong> turni parametr sifatida qabul qiladi: <code>function identity&lt;T&gt;(x: T): T</code>;",
          "Generiklar bir xil kodni turli turlar bilan xavfsiz qayta ishlatishga imkon beradi — <code>any</code>ga muqobil;",
          "Interfeys va klasslar ham generik bo'lishi mumkin: <code>Quti&lt;T&gt;</code>, <code>Stek&lt;T&gt;</code>;",
          "<code>extends</code> orqali generik turga cheklov qo'yamiz: <code>T extends Uzunlikli</code>;",
          "<code>keyof</code> va <code>T[K]</code> obyekt kalitlari va qiymatlari bilan aniq ishlashga yordam beradi."
        ] }
      ]
    },

    {
      slug: "ts-class",
      title: "Klasslar va konfiguratsiya",
      blurb: "TS klasslari, kirish modifikatorlari (public/private/protected/readonly), implements, enum va tsconfig.json asoslari.",
      body: [
        { lead: "TypeScript klasslari — JavaScript klasslarining kuchaytirilgan ko'rinishi. JS'dagi barcha imkoniyatlar saqlanadi, ustiga <strong>kirish modifikatorlari</strong>, <code>implements</code> va boshqa foydali vositalar qo'shiladi. Ushbu yakuniy darsda klasslarni, <code>enum</code>ni va loyihaning yuragi bo'lgan <code>tsconfig.json</code> faylini o'rganamiz." },

        { h2: "TypeScript klasslari" },
        { p: "TypeScript klassi JavaScript klassiga o'xshaydi, lekin bir muhim farqi bor: maydonlar (fields) <em>oldindan e'lon qilinishi</em> va turlarga ega bo'lishi kerak:" },
        { code: "class Foydalanuvchi {\n  ism: string;\n  yosh: number;\n\n  constructor(ism: string, yosh: number) {\n    this.ism = ism;\n    this.yosh = yosh;\n  }\n\n  salomBer(): string {\n    return \"Salom, men \" + this.ism;\n  }\n}\n\nlet u = new Foydalanuvchi(\"Ali\", 25);\nconsole.log(u.salomBer());" },
        { p: "Diqqat qiling: <code>ism: string</code> va <code>yosh: number</code> maydonlari konstruktordan <em>oldin</em> e'lon qilingan. JavaScript'da bu shart emas edi, TypeScript'da esa maydonlarni oldindan bildirish kerak (yoki konstruktorda parametr xossalari orqali)." },

        { h2: "Kirish modifikatorlari: public, private, protected" },
        { p: "TypeScript maydon va metodlarga <strong>kirish modifikatorlarini</strong> qo'shadi. Ular xossaga qaysi joydan murojaat qilish mumkinligini belgilaydi:" },
        { ul: [
          "<code>public</code> — hamma joydan ochiq (standart, yozmasa ham shunday);",
          "<code>private</code> — faqat shu klass ichida ko'rinadi, tashqaridan murojaat mumkin emas;",
          "<code>protected</code> — shu klass va undan meros olgan klasslarda ko'rinadi."
        ] },
        { code: "class HisobRaqam {\n  public egasi: string;\n  private balans: number;\n\n  constructor(egasi: string, boshlang: number) {\n    this.egasi = egasi;\n    this.balans = boshlang;\n  }\n\n  qoshish(summa: number): void {\n    this.balans += summa;\n  }\n\n  balansniKorish(): number {\n    return this.balans;\n  }\n}\n\nlet h = new HisobRaqam(\"Ali\", 1000);\nh.qoshish(500);\nconsole.log(h.balansniKorish()); // 1500\nconsole.log(h.egasi);            // \"Ali\" — OK\nconsole.log(h.balans);           // Xato: 'balans' private" },
        { warn: "<code>private</code> va <code>protected</code> — faqat kompilyatsiya paytida tekshiriladi. Tayyor JavaScript'da bu xossalarga baribir kirish mumkin. Haqiqiy maxfiylik uchun JS'ning <code>#</code> (private field) sintaksisini ishlating." },

        { h2: "readonly maydonlar va parametr xossalari" },
        { p: "Klass maydonini <code>readonly</code> qilib, uni faqat konstruktorda o'rnatiladigan va keyin o'zgartirib bo'lmaydigan qilish mumkin:" },
        { code: "class Mahsulot {\n  readonly id: number;\n  nom: string;\n\n  constructor(id: number, nom: string) {\n    this.id = id;\n    this.nom = nom;\n  }\n}\n\nlet m = new Mahsulot(1, \"Kitob\");\nm.nom = \"Daftar\"; // OK\nm.id = 2;         // Xato: 'id' read-only" },
        { p: "TypeScript qulay qisqartma beradi: konstruktor parametriga to'g'ridan-to'g'ri modifikator yozsangiz, u avtomatik maydon bo'lib o'rnatiladi. Buni <strong>parametr xossalari</strong> deyiladi:" },
        { code: "class Nuqta {\n  // modifikatorlar maydonni avtomatik yaratadi:\n  constructor(\n    public x: number,\n    public y: number,\n    private nom: string\n  ) {}\n}\n\nlet p = new Nuqta(1, 2, \"A\");\nconsole.log(p.x, p.y); // 1 2" },
        { tip: "Parametr xossalari ko'p yozuvni qisqartiradi: <code>public x: number</code> deb yozish bilan maydon e'loni va <code>this.x = x</code> tayinlash birdaniga bajariladi." },

        { h2: "Interfeysni amalga oshirish (implements)" },
        { p: "Klass biror interfeysga mos kelishini kafolatlash uchun <code>implements</code> kalit so'zi ishlatiladi. Bu klass interfeysdagi barcha xossa va metodlarni albatta ta'minlashini majburlaydi:" },
        { code: "interface Shakl {\n  yuza(): number;\n  perimetr(): number;\n}\n\nclass Doira implements Shakl {\n  constructor(private radius: number) {}\n\n  yuza(): number {\n    return Math.PI * this.radius * this.radius;\n  }\n\n  perimetr(): number {\n    return 2 * Math.PI * this.radius;\n  }\n}\n\nlet d = new Doira(5);\nconsole.log(d.yuza());" },
        { p: "Agar klass interfeysdagi biror metodni yozishni unutsa, kompilyator xato beradi:" },
        { code: "class Kvadrat implements Shakl {\n  constructor(private tomon: number) {}\n  yuza(): number { return this.tomon * this.tomon; }\n  // perimetr yozilmagan!\n}\n// Xato: Class 'Kvadrat' incorrectly implements interface 'Shakl'.\n// Property 'perimetr' is missing." },
        { note: "<code>extends</code> (meros) va <code>implements</code> (shartnoma) farqli: <code>extends</code> boshqa klassdan kod meros oladi; <code>implements</code> esa faqat interfeysga mos kelishni majburlaydi, kod bermaydi. Bir klass bir vaqtda <code>extends</code> va <code>implements</code> qila oladi." },

        { h2: "enum — sanaladigan qiymatlar to'plami" },
        { p: "<strong>enum</strong> (enumeration) — bog'liq nomlangan doimiylar to'plamini yaratish uchun ishlatiladi. Masalan, hafta kunlari yoki holatlar. JavaScript'da enum yo'q — bu sof TypeScript qo'shimchasi:" },
        { code: "enum Yonalish {\n  Yuqori,\n  Past,\n  Chap,\n  Ong\n}\n\nlet y: Yonalish = Yonalish.Yuqori;\nconsole.log(y); // 0 (standart holatda 0 dan boshlab raqamlanadi)" },
        { p: "Standart holatda enum a'zolari <code>0, 1, 2, ...</code> sonlariga bog'lanadi. Lekin siz ochiq qiymatlar berishingiz ham mumkin — ayniqsa matnli (string) enum ko'p ishlatiladi, chunki u o'qishga qulayroq:" },
        { code: "enum Holat {\n  Kutilyapti = \"KUTILYAPTI\",\n  Tayyor = \"TAYYOR\",\n  Bekor = \"BEKOR\"\n}\n\nlet h: Holat = Holat.Tayyor;\nconsole.log(h); // \"TAYYOR\"" },
        { tip: "Oddiy holatlar uchun ko'p jamoalar <code>enum</code> o'rniga literal union turlarni afzal ko'radi (masalan <code>type Holat = \"tayyor\" | \"bekor\"</code>), chunki ular tayyor JS'da qo'shimcha kod yaratmaydi. Ikkalasi ham to'g'ri yechim." },

        { h2: "tsconfig.json — loyiha konfiguratsiyasi" },
        { p: "Haqiqiy loyihalarda har safar <code>tsc fayl.ts</code> yozmaymiz. Buning o'rniga loyiha ildizida <code>tsconfig.json</code> faylini yaratamiz. U TypeScript kompilyatoriga qanday ishlashni aytadi. Uni avtomatik yaratish uchun:" },
        { code: "tsc --init" },
        { p: "Bu buyruq izohlar bilan to'la <code>tsconfig.json</code> yasaydi. Uning soddalashtirilgan asosiy ko'rinishi quyidagicha:" },
        { code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"noEmitOnError\": true\n  },\n  \"include\": [\"src/**/*\"],\n  \"exclude\": [\"node_modules\"]\n}" },
        { p: "Asosiy sozlamalar nimani anglatadi:" },
        { ul: [
          "<code>target</code> — natijaviy JavaScript qaysi versiyada bo'lishi (masalan <code>ES2020</code>);",
          "<code>module</code> — modul tizimi (<code>commonjs</code> Node.js uchun, <code>esnext</code> zamonaviy brauzer uchun);",
          "<code>outDir</code> — kompilyatsiya natijasi (JS fayllar) qayerga saqlanishi;",
          "<code>rootDir</code> — manba <code>.ts</code> fayllar qayerda joylashgani;",
          "<code>strict</code> — barcha qat'iy tekshiruvlarni yoqadi (juda tavsiya etiladi);",
          "<code>noEmitOnError</code> — tur xatosi bo'lsa, JS fayl yaratmaslik;",
          "<code>include</code> / <code>exclude</code> — qaysi fayllarni qamrab olish yoki chiqarib tashlash."
        ] },
        { p: "<code>tsconfig.json</code> mavjud bo'lsa, endi shunchaki <code>tsc</code> deb yozamiz — u konfiguratsiyani o'qib, barcha fayllarni birdaniga kompilyatsiya qiladi:" },
        { code: "tsc          # butun loyihani kompilyatsiya qiladi\ntsc --watch  # o'zgarishlarni kuzatib turadi" },
        { note: "<code>strict: true</code> — TypeScript'dan maksimal foyda olishning kaliti. U <code>strictNullChecks</code>, <code>noImplicitAny</code> kabi bir nechta muhim tekshiruvni birdaniga yoqadi. Yangi loyihalarda uni doim yoqish tavsiya etiladi." },

        { h2: "Xulosa" },
        { ul: [
          "TypeScript klasslarida maydonlar oldindan e'lon qilinadi va turlarga ega bo'ladi;",
          "Kirish modifikatorlari: <code>public</code> (ochiq), <code>private</code> (faqat klass ichida), <code>protected</code> (klass va vorislarida);",
          "<code>readonly</code> maydon faqat konstruktorda o'rnatiladi; <strong>parametr xossalari</strong> yozuvni qisqartiradi;",
          "<code>implements</code> klassni interfeysga mos kelishga majburlaydi (<code>extends</code>dan farqli — kod bermaydi);",
          "<code>enum</code> nomlangan doimiylar to'plamini yaratadi (sonli yoki matnli); ba'zan literal union afzalroq;",
          "<code>tsconfig.json</code> loyiha konfiguratsiyasi — <code>tsc --init</code> bilan yaratiladi;",
          "<code>strict: true</code> sozlamasini yoqish TypeScript'dan to'liq foyda olishning eng muhim qadami."
        ] }
      ]
    }
  ]
};
