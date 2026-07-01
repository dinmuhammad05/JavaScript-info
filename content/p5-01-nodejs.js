"use strict";

module.exports = {
  part: "5-qism: Backend dasturlash",
  chapter: "Node.js va Express",
  lessons: [
    {
      slug: "nodejs-nima",
      title: "Node.js nima?",
      blurb: "Server tomonda JavaScript, V8 dvigateli, bir oqimli event loop, bloklamaydigan I/O, Node.js qachon ishlatiladi, o'rnatish va birinchi skript.",
      body: [
        { lead: "Shu paytgacha siz JavaScript'ni faqat <strong>brauzerda</strong> ishlatib keldingiz: sahifadagi tugmalar, formalar, DOM bilan ishlash. Endi esa JavaScript'ni <strong>serverda</strong> — o'z kompyuteringizda yoki uzoq masofadagi mashinada — ishga tushirasiz. Bunga <strong>Node.js</strong> imkon beradi. Ushbu darsda Node.js nima ekanligini, u qanday ishlashini va nima uchun mashhurligini chuqur o'rganamiz." },

        { h2: "Node.js nima?" },
        { p: "<strong>Node.js</strong> — bu JavaScript kodini brauzerdan tashqarida, ya'ni to'g'ridan-to'g'ri operatsion tizimda ishga tushirishga imkon beradigan <em>ish muhiti</em> (runtime). U 2009-yilda Ryan Dahl tomonidan yaratilgan." },
        { p: "Brauzerda JavaScript sahifa bilan ishlaydi: <code>document</code>, <code>window</code>, <code>alert</code> kabi obyektlarga ega. Node.js'da esa bular yo'q — o'rniga serverga xos imkoniyatlar bor: fayllarni o'qish/yozish, tarmoq so'rovlarini qabul qilish, ma'lumotlar bazasiga ulanish va hokazo." },
        { ul: [
          "<strong>Brauzer JavaScript</strong> — sahifa, DOM, foydalanuvchi bilan muloqot.",
          "<strong>Node.js JavaScript</strong> — server, fayllar, tarmoq, ma'lumotlar bazasi."
        ] },
        { p: "Muhimi shundaki, <strong>til bir xil</strong>. Siz bilgan <code>let</code>, funksiyalar, obyektlar, <code>Promise</code>, <code>async/await</code> — barchasi Node.js'da ham xuddi shunday ishlaydi. Faqat atrof-muhit (mavjud obyektlar va modullar) boshqacha." },

        { h2: "V8 dvigateli" },
        { p: "JavaScript kodi o'zicha ishlamaydi — uni ishga tushiradigan <strong>dvigatel</strong> (engine) kerak. Google Chrome brauzeri <strong>V8</strong> nomli dvigateldan foydalanadi. V8 juda tez: u JavaScript kodini mashina kodiga (protsessor tushunadigan tilga) o'giradi." },
        { p: "Node.js aynan <strong>shu V8 dvigatelini</strong> oladi va uning atrofiga server imkoniyatlarini qo'shadi. Ya'ni Node.js = V8 + fayl tizimi, tarmoq va boshqa modullar." },
        { note: "Shuning uchun Chrome'da ishlaydigan tezkor zamonaviy JavaScript sintaksisi Node.js'da ham ishlaydi — ikkalasi ham bir xil V8 dvigatelidan foydalanadi." },

        { h2: "Bir oqimli va event loop" },
        { p: "Node.js'ning eng muhim xususiyatlaridan biri — u <strong>bir oqimli</strong> (single-threaded). Ya'ni sizning kodingiz asosan bitta oqimda (thread) ketma-ket ishlaydi. Bu g'alati tuyulishi mumkin: bir oqimda qanday qilib minglab foydalanuvchiga xizmat ko'rsatiladi?" },
        { p: "Javob — <strong>event loop</strong> (hodisalar sikli) va <strong>bloklamaydigan (non-blocking) I/O</strong>. Buni tushunish uchun oshxonadagi bitta ofitsiantni tasavvur qiling." },
        { p: "Ofitsiant bitta (bir oqim). U mijozdan buyurtma oladi va oshpazga uzatadi. Keyin ovqat tayyor bo'lishini kutib turmaydi — darhol boshqa mijozga o'tadi. Ovqat tayyor bo'lganda oshpaz xabar beradi, ofitsiant esa uni olib boradi. Shu tariqa bitta ofitsiant ko'plab mijozga samarali xizmat ko'rsatadi." },
        { p: "Node.js xuddi shunday ishlaydi. <strong>Event loop</strong> — bu doimo aylanib turuvchi sikl. U bajarilishi kerak bo'lgan vazifalarni navbatga (queue) qo'yadi va birma-bir bajaradi. Uzoq davom etadigan operatsiyalar (fayl o'qish, tarmoq so'rovi) fonda bajariladi, natija tayyor bo'lganda esa callback chaqiriladi." },

        { h2: "Bloklamaydigan I/O" },
        { p: "<strong>I/O</strong> (Input/Output) — kirish/chiqish operatsiyalari: fayl o'qish, ma'lumotlar bazasiga so'rov, tarmoq so'rovi. Bular sekin operatsiyalar — protsessor bilan solishtirganda ular abadiyatga cho'ziladi." },
        { p: "<strong>Bloklaydigan</strong> (blocking) yondashuvda kod fayl o'qib bo'lguncha kutib turadi va boshqa hech nima qilmaydi. Bu vaqtni behuda sarflash." },
        { code: "// Bloklaydigan (sinxron) — kutib turadi:\nconst data = fs.readFileSync('katta-fayl.txt');\nconsole.log(data); // fayl o'qilguncha bu qator ishga tushmaydi\nconsole.log('Keyingi ish'); // va bu ham kutadi" },
        { p: "<strong>Bloklamaydigan</strong> (non-blocking) yondashuvda esa Node.js fayl o'qishni fonda boshlaydi va darhol keyingi qatorga o'tadi. Fayl tayyor bo'lganda callback chaqiriladi:" },
        { code: "// Bloklamaydigan (asinxron) — kutmaydi:\nfs.readFile('katta-fayl.txt', (err, data) => {\n  console.log(data); // fayl tayyor bo'lganda ishga tushadi\n});\nconsole.log('Keyingi ish'); // darhol ishga tushadi, kutmaydi" },
        { p: "Aynan shu bloklamaydigan model tufayli Node.js bir oqimda bo'lishiga qaramay ko'plab bir vaqtdagi (concurrent) ulanishlarni samarali boshqaradi. U kutish o'rniga boshqa vazifalarni bajaradi." },
        { tip: "Bloklamaydigan I/O va event loop tufayli Node.js ayniqsa <strong>ko'p so'rovli, kam hisob-kitobli</strong> ilovalar (API serverlari, real-time chatlar, veb-ilovalar) uchun juda mos keladi." },

        { h2: "Node.js qachon ishlatiladi?" },
        { p: "Node.js universal vosita, lekin ayrim vazifalar uchun ayniqsa yaxshi:" },
        { ul: [
          "<strong>REST API</strong> va backend serverlar — mobil yoki veb-ilovaga ma'lumot beruvchi serverlar;",
          "<strong>Real-time ilovalar</strong> — chatlar, o'yinlar, jonli xabarnomalar (WebSocket bilan);",
          "<strong>Mikroservislar</strong> — kichik, mustaqil xizmatlar;",
          "<strong>Command-line vositalar</strong> (CLI) — terminal dasturlari;",
          "<strong>Build vositalari</strong> — Webpack, Vite, Babel kabi frontend asboblari ham Node.js'da ishlaydi."
        ] },
        { p: "Node.js <strong>og'ir hisob-kitob</strong> (masalan, murakkab matematik modellashtirish yoki tasvirni qayta ishlash) uchun ideal emas, chunki bir oqim uzoq hisob-kitobda band bo'lib qolsa, event loop bloklanadi. Bunday holatlar uchun boshqa yechimlar (worker threads, alohida servislar) qo'llaniladi." },

        { h2: "Node.js'ni o'rnatish" },
        { p: "Node.js'ni <a href=\"https://nodejs.org\">nodejs.org</a> saytidan yuklab olishingiz mumkin. Ikki versiya taklif etiladi:" },
        { ul: [
          "<strong>LTS</strong> (Long Term Support) — barqaror, ishlab chiqarish uchun tavsiya etiladigan versiya;",
          "<strong>Current</strong> — eng yangi imkoniyatlarga ega, lekin kamroq barqaror versiya."
        ] },
        { p: "Yangi boshlovchilar uchun <strong>LTS</strong> versiyasi tavsiya etiladi. O'rnatgach, terminalda versiyani tekshiring:" },
        { code: "node -v\n# v20.11.0\n\nnpm -v\n# 10.2.4" },
        { p: "Agar versiya raqamlari chiqsa — Node.js muvaffaqiyatli o'rnatilgan. <code>node</code> — Node.js'ning o'zi, <code>npm</code> esa u bilan birga keladigan paketlar menejeri (keyingi darsda batafsil)." },
        { note: "Bir nechta Node.js versiyalarini boshqarish uchun <strong>nvm</strong> (Node Version Manager) vositasidan foydalanish qulay. U turli loyihalar uchun turli versiyalarni o'rnatish va almashtirishga imkon beradi." },

        { h2: "Birinchi skript" },
        { p: "Node.js kodini yozib, ishga tushirib ko'raylik. Bir papkada <code>app.js</code> nomli fayl yarating va quyidagini yozing:" },
        { code: "// app.js\nconsole.log('Salom, Node.js!');\n\nconst ism = 'Ali';\nconsole.log('Xush kelibsiz, ' + ism);" },
        { p: "Endi terminalda shu papkaga o'ting va faylni ishga tushiring:" },
        { code: "node app.js" },
        { p: "Natija:" },
        { code: "Salom, Node.js!\nXush kelibsiz, Ali" },
        { p: "Tabriklaymiz — siz brauzersiz, to'g'ridan-to'g'ri operatsion tizimda JavaScript kodini ishga tushirdingiz! Bu yerda <code>console.log</code> natija terminalga chiqadi (brauzerdagidek konsolga emas)." },
        { note: "<code>node</code> buyrug'ini argumentsiz ishga tushirsangiz (shunchaki <code>node</code>), <strong>REPL</strong> (interaktiv rejim) ochiladi. Unda JavaScript ifodalarini birma-bir kiritib, natijani darhol ko'rish mumkin. Chiqish uchun <code>.exit</code> yozing yoki <code>Ctrl+C</code>ni ikki marta bosing." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Node.js</strong> — JavaScript'ni brauzerdan tashqarida, serverda ishga tushiradigan muhit;",
          "U Chrome'ning <strong>V8</strong> dvigatelidan foydalanadi, shu sabab til brauzerdagi bilan bir xil;",
          "Node.js <strong>bir oqimli</strong>, lekin <strong>event loop</strong> va <strong>bloklamaydigan I/O</strong> tufayli ko'plab bir vaqtdagi so'rovlarni samarali boshqaradi;",
          "U API serverlar, real-time ilovalar, mikroservislar va CLI vositalar uchun juda mos;",
          "O'rnatilganini <code>node -v</code> bilan tekshirasiz, skriptni <code>node app.js</code> bilan ishga tushirasiz."
        ] }
      ]
    },

    {
      slug: "node-modullar",
      title: "Modullar va npm",
      blurb: "CommonJS (require/module.exports) va ESM (import/export), o'rnatilgan modullar, npm nima, npm init, package.json, npm install, node_modules, dependencies va npx.",
      body: [
        { lead: "Har qanday jiddiy loyiha bir nechta fayldan iborat bo'ladi va tashqi kutubxonalardan foydalanadi. Node.js'da kodni fayllarga bo'lish uchun <strong>modullar</strong>, tashqi paketlarni o'rnatish uchun esa <strong>npm</strong> ishlatiladi. Ushbu darsda ikkalasini ham chuqur o'rganamiz." },

        { h2: "Modul nima?" },
        { p: "Node.js'da har bir <strong>fayl — alohida modul</strong>. Bir faylning o'zgaruvchi va funksiyalari boshqa faylga avtomatik ko'rinmaydi. Ularni almashish uchun modul kerakli narsalarni <strong>eksport</strong> qiladi, boshqa modul esa ularni <strong>import</strong> qiladi." },
        { p: "Node.js ikki xil modul tizimini qo'llab-quvvatlaydi: eski, an'anaviy <strong>CommonJS</strong> va zamonaviy standart <strong>ESM</strong> (ES Modules)." },

        { h2: "CommonJS: require va module.exports" },
        { p: "<strong>CommonJS</strong> — Node.js'ning an'anaviy modul tizimi. Uzoq yillar davomida standart bo'lgan va hozir ham juda keng tarqalgan. Unda eksport uchun <code>module.exports</code>, import uchun <code>require()</code> ishlatiladi." },
        { p: "Bir modulda funksiyani eksport qilaylik:" },
        { code: "// math.js\nfunction qoshish(a, b) {\n  return a + b;\n}\n\nfunction ayirish(a, b) {\n  return a - b;\n}\n\nmodule.exports = { qoshish, ayirish };" },
        { p: "Boshqa faylda uni import qilamiz:" },
        { code: "// app.js\nconst math = require('./math.js');\n\nconsole.log(math.qoshish(2, 3)); // 5\nconsole.log(math.ayirish(5, 1)); // 4\n\n// Yoki destrukturizatsiya bilan:\nconst { qoshish } = require('./math.js');\nconsole.log(qoshish(10, 20)); // 30" },
        { p: "Diqqat qiling: o'z fayllaringizni import qilishda <strong>nisbiy yo'l</strong> beriladi — <code>'./math.js'</code>. Bu yerda <code>./</code> joriy papkani bildiradi." },
        { note: "<code>module.exports</code>ga istalgan narsani berish mumkin: obyekt, funksiya, class, hatto sonni ham. Ko'pincha obyekt (bir nechta narsani eksport qilish uchun) ishlatiladi. Bitta narsani eksport qilsangiz — masalan, bitta funksiyani — <code>module.exports = qoshish</code> deb yozasiz." },

        { h2: "ESM: import va export" },
        { p: "<strong>ESM</strong> (ES Modules) — bu JavaScript'ning rasmiy, standart modul tizimi. Siz uni brauzerdagi modullardan tanigansiz. U <code>import</code> va <code>export</code> kalit so'zlaridan foydalanadi." },
        { code: "// math.mjs\nexport function qoshish(a, b) {\n  return a + b;\n}\n\nexport function ayirish(a, b) {\n  return a - b;\n}" },
        { code: "// app.mjs\nimport { qoshish, ayirish } from './math.mjs';\n\nconsole.log(qoshish(2, 3)); // 5" },
        { p: "Node.js'da ESM'ni ishlatishning ikki yo'li bor:" },
        { ul: [
          "Fayl kengaytmasini <code>.mjs</code> qilib qo'yish;",
          "<code>package.json</code>ga <code>\"type\": \"module\"</code> qatorini qo'shish (u holda oddiy <code>.js</code> fayllar ham ESM sifatida ishlaydi)."
        ] },
        { warn: "CommonJS va ESM'ni bir faylda aralashtirib bo'lmaydi. Ya'ni bir faylda ham <code>require</code>, ham <code>import</code> yozib bo'lmaydi. Loyihada bittasini tanlab, izchil ishlating. Yangi loyihalar uchun ESM tavsiya etiladi, lekin ko'plab eski loyihalar va o'quv materiallari hali ham CommonJS'da." },

        { h2: "O'rnatilgan (built-in) modullar" },
        { p: "Node.js o'zi bilan birga ko'plab foydali modullarni olib keladi — ularni o'rnatish shart emas, faqat import qilish kifoya. Ular <strong>o'rnatilgan modullar</strong> (built-in / core modules) deyiladi:" },
        { ul: [
          "<code>fs</code> — fayl tizimi bilan ishlash;",
          "<code>path</code> — fayl yo'llari bilan ishlash;",
          "<code>http</code> — HTTP server va so'rovlar;",
          "<code>os</code> — operatsion tizim haqida ma'lumot;",
          "<code>crypto</code> — shifrlash va xeshlash;",
          "<code>url</code> — URL manzillarni tahlil qilish."
        ] },
        { code: "// O'rnatilgan modulni import qilish (yo'lsiz, faqat nom):\nconst os = require('os');\n\nconsole.log(os.platform()); // 'linux'\nconsole.log(os.cpus().length); // protsessor yadrolari soni" },
        { note: "O'rnatilgan modullarni import qilganda nom oldiga <code>./</code> qo'yilmaydi. <code>require('os')</code> — o'rnatilgan modul, <code>require('./os')</code> — sizning <code>os.js</code> faylingiz. Ba'zi zamonaviy modullar <code>node:</code> prefiksi bilan ham yoziladi: <code>require('node:fs')</code>." },

        { h2: "npm nima?" },
        { p: "<strong>npm</strong> (Node Package Manager) — bu Node.js bilan birga keladigan <strong>paketlar menejeri</strong>. U tashqi kutubxonalarni (paketlarni) o'rnatish, yangilash va boshqarishga imkon beradi." },
        { p: "Dunyodagi eng katta ochiq kod omborlaridan biri — <a href=\"https://npmjs.com\">npmjs.com</a>. U yerda millionlab tayyor paketlar bor: veb-freymvorklar, sana bilan ishlash, ma'lumotlar bazasi drayverlari va hokazo. Ularni bir buyruq bilan loyihangizga qo'shasiz." },

        { h2: "package.json va npm init" },
        { p: "Har bir Node.js loyihasining markazida <code>package.json</code> fayli turadi. U loyiha haqidagi ma'lumot (nomi, versiyasi, bog'liqliklari, skriptlari)ni saqlaydi. Uni yaratish uchun:" },
        { code: "npm init\n# yoki barcha savollarni o'tkazib, standart qiymatlar bilan:\nnpm init -y" },
        { p: "Natijada shunday fayl paydo bo'ladi:" },
        { code: "{\n  \"name\": \"mening-loyiham\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"start\": \"node index.js\"\n  },\n  \"dependencies\": {},\n  \"devDependencies\": {}\n}" },
        { p: "<code>scripts</code> bo'limi juda foydali — u yerda buyruqlarga qisqa nom berishingiz mumkin. Masalan, <code>npm start</code> yozganingizda <code>node index.js</code> ishga tushadi. O'zingizning skriptlaringizni <code>npm run &lt;nom&gt;</code> orqali chaqirasiz." },

        { h2: "npm install va node_modules" },
        { p: "Tashqi paketni o'rnatish uchun <code>npm install</code> (yoki qisqacha <code>npm i</code>) ishlatiladi. Masalan, mashhur <code>express</code> freymvorkini o'rnataylik:" },
        { code: "npm install express" },
        { p: "Bu buyruq uch ish qiladi:" },
        { ol: [
          "Paketni <strong>node_modules</strong> papkasiga yuklab oladi;",
          "Uni <code>package.json</code>ning <code>dependencies</code> bo'limiga qo'shadi;",
          "<code>package-lock.json</code> faylini yangilaydi (aniq versiyalarni qayd etadi)."
        ] },
        { p: "Endi paketni koddan foydalanish mumkin:" },
        { code: "const express = require('express');\nconst app = express();" },
        { warn: "<code>node_modules</code> papkasi juda katta bo'lishi mumkin (yuzlab megabayt). Uni git'ga <strong>joylamang</strong> — <code>.gitignore</code> fayliga <code>node_modules/</code> qatorini qo'shing. Loyihani boshqa joyda ochganda <code>npm install</code> buyrug'i <code>package.json</code> asosida barcha paketlarni qayta yuklab oladi." },

        { h2: "dependencies va devDependencies" },
        { p: "<code>package.json</code>da bog'liqliklar ikki turga bo'linadi:" },
        { ul: [
          "<strong>dependencies</strong> — ilova ishlashi uchun kerak bo'lgan paketlar (masalan, <code>express</code>);",
          "<strong>devDependencies</strong> — faqat ishlab chiqish (development) paytida kerak bo'lgan paketlar (masalan, test vositalari, kod tekshirgichlari)."
        ] },
        { code: "# Oddiy bog'liqlik (dependencies):\nnpm install express\n\n# Faqat ishlab chiqish uchun (devDependencies):\nnpm install --save-dev nodemon\n# yoki qisqacha:\nnpm install -D nodemon" },
        { p: "Ishlab chiqarish (production) serverida faqat <code>dependencies</code> o'rnatiladi, <code>devDependencies</code> esa o'tkazib yuboriladi — bu serverni yengil qiladi. Buning uchun <code>npm install --production</code> ishlatiladi." },
        { note: "<code>nodemon</code> — foydali dev vositasi: u faylni har o'zgartirganingizda serverni avtomatik qayta ishga tushiradi. Shuning uchun u devDependencies'ga qo'yiladi — u yakuniy ilovaga kerak emas, faqat dasturchiga qulaylik uchun." },

        { h2: "npx" },
        { p: "<strong>npx</strong> — npm bilan birga keladigan yana bir vosita. U paketni <strong>o'rnatmasdan</strong>, bir marta ishga tushirishga imkon beradi. Bu ayniqsa CLI vositalarini sinab ko'rish uchun qulay." },
        { code: "# create-react-app'ni o'rnatmasdan ishga tushirish:\nnpx create-react-app mening-ilovam\n\n# lokal o'rnatilgan paketni ishga tushirish:\nnpx eslint ." },
        { p: "npx paketni vaqtincha yuklab oladi, ishga tushiradi va tugagach o'chiradi. Shuning uchun global o'rnatishlar bilan tizimni to'ldirmaslik uchun juda foydali." },

        { h2: "Xulosa" },
        { ul: [
          "Node.js'da har bir fayl — modul; ular <strong>CommonJS</strong> (<code>require</code>/<code>module.exports</code>) yoki <strong>ESM</strong> (<code>import</code>/<code>export</code>) bilan bog'lanadi;",
          "<strong>O'rnatilgan modullar</strong> (<code>fs</code>, <code>path</code>, <code>http</code>...) o'rnatishsiz mavjud;",
          "<strong>npm</strong> — tashqi paketlarni boshqaruvchi menejer; <code>npm init</code> loyihani, <code>package.json</code> uning ma'lumotini saqlaydi;",
          "<code>npm install</code> paketni <code>node_modules</code>ga yuklaydi; git'ga <code>node_modules</code> joylanmaydi;",
          "<strong>dependencies</strong> — ilova uchun, <strong>devDependencies</strong> — ishlab chiqish uchun;",
          "<strong>npx</strong> — paketni o'rnatmasdan ishga tushiradi."
        ] }
      ]
    },

    {
      slug: "node-fs-http",
      title: "Fayl tizimi va HTTP server",
      blurb: "fs moduli (readFile/writeFile, sync va async), path moduli, http moduli bilan oddiy server yaratish, req va res obyektlari, portni tinglash.",
      body: [
        { lead: "Endi Node.js'ning haqiqiy kuchini ko'ramiz: fayllar bilan ishlash va o'z veb-serveringizni yaratish. Bu narsalar brauzerda mumkin emas edi — Node.js'da esa bir necha qator kod bilan amalga oshiriladi. Ushbu darsda <code>fs</code>, <code>path</code> va <code>http</code> modullarini o'rganamiz." },

        { h2: "fs moduli: fayllarni o'qish va yozish" },
        { p: "<code>fs</code> (file system) — fayl tizimi bilan ishlash moduli. U fayllarni o'qish, yozish, o'chirish, papkalar yaratish va boshqa amallarni bajaradi. Bu o'rnatilgan modul, shuning uchun o'rnatish shart emas:" },
        { code: "const fs = require('fs');" },
        { p: "<code>fs</code> modulining aksariyat funksiyalari ikki ko'rinishga ega: <strong>sinxron</strong> (bloklaydigan) va <strong>asinxron</strong> (bloklamaydigan)." },

        { h2: "Sinxron o'qish/yozish" },
        { p: "Sinxron funksiyalar nomi <code>Sync</code> bilan tugaydi. Ular fayl operatsiyasi tugaguncha kutadi va natijani darhol qaytaradi:" },
        { code: "const fs = require('fs');\n\n// Faylga yozish (agar fayl bo'lmasa, yaratiladi):\nfs.writeFileSync('salom.txt', 'Salom, dunyo!');\n\n// Fayldan o'qish:\nconst matn = fs.readFileSync('salom.txt', 'utf8');\nconsole.log(matn); // Salom, dunyo!" },
        { p: "Diqqat: <code>readFileSync</code>ga ikkinchi argument sifatida <code>'utf8'</code> kodlashni berish muhim. Aks holda natija matn emas, xom <code>Buffer</code> (baytlar) bo'ladi." },
        { warn: "Sinxron funksiyalar kutish davomida butun dasturni <strong>bloklaydi</strong>. Katta fayllar yoki serverda ular yomon tanlov — chunki server bloklanib, boshqa so'rovlarga javob bera olmay qoladi. Ular faqat dastur ishga tushayotgan paytda (konfiguratsiya o'qish) yoki kichik skriptlarda ishlatiladi." },

        { h2: "Asinxron o'qish/yozish" },
        { p: "Asinxron funksiyalar bloklamaydi. Ular natija tayyor bo'lganda <strong>callback</strong> chaqiradi. Callback'ning birinchi argumenti — xatolik (bo'lmasa <code>null</code>), ikkinchisi — natija:" },
        { code: "const fs = require('fs');\n\nfs.writeFile('salom.txt', 'Salom!', (err) => {\n  if (err) {\n    console.error('Yozishda xato:', err);\n    return;\n  }\n  console.log('Fayl yozildi');\n\n  fs.readFile('salom.txt', 'utf8', (err, data) => {\n    if (err) {\n      console.error('O\\'qishda xato:', err);\n      return;\n    }\n    console.log('Fayl mazmuni:', data);\n  });\n});" },
        { p: "Callback'lar ichma-ich joylashganda kod o'qish qiyinlashadi (\"callback do'zaxi\"). Shuning uchun zamonaviy kodda <strong>Promise</strong> versiyasidan foydalaniladi. U <code>fs.promises</code> orqali mavjud:" },
        { code: "const fs = require('fs').promises;\n\nasync function ishla() {\n  await fs.writeFile('salom.txt', 'Salom!');\n  const data = await fs.readFile('salom.txt', 'utf8');\n  console.log(data);\n}\n\nishla();" },
        { tip: "Zamonaviy Node.js kodida <code>fs.promises</code> va <code>async/await</code> kombinatsiyasi tavsiya etiladi — u toza, o'qilishi oson va xatoliklarni <code>try/catch</code> bilan boshqarishga imkon beradi." },

        { h2: "path moduli" },
        { p: "Fayl yo'llari bilan ishlashda operatsion tizimlar orasida farq bor: Windows <code>\\</code>, Linux/Mac esa <code>/</code> ishlatadi. <code>path</code> moduli bu farqlarni avtomatik hal qiladi va yo'llarni xavfsiz birlashtiradi:" },
        { code: "const path = require('path');\n\n// Yo'llarni to'g'ri birlashtirish:\nconst toliqYol = path.join('papka', 'ichki', 'fayl.txt');\nconsole.log(toliqYol); // papka/ichki/fayl.txt\n\n// Fayl nomini ajratish:\nconsole.log(path.basename('/uy/user/rasm.png')); // rasm.png\n\n// Kengaytmani olish:\nconsole.log(path.extname('rasm.png')); // .png\n\n// Papkani olish:\nconsole.log(path.dirname('/uy/user/rasm.png')); // /uy/user" },
        { note: "Node.js'da <code>__dirname</code> — joriy fayl joylashgan papkaning to'liq yo'lini beruvchi maxsus o'zgaruvchi. Uni <code>path.join</code> bilan birlashtirib, ishonchli mutlaq yo'l hosil qilinadi: <code>path.join(__dirname, 'data', 'users.json')</code>." },

        { h2: "http moduli: birinchi server" },
        { p: "Endi eng qiziq qismi — o'z veb-serveringizni yaratamiz! <code>http</code> moduli bu uchun barcha kerakli narsani beradi. <code>http.createServer</code> yangi server yaratadi:" },
        { code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain; charset=utf-8');\n  res.end('Salom, bu mening serverim!');\n});\n\nserver.listen(3000, () => {\n  console.log('Server ishga tushdi: http://localhost:3000');\n});" },
        { p: "Bu faylni <code>node server.js</code> bilan ishga tushiring va brauzerda <code>http://localhost:3000</code> manzilini oching. \"Salom, bu mening serverim!\" degan matnni ko'rasiz. Tabriklaymiz — sizda o'z veb-serveringiz bor!" },

        { h2: "req va res obyektlari" },
        { p: "<code>createServer</code>ga berilgan funksiya har bir so'rov kelganda ikkita argument bilan chaqiriladi:" },
        { ul: [
          "<code>req</code> (request) — <strong>kiruvchi so'rov</strong>: manzil, metod (GET/POST), sarlavhalar (headers), tana (body) haqidagi ma'lumot;",
          "<code>res</code> (response) — <strong>chiquvchi javob</strong>: uni siz to'ldirasiz va brauzerga jo'natasiz."
        ] },
        { p: "Kiruvchi so'rov ma'lumotini ishlatib, turli manzillarga turli javob berish mumkin (oddiy marshrutlash):" },
        { code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  console.log('So\\'rov:', req.method, req.url);\n\n  if (req.url === '/') {\n    res.end('Bosh sahifa');\n  } else if (req.url === '/about') {\n    res.end('Biz haqimizda');\n  } else {\n    res.statusCode = 404;\n    res.end('Sahifa topilmadi');\n  }\n});\n\nserver.listen(3000);" },
        { p: "JSON javob qaytarish uchun sarlavhani to'g'ri sozlab, obyektni matnga o'giriladi:" },
        { code: "const server = http.createServer((req, res) => {\n  res.setHeader('Content-Type', 'application/json');\n  const malumot = { ism: 'Ali', yosh: 25 };\n  res.end(JSON.stringify(malumot));\n});" },

        { h2: "Portni tinglash" },
        { p: "<code>server.listen(port)</code> serverni ma'lum bir <strong>portda</strong> tinglashga majbur qiladi. Port — bu kompyuterdagi \"eshik raqami\"; turli servislar turli portlarda ishlaydi:" },
        { ul: [
          "<code>3000</code>, <code>8080</code> — ishlab chiqishda ko'p ishlatiladigan portlar;",
          "<code>80</code> — standart HTTP porti;",
          "<code>443</code> — standart HTTPS porti."
        ] },
        { code: "// Port va manzilni tinglash, tayyor bo'lganda xabar berish:\nserver.listen(3000, () => {\n  console.log('Server 3000-portda ishlamoqda');\n});" },
        { warn: "Agar port allaqachon band bo'lsa, <code>EADDRINUSE</code> xatosini olasiz. Bunday holatda boshqa portni tanlang yoki o'sha portni band qilib turgan eski jarayonni to'xtating. Serverni to'xtatish uchun terminalda <code>Ctrl+C</code>ni bosing." },
        { note: "Ko'rib turganingizdek, sof <code>http</code> moduli bilan marshrutlash qo'lda, sertifikatsiz yoziladi — bu tez charchatadi. Aynan shu sabab keyingi darslarda <strong>Express</strong> freymvorkiga o'tamiz: u bu ishlarni ancha soddalashtiradi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>fs</code> moduli fayllarni o'qish/yozish uchun; funksiyalar sinxron (<code>...Sync</code>) va asinxron ko'rinishga ega;",
          "Sinxron funksiyalar dasturni bloklaydi — serverda ulardan qoching, <code>fs.promises</code> + <code>async/await</code> ishlating;",
          "<code>path</code> moduli fayl yo'llarini xavfsiz va tizimga bog'liqsiz birlashtiradi (<code>path.join</code>, <code>__dirname</code>);",
          "<code>http.createServer</code> veb-server yaratadi; funksiyaga <code>req</code> (so'rov) va <code>res</code> (javob) beriladi;",
          "<code>server.listen(port)</code> serverni portda tinglashga qo'yadi;",
          "Sof <code>http</code> bilan ishlash mashaqqatli — shuning uchun Express kabi freymvorklar ishlatiladi."
        ] }
      ]
    },

    {
      slug: "express-kirish",
      title: "Express asoslari",
      blurb: "Nega Express, o'rnatish, birinchi ilova (app va app.listen), route (app.get), req va res obyektlari, res.send va res.json.",
      body: [
        { lead: "Sof <code>http</code> moduli bilan server yozish mumkin, lekin marshrutlash, so'rov tanasini o'qish va boshqa oddiy ishlar juda ko'p qo'l mehnatini talab qiladi. <strong>Express</strong> — bu ishlarni soddalashtiradigan, Node.js uchun eng mashhur veb-freymvork. Ushbu darsda Express asoslarini o'rganamiz." },

        { h2: "Nega Express?" },
        { p: "<strong>Express</strong> — Node.js uchun minimalist va moslashuvchan veb-freymvork. U sof <code>http</code> moduli ustiga qulay qatlam qo'shadi:" },
        { ul: [
          "<strong>Sodda marshrutlash</strong> — <code>app.get</code>, <code>app.post</code> kabi aniq funksiyalar;",
          "<strong>Middleware</strong> — so'rovni bosqichma-bosqich qayta ishlash tizimi;",
          "<strong>Qulay javob metodlari</strong> — <code>res.send</code>, <code>res.json</code> kabilar;",
          "<strong>Katta ekotizim</strong> — minglab tayyor plaginlar va o'rgatuvchi materiallar."
        ] },
        { p: "Bir xil vazifani sof <code>http</code> va Express'da solishtiring — Express kodi ancha qisqa va tushunarli. Aynan shuning uchun Express dunyoda eng ko'p ishlatiladigan Node.js freymvorklaridan biri." },

        { h2: "O'rnatish" },
        { p: "Express — tashqi paket, shuning uchun uni npm orqali o'rnatish kerak. Avval loyiha yarating:" },
        { code: "mkdir mening-serverim\ncd mening-serverim\nnpm init -y\nnpm install express" },
        { p: "Endi Express loyihangizda mavjud va uni koddan import qilishingiz mumkin." },

        { h2: "Birinchi ilova" },
        { p: "Eng oddiy Express ilovasini yozamiz. <code>index.js</code> fayli yarating:" },
        { code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Salom, Express!');\n});\n\napp.listen(3000, () => {\n  console.log('Server ishga tushdi: http://localhost:3000');\n});" },
        { p: "Ishga tushiring va brauzerda oching:" },
        { code: "node index.js" },
        { p: "Kodni qadam-baqadam ko'raylik:" },
        { ol: [
          "<code>express()</code> — yangi ilova (app) obyektini yaratadi;",
          "<code>app.get('/', ...)</code> — bosh sahifaga (<code>/</code>) GET so'rovi kelganda ishlaydigan funksiyani belgilaydi;",
          "<code>res.send(...)</code> — javob jo'natadi;",
          "<code>app.listen(3000)</code> — serverni 3000-portda ishga tushiradi."
        ] },
        { note: "<code>app</code> obyekti — bu butun ilovangizning markazi. Unga marshrutlar (routes), middleware'lar va sozlamalar qo'shiladi. An'anaviy ravishda u <code>app</code> deb nomlanadi." },

        { h2: "Route (marshrut) nima?" },
        { p: "<strong>Route</strong> (marshrut) — bu \"qanday so'rovga qanday javob berish\" qoidasi. U ikki qismdan iborat: <strong>HTTP metodi</strong> (GET, POST...) va <strong>manzil</strong> (path)." },
        { p: "Express'da har bir metod uchun alohida funksiya bor:" },
        { code: "app.get('/users', (req, res) => {\n  res.send('Foydalanuvchilar ro\\'yxati');\n});\n\napp.post('/users', (req, res) => {\n  res.send('Yangi foydalanuvchi qo\\'shildi');\n});\n\napp.get('/about', (req, res) => {\n  res.send('Biz haqimizda sahifa');\n});" },
        { p: "Bir manzilga turli metodlar bilan turli javob berish mumkin. Masalan, <code>/users</code>ga GET so'rovi ro'yxatni qaytaradi, POST so'rovi esa yangisini qo'shadi. Bu REST API'ning asosi (keyingi darsda batafsil)." },

        { h2: "req obyekti" },
        { p: "<code>req</code> (request) obyekti kiruvchi so'rov haqidagi barcha ma'lumotni saqlaydi. Eng ko'p ishlatiladigan xossalari:" },
        { ul: [
          "<code>req.params</code> — URL parametrlari (masalan, <code>/users/:id</code>);",
          "<code>req.query</code> — so'rov qatoridagi parametrlar (<code>?sort=asc</code>);",
          "<code>req.body</code> — so'rov tanasi (POST/PUT ma'lumoti);",
          "<code>req.method</code> — so'rov metodi (GET, POST...);",
          "<code>req.url</code> — so'ralgan manzil;",
          "<code>req.headers</code> — so'rov sarlavhalari."
        ] },
        { code: "app.get('/salom', (req, res) => {\n  console.log('Metod:', req.method); // GET\n  console.log('URL:', req.url);      // /salom?ism=Ali\n  console.log('Query:', req.query);  // { ism: 'Ali' }\n  res.send('Salom, ' + req.query.ism);\n});" },

        { h2: "res obyekti: send va json" },
        { p: "<code>res</code> (response) obyekti orqali brauzerga javob jo'natasiz. Express bir necha qulay metod beradi:" },
        { p: "<code>res.send()</code> — universal javob metodi. U berilgan turga qarab avtomatik ravishda to'g'ri <code>Content-Type</code>ni o'rnatadi:" },
        { code: "app.get('/matn', (req, res) => {\n  res.send('Oddiy matn'); // text/html\n});\n\napp.get('/html', (req, res) => {\n  res.send('<h1>Sarlavha</h1>'); // HTML\n});" },
        { p: "<code>res.json()</code> — maxsus JSON javob uchun. U obyektni avtomatik JSON'ga o'giradi va <code>Content-Type: application/json</code>ni o'rnatadi. API'larda aynan shu ishlatiladi:" },
        { code: "app.get('/api/user', (req, res) => {\n  res.json({\n    ism: 'Ali',\n    yosh: 25,\n    faol: true\n  });\n});\n// Brauzerga: {\"ism\":\"Ali\",\"yosh\":25,\"faol\":true}" },
        { p: "Boshqa foydali <code>res</code> metodlari:" },
        { ul: [
          "<code>res.status(404)</code> — HTTP status kodini o'rnatadi (zanjirlanadi);",
          "<code>res.redirect('/boshqa')</code> — boshqa manzilga yo'naltiradi;",
          "<code>res.sendFile(yol)</code> — faylni jo'natadi."
        ] },
        { code: "app.get('/topilmadi', (req, res) => {\n  res.status(404).json({ xato: 'Topilmadi' });\n});" },
        { tip: "<code>res.status(...)</code> metodi <code>res</code> obyektini qaytaradi, shuning uchun uni <code>.json()</code> yoki <code>.send()</code> bilan zanjirlab yozish mumkin: <code>res.status(201).json(...)</code>." },

        { h2: "Har bir so'rovga javob shart" },
        { p: "Muhim qoida: har bir route funksiyasi <strong>javobni yakunlashi</strong> shart — <code>res.send</code>, <code>res.json</code>, <code>res.end</code> yoki shunga o'xshash metod bilan. Aks holda so'rov \"osilib\" qoladi va brauzer javobni cheksiz kutadi." },
        { warn: "Bitta so'rovda javobni <strong>ikki marta</strong> jo'natib bo'lmaydi. Masalan, <code>res.send(...)</code>dan keyin yana <code>res.send(...)</code> yozsangiz, <code>ERR_HTTP_HEADERS_SENT</code> xatosi chiqadi. Javobdan keyin funksiyadan chiqish uchun ko'pincha <code>return</code> ishlatiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Express</strong> — Node.js uchun mashhur, minimalist veb-freymvork; sof <code>http</code>ni ancha soddalashtiradi;",
          "Uni <code>npm install express</code> bilan o'rnatiladi, <code>const app = express()</code> bilan ilova yaratiladi;",
          "<code>app.get</code>, <code>app.post</code> kabi metodlar bilan <strong>route</strong>lar belgilanadi;",
          "<code>req</code> — so'rov ma'lumoti (<code>params</code>, <code>query</code>, <code>body</code>), <code>res</code> — javob;",
          "<code>res.send</code> — universal javob, <code>res.json</code> — JSON javob, <code>res.status</code> — status kod;",
          "Har bir route javobni yakunlashi shart va javob faqat bir marta jo'natiladi."
        ] }
      ]
    },

    {
      slug: "express-rest",
      title: "REST API yaratish",
      blurb: "REST tamoyillari, GET/POST/PUT/DELETE, route parametrlari (:id), query, JSON tanasi, status kodlar va massivda oddiy CRUD API misoli.",
      body: [
        { lead: "Zamonaviy ilovalar aksariyat hollarda <strong>REST API</strong> orqali muloqot qiladi: mobil ilova, veb-sayt yoki boshqa server serverga so'rov yuboradi va JSON ma'lumot oladi. Ushbu darsda REST tamoyillarini o'rganib, Express'da to'liq ishlaydigan CRUD API yozamiz." },

        { h2: "REST nima?" },
        { p: "<strong>REST</strong> (Representational State Transfer) — bu API yaratishning uslubi, qoidalar to'plami. Uning asosiy g'oyasi: har bir ma'lumot birligi <strong>resurs</strong> deb qaraladi va u <strong>URL</strong> bilan aniqlanadi, resurs ustidagi amallar esa <strong>HTTP metodlari</strong> bilan bajariladi." },
        { p: "Masalan, \"foydalanuvchilar\" resursi bilan ishlash:" },
        { ul: [
          "<code>GET /users</code> — barcha foydalanuvchilarni olish;",
          "<code>GET /users/5</code> — 5-raqamli foydalanuvchini olish;",
          "<code>POST /users</code> — yangi foydalanuvchi yaratish;",
          "<code>PUT /users/5</code> — 5-raqamli foydalanuvchini yangilash;",
          "<code>DELETE /users/5</code> — 5-raqamli foydalanuvchini o'chirish."
        ] },
        { p: "Diqqat qiling: manzil (URL) o'zgarmaydi (<code>/users</code>), faqat <strong>metod</strong> o'zgaradi. Bu REST'ning nafisligi — manzil <em>nima</em>ni, metod esa <em>qanday amalni</em> bildiradi." },

        { h2: "CRUD va HTTP metodlari" },
        { p: "<strong>CRUD</strong> — ma'lumotlar bilan ishlashning to'rt asosiy amali. Ular HTTP metodlariga to'g'ri keladi:" },
        { ul: [
          "<strong>Create</strong> (yaratish) → <code>POST</code>;",
          "<strong>Read</strong> (o'qish) → <code>GET</code>;",
          "<strong>Update</strong> (yangilash) → <code>PUT</code> yoki <code>PATCH</code>;",
          "<strong>Delete</strong> (o'chirish) → <code>DELETE</code>."
        ] },
        { note: "<code>PUT</code> resursni to'liq almashtiradi, <code>PATCH</code> esa faqat ba'zi maydonlarini yangilaydi. Amaliyotda ko'pincha <code>PUT</code> ishlatiladi, lekin qisman yangilash uchun <code>PATCH</code> to'g'riroq." },

        { h2: "Route parametrlari (:id)" },
        { p: "Ko'pincha ma'lum bir elementni ID orqali topish kerak bo'ladi. Buning uchun manzilda <strong>route parametri</strong> — ikki nuqta bilan boshlanadigan qism ishlatiladi. Uning qiymati <code>req.params</code>da bo'ladi:" },
        { code: "app.get('/users/:id', (req, res) => {\n  const id = req.params.id;\n  res.send('So\\'ralgan ID: ' + id);\n});\n// GET /users/42  →  So'ralgan ID: 42" },
        { p: "Bir necha parametr ham bo'lishi mumkin:" },
        { code: "app.get('/users/:userId/posts/:postId', (req, res) => {\n  res.json({\n    user: req.params.userId,\n    post: req.params.postId\n  });\n});" },
        { warn: "<code>req.params</code> qiymatlari <strong>doim matn (string)</strong> bo'ladi. Agar ID son bo'lishi kerak bo'lsa, uni <code>Number(req.params.id)</code> yoki <code>parseInt</code> bilan o'girish kerak — aks holda <code>===</code> taqqoslash kutilmagan natija berishi mumkin." },

        { h2: "Query parametrlari" },
        { p: "URL'ning <code>?</code>dan keyingi qismi — <strong>query</strong> (so'rov qatori). U odatda filtrlash, saralash, sahifalash uchun ishlatiladi va <code>req.query</code>da bo'ladi:" },
        { code: "app.get('/products', (req, res) => {\n  // GET /products?sort=narx&limit=10\n  const sort = req.query.sort;   // 'narx'\n  const limit = req.query.limit; // '10'\n  res.json({ sort, limit });\n});" },
        { note: "Farqni yodda tuting: <strong>route parametri</strong> (<code>:id</code>) manzilning majburiy qismi — aniq resursni bildiradi. <strong>Query</strong> (<code>?sort=...</code>) esa ixtiyoriy — natijani filtrlash yoki sozlash uchun." },

        { h2: "So'rov tanasi (JSON body)" },
        { p: "POST va PUT so'rovlarida ma'lumot so'rov <strong>tanasida</strong> (body) yuboriladi — odatda JSON ko'rinishida. Express uni avtomatik o'qimaydi; buning uchun <code>express.json()</code> middleware'ini yoqish kerak:" },
        { code: "const express = require('express');\nconst app = express();\n\n// JSON tanani o'qish uchun (MUHIM!):\napp.use(express.json());\n\napp.post('/users', (req, res) => {\n  const yangi = req.body; // { ism: 'Ali', yosh: 25 }\n  res.json({ qabul_qilindi: yangi });\n});" },
        { warn: "Agar <code>app.use(express.json())</code> qatorini <strong>unutsangiz</strong>, <code>req.body</code> <code>undefined</code> bo'ladi. Bu eng ko'p uchraydigan boshlang'ich xatolardan biri! Uni har doim route'lardan oldin qo'shing." },

        { h2: "HTTP status kodlar" },
        { p: "Har bir javob <strong>status kodi</strong> bilan keladi — u so'rov natijasini bildiradi. To'g'ri status kodlarni qaytarish yaxshi API'ning belgisi:" },
        { ul: [
          "<code>200 OK</code> — muvaffaqiyat (GET, PUT, DELETE);",
          "<code>201 Created</code> — yangi resurs yaratildi (POST);",
          "<code>204 No Content</code> — muvaffaqiyat, javob tanasi yo'q;",
          "<code>400 Bad Request</code> — noto'g'ri so'rov (masalan, ma'lumot yetishmayapti);",
          "<code>404 Not Found</code> — resurs topilmadi;",
          "<code>500 Internal Server Error</code> — server xatosi."
        ] },
        { code: "app.post('/users', (req, res) => {\n  if (!req.body.ism) {\n    return res.status(400).json({ xato: 'Ism majburiy' });\n  }\n  // ... yaratish ...\n  res.status(201).json({ xabar: 'Yaratildi' });\n});" },

        { h2: "To'liq CRUD API misoli" },
        { p: "Endi barchasini birlashtirib, xotirada (massivda) saqlanadigan to'liq CRUD API yozamiz. Bu — foydalanuvchilarni boshqaradigan haqiqiy ishlaydigan API:" },
        { code: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\n// Ma'lumot — oddiy massiv (haqiqiy loyihada bu ma'lumotlar bazasi bo'ladi):\nlet users = [\n  { id: 1, ism: 'Ali', yosh: 25 },\n  { id: 2, ism: 'Vali', yosh: 30 }\n];\nlet keyingiId = 3;\n\n// READ: barcha foydalanuvchilar\napp.get('/users', (req, res) => {\n  res.json(users);\n});\n\n// READ: bitta foydalanuvchi\napp.get('/users/:id', (req, res) => {\n  const id = Number(req.params.id);\n  const user = users.find(u => u.id === id);\n  if (!user) {\n    return res.status(404).json({ xato: 'Topilmadi' });\n  }\n  res.json(user);\n});" },
        { p: "Endi yaratish, yangilash va o'chirish amallari:" },
        { code: "// CREATE: yangi foydalanuvchi\napp.post('/users', (req, res) => {\n  const { ism, yosh } = req.body;\n  if (!ism) {\n    return res.status(400).json({ xato: 'Ism majburiy' });\n  }\n  const yangi = { id: keyingiId++, ism, yosh };\n  users.push(yangi);\n  res.status(201).json(yangi);\n});\n\n// UPDATE: yangilash\napp.put('/users/:id', (req, res) => {\n  const id = Number(req.params.id);\n  const user = users.find(u => u.id === id);\n  if (!user) {\n    return res.status(404).json({ xato: 'Topilmadi' });\n  }\n  user.ism = req.body.ism ?? user.ism;\n  user.yosh = req.body.yosh ?? user.yosh;\n  res.json(user);\n});\n\n// DELETE: o'chirish\napp.delete('/users/:id', (req, res) => {\n  const id = Number(req.params.id);\n  const index = users.findIndex(u => u.id === id);\n  if (index === -1) {\n    return res.status(404).json({ xato: 'Topilmadi' });\n  }\n  users.splice(index, 1);\n  res.status(204).end();\n});\n\napp.listen(3000, () => console.log('API 3000-portda'));" },
        { p: "Bu API ni sinash uchun brauzerdan faqat GET so'rovlarini yuborish mumkin. POST/PUT/DELETE uchun esa maxsus vositalar — <strong>Postman</strong>, <strong>Insomnia</strong> yoki terminalda <code>curl</code> ishlatiladi:" },
        { code: "# Barcha foydalanuvchilar:\ncurl http://localhost:3000/users\n\n# Yangi foydalanuvchi yaratish:\ncurl -X POST http://localhost:3000/users \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"ism\":\"Hasan\",\"yosh\":22}'\n\n# O'chirish:\ncurl -X DELETE http://localhost:3000/users/1" },
        { tip: "Bu misolda ma'lumot massivda saqlanadi, ya'ni server qayta ishga tushganda yo'qoladi. Haqiqiy loyihalarda uning o'rniga <strong>ma'lumotlar bazasi</strong> (PostgreSQL, MongoDB, MySQL...) ishlatiladi. Lekin route'lar mantiqiy jihatdan aynan shunday qoladi — faqat massiv o'rniga baza so'rovlari yoziladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>REST</strong> — resurslarni URL bilan, amallarni HTTP metodlari bilan bog'laydigan API uslubi;",
          "<strong>CRUD</strong> amallari metodlarga mos: Create→POST, Read→GET, Update→PUT/PATCH, Delete→DELETE;",
          "<strong>Route parametri</strong> (<code>:id</code>) → <code>req.params</code>; qiymatlari matn — kerakda <code>Number</code>ga o'giring;",
          "<strong>Query</strong> (<code>?sort=...</code>) → <code>req.query</code>, filtrlash/saralash uchun;",
          "JSON tanasini o'qish uchun <code>app.use(express.json())</code> shart;",
          "To'g'ri <strong>status kodlarni</strong> qaytaring: 200, 201, 400, 404, 500;",
          "Massiv o'rniga haqiqiy loyihada ma'lumotlar bazasi ishlatiladi."
        ] }
      ]
    },

    {
      slug: "express-middleware",
      title: "Middleware va xatoliklar",
      blurb: "Middleware nima, zanjir, next(), express.json(), express.static(), maxsus logger middleware, xatolarni boshqarish middleware va 404.",
      body: [
        { lead: "Express'ning eng kuchli va o'ziga xos g'oyasi — <strong>middleware</strong>. So'rov serverga kelgandan javob jo'natilgungacha bo'lgan yo'lda bir necha bosqichdan o'tadi, va har bir bosqich — middleware. Ushbu darsda middleware'larni, ular zanjirini va xatoliklarni to'g'ri boshqarishni o'rganamiz." },

        { h2: "Middleware nima?" },
        { p: "<strong>Middleware</strong> — bu so'rov (<code>req</code>) va javob (<code>res</code>) obyektlariga kirish huquqiga ega bo'lgan, so'rovni qayta ishlash zanjiridagi <strong>oraliq funksiya</strong>. U so'rovni o'zgartirishi, tekshirishi yoki keyingi bosqichga uzatishi mumkin." },
        { p: "Middleware funksiyasi uchta argument oladi:" },
        { code: "function mening_middleware(req, res, next) {\n  // biror ish qilamiz...\n  next(); // keyingi bosqichga o'tkazamiz\n}" },
        { p: "Middleware ilovaga <code>app.use()</code> bilan qo'shiladi va u har bir so'rovda ishlaydi." },

        { h2: "next() va zanjir" },
        { p: "Middleware'lar <strong>zanjir</strong> hosil qiladi. So'rov birinchi middleware'ga kiradi, u <code>next()</code>ni chaqirsa — so'rov keyingisiga o'tadi, va hokazo — oxirida route funksiyasiga yetadi:" },
        { code: "const express = require('express');\nconst app = express();\n\napp.use((req, res, next) => {\n  console.log('1-middleware');\n  next(); // keyingisiga o't\n});\n\napp.use((req, res, next) => {\n  console.log('2-middleware');\n  next();\n});\n\napp.get('/', (req, res) => {\n  console.log('Route');\n  res.send('Tayyor');\n});\n// Konsolda: 1-middleware, 2-middleware, Route" },
        { warn: "Agar middleware'da <code>next()</code>ni chaqirishni <strong>unutsangiz</strong> va javob ham jo'natmasangiz, so'rov o'sha yerda \"osilib\" qoladi — brauzer javobni cheksiz kutadi. Har bir middleware yo <code>next()</code>ni chaqirishi, yo javobni jo'natishi shart." },
        { note: "Middleware'lar <strong>tartibda</strong> ishlaydi — kodda yuqorida yozilgani birinchi ishlaydi. Shuning uchun tartib muhim: masalan, <code>express.json()</code> route'lardan oldin turishi kerak, aks holda route'da <code>req.body</code> bo'sh bo'ladi." },

        { h2: "O'rnatilgan middleware: express.json()" },
        { p: "Express bir nechta tayyor middleware bilan keladi. Eng muhimi — <code>express.json()</code>. U kiruvchi so'rovning JSON tanasini o'qib, <code>req.body</code>ga joylaydi:" },
        { code: "app.use(express.json());\n\napp.post('/data', (req, res) => {\n  console.log(req.body); // JSON tanasi obyekt sifatida\n  res.json({ qabul: req.body });\n});" },
        { p: "Yana bir foydalisi — <code>express.urlencoded()</code>, u HTML formalaridan kelgan ma'lumotni (<code>application/x-www-form-urlencoded</code>) o'qiydi:" },
        { code: "app.use(express.urlencoded({ extended: true }));" },

        { h2: "Statik fayllar: express.static()" },
        { p: "Ko'pincha server rasmlar, CSS, HTML va boshqa <strong>statik fayllarni</strong> ham berishi kerak. <code>express.static()</code> middleware'i ma'lum bir papkadagi fayllarni avtomatik uzatadi:" },
        { code: "// 'public' papkasidagi fayllarni uzatish:\napp.use(express.static('public'));\n\n// Endi public/rasm.png fayli quyidagi manzilda mavjud:\n// http://localhost:3000/rasm.png" },
        { p: "Agar <code>public</code> papkasida <code>index.html</code> bo'lsa, u bosh sahifada (<code>/</code>) avtomatik ko'rsatiladi. Bu — statik veb-saytni joylashtirishning eng oson yo'li." },
        { tip: "Xavfsizlik uchun mutlaq yo'l berish tavsiya etiladi: <code>app.use(express.static(path.join(__dirname, 'public')))</code>. Bu server qayerdan ishga tushirilishidan qat'i nazar, to'g'ri papkani topadi." },

        { h2: "Maxsus middleware: logger" },
        { p: "O'z middleware'ingizni yozish oson. Klassik misol — <strong>logger</strong>: har bir so'rovni konsolga yozib boruvchi middleware. Bu debug qilishda juda foydali:" },
        { code: "// Har bir so'rovni vaqti bilan qayd etuvchi logger:\nfunction logger(req, res, next) {\n  const vaqt = new Date().toISOString();\n  console.log(vaqt + ' - ' + req.method + ' ' + req.url);\n  next();\n}\n\napp.use(logger);\n\n// Har so'rovda konsolda:\n// 2026-07-01T10:00:00.000Z - GET /users" },
        { p: "Middleware'lar yordamida autentifikatsiya, ruxsat tekshiruvi, so'rovni tezlikni cheklash (rate limiting) kabi ko'plab vazifalar bajariladi. Ular kodni tartibli va qayta ishlatiladigan qiladi." },
        { code: "// Maxsus middleware'ni faqat bitta route'ga qo'llash mumkin:\nfunction tekshir(req, res, next) {\n  if (!req.headers.authorization) {\n    return res.status(401).json({ xato: 'Ruxsat yo\\'q' });\n  }\n  next();\n}\n\napp.get('/maxfiy', tekshir, (req, res) => {\n  res.send('Maxfiy ma\\'lumot');\n});" },

        { h2: "404 — topilmadi" },
        { p: "Agar so'rov hech qaysi route'ga mos kelmasa, uni ushlash uchun barcha route'lardan <strong>keyin</strong> maxsus middleware qo'yiladi. U hech qanday manzil belgilamagani uchun har qanday mos kelmagan so'rovni ushlaydi:" },
        { code: "// Barcha route'lardan KEYIN yoziladi:\napp.use((req, res) => {\n  res.status(404).json({ xato: 'Sahifa topilmadi' });\n});" },
        { warn: "404 middleware'i <strong>oxirida</strong> turishi shart — barcha route va boshqa middleware'lardan keyin. Agar uni yuqoriga qo'ysangiz, u barcha so'rovlarni ushlab, haqiqiy route'larga yetkazmaydi." },

        { h2: "Xatoliklarni boshqarish middleware" },
        { p: "Xatoliklarni markazlashgan tarzda boshqarish uchun Express maxsus <strong>xato middleware</strong>'ini taklif etadi. U oddiy middleware'dan farqli — <strong>to'rt argument</strong>ni oladi: birinchisi <code>err</code>:" },
        { code: "// Xato middleware — DOIM 4 argument!\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ xato: 'Serverda xatolik yuz berdi' });\n});" },
        { p: "Bu middleware ham barcha route'lardan keyin qo'yiladi. Route ichida xato yuz bersa, uni <code>next(err)</code> orqali shu middleware'ga uzatasiz:" },
        { code: "app.get('/xato', (req, res, next) => {\n  try {\n    // xato bo'lishi mumkin kod...\n    throw new Error('Nimadir buzildi');\n  } catch (err) {\n    next(err); // xato middleware'iga uzatamiz\n  }\n});" },
        { note: "Express funksiyaning to'rt argumentli ekanligiga qarab uni xato middleware sifatida taniydi. Shuning uchun <code>next</code> ishlatilmasa ham, uni to'rtinchi argument sifatida yozish shart: <code>(err, req, res, next)</code>." },
        { tip: "Middleware'lar tartibi odatda shunday bo'ladi: (1) logger va <code>express.json()</code> kabi umumiy middleware'lar, (2) route'lar, (3) 404 middleware, (4) xato middleware — eng oxirida. Bu tartib so'rovning to'g'ri yo'ldan o'tishini ta'minlaydi." },

        { h2: "To'liq misol" },
        { p: "Barcha tushunchalarni birlashtiruvchi to'liq server strukturasi:" },
        { code: "const express = require('express');\nconst app = express();\n\n// 1. Umumiy middleware'lar:\napp.use(express.json());\napp.use((req, res, next) => {\n  console.log(req.method + ' ' + req.url);\n  next();\n});\n\n// 2. Route'lar:\napp.get('/', (req, res) => {\n  res.send('Bosh sahifa');\n});\n\n// 3. 404 (barcha route'lardan keyin):\napp.use((req, res) => {\n  res.status(404).json({ xato: 'Topilmadi' });\n});\n\n// 4. Xato middleware (eng oxirida):\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ xato: 'Server xatosi' });\n});\n\napp.listen(3000, () => console.log('Server 3000-portda'));" },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Middleware</strong> — so'rovni qayta ishlash zanjiridagi oraliq funksiya (<code>req</code>, <code>res</code>, <code>next</code>);",
          "<code>next()</code> so'rovni keyingi bosqichga uzatadi; uni chaqirmasangiz, so'rov osilib qoladi;",
          "Middleware'lar <strong>tartibda</strong> ishlaydi — koddagi joylashuvi muhim;",
          "<code>express.json()</code> — JSON tanani o'qiydi, <code>express.static()</code> — statik fayllarni uzatadi;",
          "Maxsus middleware (masalan, logger) oson yoziladi va qayta ishlatiladi;",
          "<strong>404</strong> middleware barcha route'lardan keyin, <strong>xato middleware</strong> (4 argumentli) esa eng oxirida turadi."
        ] }
      ]
    }
  ]
};
