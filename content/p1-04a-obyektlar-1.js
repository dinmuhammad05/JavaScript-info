"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Obyektlar: asoslar",
  lessons: [
    {
      slug: "obyektlar",
      title: "Obyektlar",
      blurb: "Obyekt yaratish, xossalar bilan ishlash, nuqta va kvadrat qavslar, delete, hisoblangan xossalar, \"in\" operatori va for..in sikli.",
      body: [
        { lead: "JavaScript'da sakkizta ma'lumot turi bor. Ulardan yettitasi \"primitiv\" (son, satr, boolean va h.k.) deb ataladi, chunki ular bitta qiymatni saqlaydi. Obyekt esa turli xil ma'lumotlar to'plamini va murakkabroq mavjudotlarni saqlash uchun ishlatiladi. Ushbu darsda obyektlar bilan chuqur tanishamiz." },

        { h2: "Obyekt nima?" },
        { p: "<strong>Obyekt</strong> — bu <code>\"kalit: qiymat\"</code> ko'rinishidagi juftliklardan tashkil topgan to'plam. Bu yerda kalit — satr (uni <em>xossa nomi</em> yoki <em>property name</em> deb ataymiz), qiymat esa istalgan tur bo'lishi mumkin: son, satr, boolean, hatto boshqa obyekt yoki funksiya." },
        { p: "Primitiv turlarni bitta qutiga o'xshatsak, obyektni bir nechta bo'lmali javon deb tasavvur qiling: har bir bo'lmaning yorlig'i (kalit) bor, va har bir bo'lmada biror narsa (qiymat) yotadi." },
        { p: "Bo'sh obyektni ikki xil usulda yaratish mumkin:" },
        { code: "let user = new Object(); // \"obyekt konstruktori\" sintaksisi\nlet user = {};           // \"obyekt literali\" sintaksisi" },
        { p: "Ikkinchi usul — jingalak qavslar <code>{}</code> — ancha keng qo'llaniladi va \"obyekt literali\" deb ataladi. Odatda aynan shuni ishlatamiz." },

        { h2: "Xossalar (literal va qiymatlar)" },
        { p: "Obyektni yaratishda uning ichiga darhol xossalarni joylashtirishimiz mumkin. Har bir xossa <code>kalit: qiymat</code> ko'rinishida, juftliklar esa vergul bilan ajratiladi:" },
        { code: "let user = {          // obyekt\n  name: \"Jaloliddin\",  // \"name\" kaliti \"Jaloliddin\" qiymatini saqlaydi\n  age: 30              // \"age\" kaliti 30 qiymatini saqlaydi\n};" },
        { p: "Bu yerda <code>user</code> obyektida ikkita xossa bor. Chapda — kalit (nom), o'ngda — qiymat. Buni quyidagicha tasavvur qiling: <code>name</code> yorlig'i ostida <code>\"Jaloliddin\"</code> saqlanadi, <code>age</code> yorlig'i ostida esa <code>30</code>." },

        { h2: "Nuqta orqali xossalarga murojaat" },
        { p: "Xossa qiymatini o'qish uchun <strong>nuqta</strong> (dot notation) belgisidan foydalanamiz:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30\n};\n\nconsole.log(user.name); // Jaloliddin\nconsole.log(user.age);  // 30", file: "nuqta.js" },
        { p: "Xossaning qiymatini o'zgartirish yoki yangi xossa qo'shish uchun ham nuqtadan foydalanamiz:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30\n};\n\nuser.age = 31;             // mavjud xossani o'zgartirdik\nuser.isAdmin = true;       // yangi xossa qo'shdik\n\nconsole.log(user.age);     // 31\nconsole.log(user.isAdmin); // true", file: "qoshish.js" },
        { note: "Qiymat sifatida istalgan tur bo'lishi mumkin. Masalan, boolean (<code>true/false</code>), son, satr yoki boshqa obyekt." },

        { h2: "Xossani o'chirish: delete" },
        { p: "Xossani obyektdan butunlay olib tashlash uchun <code>delete</code> operatoridan foydalanamiz:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30\n};\n\ndelete user.age;\n\nconsole.log(user.age); // undefined (xossa endi mavjud emas)", file: "delete.js" },
        { p: "Mavjud bo'lmagan xossaga murojaat qilinsa, xato bermaydi — shunchaki <code>undefined</code> qaytadi. Bu obyektning muhim xususiyati: yo'q xossa qiymati har doim <code>undefined</code>." },

        { h2: "Ko'p so'zli xossa nomlari" },
        { p: "Xossa nomi bir necha so'zdan iborat bo'lishi mumkin, ammo bunda uni tirnoq ichiga olish shart:" },
        { code: "let user = {\n  name: \"Jaloliddin\",\n  age: 30,\n  'likes birds': true  // ko'p so'zli nom tirnoq ichida bo'lishi shart\n};" },
        { warn: "<code>let</code>, <code>for</code>, <code>return</code> kabi til kalit so'zlari xossa nomlari bo'la oladi — obyekt xossalarida hech qanday cheklov yo'q. Ammo ko'p so'zli yoki maxsus belgili nomlar tirnoqni talab qiladi." },

        { h2: "Kvadrat qavslar (bracket notation)" },
        { p: "Ko'p so'zli xossalarda nuqta ishlamaydi, chunki JavaScript nuqtadan keyin to'g'ri identifikatorni kutadi:" },
        { code: "// Bu XATO beradi:\n// user.likes birds = true;" },
        { p: "Yechim — <strong>kvadrat qavslar</strong>. Ular istalgan satr bilan ishlaydi:" },
        { pg: "let user = {};\n\nuser['likes birds'] = true;              // o'rnatish\nconsole.log(user['likes birds']);        // true (o'qish)\ndelete user['likes birds'];              // o'chirish\n\nconsole.log(user['likes birds']);        // undefined", file: "qavslar.js" },
        { p: "Kvadrat qavslarning eng kuchli jihati — ular ichiga <em>o'zgaruvchi</em> qo'yish mumkin. Bu nuqta bilan iloji yo'q:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30\n};\n\nlet key = \"name\";\n\n// o'zgaruvchi orqali xossaga murojaat\nconsole.log(user[key]); // Jaloliddin\n\nkey = \"age\";\nconsole.log(user[key]); // 30", file: "ozgaruvchi.js" },
        { warn: "Diqqat: <code>user[key]</code> va <code>user.key</code> — bir xil emas! <code>user.key</code> aynan \"key\" nomli xossani qidiradi, <code>user[key]</code> esa <code>key</code> o'zgaruvchining <em>qiymatidagi</em> nomli xossani qidiradi." },

        { h2: "Hisoblangan xossalar (computed properties)" },
        { p: "Obyekt literalida kvadrat qavslardan foydalansak, xossa nomini <em>ifoda</em> orqali hisoblab qo'yishimiz mumkin. Bunday xossa <strong>hisoblangan xossa</strong> (computed property) deb ataladi:" },
        { pg: "let fruit = \"olma\";\n\nlet bag = {\n  [fruit]: 5  // xossa nomi fruit o'zgaruvchidan olinadi\n};\n\nconsole.log(bag.olma); // 5 (fruit === \"olma\" bo'lgani uchun)", file: "hisoblangan.js" },
        { p: "Bu yerda <code>[fruit]</code> \"xossa nomini <code>fruit</code> o'zgaruvchisidan ol\" degan ma'noni bildiradi. Qavslar ichida murakkabroq ifoda ham bo'lishi mumkin:" },
        { pg: "let fruit = \"olma\";\n\nlet bag = {\n  [fruit + 'Computers']: 5 // bag.olmaComputers = 5\n};\n\nconsole.log(bag.olmaComputers); // 5", file: "hisoblangan2.js" },

        { h2: "Xossa qisqartmasi (property shorthand)" },
        { p: "Amaliyotda ko'pincha xossa qiymatini bir xil nomli o'zgaruvchidan olamiz. Buning uchun maxsus <strong>qisqartma</strong> bor:" },
        { code: "function makeUser(name, age) {\n  return {\n    name: name, // odatiy yozuv\n    age: age\n  };\n}" },
        { p: "<code>name: name</code> o'rniga shunchaki <code>name</code> deb yozish mumkin:" },
        { pg: "function makeUser(name, age) {\n  return {\n    name, // name: name bilan bir xil\n    age   // age: age bilan bir xil\n  };\n}\n\nlet user = makeUser(\"Jaloliddin\", 30);\nconsole.log(user.name); // Jaloliddin\nconsole.log(user.age);  // 30", file: "qisqartma.js" },
        { tip: "Qisqartma va odatiy yozuvni aralashtirish mumkin: <code>{ name, age: 30 }</code> — mutlaqo to'g'ri." },

        { h2: "\"in\" operatori" },
        { p: "Ko'rdikki, yo'q xossaga murojaat <code>undefined</code> qaytaradi. Bu bilan xossa borligini tekshirsak bo'ladi:" },
        { code: "let user = { name: \"Jaloliddin\", age: 30 };\nconsole.log(user.noSuchProperty === undefined); // true — xossa yo'q" },
        { p: "Ammo aniqroq usul bor — <code>in</code> operatori. Sintaksis: <code>\"kalit\" in obyekt</code>:" },
        { pg: "let user = { name: \"Jaloliddin\", age: 30 };\n\nconsole.log('age' in user);  // true — user.age mavjud\nconsole.log('name' in user); // true\nconsole.log('boyi' in user); // false — bunday xossa yo'q", file: "in.js" },
        { note: "<code>in</code>ning chap tomonida xossa nomi <strong>satr</strong> bo'lishi kerak. Agar tirnoqsiz yozsak, u o'zgaruvchi deb qabul qilinadi: <code>let key = 'age'; console.log(key in user);</code>." },
        { p: "Nima uchun aynan <code>in</code> kerak, agar <code>undefined</code> bilan tekshirish mumkin bo'lsa? Chunki ba'zan xossa mavjud, lekin uning qiymati aynan <code>undefined</code> bo'ladi. Bunday holatda <code>=== undefined</code> aldaydi, <code>in</code> esa haqiqatni ko'rsatadi:" },
        { pg: "let obj = { test: undefined };\n\nconsole.log(obj.test === undefined); // true — go'yo yo'qday\nconsole.log('test' in obj);          // true — aslida MAVJUD!", file: "in-undefined.js" },

        { h2: "for..in sikli" },
        { p: "Obyektning barcha xossalari ustidan aylanish uchun maxsus <code>for..in</code> sikli bor. Bu — biz bilgan <code>for(;;)</code> siklidan tamoman farq qiladi:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30,\n  isAdmin: true\n};\n\nfor (let key in user) {\n  // kalitlar\n  console.log(key);        // name, age, isAdmin\n  // kalitlar uchun qiymatlar\n  console.log(user[key]);  // Jaloliddin, 30, true\n}", file: "forin.js" },
        { p: "Bu yerda <code>key</code> — har aylanishda xossa nomini oladi. Xossa nomini istalgan boshqacha atash mumkin (<code>let prop in user</code>), <code>key</code> — shunchaki keng tarqalgan tanlov." },

        { h2: "Butun sonli kalitlar tartibi" },
        { p: "Xossalar qanday tartibda joylashadi? <code>for..in</code>da ular <strong>maxsus tartiblangan</strong>: butun son ko'rinishidagi kalitlar o'sish tartibida, qolganlari esa yaratilish tartibida chiqadi." },
        { pg: "let codes = {\n  \"49\": \"Germaniya\",\n  \"41\": \"Shveytsariya\",\n  \"44\": \"Buyuk Britaniya\",\n  \"1\": \"AQSH\"\n};\n\nfor (let code in codes) {\n  console.log(code); // 1, 41, 44, 49 — o'sish tartibida!\n}", file: "tartib.js" },
        { p: "Agar kalitlar butun son bo'lmasa (masalan, oldiga <code>+</code> qo'shsak yoki harf aralashtirilsa), tartib yaratilish ketma-ketligiga qaytadi. Bu \"butun son xossa\" (integer property) qoidasi deb ataladi." },

        { h2: "Xulosa" },
        { ul: [
          "Obyekt — <code>{}</code> ichida <code>kalit: qiymat</code> juftliklari to'plami;",
          "Xossalarga <strong>nuqta</strong> (<code>obj.prop</code>) yoki <strong>kvadrat qavslar</strong> (<code>obj[\"prop\"]</code>) orqali murojaat qilinadi;",
          "Kvadrat qavslar o'zgaruvchi va ifodalar bilan ishlaydi, nuqta esa faqat qat'iy nom bilan;",
          "<code>delete</code> — xossani o'chiradi, yo'q xossa <code>undefined</code> qaytaradi;",
          "<code>[ifoda]: qiymat</code> — hisoblangan xossa; <code>{ name }</code> — xossa qisqartmasi;",
          "<code>\"kalit\" in obj</code> — xossa borligini aniq tekshiradi;",
          "<code>for..in</code> — barcha xossalar ustidan aylanadi."
        ] }
      ]
    },

    {
      slug: "obyekt-nusxalash",
      title: "Obyekt havolalari va nusxalash",
      blurb: "Obyektlar havola (reference) orqali saqlanadi va ko'chiriladi. = obyektni nusxalamaydi. Object.assign, sayoz nusxa va structuredClone.",
      body: [
        { lead: "Obyektlar va primitivlar o'rtasidagi eng muhim farqlardan biri — ular saqlanish va ko'chirilish usulida. Primitivlar to'liq qiymat bilan, obyektlar esa <em>havola</em> (reference) bilan ishlaydi. Bu farqni tushunmaslik ko'plab \"g'alati\" xatolarga sabab bo'ladi." },

        { h2: "Primitivlar nusxalanadi" },
        { p: "Primitiv turdagi o'zgaruvchi (satr, son, boolean) o'z qiymatini to'liq saqlaydi. Uni boshqa o'zgaruvchiga tenglashtirsak, <strong>qiymatning nusxasi</strong> ko'chiriladi — ikki mustaqil qiymat hosil bo'ladi:" },
        { pg: "let message = \"Salom!\";\nlet phrase = message; // qiymat nusxalandi\n\nphrase = \"O'zgardi\";  // faqat phrase o'zgardi\n\nconsole.log(message); // Salom! (o'zgarmadi)\nconsole.log(phrase);  // O'zgardi", file: "primitiv.js" },

        { h2: "Obyektlar havola orqali saqlanadi" },
        { p: "Obyekt o'zgaruvchisi obyektning o'zini emas, balki uning xotiradagi <strong>manzilini</strong> — ya'ni \"havola\"ni saqlaydi. Buni quyidagicha tasavvur qiling: obyekt — bir qutida, o'zgaruvchi esa — o'sha qutiga yopishtirilgan qog'oz (manzil, kalit)." },
        { code: "let user = {\n  name: \"Jaloliddin\"\n};\n// user o'zgaruvchisi obyektning \"manzilini\" saqlaydi,\n// obyektning o'zini emas." },
        { p: "Xossaga murojaat qilganda (<code>user.name</code>), JavaScript avval havola bo'yicha obyektni topadi, keyin uning ichidagi xossani o'qiydi." },

        { h2: "Havolani nusxalash" },
        { p: "Obyekt o'zgaruvchisini nusxalasak, obyekt EMAS, balki <strong>havola nusxalanadi</strong>. Natijada ikkala o'zgaruvchi ham <em>bitta va o'sha</em> obyektga ishora qiladi:" },
        { pg: "let user = { name: \"Jaloliddin\" };\n\nlet admin = user; // havola nusxalandi (ikkalasi bir obyektga ishora qiladi)\n\nadmin.name = \"O'zgardi\"; // admin orqali o'zgartirdik\n\nconsole.log(user.name); // O'zgardi — chunki user ham SHU obyektga ishora qiladi!", file: "havola.js" },
        { p: "Bu \"ikkita kaliti bor bitta shkaf\"ga o'xshaydi: bittasi bilan ochib narsa qo'ysak, ikkinchi kalit egasi ham o'sha narsani ko'radi. Obyekt bitta, unga ikkita havola bor." },
        { warn: "Bu — eng ko'p yangi xatoga sabab bo'ladigan nuqtalardan biri. <code>let b = a</code> obyektni nusxalamaydi; u faqat yana bitta havola yaratadi." },

        { h2: "Havola orqali taqqoslash" },
        { p: "<code>==</code> va <code>===</code> operatorlari ikkita obyekt uchun <strong>bir xil ishlaydi</strong>: ular faqat ikkala havola <em>bitta va o'sha</em> obyektga ishora qilsagina <code>true</code> qaytaradi:" },
        { pg: "let a = {};\nlet b = a; // b va a bir obyektga ishora qiladi\n\nconsole.log(a == b);  // true\nconsole.log(a === b); // true", file: "tenglik1.js" },
        { p: "Ammo tashqi ko'rinishi bir xil, ammo mustaqil ikkita obyekt HAR DOIM teng emas:" },
        { pg: "let a = {};\nlet b = {}; // ikki mustaqil (alohida) obyekt\n\nconsole.log(a == b);  // false\nconsole.log(a === b); // false", file: "tenglik2.js" },
        { note: "Ular ko'rinishi \"bo'sh va bir xil\" bo'lsa-da, xotirada ikki alohida obyekt — shuning uchun teng emas." },

        { h2: "Object.assign bilan nusxalash" },
        { p: "Chinakam nusxa — mustaqil, alohida obyekt — kerak bo'lsa-chi? Buning uchun barcha xossalarni yangi obyektga ko'chirish kerak. Buni qo'lda <code>for..in</code> bilan qilsa bo'ladi, ammo tayyor usul bor: <code>Object.assign</code>." },
        { p: "Sintaksis: <code>Object.assign(dest, ...sources)</code>. U <code>sources</code>dagi barcha xossalarni <code>dest</code>ga ko'chiradi va <code>dest</code>ni qaytaradi:" },
        { pg: "let user = { name: \"Jaloliddin\", age: 30 };\n\nlet clone = Object.assign({}, user); // bo'sh obyektga user xossalarini ko'chirdik\n\nclone.name = \"O'zgardi\"; // clone'ni o'zgartirdik\n\nconsole.log(user.name);  // Jaloliddin — asl obyekt tegilmadi!\nconsole.log(clone.name); // O'zgardi", file: "assign.js" },
        { p: "<code>Object.assign</code> bir nechta manbani ham birlashtira oladi. Bir xil nomli xossa bo'lsa, oxirgisi ustun keladi:" },
        { pg: "let user = { name: \"Jaloliddin\" };\nlet permissions1 = { canView: true };\nlet permissions2 = { canEdit: true };\n\nObject.assign(user, permissions1, permissions2);\n\nconsole.log(user.name);    // Jaloliddin\nconsole.log(user.canView); // true\nconsole.log(user.canEdit); // true", file: "assign-merge.js" },
        { tip: "Nusxa olishning yana bir keng tarqalgan usuli — <em>spread</em> sintaksisi: <code>let clone = {...user};</code>. U ham xuddi shunday sayoz nusxa yaratadi." },

        { h2: "Sayoz nusxa (shallow copy) muammosi" },
        { p: "<code>Object.assign</code> (va spread) faqat <strong>bir daraja</strong> chuqurlikda nusxalaydi. Agar xossa qiymati o'zi obyekt bo'lsa, u nusxalanmaydi — uning havolasi ko'chiriladi. Bunga <strong>sayoz nusxa</strong> (shallow copy) deyiladi:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  sizes: {       // ichki obyekt\n    height: 182,\n    width: 50\n  }\n};\n\nlet clone = Object.assign({}, user);\n\n// sizes ichki obyekt HAVOLA orqali ulashilgan!\nconsole.log(user.sizes === clone.sizes); // true — bitta obyekt\n\nclone.sizes.width = 60; // clone orqali ichki obyektni o'zgartirdik\n\nconsole.log(user.sizes.width); // 60 — asl obyekt ham o'zgardi!", file: "sayoz.js" },
        { warn: "Sayoz nusxada tashqi obyekt yangi, ammo ichki obyektlar hamon ulashilgan. Bittasini o'zgartirsak, ikkinchisi ham o'zgaradi." },

        { h2: "Chuqur nusxa: structuredClone" },
        { p: "Bunday muammoni bartaraf qilish uchun <strong>chuqur nusxa</strong> (deep clone) kerak — barcha darajadagi ichki obyektlar ham nusxalanadi. Zamonaviy JavaScript'da buning uchun ichki <code>structuredClone</code> funksiyasi bor:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  sizes: { height: 182, width: 50 }\n};\n\nlet clone = structuredClone(user);\n\n// endi ichki obyekt ham mustaqil!\nconsole.log(user.sizes === clone.sizes); // false\n\nclone.sizes.width = 60;\n\nconsole.log(user.sizes.width); // 50 — asl obyekt tegilmadi!", file: "structured.js" },
        { p: "<code>structuredClone</code> istalgan chuqurlikdagi obyektlarni, hatto o'z-o'ziga ishora qiluvchi (siklik) obyektlarni ham to'g'ri nusxalay oladi." },
        { note: "<code>structuredClone</code> funksiya (metod) qiymatlarini nusxalay olmaydi — bunday obyektni uzatsangiz xato beradi. Bunday murakkab hollarda tashqi kutubxonalar (masalan, lodash'ning <code>_.cloneDeep</code>) yordam beradi." },

        { h2: "Xulosa" },
        { ul: [
          "Primitivlar <strong>qiymat</strong> bilan, obyektlar <strong>havola</strong> bilan saqlanadi;",
          "<code>let b = a</code> obyekt uchun faqat havolani nusxalaydi — obyekt bitta bo'lib qoladi;",
          "<code>==</code> va <code>===</code> obyektlar uchun faqat bir xil havolani teng deb hisoblaydi;",
          "<code>Object.assign({}, obj)</code> yoki <code>{...obj}</code> — <strong>sayoz</strong> nusxa yaratadi;",
          "Sayoz nusxada ichki obyektlar hamon ulashilgan;",
          "<code>structuredClone(obj)</code> — <strong>chuqur</strong> nusxa yaratadi, barcha darajalarni mustaqil qiladi."
        ] }
      ]
    },

    {
      slug: "garbage-collection",
      title: "Axlat yig'ish (Garbage collection)",
      blurb: "Xotira boshqaruvi, erishuvchanlik (reachability), root, ishlatilmaydigan obyektlarni tozalash va mark-and-sweep algoritmi g'oyasi.",
      body: [
        { lead: "JavaScript'da xotira boshqaruvi avtomatik va ko'zga ko'rinmas tarzda amalga oshiriladi. Biz o'zgaruvchilar, obyektlar, funksiyalar yaratamiz — bularning hammasi xotira egallaydi. Endi savol: kerak bo'lmay qolgan narsalar bilan nima bo'ladi? Buni <strong>axlat yig'uvchi</strong> (garbage collector) hal qiladi." },

        { h2: "Erishuvchanlik (Reachability)" },
        { p: "JavaScript'dagi xotira boshqaruvining asosiy tushunchasi — <strong>erishuvchanlik</strong> (reachability). Sodda qilib aytganda, \"erishsa bo'ladigan\" qiymatlar — bu qandaydir yo'l bilan ishlatilishi mumkin bo'lgan qiymatlar. Ular xotirada saqlanib qoladi." },
        { p: "Erishsa bo'ladigan qiymatlar to'plami mavjud. Ba'zi qiymatlar <em>ta'rifga ko'ra</em> erishsa bo'ladigan hisoblanadi. Bularni <strong>root</strong> (ildiz) deb ataymiz:" },
        { ul: [
          "Hozir bajarilayotgan funksiyaning lokal o'zgaruvchilari va parametrlari;",
          "Ichma-ich chaqiruvlar zanjiridagi boshqa funksiyalarning o'zgaruvchi va parametrlari;",
          "Global o'zgaruvchilar;",
          "(va yana bir nechta ichki, tizim darajasidagilar)."
        ] },
        { p: "Asosiy qoida shunday: agar biror qiymatga <strong>root</strong>dan havola yoki havolalar zanjiri orqali yetib borilsa — u erishsa bo'ladigan (kerakli) hisoblanadi va saqlanadi. Aks holda — u \"axlat\" va tozalanadi." },
        { note: "Fonda uzluksiz ishlaydigan maxsus jarayon — <strong>garbage collector</strong> (axlat yig'uvchi) — barcha obyektlarni kuzatib turadi, erishib bo'lmaydiganlarini topadi va o'chiradi." },

        { h2: "Oddiy misol" },
        { p: "Global o'zgaruvchida obyektga havola bor:" },
        { code: "// user global o'zgaruvchisi obyektga havola qiladi\nlet user = {\n  name: \"Jaloliddin\"\n};" },
        { p: "Bu yerda <code>user</code> obyektga (\"strelka\") havola qiladi. Obyektning <code>name</code> xossasi primitivni saqlaydi. Agar <code>user</code> qiymatini boshqasiga o'zgartirsak, havola yo'qoladi:" },
        { code: "user = null;\n\n// Endi \"Jaloliddin\" obyektiga hech qanday havola yo'q.\n// Unga erishib bo'lmaydi — garbage collector uni o'chiradi,\n// xotira bo'shatiladi." },

        { h2: "Ikkita havola" },
        { p: "Endi bir obyektga ikkita havola bo'lsa, vaziyat o'zgaradi:" },
        { code: "let user = {\n  name: \"Jaloliddin\"\n};\n\nlet admin = user; // ikkinchi havola" },
        { p: "Agar endi <code>user</code>ni <code>null</code> qilsak:" },
        { code: "user = null;" },
        { p: "Obyekt hamon erishsa bo'ladigan bo'lib qoladi, chunki unga <code>admin</code> orqali yetib borilyapti. U xotirada saqlanadi. Faqat <code>admin = null</code> ham qilsak, obyekt erishib bo'lmaydigan bo'ladi va o'chiriladi." },

        { h2: "O'zaro bog'langan obyektlar" },
        { p: "Endi murakkabroq misol — bir-biriga havola qiluvchi obyektlar. Bir oila obyektini tasavvur qiling:" },
        { code: "function marry(man, woman) {\n  woman.husband = man;\n  man.wife = woman;\n\n  return {\n    father: man,\n    mother: woman\n  };\n}\n\nlet family = marry(\n  { name: \"Sardor\" },\n  { name: \"Nilufar\" }\n);" },
        { p: "Natijada obyektlar bir-biriga havola qiladi: <code>family</code> ikkalasiga, <code>father</code> va <code>mother</code> esa <code>husband</code>/<code>wife</code> orqali o'zaro bog'langan. Barcha obyektlarga <code>family</code> (root)dan yetib boriladi — hammasi erishsa bo'ladigan." },
        { p: "Endi ikkita havolani olib tashlaymiz:" },
        { code: "delete family.father;\ndelete family.mother.husband;" },
        { p: "\"Sardor\" (father) obyektiga endi hech qanday <em>kiruvchi</em> havola qolmadi: <code>family.father</code> o'chirildi, <code>woman.husband</code> ham. Uning ichidan tashqariga havolalar bo'lishi (masalan, u <code>wife</code>ga havola qilishi) ahamiyatsiz — muhimi unga <em>tashqaridan</em> yetib bo'lmasligi. Shu sabab \"Sardor\" obyekti o'chiriladi." },
        { warn: "Diqqat: erishuvchanlik faqat <strong>kiruvchi</strong> havolalar bilan aniqlanadi. Obyektning boshqalarga havola qilishi uni saqlab qolmaydi — unga root'dan yetib borish kerak." },

        { h2: "Yetib bo'lmaydigan orol" },
        { p: "Bir butun bog'langan obyektlar guruhi ham axlatga aylanishi mumkin — agar butun guruhga tashqaridan yetib bo'lmasa. Agar <code>family = null</code> qilsak, ichkarida obyektlar bir-biriga havola qilib tursa ham, ularga root'dan yo'l yo'q. Shunday \"orol\" butunligicha o'chiriladi." },
        { note: "Bu muhim: obyektlarning o'zaro bog'langani ularni saqlab qolmaydi. Agar butun bir tarmoqqa root'dan yetib bo'lmasa, u to'liq tozalanadi." },

        { h2: "Ichki algoritm: mark-and-sweep" },
        { p: "Asosiy axlat yig'ish algoritmi <strong>\"mark-and-sweep\"</strong> (belgila va tozala) deb ataladi. U taxminan quyidagicha ishlaydi:" },
        { ol: [
          "Garbage collector root'larni oladi va ularni \"belgilaydi\" (eslab qoladi);",
          "So'ng root'lardan havola qilinayotgan barcha obyektlarga tashrif buyurib, ularni belgilaydi;",
          "So'ng belgilangan obyektlarga tashrif buyuradi va ular havola qilayotganlarni belgilaydi. Barcha yo'llar to'liq ko'rilguncha bu davom etadi;",
          "Belgilanmagan barcha obyektlar — erishib bo'lmaydigan hisoblanadi va o'chiriladi (xotira bo'shatiladi)."
        ] },
        { p: "Buni bo'yoq to'kilishiga o'xshatish mumkin: root'dan boshlab, havolalar bo'ylab \"bo'yoq\" tarqaladi. Bo'yoq yetib bormagan (belgilanmagan) obyektlar — erishib bo'lmaydigan va o'chiriladi." },

        { h2: "Optimallashtirishlar" },
        { p: "Zamonaviy dvigatellar axlat yig'ishni tezlashtirish uchun ilg'or usullar qo'llaydi:" },
        { ul: [
          "<strong>Avloviy yig'ish (generational collection)</strong> — obyektlar \"yangi\" va \"eski\"larga bo'linadi. Ko'p obyekt yaratilib, tez ishlatilib bo'ladi; ularni tez-tez tekshiradi. Uzoq yashaganlarini kamroq tekshiradi;",
          "<strong>Bosqichli yig'ish (incremental collection)</strong> — juda ko'p obyekt bo'lsa, hammasini birdan belgilash kechikish yaratadi. Shuning uchun ish kichik bo'laklarga bo'lib bajariladi;",
          "<strong>Bo'sh vaqtda yig'ish (idle-time collection)</strong> — protsessor bo'sh bo'lganda ishlab, asosiy kodga ta'sirni kamaytirishga harakat qiladi."
        ] },
        { tip: "Bu optimallashtirishlar ichki tafsilotlar — ular vaqt o'tishi bilan o'zgaradi. Kundalik dasturlashda ularni yodda tutish shart emas; dvigatel o'zi hal qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "Xotira boshqaruvi JavaScript'da <strong>avtomatik</strong> — biz uni qo'lda boshqarmaymiz;",
          "Asosiy tushuncha — <strong>erishuvchanlik</strong> (reachability): root'dan yetib boriladigan qiymatlar saqlanadi;",
          "<strong>Root</strong>lar — global o'zgaruvchilar, joriy funksiya o'zgaruvchilari va boshqalar;",
          "Obyektni saqlab qoladigan narsa — unga <strong>kiruvchi</strong> havolalar, chiquvchilari emas;",
          "Bir-biriga bog'langan, ammo root'dan uzilgan obyektlar guruhi butunligicha o'chiriladi;",
          "Asosiy algoritm — <strong>mark-and-sweep</strong>; dvigatellar buni turli optimallashtirishlar bilan tezlashtiradi."
        ] }
      ]
    },

    {
      slug: "obyekt-metodlari",
      title: "Obyekt metodlari, this",
      blurb: "Obyektga metod qo'shish, this kalit so'zi, this'ning chaqiruvga bog'liqligi va strelka funksiyalarda this yo'qligi.",
      body: [
        { lead: "Obyektlar odatda real dunyodagi mavjudotlarni ifodalaydi: foydalanuvchi, buyurtma, mahsulot va h.k. Real dunyoda foydalanuvchi harakat qila oladi — savatga qo'sha oladi, chiqa oladi, xarid qila oladi. Bunday harakatlar kodda <strong>metodlar</strong> — obyektga tegishli funksiyalar orqali ifodalanadi." },

        { h2: "Metod nima?" },
        { p: "Obyekt xossasi qiymat sifatida funksiyaga ega bo'lsa, bu funksiya <strong>metod</strong> deb ataladi. Keling, <code>user</code>ga salomlashadigan metod qo'shamiz:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30\n};\n\nuser.sayHi = function() {\n  console.log(\"Salom!\");\n};\n\nuser.sayHi(); // Salom!", file: "metod.js" },
        { p: "Bu yerda biz funksiya yaratib, uni <code>user</code> obyektining <code>sayHi</code> xossasiga tayinladik. So'ng <code>user.sayHi()</code> orqali uni chaqirdik. Endi <code>user</code> gapira oladigan bo'ldi." },

        { h2: "Metod qisqartmasi" },
        { p: "Obyekt literalida metod yozishning qisqaroq, chiroyliroq usuli bor:" },
        { code: "// oddiy yozuv\nlet user = {\n  sayHi: function() {\n    console.log(\"Salom\");\n  }\n};\n\n// qisqartma — bir xil ishlaydi, chiroyliroq\nlet user = {\n  sayHi() {\n    console.log(\"Salom\");\n  }\n};" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  // metod qisqartmasi\n  sayHi() {\n    console.log(\"Salom, dunyo!\");\n  }\n};\n\nuser.sayHi(); // Salom, dunyo!", file: "qisqartma-metod.js" },

        { h2: "\"this\" kalit so'zi" },
        { p: "Metod ko'pincha o'zi tegishli obyektning ma'lumotlariga murojaat qilishi kerak. Masalan, <code>user</code> nomini aytmoqchi bo'lsak. Buning uchun metod ichida <strong><code>this</code></strong> kalit so'zi ishlatiladi." },
        { p: "<code>this</code> qiymati — bu metod <em>chaqirilgan</em> obyektga havola, ya'ni \"nuqtadan oldingi\" obyekt:" },
        { pg: "let user = {\n  name: \"Jaloliddin\",\n  age: 30,\n\n  sayHi() {\n    // this — \"joriy obyekt\" (user)\n    console.log(this.name);\n  }\n};\n\nuser.sayHi(); // Jaloliddin", file: "this.js" },
        { p: "<code>user.sayHi()</code> chaqirilganda <code>this</code> aynan <code>user</code>ga teng bo'ladi. Shuning uchun <code>this.name</code> — <code>user.name</code>, ya'ni \"Jaloliddin\"." },
        { note: "Texnik jihatdan <code>this</code>siz, tashqi o'zgaruvchi orqali ham murojaat qilish mumkin edi (<code>user.name</code>). Ammo bu xavfli: agar <code>user</code>ni boshqa o'zgaruvchiga ko'chirsak yoki <code>null</code> qilsak, metod xato beradi. <code>this</code> esa har doim to'g'ri obyektga ishora qiladi." },

        { h2: "\"this\" bog'lanmagan (chaqiruvga bog'liq)" },
        { p: "JavaScript'da <code>this</code> boshqa ko'p tillardan farq qiladi: u istalgan funksiyada ishlatilishi mumkin va uning qiymati funksiya <strong>qanday chaqirilishiga</strong> qarab, ish vaqtida (runtime) aniqlanadi. Bu — \"free this\" (erkin this) tushunchasi." },
        { p: "Bir metodni ikki xil obyektda chaqirsak, <code>this</code> ham har xil bo'ladi:" },
        { pg: "let user = { name: \"Jaloliddin\" };\nlet admin = { name: \"Nilufar\" };\n\nfunction sayHi() {\n  console.log(this.name);\n}\n\n// bir funksiyani ikki obyektga tayinladik\nuser.f = sayHi;\nadmin.f = sayHi;\n\nuser.f();  // Jaloliddin (this === user)\nadmin.f(); // Nilufar (this === admin)", file: "this-call.js" },
        { p: "Ko'ryapsizmi — funksiya bitta, ammo <code>this.name</code> har xil. Chunki <code>this</code> \"nuqtadan oldingi\" obyektni oladi. <code>user.f()</code>da bu <code>user</code>, <code>admin.f()</code>da esa <code>admin</code>." },

        { h2: "Obyektsiz chaqiruv" },
        { p: "Agar funksiya obyektsiz, oddiygina chaqirilsa-chi? Bunday holatda qat'iy rejimda (<code>\"use strict\"</code>) <code>this</code> qiymati <code>undefined</code> bo'ladi:" },
        { pg: "\"use strict\";\n\nfunction sayHi() {\n  console.log(this);\n}\n\nsayHi(); // undefined (qat'iy rejimda)", file: "this-yolgiz.js" },
        { p: "Bunday kodda <code>this.name</code> yozsak, u xato beradi, chunki <code>undefined</code>ning xossasi yo'q. Qat'iy rejimsiz (eski kodda) <code>this</code> global obyektga teng bo'lardi — bu odatda xatolik belgisi." },
        { warn: "Metodni obyektsiz chaqirish odatda xatodir. <code>this</code>dan foydalanadigan funksiyani doim uning obyekti orqali (<code>obj.method()</code>) chaqiring." },

        { h2: "Strelka funksiyalarda \"this\" yo'q" },
        { p: "Strelka funksiyalari (<code>=&gt;</code>) maxsus: ularning O'Z <code>this</code>i <strong>yo'q</strong>. Strelka funksiyasi ichida <code>this</code> ishlatilsa, u <em>tashqi</em> (o'rab turgan) funksiyadan olinadi. Bu ba'zan juda foydali:" },
        { pg: "let user = {\n  firstName: \"Jaloliddin\",\n\n  sayHi() {\n    // strelka funksiya tashqi this'ni (user) oladi\n    let arrow = () => console.log(this.firstName);\n    arrow();\n  }\n};\n\nuser.sayHi(); // Jaloliddin", file: "strelka-this.js" },
        { p: "Bu yerda ichki strelka funksiyaning <code>this</code>i <code>sayHi</code> metodining <code>this</code>iga (ya'ni <code>user</code>ga) teng. Agar oddiy <code>function() {}</code> ishlatganimizda, ichki funksiya obyektsiz chaqirilib, <code>this</code> <code>undefined</code> bo'lardi." },
        { note: "Aynan shuning uchun obyekt metodi sifatida strelka funksiya YOZMANG: <code>{ sayHi: () =&gt; console.log(this.name) }</code> ishlamaydi, chunki strelka o'z <code>this</code>iga ega emas — u obyektni emas, tashqi (global) kontekstni oladi." },

        { h2: "Xulosa" },
        { ul: [
          "Obyekt xossasi qiymati funksiya bo'lsa, u <strong>metod</strong> deyiladi;",
          "Metodni <code>method()</code> yoki qisqartma bilan (<code>method() {...}</code>) yozish mumkin;",
          "Metod ichida <code>this</code> — \"joriy obyekt\", ya'ni chaqiruvda \"nuqtadan oldingi\" obyekt;",
          "<code>this</code> qiymati <strong>ish vaqtida</strong>, funksiya QANDAY chaqirilishiga qarab aniqlanadi;",
          "Obyektsiz chaqirilsa, qat'iy rejimda <code>this === undefined</code>;",
          "Strelka funksiyalarning o'z <code>this</code>i yo'q — ular tashqi <code>this</code>ni oladi; shuning uchun metod sifatida ishlatilmaydi."
        ] }
      ]
    }
  ]
};
