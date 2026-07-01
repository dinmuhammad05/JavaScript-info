"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Obyektlar: asoslar",
  lessons: [
    {
      slug: "new-operator",
      title: "Konstruktor, new operatori",
      blurb: "Konstruktor funksiyalar va new operatori yordamida bir turdagi ko'plab obyektlarni yaratish.",
      body: [
        { lead: "Oddiy <code>{...}</code> sintaksisi bitta obyekt yaratishga qulay. Ammo bir-biriga o'xshash ko'plab obyektlarni — masalan, ko'p foydalanuvchi, mahsulot yoki menyu bandini — yaratish kerak bo'lganda, <strong>konstruktor funksiyalar</strong> va <strong>new</strong> operatori yordamga keladi." },

        { h2: "Konstruktor funksiya" },
        { p: "Konstruktor funksiya — texnik jihatdan oddiy funksiya. Ammo uni boshqalardan ajratib turuvchi ikkita kelishuv (konvensiya) bor:" },
        { ol: [
          "Nomi <strong>bosh harf</strong> bilan boshlanadi (masalan, <code>User</code>, <code>Car</code>);",
          "U faqat <strong>new</strong> operatori bilan chaqirilishi kerak."
        ] },
        { pg: "function User(name) {\n  this.name = name;\n  this.isAdmin = false;\n}\n\nlet user = new User(\"Jasur\");\n\nconsole.log(user.name);     // Jasur\nconsole.log(user.isAdmin);  // false", file: "konstruktor.js" },
        { p: "Bu yerda <code>User</code> funksiyasini <code>new User(\"Jasur\")</code> ko'rinishida chaqirdik. Natijada tayyor, xossalari to'ldirilgan yangi obyekt qaytdi." },

        { h2: "new nima qiladi? (4 qadam)" },
        { p: "Funksiya <code>new</code> bilan chaqirilganda quyidagi qadamlar sodir bo'ladi:" },
        { ol: [
          "Yangi bo'sh obyekt yaratiladi va u <code>this</code>'ga tayinlanadi;",
          "Funksiya tanasi bajariladi. Odatda u <code>this</code>'ni o'zgartiradi, unga yangi xossalar qo'shadi;",
          "<code>this</code> qiymati qaytariladi (return);",
          "Ya'ni <code>this</code> avtomatik return qilinadi — buni o'zimiz yozishimiz shart emas."
        ] },
        { p: "Boshqacha aytganda, <code>new User(...)</code> quyidagiga o'xshash ishlaydi:" },
        { code: "function User(name) {\n  // this = {};  (yashirin tarzda)\n\n  // this'ga xossalar qo'shiladi\n  this.name = name;\n  this.isAdmin = false;\n\n  // return this;  (yashirin tarzda)\n}" },
        { note: "Demak <code>new User(\"Jasur\")</code> natijasi shunday obyekt bilan bir xil:<br><code>let user = { name: \"Jasur\", isAdmin: false };</code><br>Farqi — konstruktor bilan biz istalgancha <code>new User(...)</code> chaqirib, ko'p obyekt yarata olamiz." },

        { h2: "this — hozirgi obyekt" },
        { p: "Konstruktor ichida <code>this</code> — hozir yaratilayotgan yangi obyektga ishora qiladi. Unga xossa va metod qo'shamiz:" },
        { pg: "function User(name) {\n  this.name = name;\n\n  this.salom = function() {\n    return \"Salom, men \" + this.name;\n  };\n}\n\nlet a = new User(\"Ali\");\nlet b = new User(\"Vali\");\n\nconsole.log(a.salom());  // Salom, men Ali\nconsole.log(b.salom());  // Salom, men Vali", file: "this-metod.js" },
        { p: "Har bir <code>new</code> chaqiruvi mustaqil obyekt yaratadi: <code>a</code> va <code>b</code> bir-biridan mutlaqo ajralgan." },

        { h2: "return konstruktor ichida" },
        { p: "Odatda konstruktorlarda <code>return</code> yozilmaydi — ular <code>this</code>'ni avtomatik qaytaradi. Ammo agar <code>return</code> mavjud bo'lsa, quyidagi qoida amal qiladi:" },
        { ul: [
          "<code>return &lt;obyekt&gt;</code> — o'sha obyekt qaytariladi (<code>this</code> o'rniga);",
          "<code>return &lt;primitiv&gt;</code> yoki bo'sh <code>return</code> — e'tiborsiz qoldiriladi, baribir <code>this</code> qaytadi."
        ] },
        { pg: "function BigUser() {\n  this.name = \"John\";\n  return { name: \"Godzilla\" };  // obyekt qaytadi\n}\n\nfunction SmallUser() {\n  this.name = \"John\";\n  return \"salom\";  // primitiv — e'tiborsiz\n}\n\nconsole.log(new BigUser().name);    // Godzilla\nconsole.log(new SmallUser().name);  // John", file: "return.js" },
        { tip: "Argumentlarsiz konstruktorni qavssiz ham chaqirish mumkin: <code>new User</code> = <code>new User()</code>. Ammo qavsni yozish yaxshi uslub hisoblanadi — kod aniqroq bo'ladi." },

        { h2: "Konstruktorda metodlar" },
        { p: "Konstruktorlar nafaqat xossa, balki butun mantiqni — metodlarni ham o'z ichiga oladi. Bu yagona joyda \"o'ramlangan\" (encapsulated) obyektlar yaratishga imkon beradi:" },
        { pg: "function Sanoq() {\n  this.qiymat = 0;\n\n  this.oshir = function() {\n    this.qiymat++;\n  };\n  this.kamaytir = function() {\n    this.qiymat--;\n  };\n}\n\nlet s = new Sanoq();\ns.oshir();\ns.oshir();\ns.kamaytir();\nconsole.log(s.qiymat);  // 1", file: "metodli.js" },

        { h2: "new.target" },
        { p: "Ilg'or va kamdan-kam ishlatiladigan sintaksis <code>new.target</code> funksiya ichida uning <code>new</code> bilan chaqirilgan-chaqirilmaganini tekshirishga imkon beradi:" },
        { ul: [
          "Oddiy chaqiruvda <code>new.target</code> — <code>undefined</code>;",
          "<code>new</code> bilan chaqirilsa — funksiyaning o'ziga teng bo'ladi."
        ] },
        { pg: "function User() {\n  console.log(new.target);\n}\n\nUser();       // undefined\nnew User();   // [Function: User]", file: "new-target.js" },
        { note: "Amaliyotda <code>new.target</code> deyarli kerak emas. Uni ba'zan funksiyani <code>new</code>siz ham <code>new</code> bilan ham bir xil ishlashiga majburlash uchun ishlatishadi, lekin bu kod o'qilishini murakkablashtiradi." },

        { h2: "Xulosa" },
        { ul: [
          "Konstruktor funksiya — bosh harf bilan nomlanuvchi va <code>new</code> bilan chaqiriladigan oddiy funksiya;",
          "<code>new</code> yangi bo'sh obyekt yaratadi (<code>this</code>), funksiya tanasini bajaradi va <code>this</code>'ni avtomatik qaytaradi;",
          "Konstruktor ichida <code>this</code> — yaratilayotgan yangi obyekt;",
          "<code>return &lt;obyekt&gt;</code> yozilsa o'sha obyekt qaytadi; primitiv return e'tiborsiz qoladi;",
          "<code>new.target</code> chaqiruv turini tekshiradi, lekin kamdan-kam kerak."
        ] }
      ]
    },
    {
      slug: "optional-chaining",
      title: "Optional chaining ?.",
      blurb: "?. operatori — zanjirdagi oraliq xossalar mavjud bo'lmasa ham xatosiz ishlaydigan xavfsiz kirish usuli.",
      body: [
        { lead: "<strong>Optional chaining</strong> (ixtiyoriy zanjir) <code>?.</code> — obyekt xossalariga xavfsiz murojaat qilishning zamonaviy usuli. Agar oraliq xossa mavjud bo'lmasa, xato o'rniga <code>undefined</code> qaytadi." },

        { h2: "\"Mavjud emas\" muammosi" },
        { p: "Aytaylik, ba'zi foydalanuvchilarning manzili bor, ba'zilarniki yo'q. Manzilning ko'chasini o'qimoqchi bo'lsak:" },
        { pg: "let user = {};  // manzili yo'q foydalanuvchi\n\nconsole.log(user.address);         // undefined — bu mayli\n// console.log(user.address.street); // XATO!", file: "muammo.js" },
        { p: "<code>user.address</code> — <code>undefined</code>, uning <code>street</code> xossasini o'qishga urinish <em>TypeError</em> xatosini beradi. Ko'p hollarda bu yerda xato emas, balki <code>undefined</code> natija kerak." },
        { p: "Eski usulda buni <code>&amp;&amp;</code> yoki shartli operatorlar bilan tekshirar edik — bu esa uzun va noqulay kod edi:" },
        { code: "console.log( user.address ? user.address.street : undefined );\n\n// yoki juda uzun zanjirda:\nconsole.log(\n  user.address && user.address.street && user.address.street.name\n);" },

        { h2: "Optional chaining ?." },
        { p: "<code>?.</code> operatori muammoni oson hal qiladi. <code>value?.prop</code> quyidagicha ishlaydi:" },
        { ul: [
          "Agar <code>value</code> — <code>undefined</code> yoki <code>null</code> bo'lsa — <code>undefined</code> qaytaradi va davom etmaydi;",
          "Aks holda — oddiygina <code>value.prop</code>'ni qaytaradi."
        ] },
        { pg: "let user = {};  // manzili yo'q\n\nconsole.log(user?.address);         // undefined\nconsole.log(user?.address?.street); // undefined — XATOSIZ!", file: "optional.js" },
        { p: "Ko'ryapmizki, kod qisqa, aniq va xatosiz. <code>user?.address</code> <code>undefined</code> bo'lgani sababli, undan keyingi <code>?.street</code> ham to'xtab, <code>undefined</code> qaytardi." },
        { note: "<code>?.</code> faqat o'zining chap tomonidagi qiymatni tekshiradi, undan oldingisini emas. <code>user?.address?.street</code>'da <code>user</code>'ning o'zi e'lon qilinmagan bo'lsa xato bo'ladi — <code>?.</code> mavjud bo'lmagan o'zgaruvchilarni himoya qilmaydi." },

        { h2: "Qisqa tutashuv (short-circuit)" },
        { p: "<code>?.</code> chap qismi <code>null/undefined</code> bo'lsa, hisoblashni <strong>darhol to'xtatadi</strong>. Zanjirning qolgan qismidagi funksiya chaqiruvlari ham bajarilmaydi:" },
        { pg: "let user = null;\nlet x = 0;\n\nuser?.sayHi(x++);  // hech narsa bo'lmaydi\n\nconsole.log(x);  // 0 — x++ bajarilmadi", file: "short-circuit.js" },

        { h2: "Boshqa variantlar: ?.() va ?.[]" },
        { p: "<code>?.</code> — operator emas, balki uch xil sintaktik shakli bor maxsus konstruksiya. U xossa uchun, funksiya chaqiruvi uchun va kvadrat qavs uchun ishlaydi." },
        { h3: "?.() — metod bor-yo'qligini tekshirish" },
        { p: "Obyektning ba'zi metodlari bo'lishi mumkin, ba'zilarida yo'q. <code>?.()</code> metod mavjud bo'lsagina chaqiradi:" },
        { pg: "let userAdmin = {\n  admin() { return \"Men adminman\"; }\n};\nlet userGuest = {};\n\nconsole.log(userAdmin.admin?.());  // Men adminman\nconsole.log(userGuest.admin?.());  // undefined — xatosiz", file: "metod.js" },
        { h3: "?.[] — kvadrat qavs bilan" },
        { p: "Xossaga nuqta emas, kvadrat qavs orqali murojaat qilinsa, <code>?.[]</code> ishlatiladi:" },
        { pg: "let key = \"ism\";\nlet user1 = { ism: \"Aziz\" };\nlet user2 = null;\n\nconsole.log(user1?.[key]);  // Aziz\nconsole.log(user2?.[key]);  // undefined", file: "qavs.js" },
        { p: "<code>?.</code> o'chirish (<code>delete</code>) bilan ham ishlaydi: <code>delete user?.name</code> — <code>user</code> mavjud bo'lsagina <code>name</code>'ni o'chiradi." },

        { h2: "Qachon ISHLATILMAYDI?" },
        { warn: "<code>?.</code>'dan haddan tashqari foydalanmang! Uni faqat qiymatning mavjud bo'lmasligi <strong>normal</strong> bo'lgan joylarda ishlating. Agar <code>user</code> mantiqan albatta bo'lishi kerak bo'lsa, uni <code>user?.address</code> deb yozish xatolarni yashirib qo'yadi va debug qilishni qiyinlashtiradi." },
        { p: "Yana bir muhim cheklov: <code>?.</code>'ning chap qismidagi o'zgaruvchi <strong>e'lon qilingan</strong> bo'lishi shart (<code>let/const/var</code> yoki funksiya parametri). E'lon qilinmagan o'zgaruvchi uchun <code>?.</code> yordam bermaydi." },
        { p: "Shuningdek, <code>?.</code> faqat <strong>o'qish va chaqirish</strong> uchun. Uning chap qismiga qiymat yozib bo'lmaydi:" },
        { code: "// Bunday yozib bo'lmaydi:\nuser?.name = \"Yangi\";  // XATO — chap tomonda ?. yozilmaydi" },

        { h2: "Xulosa" },
        { ul: [
          "<code>obj?.prop</code> — <code>obj</code> <code>null/undefined</code> bo'lsa <code>undefined</code>, aks holda <code>obj.prop</code>;",
          "<code>obj?.[key]</code> va <code>obj?.()</code> — kvadrat qavs va funksiya chaqiruvi uchun variantlar;",
          "<code>?.</code> chap qismi <code>null/undefined</code> bo'lsa, zanjir darhol to'xtaydi (short-circuit);",
          "<code>?.</code>'ni ortiqcha ishlatmang — faqat yo'qligi normal bo'lgan joyda;",
          "Chap qismidagi o'zgaruvchi baribir e'lon qilingan bo'lishi kerak."
        ] }
      ]
    },
    {
      slug: "symbol",
      title: "Symbol turi",
      blurb: "Symbol — noyob identifikatorlar yaratuvchi primitiv tur, yashirin xossalar va tizimli simvollar.",
      body: [
        { lead: "Spetsifikatsiyaga ko'ra obyekt xossalarining kaliti faqat ikki turdan biri bo'la oladi: <strong>satr (string)</strong> yoki <strong>Symbol</strong>. Bu darsda ikkinchisi — noyob identifikatorlar yaratuvchi <code>Symbol</code> turi bilan tanishamiz." },

        { h2: "Symbol nima?" },
        { p: "<code>Symbol</code> — \"noyob identifikator\"ni ifodalovchi primitiv tur. Uni <code>Symbol()</code> funksiyasi bilan yaratamiz. Ixtiyoriy tavsif (nom) berishimiz mumkin — u faqat debug uchun foydali:" },
        { pg: "let id = Symbol(\"id\");\n\nconsole.log(typeof id);     // symbol\nconsole.log(id.toString()); // Symbol(id)\nconsole.log(id.description); // id", file: "yaratish.js" },
        { p: "Symbollar <strong>har doim noyob</strong>. Bir xil tavsifli ikkita symbol yaratsak ham, ular teng bo'lmaydi:" },
        { pg: "let id1 = Symbol(\"id\");\nlet id2 = Symbol(\"id\");\n\nconsole.log(id1 == id2);  // false — ular har xil!", file: "noyob.js" },
        { warn: "Symbollar avtomatik satrga o'girilmaydi. <code>console.log(id)</code> ba'zi muhitlarda xato beradi. Satr kerak bo'lsa, aniq <code>id.toString()</code> yoki <code>id.description</code> ishlating." },

        { h2: "Yashirin (\"maxfiy\") xossalar" },
        { p: "Symbollar yordamida obyektga \"yashirin\" xossalar qo'shish mumkin. Boshqa kod (hatto o'sha obyektni to'g'ridan-to'g'ri qamrab olgan kutubxona ham) bu xossaga tasodifan kira olmaydi yoki uni qayta yoza olmaydi:" },
        { pg: "let id = Symbol(\"id\");\n\nlet user = {\n  name: \"Aziz\"\n};\n\nuser[id] = 123;  // symbol kalit bilan\n\nconsole.log(user[id]);  // 123", file: "yashirin.js" },
        { p: "Buning afzalligi: agar boshqa kutubxona ham <code>user</code>'ga <code>\"id\"</code> nomli satr xossa qo'shsa, ular to'qnashmaydi — chunki symbol kaliti mutlaqo noyob." },
        { note: "Obyekt literalida symbol kalitini ishlatish uchun kvadrat qavs kerak:<br><code>let user = { [id]: 123 };</code><br>Oddiy <code>id: 123</code> yozsak, kalit satr <code>\"id\"</code> bo'lib qoladi." },

        { h2: "Symbollar sikllardan yashiringan" },
        { p: "Symbol kalitli xossalar <code>for..in</code> siklida va <code>Object.keys()</code>'da ko'rinmaydi — ular \"o'tkazib yuboriladi\":" },
        { pg: "let id = Symbol(\"id\");\nlet user = {\n  name: \"Aziz\",\n  age: 30,\n  [id]: 123\n};\n\nfor (let key in user) {\n  console.log(key);  // name, age (id yo'q!)\n}\n\nconsole.log(Object.keys(user));  // [ 'name', 'age' ]", file: "sikl.js" },
        { p: "Aksincha, <code>Object.assign()</code> symbol xossalarni ham nusxalaydi — bu ataylik shunday qilingan, chunki obyektni klonlaganda uning barcha xossalari (symbollar bilan birga) ko'chirilishi kerak." },

        { h2: "Global reestr: Symbol.for" },
        { p: "Ba'zan bir xil nomli symbolning butun dastur bo'ylab <strong>bir xil</strong> nusxasi kerak bo'ladi. Buning uchun <em>global symbol reestri</em> mavjud. <code>Symbol.for(kalit)</code> reestrda symbolni qidiradi, topmasa yaratadi:" },
        { pg: "// global reestrdan o'qish yoki yaratish\nlet id = Symbol.for(\"id\");\n\n// yana o'sha nom bilan o'qish\nlet idYana = Symbol.for(\"id\");\n\nconsole.log(id === idYana);  // true — bir xil symbol!", file: "for.js" },
        { p: "Teskari amal — <code>Symbol.keyFor(sym)</code> — global symbol bo'yicha uning nomini qaytaradi:" },
        { pg: "let sym = Symbol.for(\"name\");\nconsole.log(Symbol.keyFor(sym));  // name\n\n// oddiy (global bo'lmagan) symbol uchun undefined\nlet local = Symbol(\"local\");\nconsole.log(Symbol.keyFor(local));  // undefined", file: "keyfor.js" },
        { tip: "<code>Symbol(\"id\")</code> va <code>Symbol.for(\"id\")</code> farqini eslang: birinchisi <strong>har doim yangi</strong> noyob symbol yaratadi; ikkinchisi global reestrdan bir xilini qaytaradi." },

        { h2: "Tizimli (well-known) simvollar" },
        { p: "JavaScript'ning ichida oldindan belgilangan bir qator <strong>tizimli simvollar</strong> mavjud. Ular tilning ichki xatti-harakatini sozlashga imkon beradi. Ularga <code>Symbol.*</code> orqali murojaat qilinadi:" },
        { ul: [
          "<code>Symbol.iterator</code> — obyektni iteratsiya qilinuvchi qilish uchun;",
          "<code>Symbol.toPrimitive</code> — obyektni primitivga o'girish qoidasini belgilash;",
          "<code>Symbol.toStringTag</code> — obyekt turining maxsus nomi;",
          "<code>Symbol.hasInstance</code>, <code>Symbol.asyncIterator</code> va boshqalar."
        ] },
        { p: "Masalan, <code>Symbol.iterator</code> yordamida oddiy obyektni <code>for..of</code> bilan aylanuvchi qilib bo'ladi (bu ilg'or mavzu, keyingi boblarda ko'ramiz). Keyingi darsda esa <code>Symbol.toPrimitive</code> bilan ishlaymiz." },

        { h2: "Xulosa" },
        { ul: [
          "<code>Symbol</code> — noyob identifikatorlar uchun primitiv tur; <code>Symbol(tavsif)</code> bilan yaratiladi;",
          "Har bir <code>Symbol()</code> chaqiruvi — yangi, boshqa hech kimga teng bo'lmagan qiymat;",
          "Symbol kalitlar obyektga \"yashirin\" xossalar qo'shadi va <code>for..in</code>, <code>Object.keys</code>'da ko'rinmaydi;",
          "<code>Symbol.for(kalit)</code> / <code>Symbol.keyFor(sym)</code> — global reestr orqali umumiy symbollar;",
          "<code>Symbol.iterator</code>, <code>Symbol.toPrimitive</code> kabi tizimli simvollar til xatti-harakatini sozlaydi."
        ] }
      ]
    },
    {
      slug: "obyekt-primitiv",
      title: "Obyektni primitivga o'girish",
      blurb: "Obyekt matematik yoki satr operatsiyalarida qanday primitivga aylantiriladi: hint, Symbol.toPrimitive, toString va valueOf.",
      body: [
        { lead: "Obyektlar arifmetik yoki satr operatsiyalarida ishtirok etganda avtomatik ravishda primitivga o'giriladi. Bu darsda o'girish qanday sodir bo'lishini va uni qanday boshqarishni o'rganamiz." },

        { h2: "Nima uchun kerak?" },
        { p: "<code>obj1 + obj2</code> yoki <code>obj1 - obj2</code> qilsak nima bo'ladi? Bunday holda JavaScript obyektlarni avtomatik primitivga o'giradi, so'ng operatsiyani bajaradi. Natijada har doim primitiv qiymat (satr yoki son) chiqadi." },
        { note: "Muhim: obyektni primitivga o'girishda hech qachon boshqa obyekt hosil bo'lmaydi. Natija har doim primitiv (odatda satr yoki son) bo'ladi." },

        { h2: "Hint (\"ishora\") tushunchasi" },
        { p: "O'girish qanday amalga oshishi <strong>hint</strong> — ya'ni kutilayotgan qiymat turiga bog'liq. Uch xil hint bor:" },
        { ul: [
          "<code>\"string\"</code> — satr kutilganda (masalan, <code>alert(obj)</code>, kalit sifatida <code>obj[obj2]</code>);",
          "<code>\"number\"</code> — son kutilganda (arifmetika, taqqoslash, <code>Math</code> funksiyalari);",
          "<code>\"default\"</code> — tur aniq bo'lmaganda (masalan, ikkilik <code>+</code>, yoki <code>==</code> bilan taqqoslash)."
        ] },
        { warn: "Ikkilik <code>+</code> operatori <code>\"default\"</code> hintni ishlatadi, chunki u ham sonlarni qo'shishi, ham satrlarni birlashtirishi mumkin. Deyarli barcha o'rnatilgan obyektlar (<code>Date</code>dan tashqari) <code>\"default\"</code>'ni <code>\"number\"</code> kabi qabul qiladi." },

        { h2: "O'girish algoritmi" },
        { p: "O'girishni bajarish uchun JavaScript quyidagi uchta metodni shu tartibda qidiradi va topilganini chaqiradi:" },
        { ol: [
          "<code>obj[Symbol.toPrimitive](hint)</code> — agar bunday metod mavjud bo'lsa;",
          "Aks holda, hint <code>\"string\"</code> bo'lsa — <code>obj.toString()</code>, keyin <code>obj.valueOf()</code>;",
          "Aks holda (hint <code>\"number\"</code> yoki <code>\"default\"</code>) — <code>obj.valueOf()</code>, keyin <code>obj.toString()</code>."
        ] },
        { p: "Bu metodlar primitiv qaytarishi kerak. Agar obyekt qaytarsa — natija e'tiborsiz qoldiriladi (go'yo metod umuman yo'q edi)." },

        { h2: "Symbol.toPrimitive" },
        { p: "Eng zamonaviy va to'liq usul — obyektda <code>Symbol.toPrimitive</code> nomli tizimli metodni belgilash. U barcha o'girish holatlarini yagona joyda boshqaradi va <code>hint</code>'ni argument sifatida oladi:" },
        { pg: "let user = {\n  name: \"John\",\n  money: 1000,\n\n  [Symbol.toPrimitive](hint) {\n    console.log(\"hint: \" + hint);\n    return hint == \"string\" ? '{name: \"' + this.name + '\"}' : this.money;\n  }\n};\n\nconsole.log(String(user));  // hint: string  =>  {name: \"John\"}\nconsole.log(+user);         // hint: number  =>  1000\nconsole.log(user + 500);    // hint: default =>  1500", file: "toprimitive.js" },
        { p: "Ko'ryapmizki, bitta metod hintga qarab turli natija qaytardi: <code>String(user)</code> satr oldi, <code>+user</code> son oldi, <code>user + 500</code> esa default hint bilan sonni tanladi." },

        { h2: "toString va valueOf" },
        { p: "<code>Symbol.toPrimitive</code> bo'lmasa, JavaScript eskiroq — <code>toString</code> va <code>valueOf</code> metodlariga murojaat qiladi. Ular hint olmaydi, lekin turli holatlarda chaqiriladi:" },
        { pg: "let user = {\n  name: \"John\",\n  money: 1000,\n\n  toString() {\n    return \"user \" + this.name;\n  },\n  valueOf() {\n    return this.money;\n  }\n};\n\nconsole.log(String(user));  // user John  (toString)\nconsole.log(+user);         // 1000       (valueOf)\nconsole.log(user + 500);    // 1500       (valueOf, default)", file: "tostring-valueof.js" },
        { p: "Amaliyotda ko'pincha faqat bitta <code>toString()</code> metodini yozish yetarli — u \"hammabop\" bo'lib, barcha o'girishlarni satr ko'rinishida boshqaradi (agar <code>valueOf</code> bo'lmasa, u ham chaqiriladi):" },
        { pg: "let user = {\n  name: \"John\",\n  toString() {\n    return \"user \" + this.name;\n  }\n};\n\nconsole.log(String(user));  // user John\nconsole.log(user + \"!\");    // user John!\nconsole.log(`${user}`);     // shablon ichida ham toString", file: "faqat-tostring.js" },
        { note: "Sukut bo'yicha oddiy obyektning <code>toString()</code> metodi <code>\"[object Object]\"</code> qaytaradi, <code>valueOf()</code> esa obyektning o'zini qaytaradi (ya'ni primitiv emas, shuning uchun e'tiborsiz)." },

        { h2: "Operatorlarda o'girish" },
        { p: "Endi turli operatorlar qaysi hintni chaqirishini ko'raylik:" },
        { pg: "let obj = {\n  valueOf() { return 2; },\n  toString() { return \"obyekt\"; }\n};\n\nconsole.log(obj * 2);     // 4       (number: valueOf)\nconsole.log(obj + 2);     // 4       (default: valueOf)\nconsole.log(obj + \"x\");   // 2x      (default: valueOf, keyin satrga)\nconsole.log(`${obj}`);    // obyekt  (string: toString)", file: "operatorlar.js" },
        { p: "E'tibor bering: <code>obj + \"x\"</code>'da <code>+</code> avval obyektni default hint bilan primitiv (<code>2</code>) qildi, so'ng <code>2 + \"x\"</code> satr birlashtiruvi <code>\"2x\"</code>'ga aylandi. Ya'ni o'girish natijasi primitiv bo'lgach, operatorning oddiy qoidalari amal qiladi." },
        { tip: "Metod istalgan turdagi primitiv qaytarishi mumkin — <code>\"string\"</code> hint majburan satr qaytishini talab qilmaydi, <code>\"number\"</code> ham majburan son emas. Faqat bitta qat'iy qoida: metodlar obyekt emas, primitiv qaytarishi shart." },

        { h2: "Xulosa" },
        { ul: [
          "Obyekt primitiv kutilgan operatsiyada avtomatik o'giriladi va natija har doim primitiv bo'ladi;",
          "O'girish <code>hint</code>'ga bog'liq: <code>\"string\"</code>, <code>\"number\"</code> yoki <code>\"default\"</code>;",
          "JavaScript avval <code>Symbol.toPrimitive</code>'ni, keyin <code>toString</code>/<code>valueOf</code>'ni qidiradi;",
          "<code>Symbol.toPrimitive</code> — hintni oluvchi, barcha holatlarni boshqaruvchi zamonaviy usul;",
          "Ko'p hollarda faqat <code>toString()</code> metodini yozish yetarli — u universal o'girishni ta'minlaydi."
        ] }
      ]
    }
  ]
};
