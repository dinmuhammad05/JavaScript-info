"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Funksiyalar bilan chuqur ishlash",
  lessons: [
    {
      slug: "funksiya-obyekti",
      title: "Funksiya obyekti, NFE",
      blurb: "Funksiya ham obyekt ekanligi, uning name va length xossalari, o'z xossalarini qo'shish hamda Named Function Expression (NFE).",
      body: [
        { lead: "JavaScript'da funksiya — bu shunchaki chaqiriladigan amal emas, balki to'laqonli <strong>obyekt</strong>. Uni chaqirish mumkin, lekin ayni paytda unga xossalar qo'shish, undan xossalarni o'qish ham mumkin. Ushbu darsda funksiyaning obyekt sifatidagi tabiatini chuqur o'rganamiz." },

        { h2: "Funksiya — bu obyekt" },
        { p: "Biz allaqachon funksiyalar <em>chaqiriladigan</em> (callable) qiymatlar ekanligini bilamiz. Ammo JavaScript'da funksiyalar <strong>obyekt</strong> turiga kiradi. Ularni obyekt sifatida tasavvur qilish qulay: chaqirsa bo'ladigan \"harakat qiluvchi obyekt\"." },
        { p: "Obyekt bo'lgani uchun funksiyaga xossalarni o'qish, qo'shish va o'chirish, uni o'zgaruvchanga uzatish mumkin. Va eng qizig'i — funksiyalarning tayyor, o'rnatilgan (built-in) xossalari ham bor." },
        { note: "Funksiya <code>typeof</code> orqali tekshirilganda <code>\"function\"</code> deb qaytadi, lekin ichki jihatdan u obyektga asoslangan. Shuning uchun unga nuqta (<code>.</code>) orqali xossalar qo'shish mumkin." },

        { h2: "name xossasi" },
        { p: "Har bir funksiyaning <code>name</code> xossasi bor — bu uning nomini o'zida saqlaydi. Eng qizig'i, funksiyaga aniq nom berilmagan holatlarda ham JavaScript nomni o'zi \"topib beradi\" (bu <em>contextual name</em> — kontekstli nom deb ataladi)." },
        { pg: "function aytHi() {\n  return \"Salom\";\n}\nconsole.log(aytHi.name); // aytHi\n\n// Function Expression'da ham nom aniqlanadi:\nlet sayHi = function() {\n  return \"Hi\";\n};\nconsole.log(sayHi.name); // sayHi\n\n// Standart qiymatli argumentda ham:\nfunction f(salom = function() {}) {\n  console.log(salom.name); // salom\n}\nf();", file: "name-xossasi.js" },
        { p: "Ba'zan nomni aniqlashning imkoni yo'q — bunda <code>name</code> bo'sh satr bo'ladi. Masalan, funksiya massiv ichida yaratilsa:" },
        { pg: "let arr = [function() {}];\nconsole.log(arr[0].name === \"\"); // true — nom yo'q\nconsole.log(\"[\" + arr[0].name + \"]\"); // []", file: "name-bosh.js" },
        { tip: "Obyekt metodlarining ham <code>name</code> xossasi bor. Bu funksiyaning \"o'z nomini bilishi\" logging (jurnal yozish) va debugging paytida juda foydali." },

        { h2: "length xossasi" },
        { p: "Yana bir o'rnatilgan xossa — <code>length</code>. U funksiya <strong>parametrlari sonini</strong> qaytaradi, ammo <em>rest parametri</em> (<code>...args</code>) hisobga olinmaydi." },
        { pg: "function f1(a) {}\nfunction f2(a, b) {}\nfunction ko_p(a, b, ...more) {}\n\nconsole.log(f1.length);   // 1\nconsole.log(f2.length);   // 2\nconsole.log(ko_p.length); // 2 — ...more sanalmaydi", file: "length-xossasi.js" },
        { p: "<code>length</code> xossasi ba'zida amaliy ma'noga ega. Masalan, boshqa funksiyalar ustida ishlaydigan funksiyalarda uzatilgan funksiya nechta argument kutishini tekshirish uchun ishlatiladi." },
        { warn: "Standart qiymatga ega parametrlar ham <code>length</code>dan tashqarida qoladi. Masalan, <code>function f(a, b = 1) {}</code> uchun <code>f.length</code> — 1 bo'ladi, chunki hisob birinchi standart qiymatli parametrda to'xtaydi." },

        { h2: "O'z xossalarini qo'shish" },
        { p: "Funksiyaga o'zimizning xossalarimizni ham qo'shishimiz mumkin. Bu ba'zan holatni (state) funksiyaning o'zida saqlash uchun qulay yechim beradi." },
        { p: "Quyida <code>counter</code> funksiyasi chaqirilgan sonini o'zining <code>count</code> xossasida saqlaydi:" },
        { pg: "function counter() {\n  counter.count++;\n  return counter.count;\n}\ncounter.count = 0;\n\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3\nconsole.log(\"Jami chaqirilgan:\", counter.count); // 3", file: "funksiya-xossasi.js" },
        { note: "Xossaga berilgan qiymat — bu <strong>o'zgaruvchan (variable) emas</strong>. <code>counter.count</code> va funksiya ichidagi lokal <code>let count</code> bir-biriga bog'liq emas. Xossa funksiya obyektiga \"yopishtirilgan\", closure orqali yashiringan o'zgaruvchandan farq qiladi." },
        { p: "Ba'zan closure o'rniga funksiya xossasidan foydalanish afzalroq: xossa <em>tashqaridan ko'rinadi va o'zgartirilishi</em> mumkin. Masalan, hisoblagichni tashqaridan nolga qaytarish oson bo'ladi." },

        { h2: "Named Function Expression (NFE)" },
        { p: "<strong>Named Function Expression</strong> (NFE — nomli funksional ifoda) — bu nomi bor Function Expression. Nom faqat funksiya <em>ichida o'ziga murojaat qilish</em> uchun ishlatiladi va tashqarida ko'rinmaydi." },
        { pg: "let sayHi = function func(who) {\n  if (who) {\n    return \"Salom, \" + who;\n  } else {\n    return func(\"Mehmon\"); // func orqali o'ziga murojaat\n  }\n};\n\nconsole.log(sayHi(\"Ali\")); // Salom, Ali\nconsole.log(sayHi());      // Salom, Mehmon", file: "nfe-asosiy.js" },
        { p: "Bu yerda <code>func</code> nomining ikkita xususiyati bor:" },
        { ul: [
          "U funksiyaga <strong>ichkaridan</strong> o'ziga murojaat qilishga imkon beradi;",
          "U funksiya <strong>tashqarisida ko'rinmaydi</strong> — <code>func(...)</code> deb chaqirsak, xatolik bo'ladi."
        ] },
        { p: "\"Nega shunchaki <code>sayHi</code> nomidan foydalanmaymiz?\" degan savol tug'iladi. Muammo shundaki, tashqi o'zgaruvchan keyinroq o'zgartirilishi mumkin. Agar <code>sayHi</code> boshqa qiymatga tenglashsa, funksiya o'ziga to'g'ri murojaat qila olmay qoladi:" },
        { pg: "let sayHi = function func(who) {\n  if (who) {\n    return \"Salom, \" + who;\n  } else {\n    return func(\"Mehmon\"); // to'g'ri ishlaydi\n  }\n};\n\nlet salomlash = sayHi;\nsayHi = null; // asl o'zgaruvchan yo'qoldi\n\nconsole.log(salomlash()); // Salom, Mehmon — baribir ishlaydi!", file: "nfe-himoya.js" },
        { p: "Agar <code>func</code> o'rniga tashqi <code>sayHi</code> ishlatilganida, <code>sayHi = null</code> bo'lgach ichki chaqiruv \"<code>sayHi is not a function</code>\" xatoligini bergan bo'lardi. NFE aynan shu muammodan himoya qiladi." },
        { warn: "Ichki nom faqat <strong>Function Expression</strong> uchun ishlaydi. Function Declaration (oddiy <code>function name() {}</code>) uchun alohida \"ichki\" nom mavjud emas — u yerda oddiy nomning o'zi tashqarida ham, ichkarida ham ishlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Funksiyalar — bu <strong>obyektlar</strong>: ularni chaqirish, xossa qo'shish va o'qish mumkin;",
          "<code>name</code> — funksiya nomini saqlaydi (ba'zan avtomatik aniqlanadi);",
          "<code>length</code> — parametrlar sonini beradi (rest va standart qiymatlilarni hisobga olmaydi);",
          "Funksiyaga o'z xossalarini qo'shish holatni saqlash uchun (closure'ga muqobil) ishlatiladi;",
          "<strong>NFE</strong> funksiyaga o'ziga ishonchli murojaat qilish imkonini beradi — tashqi o'zgaruvchan o'zgarsa ham buzilmaydi."
        ] }
      ]
    },

    {
      slug: "new-function",
      title: "new Function sintaksisi",
      blurb: "Satrdan funksiya yaratish: new Function('a', 'b', 'return a + b'), uning qo'llanishi va cheklovlari.",
      body: [
        { lead: "Funksiya yaratishning yana bir, kamdan-kam uchraydigan usuli bor — <code>new Function</code>. U funksiyani <strong>satr (string)</strong> ko'rinishidagi koddan yaratishga imkon beradi. Bu maxsus vaziyatlarda juda foydali." },

        { h2: "Sintaksis" },
        { p: "Umumiy shakli quyidagicha:" },
        { code: "let func = new Function([arg1, arg2, ...argN], funcBody);" },
        { p: "Funksiya <code>arg1...argN</code> argumentlari (parametrlar nomlari) va so'nggi <code>funcBody</code> (funksiya tanasi — kod satri) bilan yaratiladi. Barchasi <strong>satr</strong> ko'rinishida beriladi." },
        { pg: "let sum = new Function('a', 'b', 'return a + b');\n\nconsole.log(sum(1, 2)); // 3\nconsole.log(sum(10, 20)); // 30", file: "new-function-sum.js" },
        { p: "Argumentsiz funksiya ham yaratish mumkin — bunda faqat tana beriladi:" },
        { pg: "let salom = new Function('return \"Salom, dunyo!\"');\nconsole.log(salom()); // Salom, dunyo!", file: "new-function-salom.js" },

        { h2: "Asosiy farqi: satrdan kod olish" },
        { p: "Oddiy funksiyalar kod yozilish paytida (yozuvchi tomonidan) belgilanadi. <code>new Function</code> esa funksiyani <strong>ishlash vaqtida (runtime)</strong>, istalgan satrdan yaratishga imkon beradi." },
        { p: "Bu shuni anglatadiki, funksiya kodini serverdan olib yoki dinamik ravishda shakllantirib, keyin uni bajariladigan funksiyaga aylantirish mumkin:" },
        { pg: "let ifoda = 'a * b + 5';\nlet hisobla = new Function('a', 'b', 'return ' + ifoda);\n\nconsole.log(hisobla(2, 3)); // 11  (2*3+5)\nconsole.log(hisobla(4, 5)); // 25  (4*5+5)", file: "new-function-dinamik.js" },
        { note: "Argumentlarni bitta satrda vergul bilan ajratib ham berish mumkin: <code>new Function('a, b', 'return a + b')</code> — bu ham to'g'ri ishlaydi." },

        { h2: "Closure va new Function" },
        { p: "Bu yerda muhim va nozik jihat bor. Odatdagi funksiyalar o'zi yaratilgan joydagi tashqi o'zgaruvchanlarni \"eslab qoladi\" (closure). Ammo <code>new Function</code> orqali yaratilgan funksiya bunday emas — uning <code>[[Environment]]</code> (leksik muhiti) <strong>global muhitga</strong> ishora qiladi, o'zi yaratilgan joyga emas." },
        { p: "Shuning uchun bunday funksiya tashqi lokal o'zgaruvchanlardan foydalana olmaydi — faqat global va o'ziga uzatilgan argumentlarni ko'radi:" },
        { code: "function getFunc() {\n  let qiymat = \"test\"; // lokal o'zgaruvchan\n\n  // Bu funksiya lokal 'qiymat'ni KO'RMAYDI:\n  let func = new Function('return qiymat');\n\n  return func;\n}\n\n// getFunc()(); // XATOLIK: qiymat is not defined" },
        { warn: "Agar oddiy funksiyada <code>return function() { return qiymat; }</code> yozganimizda, u lokal <code>qiymat</code>ni ko'rgan bo'lardi. <code>new Function</code> esa faqat globalni ko'radi. Bu — ataylab qilingan tarhli qaror." },
        { p: "Nega shunday? Chunki agar <code>new Function</code> lokal o'zgaruvchanlarni ko'ra olganida, minifikatsiya (kodni siqib, o'zgaruvchan nomlarini <code>a</code>, <code>b</code> kabi qisqartirish) paytida satr ichidagi nomlar mos kelmay, kod buzilar edi. Global muhit bilan cheklash bu xavfni yo'q qiladi." },

        { h2: "Qachon ishlatiladi?" },
        { p: "<code>new Function</code> juda kam hollarda kerak bo'ladi, lekin ba'zi vaziyatlarda bebaho:" },
        { ul: [
          "Serverdan <strong>kod satri</strong> sifatida olingan mantiqni bajariladigan funksiyaga aylantirish;",
          "Shablon (template) dvigatellari — foydalanuvchi kiritgan ifodalarni funksiyaga o'girish;",
          "Dinamik hisob-kitob — matematik ifodalarni matndan olib bajarish."
        ] },
        { tip: "Kundalik dasturlashda <code>new Function</code>ga deyarli murojaat qilinmaydi. U <em>maxsus vosita</em> — faqat koddan dinamik funksiya yasash zarur bo'lganda tanlanadi." },
        { warn: "Foydalanuvchidan olingan ishonchsiz satrni <code>new Function</code>ga (yoki <code>eval</code>ga) uzatish — <strong>xavfli</strong>. Bu zararli kod bajarilishiga olib kelishi mumkin. Faqat ishonchli manbadagi kod bilan ishlang." },

        { h2: "Xulosa" },
        { ul: [
          "<code>new Function(args, body)</code> — funksiyani <strong>satrdan</strong> yaratadi;",
          "Argumentlar va tana — barchasi satr ko'rinishida beriladi;",
          "Yaratilgan funksiya <strong>global muhitga</strong> bog'lanadi, lokal o'zgaruvchanlarni ko'rmaydi;",
          "Bu minifikatsiya bilan mos ishlash uchun qilingan;",
          "Asosan koddan dinamik funksiya yasash kerak bo'lganda ishlatiladi — ishonchsiz satrga ehtiyot bo'ling."
        ] }
      ]
    },

    {
      slug: "settimeout",
      title: "setTimeout va setInterval",
      blurb: "Kodni kechiktirib yoki takroran bajarish: setTimeout, clearTimeout, setInterval, clearInterval, nolinchi kechikish va ichma-ich setTimeout.",
      body: [
        { lead: "Ba'zan funksiyani darhol emas, balki <strong>ma'lum vaqtdan keyin</strong> yoki <strong>muntazam takror</strong> bajarish kerak bo'ladi. Buning uchun ikkita asosiy metod bor: <code>setTimeout</code> va <code>setInterval</code>. Bu metodlar spetsifikatsiyaning bir qismi emas, lekin brauzer ham, Node.js ham ularni qo'llab-quvvatlaydi." },
        { warn: "Bu darsdagi ko'p misollar <strong>statik kod</strong> shaklida berilgan. Sabab: maydoncha (playground) faqat <code>console.log</code>/<code>return</code> natijasini <em>darhol</em> ko'rsatadi, <code>setTimeout</code>/<code>setInterval</code> esa natijani kechikish bilan chiqaradi — u maydonchada ko'rinmaydi. Kodlarni brauzer konsolida sinab ko'ring." },

        { h2: "setTimeout — bir marta kechiktirish" },
        { p: "<code>setTimeout</code> funksiyani berilgan vaqtdan (millisekundlarda) keyin <strong>bir marta</strong> bajaradi. Sintaksisi:" },
        { code: "let timerId = setTimeout(func, delay, arg1, arg2, ...);" },
        { ul: [
          "<code>func</code> — bajariladigan funksiya;",
          "<code>delay</code> — kechikish millisekundlarda (1000 ms = 1 soniya), standart 0;",
          "<code>arg1, arg2...</code> — funksiyaga uzatiladigan argumentlar."
        ] },
        { code: "function salomBer() {\n  console.log(\"Salom!\");\n}\n\n// 2 soniyadan keyin \"Salom!\" chiqadi:\nsetTimeout(salomBer, 2000);\n\n// Argumentlar bilan:\nfunction xabar(kim, matn) {\n  console.log(matn + \", \" + kim);\n}\nsetTimeout(xabar, 1000, \"Ali\", \"Assalomu alaykum\");\n// 1 soniyadan keyin: Assalomu alaykum, Ali" },
        { warn: "Funksiyani <strong>chaqirmasdan</strong> uzating: <code>setTimeout(salomBer, 1000)</code> to'g'ri. Agar qavs bilan <code>setTimeout(salomBer(), 1000)</code> yozsangiz — <code>salomBer()</code> darhol bajariladi va uning <em>natijasi</em> (odatda <code>undefined</code>) uzatiladi. Bu keng tarqalgan xato." },

        { h2: "clearTimeout — bekor qilish" },
        { p: "<code>setTimeout</code> chaqirilganda \"timer identifikatori\"ni qaytaradi. Uni <code>clearTimeout</code>ga berib, rejalashtirilgan bajarishni <strong>bekor qilish</strong> mumkin:" },
        { code: "let timerId = setTimeout(function() {\n  console.log(\"Bu hech qachon chiqmaydi\");\n}, 2000);\n\nclearTimeout(timerId); // taймerni bekor qildik\n// funksiya ishga tushmaydi" },
        { note: "Timerni bekor qilgandan keyin ham identifikator qiymati saqlanib qoladi — u \"tozalanmaydi\", lekin qayta ishlatilmaydi. Bekor qilish faqat rejalashtirilgan bajarishni to'xtatadi." },

        { h2: "setInterval — takroran bajarish" },
        { p: "<code>setInterval</code> sintaksisi <code>setTimeout</code> bilan bir xil, lekin farqi shundaki, funksiya <strong>bir marta emas, muntazam</strong> — har <code>delay</code> millisekundda takror bajariladi:" },
        { code: "// Har 2 soniyada bir marta xabar:\nlet timerId = setInterval(function() {\n  console.log(\"tik\");\n}, 2000);\n\n// 5 soniyadan keyin butun takrorlashni to'xtatish:\nsetTimeout(function() {\n  clearInterval(timerId);\n  console.log(\"to'xtatildi\");\n}, 5000);\n\n// Natija (konsolda): tik, tik, to'xtatildi" },
        { p: "<code>clearInterval(timerId)</code> — takrorlashni to'xtatadi. Aks holda funksiya cheksiz takrorlanaveradi." },
        { tip: "Ko'pchilik brauzerlarda tab (varaq) faol bo'lmaganda (fonda) <code>setInterval</code> ohangini sekinlashtiradi yoki to'xtatadi — bu resurslarni tejash uchun. Aniq vaqtga tayanadigan hisob-kitoblarda buni yodda tuting." },

        { h2: "Ichma-ich setTimeout" },
        { p: "Muntazam bajarishning yana bir usuli — <code>setInterval</code> o'rniga <strong>ichma-ich (nested) setTimeout</strong>. Funksiya har safar o'zi uchun keyingi <code>setTimeout</code>ni rejalashtiradi:" },
        { code: "let timerId = setTimeout(function tick() {\n  console.log(\"tik\");\n  timerId = setTimeout(tick, 2000); // o'zini qayta rejalashtiradi\n}, 2000);\n\n// Natija: har 2 soniyada \"tik\"" },
        { p: "Ichma-ich <code>setTimeout</code> <code>setInterval</code>dan quyidagi jihatlar bilan afzal:" },
        { ol: [
          "<strong>Kechikishni moslashuvchan boshqarish</strong> — har bir chaqiruvdan keyin kechikishni o'zgartirish mumkin (masalan, serverda yuklama oshsa, so'rovlar oralig'ini kattalashtirish);",
          "<strong>Aniqroq oraliq kafolati</strong> — keyingi chaqiruv oldingisi <em>tugagach</em> rejalashtiriladi, shuning uchun bajarishlar bir-birining ustiga chiqmaydi."
        ] },
        { note: "<code>setInterval</code>da ichki kechikish funksiya bajarilish vaqtini <em>o'z ichiga oladi</em>. Agar funksiya uzoq ishlasa, real oraliq belgilangandan kichik bo'lishi (yoki chaqiruvlar navbatga to'planishi) mumkin. Ichma-ich <code>setTimeout</code> bu muammoni hal qiladi." },

        { h2: "Nolinchi kechikish: setTimeout(func, 0)" },
        { p: "Maxsus hol — <code>setTimeout(func, 0)</code> yoki oddiy <code>setTimeout(func)</code>. Bu funksiyani \"iloji boricha tez\", lekin <strong>joriy kod to'liq tugagandan keyin</strong> bajarishni rejalashtiradi." },
        { code: "console.log(\"Boshlanish\");\n\nsetTimeout(function() {\n  console.log(\"Kechikkan (0 ms)\");\n}, 0);\n\nconsole.log(\"Tugash\");\n\n// Natija tartibi (konsolda):\n// Boshlanish\n// Tugash\n// Kechikkan (0 ms)" },
        { p: "\"Kechikkan\" xabari oxirida chiqadi — chunki <code>setTimeout</code> funksiyani navbatga qo'yadi va u joriy skript to'liq bajarilib bo'lgach ishga tushadi. Bu \"joriy kodni bloklamasdan, keyinroq bajarish\" uchun ishlatiladigan usul." },
        { warn: "Brauzerlarda ichma-ich <code>setTimeout</code> 5 martadan keyin minimal kechikishni ~4 ms ga majburiy oshiradi (HTML standarti talabi). Shuning uchun \"0 ms\" aslida bir necha millisekundga aylanishi mumkin. Node.js'da bu cheklov boshqacha." },

        { h2: "Xulosa" },
        { ul: [
          "<code>setTimeout(func, delay)</code> — funksiyani <strong>bir marta</strong> kechikish bilan bajaradi;",
          "<code>setInterval(func, delay)</code> — funksiyani <strong>muntazam</strong> takror bajaradi;",
          "<code>clearTimeout(id)</code> / <code>clearInterval(id)</code> — rejalashtirilganni bekor qiladi;",
          "Funksiyani qavssiz uzating: <code>setTimeout(f, 1000)</code>, <code>setTimeout(f(), 1000)</code> emas;",
          "<strong>Ichma-ich setTimeout</strong> — kechikishni moslashuvchan boshqarish va aniq oraliq kafolati beradi;",
          "<code>setTimeout(f, 0)</code> — funksiyani joriy kod tugagach bajaradi."
        ] }
      ]
    },

    {
      slug: "call-apply",
      title: "Dekoratorlar va uzatish, call/apply",
      blurb: "Kontekstni uzatuvchi func.call va func.apply metodlari, keshlovchi dekorator hamda argumentlarni uzatish.",
      body: [
        { lead: "JavaScript funksiyalar bilan ishlashda ajoyib moslashuvchanlik beradi. Ularni uzatish, o'ram (wrapper) bilan qoplash mumkin. Ushbu darsda <strong>dekoratorlar</strong> va kontekstni uzatuvchi <code>call</code>/<code>apply</code> metodlarini o'rganamiz." },

        { h2: "Dekorator nima?" },
        { p: "<strong>Dekorator</strong> — bu funksiyani argument sifatida oladigan va uning xatti-harakatini <em>o'zgartiruvchi</em> yangi funksiyani qaytaradigan funksiya. Asl funksiya o'zgarmaydi — uning atrofiga qo'shimcha imkoniyat \"o'raladi\"." },
        { p: "Masalan, sekin ishlaydigan funksiyaning natijalarini <strong>keshlab</strong> (eslab) qo'yadigan dekorator yozamiz:" },
        { pg: "function sekinHisob(x) {\n  // Aslida bu og'ir hisob-kitob deb tasavvur qiling\n  return x * 1000;\n}\n\nfunction keshlovchi(func) {\n  let kesh = new Map();\n  return function(x) {\n    if (kesh.has(x)) {\n      return kesh.get(x); // tayyor natijani qaytaramiz\n    }\n    let natija = func(x);\n    kesh.set(x, natija);\n    return natija;\n  };\n}\n\nsekinHisob = keshlovchi(sekinHisob);\n\nconsole.log(sekinHisob(5)); // 5000 (hisoblandi)\nconsole.log(sekinHisob(5)); // 5000 (keshdan)\nconsole.log(sekinHisob(2)); // 2000 (hisoblandi)", file: "kesh-dekorator.js" },
        { note: "Dekoratorning go'zalligi — asl <code>sekinHisob</code> funksiyasi o'zgarmadi. Biz uni tashqaridan \"kesh\" imkoniyati bilan qopladik. Bu — <em>vazifalarni ajratish</em> (separation of concerns) tamoyilining yaxshi namunasi." },

        { h2: "Kontekst muammosi" },
        { p: "Yuqoridagi keshlovchi oddiy funksiyalar uchun ishlaydi. Ammo <strong>obyekt metodlari</strong> bilan muammo chiqadi. Metod ichida <code>this</code> ishlatilsa, dekorator uni <code>func(x)</code> deb chaqirganda <code>this</code> yo'qoladi:" },
        { code: "let ishchi = {\n  narx: 1000,\n  sekinHisob(x) {\n    return x * this.narx; // this KERAK\n  }\n};\n\n// keshlovchi ichida func(x) deb chaqirilsa, this yo'qoladi\n// va \"Cannot read property 'narx' of undefined\" xatoligi chiqadi" },
        { p: "Buni hal qilish uchun bizga <code>this</code>ni to'g'ri uzatish yo'li kerak. Aynan shu yerda <code>call</code> yordamga keladi." },

        { h2: "func.call — kontekstni aniq uzatish" },
        { p: "<code>func.call(context, arg1, arg2, ...)</code> funksiyani chaqiradi, lekin <code>this</code>ni birinchi argument sifatida <strong>aniq belgilaydi</strong>:" },
        { pg: "function aytIsm() {\n  return \"Ismim: \" + this.ism;\n}\n\nlet user1 = { ism: \"Ali\" };\nlet user2 = { ism: \"Vali\" };\n\nconsole.log(aytIsm.call(user1)); // Ismim: Ali\nconsole.log(aytIsm.call(user2)); // Ismim: Vali", file: "call-asosiy.js" },
        { p: "<code>func.call(obj)</code> — bu deyarli <code>obj.func()</code> bilan bir xil, lekin <code>this</code>ni <em>aniq</em> belgilaydi. Argumentlarni ham ketma-ket uzatish mumkin:" },
        { pg: "function say(salom, kim) {\n  return salom + \", \" + kim + \" (\" + this.rol + \")\";\n}\n\nlet admin = { rol: \"admin\" };\n\nconsole.log(say.call(admin, \"Xush kelibsiz\", \"Ali\"));\n// Xush kelibsiz, Ali (admin)", file: "call-argumentlar.js" },

        { h2: "func.apply — argumentlarni massiv bilan" },
        { p: "<code>func.apply</code> <code>call</code> bilan deyarli bir xil, lekin argumentlarni <strong>massiv ko'rinishida</strong> qabul qiladi:" },
        { code: "func.call(context, arg1, arg2, arg3);\nfunc.apply(context, [arg1, arg2, arg3]); // xuddi shu natija" },
        { pg: "function say(salom, kim) {\n  return salom + \", \" + kim + \" (\" + this.rol + \")\";\n}\n\nlet admin = { rol: \"admin\" };\nlet args = [\"Xush kelibsiz\", \"Vali\"];\n\nconsole.log(say.apply(admin, args));\n// Xush kelibsiz, Vali (admin)", file: "apply-massiv.js" },
        { note: "Zamonaviy JavaScript'da spread sintaksisi (<code>func.call(ctx, ...args)</code>) <code>apply</code>ga muqobil hisoblanadi. Ammo <code>apply</code> ba'zan bir oz tezroq (dvigatel uni yaxshi optimallashtiradi) va eski kodda ko'p uchraydi." },

        { h2: "Chaqiruvni uzatish (call forwarding)" },
        { p: "Dekoratorlarda ko'pincha <strong>barcha argumentlarni va kontekstni</strong> asl funksiyaga to'liq uzatish kerak bo'ladi. Buning uchun <code>func.apply(this, arguments)</code> naqshi ishlatiladi:" },
        { pg: "function keshlovchi(func) {\n  let kesh = new Map();\n  return function() {\n    // Argumentlardan kalit yasaymiz\n    let kalit = Array.from(arguments).join(\",\");\n    if (kesh.has(kalit)) {\n      return kesh.get(kalit);\n    }\n    // this va barcha argumentlarni uzatamiz:\n    let natija = func.apply(this, arguments);\n    kesh.set(kalit, natija);\n    return natija;\n  };\n}\n\nlet ishchi = {\n  narx: 100,\n  hisobla(x) {\n    return x * this.narx;\n  }\n};\nishchi.hisobla = keshlovchi(ishchi.hisobla);\n\nconsole.log(ishchi.hisobla(3)); // 300 (hisoblandi)\nconsole.log(ishchi.hisobla(3)); // 300 (keshdan)", file: "call-forwarding.js" },
        { p: "<code>func.apply(this, arguments)</code> — bu <strong>chaqiruvni uzatish</strong> (call forwarding). U tashqi o'ramning <code>this</code>ini va barcha argumentlarini asl funksiyaga to'liq \"o'tkazib yuboradi\", go'yo o'ram umuman bo'lmagandek." },
        { tip: "<code>arguments</code> — bu massivsimon obyekt (array-like), haqiqiy massiv emas. Uni <code>apply</code>ga to'g'ridan-to'g'ri berish mumkin, lekin massiv metodlarini (masalan <code>.map</code>) ishlatish uchun <code>Array.from(arguments)</code> yoki <code>[...arguments]</code> orqali massivga o'girish kerak." },

        { h2: "Metodni \"qarzga olish\" (method borrowing)" },
        { p: "<code>call</code>/<code>apply</code>ning yana bir foydali qo'llanishi — bir obyektning metodini boshqa obyektda ishlatish. Masalan, <code>arguments</code> massivsimon obyektida massivning <code>join</code> metodini ishlatish:" },
        { pg: "function birlashtir() {\n  // arguments massiv emas, lekin uning join'ini qarzga olamiz:\n  return [].join.call(arguments, \" - \");\n}\n\nconsole.log(birlashtir(\"a\", \"b\", \"c\")); // a - b - c", file: "method-borrowing.js" },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Dekorator</strong> — funksiyani o'rab, uning xatti-harakatini o'zgartiradigan funksiya (masalan, keshlovchi);",
          "<code>func.call(ctx, arg1, arg2...)</code> — <code>this</code> va argumentlarni birma-bir uzatib chaqiradi;",
          "<code>func.apply(ctx, argsMassiv)</code> — argumentlarni massiv sifatida uzatadi;",
          "<code>func.apply(this, arguments)</code> — dekoratorlarda chaqiruvni to'liq uzatish uchun ishlatiladi;",
          "<code>call</code>/<code>apply</code> metodni boshqa obyektga \"qarzga berish\"ga ham imkon beradi."
        ] }
      ]
    },

    {
      slug: "bind",
      title: "Funksiya bog'lash (bind)",
      blurb: "this yo'qolishi muammosi, func.bind orqali kontekstni bog'lash va qisman qo'llash (partial application).",
      body: [
        { lead: "Obyekt metodini alohida uzatganimizda — masalan, <code>setTimeout</code>ga yoki hodisa (event) ishlovchisiga — <strong><code>this</code> yo'qoladi</strong>. Ushbu darsda bu klassik muammoni va uni <code>bind</code> orqali hal qilishni o'rganamiz." },

        { h2: "this yo'qolishi muammosi" },
        { p: "Obyekt metodini bir joyga uzatib, keyin boshqa kontekstda chaqirsak — <code>this</code> asl obyektga emas, boshqa qiymatga ishora qiladi. Klassik misol — metodni <code>setTimeout</code>ga uzatish:" },
        { code: "let user = {\n  ism: \"Ali\",\n  salom() {\n    console.log(\"Salom, \" + this.ism);\n  }\n};\n\n// this yo'qoladi:\nsetTimeout(user.salom, 1000);\n// Natija: Salom, undefined\n// (chunki setTimeout metodni obyektdan \"ajratib\" chaqiradi)" },
        { p: "Nima uchun shunday bo'ladi? Chunki <code>setTimeout</code> <code>user.salom</code> <strong>funksiyasini</strong> oladi, lekin <code>user</code> obyektidan uzilgan holda. Chaqirilganda esa <code>this</code> mavjud emas (yoki brauzerda <code>window</code>) bo'lib qoladi." },
        { note: "Muammoning mohiyati: JavaScript'da <code>this</code> funksiya <em>qanday e'lon qilinishiga</em> emas, <strong>qanday chaqirilishiga</strong> bog'liq. <code>user.salom()</code> chaqirilsa <code>this</code> — <code>user</code>; alohida <code>func()</code> chaqirilsa — yo'q." },

        { h2: "Vaqtinchalik yechim: o'ram" },
        { p: "Eng oddiy yechim — funksiyani o'rovchi (wrapper) funksiyaga o'rab uzatish:" },
        { code: "let user = {\n  ism: \"Ali\",\n  salom() {\n    console.log(\"Salom, \" + this.ism);\n  }\n};\n\nsetTimeout(function() {\n  user.salom(); // this endi to'g'ri — user\n}, 1000);\n// Natija: Salom, Ali" },
        { warn: "Bu yechim ishlaydi, lekin nozik xatosi bor: agar <code>setTimeout</code> ishga tushguncha <code>user</code> o'zgartirilsa (masalan <code>user = boshqaObyekt</code>), o'ram <em>yangi</em> qiymatni ishlatadi. <code>bind</code> esa qiymatni bog'lanish vaqtida qat'iy mahkamlaydi." },

        { h2: "func.bind — kontekstni mahkamlash" },
        { p: "<code>bind</code> metodi <code>this</code>ni <strong>qat'iy bog'langan</strong> yangi funksiyani qaytaradi. Sintaksisi:" },
        { code: "let bog_langan = func.bind(context);" },
        { p: "Natijadagi <code>bog_langan</code> — bu <code>func</code> bilan bir xil funksiya, lekin uning <code>this</code>i <em>doimo</em> <code>context</code> bo'ladi, qanday chaqirilishidan qat'i nazar:" },
        { pg: "let user = {\n  ism: \"Ali\",\n  salom() {\n    return \"Salom, \" + this.ism;\n  }\n};\n\nlet salomBer = user.salom.bind(user);\n\nconsole.log(salomBer()); // Salom, Ali (this doim user)\n\n// Alohida chaqirilsa ham this saqlanadi:\nlet f = salomBer;\nconsole.log(f()); // Salom, Ali", file: "bind-asosiy.js" },
        { p: "Endi <code>setTimeout</code> muammosi ham osongina hal bo'ladi — bog'langan funksiyani uzatamiz:" },
        { code: "let salomBer = user.salom.bind(user);\nsetTimeout(salomBer, 1000);\n// Natija: Salom, Ali — this yo'qolmaydi" },
        { tip: "Agar bir obyektning bir nechta metodini bog'lash kerak bo'lsa, ularni siklda aylanib <code>obj[key] = obj[key].bind(obj)</code> qilish mumkin. Ba'zi kutubxonalar (masalan React'ning eski kodi) shu naqshni ko'p ishlatgan." },

        { h2: "Qisman qo'llash (partial application)" },
        { p: "<code>bind</code> nafaqat <code>this</code>ni, balki <strong>argumentlarni ham</strong> oldindan mahkamlashi mumkin. Bu <em>qisman qo'llash</em> (partial application) deb ataladi:" },
        { code: "let bog_langan = func.bind(context, arg1, arg2, ...);" },
        { p: "Argumentlardan bir qismini oldindan belgilab, faqat qolganini keyin uzatiladigan yangi funksiya olamiz:" },
        { pg: "function ko_paytir(a, b) {\n  return a * b;\n}\n\n// Birinchi argumentni (a=2) oldindan mahkamlaymiz.\n// null — this bizga muhim emas.\nlet ikkiBaravar = ko_paytir.bind(null, 2);\n\nconsole.log(ikkiBaravar(5));  // 10  (2*5)\nconsole.log(ikkiBaravar(10)); // 20  (2*10)\n\nlet uchBaravar = ko_paytir.bind(null, 3);\nconsole.log(uchBaravar(5)); // 15  (3*5)", file: "partial-application.js" },
        { p: "Bu texnika mavjud umumiy funksiyadan aniqroq, ixtisoslashgan funksiyalar yasashda juda foydali. Masalan, <code>send(from, to, text)</code> dan <code>sendTo(text)</code> yasab, <code>from</code> va <code>to</code>ni oldindan belgilash mumkin:" },
        { pg: "function xabarYubor(kimdan, kimga, matn) {\n  return kimdan + \" -> \" + kimga + \": \" + matn;\n}\n\n// Ali'dan Vali'ga yuboruvchi tayyor funksiya:\nlet aliDanValiGa = xabarYubor.bind(null, \"Ali\", \"Vali\");\n\nconsole.log(aliDanValiGa(\"Salom!\"));\n// Ali -> Vali: Salom!\nconsole.log(aliDanValiGa(\"Qalaysan?\"));\n// Ali -> Vali: Qalaysan?", file: "partial-yuborish.js" },
        { note: "Argumentlar chapdan o'ngga mahkamlanadi. Ya'ni <code>bind</code> birinchi argumentlarni belgilaydi, keyin chaqiruv paytida berilganlar ularning davomiga qo'shiladi." },

        { h2: "bind haqida muhim jihatlar" },
        { ul: [
          "Bog'langan funksiyani <strong>qayta bog'lash mumkin emas</strong> — <code>bind</code> bir marta va butunlay mahkamlaydi;",
          "<code>bind</code> har chaqirilganda <strong>yangi funksiya</strong> yaratadi, shuning uchun uni saqlab qo'yish kerak (ayniqsa hodisa ishlovchilarini olib tashlashda);",
          "Bog'langan funksiyaning <code>name</code> xossasi <code>\"bound \"</code> prefiksi bilan boshlanadi."
        ] },
        { pg: "let user = { ism: \"Ali\", salom() { return this.ism; } };\nlet bog_langan = user.salom.bind(user);\nconsole.log(bog_langan.name); // bound salom", file: "bind-name.js" },
        { warn: "<code>func.bind(user1).bind(user2)</code> — ikkinchi <code>bind</code> ta'sir qilmaydi! <code>this</code> baribir <code>user1</code> bo'lib qoladi. Bog'lanish qaytarilmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "Metodni alohida uzatganda <code>this</code> <strong>yo'qoladi</strong> — chunki u chaqirilish usuliga bog'liq;",
          "<code>func.bind(context)</code> — <code>this</code>i doimo <code>context</code> bo'lgan yangi funksiya qaytaradi;",
          "Bu <code>setTimeout</code>, hodisa ishlovchilari va callback'larda juda foydali;",
          "<code>func.bind(context, arg1, arg2)</code> — argumentlarni ham oldindan mahkamlaydi (<strong>qisman qo'llash</strong>);",
          "Bog'langan funksiyani qayta bog'lab bo'lmaydi va u har safar yangi funksiya bo'ladi."
        ] }
      ]
    },

    {
      slug: "strelka-qayta",
      title: "Strelka funksiyalari (qayta ko'rib chiqish)",
      blurb: "Strelka funksiyalarining chuqur xususiyatlari: o'z this va arguments yo'qligi, new bilan ishlamasligi va qachon foydali ekanligi.",
      body: [
        { lead: "Strelka funksiyalari (<code>=&gt;</code>) shunchaki \"funksiya yozishning qisqa usuli\" emas. Ularning o'ziga xos, muhim xususiyatlari bor. Ushbu darsda ularni chuqur qayta ko'rib chiqamiz." },

        { h2: "Strelkada o'z this yo'q" },
        { p: "Eng muhim xususiyat: strelka funksiyasining <strong>o'z <code>this</code>i yo'q</strong>. Uning ichida <code>this</code> ishlatilsa, u <em>tashqi</em> (o'rab turuvchi) funksiyaning <code>this</code>ini oladi." },
        { p: "Bu obyekt metodi ichida ichki funksiya yozganda juda foydali. Oddiy funksiyada <code>this</code> yo'qolardi, strelkada esa saqlanadi:" },
        { pg: "let guruh = {\n  sarlavha: \"Bizning guruh\",\n  talabalar: [\"Ali\", \"Vali\", \"Guli\"],\n\n  korsat() {\n    // strelka this'ni korsat() dan oladi:\n    this.talabalar.forEach(\n      talaba => console.log(this.sarlavha + \": \" + talaba)\n    );\n  }\n};\n\nguruh.korsat();\n// Bizning guruh: Ali\n// Bizning guruh: Vali\n// Bizning guruh: Guli", file: "strelka-this.js" },
        { p: "Agar bu yerda <code>talaba =&gt; ...</code> o'rniga oddiy <code>function(talaba) { ... }</code> yozilganida, ichki funksiyada <code>this</code> <code>undefined</code> bo'lib, <code>this.sarlavha</code> xatolik bergan bo'lardi." },
        { note: "Strelkada <code>this</code> \"yo'q\" degani — u umuman aniqlanmaydi va JavaScript uni tashqi muhitdan qidiradi (xuddi oddiy o'zgaruvchan kabi). Shuning uchun strelka \"tashqi <code>this</code>ni oladi\" deb aytiladi." },

        { h2: "bind/call/apply strelkaga ta'sir qilmaydi" },
        { p: "Strelkaning o'z <code>this</code>i bo'lmagani uchun, unga <code>call</code>, <code>apply</code> yoki <code>bind</code> orqali <code>this</code> berib bo'lmaydi — ular e'tiborsiz qoldiriladi:" },
        { pg: "let f = () => this;\n\nlet obyekt = { ism: \"test\" };\n\n// call/bind this'ni O'ZGARTIRMAYDI:\nconsole.log(f.call(obyekt) === obyekt); // false\nconsole.log(f.bind(obyekt)() === obyekt); // false", file: "strelka-bind-yoq.js" },
        { tip: "Aynan shu sabab strelka funksiyalari React, hodisa ishlovchilari va <code>setTimeout</code> ichida qulay — ular <code>this</code>ni ataylab \"o'rab turgan\" komponentga bog'lab qoldiradi va tasodifan yo'qolmaydi." },

        { h2: "Strelkada arguments yo'q" },
        { p: "Strelka funksiyalarning <strong>o'z <code>arguments</code> obyekti ham yo'q</strong>. Bu dekoratorlarda tashqi funksiyaning argumentlariga murojaat qilishda foydali:" },
        { pg: "function ortiqcha(func) {\n  // Strelka o'z arguments'iga ega emas,\n  // shuning uchun tashqi arguments'ni oladi:\n  return () => func.apply(this, arguments);\n}\n\nfunction say(a, b) {\n  return a + \" va \" + b;\n}\n\nlet o_ram = ortiqcha(say);\n// o_ram(...) chaqirilganda tashqi arguments ishlatiladi", file: "strelka-arguments.js" },
        { p: "Zamonaviy kodda ko'pincha <code>arguments</code> o'rniga rest parametri (<code>...args</code>) ishlatiladi. Lekin strelkaning <code>arguments</code>ni tashqaridan olishi ba'zi holatlarda foydali qoladi." },
        { warn: "Agar strelka ichida <code>arguments</code>ni ishlatsangiz, u <strong>tashqi</strong> oddiy funksiyaning <code>arguments</code>iga ishora qiladi. Agar tashqarida hech qanday oddiy funksiya bo'lmasa, xatolik yuzaga keladi." },

        { h2: "Strelka new bilan ishlamaydi" },
        { p: "Strelka funksiyalarni <strong>konstruktor sifatida ishlatib bo'lmaydi</strong> — ular o'z <code>this</code>iga ega emasligi bilan bevosita bog'liq. <code>new</code> bilan chaqirsak, xatolik chiqadi:" },
        { code: "let Foydalanuvchi = (ism) => {\n  this.ism = ism;\n};\n\n// let u = new Foydalanuvchi(\"Ali\");\n// TypeError: Foydalanuvchi is not a constructor" },
        { p: "Obyekt yaratuvchi konstruktor kerak bo'lsa — oddiy funksiya yoki <code>class</code> ishlatiladi, strelka emas." },

        { h2: "Boshqa yo'q xususiyatlar" },
        { p: "Strelka funksiyalarda quyidagilar ham yo'q:" },
        { ul: [
          "<strong>O'z <code>this</code>i</strong> — tashqaridan olinadi;",
          "<strong><code>arguments</code> obyekti</strong> — tashqaridan olinadi;",
          "<strong><code>super</code></strong> — sinf metodlarida tashqaridan olinadi;",
          "<strong>Konstruktor sifatida ishlash</strong> (<code>new</code> ishlamaydi);",
          "<strong><code>prototype</code> xossasi</strong> — strelkada yo'q."
        ] },
        { note: "Aslida bu \"kamchiliklar\" emas — strelka ataylab shunday tarhlangan. U <em>kontekstga ega bo'lmagan, qisqa</em> funksiya sifatida ishlash uchun mo'ljallangan. \"O'z konteksti yo'qligi\" uning eng katta kuchli tomoni." },

        { h2: "Qachon foydali?" },
        { ul: [
          "Qisqa <strong>callback</strong>lar: <code>arr.map(x =&gt; x * 2)</code>, <code>arr.filter(x =&gt; x &gt; 0)</code>;",
          "Metod ichidagi <strong>ichki funksiyalar</strong> — tashqi <code>this</code>ni saqlab qolish uchun;",
          "<code>setTimeout</code>, hodisa ishlovchilarida <code>this</code>ni bog'lab qoldirish uchun."
        ] },
        { pg: "let sonlar = [1, 2, 3, 4, 5];\n\nlet ikkiBaravar = sonlar.map(x => x * 2);\nlet juftlar = sonlar.filter(x => x % 2 === 0);\nlet yigindi = sonlar.reduce((a, b) => a + b, 0);\n\nconsole.log(ikkiBaravar); // [ 2, 4, 6, 8, 10 ]\nconsole.log(juftlar);     // [ 2, 4 ]\nconsole.log(yigindi);     // 15", file: "strelka-callback.js" },
        { tip: "Qachon strelkani ISHLATMASLIK kerak? — Obyekt metodini o'zi <code>this</code> orqali obyektga murojaat qilishi kerak bo'lsa. Bunda oddiy metod sintaksisi (<code>korsat() {}</code>) to'g'ri, chunki strelkada <code>this</code> obyektga emas, global muhitga ishora qilib qoladi." },

        { h2: "Xulosa" },
        { ul: [
          "Strelkaning <strong>o'z <code>this</code>i yo'q</strong> — u tashqi funksiyadan olinadi;",
          "<code>call</code>/<code>apply</code>/<code>bind</code> strelkaning <code>this</code>ini o'zgartirmaydi;",
          "Strelkada <strong><code>arguments</code> yo'q</strong> — tashqi funksiyadan olinadi;",
          "Strelkani <strong><code>new</code> bilan ishlatib bo'lmaydi</strong> (u konstruktor emas);",
          "Strelka qisqa callback'lar va tashqi <code>this</code>ni saqlash uchun ideal;",
          "Obyektning asosiy metodlari uchun strelka o'rniga oddiy metod sintaksisidan foydalaning."
        ] }
      ]
    }
  ]
};
