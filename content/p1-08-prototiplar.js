"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Prototiplar, meros",
  lessons: [
    {
      slug: "prototip-meros",
      title: "Prototipli meros",
      blurb: "[[Prototype]] yashirin xossa, __proto__, prototip zanjiri va xossalar qanday qidirilishi.",
      body: [
        { lead: "Dasturlashda biz ko'pincha mavjud narsani olib, uni biroz kengaytirmoqchi bo'lamiz. Masalan, bizda <code>user</code> obyekti bor va biz unga o'xshash, lekin qo'shimcha imkoniyatga ega <code>admin</code> yasashni istaymiz. Har safar hamma narsani qaytadan yozmaslik uchun JavaScript'da <strong>prototipli meros</strong> (prototypal inheritance) mavjud." },

        { h2: "[[Prototype]] yashirin xossasi" },
        { p: "JavaScript'dagi har bir obyektda <code>[[Prototype]]</code> deb nomlangan maxsus yashirin xossa bor. U yoki <code>null</code> ga, yoki boshqa bir obyektga ishora qiladi. O'sha ishora qilingan obyekt shu obyektning <em>prototipi</em> deb ataladi." },
        { p: "Agar biz obyektdan biror xossani o'qimoqchi bo'lsak, lekin u xossa obyektning o'zida topilmasa, JavaScript avtomatik ravishda uni prototipdan qidiradi. Dasturlashda buni \"prototipli meros\" deb atashadi. Ko'plab qulay til imkoniyatlari va texnikalari aynan shu mexanizmga asoslangan." },
        { note: "<code>[[Prototype]]</code> — ichki, yashirin xossa. Biz unga to'g'ridan-to'g'ri kira olmaymiz, lekin uni o'rnatish va o'qishning bir nechta usullari bor. Ulardan biri — eskirgan, lekin ta'lim uchun qulay <code>__proto__</code>." },

        { h2: "__proto__ orqali prototipni o'rnatish" },
        { p: "<code>[[Prototype]]</code> ni belgilashning tarixiy usullaridan biri — <code>__proto__</code> xossasidan foydalanish. Keling, ikkita obyekt yasab, birini ikkinchisining prototipiga aylantiramiz:" },
        { pg: "let animal = {\n  eats: true\n};\nlet rabbit = {\n  jumps: true\n};\n\nrabbit.__proto__ = animal; // rabbit prototipi endi animal\n\n// endi ikkala xossa ham rabbit'dan o'qiladi:\nconsole.log(rabbit.jumps); // true (o'zidan)\nconsole.log(rabbit.eats);  // true (prototipdan)", file: "proto-set.js" },
        { p: "Bu yerda <code>rabbit</code> obyektida <code>eats</code> xossasi yo'q. JavaScript uni topa olmagach, prototip — <code>animal</code> obyektiga qaraydi va u yerdan topadi. Biz \"<code>animal</code> — <code>rabbit</code>ning prototipi\" yoki \"<code>rabbit</code> prototip orqali <code>animal</code>dan meros oladi\" deymiz." },
        { warn: "<code>__proto__</code> — bu aslida <code>[[Prototype]]</code> uchun tarixiy <em>getter/setter</em>. U <code>[[Prototype]]</code> ning o'zi EMAS. Zamonaviy kodda uning o'rniga <code>Object.getPrototypeOf</code> va <code>Object.setPrototypeOf</code> ishlatiladi (bu haqda oxirgi darsda batafsil to'xtalamiz)." },

        { h2: "Prototip zanjiri" },
        { p: "Prototip yana o'z prototipiga ega bo'lishi mumkin, u ham o'zinikiga — shu tariqa <strong>prototip zanjiri</strong> (prototype chain) hosil bo'ladi. Xossa qidirilganda JavaScript shu zanjir bo'ylab yuqoriga harakatlanadi:" },
        { pg: "let animal = {\n  eats: true,\n  walk() {\n    return \"Hayvon yuradi\";\n  }\n};\n\nlet rabbit = {\n  jumps: true,\n  __proto__: animal\n};\n\nlet longEar = {\n  earLength: 10,\n  __proto__: rabbit\n};\n\n// walk metodi zanjir orqali topiladi:\nconsole.log(longEar.walk());    // Hayvon yuradi\nconsole.log(longEar.jumps);     // true (rabbit'dan)\nconsole.log(longEar.eats);      // true (animal'dan)\nconsole.log(longEar.earLength); // 10 (o'zidan)", file: "proto-chain.js" },
        { p: "Yuqoridagi <code>longEar.walk()</code> chaqirilganda JavaScript avval <code>longEar</code>da <code>walk</code> ni qidiradi, topmaydi; keyin <code>rabbit</code>dan qidiradi, u ham yo'q; oxiri <code>animal</code>dan topadi. Zanjir bo'ylab yuqoriga qidirish shunday ishlaydi." },
        { note: "Zanjir bo'yicha ikkita jiddiy cheklov bor: 1) Ishoralar aylana (halqa) hosil qila olmaydi — agar <code>__proto__</code> ni aylana ko'rinishida o'rnatmoqchi bo'lsak, JavaScript xato beradi. 2) <code>__proto__</code> qiymati yoki obyekt, yoki <code>null</code> bo'lishi kerak — boshqa turlar (masalan, son yoki satr) e'tiborsiz qoldiriladi." },

        { h2: "Yozish (write) prototipni ishlatmaydi" },
        { p: "Prototip faqat xossani <strong>o'qish</strong>da ishlatiladi. Xossaga qiymat berish (yozish) yoki uni o'chirish amallari to'g'ridan-to'g'ri obyektning O'ZIDA bajariladi." },
        { pg: "let animal = {\n  eats: true,\n  walk() {\n    return \"Hayvon yura olmaydi\";\n  }\n};\n\nlet rabbit = {\n  __proto__: animal\n};\n\n// yangi metodni to'g'ridan-to'g'ri rabbit'ga yozamiz:\nrabbit.walk = function() {\n  return \"Quyon sakraydi!\";\n};\n\nconsole.log(rabbit.walk());  // Quyon sakraydi! (o'zidan)\nconsole.log(animal.walk());  // Hayvon yura olmaydi (o'zgarmadi)", file: "proto-write.js" },
        { p: "Ko'rib turganingizdek, <code>rabbit.walk</code> ga yozish <code>animal</code> ni o'zgartirmadi — u faqat <code>rabbit</code> obyektiga yangi metod qo'shdi. Endi keyingi chaqiruvlar o'sha yangi metodni ishlatadi va prototipga umuman murojaat qilmaydi." },
        { tip: "Bu qoidada istisno bor: <em>accessor</em> xossalari (getter/setter). Agar prototipda setterli xossa bo'lsa, unga yozish o'sha setterni chaqiradi. Ammo bu ilg'or holat va boshqa darsda muhokama qilinadi." },

        { h2: "\"this\" qiymati o'zgarmaydi" },
        { p: "Muhim savol: metod prototipdan olinsa, uning ichidagi <code>this</code> nimaga teng bo'ladi? Javob: <code>this</code> HAR DOIM nuqtadan oldingi obyektga teng bo'ladi. Metod prototipda bo'lishidan qat'i nazar, u chaqirilgan obyekt bilan ishlaydi:" },
        { pg: "let animal = {\n  walk() {\n    if (!this.isSleeping) {\n      return this.name + \" yuradi\";\n    }\n    return this.name + \" uxlayapti\";\n  }\n};\n\nlet rabbit = {\n  name: \"Quyon\",\n  __proto__: animal\n};\n\n// walk metodi animal'dan, lekin this = rabbit\nconsole.log(rabbit.walk()); // Quyon yuradi\n\nrabbit.isSleeping = true;\nconsole.log(rabbit.walk()); // Quyon uxlayapti", file: "proto-this.js" },
        { p: "Demak, metodlar umumiy (prototipda) bo'lsa-da, obyekt holati (state) esa har bir obyektning o'zida saqlanadi. Bu juda kuchli naqsh: bir necha obyekt bitta prototipdan metodlarni <em>ulashadi</em>, lekin har biri o'z ma'lumotlari bilan ishlaydi." },

        { h2: "for..in va prototip xossalari" },
        { p: "<code>for..in</code> sikli obyektning nafaqat o'z xossalarini, balki meros olingan (prototipdagi) xossalarini ham aylanib chiqadi. Ammo <code>Object.keys</code> kabi metodlar faqat obyektning O'Z xossalarini qaytaradi:" },
        { pg: "let animal = { eats: true };\nlet rabbit = { jumps: true, __proto__: animal };\n\n// Object.keys faqat o'z xossalari:\nconsole.log(Object.keys(rabbit)); // [\"jumps\"]\n\n// for..in barcha (meros olingan ham):\nlet natija = [];\nfor (let prop in rabbit) {\n  natija.push(prop);\n}\nconsole.log(natija); // [\"jumps\", \"eats\"]", file: "proto-forin.js" },
        { p: "Agar bizga faqat obyektning o'z xossalari kerak bo'lsa, <code>obj.hasOwnProperty(key)</code> metodidan foydalanamiz — u xossa aynan shu obyektga tegishli bo'lsa <code>true</code>, prototipdan meros olingan bo'lsa <code>false</code> qaytaradi:" },
        { pg: "let animal = { eats: true };\nlet rabbit = { jumps: true, __proto__: animal };\n\nfor (let prop in rabbit) {\n  let isOwn = rabbit.hasOwnProperty(prop);\n  if (isOwn) {\n    console.log(\"O'z xossasi: \" + prop);\n  } else {\n    console.log(\"Meros: \" + prop);\n  }\n}\n// O'z xossasi: jumps\n// Meros: eats", file: "proto-hasown.js" },
        { note: "E'tibor bering: <code>hasOwnProperty</code> ning o'zi ham qayerdandir keladi — u <code>Object.prototype.hasOwnProperty</code>. Nega u <code>for..in</code>da chiqmaydi? Chunki tug'ma (built-in) prototip xossalari <em>enumerable: false</em> bayrog'iga ega, ya'ni ular sanab chiqilmaydi. Shu sababli <code>eats</code> va <code>jumps</code> chiqadi, lekin <code>hasOwnProperty</code> chiqmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "JavaScript'da har bir obyektning yashirin <code>[[Prototype]]</code> xossasi bor — u boshqa obyekt yoki <code>null</code>;",
          "Xossa obyektda topilmasa, u prototipdan (va prototip zanjiri bo'ylab) qidiriladi;",
          "<code>__proto__</code> — <code>[[Prototype]]</code> uchun tarixiy getter/setter (zamonaviy kodda undan qoching);",
          "Xossaga yozish va uni o'chirish to'g'ridan-to'g'ri obyektning o'zida bajariladi, prototip faqat o'qishda ishlaydi;",
          "Metod prototipdan olinsa ham, <code>this</code> chaqirilgan obyektga teng bo'ladi;",
          "<code>for..in</code> meros olingan xossalarni ham aylanadi, <code>Object.keys</code> va <code>hasOwnProperty</code> esa faqat o'z xossalarini beradi."
        ] }
      ]
    },

    {
      slug: "f-prototype",
      title: "F.prototype",
      blurb: "Konstruktor funksiyaning prototype xossasi, new bilan bog'liqligi, default prototype va constructor.",
      body: [
        { lead: "Yangi obyektlarni <code>new F()</code> ko'rinishidagi konstruktor funksiya orqali yaratishimiz mumkinligini eslaysiz. Agar konstruktor funksiyaning <code>prototype</code> xossasi obyektga teng bo'lsa, <code>new</code> operatori undan yangi obyektlarning <code>[[Prototype]]</code> sini o'rnatish uchun foydalanadi." },
        { warn: "Bu yerda ikkita turli tushunchani chalkashtirmang: <code>F.prototype</code> — bu oddiy funksiyaning oddiy xossasi (nomi shunchaki \"prototype\"). U obyektning yashirin <code>[[Prototype]]</code> xossasi bilan bir xil narsa EMAS, lekin ular o'zaro bog'liq." },

        { h2: "F.prototype qanday ishlaydi?" },
        { p: "Ideya sodda: agar <code>new F()</code> orqali obyekt yaratilsa va <code>F.prototype</code> obyekt bo'lsa, unda <code>new</code> operatori yangi obyektning <code>[[Prototype]]</code> sini <code>F.prototype</code> ga tenglashtiradi." },
        { pg: "let animal = {\n  eats: true\n};\n\nfunction Rabbit(name) {\n  this.name = name;\n}\n\nRabbit.prototype = animal;\n\nlet rabbit = new Rabbit(\"Oq quyon\");\n\nconsole.log(rabbit.name);  // Oq quyon (o'zidan)\nconsole.log(rabbit.eats);  // true (prototipdan = animal)", file: "fproto-basic.js" },
        { p: "Bu yerda <code>Rabbit.prototype = animal</code> qatori shuni bildiradi: \"<code>new Rabbit</code> orqali yasalgan har bir obyektning prototipi <code>animal</code> bo'lsin\". Shuning uchun <code>rabbit.eats</code> zanjir orqali <code>animal</code> obyektidan topiladi." },
        { note: "<code>F.prototype</code> faqat <code>new F()</code> chaqirilgan PAYTDA ishlatiladi. Undan keyin uning qiymatini o'zgartirsangiz, avval yaratilgan obyektlar eski prototipini saqlab qoladi, faqat yangi obyektlar yangisini oladi." },

        { h2: "Default F.prototype va constructor" },
        { p: "Har bir funksiyada standart (default) <code>prototype</code> xossasi mavjud — biz uni belgilamasak ham. Bu default <code>prototype</code> — faqat bitta <code>constructor</code> xossasidan iborat obyekt bo'lib, <code>constructor</code> funksiyaning o'ziga qaytib ishora qiladi:" },
        { pg: "function Rabbit() {}\n// default: Rabbit.prototype = { constructor: Rabbit }\n\nconsole.log(Rabbit.prototype.constructor === Rabbit); // true", file: "fproto-constructor.js" },
        { p: "Bu <code>constructor</code> xossasi obyektlarga meros orqali o'tadi. Shuning uchun yaratilgan obyektdan ham <code>constructor</code> ga murojaat qilib, uni yaratgan funksiyani topish mumkin:" },
        { pg: "function Rabbit() {}\n\nlet rabbit = new Rabbit();\n\n// rabbit'da constructor yo'q, u prototipdan (Rabbit.prototype) keladi:\nconsole.log(rabbit.constructor === Rabbit); // true", file: "fproto-obj-constructor.js" },
        { tip: "<code>constructor</code> yordamida mavjud obyekt turini bilmasak ham, xuddi shunday yangi obyekt yaratishimiz mumkin: <code>let rabbit2 = new rabbit.constructor(\"...\");</code>. Bu ba'zan obyektni yasagan funksiya noma'lum bo'lgan holatlarda foydali bo'ladi." },

        { h2: "constructor'ni yo'qotib qo'yish xavfi" },
        { p: "JavaScript <code>constructor</code> ning to'g'ri qiymatini kafolatlamaydi. Agar biz default <code>prototype</code> ni to'liq yangi obyekt bilan ALMASHTIRSAK, undagi <code>constructor</code> yo'qoladi:" },
        { pg: "function Rabbit() {}\n\nRabbit.prototype = {\n  jumps: true\n};\n\nlet rabbit = new Rabbit();\n\n// endi constructor Rabbit'ga ishora qilmaydi!\nconsole.log(rabbit.constructor === Rabbit); // false\n// u Object'ga ishora qiladi (chunki {jumps:true} oddiy obyekt):\nconsole.log(rabbit.constructor === Object); // true", file: "fproto-lost.js" },
        { p: "Bunday xatoning oldini olishning ikki yo'li bor. Birinchisi — butun obyektni almashtirmasdan, xossalarni birma-bir qo'shish; ikkinchisi — obyektni almashtirganda <code>constructor</code> ni qo'lda tiklab qo'yish:" },
        { pg: "function Rabbit() {}\n\n// 1-usul: xossani qo'shamiz, almashtirmaymiz\nRabbit.prototype.jumps = true;\n// bu holda default constructor saqlanadi\n\nfunction Hare() {}\n// 2-usul: almashtiramiz, lekin constructor'ni tiklaymiz\nHare.prototype = {\n  jumps: true,\n  constructor: Hare\n};\n\nconsole.log(new Rabbit().constructor === Rabbit); // true\nconsole.log(new Hare().constructor === Hare);     // true", file: "fproto-fix.js" },
        { note: "Amalda <code>constructor</code> xossasiga ko'p tayanmaslik ma'qul, chunki uni buzib qo'yish oson. Lekin uning qanday ishlashini bilish, ayniqsa boshqa kishilarning kodini o'qiganda, muhim." },

        { h2: "F.prototype — faqat new paytida" },
        { p: "Yana bir bor ta'kidlaymiz: <code>F.prototype</code> xossasi obyekt yaratilayotgan aniq bir onda ishlatiladi. Agar keyin <code>F.prototype</code> boshqa obyektga o'zgartirilsa, bu allaqachon mavjud obyektlarga ta'sir qilmaydi:" },
        { pg: "function Rabbit() {}\nRabbit.prototype = { eats: true };\n\nlet oldRabbit = new Rabbit(); // prototipi = {eats:true}\n\n// endi prototipni o'zgartiramiz:\nRabbit.prototype = { eats: false };\n\nlet newRabbit = new Rabbit(); // prototipi = {eats:false}\n\nconsole.log(oldRabbit.eats); // true (eski prototip)\nconsole.log(newRabbit.eats); // false (yangi prototip)", file: "fproto-timing.js" },

        { h2: "Xulosa" },
        { ul: [
          "<code>F.prototype</code> — funksiyaning oddiy xossasi (yashirin <code>[[Prototype]]</code> emas);",
          "<code>new F()</code> yangi obyekt yaratganda uning <code>[[Prototype]]</code> sini <code>F.prototype</code> ga tenglashtiradi;",
          "<code>F.prototype</code> obyekt bo'lishi kerak, aks holda <code>new</code> uni e'tiborsiz qoldiradi;",
          "Har bir funksiyaning default <code>prototype</code> si <code>{ constructor: F }</code> ko'rinishida bo'ladi;",
          "<code>constructor</code> obyektlarga meros orqali o'tadi va ularni yaratgan funksiyaga ishora qiladi;",
          "Default <code>prototype</code> ni to'liq almashtirsangiz, <code>constructor</code> yo'qoladi — uni qo'lda tiklang."
        ] }
      ]
    },

    {
      slug: "native-prototype",
      title: "Tug'ma prototiplar",
      blurb: "Object.prototype, Array.prototype, String.prototype va boshqalar, hamda ularni kengaytirish xavfi.",
      body: [
        { lead: "<code>prototype</code> xossasi JavaScript yadrosining o'zida keng qo'llaniladi. Barcha tug'ma (native) konstruktor funksiyalar — <code>Object</code>, <code>Array</code>, <code>Function</code>, <code>Number</code> va boshqalar — o'z <code>prototype</code> laridan foydalanadi. Aynan shu sababli obyektlar, massivlar va satrlarda ko'plab tayyor metodlar mavjud." },

        { h2: "Object.prototype" },
        { p: "Bo'sh obyekt yaratganimizda, u aslida bo'sh emas. <code>let obj = {}</code> yozuvi <code>let obj = new Object()</code> bilan bir xil, bu yerda <code>Object</code> — tug'ma konstruktor funksiya. Uning <code>Object.prototype</code> si <code>toString</code> va boshqa metodlarga ega, ular meros orqali barcha obyektlarga o'tadi:" },
        { pg: "let obj = {};\n\n// obj.__proto__ === Object.prototype\nconsole.log(obj.toString());  // [object Object]\n\n// toString qayerdan keladi?\nconsole.log(obj.toString === obj.__proto__.toString);           // true\nconsole.log(obj.__proto__ === Object.prototype);                // true\n// Object.prototype'ning ustida hech narsa yo'q:\nconsole.log(Object.prototype.__proto__);                        // null", file: "native-object.js" },
        { p: "Demak, zanjir shunday: <code>obj</code> → <code>Object.prototype</code> → <code>null</code>. <code>Object.prototype</code> zanjirning eng tepasi — uning prototipi <code>null</code>." },

        { h2: "Boshqa tug'ma prototiplar" },
        { p: "<code>Array</code>, <code>Function</code>, <code>Number</code>, <code>String</code>, <code>Boolean</code> kabi tug'ma obyektlar ham o'z metodlarini prototiplarida saqlaydi. Masalan, massiv yaratganimizda <code>[1, 2, 3]</code> aslida <code>new Array(1, 2, 3)</code> ga o'xshaydi va uning barcha metodlari <code>Array.prototype</code> da yashaydi:" },
        { pg: "let arr = [1, 2, 3];\n\n// arr'ning prototipi Array.prototype:\nconsole.log(arr.__proto__ === Array.prototype);        // true\n// undan yuqorisi Object.prototype:\nconsole.log(arr.__proto__.__proto__ === Object.prototype); // true\n// eng tepasi null:\nconsole.log(arr.__proto__.__proto__.__proto__);        // null", file: "native-array.js" },
        { p: "Ba'zi metodlar turli prototiplarda takrorlanishi mumkin. Masalan, <code>Array.prototype</code> ning o'z <code>toString</code> i bor — u massiv elementlarini vergul bilan ajratib qaytaradi. <code>Object.prototype</code> ning <code>toString</code> i esa <code>[object Object]</code> qaytaradi. Zanjir bo'ylab yaqinroqdagisi (Array'niki) ishlatiladi:" },
        { pg: "let arr = [1, 2, 3];\n\nconsole.log(arr.toString()); // \"1,2,3\" (Array.prototype.toString)\n\nlet obj = { a: 1 };\nconsole.log(obj.toString()); // \"[object Object]\" (Object.prototype.toString)", file: "native-tostring.js" },
        { note: "Funksiyalar ham obyekt — ularning <code>[[Prototype]]</code> si <code>Function.prototype</code> bo'lib, u <code>call</code>, <code>apply</code>, <code>bind</code> kabi metodlarni beradi. Shu sababli istalgan funksiyada bu metodlar mavjud." },

        { h2: "Primitivlar va prototiplar" },
        { p: "Satr, son va mantiqiy qiymatlar (primitivlar) obyekt emas. Ammo biz ularning xossa yoki metodlariga murojaat qilsak (masalan, <code>str.toUpperCase()</code>), vaqtinchalik \"o'ram\" (wrapper) obyekt yaratiladi. U o'z ishini bajaradi va yo'qoladi. Bu o'ram obyektlarning metodlari ham prototiplarda joylashgan: <code>String.prototype</code>, <code>Number.prototype</code>, <code>Boolean.prototype</code>." },
        { pg: "let str = \"salom\";\nconsole.log(str.toUpperCase()); // SALOM (String.prototype'dan)\n\nlet num = 5;\nconsole.log(num.toFixed(2));     // 5.00 (Number.prototype'dan)", file: "native-primitive.js" },
        { warn: "<code>null</code> va <code>undefined</code> ning o'ram obyektlari YO'Q — ularda hech qanday metod yoki xossa yo'q. Ularga murojaat qilsangiz xato yuz beradi." },

        { h2: "Tug'ma prototiplarni kengaytirish" },
        { p: "Tug'ma prototiplarni o'zgartirish (kengaytirish) mumkin. Masalan, <code>String.prototype</code> ga yangi metod qo'shsak, u barcha satrlarda paydo bo'ladi:" },
        { pg: "String.prototype.show = function() {\n  return \"Satr: \" + this;\n};\n\nconsole.log(\"salom\".show()); // Satr: salom", file: "native-extend.js" },
        { p: "Bu kuchli, lekin XAVFLI imkoniyat. Prototiplar global (bir butun dastur uchun umumiy). Ikki xil kutubxona bir xil nomdagi metodni qo'shsa, biri ikkinchisini ustidan yozib, kutilmagan xatolarni keltirib chiqaradi." },
        { warn: "Umumiy qoida: <strong>tug'ma prototiplarni kengaytirmang.</strong> Bu deyarli har doim yomon g'oya, chunki: 1) global konfliktlar; 2) kelajakda til aynan shu nomdagi standart metodni qo'shsa, sizning kodingiz uni buzadi; 3) kod o'qilishi qiyinlashadi." },
        { tip: "Yagona maqbul istisno — <strong>polyfill</strong>. Bu til standartida bor, lekin eski dvigatelda hali qo'llab-quvvatlanmagan metodni qo'lda amalga oshirishdir. Bunda avval metod mavjudligini tekshiramiz va faqat yo'q bo'lsa qo'shamiz." },
        { pg: "// Polyfill misoli: repeatText metodi standartda yo'q deb faraz qilaylik\nif (!String.prototype.repeatText) {\n  String.prototype.repeatText = function(n) {\n    let natija = \"\";\n    for (let i = 0; i < n; i++) {\n      natija += this;\n    }\n    return natija;\n  };\n}\n\nconsole.log(\"ab\".repeatText(3)); // ababab", file: "native-polyfill.js" },

        { h2: "Prototiplardan qarz olish (borrowing)" },
        { p: "Ba'zan bir tug'ma prototip metodini boshqa obyektga \"qarzga\" olamiz. Masalan, massivga o'xshash (array-like) obyektga <code>Array.prototype</code> metodlarini qo'llash mumkin:" },
        { pg: "let obj = {\n  0: \"a\",\n  1: \"b\",\n  length: 2\n};\n\n// join metodini Array.prototype'dan qarzga olamiz:\nobj.join = Array.prototype.join;\n\nconsole.log(obj.join(\",\")); // a,b", file: "native-borrow.js" },
        { p: "Bu ishlaydi, chunki <code>join</code> ning ichki algoritmi faqat to'g'ri son indekslar va <code>length</code> xossasini kutadi — obyekt haqiqiy massiv bo'lishini talab qilmaydi. Bu texnika \"metod qarz olish\" (method borrowing) deb ataladi." },

        { h2: "Xulosa" },
        { ul: [
          "Barcha tug'ma obyektlar metodlarini prototiplarida saqlaydi: <code>Object.prototype</code>, <code>Array.prototype</code>, <code>String.prototype</code> va h.k.;",
          "Obyektlarning zanjiri eng tepada <code>Object.prototype</code> ga, undan keyin <code>null</code> ga boradi;",
          "Primitivlar metodlarini vaqtinchalik o'ram obyektlar orqali oladi (<code>String.prototype</code> va boshqalar);",
          "<code>null</code> va <code>undefined</code> da metod yo'q;",
          "Tug'ma prototiplarni kengaytirish mumkin, lekin bu deyarli har doim yomon g'oya — istisno faqat polyfill'lar;",
          "Prototip metodlarini boshqa obyektlarga \"qarzga\" berish mumkin (method borrowing)."
        ] }
      ]
    },

    {
      slug: "prototip-metodlari",
      title: "Prototip metodlari, __proto__siz obyektlar",
      blurb: "Object.create, Object.getPrototypeOf/setPrototypeOf, __proto__ nima uchun eskirgan va Object.create(null).",
      body: [
        { lead: "<code>__proto__</code> — <code>[[Prototype]]</code> ni o'rnatish va o'qishning eng eski usuli, lekin u eskirgan (deprecated) hisoblanadi. Zamonaviy JavaScript prototiplar bilan ishlash uchun boshqa, ishonchliroq metodlarni taklif etadi. Bu darsda o'sha metodlar bilan tanishamiz." },

        { h2: "Zamonaviy metodlar" },
        { p: "Prototiplar bilan ishlashning uchta asosiy zamonaviy usuli bor:" },
        { ul: [
          "<code>Object.getPrototypeOf(obj)</code> — <code>obj</code> ning <code>[[Prototype]]</code> sini QAYTARADI (o'qiydi);",
          "<code>Object.setPrototypeOf(obj, proto)</code> — <code>obj</code> ning <code>[[Prototype]]</code> sini <code>proto</code> ga O'RNATADI;",
          "<code>Object.create(proto, [descriptors])</code> — berilgan <code>proto</code> ni prototip qilib, YANGI bo'sh obyekt yaratadi (ixtiyoriy ravishda xossa deskriptorlari bilan)."
        ] },
        { pg: "let animal = {\n  eats: true\n};\n\n// animal'ni prototip qilib yangi obyekt yaratamiz:\nlet rabbit = Object.create(animal);\n\nconsole.log(rabbit.eats); // true (prototipdan)\n\n// prototipni o'qiymiz:\nconsole.log(Object.getPrototypeOf(rabbit) === animal); // true\n\n// prototipni o'zgartiramiz:\nlet plant = { water: true };\nObject.setPrototypeOf(rabbit, plant);\n\nconsole.log(rabbit.eats);   // undefined (endi prototip plant)\nconsole.log(rabbit.water);  // true", file: "methods-basic.js" },
        { note: "Bu uch metod aynan bir vazifani <code>__proto__</code> orqasidagi <code>[[Prototype]]</code> bilan bajaradi, lekin ishonchliroq va standart usulda. Zamonaviy kodda aynan shulardan foydalaning." },

        { h2: "Object.create bilan deskriptorlar" },
        { p: "<code>Object.create</code> ning ikkinchi argumenti ixtiyoriy — u xossa deskriptorlarini beradi. Bu bir chaqiruvda ham prototip, ham xossalarni o'rnatishga imkon beradi:" },
        { pg: "let animal = {\n  eats: true\n};\n\nlet rabbit = Object.create(animal, {\n  jumps: {\n    value: true,\n    enumerable: true\n  }\n});\n\nconsole.log(rabbit.jumps); // true (o'z xossasi)\nconsole.log(rabbit.eats);  // true (prototipdan)", file: "methods-descriptors.js" },
        { p: "<code>Object.create</code> obyektni yuzaki (shallow) nusxalash uchun ham qulay — u barcha xossalarni, jumladan getter/setter'larni va to'g'ri prototipni saqlab, aniq nusxa yaratadi:" },
        { pg: "let obj = { a: 1, b: 2 };\n\nlet clone = Object.create(\n  Object.getPrototypeOf(obj),\n  Object.getOwnPropertyDescriptors(obj)\n);\n\nconsole.log(clone.a); // 1\nconsole.log(clone.b); // 2\nconsole.log(clone === obj); // false (alohida obyekt)", file: "methods-clone.js" },

        { h2: "Nima uchun __proto__ eskirgan?" },
        { p: "<code>__proto__</code> texnik jihatdan tilning yadrosida emas, brauzerlar uchun qo'shimcha standart (Annex B) sifatida ta'riflangan. Undan qochishning bir necha sabablari bor:" },
        { ul: [
          "U <em>getter/setter</em> bo'lgani uchun <code>Object.prototype</code> da yashaydi — server (Node.js) muhitida boshqacha ishlashi mumkin;",
          "Ishlash tezligi past — <code>Object.setPrototypeOf</code> yoki <code>Object.create</code> odatda samaraliroq;",
          "Eng jiddiy muammo — foydalanuvchidan kelgan kalitlar bilan ishlaganda xavfsizlik teshigi paydo bo'lishi mumkin."
        ] },
        { warn: "Agar kalitlar tashqi (foydalanuvchi) manbadan kelsa, <code>__proto__</code> maxsus kalit sifatida g'alati xatti-harakat qilishi mumkin. Masalan, foydalanuvchi <code>__proto__</code> nomli \"kalit\" kiritsa, oddiy tayinlash prototipni buzishga urinadi. Buni quyida ko'ramiz." },
        { pg: "let obj = {};\n\nlet key = \"__proto__\"; // faraz qilaylik, tashqaridan keldi\nobj[key] = \"salom\";\n\n// biz \"salom\" satrini kutamiz, lekin __proto__ satr bo'la olmaydi:\nconsole.log(obj[key]);              // [object Object] yoki undefined turi\nconsole.log(typeof obj.__proto__); // \"object\" (satr O'RNATILMADI!)", file: "methods-proto-bug.js" },
        { p: "Ko'rib turganingizdek, <code>__proto__</code> kaliti oddiy ma'lumot kaliti kabi ishlamaydi — u prototipni o'zgartirishga urinadi. Bu obyektni oddiy lug'at (map) sifatida ishlatganda jiddiy xatolarga olib keladi." },

        { h2: "Object.create(null) — \"toza\" obyekt" },
        { p: "Yuqoridagi muammoning yechimi — prototipi umuman yo'q obyekt yaratish. <code>Object.create(null)</code> prototipi <code>null</code> bo'lgan \"toza\" (chinakam bo'sh) obyekt yasaydi. Bunday obyektda <code>__proto__</code> maxsus getter/setter'i yo'q, shuning uchun u oddiy kalit sifatida ishlaydi:" },
        { pg: "let obj = Object.create(null);\n\nlet key = \"__proto__\";\nobj[key] = \"salom\";\n\n// endi __proto__ oddiy kalit sifatida ishlaydi:\nconsole.log(obj[key]); // salom\nconsole.log(obj.__proto__); // salom (oddiy xossa)", file: "methods-clean.js" },
        { p: "Bunday obyektlar ba'zan \"very plain\" yoki \"pure dictionary\" (toza lug'at) deb ataladi, chunki ular oddiy obyektlardan ham soddaroq — ularda umuman meros olingan xossa yo'q." },
        { note: "Toza obyektning bir kamchiligi bor: u <code>Object.prototype</code> dan meros olmagani uchun tayyor metodlarga (masalan, <code>toString</code>, <code>hasOwnProperty</code>) ega emas. Ammo <code>Object.keys</code>, <code>Object.values</code> kabi <code>Object.*</code> metodlari baribir ishlaydi, chunki ular obyektning o'zida emas, <code>Object</code> konstruktorida joylashgan." },
        { pg: "let obj = Object.create(null);\nobj.name = \"Ali\";\nobj.age = 25;\n\n// toString yo'q:\nconsole.log(typeof obj.toString); // undefined\n\n// lekin Object.* metodlari ishlaydi:\nconsole.log(Object.keys(obj));   // [\"name\", \"age\"]\nconsole.log(Object.values(obj)); // [\"Ali\", 25]", file: "methods-clean-methods.js" },
        { tip: "Foydalanuvchidan kelgan kalitlar bilan lug'at (dictionary) tuzayotganingizda <code>Object.create(null)</code> yoki <code>Map</code> dan foydalaning. Ular <code>__proto__</code> kabi maxsus kalitlar keltirib chiqaradigan xavfsizlik va mantiq muammolaridan xoli bo'ladi." },

        { h2: "Barcha xossalarni olish metodlari" },
        { p: "Obyekt xossalarini olishning turli metodlari mavjud. Ularning barchasi obyektning O'Z xossalari ustida ishlaydi (prototipdagilar hisobga olinmaydi):" },
        { ul: [
          "<code>Object.keys(obj)</code> / <code>Object.values(obj)</code> / <code>Object.entries(obj)</code> — sanaladigan (enumerable) satr kalitlar/qiymatlar/juftliklar massivini qaytaradi;",
          "<code>Object.getOwnPropertyNames(obj)</code> — barcha satr kalitlarni (sanalmaydiganlar ham) qaytaradi;",
          "<code>Object.getOwnPropertySymbols(obj)</code> — barcha simvolli (symbol) kalitlarni qaytaradi;",
          "<code>Reflect.ownKeys(obj)</code> — mutlaqo barcha kalitlarni qaytaradi."
        ] },
        { pg: "let obj = {\n  name: \"Ali\",\n  age: 25\n};\n\nconsole.log(Object.keys(obj));    // [\"name\", \"age\"]\nconsole.log(Object.values(obj));  // [\"Ali\", 25]\nconsole.log(Object.entries(obj)); // [[\"name\",\"Ali\"],[\"age\",25]]", file: "methods-keys.js" },

        { h2: "Xulosa" },
        { ul: [
          "Zamonaviy kodda prototip bilan ishlash uchun <code>Object.create</code>, <code>Object.getPrototypeOf</code>, <code>Object.setPrototypeOf</code> dan foydalaning;",
          "<code>__proto__</code> eskirgan — tezlik va xavfsizlik sabab undan qoching;",
          "<code>Object.create(proto, descriptors)</code> obyektni aniq nusxalash uchun ham qulay;",
          "Foydalanuvchidan kelgan kalitlar <code>__proto__</code> orqali obyektni buzishi mumkin;",
          "<code>Object.create(null)</code> prototipsiz \"toza\" obyekt yaratadi — u lug'at (dictionary) sifatida xavfsiz;",
          "<code>Object.keys/values/entries</code> va boshqalar obyektning faqat o'z xossalari ustida ishlaydi."
        ] }
      ]
    }
  ]
};
