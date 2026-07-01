"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Klasslar",
  lessons: [
    {
      slug: "klass-asoslari",
      title: "Klass asosiy sintaksisi",
      blurb: "class kalit so'zi, constructor, metodlar, getter/setter, hisoblangan nomlar va class ifodasi.",
      body: [
        { lead: "Amaliyotda biz ko'pincha bir turdagi ko'plab obyektlarni yaratishga muhtoj bo'lamiz — masalan, foydalanuvchilar, tovarlar yoki hujjatlar. Buni <code>new function</code> orqali ham qilish mumkin, ammo zamonaviy JavaScript'da buning uchun ancha qulay va kuchli <strong>class</strong> (klass) sintaksisi mavjud." },

        { h2: "\"class\" sintaksisi" },
        { p: "Asosiy sintaksis quyidagicha ko'rinadi:" },
        { code: "class MyClass {\n  // metodlar\n  constructor() { ... }\n  method1() { ... }\n  method2() { ... }\n  method3() { ... }\n}" },
        { p: "So'ng <code>new MyClass()</code> orqali sanab o'tilgan barcha metodlarga ega yangi obyekt yaratamiz. Bunda <code>constructor()</code> metodi avtomatik chaqiriladi — shu sababli obyektni tayyorlash (ya'ni boshlang'ich holatini o'rnatish) mantiqini aynan shu yerga yozamiz." },
        { p: "Keling, oddiy bir <code>User</code> klassini yozamiz:" },
        { pg: "class User {\n  constructor(name) {\n    this.name = name;\n  }\n\n  sayHi() {\n    return \"Salom, \" + this.name + \"!\";\n  }\n}\n\n// foydalanish:\nlet user = new User(\"Ali\");\nconsole.log(user.sayHi());", file: "klass-user.js" },
        { p: "Bu yerda nima sodir bo'lyapti:" },
        { ol: [
          "<code>new User(\"Ali\")</code> chaqirilganda yangi obyekt yaratiladi;",
          "<code>constructor</code> ishga tushadi, unga <code>\"Ali\"</code> argument sifatida uzatiladi va u <code>this.name</code>ni o'rnatadi;",
          "Endi biz obyekt metodlarini, masalan <code>user.sayHi()</code>ni, chaqira olamiz."
        ] },
        { note: "Klass metodlari orasiga vergul <strong>qo'yilmaydi</strong>. Bu ko'p yangi boshlovchilar yo'l qo'yadigan xato. Klass ichidagi yozuv obyekt literalidan farq qiladi: bu yerda vergul emas, metodlar ketma-ket yoziladi." },

        { h2: "class — bu funksiya" },
        { p: "Aslida JavaScript'da <code>class</code> — bu alohida, mutlaqo yangi tushuncha emas. U aslida <strong>funksiya</strong> turining bir ko'rinishi. Keling, tekshirib ko'ramiz:" },
        { pg: "class User {\n  constructor(name) { this.name = name; }\n  sayHi() { return \"Salom!\"; }\n}\n\n// class — bu funksiya:\nconsole.log(typeof User);", file: "klass-typeof.js" },
        { p: "<code>class User { ... }</code> konstruksiyasi aslida quyidagilarni bajaradi:" },
        { ol: [
          "<code>User</code> nomli funksiya yaratadi. Funksiya kodi <code>constructor</code> metodidan olinadi (agar <code>constructor</code> yozilmagan bo'lsa, bo'sh deb hisoblanadi);",
          "Klass ichidagi metodlarni (masalan <code>sayHi</code>) <code>User.prototype</code>ga saqlaydi."
        ] },
        { p: "Ya'ni <code>new User</code> chaqirilganda va obyekt metodi ishlatilganda, metod prototipdan olinadi — huddi biz o'zimiz <code>User.prototype.sayHi = ...</code> deb yozganimizdek." },
        { pg: "class User {\n  constructor(name) { this.name = name; }\n  sayHi() { return \"Salom!\"; }\n}\n\n// metodlar prototipda:\nconsole.log(User.prototype.sayHi);\n// prototip konstruktori — klassning o'zi:\nconsole.log(User.prototype.constructor === User);", file: "klass-prototype.js" },

        { h2: "Class shunchaki \"shirin sintaksis\" emas" },
        { p: "Ba'zan <code>class</code> — bu \"syntactic sugar\" (sintaksik shakar), ya'ni faqat yozuvni chiroyli qiladigan bezak deyishadi. Lekin bu to'liq to'g'ri emas, chunki class'ning muhim farqlari bor:" },
        { ul: [
          "Class orqali yaratilgan funksiya maxsus ichki <code>[[IsClassConstructor]]: true</code> belgisiga ega. Uni <code>new</code>siz chaqirsangiz, xatolik chiqadi;",
          "Klass metodlari <em>sanab bo'lmaydigan</em> (non-enumerable) bo'ladi — ya'ni <code>for..in</code> tsikli ularni o'tkazib yuboradi;",
          "Klasslar har doim <code>\"use strict\"</code> qat'iy rejimida ishlaydi — klass ichidagi butun kod avtomatik qat'iy rejimda bajariladi."
        ] },
        { warn: "Klassni <code>new</code>siz oddiy funksiya kabi chaqirish mumkin emas. Masalan, <code>User()</code> (yangilamasdan) — <em>\"Class constructor User cannot be invoked without 'new'\"</em> xatosini beradi." },

        { h2: "Class ifodasi (Class Expression)" },
        { p: "Funksiyalar kabi, klasslarni ham boshqa ifoda ichida aniqlash, o'zgaruvchiga berish yoki qaytarish mumkin. Bu <strong>class ifodasi</strong> deyiladi:" },
        { pg: "let User = class {\n  sayHi() {\n    return \"Salom (class ifodasi)!\";\n  }\n};\n\nconsole.log(new User().sayHi());", file: "klass-expression.js" },
        { p: "Named Function Expression (NFE) kabi, class ifodasining ham nomi bo'lishi mumkin. Bu nom faqat klass ichida ko'rinadi:" },
        { pg: "let User = class MyClass {\n  sayHi() {\n    // MyClass nomi faqat klass ichida ko'rinadi\n    return MyClass;\n  }\n};\n\nconsole.log(new User().sayHi());\n// MyClass tashqarida ko'rinmaydi\ntry {\n  console.log(MyClass);\n} catch (e) {\n  console.log(\"Xato: \" + e.name);\n}", file: "klass-nfe.js" },
        { p: "Klasslarni \"talab bo'yicha\" (dinamik) yaratish ham mumkin — masalan, funksiyadan qaytarish orqali:" },
        { pg: "function makeClass(phrase) {\n  // klassni qaytaramiz\n  return class {\n    sayHi() { return phrase; }\n  };\n}\n\nlet User = makeClass(\"Salom!\");\nconsole.log(new User().sayHi());", file: "klass-factory.js" },

        { h2: "Getter va setter'lar" },
        { p: "Oddiy obyektlar kabi, klasslar ham <code>get</code>/<code>set</code> orqali hisoblanadigan xossalarni qo'llab-quvvatlaydi. Ular <code>obj.prop</code>ni o'qish yoki yozishda avtomatik chaqiriladi:" },
        { pg: "class User {\n  constructor(name) {\n    // setter ishga tushadi\n    this.name = name;\n  }\n\n  get name() {\n    return this._name;\n  }\n\n  set name(value) {\n    if (value.length < 2) {\n      console.log(\"Ism juda qisqa!\");\n      return;\n    }\n    this._name = value;\n  }\n}\n\nlet user = new User(\"Ali\");\nconsole.log(user.name); // getter chaqiriladi\n\nuser = new User(\"\"); // setter: juda qisqa\nconsole.log(user.name);", file: "klass-getset.js" },
        { p: "Texnik jihatdan bunday getter/setter <code>User.prototype</code>da yaratiladi. <code>_name</code> — bu ichki qiymatni saqlash uchun \"maxfiy\" xossa (bu haqda keyingi darslarda batafsil to'xtalamiz)." },

        { h2: "Hisoblangan nomlar [...]" },
        { p: "Metod nomini kvadrat qavslar <code>[...]</code> ichida hisoblab olish mumkin. Bu obyekt literalidagi hisoblangan xossalarga o'xshaydi:" },
        { pg: "let methodName = \"sayHi\";\n\nclass User {\n  [\"say\" + \"Hi\"]() {\n    return \"Salom, hisoblangan nom!\";\n  }\n}\n\nconsole.log(new User().sayHi());", file: "klass-computed.js" },

        { h2: "Class maydonlari (Class fields)" },
        { p: "Zamonaviy JavaScript'da klassga to'g'ridan-to'g'ri xossa (maydon) qo'shish mumkin. Buning uchun <code>constructor</code> shart emas:" },
        { pg: "class User {\n  name = \"Mehmon\";\n  age = 0;\n\n  sayHi() {\n    return this.name + \" (\" + this.age + \" yosh)\";\n  }\n}\n\nlet user = new User();\nconsole.log(user.sayHi());\nconsole.log(user.name);", file: "klass-fields.js" },
        { p: "Muhim farq: klass maydonlari <code>prototype</code>da emas, balki har bir <strong>obyektning o'zida</strong> o'rnatiladi. Ya'ni <code>name</code> — <code>user</code> obyektiga tegishli, <code>User.prototype</code>ga emas." },
        { tip: "Klass maydonlari <code>this</code>ni bog'lash muammosini hal qilish uchun ham juda foydali — maydon sifatida yozilgan strelka funksiya har doim o'z obyektiga bog'lanib qoladi. Bu haqda funksiyalar bo'limida batafsil to'xtalamiz." },

        { h2: "Xulosa" },
        { ul: [
          "<code>class</code> — bir turdagi obyektlarni yaratish uchun qulay sintaksis;",
          "Ichki jihatdan <code>class</code> — bu funksiya, metodlar esa <code>prototype</code>da saqlanadi;",
          "<code>constructor</code> — <code>new</code> paytida avtomatik chaqiriladigan metod;",
          "Metodlar sanab bo'lmaydi (non-enumerable) va kod qat'iy rejimda ishlaydi;",
          "Klasslar ifoda sifatida ham yoziladi, <code>get</code>/<code>set</code>, hisoblangan nomlar <code>[...]</code> va maydonlarni qo'llab-quvvatlaydi."
        ] }
      ]
    },

    {
      slug: "klass-meros",
      title: "Klass merosi",
      blurb: "extends kalit so'zi, super() konstruktorda, super.method() va metodlarni qayta aniqlash (override).",
      body: [
        { lead: "Klass merosi (inheritance) — bir klassning imkoniyatlarini boshqa klass asosida kengaytirish usuli. Bu bizga mavjud funksionallikni takrorlamasdan qayta ishlatish imkonini beradi." },

        { h2: "\"extends\" kalit so'zi" },
        { p: "Aytaylik, <code>Animal</code> (hayvon) klassimiz bor:" },
        { pg: "class Animal {\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n  run(speed) {\n    this.speed = speed;\n    return this.name + \" \" + this.speed + \" tezlikda yuguradi.\";\n  }\n  stop() {\n    this.speed = 0;\n    return this.name + \" to'xtadi.\";\n  }\n}\n\nlet animal = new Animal(\"Hayvon\");\nconsole.log(animal.run(5));\nconsole.log(animal.stop());", file: "meros-animal.js" },
        { p: "Endi <code>Rabbit</code> (quyon) klassini yaratmoqchimiz. Quyon ham hayvon bo'lgani uchun, u <code>Animal</code> imkoniyatlarini meros olishi va o'ziga xos metodlar qo'shishi kerak. Buning uchun <code>extends</code> ishlatamiz:" },
        { pg: "class Animal {\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n  run(speed) {\n    this.speed = speed;\n    return this.name + \" yuguradi.\";\n  }\n}\n\nclass Rabbit extends Animal {\n  hide() {\n    return this.name + \" berkindi!\";\n  }\n}\n\nlet rabbit = new Rabbit(\"Oq quyon\");\nconsole.log(rabbit.run(5)); // Animal'dan\nconsole.log(rabbit.hide()); // Rabbit'dan", file: "meros-extends.js" },
        { p: "<code>Rabbit</code> obyekti ham o'zining <code>hide()</code> metodiga, ham <code>Animal</code>dan meros olingan <code>run()</code> metodiga kirish huquqiga ega." },
        { note: "Texnik jihatdan <code>extends</code> <code>Rabbit.prototype.[[Prototype]]</code>ni <code>Animal.prototype</code>ga bog'laydi. Shu sababli <code>Rabbit</code>da metod topilmasa, JavaScript uni <code>Animal.prototype</code>dan qidiradi — bu prototip zanjiri orqali ishlaydi." },
        { p: "<code>extends</code>dan keyin ifoda ham yozilishi mumkin. Masalan, klass generatsiya qiluvchi funksiya chaqiruvi:" },
        { code: "function f(phrase) {\n  return class {\n    sayHi() { return phrase; }\n  };\n}\n\nclass User extends f(\"Salom\") {}\n\nconsole.log(new User().sayHi()); // Salom" },

        { h2: "Metodni qayta aniqlash (override)" },
        { p: "Endi keling, oldinga borib, metodni <strong>qayta aniqlaymiz</strong> (override qilamiz). Standart holatda <code>Rabbit</code>da aniqlanmagan barcha metodlar <code>Animal</code>dan \"o'z holicha\" olinadi. Ammo agar biz <code>Rabbit</code>da o'z <code>stop()</code>imizni yozsak, u ishlatiladi:" },
        { pg: "class Animal {\n  constructor(name) { this.name = name; }\n  stop() { return this.name + \" to'xtadi.\"; }\n}\n\nclass Rabbit extends Animal {\n  stop() {\n    return this.name + \" to'xtadi va berkindi!\";\n  }\n}\n\nconsole.log(new Rabbit(\"Quyon\").stop());", file: "meros-override.js" },

        { h2: "super orqali ota metodni chaqirish" },
        { p: "Ko'pincha biz ota metodni butunlay almashtirmoqchi emasmiz — uni asos qilib, ustiga qo'shimcha qilmoqchimiz. Buning uchun <code>super.method(...)</code> orqali ota klassdagi metodni chaqiramiz:" },
        { pg: "class Animal {\n  constructor(name) { this.name = name; this.speed = 0; }\n  run(speed) { this.speed = speed; return this.name + \" yuguradi.\"; }\n  stop() { this.speed = 0; return this.name + \" to'xtadi.\"; }\n}\n\nclass Rabbit extends Animal {\n  hide() { return this.name + \" berkindi!\"; }\n  stop() {\n    // ota stop()ni chaqiramiz, so'ng berkinamiz\n    let msg = super.stop();\n    return msg + \" \" + this.hide();\n  }\n}\n\nlet rabbit = new Rabbit(\"Oq quyon\");\nconsole.log(rabbit.run(5));\nconsole.log(rabbit.stop());", file: "meros-super-method.js" },
        { p: "Bu yerda <code>Rabbit</code>ning <code>stop()</code> metodi o'zining zanjiridagi <code>super.stop()</code>ni chaqiradi — ya'ni <code>Animal.prototype.stop</code>ni." },
        { warn: "Strelka funksiyalarda o'zining <code>super</code>si yo'q. Agar strelka funksiya ichida <code>super</code>ga murojaat qilsangiz, u tashqi metoddan olinadi. Bu ko'pincha foydali xususiyat, chunki strelka funksiyada <code>super</code> \"yo'qolib\" qolmaydi." },

        { h2: "Konstruktorni qayta aniqlash" },
        { p: "Konstruktor bilan biroz murakkabroq. Hozirgacha <code>Rabbit</code>ning o'z <code>constructor</code>i yo'q edi. Spetsifikatsiyaga ko'ra, agar meros olgan klassda <code>constructor</code> bo'lmasa, quyidagi \"bo'sh\" konstruktor avtomatik yaratiladi:" },
        { code: "class Rabbit extends Animal {\n  // meros olgan klass uchun avtomatik generatsiya qilinadi\n  constructor(...args) {\n    super(...args);\n  }\n}" },
        { p: "Ko'rib turganingizdek, u shunchaki ota <code>constructor</code>ini chaqiradi va unga barcha argumentlarni uzatadi. Endi <code>Rabbit</code>ga o'z konstruktorimizni qo'shsak, unda albatta <code>super(...)</code>ni chaqirishimiz kerak:" },
        { pg: "class Animal {\n  constructor(name) {\n    this.speed = 0;\n    this.name = name;\n  }\n}\n\nclass Rabbit extends Animal {\n  constructor(name, earLength) {\n    super(name); // ota konstruktorni chaqiramiz\n    this.earLength = earLength;\n  }\n}\n\nlet rabbit = new Rabbit(\"Oq quyon\", 10);\nconsole.log(rabbit.name);\nconsole.log(rabbit.speed);\nconsole.log(rabbit.earLength);", file: "meros-super-ctor.js" },

        { h2: "Nima uchun super() shart?" },
        { p: "Meros olgan klass konstruktorlari maxsus ichki <code>[[ConstructorKind]]: \"derived\"</code> belgisiga ega. Bu farq juda muhim:" },
        { ul: [
          "Oddiy klassda <code>new</code> paytida bo'sh <code>this</code> obyekti darhol yaratiladi;",
          "Meros olgan klass konstruktori esa bu ishni <strong>o'zi bajarmaydi</strong> — u buni ota konstruktordan kutadi. Shuning uchun <code>this</code>ni ishlatishdan oldin <code>super()</code>ni chaqirish shart."
        ] },
        { warn: "Agar meros olgan konstruktorda <code>super()</code>ni chaqirmasangiz yoki <code>this</code>ga undan oldin murojaat qilsangiz, xatolik chiqadi: <em>\"Must call super constructor before accessing 'this'\"</em>." },
        { pg: "class Animal {\n  constructor(name) { this.name = name; }\n}\n\nclass Rabbit extends Animal {\n  constructor(name) {\n    // super()dan oldin this'ga tegsak — xato:\n    try {\n      this.type = \"quyon\";\n    } catch (e) {\n      console.log(\"Xato: \" + e.name);\n    }\n    super(name);\n    this.type = \"quyon\";\n  }\n}\n\nlet r = new Rabbit(\"Quyon\");\nconsole.log(r.name, r.type);", file: "meros-super-error.js" },

        { h2: "Xulosa" },
        { ul: [
          "<code>class Child extends Parent</code> — <code>Child</code>ni <code>Parent</code>dan meros oldiradi;",
          "<code>super.method()</code> — ota klass metodini chaqiradi;",
          "<code>super(...)</code> — ota konstruktorini chaqiradi (faqat meros olgan konstruktor ichida);",
          "Meros olgan konstruktorda <code>this</code>ni ishlatishdan oldin <code>super()</code> chaqirilishi shart;",
          "Metodni qayta yozib (override), <code>super</code> orqali eskisini ham ishlatish mumkin."
        ] }
      ]
    },

    {
      slug: "static-metodlar",
      title: "Statik xossa va metodlar",
      blurb: "static metodlar, statik xossalar, factory metodlar va statik meros.",
      body: [
        { lead: "Metodni obyektning emas, balki klassning o'ziga (funksiyasiga) biriktirish mumkin. Bunday metodlar <strong>statik</strong> (static) deb ataladi." },

        { h2: "Statik metodlar" },
        { p: "Statik metod <code>static</code> kalit so'zi bilan e'lon qilinadi. U klass obyektlariga emas, balki <strong>klassning o'ziga</strong> tegishli bo'ladi:" },
        { pg: "class User {\n  static staticMethod() {\n    return \"Statik metod. this === \" + this.name;\n  }\n}\n\n// klassning o'zida chaqiriladi, obyektda emas:\nconsole.log(User.staticMethod());", file: "static-basic.js" },
        { p: "Bu aslida quyidagini yozishga teng:" },
        { code: "class User {}\nUser.staticMethod = function() {\n  return \"...\";\n};" },
        { p: "Statik metod ichidagi <code>this</code> — bu klassning o'zi (konstruktor funksiya). Odatda statik metodlar obyektlar ustida emas, balki butun klass darajasida ishlaydigan mantiq uchun ishlatiladi." },
        { warn: "Statik metodni obyekt orqali chaqira olmaysiz. Masalan, <code>new User().staticMethod()</code> xato beradi (<em>is not a function</em>), chunki statik metod obyektda emas, klassdadir." },

        { h2: "Amaliy misol: taqqoslash" },
        { p: "Statik metodlar ko'pincha obyektlarni taqqoslash yoki ular ustida umumiy amallar bajarish uchun ishlatiladi. Masalan, maqolalarni sanasi bo'yicha saralaymiz:" },
        { pg: "class Article {\n  constructor(title, date) {\n    this.title = title;\n    this.date = date;\n  }\n\n  static compare(a, b) {\n    return a.date - b.date;\n  }\n}\n\nlet articles = [\n  new Article(\"HTML\", new Date(2019, 1, 1)),\n  new Article(\"CSS\", new Date(2019, 0, 1)),\n  new Article(\"JS\", new Date(2019, 11, 1))\n];\n\n// klass metodi orqali saralaymiz:\narticles.sort(Article.compare);\n\nconsole.log(articles[0].title); // eng erta sana", file: "static-compare.js" },
        { p: "Bu yerda <code>Article.compare</code> maqolalar \"ustidagi\" umumiy vosita — bir maqolaga tegishli emas, shuning uchun uni statik qilish mantiqiy." },

        { h2: "Factory (fabrika) metodlar" },
        { p: "Yana bir keng tarqalgan qo'llanish — obyekt yaratishning turli usullarini beruvchi <strong>factory metod</strong>. Masalan, maqolani bugungi sana bilan yaratuvchi metod:" },
        { pg: "class Article {\n  constructor(title, date) {\n    this.title = title;\n    this.date = date;\n  }\n\n  // factory metod: bugungi maqola\n  static createTodays() {\n    // this === Article\n    return new this(\"Bugungi yangilik\", new Date());\n  }\n}\n\nlet article = Article.createTodays();\nconsole.log(article.title);\nconsole.log(article.date instanceof Date);", file: "static-factory.js" },
        { p: "Endi \"bugungi maqola\" kerak bo'lganda, har safar sana yaratish o'rniga <code>Article.createTodays()</code>ni chaqirsak yetarli. Bu yerda <code>this</code> — <code>Article</code> klassi, shuning uchun <code>new this(...)</code> to'g'ri klassni yaratadi." },

        { h2: "Statik xossalar" },
        { p: "Statik xossalar ham mavjud — ular oddiy klass xossalariga o'xshaydi, faqat oldiga <code>static</code> qo'yiladi:" },
        { pg: "class Article {\n  static publisher = \"Ilim Nashriyoti\";\n}\n\nconsole.log(Article.publisher);", file: "static-property.js" },
        { p: "Bu quyidagini yozishga teng: <code>Article.publisher = \"Ilim Nashriyoti\"</code>. Statik xossa butun klassga tegishli bo'lgan qiymatlarni (masalan, umumiy sozlamalar yoki hisoblagichlar) saqlash uchun qulay." },
        { pg: "class Counter {\n  static count = 0;\n  constructor() {\n    Counter.count++;\n  }\n}\n\nnew Counter();\nnew Counter();\nnew Counter();\nconsole.log(\"Yaratilgan obyektlar soni: \" + Counter.count);", file: "static-counter.js" },

        { h2: "Statik xossa va metodlar merosi" },
        { p: "Statik xossa va metodlar ham meros olinadi! Bu <code>extends</code>ning muhim xususiyati. Ya'ni <code>Rabbit extends Animal</code> qilinganda, <code>Rabbit</code> nafaqat oddiy metodlarni, balki statik metodlarni ham oladi:" },
        { pg: "class Animal {\n  static planet = \"Yer\";\n  constructor(name) { this.name = name; }\n  static compare(a, b) { return a.name.localeCompare(b.name); }\n}\n\nclass Rabbit extends Animal {}\n\n// statik metod meros olindi:\nlet r1 = new Rabbit(\"Bobi\");\nlet r2 = new Rabbit(\"Alfa\");\nconsole.log(Rabbit.compare(r1, r2));\n\n// statik xossa ham meros olindi:\nconsole.log(Rabbit.planet);", file: "static-inherit.js" },
        { p: "Bu qanday ishlaydi? <code>extends</code> ikkita prototip bog'lanishini o'rnatadi:" },
        { ul: [
          "<code>Rabbit.prototype.[[Prototype]]</code> — <code>Animal.prototype</code>ga (oddiy metodlar uchun);",
          "<code>Rabbit.[[Prototype]]</code> — <code>Animal</code>ga (statik metodlar uchun)."
        ] },
        { pg: "class Animal {}\nclass Rabbit extends Animal {}\n\n// Rabbit'ning [[Prototype]]si Animal:\nconsole.log(Object.getPrototypeOf(Rabbit) === Animal);\n// Rabbit.prototype'ning [[Prototype]]si Animal.prototype:\nconsole.log(Object.getPrototypeOf(Rabbit.prototype) === Animal.prototype);", file: "static-inherit-proto.js" },
        { note: "Statik metodlar butun klass bilan bog'liq bo'lgan, aniq bir obyektga bog'lanmagan funksiyalar uchun ishlatiladi. Masalan, <code>Object.keys(...)</code>, <code>Array.from(...)</code> — bular ham statik metodlardir." },

        { h2: "Xulosa" },
        { ul: [
          "Statik metodlar <code>static</code> bilan e'lon qilinadi va klassning o'zida chaqiriladi (obyektda emas);",
          "Ular ichidagi <code>this</code> — klassning o'zi;",
          "Statik metodlar taqqoslash va factory (obyekt yaratish) mantiqi uchun qulay;",
          "Statik xossalar butun klassga tegishli qiymatlarni saqlaydi;",
          "Statik xossa va metodlar ham <code>extends</code> orqali meros olinadi."
        ] }
      ]
    },

    {
      slug: "private-protected",
      title: "Maxfiy va himoyalangan xossalar",
      blurb: "protected konvensiyasi (_), private #maydonlar, getter/setter bilan himoya va inkapsulyatsiya.",
      body: [
        { lead: "Obyektga yo'naltirilgan dasturlashning eng muhim tamoyillaridan biri — <strong>inkapsulyatsiya</strong>: ichki tafsilotlarni tashqi kodda yashirish. Bu murakkablikni kamaytiradi va kodni xavfsizroq qiladi." },

        { h2: "Ichki va tashqi interfeys" },
        { p: "Obyektga yo'naltirilgan dasturlashda xossa va metodlar ikki turga bo'linadi:" },
        { ul: [
          "<strong>Ichki interfeys</strong> — obyektning boshqa metodlaridan foydalaniladigan, tashqaridan ko'rinmasligi kerak bo'lgan qismlar;",
          "<strong>Tashqi interfeys</strong> — obyektdan tashqarida ishlatilishi mumkin bo'lgan metod va xossalar."
        ] },
        { p: "JavaScript'da a'zolikni belgilashning ikki asosiy usuli bor: <em>protected</em> (himoyalangan, konvensiya) va <em>private</em> (maxfiy, til darajasida). Ularni ko'rib chiqamiz." },

        { h2: "protected — konvensiya (_ old qo'shimchasi)" },
        { p: "Himoyalangan (protected) xossalar odatda nom oldiga pastki chiziq <code>_</code> qo'yish orqali belgilanadi. Bu <strong>til darajasida majburiy emas</strong> — bu shunchaki dasturchilar orasidagi kelishuv (konvensiya)." },
        { pg: "class CoffeeMachine {\n  _waterAmount = 0; // himoyalangan (konvensiya)\n\n  set waterAmount(value) {\n    if (value < 0) value = 0;\n    this._waterAmount = value;\n  }\n\n  get waterAmount() {\n    return this._waterAmount;\n  }\n}\n\nlet machine = new CoffeeMachine();\nmachine.waterAmount = 100;\nconsole.log(machine.waterAmount);\n\n// manfiy qiymat 0 ga o'zgaradi:\nmachine.waterAmount = -10;\nconsole.log(machine.waterAmount);", file: "protected-water.js" },
        { p: "Bu yerda <code>_waterAmount</code> — ichki holat, u <code>get</code>/<code>set</code> orqali nazorat qilinadi. Manfiy qiymatni o'rnatishga urinsak, u avtomatik 0 ga tenglashadi. Shu tariqa biz noto'g'ri holatdan himoyalanamiz." },
        { note: "<code>_</code> old qo'shimchasi — bu faqat kelishuv. Yaxshi dasturchi <code>_</code>li xossalarga tashqaridan tegmaydi. Ammo texnik jihatdan bunga hech narsa to'sqinlik qilmaydi — <code>machine._waterAmount = -10</code> deb yozish baribir mumkin." },

        { h2: "Faqat o'qish uchun (read-only) xossalar" },
        { p: "Ba'zi xossalarni yaratilgandan keyin o'zgartirib bo'lmaydigan qilishimiz mumkin. Buning uchun faqat <code>get</code> yozamiz, <code>set</code>ni esa yozmaymiz:" },
        { pg: "class CoffeeMachine {\n  constructor(power) {\n    this._power = power;\n  }\n\n  get power() {\n    return this._power;\n  }\n  // set power yo'q — faqat o'qish mumkin\n}\n\nlet machine = new CoffeeMachine(100);\nconsole.log(\"Quvvat: \" + machine.power + \"W\");\n\n// o'zgartirishga urinsak (strict rejimda xato):\ntry {\n  machine.power = 25;\n} catch (e) {\n  console.log(\"Xato: quvvatni o'zgartirib bo'lmaydi\");\n}", file: "protected-readonly.js" },

        { h2: "private — # maydonlar" },
        { p: "Zamonaviy JavaScript'da haqiqiy <strong>maxfiy (private)</strong> maydonlar mavjud. Ular nom oldiga <code>#</code> belgisi qo'yish orqali yaratiladi. Bunday maydonlar <em>faqat</em> shu klass ichidan ko'rinadi — bu til darajasida ta'minlanadi:" },
        { pg: "class CoffeeMachine {\n  #waterLimit = 200; // maxfiy maydon\n\n  #fixWaterAmount(value) {\n    if (value < 0) return 0;\n    if (value > this.#waterLimit) return this.#waterLimit;\n    return value;\n  }\n\n  setWaterAmount(value) {\n    this.#waterLimit = this.#fixWaterAmount(value);\n    return \"Suv o'rnatildi: \" + this.#waterLimit;\n  }\n}\n\nlet machine = new CoffeeMachine();\nconsole.log(machine.setWaterAmount(50));\nconsole.log(machine.setWaterAmount(500)); // 200 ga cheklanadi", file: "private-fields.js" },
        { p: "Endi tashqaridan <code>#waterLimit</code> yoki <code>#fixWaterAmount</code>ga murojaat qilib bo'lmaydi — bu sintaktik xato beradi:" },
        { code: "let machine = new CoffeeMachine();\n\n// tashqaridan kirish mumkin emas:\nmachine.#waterLimit = 1000;\n// SyntaxError: Private field '#waterLimit'\n// must be declared in an enclosing class" },
        { warn: "Maxfiy maydonlar odatdagi maydonlar bilan ziddiyatlashmaydi. Ya'ni bir klassda ham <code>#waterAmount</code> (maxfiy), ham <code>waterAmount</code> (oddiy) bo'lishi mumkin — ular butunlay alohida maydonlar." },

        { h2: "private + getter/setter bilan to'liq himoya" },
        { p: "Eng ishonchli usul — maxfiy maydonni <code>#</code> bilan e'lon qilib, unga faqat getter/setter orqali kirish. Shunda ma'lumot ham yashiringan, ham nazorat ostida bo'ladi:" },
        { pg: "class CoffeeMachine {\n  #waterAmount = 0;\n\n  get waterAmount() {\n    return this.#waterAmount;\n  }\n\n  set waterAmount(value) {\n    if (value < 0) {\n      throw new Error(\"Manfiy suv miqdori mumkin emas\");\n    }\n    this.#waterAmount = value;\n  }\n}\n\nlet machine = new CoffeeMachine();\nmachine.waterAmount = 150;\nconsole.log(machine.waterAmount);\n\ntry {\n  machine.waterAmount = -5;\n} catch (e) {\n  console.log(\"Ushlab qolindi: \" + e.message);\n}", file: "private-getset.js" },

        { h2: "private maydonlar meros olinmaydi" },
        { p: "Muhim cheklov: maxfiy <code>#</code> maydonlar meros olgan klasslarda <strong>ko'rinmaydi</strong>. Agar himoyalangan, lekin merosxo'rlarga ochiq bo'lishini istasangiz, <code>_</code> konvensiyasidan foydalaning." },
        { pg: "class Machine {\n  #secret = \"maxfiy\";     // meros olinmaydi\n  _protectedInfo = \"himoyalangan\"; // meros olinadi\n}\n\nclass Robot extends Machine {\n  reveal() {\n    // _protectedInfo bemalol ko'rinadi:\n    return this._protectedInfo;\n  }\n}\n\nconsole.log(new Robot().reveal());", file: "private-inherit.js" },

        { h2: "Nima uchun inkapsulyatsiya kerak?" },
        { p: "Inkapsulyatsiyaning katta afzalliklari bor:" },
        { ul: [
          "<strong>Foydalanuvchini adashtirmaslik</strong> — kishilar faqat tashqi interfeys bilan ishlaydi, ichkarisini bilishi shart emas;",
          "<strong>Qo'llab-quvvatlash osonligi</strong> — ichki qismni istalgan vaqtda o'zgartirsangiz, tashqi kod buzilmaydi;",
          "<strong>Murakkablikni yashirish</strong> — kod ishonchli va toza bo'ladi."
        ] },
        { tip: "Yangi loyihalarda haqiqiy maxfiylik uchun <code>#</code> maydonlarini ishlatish tavsiya etiladi. Eski kodlarni qo'llab-quvvatlashda esa <code>_</code> konvensiyasi hali ham keng tarqalgan." },

        { h2: "Xulosa" },
        { ul: [
          "Inkapsulyatsiya — ichki tafsilotlarni tashqi interfeysdan ajratish;",
          "<code>_</code> old qo'shimchasi — protected (himoyalangan) konvensiya, majburiy emas;",
          "<code>#</code> maydonlari — til darajasida haqiqiy private (maxfiy);",
          "<code>#</code> maydonlariga faqat shu klass ichidan kirish mumkin va ular meros olinmaydi;",
          "getter/setter orqali xossalarni nazorat qilib, noto'g'ri holatdan himoyalanish mumkin."
        ] }
      ]
    },

    {
      slug: "built-in-extend",
      title: "Tug'ma klasslarni kengaytirish",
      blurb: "Array, Error kabi tug'ma klasslarni extends qilish va Symbol.species tushunchasi.",
      body: [
        { lead: "Array, Map, Error kabi <strong>tug'ma (built-in)</strong> klasslarni ham <code>extends</code> orqali kengaytirish mumkin. Bu bizga ularning imkoniyatlarini saqlab qolgan holda o'z metodlarimizni qo'shish imkonini beradi." },

        { h2: "Array'ni kengaytirish" },
        { p: "Aytaylik, bizga oddiy massivga o'xshash, lekin qo'shimcha metodlarga ega bo'lgan tur kerak. Masalan, <code>isEmpty()</code> metodini qo'shamiz:" },
        { pg: "class PowerArray extends Array {\n  isEmpty() {\n    return this.length === 0;\n  }\n}\n\nlet arr = new PowerArray(1, 2, 5, 10, 50);\nconsole.log(arr.isEmpty()); // false\n\nlet filtered = arr.filter(item => item >= 10);\nconsole.log(filtered);\nconsole.log(filtered.isEmpty()); // false", file: "builtin-array.js" },
        { p: "E'tibor bering — <code>PowerArray</code> odatdagi massivning barcha metodlariga (<code>push</code>, <code>filter</code>, <code>length</code> va h.k.) ega. Bundan tashqari, o'zimizning <code>isEmpty()</code>miz ham bor." },

        { h2: "Qiziq narsa: yangi obyekt turi" },
        { p: "Yuqoridagi misolda diqqatga sazovor jihat bor: <code>filter</code>, <code>map</code> kabi tug'ma metodlar <strong>o'sha meros olgan turdagi</strong> yangi obyektlarni qaytaradi, oddiy <code>Array</code> emas! Ular ichki jihatdan obyektning <code>constructor</code> xossasidan foydalanadi:" },
        { pg: "class PowerArray extends Array {\n  isEmpty() { return this.length === 0; }\n}\n\nlet arr = new PowerArray(1, 2, 5, 10, 50);\nlet filtered = arr.filter(item => item >= 10);\n\n// filtered ham PowerArray:\nconsole.log(filtered instanceof PowerArray); // true\nconsole.log(filtered.isEmpty()); // metod ishlaydi", file: "builtin-species.js" },

        { h2: "Symbol.species" },
        { p: "Agar biz <code>filter</code>, <code>map</code> kabi metodlar oddiy <code>Array</code> qaytarishini xohlasak, maxsus statik getter <code>Symbol.species</code>ni belgilaymiz. U qanday konstruktor ishlatilishini boshqaradi:" },
        { pg: "class PowerArray extends Array {\n  isEmpty() { return this.length === 0; }\n\n  // tug'ma metodlar oddiy Array qaytarsin:\n  static get [Symbol.species]() {\n    return Array;\n  }\n}\n\nlet arr = new PowerArray(1, 2, 5, 10, 50);\nlet filtered = arr.filter(item => item >= 10);\n\n// endi filtered — oddiy Array:\nconsole.log(filtered instanceof PowerArray); // false\nconsole.log(filtered instanceof Array); // true", file: "builtin-species2.js" },
        { note: "<code>Symbol.species</code> — bu Map, Set kabi boshqa tug'ma kolleksiyalar uchun ham ishlaydi. U \"ichki metodlar qanday obyekt yaratsin\" degan savolga javob beradi." },

        { h2: "Error'ni kengaytirish" },
        { p: "Amaliyotda eng ko'p kengaytiriladigan tug'ma klasslardan biri — <code>Error</code>. Bu bizga o'ziga xos xato turlarini yaratish imkonini beradi:" },
        { pg: "class ValidationError extends Error {\n  constructor(message) {\n    super(message); // ota Error konstruktorini chaqiramiz\n    this.name = \"ValidationError\";\n  }\n}\n\nfunction readUser(json) {\n  let user = JSON.parse(json);\n  if (!user.name) {\n    throw new ValidationError(\"Ism (name) yo'q\");\n  }\n  return user;\n}\n\ntry {\n  readUser('{\"age\": 25}');\n} catch (err) {\n  console.log(err.name);    // ValidationError\n  console.log(err.message); // Ism (name) yo'q\n  console.log(err instanceof ValidationError); // true\n  console.log(err instanceof Error); // true\n}", file: "builtin-error.js" },
        { p: "Bu yerda <code>super(message)</code> ota <code>Error</code> konstruktorini chaqirib, <code>message</code>ni o'rnatadi. So'ng biz <code>this.name</code>ni o'zgartirib, xatoni aniq turlab olamiz. <code>err instanceof Error</code> ham <code>true</code> — ya'ni bizning xatomiz haqiqiy <code>Error</code>." },
        { tip: "O'z xato klasslaringizni yaratish katta loyihalarda juda foydali — turli xato turlarini <code>catch</code> blokida <code>instanceof</code> orqali ajratib, har biriga alohida munosabatda bo'lish mumkin." },

        { h2: "Statik xossalar meros olinmasligiga eslatma" },
        { p: "Muhim tafsilot: tug'ma klasslarni kengaytirganda oddiy metod va konstruktorlar meros olinadi, ammo tug'ma klasslarning ba'zi <strong>statik metodlari</strong> meros olinmaydi. Masalan, <code>Array.isArray</code> — u <code>Array</code>ning statik metodi bo'lib, meros olgan klassdan chaqirilganda ehtiyot bo'lish kerak." },
        { pg: "class PowerArray extends Array {}\n\nlet arr = new PowerArray(1, 2, 3);\n\n// Array.isArray tug'ma tekshiruvi baribir ishlaydi:\nconsole.log(Array.isArray(arr)); // true\n\n// PowerArray ham Array'dan statik metodni oladi:\nconsole.log(typeof PowerArray.isArray);", file: "builtin-static.js" },

        { h2: "Xulosa" },
        { ul: [
          "<code>Array</code>, <code>Error</code>, <code>Map</code> kabi tug'ma klasslarni <code>extends</code> qilish mumkin;",
          "Meros olgan tur tug'ma metodlarni to'liq saqlaydi va o'z metodlarini qo'shadi;",
          "<code>filter</code>, <code>map</code> kabi metodlar standart holatda meros olgan turdagi obyekt qaytaradi;",
          "<code>Symbol.species</code> orqali qaytariladigan obyekt turini boshqarish mumkin;",
          "<code>Error</code>ni kengaytirib, o'ziga xos xato turlarini yaratish keng tarqalgan amaliyot."
        ] }
      ]
    },

    {
      slug: "instanceof",
      title: "instanceof tekshiruvi",
      blurb: "instanceof operatori, prototip zanjiri orqali tekshiruv, Symbol.hasInstance va Object.prototype.toString.",
      body: [
        { lead: "<code>instanceof</code> operatori obyekt ma'lum bir klassga tegishli yoki yo'qligini tekshiradi. U merosni ham hisobga oladi, shuning uchun ko'p hollarda juda foydali." },

        { h2: "instanceof operatori" },
        { p: "Sintaksis oddiy: <code>obj instanceof Class</code>. Agar <code>obj</code> <code>Class</code>ga (yoki undan meros olgan klassga) tegishli bo'lsa, <code>true</code> qaytadi:" },
        { pg: "class Rabbit {}\nlet rabbit = new Rabbit();\n\nconsole.log(rabbit instanceof Rabbit); // true\n\n// tug'ma klasslar bilan ham ishlaydi:\nlet arr = [1, 2, 3];\nconsole.log(arr instanceof Array);  // true\nconsole.log(arr instanceof Object); // true", file: "instanceof-basic.js" },
        { p: "Oxirgi misolda <code>arr instanceof Object</code> ham <code>true</code>, chunki <code>Array</code> prototipik jihatdan <code>Object</code>dan meros oladi." },

        { h2: "instanceof meros bilan" },
        { p: "<code>instanceof</code>ning kuchi shundaki, u prototip zanjiri bo'ylab qaraydi. Ya'ni meros olgan obyekt ham ota klassning \"nusxasi\" hisoblanadi:" },
        { pg: "class Animal {}\nclass Rabbit extends Animal {}\n\nlet rabbit = new Rabbit();\n\nconsole.log(rabbit instanceof Rabbit); // true\nconsole.log(rabbit instanceof Animal); // true — meros!\nconsole.log(rabbit instanceof Object); // true", file: "instanceof-inherit.js" },

        { h2: "U qanday ishlaydi? Prototip zanjiri" },
        { p: "Aslida <code>obj instanceof Class</code> quyidagi algoritm bo'yicha ishlaydi: u <code>obj</code>ning prototip zanjirini birma-bir tekshiradi va zanjirda <code>Class.prototype</code> uchraydimi yoki yo'qmi ko'radi." },
        { ol: [
          "<code>obj.__proto__</code> === <code>Class.prototype</code> ? Ha bo'lsa <code>true</code>;",
          "Yo'q bo'lsa, <code>obj.__proto__.__proto__</code>ni tekshiradi;",
          "Zanjir oxirigacha (<code>null</code>ga yetguncha) davom etadi."
        ] },
        { pg: "class Animal {}\nclass Rabbit extends Animal {}\n\nlet rabbit = new Rabbit();\n\n// zanjirni qo'lda tekshiramiz:\nconsole.log(Object.getPrototypeOf(rabbit) === Rabbit.prototype); // true\nconsole.log(\n  Object.getPrototypeOf(Object.getPrototypeOf(rabbit)) === Animal.prototype\n); // true", file: "instanceof-chain.js" },
        { note: "Aynan shu sabab <code>instanceof</code> merosni to'g'ri hisobga oladi: u prototip zanjirining istalgan bosqichida <code>Class.prototype</code>ni topsa yetarli." },

        { h2: "Symbol.hasInstance" },
        { p: "<code>instanceof</code>ning xatti-harakatini sozlash mumkin. Agar klassda maxsus statik metod <code>Symbol.hasInstance</code> bo'lsa, <code>instanceof</code> aynan uni chaqiradi:" },
        { pg: "class Animal {\n  // 'canEat' xossasi bor obyektlar Animal deb hisoblansin:\n  static [Symbol.hasInstance](obj) {\n    return obj.canEat === true;\n  }\n}\n\nlet obj = { canEat: true };\nconsole.log(obj instanceof Animal); // true\n\nlet stone = { canEat: false };\nconsole.log(stone instanceof Animal); // false", file: "instanceof-hasinstance.js" },
        { p: "Bu yerda <code>obj</code> <code>Animal</code>dan meros olmagan bo'lsa ham, uning <code>canEat</code> xossasi <code>true</code> bo'lgani uchun <code>instanceof</code> <code>true</code> qaytardi. Ya'ni biz \"tegishlilik\" mezonini o'zimiz belgiladik." },
        { warn: "<code>Symbol.hasInstance</code> juda kuchli, ammo kamdan-kam ishlatiladi. Uni faqat maxsus mantiq zarur bo'lganda ishlatish tavsiya etiladi, aks holda kod chalkash bo'lib qoladi." },

        { h2: "Object.prototype.toString bilan tur aniqlash" },
        { p: "<code>typeof</code> operatori cheklangan — u massiv, sana yoki <code>null</code>ni ajrata olmaydi. <code>instanceof</code> esa klasslar bilan ishlaydi. Yana bir kuchli usul — <code>Object.prototype.toString</code> orqali obyektning aniq turini olish:" },
        { pg: "let objectToString = Object.prototype.toString;\n\nconsole.log(objectToString.call(123));       // [object Number]\nconsole.log(objectToString.call(\"salom\"));   // [object String]\nconsole.log(objectToString.call(true));      // [object Boolean]\nconsole.log(objectToString.call([1, 2]));    // [object Array]\nconsole.log(objectToString.call(null));      // [object Null]\nconsole.log(objectToString.call(function(){})); // [object Function]", file: "instanceof-tostring.js" },
        { p: "Ko'rib turganingizdek, <code>Object.prototype.toString</code> <code>typeof</code>dan aniqroq: u <code>Array</code>, <code>Null</code> kabi turlarni ham to'g'ri aniqlaydi. Faqat qavs ichidagi turni ajratib olish uchun kichik kod yozamiz:" },
        { pg: "function getType(value) {\n  return Object.prototype.toString.call(value)\n    .slice(8, -1); // '[object ' va ']' ni kesamiz\n}\n\nconsole.log(getType(123));     // Number\nconsole.log(getType([1, 2]));  // Array\nconsole.log(getType(null));    // Null\nconsole.log(getType(new Date())); // Date", file: "instanceof-gettype.js" },
        { tip: "<code>Object.prototype.toString.call(value).slice(8, -1)</code> — bu \"tur aniqlash\"ning eng ishonchli usuli. U <code>typeof</code>dan aniqroq va tug'ma turlar bilan mukammal ishlaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>obj instanceof Class</code> — obyekt klassga tegishli (yoki undan meros olganini) tekshiradi;",
          "U prototip zanjiri bo'ylab qidirib, <code>Class.prototype</code>ni topsa <code>true</code> qaytaradi;",
          "Merosni to'g'ri hisobga oladi: <code>rabbit instanceof Animal</code> ham <code>true</code>;",
          "<code>Symbol.hasInstance</code> orqali <code>instanceof</code> mantiqini sozlash mumkin;",
          "<code>Object.prototype.toString.call(...)</code> — <code>typeof</code>dan aniqroq tur aniqlash usuli."
        ] }
      ]
    },

    {
      slug: "mixin",
      title: "Mixinlar",
      blurb: "mixin g'oyasi, Object.assign bilan qo'llash, hodisali mixin misoli va merosdan farqi.",
      body: [
        { lead: "JavaScript'da faqat bitta obyektdan meros olish mumkin (bir <code>[[Prototype]]</code> va bir ota klass). Ammo ba'zan bir nechta manbadan funksionallik olishni istaymiz. Bu holda <strong>mixin</strong> yordamga keladi." },

        { h2: "Mixin g'oyasi" },
        { p: "<strong>Mixin</strong> — bu boshqa klasslar ishlatishi mumkin bo'lgan metodlar to'plamini o'z ichiga olgan klass yoki obyekt. Mixinning o'zi mustaqil ishlatilmaydi — u boshqa klasslarni \"boyitish\" uchun xizmat qiladi." },
        { p: "Wikipediadagi ta'rif: mixin — bu boshqa klasslar tomonidan meros orqali emas, balki metodlarini <strong>nusxalash</strong> orqali ishlatiladigan metodlarni o'z ichiga olgan klass." },

        { h2: "Object.assign bilan eng oddiy mixin" },
        { p: "Amalda mixin — bu shunchaki foydali metodlar to'plamiga ega obyekt. Uni klass prototipiga <code>Object.assign</code> orqali nusxalash mumkin:" },
        { pg: "// mixin — foydali metodlar to'plami\nlet sayHiMixin = {\n  sayHi() {\n    return \"Salom, \" + this.name;\n  },\n  sayBye() {\n    return \"Xayr, \" + this.name;\n  }\n};\n\nclass User {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\n// metodlarni User.prototype'ga nusxalaymiz:\nObject.assign(User.prototype, sayHiMixin);\n\n// endi User obyektlari sayHi/sayBye'ga ega:\nlet user = new User(\"Ali\");\nconsole.log(user.sayHi());\nconsole.log(user.sayBye());", file: "mixin-basic.js" },
        { p: "E'tibor bering: <code>User</code> allaqachon boshqa klassdan meros olishi mumkin, mixin esa unga yana qo'shimcha metodlar beradi. Ya'ni mixin merosga xalaqit bermaydi." },
        { note: "Mixin ichida <code>this</code> ishlatilyapti (masalan <code>this.name</code>). Bu shundan — mixin metodlari qaysi obyektda chaqirilsa, o'sha obyektning kontekstida ishlaydi." },

        { h2: "Mixin ichida meros" },
        { p: "Mixinlarning o'zi bir-biridan meros olishi ham mumkin. Masalan, bir mixin boshqasidan olingan metodni <code>super</code> orqali chaqirishi mumkin:" },
        { pg: "let sayMixin = {\n  say(phrase) {\n    return phrase;\n  }\n};\n\nlet sayHiMixin = {\n  __proto__: sayMixin, // meros mixindan\n\n  sayHi() {\n    // super — sayMixin'ga ishora qiladi\n    return super.say(\"Salom, \" + this.name);\n  }\n};\n\nclass User {\n  constructor(name) { this.name = name; }\n}\n\nObject.assign(User.prototype, sayHiMixin);\nconsole.log(new User(\"Vali\").sayHi());", file: "mixin-super.js" },

        { h2: "Hodisali mixin (EventEmitter)" },
        { p: "Mixinning eng amaliy misoli — <strong>hodisalar (events)</strong> mixini. Ko'p obyektlar hodisa \"chiqarishi\" (generatsiya qilishi) va boshqalar ularga \"quloq solishi\" (tinglashi) kerak bo'ladi. Buni mixin sifatida yozib, istalgan klassga ulash mumkin:" },
        { pg: "let eventMixin = {\n  on(eventName, handler) {\n    if (!this._handlers) this._handlers = {};\n    if (!this._handlers[eventName]) this._handlers[eventName] = [];\n    this._handlers[eventName].push(handler);\n  },\n\n  trigger(eventName, ...args) {\n    if (!this._handlers || !this._handlers[eventName]) return;\n    for (let handler of this._handlers[eventName]) {\n      handler.apply(this, args);\n    }\n  }\n};\n\nclass Menu {\n  choose(value) {\n    // hodisa chiqaramiz:\n    this.trigger(\"select\", value);\n  }\n}\n\nObject.assign(Menu.prototype, eventMixin);\n\nlet menu = new Menu();\n\n// 'select' hodisasiga tinglovchi qo'shamiz:\nmenu.on(\"select\", value => {\n  console.log(\"Tanlandi: \" + value);\n});\n\nmenu.choose(\"123\"); // Tanlandi: 123", file: "mixin-events.js" },
        { p: "Bu yerda <code>eventMixin</code> ikkita metod beradi:" },
        { ul: [
          "<code>on(eventName, handler)</code> — nomli hodisaga tinglovchi (handler) qo'shadi;",
          "<code>trigger(eventName, ...args)</code> — hodisani \"chiqaradi\", barcha tinglovchilarni chaqiradi."
        ] },
        { p: "Endi istalgan klass shu mixinni ulab, hodisalar tizimiga ega bo'la oladi — yangi meros zanjiri yaratmasdan." },

        { h2: "Mixin va meros farqi" },
        { p: "Mixin va meros o'rtasidagi asosiy farqlarni tushunish muhim:" },
        { ul: [
          "<strong>Meros</strong> — \"bir turdan\" chuqur bog'lanish (<code>is-a</code>, ya'ni \"quyon — bu hayvon\"). JavaScript'da faqat bitta ota klass mumkin;",
          "<strong>Mixin</strong> — \"funksionallik qo'shish\" (<code>has-a</code>, ya'ni \"menyu hodisa chiqara oladi\"). Bir nechta mixinni istalgancha ulash mumkin;",
          "Meros prototip zanjiri orqali dinamik bog'lanadi, mixin esa metodlarni <em>nusxalaydi</em>."
        ] },
        { warn: "Mixin obyektning mavjud metodlarini tasodifan ustidan yozib yuborishi mumkin (<code>Object.assign</code> nusxalagani uchun). Shu sababli mixin metodlariga o'ziga xos, kamdan-kam to'qnashadigan nomlar berish yaxshi amaliyot (masalan <code>_handlers</code> kabi <code>_</code>li ichki nomlar)." },
        { tip: "Amaliyotda ko'p mashhur kutubxonalar (masalan Node.js'ning <code>EventEmitter</code>i) shunday hodisa mexanizmini beradi. Mixin g'oyasi esa uni istalgan obyektga ulash imkonini beradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Mixin</strong> — boshqa klasslarga metodlar qo'shish uchun umumiy metodlar to'plami;",
          "JavaScript'da mixinlar ko'pincha <code>Object.assign(Class.prototype, mixin)</code> orqali qo'llaniladi;",
          "Mixinlar meros zanjiriga xalaqit bermaydi — klass baribir boshqa klassdan meros olishi mumkin;",
          "Hodisali mixin (<code>on</code>/<code>trigger</code>) — eng amaliy va keng tarqalgan misol;",
          "Meros \"is-a\" (bir turdan), mixin esa \"has-a\" (funksionallik qo'shish) munosabatini ifodalaydi."
        ] }
      ]
    }
  ]
};
