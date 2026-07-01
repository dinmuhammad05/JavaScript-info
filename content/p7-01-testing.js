"use strict";
module.exports = {
  part: "7-qism: Testlash va yetkazib berish",
  chapter: "Testlash (Jest)",
  lessons: [
    {
      slug: "testlash-nima",
      title: "Nega test yozamiz?",
      blurb: "Qo'lda testning muammolari, avtomatik testning foydasi, test turlari, test piramidasi, TDD va mashhur vositalar.",
      body: [
        { lead: "Kod yozish — ishning yarmi. Ikkinchi yarmi esa kod haqiqatan ishlayotganini va kelajakda ham ishlashda davom etishini ta'minlashdir. Aynan shu joyda testlash sahnaga chiqadi. Bu darsda testlashning nima ekanini, nega u zamonaviy dasturchi uchun majburiy ko'nikma bo'lganini va qanday test turlari mavjudligini chuqur ko'rib chiqamiz." },

        { h2: "Qo'lda testlash muammosi" },
        { p: "Ko'pchilik dasturchi ishni shunday boshlaydi: funksiya yozadi, so'ng <code>console.log</code> qo'yib, natijani ko'zi bilan tekshiradi. Yoki brauzerni ochib, tugmani bosib, hammasi joyida ekanini qo'lda ko'radi. Bu <strong>qo'lda testlash</strong> deyiladi." },
        { code: [
          "function narxHisobla(soni, narx) {",
          "  return soni * narx;",
          "}",
          "",
          "// Qo'lda tekshiruv:",
          "console.log(narxHisobla(3, 100)); // 300 chiqishi kerak, ko'z bilan tekshiramiz",
          "console.log(narxHisobla(0, 100)); // 0 chiqishi kerak"
        ].join("\n") },
        { p: "Kichik funksiya uchun bu yetarli ko'rinadi. Ammo dastur o'sib borgani sari qo'lda testlash tez orada jiddiy muammoga aylanadi:" },
        { ul: [
          "<strong>Sekin:</strong> har bir o'zgarishdan keyin barcha holatlarni qo'lda qayta tekshirish soatlab vaqt oladi.",
          "<strong>Ishonchsiz:</strong> odam charchaydi, e'tiborsiz bo'ladi va ba'zi holatlarni tekshirishni unutadi.",
          "<strong>Takrorlanmaydi:</strong> bugun tekshirgan narsangizni ertaga aynan bir xil qadamlar bilan qayta tekshirish qiyin.",
          "<strong>Miqyoslanmaydi:</strong> 100 ta funksiya va 50 ta sahifani har safar qo'lda ko'rish deyarli imkonsiz.",
          "<strong>Regressiyani ko'rmaydi:</strong> yangi kod eski, avval ishlagan funksiyani buzsa, buni sezmay qolishingiz mumkin."
        ] },
        { warn: "Eng xavfli holat — <strong>regressiya</strong>: siz bitta joyni tuzatasiz, lekin bilmagan holda boshqa joyni buzasiz. Qo'lda testlashda buzilgan joy foydalanuvchiga yetib borgach ma'lum bo'ladi." },

        { h2: "Avtomatik test nima beradi?" },
        { p: "<strong>Avtomatik test</strong> — bu sizning kodingizni tekshiradigan yana bir kod. Ya'ni siz bir marta test yozasiz, so'ng uni cheksiz marta, bir soniyada, xatosiz ishga tushirasiz. Yuqoridagi funksiyani avtomatik test bilan quyidagicha tekshiramiz:" },
        { code: [
          "function narxHisobla(soni, narx) {",
          "  return soni * narx;",
          "}",
          "",
          "test('3 ta mahsulot narxini hisoblaydi', () => {",
          "  expect(narxHisobla(3, 100)).toBe(300);",
          "});",
          "",
          "test('0 ta mahsulot uchun 0 qaytaradi', () => {",
          "  expect(narxHisobla(0, 100)).toBe(0);",
          "});"
        ].join("\n") },
        { p: "Endi <code>console.log</code> natijasini ko'z bilan solishtirish shart emas — agar natija kutilganidan farq qilsa, test o'zi qizil rangda xatoni ko'rsatadi. Bu bizga aniq foydalar beradi:" },
        { ul: [
          "<strong>Ishonch:</strong> kodni o'zgartirsangiz, testlar hammasi yashil bo'lsa, hech narsani buzmaganingizga ishonch hosil qilasiz.",
          "<strong>Refaktoring erkinligi:</strong> kodni qo'rqmasdan tozalash va qayta yozish mumkin — testlar himoya to'ri vazifasini bajaradi.",
          "<strong>Jonli hujjat:</strong> yaxshi yozilgan test funksiya nima qilishini kod misolida ko'rsatadi.",
          "<strong>Tezlik:</strong> yuzlab tekshiruv bir necha soniyada avtomatik ishlaydi.",
          "<strong>Xatoni erta ushlash:</strong> xato produksiyaga emas, dasturchi kompyuterida ushlanadi — bu ancha arzon."
        ] },
        { tip: "Test yozishning maqsadi — testlar sonini ko'paytirish emas, balki <strong>kodga bo'lgan ishonchni</strong> oshirish. Har bir test biror haqiqatni himoya qilishi kerak." },

        { h2: "Test turlari" },
        { p: "Barcha testlar bir xil emas. Ular nimani va qanchalik keng tekshirishiga qarab uch asosiy turga bo'linadi." },
        { h3: "Unit (birlik) testlar" },
        { p: "Eng kichik va tez testlar. Bitta funksiya yoki bitta modulni yakka holda, boshqa qismlardan ajratib tekshiradi. Masalan, yuqoridagi <code>narxHisobla</code> uchun yozilgan testlar — bu unit testlar. Ular tez ishlaydi va xato qayerdaligini aniq ko'rsatadi." },
        { h3: "Integration (integratsiya) testlar" },
        { p: "Bir nechta qism birga qanday ishlashini tekshiradi. Masalan, ma'lumotlar bazasidan ma'lumot o'qib, uni qayta ishlab, javob qaytaradigan funksiyalar zanjiri. Ular unit testlardan sekinroq, ammo real hayotga yaqinroq." },
        { h3: "End-to-end (E2E) testlar" },
        { p: "Butun dasturni foydalanuvchi ko'zi bilan tekshiradi: brauzer ochiladi, tugmalar bosiladi, formalar to'ldiriladi va natija ko'riladi. Eng ishonchli, ammo eng sekin va eng mo'rt (tez sinuvchan) test turi. Bunga <strong>Cypress</strong> yoki <strong>Playwright</strong> kabi vositalar ishlatiladi." },

        { h2: "Test piramidasi" },
        { p: "Qaysi test turidan qanchasini yozish kerak? Bu savolga <strong>test piramidasi</strong> javob beradi. Bu Mike Cohn tomonidan mashhur qilingan tamoyil:" },
        { code: [
          "        /\\",
          "       /  \\      E2E  — kam (sekin, qimmat, mo'rt)",
          "      /----\\",
          "     /      \\    Integration — o'rtacha",
          "    /--------\\",
          "   /          \\  Unit — ko'p (tez, arzon, barqaror)",
          "  /____________\\"
        ].join("\n") },
        { p: "Tamoyil oddiy: <strong>ko'p sonli tez unit testlar, o'rtacha integratsiya testlar va oz sonli E2E testlar</strong> yozing. Chunki unit testlar arzon va tez, E2E testlar esa qimmat va sekin. Piramida teskari bo'lib qolsa (ko'p E2E, kam unit), test to'plami sekin va ishonchsiz bo'ladi." },
        { note: "Amaliyotda odatda taxminan 70% unit, 20% integration va 10% E2E test nisbati sog'lom hisoblanadi. Bu qat'iy qoida emas, balki yo'nalish." },

        { h2: "TDD tushunchasi" },
        { p: "<strong>TDD (Test-Driven Development)</strong> — bu kod yozishdan <em>oldin</em> testni yozadigan yondashuv. U uch qadamdan iborat va \"qizil–yashil–refaktoring\" tsikli deb ataladi:" },
        { ol: [
          "<strong>Qizil (Red):</strong> hali mavjud bo'lmagan funksiya uchun test yozasiz — u albatta yiqiladi (qizil).",
          "<strong>Yashil (Green):</strong> testni o'tkazadigan eng oddiy kodni yozasiz — test yashil bo'ladi.",
          "<strong>Refaktoring (Refactor):</strong> testlar yashil turgan holda kodni tozalaysiz, yaxshilaysiz."
        ] },
        { code: [
          "// 1-qadam (Qizil): funksiya hali yo'q, test yozamiz",
          "test('juft sonni aniqlaydi', () => {",
          "  expect(juftmi(4)).toBe(true);",
          "  expect(juftmi(5)).toBe(false);",
          "});",
          "",
          "// 2-qadam (Yashil): eng oddiy ishlaydigan kod",
          "function juftmi(son) {",
          "  return son % 2 === 0;",
          "}",
          "",
          "// 3-qadam (Refaktoring): kerak bo'lsa tozalash, test hali ham yashil"
        ].join("\n") },
        { p: "TDD dizaynni yaxshilaydi (kodni ishlatib ko'rib yozganingiz uchun qulay interfeys chiqadi) va har bir kod satri test bilan qoplanishini ta'minlaydi. Ammo bu majburiy emas — testni kod bilan birga yoki keyin yozish ham to'liq maqbul." },

        { h2: "Mashhur vositalar" },
        { p: "JavaScript dunyosida bir nechta test freymvorki keng tarqalgan:" },
        { ul: [
          "<strong>Jest</strong> — Facebook (Meta) yaratgan, eng ommabop. \"Batareyalari qutida\": test yurgizuvchi, assertion (tekshiruv), mock va coverage bir joyda. Konfiguratsiyasiz ishlaydi. Biz shu kursda Jest'ni o'rganamiz.",
          "<strong>Vitest</strong> — Vite ekotizimi uchun zamonaviy, juda tez muqobil. API'si Jest'ga deyarli bir xil, shuning uchun Jest bilgan odam osongina o'tadi.",
          "<strong>Mocha</strong> — moslashuvchan, ammo assertion (Chai) va mock (Sinon) kutubxonalarini alohida ulash kerak. Eski loyihalarda ko'p uchraydi.",
          "<strong>Cypress / Playwright</strong> — bular unit emas, E2E testlar uchun: brauzerni boshqarib, real foydalanuvchi harakatlarini bajaradi."
        ] },
        { tip: "Yangi loyiha uchun Jest yoki Vitest — eng xavfsiz tanlov. Ikkalasi ham API va falsafada juda o'xshash, birini o'rgansangiz ikkinchisi bepul keladi." },

        { h2: "Xulosa" },
        { ul: [
          "Qo'lda testlash sekin, ishonchsiz va miqyoslanmaydi — regressiyani ushlay olmaydi.",
          "Avtomatik test — bu kodingizni tekshiradigan kod; u ishonch, refaktoring erkinligi va tezlik beradi.",
          "Test turlari: unit (birlik), integration (integratsiya) va E2E (uchidan uchigacha).",
          "Test piramidasi: ko'p unit, o'rtacha integration, kam E2E test yozing.",
          "TDD — kod yozishdan oldin test yozish yondashuvi (qizil–yashil–refaktoring).",
          "Mashhur vositalar: Jest, Vitest, Mocha; E2E uchun Cypress va Playwright."
        ] }
      ]
    },

    {
      slug: "jest-boshlash",
      title: "Jest asoslari",
      blurb: "Jest o'rnatish, test fayllar, test()/it(), expect va matcherlar, describe bloki, npm test bilan ishga tushirish.",
      body: [
        { lead: "Jest — bu JavaScript uchun eng ommabop test freymvorki. U o'rnatishi oson, konfiguratsiyasiz ishlaydi va test yozish uchun kerak bo'lgan hamma narsani o'z ichiga oladi. Bu darsda Jest'ni o'rnatib, birinchi testlarimizni yozamiz." },

        { h2: "Jest'ni o'rnatish" },
        { p: "Jest — bu <code>devDependencies</code>ga (ishlab chiqish bog'liqliklariga) o'rnatiladigan paket, chunki u faqat dasturchiga kerak, produksiyada emas. Loyiha papkasida quyidagini bajaring:" },
        { code: [
          "# Yangi loyiha bo'lsa avval:",
          "npm init -y",
          "",
          "# Jest'ni ishlab chiqish bog'liqligi sifatida o'rnatamiz:",
          "npm install --save-dev jest",
          "",
          "# Qisqacha shakli ham bor:",
          "npm i -D jest"
        ].join("\n") },
        { p: "So'ng <code>package.json</code> faylidagi <code>scripts</code> bo'limiga test buyrug'ini qo'shamiz, shunda testlarni <code>npm test</code> bilan ishga tushira olamiz:" },
        { code: [
          "{",
          "  \"name\": \"mening-loyiham\",",
          "  \"scripts\": {",
          "    \"test\": \"jest\"",
          "  },",
          "  \"devDependencies\": {",
          "    \"jest\": \"^29.0.0\"",
          "  }",
          "}"
        ].join("\n") },
        { note: "<code>--save-dev</code> (yoki <code>-D</code>) paketni <code>devDependencies</code>ga yozadi. Bu produksiya serverida keraksiz paketlar o'rnatilmasligini ta'minlaydi." },

        { h2: "Test fayllar qayerda joylashadi?" },
        { p: "Jest test fayllarni avtomatik topadi. U quyidagi qoidalarga mos fayllarni test deb hisoblaydi:" },
        { ul: [
          "<code>.test.js</code> bilan tugaydigan fayllar — masalan <code>narx.test.js</code>.",
          "<code>.spec.js</code> bilan tugaydigan fayllar — masalan <code>narx.spec.js</code>.",
          "<code>__tests__</code> nomli papka ichidagi barcha fayllar."
        ] },
        { p: "Odatda test fayl tekshirilayotgan fayl yonida turadi. Aytaylik, bizda <code>narx.js</code> bor:" },
        { code: [
          "// narx.js",
          "function narxHisobla(soni, narx) {",
          "  return soni * narx;",
          "}",
          "",
          "module.exports = { narxHisobla };"
        ].join("\n") },
        { p: "Uning yonida <code>narx.test.js</code> yaratamiz va tekshirmoqchi bo'lgan funksiyani import qilamiz:" },
        { code: [
          "// narx.test.js",
          "const { narxHisobla } = require('./narx');",
          "",
          "test('mahsulot narxini hisoblaydi', () => {",
          "  expect(narxHisobla(3, 100)).toBe(300);",
          "});"
        ].join("\n") },

        { h2: "test() va it()" },
        { p: "Har bir test <code>test()</code> funksiyasi bilan e'lon qilinadi. U ikki argument oladi: testning nomi (matn) va sinovni bajaradigan funksiya." },
        { code: [
          "test('nom: nima tekshirilayotgani', () => {",
          "  // shu yerda tekshiruvlar bo'ladi",
          "});"
        ].join("\n") },
        { p: "<code>it()</code> — bu <code>test()</code>ning aynan bir xil sinonimi (taxallusi). U jumla ravon o'qilishi uchun ishlatiladi: \"it should ...\" (\"u ... qilishi kerak\"). Ikkalasi ham bir xil ishlaydi, tanlov did masalasi:" },
        { code: [
          "// Bu ikkisi mutlaqo bir xil:",
          "test('300 qaytaradi', () => { /* ... */ });",
          "it('300 qaytaradi',   () => { /* ... */ });"
        ].join("\n") },
        { tip: "Test nomini aniq va tushunarli yozing. Yaxshi nom xatolik chiqqanda darhol nima buzilganini aytib beradi: <code>'bo'sh savatcha uchun 0 qaytaradi'</code> — <code>'test1'</code> dan minglab marta foydaliroq." },

        { h2: "expect va matcherlar" },
        { p: "Testning yuragi — <code>expect</code>. U tekshirmoqchi bo'lgan qiymatni oladi, so'ng unga <strong>matcher</strong> (moslashtiruvchi) zanjirlanadi. Matcher qiymat qanday bo'lishi kerakligini aytadi. Umumiy shakl:" },
        { code: "expect(haqiqiyQiymat).matcher(kutilganQiymat);" },
        { h3: "toBe — aniq tenglik" },
        { p: "<code>toBe</code> qiymatlarni <code>===</code> orqali solishtiradi. Sonlar, satrlar, boolean kabi oddiy (primitiv) qiymatlar uchun ishlatiladi." },
        { code: [
          "expect(2 + 2).toBe(4);",
          "expect('salom').toBe('salom');",
          "expect(narxHisobla(0, 100)).toBe(0);"
        ].join("\n") },
        { h3: "toEqual — chuqur tenglik" },
        { p: "Obyekt va massivlar uchun <code>toBe</code> ishlamaydi, chunki ikki alohida obyekt hech qachon <code>===</code> bo'yicha teng emas. Ular ichidagi qiymatlarni solishtirish uchun <code>toEqual</code> ishlatiladi:" },
        { code: [
          "expect({ ism: 'Ali', yosh: 20 }).toEqual({ ism: 'Ali', yosh: 20 });",
          "expect([1, 2, 3]).toEqual([1, 2, 3]);",
          "",
          "// Diqqat: bu YIQILADI, chunki ikki obyekt turli xotira manzillari:",
          "// expect({ ism: 'Ali' }).toBe({ ism: 'Ali' });"
        ].join("\n") },
        { warn: "Obyekt yoki massivni <code>toBe</code> bilan solishtirmang — u har doim yiqiladi. Ichki qiymatlarni tekshirish uchun har doim <code>toEqual</code> ishlating." },
        { h3: "toContain — tarkibida bormi" },
        { p: "Massivda element yoki satrda kichik satr borligini tekshiradi:" },
        { code: [
          "expect([1, 2, 3]).toContain(2);",
          "expect(['olma', 'nok', 'uzum']).toContain('nok');",
          "expect('salom dunyo').toContain('dunyo');"
        ].join("\n") },
        { h3: "toThrow — xato tashlaydimi" },
        { p: "Funksiya xato (exception) tashlashini tekshiradi. Muhim nuqta: funksiyani chaqirib emas, balki <strong>funksiyani strelka ichiga o'rab</strong> berish kerak, aks holda xato testdan oldin otiladi:" },
        { code: [
          "function bo'l(a, b) {",
          "  if (b === 0) throw new Error('Nolga bo'lish mumkin emas');",
          "  return a / b;",
          "}",
          "",
          "// To'g'ri: funksiyani strelka ichida uzatamiz",
          "expect(() => bo'l(10, 0)).toThrow();",
          "",
          "// Xato matnini ham tekshirish mumkin:",
          "expect(() => bo'l(10, 0)).toThrow('Nolga bo'lish mumkin emas');"
        ].join("\n") },
        { h3: "Boshqa foydali matcherlar" },
        { ul: [
          "<code>toBeTruthy()</code> / <code>toBeFalsy()</code> — qiymat rost yoki yolg'onga o'xshashligini tekshiradi.",
          "<code>toBeNull()</code> / <code>toBeUndefined()</code> / <code>toBeDefined()</code> — <code>null</code>, <code>undefined</code> holatlari uchun.",
          "<code>toBeGreaterThan(n)</code> / <code>toBeLessThan(n)</code> — sonlarni taqqoslash.",
          "<code>toHaveLength(n)</code> — massiv yoki satr uzunligini tekshiradi.",
          "<code>not</code> — har qanday matcherni inkor qiladi: <code>expect(x).not.toBe(5)</code>."
        ] },
        { code: [
          "expect(10).toBeGreaterThan(5);",
          "expect([1, 2, 3]).toHaveLength(3);",
          "expect('ali').not.toBe('vali');",
          "expect(undefined).toBeUndefined();"
        ].join("\n") },

        { h2: "describe bloki" },
        { p: "Bog'liq testlarni guruhlash uchun <code>describe</code> bloki ishlatiladi. U testlarni tartibga soladi va natijalar chiqishini o'qilishi qulay qiladi:" },
        { code: [
          "const { narxHisobla } = require('./narx');",
          "",
          "describe('narxHisobla funksiyasi', () => {",
          "  test('oddiy hisob-kitobni bajaradi', () => {",
          "    expect(narxHisobla(3, 100)).toBe(300);",
          "  });",
          "",
          "  test('soni 0 bo'lsa 0 qaytaradi', () => {",
          "    expect(narxHisobla(0, 100)).toBe(0);",
          "  });",
          "",
          "  test('katta sonlar bilan ishlaydi', () => {",
          "    expect(narxHisobla(1000, 1000)).toBe(1000000);",
          "  });",
          "});"
        ].join("\n") },
        { note: "<code>describe</code> bloklarini bir-birining ichiga joylashtirish (nested) ham mumkin. Bu murakkab funksiyalarni holatlarga bo'lib tekshirishda foydali." },

        { h2: "Testlarni ishga tushirish" },
        { p: "Testlarni <code>npm test</code> yoki to'g'ridan-to'g'ri <code>npx jest</code> bilan ishga tushiramiz:" },
        { code: [
          "npm test",
          "",
          "# Natija shunday ko'rinadi:",
          "# PASS  ./narx.test.js",
          "#   narxHisobla funksiyasi",
          "#     v oddiy hisob-kitobni bajaradi (2 ms)",
          "#     v soni 0 bo'lsa 0 qaytaradi",
          "#     v katta sonlar bilan ishlaydi",
          "#",
          "# Test Suites: 1 passed, 1 total",
          "# Tests:       3 passed, 3 total"
        ].join("\n") },
        { p: "Kod ustida ishlayotganda eng qulay rejim — <strong>watch (kuzatuv) rejimi</strong>. U fayllar o'zgarishini kuzatadi va faqat tegishli testlarni avtomatik qayta ishga tushiradi:" },
        { code: [
          "npx jest --watch",
          "",
          "# Faqat bitta faylni ishga tushirish:",
          "npx jest narx.test.js",
          "",
          "# Nomi 'narx' so'zini o'z ichiga olgan testlarni ishga tushirish:",
          "npx jest -t narx"
        ].join("\n") },
        { tip: "Kod yozayotganda <code>--watch</code> rejimini yoqib qo'ying. Har bir saqlashda testlar avtomatik ishlaydi va siz xatoni darhol ko'rasiz — bu o'ta samarali ish sikli." },

        { h2: "Xulosa" },
        { ul: [
          "Jest <code>npm i -D jest</code> bilan o'rnatiladi va <code>package.json</code> scripts'iga <code>\"test\": \"jest\"</code> qo'shiladi.",
          "Test fayllar <code>.test.js</code>, <code>.spec.js</code> yoki <code>__tests__</code> papkasida bo'ladi.",
          "<code>test()</code> va <code>it()</code> — bir xil funksiya, test e'lon qiladi.",
          "<code>expect(qiymat).matcher(...)</code> — tekshiruvning asosiy shakli.",
          "Asosiy matcherlar: <code>toBe</code>, <code>toEqual</code>, <code>toContain</code>, <code>toThrow</code>; inkor uchun <code>not</code>.",
          "<code>describe</code> bog'liq testlarni guruhlaydi; testlar <code>npm test</code> yoki <code>jest --watch</code> bilan ishga tushadi."
        ] }
      ]
    },

    {
      slug: "jest-async-mock",
      title: "Async testlar va mock",
      blurb: "async/await testlari, resolves/rejects, jest.fn mock funksiyalar, jest.mock bilan modul mock qilish, beforeEach/afterEach va spy.",
      body: [
        { lead: "Real dasturlar tarmoq so'rovlari, ma'lumotlar bazasi va tashqi xizmatlar bilan ishlaydi. Bularni testda to'g'ri tekshirish uchun asinxron testlar va mock (soxta) obyektlarni bilish shart. Bu darsda aynan shularni o'rganamiz." },

        { h2: "Asinxron kodni testlash muammosi" },
        { p: "Agar test ichida promise bo'lsa, lekin siz uni kutmasangiz, Jest testni <em>tugadi</em> deb hisoblaydi va natija kelishidan oldin yashil ko'rsatadi. Bu xavfli — test aslida hech narsani tekshirmagan bo'lishi mumkin:" },
        { code: [
          "// XATO: bu test har doim o'tadi, hatto natija noto'g'ri bo'lsa ham!",
          "test('foydalanuvchini oladi', () => {",
          "  foydalanuvchiOl(1).then(user => {",
          "    expect(user.ism).toBe('Ali'); // Jest buni kutmaydi",
          "  });",
          "});"
        ].join("\n") },
        { warn: "Asinxron testda promise'ni <code>return</code> qilishni yoki <code>async/await</code> ishlatishni unutmang. Aks holda Jest natijani kutmasdan testni tugatadi va soxta yashil natija chiqadi." },

        { h2: "async/await bilan testlash" },
        { p: "Eng toza yo'l — test funksiyasini <code>async</code> qilish va promise'ni <code>await</code> bilan kutish:" },
        { code: [
          "async function foydalanuvchiOl(id) {",
          "  // aslida bu yerda tarmoq so'rovi bo'ladi",
          "  return { id, ism: 'Ali' };",
          "}",
          "",
          "test('foydalanuvchini id bo'yicha oladi', async () => {",
          "  const user = await foydalanuvchiOl(1);",
          "  expect(user.ism).toBe('Ali');",
          "  expect(user.id).toBe(1);",
          "});"
        ].join("\n") },
        { p: "Bu yerda <code>await</code> promise hal bo'lishini kutadi, so'ng tekshiruvlar bajariladi. Jest <code>async</code> funksiya qaytargan promise'ni avtomatik kutadi." },

        { h2: "resolves va rejects" },
        { p: "Promise'ni <code>await</code>siz to'g'ridan-to'g'ri tekshirishning qisqa yo'li ham bor: <code>resolves</code> muvaffaqiyatli natijani, <code>rejects</code> esa xatoni tekshiradi:" },
        { code: [
          "// Promise muvaffaqiyatli hal bo'lishini tekshirish:",
          "test('foydalanuvchi obyektini qaytaradi', async () => {",
          "  await expect(foydalanuvchiOl(1)).resolves.toEqual({ id: 1, ism: 'Ali' });",
          "});",
          "",
          "// Promise xato bilan rad etilishini tekshirish:",
          "async function xatoOl() {",
          "  throw new Error('Topilmadi');",
          "}",
          "",
          "test('mavjud bo'lmagan foydalanuvchi uchun xato beradi', async () => {",
          "  await expect(xatoOl()).rejects.toThrow('Topilmadi');",
          "});"
        ].join("\n") },
        { tip: "<code>resolves</code> va <code>rejects</code> oldida <code>await</code> qo'yishni unutmang. Bularsiz Jest promise natijasini kutmaydi." },

        { h2: "Mock funksiya: jest.fn()" },
        { p: "<strong>Mock</strong> (soxta) funksiya — bu chaqiruvlarni yozib boradigan va siz belgilagan qiymatni qaytaradigan sun'iy funksiya. U <code>jest.fn()</code> bilan yaratiladi. Mocklar ikki holatda juda foydali:" },
        { ul: [
          "Funksiya <strong>chaqirilganini</strong>, necha marta va qanday argument bilan chaqirilganini tekshirish.",
          "Real, sekin yoki xavfli kodni (masalan tarmoq so'rovi) sinovda soxta versiya bilan almashtirish."
        ] },
        { code: [
          "test('mock funksiya chaqiruvlarni yozadi', () => {",
          "  const mock = jest.fn();",
          "",
          "  mock('a');",
          "  mock('b', 42);",
          "",
          "  // Chaqirilganini tekshirish:",
          "  expect(mock).toHaveBeenCalled();",
          "  expect(mock).toHaveBeenCalledTimes(2);",
          "  expect(mock).toHaveBeenCalledWith('a');",
          "  expect(mock).toHaveBeenCalledWith('b', 42);",
          "});"
        ].join("\n") },
        { p: "Mock qanday qiymat qaytarishini ham belgilash mumkin:" },
        { code: [
          "const olMock = jest.fn();",
          "",
          "olMock.mockReturnValue(10);          // har safar 10 qaytaradi",
          "olMock.mockReturnValueOnce(5);       // faqat birinchi chaqiruvda 5",
          "olMock.mockResolvedValue({ ok: 1 }); // promise sifatida hal bo'ladi",
          "",
          "expect(olMock()).toBe(5);  // birinchisi",
          "expect(olMock()).toBe(10); // keyingilari"
        ].join("\n") },

        { h2: "Modulni mock qilish: jest.mock()" },
        { p: "Ko'pincha butun modulni soxtalashtirish kerak bo'ladi — masalan, testda real tarmoq so'rovi yubormaslik uchun HTTP kutubxonasini almashtiramiz. Buni <code>jest.mock()</code> qiladi. Aytaylik, bizda foydalanuvchini serverdan oladigan xizmat bor:" },
        { code: [
          "// apiClient.js",
          "async function get(url) {",
          "  // aslida real tarmoq so'rovi",
          "  const javob = await fetch(url);",
          "  return javob.json();",
          "}",
          "module.exports = { get };"
        ].join("\n") },
        { code: [
          "// foydalanuvchiXizmati.js",
          "const apiClient = require('./apiClient');",
          "",
          "async function foydalanuvchiIsmi(id) {",
          "  const user = await apiClient.get('/users/' + id);",
          "  return user.ism;",
          "}",
          "module.exports = { foydalanuvchiIsmi };"
        ].join("\n") },
        { p: "Testda <code>apiClient</code> modulini butunlay mock qilamiz, shunda real tarmoqqa chiqmaydi:" },
        { code: [
          "// foydalanuvchiXizmati.test.js",
          "const apiClient = require('./apiClient');",
          "const { foydalanuvchiIsmi } = require('./foydalanuvchiXizmati');",
          "",
          "jest.mock('./apiClient'); // butun modul avtomatik mock bo'ladi",
          "",
          "test('foydalanuvchi ismini qaytaradi', async () => {",
          "  // get soxta funksiyasi nima qaytarishini belgilaymiz:",
          "  apiClient.get.mockResolvedValue({ ism: 'Vali' });",
          "",
          "  const ism = await foydalanuvchiIsmi(7);",
          "",
          "  expect(ism).toBe('Vali');",
          "  expect(apiClient.get).toHaveBeenCalledWith('/users/7');",
          "});"
        ].join("\n") },
        { note: "<code>jest.mock('./apiClient')</code> chaqirilganda Jest moduldagi barcha funksiyalarni avtomatik <code>jest.fn()</code>ga aylantiradi. So'ng test ichida har biriga qaytariladigan qiymatni bering." },

        { h2: "beforeEach va afterEach" },
        { p: "Har bir testdan oldin yoki keyin bir xil tayyorgarlik yoki tozalash kerak bo'ladi. Buning uchun <strong>hooklar</strong> ishlatiladi:" },
        { ul: [
          "<code>beforeEach</code> — har bir testdan <em>oldin</em> ishlaydi (masalan ma'lumotni tayyorlash).",
          "<code>afterEach</code> — har bir testdan <em>keyin</em> ishlaydi (masalan mocklarni tozalash).",
          "<code>beforeAll</code> / <code>afterAll</code> — butun fayl bo'yicha faqat bir marta ishlaydi."
        ] },
        { code: [
          "describe('savat', () => {",
          "  let savat;",
          "",
          "  beforeEach(() => {",
          "    // har bir testdan oldin toza savat yaratamiz",
          "    savat = [];",
          "  });",
          "",
          "  afterEach(() => {",
          "    // mock chaqiruvlar tarixini tozalaymiz",
          "    jest.clearAllMocks();",
          "  });",
          "",
          "  test('mahsulot qo'shadi', () => {",
          "    savat.push('olma');",
          "    expect(savat).toHaveLength(1);",
          "  });",
          "",
          "  test('yangi test toza savatdan boshlanadi', () => {",
          "    expect(savat).toHaveLength(0); // beforeEach uni tozaladi",
          "  });",
          "});"
        ].join("\n") },
        { warn: "Mocklar testlar orasida holatini saqlaydi. Buni tozalamasangiz, bir test boshqasiga ta'sir qilishi mumkin. <code>afterEach</code>da <code>jest.clearAllMocks()</code> chaqirish — yaxshi odat." },

        { h2: "Spy — haqiqiy funksiyani kuzatish" },
        { p: "Ba'zan funksiyani butunlay almashtirmasdan, faqat <strong>kuzatmoqchi</strong> bo'lasiz: u chaqirildimi, qanday argument bilan? Bunda <code>jest.spyOn</code> ishlatiladi. Spy asl funksiyani saqlab qoladi, lekin chaqiruvlarni yozib boradi:" },
        { code: [
          "const kalkulyator = {",
          "  qoshish(a, b) {",
          "    return a + b;",
          "  }",
          "};",
          "",
          "test('qoshish metodi chaqirilganini kuzatadi', () => {",
          "  const spy = jest.spyOn(kalkulyator, 'qoshish');",
          "",
          "  const natija = kalkulyator.qoshish(2, 3);",
          "",
          "  expect(natija).toBe(5); // asl funksiya baribir ishladi",
          "  expect(spy).toHaveBeenCalledWith(2, 3);",
          "",
          "  spy.mockRestore(); // asl holatga qaytaramiz",
          "});"
        ].join("\n") },
        { tip: "Spy'ni <code>mockRestore()</code> bilan tiklashni unutmang, aks holda kuzatuv keyingi testlarga ta'sir qiladi. Kerak bo'lsa spy'ni <code>mockImplementation()</code> bilan vaqtincha boshqacha ishlashga majburlash ham mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "Asinxron testda promise'ni <code>async/await</code> bilan kuting yoki <code>return</code> qiling — aks holda soxta yashil natija chiqadi.",
          "<code>resolves</code> muvaffaqiyatli natijani, <code>rejects</code> xatoni tekshiradi (oldida <code>await</code> bilan).",
          "<code>jest.fn()</code> — mock funksiya; chaqiruvlarni yozadi va qiymat qaytaradi.",
          "<code>jest.mock('./modul')</code> butun modulni mockga aylantiradi — real tarmoqqa chiqmaslik uchun.",
          "<code>beforeEach</code>/<code>afterEach</code> har test uchun tayyorlash va tozalash bajaradi; mocklarni <code>clearAllMocks</code> bilan tozalang.",
          "<code>jest.spyOn</code> asl funksiyani saqlab, faqat chaqiruvlarni kuzatadi; oxirida <code>mockRestore()</code> qiling."
        ] }
      ]
    },

    {
      slug: "jest-amaliyot",
      title: "Coverage va yaxshi amaliyot",
      blurb: "Kod qamrovi (--coverage), AAA namunasi, nimani test qilish kerak, yaxshi test belgilari va to'liq test misoli.",
      body: [
        { lead: "Test yozishni bilish — bir masala, yaxshi test yozish — boshqa masala. Bu darsda kod qamrovini o'lchash, testlarni to'g'ri tuzilish namunasida yozish va qaysi holatlarni tekshirish kerakligini o'rganamiz." },

        { h2: "Kod qamrovi (coverage)" },
        { p: "<strong>Coverage (qamrov)</strong> — bu testlaringiz kodning qancha qismini ishga tushirganini ko'rsatadigan o'lchov. Jest buni <code>--coverage</code> bayrog'i bilan hisoblab beradi:" },
        { code: [
          "npx jest --coverage",
          "",
          "# package.json scripts'iga qo'shsa ham bo'ladi:",
          "# \"test:coverage\": \"jest --coverage\""
        ].join("\n") },
        { p: "Natijada jadval chiqadi. U to'rt ustunni ko'rsatadi:" },
        { code: [
          "-----------|---------|----------|---------|---------|",
          "File       | % Stmts | % Branch | % Funcs | % Lines |",
          "-----------|---------|----------|---------|---------|",
          "narx.js    |   100   |    80    |   100   |   100   |",
          "-----------|---------|----------|---------|---------|"
        ].join("\n") },
        { ul: [
          "<strong>% Stmts</strong> — bajarilgan operatorlar (statements) ulushi.",
          "<strong>% Branch</strong> — tekshirilgan tarmoqlar (masalan <code>if/else</code> ikkala yo'li).",
          "<strong>% Funcs</strong> — chaqirilgan funksiyalar ulushi.",
          "<strong>% Lines</strong> — ishga tushgan satrlar ulushi."
        ] },
        { warn: "Coverage — foydali, lekin aldamchi o'lchov. 100% qamrov kod xatosiz degani EMAS. Test satrni ishga tushirishi mumkin, lekin natijani hech tekshirmasligi mumkin. Coverage'ni maqsad emas, yo'l-yo'riq sifatida ishlating." },
        { tip: "Eng foydali ustun — <strong>% Branch</strong>. U <code>if</code>ning ham rost, ham yolg'on yo'llari tekshirilganini ko'rsatadi. Ko'p yashirin xatolar aynan tekshirilmagan tarmoqlarda yashiringan bo'ladi." },

        { h2: "AAA namunasi" },
        { p: "Yaxshi test aniq tuzilishga ega bo'lishi kerak. Eng ommabop namuna — <strong>AAA (Arrange-Act-Assert)</strong>, ya'ni <em>Tayyorla-Bajar-Tekshir</em>. Har bir test uch qismga bo'linadi:" },
        { ol: [
          "<strong>Arrange (Tayyorla):</strong> kerakli ma'lumot va holatni tayyorlaysiz.",
          "<strong>Act (Bajar):</strong> tekshirilayotgan funksiyani bir marta chaqirasiz.",
          "<strong>Assert (Tekshir):</strong> natija kutilganidek ekanini tekshirasiz."
        ] },
        { code: [
          "test('savatdagi mahsulotlar umumiy narxini hisoblaydi', () => {",
          "  // Arrange — tayyorlash",
          "  const savat = [",
          "    { nom: 'olma', narx: 100, soni: 2 },",
          "    { nom: 'nok',  narx: 200, soni: 1 }",
          "  ];",
          "",
          "  // Act — bajarish",
          "  const jami = umumiyNarx(savat);",
          "",
          "  // Assert — tekshirish",
          "  expect(jami).toBe(400);",
          "});"
        ].join("\n") },
        { note: "AAA namunasi testni o'qilishi oson qiladi: kim o'qisa ham, nima tayyorlangani, nima bajarilgani va nima kutilayotgani darhol ko'rinadi." },

        { h2: "Nimani test qilish kerak?" },
        { p: "Hamma narsani testlash kerak emas. Diqqatni eng ko'p xato yashiringan joylarga qarating:" },
        { ul: [
          "<strong>Oddiy holat (happy path):</strong> hamma narsa to'g'ri bo'lganda funksiya kutilgan natijani berishi.",
          "<strong>Chegaraviy holatlar (edge cases):</strong> bo'sh massiv, 0, manfiy son, juda katta qiymat, bitta element.",
          "<strong>Xato holatlar:</strong> noto'g'ri kirish, <code>null</code>, <code>undefined</code>, xato tashlanishi kerak bo'lgan joylar.",
          "<strong>Muhim biznes mantiq:</strong> narx hisoblash, chegirmalar, ruxsatlar kabi pul yoki xavfsizlikka aloqador qismlar."
        ] },
        { p: "Aksincha, bularni odatda alohida testlashning ma'nosi kam:" },
        { ul: [
          "Tashqi kutubxonalar (ular o'z testlariga ega).",
          "Oddiy getter/setter yoki hech qanday mantiqsiz o'ram funksiyalar.",
          "Til yoki freymvorkning o'zi (masalan <code>Array.map</code> ishlashini tekshirish shart emas)."
        ] },
        { tip: "Har bir <code>if</code> uchun kamida ikkita test o'ylang: shart rost bo'lgan va yolg'on bo'lgan holatlar. Shunda tarmoqlar to'liq qoplanadi." },

        { h2: "Yaxshi test belgilari" },
        { p: "Yaxshi testlar bir necha xususiyatga ega. Ularni <strong>FIRST</strong> tamoyillari deb ham atashadi:" },
        { ul: [
          "<strong>Fast (Tez):</strong> testlar tez ishlashi kerak, aks holda ularni ishga tushirmaysiz.",
          "<strong>Isolated (Mustaqil):</strong> har bir test boshqasidan mustaqil bo'lishi, tartibi muhim bo'lmasligi kerak.",
          "<strong>Repeatable (Takrorlanuvchi):</strong> test har safar bir xil natija berishi kerak — vaqt, tasodif yoki tarmoqqa bog'liq bo'lmasligi lozim.",
          "<strong>Self-validating (O'z-o'zini tekshiruvchi):</strong> natija aniq yashil yoki qizil bo'lishi, qo'lda talqin talab qilmasligi kerak.",
          "<strong>Thorough (To'liq):</strong> muhim holatlarni — oddiy, chegaraviy va xato holatlarni qamrab olishi kerak."
        ] },
        { p: "Bundan tashqari, quyidagi amaliy maslahatlarga rioya qiling:" },
        { ul: [
          "Bir testda bitta g'oyani tekshiring — nomidan nima tekshirilayotgani aniq bo'lsin.",
          "Test nomi tushunarli jumla bo'lsin: <code>'bo'sh savat uchun 0 qaytaradi'</code>.",
          "Testda mantiq (if, sikl) yozmang — test o'zi soddaligicha qolsin.",
          "Testlar tasodifiy qiymat yoki joriy vaqtga bog'liq bo'lmasin."
        ] },
        { warn: "Bir-biriga bog'liq testlar — eng ko'p uchraydigan muammo. Agar bitta test ikkinchisidan qolgan holatga tayansa, biri o'zgarganda ikkinchisi tushunarsiz sabab bilan yiqiladi." },

        { h2: "To'liq misol: valyuta konvertori" },
        { p: "Endi barcha o'rganganlarimizni bitta funksiya uchun to'liq testda birlashtiramiz. Mana tekshiriladigan funksiya:" },
        { code: [
          "// konvertor.js",
          "function konvertQil(summa, kurs) {",
          "  if (typeof summa !== 'number' || typeof kurs !== 'number') {",
          "    throw new Error('Summa va kurs son bo'lishi kerak');",
          "  }",
          "  if (summa < 0) {",
          "    throw new Error('Summa manfiy bo'lishi mumkin emas');",
          "  }",
          "  return Math.round(summa * kurs * 100) / 100;",
          "}",
          "",
          "module.exports = { konvertQil };"
        ].join("\n") },
        { p: "Uning uchun oddiy, chegaraviy va xato holatlarni qamrab oluvchi to'liq test to'plami:" },
        { code: [
          "// konvertor.test.js",
          "const { konvertQil } = require('./konvertor');",
          "",
          "describe('konvertQil', () => {",
          "",
          "  // Oddiy holat",
          "  test('summani kursga ko'paytiradi', () => {",
          "    // Arrange / Act",
          "    const natija = konvertQil(100, 12.5);",
          "    // Assert",
          "    expect(natija).toBe(1250);",
          "  });",
          "",
          "  test('natijani ikki xonagacha yaxlitlaydi', () => {",
          "    expect(konvertQil(10, 1.005)).toBe(10.05);",
          "  });",
          "",
          "  // Chegaraviy holatlar",
          "  test('0 summa uchun 0 qaytaradi', () => {",
          "    expect(konvertQil(0, 12.5)).toBe(0);",
          "  });",
          "",
          "  test('kurs 0 bo'lsa 0 qaytaradi', () => {",
          "    expect(konvertQil(100, 0)).toBe(0);",
          "  });",
          "",
          "  // Xato holatlar",
          "  test('manfiy summa uchun xato tashlaydi', () => {",
          "    expect(() => konvertQil(-5, 12)).toThrow('manfiy');",
          "  });",
          "",
          "  test('son bo'lmagan kirish uchun xato tashlaydi', () => {",
          "    expect(() => konvertQil('100', 12)).toThrow();",
          "    expect(() => konvertQil(100, null)).toThrow();",
          "  });",
          "});"
        ].join("\n") },
        { p: "E'tibor bering: test to'plami funksiyaning har bir tarmog'ini — oddiy ishlash, yaxlitlash, nol qiymatlar, manfiy va noto'g'ri turdagi kirishlarni — qamrab oldi. Aynan shunday testlar kelajakda kod o'zgartirilganda sizni himoya qiladi." },
        { tip: "To'liq testni bir zumda emas, bosqichma-bosqich yozing: avval oddiy holat, so'ng chegaraviy, oxirida xato holatlari. Har bir test qo'shilgach uni ishga tushirib, yashil ekaniga ishonch hosil qiling." },

        { h2: "Xulosa" },
        { ul: [
          "<code>jest --coverage</code> kodning qancha qismi test bilan qoplanganini ko'rsatadi; % Branch — eng foydali ustun.",
          "Coverage 100% bo'lishi kod xatosiz degani emas — uni yo'l-yo'riq sifatida ishlating.",
          "AAA namunasi: Arrange (tayyorla), Act (bajar), Assert (tekshir) — testni o'qilishli qiladi.",
          "Oddiy, chegaraviy va xato holatlarni test qiling; tashqi kutubxona va tilning o'zini emas.",
          "Yaxshi test FIRST: tez, mustaqil, takrorlanuvchi, o'z-o'zini tekshiruvchi va to'liq.",
          "Har bir funksiya uchun oddiy + chegaraviy + xato holatlarni qamragan to'liq test to'plami eng ishonchli himoya beradi."
        ] }
      ]
    }
  ]
};
