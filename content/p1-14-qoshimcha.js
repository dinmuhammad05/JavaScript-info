"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Qo'shimcha mavzular",
  lessons: [
    {
      slug: "proxy-reflect",
      title: "Proxy va Reflect",
      blurb: "Proxy obyekti bilan boshqa obyekt ustidagi amallarni ushlab qolish (traps) va Reflect API bilan ularni to'g'ri bajarish.",
      body: [
        { lead: "<code>Proxy</code> boshqa obyektni \"o'rab\" oladi va u bilan bog'liq amallarni — o'qish, yozish, o'chirish kabi — ushlab qolib, o'zgartirish imkonini beradi. <code>Reflect</code> esa aynan shu amallarni past darajada bajarish uchun standart funksiyalar to'plamidir. Ular ko'pincha juft holda ishlatiladi." },

        { h2: "Proxy sintaksisi" },
        { p: "Proxy quyidagicha yaratiladi:" },
        { code: "let proxy = new Proxy(target, handler);" },
        { ul: [
          "<code>target</code> — o'raladigan asl obyekt (istalgan obyekt, jumladan funksiya yoki massiv);",
          "<code>handler</code> — <em>tuzoqlar</em> (traps) to'plami bo'lgan obyekt. Har bir tuzoq ma'lum amalni ushlab qoladi."
        ] },
        { p: "Agar <code>handler</code> bo'sh bo'lsa, proxy <code>target</code>ga shaffof o'rab beradi — barcha amallar to'g'ridan-to'g'ri asl obyektga o'tadi:" },
        { pg: "let target = { name: \"Ali\" };\nlet proxy = new Proxy(target, {});\n\nproxy.name = \"Vali\";          // proxy orqali yozamiz\nconsole.log(target.name);     // Vali (asl obyekt o'zgardi)\nconsole.log(proxy.name);      // Vali (proxy orqali o'qiymiz)", file: "proxy-shaffof.js" },
        { note: "Proxy shaffof ishlashi uchun <strong>asl obyekt bilan emas, faqat proxy bilan ishlash</strong> kerak. Proxy — obyektning ustidagi \"qatlam\"." },

        { h2: "get tuzog'i: o'qishni ushlab qolish" },
        { p: "Eng ko'p ishlatiladigan tuzoqlar — <code>get</code> (xususiyat o'qishda) va <code>set</code> (xususiyat yozishda). <code>get(target, property, receiver)</code> chaqiriladi:" },
        { ul: [
          "<code>target</code> — asl obyekt;",
          "<code>property</code> — o'qilayotgan xususiyat nomi;",
          "<code>receiver</code> — proxyning o'zi (yoki undan meros olgan obyekt)."
        ] },
        { p: "Mana mavjud bo'lmagan kalitlar uchun <strong>standart qiymat</strong> qaytaruvchi misol. Odatda mavjud bo'lmagan kalit <code>undefined</code> beradi, biz esa <code>0</code> qaytaramiz:" },
        { pg: "let sonlar = [1, 2, 3];\n\nsonlar = new Proxy(sonlar, {\n  get(target, prop) {\n    if (prop in target) {\n      return target[prop];\n    } else {\n      return 0;  // standart qiymat\n    }\n  }\n});\n\nconsole.log(sonlar[1]);    // 2 (mavjud)\nconsole.log(sonlar[123]);  // 0 (mavjud emas -> 0)", file: "proxy-get-default.js" },

        { h2: "set tuzog'i: validatsiya" },
        { p: "<code>set(target, property, value, receiver)</code> yozishni ushlab qoladi. U <strong>albatta</strong> qiymat qabul qilinganda <code>true</code>, rad etilganda <code>false</code> qaytarishi kerak. <code>false</code> qaytsa (yoki qat'iy rejimda) <code>TypeError</code> yuzaga keladi." },
        { p: "Massivga faqat butun son qo'shishga ruxsat beruvchi validatsiya:" },
        { pg: "let raqamlar = [];\n\nraqamlar = new Proxy(raqamlar, {\n  set(target, prop, val) {\n    if (typeof val === \"number\") {\n      target[prop] = val;\n      return true;\n    } else {\n      return false;  // rad etamiz\n    }\n  }\n});\n\nraqamlar.push(5);\nraqamlar.push(10);\nconsole.log(\"Uzunlik: \" + raqamlar.length);  // 2\nconsole.log(raqamlar[0] + \", \" + raqamlar[1]);  // 5, 10", file: "proxy-set-validatsiya.js" },
        { warn: "Tuzoqlar amallarni <strong>shaffof</strong> ushlab qolishi kerak. <code>set</code>da <code>return true</code>ni unutmang — aks holda amal muvaffaqiyatsiz deb hisoblanadi va xatolik chiqadi." },

        { h2: "has va deleteProperty tuzoqlari" },
        { p: "<code>has(target, property)</code> — <code>in</code> operatorini ushlab qoladi. Quyida <code>range</code> obyekti oraliqqa tegishlilikni tekshiradi:" },
        { pg: "let range = { start: 1, end: 10 };\n\nrange = new Proxy(range, {\n  has(target, prop) {\n    return prop >= target.start && prop <= target.end;\n  }\n});\n\nconsole.log(5 in range);   // true\nconsole.log(50 in range);  // false", file: "proxy-has.js" },
        { p: "<code>deleteProperty(target, property)</code> — <code>delete</code>ni ushlab qoladi. Masalan, <code>_</code> bilan boshlangan \"maxfiy\" xususiyatlarni o'chirishni taqiqlaymiz:" },
        { pg: "let user = { name: \"Ali\", _parol: \"12345\" };\n\nuser = new Proxy(user, {\n  deleteProperty(target, prop) {\n    if (prop.startsWith(\"_\")) {\n      return false;  // maxfiy - o'chirmaymiz\n    }\n    delete target[prop];\n    return true;\n  }\n});\n\ndelete user.name;\nconsole.log(\"name mavjudmi: \" + (\"name\" in user));  // false", file: "proxy-delete.js" },

        { h2: "Reflect API" },
        { p: "<code>Reflect</code> — obyekt ustidagi ichki amallarni chaqirish uchun standart obyekt. Uning har bir metodi biror tuzoq bilan mos keladi: <code>Reflect.get</code>, <code>Reflect.set</code>, <code>Reflect.has</code>, <code>Reflect.deleteProperty</code> va hokazo." },
        { p: "Tuzoq ichida asl amalni bajarishning eng to'g'ri usuli — mos <code>Reflect</code> metodini chaqirish. Bu <code>receiver</code>ni to'g'ri uzatadi va meros (inheritance) holatlarida ham xatosiz ishlaydi:" },
        { pg: "let user = { name: \"Ali\" };\n\nuser = new Proxy(user, {\n  get(target, prop, receiver) {\n    console.log(\"O'qildi: \" + prop);\n    return Reflect.get(target, prop, receiver);\n  },\n  set(target, prop, val, receiver) {\n    console.log(\"Yozildi: \" + prop + \" = \" + val);\n    return Reflect.set(target, prop, val, receiver);\n  }\n});\n\nuser.name;            // O'qildi: name\nuser.name = \"Vali\";   // Yozildi: name = Vali", file: "reflect-get-set.js" },
        { tip: "Qoida: <strong>tuzoq ichida asl amalni <code>target[prop]</code> deb emas, <code>Reflect.get(target, prop, receiver)</code> deb bajaring</strong>. Bu <code>receiver</code> orqali <code>this</code>ni to'g'ri saqlaydi." },

        { h2: "Cheklovlar" },
        { p: "Proxy kuchli, lekin ba'zi cheklovlari bor:" },
        { ul: [
          "Ba'zi ichki obyektlar (masalan <code>Map</code>, <code>Set</code>, <code>Date</code>) <em>ichki slotlar</em>ga ega — ularni to'g'ridan-to'g'ri proxylash muammo tug'diradi. Yechim: metodni <code>bind</code> qilish;",
          "Xususiy sinf maydonlari (<code>#field</code>) ham ichki slotdan foydalanadi;",
          "Proxy asl obyektdan biroz sekinroq ishlaydi — juda tez-tez chaqiriladigan joylarda buni hisobga oling."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<code>new Proxy(target, handler)</code> — obyekt ustidagi amallarni ushlab qolish uchun \"o'rovchi\";",
          "Asosiy tuzoqlar: <code>get</code>, <code>set</code>, <code>has</code>, <code>deleteProperty</code> va boshqalar;",
          "<code>set</code> tuzog'i <code>true</code>/<code>false</code> qaytarishi shart;",
          "<code>Reflect</code> — tuzoq ichida asl amalni to'g'ri bajarish uchun ishlatiladi;",
          "Qo'llanilishi: validatsiya, standart qiymat, kirishni cheklash, kuzatuv (logging)."
        ] }
      ]
    },

    {
      slug: "eval",
      title: "Eval: kod satrini ishga tushirish",
      blurb: "eval() funksiyasi bilan satr ko'rinishidagi kodni bajarish, uning ko'lami, xavflari va zamonaviy muqobillari.",
      body: [
        { lead: "<code>eval</code> — o'rnatilgan funksiya bo'lib, satr (string) ko'rinishida berilgan JavaScript kodini ishga tushirib, natijasini qaytaradi. U kuchli, ammo xavfli — shu sabab zamonaviy kodda deyarli ishlatilmaydi." },

        { h2: "Sintaksis" },
        { p: "<code>eval(code)</code> satrni kod sifatida bajaradi va oxirgi ifodaning qiymatini qaytaradi:" },
        { pg: "let natija = eval(\"2 + 2 * 3\");\nconsole.log(natija);  // 8\n\nlet kod = \"let x = 10; x * x\";\nconsole.log(eval(kod));  // 100", file: "eval-oddiy.js" },
        { p: "Kod bir nechta ifoda va operatordan iborat bo'lishi mumkin:" },
        { pg: "let kod = \"let a = 5; let b = 7; a * b + 1\";\nconsole.log(eval(kod));  // 36", file: "eval-kop.js" },

        { h2: "eval ko'lami (scope)" },
        { p: "<code>eval</code> ichidagi kod <strong>joriy leksik ko'lamda</strong> ishlaydi, ya'ni atrofdagi o'zgaruvchilarni ko'ra oladi:" },
        { pg: "let salom = \"Salom\";\n\neval(\"console.log(salom + ', dunyo!')\");  // Salom, dunyo!", file: "eval-scope.js" },
        { note: "Zamonaviy qat'iy rejimda (<code>\"use strict\"</code>) <code>eval</code> ichida e'lon qilingan o'zgaruvchilar tashqi ko'lamga <strong>sizib chiqmaydi</strong> — ular faqat <code>eval</code> ichida yashaydi. Bu tashqi kodni ifloslanishdan himoya qiladi." },
        { pg: "\"use strict\";\n\neval(\"let mahalliy = 100; console.log(mahalliy)\");  // 100\n\n// bu yerda 'mahalliy' mavjud emas\nconsole.log(typeof mahalliy);  // undefined", file: "eval-strict.js" },

        { h2: "Nega eval xavfli?" },
        { p: "<code>eval</code> odatda quyidagi sabablarga ko'ra tavsiya etilmaydi:" },
        { ul: [
          "<strong>Xavfsizlik</strong> — agar satr foydalanuvchidan yoki tashqi manbadan kelsa, unda zararli kod bo'lishi mumkin. <code>eval</code> uni cheklovsiz bajaradi;",
          "<strong>Sekinlik</strong> — dvigatel <code>eval</code> ichidagi kodni oldindan kompilyatsiya va optimallashtira olmaydi;",
          "<strong>Nosozliklarni tuzatishda qiyinchilik</strong> — satr ichidagi kodni tahrirlagichlar tekshirmaydi, xatolarni topish qiyin;",
          "<strong>Minifikatsiya muammosi</strong> — kod qisqartirilganda tashqi o'zgaruvchilar nomi o'zgaradi, <code>eval</code> ichidagi satr esa eskicha qoladi va buziladi."
        ] },
        { warn: "Foydalanuvchi kiritgan matnni <strong>hech qachon</strong> to'g'ridan-to'g'ri <code>eval</code>ga bermang. Bu ilovangizni to'liq egallab olishga imkon beruvchi jiddiy xavfsizlik teshigi." },

        { h2: "Muqobillar" },
        { p: "Deyarli har doim <code>eval</code>siz yaxshiroq yechim topiladi:" },
        { ul: [
          "Obyekt xususiyatiga dinamik nom bilan murojaat — <code>obj[nomSatr]</code> (kvadrat qavs);",
          "JSON matnini o'qish — <code>JSON.parse(satr)</code> (<code>eval</code>dan xavfsiz va tez);",
          "Nomga ko'ra funksiya chaqirish — funksiyalarni obyektga (\"lug'atga\") joylash;",
          "Cheklangan, izolyatsiyalangan bajarish kerak bo'lsa — <code>new Function</code> yoki Web Worker."
        ] },
        { p: "Dinamik xususiyat nomi bilan <code>eval</code>siz ishlash:" },
        { pg: "let user = { name: \"Ali\", yosh: 25 };\nlet kalit = \"yosh\";\n\n// Yomon: eval('user.' + kalit)\n// Yaxshi:\nconsole.log(user[kalit]);  // 25", file: "eval-muqobil.js" },
        { p: "<code>new Function</code> — <code>eval</code>ga o'xshaydi, lekin kodni <strong>global ko'lamda</strong> ishlatadi, shuning uchun tashqi mahalliy o'zgaruvchilarga tegmaydi (bu esa aksincha xavfsizroq):" },
        { pg: "let qoshuv = new Function(\"a\", \"b\", \"return a + b\");\nconsole.log(qoshuv(3, 4));  // 7", file: "new-function.js" },
        { tip: "Agar dinamik kod juda zarur bo'lsa, <code>eval</code> o'rniga <code>new Function</code>ni afzal ko'ring — u tashqi ko'lamga kira olmaydi, demak kamroq xavf tug'diradi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>eval(code)</code> satr ko'rinishidagi kodni bajaradi va oxirgi ifoda qiymatini qaytaradi;",
          "U joriy ko'lamni ko'radi; qat'iy rejimda o'zgaruvchilari sizib chiqmaydi;",
          "Xavfsizlik, sekinlik va nosozlik tuzatish sabablariga ko'ra tavsiya etilmaydi;",
          "Ko'p hollarda kvadrat qavs, <code>JSON.parse</code> yoki obyekt-lug'at yechadi;",
          "Chindan kerak bo'lsa — <code>new Function</code> xavfsizroq muqobil."
        ] }
      ]
    },

    {
      slug: "currying",
      title: "Karrilash (Currying)",
      blurb: "Ko'p argumentli funksiyani f(a)(b)(c) ko'rinishidagi bir argumentli funksiyalar zanjiriga aylantirish va qisman qo'llash.",
      body: [
        { lead: "<em>Karrilash</em> (currying) — <code>f(a, b, c)</code> ko'rinishida chaqiriladigan funksiyani <code>f(a)(b)(c)</code> ko'rinishida chaqiriladigan qilib aylantirish usuli. Bu funksiyani \"o'chirmaydi\", faqat qayta o'raydi. U <em>qisman qo'llash</em> (partial application) uchun juda qulay." },

        { h2: "Oddiy misol" },
        { p: "Ikki argumentli funksiyani qo'lda karrilaymiz:" },
        { pg: "function karrila(f) {\n  return function(a) {\n    return function(b) {\n      return f(a, b);\n    };\n  };\n}\n\nfunction yigindi(a, b) {\n  return a + b;\n}\n\nlet karrilangan = karrila(yigindi);\n\nconsole.log(karrilangan(1)(2));  // 3", file: "curry-oddiy.js" },
        { p: "<code>karrilangan(1)</code> chaqirilganda argument \"eslab qolinadi\" va yangi funksiya qaytadi. Keyin <code>(2)</code> chaqirilganda haqiqiy hisob amalga oshadi." },

        { h2: "Qisman qo'llash" },
        { p: "Karrilashning asosiy foydasi — funksiyani <strong>qisman</strong> chaqirib, oldindan sozlangan yangi funksiya olish:" },
        { pg: "function karrila(f) {\n  return function(a) {\n    return function(b) {\n      return f(a, b);\n    };\n  };\n}\n\nfunction kopaytir(a, b) {\n  return a * b;\n}\n\nlet karrilangan = karrila(kopaytir);\n\nlet ikkiBarobar = karrilangan(2);   // b'ni kutayotgan funksiya\n\nconsole.log(ikkiBarobar(5));   // 10\nconsole.log(ikkiBarobar(8));   // 16", file: "curry-qisman.js" },
        { note: "<code>ikkiBarobar</code> — birinchi argumenti <code>2</code> deb qotirilgan yangi funksiya. Bu <em>qisman qo'llash</em>: funksiyaning bir qismini oldindan to'ldirib qo'yamiz." },

        { h2: "Ilg'or curry yordamchisi" },
        { p: "Amaliy <code>curry</code> odatda <strong>ikkala</strong> ko'rinishda ham chaqirilishga ruxsat beradi: <code>curry(f)(a)(b)(c)</code> ham, <code>curry(f)(a, b, c)</code> ham. Agar yetarli argument berilsa, funksiya darhol chaqiriladi; aks holda kutuvchi funksiya qaytadi:" },
        { pg: "function curry(func) {\n  return function curried(...args) {\n    if (args.length >= func.length) {\n      return func.apply(this, args);\n    } else {\n      return function(...args2) {\n        return curried.apply(this, args.concat(args2));\n      };\n    }\n  };\n}\n\nfunction sum(a, b, c) {\n  return a + b + c;\n}\n\nlet s = curry(sum);\n\nconsole.log(s(1, 2, 3));   // 3\nconsole.log(s(1)(2)(3));   // 6\nconsole.log(s(1, 2)(3));   // 6", file: "curry-universal.js" },
        { p: "Bu yerda <code>func.length</code> — funksiyaning e'lon qilingan argumentlari soni. Agar to'plangan argumentlar shu songa yetsa, funksiya chaqiriladi." },
        { warn: "Bu ko'rinishdagi karrilash <strong>faqat qat'iy sondagi argumentli</strong> funksiyalar uchun ishlaydi. <code>...rest</code> parametrli yoki noaniq argumentli funksiyalarda <code>func.length</code> to'g'ri hisoblanmaydi." },

        { h2: "Amaliy foyda: log funksiyasi" },
        { p: "Karrilashning klassik amaliy misoli — sozlanadigan <code>log</code> funksiyasi. Vaqt, jurnal darajasi va xabarni oladigan funksiyani karrilaymiz, so'ng ma'lum darajalar uchun tayyor funksiyalar yasaymiz:" },
        { pg: "function curry(func) {\n  return function curried(...args) {\n    if (args.length >= func.length) {\n      return func.apply(this, args);\n    }\n    return (...a2) => curried.apply(this, args.concat(a2));\n  };\n}\n\nfunction log(soat, daraja, xabar) {\n  return \"[\" + soat + \":00] [\" + daraja + \"] \" + xabar;\n}\n\nlet clog = curry(log);\n\n// soat 9 uchun tayyor funksiya\nlet log9 = clog(9);\nconsole.log(log9(\"DEBUG\", \"boshlandi\"));\n// [9:00] [DEBUG] boshlandi\n\n// soat 9, DEBUG uchun tayyor funksiya\nlet debug9 = clog(9)(\"DEBUG\");\nconsole.log(debug9(\"ulanish tekshirildi\"));\n// [9:00] [DEBUG] ulanish tekshirildi", file: "curry-log.js" },
        { tip: "Karrilash sizga bitta umumiy funksiyadan <strong>maxsuslashtirilgan</strong> funksiyalar oilasini yasash imkonini beradi — kodni takrorlamasdan." },

        { h2: "Xulosa" },
        { ul: [
          "Karrilash <code>f(a, b, c)</code>ni <code>f(a)(b)(c)</code>ga aylantiradi, funksiyani o'zgartirmaydi;",
          "Asosiy foydasi — <em>qisman qo'llash</em>: argumentlarni oldindan qotirib, yangi funksiya olish;",
          "Ilg'or <code>curry</code> yordamchisi ikkala chaqirish uslubini ham qo'llab-quvvatlaydi;",
          "U <code>func.length</code>ga tayanadi, shuning uchun qat'iy argumentli funksiyalar uchun mos;",
          "Amaliy qo'llanishi: sozlanadigan log, formatlash, tayyor filtrlar."
        ] }
      ]
    },

    {
      slug: "reference-type",
      title: "Reference Type",
      blurb: "Nega obj.method() this'ni to'g'ri oladi-yu, (obj.method)() yoki metodni o'zgaruvchiga ko'chirish this'ni yo'qotadi — ichki Reference Type mexanizmi.",
      body: [
        { lead: "Ba'zan metod chaqiruvi kutilmaganda <code>this</code>ni yo'qotadi. Buning sababi — JavaScript ichida yashiringan <em>Reference Type</em> (\"ma'lumotnoma turi\") deb ataluvchi maxsus qiymat turi. Uni tushunsak, chalkash holatlar aniq bo'ladi." },

        { h2: "Muammo: yo'qolgan this" },
        { p: "Quyidagi kodda oddiy chaqiruv ishlaydi, lekin metodni oldin ajratib, keyin chaqirsak — <code>this</code> yo'qoladi:" },
        { pg: "let user = {\n  name: \"Ali\",\n  salom() {\n    return \"Salom, \" + this.name;\n  }\n};\n\nconsole.log(user.salom());  // Salom, Ali (ishlaydi)\n\nlet f = user.salom;\ntry {\n  console.log(f());  // this yo'qoladi -> xato\n} catch (e) {\n  console.log(\"Xato: this yo'qoldi\");\n}", file: "ref-muammo.js" },
        { p: "Xuddi shunday, chaqiruvni murakkabroq ifodaga o'rasak ham <code>this</code> yo'qolishi mumkin:" },
        { pg: "let user = {\n  name: \"Ali\",\n  salom() { return this.name; }\n};\n\n// oddiy chaqiruv - ishlaydi\nconsole.log(user.salom());  // Ali\n\n// || bilan tanlash - this yo'qoladi\ntry {\n  console.log((user.salom || user.salom)());\n} catch (e) {\n  console.log(\"Xato: bu holatda this yo'qoladi\");\n}", file: "ref-murakkab.js" },

        { h2: "Nuqta amali nima qaytaradi?" },
        { p: "Sir shundaki, <code>user.salom</code> ifodasi oddiy funksiyani emas, balki maxsus <strong>Reference Type</strong> qiymatini qaytaradi. Bu til ichidagi qiymat bo'lib, uch narsani birlashtiradi:" },
        { ul: [
          "<code>base</code> — obyektning o'zi (<code>user</code>);",
          "<code>name</code> — xususiyat nomi (<code>\"salom\"</code>);",
          "<code>strict</code> — qat'iy rejim yoqilganmi (bayroq)."
        ] },
        { p: "Ya'ni <code>user.salom</code> mantiqan quyidagicha:" },
        { code: "// (base, name, strict) uchligi\n(user, \"salom\", true)" },
        { note: "Reference Type — bu tilning <strong>ichki, oraliq</strong> turi. Uni to'g'ridan-to'g'ri o'zgaruvchiga saqlab bo'lmaydi; u faqat nuqta amali natijasi sifatida qisqa vaqt yashaydi." },

        { h2: "Chaqiruv qanday ishlaydi?" },
        { p: "<code>()</code> chaqiruv operatori o'zidan oldingi qiymatni ko'radi:" },
        { ul: [
          "Agar bu <strong>Reference Type</strong> bo'lsa — <code>()</code> uning <code>base</code>ini <code>this</code> qilib oladi. Shu sabab <code>user.salom()</code>da <code>this = user</code>;",
          "Agar bu <strong>oddiy funksiya</strong> bo'lsa (Reference Type emas) — <code>this = undefined</code> (qat'iy rejimda)."
        ] },
        { p: "Endi hamma narsa tushunarli:" },
        { ul: [
          "<code>user.salom()</code> — <code>user.salom</code> Reference Type qaytaradi, <code>()</code> undan <code>base</code>ni oladi. <code>this = user</code>;",
          "<code>let f = user.salom; f()</code> — o'zgaruvchiga yozishda Reference Type <strong>yo'qoladi</strong>, faqat funksiyaning o'zi ko'chadi. <code>this = undefined</code>;",
          "<code>(user.salom || null)()</code> — <code>||</code> operatori Reference Typeni oddiy funksiyaga aylantiradi. <code>this = undefined</code>."
        ] },
        { warn: "Reference Type faqat <strong>nuqta yoki kvadrat qavsdan bevosita keyin</strong> chaqiruv qilinganda saqlanadi: <code>obj.method()</code> yoki <code>obj[\"method\"]()</code>. Har qanday oraliq amal (o'zgaruvchiga yozish, <code>||</code>, qavsda saqlash) uni yo'qotadi." },

        { h2: "Yechim: this'ni qotirish" },
        { p: "Agar metodni ajratib olib, alohida uzatishimiz kerak bo'lsa, <code>this</code>ni <code>bind</code> orqali qotiramiz yoki o'q funksiyaga o'raymiz:" },
        { pg: "let user = {\n  name: \"Ali\",\n  salom() { return \"Salom, \" + this.name; }\n};\n\n// bind bilan this'ni qotiramiz\nlet f = user.salom.bind(user);\nconsole.log(f());  // Salom, Ali\n\n// yoki o'q funksiya bilan o'raymiz\nlet g = () => user.salom();\nconsole.log(g());  // Salom, Ali", file: "ref-yechim.js" },
        { tip: "Metodni callback sifatida uzatayotganda (masalan <code>setTimeout(user.salom)</code>) doim <code>this</code>ni <code>bind</code> qiling yoki <code>() =&gt; user.salom()</code> deb o'rang." },

        { h2: "Xulosa" },
        { ul: [
          "<code>obj.method</code> ifodasi oddiy funksiya emas, ichki <em>Reference Type</em> qiymatini qaytaradi;",
          "Reference Type <code>base</code>, <code>name</code> va <code>strict</code>ni birlashtiradi;",
          "<code>()</code> chaqiruvi Reference Typedan <code>base</code>ni olib, <code>this</code> qiladi;",
          "O'zgaruvchiga yozish, <code>||</code>, qavs kabi oraliq amallar Reference Typeni yo'qotadi -> <code>this</code> yo'qoladi;",
          "Yechim: <code>bind</code> yoki o'q funksiya bilan o'rash."
        ] }
      ]
    },

    {
      slug: "bigint",
      title: "BigInt",
      blurb: "2 in 53 dan katta butun sonlar bilan aniq ishlash uchun BigInt turi: 123n yozuvi, amallar va Number bilan aralashtirmaslik.",
      body: [
        { lead: "Oddiy <code>Number</code> turi taxminan <code>2**53</code> dan katta butun sonlarni <strong>aniq</strong> saqlay olmaydi. <code>BigInt</code> — bu cheklovsiz uzunlikdagi butun sonlar bilan ishlash uchun maxsus raqamli tur." },

        { h2: "Muammo: Number chegarasi" },
        { p: "Oddiy sonlarda xavfsiz butun sonlar chegarasi bor — <code>Number.MAX_SAFE_INTEGER</code>. Undan tashqarida aniqlik yo'qoladi:" },
        { pg: "console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991\n\n// chegaradan tashqarida aniqlik yo'qoladi\nconsole.log(9007199254740991 + 1);  // 9007199254740992\nconsole.log(9007199254740991 + 2);  // 9007199254740992 (xato!)", file: "bigint-muammo.js" },
        { p: "Ikkala qo'shish ham bir xil natija berdi — bu aniqlik yo'qolganidan. Aynan shunday hollarda <code>BigInt</code> kerak." },

        { h2: "BigInt yaratish" },
        { p: "<code>BigInt</code> ikki usulda yoziladi: son oxiriga <code>n</code> qo'shib yoki <code>BigInt()</code> funksiyasi bilan:" },
        { pg: "let katta = 1234567890123456789012345678901234567890n;\nconsole.log(katta);\n\nlet b = BigInt(\"9007199254740993\");\nconsole.log(b);\n\nlet c = BigInt(10);\nconsole.log(c);  // 10n", file: "bigint-yaratish.js" },
        { p: "BigInt bilan qo'shish aniq bo'ladi:" },
        { pg: "let x = 9007199254740991n;\n\nconsole.log(x + 1n);  // 9007199254740992n\nconsole.log(x + 2n);  // 9007199254740993n (endi to'g'ri!)", file: "bigint-aniq.js" },

        { h2: "Amallar" },
        { p: "BigInt oddiy arifmetik amallarni qo'llab-quvvatlaydi. Faqat bo'lish natijasi <strong>butunga yaxlitlanadi</strong> (kasr qismi tashlanadi):" },
        { pg: "console.log(5n + 3n);   // 8n\nconsole.log(5n * 3n);   // 15n\nconsole.log(5n - 8n);   // -3n\nconsole.log(5n / 2n);   // 2n (kasr tashlanadi!)\nconsole.log(5n % 2n);   // 1n\nconsole.log(2n ** 10n); // 1024n", file: "bigint-amallar.js" },
        { note: "Unar plyus (<code>+bigint</code>) BigInt bilan <strong>ishlamaydi</strong> — u xatolik beradi. Boshqa arifmetik va taqqoslash amallari esa normal ishlaydi." },

        { h2: "Number bilan aralashtirmaslik" },
        { p: "Eng muhim qoida: BigInt va Numberni bir amalda <strong>aralashtira olmaysiz</strong> — bu <code>TypeError</code> beradi:" },
        { pg: "try {\n  console.log(5n + 3);  // xato!\n} catch (e) {\n  console.log(\"Xato: BigInt va Number aralashtirildi\");\n}\n\n// avval bir turga o'tkazish kerak:\nconsole.log(5n + BigInt(3));   // 8n\nconsole.log(Number(5n) + 3);   // 8", file: "bigint-aralash.js" },
        { warn: "<code>BigInt</code>ni <code>Number</code>ga o'tkazganda (<code>Number(katta)</code>) katta qiymatlarda aniqlik yo'qolishi mumkin. Faqat qiymat xavfsiz chegarada bo'lsa o'tkazing." },

        { h2: "Taqqoslash va mantiqiy kontekst" },
        { p: "Taqqoslashda esa BigInt va Number bemalol aralashadi (qiymatlari solishtiriladi), lekin qat'iy tenglik (<code>===</code>) turni ham tekshiradi:" },
        { pg: "console.log(5n > 3);     // true\nconsole.log(5n == 5);    // true (qiymat teng)\nconsole.log(5n === 5);   // false (tur boshqa)\n\n// mantiqiy kontekstda 0n - false, qolganlari - true\nif (0n) {\n  console.log(\"bajarilmaydi\");\n} else {\n  console.log(\"0n - false\");  // shu chiqadi\n}", file: "bigint-taqqoslash.js" },
        { p: "<code>typeof</code> BigInt uchun alohida qiymat qaytaradi:" },
        { pg: "console.log(typeof 10n);        // bigint\nconsole.log(typeof BigInt(5));  // bigint", file: "bigint-typeof.js" },

        { h2: "Qo'llanilishi" },
        { p: "BigInt qachon kerak bo'ladi?" },
        { ul: [
          "Kriptografiya — juda katta sonlar bilan hisoblash;",
          "Yuqori aniqlikdagi vaqt tamg'alari (nanosekundlar);",
          "Katta identifikatorlar (masalan, ba'zi tizimlarning 64-bitli ID lari);",
          "Moliyaviy hisob-kitoblar, o'lchamdan chiqib ketishi mumkin bo'lgan hollar."
        ] },
        { tip: "Agar sonlaringiz <code>2**53</code> chegarasidan oshib ketmasa, oddiy <code>Number</code> yetarli va tezroq. <code>BigInt</code>ni faqat chindan zarur bo'lganda ishlating." },

        { h2: "Xulosa" },
        { ul: [
          "<code>BigInt</code> — cheklovsiz uzunlikdagi butun sonlar uchun tur;",
          "Yozilishi: <code>123n</code> yoki <code>BigInt(123)</code>;",
          "Bo'lish butunga yaxlitlanadi; unar plyus ishlamaydi;",
          "BigInt va Numberni arifmetikada aralashtirib bo'lmaydi (<code>TypeError</code>), lekin taqqoslash mumkin;",
          "<code>typeof</code> \"bigint\" beradi; kriptografiya va katta ID larda foydali."
        ] }
      ]
    },

    {
      slug: "unicode",
      title: "Unicode, satr ichki tuzilishi",
      blurb: "Satrlar UTF-16 da qanday saqlanadi, surrogat juftlar, kod nuqtalari, codePointAt va emoji uzunligi muammosi.",
      body: [
        { lead: "JavaScript satrlari <strong>UTF-16</strong> kodlashiga asoslanadi. Ko'p belgilar bitta \"kod birligi\"ga sig'adi, lekin ba'zilari (emoji, kam uchraydigan iyerogliflar) ikkitaga bo'linadi — bu esa satr uzunligi bilan bog'liq chalkashliklar keltirib chiqaradi." },

        { h2: "Kod birligi va kod nuqtasi" },
        { p: "Ikki muhim tushuncha:" },
        { ul: [
          "<strong>Kod birligi</strong> (code unit) — UTF-16 dagi 16-bitli qism. <code>str.length</code> aynan shu birliklarni sanaydi;",
          "<strong>Kod nuqtasi</strong> (code point) — belgiga to'liq mos keluvchi Unicode raqami. Ba'zi belgilar bitta kod nuqtasi, lekin ikkita kod birligidan iborat."
        ] },
        { p: "Oddiy belgilar uchun bu bir xil:" },
        { pg: "let s = \"salom\";\nconsole.log(s.length);  // 5\nconsole.log(s[0]);      // s\nconsole.log(s.charCodeAt(0));  // 115", file: "unicode-oddiy.js" },

        { h2: "Surrogat juftlar" },
        { p: "Kod nuqtasi <code>U+FFFF</code> dan katta bo'lgan belgilar (emoji, ba'zi harflar) ikkita kod birligi — <strong>surrogat juft</strong> bilan ifodalanadi. Shu sabab bitta emoji <code>length</code> bo'yicha \"2\" deb sanaladi:" },
        { pg: "let yurak = \"\\u{1F600}\";  // tabassum emojisi\n\nconsole.log(yurak.length);  // 2 (surrogat juft!)\n\nlet harf = \"a\";\nconsole.log(harf.length);   // 1", file: "unicode-surrogat.js" },
        { warn: "Emoji yoki maxsus belgilar bilan ishlaganda <code>str.length</code> <strong>ko'rinadigan belgilar sonini bermaydi</strong>. U kod birliklarini sanaydi, emoji esa 2 (ba'zan undan ko'p) birlik oladi." },

        { h2: "codePointAt va charCodeAt" },
        { p: "<code>charCodeAt(i)</code> berilgan pozitsiyadagi <strong>kod birligini</strong> (0..65535) qaytaradi. <code>codePointAt(i)</code> esa surrogat juftni to'g'ri o'qib, <strong>to'liq kod nuqtasini</strong> qaytaradi:" },
        { pg: "let s = \"\\u{1F600}\";  // emoji\n\nconsole.log(s.charCodeAt(0));   // 55357 (yarim surrogat)\nconsole.log(s.codePointAt(0));  // 128512 (to'liq kod nuqtasi)\n\n// raqamdan belgi yasash\nconsole.log(String.fromCodePoint(128512));  // emoji", file: "unicode-codepoint.js" },
        { note: "<code>codePointAt</code> va <code>String.fromCodePoint</code> — surrogat juftlarni to'g'ri qayta ishlaydigan zamonaviy juftlik. Eski <code>charCodeAt</code>/<code>fromCharCode</code> faqat bitta kod birligi bilan ishlaydi." },

        { h2: "\\u escape ketma-ketligi" },
        { p: "Unicode belgini kodi orqali yozishning uch usuli bor:" },
        { ul: [
          "<code>\\xXX</code> — ikki o'n oltilik raqam (0..255);",
          "<code>\\uXXXX</code> — to'rt o'n oltilik raqam (bitta UTF-16 birligi);",
          "<code>\\u{X...}</code> — jingalak qavsda istalgan kod nuqtasi (5-6 raqamli belgilar uchun)."
        ] },
        { pg: "console.log(\"\\x41\");        // A\nconsole.log(\"\\u0041\");      // A\nconsole.log(\"\\u{1F60E}\");   // ko'zoynakli emoji\nconsole.log(\"\\u00e9\");      // e (urg'uli)", file: "unicode-escape.js" },

        { h2: "Emoji uzunligini to'g'ri sanash" },
        { p: "Ko'rinadigan belgilarni to'g'ri sanash uchun satrni <code>for..of</code> yoki spread (<code>[...str]</code>) bilan aylantiring — ular kod nuqtalari bo'yicha yuradi, surrogat juftni butun deb oladi:" },
        { pg: "let s = \"a\\u{1F600}b\";  // a, emoji, b\n\nconsole.log(s.length);  // 4 (emoji 2 birlik)\n\n// to'g'ri sanash:\nconsole.log([...s].length);  // 3\n\nfor (let belgi of s) {\n  console.log(belgi);  // a, emoji, b - alohida\n}", file: "unicode-sanash.js" },
        { warn: "Bu ham hamma holatni yechmaydi: bayroq emojilari yoki teri rangi modifikatori qo'shilgan emojilar bir nechta kod nuqtasidan iborat bo'lib, <code>for..of</code> ularni bo'lib yuboradi. To'liq aniq sanash uchun <code>Intl.Segmenter</code> ishlatiladi." },
        { tip: "Foydalanuvchi kiritgan matn uzunligini cheklaganizda <code>str.length</code>ga ko'r-ko'rona ishonmang — emojili matnlarda u ko'rinadigan belgilardan katta bo'ladi." },

        { h2: "Xulosa" },
        { ul: [
          "JavaScript satrlari UTF-16 da saqlanadi; <code>str.length</code> kod birliklarini sanaydi;",
          "Kod nuqtasi <code>U+FFFF</code> dan katta belgilar <em>surrogat juft</em> (2 birlik) bilan yoziladi;",
          "<code>codePointAt</code> va <code>String.fromCodePoint</code> surrogat juftlarni to'g'ri qayta ishlaydi;",
          "<code>\\xXX</code>, <code>\\uXXXX</code>, <code>\\u{X...}</code> — belgini kodi orqali yozish usullari;",
          "Ko'rinadigan belgilarni sanash uchun <code>[...str]</code> yoki <code>for..of</code> (murakkab hollarda <code>Intl.Segmenter</code>)."
        ] }
      ]
    },

    {
      slug: "weakref",
      title: "WeakRef va FinalizationRegistry",
      blurb: "Obyektni axlat yig'ishga to'sqinlik qilmasdan zaif havola saqlash (WeakRef) va u yo'q qilingach xabar olish (FinalizationRegistry).",
      body: [
        { lead: "Odatda obyektga havola bo'lsa, u xotirada saqlanadi — axlat yig'uvchi (garbage collector) uni o'chirmaydi. <code>WeakRef</code> esa <em>zaif</em> havola yaratadi: u obyekt yashashini <strong>kafolatlamaydi</strong>, shuning uchun kerak bo'lganda obyekt xotiradan tozalanishi mumkin." },

        { h2: "Odatiy (kuchli) havola muammosi" },
        { p: "Oddiy havola obyektni \"ushlab turadi\". Kesh (cache) yasaganda bu muammo: keshdagi obyekt boshqa hech kimga kerak bo'lmasa ham, kesh uni ushlab turgani uchun xotira bo'shamaydi." },
        { p: "<code>WeakRef</code> shu muammoni yechadi — u obyektga <strong>ushlab turmaydigan</strong> havola beradi." },
        { code: "let obyekt = { data: \"katta ma'lumot\" };\nlet zaifHavola = new WeakRef(obyekt);\n\n// obyektga murojaat qilish uchun deref() ishlatiladi\nlet olingan = zaifHavola.deref();" },
        { note: "<code>WeakMap</code>/<code>WeakSet</code>dan farqi: ular <em>butun kolleksiya</em>ni zaiflashtiradi, <code>WeakRef</code> esa <strong>bitta obyektga</strong> nozik nazorat beradi." },

        { h2: "deref() metodi" },
        { p: "Zaif havoladan obyektni olish uchun <code>deref()</code> chaqiriladi. Agar obyekt hali xotirada bo'lsa — o'zini qaytaradi; allaqachon tozalangan bo'lsa — <code>undefined</code>:" },
        { code: "let havola = new WeakRef({ name: \"Ali\" });\n\nlet obyekt = havola.deref();\nif (obyekt !== undefined) {\n  // obyekt hali mavjud, ishlatsa bo'ladi\n  console.log(obyekt.name);\n} else {\n  // obyekt tozalangan\n  console.log(\"Obyekt yo'q qilingan\");\n}" },
        { warn: "Har safar <code>deref()</code> chaqirganda natijani <strong>albatta tekshiring</strong>. U istalgan vaqtda <code>undefined</code> qaytarishi mumkin — hech qachon obyekt mavjudligiga ishonch bilan yondashmang." },

        { h2: "Kesh misoli" },
        { p: "<code>WeakRef</code>ning tipik qo'llanishi — xotirani band qilmaydigan kesh. Quyida rasmlarni keshlash misoli: agar keshdagi obyekt hali xotirada bo'lsa, uni qayta ishlatamiz; bo'lmasa qaytadan yaratamiz." },
        { code: "let kesh = new Map();\n\nfunction rasmOlish(nom) {\n  let havola = kesh.get(nom);\n  let rasm = havola ? havola.deref() : undefined;\n\n  if (rasm === undefined) {\n    // yo'q yoki tozalangan - qaytadan yaratamiz\n    rasm = { nom: nom, data: \"...og'ir ma'lumot...\" };\n    kesh.set(nom, new WeakRef(rasm));\n  }\n\n  return rasm;\n}\n\nlet a = rasmOlish(\"logo.png\");\nlet b = rasmOlish(\"logo.png\");\n// a va b bir xil obyekt (kesh ishladi)" },
        { p: "Bu keshning afzalligi: agar tizimga xotira kerak bo'lsa, keshdagi ishlatilmayotgan rasmlar avtomatik tozalanadi. Kamchiligi: <code>Map</code> ichida <em>bo'sh</em> <code>WeakRef</code>lar qolib ketishi mumkin — ularni tozalash uchun <code>FinalizationRegistry</code> kerak." },

        { h2: "FinalizationRegistry" },
        { p: "<code>FinalizationRegistry</code> — obyekt axlat yig'uvchi tomonidan yo'q qilingach, <strong>tozalash funksiyasi</strong>ni (callback) chaqirish imkonini beradi. U shunday yaratiladi:" },
        { code: "let registry = new FinalizationRegistry((qiymat) => {\n  // obyekt yo'q qilingach chaqiriladi\n  console.log(\"Tozalandi: \" + qiymat);\n});" },
        { p: "Kuzatiladigan obyektni <code>register</code> orqali ro'yxatga olamiz. Ikkinchi argument — obyekt yo'q qilingach callbackka uzatiladigan qiymat (odatda kalit yoki nom):" },
        { code: "let obyekt = { name: \"Ali\" };\n\nregistry.register(obyekt, \"Ali-obyekti\");\n\n// obyektga havola yo'qolgach va u tozalangach,\n// callback \"Ali-obyekti\" bilan chaqiriladi" },
        { p: "Yuqoridagi kesh misolini <code>FinalizationRegistry</code> bilan to'ldirib, tozalangan obyektning \"bo'sh\" yozuvini <code>Map</code>dan ham o'chirib tashlaymiz:" },
        { code: "let kesh = new Map();\n\nlet registry = new FinalizationRegistry((nom) => {\n  // obyekt tozalandi -> Map'dan ham o'chiramiz\n  let havola = kesh.get(nom);\n  if (havola && havola.deref() === undefined) {\n    kesh.delete(nom);\n  }\n});\n\nfunction saqlash(nom, obyekt) {\n  kesh.set(nom, new WeakRef(obyekt));\n  registry.register(obyekt, nom);\n}" },

        { h2: "Ehtiyotkorlik" },
        { p: "<code>WeakRef</code> va <code>FinalizationRegistry</code> — kuchli, ammo nozik vositalar. Ularni ehtiyotkorlik bilan ishlating:" },
        { ul: [
          "Axlat yig'uvchi <strong>qachon</strong> ishlashini bashorat qilib bo'lmaydi — callback darhol yoki umuman chaqirilmasligi mumkin;",
          "Tozalash callbackiga <strong>muhim mantiqni</strong> yuklamang — u ishga tushishiga kafolat yo'q;",
          "Bir necha obyekt bir vaqtda tozalansa, callbacklar tartibi noaniq;",
          "Bu vositalarni faqat <em>optimallashtirish</em> uchun ishlating, dasturning to'g'riligi ularga bog'liq bo'lmasin."
        ] },
        { warn: "Spetsifikatsiyaga ko'ra, <code>FinalizationRegistry</code> callbacki <strong>umuman chaqirilmasligi ham mumkin</strong> — masalan, dastur tugab qolsa. Shuning uchun unga tayanib fayl yopish yoki tarmoq ulanishini uzish kabi zarur amallarni bajarmang." },
        { tip: "Ko'p hollarda oddiy <code>WeakMap</code> yoki <code>WeakSet</code> yetarli va xavfsizroq. <code>WeakRef</code>/<code>FinalizationRegistry</code>ga faqat chindan nozik xotira nazorati kerak bo'lgandagina murojaat qiling." },

        { h2: "Xulosa" },
        { ul: [
          "<code>WeakRef</code> obyektga <em>zaif</em> havola beradi — u obyekt yashashini kafolatlamaydi;",
          "<code>deref()</code> obyektni yoki (tozalangan bo'lsa) <code>undefined</code> qaytaradi — doim tekshiring;",
          "Tipik qo'llanishi — xotirani band qilmaydigan kesh;",
          "<code>FinalizationRegistry</code> obyekt tozalangach callback chaqiradi (masalan, keshni tozalash uchun);",
          "Axlat yig'uvchi xatti-harakati noaniq — bu vositalarga dastur to'g'riligini bog'lamang, faqat optimallashtirish uchun ishlating."
        ] }
      ]
    }
  ]
};
