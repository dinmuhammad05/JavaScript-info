"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Modullar",
  lessons: [
    {
      slug: "modul-kirish",
      title: "Modullar, kirish",
      blurb: "Modul nima, nega u kerak, bitta fayl = bitta modul, script type=module va modullarning o'ziga xos xususiyatlari.",
      body: [
        { lead: "Loyiha o'sib borgan sari, kodni bir nechta fayllarga — <strong>modullarga</strong> — ajratish zarurati tug'iladi. Modul odatda funksiya yoki funksiyalar kutubxonasini o'z ichiga oladi. Ushbu darsda modul nima ekanligini, u qanday ishlashini va uning o'ziga xos xususiyatlarini chuqur o'rganamiz." },

        { h2: "Modul nima?" },
        { p: "<strong>Modul</strong> — bu shunchaki bitta fayl. Bitta skript — bu bitta modul. Oddiy va aniq: JavaScript'da har bir fayl alohida modul hisoblanadi." },
        { p: "Modullar bir-birini <code>import</code> va <code>export</code> kalit so'zlari yordamida chaqira oladi va o'zaro <em>funksionallik</em> almashadi — biri boshqasidan funksiyalarni chaqiradi:" },
        { ul: [
          "<code>export</code> kalit so'zi joriy moduldan tashqariga chiqarilishi kerak bo'lgan o'zgaruvchi va funksiyalarni belgilaydi (\"eksport qiladi\");",
          "<code>import</code> kalit so'zi boshqa moduldan funksionallikni olib kirishga (\"import qilishga\") imkon beradi."
        ] },
        { p: "Masalan, bizda <code>sayHi</code> funksiyasini eksport qiladigan fayl bo'lsa:" },
        { code: "// 📁 sayHi.js\nexport function sayHi(user) {\n  alert(`Salom, ${user}!`);\n}" },
        { p: "Boshqa faylda uni import qilib, ishlatamiz:" },
        { code: "// 📁 main.js\nimport { sayHi } from './sayHi.js';\n\nalert(sayHi); // function...\nsayHi('Ali'); // Salom, Ali!" },
        { p: "Bu yerda <code>import { sayHi } from './sayHi.js'</code> direktivasi <code>sayHi.js</code> fayliga nisbatan yo'l bo'yicha modulni yuklaydi va eksport qilingan <code>sayHi</code> funksiyasini joriy modulda foydalanish uchun mavjud qiladi." },
        { note: "Yo'l (path) odatda nisbiy yozuvda beriladi: <code>'./sayHi.js'</code>. <code>./</code> — joriy papkani bildiradi. Ba'zi build tizimlari kengaytmasiz (<code>'./sayHi'</code>) yozishga ruxsat bersa-da, sof brauzer modullarida <code>.js</code> kengaytmasi zarur." },

        { h2: "Brauzerda modullar: script type=module" },
        { p: "Brauzer modullarni oddiy skriptlardan farqli ravishda yuklaydi. Modul ishlatilishi uchun HTML'da <code>&lt;script&gt;</code> tegiga maxsus atribut qo'shiladi: <code>type=\"module\"</code>." },
        { code: "&lt;!DOCTYPE html&gt;\n&lt;script type=\"module\"&gt;\n  import { sayHi } from './sayHi.js';\n\n  document.body.innerHTML = sayHi('Vali');\n&lt;/script&gt;" },
        { p: "Faqat <code>type=\"module\"</code> bilan belgilangan skript ichida <code>import</code> ishlaydi. Oddiy <code>&lt;script&gt;</code>da <code>import</code> yozsangiz, xatolik yuz beradi." },
        { warn: "Modullar faqat <strong>HTTP(s)</strong> orqali ishlaydi, <strong>local file protokoli</strong> (<code>file://</code>) orqali emas. Ya'ni faylni to'g'ridan-to'g'ri brauzerda ochsangiz, <code>import/export</code> ishlamaydi. Lokal veb-server (masalan, <code>live server</code> yoki VS Code kengaytmasi) ishga tushiring." },
        { note: "Node.js muhitida esa fayl <code>.mjs</code> kengaytmasiga ega bo'lsa yoki <code>package.json</code>da <code>\"type\": \"module\"</code> ko'rsatilgan bo'lsa, ES modullari ishlaydi. Ushbu kurs sahifasidagi interaktiv maydonchada <code>import/export</code> ishlamaydi — shu sabab bu darslarda ular faqat statik misol sifatida keltiriladi." },

        { h2: "Modulning o'ziga xos xususiyatlari" },
        { p: "Modullar oddiy skriptlardan bir necha muhim jihatlari bilan farq qiladi. Ularni birma-bir ko'rib chiqamiz." },

        { h3: "1. Har doim \"use strict\"" },
        { p: "Modullar <strong>doim qat'iy rejimda</strong> (<code>strict mode</code>) ishlaydi. Buni alohida yozish shart emas — u avtomatik yoqilgan. Masalan, e'lon qilinmagan o'zgaruvchiga qiymat berish xatolik beradi:" },
        { code: "&lt;script type=\"module\"&gt;\n  a = 5; // ReferenceError: a is not defined\n&lt;/script&gt;" },

        { h3: "2. Har bir modulning o'z ko'lami (scope) bor" },
        { p: "Har bir modulning o'z yuqori darajali (top-level) ko'lami bo'ladi. Bir modulning yuqori darajali o'zgaruvchi va funksiyalari boshqa modullarda ko'rinmaydi." },
        { code: "// 📁 user.js\nlet user = 'John';\n\n// 📁 hello.js\nalert(user); // xatolik: user is not defined" },
        { p: "Modullar tashqariga chiqarmoqchi bo'lgan narsalarni <code>export</code> qilishi, foydalanmoqchi bo'lganlarini esa <code>import</code> qilishi kerak. Ya'ni har bir modul o'z o'zgaruvchilarini yashiradi (encapsulation)." },
        { p: "Brauzerda ham har bir <code>&lt;script type=\"module\"&gt;</code>ning alohida yuqori darajali ko'lami bo'ladi:" },
        { code: "&lt;script type=\"module\"&gt;\n  let user = 'John';\n&lt;/script&gt;\n\n&lt;script type=\"module\"&gt;\n  alert(user); // Error: user is not defined\n&lt;/script&gt;" },
        { tip: "Agar biror qiymatni haqiqatan ham global qilmoqchi bo'lsangiz (masalan, uchinchi tomon kutubxonasi uchun), uni ochiqchasiga <code>window</code> obyektiga tayinlashingiz kerak: <code>window.user = user</code>. Lekin bu kamdan-kam holatda tavsiya etiladi." },

        { h3: "3. Modul kodi faqat bir marta baholanadi" },
        { p: "Agar bir modul bir necha joyda import qilinsa, uning kodi faqat <strong>birinchi importda bir marta</strong> ishga tushiriladi. Natija esa barcha importer'larga uzatiladi. Bu muhim oqibatlarga ega." },
        { p: "Bir marta baholanish yon ta'sirlar (side-effects) uchun ahamiyatli. Masalan, modul quyidagicha xabar chiqarsin:" },
        { code: "// 📁 alert.js\nalert('Modul baholandi!');" },
        { code: "// 📁 1.js\nimport './alert.js'; // Modul baholandi!\n\n// 📁 2.js\nimport './alert.js'; // (hech narsa ko'rsatilmaydi)" },
        { p: "Ikkinchi import hech qanday narsa ko'rsatmaydi, chunki modul allaqachon baholangan." },
        { p: "Amaliyotda bu shuni anglatadiki: modulning yuqori darajali kodi odatda ishga tayyorlash (initialization), ichki ma'lumot tuzilmalarini yaratish uchun ishlatiladi. Agar biror obyektni eksport qilsak, u barcha importer'lar uchun <strong>bir xil</strong> (yagona nusxa) bo'ladi:" },
        { code: "// 📁 admin.js\nexport let admin = {\n  name: 'John'\n};" },
        { code: "// 📁 1.js\nimport { admin } from './admin.js';\nadmin.name = 'Pete';\n\n// 📁 2.js\nimport { admin } from './admin.js';\nalert(admin.name); // Pete\n\n// Ikkala fayl ham bir xil admin obyektiga murojaat qiladi.\n// 1.js dagi o'zgarish 2.js da ham ko'rinadi." },
        { note: "Modul yagona nusxa (singleton) yaratadi. Bu qulay: birinchi importda modulni sozlaysiz (masalan, konfiguratsiya berasiz), keyingi importlarda esa tayyor holatini olasiz." },

        { h3: "4. import.meta" },
        { p: "<code>import.meta</code> obyekti joriy modul haqidagi ma'lumotni saqlaydi. Uning tarkibi muhitga bog'liq. Brauzerda u odatda skriptning URL manzilini o'z ichiga oladi:" },
        { code: "&lt;script type=\"module\"&gt;\n  alert(import.meta.url); // skript fayl URL manzili\n&lt;/script&gt;" },

        { h3: "5. \"this\" — undefined" },
        { p: "Modulning yuqori darajasida <code>this</code> qiymati <code>undefined</code> bo'ladi (oddiy skriptdagi <code>window</code> emas). Buni qat'iy rejim bilan solishtiring:" },
        { code: "&lt;script&gt;\n  alert(this); // window\n&lt;/script&gt;\n\n&lt;script type=\"module\"&gt;\n  alert(this); // undefined\n&lt;/script&gt;" },

        { h2: "Brauzerga xos xususiyatlar" },
        { p: "Brauzer muhitida modul skriptlari yana bir necha o'ziga xoslikka ega." },

        { h3: "Modul skriptlari kechiktirilgan (deferred)" },
        { p: "Modul skriptlari <strong>har doim deferred</strong> — huddi <code>defer</code> atributi qo'yilgandek ishlaydi. Bu tashqi (<code>src</code> bilan) va ichki (inline) modullar uchun ham amal qiladi. Bundan kelib chiqadigan xususiyatlar:" },
        { ul: [
          "Tashqi modul skriptini yuklash HTML'ni qayta ishlashni <em>bloklamaydi</em> — brauzer boshqa resurslarni parallel yuklaydi;",
          "Modul skriptlari HTML hujjat to'liq tayyor bo'lgunga qadar <em>kutadi</em> (hatto kichik bo'lsa ham) va faqat undan keyin ishga tushadi;",
          "Skriptlarning nisbiy tartibi saqlanadi: hujjatda oldin turgan skript avval bajariladi."
        ] },
        { code: "&lt;script type=\"module\"&gt;\n  // button hujjatda pastroqda bo'lsa ham ko'rinadi,\n  // chunki modul deferred — u HTML tayyor bo'lgach ishlaydi\n  alert(typeof button); // object\n&lt;/script&gt;\n\n&lt;button id=\"button\"&gt;Button&lt;/button&gt;" },
        { p: "Solishtiring: oddiy (non-module) skript darhol ishga tushardi va <code>typeof button</code> <code>undefined</code> bo'lardi, chunki brauzer hali <code>button</code>ni ko'rmagan bo'lardi." },

        { h3: "Async atributi inline skriptlarda ishlaydi" },
        { p: "Oddiy skriptlarda <code>async</code> atributi faqat tashqi skriptlar uchun ishlaydi. Modullarda esa u <em>inline</em> skriptlarda ham ishlaydi. <code>async</code> bilan skript boshqa skriptlar va HTML'ni kutmasdan, tayyor bo'lishi bilanoq ishga tushadi. Bu import'lar yuklangan analitika, reklama kabi mustaqil funksionallik uchun qulay." },
        { code: "&lt;script async type=\"module\"&gt;\n  import { counter } from './analytics.js';\n  counter.count();\n&lt;/script&gt;" },

        { h3: "Tashqi skriptlar" },
        { p: "<code>type=\"module\"</code> bilan tashqi skriptlar ikki jihatda farq qiladi:" },
        { ul: [
          "Bir xil <code>src</code>ga ega tashqi modullar faqat bir marta bajariladi;",
          "Boshqa manbadan (origin) yuklangan tashqi skript CORS sarlavhalarini talab qiladi — uzoq server <code>Access-Control-Allow-Origin</code> sarlavhasi bilan ruxsat berishi kerak."
        ] },
        { code: "&lt;!-- another-site.com CORS ruxsatini berishi kerak,\n     aks holda skript ishlamaydi --&gt;\n&lt;script type=\"module\" src=\"http://another-site.com/module.js\"&gt;&lt;/script&gt;" },

        { h3: "\"Yalang'och\" (bare) modullarga ruxsat yo'q" },
        { p: "Brauzerda <code>import</code> yo'li nisbiy yoki mutlaq bo'lishi kerak. Yo'lsiz, faqat nom bilan yozilgan (\"bare\") modullarga ruxsat yo'q:" },
        { code: "import { sayHi } from 'sayHi'; // Xatolik! \"bare\" modul\n// yo'l bo'lishi kerak, masalan './sayHi.js'" },
        { note: "Node.js va build vositalari (webpack kabi) \"bare\" modullarga ruxsat beradi va ularni o'zlaricha topadi (masalan, <code>node_modules</code>dan). Lekin sof brauzer bunday qilmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Modul</strong> — bu bitta fayl. Modullar <code>import/export</code> orqali funksionallik almashadi;",
          "Brauzerda modullar <code>&lt;script type=\"module\"&gt;</code> orqali yuklanadi;",
          "Modullar doim <strong>qat'iy rejimda</strong> ishlaydi;",
          "Har bir modulning <strong>o'z ko'lami</strong> bor — global o'zgaruvchilarni bir-biriga \"chalishtirmaydi\";",
          "Modul kodi ko'p marta import qilinsa ham <strong>faqat bir marta</strong> baholanadi (yagona nusxa);",
          "Yuqori darajadagi <code>this</code> — <code>undefined</code>, <code>import.meta</code> modul haqida ma'lumot beradi;",
          "Brauzerda modul skriptlari doim <strong>deferred</strong>, <code>async</code> esa inline skriptlarda ishlaydi;",
          "Yo'lsiz \"bare\" modullar sof brauzerda ishlamaydi."
        ] }
      ]
    },
    {
      slug: "export-import",
      title: "Eksport va Import",
      blurb: "export/import ning barcha ko'rinishlari: nomli eksport, default eksport, import * as, as bilan qayta nomlash va re-export.",
      body: [
        { lead: "Eksport va import direktivalarining bir necha ko'rinishlari bor. Oldingi darsda eng oddiy holatini ko'rdik, endi ularning to'liq imkoniyatlarini chuqurroq o'rganamiz." },

        { h2: "E'lon oldidan eksport (nomli eksport)" },
        { p: "Istalgan e'lon (o'zgaruvchi, funksiya, klass) oldiga <code>export</code> qo'yib, uni eksport qilish mumkin:" },
        { code: "// massivni eksport qilish\nexport let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];\n\n// konstantani eksport qilish\nexport const MODULES_BECAME_STANDARD_YEAR = 2015;\n\n// klassni eksport qilish\nexport class User {\n  constructor(name) {\n    this.name = name;\n  }\n}" },
        { note: "Funksiya yoki klassdan oldingi <code>export</code>dan keyin nuqta-vergul (<code>;</code>) qo'yilmaydi — bu odatiy funksiya/klass e'loni, oddiy iboradan (statement) farq qiladi." },

        { h2: "E'londan alohida eksport" },
        { p: "Eksportni e'londan ajratib, alohida ro'yxat sifatida ham yozish mumkin. Bu qaysi funksiyalar tashqariga chiqarilganini bir joyda ko'rish uchun qulay:" },
        { code: "// 📁 say.js\nfunction sayHi(user) {\n  alert(`Salom, ${user}!`);\n}\n\nfunction sayBye(user) {\n  alert(`Xayr, ${user}!`);\n}\n\nexport { sayHi, sayBye }; // ikkala funksiyani eksport qilamiz" },

        { h2: "Import" },
        { p: "Odatda import qilinadigan narsalar ro'yxati jingalak qavs ichida (<code>{...}</code>) beriladi:" },
        { code: "// 📁 main.js\nimport { sayHi, sayBye } from './say.js';\n\nsayHi('Ali');  // Salom, Ali!\nsayBye('Vali'); // Xayr, Vali!" },

        { h3: "Hammasini import qilish: import * as" },
        { p: "Import qilinadigan narsalar ko'p bo'lsa, hammasini bitta obyektga <code>* as &lt;obj&gt;</code> ko'rinishida yig'ib olish mumkin:" },
        { code: "// 📁 main.js\nimport * as say from './say.js';\n\nsay.sayHi('Ali');  // Salom, Ali!\nsay.sayBye('Vali'); // Xayr, Vali!" },
        { warn: "Hammasini import qilish (<code>* as</code>) qulay ko'rinsa-da, ko'pincha kerakli narsalarni aniq ro'yxatlab import qilish tavsiya etiladi. Sabablari: (1) zamonaviy build vositalari (webpack, Rollup) ishlatilmagan importlarni olib tashlab (\"tree-shaking\") build hajmini kichraytiradi; (2) aniq nomlar qaysi funksiya qayerdan kelganini ravshan ko'rsatadi va kodni tushunishni osonlashtiradi." },

        { h3: "as bilan qayta nomlash (import)" },
        { p: "<code>as</code> yordamida import qilinayotgan narsalarni boshqa nom bilan olish mumkin:" },
        { code: "// 📁 main.js\nimport { sayHi as hi, sayBye as bye } from './say.js';\n\nhi('Ali');  // Salom, Ali!\nbye('Vali'); // Xayr, Vali!" },

        { h3: "as bilan qayta nomlash (export)" },
        { p: "Xuddi shunday, eksport paytida ham nomni o'zgartirish mumkin:" },
        { code: "// 📁 say.js\n// ...\nexport { sayHi as hi, sayBye as bye };\n\n// 📁 main.js\nimport * as say from './say.js';\n\nsay.hi('Ali');  // Salom, Ali!\nsay.bye('Vali'); // Xayr, Vali!" },

        { h2: "Export default (standart eksport)" },
        { p: "Amalda modullar ikki turga bo'linadi: bir nechta funksiyani o'z ichiga oluvchi kutubxona modullari va bitta narsani (masalan, bitta klassni) e'lon qiluvchi modullar. Ikkinchi holat uchun <strong>default eksport</strong> qulay." },
        { p: "<code>export default</code> \"bu modul faqat shu bitta narsani eksport qiladi\" degani. Har bir faylda faqat <strong>bitta</strong> default eksport bo'lishi mumkin:" },
        { code: "// 📁 user.js\nexport default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}" },
        { p: "Default eksportni import qilishda jingalak qavs <strong>ishlatilmaydi</strong> va istalgan nom berish mumkin:" },
        { code: "// 📁 main.js\nimport User from './user.js'; // {User} emas, shunchaki User\n\nnew User('John');" },
        { p: "Nomli eksportda import nomi eksport nomiga mos kelishi shart. Default eksportda esa nom ixtiyoriy — quyidagilar teng:" },
        { code: "import User from './user.js';\nimport MyUser from './user.js';\nimport Anything from './user.js';\n// hammasi bir xil default eksportni oladi" },
        { note: "Nomli eksportda har bir eksportning aniq nomi bor. Default eksportda esa nom yo'q, shuning uchun jamoada bir xil default'ga bir xil nom berish uchun kelishuv bo'lishi foydali." },

        { h3: "\"default\" nomi" },
        { p: "Ba'zan default eksportni belgilash uchun <code>default</code> nomidan foydalaniladi. Masalan, funksiyani e'londan alohida default eksport qilmoqchi bo'lsak:" },
        { code: "// 📁 user.js\nfunction sayHi(user) {\n  alert(`Salom, ${user}!`);\n}\n\n// funksiyani default eksport sifatida belgilaymiz\nexport { sayHi as default };" },
        { p: "Bitta modulda ham default, ham nomli eksportlar birga bo'lishi mumkin (garchi kamdan-kam ishlatilsa ham):" },
        { code: "// 📁 user.js\nexport default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nexport function sayHi(user) {\n  alert(`Salom, ${user}!`);\n}" },
        { code: "// 📁 main.js\n// default (User) va nomli (sayHi) eksportlarni birga olish:\nimport User, { sayHi } from './user.js';\n\nnew User('John');\nsayHi('Ali');" },
        { p: "<code>import * as user</code> orqali olsak, default eksport <code>user.default</code> nomi ostida bo'ladi:" },
        { code: "// 📁 main.js\nimport * as user from './user.js';\n\nlet User = user.default; // default eksport\nnew User('John');" },
        { tip: "Default eksportga qat'iy nom yo'qligi kodni tushunishni qiyinlashtirishi mumkin. Ko'p tajribali dasturchilar aniqlik uchun asosan nomli eksportlarni afzal ko'radi. Lekin bu jamoa uslubiga bog'liq — ikkalasi ham to'g'ri." },

        { h2: "Re-export (qayta eksport)" },
        { p: "<code>export ... from ...</code> sintaksisi import qilingan narsani darhol qayta eksport qilishga (ehtimol boshqa nom bilan) imkon beradi:" },
        { code: "export { sayHi } from './say.js';        // sayHi ni qayta eksport\nexport { default as User } from './user.js'; // default ni User sifatida qayta eksport" },
        { p: "Re-export nima uchun kerak? Tasavvur qiling, ko'p modullardan iborat \"paket\" (package) yozyapsiz. Ba'zi funksiyalar tashqi ishlatish uchun, ba'zilari esa ichki yordamchi. Butun paket funksionalligini yagona <code>index.js</code> orqali \"kirish nuqtasi\" (entry point) sifatida ochiq qilish qulay:" },
        { code: "// 📁 auth/index.js\n\n// login/logout ni import qilib, qayta eksport qilamiz\nexport { login, logout } from './helpers.js';\n\n// default User ni User sifatida qayta eksport\nexport { default as User } from './user.js';\n\n// ... boshqa modullardan ham" },
        { p: "Endi paketdan foydalanuvchilar ichki tuzilmani bilmasdan, faqat <code>index.js</code>dan import qiladi:" },
        { code: "// paketni ishlatuvchi kod:\nimport { login, logout, User } from './auth/index.js';" },
        { warn: "Default eksportni qayta eksport qilishda ehtiyot bo'ling. <code>export User from './user.js'</code> — <strong>ishlamaydi</strong> (sintaksis xatosi). Default'ni qayta eksport qilish uchun uni aniq ko'rsatish kerak: <code>export { default as User } from './user.js'</code>. Yoki barchasini birga: <code>export * from './user.js'</code> — lekin bu <em>default</em>ni chiqarib tashlaydi, faqat nomli eksportlarni qayta chiqaradi." },

        { h2: "Import va export ko'tarilishi (hoisting)" },
        { p: "<code>import/export</code> direktivalari qayerda yozilganidan qat'i nazar ishlaydi — ular \"ko'tariladi\" (hoisted). Ammo uslub jihatidan ularni odatda fayl boshiga yozish tavsiya etiladi, chunki bu modul bog'liqliklarini bir qarashda ko'rish imkonini beradi." },

        { h2: "Xulosa" },
        { p: "Eksport turlari:" },
        { ul: [
          "E'lon oldidan: <code>export let x = 1</code>, <code>export function f()</code>, <code>export class C</code>;",
          "Alohida: <code>export { x, y }</code>;",
          "Qayta nomlab: <code>export { x as y }</code>;",
          "Default: <code>export default ...</code> yoki <code>export { x as default }</code>;",
          "Qayta eksport: <code>export { x } from '...'</code>, <code>export * from '...'</code>, <code>export { default as X } from '...'</code>."
        ] },
        { p: "Import turlari:" },
        { ul: [
          "Nomli: <code>import { x, y } from '...'</code>;",
          "Qayta nomlab: <code>import { x as y } from '...'</code>;",
          "Hammasini: <code>import * as obj from '...'</code>;",
          "Default: <code>import x from '...'</code> yoki <code>import x, { y } from '...'</code>."
        ] }
      ]
    },
    {
      slug: "dynamic-import",
      title: "Dinamik importlar",
      blurb: "import() ifodasi, uning promise qaytarishi, shartli va kechiktirilgan yuklash hamda statik importlardan farqi.",
      body: [
        { lead: "Oldingi darslarda ko'rgan <code>import/export</code> — bu <strong>statik</strong> importlar. Ular kuchli, lekin bir necha cheklovlari bor. Ushbu darsda <strong>dinamik</strong> import — <code>import()</code> ifodasini o'rganamiz, u shu cheklovlardan xoli." },

        { h2: "Statik importlarning cheklovlari" },
        { p: "Hozirgacha ko'rgan sintaksisga <strong>statik</strong> import deyiladi. Uning quyidagi cheklovlari bor:" },
        { p: "<strong>Birinchidan</strong>, modul yo'li dinamik bo'la olmaydi. <code>from</code> dan keyin faqat oddiy string turishi kerak — o'zgaruvchi yoki funksiya chaqiruvi emas:" },
        { code: "import ... from getModuleName(); // Xatolik! Faqat \"string\" bo'lishi kerak" },
        { p: "<strong>Ikkinchidan</strong>, modulni shart asosida yoki ish vaqtida (runtime) yuklab bo'lmaydi:" },
        { code: "if (condition) {\n  import ...; // Xatolik! Ruxsat yo'q\n}\n\n{\n  import ...; // Xatolik! Import blok ichida bo'lmasligi kerak\n}" },
        { p: "Buning sababi shundaki, <code>import/export</code> kodning <em>tuzilishini</em> (arxitekturasini) belgilashga mo'ljallangan. Bu juda yaxshi tomon — kod tuzilmasini tahlil qilish, modullarni yig'ish (bundling), ishlatilmaganlarini olib tashlash (tree-shaking) mumkin bo'ladi. Lekin ba'zan bizga moslashuvchanlik kerak bo'ladi." },

        { h2: "import() ifodasi" },
        { p: "<code>import(module)</code> ifodasi modulni yuklab, uning barcha eksportlarini o'z ichiga olgan modul obyektiga <strong>hal bo'ladigan (resolve) promise</strong> qaytaradi. Uni kodning istalgan joyida chaqirish mumkin:" },
        { code: "let modulePath = prompt('Qaysi modulni yuklaymiz?');\n\nimport(modulePath)\n  .then(obj => {\n    // <obj> — modul obyekti, uning barcha eksportlari\n  })\n  .catch(err => {\n    // yuklashda xatolik bo'lsa, masalan modul topilmasa\n  });" },
        { p: "<code>import()</code> promise qaytargani uchun uni <code>await</code> bilan ham ishlatish mumkin (async funksiya ichida yoki modulning yuqori darajasida):" },
        { code: "let module = await import(modulePath);" },
        { note: "<code>import(...)</code> funksiyaga o'xshab ko'rinsa-da, u <strong>oddiy funksiya emas</strong> — bu maxsus sintaksis (huddi <code>super()</code> kabi). Shuning uchun uni o'zgaruvchiga nusxalab bo'lmaydi (<code>let x = import</code> ishlamaydi) yoki <code>call</code>/<code>apply</code> bilan chaqirib bo'lmaydi." },

        { h2: "Amaliy misol: nomli eksportlarni olish" },
        { p: "Faraz qilaylik, quyidagi eksportlarga ega modul bor:" },
        { code: "// 📁 say.js\nexport function hi() {\n  alert('Salom!');\n}\n\nexport function bye() {\n  alert('Xayr!');\n}" },
        { p: "Dinamik import quyidagicha bo'ladi:" },
        { code: "let { hi, bye } = await import('./say.js');\n\nhi();  // Salom!\nbye(); // Xayr!" },
        { p: "Yoki modul obyektini butunlayicha olib:" },
        { code: "let say = await import('./say.js');\n\nsay.hi();  // Salom!\nsay.bye(); // Xayr!" },

        { h2: "Default eksportni dinamik import qilish" },
        { p: "Modulda default eksport bo'lsa, u qaytarilgan obyektning <code>default</code> xossasi orqali olinadi:" },
        { code: "// 📁 say.js\nexport default function() {\n  alert('Default eksportdan salom!');\n}" },
        { code: "// olish:\nlet obj = await import('./say.js');\nlet say = obj.default;\n// yoki bir qatorda:\nlet { default: say } = await import('./say.js');\n\nsay(); // Default eksportdan salom!" },

        { h2: "Shartli va kechiktirilgan yuklash" },
        { p: "Dinamik importning eng katta afzalligi — modulni <strong>faqat kerak bo'lganda</strong> yuklash imkoni. Bu boshlang'ich yuklash hajmini kamaytiradi va sahifani tezroq ochiladi." },
        { p: "Masalan, foydalanuvchi tugmani bosgandagina og'ir modulni yuklaymiz:" },
        { code: "button.addEventListener('click', async () => {\n  // modul faqat bosilganda yuklanadi\n  let { renderChart } = await import('./chart.js');\n  renderChart(data);\n});" },
        { p: "Yoki shart asosida turli modullarni yuklash:" },
        { code: "async function loadLocale(lang) {\n  let messages;\n  if (lang === 'uz') {\n    messages = await import('./locales/uz.js');\n  } else {\n    messages = await import('./locales/en.js');\n  }\n  return messages.default;\n}" },
        { tip: "Bu naqsh (\"lazy loading\" — kechiktirilgan yuklash) katta veb-ilovalarda juda foydali. Foydalanuvchi ko'rmaydigan sahifa qismlari (masalan, admin panel yoki kamdan-kam ochiladigan modal oyna) kodi faqat kerak bo'lganda yuklanadi — bu boshlang'ich sahifa yuklanishini sezilarli tezlashtiradi." },

        { h2: "Dinamik import qaerda ishlaydi?" },
        { p: "Muhim jihat: <code>import()</code> ifodasi oddiy skriptlarda ham ishlaydi — undan foydalanish uchun <code>type=\"module\"</code> shart emas:" },
        { code: "&lt;!-- type=\"module\" bo'lmasa ham import() ishlaydi --&gt;\n&lt;script&gt;\n  import('./say.js').then(module =&gt; module.hi());\n&lt;/script&gt;" },
        { note: "Bu statik <code>import</code>dan yana bir farq: statik <code>import</code> faqat modul ichida (<code>type=\"module\"</code>) ishlaydi, dinamik <code>import()</code> esa har qanday joyda ishlaydi." },

        { h2: "Statik va dinamik import: solishtirma" },
        { ul: [
          "<strong>Statik import</strong> (<code>import ... from</code>): faqat fayl yuqori darajasida, blok/shart ichida ishlamaydi, yo'l — doim string konstanta. Modul boshqa hamma narsadan oldin yuklanadi. Kod tuzilmasini aniqlaydi, tahlil qilinadi, tree-shaking'ga qulay;",
          "<strong>Dinamik import</strong> (<code>import()</code>): istalgan joyda, shart va sikllar ichida, yo'l dinamik bo'lishi mumkin. Promise qaytaradi, <code>await</code>/<code>then</code> bilan ishlatiladi. Kechiktirilgan va shartli yuklash uchun ishlatiladi."
        ] },
        { warn: "Dinamik importni oddiy import o'rniga <em>hamma joyda</em> ishlatishga shoshilmang. Statik importlar kod tuzilmasini ravshan qiladi va vositalar tomonidan yaxshiroq optimallashtiriladi. Dinamik importni faqat unga haqiqiy ehtiyoj bo'lganda — dinamik yo'l yoki kechiktirilgan/shartli yuklash kerak bo'lganda ishlating." },

        { h2: "Xulosa" },
        { ul: [
          "<code>import(module)</code> — modulni yuklab, eksportlar obyektiga hal bo'ladigan <strong>promise</strong> qaytaruvchi ifoda;",
          "Uni kodning istalgan joyida chaqirish mumkin (shart, blok, funksiya ichida);",
          "<code>await import(...)</code> yoki <code>.then(...)</code> bilan natijani olamiz;",
          "Default eksport <code>obj.default</code> orqali olinadi;",
          "Statik <code>import</code>dan farqi: yo'l dinamik bo'lishi mumkin, <code>type=\"module\"</code> talab qilmaydi, kod tuzilmasini emas — ish vaqtidagi (runtime) yuklashni belgilaydi;",
          "Asosiy foyda — modullarni <strong>faqat kerak bo'lganda</strong> yuklab, ilovani tezlashtirish (lazy loading)."
        ] }
      ]
    }
  ]
};
