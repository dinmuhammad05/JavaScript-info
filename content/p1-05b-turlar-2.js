"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Ma'lumot turlari",
  lessons: [
    {
      slug: "massiv-metodlari",
      title: "Massiv metodlari",
      blurb: "Massivlarni boshqarish uchun eng muhim metodlar: qo'shish/o'chirish, qidirish, saralash, transformatsiya va reduce.",
      body: [
        { lead: "Massivlar ko'plab metodlarga ega. O'rganishni osonlashtirish uchun ularni guruhlarga ajratamiz: elementlarni qo'shish/o'chirish, qismini olish, qidirish, aylanib chiqish, saralash va massivni bitta qiymatga yig'ish (reduce)." },

        { h2: "Elementlarni qo'shish va o'chirish" },
        { p: "Massiv oxiri va boshi bilan ishlash uchun bir nechta metodni allaqachon bilamiz:" },
        { ul: [
          "<code>arr.push(...items)</code> — oxiriga element qo'shadi;",
          "<code>arr.pop()</code> — oxirgi elementni olib tashlaydi va qaytaradi;",
          "<code>arr.shift()</code> — birinchi elementni olib tashlaydi va qaytaradi;",
          "<code>arr.unshift(...items)</code> — boshiga element qo'shadi."
        ] },
        { p: "Endi eng kuchli metod — <code>splice</code> bilan tanishamiz. U massivning istalgan joyidan element o'chira oladi, qo'sha oladi va almashtira oladi." },
        { p: "Sintaksis: <code>arr.splice(start, deleteCount, elem1, ..., elemN)</code>. U <code>start</code> indeksidan boshlab <code>deleteCount</code> ta elementni o'chiradi va o'rniga <code>elem1..elemN</code> larni qo'yadi. O'chirilgan elementlardan iborat massivni qaytaradi." },
        { pg: "let arr = ['men', 'buni', 'o\\'rganaman'];\n\n// indeks 1 dan boshlab 1 ta elementni o'chiramiz\nlet olib = arr.splice(1, 1);\n\nconsole.log(JSON.stringify(arr));  // ['men', 'o\\'rganaman']\nconsole.log(JSON.stringify(olib)); // ['buni'] — o'chirilganlar qaytadi", file: "splice1.js" },
        { p: "<code>splice</code> ham o'chirib, ham o'rniga qo'ya oladi:" },
        { pg: "let arr = ['men', 'hozir', 'o\\'rganaman'];\n\n// 2 ta elementni o'chirib, 3 tasini qo'yamiz\narr.splice(0, 2, 'Keling', 'birga', 'biz');\n\nconsole.log(JSON.stringify(arr));\n// ['Keling', 'birga', 'biz', 'o\\'rganaman']", file: "splice2.js" },
        { p: "Agar <code>deleteCount</code> ni 0 qilsak, hech narsa o'chirilmaydi — faqat qo'shiladi:" },
        { pg: "let arr = ['men', 'o\\'rganaman'];\n\n// indeks 1 ga hech narsa o'chirmasdan qo'shamiz\narr.splice(1, 0, 'hozir', 'darhol');\n\nconsole.log(JSON.stringify(arr));\n// ['men', 'hozir', 'darhol', 'o\\'rganaman']", file: "splice3.js" },
        { note: "<code>start</code> manfiy bo'lishi mumkin. Bu holda u oxiridan sanaladi: <code>-1</code> — oxirgi element, <code>-2</code> — oxiridan bittasi va hokazo." },

        { h2: "slice — qismini nusxalash" },
        { p: "Metod <code>arr.slice(start, end)</code> massivning <code>start</code> dan <code>end</code> gacha (<code>end</code> o'z ichiga olmaydi) bo'lgan qismini <strong>yangi massiv</strong> qilib qaytaradi. Asl massivni o'zgartirmaydi." },
        { pg: "let arr = ['a', 'b', 'c', 'd', 'e'];\n\nconsole.log(JSON.stringify(arr.slice(1, 3))); // ['b', 'c']\nconsole.log(JSON.stringify(arr.slice(-2)));   // ['d', 'e']\nconsole.log(JSON.stringify(arr.slice()));     // butun nusxa\nconsole.log(JSON.stringify(arr));             // asl massiv o'zgarmadi", file: "slice.js" },
        { tip: "Argumentsiz <code>arr.slice()</code> massivning to'liq (sayoz) nusxasini yaratishning eng qulay usuli hisoblanadi." },

        { h2: "concat — massivlarni birlashtirish" },
        { p: "Metod <code>arr.concat(...args)</code> asl massiv elementlarini va argument sifatida berilgan qiymatlarni birlashtirib, <strong>yangi</strong> massiv qaytaradi." },
        { pg: "let arr = [1, 2];\n\nconsole.log(JSON.stringify(arr.concat([3, 4])));       // [1, 2, 3, 4]\nconsole.log(JSON.stringify(arr.concat([3, 4], [5]))); // [1, 2, 3, 4, 5]\nconsole.log(JSON.stringify(arr.concat(3, 4)));        // [1, 2, 3, 4]\nconsole.log(JSON.stringify(arr));                     // asl o'zgarmadi", file: "concat.js" },
        { note: "Agar argument massiv bo'lsa, uning elementlari alohida-alohida qo'shiladi. Agar oddiy qiymat bo'lsa, o'zi qo'shiladi." },

        { h2: "forEach — har bir element bo'yicha yurish" },
        { p: "Metod <code>arr.forEach(funksiya)</code> massivning har bir elementi uchun berilgan funksiyani chaqiradi. U hech narsa qaytarmaydi (<code>undefined</code>)." },
        { pg: "['Olma', 'Anor', 'Uzum'].forEach(function(item, index, array) {\n  console.log(index + ': ' + item + ' (uzunlik: ' + array.length + ')');\n});\n// 0: Olma (uzunlik: 3)\n// 1: Anor (uzunlik: 3)\n// 2: Uzum (uzunlik: 3)", file: "foreach.js" },
        { p: "Funksiya uch argument oladi: <code>(item, index, array)</code> — element qiymati, uning indeksi va massivning o'zi. Ko'pincha faqat birinchi ikkisi kerak bo'ladi." },

        { h2: "Massivda qidirish: indexOf, includes, find, findIndex" },
        { p: "Metod <code>arr.indexOf(item)</code> elementni boshidan qidiradi va topilsa indeksini, topilmasa <code>-1</code> ni qaytaradi. <code>arr.lastIndexOf(item)</code> esa oxiridan qidiradi." },
        { p: "Metod <code>arr.includes(item)</code> element mavjud bo'lsa <code>true</code>, aks holda <code>false</code> qaytaradi — mavjudlikni tekshirish uchun qulay." },
        { pg: "let arr = [1, 0, false, NaN];\n\nconsole.log(arr.indexOf(0));       // 1\nconsole.log(arr.indexOf(false));   // 2\nconsole.log(arr.indexOf(null));    // -1 (yo'q)\nconsole.log(arr.includes(1));      // true\n\n// muhim farq: indexOf NaN ni topa olmaydi, includes topadi\nconsole.log(arr.indexOf(NaN));     // -1\nconsole.log(arr.includes(NaN));    // true", file: "indexof.js" },
        { warn: "<code>indexOf</code> tenglikni <code>===</code> orqali tekshiradi, shuning uchun <code>NaN</code> ni hech qachon topa olmaydi. Bunday holatda <code>includes</code> ishlatiladi." },
        { p: "Ba'zan shart bo'yicha (masalan, ma'lum xususiyatga ega obyektni) qidirish kerak bo'ladi. Bunda <code>arr.find(funksiya)</code> yordam beradi — u funksiya birinchi marta <code>true</code> qaytargan elementni beradi." },
        { pg: "let users = [\n  { id: 1, name: 'Ali' },\n  { id: 2, name: 'Vali' },\n  { id: 3, name: 'Guli' }\n];\n\nlet user = users.find(function(item) {\n  return item.id === 2;\n});\n\nconsole.log(user.name);  // Vali\n\n// findIndex esa elementning o'zini emas, indeksini qaytaradi\nlet idx = users.findIndex(function(item) {\n  return item.id === 3;\n});\nconsole.log(idx);  // 2", file: "find.js" },
        { note: "<code>find</code> mos element topilmasa <code>undefined</code>, <code>findIndex</code> esa <code>-1</code> qaytaradi. <code>findLastIndex</code> oxiridan qidiradi." },

        { h2: "filter — shartga mos elementlarni saralash" },
        { p: "<code>find</code> bitta element qaytaradi. Agar shartga mos <strong>barcha</strong> elementlar kerak bo'lsa, <code>arr.filter(funksiya)</code> ishlatiladi. U funksiya <code>true</code> qaytargan barcha elementlardan yangi massiv tuzadi." },
        { pg: "let sonlar = [1, 2, 3, 4, 5, 6];\n\nlet juftlar = sonlar.filter(function(son) {\n  return son % 2 === 0;\n});\n\nconsole.log(JSON.stringify(juftlar)); // [2, 4, 6]", file: "filter.js" },

        { h2: "map — har bir elementni o'zgartirish" },
        { p: "Metod <code>arr.map(funksiya)</code> — massivlar bilan ishlashda eng ko'p ishlatiladigan metodlardan biri. U har bir elementga funksiyani qo'llaydi va natijalardan <strong>yangi</strong> massiv qaytaradi." },
        { pg: "let sozlar = ['Olma', 'Anor', 'Uzum'];\n\nlet uzunliklar = sozlar.map(function(soz) {\n  return soz.length;\n});\nconsole.log(JSON.stringify(uzunliklar)); // [4, 4, 4]\n\nlet katta = sozlar.map(function(soz) {\n  return soz.toUpperCase();\n});\nconsole.log(JSON.stringify(katta)); // ['OLMA', 'ANOR', 'UZUM']", file: "map.js" },

        { h2: "sort — saralash (taqqoslash funksiyasi bilan!)" },
        { p: "Metod <code>arr.sort()</code> massivni <strong>o'z joyida</strong> (asl massivni o'zgartirib) saralaydi va o'zini qaytaradi. Ammo muhim tuzoq bor:" },
        { warn: "Standart holatda <code>sort</code> elementlarni <strong>satr (string)</strong> sifatida saralaydi! Shuning uchun <code>[1, 2, 15]</code> emas, balki <code>[1, 15, 2]</code> chiqadi — chunki <code>'15' &lt; '2'</code> (lug'aviy taqqoslash)." },
        { pg: "let arr = [1, 2, 15];\n\narr.sort();\nconsole.log(JSON.stringify(arr)); // [1, 15, 2] — NOTO'G'RI kutilsa", file: "sort-bad.js" },
        { p: "To'g'ri saralash uchun <code>sort</code> ga <strong>taqqoslash funksiyasi</strong> beriladi. U ikki argument <code>(a, b)</code> oladi va: <code>a</code> avval kelishi kerak bo'lsa manfiy son, <code>b</code> avval kelishi kerak bo'lsa musbat son, teng bo'lsa 0 qaytarishi kerak." },
        { pg: "let arr = [1, 2, 15];\n\narr.sort(function(a, b) {\n  if (a > b) return 1;\n  if (a < b) return -1;\n  return 0;\n});\nconsole.log(JSON.stringify(arr)); // [1, 2, 15] — to'g'ri!", file: "sort-good.js" },
        { p: "Sonlar uchun qisqartirilgan usul — shunchaki ayirmani qaytarish. Kamayish tartibi uchun argumentlarni almashtiring:" },
        { pg: "let arr = [3, 1, 15, 2, 10];\n\n// o'sish tartibi\narr.sort(function(a, b) { return a - b; });\nconsole.log(JSON.stringify(arr)); // [1, 2, 3, 10, 15]\n\n// kamayish tartibi\narr.sort(function(a, b) { return b - a; });\nconsole.log(JSON.stringify(arr)); // [15, 10, 3, 2, 1]", file: "sort-num.js" },
        { tip: "Satrlarni tilga mos (masalan, o'zbekcha yoki lotincha harflar) tartibda saralash uchun <code>str.localeCompare</code> dan foydalaning: <code>arr.sort((a, b) =&gt; a.localeCompare(b))</code>." },

        { h2: "reverse, split va join" },
        { p: "Metod <code>arr.reverse()</code> massiv elementlarini teskari tartibda qo'yadi (o'z joyida)." },
        { pg: "let arr = [1, 2, 3, 4, 5];\narr.reverse();\nconsole.log(JSON.stringify(arr)); // [5, 4, 3, 2, 1]", file: "reverse.js" },
        { p: "Metod <code>str.split(delim)</code> satrni berilgan ajratuvchi bo'yicha massivga bo'ladi. Aksincha, <code>arr.join(glue)</code> massiv elementlarini yopishtirib satr hosil qiladi." },
        { pg: "let str = 'Ali, Vali, Guli';\n\nlet arr = str.split(', ');\nconsole.log(JSON.stringify(arr)); // ['Ali', 'Vali', 'Guli']\nconsole.log(arr.length);          // 3\n\nlet yana = arr.join(' - ');\nconsole.log(yana); // Ali - Vali - Guli", file: "split-join.js" },
        { note: "<code>str.split('')</code> (bo'sh satr bilan) satrni harflarga ajratadi. <code>split</code> ga ikkinchi argument sifatida limit berish mumkin — natija massivi uzunligini cheklaydi." },

        { h2: "reduce va reduceRight — massivni bitta qiymatga yig'ish" },
        { p: "Ba'zan massiv asosida bitta qiymat hisoblash kerak: yig'indi, eng katta element, obyekt va hokazo. Buning uchun <code>arr.reduce</code> ishlatiladi." },
        { p: "Sintaksis: <code>arr.reduce(function(akkumulyator, item, index, array) { ... }, boshlang'ich)</code>. Funksiya har bir element uchun chaqiriladi va uning natijasi keyingi chaqiruvga <code>akkumulyator</code> bo'lib uzatiladi." },
        { pg: "let arr = [1, 2, 3, 4, 5];\n\nlet yigindi = arr.reduce(function(sum, current) {\n  return sum + current;\n}, 0); // boshlang'ich qiymat 0\n\nconsole.log(yigindi); // 15", file: "reduce1.js" },
        { p: "Ishlash bosqichma-bosqich (boshlang'ich = 0): 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15." },
        { pg: "// eng katta elementni topamiz\nlet arr = [5, 12, 8, 130, 44];\n\nlet max = arr.reduce(function(a, b) {\n  return a > b ? a : b;\n});\nconsole.log(max); // 130", file: "reduce2.js" },
        { warn: "Agar boshlang'ich qiymat berilmasa, <code>reduce</code> birinchi elementni boshlang'ich sifatida oladi va ikkinchidan boshlaydi. <strong>Bo'sh massivda</strong> boshlang'ichsiz <code>reduce</code> xatolik beradi! Shuning uchun ko'p hollarda boshlang'ich qiymatni berish tavsiya etiladi." },
        { p: "<code>arr.reduceRight</code> xuddi shunday ishlaydi, lekin massivni <strong>o'ngdan chapga</strong> aylanib chiqadi." },

        { h2: "Array.isArray — massivmi yoki yo'q?" },
        { p: "Massivlar alohida tur emas, ular <code>object</code> turiga asoslangan. Shuning uchun <code>typeof</code> massivni obyektdan ajrata olmaydi:" },
        { pg: "console.log(typeof {});        // object\nconsole.log(typeof []);        // object (ham!)\n\n// to'g'ri tekshirish:\nconsole.log(Array.isArray({})); // false\nconsole.log(Array.isArray([])); // true", file: "isarray.js" },
        { tip: "Ko'p metodlar (masalan <code>sort</code>, <code>find</code>, <code>filter</code>) funksiyaga qo'shimcha <code>thisArg</code> argumentini qabul qiladi — u funksiya ichidagi <code>this</code> ni belgilaydi. Amalda arrow funksiyalar bilan bu deyarli kerak bo'lmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Qo'shish/o'chirish: <code>push/pop</code>, <code>shift/unshift</code>, universal <code>splice</code>;",
          "Qismini olish: <code>slice</code>; birlashtirish: <code>concat</code>;",
          "Aylanib chiqish: <code>forEach</code>;",
          "Qidirish: <code>indexOf/lastIndexOf</code>, <code>includes</code>, <code>find/findIndex</code>;",
          "Transformatsiya: <code>filter</code> (saralab olish), <code>map</code> (o'zgartirish), <code>sort</code> (albatta taqqoslash funksiyasi bilan!), <code>reverse</code>;",
          "Satr bilan bog'liq: <code>split</code> va <code>join</code>;",
          "Yig'ish: <code>reduce/reduceRight</code>;",
          "Tekshirish: <code>Array.isArray</code>."
        ] }
      ]
    },

    {
      slug: "iterable",
      title: "Iteratsiyalanuvchi obyektlar (iterable)",
      blurb: "for..of qanday ishlaydi, Symbol.iterator, o'z iterable obyektingni yaratish, Array.from.",
      body: [
        { lead: "Iteratsiyalanuvchi (iterable) obyektlar — massiv tushunchasining umumlashtirilgan ko'rinishi. Bu <code>for..of</code> siklida ishlatib bo'ladigan har qanday obyekt. Massivlar, satrlar va boshqa ko'p tuzilmalar iterable hisoblanadi." },

        { h2: "Muammo: o'z obyektimizni iterable qilish" },
        { p: "Aytaylik, bizda massiv emas, oddiy obyekt bor, lekin uni <code>for..of</code> bilan aylanib chiqmoqchimiz. Masalan, <code>from</code> dan <code>to</code> gacha sonlar diapazoni:" },
        { code: "let range = {\n  from: 1,\n  to: 5\n};\n\n// biz shuni istaymiz:\n// for (let num of range) ... 1, 2, 3, 4, 5" },
        { p: "Buni ishlashi uchun obyektga maxsus metod — <code>Symbol.iterator</code> qo'shishimiz kerak." },

        { h2: "Symbol.iterator" },
        { p: "<code>Symbol.iterator</code> — maxsus o'rnatilgan simvol. U obyektning iteratsiyasini boshqaradigan metod nomi bo'lib xizmat qiladi. Ushbu metod <strong>iterator</strong> deb ataladigan obyekt qaytarishi kerak — unda <code>next()</code> metodi bo'ladi." },
        { p: "<code>next()</code> chaqirilganda <code>{ value: ..., done: ... }</code> ko'rinishidagi obyekt qaytaradi. <code>done: false</code> — iteratsiya davom etadi, <code>done: true</code> — tugadi." },
        { pg: "let range = {\n  from: 1,\n  to: 5\n};\n\nrange[Symbol.iterator] = function() {\n  let current = this.from;\n  let last = this.to;\n\n  // iterator obyektni qaytaramiz\n  return {\n    next() {\n      if (current <= last) {\n        return { done: false, value: current++ };\n      } else {\n        return { done: true, value: undefined };\n      }\n    }\n  };\n};\n\nlet natija = [];\nfor (let num of range) {\n  natija.push(num);\n}\nconsole.log(JSON.stringify(natija)); // [1, 2, 3, 4, 5]", file: "iterator.js" },
        { note: "Bu yerda <strong>vazifalar taqsimlanganiga</strong> e'tibor bering: <code>range</code> obyektining o'zida <code>next</code> yo'q. Uning o'rniga <code>Symbol.iterator</code> chaqiruvi bilan alohida iterator obyekt yaratiladi va aynan u iteratsiyani boshqaradi. Shu tufayli bir obyekt bo'yicha bir vaqtda bir nechta mustaqil <code>for..of</code> ishlashi mumkin." },

        { h2: "for..of aslida qanday ishlaydi?" },
        { p: "<code>for (let x of obj)</code> ishga tushganda quyidagilar sodir bo'ladi:" },
        { ol: [
          "<code>obj[Symbol.iterator]()</code> bir marta chaqiriladi — u iterator obyektni qaytaradi (bo'lmasa xatolik).",
          "Keyin har bir qadamda iteratorning <code>next()</code> metodi chaqiriladi.",
          "<code>next()</code> qaytargan natijaning <code>value</code> qiymati <code>x</code> ga yoziladi.",
          "Agar <code>done: true</code> bo'lsa, sikl to'xtaydi. Aks holda <code>value</code> ishlatiladi va keyingi <code>next()</code> chaqiriladi."
        ] },
        { p: "Iteratorni qo'lda ham chaqirsak bo'ladi, bu jarayonni oydinlashtiradi:" },
        { pg: "let range = { from: 1, to: 3 };\nrange[Symbol.iterator] = function() {\n  let current = this.from;\n  let last = this.to;\n  return {\n    next() {\n      return current <= last\n        ? { done: false, value: current++ }\n        : { done: true, value: undefined };\n    }\n  };\n};\n\nlet iterator = range[Symbol.iterator]();\nconsole.log(JSON.stringify(iterator.next())); // {\"done\":false,\"value\":1}\nconsole.log(JSON.stringify(iterator.next())); // {\"done\":false,\"value\":2}\nconsole.log(JSON.stringify(iterator.next())); // {\"done\":false,\"value\":3}\nconsole.log(JSON.stringify(iterator.next())); // {\"done\":true}", file: "manual-iter.js" },

        { h2: "String ham iterable" },
        { p: "Massivlar va satrlar — eng ko'p ishlatiladigan o'rnatilgan iterable'lar. <code>for..of</code> satr bo'yicha harfma-harf yuradi va u <strong>surrogat juftliklar</strong> (masalan, ba'zi emoji va maxsus belgilar) bilan ham to'g'ri ishlaydi." },
        { pg: "let str = 'salom';\n\nlet harflar = [];\nfor (let harf of str) {\n  harflar.push(harf);\n}\nconsole.log(JSON.stringify(harflar)); // ['s','a','l','o','m']", file: "string-iter.js" },

        { h2: "Array.from — har qanday iterable'ni massivga aylantirish" },
        { p: "Global metod <code>Array.from(obj)</code> iterable yoki <em>massivsimon</em> obyektni oladi va undan haqiqiy massiv yasaydi. Shundan so'ng unda barcha massiv metodlarini ishlatish mumkin." },
        { pg: "let range = { from: 1, to: 5 };\nrange[Symbol.iterator] = function() {\n  let current = this.from;\n  let last = this.to;\n  return {\n    next() {\n      return current <= last\n        ? { done: false, value: current++ }\n        : { done: true };\n    }\n  };\n};\n\nlet arr = Array.from(range);\nconsole.log(JSON.stringify(arr)); // [1, 2, 3, 4, 5]\nconsole.log(arr.pop());          // 5 — endi massiv metodlari mavjud", file: "array-from.js" },
        { p: "<code>Array.from</code> ixtiyoriy ikkinchi argument — <em>map</em> funksiyasini oladi. Har bir element massivga qo'shilishdan oldin shu funksiyadan o'tadi:" },
        { pg: "let range = { from: 1, to: 5 };\nrange[Symbol.iterator] = function() {\n  let current = this.from;\n  let last = this.to;\n  return {\n    next() {\n      return current <= last\n        ? { done: false, value: current++ }\n        : { done: true };\n    }\n  };\n};\n\nlet kvadratlar = Array.from(range, function(num) {\n  return num * num;\n});\nconsole.log(JSON.stringify(kvadratlar)); // [1, 4, 9, 16, 25]", file: "array-from-map.js" },
        { note: "<strong>Massivsimon (array-like)</strong> obyekt — bu indeks (<code>0, 1, 2...</code>) va <code>length</code> xususiyatiga ega, lekin <code>Symbol.iterator</code> ga ega bo'lmagan obyekt. <code>Array.from</code> ham iterable, ham massivsimon obyektlar bilan ishlaydi — bu uning katta afzalligi." },
        { pg: "// massivsimon obyekt (iterable EMAS, lekin length bor)\nlet arrayLike = {\n  0: 'Salom',\n  1: 'Dunyo',\n  length: 2\n};\n\nlet arr = Array.from(arrayLike);\nconsole.log(JSON.stringify(arr)); // ['Salom', 'Dunyo']", file: "array-like.js" },
        { tip: "Satrni harflar massiviga aylantirishning eng ishonchli usuli — <code>Array.from(str)</code>. U <code>str.split('')</code> dan farqli o'laroq murakkab Unicode belgilarni ham to'g'ri ajratadi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Iterable</strong> — <code>Symbol.iterator</code> metodini amalga oshirgan obyekt; uni <code>for..of</code> bilan aylanib chiqish mumkin;",
          "<code>Symbol.iterator</code> <code>next()</code> metodiga ega <strong>iterator</strong> qaytaradi;",
          "<code>next()</code> har chaqiruvda <code>{ value, done }</code> qaytaradi; <code>done: true</code> — tugash belgisi;",
          "Massiv va satr — o'rnatilgan iterable'lar; satr Unicode belgilarni to'g'ri aylanadi;",
          "<code>Array.from(obj)</code> iterable yoki massivsimon obyektni haqiqiy massivga aylantiradi (ixtiyoriy map funksiyasi bilan)."
        ] }
      ]
    },

    {
      slug: "map-set",
      title: "Map va Set",
      blurb: "Map — istalgan kalitli assotsiativ to'plam; Set — unikal qiymatlar to'plami. Obyektdan farqi va iteratsiya.",
      body: [
        { lead: "Endi biz murakkabroq ma'lumot tuzilmalari bilan tanishamiz: <strong>Map</strong> (kalit-qiymat juftliklari to'plami, kalit istalgan tur bo'lishi mumkin) va <strong>Set</strong> (faqat unikal qiymatlar to'plami)." },

        { h2: "Map — nima uchun kerak?" },
        { p: "<code>Map</code> — xuddi <code>Object</code> kabi kalit-qiymat juftliklarini saqlaydi. Ammo <code>Object</code> dan farqli o'laroq, <code>Map</code> da kalit <strong>istalgan turdagi</strong> qiymat — hatto obyekt yoki funksiya — bo'lishi mumkin." },
        { p: "Asosiy metodlar va xususiyatlar:" },
        { ul: [
          "<code>new Map()</code> — yangi Map yaratadi;",
          "<code>map.set(kalit, qiymat)</code> — qiymat qo'shadi (map ning o'zini qaytaradi, zanjir qilish mumkin);",
          "<code>map.get(kalit)</code> — kalit bo'yicha qiymatni oladi (yo'q bo'lsa <code>undefined</code>);",
          "<code>map.has(kalit)</code> — kalit mavjudligini <code>true/false</code> bilan qaytaradi;",
          "<code>map.delete(kalit)</code> — kalit bo'yicha o'chiradi;",
          "<code>map.clear()</code> — hamma narsani tozalaydi;",
          "<code>map.size</code> — elementlar soni (bu xususiyat, funksiya emas!)."
        ] },
        { pg: "let map = new Map();\n\nmap.set('1', 'satr 1');   // satr kalit\nmap.set(1, 'son 1');       // son kalit\nmap.set(true, 'mantiqiy');  // boolean kalit\n\n// Object bo'lganda 1 va '1' bir xil ('1') bo'lardi, Map da EMAS:\nconsole.log(map.get(1));   // 'son 1'\nconsole.log(map.get('1')); // 'satr 1'\nconsole.log(map.size);     // 3\nconsole.log(map.has(true)); // true", file: "map-basic.js" },
        { warn: "<code>map[kalit]</code> shaklida foydalanmang! Bu <code>Map</code> ni oddiy obyektdek ishlatadi va uning barcha afzalliklarini yo'qotadi. Har doim <code>map.set</code> va <code>map.get</code> dan foydalaning." },

        { h2: "Obyektni kalit sifatida ishlatish" },
        { p: "<code>Map</code> ning eng foydali xususiyatlaridan biri — obyektlarni kalit sifatida ishlatish. Bu oddiy obyektda mumkin emas (obyekt kaliti satrga aylanib qoladi)." },
        { pg: "let ali = { name: 'Ali' };\n\n// har bir foydalanuvchi uchun tashriflar sonini saqlaymiz\nlet tashriflar = new Map();\ntashriflar.set(ali, 123);\n\nconsole.log(tashriflar.get(ali)); // 123\n\n// oddiy obyektda esa kalit '[object Object]' ga aylanardi\nlet obj = {};\nobj[ali] = 123;\nconsole.log(Object.keys(obj)); // ['[object Object]'] — yomon!", file: "map-object-key.js" },
        { note: "<code>Map</code> kalitlarni <code>SameValueZero</code> algoritmi bo'yicha taqqoslaydi. U <code>===</code> ga o'xshaydi, ammo bitta farq bilan: <code>NaN</code> ning o'ziga tengligini tan oladi, ya'ni <code>NaN</code> ham kalit bo'la oladi." },

        { h2: "Zanjir va iteratsiya" },
        { p: "<code>map.set</code> map ning o'zini qaytargani uchun chaqiruvlarni zanjir qilish mumkin:" },
        { pg: "let map = new Map();\n\nmap.set('1', 'a')\n   .set('2', 'b')\n   .set('3', 'c');\n\nconsole.log(map.size); // 3", file: "map-chain.js" },
        { p: "Map bo'yicha aylanish uchun uch xil usul bor:" },
        { ul: [
          "<code>map.keys()</code> — kalitlar bo'yicha iterable qaytaradi;",
          "<code>map.values()</code> — qiymatlar bo'yicha iterable;",
          "<code>map.entries()</code> — <code>[kalit, qiymat]</code> juftliklari bo'yicha iterable (<code>for..of</code> uchun standart)."
        ] },
        { pg: "let ovqat = new Map([\n  ['osh', 500],\n  ['manti', 300],\n  ['somsa', 100]\n]);\n\n// kalitlar\nfor (let nom of ovqat.keys()) {\n  console.log(nom); // osh, manti, somsa\n}\n\n// qiymatlar\nfor (let narx of ovqat.values()) {\n  console.log(narx); // 500, 300, 100\n}\n\n// [kalit, qiymat] juftliklari\nfor (let [nom, narx] of ovqat) {\n  console.log(nom + ': ' + narx);\n}", file: "map-iterate.js" },
        { tip: "<code>Map</code> qo'shish tartibini <strong>saqlaydi</strong>! Oddiy obyektdan farqli o'laroq (unda son kalitlar avtomatik saralanadi), Map elementlar qanday tartibda qo'shilgan bo'lsa, o'sha tartibda aylanadi." },
        { p: "Map da ham <code>forEach</code> mavjud, xuddi massivdagidek:" },
        { pg: "let ovqat = new Map([['osh', 500], ['manti', 300]]);\n\novqat.forEach(function(qiymat, kalit, map) {\n  console.log(kalit + ' => ' + qiymat);\n});\n// osh => 500\n// manti => 300", file: "map-foreach.js" },

        { h2: "Object bilan bog'liqlik: Object.entries va Object.fromEntries" },
        { p: "Map yaratishda uni ikki elementli massivlar massivi bilan to'ldirish mumkin. Aynan shu format <code>Object.entries(obj)</code> tomonidan qaytariladi. Shu tufayli oddiy obyektdan Map yasash oson:" },
        { pg: "let obj = {\n  name: 'Ali',\n  age: 30\n};\n\n// obyektdan Map\nlet map = new Map(Object.entries(obj));\nconsole.log(map.get('name')); // Ali\nconsole.log(map.size);        // 2", file: "map-from-obj.js" },
        { p: "Aksincha yo'nalish — <code>Object.fromEntries</code> — kalit/qiymat juftliklaridan oddiy obyekt yasaydi:" },
        { pg: "let map = new Map();\nmap.set('banan', 1);\nmap.set('olma', 2);\nmap.set('apelsin', 4);\n\n// Map -> oddiy obyekt\nlet obj = Object.fromEntries(map.entries());\n// .entries() ni tushirib ham qoldirsa bo'ladi, chunki Map iterable:\n// let obj = Object.fromEntries(map);\n\nconsole.log(JSON.stringify(obj)); // {\"banan\":1,\"olma\":2,\"apelsin\":4}\nconsole.log(obj.olma);            // 2", file: "map-to-obj.js" },

        { h2: "Set — unikal qiymatlar to'plami" },
        { p: "<code>Set</code> — qiymatlarning maxsus turdagi to'plami bo'lib, unda har bir qiymat faqat <strong>bir marta</strong> uchraydi. Kalit yo'q — faqat qiymatlar." },
        { ul: [
          "<code>new Set(iterable)</code> — Set yaratadi (ixtiyoriy iterable bilan to'ldiradi);",
          "<code>set.add(qiymat)</code> — qiymat qo'shadi (set ni qaytaradi);",
          "<code>set.delete(qiymat)</code> — o'chiradi;",
          "<code>set.has(qiymat)</code> — mavjudligini tekshiradi;",
          "<code>set.clear()</code> — tozalaydi;",
          "<code>set.size</code> — elementlar soni."
        ] },
        { pg: "let set = new Set();\n\nlet ali = { name: 'Ali' };\nlet vali = { name: 'Vali' };\n\n// ali ikki marta tashrif buyurdi\nset.add(ali);\nset.add(vali);\nset.add(ali);\nset.add(vali);\n\n// Set faqat unikal qiymatlarni saqlaydi\nconsole.log(set.size); // 2", file: "set-basic.js" },
        { p: "Set ning eng ko'p uchraydigan qo'llanilishi — massivdan takrorlarni olib tashlash:" },
        { pg: "let arr = [1, 2, 2, 3, 3, 3, 4];\n\n// Set unikal qiladi, so'ng qaytadan massivga aylantiramiz\nlet unikal = Array.from(new Set(arr));\nconsole.log(JSON.stringify(unikal)); // [1, 2, 3, 4]", file: "set-unique.js" },
        { p: "Set ham iterable — <code>for..of</code> yoki <code>forEach</code> bilan aylanish mumkin. U ham qo'shish tartibini saqlaydi:" },
        { pg: "let set = new Set(['olma', 'anor', 'uzum']);\n\nfor (let meva of set) {\n  console.log(meva); // olma, anor, uzum\n}\n\nset.forEach(function(qiymat) {\n  console.log(qiymat.toUpperCase());\n});", file: "set-iterate.js" },
        { note: "Moslik uchun Set da ham <code>keys()</code>, <code>values()</code>, <code>entries()</code> mavjud. Set da kalit yo'qligi sababli <code>keys()</code> va <code>values()</code> bir xil natija beradi, <code>entries()</code> esa <code>[qiymat, qiymat]</code> juftliklarini qaytaradi." },

        { h2: "Map/Set ni Object/Array bilan qachon ishlatish kerak?" },
        { ul: [
          "Kalit istalgan tur (obyekt, son) bo'lsa yoki qo'shish tartibi muhim bo'lsa — <code>Map</code>;",
          "Tez-tez qo'shish/o'chirish va <code>size</code> ni bilish kerak bo'lsa — <code>Map</code> qulayroq;",
          "Faqat unikal qiymatlar to'plami kerak bo'lsa yoki mavjudlikni tez tekshirish kerak bo'lsa — <code>Set</code>;",
          "Oddiy, JSON ga oson aylanadigan tuzilma yetarli bo'lsa — <code>Object/Array</code>."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<code>Map</code> — istalgan turdagi kalitli kalit-qiymat to'plami; <code>set/get/has/delete/size</code>;",
          "<code>Map</code> qo'shish tartibini saqlaydi va obyekt kalitlarni qo'llab-quvvatlaydi;",
          "Iteratsiya: <code>keys()</code>, <code>values()</code>, <code>entries()</code>, <code>forEach</code>;",
          "<code>Object.entries</code> obyektdan Map, <code>Object.fromEntries</code> Map dan obyekt yasashga yordam beradi;",
          "<code>Set</code> — faqat unikal qiymatlar to'plami; takrorlarni olib tashlash uchun ideal;",
          "Ikkalasi ham iterable — <code>for..of</code> bilan ishlaydi."
        ] }
      ]
    },

    {
      slug: "weakmap-weakset",
      title: "WeakMap va WeakSet",
      blurb: "Kuchsiz havolalar, faqat obyekt kalitlar, iteratsiya yo'qligi va amaliy qo'llanishi (kesh, qo'shimcha ma'lumot).",
      body: [
        { lead: "<code>WeakMap</code> va <code>WeakSet</code> — Map va Set ning \"kuchsiz\" (weak) versiyalari. Ular xotira boshqaruvida muhim rol o'ynaydi va bir necha jiddiy cheklovga ega. Avval JavaScript qanday qilib keraksiz obyektlarni xotiradan tozalashini eslaylik." },

        { h2: "Erishuvchanlik va axlat yig'uvchi (garbage collector)" },
        { p: "JavaScript dvigateli xotirani avtomatik boshqaradi. Obyekt xotirada saqlanadi, chunki unga <strong>havola</strong> (reference) bor. Havolasi qolmagan (erishib bo'lmaydigan) obyekt \"axlat\" hisoblanadi va xotiradan tozalanadi." },
        { pg: "let ali = { name: 'Ali' };\n\n// hozir ali obyektiga havola bor\nali = null;\n\n// endi obyektga hech qanday havola qolmadi\n// -> u axlat yig'uvchi tomonidan o'chiriladi\nconsole.log('obyekt endi erishib bo\\'lmaydigan holatda');", file: "gc.js" },
        { p: "Muhim jihat: oddiy <code>Map</code> yoki <code>Set</code> o'z kalit/qiymatlariga havolani <strong>kuchli</strong> saqlaydi. Ya'ni, agar obyekt Map da kalit bo'lsa, boshqa hamma joyda havola yo'qolsa ham, Map uni ushlab turadi va xotiradan tozalanmaydi." },

        { h2: "WeakMap kuchsiz havola saqlaydi" },
        { p: "<code>WeakMap</code> aynan shu bilan farq qiladi: u kalit-obyektga <strong>kuchsiz</strong> havola saqlaydi. Agar obyektga boshqa havola qolmasa, u WeakMap da kalit bo'lishiga qaramay, xotiradan tozalanadi (va WeakMap dan ham avtomatik yo'qoladi)." },
        { pg: "let weakMap = new WeakMap();\n\nlet obj = { data: 'muhim' };\nweakMap.set(obj, 'qo\\'shimcha ma\\'lumot');\n\nconsole.log(weakMap.has(obj)); // true\nconsole.log(weakMap.get(obj)); // 'qo'shimcha ma'lumot'\n\nobj = null;\n// obj ga havola yo'qoldi -> axlat yig'uvchi kalitni ham,\n// WeakMap dagi yozuvni ham avtomatik tozalaydi", file: "weakmap-basic.js" },

        { h2: "Jiddiy cheklovlar" },
        { p: "Kuchsiz havolalar tabiati tufayli <code>WeakMap</code> juda cheklangan:" },
        { ul: [
          "Kalit <strong>faqat obyekt</strong> (yoki simvol) bo'lishi mumkin — primitiv (satr, son) kalit qilib bo'lmaydi;",
          "Metodlari faqat: <code>get</code>, <code>set</code>, <code>has</code>, <code>delete</code>;",
          "<code>size</code> xususiyati <strong>yo'q</strong>;",
          "Iteratsiya <strong>mumkin emas</strong> — <code>keys()</code>, <code>values()</code>, <code>entries()</code>, <code>forEach</code> yo'q."
        ] },
        { warn: "Nima uchun iteratsiya taqiqlangan? Chunki axlat yig'uvchi qachon ishlashi noaniq — obyekt hozir tozalanganmi yoki yo'qmi, bilib bo'lmaydi. Shuning uchun WeakMap dagi barcha elementlarni ro'yxatlashning aniq usuli yo'q va bunday metodlar berilmaydi." },
        { pg: "let weakMap = new WeakMap();\nlet obj = {};\n\nweakMap.set(obj, 'ma\\'lumot');\n\n// bularning barchasi ishlaydi:\nconsole.log(weakMap.has(obj)); // true\nconsole.log(weakMap.get(obj)); // 'ma'lumot'\n\n// bularni ishlatib bo'lmaydi (WeakMap da yo'q):\nconsole.log(weakMap.size);            // undefined\nconsole.log(typeof weakMap.forEach);  // undefined\nconsole.log(typeof weakMap.keys);     // undefined", file: "weakmap-limits.js" },
        { warn: "Primitivni kalit qilishga urinish xatolik beradi: <code>weakMap.set('satr', 1)</code> — TypeError. WeakMap kaliti majburan obyekt bo'lishi kerak." },

        { h2: "Qo'llanish 1: qo'shimcha ma'lumot saqlash" },
        { p: "WeakMap ning asosiy foydasi — <strong>begona obyektga tegib ketmasdan</strong> unga qo'shimcha ma'lumot bog'lash. Masalan, tashqi kutubxona bergan obyektlar uchun tashriflar sonini hisoblaymiz:" },
        { pg: "let tashriflar = new WeakMap();\n\nfunction hisobla(user) {\n  let soni = tashriflar.get(user) || 0;\n  tashriflar.set(user, soni + 1);\n}\n\nlet ali = { name: 'Ali' };\nhisobla(ali);\nhisobla(ali);\nhisobla(ali);\n\nconsole.log(tashriflar.get(ali)); // 3\n\n// ali boshqa kerak bo'lmasa (ali = null),\n// hisob ma'lumoti ham avtomatik tozalanadi — xotira sizmaydi", file: "weakmap-usecase.js" },
        { p: "Agar bu yerda oddiy <code>Map</code> ishlatilsa, foydalanuvchi obyekti dasturda o'chirilganda ham Map undagi yozuvni ushlab turardi. Bu <em>xotira sizishiga</em> (memory leak) olib kelardi. WeakMap bu muammoni hal qiladi." },

        { h2: "Qo'llanish 2: keshlash (caching)" },
        { p: "Agar funksiya natijasini obyekt bo'yicha keshlamoqchi bo'lsak, WeakMap ideal: obyekt yashaguncha kesh saqlanadi, obyekt yo'qolganda kesh ham avtomatik tozalanadi." },
        { pg: "let kesh = new WeakMap();\n\nfunction ogirHisob(obj) {\n  if (!kesh.has(obj)) {\n    // haqiqiy loyihada bu og'ir hisoblash bo'lardi\n    let natija = obj.qiymat * 2;\n    kesh.set(obj, natija);\n    console.log('hisoblandi');\n  } else {\n    console.log('keshdan olindi');\n  }\n  return kesh.get(obj);\n}\n\nlet data = { qiymat: 21 };\nconsole.log(ogirHisob(data)); // hisoblandi -> 42\nconsole.log(ogirHisob(data)); // keshdan olindi -> 42", file: "weakmap-cache.js" },

        { h2: "WeakSet" },
        { p: "<code>WeakSet</code> — <code>Set</code> ning kuchsiz varianti. U ham xuddi shunday cheklovlarga ega:" },
        { ul: [
          "Faqat <strong>obyektlarni</strong> saqlaydi (primitivlarni emas);",
          "Obyekt boshqa joyda erishuvchan bo'lgungacha to'plamda qoladi;",
          "Metodlari faqat: <code>add</code>, <code>has</code>, <code>delete</code>;",
          "Iteratsiya va <code>size</code> yo'q."
        ] },
        { p: "WeakSet ko'pincha obyektning \"ha/yo'q\" holatini belgilash uchun ishlatiladi — masalan, foydalanuvchi saytga tashrif buyurganmi:" },
        { pg: "let tashrifQilganlar = new WeakSet();\n\nlet ali = { name: 'Ali' };\nlet vali = { name: 'Vali' };\n\ntashrifQilganlar.add(ali);\ntashrifQilganlar.add(vali);\ntashrifQilganlar.add(ali); // takror — e'tiborsiz\n\nconsole.log(tashrifQilganlar.has(ali)); // true\nconsole.log(tashrifQilganlar.has({}));  // false — boshqa obyekt", file: "weakset.js" },

        { h2: "Asosiy cheklov va tavsiya" },
        { note: "WeakMap va WeakSet ning eng katta cheklovi — ular bo'yicha aylanish yoki barcha joriy mazmunini olishning imkoni yo'qligi. Bu noqulaylikdek tuyulishi mumkin, lekin aslida ular bajaradigan vazifa uchun bu to'sqinlik qilmaydi. Ular asosiy ma'lumotni <strong>boshqa joyda</strong> saqlab, faqat qo'shimcha yordamchi ma'lumotni WeakMap/WeakSet da saqlashga mo'ljallangan." },
        { tip: "Qoida sifatida: agar obyektlarni kalit qilib ishlatayotgan bo'lsangiz va ular obyektning \"asosiy\" yashash muddatiga bog'lanishi kerak bo'lsa, WeakMap/WeakSet dan foydalaning. Aks holda oddiy Map/Set ni tanlang." },

        { h2: "Xulosa" },
        { ul: [
          "<code>WeakMap</code> va <code>WeakSet</code> kalit/element obyektlarga <strong>kuchsiz</strong> havola saqlaydi;",
          "Obyektga boshqa havola qolmasa, u (va tegishli yozuv) avtomatik tozalanadi — xotira sizishining oldi olinadi;",
          "Kalit/element faqat obyekt bo'lishi mumkin, primitiv emas;",
          "Iteratsiya, <code>size</code>, <code>clear</code>, <code>forEach</code> <strong>yo'q</strong>;",
          "WeakMap metodlari: <code>get/set/has/delete</code>; WeakSet metodlari: <code>add/has/delete</code>;",
          "Asosiy qo'llanish: begona obyektlarga qo'shimcha ma'lumot bog'lash va keshlash."
        ] }
      ]
    }
  ]
};
