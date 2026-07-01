"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Kod sifati",
  lessons: [
    {
      slug: "debugging",
      title: "Brauzerda debugging",
      blurb: "Sources paneli, breakpoint'lar, kodni qadamma-qadam bajarish va debugger buyrug'i.",
      body: [
        { lead: "<strong>Debugging</strong> (nosozliklarni tuzatish) — bu skriptdagi xatolarni topish va bartaraf etish jarayoni. Zamonaviy brauzerlar va aksariyat boshqa muhitlar buni ancha osonlashtiradigan kuchli <em>debugging vositalarini</em> qo'llab-quvvatlaydi. Ushbu darsda biz brauzer vositalari bilan tanishamiz." },
        { note: "Bizning maydonchamizda (playground) haqiqiy debugging vositasi yo'q, shuning uchun bu darsda misollar asosan tavsif va statik kod ko'rinishida beriladi. Amaliyotni brauzeringizning haqiqiy vositalarida bajaring." },
        { h2: "Sources paneli" },
        { p: "Chrome brauzerida debugging'ning asosiy joyi — <strong>Sources</strong> paneli. Uni ochish uchun <code>F12</code> tugmasini bosing, so'ng <strong>Sources</strong> yorlig'iga o'ting. Bu panel uch qismdan iborat:" },
        { ol: [
          "<strong>File Navigator</strong> — sahifaga ulangan barcha fayllar (HTML, JavaScript, CSS, rasmlar) ro'yxati;",
          "<strong>Code Editor</strong> — tanlangan faylning matni ko'rsatiladigan muharrir;",
          "<strong>JavaScript Debugging</strong> — debugging uchun barcha boshqaruv elementlari (breakpoint'lar, o'zgaruvchilar va h.k.)."
        ] },
        { tip: "File Navigator panelini yashirish yoki ko'rsatish uchun <code>Esc</code> tugmasidan foydalaning — u pastdan konsolni ochadi/yopadi. Shunda kodni va konsolni bir vaqtda ko'rish qulay bo'ladi." },
        { h2: "Konsol" },
        { p: "Agar biz kod ichida <code>Esc</code> orqali konsolni ochsak, u yerda istalgan JavaScript ifodasini yozib, <code>Enter</code> bosib bajarishimiz mumkin. Natija darhol ko'rinadi. Bu tezkor tekshiruvlar uchun juda foydali." },
        { pg: "console.log(\"Debugging boshlandi\");\nlet natija = 2 * 2;\nconsole.log(\"2 * 2 =\", natija);", file: "konsol.js" },
        { h2: "Breakpoint (to'xtash nuqtasi)" },
        { p: "<strong>Breakpoint</strong> — bu JavaScript bajarilishi avtomatik to'xtaydigan kod nuqtasi. Kod to'xtaganda biz o'sha ondagi o'zgaruvchilar qiymatlarini tekshirib, buyruqlarni bir-bir bajara olamiz." },
        { p: "Sources panelida faylning qator raqamini bosish orqali breakpoint qo'yiladi. Kod o'sha qatorga yetganda \"muzlab\" qoladi. Bir vaqtning o'zida bir nechta breakpoint qo'yish mumkin." },
        { p: "Breakpoint'ning yana bir kuchli imkoniyati — <strong>shartli breakpoint</strong>. Qator raqamiga o'ng tugma bosib, shart yozish mumkin. Kod faqat shart <code>true</code> bo'lganda to'xtaydi. Bu, masalan, sikl ichida faqat ma'lum bir qiymatda to'xtash uchun qulay." },
        { note: "Breakpoint qo'yishning yana bir usuli — kodda to'g'ridan-to'g'ri <code>debugger</code> buyrug'ini yozish. Bu quyida ko'rsatilgan." },
        { h2: "debugger buyrug'i" },
        { p: "Biz kodni to'xtatishni bevosita skript ichida ham belgilashimiz mumkin — buning uchun <code>debugger</code> buyrug'idan foydalaniladi:" },
        { code: "function hisobla(a, b) {\n  let yigindi = a + b;\n\n  debugger; // <-- shu yerda kod to'xtaydi (agar dev tools ochiq bo'lsa)\n\n  return yigindi * 2;\n}\n\nhisobla(3, 4);" },
        { warn: "<code>debugger</code> buyrug'i faqat ishlab chiquvchi vositalari (dev tools) ochiq bo'lganda ishlaydi. Aks holda brauzer uni e'tiborsiz qoldiradi. Ishlab chiqarishga (production) chiqarishdan oldin bunday buyruqlarni albatta olib tashlang." },
        { h2: "Kodni qadamma-qadam bajarish" },
        { p: "Kod breakpoint'da to'xtaganda, Sources panelining o'ng yuqorisidagi tugmalar orqali uni boshqaramiz. Asosiy tugmalar:" },
        { ul: [
          "<strong>Resume (davom ettirish)</strong> — kodni keyingi breakpoint'gacha yoki oxirigacha davom ettiradi (<code>F8</code>);",
          "<strong>Step (keyingi qadam)</strong> — keyingi buyruqni bajaradi (<code>F9</code>);",
          "<strong>Step over</strong> — keyingi buyruqni bajaradi, lekin funksiya <em>ichiga kirmaydi</em> (funksiyani butunlay bajaradi);",
          "<strong>Step into</strong> — funksiya chaqiruviga duch kelsa, uning <em>ichiga kiradi</em>;",
          "<strong>Step out</strong> — joriy funksiyani oxirigacha bajarib, undan <em>chiqadi</em>."
        ] },
        { p: "Bu tugmalar yordamida siz kodning har bir qadamini kuzatib, qayerda va nima uchun kutilmagan qiymat paydo bo'lganini aniqlaysiz." },
        { h2: "O'zgaruvchilarni kuzatish" },
        { p: "Kod to'xtaganda, o'ng paneldagi bloklar juda foydali:" },
        { ul: [
          "<strong>Watch</strong> — istalgan ifodani kiritib, uning joriy qiymatini doimiy kuzatish mumkin;",
          "<strong>Call Stack</strong> — funksiya chaqiruvlarining ichki zanjirini ko'rsatadi (qaysi funksiya qaysinisini chaqirgani);",
          "<strong>Scope</strong> — joriy paytdagi barcha o'zgaruvchilar qiymatlari (lokal va global)."
        ] },
        { tip: "Kod ichida <code>console.log</code> yozib \"debugging\" qilish mumkin, lekin breakpoint'lar ancha kuchli: ular kodni o'zgartirmasdan, istalgan ondagi holatni to'liq tekshirishga imkon beradi." },
        { h2: "Xulosa" },
        { p: "Kodni debugging qilishning uch asosiy yo'li bor:" },
        { ol: [
          "<strong>Konsol</strong> — <code>console.log</code> orqali qiymatlarni chiqarish;",
          "<strong>Breakpoint'lar</strong> — Sources panelida qator raqamini bosib qo'yiladi;",
          "<code>debugger</code> — kod ichiga yozilgan to'xtash buyrug'i."
        ] },
        { p: "To'xtagan kodni <strong>Step</strong> tugmalari bilan qadamma-qadam bajarib, <strong>Watch</strong>, <strong>Call Stack</strong> va <strong>Scope</strong> bloklari orqali holatni kuzatasiz. Bu ko'nikmani egallash dasturchi uchun juda muhim." }
      ]
    },
    {
      slug: "kod-uslubi",
      title: "Kod uslubi",
      blurb: "Qavslar, chekinish, qator uzunligi, nomlash va linterlar (ESLint).",
      body: [
        { lead: "Bizning kodimiz iloji boricha toza va o'qish oson bo'lishi kerak. Bu — haqiqiy dasturlash san'ati: murakkab vazifani <em>to'g'ri</em> va ayni paytda <em>o'qilishi oson</em> tarzda hal qilish. Yaxshi kod uslubi shunga xizmat qiladi." },
        { note: "Bu yerda keltirilgan qoidalarning hech biri qat'iy majburiy emas — bular tavsiyalar. Har bir jamoa o'z uslubiga ega bo'lishi mumkin. Muhimi — tanlangan uslubga izchil amal qilish." },
        { h2: "Qavslar va chekinish (indent)" },
        { p: "Ko'pchilik dasturchilar ochuvchi jingalak qavsni <code>{</code> yangi qatorda emas, balki bir xil qatorda, oldida bo'shliq bilan yozishni afzal ko'radi. Bu \"egiptcha\" (K&amp;R) uslub deb ataladi:" },
        { code: "// yaxshi\nif (n < 0) {\n  alert(\"Salbiy son\");\n}" },
        { p: "<strong>Chekinish (indent)</strong> — ichki kod tashqi kodga nisbatan surib yoziladi. Odatda 2 yoki 4 bo'shliq ishlatiladi. Butun loyihada bir xil miqdorni ishlating." },
        { code: "// yaxshi (2 bo'shliq chekinish)\nfunction salomla(ism) {\n  if (ism) {\n    console.log(\"Salom, \" + ism);\n  } else {\n    console.log(\"Salom, notanish!\");\n  }\n}" },
        { warn: "Chekinishni bo'shliq (space) va tabulyatsiya (tab) aralashtirib yozmang — bu turli muharrirlar va sozlamalarda kodni buzib ko'rsatadi. Bittasini tanlang." },
        { h2: "Qator uzunligi" },
        { p: "Hech kim uzun gorizontal qatorni o'qishni yoqtirmaydi. Qatorni bir nechta bo'lakka bo'lish yaxshi amaliyot. Odatda maksimal uzunlik 80 yoki 120 belgi qilib belgilanadi." },
        { code: "// uzun shartni bir nechta qatorga bo'lish\nlet royxat = elementlar\n  .filter(x => x.faol)\n  .map(x => x.nomi)\n  .sort();" },
        { h2: "Nuqta-vergul (;)" },
        { p: "Har bir buyruq oxiriga nuqta-vergul qo'yish tavsiya etiladi, garchi JavaScript ba'zi hollarda uni avtomatik qo'shsa ham. Buni tashlab ketish nozik xatolarga olib kelishi mumkin." },
        { code: "// yaxshi\nlet ism = \"Ali\";\nlet yosh = 25;\nconsole.log(ism, yosh);" },
        { h2: "Nomlash" },
        { p: "Yaxshi nomlar — o'zini o'zi tushuntiradigan kodning yarmi. Umumiy qoidalar:" },
        { ul: [
          "O'zgaruvchi va funksiyalar uchun <strong>camelCase</strong> uslubidan foydalaning: <code>userName</code>, <code>hisobla</code>;",
          "Nom mazmunni aks ettirsin: <code>i</code>, <code>data</code> emas, balki <code>userIndex</code>, <code>foydalanuvchilar</code>;",
          "Funksiya nomi odatda fe'ldan boshlanadi: <code>getUser</code>, <code>hisobla</code>, <code>korsat</code>;",
          "O'zgarmas doimiylar (konstantalar) uchun <strong>UPPER_CASE</strong>: <code>const MAX_SONI = 100;</code>."
        ] },
        { code: "// yomon nomlash\nlet a = 60 * 60;\nlet x = a * 24;\n\n// yaxshi nomlash\nlet SONIYALAR_SOATDA = 60 * 60;\nlet soniyalarKunda = SONIYALAR_SOATDA * 24;" },
        { h2: "Yomon va yaxshi uslub — solishtirma" },
        { p: "Quyida bir xil vazifani bajaradigan ikki kod. Birinchisi — o'qish qiyin:" },
        { code: "// yomon uslub\nfunction f(x){if(x>0){return x*2}else{return 0}}" },
        { p: "Ikkinchisi — bir xil ishni bajaradi, lekin ancha toza:" },
        { code: "// yaxshi uslub\nfunction ikkiBaravar(son) {\n  if (son > 0) {\n    return son * 2;\n  }\n  return 0;\n}" },
        { h2: "Linterlar (ESLint)" },
        { p: "<strong>Linter</strong> — kod uslubidagi xatolarni avtomatik topib beradigan vosita. U kodni tekshirib, qoidalarga muvofiq emasligini ogohlantiradi. JavaScript uchun eng mashhuri — <strong>ESLint</strong>." },
        { p: "ESLint bilan ishlash odatda shunday:" },
        { ol: [
          "Node.js va npm o'rnatiladi;",
          "ESLint o'rnatiladi: <code>npm install -D eslint</code>;",
          "Loyiha ildizida sozlama fayli yaratiladi (masalan <code>.eslintrc</code> yoki <code>eslint.config.js</code>);",
          "Muharringizga (VS Code) ESLint kengaytmasi o'rnatiladi — u xatolarni yozayotganingizda ko'rsatadi."
        ] },
        { note: "Ko'pgina jamoalar tayyor uslub qoidalar to'plamidan foydalanadi, masalan <strong>Airbnb</strong> yoki <strong>Standard</strong> uslubi. Bu barcha dasturchilarning bir xil uslubda yozishini ta'minlaydi." },
        { tip: "Linterni loyihaning boshidanoq sozlang. U nafaqat uslubni saqlaydi, balki ko'plab haqiqiy xatolarni (e'lon qilinmagan o'zgaruvchi, ishlatilmagan funksiya) ham topib beradi." },
        { h2: "Xulosa" },
        { ul: [
          "Toza kod — o'qish va qo'llab-quvvatlash oson bo'lgan kod;",
          "Chekinish, qavslar va nuqta-vergullarda izchil bo'ling;",
          "O'zgaruvchilarni mazmunli nomlang (camelCase, UPPER_CASE);",
          "<strong>ESLint</strong> kabi linter uslub va xatolarni avtomatik nazorat qiladi."
        ] }
      ]
    },
    {
      slug: "izohlar",
      title: "Izohlar",
      blurb: "Yaxshi va yomon izohlar; nima uchun (nima emas, nega) izoh kerak.",
      body: [
        { lead: "Izohlar (comments) — kodda dvigatel e'tiborsiz qoldiradigan matn. Ular dasturchilar uchun tushuntirish yozadi. Ammo yaxshi izoh yozish — alohida mahorat. Ko'p izoh har doim ham yaxshi emas." },
        { h2: "Izoh sintaksisi" },
        { p: "JavaScript'da izohlar ikki xil bo'ladi:" },
        { code: "// bir qatorli izoh\n\n/*\n  ko'p qatorli\n  izoh\n*/\n\nlet x = 5; // qator oxirida ham yozish mumkin" },
        { h2: "Yomon izohlar" },
        { p: "Ko'plab yangi dasturchilar izohlarni <em>\"kod nima qilyapti\"</em> ni tushuntirish uchun ishlatadi. Masalan:" },
        { code: "// yomon: kod nima qilishini takrorlaydi\nlet i = 0; // i ni nolga tenglashtiramiz\ni = i + 1; // i ni bittaga oshiramiz" },
        { p: "Bunday izohlar deyarli befoyda — ular kodda allaqachon ko'rinib turgan narsani takrorlaydi. Yaxshi kodning o'zi \"o'zini o'zi tushuntiradi\" (self-descriptive) bo'lishi kerak." },
        { warn: "Agar kod shu qadar chalkash bo'lsaki, uni tushuntirish uchun izoh kerak bo'lsa — bu ko'pincha kodni qayta yozish kerakligining belgisi. Izoh o'rniga kodni soddalashtiring." },
        { h2: "Kodni izoh o'rniga qayta yozish" },
        { p: "Ba'zan chalkash kod bo'lagini izohlash o'rniga, uni alohida mazmunli nomli funksiyaga ajratish yaxshiroq:" },
        { code: "// izoh bilan\n// birlamchi son ekanligini tekshiramiz\nfor (let i = 2; i < n; i++) {\n  if (n % i === 0) return false;\n}" },
        { code: "// yaxshiroq: mazmunli nomli funksiya\nfunction birlamchiSonmi(n) {\n  for (let i = 2; i < n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}" },
        { p: "Endi funksiya nomining o'zi maqsadni tushuntiradi — izoh kerak emas." },
        { h2: "Yaxshi izohlar: nima uchun?" },
        { p: "Foydali izohlar odatda <strong>nima qilinayotganini emas, nega shunday qilinayotganini</strong> tushuntiradi. Bu \"yuqori darajadagi\" izohlar. Ular quyidagilarni yoritadi:" },
        { ul: [
          "<strong>Arxitektura</strong> — komponentlar qanday o'zaro ishlashi, ma'lumot oqimi;",
          "<strong>Nega aynan bu yechim?</strong> — nima uchun boshqa, aftidan sodda usul tanlanmagan;",
          "<strong>Nozik jihatlar</strong> — ochiq ko'rinmaydigan, lekin muhim tafsilotlar."
        ] },
        { code: "// yaxshi: NEGA shunday qilinganini tushuntiradi\n// Bu yerda tsiklni teskari tartibda aylantiramiz,\n// chunki bu massivdan element o'chirishda\n// indekslarning \"sirg'anib ketishini\" oldini oladi.\nfor (let i = arr.length - 1; i >= 0; i--) {\n  if (arr[i] === null) arr.splice(i, 1);\n}" },
        { h2: "Funksiyalarni hujjatlashtirish" },
        { p: "Funksiya nima qilishini, qanday parametr olishini va nima qaytarishini tavsiflash uchun maxsus <strong>JSDoc</strong> uslubi bor. Bu izohlarni muharringiz o'qib, avtomatik yordam ko'rsatadi:" },
        { code: "/**\n * n-darajaga ko'tarish.\n *\n * @param {number} x Ko'tariladigan son.\n * @param {number} n Daraja (butun son bo'lishi kerak).\n * @return {number} x ning n-darajasi.\n */\nfunction pow(x, n) {\n  let natija = 1;\n  for (let i = 0; i < n; i++) {\n    natija *= x;\n  }\n  return natija;\n}" },
        { tip: "JSDoc izohlarini VS Code va WebStorm tushunadi: funksiyani chaqirganingizda ular parametrlar va tavsifni avtomatik ko'rsatadi." },
        { h2: "Xulosa" },
        { p: "Yaxshi izoh belgisi — bu <strong>izohning yo'qligi</strong>. Kodning o'zi imkon qadar tushunarli bo'lsin. Kerakli izohlar:" },
        { ul: [
          "Arxitekturani yuqori darajada tavsiflaydi;",
          "Kod nima <em>qilishini</em> emas, <em>nega</em> shunday qilinganini tushuntiradi;",
          "Ochiq ko'rinmaydigan nozik jihatlarni yoritadi;",
          "Funksiyalarni JSDoc orqali hujjatlashtiradi."
        ] },
        { p: "Kerakmas izohlar esa — kod nima qilishini so'zma-so'z takrorlaydi va faqat chalg'itadi." }
      ]
    },
    {
      slug: "testlash",
      title: "Avtomatlashtirilgan testlar (Mocha)",
      blurb: "Nega test kerak; BDD; describe/it/assert; TDD jarayoni.",
      body: [
        { lead: "Avtomatlashtirilgan testlar — bu bizning kodimiz to'g'ri ishlashini avtomatik tekshiradigan maxsus kod. Ularsiz har o'zgarishdan keyin kodni qo'lda sinash kerak bo'ladi, bu esa juda ko'p vaqt oladi va xatolarni yo'qotib qo'yadi." },
        { note: "Mocha va assert kutubxonalari bu maydonchada (playground) ishlamaydi. Shuning uchun bu darsda test kodlari statik ko'rinishda beriladi — ularni haqiqiy Node.js muhitida ishga tushiring." },
        { h2: "Nega qo'lda sinash yetarli emas?" },
        { p: "Aytaylik, biz <code>pow(x, n)</code> — darajaga ko'tarish funksiyasini yozdik. Uni yozayotganda, biz konsolda <code>pow(2, 3)</code> ni tekshirib ko'ramiz. Natija <code>8</code> — to'g'ri." },
        { p: "Ammo keyinroq kodni takomillashtirsak, uni yana qo'lda sinashimiz kerak. Bir nechta holatni har safar qo'lda tekshirish — zerikarli va ishonchsiz. Odam bir holatni tekshirib, boshqasini unutib qo'yadi." },
        { warn: "Qo'lda sinashning asosiy muammosi: kodni har o'zgartirganda, avval ishlagan qismlar buzilmaganini tekshirish qiyin. Avtomatik testlar aynan shu muammoni hal qiladi." },
        { h2: "BDD — testlar spetsifikatsiya sifatida" },
        { p: "<strong>BDD</strong> (Behavior Driven Development — xatti-harakatga asoslangan ishlab chiqarish) uchtta narsani birlashtiradi: <em>testlar</em>, <em>hujjat</em> va <em>misollar</em>. BDD'da test kodi bir vaqtning o'zida funksiya nima qilishini ham tavsiflaydi." },
        { h2: "Test tuzilishi: describe va it" },
        { p: "Mocha kutubxonasida testlar <code>describe</code> va <code>it</code> funksiyalari yordamida tuziladi:" },
        { ul: [
          "<code>describe(\"nom\", function() { ... })</code> — biz tavsiflayotgan funksionallik. Testlarni guruhlaydi;",
          "<code>it(\"holat tavsifi\", function() { ... })</code> — aniq bir foydalanish holatining tavsifi va tekshiruvi;",
          "<code>assert.equal(a, b)</code> — <code>a</code> va <code>b</code> teng ekanini tekshiradi. Teng bo'lmasa, test xato beradi."
        ] },
        { code: "describe(\"pow\", function() {\n\n  it(\"2 ni 3-darajaga ko'taradi\", function() {\n    assert.equal(pow(2, 3), 8);\n  });\n\n  it(\"3 ni 4-darajaga ko'taradi\", function() {\n    assert.equal(pow(3, 4), 81);\n  });\n\n});" },
        { p: "Bu yerda <code>it</code> ichidagi matn — ingliz yoki o'zbek tilida yozilgan tavsif. Test bajarilganda u shu tavsif bilan ko'rsatiladi, shuning uchun natijani o'qish oson bo'ladi." },
        { h2: "assert modulidan foydalanish" },
        { p: "Node.js'da <code>assert</code> moduli o'rnatilgan. Uning eng ko'p ishlatiladigan metodlari:" },
        { ul: [
          "<code>assert.equal(a, b)</code> — <code>a == b</code> ekanini tekshiradi;",
          "<code>assert.strictEqual(a, b)</code> — <code>a === b</code> (qat'iy tenglik);",
          "<code>assert.notEqual(a, b)</code> — teng emasligini tekshiradi;",
          "<code>assert.deepEqual(a, b)</code> — obyekt/massivlarni chuqur solishtiradi."
        ] },
        { code: "const assert = require('assert');\n\nassert.equal(2 + 2, 4);          // OK, hech narsa chiqarmaydi\nassert.strictEqual(1 + 1, 2);    // OK\n// assert.equal(1, 2);           // xato: AssertionError" },
        { h2: "TDD jarayoni" },
        { p: "<strong>TDD</strong> (Test Driven Development — testga asoslangan ishlab chiqarish) — bu kodni yozishdan <em>oldin</em> test yozish usuli. Jarayon shunday:" },
        { ol: [
          "Avval test yoziladi (funksiya hali yo'q — test xato beradi);",
          "So'ng testni o'tkazadigan minimal kod yoziladi;",
          "Test o'tsa — keyingi holat uchun yangi test qo'shiladi;",
          "Kod takomillashtiriladi, testlar esa hech narsa buzilmaganini kafolatlaydi (bu \"refactoring\" bosqichi)."
        ] },
        { p: "Masalan, avval bir necha test yozamiz, keyin ularni o'tkazadigan funksiyani:" },
        { code: "// 1-qadam: testlar (funksiya hali yo'q)\ndescribe(\"pow\", function() {\n  it(\"musbat darajalarni to'g'ri hisoblaydi\", function() {\n    assert.equal(pow(2, 3), 8);\n    assert.equal(pow(3, 3), 27);\n  });\n});" },
        { code: "// 2-qadam: testni o'tkazadigan kod\nfunction pow(x, n) {\n  let natija = 1;\n  for (let i = 0; i < n; i++) {\n    natija *= x;\n  }\n  return natija;\n}" },
        { note: "TDD'ning kuchi shundaki: har bir yangi holat uchun test yozib, funksiyani asta-sekin mustahkamlaysiz. Testlar to'plami kod ustida ishonchli \"himoya to'ri\" bo'lib qoladi." },
        { tip: "Kichik funksiyalarni ham test bilan qoplang. Kod qanchalik ko'p test bilan qoplansa, uni o'zgartirish shunchalik xavfsiz bo'ladi." },
        { h2: "Xulosa" },
        { ul: [
          "Avtomatik testlar kodni har o'zgartirishda qo'lda sinashdan qutqaradi;",
          "<strong>BDD</strong> — testlar bir vaqtda hujjat va misol vazifasini bajaradi;",
          "Mocha'da <code>describe</code> guruhlaydi, <code>it</code> holatni tavsiflaydi, <code>assert</code> tekshiradi;",
          "<strong>TDD</strong> — avval test, keyin kod yozish usuli; testlar refactoringni xavfsiz qiladi."
        ] }
      ]
    },
    {
      slug: "polyfill",
      title: "Polyfill va transpilyatorlar",
      blurb: "Babel, transpiler nima, polyfill nima, core-js va eski brauzerlar mosligi.",
      body: [
        { lead: "JavaScript tili muntazam rivojlanadi — har yili yangi imkoniyatlar qo'shiladi. Ammo bu yangiliklar barcha (ayniqsa eski) brauzerlarda darhol ishlamaydi. Ular bilan ishlash uchun ikki asosiy vosita bor: <strong>transpilyatorlar</strong> va <strong>polyfill'lar</strong>." },
        { h2: "Muammo: yangi til, eski brauzerlar" },
        { p: "Aytaylik, biz zamonaviy sintaksisdan foydalanamiz — masalan, \"nullish coalescing\" operatori <code>??</code>. Yangi brauzerlar buni tushunadi, lekin eskilari xato beradi. Bizga kodni eski brauzerlar ham tushunadigan holatga keltirish kerak." },
        { code: "// zamonaviy kod (eski brauzerlar tushunmaydi)\nlet balandlik = kirim ?? 100;" },
        { h2: "Transpilyatorlar" },
        { p: "<strong>Transpilyator</strong> (transpiler) — bir kodni o'qib, uni boshqa (odatda eskiroq) sintaksisga qayta yozib beradigan maxsus dastur. Eng mashhur JavaScript transpilyatori — <strong>Babel</strong>." },
        { p: "Babel yuqoridagi zamonaviy kodni eski brauzerlar tushunadigan shaklga o'giradi:" },
        { code: "// transpilyatsiyadan OLDIN (zamonaviy)\nlet balandlik = kirim ?? 100;\n\n// transpilyatsiyadan KEYIN (eski sintaksis)\nlet balandlik = (kirim !== undefined && kirim !== null) ? kirim : 100;" },
        { p: "Odatda dasturchi Babel'ni <strong>build tizimi</strong> (masalan, webpack) ichida ishlatadi. Har safar kod o'zgarganda, build tizimi avtomatik ravishda transpilyatsiyani ishga tushiradi." },
        { note: "Transpilyator faqat <em>sintaksis</em>ni o'zgartiradi — masalan, yangi operatorlar va til konstruksiyalarini. Yangi <em>funksiyalar</em> (metodlar) muammosini u hal qilmaydi. Buning uchun polyfill kerak." },
        { h2: "Polyfill'lar" },
        { p: "Ba'zi yangiliklar — bu sintaksis emas, balki tilga qo'shilgan yangi <strong>funksiyalar</strong>. Masalan, <code>Math.trunc(x)</code> — sonning kasr qismini olib tashlaydigan funksiya. Eski dvigatellarda bu funksiya umuman mavjud emas." },
        { p: "<strong>Polyfill</strong> — bu yetishmayotgan funksiyaning o'rnini to'ldiradigan (\"yamaydigan\") kod. U funksiya mavjudligini tekshiradi va bo'lmasa, uni qo'lda qo'shadi:" },
        { code: "// Math.trunc uchun oddiy polyfill\nif (!Math.trunc) { // agar funksiya yo'q bo'lsa\n  Math.trunc = function(number) {\n    // Math.ceil salbiy, Math.floor musbat sonlar uchun\n    return number < 0 ? Math.ceil(number) : Math.floor(number);\n  };\n}" },
        { p: "Endi kodimizni ishlatishdan oldin bu polyfill yuklansa, eski brauzerda ham <code>Math.trunc</code> ishlaydi. Yangi brauzerlarda esa <code>if</code> sharti <code>false</code> bo'lgani uchun polyfill hech narsa qilmaydi." },
        { h2: "core-js" },
        { p: "Har bir funksiya uchun polyfill'ni qo'lda yozish mumkin emas. Shuning uchun tayyor polyfill to'plamlari bor. Eng mashhuri — <strong>core-js</strong>. U yuzlab zamonaviy funksiyalarni eski muhitlar uchun to'ldiradi." },
        { ul: [
          "<strong>core-js</strong> — keng qamrovli polyfill kutubxonasi (masalan, <code>Promise</code>, <code>Array.from</code>, <code>Object.entries</code> va h.k.);",
          "U modullarga bo'lingan — faqat kerakli qismini ulash mumkin, bu esa hajmni kamaytiradi;",
          "Odatda Babel bilan birgalikda ishlatiladi."
        ] },
        { tip: "Amalda dasturchilar odatda polyfill'larni qo'lda yozmaydi. Babel'ni core-js bilan sozlaydi va u qaysi polyfill'lar kerakligini avtomatik aniqlab, ulaydi." },
        { h2: "Transpilyator va polyfill — farqi" },
        { p: "Ikki vositani chalkashtirmaslik uchun:" },
        { ul: [
          "<strong>Transpilyator</strong> — yangi <em>sintaksis</em>ni eski shaklga o'giradi (masalan, <code>=&gt;</code>, <code>??</code>, <code>let/const</code>);",
          "<strong>Polyfill</strong> — yetishmayotgan <em>funksiya/metod</em>larni qo'shadi (masalan, <code>Promise</code>, <code>Math.trunc</code>)."
        ] },
        { warn: "Agar sizning auditoriyangiz faqat zamonaviy brauzerlardan foydalansa, transpilyatsiya va polyfill'lar shart bo'lmasligi mumkin. Ular kod hajmini oshiradi — faqat haqiqatan kerak bo'lganda ishlating." },
        { h2: "Xulosa" },
        { ul: [
          "Zamonaviy JavaScript hamma brauzerlarda darhol ishlamaydi;",
          "<strong>Transpilyator</strong> (Babel) yangi sintaksisni eski shaklga o'giradi;",
          "<strong>Polyfill</strong> yetishmayotgan funksiyalarni qo'shadi;",
          "<strong>core-js</strong> — tayyor polyfill'lar to'plami, odatda Babel bilan birga ishlatiladi."
        ] }
      ]
    }
  ]
};
