"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Kirish",
  lessons: [
    {
      slug: "js-haqida",
      title: "JavaScript haqida",
      blurb: "JavaScript nima, u qanday paydo bo'lgan va bugungi kunda qayerda ishlaydi.",
      body: [
        { lead: "JavaScript — bu veb-sahifalarni \"jonli\" qiluvchi dasturlash tili. Ushbu darsda uning tabiati, tarixi va imkoniyatlari bilan tanishamiz." },
        { h2: "JavaScript qanday paydo bo'lgan?" },
        { p: "JavaScript dastlab 1995-yilda faqat brauzerlarga \"jon\" bag'ishlash — sahifalarni interaktiv qilish uchun yaratilgan edi. Dastur kodi to'g'ridan-to'g'ri HTML sahifasiga yozilib, sahifa yuklanganda avtomatik ishga tushardi." },
        { p: "Bugungi kunda JavaScript nafaqat brauzerda, balki serverda (<strong>Node.js</strong> orqali), va umuman <em>JavaScript dvigateli</em> (engine) o'rnatilgan istalgan qurilmada ishlay oladi." },
        { note: "Brauzerda o'rnatilgan JavaScript dvigatelining nomlari bor: <strong>V8</strong> — Chrome, Opera va Edge uchun; <strong>SpiderMonkey</strong> — Firefox uchun. Node.js ham V8 dvigatelida ishlaydi." },
        { h2: "Dvigatel kodni qanday bajaradi?" },
        { p: "Dvigatellar murakkab, lekin asosiy g'oya sodda:" },
        { ol: [
          "Dvigatel skriptni o'qiydi (<em>\"parse\"</em> qiladi);",
          "Uni mashina kodiga o'giradi (<em>\"compile\"</em> qiladi);",
          "So'ng mashina kodi tez ishga tushadi."
        ] },
        { p: "Dvigatel jarayonning har bir bosqichida optimallashtirish qo'llaydi, shuning uchun zamonaviy JavaScript juda tez ishlaydi." },
        { h2: "Brauzerda JavaScript nimalar qila oladi?" },
        { ul: [
          "Sahifaga yangi HTML qo'shish, mavjud mazmun va uslublarni o'zgartirish;",
          "Foydalanuvchi harakatlariga javob berish — bosish, sichqoncha, tugmalar;",
          "Server bilan tarmoq orqali so'rov yuborish (AJAX, Fetch), fayl yuklash;",
          "Cookie olish va o'rnatish, foydalanuvchidan savol so'rash, xabar ko'rsatish;",
          "Ma'lumotni brauzer xotirasida saqlash (<code>localStorage</code>)."
        ] },
        { h2: "Brauzerdagi JavaScript nimalarni QILA OLMAYDI?" },
        { p: "Xavfsizlik uchun brauzerdagi JavaScript imkoniyatlari cheklangan:" },
        { warn: "Sahifadagi JavaScript diskdagi ixtiyoriy fayllarni o'qiy olmaydi yoki dasturlarni ishga tushira olmaydi. Uning operatsion tizim funksiyalariga to'g'ridan-to'g'ri kirishi yo'q." },
        { p: "Turli oynalar/tablar odatda bir-birini \"bilmaydi\" (bu <em>\"Same Origin Policy\"</em> — bir manba siyosati deb ataladi). Bu foydalanuvchi ma'lumotlarini himoya qiladi." },
        { h2: "JavaScript'ni nimasi maxsus?" },
        { ul: [
          "<strong>HTML/CSS bilan to'liq integratsiya</strong> — uchtasi birga ishlaydi;",
          "<strong>Sodda ishlarni sodda bajaradi</strong>;",
          "<strong>Barcha asosiy brauzerlarda qo'llab-quvvatlanadi</strong> va standart (ECMAScript) sifatida yoqilgan."
        ] },
        { tip: "JavaScript — brauzerda ishlaydigan yagona til bo'lgani uchun eng keng tarqalgan. Uning \"ustki\" tillari ham bor (TypeScript, Dart), ular kodni JavaScript'ga o'giradi." },
        { h2: "Xulosa" },
        { ul: [
          "JavaScript — brauzer uchun yaratilgan, endi ko'p muhitlarda ishlaydigan til;",
          "Brauzerda u DOM, hodisalar, tarmoq va xotira bilan ishlay oladi;",
          "Xavfsizlik sababli uning imkoniyatlari cheklangan;",
          "U HTML va CSS bilan mukammal integratsiyalashgan."
        ] }
      ]
    },
    {
      slug: "qollanmalar",
      title: "Qo'llanmalar va spetsifikatsiyalar",
      blurb: "ECMAScript spetsifikatsiyasi, MDN va boshqa ishonchli manbalar.",
      body: [
        { lead: "Ushbu kurs JavaScript'ni o'rgatadi, ammo vaqt o'tib sizga ishonchli ma'lumotnomalar kerak bo'ladi. Keling, asosiylarini ko'rib chiqamiz." },
        { h2: "Spetsifikatsiya" },
        { p: "<strong>ECMA-262 spetsifikatsiyasi</strong> — JavaScript haqidagi eng rasmiy, chuqur va batafsil ma'lumot manbai. U tilni to'liq ta'riflaydi. Ammo aynan rasmiyligi tufayli boshlang'ich o'rganish uchun qiyin — kundalik ishda undan kamdan-kam foydalaniladi." },
        { note: "Har yili yangi spetsifikatsiya versiyasi chiqadi. Versiyalar orasidagi eng so'nggi qoralama <a href=\"https://tc39.es/ecma262/\" target=\"_blank\" rel=\"noopener\">tc39.es/ecma262</a> manzilida joylashgan." },
        { h2: "Qo'llanmalar (Manuals)" },
        { ul: [
          "<strong>MDN (Mozilla) JavaScript Reference</strong> — funksiyalar va metodlar bo'yicha misollar va batafsil ma'lumotli asosiy qo'llanma. Biror funksiya haqida bilmoqchi bo'lsangiz, internetda \"MDN [mavzu]\" deb qidiring."
        ] },
        { h2: "Moslik jadvallari" },
        { p: "JavaScript rivojlanmoqda, muntazam yangi imkoniyatlar qo'shiladi. Ularning brauzerlarda qo'llab-quvvatlanishini ko'rish uchun:" },
        { ul: [
          "<strong>caniuse.com</strong> — bir imkoniyat qaysi brauzerlarda ishlashini ko'rsatadi;",
          "<strong>MDN moslik jadvallari</strong> — har bir funksiya sahifasida."
        ] },
        { tip: "Bu manbalarni xatcho'plarga (bookmark) qo'shib qo'ying — biror narsani unutganingizda tez topasiz." },
        { h2: "Xulosa" },
        { ul: [
          "<strong>Spetsifikatsiya (ECMA-262)</strong> — rasmiy, chuqur manba;",
          "<strong>MDN</strong> — kundalik ish uchun eng qulay qo'llanma;",
          "<strong>caniuse.com</strong> — brauzer mosligini tekshirish uchun."
        ] }
      ]
    },
    {
      slug: "muharrirlar",
      title: "Kod muharrirlari",
      blurb: "IDE va yengil muharrirlar — dasturchining asosiy ish quroli.",
      body: [
        { lead: "Kod muharriri — dasturchi vaqtining katta qismini o'tkazadigan joy. Ikki asosiy tur bor: IDE'lar va yengil muharrirlar." },
        { h2: "IDE (Integrated Development Environment)" },
        { p: "<strong>IDE</strong> — \"integratsiyalashgan ishlab chiqarish muhiti\" — butun loyiha darajasida ishlaydigan kuchli muharrir. U avtomatik to'ldirish, xatolarni ko'rsatish, versiya nazorati (git) va debugging imkoniyatlarini beradi." },
        { p: "Ommabop IDE'lar:" },
        { ul: [
          "<strong>Visual Studio Code</strong> — bepul, kuchli, JavaScript uchun eng mashhur tanlov;",
          "<strong>WebStorm</strong> — pullik, JetBrains kompaniyasidan, juda qulay."
        ] },
        { tip: "Yangi boshlovchilar uchun <strong>Visual Studio Code</strong> (VS Code) eng yaxshi tanlov — bepul, tez va minglab kengaytmalarga ega." },
        { h2: "Yengil muharrirlar" },
        { p: "Yengil (lightweight) muharrirlar IDE kabi kuchli emas, lekin tez va sodda. Ular asosan bitta faylni tez ochib tahrirlash uchun ishlatiladi: Sublime Text, Notepad++, Vim." },
        { note: "Muharrir tanlashda \"eng yaxshisi\" degan tushuncha yo'q — bu shaxsiy did masalasi. Bir nechtasini sinab ko'ring." },
        { h2: "Xulosa" },
        { ul: [
          "<strong>IDE</strong> — to'liq loyiha uchun kuchli muhit (VS Code, WebStorm);",
          "<strong>Yengil muharrir</strong> — tez va sodda tahrirlash uchun;",
          "Boshlash uchun VS Code tavsiya etiladi."
        ] }
      ]
    },
    {
      slug: "konsol",
      title: "Ishlab chiquvchi konsoli",
      blurb: "Brauzer developer tools va konsol orqali xatolarni ko'rish.",
      body: [
        { lead: "Kodda xatolar bo'lishi muqarrar. Ularni ko'rish va tuzatish uchun brauzerlar <strong>ishlab chiquvchi vositalari</strong> (developer tools) bilan jihozlangan." },
        { h2: "Developer Tools nima?" },
        { p: "Har bir zamonaviy brauzer ichida dasturchilar uchun maxsus vositalar to'plami bor. Ular xatolarni ko'rsatadi, kodni bosqichma-bosqich bajarishga va tarmoq so'rovlarini kuzatishga imkon beradi." },
        { h2: "Konsolni qanday ochish kerak?" },
        { ul: [
          "<strong>Chrome / Edge / Firefox</strong>: <code>F12</code> tugmasi;",
          "<strong>Mac</strong>: <code>Cmd + Option + J</code> (Chrome) yoki <code>Cmd + Option + K</code> (Firefox);",
          "Yoki sahifada o'ng tugma → \"Inspect\" → \"Console\" bo'limi."
        ] },
        { h2: "Konsol nima uchun kerak?" },
        { p: "<strong>Console</strong> bo'limi ikki asosiy vazifani bajaradi:" },
        { ol: [
          "Kodda yuzaga kelgan xatolarni (qizil rangda) ko'rsatadi;",
          "<code>console.log()</code> orqali chiqarilgan ma'lumotlarni ko'rsatadi."
        ] },
        { p: "Quyidagi misolni ishga tushiring — natija maydonchada, xuddi brauzer konsolidagidek, ko'rinadi:" },
        { pg: "console.log(\"Salom, dunyo!\");\nconsole.log(\"Konsol xabarlarni shu yerda ko'rsatadi\");\n\nlet x = 5;\nlet y = 10;\nconsole.log(\"Yig'indi:\", x + y);", file: "konsol.js" },
        { note: "Konsolga to'g'ridan-to'g'ri JavaScript kod yozib, <code>Enter</code> bosish orqali ham uni bajarish mumkin." },
        { tip: "Debugging — dasturchining asosiy mahoratlaridan biri. Konsol bilan yaxshi tanishib oling." },
        { h2: "Xulosa" },
        { ul: [
          "Har bir brauzerda <strong>developer tools</strong> mavjud (<code>F12</code>);",
          "<strong>Console</strong> — xatolar va <code>console.log</code> chiqishini ko'rsatadi;",
          "Konsolda kod yozib, darhol bajarish mumkin."
        ] }
      ]
    }
  ]
};
