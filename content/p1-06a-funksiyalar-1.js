"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Funksiyalar bilan chuqur ishlash",
  lessons: [
    {
      slug: "rekursiya",
      title: "Rekursiya va stek",
      blurb: "Rekursiya g'oyasi, asos va rekursiv holat, faktorial, daraja, Fibonachchi va ijro steki.",
      body: [
        { lead: "Rekursiya — bu masalani <em>o'ziga o'xshash, ammo soddaroq</em> qism-masalalarga bo'lib yechish uslubi. Bunda funksiya o'zini o'zi chaqiradi. Bu dasturlashning eng go'zal va kuchli g'oyalaridan biri." },

        { h2: "Rekursiya g'oyasi" },
        { p: "Funksiya boshqa funksiyani chaqirishi mumkin. Agar funksiya <strong>o'zini o'zi</strong> chaqirsa — bu <em>rekursiya</em> deb ataladi." },
        { p: "Rekursiyaning asosiy g'oyasi shunda: katta masalani biroz kichraytiramiz va o'sha kichik masalani <strong>o'sha funksiyaning o'zi</strong> orqali yechamiz. Bu jarayon masala shu qadar kichrayguncha davom etadiki, oxir-oqibat javob to'g'ridan-to'g'ri ma'lum bo'lib qoladi." },
        { p: "Demak, har qanday rekursiv funksiyada ikkita holat bo'ladi:" },
        { ul: [
          "<strong>Asos (baza) holati</strong> — masala shu qadar sodda bo'ladiki, javobni darhol qaytaramiz. Bu rekursiyani <em>to'xtatadigan</em> holat;",
          "<strong>Rekursiv holat</strong> — masalani kichraytirib, funksiyaning o'zini yana chaqiramiz."
        ] },
        { warn: "Agar asos holatini unutib qo'ysangiz yoki masala hech qachon kichraymasa, funksiya o'zini cheksiz chaqiraveradi va dastur xatolik bilan to'xtaydi (<code>RangeError: Maximum call stack size exceeded</code>)." },

        { h2: "Birinchi misol: daraja (pow)" },
        { p: "<code>x</code> sonini <code>n</code>-darajaga ko'taruvchi funksiya yozamiz, ya'ni <code>x</code>ni o'zini <code>n</code> marta ko'paytiramiz. Buni ikki xil ko'rish mumkin." },
        { p: "<strong>Iterativ (takroriy) yo'l</strong> — oddiy <code>for</code> sikli bilan:" },
        { pg: "function pow(x, n) {\n  let result = 1;\n  for (let i = 0; i < n; i++) {\n    result = result * x;\n  }\n  return result;\n}\n\nconsole.log(pow(2, 2));\nconsole.log(pow(2, 3));\nconsole.log(pow(2, 4));", file: "pow-iter.js" },
        { p: "<strong>Rekursiv yo'l</strong> — masalani soddalashtiramiz. E'tibor bering: <code>pow(x, n)</code> ni <code>x * pow(x, n-1)</code> shaklida yozish mumkin:" },
        { pg: "function pow(x, n) {\n  if (n == 1) {\n    return x;          // asos holati\n  } else {\n    return x * pow(x, n - 1);  // rekursiv holat\n  }\n}\n\nconsole.log(pow(2, 3));\n// pow(2, 3) = 2 * pow(2, 2)\n// pow(2, 2) = 2 * pow(2, 1)\n// pow(2, 1) = 2   (asos)\n// Natija: 2 * 2 * 2 = 8", file: "pow-rec.js" },
        { p: "<code>pow(2, 3)</code> chaqirilganda ijro quyidagicha \"pastga tushadi\" va so'ng \"yuqoriga qaytadi\":" },
        { ol: [
          "<code>pow(2, 3)</code> = 2 * <code>pow(2, 2)</code>",
          "<code>pow(2, 2)</code> = 2 * <code>pow(2, 1)</code>",
          "<code>pow(2, 1)</code> = 2 (asos holati, rekursiya to'xtaydi)",
          "Endi orqaga qaytamiz: 2 * 2 = 4, so'ng 2 * 4 = 8."
        ] },
        { note: "Rekursiv yechim ko'pincha <strong>qisqaroq va tushunarliroq</strong> bo'ladi. Iterativ yechim esa odatda <em>tezroq</em> va kamroq xotira sarflaydi. Har ikkisini bilish foydali." },

        { h2: "Ijro steki (execution stack)" },
        { p: "Har bir funksiya chaqirilganda, uning ichki ma'lumotlari — o'zgaruvchilari, argumentlari va hozir ijro qilinayotgan qatorning o'rni — maxsus ichki tuzilmada saqlanadi. Bu tuzilma <strong>ijro steki</strong> (execution context stack) deb ataladi." },
        { p: "Har bir chaqiruv uchun alohida <em>ijro konteksti</em> (execution context) yaratiladi va u stekning ustiga qo'yiladi. Funksiya boshqa funksiyani chaqirsa:" },
        { ol: [
          "Joriy funksiyaning ijrosi <em>pauza</em> qilinadi;",
          "Uning konteksti stekda saqlanib turadi;",
          "Yangi chaqiruv uchun yangi kontekst stek ustiga qo'yiladi;",
          "Yangi chaqiruv tugagach, uning konteksti stekdan olib tashlanadi va pauza qilingan kontekst davom etadi."
        ] },
        { p: "<code>pow(2, 3)</code> uchun stek eng chuqur nuqtada uchta kontekstni saqlaydi: <code>pow(2,3)</code>, <code>pow(2,2)</code> va <code>pow(2,1)</code>. Asos holatiga yetgach, ular birma-bir stekdan tozalanib boradi." },
        { warn: "Rekursiyaning chuqurligi (bir vaqtning o'zida stekdagi kontekstlar soni) cheklangan. JavaScript dvigatellari odatda o'n minglab chuqurlikni ko'taradi, undan ortiq bo'lsa xatolik chiqadi. Juda chuqur rekursiya kerak bo'lsa, uni sikl (iteratsiya)ga aylantirish afzal." },

        { h2: "Ikkinchi misol: faktorial" },
        { p: "Faktorial <code>n!</code> — 1 dan <code>n</code> gacha bo'lgan sonlarning ko'paytmasi: <code>n! = 1 * 2 * 3 * ... * n</code>. Uni rekursiv shaklda juda chiroyli yozish mumkin, chunki <code>n! = n * (n-1)!</code>:" },
        { pg: "function factorial(n) {\n  if (n == 0) {\n    return 1;   // 0! = 1, asos holati\n  }\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(0));\nconsole.log(factorial(1));\nconsole.log(factorial(5));\n// 5! = 5 * 4 * 3 * 2 * 1 = 120", file: "factorial.js" },
        { p: "Bu yerda asos holati <code>n == 0</code> bo'lib, <code>1</code> qaytaradi (matematikada <code>0! = 1</code>). Qolgan barcha holatlar rekursiv ravishda soddalashadi." },
        { tip: "Rekursiv funksiyani yozayotganda avval o'zingizdan so'rang: <strong>\"Qachon to'xtayman?\"</strong> (asos holati) va <strong>\"Masalani qanday kichraytiraman?\"</strong> (rekursiv holat). Shu ikki savolga javob topsangiz, funksiya deyarli tayyor." },

        { h2: "Uchinchi misol: Fibonachchi sonlari" },
        { p: "Fibonachchi ketma-ketligi 0 va 1 dan boshlanadi, keyingi har bir son avvalgi ikkitasining yig'indisiga teng: <code>0, 1, 1, 2, 3, 5, 8, 13, ...</code>. Ta'rifning o'zi rekursiv: <code>F(n) = F(n-1) + F(n-2)</code>." },
        { pg: "function fib(n) {\n  if (n <= 1) {\n    return n;   // fib(0)=0, fib(1)=1\n  }\n  return fib(n - 1) + fib(n - 2);\n}\n\nconsole.log(fib(0));\nconsole.log(fib(1));\nconsole.log(fib(7));\nconsole.log(fib(10));", file: "fib.js" },
        { warn: "Bu \"sof\" rekursiv Fibonachchi juda <strong>sekin</strong>: <code>fib(n)</code> bir xil qiymatlarni ko'p marta qayta hisoblaydi. Masalan <code>fib(35)</code> allaqachon sezilarli sekinlashadi. Amalda buni sikl yoki eslab qolish (memoization) bilan tezlashtiradilar. Ammo o'rganish uchun bu misol rekursiyaning tabiatini juda yaxshi ko'rsatadi." },
        { p: "Tezroq, iterativ variant esa oddiy siklda ishlaydi:" },
        { pg: "function fib(n) {\n  let a = 0;\n  let b = 1;\n  for (let i = 0; i < n; i++) {\n    let next = a + b;\n    a = b;\n    b = next;\n  }\n  return a;\n}\n\nconsole.log(fib(10));\nconsole.log(fib(35));", file: "fib-iter.js" },

        { h2: "Rekursiv ma'lumot tuzilmalari" },
        { p: "Rekursiya faqat funksiyalarga xos emas. Ba'zi <em>ma'lumot tuzilmalari</em> ham rekursiv tabiatga ega — ular o'z ichida o'ziga o'xshash qismlarni saqlaydi." },
        { ul: [
          "<strong>Bo'linmaydigan (nested) obyektlar</strong> — masalan kompaniya bo'limlari, ularning ichida yana ichki bo'limlar bor;",
          "<strong>Daraxt (tree)</strong> — HTML hujjatning DOM tuzilmasi, fayl tizimidagi papkalar;",
          "<strong>Bog'langan ro'yxat (linked list)</strong> — har bir element keyingi elementga ishora qiladi."
        ] },
        { p: "Bunday tuzilmalarni <em>rekursiv funksiya</em> bilan qayta ishlash juda tabiiy. Misol uchun, ichma-ich joylashgan bo'limlardagi umumiy maoshni sanaymiz:" },
        { pg: "let company = {\n  sales: [ { name: 'Ali', salary: 1000 }, { name: 'Vali', salary: 1600 } ],\n  development: {\n    frontend: [ { name: 'Petya', salary: 2000 } ],\n    backend:  [ { name: 'Anna', salary: 1800 } ]\n  }\n};\n\nfunction sumSalaries(dept) {\n  if (Array.isArray(dept)) {\n    // asos holati: xodimlar massivi\n    let sum = 0;\n    for (let person of dept) sum += person.salary;\n    return sum;\n  } else {\n    // rekursiv holat: ichki bo'limlar obyekti\n    let sum = 0;\n    for (let subdept of Object.values(dept)) {\n      sum += sumSalaries(subdept);\n    }\n    return sum;\n  }\n}\n\nconsole.log(sumSalaries(company));", file: "company.js" },
        { note: "E'tibor bering: funksiya massivga duch kelsa (asos holati) — to'g'ridan-to'g'ri yig'indini qaytaradi. Obyektga duch kelsa (rekursiv holat) — har bir ichki qismi uchun o'zini qayta chaqiradi. Tuzilma qanchalik chuqur bo'lsa ham, kod o'zgarmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Rekursiya</strong> — funksiyaning o'zini o'zi chaqirishi orqali masalani soddaroq qism-masalalarga bo'lib yechish;",
          "Har bir rekursiv funksiyada <strong>asos holati</strong> (to'xtash) va <strong>rekursiv holat</strong> (kichraytirish) bo'lishi shart;",
          "Har bir chaqiruv <strong>ijro steki</strong> da yangi kontekst yaratadi; chuqurlik cheklangan;",
          "Rekursiv yechim ko'pincha qisqa va tushunarli, iterativ yechim esa odatda tezroq;",
          "Daraxt, ichma-ich obyektlar kabi <strong>rekursiv tuzilmalar</strong> rekursiya bilan tabiiy qayta ishlanadi."
        ] }
      ]
    },

    {
      slug: "rest-spread",
      title: "Rest parametrlar va spread",
      blurb: "...rest parametrlar, eski arguments obyekti, ...spread bilan yoyish va nusxa olish.",
      body: [
        { lead: "Ko'p JavaScript funksiyalari <em>ixtiyoriy sondagi</em> argumentni qabul qila oladi — masalan <code>Math.max(1, 2, 3, 4)</code>. Bunday funksiyalarni yozish va massivlarni argumentlarga aylantirish uchun <strong>rest</strong> va <strong>spread</strong> sintaksisidan foydalanamiz. Ikkalasi ham uchta nuqta <code>...</code> bilan yoziladi." },

        { h2: "Rest parametrlar ...rest" },
        { p: "Funksiya e'lon qilinganidan ortiqcha argument bilan chaqirilsa, JavaScript xatolik bermaydi — ortiqcha argumentlarni oddiygina e'tiborsiz qoldiradi. Ammo biz ularning <em>hammasini</em> yig'ib olishimiz mumkin — buning uchun oxirgi parametr oldiga <code>...</code> qo'yamiz:" },
        { pg: "function sumAll(...numbers) {\n  // numbers — barcha argumentlardan iborat haqiqiy MASSIV\n  let sum = 0;\n  for (let n of numbers) sum += n;\n  return sum;\n}\n\nconsole.log(sumAll(1));\nconsole.log(sumAll(1, 2));\nconsole.log(sumAll(1, 2, 3, 4, 5));", file: "sum-all.js" },
        { p: "<code>...numbers</code> — bu \"qolgan barcha argumentlarni <code>numbers</code> nomli massivga yig'\" degani. So'zning o'zi ham shundan — <em>rest</em> inglizcha \"qolgani\" degan ma'noni bildiradi." },
        { p: "Rest parametrdan oldin oddiy parametrlar ham bo'lishi mumkin. Ular birinchi argumentlarni oladi, qolgani esa restga tushadi:" },
        { pg: "function showName(firstName, lastName, ...titles) {\n  console.log(firstName + ' ' + lastName);\n  // titles — qolgan barcha argumentlar massivi\n  console.log('Unvonlar:', titles.length);\n  console.log(titles[0]);\n  console.log(titles[1]);\n}\n\nshowName('Julius', 'Caesar', 'Konsul', 'Imperator');", file: "rest-names.js" },
        { warn: "Rest parametr <strong>doim oxirgi</strong> bo'lishi shart. <code>function f(arg1, ...rest, arg2)</code> — bu xatolik (<code>SyntaxError</code>), chunki restdan keyin boshqa parametr bo'lishi mumkin emas." },

        { h2: "Eski usul: \"arguments\" obyekti" },
        { p: "Eski JavaScript'da (rest parametrlar paydo bo'lishidan oldin) barcha argumentlarni olishning yagona yo'li maxsus <code>arguments</code> obyekti edi. U funksiya ichida avtomatik mavjud bo'ladi va indeks bo'yicha barcha argumentlarni saqlaydi:" },
        { pg: "function showArgs() {\n  console.log(arguments.length);\n  console.log(arguments[0]);\n  console.log(arguments[1]);\n}\n\nshowArgs('Salom', 'Dunyo');", file: "arguments.js" },
        { warn: "<code>arguments</code> — <strong>massivga o'xshaydi, lekin haqiqiy massiv emas</strong>. Unda <code>.map()</code>, <code>.filter()</code> kabi massiv metodlari yo'q. Shu sabab bugungi kunda deyarli har doim <strong>rest parametrlar</strong> afzal ko'riladi." },
        { note: "Yana bir muhim farq: <em>strelka funksiyalarida</em> (arrow functions) <code>arguments</code> obyekti umuman bo'lmaydi. Shu holatlarda ham rest parametrlar yagona to'g'ri yechim." },

        { h2: "Spread sintaksisi ...spread" },
        { p: "Rest parametr <em>argumentlarni massivga yig'ardi</em>. Spread esa buning aksi — u <strong>massiv (yoki boshqa iteratsiyalanuvchi)ni alohida elementlarga yoyadi</strong>." },
        { p: "Klassik masala: <code>Math.max</code> alohida sonlarni kutadi, massivni emas. Massivdagi eng katta sonni topish uchun spread yordam beradi:" },
        { pg: "let arr = [3, 5, 1, 9, 2];\n\n// Math.max(arr) ishlamaydi — u massivni tushunmaydi\n// spread massivni alohida argumentlarga yoyadi:\nconsole.log(Math.max(...arr));\n// bu aslida Math.max(3, 5, 1, 9, 2) ga aylanadi\n\nconsole.log(Math.min(...arr));", file: "spread-max.js" },
        { p: "Bir necha massivni yoki oddiy qiymatlarni birlashtirib ham chaqirish mumkin:" },
        { pg: "let arr1 = [1, -2, 3];\nlet arr2 = [8, 3, -8, 1];\n\nconsole.log(Math.max(...arr1, ...arr2, 25));\n// 1, -2, 3, 8, 3, -8, 1 va 25 orasidan eng kattasi", file: "spread-multi.js" },

        { h2: "Spread bilan massivlarni yoyish va birlashtirish" },
        { p: "Spreadni yangi massiv literali ichida ham ishlatish mumkin — u massivni to'g'ridan-to'g'ri boshqa massivga \"quyib\" beradi:" },
        { pg: "let birinchi = [1, 2, 3];\nlet ikkinchi = [4, 5];\n\nlet birlashgan = [0, ...birinchi, ...ikkinchi, 6];\nconsole.log(birlashgan);\n// [0, 1, 2, 3, 4, 5, 6]", file: "spread-merge.js" },
        { p: "Spread har qanday <em>iteratsiyalanuvchi</em> (iterable) bilan ishlaydi — jumladan satr (string) bilan ham. Satrni belgilar massiviga aylantirish oson:" },
        { pg: "let str = 'Salom';\n\nlet chars = [...str];\nconsole.log(chars);\n// ['S', 'a', 'l', 'o', 'm']", file: "spread-string.js" },

        { h2: "Spread bilan nusxa olish" },
        { p: "Spread massiv va obyektning <strong>sayoz nusxasini</strong> (shallow copy) olishning eng qulay usuli. Bu yerda muhim jihat bor — massivni oddiygina boshqa o'zgaruvchiga tenglash <em>nusxa yaratmaydi</em>, faqat bir xil massivga ikkita nom beradi:" },
        { pg: "let arr = [1, 2, 3];\n\nlet copy = [...arr];   // yangi, mustaqil massiv\n\ncopy.push(4);\nconsole.log(arr);   // [1, 2, 3] — o'zgarmadi\nconsole.log(copy);  // [1, 2, 3, 4]", file: "spread-copy.js" },
        { p: "Xuddi shu usul obyektlar uchun ham ishlaydi:" },
        { pg: "let user = { name: 'Ali', age: 25 };\n\nlet clone = { ...user };\nclone.age = 30;\n\nconsole.log(user.age);   // 25 — asl obyekt o'zgarmadi\nconsole.log(clone.age);  // 30", file: "spread-obj-copy.js" },
        { note: "Bu <strong>sayoz</strong> (shallow) nusxa: agar obyekt ichida yana obyekt yoki massiv bo'lsa, ular nusxalanmaydi — ikkala tomon bitta ichki obyektga ishora qiladi. Chuqur nusxa uchun boshqa usullar kerak (masalan <code>structuredClone</code>)." },
        { tip: "Qoidani eslab qoling: <strong>rest</strong> — funksiya <em>parametrlarida</em> (argumentlarni yig'adi), <strong>spread</strong> — funksiya <em>chaqiruvida</em> yoki massiv/obyekt literalida (yoyadi). Sintaksis bir xil <code>...</code> bo'lsa-da, ular teskari ishlarni bajaradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Rest parametr</strong> <code>...name</code> — funksiya e'lonida qolgan barcha argumentlarni <em>haqiqiy massiv</em>ga yig'adi; doim oxirgi bo'ladi;",
          "Eski <code>arguments</code> obyekti ham argumentlarni beradi, lekin u massiv emas va strelka funksiyalarda yo'q — hozir rest afzal;",
          "<strong>Spread</strong> <code>...arr</code> — iteratsiyalanuvchini alohida elementlarga yoyadi (masalan <code>Math.max(...arr)</code>);",
          "Spread massiv/obyektlarni birlashtirish va <strong>nusxa olish</strong> uchun juda qulay (sayoz nusxa)."
        ] }
      ]
    },

    {
      slug: "closure",
      title: "O'zgaruvchi ko'lami, closure",
      blurb: "Blok ko'lami (let/const), leksik muhit, closure va hisoblagich (counter) misoli.",
      body: [
        { lead: "JavaScript funksiyalar tili sanaladi. Bu unga katta moslashuvchanlik beradi: funksiyalarni yaratish, o'zgaruvchiga berish, boshqa funksiyaga uzatish va keyinroq chaqirish mumkin. Buni tushunish uchun <strong>o'zgaruvchi ko'lami</strong> va <strong>closure</strong> tushunchalarini o'rganamiz." },

        { h2: "Blok ko'lami (block scope)" },
        { p: "<code>let</code> va <code>const</code> orqali e'lon qilingan o'zgaruvchi faqat o'zi joylashgan <strong>blok</strong> ichida (figurali qavslar <code>{ }</code> orasida) ko'rinadi. Blokdan tashqarida u mavjud emas:" },
        { pg: "{\n  let message = 'Salom';\n  console.log(message);  // ishlaydi\n}\n\n// bu yerda message allaqachon mavjud emas\n// console.log(message) — bo'lsa xatolik bo'lardi\nconsole.log('Blokdan tashqaridamiz');", file: "block-scope.js" },
        { p: "Xuddi shunday, <code>if</code>, <code>for</code>, <code>while</code> bloklari ham o'z ko'lamiga ega. <code>for</code> siklidagi hisoblagich <code>i</code> faqat sikl ichida yashaydi:" },
        { pg: "for (let i = 0; i < 3; i++) {\n  console.log('Sikl ichida i =', i);\n}\n\n// bu yerda i mavjud emas\nconsole.log('Sikl tugadi');", file: "for-scope.js" },
        { note: "Blok ko'lami — kodni xavfsizroq qiladi. O'zgaruvchi faqat kerak bo'lgan joyda yashaydi va tasodifan boshqa joyni buzib qo'ymaydi." },

        { h2: "Ichki funksiyalar va tashqi o'zgaruvchilar" },
        { p: "Funksiya ichida boshqa funksiya (ichki, nested funksiya) e'lon qilinishi mumkin. Eng muhimi — <strong>ichki funksiya tashqi funksiyaning o'zgaruvchilariga kira oladi</strong>:" },
        { pg: "function sayHiTo(name) {\n  let phrase = 'Salom, ' + name;\n\n  function display() {\n    // ichki funksiya tashqi 'phrase' ni ko'radi\n    console.log(phrase);\n  }\n\n  display();\n}\n\nsayHiTo('Dilnoza');", file: "nested-fn.js" },
        { p: "Ichki funksiya tashqi o'zgaruvchini nafaqat o'qishi, balki o'zgartirishi ham mumkin. Bu oddiy ko'rinsa-da, closure'ning asosini tashkil etadi." },

        { h2: "Leksik muhit (lexical environment) — soddalashtirib" },
        { p: "JavaScript ichkarida o'zgaruvchilarni qanday izlaydi? Buni tushunish uchun <em>leksik muhit</em> tushunchasi kerak. Uni soddalashtirib shunday tasavvur qiling:" },
        { ul: [
          "Har bir ishlayotgan blok, funksiya va butun skript uchun ichkarida maxsus <strong>Leksik Muhit</strong> obyekti bor;",
          "Bu obyektda o'sha joydagi barcha lokal o'zgaruvchilar saqlanadi;",
          "Har bir muhit o'zining <strong>tashqi (ota) muhiti</strong>ga ishora qiladi."
        ] },
        { p: "O'zgaruvchi ishlatilganda, JavaScript uni <strong>avval joriy muhitdan</strong> qidiradi. Topmasa — tashqi muhitga chiqadi, u yerdan ham topmasa yana tashqariga... shu tariqa eng tashqi (global) muhitga qadar. Bu \"tashqariga qarab qidirish\" zanjiri closure'ning kalitidir." },
        { note: "Muhim tafsilot: o'zgaruvchining qaysi tashqi muhitga bog'lanishi funksiya <strong>qayerda YOZILGANI</strong> bilan aniqlanadi (\"leksik\" so'zi shundan), qayerda chaqirilgani bilan emas. Ya'ni bog'lanish kod matnida qanday joylashganiga qarab, oldindan belgilanadi." },

        { h2: "Closure nima?" },
        { p: "<strong>Closure (yopilma)</strong> — bu tashqi o'zgaruvchilarni <em>eslab qoladigan</em> va ularga kira oladigan funksiya. JavaScript'da <strong>deyarli barcha funksiyalar closure hisoblanadi</strong> — ular yaratilgan joydagi tashqi o'zgaruvchilarni \"eslab qoladi\"." },
        { p: "Sehr shundaki: tashqi funksiya ishlab bo'lgach ham, uning o'zgaruvchilari <strong>yo'qolmaydi</strong> — agar ularga ichki funksiya hali ham ishora qilib turgan bo'lsa. Quyidagi misolda buni ko'ramiz:" },
        { pg: "function makeGreeter(name) {\n  // 'name' — tashqi o'zgaruvchi\n  return function() {\n    console.log('Salom, ' + name);\n  };\n}\n\nlet greetAli = makeGreeter('Ali');\nlet greetVali = makeGreeter('Vali');\n\ngreetAli();   // makeGreeter allaqachon tugagan, lekin 'name' esda\ngreetVali();  // har bir funksiya O'Z 'name' ini eslaydi", file: "closure-basic.js" },
        { p: "<code>makeGreeter('Ali')</code> chaqiruvi tugagan bo'lsa ham, qaytarilgan funksiya o'zining <code>name = 'Ali'</code> qiymatini eslab turadi. <code>greetAli</code> va <code>greetVali</code> — bir-biridan mustaqil, chunki har biri o'z leksik muhitini saqlaydi." },

        { h2: "Hisoblagich (counter) misoli" },
        { p: "Closure'ning eng klassik va foydali misoli — <strong>hisoblagich</strong>. Har chaqirilganda keyingi sonni qaytaruvchi funksiya yasaymiz. Hisob <code>count</code> tashqarida yashiringan, unga faqat qaytarilgan funksiya orqali kirish mumkin:" },
        { pg: "function makeCounter() {\n  let count = 0;   // yashirin, tashqaridan ko'rinmaydi\n\n  return function() {\n    count = count + 1;\n    return count;\n  };\n}\n\nlet counter = makeCounter();\n\nconsole.log(counter());  // 1\nconsole.log(counter());  // 2\nconsole.log(counter());  // 3", file: "counter.js" },
        { p: "Har chaqiruvda <code>count</code> qiymati saqlanib, ortib boradi. Bu shuni ko'rsatadiki, <code>count</code> o'zgaruvchisi <em>bitta va o'sha</em> — funksiya uni haqiqatan eslab turibdi, har safar noldan boshlamaydi." },
        { p: "Har bir <code>makeCounter()</code> chaqiruvi esa <strong>butunlay yangi, mustaqil</strong> hisoblagich yaratadi:" },
        { pg: "function makeCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nlet counter1 = makeCounter();\nlet counter2 = makeCounter();\n\nconsole.log(counter1());  // 1\nconsole.log(counter1());  // 2\nconsole.log(counter2());  // 1 — mustaqil, o'z hisobi bor\nconsole.log(counter1());  // 3", file: "two-counters.js" },

        { h2: "Amaliy foyda" },
        { p: "Closure nazariya emas — u har kuni ishlatiladigan amaliy vosita:" },
        { ul: [
          "<strong>Ma'lumotni yashirish</strong> — <code>count</code> kabi o'zgaruvchini tashqi dunyodan berkitib, faqat ma'lum funksiyalar orqali boshqarish (inkapsulyatsiya);",
          "<strong>Holatni saqlash</strong> — hisoblagichlar, ID generatorlari, keshlash;",
          "<strong>Callback va hodisa ishlovchilari</strong> — tugma bosilganda ishlaydigan funksiya o'zi yaratilgan paytdagi ma'lumotni eslaydi;",
          "<strong>Funksiya fabrikalari</strong> — <code>makeGreeter</code> kabi, sozlangan yangi funksiyalar yasash."
        ] },
        { p: "Sozlanadigan funksiya fabrikasi misoli — berilgan koeffitsientga ko'paytiruvchi funksiyalar yasaymiz:" },
        { pg: "function multiplier(factor) {\n  return function(x) {\n    return x * factor;\n  };\n}\n\nlet double = multiplier(2);\nlet triple = multiplier(3);\n\nconsole.log(double(5));   // 10\nconsole.log(triple(5));   // 15\nconsole.log(double(100)); // 200", file: "multiplier.js" },
        { tip: "Agar funksiya boshqa funksiyani qaytarsa yoki argument sifatida qabul qilsa — ehtimol siz closure ishlatayotgansiz. Bu JavaScript'ning eng kuchli xususiyatlaridan biri, uni yaxshi tushunish katta ustunlik beradi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>let</code>/<code>const</code> o'zgaruvchilari <strong>blok ko'lami</strong>ga ega — faqat <code>{ }</code> ichida yashaydi;",
          "Ichki funksiya <strong>tashqi funksiyaning o'zgaruvchilari</strong>ga kira oladi;",
          "O'zgaruvchi qidiruvi ichkaridan tashqariga <strong>leksik muhit</strong> zanjiri bo'ylab boradi; bog'lanish kod yozilgan joyga qarab aniqlanadi;",
          "<strong>Closure</strong> — tashqi o'zgaruvchilarni eslab qoladigan funksiya; tashqi funksiya tugasa ham ular saqlanadi;",
          "Closure ma'lumotni yashirish, holatni saqlash va funksiya fabrikalari uchun ishlatiladi (masalan <strong>hisoblagich</strong>)."
        ] }
      ]
    },

    {
      slug: "eski-var",
      title: "Eski \"var\"",
      blurb: "var ning o'ziga xosligi, blok ko'lami yo'qligi, hoisting va nega let/const afzal.",
      body: [
        { lead: "Eng dastlabki JavaScript'da o'zgaruvchilar faqat <code>var</code> orqali e'lon qilinardi. Bugun uni deyarli ishlatmaymiz, ammo eski kodlarda tez-tez uchraydi va u <code>let</code>/<code>const</code>dan jiddiy farq qiladi. Uni tushunish kutilmagan xatolardan asraydi." },

        { h2: "var qanday ishlaydi?" },
        { p: "Birinchi qarashda <code>var</code> ham <code>let</code> kabi ko'rinadi — o'zgaruvchi e'lon qiladi:" },
        { pg: "var message = 'Salom';\nconsole.log(message);\n\nvar age = 25;\nconsole.log(age);", file: "var-basic.js" },
        { p: "Ammo ichkaridan u boshqacha xatti-harakat qiladi. Uch asosiy farqni ko'ramiz." },

        { h2: "1-farq: var da blok ko'lami YO'Q" },
        { p: "<code>let</code>/<code>const</code>dan farqli o'laroq, <code>var</code> o'zgaruvchisi bloklarni (agar blok funksiya bo'lmasa) <strong>e'tiborsiz qoldiradi</strong>. U blok ichida e'lon qilinsa ham, blokdan tashqarida ham ko'rinadi:" },
        { pg: "if (true) {\n  var test = 'men var man';\n}\n\n// test blokdan tashqarida ham MAVJUD:\nconsole.log(test);  // 'men var man'", file: "var-no-block.js" },
        { p: "Agar <code>var</code> o'rniga <code>let</code> ishlatilganda edi, tashqaridagi <code>console.log(test)</code> xatolik berardi. Xuddi shu narsa <code>for</code> siklida ham sodir bo'ladi:" },
        { pg: "for (var i = 0; i < 3; i++) {\n  // ...\n}\n\n// i sikldan keyin ham yashaydi:\nconsole.log('Sikldan keyin i =', i);  // 3", file: "var-for.js" },
        { warn: "<code>var</code> ning ko'lami faqat <strong>funksiya</strong> yoki <strong>butun skript</strong> darajasida bo'ladi. Oddiy <code>{ }</code> bloklar, <code>if</code>, <code>for</code> uni cheklamaydi. Bu ko'pincha kutilmagan xatolarga olib keladi." },
        { p: "Funksiya ichida esa <code>var</code> tashqariga chiqmaydi — bu yerda u odatdagidek cheklanadi:" },
        { pg: "function sayHi() {\n  var phrase = 'Salom';\n  console.log(phrase);\n}\n\nsayHi();\n// bu yerda phrase mavjud emas — funksiya ichida qoldi\nconsole.log('Funksiyadan tashqaridamiz');", file: "var-function.js" },

        { h2: "2-farq: hoisting (yuqoriga ko'tarilish)" },
        { p: "<code>var</code> e'lonlari funksiya (yoki skript) boshiga <strong>\"ko'tariladi\"</strong> — bu <em>hoisting</em> deb ataladi. Ya'ni o'zgaruvchini e'lon qilishdan <em>oldin</em> ishlatsangiz ham xatolik bo'lmaydi — u <code>undefined</code> bo'ladi:" },
        { pg: "function test() {\n  console.log(phrase);  // undefined (xatolik EMAS!)\n  var phrase = 'Salom';\n  console.log(phrase);  // 'Salom'\n}\n\ntest();", file: "var-hoisting.js" },
        { p: "Nima sodir bo'ldi? JavaScript kodni shunday \"o'qiydi\": <code>var phrase</code> <em>e'loni</em> funksiya boshiga ko'tariladi, ammo <strong>qiymat berish</strong> (<code>= 'Salom'</code>) o'z joyida qoladi. Shuning uchun birinchi <code>console.log</code> da o'zgaruvchi bor, lekin hali qiymatsiz — <code>undefined</code>." },
        { note: "Diqqat: <strong>faqat e'lon ko'tariladi, qiymat berish emas</strong>. Buni shunday tasavvur qiling: kod ichkarida <code>var phrase;</code> (yuqorida) va <code>phrase = 'Salom';</code> (o'z joyida) ga bo'linadi." },
        { p: "<code>let</code> bilan esa bunday bo'lmaydi — e'londan oldin ishlatish xatolik beradi (\"temporal dead zone\"). Bu aslida <strong>yaxshi</strong> — xatoni yashirmasdan darhol ko'rsatadi." },

        { h2: "3-farq: qayta e'lon qilishga ruxsat" },
        { p: "Bir xil <code>var</code> o'zgaruvchisini bir necha marta qayta e'lon qilsa bo'ladi — hech qanday xatolik chiqmaydi (bu ham xatolarni yashiradi):" },
        { pg: "var user = 'Ali';\nvar user = 'Vali';   // xatolik yo'q, oddiy qayta yozish\n\nconsole.log(user);   // 'Vali'", file: "var-redeclare.js" },
        { p: "<code>let</code> bilan bir xil o'zgaruvchini ikki marta e'lon qilish <code>SyntaxError</code> beradi — bu tasodifiy nom to'qnashuvidan asraydi." },

        { h2: "Nega hozir let/const afzal?" },
        { p: "Yuqoridagi \"o'ziga xosliklar\" aslida <code>var</code> ning <em>kamchiliklari</em>. Ular kodni tushunishni qiyinlashtiradi va yashirin xatolarga sabab bo'ladi. <code>let</code> va <code>const</code> ularni to'g'irlaydi:" },
        { ul: [
          "<strong>Blok ko'lami</strong> — o'zgaruvchi faqat kerak bo'lgan joyda yashaydi, tasodifan tarqalib ketmaydi;",
          "<strong>E'londan oldin ishlatib bo'lmaydi</strong> — xatoni yashirmasdan darhol ko'rsatadi;",
          "<strong>Qayta e'lon qilib bo'lmaydi</strong> — nom to'qnashuvi darhol aniqlanadi;",
          "<strong>const</strong> qiymat o'zgarmasligini kafolatlaydi — kod niyati aniqroq bo'ladi."
        ] },
        { tip: "Amaliy tavsiya: <strong>doim <code>const</code>dan boshlang</strong>. Agar qiymat keyin o'zgarishi kerak bo'lsa — <code>let</code>ga o'ting. <code>var</code> ni esa yangi kodda umuman ishlatmaslik ma'qul." },
        { warn: "Eski loyihalar va kutubxonalarda <code>var</code> hali ham ko'p uchraydi. Uni o'chirib tashlash shart emas, ammo uning xatti-harakatini <strong>bilishingiz</strong> kerak — aks holda \"nega bu o'zgaruvchi bu yerda ham bor?\" degan chalkashlikka tushishingiz mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "<code>var</code> — o'zgaruvchi e'lon qilishning eski usuli, hozir kamdan-kam ishlatiladi;",
          "Uning <strong>blok ko'lami yo'q</strong> — faqat funksiya yoki skript darajasida cheklanadi;",
          "<strong>Hoisting</strong> tufayli e'londan oldin ishlatilsa <code>undefined</code> bo'ladi (xatolik bermaydi);",
          "Uni <strong>qayta e'lon qilsa</strong> bo'ladi — bu xatolarni yashiradi;",
          "Yangi kodda <strong>const</strong> va <strong>let</strong> ishlatilishi kerak — ular xavfsizroq va tushunarliroq."
        ] }
      ]
    },

    {
      slug: "global-obyekt",
      title: "Global obyekt",
      blurb: "globalThis, window/global, global funksiyalar va nega global o'zgaruvchidan qochish kerak.",
      body: [
        { lead: "Global obyekt — tilning butun dastur bo'ylab mavjud bo'lgan o'zgaruvchi va funksiyalarni saqlaydigan maxsus obyekt. U tarixiy sabablarga ko'ra turli muhitlarda turlicha nomlanadi, endi esa yagona standart nom bor: <code>globalThis</code>." },

        { h2: "Global obyekt nima?" },
        { p: "Global obyekt tilning eng \"tashqi\" muhitini ifodalaydi. Unda beriladigan xususiyatlar dasturning istalgan joyidan ko'rinadi. Uning nomi muhitga bog'liq:" },
        { ul: [
          "Brauzerda — <code>window</code>;",
          "Node.js'da — <code>global</code>;",
          "Boshqa muhitlarda — yana boshqacha bo'lishi mumkin."
        ] },
        { p: "Bu farqlar kodni bir muhitdan ikkinchisiga ko'chirishni qiyinlashtirardi. Shu sabab standart yagona nom kiritildi." },

        { h2: "globalThis — yagona standart nom" },
        { p: "<strong><code>globalThis</code></strong> — global obyektga murojaat qilishning zamonaviy, standart usuli. U <em>barcha muhitlarda</em> ishlaydi: brauzer, Node.js va boshqalarda. Endi muhitni tekshirib o'tirish shart emas:" },
        { pg: "// Bu Node.js va brauzerda bir xil ishlaydi:\nconsole.log(typeof globalThis);   // 'object'\n\n// globalThis ga xususiyat qo'shsak — u global bo'ladi\nglobalThis.myAppName = 'Mening ilovam';\nconsole.log(globalThis.myAppName);", file: "globalthis.js" },
        { note: "Ilgari kod har bir muhit uchun alohida <code>window</code> yoki <code>global</code> ni tekshirishga majbur edi. <code>globalThis</code> bu muammoni butunlay hal qildi — yangi kodda faqat shu nomni ishlating." },
        { tip: "Node.js muhitida <code>globalThis</code> aynan <code>global</code> ga, brauzerda esa <code>window</code> ga teng. Ya'ni <code>globalThis === global</code> (Node.js'da) rost qaytaradi." },

        { h2: "Global funksiya va o'zgaruvchilar" },
        { p: "Ba'zi funksiyalar til tomonidan har joyda tayyor beriladi — ular ham amalda global obyekt orqali mavjud. Masalan <code>parseInt</code>, <code>setTimeout</code>, <code>isNaN</code> va boshqalar:" },
        { pg: "console.log(parseInt('42 soat'));   // 42\nconsole.log(isNaN('salom'));        // true\nconsole.log(Math.round(3.7));       // 4\n\n// Bular hamma joyda tayyor — global funksiyalar\nconsole.log(Number.isInteger(10));  // true", file: "global-funcs.js" },
        { warn: "Muhim tafsilot: brauzerda <code>var</code> orqali eng tashqi (skript) darajasida e'lon qilingan o'zgaruvchi <code>window</code> obyektiga xususiyat sifatida qo'shilib qolardi. <code>let</code>/<code>const</code> esa bunday qilmaydi. Bu ham <code>let</code>/<code>const</code> afzalligining yana bir sababi." },

        { h2: "Global obyektdan qanday to'g'ri foydalanish" },
        { p: "Odatda global obyektga qo'lda qiymat qo'shish <strong>tavsiya etilmaydi</strong>. Ammo ba'zan haqiqatan kerak bo'ladi — masalan, butun ilova uchun bitta muhim sozlama yoki o'zgaruvchi kerak bo'lganda. Bunday holda uni ochiq-oydin <code>globalThis</code> orqali qo'shish tavsiya etiladi:" },
        { pg: "// Butun ilova uchun bitta sozlama:\nglobalThis.appConfig = {\n  version: '1.0',\n  debug: false\n};\n\n// Endi istalgan joydan o'qish mumkin:\nfunction showVersion() {\n  console.log('Versiya:', globalThis.appConfig.version);\n}\n\nshowVersion();", file: "global-config.js" },
        { note: "Bunday holatlar juda kam bo'lishi kerak. Ko'p hollarda ma'lumotni funksiyalarga <em>argument</em> sifatida uzatish yoki modullar orqali ulashish ancha toza yechim." },

        { h2: "Nega global o'zgaruvchidan qochish kerak?" },
        { p: "Global o'zgaruvchilar qulay ko'rinadi — ular har joyda mavjud. Lekin aynan shu \"har joyda mavjudlik\" jiddiy muammolar tug'diradi:" },
        { ul: [
          "<strong>Nom to'qnashuvi</strong> — ikki turli qism bir xil global nomni ishlatib, bir-birining qiymatini bilmasdan buzib qo'yishi mumkin;",
          "<strong>Yashirin bog'liqlik</strong> — funksiya global o'zgaruvchiga bog'lansa, uni tushunish qiyinlashadi: kirish argumentlaridan uning nimaga bog'liqligi ko'rinmaydi;",
          "<strong>Test qilish qiyinlashadi</strong> — global holatga bog'liq kodni alohida sinash mushkul;",
          "<strong>Kuzatib bo'lmaydigan o'zgarishlar</strong> — dasturning istalgan joyi global qiymatni o'zgartirishi mumkin, xatoni topish qiyinlashadi."
        ] },
        { p: "To'g'ri yondashuv — ma'lumotni <strong>argument orqali uzatish</strong> va <strong>funksiya qiymatini qaytarish</strong>. Solishtiring:" },
        { pg: "// YOMON: global o'zgaruvchiga tayanish\nglobalThis.total = 0;\nfunction addBad(x) {\n  globalThis.total += x;  // yashirin ta'sir\n}\naddBad(5);\naddBad(3);\nconsole.log(globalThis.total);  // 8, lekin qaydan kelgani noaniq\n\n// YAXSHI: argument va return orqali\nfunction addGood(total, x) {\n  return total + x;\n}\nlet sum = 0;\nsum = addGood(sum, 5);\nsum = addGood(sum, 3);\nconsole.log(sum);  // 8, oqim aniq va tushunarli", file: "global-vs-args.js" },
        { tip: "Umumiy qoida: <strong>o'zgaruvchini imkon qadar tor ko'lamda saqlang</strong>. Faqat funksiya ichida kerak bo'lsa — lokal qiling; bir necha funksiya ulashsa — modulda; global esa deyarli hech qachon. Bu kodni ishonchli va tushunarli qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Global obyekt</strong> — butun dastur bo'ylab mavjud o'zgaruvchi va funksiyalarni saqlaydi;",
          "Uning nomi muhitga bog'liq: brauzerda <code>window</code>, Node.js'da <code>global</code>;",
          "<strong><code>globalThis</code></strong> — barcha muhitlarda ishlaydigan yagona standart nom, yangi kodda shuni ishlating;",
          "<code>parseInt</code>, <code>setTimeout</code> kabi global funksiyalar hamma joyda tayyor;",
          "<strong>Global o'zgaruvchidan qoching</strong> — ma'lumotni argument va return orqali uzatish ancha xavfsiz va tushunarli."
        ] }
      ]
    }
  ]
};
