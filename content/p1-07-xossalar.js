"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Obyekt xossalari konfiguratsiyasi",
  lessons: [
    {
      slug: "property-flags",
      title: "Xossa bayroqlari va deskriptorlari",
      blurb: "Obyekt xossalari faqat qiymatdan iborat emas — ular writable, enumerable va configurable bayroqlariga ega. Ularni qanday o'qish va o'zgartirish mumkin.",
      body: [
        { lead: "Biz obyekt xossalarini oddiy \"kalit: qiymat\" juftliklari deb bilamiz. Aslida esa xossa — bu ancha moslashuvchan va boshqariladigan narsa. Ushbu darsda xossalarning yashirin <strong>bayroqlari</strong> (flags) bilan tanishamiz va ularni deskriptorlar orqali qanday sozlashni o'rganamiz." },

        { h2: "Xossa bayroqlari nima?" },
        { p: "Obyekt xossalari qiymatdan tashqari yana uchta maxsus atribut — <strong>bayroq</strong> (flag)ga ega. Ular <code>true</code> yoki <code>false</code> qiymat oladi:" },
        { ul: [
          "<strong>writable</strong> — agar <code>true</code> bo'lsa, xossa qiymatini o'zgartirish mumkin; aks holda u faqat o'qish uchun (read-only) bo'ladi;",
          "<strong>enumerable</strong> — agar <code>true</code> bo'lsa, xossa sikllarda (masalan, <code>for..in</code>) sanab o'tiladi; aks holda \"yashirin\" bo'ladi;",
          "<strong>configurable</strong> — agar <code>true</code> bo'lsa, xossani o'chirish va uning bayroqlarini o'zgartirish mumkin; aks holda bu taqiqlanadi."
        ] },
        { p: "Biz xossani odatdagidek yaratganimizda, bu uchala bayroq avtomatik ravishda <code>true</code> qiymatini oladi. Shuning uchun biz ularni odatda sezmaymiz — hamma narsa \"erkin\" ishlaydi." },
        { note: "Bu darsda ko'rib chiqiladigan bayroqlar faqat <strong>ma'lumot xossalari</strong> (data properties) uchun amal qiladi. Keyingi darsda ko'radigan getter/setter aksessor xossalari boshqacha atributlarga ega." },

        { h2: "Object.getOwnPropertyDescriptor" },
        { p: "Xossa haqidagi <em>to'liq</em> ma'lumotni — qiymati va barcha bayroqlarini — bilish uchun <code>Object.getOwnPropertyDescriptor</code> metodidan foydalanamiz. Sintaksisi quyidagicha:" },
        { code: "let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);" },
        { ul: [
          "<code>obj</code> — ma'lumot olinadigan obyekt;",
          "<code>propertyName</code> — xossa nomi (satr ko'rinishida)."
        ] },
        { p: "Natijada \"xossa deskriptori\" (property descriptor) deb ataladigan obyekt qaytadi. U qiymatni va barcha bayroqlarni saqlaydi. Quyidagi misolni ishga tushiring:" },
        { pg: "let user = {\n  name: \"Jasur\"\n};\n\nlet descriptor = Object.getOwnPropertyDescriptor(user, \"name\");\n\nconsole.log( JSON.stringify(descriptor, null, 2) );", file: "getdescriptor.js" },
        { p: "Ko'rib turganingizdek, oddiy usulda yaratilgan xossada <code>value</code>, <code>writable</code>, <code>enumerable</code> va <code>configurable</code>ning hammasi <code>true</code>ga teng." },

        { h2: "Object.defineProperty" },
        { p: "Bayroqlarni o'zgartirish uchun <code>Object.defineProperty</code> metodidan foydalanamiz:" },
        { code: "Object.defineProperty(obj, propertyName, descriptor);" },
        { ul: [
          "<code>obj</code>, <code>propertyName</code> — obyekt va xossa nomi;",
          "<code>descriptor</code> — qo'llaniladigan deskriptor obyekti."
        ] },
        { p: "Agar bunday nomli xossa mavjud bo'lsa, <code>defineProperty</code> uning bayroqlarini yangilaydi. Aks holda esa berilgan qiymat va bayroqlar bilan yangi xossa yaratadi; bunda ko'rsatilmagan bayroq <code>false</code> deb qabul qilinadi." },
        { pg: "let user = {};\n\nObject.defineProperty(user, \"name\", {\n  value: \"Jasur\"\n});\n\nlet descriptor = Object.getOwnPropertyDescriptor(user, \"name\");\n\nconsole.log( JSON.stringify(descriptor, null, 2) );", file: "defineproperty.js" },
        { warn: "Diqqat qiling: yuqoridagi misolda xossa <code>defineProperty</code> orqali yaratildi, lekin bayroqlar aniq ko'rsatilmadi. Shuning uchun <code>writable</code>, <code>enumerable</code> va <code>configurable</code> avtomatik <code>false</code> bo'lib qoladi — bu oddiy <code>user.name = \"Jasur\"</code>dan tubdan farq qiladi!" },

        { h2: "writable — faqat o'qish uchun xossa" },
        { p: "<code>name</code> xossasini faqat o'qish uchun (read-only) qilib qo'yamiz. Buning uchun <code>writable</code>ni <code>false</code>ga o'zgartiramiz. Endi hech kim uning qiymatini o'zgartira olmaydi:" },
        { pg: "let user = {\n  name: \"Jasur\"\n};\n\nObject.defineProperty(user, \"name\", {\n  writable: false\n});\n\nuser.name = \"Alisher\"; // sokin rejimda e'tiborsiz qoldiriladi\n\nconsole.log(user.name); // Jasur — qiymat o'zgarmadi", file: "writable.js" },
        { note: "Odatdagi (sokin) rejimda o'zgartirishga urinish jimgina e'tiborsiz qoldiriladi. Ammo faylning boshida <code>\"use strict\"</code> yozilgan qat'iy rejimda esa bu urinish xatolik (<code>TypeError</code>) chaqiradi." },
        { p: "Faqat o'qish uchun xossani o'zgartirishga urinish qat'iy rejimda qanday xato berishini ko'rsatuvchi misol:" },
        { pg: "\"use strict\";\n\nlet user = {};\n\nObject.defineProperty(user, \"name\", {\n  value: \"Jasur\",\n  writable: false\n});\n\ntry {\n  user.name = \"Alisher\";\n} catch (err) {\n  console.log(\"Xato yuz berdi: \" + err.name);\n  // TypeError: Cannot assign to read only property 'name'\n}", file: "writable-strict.js" },

        { h2: "enumerable — sanashdan yashirish" },
        { p: "Endi obyektga maxsus <code>toString</code> metodini qo'shamiz. Odatda obyektlardagi barcha xossalar <code>for..in</code> siklida ko'rinadi, bu esa har doim ham kerak emas. <code>enumerable: false</code> qilib, xossani sikllardan va <code>Object.keys</code>dan yashiramiz:" },
        { pg: "let user = {\n  name: \"Jasur\",\n  toString() {\n    return this.name;\n  }\n};\n\n// Yashirishdan oldin: toString ham sanaladi\nfor (let key in user) console.log(\"Oldin: \" + key);\n\nObject.defineProperty(user, \"toString\", {\n  enumerable: false\n});\n\n// Yashirishdan keyin: faqat name qoladi\nfor (let key in user) console.log(\"Keyin: \" + key);\n\nconsole.log(\"Object.keys: \" + Object.keys(user));", file: "enumerable.js" },
        { tip: "Enumerable bo'lmagan xossalar <code>Object.keys()</code>, <code>Object.values()</code> va <code>for..in</code> natijasidan tushib qoladi, lekin ular baribir mavjud — ularga to'g'ridan-to'g'ri (<code>user.toString</code>) murojaat qilsa bo'ladi." },

        { h2: "configurable — o'zgarmas xossa" },
        { p: "<code>configurable: false</code> bayrog'i ba'zi muhim ichki xossalarga o'rnatilgan bo'ladi. Bunday xossani <code>delete</code> orqali o'chirib bo'lmaydi va uning bayroqlarini <code>defineProperty</code> orqali o'zgartirib ham bo'lmaydi." },
        { p: "Masalan, <code>Math.PI</code> faqat o'qiladigan, sanalmaydigan va sozlanmaydigan (non-configurable) xossadir. Buni tekshiramiz:" },
        { pg: "let descriptor = Object.getOwnPropertyDescriptor(Math, \"PI\");\n\nconsole.log( JSON.stringify(descriptor, null, 2) );\n// writable: false, enumerable: false, configurable: false", file: "configurable-mathpi.js" },
        { p: "Xossani \"abadiy muhrlash\" uchun uni bir vaqtda <code>writable: false</code> va <code>configurable: false</code> qilib qo'yish odatiy usuldir. Shundan so'ng qiymatni ham, bayroqlarni ham hech kim o'zgartira olmaydi:" },
        { pg: "let user = {};\n\nObject.defineProperty(user, \"name\", {\n  value: \"Jasur\",\n  writable: false,\n  configurable: false\n});\n\n// Endi na o'zgartirib, na o'chirib, na qayta sozlab bo'ladi\ntry {\n  Object.defineProperty(user, \"name\", { value: \"Alisher\" });\n} catch (err) {\n  console.log(\"Bloklandi: \" + err.name); // TypeError\n}", file: "configurable-seal.js" },
        { warn: "<code>configurable: false</code> — bu bir tomonlama harakat. Xossani sozlanmas qilib qo'ygandan so'ng, uni <code>defineProperty</code> orqali qaytadan sozlanadigan (<code>configurable: true</code>) qilib bo'lmaydi. Bu qaytmas amaldir." },
        { note: "Muhim istisno: agar <code>configurable</code> <code>false</code>, lekin <code>writable</code> <code>true</code> bo'lsa, qiymatni hali ham o'zgartirish mumkin, shuningdek <code>writable</code>ni <code>true</code>dan <code>false</code>ga o'zgartirish ham ruxsat etiladi (aksincha emas)." },

        { h2: "Object.defineProperties" },
        { p: "Bir vaqtning o'zida bir nechta xossani e'lon qilish uchun <code>Object.defineProperties</code> qulay:" },
        { code: "Object.defineProperties(obj, {\n  prop1: descriptor1,\n  prop2: descriptor2\n  // ...\n});" },
        { pg: "let user = {};\n\nObject.defineProperties(user, {\n  name: { value: \"Jasur\", writable: false, enumerable: true },\n  surname: { value: \"Karimov\", writable: false, enumerable: true },\n  age: { value: 25, writable: true, enumerable: false }\n});\n\nconsole.log(user.name + \" \" + user.surname);\nconsole.log(\"Ko'rinadigan kalitlar: \" + Object.keys(user));\n// age enumerable: false bo'lgani uchun ro'yxatga tushmaydi", file: "defineproperties.js" },

        { h2: "Object.getOwnPropertyDescriptors" },
        { p: "Barcha xossalarning deskriptorlarini bir vaqtda olish uchun <code>Object.getOwnPropertyDescriptors(obj)</code> ishlatiladi. U <code>Object.defineProperties</code> bilan birga obyektni <strong>bayroqlari bilan birga</strong> nusxalash uchun juda foydali:" },
        { code: "let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));" },
        { p: "Odatdagi <code>for..in</code> yoki <code>Object.assign</code> nusxalashi bayroqlarni ko'chirmaydi va sanalmaydigan (non-enumerable) xossalarni tashlab ketadi. Yuqoridagi usul esa xossani <em>to'liq</em>, barcha bayroqlari bilan ko'chiradi:" },
        { pg: "let source = {};\nObject.defineProperty(source, \"secret\", {\n  value: 42,\n  enumerable: false,\n  writable: false\n});\nsource.name = \"Ochiq\";\n\n// Bayroqlar bilan to'liq nusxalash\nlet clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));\n\nconsole.log(\"secret: \" + clone.secret);          // 42 — yashirin xossa ham ko'chdi\nlet d = Object.getOwnPropertyDescriptor(clone, \"secret\");\nconsole.log(\"enumerable: \" + d.enumerable);      // false — bayroq ham saqlandi", file: "descriptors-clone.js" },

        { h2: "Butun obyektni himoyalash" },
        { p: "Yuqoridagi metodlar bitta xossaga ta'sir qiladi. Butun obyektni cheklovchi uchta \"global\" metod ham bor:" },
        { ul: [
          "<strong>Object.preventExtensions(obj)</strong> — obyektga yangi xossa qo'shishni taqiqlaydi (mavjudlarini o'zgartirsa bo'ladi);",
          "<strong>Object.seal(obj)</strong> — yangi xossa qo'shishni taqiqlaydi va barcha mavjud xossalarni <code>configurable: false</code> qiladi (qiymatni o'zgartirish mumkin, lekin o'chirib bo'lmaydi);",
          "<strong>Object.freeze(obj)</strong> — eng qattiq: yangi xossa qo'shish, o'chirish va qiymatlarni o'zgartirishni ham taqiqlaydi (barcha xossalarni <code>configurable: false</code> va <code>writable: false</code> qiladi)."
        ] },
        { p: "Ular uchun mos tekshiruv metodlari mavjud: <code>Object.isExtensible(obj)</code>, <code>Object.isSealed(obj)</code> va <code>Object.isFrozen(obj)</code>." },
        { pg: "let user = { name: \"Jasur\", age: 25 };\n\nObject.freeze(user);\n\nuser.age = 30;      // e'tiborsiz qoldiriladi (sokin rejim)\nuser.city = \"Toshkent\"; // yangi xossa qo'shilmaydi\ndelete user.name;   // o'chirib bo'lmaydi\n\nconsole.log(JSON.stringify(user));       // {\"name\":\"Jasur\",\"age\":25}\nconsole.log(\"Muzlatilgan? \" + Object.isFrozen(user)); // true", file: "freeze.js" },
        { note: "Amaliyotda bu global metodlar juda kam ishlatiladi. Ular obyektni chindan ham o'zgarmas qilish kerak bo'lgan maxsus holatlarda foydali." },

        { h2: "Xulosa" },
        { ul: [
          "Har bir ma'lumot xossasi qiymatdan tashqari uchta bayroqqa ega: <strong>writable</strong>, <strong>enumerable</strong>, <strong>configurable</strong>;",
          "Oddiy usulda yaratilganda ularning hammasi <code>true</code> bo'ladi;",
          "<code>Object.getOwnPropertyDescriptor(obj, prop)</code> — bitta xossa deskriptorini o'qiydi;",
          "<code>Object.defineProperty(obj, prop, descriptor)</code> — xossa va uning bayroqlarini o'rnatadi (ko'rsatilmagan bayroq <code>false</code>);",
          "<code>Object.defineProperties</code> va <code>Object.getOwnPropertyDescriptors</code> — ko'p xossa bilan ishlaydi va to'liq nusxalash uchun ideal;",
          "<code>Object.preventExtensions / seal / freeze</code> — butun obyektni turli darajada himoyalaydi."
        ] }
      ]
    },
    {
      slug: "getter-setter",
      title: "Getter va setterlar",
      blurb: "Aksessor xossalar — bu funksiyalar orqali qiymatni o'qish va yozishni boshqaruvchi maxsus xossalar. Ular validatsiya va hisoblangan qiymatlar uchun ajoyib.",
      body: [
        { lead: "Obyekt xossalari ikki turga bo'linadi. Birinchisi — biz odatda ishlatadigan <strong>ma'lumot xossalari</strong> (data properties). Ikkinchisi — yangi tur: <strong>aksessor xossalari</strong> (accessor properties). Ular aslida qiymatni o'qish va yozishni boshqaradigan funksiyalardir, lekin tashqaridan oddiy xossaga o'xshaydi." },

        { h2: "Getter va setter nima?" },
        { p: "Aksessor xossalari ikkita maxsus metod bilan ifodalanadi:" },
        { ul: [
          "<strong>getter</strong> — <code>get</code> so'zi bilan belgilanadi; xossani <em>o'qiganimizda</em> ishga tushadi va qiymat qaytaradi;",
          "<strong>setter</strong> — <code>set</code> so'zi bilan belgilanadi; xossaga qiymat <em>yozganimizda</em> ishga tushadi va argument sifatida yangi qiymatni oladi."
        ] },
        { p: "Tashqi kod uchun aksessor xossa oddiy xossaga o'xshaydi: siz <code>obj.propName</code> deb o'qiysiz va <code>obj.propName = value</code> deb yozasiz — qavslar yo'q, xuddi oddiy xossadek. Ammo ostida funksiyalar ishlaydi." },

        { h2: "Obyekt literalida getter va setter" },
        { p: "Obyekt literalida ular <code>get</code> va <code>set</code> kalit so'zlari orqali e'lon qilinadi:" },
        { code: "let obj = {\n  get propName() {\n    // obj.propName o'qilganda ishlaydi\n  },\n\n  set propName(value) {\n    // obj.propName = value bajarilganda ishlaydi\n  }\n};" },
        { p: "Amaliy misol: <code>fullName</code> aksessori <code>name</code> va <code>surname</code>dan to'liq ismni hisoblab beradi:" },
        { pg: "let user = {\n  name: \"Jasur\",\n  surname: \"Karimov\",\n\n  get fullName() {\n    return this.name + \" \" + this.surname;\n  }\n};\n\nconsole.log(user.fullName); // Jasur Karimov — qavslarsiz o'qildi!", file: "getter-fullname.js" },
        { p: "E'tibor bering: <code>user.fullName</code> — bu funksiya chaqiruvi emas (qavslar yo'q), lekin baribir <code>get fullName</code> metodi ishga tushdi. Bu getterning kuchi — u xossaga o'xshab ishlaydi." },
        { note: "Hozircha <code>fullName</code>da faqat getter bor. Agar unga qiymat yozmoqchi bo'lsak — <code>user.fullName = \"...\"</code> — xatolik yuzaga keladi (yoki sokin rejimda e'tiborsiz qoladi), chunki setter mavjud emas." },

        { h2: "Setter qo'shish" },
        { p: "Endi <code>fullName</code>ga yozishni ham qo'llab-quvvatlash uchun setter qo'shamiz. U kelgan qatorni bo'sh joy bo'yicha ajratib, <code>name</code> va <code>surname</code>ni yangilaydi:" },
        { pg: "let user = {\n  name: \"Jasur\",\n  surname: \"Karimov\",\n\n  get fullName() {\n    return this.name + \" \" + this.surname;\n  },\n\n  set fullName(value) {\n    [this.name, this.surname] = value.split(\" \");\n  }\n};\n\n// setter ishga tushadi\nuser.fullName = \"Alisher Navoiy\";\n\nconsole.log(user.name);     // Alisher\nconsole.log(user.surname);  // Navoiy\nconsole.log(user.fullName); // Alisher Navoiy", file: "setter-fullname.js" },
        { p: "Natijada bizda <code>fullName</code> \"virtual\" xossasi bor: uni o'qish ham, yozish ham mumkin, garchi u obyektda alohida saqlanmasa ham. U har safar <code>name</code> va <code>surname</code>dan hisoblanadi." },
        { tip: "Getter va setter — obyektning tashqi ko'rinishi (interfeysi) bilan ichki tuzilishini ajratishga imkon beradi. Foydalanuvchi <code>fullName</code>ni ishlatadi, ichkarida esa ma'lumot <code>name</code> va <code>surname</code>da saqlanadi." },

        { h2: "Aksessor deskriptorlari" },
        { p: "Aksessor xossalarining deskriptori ma'lumot xossalaridan farq qiladi. Unda <code>value</code> va <code>writable</code> o'rniga <code>get</code> va <code>set</code> funksiyalari bo'ladi. Deskriptor kalitlari:" },
        { ul: [
          "<strong>get</strong> — argumentsiz funksiya, xossa o'qilganda ishlaydi;",
          "<strong>set</strong> — bitta argumentli funksiya, xossaga yozilganda ishlaydi;",
          "<strong>enumerable</strong> — ma'lumot xossalaridagi kabi;",
          "<strong>configurable</strong> — ma'lumot xossalaridagi kabi."
        ] },
        { warn: "Xossa bir vaqtning o'zida <em>ham</em> aksessor (<code>get</code>/<code>set</code>), <em>ham</em> ma'lumot (<code>value</code>/<code>writable</code>) bo'la olmaydi. Agar deskriptorda ham <code>get</code>, ham <code>value</code> ko'rsatsangiz, xatolik yuzaga keladi." },

        { h2: "Object.defineProperty bilan getter/setter" },
        { p: "Aksessor xossani <code>Object.defineProperty</code> orqali ham e'lon qilish mumkin. Bu obyekt yaratilgandan keyin xossa qo'shish kerak bo'lganda foydali:" },
        { pg: "let user = {\n  name: \"Jasur\",\n  surname: \"Karimov\"\n};\n\nObject.defineProperty(user, \"fullName\", {\n  get() {\n    return this.name + \" \" + this.surname;\n  },\n  set(value) {\n    [this.name, this.surname] = value.split(\" \");\n  },\n  enumerable: true,\n  configurable: true\n});\n\nconsole.log(user.fullName); // Jasur Karimov\nuser.fullName = \"Bobur Mirzo\";\nconsole.log(user.name);     // Bobur", file: "defineproperty-accessor.js" },

        { h2: "Aksessorlar validatsiya uchun" },
        { p: "Getter/setterlarning eng foydali qo'llanishlaridan biri — qiymatni <strong>tekshirish</strong> (validatsiya). Setter orqali biz noto'g'ri qiymat yozilishining oldini olamiz." },
        { p: "Quyidagi misolda <code>age</code> uchun setter salbiy qiymatni rad etadi. Haqiqiy ma'lumot esa \"maxfiy\" <code>_age</code> xossasida saqlanadi:" },
        { pg: "let user = {\n  get age() {\n    return this._age;\n  },\n\n  set age(value) {\n    if (value < 0) {\n      console.log(\"Xato: yosh manfiy bo'lolmaydi!\");\n      return;\n    }\n    this._age = value;\n  }\n};\n\nuser.age = 25;\nconsole.log(user.age);  // 25\n\nuser.age = -5;          // Xato: yosh manfiy bo'lolmaydi!\nconsole.log(user.age);  // 25 — o'zgarmadi", file: "setter-validation.js" },
        { note: "Bu yerda <code>_age</code> ismidagi ostki chiziq (underscore) — bu shartli kelishuv. U xossa \"ichki\", to'g'ridan-to'g'ri chetdan tegilmasligi kerak degan ma'noni bildiradi. Bu texnik cheklov emas, balki dasturchilar orasidagi urf-odat." },

        { h2: "Aksessorlar — moslashuvchanlik uchun" },
        { p: "Getter/setterlar kodni kelajakda o'zgartirishni osonlashtiradi. Aytaylik, boshida <code>name</code> oddiy ma'lumot xossasi edi. Keyinchalik ismning uzunligini cheklash kerak bo'lib qoldi. Butun kodni o'zgartirish o'rniga, biz shunchaki nomni <code>_name</code>ga o'zgartirib, ustiga tekshiruvchi setter qo'yamiz:" },
        { pg: "function User(name, age) {\n  this.age = age;\n\n  // ism uzunligini nazorat qiluvchi setter\n  Object.defineProperty(this, \"name\", {\n    get() {\n      return this._name;\n    },\n    set(value) {\n      if (value.length < 3) {\n        console.log(\"Ism juda qisqa, kamida 3 harf kerak.\");\n        return;\n      }\n      this._name = value;\n    }\n  });\n\n  this.name = name;\n}\n\nlet user = new User(\"Al\", 25); // Ism juda qisqa...\nconsole.log(user.name);        // undefined\n\nuser.name = \"Alisher\";\nconsole.log(user.name);        // Alisher", file: "accessor-flexibility.js" },
        { p: "Muhimi: tashqi kod hali ham <code>user.name</code> deb yozadi va o'qiydi — interfeys o'zgarmadi. Faqat ichki mantiq kuchaydi. Bu — getter/setterlarning katta afzalligi." },

        { h2: "Hisoblangan (computed) xossa" },
        { p: "Getterlar obyektda saqlanmaydigan, boshqa qiymatlardan <em>hisoblanadigan</em> xossalar yaratish uchun ideal. Masalan, to'rtburchakning yuzasi tomonlaridan har safar hisoblab beriladi:" },
        { pg: "let rectangle = {\n  width: 4,\n  height: 5,\n\n  get area() {\n    return this.width * this.height;\n  },\n\n  get perimeter() {\n    return 2 * (this.width + this.height);\n  }\n};\n\nconsole.log(\"Yuza: \" + rectangle.area);        // 20\nconsole.log(\"Perimetr: \" + rectangle.perimeter); // 18\n\nrectangle.width = 10;\nconsole.log(\"Yangi yuza: \" + rectangle.area);  // 50 — avtomatik yangilandi", file: "computed-getter.js" },
        { tip: "<code>area</code>ni oddiy xossa qilib qo'ymaganimiz muhim: agar shunday qilsak, <code>width</code> o'zgarganda <code>area</code> eskirib qolardi. Getter esa har safar yangi qiymatni hisoblab beradi — u har doim dolzarb." },

        { h2: "Xulosa" },
        { ul: [
          "Xossalar ikki turga bo'linadi: <strong>ma'lumot xossalari</strong> va <strong>aksessor xossalari</strong> (getter/setter);",
          "Getter — <code>get</code> bilan belgilanadi, xossa o'qilganda ishlaydi; setter — <code>set</code> bilan, xossaga yozilganda ishlaydi;",
          "Tashqaridan ular oddiy xossaga o'xshaydi: <code>obj.prop</code> va <code>obj.prop = value</code>;",
          "Ularni obyekt literalida (<code>get/set</code> so'zlari) yoki <code>Object.defineProperty</code> orqali e'lon qilish mumkin;",
          "Asosiy foydasi: <strong>validatsiya</strong> (noto'g'ri qiymatni rad etish), <strong>hisoblangan xossalar</strong> (masalan, <code>fullName</code>, <code>area</code>) va <strong>moslashuvchanlik</strong> (interfeysni buzmasdan mantiqni o'zgartirish)."
        ] }
      ]
    }
  ]
};
