"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Promise, async/await",
  lessons: [
    {
      slug: "promise-api",
      title: "Promise API",
      blurb: "Promise klassining statik metodlari: all, allSettled, race, any, resolve va reject.",
      body: [
        { lead: "<code>Promise</code> klassida bir nechta foydali <em>statik</em> metod bor. Ular bir nechta promise'ni birga boshqarishga yordam beradi. Ushbu darsda ularning har birini misol bilan ko'rib chiqamiz." },

        { h2: "Promise.all" },
        { p: "Ko'pincha bir nechta promise'ni <strong>parallel</strong> ishga tushirib, hammasi tugashini kutish kerak bo'ladi. Masalan, bir nechta URL'dan ma'lumot yuklab, hammasi kelgach ishlov berish. Aynan shu uchun <code>Promise.all</code> mavjud." },
        { p: "<code>Promise.all</code> promise'lar (yoki iteratsiyalanadigan obyekt, odatda massiv) qabul qiladi va yangi promise qaytaradi. Bu yangi promise barcha berilgan promise'lar bajarilganda (fulfilled) <strong>natijalar massivi</strong> bilan tugaydi." },
        { code: "Promise.all([\n  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1\n  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2\n  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3\n]).then(alertResult => console.log(alertResult)); // [1, 2, 3]" },
        { note: "Natijalar massivining tartibi <strong>berilgan promise'lar tartibiga mos keladi</strong>. Ya'ni birinchi promise eng sekin tugagan bo'lsa ham, uning natijasi massivning birinchi elementi bo'ladi. Natija tayyor bo'lishini kutish tartibi muhim emas." },
        { p: "Ko'p qo'llaniladigan hiyla — massivdagi ma'lumotlarni promise'lar massiviga aylantirib, keyin ularni <code>Promise.all</code>'ga o'rash:" },
        { code: "let urls = [\n  'https://api.github.com/users/iliakan',\n  'https://api.github.com/users/remy',\n  'https://api.github.com/users/jeresig'\n];\n\n// har bir url uchun fetch promise'ini yaratamiz\nlet requests = urls.map(url => fetch(url));\n\n// Promise.all barcha so'rovlar tugashini kutadi\nPromise.all(requests)\n  .then(responses => {\n    for (let response of responses) {\n      console.log(response.status); // har bir javob statusi\n    }\n  });" },
        { warn: "Agar <strong>istalgan bitta</strong> promise reject bo'lsa (xatoga uchrasa), <code>Promise.all</code> darhol <strong>o'sha xato</strong> bilan reject bo'ladi. Qolgan promise'lar natijasi mutlaqo e'tiborga olinmaydi — ular bekor qilinmaydi, lekin natijasi tashlab yuboriladi." },
        { code: "Promise.all([\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Xatolik!')), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).catch(console.log); // Error: Xatolik!" },
        { p: "Yuqoridagi misolda ikkinchi promise 2 soniyadan keyin reject bo'ladi. Shu zahoti <code>Promise.all</code> ham reject bo'ladi va <code>catch</code> ishga tushadi. Uchinchi promise (3 soniya) hali tugamagan bo'lsa ham, uning natijasi hech qayerda ko'rinmaydi." },

        { h2: "Promise.allSettled" },
        { p: "<code>Promise.all</code> birinchi xatoda to'xtaydi. Ba'zan esa bizga <strong>har bir</strong> promise natijasi kerak — qaysi biri muvaffaqiyatli, qaysi biri xato bo'lganidan qat'i nazar. Aynan shunda <code>Promise.allSettled</code> ishlatiladi." },
        { p: "<code>Promise.allSettled</code> barcha promise'lar <em>settled</em> (yakunlangan — fulfilled yoki rejected) bo'lishini kutadi va hech qachon reject bo'lmaydi. U natijalar massivini qaytaradi, unda har bir element quyidagicha:" },
        { ul: [
          "<code>{status: \"fulfilled\", value: natija}</code> — muvaffaqiyatli tugagan bo'lsa;",
          "<code>{status: \"rejected\", reason: xato}</code> — xatoga uchragan bo'lsa."
        ] },
        { code: "let urls = [\n  'https://api.github.com/users/iliakan',\n  'https://api.github.com/users/remy',\n  'https://no-such-url'\n];\n\nPromise.allSettled(urls.map(url => fetch(url)))\n  .then(results => {\n    results.forEach((result, num) => {\n      if (result.status == 'fulfilled') {\n        console.log('Javob ' + urls[num] + ': ' + result.value.status);\n      }\n      if (result.status == 'rejected') {\n        console.log('Xato ' + urls[num] + ': ' + result.reason);\n      }\n    });\n  });" },
        { p: "Yuqorida <code>results</code> quyidagicha bo'ladi (soddalashtirilgan):" },
        { code: "[\n  {status: 'fulfilled', value: ...birinchi javob...},\n  {status: 'fulfilled', value: ...ikkinchi javob...},\n  {status: 'rejected', reason: ...xato obyekti...}\n]" },
        { tip: "Ya'ni har bir promise uchun status va uning qiymati (yoki xato sababi) mavjud. Bu bir nechta so'rovdan bir qismi muvaffaqiyatsiz bo'lsa ham, qolganlarini qayta ishlashga imkon beradi." },

        { h2: "Promise.race" },
        { p: "<code>Promise.race</code> <code>Promise.all</code>ga o'xshaydi, lekin faqat <strong>birinchi yakunlangan</strong> promise'ni kutadi. \"Race\" — poyga degani: qaysi promise birinchi tugasa (fulfilled yoki rejected — farqi yo'q), uning natijasi/xatosi butun natija bo'ladi." },
        { code: "Promise.race([\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Xatolik!')), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).then(console.log); // 1" },
        { p: "Bu yerda birinchi promise eng tez (1 soniya) tugadi, shuning uchun natija <code>1</code> bo'ldi. Undan keyingi promise'lar natijasi butunlay e'tiborga olinmaydi." },
        { note: "<code>Promise.race</code> birinchi yakunlangan promise reject bo'lsa, o'zi ham reject bo'ladi. Ya'ni g'olib promise xato bilan tugasa, natija ham xato bo'ladi." },

        { h2: "Promise.any" },
        { p: "<code>Promise.any</code> <code>Promise.race</code>ga o'xshaydi, lekin faqat birinchi <strong>muvaffaqiyatli</strong> (fulfilled) promise'ni kutadi. Ya'ni u xatolarni \"tashlab\", birinchi muvaffaqiyatli natijani qaytaradi." },
        { code: "Promise.any([\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Xatolik!')), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),\n  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))\n]).then(console.log); // 1" },
        { p: "Bu yerda birinchi promise (1 soniya) reject bo'ldi, lekin <code>Promise.any</code> uni e'tiborga olmaydi. Ikkinchi promise (2 soniya) — birinchi muvaffaqiyatli natija bo'lgani uchun natija <code>1</code> bo'ldi." },
        { p: "Agar <strong>barcha</strong> promise'lar reject bo'lsa, <code>Promise.any</code> maxsus <code>AggregateError</code> xatosi bilan reject bo'ladi. Uning <code>errors</code> maydonida barcha xatolar saqlanadi:" },
        { code: "Promise.any([\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Xato 1')), 1000)),\n  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Xato 2')), 2000))\n]).catch(error => {\n  console.log(error.constructor.name); // AggregateError\n  console.log(error.errors[0]); // Error: Xato 1\n  console.log(error.errors[1]); // Error: Xato 2\n});" },

        { h2: "Promise.resolve va Promise.reject" },
        { p: "Zamonaviy kodda bu ikki metod kamdan-kam kerak bo'ladi, chunki <code>async/await</code> ularning o'rnini bosadi. Ammo ularni bilib qo'yish foydali." },
        { p: "<code>Promise.resolve(value)</code> — natijasi <code>value</code> bo'lgan <strong>bajarilgan (resolved)</strong> promise yaratadi:" },
        { code: "let promise = Promise.resolve(value);\n// bu quyidagi bilan bir xil:\nlet promise2 = new Promise(resolve => resolve(value));" },
        { p: "U funksiya promise qaytarishi kerak bo'lganda, lekin qiymat allaqachon tayyor bo'lganda ishlatiladi. Masalan, keshdan qiymat qaytarishda:" },
        { code: "let cache = new Map();\n\nfunction loadCached(url) {\n  if (cache.has(url)) {\n    // keshdagi qiymatni promise sifatida qaytaramiz\n    return Promise.resolve(cache.get(url));\n  }\n  return fetch(url)\n    .then(response => response.text())\n    .then(text => {\n      cache.set(url, text);\n      return text;\n    });\n}" },
        { p: "<code>Promise.reject(error)</code> — natijasi <code>error</code> bo'lgan <strong>reject qilingan</strong> promise yaratadi. U amalda deyarli ishlatilmaydi." },

        { h2: "Xulosa" },
        { p: "Promise klassining 6 ta statik metodi:" },
        { ul: [
          "<code>Promise.all(promises)</code> — hammasini kutadi, natijalar massivini beradi. Bittasi xato bo'lsa — hammasi xato;",
          "<code>Promise.allSettled(promises)</code> — hammasini kutadi, har biri uchun <code>status</code> va natija/xato beradi;",
          "<code>Promise.race(promises)</code> — birinchi yakunlangan (fulfilled yoki rejected) natijani beradi;",
          "<code>Promise.any(promises)</code> — birinchi muvaffaqiyatli natijani beradi; hammasi xato bo'lsa — <code>AggregateError</code>;",
          "<code>Promise.resolve(value)</code> — tayyor bajarilgan promise yaratadi;",
          "<code>Promise.reject(error)</code> — tayyor reject qilingan promise yaratadi."
        ] }
      ]
    },

    {
      slug: "promisification",
      title: "Promisifikatsiya",
      blurb: "Callback qabul qiluvchi funksiyani promise qaytaradigan funksiyaga aylantirish.",
      body: [
        { lead: "<strong>Promisifikatsiya</strong> — callback qabul qiluvchi funksiyani promise qaytaradigan funksiyaga aylantirish uchun ishlatiladigan uzun so'z. Ko'p funksiyalar va kutubxonalar callback'ga asoslangan, lekin promise'lar bilan ishlash qulayroq — shuning uchun ularni promise'ga o'girish foydali." },

        { h2: "Callback uslubidagi funksiya" },
        { p: "Aytaylik, bizda skript yuklovchi callback uslubidagi funksiya bor. U <code>callback(error, result)</code> ko'rinishidagi callback qabul qiladi — bu <em>\"error-first callback\"</em> deb ataladigan keng tarqalgan uslub:" },
        { code: "function loadScript(src, callback) {\n  let script = document.createElement('script');\n  script.src = src;\n\n  script.onload = () => callback(null, script);\n  script.onerror = () => callback(new Error('Skript yuklanmadi: ' + src));\n\n  document.head.append(script);\n}\n\n// Ishlatilishi:\n// loadScript('path/script.js', (err, script) => {...})" },
        { p: "Endi biz uni promise qaytaradigan versiyaga aylantiramiz — ya'ni <strong>promisifikatsiya</strong> qilamiz." },

        { h2: "Qo'lda promisifikatsiya" },
        { p: "Yangi funksiya <code>loadScriptPromise(src)</code> callback o'rniga promise qaytaradi. Uning ichida eski <code>loadScript</code> chaqiriladi va callback promise'ni resolve/reject qiladi:" },
        { code: "let loadScriptPromise = function(src) {\n  return new Promise((resolve, reject) => {\n    loadScript(src, (err, script) => {\n      if (err) reject(err);\n      else resolve(script);\n    });\n  });\n};\n\n// Endi promise sifatida ishlatamiz:\nloadScriptPromise('path/script.js')\n  .then(script => console.log('Yuklandi: ' + script.src))\n  .catch(err => console.log('Xato: ' + err.message));" },
        { p: "Ko'rib turibmiz: yangi funksiya eski funksiyaning ishini bajaradi, lekin callback o'rniga promise qaytaradi. Xato bo'lsa promise reject bo'ladi, aks holda natija bilan resolve bo'ladi." },
        { note: "Bu yerda muhim nuqta: <code>loadScriptPromise</code> callback qabul qilmaydi. Barcha ish promise ichida bo'ladi, va biz <code>.then/.catch</code> orqali natijani olamiz." },

        { h2: "Umumiy promisify yordamchisi" },
        { p: "Amalda bizga bitta emas, bir nechta funksiyani promisifikatsiya qilish kerak bo'ladi. Har safar qo'lda yozish o'rniga, umumiy <strong>promisify</strong> yordamchi funksiyasini yozish qulayroq." },
        { p: "Bu yordamchi \"error-first callback\" uslubidagi istalgan funksiyani qabul qilib, promise qaytaradigan yangi funksiyani beradi:" },
        { code: "function promisify(f) {\n  return function(...args) { // o'ralgan (wrapper) funksiya qaytadi\n    return new Promise((resolve, reject) => {\n      // f uchun maxsus callback yaratamiz\n      function callback(err, result) {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(result);\n        }\n      }\n\n      args.push(callback); // argumentlar oxiriga callback qo'shamiz\n\n      f.call(this, ...args); // asl funksiyani chaqiramiz\n    });\n  };\n}\n\n// Ishlatilishi:\nlet loadScriptPromise = promisify(loadScript);\nloadScriptPromise('path/script.js').then(/*...*/);" },
        { p: "Bu qanday ishlaydi:" },
        { ol: [
          "<code>promisify(f)</code> yangi <em>wrapper</em> funksiya qaytaradi;",
          "Wrapper chaqirilganda yangi promise yaratiladi;",
          "Wrapper asl <code>f</code> funksiyasini chaqiradi va uning argumentlariga maxsus <code>callback</code> qo'shadi;",
          "Callback ishga tushganda: xato bo'lsa <code>reject</code>, aks holda <code>resolve</code> qiladi."
        ] },

        { h2: "Bir nechta natijali callback" },
        { p: "Yuqoridagi <code>promisify</code> callback'ning faqat bitta natijasini (<code>result</code>) oladi. Ammo ba'zi funksiyalar callback'ga bir nechta argument beradi: <code>callback(err, res1, res2, ...)</code>. Ular uchun promisify'ni kengaytiramiz:" },
        { code: "// promisify(f, true) — natijalar massivini olish uchun\nfunction promisify(f, manyArgs = false) {\n  return function(...args) {\n    return new Promise((resolve, reject) => {\n      function callback(err, ...results) { // f uchun callback\n        if (err) {\n          reject(err);\n        } else {\n          // manyArgs true bo'lsa, butun results massivini resolve qilamiz\n          resolve(manyArgs ? results : results[0]);\n        }\n      }\n\n      args.push(callback);\n\n      f.call(this, ...args);\n    });\n  };\n}\n\n// Ishlatilishi:\nlet f = promisify(f, true);\nf(...).then(arrayOfResults => /*...*/, err => /*...*/);" },
        { tip: "Node.js muhitida <code>util.promisify</code> tayyor yordamchi funksiyasi bor. Amalda ko'pincha o'z qo'lida yozish o'rniga shundan foydalaniladi." },

        { h2: "Cheklovlar" },
        { warn: "Promisifikatsiya callback <strong>faqat bir marta</strong> chaqiriladigan holatlar uchun ajoyib. Agar callback bir necha marta chaqirilsa (masalan, hodisa har safar sodir bo'lganda), promise faqat <strong>birinchi</strong> chaqiruvni ushlaydi — qolganlari e'tiborga olinmaydi. Chunki promise faqat bir marta yakunlanadi." },
        { p: "Shu sababli, bir necha marta chaqiriladigan callback'lar (masalan, hodisa tinglovchilari) uchun promisifikatsiya <strong>mos kelmaydi</strong>." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Promisifikatsiya</strong> — callback uslubidagi funksiyani promise qaytaradigan funksiyaga aylantirish;",
          "U kodni <code>.then/.catch</code> yoki <code>async/await</code> bilan qulay ishlatishga imkon beradi;",
          "Umumiy <code>promisify</code> yordamchisi \"error-first callback\" funksiyalarni avtomatik o'giradi;",
          "Node.js'da tayyor <code>util.promisify</code> mavjud;",
          "Faqat <strong>bir marta</strong> chaqiriladigan callback'lar uchun mos keladi."
        ] }
      ]
    },

    {
      slug: "microtask",
      title: "Mikrovazifalar (microtasks)",
      blurb: "Mikrovazifa navbati, .then callback'lari tartibi va setTimeout bilan farqi.",
      body: [
        { lead: "Promise'lar callback'lari (<code>.then</code>, <code>.catch</code>, <code>.finally</code>) doim <strong>asinxron</strong> bajariladi. Lekin qanday tartibda? Buni tushunish uchun <em>mikrovazifa navbati</em> (microtask queue) tushunchasini o'rganamiz." },

        { h2: "Asinxron bajarilish tartibi" },
        { p: "Quyidagi kodni ko'rib chiqamiz:" },
        { code: "let promise = Promise.resolve();\n\npromise.then(() => console.log('promise tayyor!'));\n\nconsole.log('kod tugadi');" },
        { p: "Sizningcha, natija qanday tartibda chiqadi? Ko'pchilik \"promise tayyor!\" birinchi bo'ladi deb o'ylaydi, chunki promise allaqachon resolve qilingan. Ammo natija bunday:" },
        { code: "kod tugadi\npromise tayyor!" },
        { p: "Nima uchun? Chunki <code>.then</code> callback'i darhol emas, balki hozirgi kod to'liq tugagandan keyin ishga tushadi. Buning sababi — <strong>mikrovazifa navbati</strong>." },

        { h2: "Mikrovazifa navbati (Microtask Queue)" },
        { p: "Asinxron vazifalar to'g'ri boshqarilishi kerak. ECMAScript standartida buning uchun ichki <strong>PromiseJobs</strong> navbati mavjud — spetsifikatsiyada u <em>\"microtask queue\"</em> deb ataladi (V8 termini)." },
        { p: "Navbat haqida asosiy tushunchalar:" },
        { ul: [
          "Navbat <strong>FIFO</strong> (First In, First Out) — birinchi qo'shilgan vazifa birinchi bajariladi;",
          "Vazifalar bajarilishi faqat <strong>hech qanday boshqa kod ishlamayotgan paytda</strong> boshlanadi."
        ] },
        { p: "Oddiy qilib aytganda: promise <em>tayyor</em> (settled) bo'lganda, uning <code>.then/.catch/.finally</code> callback'lari navbatga <strong>qo'shiladi</strong>, lekin darhol bajarilmaydi. JavaScript dvigateli hozirgi kodni tugatib, so'ng navbatdagi vazifalarni birma-bir oladi va bajaradi." },
        { note: "Shuning uchun yuqoridagi misolda \"kod tugadi\" birinchi chiqadi: <code>.then</code> callback'i navbatga tushdi, lekin faqat <code>console.log('kod tugadi')</code> bajarilib, asosiy kod tugagandan keyin navbatdan olindi." },
        { p: "Agar callback'lar zanjiri bo'lsa, ular ham navbat orqali birma-bir bajariladi:" },
        { code: "Promise.resolve()\n  .then(() => console.log('birinchi'))\n  .then(() => console.log('ikkinchi'))\n  .then(() => console.log('uchinchi'));\n\nconsole.log('sinxron kod');\n\n// Natija:\n// sinxron kod\n// birinchi\n// ikkinchi\n// uchinchi" },

        { h2: "Makrovazifalar va setTimeout" },
        { p: "Mikrovazifalardan tashqari <strong>makrovazifalar</strong> (macrotasks) ham bor. <code>setTimeout</code>, tarmoq hodisalari, foydalanuvchi hodisalari — bularning hammasi makrovazifalar navbatiga tushadi." },
        { p: "Muhim qoida: <strong>har bir makrovazifadan keyin dvigatel avval BARCHA mikrovazifalarni bajaradi</strong>, so'nggina keyingi makrovazifaga o'tadi (yoki qayta render qiladi). Ya'ni mikrovazifalar makrovazifalardan ustunroq." },
        { code: "setTimeout(() => console.log('setTimeout (makrovazifa)'), 0);\n\nPromise.resolve()\n  .then(() => console.log('promise (mikrovazifa)'));\n\nconsole.log('sinxron kod');" },
        { p: "Natija quyidagicha bo'ladi:" },
        { code: "sinxron kod\npromise (mikrovazifa)\nsetTimeout (makrovazifa)" },
        { p: "E'tibor bering: <code>setTimeout(..., 0)</code> \"0 soniyadan keyin\" degani bo'lsa-da, u makrovazifa bo'lgani uchun promise callback'idan <strong>keyin</strong> ishga tushdi. Chunki sinxron kod tugagach, dvigatel avval mikrovazifa navbatini (promise) to'liq bo'shatadi, keyingina makrovazifaga (setTimeout) o'tadi." },
        { warn: "Ushbu misollar asinxron tartibni ko'rsatadi. Node.js va brauzerda ular kutilgan tartibda ishlaydi. Interaktiv maydonchada esa asinxron kodning natijasi darhol ko'rinmasligi mumkin — shuning uchun bu misollar statik <code>{code}</code> sifatida berilgan." },

        { h2: "Hodisalar tsikli (Event Loop) qisqacha" },
        { p: "Yuqoridagilarni birlashtiruvchi mexanizm — <strong>hodisalar tsikli</strong> (event loop). U cheksiz aylanuvchi jarayon bo'lib, quyidagicha ishlaydi:" },
        { ol: [
          "Makrovazifa navbatidan eng eski vazifani oladi va bajaradi (masalan, hozirgi skript);",
          "So'ng <strong>barcha</strong> mikrovazifalarni bajaradi (promise callback'lari);",
          "Kerak bo'lsa brauzer sahifani qayta render qiladi;",
          "Agar makrovazifa navbatida yana vazifa bo'lsa — 1-qadamga qaytadi; aks holda yangi hodisani kutadi."
        ] },
        { p: "Ushbu ketma-ketlik nima uchun promise callback'lari <code>setTimeout</code>dan oldin ishlashini tushuntiradi: har bir makrovazifadan keyin mikrovazifa navbati to'liq bo'shatiladi." },
        { tip: "Amaliy natija: agar biror kodni sinxron ishlar tugaganidan <em>keyin</em>, lekin brauzer render qilishidan <em>oldin</em> bajarmoqchi bo'lsangiz — <code>Promise.resolve().then(...)</code> ishlating (mikrovazifa). Agar renderdan keyin bo'lishini xohlasangiz — <code>setTimeout</code> (makrovazifa)." },

        { h2: "Unhandled rejection" },
        { p: "Mikrovazifa navbati tushunchasi \"ushlanmagan rejection\" (unhandled rejection) qachon yuzaga kelishini ham tushuntiradi. Agar promise reject bo'lsa-yu, <strong>mikrovazifa navbati bo'shaganda</strong> unga <code>.catch</code> qo'shilmagan bo'lsa — dvigatel \"unhandled rejection\" xatosini beradi." },
        { code: "let promise = Promise.reject(new Error('Xatolik!'));\n// .catch qo'shilmadi\n\n// Dvigatel navbat bo'shagach 'unhandled rejection' xabarini beradi" },
        { p: "Ammo agar keyinroq (masalan <code>setTimeout</code> ichida) <code>.catch</code> qo'shsak, xato ushlanadi va \"unhandled rejection\" bo'lmaydi:" },
        { code: "let promise = Promise.reject(new Error('Xatolik!'));\n\nsetTimeout(() => promise.catch(err => console.log('ushlandi')), 1000);\n\n// Bu holda:\n// Error: Xatolik! (avval, navbat bo'shagach)\n// ushlandi (1 soniyadan keyin)" },

        { h2: "Xulosa" },
        { ul: [
          "Promise callback'lari (<code>.then/.catch/.finally</code>) doim <strong>asinxron</strong>, mikrovazifa navbati orqali bajariladi;",
          "Navbat <strong>FIFO</strong> tartibda ishlaydi va faqat hozirgi kod tugagach boshlanadi;",
          "<code>setTimeout</code> — <strong>makrovazifa</strong>, u mikrovazifalardan <em>keyin</em> ishlaydi;",
          "Har bir makrovazifadan so'ng dvigatel <strong>barcha</strong> mikrovazifalarni bajaradi;",
          "Bu mexanizm <strong>hodisalar tsikli</strong> (event loop) deb ataladi."
        ] }
      ]
    },

    {
      slug: "async-await",
      title: "Async/await",
      blurb: "async funksiyalar, await, try/catch bilan xatoliklar va top-level await.",
      body: [
        { lead: "<code>async/await</code> — promise'lar bilan ishlashning eng qulay va zamonaviy usuli. U asinxron kodni <strong>sinxronga o'xshab</strong>, o'qishga oson ko'rinishda yozishga imkon beradi." },

        { h2: "async funksiyalar" },
        { p: "<code>async</code> so'zini funksiya oldiga qo'yish mumkin. Bu bitta narsani anglatadi: funksiya <strong>doim promise qaytaradi</strong>. Agar funksiya oddiy qiymat qaytarsa, JavaScript uni avtomatik ravishda <em>resolved</em> promise'ga o'raydi." },
        { code: "async function f() {\n  return 1;\n}\n\nf().then(console.log); // 1  (1 avtomatik resolved promise'ga o'raldi)" },
        { p: "Ya'ni <code>async function f() { return 1; }</code> aslida <code>return Promise.resolve(1)</code> bilan bir xil. Biz albatta promise'ni ham to'g'ridan-to'g'ri qaytarishimiz mumkin — natija bir xil." },
        { p: "Sodda misolda buni tekshirib ko'ramiz — async funksiyaning ichidagi <code>console.log</code> sinxron ishlaydi:" },
        { pg: "async function salom() {\n  console.log(\"Async funksiya ishga tushdi\");\n  return \"Salom!\";\n}\n\nsalom(); // funksiya ichidagi log darhol chiqadi\nconsole.log(\"Funksiya chaqirildi\");", file: "async.js" },
        { note: "Yuqoridagi maydonchada faqat <strong>sinxron</strong> <code>console.log</code>'lar ko'rinadi. <code>return \"Salom!\"</code> promise'ni resolve qiladi, lekin uni <code>.then</code> bilan olmasak, natija konsolda ko'rinmaydi." },

        { h2: "await" },
        { p: "<code>await</code> — bu haqiqiy sehr. Uning sintaksisi:" },
        { code: "// await faqat async funksiya ichida ishlaydi\nlet value = await promise;" },
        { p: "<code>await</code> so'zi JavaScript'ni promise <strong>yakunlanguncha kutishga</strong> majbur qiladi. Promise resolve bo'lgach, uning natijasini qaytaradi va kod davom etadi." },
        { code: "async function f() {\n  let promise = new Promise((resolve, reject) => {\n    setTimeout(() => resolve('Tayyor!'), 1000);\n  });\n\n  let result = await promise; // promise yakunlanguncha kutadi (*)\n\n  console.log(result); // 'Tayyor!'\n}\n\nf();" },
        { p: "(*) belgisidagi qatorda funksiya bajarilishi <strong>to'xtaydi</strong> va promise yakunlanishini kutadi. Muhimi — bu kutish paytida JavaScript dvigateli boshqa ishlarni bajaraveradi (boshqa skriptlar, hodisalar). Ya'ni protsessor \"band\" bo'lmaydi, bu shunchaki chiroyli kutish usuli." },
        { p: "<code>.then</code> bilan solishtirsak, <code>await</code> ancha o'qishga oson. Quyidagi ikki kod bir xil ishni bajaradi:" },
        { code: "// .then bilan\nfunction loadUser() {\n  return fetch('/user.json')\n    .then(response => response.json())\n    .then(user => user.name);\n}\n\n// async/await bilan (ancha tozaroq)\nasync function loadUser() {\n  let response = await fetch('/user.json');\n  let user = await response.json();\n  return user.name;\n}" },

        { h2: "await faqat async ichida" },
        { warn: "<code>await</code>'ni oddiy (async bo'lmagan) funksiya ichida ishlatib bo'lmaydi — bu <strong>sintaksis xatosi</strong> beradi." },
        { code: "function f() {\n  let promise = Promise.resolve(1);\n  let result = await promise; // Syntax error!\n}" },
        { p: "Sabab: <code>await</code> faqat <code>async</code> funksiyaning ichida ma'noga ega, chunki funksiyani \"to'xtatib turish\" mexanizmi shu yerda mavjud." },

        { h2: "Top-level await" },
        { p: "Zamonaviy JavaScript'da (ES modullarida) <code>await</code>'ni funksiyadan tashqarida, modul darajasida ham ishlatish mumkin — buni <strong>top-level await</strong> deyiladi:" },
        { code: "// modul darajasida (ES module ichida)\nlet response = await fetch('/user.json');\nlet user = await response.json();\n\nconsole.log(user);" },
        { p: "Agar top-level await mavjud bo'lmagan muhitda (yoki eski kodda) ishlatmoqchi bo'lsak, odatda kodni anonim async funksiyaga o'raymiz:" },
        { code: "(async () => {\n  let response = await fetch('/user.json');\n  let user = await response.json();\n  console.log(user);\n})();" },

        { h2: "Xatoliklar: try/catch" },
        { p: "Agar promise reject bo'lsa, <code>await</code> o'sha joyda <strong>xato tashlaydi</strong> (throw) — xuddi <code>throw</code> operatori kabi. Shuning uchun uni oddiy <code>try/catch</code> bilan ushlash mumkin:" },
        { code: "async function f() {\n  try {\n    let response = await fetch('http://no-such-url');\n  } catch (err) {\n    console.log(err); // TypeError: failed to fetch\n  }\n}\n\nf();" },
        { p: "Bir <code>try/catch</code> bir nechta <code>await</code>'ni o'rab, ularning har biridagi xatoni ushlashi mumkin:" },
        { code: "async function f() {\n  try {\n    let response = await fetch('/no-user-here');\n    let user = await response.json();\n  } catch (err) {\n    // fetch va response.json() xatolarini ushlaydi\n    console.log('Xato ushlandi: ' + err.message);\n  }\n}" },
        { note: "Bu <code>.catch</code>ga qaraganda tabiiyroq: sinxron kod xatolarini qanday ushlasak, asinxron kod xatolarini ham xuddi shunday <code>try/catch</code> bilan ushlaymiz." },
        { p: "Agar <code>try/catch</code> ishlatmasak, async funksiya qaytargan promise reject bo'ladi. Uni tashqarida <code>.catch</code> bilan ushlashimiz mumkin:" },
        { code: "async function f() {\n  let response = await fetch('http://no-such-url');\n}\n\n// f() reject qilingan promise qaytaradi\nf().catch(console.log); // TypeError: failed to fetch" },

        { h2: "Promise bilan birga ishlash" },
        { p: "<code>async/await</code> promise'lar bilan yaxshi ishlaydi. Masalan, bir nechta ishni parallel kutish uchun <code>await Promise.all(...)</code> ishlatamiz:" },
        { code: "async function f() {\n  // ikkala fetch parallel boshlanadi, ikkalasini kutamiz\n  let results = await Promise.all([\n    fetch(url1),\n    fetch(url2),\n    fetch(url3)\n  ]);\n\n  // results — barcha javoblar massivi\n  return results;\n}" },
        { tip: "Agar bir nechta mustaqil so'rovni ketma-ket <code>await</code> qilsangiz, ular <strong>navbatma-navbat</strong> bajariladi (sekin). Ularni <strong>parallel</strong> ishga tushirish uchun <code>Promise.all</code> ichiga joylang — bu ancha tezroq." },
        { p: "<code>await</code> nafaqat promise, balki <em>\"thenable\"</em> obyektlar (ya'ni <code>.then</code> metodiga ega obyektlar) bilan ham ishlaydi — xuddi <code>promise.then</code> kabi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>async</code> funksiya <strong>doim promise qaytaradi</strong>; oddiy qiymat avtomatik resolved promise'ga o'raladi;",
          "<code>await</code> promise yakunlanguncha kutadi va natijasini qaytaradi;",
          "<code>await</code> faqat <code>async</code> funksiya ichida (yoki ES modul darajasida — top-level await) ishlaydi;",
          "Xatolarni oddiy <code>try/catch</code> bilan, yoki tashqarida <code>.catch</code> bilan ushlash mumkin;",
          "Parallel ishlar uchun <code>await Promise.all(...)</code> ishlatiladi;",
          "<code>async/await</code> — <code>.then/.catch</code> zanjirlariga qaraganda ancha o'qishga oson va toza usul."
        ] }
      ]
    }
  ]
};
