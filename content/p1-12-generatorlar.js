"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Generatorlar, ilg'or iteratsiya",
  lessons: [
    {
      slug: "generator",
      title: "Generatorlar",
      blurb: "function* va yield yordamida qiymatlarni birma-bir, talab bo'yicha ishlab chiqaruvchi maxsus funksiyalar.",
      body: [
        { lead: "Oddiy funksiya bir marta ishga tushib, bir marta qiymat qaytaradi va tugaydi. <strong>Generator</strong> esa boshqacha — u bir necha marta \"to'xtab\", bir necha bor qiymat qaytara oladi va keyin qoldirilgan joyidan davom etadi. Generatorlar iteratorlar bilan birga ishlaganda ma'lumotlar oqimini juda oson yaratishga imkon beradi." },

        { h2: "Generator funksiyasi" },
        { p: "Generator yaratish uchun maxsus sintaksisdan foydalaniladi: <code>function*</code> (yulduzcha bilan). Bunday funksiyalar <em>generator funksiyalari</em> deb ataladi." },
        { p: "Yulduzchani <code>function</code> so'zidan keyin ham, funksiya nomidan oldin ham qo'yish mumkin — <code>function* gen()</code> yoki <code>function *gen()</code>. Odatda birinchi ko'rinish afzal ko'riladi." },
        { code: "function* generateSequence() {\n  yield 1;\n  yield 2;\n  return 3;\n}" },
        { p: "Generator funksiyasining o'zi chaqirilganda kod <strong>bajarilmaydi</strong>. Uning o'rniga u maxsus <em>generator obyekti</em>ni qaytaradi. Bu obyekt bajarilishni boshqarishga xizmat qiladi." },
        { pg: "function* generateSequence() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\n// \"generator funksiyasi\" maxsus generator obyektini yaratadi\nlet generator = generateSequence();\nconsole.log(generator);            // obyekt\nconsole.log(typeof generator);     // object\nconsole.log(String(generator));    // [object Generator]", file: "generator-obyekt.js" },
        { note: "Generator funksiyasini chaqirish uning tanasidagi kodni ishga tushirmaydi. U shunchaki kodni <strong>boshqaruvchi</strong> obyektni qaytaradi. Kod faqat <code>next()</code> chaqirilganda bajarila boshlaydi." },

        { h2: "yield — asosiy metod" },
        { p: "Generatorning yuragi — <code>yield</code> operatori. Aynan u generatorni oddiy funksiyadan ajratib turadi. <code>yield</code> ma'nosi: \"bu yerda to'xta, qiymat qaytar va meni kutib tur\"." },
        { p: "Generator ishlashi uchun uning <code>next()</code> metodi chaqirilishi kerak. <code>next()</code> chaqirilganda kod eng yaqin <code>yield &lt;qiymat&gt;</code> gacha bajariladi (qiymat tashlab yuborilishi mumkin, u holda <code>undefined</code> bo'ladi). So'ng bajarilish to'xtaydi va qiymat tashqariga qaytariladi." },
        { p: "<code>next()</code> ning natijasi — doim ikkita xususiyatli obyekt:" },
        { ul: [
          "<code>value</code> — qaytarilgan qiymat;",
          "<code>done</code> — agar generator kodi tugagan bo'lsa <code>true</code>, aks holda <code>false</code>."
        ] },
        { pg: "function* generateSequence() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\nlet generator = generateSequence();\n\nlet one = generator.next();\nconsole.log(JSON.stringify(one));   // {\"value\":1,\"done\":false}\n\nlet two = generator.next();\nconsole.log(JSON.stringify(two));   // {\"value\":2,\"done\":false}\n\nlet three = generator.next();\nconsole.log(JSON.stringify(three)); // {\"value\":3,\"done\":true}", file: "next-metod.js" },
        { p: "Diqqat qiling: birinchi <code>next()</code> birinchi <code>yield 1</code> gacha bajarildi va <code>{value: 1, done: false}</code> qaytardi. Ikkinchisi <code>yield 2</code> gacha davom etib, <code>{value: 2, done: false}</code> qaytardi. Uchinchisi <code>return 3</code> gacha yetib bordi — bu generatorning tugashini bildiradi, shuning uchun <code>done: true</code>." },
        { warn: "Generator tugagach (<code>done: true</code>), keyingi <code>next()</code> chaqiruvlari doim <code>{value: undefined, done: true}</code> qaytaradi. Tugagan generatorni qayta ishga tushirib bo'lmaydi — buning uchun yangi generator obyekti yaratish kerak." },
        { note: "<code>yield</code> va <code>return</code> orasidagi farq: <code>yield</code> to'xtatadi lekin generator hali <em>done</em> emas; <code>return</code> esa generatorni butunlay tugatadi. Shuning uchun <code>for..of</code> <code>return</code> qiymatini e'tiborsiz qoldiradi (buni pastda ko'ramiz)." },

        { h2: "Generatorlar — iterativlar (iterable)" },
        { p: "Generator obyektlari <em>iterativ</em> (iterable) hisoblanadi. Bu degani, ularni <code>for..of</code> sikli bilan aylanib chiqish mumkin:" },
        { pg: "function* generateSequence() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nlet generator = generateSequence();\n\nfor (let value of generator) {\n  console.log(value); // 1, keyin 2, keyin 3\n}", file: "for-of.js" },
        { p: "Bu <code>next()</code> ni qo'lda chaqirishdan ancha chiroyliroq ko'rinadi, shunday emasmi?" },
        { warn: "Muhim nozik jihat: yuqoridagi misol <strong>1, 2, 3</strong> ni ko'rsatadi, lekin <strong>3</strong> ni emas! Sababi — <code>for..of</code> iteratsiyasi <code>done: true</code> bo'lgan oxirgi qiymatni e'tiborsiz qoldiradi. Shuning uchun agar barcha qiymatlar <code>for..of</code> orqali ko'rinishini xohlasangiz, ularni <code>return</code> emas, <code>yield</code> orqali qaytaring." },
        { p: "Quyidagi misolda farqni ko'ring — <code>return 3</code> ishlatilganda 3 ko'rinmaydi:" },
        { pg: "function* gen() {\n  yield 1;\n  yield 2;\n  return 3; // for..of buni ko'rsatmaydi\n}\n\nlet natija = [];\nfor (let value of gen()) {\n  natija.push(value);\n}\nconsole.log(natija); // [1, 2] — 3 yo'q!", file: "return-for-of.js" },

        { h2: "Spread sintaksisi bilan" },
        { p: "Generatorlar iterativ bo'lgani uchun, spread sintaksisi <code>...</code> ham ular bilan ishlaydi. Bu generator natijalarini massivga aylantirishning qulay usuli:" },
        { pg: "function* generateSequence() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nlet sequence = [0, ...generateSequence()];\nconsole.log(sequence);        // [0, 1, 2, 3]\nconsole.log(sequence.length); // 4", file: "spread.js" },
        { tip: "Endilikda massiv, string, <code>Map</code>, <code>Set</code> ishlaydigan har qanday joyda generatorlarni ham ishlata olasiz — chunki ularning barchasi umumiy <em>iteratsiya</em> protokoliga bo'ysunadi." },

        { h2: "Iterativlar o'rniga generatorlardan foydalanish" },
        { p: "Ilgari (masalan, iteratorlar mavzusida) biz <code>range</code> obyektiga <code>Symbol.iterator</code> qo'shib, uni iterativ qilgan bo'lishimiz mumkin. Generatorlar bu ishni ancha soddalashtiradi. Quyida — generatorli, sodda va o'qishga oson variant:" },
        { pg: "let range = {\n  from: 1,\n  to: 5,\n\n  // Symbol.iterator o'rniga generator ishlatamiz\n  *[Symbol.iterator]() {\n    for (let value = this.from; value <= this.to; value++) {\n      yield value;\n    }\n  }\n};\n\nconsole.log([...range]); // [1, 2, 3, 4, 5]\n\nfor (let num of range) {\n  console.log(num); // 1, 2, 3, 4, 5\n}", file: "range-generator.js" },
        { p: "Bu ishlaydi, chunki <code>range[Symbol.iterator]()</code> endi generatorni qaytaradi, generator obyektida esa <code>next()</code> metodi va <code>[Symbol.iterator]</code> allaqachon mavjud. Ya'ni generator obyektining o'zi ham iterator, ham iterativ." },
        { note: "<code>*[Symbol.iterator]() { ... }</code> — bu obyekt metodini generator sifatida e'lon qilishning qisqa yozuvi. Yulduzcha (<code>*</code>) metodni generatorga aylantiradi." },

        { h2: "Cheksiz generatorlar" },
        { p: "Generatorlar <em>dangasa</em> (lazy) — ular qiymatni faqat so'ralganda ishlab chiqaradi. Shu sabab, cheksiz ketma-ketliklarni ham yaratish mumkin. Muhimi — bunday generatorni cheksiz aylantirmang, aks holda dastur qotib qoladi." },
        { pg: "function* naturalNumbers() {\n  let n = 1;\n  while (true) {   // cheksiz sikl — xavfli emas, chunki dangasa\n    yield n;\n    n++;\n  }\n}\n\nlet gen = naturalNumbers();\n\n// Faqat kerakli qadar qiymat olamiz\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2\nconsole.log(gen.next().value); // 3\nconsole.log(gen.next().value); // 4", file: "cheksiz.js" },
        { warn: "Cheksiz generatorni <code>for..of</code> yoki <code>[...gen]</code> bilan to'liq aylanib chiqmang — bu abadiy sikl va dastur to'xtab qolishiga olib keladi. Ulardan doim <code>next()</code> orqali, kerakli miqdorda qiymat oling." },

        { h2: "Generator kompozitsiyasi: yield*" },
        { p: "<strong>Generator kompozitsiyasi</strong> — bir generatorni boshqasining ichiga \"joylash\" (embed qilish) imkoniyati. Buning uchun maxsus <code>yield*</code> sintaksisidan foydalaniladi." },
        { p: "Misol uchun, ketma-ket sonlar generatorimiz bo'lsin, keyin uni raqamlar va harflar ketma-ketligini yaratish uchun qayta ishlataylik:" },
        { pg: "function* generateSequence(start, end) {\n  for (let i = start; i <= end; i++) yield i;\n}\n\nfunction* generatePasswordCodes() {\n  // 0..9 (kodlar 48..57)\n  yield* generateSequence(48, 57);\n  // A..Z (kodlar 65..90)\n  yield* generateSequence(65, 90);\n  // a..z (kodlar 97..122)\n  yield* generateSequence(97, 122);\n}\n\nlet str = '';\nfor (let code of generatePasswordCodes()) {\n  str += String.fromCharCode(code);\n}\nconsole.log(str); // 0..9A..Za..z", file: "yield-delegatsiya.js" },
        { p: "<code>yield* gen</code> ifodasi <code>gen</code> generatorga <em>delegatsiya</em> qiladi: uning barcha <code>yield</code> lari xuddi tashqi generatorning o'zidan chiqqandek tashqariga uzatiladi. Natija xuddi ichki generatorning kodi tashqi generator ichiga to'g'ridan-to'g'ri yozilgandek bo'ladi." },
        { p: "Quyidagi ikki variant bir xil natija beradi:" },
        { pg: "function* gen() {\n  yield 1;\n  yield 2;\n}\n\n// Variant 1: yield* bilan delegatsiya\nfunction* delegate() {\n  yield* gen();\n  yield 3;\n}\n\n// Variant 2: qo'lda takrorlash\nfunction* manual() {\n  for (let x of gen()) yield x;\n  yield 3;\n}\n\nconsole.log([...delegate()]); // [1, 2, 3]\nconsole.log([...manual()]);   // [1, 2, 3]", file: "yield-star-taqqoslash.js" },
        { note: "<code>yield*</code> istalgan iterativ bilan ishlaydi — nafaqat generatorlar, balki massivlar va stringlar bilan ham. Masalan, <code>yield* [1, 2, 3]</code> yoki <code>yield* 'abc'</code> ham to'g'ri ishlaydi." },
        { pg: "function* gen() {\n  yield* [1, 2, 3];\n  yield* 'ab';\n}\nconsole.log([...gen()]); // [1, 2, 3, \"a\", \"b\"]", file: "yield-star-iterable.js" },

        { h2: "next(qiymat) orqali ma'lumot uzatish" },
        { p: "Hozirgacha generatorlar ma'lumot manbaiga o'xshardi — ular qiymat <em>chiqarardi</em>. Ammo generatorlar ikki tomonlama aloqa quroli: ularga <strong>ichkariga ham qiymat uzatish</strong> mumkin. Buning uchun <code>generator.next(qiymat)</code> ga argument berilади." },
        { p: "Bu qiymat <code>yield</code> ifodasining <strong>natijasi</strong> bo'lib qaytadi. Ya'ni <code>let result = yield ...</code> yozganda, <code>result</code> ga aynan keyingi <code>next(qiymat)</code> dagi qiymat tushadi." },
        { pg: "function* gen() {\n  // Savol beramiz va javobni kutamiz\n  let javob = yield '2 + 2 nechchi?';\n  console.log('Foydalanuvchi javobi:', javob);\n}\n\nlet generator = gen();\n\n// Birinchi next() birinchi yield gacha yuguradi\nlet savol = generator.next();\nconsole.log(savol.value); // \"2 + 2 nechchi?\"\n\n// Javobni generator ICHIGA uzatamiz\ngenerator.next(4); // \"Foydalanuvchi javobi: 4\"", file: "next-argument.js" },
        { p: "Bu jarayonni bosqichma-bosqich tushunish muhim:" },
        { ol: [
          "Birinchi <code>next()</code> doim argumentsiz chaqiriladi (unga uzatilgan qiymat e'tiborsiz qoldiriladi), chunki hali kutayotgan <code>yield</code> yo'q. U kodni birinchi <code>yield</code> gacha yuguradi.",
          "Keyin <code>next(4)</code> chaqiriladi — 4 qiymati generatorga qaytadi va <code>yield</code> ifodasining natijasi bo'lib, <code>javob</code> o'zgaruvchisiga tushadi.",
          "Generator keyingi <code>yield</code> gacha (yoki oxirigacha) davom etadi."
        ] },
        { p: "Ko'p savolli, murakkabroq misol:" },
        { pg: "function* gen() {\n  let n1 = yield 'Birinchi son?';\n  let n2 = yield 'Ikkinchi son?';\n  yield 'Yig\\'indi: ' + (n1 + n2);\n}\n\nlet g = gen();\nconsole.log(g.next().value);   // \"Birinchi son?\"\nconsole.log(g.next(3).value);  // \"Ikkinchi son?\"\nconsole.log(g.next(5).value);  // \"Yig'indi: 8\"", file: "next-korsatuv.js" },
        { tip: "<code>next(qiymat)</code> ni tushunishning eng oson yo'li: <code>yield</code> — bu \"ikki tomonli darvoza\". Undan <em>chiqadigan</em> qiymat <code>yield</code> dan keyin yoziladi, unga <em>kiradigan</em> qiymat esa keyingi <code>next()</code> dan keladi." },

        { h2: "generator.return va generator.throw" },
        { p: "Generatorlarda <code>next()</code> dan tashqari yana ikki metod bor:" },
        { ul: [
          "<code>generator.return(qiymat)</code> — generatorni majburan tugatadi va berilgan qiymatni qaytaradi;",
          "<code>generator.throw(xato)</code> — generator ichida, joriy <code>yield</code> o'rnida xatolik (exception) chiqaradi."
        ] },
        { pg: "function* gen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nlet g = gen();\nconsole.log(JSON.stringify(g.next()));     // {\"value\":1,\"done\":false}\nconsole.log(JSON.stringify(g.return(99))); // {\"value\":99,\"done\":true}\nconsole.log(JSON.stringify(g.next()));     // {\"value\":undefined,\"done\":true}", file: "return-metod.js" },
        { note: "<code>return()</code> chaqirilgach generator tugaydi — keyingi barcha <code>next()</code> lar <code>{value: undefined, done: true}</code> qaytaradi." },

        { h2: "Amaliy qo'llanishi" },
        { p: "Generatorlar aynan qaysi vaziyatlarda foydali?" },
        { ul: [
          "<strong>Ketma-ketliklar</strong> — sonlar oqimi, ID generatorlar, sahifalash (pagination) kabi cheksiz yoki katta ma'lumot oqimlarini dangasa hosil qilish;",
          "<strong>Maxsus iterativlar</strong> — o'z obyektlaringizni <code>for..of</code> bilan ishlaydigan qilish (yuqoridagi <code>range</code> misoli);",
          "<strong>Murakkab tuzilmalarni tekislash</strong> — daraxtsimon (tree) tuzilmalarni <code>yield*</code> orqali oson rekursiv aylanib chiqish;",
          "<strong>Holatni saqlash</strong> — generator o'z bajarilish holatini (o'zgaruvchilar, joyi) o'zida saqlaydi, bu ba'zi vazifalarni soddalashtiradi."
        ] },
        { p: "Quyida — noyob ID generator, amaliy va foydali namuna:" },
        { pg: "function* idGenerator() {\n  let id = 1;\n  while (true) {\n    yield 'user_' + id;\n    id++;\n  }\n}\n\nlet ids = idGenerator();\nconsole.log(ids.next().value); // \"user_1\"\nconsole.log(ids.next().value); // \"user_2\"\nconsole.log(ids.next().value); // \"user_3\"", file: "id-generator.js" },
        { p: "Yana bir misol — daraxtsimon tuzilmani <code>yield*</code> rekursiya bilan tekislash:" },
        { pg: "let tree = {\n  value: 1,\n  children: [\n    { value: 2, children: [] },\n    { value: 3, children: [\n      { value: 4, children: [] }\n    ] }\n  ]\n};\n\nfunction* walk(node) {\n  yield node.value;\n  for (let child of node.children) {\n    yield* walk(child); // rekursiv delegatsiya\n  }\n}\n\nconsole.log([...walk(tree)]); // [1, 2, 3, 4]", file: "daraxt-walk.js" },

        { h2: "Xulosa" },
        { ul: [
          "Generatorlar <code>function*</code> orqali yaratiladi va chaqirilganda <strong>generator obyekti</strong> qaytaradi (kod darhol bajarilmaydi);",
          "<code>yield</code> generatorni to'xtatadi va qiymat qaytaradi; <code>next()</code> uni davom ettiradi;",
          "<code>next()</code> natijasi — <code>{value, done}</code> obyekti;",
          "Generatorlar iterativ — ular <code>for..of</code>, spread <code>...</code> bilan ishlaydi (lekin <code>return</code> qiymati <code>for..of</code> da ko'rinmaydi);",
          "<code>yield*</code> boshqa generator yoki iterativga delegatsiya qiladi;",
          "<code>next(qiymat)</code> generatorning ichiga qiymat uzatadi — bu <code>yield</code> ifodasining natijasi bo'ladi;",
          "Generatorlar dangasa hisoblanadi — cheksiz ketma-ketliklar, ID generatorlar, maxsus iterativlar uchun ideal."
        ] }
      ]
    },
    {
      slug: "async-iteration",
      title: "Asinxron iteratsiya va generatorlar",
      blurb: "for await..of, Symbol.asyncIterator va async generatorlar — ma'lumot asta-sekin, so'rovlar orqali kelganda ishlatiladi.",
      body: [
        { lead: "Asinxron iteratsiya bizga ma'lumot <strong>asinxron ravishda</strong>, ya'ni <code>Promise</code> lar orqali qismlar bo'lib kelganda uni birma-bir qayta ishlashga imkon beradi. Masalan, tarmoqdan sahifama-sahifa yuklanadigan ma'lumot — bu asinxron iteratsiya uchun ideal holat." },

        { h2: "Oddiy iteratsiyani eslaylik" },
        { p: "Avval sinxron (oddiy) iteratsiyani eslaymiz. Iterativ obyekt yaratish uchun unga <code>Symbol.iterator</code> metodini qo'shamiz:" },
        { code: "let range = {\n  from: 1,\n  to: 5,\n\n  [Symbol.iterator]() {\n    return {\n      current: this.from,\n      last: this.to,\n\n      next() {\n        if (this.current <= this.last) {\n          return { done: false, value: this.current++ };\n        } else {\n          return { done: true };\n        }\n      }\n    };\n  }\n};\n\nfor (let value of range) {\n  console.log(value); // 1, 2, 3, 4, 5\n}" },
        { p: "Bu yerda barcha qadamlar <strong>sinxron</strong> — <code>next()</code> darhol tayyor <code>{value, done}</code> obyektini qaytaradi. Kutish yo'q. Ammo hayotda ko'p ma'lumotlar <em>vaqt talab qilib</em> keladi: tarmoqdan yuklab olish, fayl o'qish, ma'lumotlar bazasidan so'rov. Bunday holatlar uchun asinxron iteratsiya kerak." },

        { h2: "Sinxron va asinxron iteratsiya farqi" },
        { p: "Asinxron iteratsiya sinxronidan uch nuqtada farq qiladi. Farqlarni jadval kabi solishtiramiz:" },
        { ul: [
          "<strong>Metod nomi:</strong> sinxronda <code>Symbol.iterator</code>, asinxronda <code>Symbol.asyncIterator</code>;",
          "<strong>next() qaytaruvchisi:</strong> sinxronda oddiy <code>{value, done}</code> obyekt, asinxronda <code>{value, done}</code> ga <em>resolve</em> bo'ladigan <code>Promise</code>;",
          "<strong>Sikl:</strong> sinxronda <code>for..of</code>, asinxronda <code>for await..of</code>."
        ] },
        { note: "Asinxron iteratorda <code>next()</code> <code>Promise</code> qaytargani uchun, <code>for await..of</code> har bir qadamda avtomatik ravishda <code>await</code> qiladi — ya'ni <code>Promise</code> bajarilishini kutadi, so'ng keyingi qadamga o'tadi." },
        { warn: "Asinxron iterativlar bilan spread sintaksisi <code>...</code> <strong>ishlamaydi</strong> — u <code>Symbol.iterator</code> (sinxron) ni kutadi, <code>Symbol.asyncIterator</code> ni emas. Xuddi shunday, oddiy <code>for..of</code> ham asinxron iterativ bilan ishlamaydi." },

        { h2: "Symbol.asyncIterator" },
        { p: "Obyektni asinxron iterativ qilish uchun unga <code>Symbol.iterator</code> emas, <code>Symbol.asyncIterator</code> metodini qo'shamiz. Uning <code>next()</code> metodi <code>Promise</code> qaytarishi (yoki <code>async</code> bo'lishi) kerak." },
        { p: "Quyidagi misolda <code>range</code> obyektini asinxron qilamiz — har qiymat 1 sekundlik kechikish bilan keladi:" },
        { code: "let range = {\n  from: 1,\n  to: 5,\n\n  // Symbol.iterator O'RNIGA Symbol.asyncIterator\n  [Symbol.asyncIterator]() {\n    return {\n      current: this.from,\n      last: this.to,\n\n      // next() endi async — Promise qaytaradi\n      async next() {\n        // 1 sekund kutamiz (asinxronlikni taqlid qilamiz)\n        await new Promise(resolve => setTimeout(resolve, 1000));\n\n        if (this.current <= this.last) {\n          return { done: false, value: this.current++ };\n        } else {\n          return { done: true };\n        }\n      }\n    };\n  }\n};\n\n(async () => {\n  // for..of EMAS, for AWAIT..of\n  for await (let value of range) {\n    console.log(value); // 1, keyin 2, ... har biri 1 sek kechikish bilan\n  }\n})();" },
        { p: "E'tibor bering: <code>next()</code> ichida <code>await</code> ishlatilgani uchun u <code>async</code> deb belgilandi, va sikl <code>for await..of</code> bo'ldi. Har bir iteratsiya <code>Promise</code> bajarilishini kutadi." },
        { warn: "<code>for await..of</code> faqat <code>async</code> funksiya ichida ishlatilishi mumkin (yoki top-level modul kontekstida). Oddiy sinxron funksiya ichida uni ishlata olmaysiz." },

        { h2: "Asinxron generatorlar (async function*)" },
        { p: "Oddiy generatorlar sinxron edi — ular ichida <code>await</code> ishlatib bo'lmaydi va barcha qiymatlar sinxron chiqadi. <strong>Asinxron generator</strong> esa <code>async function*</code> orqali yaratiladi va uning ichida <code>await</code> ishlatish mumkin." },
        { code: "async function* generateSequence(start, end) {\n  for (let i = start; i <= end; i++) {\n    // Endi await ishlata olamiz!\n    await new Promise(resolve => setTimeout(resolve, 1000));\n    yield i;\n  }\n}\n\n(async () => {\n  let generator = generateSequence(1, 5);\n  for await (let value of generator) {\n    console.log(value); // 1, 2, 3, 4, 5 — har biri 1 sek kechikish bilan\n  }\n})();" },
        { p: "Sinxron va asinxron generatorlar orasidagi asosiy farqlar:" },
        { ul: [
          "<strong>E'lon:</strong> <code>function*</code> o'rniga <code>async function*</code>;",
          "<strong>next() qaytaruvchisi:</strong> oddiy <code>{value, done}</code> emas, balki unga resolve bo'ladigan <code>Promise</code>;",
          "<strong>Aylanish:</strong> <code>for..of</code> emas, <code>for await..of</code>;",
          "<strong>Ichida:</strong> asinxron generatorda <code>await</code> ishlata olasiz."
        ] },
        { note: "Asinxron generatorda <code>next()</code> ni qo'lda chaqirsangiz, u <code>Promise</code> qaytaradi. Shuning uchun uni <code>await</code> qilish kerak: <code>let res = await generator.next();</code> — bu holda <code>res</code> <code>{value, done}</code> bo'ladi." },
        { code: "async function* gen() {\n  yield 1;\n  yield 2;\n}\n\n(async () => {\n  let g = gen();\n  console.log(await g.next()); // {value: 1, done: false}\n  console.log(await g.next()); // {value: 2, done: false}\n  console.log(await g.next()); // {value: undefined, done: true}\n})();" },

        { h2: "Generator orqali asinxron iterativ obyekt" },
        { p: "Sinxron dunyodagidek, asinxron obyektlarni ham generator yordamida ancha soddalashtirish mumkin. <code>Symbol.asyncIterator</code> ni asinxron generator qilib e'lon qilamiz:" },
        { code: "let range = {\n  from: 1,\n  to: 5,\n\n  // async generator sifatida qisqa yozuv\n  async *[Symbol.asyncIterator]() {\n    for (let value = this.from; value <= this.to; value++) {\n      await new Promise(resolve => setTimeout(resolve, 1000));\n      yield value;\n    }\n  }\n};\n\n(async () => {\n  for await (let value of range) {\n    console.log(value); // 1, 2, 3, 4, 5 (kechikish bilan)\n  }\n})();" },
        { p: "Bu variant qo'lda <code>next()</code>, <code>current</code>, <code>last</code> yozishdan ancha qisqa va o'qishga oson. Generator holatni (joriy qiymat, sikl joyi) o'zida avtomatik saqlaydi." },
        { tip: "Umumiy qoida: agar iteratsiya mantig'i murakkab bo'lsa yoki holatni qo'lda boshqarish zerikarli bo'lsa — generator (sinxron yoki asinxron) yozing. U kodni sezilarli darajada soddalashtiradi." },

        { h2: "Amaliy misol: sahifama-sahifa ma'lumot yuklash" },
        { p: "Asinxron generatorlar eng ko'p <strong>sahifalash</strong> (pagination) uchun ishlatiladi. Ko'p API'lar ma'lumotni bo'laklarga (sahifalarga) bo'lib beradi: har so'rov bir sahifa qaytaradi, unda keyingi sahifa manzili (URL) bo'ladi. Asinxron generator bu jarayonni chiroyli inkapsulyatsiya qiladi:" },
        { code: "// Tasavvur qiling: bu funksiya URL bo'yicha bir sahifani yuklaydi\n// va { items: [...], next: 'keyingi-url yoki null' } qaytaradi.\nasync function* fetchCommits(url) {\n  while (url) {\n    const response = await fetch(url); // sahifani so'raymiz\n    const body = await response.json();\n\n    // keyingi sahifa manzilini olamiz\n    url = body.next || null;\n\n    // sahifadagi har bir elementni birma-bir yield qilamiz\n    for (let item of body.items) {\n      yield item;\n    }\n  }\n}\n\n(async () => {\n  let count = 0;\n  for await (let commit of fetchCommits('https://api.example.com/commits')) {\n    console.log(commit);\n    if (++count >= 100) break; // faqat dastlabki 100 ta kerak\n  }\n})();" },
        { p: "Bu kodning go'zalligi shundaki — foydalanuvchi (<code>for await..of</code> yozgan kod) sahifalash haqida umuman o'ylamaydi. Generator sahifalarni orqa fonda, kerak bo'lganda yuklaydi. <code>break</code> qilinsa, keyingi sahifalar umuman so'ralmaydi — bu tarmoq trafigini tejaydi." },
        { note: "Bu — <em>dangasa (lazy) yuklash</em>ning kuchli namunasi: ma'lumot faqat <code>for await..of</code> keyingi qiymat so'raganda yuklanadi. Foydalanuvchi 100 elementdan keyin to'xtasa, million elementli manba ham to'liq yuklanmaydi." },

        { h2: "Qachon asinxron iteratsiya kerak?" },
        { p: "Asinxron iteratsiyani qachon tanlash kerakligini aniq belgilaymiz:" },
        { ul: [
          "<strong>Ma'lumot asta-sekin keladi:</strong> tarmoq so'rovlari, fayllarni oqim (stream) sifatida o'qish, ma'lumotlar bazasidan katta natijalarni kursor orqali olish;",
          "<strong>Cheksiz yoki noma'lum uzunlikdagi oqim:</strong> real vaqt hodisalari, WebSocket xabarlari;",
          "<strong>Sahifalash:</strong> API'dan sahifama-sahifa yuklash (yuqoridagi misol);",
          "<strong>Resurslarni tejash:</strong> hamma ma'lumotni bir vaqtda xotiraga yuklash o'rniga, kerakli qismini dangasa olish."
        ] },
        { p: "Agar ma'lumotingiz allaqachon xotirada tayyor bo'lsa (oddiy massiv, string, <code>Map</code>) — asinxron iteratsiya <strong>kerak emas</strong>, oddiy <code>for..of</code> yetarli va tezroq." },
        { tip: "Qoidani sodda eslang: agar iteratsiyaning <em>har bir qadami</em> kutishni (<code>Promise</code>) talab qilsa — asinxron iteratsiya (<code>for await..of</code>, <code>async function*</code>) ishlating. Aks holda — oddiy iteratsiya." },

        { h2: "Muhim nozikliklar va tuzoqlar" },
        { ul: [
          "<code>for await..of</code> ni sinxron funksiya ichida ishlatib bo'lmaydi — faqat <code>async</code> funksiya ichida yoki top-level modulda;",
          "Spread <code>...</code> va oddiy <code>for..of</code> asinxron iterativ bilan <strong>ishlamaydi</strong> — ular sinxron <code>Symbol.iterator</code> ni kutadi;",
          "Asinxron generatorning <code>next()</code> i <code>Promise</code> qaytaradi — qo'lda chaqirsangiz <code>await</code> qiling;",
          "<code>Symbol.asyncIterator</code> va <code>Symbol.iterator</code> ni bir obyektga birga qo'yish mumkin — kontekstga qarab keraklisi tanlanadi."
        ] },
        { warn: "Katta xatolik: asinxron generator ichida <code>await</code> ishlatishni unutmang. Agar asinxronlik kerak bo'lmasa, umuman oddiy (sinxron) generator yozing — <code>async</code> ortiqcha yuk qo'shadi." },

        { h2: "Xulosa" },
        { ul: [
          "Asinxron iteratsiya ma'lumot <code>Promise</code> lar orqali asta-sekin kelganda ishlatiladi;",
          "Asinxron iterativ obyektda <code>Symbol.asyncIterator</code> metodi bo'ladi, uning <code>next()</code> i <code>Promise</code> qaytaradi;",
          "Bunday obyektlarni <code>for await..of</code> sikli bilan aylanamiz (faqat <code>async</code> funksiya ichida);",
          "<code>async function*</code> — asinxron generator; ichida <code>await</code> ishlatish mumkin;",
          "Asinxron generatorlar sahifalash, oqimlar, cheksiz asinxron ketma-ketliklar uchun ideal;",
          "Spread <code>...</code> va oddiy <code>for..of</code> asinxron iterativlar bilan ishlamaydi;",
          "Ma'lumot allaqachon xotirada bo'lsa — oddiy iteratsiya yetarli, asinxroni shart emas."
        ] }
      ]
    }
  ]
};
