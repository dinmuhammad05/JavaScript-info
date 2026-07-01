"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Hujjat (DOM)",
  lessons: [
    {
      slug: "brauzer-muhiti",
      title: "Brauzer muhiti va spetsifikatsiyalar",
      blurb: "JavaScript qanday muhitlarda ishlaydi, brauzerdagi global obyekt window, DOM, BOM va document nima, host muhitlari va rasmiy spetsifikatsiyalar.",
      body: [
        { lead: "JavaScript tili dastlab veb-brauzer uchun yaratilgan. Ammo o'sha vaqtdan beri u ko'plab boshqa muhitlar va platformalarga tarqaldi. Muhit (platforma) brauzer, veb-server yoki hatto \"aqlli\" muzlatkich bo'lishi mumkin. Ularning har biri o'ziga xos funksionallikni taqdim etadi. JavaScript tilida bu muhitga xos qismlar <strong>host muhiti</strong> (host environment) deb ataladi. Ushbu darsda biz brauzer muhitini — u bizga qanday imkoniyatlar berishini chuqur o'rganamiz." },

        { h2: "Til yadrosi va muhit" },
        { p: "JavaScript kodini ikki qatlamga bo'lib tasavvur qilish qulay:" },
        { ul: [
          "<strong>Til yadrosi</strong> (ECMAScript) — bu <code>Array</code>, <code>Object</code>, <code>Math</code>, <code>String</code>, <code>Function</code> kabi tilning o'zi ta'riflaydigan asosiy imkoniyatlar. Ular har qanday muhitda bir xil ishlaydi.",
          "<strong>Host muhiti</strong> — bu muhit qo'shadigan qo'shimcha obyektlar va funksiyalar. Brauzerda bu <code>document</code>, <code>alert</code>, <code>fetch</code> va boshqalar. Node.js'da esa fayl tizimi, tarmoq modullari va h.k."
        ] },
        { p: "Ya'ni til bir xil, ammo har bir host o'z \"qo'shimchalarini\" beradi. Brauzer bizga sahifani boshqarish uchun ko'plab maxsus obyektlar taqdim etadi." },
        { note: "Shuning sababli bir xil JavaScript kodi brauzerda ishlaydi-yu, Node.js'da ishlamasligi mumkin: masalan, <code>document</code> obyekti faqat brauzerda mavjud. Aksincha, faylni o'qish (<code>fs</code> moduli) faqat Node.js'da bor." },

        { h2: "window — brauzerdagi ildiz (root) obyekti" },
        { p: "Brauzer muhitida barcha imkoniyatlarni birlashtiruvchi ildiz (root) obyekt bor — u <strong>window</strong> deb ataladi. Uning ikkita asosiy roli bor:" },
        { ol: [
          "Birinchidan, u JavaScript til yadrosining <strong>global obyekti</strong> hisoblanadi (biz uni tilning \"Global obyekt\" mavzusida ko'rgan edik).",
          "Ikkinchidan, u <strong>brauzer oynasini</strong> (browser window) ifodalaydi va uni boshqarish uchun metodlar taqdim etadi."
        ] },
        { p: "Masalan, biz uni global obyekt sifatida ishlatib, yuqori darajali (global) funksiyani chaqirishimiz mumkin:" },
        { code: "function sayHi() {\n  alert('Salom');\n}\n\n// global funksiyalar window'ning metodi sifatida ham ko'rinadi\nwindow.sayHi(); // Salom" },
        { p: "Va uni brauzer oynasini ifodalaydigan obyekt sifatida ishlatib, oyna balandligini bilishimiz mumkin:" },
        { code: "alert(window.innerHeight); // ichki oyna balandligi (piksellarda)" },
        { p: "<code>window</code> obyektida oynaga oid yana ko'plab metod va xossalar bor, ular bilan keyingi bo'limlarda tanishamiz." },
        { warn: "Global funksiyalar va <code>var</code> bilan e'lon qilingan global o'zgaruvchilar <code>window</code>ning xossalari bo'ladi. Ammo <code>let</code> va <code>const</code> bunday emas! Bu zamonaviy standartning o'ziga xosligidir. Shuning uchun global miqyosda <code>let</code>/<code>const</code> ishlatilsa, ular <code>window</code> obyektida ko'rinmaydi." },
        { code: "var gVar = 5;\nalert(window.gVar); // 5 (var global obyektga qo'shildi)\n\nlet gLet = 5;\nalert(window.gLet); // undefined (let qo'shilmaydi)" },

        { h2: "DOM (Document Object Model)" },
        { p: "<strong>DOM (Document Object Model — Hujjat Obyekt Modeli)</strong> sahifadagi barcha mazmunni o'zgartirishimiz mumkin bo'lgan obyektlar sifatida ifodalaydi. Uning markaziy \"kirish nuqtasi\" — <code>document</code> obyekti." },
        { p: "Masalan, <code>document.body</code> — bu <code>&lt;body&gt;</code> tegini ifodalovchi obyekt. Quyidagi kod sahifa fonini 3 soniyaga qizil qiladi:" },
        { code: "// sahifa fonini qizil qilamiz\ndocument.body.style.background = 'red';\n\n// 3 soniyadan keyin qaytaramiz\nsetTimeout(() => document.body.style.background = '', 3000);" },
        { p: "Bu yerda biz <code>document.body.style.background</code> orqali <code>&lt;body&gt;</code> tegining fon rangini o'zgartirdik. DOM yordamida biz istalgan elementni yaratishimiz, o'chirishimiz, ko'chirishimiz, mazmunini va uslubini o'zgartirishimiz mumkin." },
        { note: "DOM faqat JavaScript uchun emas. U tildan mustaqil. Masalan, Python kabi boshqa tillar ham DOM'dan foydalanadi. DOM spetsifikatsiyasi HTML sahifasining tuzilishini tavsiflaydi va u bilan ishlash uchun obyektlarni ta'riflaydi." },
        { tip: "Brauzerdan tashqarida ham DOM ishlatiladi. Masalan, serverda HTML sahifalarini yuklab, ularni qayta ishlaydigan skriptlar (Node.js'dagi <code>jsdom</code> kabi kutubxonalar) DOM'ning faqat bir qismini qo'llab-quvvatlashi mumkin." },

        { h2: "CSSOM — uslublar uchun" },
        { p: "CSS qoidalari va uslublar jadvallari (stylesheets) HTML tuzilishidan farqli ravishda ifodalanadi. Ular uchun alohida spetsifikatsiya bor — <strong>CSSOM (CSS Object Model)</strong>. U CSS qoidalarini qanday obyektlar sifatida ifodalash, ularni o'qish va yozishni tavsiflaydi." },
        { p: "CSSOM DOM bilan birga ishlatiladi. Ammo amaliyotda CSSOM kamdan-kam kerak bo'ladi, chunki odatda biz CSS qoidalarini JavaScript'dan emas, balki elementlarga <code>class</code> qo'shib/olib boshqaramiz. Shuning uchun bu kursda unga alohida to'xtalmaymiz." },

        { h2: "BOM (Browser Object Model)" },
        { p: "<strong>BOM (Browser Object Model — Brauzer Obyekt Modeli)</strong> — bu hujjatdan tashqari, brauzer bilan ishlash uchun qo'shimcha obyektlarni ifodalaydi. Masalan:" },
        { ul: [
          "<code>navigator</code> obyekti brauzer va operatsion tizim haqida ma'lumot beradi. Ko'plab xossalari bor, eng mashhurlari: <code>navigator.userAgent</code> (joriy brauzer haqida) va <code>navigator.platform</code> (platforma: Windows, Linux, Mac va h.k.);",
          "<code>location</code> obyekti joriy URL manzilini o'qish va brauzerni yangi manzilga yo'naltirish imkonini beradi;",
          "<code>alert</code>, <code>confirm</code>, <code>prompt</code> funksiyalari ham BOM qismidir — ular hujjat bilan bevosita bog'liq emas, balki brauzer bilan foydalanuvchi o'rtasidagi muloqot vositalaridir."
        ] },
        { code: "alert(location.href); // joriy URL manzilini ko'rsatadi\n\nif (confirm('Wikipedia'ga o'tamizmi?')) {\n  location.href = 'https://wikipedia.org'; // brauzerni boshqa URL'ga yo'naltirish\n}" },
        { p: "<code>alert</code>, <code>prompt</code> va <code>confirm</code> — bular ham BOM'ning bir qismi, chunki ular to'g'ridan-to'g'ri hujjatga tegishli emas, balki brauzerning umumiy funksiyalaridir." },

        { h2: "Spetsifikatsiyalar" },
        { p: "BOM umumiy <strong>HTML spetsifikatsiyasining</strong> bir qismidir. Ha, to'g'ri eshitdingiz. HTML spetsifikatsiyasi <a href=\"https://html.spec.whatwg.org\">https://html.spec.whatwg.org</a> manzilida joylashgan bo'lib, u nafaqat \"HTML tili\" (teglar, atributlar) haqida, balki turli obyektlar, metodlar va brauzerga xos DOM kengaytmalari haqida ham gapiradi. Bu \"keng ma'nodagi HTML\"." },
        { p: "Bizni qiziqtiruvchi asosiy spetsifikatsiyalar:" },
        { ul: [
          "<strong>DOM spetsifikatsiyasi</strong> — hujjat tuzilishini, uni boshqarish va hodisalarni tavsiflaydi. Manzil: <a href=\"https://dom.spec.whatwg.org\">https://dom.spec.whatwg.org</a>.",
          "<strong>CSSOM spetsifikatsiyasi</strong> — uslublar jadvallari va CSS qoidalari, ular bilan manipulyatsiya va ularning HTML bilan bog'liqligini tavsiflaydi. Manzil: <a href=\"https://www.w3.org/TR/cssom-1/\">https://www.w3.org/TR/cssom-1/</a>.",
          "<strong>HTML spetsifikatsiyasi</strong> — HTML tili (teglar va h.k.) va shuningdek BOM (brauzer obyekt modeli) — <code>setTimeout</code>, <code>alert</code>, <code>location</code> va boshqalar. U DOM spetsifikatsiyasini olib, uni ko'plab qo'shimcha xossa va metodlar bilan kengaytiradi. Manzil: <a href=\"https://html.spec.whatwg.org\">https://html.spec.whatwg.org</a>."
        ] },
        { note: "Ayrim atamalarni alohida spetsifikatsiyalar tavsiflaydi, ularni <a href=\"https://spec.whatwg.org\">https://spec.whatwg.org</a> manzilida topish mumkin. Bu spetsifikatsiyalar dastlab murakkab ko'rinsa-da, biror mavzuni chuqur o'rganmoqchi bo'lganingizda juda foydali. Kundalik ishda esa MDN (<a href=\"https://developer.mozilla.org\">Mozilla Developer Network</a>) ko'proq qulay — u misollar bilan tushuntiradi." },
        { tip: "Biror funksiya yoki metod haqida qidirsangiz, internet qidiruviga <code>MDN [atama]</code> deb yozing, masalan <code>MDN parseInt</code>. Bu sizni to'g'ridan-to'g'ri MDN ma'lumotnomasiga olib boradi." },

        { h2: "Xulosa" },
        { p: "Brauzer JavaScript'ga sahifa bilan ishlash uchun boy imkoniyatlar beradi. Uni bir necha qismga bo'lib eslab qolamiz:" },
        { ul: [
          "<strong>window</strong> — brauzerdagi ildiz obyekt: ham global obyekt, ham brauzer oynasini ifodalaydi;",
          "<strong>DOM</strong> — hujjat mazmuni (obyektlar sifatida). Kirish nuqtasi — <code>document</code>. DOM spetsifikatsiyasida tavsiflangan;",
          "<strong>CSSOM</strong> — CSS qoidalari va uslublar jadvallarini obyektlar sifatida boshqaradi;",
          "<strong>BOM</strong> — brauzerning boshqa funksiyalari: <code>navigator</code>, <code>location</code>, <code>screen</code>, <code>alert/confirm/prompt</code>, <code>setTimeout</code> va h.k. HTML spetsifikatsiyasida tavsiflangan;",
          "Til yadrosi (ECMAScript) esa muhitdan mustaqil, u har joyda bir xil ishlaydi."
        ] }
      ]
    },

    {
      slug: "dom-daraxti",
      title: "DOM daraxti",
      blurb: "HTML hujjat qanday qilib teglar daraxtiga aylanadi, element va matn tugunlari, avtomatik xatolarni tuzatish, tugun turlari va DevTools'da ko'rish.",
      body: [
        { lead: "HTML hujjatning asosi — teglar. DOM (Document Object Model) modeliga ko'ra, har bir HTML tegi obyektga aylanadi. Ichma-ich joylashgan teglar tashqi teglarning \"bolalari\" bo'ladi. Teg ichidagi matn ham obyekt sanaladi. Bu obyektlarning barchasi bizga JavaScript orqali ochiq bo'lib, ular yordamida sahifani boshqaramiz. Ushbu darsda HTML'dan hosil bo'ladigan DOM daraxtini chuqur o'rganamiz." },

        { h2: "Misol DOM daraxti" },
        { p: "Keling, oddiy bir hujjatni ko'raylik:" },
        { code: "<!DOCTYPE HTML>\n<html>\n<head>\n  <title>Bosh sahifa haqida</title>\n</head>\n<body>\n  Salom, men bu sahifamanman\n</body>\n</html>" },
        { p: "DOM bu hujjatni tugunlar (nodes) daraxti sifatida ifodalaydi. Har bir teg <strong>element tuguni</strong> (element node) — daraxtning asosiy \"g'ishtchasi\"dir. Ular daraxtni tashkil qiladi: <code>&lt;html&gt;</code> — ildiz, <code>&lt;head&gt;</code> va <code>&lt;body&gt;</code> uning bolalari, va hokazo." },
        { p: "Elementlar ichidagi matn <strong>matn tugunlarini</strong> (text nodes) tashkil qiladi. Matn tuguni faqat satr (string) saqlaydi. Uning boshqa bolalari bo'la olmaydi va u har doim daraxtning \"bargi\" (leaf) hisoblanadi." },
        { p: "Masalan, yuqoridagi hujjatda <code>&lt;title&gt;</code> ichida <code>\"Bosh sahifa haqida\"</code> matn tuguni bor, <code>&lt;body&gt;</code> ichida esa <code>\"Salom, men bu sahifamanman\"</code> matn tuguni joylashgan." },
        { note: "Daraxtda ikki turdagi asosiy tugunlar ishtirok etadi: <strong>element tugunlari</strong> (teglar) va <strong>matn tugunlari</strong> (matn bo'laklari). Ular birgalikda DOM tuzilishini hosil qiladi." },

        { h2: "Bo'shliqlar va yangi qatorlar" },
        { p: "Muhim jihat: matn tugunlarida <strong>bo'shliqlar</strong> (spaces) va <strong>yangi qator</strong> (newline) belgilari ham hisobga olinadi. Ular ham to'liq huquqli belgilar bo'lib, matn tugunlarini hosil qiladi va DOM'ning bir qismi bo'ladi." },
        { p: "Masalan, quyidagi HTML'da <code>&lt;head&gt;</code>dan oldin va matn ichida bo'shliq va yangi qatorlar bor — ular ham DOM'ga tushadi:" },
        { code: "<!DOCTYPE HTML>\n<html>\n<!-- bu yerdagi yangi qator + bo'shliq ham matn tuguni bo'ladi -->\n<head>...</head>\n...\n</html>" },
        { p: "Biroq ikkita istisno bor:" },
        { ol: [
          "Tarixiy sabablarga ko'ra, <code>&lt;head&gt;</code>dan oldingi bo'shliqlar va yangi qatorlar e'tiborga olinmaydi (ular tashlab yuboriladi);",
          "Agar biror narsani <code>&lt;/body&gt;</code>dan keyin yozsak, brauzer uni avtomatik ravishda <code>body</code> ichiga ko'chiradi, chunki HTML spetsifikatsiyasiga ko'ra barcha mazmun <code>&lt;body&gt;</code> ichida bo'lishi kerak. Shuning uchun <code>&lt;/body&gt;</code>dan keyin bo'shliq bo'lmaydi."
        ] },
        { tip: "Boshqa hollarda hamma narsa to'g'ridan-to'g'ri: agar hujjatda bo'shliqlar bo'lsa — ular DOM'da matn tugunlari sifatida ko'rinadi, agar olib tashlansak — ular yo'qoladi. Bu ba'zan JavaScript'da tugunlar bo'ylab harakatlanganda kutilmagan \"bo'sh\" matn tugunlariga duch kelishimizga sabab bo'ladi." },

        { h2: "Avtomatik tuzatish (autocorrection)" },
        { p: "Agar brauzer noto'g'ri (buzuq) HTML'ga duch kelsa, DOM'ni hosil qilishda uni avtomatik ravishda <strong>tuzatadi</strong>. Masalan, yuqoridagi hujjatda ochilish <code>&lt;html&gt;</code> tegi yo'q — bu muhim emas. Brauzer buni sezib, avtomatik qo'shadi, chunki bu tegga hujjat majburan ega bo'lishi kerak." },
        { p: "Xuddi shunday, agar hujjatda umuman <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> yoki <code>&lt;body&gt;</code> teglari yozilmagan bo'lsa ham, DOM'da ular baribir mavjud bo'ladi. Brauzer ularni yaratadi:" },
        { code: "// hatto matndan iborat oddiy HTML uchun ham\n// DOM'da <html>, <head>, <body> teglari mavjud bo'ladi" },
        { p: "Jadvallar bilan ishlashda qiziq holat bor. DOM spetsifikatsiyasiga ko'ra, <code>&lt;table&gt;</code> ichida albatta <code>&lt;tbody&gt;</code> bo'lishi kerak. Ammo HTML'da uni yozmasligimiz mumkin. Bunday holda brauzer uni DOM'da avtomatik yaratadi:" },
        { code: "<table id=\"table\">\n  <tr>\n    <td>1</td>\n  </tr>\n</table>\n\n<!-- DOM'da brauzer <table> va <tr> orasiga\n     avtomatik <tbody> qo'shadi -->" },
        { warn: "Bu muhim! Jadval elementlari bo'ylab JavaScript'da harakatlanganda, <code>&lt;table&gt;</code>ning bevosita bolasi <code>&lt;tr&gt;</code> emas, balki <code>&lt;tbody&gt;</code> bo'ladi — hatto uni HTML'da yozmagan bo'lsak ham. Buni unutmaslik kerak, aks holda tugunlar bo'ylab harakatlanish kutilmagan natija berishi mumkin." },
        { p: "Yopilmagan teglar, xato joylashgan atributlar — bularning hammasini brauzer DOM hosil qilishda \"tuzatadi\". Shu sababli, HTML' da xatolik bo'lsa ham, brauzer baribir biror-bir daraxt tuzadi." },

        { h2: "Boshqa tugun turlari" },
        { p: "Elementlar va matn tugunlaridan tashqari yana bir necha tugun turlari bor. Masalan, <strong>izohlar</strong> (comments):" },
        { code: "<!DOCTYPE HTML>\n<html>\n<body>\n  Salom\n  <!-- Bu izoh -->\n</body>\n</html>" },
        { p: "Bu yerda <code>&lt;!-- Bu izoh --&gt;</code> ham DOM'da tugun sifatida ko'rinadi — <strong>izoh tuguni</strong> (comment node). Savol tug'ilishi mumkin: nega izoh DOM'ga qo'shiladi? U ekranda hech narsa ko'rsatmaydi-ku?" },
        { p: "Buning uchun bir qoida bor: <strong>HTML'da nima bo'lsa, DOM'da ham shu bo'ladi</strong>. Izohlar ham, hatto <code>&lt;!DOCTYPE...&gt;</code> direktivasi ham DOM tuguni hisoblanadi. Hech narsa e'tibordan chetda qolmaydi." },
        { p: "Umuman olib qaraganda, 12 turdagi tugun mavjud. Amaliyotda biz asosan 4 tasi bilan ishlaymiz:" },
        { ol: [
          "<code>document</code> — DOM'ga \"kirish nuqtasi\", eng yuqori tugun;",
          "element tugunlari — HTML teglari, daraxtni tashkil etuvchi asosiy bloklar;",
          "matn tugunlari — matnni saqlaydi;",
          "izohlar — ekranda ko'rinmaydi, ammo ma'lumot uchun DOM'ga qo'shiladi. Ular orqali JavaScript'ga \"ko'rsatma\" berish kabi hiylalar ham qilinadi."
        ] },
        { note: "Har bir tugunning turini bildiruvchi son bor — <code>nodeType</code>. Bu haqda \"Node xossalari\" darsida batafsil to'xtalamiz. Hozircha esa asosiy 4 turni eslab qolish kifoya." },

        { h2: "DevTools'da DOM'ni ko'rish" },
        { p: "DOM'ni amaliy o'rganish va u bilan ishlash uchun brauzerning ishlab chiquvchi vositalari (<strong>Developer Tools</strong>, qisqacha <em>DevTools</em>) juda qulay. Ularni <code>F12</code> tugmasi bilan ochib, <strong>Elements</strong> (Elementlar) bo'limiga o'ting. U yerda siz DOM daraxtini interaktiv holda ko'rasiz." },
        { ul: [
          "Istalgan elementga bosib, uni tanlashingiz mumkin;",
          "Uchburchak (arrow) belgisi bilan tugunlarni yoyish/yig'ish mumkin;",
          "O'ng tomonda tanlangan elementning uslublari (Styles), o'lchamlari va boshqa ma'lumotlari ko'rsatiladi;",
          "Elementni ustiga sichqonchani olib borsangiz, u sahifada belgilanadi (highlight)."
        ] },
        { p: "DevTools va JavaScript konsoli o'rtasida qulay o'zaro bog'lanish bor:" },
        { ol: [
          "Elements bo'limida biror elementni tanlang;",
          "Console'ga o'ting va <code>$0</code> deb yozing — u yaqinda tanlangan elementga ishora qiladi;",
          "Aksincha ham: agar konsolda biror tugun (masalan, <code>document.body</code>) chiqarilgan bo'lsa, uning ustiga o'ng tugmani bosib, <em>Reveal in Elements panel</em> ni tanlab, uni Elements bo'limida ko'rishingiz mumkin."
        ] },
        { code: "// Console'da tanlangan elementni tekshirish\ninspect($0); // tanlangan elementni Elements'da ko'rsatadi\n\n// $0, $1, $2 ... — oxirgi tanlangan elementlar tarixi" },
        { tip: "DevTools — DOM bilan ishlaganda eng yaxshi do'stingiz. Har bir yangi metod yoki xossani o'rganganingizda, uni konsolda sinab ko'rish odatini shakllantiring. Bu materialni tezroq va chuqurroq o'zlashtirishga yordam beradi." },

        { h2: "Xulosa" },
        { ul: [
          "HTML hujjat teglardan iborat DOM daraxti sifatida ifodalanadi;",
          "Teglar — element tugunlari, ular daraxt tuzilishini hosil qiladi;",
          "Matn — matn tugunlari; bo'shliq va yangi qatorlar ham matn tugunlari sifatida hisobga olinadi;",
          "Izohlar, DOCTYPE va boshqa maxsus ma'lumotlar ham DOM tugunlaridir;",
          "Buzuq HTML'ni brauzer avtomatik tuzatadi (masalan, <code>&lt;tbody&gt;</code>ni qo'shadi, yopilmagan teglarni yopadi);",
          "DOM'ni DevTools (Elements bo'limi) orqali interaktiv ko'rish va konsol bilan bog'lash mumkin."
        ] }
      ]
    },

    {
      slug: "dom-boylab",
      title: "DOM bo'ylab harakatlanish",
      blurb: "documentElement, body, head; bolalar (childNodes, firstChild, lastChild), qo'shnilar va ota tugunlar; faqat elementlar bo'yicha navigatsiya va jadvallar bilan ishlash.",
      body: [
        { lead: "DOM bizga har qanday element va uning mazmuni bilan istalgan narsani qilishga imkon beradi. Ammo avval kerakli DOM obyektiga yetib borishimiz kerak. DOM ustidagi barcha amallar <code>document</code> obyektidan boshlanadi — u asosiy \"kirish nuqtasi\". Undan istalgan tugunga yetib borishimiz mumkin. Ushbu darsda tugunlar orasida qanday harakatlanishni chuqur o'rganamiz." },

        { h2: "Eng yuqoridagi tugunlar: html, body, head" },
        { p: "Eng ustki daraxt tugunlari <code>document</code> obyektining maxsus xossalari sifatida to'g'ridan-to'g'ri mavjud:" },
        { ul: [
          "<code>&lt;html&gt;</code> = <code>document.documentElement</code> — eng ildiz hujjat tuguni;",
          "<code>&lt;body&gt;</code> = <code>document.body</code> — sahifa tanasi;",
          "<code>&lt;head&gt;</code> = <code>document.head</code> — sahifa boshi."
        ] },
        { code: "// eng yuqori tugunlarga to'g'ridan-to'g'ri murojaat\nalert(document.documentElement); // <html>\nalert(document.body);            // <body>\nalert(document.head);            // <head>" },
        { warn: "<code>document.body</code> <code>null</code> bo'lishi mumkin! Skript <code>&lt;head&gt;</code> ichida turgan bo'lsa, brauzer hali <code>&lt;body&gt;</code>ni o'qimagan bo'ladi, shu sababli u yerda <code>document.body</code> qiymati <code>null</code> bo'ladi. DOM'da mavjud bo'lmagan narsaga murojaat qilib bo'lmaydi. Shuning uchun DOM bilan ishlaydigan skriptlar odatda <code>&lt;/body&gt;</code>dan oldin yoki hujjat yuklangach ishga tushiriladi." },
        { code: "<html>\n<head>\n  <script>\n    alert('HEAD ichidan: ' + document.body); // null, hali body yo'q\n  </script>\n</head>\n<body>\n  <script>\n    alert('BODY ichidan: ' + document.body); // <body>, endi mavjud\n  </script>\n</body>\n</html>" },

        { h2: "Bolalar: childNodes, firstChild, lastChild" },
        { p: "Endi ikkita atamani ajratamiz:" },
        { ul: [
          "<strong>Bola tugunlar</strong> (child nodes yoki children) — bevosita ichma-ich joylashgan tugunlar. Masalan, <code>&lt;head&gt;</code> va <code>&lt;body&gt;</code> <code>&lt;html&gt;</code>ning bolalaridir;",
          "<strong>Avlodlar</strong> (descendants) — barcha ichma-ich joylashgan tugunlar, jumladan bolalar, ularning bolalari va hokazo — butun daraxt shohobchasi."
        ] },
        { p: "<code>childNodes</code> to'plami barcha bola tugunlarni, jumladan matn tugunlarini ro'yxatlaydi:" },
        { code: "<html>\n<body>\n  <div>Boshi</div>\n  <ul>\n    <li>Ma'lumot</li>\n  </ul>\n  <div>Oxiri</div>\n\n  <script>\n    for (let i = 0; i < document.body.childNodes.length; i++) {\n      alert( document.body.childNodes[i] );\n      // matn, DIV, matn, UL, ..., matn, SCRIPT\n    }\n  </script>\n</body>\n</html>" },
        { note: "E'tibor bering: yuqoridagi ro'yxatda <code>&lt;script&gt;</code> ham bor. Chunki skript <code>document.body</code> mazmunini o'qiganda, brauzer hali skriptdan keyingi narsalarni ko'rmagan bo'ladi. Shu sababli <code>childNodes</code> ro'yxati faqat skriptgacha bo'lgan tugunlarni oladi." },
        { p: "<code>firstChild</code> va <code>lastChild</code> xossalari birinchi va oxirgi bolalar tuguniga tez kirish beradi:" },
        { code: "// quyidagilar bir-biriga teng\nelem.childNodes[0] === elem.firstChild;\nelem.childNodes[elem.childNodes.length - 1] === elem.lastChild;" },
        { p: "Bolalar bor-yo'qligini tekshirish uchun maxsus funksiya bor — <code>hasChildNodes()</code>:" },
        { code: "if (elem.hasChildNodes()) {\n  // elementning bola tugunlari bor\n}" },

        { h2: "DOM to'plamlari (collections)" },
        { p: "<code>childNodes</code> oddiy massiv (array) EMAS, balki maxsus, massivga o'xshash <strong>iteratsiyalanuvchi obyekt</strong> — <code>NodeList</code> deb ataladi. Bundan ikkita muhim natija chiqadi:" },
        { ol: [
          "Uni <code>for..of</code> bilan aylantirishimiz mumkin, chunki u iteratsiyalanuvchi;",
          "Ammo massiv metodlari (<code>filter</code>, <code>map</code> va h.k.) unda mavjud emas, chunki u haqiqiy massiv emas."
        ] },
        { code: "for (let node of document.body.childNodes) {\n  alert(node); // to'plamdagi barcha tugunlarni ko'rsatadi\n}" },
        { p: "Agar massiv metodlari kerak bo'lsa, uni haqiqiy massivga aylantirishimiz mumkin:" },
        { code: "alert( Array.from(document.body.childNodes).filter ); // function" },
        { warn: "DOM to'plamlari faqat o'qish uchun (read-only)! Biz <code>childNodes[i] = ...</code> deb tugunni almashtira olmaymiz. Element bolalarini o'zgartirish uchun boshqa maxsus metodlar kerak (ular keyingi darslarda)." },
        { warn: "DOM to'plamlarining aksariyati <strong>jonli</strong> (live). Ya'ni ular hujjatning joriy holatini aks ettiradi. Agar biz havolani (referens) saqlab, keyin DOM'ga yangi element qo'shsak, u avtomatik ravishda to'plamda paydo bo'ladi." },
        { warn: "To'plamlarni aylantirish uchun <code>for..in</code> siklidan FOYDALANMANG! <code>for..in</code> obyektning barcha sanaladigan (enumerable) xossalarini aylanadi, bu esa to'plamda ortiqcha \"texnik\" maydonlarni (<code>length</code>, <code>item</code> va h.k.) ham qamrab oladi. Buning o'rniga <code>for..of</code> ishlating." },

        { h2: "Qo'shnilar va ota (siblings, parent)" },
        { p: "<strong>Qo'shnilar</strong> (siblings) — bir xil otaga ega tugunlar. Masalan, <code>&lt;head&gt;</code> va <code>&lt;body&gt;</code> — qo'shni, chunki ularning otasi <code>&lt;html&gt;</code>." },
        { ul: [
          "<code>nextSibling</code> — keyingi qo'shni tugun;",
          "<code>previousSibling</code> — oldingi qo'shni tugun;",
          "<code>parentNode</code> — ota tugun."
        ] },
        { code: "// <body> uchun \"ota\" — <html>\nalert( document.body.parentNode === document.documentElement ); // true\n\n// <head>dan keyin — <body>\nalert( document.head.nextSibling ); // HTMLBodyElement\n\n// <body>dan oldin — <head>\nalert( document.body.previousSibling ); // HTMLHeadElement" },

        { h2: "Faqat elementlar bo'yicha navigatsiya" },
        { p: "Yuqoridagi <code>childNodes</code>, <code>firstChild</code>, <code>lastChild</code>, <code>nextSibling</code>, <code>previousSibling</code>, <code>parentNode</code> xossalari <strong>barcha</strong> tugunlarni oladi — matn tugunlari, izohlar ham. Ammo ko'p vazifalarda bizga faqat <strong>element</strong> tugunlari — teglar kerak bo'ladi." },
        { p: "Shuning uchun ularning \"faqat elementlar bo'yicha\" versiyalari bor:" },
        { ul: [
          "<code>children</code> — faqat element bola tugunlar;",
          "<code>firstElementChild</code>, <code>lastElementChild</code> — birinchi va oxirgi bola elementlar;",
          "<code>previousElementSibling</code>, <code>nextElementSibling</code> — qo'shni elementlar;",
          "<code>parentElement</code> — ota element."
        ] },
        { code: "for (let elem of document.body.children) {\n  alert(elem); // DIV, UL, DIV, SCRIPT — faqat elementlar\n  // matn tugunlari e'tiborga olinmaydi\n}" },
        { p: "<code>parentNode</code> va <code>parentElement</code> deyarli bir xil, bitta nozik farq bilan. \"Ota\" element bo'lmasligi mumkin bo'lgan yagona holat — bu <code>document.documentElement</code> (<code>&lt;html&gt;</code>):" },
        { code: "alert( document.documentElement.parentNode ); // document\nalert( document.documentElement.parentElement ); // null" },
        { p: "Chunki <code>&lt;html&gt;</code>ning otasi — <code>document</code>, lekin <code>document</code> element emas. Shu sababli <code>parentElement</code> bu holda <code>null</code> beradi. Bu farq ba'zan elementdan yuqoriga <code>&lt;html&gt;</code>gacha ko'tarilishda foydali:" },
        { code: "while (elem = elem.parentElement) {\n  // yuqoriga ko'tarilamiz, <html> dan yuqoriga chiqmaymiz\n  alert( elem );\n}" },

        { h2: "Jadvallar bilan navigatsiya" },
        { p: "Ba'zi element turlari qo'shimcha, maxsus navigatsiya xossalarini beradi. Jadvallar bunga eng yaxshi misol — ular juda muhim va tez-tez ishlatiladigan qulayliklarni taqdim etadi." },
        { p: "<code>&lt;table&gt;</code> elementi quyidagilarni qo'llab-quvvatlaydi:" },
        { ul: [
          "<code>table.rows</code> — jadvaldagi barcha <code>&lt;tr&gt;</code>lar to'plami;",
          "<code>table.caption / table.tHead / table.tFoot</code> — mos ravishda <code>&lt;caption&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tfoot&gt;</code> elementlariga havola;",
          "<code>table.tBodies</code> — <code>&lt;tbody&gt;</code>lar to'plami (spetsifikatsiyaga ko'ra kamida bittasi bo'ladi)."
        ] },
        { p: "<code>&lt;thead&gt;</code>, <code>&lt;tfoot&gt;</code>, <code>&lt;tbody&gt;</code> elementlari <code>rows</code> xossasini beradi:" },
        { ul: [
          "<code>tbody.rows</code> — ichidagi <code>&lt;tr&gt;</code>lar to'plami."
        ] },
        { p: "<code>&lt;tr&gt;</code> (qator) uchun:" },
        { ul: [
          "<code>tr.cells</code> — berilgan qatordagi <code>&lt;td&gt;</code> va <code>&lt;th&gt;</code> kataklari to'plami;",
          "<code>tr.sectionRowIndex</code> — qatorning o'z <code>&lt;thead&gt;/&lt;tbody&gt;/&lt;tfoot&gt;</code> ichidagi tartib raqami;",
          "<code>tr.rowIndex</code> — qatorning butun <code>&lt;table&gt;</code> ichidagi tartib raqami."
        ] },
        { p: "<code>&lt;td&gt;</code> va <code>&lt;th&gt;</code> (katak) uchun:" },
        { ul: [
          "<code>td.cellIndex</code> — katakning o'z <code>&lt;tr&gt;</code>si ichidagi tartib raqami."
        ] },
        { p: "Misol — jadvalning ikkinchi qatoridagi birinchi katak mazmunini o'qiymiz:" },
        { code: "<table id=\"table\">\n  <tr>\n    <td>bir</td><td>ikki</td>\n  </tr>\n  <tr>\n    <td>uch</td><td>to'rt</td>\n  </tr>\n</table>\n\n<script>\n  // 'uch' matnini oladi (2-qator, 1-katak)\n  let td = table.rows[1].cells[0];\n  alert( td.textContent ); // uch\n</script>" },
        { tip: "Bu maxsus jadval xossalari <code>childNodes</code> orqali qo'lda o'tishdan ancha qulay va ishonchli. Chunki brauzer avtomatik qo'shgan <code>&lt;tbody&gt;</code> kabi nozikliklarni ular o'zi hisobga oladi." },
        { note: "Boshqa elementlar uchun ham maxsus navigatsiya xossalari bor: masalan, formalar (<code>&lt;form&gt;</code>) va ularning elementlari. Ular bilan formalarga bag'ishlangan bo'limda tanishamiz." },

        { h2: "Xulosa" },
        { ul: [
          "Berilgan tugundan biz uning bevosita qo'shnilari va bolalariga o'ta olamiz;",
          "Ikki xil to'plam bor: <strong>barcha tugunlar uchun</strong> (<code>childNodes</code>, <code>firstChild</code>, <code>lastChild</code>, <code>nextSibling</code>, <code>previousSibling</code>, <code>parentNode</code>) va <strong>faqat elementlar uchun</strong> (<code>children</code>, <code>firstElementChild</code>, <code>lastElementChild</code>, <code>nextElementSibling</code>, <code>previousElementSibling</code>, <code>parentElement</code>);",
          "DOM to'plamlari massivga o'xshash, iteratsiyalanuvchi (<code>for..of</code>), aksariyati jonli (live) va faqat o'qish uchun;",
          "Jadvallar kabi ba'zi elementlar qo'shimcha navigatsiya xossalarini beradi (<code>rows</code>, <code>cells</code> va h.k.)."
        ] }
      ]
    },

    {
      slug: "dom-qidirish",
      title: "Elementlarni qidirish: getElement*, querySelector*",
      blurb: "getElementById, querySelector va querySelectorAll, getElementsByTagName/ClassName, matches, closest, contains hamda jonli va statik to'plamlar farqi.",
      body: [
        { lead: "DOM navigatsiyasi xossalari qo'shni tugunlar bir-biriga yaqin joylashganda juda qulay. Ammo elementlar bir-biridan uzoqda bo'lsa-chi? Sahifadagi istalgan elementni uning DOM'dagi o'rniga bog'liq bo'lmagan holda topish uchun maxsus qidiruv metodlari bor. Ushbu darsda ularni chuqur o'rganamiz." },

        { h2: "document.getElementById yoki id" },
        { p: "Agar elementning <code>id</code> atributi bo'lsa, uni <code>document.getElementById(id)</code> orqali topamiz, u qayerda bo'lishidan qat'i nazar:" },
        { code: "<div id=\"elem\">\n  <div id=\"elem-content\">Element</div>\n</div>\n\n<script>\n  let elem = document.getElementById('elem');\n  elem.style.background = 'red';\n</script>" },
        { p: "Bundan tashqari, <code>id</code>ga ega global o'zgaruvchi avtomatik yaratiladi — uning nomi <code>id</code> qiymatiga teng bo'ladi:" },
        { code: "<div id=\"elem\"></div>\n\n<script>\n  // elem — id=\"elem\" bo'lgan elementga havola\n  alert(elem); // <div id=\"elem\">\n\n  // window.elem ham shu\n  alert(window.elem === elem); // true\n</script>" },
        { warn: "Bu \"avtomatik global o'zgaruvchi\" xususiyatiga TAYANMANG! U standartda tasvirlangan, ammo asosan orqaga moslik uchun saqlanadi. Brauzer bizning kodimizdagi o'zgaruvchi bilan <code>id</code>ni chalkashtirib yuborishi mumkin. Agar kodda <code>elem</code> nomli o'zgaruvchi e'lon qilsak, u avtomatik global'ni bekor qiladi. Har doim <code>document.getElementById</code>dan foydalanish yaxshi amaliyot." },
        { note: "Nomlar noyob (unique) bo'lishi kerak. Hujjatda faqat bitta element berilgan <code>id</code>ga ega bo'lsin. Agar bir nechta element bir xil <code>id</code>ga ega bo'lsa, qidiruv metodlarining xatti-harakati oldindan aytib bo'lmaydigan bo'ladi." },
        { warn: "<code>getElementById</code> faqat <code>document</code> obyektida chaqiriladi, oddiy elementlarda emas: <code>elem.getElementById(...)</code> mavjud emas!" },

        { h2: "querySelectorAll" },
        { p: "Eng ko'p qirrali metod — <code>elem.querySelectorAll(css)</code>. U berilgan CSS selektorga mos keluvchi <strong>barcha</strong> elementlarni qaytaradi." },
        { code: "<ul>\n  <li>Bu</li>\n  <li>test</li>\n</ul>\n<ul>\n  <li>ancha</li>\n  <li>uzun</li>\n</ul>\n\n<script>\n  // har bir <ul>ning oxirgi <li>sini topamiz\n  let elements = document.querySelectorAll('ul > li:last-child');\n\n  for (let elem of elements) {\n    alert(elem.innerHTML); // 'test', 'uzun'\n  }\n</script>" },
        { p: "Bu metod juda kuchli, chunki har qanday CSS selektorni qo'llash mumkin. Hatto <code>:hover</code> va <code>:active</code> kabi psevdo-klasslar ham qo'llab-quvvatlanadi. Masalan, <code>document.querySelectorAll(':hover')</code> ustiga sichqoncha turgan elementlar to'plamini beradi." },

        { h2: "querySelector" },
        { p: "<code>elem.querySelector(css)</code> chaqiruvi berilgan CSS selektorga mos <strong>birinchi</strong> elementni qaytaradi." },
        { p: "Boshqacha aytganda, natija <code>querySelectorAll(css)[0]</code> bilan bir xil, ammo <code>querySelectorAll</code> barcha elementlarni topib to'plamdan birinchisini olsa, <code>querySelector</code> faqat birinchisini topadi. Shuning uchun u tezroq va yozishda ham qisqaroq:" },
        { code: "let elem = document.querySelector('.my-class'); // birinchi mos element" },

        { h2: "matches" },
        { p: "Oldingi metodlar DOM'da qidirar edi. <code>elem.matches(css)</code> esa hech narsa qidirmaydi. U faqat <code>elem</code> berilgan CSS selektorga mosligini tekshiradi va <code>true</code> yoki <code>false</code> qaytaradi." },
        { p: "Bu qandaydir to'plam (masalan, massiv) ustidan aylanib, kerakli elementlarni filtrlaganda foydali:" },
        { code: "<a href=\"http://example.com/file.zip\">...</a>\n<a href=\"http://ya.ru\">...</a>\n\n<script>\n  // faqat href oxiri zip bilan tugaydigan havolalar\n  for (let elem of document.querySelectorAll('a')) {\n    if (elem.matches('a[href$=\".zip\"]')) {\n      alert('Arxivga havola: ' + elem.href);\n    }\n  }\n</script>" },

        { h2: "closest" },
        { p: "Elementning <strong>ajdodlari</strong> (ancestors) — bu uning otasi, otasining otasi, uning otasi va hokazo. Ajdodlar birgalikda yuqoriga, ildizgacha bo'lgan zanjirni tashkil qiladi." },
        { p: "<code>elem.closest(css)</code> metodi berilgan CSS selektorga mos keluvchi eng yaqin ajdodni qidiradi. <code>elem</code>ning o'zi ham qidiruvga kiritiladi." },
        { p: "Boshqacha aytganda, <code>closest</code> elementning o'zidan boshlab yuqoriga ko'tarilib boradi va har bir ajdodni selektorga tekshiradi. Mos kelgani topilsa, qidiruv to'xtaydi va shu ajdod qaytariladi:" },
        { code: "<h1>Sarlavha</h1>\n<div class=\"contents\">\n  <ul class=\"book\">\n    <li class=\"chapter\">Bob 1</li>\n    <li class=\"chapter\">Bob 2</li>\n  </ul>\n</div>\n\n<script>\n  let chapter = document.querySelector('.chapter'); // LI\n\n  alert(chapter.closest('.book')); // UL\n  alert(chapter.closest('.contents')); // DIV\n\n  alert(chapter.closest('h1')); // null (h1 ajdod emas)\n</script>" },
        { tip: "<code>closest</code> hodisalarni qayta ishlashda (event delegation) juda ko'p ishlatiladi: bosilgan element atrofidagi kerakli \"o'rovchi\" (wrapper) elementni topish uchun ideal vosita." },

        { h2: "getElementsBy* metodlari" },
        { p: "Elementlarni teg, klass va boshqalar bo'yicha qidiruvchi eski metodlar ham bor. Bugun ular asosan <code>querySelector</code> foydasiga o'z ahamiyatini yo'qotmoqda, ammo eski kodlarda hali ko'p uchraydi:" },
        { ul: [
          "<code>elem.getElementsByTagName(tag)</code> — berilgan tegli elementlarni qidiradi va to'plam qaytaradi. <code>tag</code> o'rniga <code>\"*\"</code> berilsa, \"barcha teglar\" degani;",
          "<code>elem.getElementsByClassName(className)</code> — berilgan klassga ega elementlar to'plami;",
          "<code>document.getElementsByName(name)</code> — hujjat bo'yicha berilgan <code>name</code> atributiga ega elementlar to'plami (kamdan-kam ishlatiladi)."
        ] },
        { code: "// hujjatdagi barcha <div>lar\nlet divs = document.getElementsByTagName('div');\n\n// jadvaldagi barcha input'larning qiymatini oling\nlet inputs = table.getElementsByTagName('input');\nfor (let input of inputs) {\n  alert( input.value );\n}" },
        { warn: "Metod nomida <strong>\"s\"</strong> harfiga e'tibor bering! Yangi boshlovchilar ba'zan xato qiladi: <code>getElementByTagName</code> (bittalik) — mavjud emas! To'g'ri nomi <code>getElementsByTagName</code> (ko'plik, chunki bir nechta element qaytaradi). Aksincha, <code>getElementById</code> bitta element qaytargani uchun \"s\"siz yoziladi." },
        { warn: "Ba'zilar <code>getElementsByTagName</code> to'plam qaytarishini unutib, uni to'g'ridan-to'g'ri element deb ishlatadi: <code>document.getElementsByTagName('input').value</code> ishlamaydi! To'g'risi — element indeksini olish: <code>document.getElementsByTagName('input')[0].value</code>." },

        { h2: "Jonli (live) va statik to'plamlar" },
        { p: "Bu yerda muhim farq bor:" },
        { ul: [
          "Barcha <code>getElementsBy*</code> metodlari <strong>jonli</strong> (live) to'plam qaytaradi. Bunday to'plamlar hujjatning joriy holatini har doim aks ettiradi va o'zgarishlarda avtomatik yangilanadi;",
          "Aksincha, <code>querySelectorAll</code> <strong>statik</strong> to'plam qaytaradi. Bu \"muzlatib qo'yilgan\" massiv kabi — chaqiruv paytidagi holatni saqlaydi va keyingi o'zgarishlar unga ta'sir qilmaydi."
        ] },
        { code: "// jonli to'plam\nlet divs = document.getElementsByTagName('div');\nalert(divs.length); // masalan, 1\n\n// hujjatga yangi <div> qo'shsak...\ndocument.body.append(document.createElement('div'));\n\nalert(divs.length); // 2 (avtomatik yangilandi!)" },
        { code: "// statik to'plam\nlet divs = document.querySelectorAll('div');\nalert(divs.length); // masalan, 1\n\ndocument.body.append(document.createElement('div'));\n\nalert(divs.length); // hali ham 1 (o'zgarmaydi)" },
        { note: "Bu farqni bilish muhim: agar to'plamni saqlab, keyin DOM'ni o'zgartirsangiz, jonli to'plamda yangi elementlar paydo bo'ladi, statik to'plamda esa yo'q. Ko'p hollarda statik (<code>querySelectorAll</code>) xatti-harakat oldindan aytiluvchan bo'lgani uchun qulayroq." },

        { h2: "elemA.contains(elemB)" },
        { p: "Yana bir foydali metod — <code>elemA.contains(elemB)</code>. U <code>elemB</code> <code>elemA</code> ichida (uning avlodi) yoki <code>elemA === elemB</code> bo'lsa, <code>true</code> qaytaradi:" },
        { code: "// tekshirish: parent element child'ni o'z ichiga oladimi?\nif (parentElem.contains(childElem)) {\n  alert('child parent ichida');\n}" },

        { h2: "Barcha 6 metod umumiy jadval" },
        { p: "Qidiruv metodlarini eslab qolish uchun umumiy ko'rinish:" },
        { ul: [
          "<code>querySelector</code> — CSS-selektor, ilk element, istalgan element ustida ishlaydi;",
          "<code>querySelectorAll</code> — CSS-selektor, statik to'plam;",
          "<code>getElementById</code> — <code>id</code> bo'yicha, faqat <code>document</code>da;",
          "<code>getElementsByName</code> — <code>name</code> bo'yicha, faqat <code>document</code>da, jonli;",
          "<code>getElementsByTagName</code> — teg yoki <code>\"*\"</code> bo'yicha, jonli;",
          "<code>getElementsByClassName</code> — klass bo'yicha, jonli."
        ] },
        { tip: "Amaliyotda 99% hollarda <code>querySelector</code> va <code>querySelectorAll</code> yetarli. Ular eng moslashuvchan va yodda tutish oson. <code>getElementById</code> esa juda tez bo'lgani va oddiyligi tufayli <code>id</code> bo'yicha qidirishda hali ham ommabop." },

        { h2: "Xulosa" },
        { ul: [
          "6 ta asosiy qidiruv metodi bor: <code>querySelector</code>, <code>querySelectorAll</code>, <code>getElementById</code>, <code>getElementsByName</code>, <code>getElementsByTagName</code>, <code>getElementsByClassName</code>;",
          "<code>getElementsBy*</code> jonli (live) to'plam, <code>querySelectorAll</code> esa statik to'plam qaytaradi;",
          "<code>elem.matches(css)</code> — element selektorga mosligini tekshiradi;",
          "<code>elem.closest(css)</code> — selektorga mos eng yaqin ajdodni (o'zini ham) qidiradi;",
          "<code>elemA.contains(elemB)</code> — <code>elemB</code> <code>elemA</code> ichida ekanligini tekshiradi."
        ] }
      ]
    },

    {
      slug: "node-xossalari",
      title: "Node xossalari: tur, teg va tarkib",
      blurb: "DOM tugun sinflari ierarxiyasi, nodeType, nodeName va tagName, innerHTML va outerHTML, nodeValue/textContent hamda hidden xossasi.",
      body: [
        { lead: "Endi DOM tugunlarini chuqurroq o'rganamiz. Ular turli sinflarga tegishli bo'lib, har biri o'z xossalariga ega. Ushbu darsda tugunlarning turini, teg nomini va ichki tarkibini qanday o'qish va yozishni ko'rib chiqamiz — bu DOM bilan har kunlik ishning asosi." },

        { h2: "DOM tugun sinflari" },
        { p: "Turli DOM tugunlari turli xossalarga ega bo'lishi mumkin. Masalan, <code>&lt;a&gt;</code> tegiga mos element tuguni havola bilan bog'liq xossalarga (<code>href</code>), <code>&lt;input&gt;</code> tuguni esa kiritish bilan bog'liq xossalarga (<code>value</code>) ega. Matn tugunlari esa element tugunlaridan farqli. Ammo ular orasida umumiy narsalar ham bor, chunki barcha DOM tugunlari bitta ierarxiyani tashkil etadi." },
        { p: "Har bir DOM tuguni tegishli sinfga tegishli. Ierarxiyaning ildizi — <code>EventTarget</code>. Undan <code>Node</code>, undan esa boshqalari meros oladi:" },
        { ul: [
          "<strong>EventTarget</strong> — abstrakt ildiz sinf. Bu sinf obyektlari hech qachon yaratilmaydi. U barcha tugunlar uchun asos bo'lib xizmat qiladi va hodisalarni (events) qo'llab-quvvatlash imkonini beradi;",
          "<strong>Node</strong> — ham abstrakt sinf, barcha DOM tugunlari uchun asos. U asosiy daraxt funksionalligini beradi: <code>parentNode</code>, <code>nextSibling</code>, <code>childNodes</code> va h.k. (ular getter'lar). <code>Node</code> obyektlari ham hech qachon to'g'ridan-to'g'ri yaratilmaydi. Undan aniq tugun sinflari meros oladi: <code>Text</code>, <code>Element</code>, <code>Comment</code>;",
          "<strong>Element</strong> — DOM elementlari uchun asosiy sinf. U element darajasidagi navigatsiyani (<code>nextElementSibling</code>, <code>children</code>) va qidiruvni (<code>getElementsByTagName</code>, <code>querySelector</code>) beradi. Brauzerdagi elementlar faqat HTML uchun emas — SVG uchun ham. <code>HTMLElement</code> sinfi <code>Element</code>dan meros oladi;",
          "<strong>HTMLElement</strong> — barcha HTML elementlar uchun asosiy sinf. Undan aniq HTML elementlar meros oladi: <code>HTMLInputElement</code> (<code>&lt;input&gt;</code> uchun), <code>HTMLBodyElement</code> (<code>&lt;body&gt;</code> uchun), <code>HTMLAnchorElement</code> (<code>&lt;a&gt;</code> uchun) va h.k."
        ] },
        { p: "Ya'ni, biror aniq tugunning xossa va metodlari to'plami merosning natijasidir. Masalan, <code>&lt;input&gt;</code> uchun DOM obyekti quyidagilardan meros oladi (yuqoridan pastga): <code>HTMLInputElement</code> → <code>HTMLElement</code> → <code>Element</code> → <code>Node</code> → <code>EventTarget</code> → <code>Object</code>." },
        { code: "// input elementining sinfini va merosini ko'ramiz\nlet input = document.body.querySelector('input');\nalert(input.constructor.name); // HTMLInputElement" },
        { note: "Elementning barcha xossa va metodlarini ko'rish uchun uni konsolda <code>console.dir(elem)</code> orqali ko'ring. Yoki spetsifikatsiyalarni o'qing: DOM (dom.spec.whatwg.org) va HTML (html.spec.whatwg.org). Ular murakkab, ammo to'liq." },

        { h2: "nodeType — tugun turi" },
        { p: "<code>nodeType</code> xossasi tugun turini bildiruvchi eski, ammo hali ishlatiladigan usul. U son qiymat qaytaradi:" },
        { ul: [
          "<code>elem.nodeType == 1</code> — element tugunlari uchun;",
          "<code>elem.nodeType == 3</code> — matn tugunlari uchun;",
          "<code>elem.nodeType == 9</code> — <code>document</code> obyekti uchun;",
          "Boshqa qiymatlar ham bor (izohlar uchun 8 va h.k.), ammo bulari eng ko'p uchraydiganlari."
        ] },
        { code: "<body>\n  <script>\n    let elem = document.body;\n\n    // element tuguni ekanligini tekshiramiz\n    alert(elem.nodeType); // 1\n\n    // birinchi bolasi — matn tuguni\n    alert(elem.firstChild.nodeType); // 3\n\n    // document obyekti uchun\n    alert(document.nodeType); // 9\n  </script>\n</body>" },
        { note: "Zamonaviy skriptlarda tugun turini <code>instanceof</code> yoki boshqa sinf-asosli tekshiruvlar orqali aniqlash mumkin. Ammo ba'zan <code>nodeType</code> eng sodda yo'l. Uni faqat o'qishimiz mumkin, o'zgartira olmaymiz." },

        { h2: "nodeName va tagName" },
        { p: "Tugunning teg nomini <code>nodeName</code> yoki <code>tagName</code> orqali o'qishimiz mumkin:" },
        { code: "alert( document.body.nodeName ); // BODY\nalert( document.body.tagName ); // BODY" },
        { p: "Ular orasida farq bormi? Bor, va u nozik:" },
        { ul: [
          "<code>tagName</code> xossasi FAQAT <code>Element</code> tugunlarida mavjud;",
          "<code>nodeName</code> esa har qanday <code>Node</code> uchun aniqlanadi: elementlar uchun u <code>tagName</code> bilan bir xil, boshqa tugun turlari (matn, izoh) uchun esa tugun turini bildiruvchi maxsus satr qaytaradi."
        ] },
        { code: "<body>\n  <!-- izoh -->\n  <script>\n    // izoh uchun\n    alert( document.body.firstChild.nodeName ); // #comment\n\n    // document uchun\n    alert( document.nodeName ); // #document\n  </script>\n</body>" },
        { p: "Boshqacha aytganda, <code>tagName</code> faqat elementlarda ishlaydi (bu mantiqan to'g'ri — faqat elementlarda teg bo'ladi), <code>nodeName</code> esa boshqa tugun turlari uchun ham biror-bir ma'lumot beradi." },
        { warn: "Teg nomi HTML rejimida har doim BOSH harflarda qaytariladi. Brauzer HTML'ni katta-kichik harfga befarq qayta ishlaydi, ammo <code>tagName</code> va <code>nodeName</code> teglarni BOSH harfda beradi: <code>BODY</code>, <code>DIV</code>, <code>INPUT</code> va h.k. (XML rejimida esa asl holicha saqlanadi, ammo bu kamdan-kam uchraydi)." },

        { h2: "innerHTML — tarkib" },
        { p: "<code>innerHTML</code> xossasi elementning ichidagi HTML'ni satr sifatida olish yoki o'rnatish imkonini beradi. Bu eng ko'p ishlatiladigan xossalardan biri:" },
        { code: "<body>\n  <p>Paragraf</p>\n  <div>DIV</div>\n\n  <script>\n    alert( document.body.innerHTML ); // joriy tarkibni o'qiydi\n    document.body.innerHTML = 'Yangi BODY!'; // to'liq almashtiradi\n  </script>\n</body>" },
        { p: "Biz ichiga noto'g'ri (buzuq) HTML kiritsak ham, brauzer uni o'qishda avtomatik tuzatadi:" },
        { code: "document.body.innerHTML = '<b>test'; // yopilmagan teg\nalert( document.body.innerHTML ); // <b>test</b> (avtomatik tuzatildi)" },
        { warn: "Diqqat: <code>innerHTML += ...</code> to'liq qayta yozadi! Bu jumla ichiga qo'shayotgandek ko'rinsa-da, aslida ikki qadamdan iborat: 1) eski tarkib o'chiriladi; 2) eski + yangi mazmun to'liq qayta yaratiladi. Bu esa muhim oqibatlarga ega: barcha rasmlar va boshqa resurslar qayta yuklanadi, oldingi tugunlarga bog'langan hodisa qayta ishlovchilari (event listeners) yo'qoladi, matn belgilangan (selection) bo'lsa — u yo'qoladi." },
        { code: "// masalan, bu barcha rasmlarni qayta yuklaydi (miltillash bo'lishi mumkin):\nchatDiv.innerHTML += '<div>Salom<img src='smile.gif'/> !</div>';\nchatDiv.innerHTML += 'Xayr <img src='goodbye.jpg'/> :)';" },
        { tip: "Element ichiga HTML qo'shishning yaxshiroq yo'llari bor: <code>elem.insertAdjacentHTML</code> yoki <code>append/prepend</code> metodlari. Ular mavjud tarkibni qayta yozmaydi. Bular bilan keyingi darslarda tanishamiz." },

        { h2: "outerHTML — element bilan birga" },
        { p: "<code>outerHTML</code> xossasi elementning to'liq HTML'ini — <strong>elementning o'zini ham</strong> — o'z ichiga oladi. Bu <code>innerHTML</code> ustiga element tegining o'zini qo'shgani bilan farq qiladi:" },
        { code: "<div id=\"elem\">Salom <b>Dunyo</b></div>\n\n<script>\n  alert(elem.outerHTML); // <div id=\"elem\">Salom <b>Dunyo</b></div>\n</script>" },
        { warn: "Muhim tuzoq: <code>outerHTML</code>ga yozish elementni O'ZGARTIRMAYDI, balki uni ALMASHTIRADI! Ya'ni yangi HTML DOM'da eski elementning o'rniga qo'yiladi, ammo bizning eski <code>elem</code> o'zgaruvchisi hali ham eski (endi DOM'da bo'lmagan) elementga ishora qilib qoladi." },
        { code: "<div>Salom, Dunyo!</div>\n\n<script>\n  let div = document.querySelector('div');\n\n  // div.outerHTML'ni <p>...</p> bilan almashtiramiz\n  div.outerHTML = '<p>Yangi element!</p>';\n\n  // Diqqat! div hali ham eski qiymat!\n  alert(div.outerHTML); // <div>Salom, Dunyo!</div> (!)\n  // DOM'da esa endi <p> turibdi\n</script>" },
        { p: "Yuqoridagi kod ko'pchilikni chalkashtiradi. Sabab: <code>div.outerHTML = ...</code> <code>div</code>ni DOM'dan olib tashladi va uning o'rniga yangi HTML qo'ydi. Ammo <code>div</code> o'zgaruvchisi hali ham eski elementga ishora qiladi. Yangi qo'shilgan tugunni olish uchun DOM'dan qayta topish kerak." },

        { h2: "nodeValue va textContent" },
        { p: "<code>innerHTML</code> faqat element tugunlarida ishlaydi. Boshqa tugun turlarida (matn, izoh) tarkibni o'qish uchun ularning \"o'xshashlari\" bor: <code>nodeValue</code> va <code>data</code> xossalari. Ular deyarli bir xil, amaliyotda kichik farqlari bilan:" },
        { code: "<body>\n  Salom\n  <!-- Izoh -->\n  <script>\n    let text = document.body.firstChild;\n    alert(text.data); // Salom\n\n    let comment = text.nextSibling;\n    alert(comment.data); // Izoh\n  </script>\n</body>" },
        { p: "Matn tugunlari uchun ular ma'noli bo'ladi, izohlar uchun ham. Ammo element tugunlari uchun nega bizga ular kerak? Odatda kerak emas — element uchun <code>textContent</code> foydaliroq." },
        { h3: "textContent" },
        { p: "<code>textContent</code> element ichidagi <strong>faqat matnni</strong> beradi — barcha teglar tashlab yuboriladi, faqat matn qoladi:" },
        { code: "<div id=\"news\">\n  <h1>Sarlavha!</h1>\n  <p>Xabar matni.</p>\n</div>\n\n<script>\n  // Sarlavha! Xabar matni. (teglarsiz, faqat matn)\n  alert(news.textContent);\n</script>" },
        { p: "Amaliyotda uni o'qish kamdan-kam kerak, ammo <strong>yozish juda foydali</strong>. Chunki <code>innerHTML</code>ga matn yozsak, u HTML sifatida talqin qilinadi (teglar ishlaydi), <code>textContent</code>ga yozsak esa matn AYNAN matn sifatida qo'yiladi — barcha maxsus belgilar avtomatik xavfsiz \"eskeyp\" qilinadi:" },
        { code: "<div id=\"elem1\"></div>\n<div id=\"elem2\"></div>\n\n<script>\n  let name = prompt('Ismingizni kiriting?', '<b>Salbarchi</b>');\n\n  // innerHTML: teg sifatida qo'yadi (xavfli!)\n  elem1.innerHTML = name; // <b>Salbarchi</b> — qalin\n\n  // textContent: matn sifatida qo'yadi (xavfsiz)\n  elem2.textContent = name; // <b>Salbarchi</b> — matn holicha ko'rinadi\n</script>" },
        { warn: "<code>textContent</code> foydalanuvchi kiritgan matnni chiqarishda XAVFSIZLIK uchun juda muhim! Agar foydalanuvchi <code>&lt;script&gt;...&lt;/script&gt;</code> yoki boshqa xavfli HTML kiritsa, <code>innerHTML</code> uni bajarishi mumkin (XSS hujumi). <code>textContent</code> esa uni oddiy matn deb qabul qiladi va hech qanday teg ishlamaydi." },

        { h2: "hidden xossasi" },
        { p: "<code>hidden</code> atributi va DOM xossasi element ko'rinishmi yoki yashiringanmi ekanligini belgilaydi. Bu texnik jihatdan <code>style=\"display:none\"</code> bilan bir xil ishlaydi, ammo yozishda qulayroq:" },
        { code: "<div>Ikkalasi ham quyida yashiringan</div>\n\n<div hidden>HTML atributi bilan</div>\n\n<div id=\"elem\">JavaScript xossasi bilan</div>\n\n<script>\n  elem.hidden = true; // endi bu div ko'rinmaydi\n</script>" },
        { p: "<code>hidden</code> xossasi bilan biz elementni miltillatib (blinking) ko'rsatishimiz ham mumkin:" },
        { code: "<div id=\"elem\">Miltillovchi element</div>\n\n<script>\n  setInterval(() => elem.hidden = !elem.hidden, 1000);\n</script>" },

        { h2: "Boshqa xossalar" },
        { p: "DOM elementlari yana ko'plab xossalarga ega. Xususan, aniq element sinfiga bog'liq bo'lganlari:" },
        { ul: [
          "<code>value</code> — <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;textarea&gt;</code> uchun (<code>HTMLInputElement</code> va h.k.);",
          "<code>href</code> — <code>&lt;a href=\"...\"&gt;</code> uchun (<code>HTMLAnchorElement</code>);",
          "<code>id</code> — barcha elementlar uchun <code>id</code> atributining qiymati (<code>HTMLElement</code>)."
        ] },
        { code: "<input type=\"text\" id=\"elem\" value=\"qiymat\">\n\n<script>\n  alert(elem.type);  // text\n  alert(elem.id);    // elem\n  alert(elem.value); // qiymat\n</script>" },
        { tip: "Aksariyat standart HTML atributlari mos DOM xossasiga ega, biz ularni o'qiy va o'zgartira olamiz. Xossa va atribut orasidagi nozik farqlarni keyingi \"Atributlar va xossalar\" darsida batafsil ko'ramiz." },

        { h2: "Xulosa" },
        { ul: [
          "Har bir DOM tuguni tegishli sinfga ega. Sinflar ierarxiya tashkil qiladi: <code>EventTarget</code> → <code>Node</code> → <code>Element</code> → <code>HTMLElement</code> → aniq element sinflari;",
          "<code>nodeType</code> — tugun turini son bilan bildiradi (element=1, matn=3, document=9);",
          "<code>tagName</code>/<code>nodeName</code> — teg nomi (BOSH harfda);",
          "<code>innerHTML</code> — element ichidagi HTML (o'qish/yozish);",
          "<code>outerHTML</code> — element o'zi bilan birga HTML (yozish uni almashtiradi);",
          "<code>nodeValue</code>/<code>data</code> — matn va izoh tugunlari tarkibi;",
          "<code>textContent</code> — faqat matn; foydalanuvchi kiritgan matnni xavfsiz chiqarishda muhim;",
          "<code>hidden</code> — elementni yashirish/ko'rsatish."
        ] }
      ]
    },

    {
      slug: "atributlar",
      title: "Atributlar va xossalar",
      blurb: "DOM xossalari va HTML atributlari orasidagi farq, getAttribute/setAttribute/hasAttribute/removeAttribute, xossa-atribut sinxronizatsiyasi hamda data-* atributlar va dataset.",
      body: [
        { lead: "Brauzer HTML sahifasini yuklaganda, teglarni \"o'qib\" (parse qilib), DOM obyektlarini yaratadi. Element tugunlari uchun standart HTML atributlari mos DOM xossalariga aylanadi. Masalan, <code>&lt;body id=\"page\"&gt;</code> uchun DOM obyektida <code>body.id === \"page\"</code> bo'ladi. Ammo bu \"atribut → xossa\" moslashuvi 1-ga-1 emas! Ushbu darsda atribut va xossalar orasidagi nozik, ammo muhim farqlarni chuqur o'rganamiz." },

        { h2: "DOM xossalari" },
        { p: "Biz DOM tugunlari standart JavaScript obyektlari ekanligini ko'rdik. Ular xossalar to'plamiga ega. Va biz ularga o'z xossalarimizni ham qo'shishimiz mumkin — huddi oddiy obyektlarga o'xshab:" },
        { code: "document.body.myData = {\n  name: 'Sezar',\n  title: 'Imperator'\n};\n\nalert(document.body.myData.title); // Imperator\n\n// hatto metod ham qo'shsak bo'ladi\ndocument.body.sayTagName = function() {\n  alert(this.tagName);\n};\n\ndocument.body.sayTagName(); // BODY (this qiymati document.body)" },
        { p: "Prototipni ham o'zgartirishimiz mumkin, masalan barcha elementlarga yangi metod qo'shish uchun:" },
        { code: "Element.prototype.sayHi = function() {\n  alert(`Salom, men ${this.tagName}`);\n};\n\ndocument.documentElement.sayHi(); // Salom, men HTML\ndocument.body.sayHi(); // Salom, men BODY" },
        { p: "Demak, DOM xossalari va metodlari oddiy JavaScript obyektlarinikidek ishlaydi: istalgan qiymat qabul qiladi, katta-kichik harfga sezgir (<code>elem.nodeType</code>, <code>elem.NodeType</code> emas)." },

        { h2: "HTML atributlari" },
        { p: "HTML'da teglar atributlarga ega bo'lishi mumkin. Brauzer HTML'ni o'qiganda <strong>standart</strong> atributlarni tanib, ulardan DOM xossalarini yaratadi." },
        { p: "Ammo elementda <strong>nostandart</strong> (standartda bo'lmagan) atribut bo'lsa, u mos DOM xossasiga aylanmaydi. Masalan:" },
        { code: "<body id=\"test\" something=\"nostandart\">\n  <script>\n    // standart atribut xossaga aylandi\n    alert(document.body.id); // test\n\n    // nostandart atribut — yo'q\n    alert(document.body.something); // undefined\n  </script>\n</body>" },
        { p: "E'tibor bering: bir element uchun standart atribut boshqa element uchun noma'lum bo'lishi mumkin. Masalan, <code>type</code> atributi <code>&lt;input&gt;</code> uchun standart (<code>HTMLInputElement</code>), ammo <code>&lt;body&gt;</code> uchun emas. Standart atributlar aniq element sinfida tasvirlanadi." },
        { p: "Shunda ham, barcha atributlarga (standart va nostandart) DOM metodlari orqali kirishimiz mumkin:" },
        { ul: [
          "<code>elem.hasAttribute(name)</code> — atribut bor-yo'qligini tekshiradi;",
          "<code>elem.getAttribute(name)</code> — atribut qiymatini oladi;",
          "<code>elem.setAttribute(name, value)</code> — atribut qiymatini o'rnatadi;",
          "<code>elem.removeAttribute(name)</code> — atributni o'chiradi;",
          "<code>elem.attributes</code> — barcha atributlar to'plami (<code>Attr</code> sinfidagi obyektlar, <code>name</code> va <code>value</code> xossalari bilan)."
        ] },
        { code: "<body something=\"nostandart\">\n  <script>\n    let body = document.body;\n\n    alert( body.getAttribute('something') ); // nostandart\n    body.setAttribute('test', 123);\n    alert( body.outerHTML ); // <body something=\"nostandart\" test=\"123\">\n\n    // barcha atributlarni aylanamiz\n    for (let attr of body.attributes) {\n      alert( `${attr.name} = ${attr.value}` );\n    }\n  </script>\n</body>" },
        { p: "HTML atributlarining ikkita muhim xususiyati bor:" },
        { ol: [
          "<strong>Nomi katta-kichik harfga sezgir emas</strong>: <code>id</code> va <code>ID</code> bir xil (chunki atributlar HTML'ga tegishli, HTML esa katta-kichik harfga befarq);",
          "<strong>Qiymatlari doim satr (string)</strong>: <code>getAttribute</code> har doim satr qaytaradi, hatto biz son o'rnatgan bo'lsak ham."
        ] },
        { code: "<div id=\"elem\" about=\"Elephant\"></div>\n\n<script>\n  alert( elem.getAttribute('About') ); // Elephant (katta-kichik befarq)\n\n  elem.setAttribute('Test', 123); // son berdik...\n\n  alert( elem.outerHTML ); // <div id=\"elem\" about=\"Elephant\" test=\"123\">\n  // ...ammo satr sifatida saqlandi\n</script>" },

        { h2: "Xossa-atribut sinxronizatsiyasi" },
        { p: "Standart atribut o'zgarsa, mos xossa avtomatik yangilanadi — va (aksariyat hollarda) teskarisi ham. Ular <strong>sinxronlashadi</strong>:" },
        { code: "<input>\n\n<script>\n  let input = document.querySelector('input');\n\n  // atribut => xossa\n  input.setAttribute('id', 'id');\n  alert(input.id); // id (yangilandi)\n\n  // xossa => atribut\n  input.id = 'newId';\n  alert(input.getAttribute('id')); // newId (yangilandi)\n</script>" },
        { p: "Ammo bu sinxronizatsiyaning istisnolari bor. Masalan, <code>input.value</code> faqat atributdan xossaga sinxronlashadi, ammo teskarisiga EMAS:" },
        { code: "<input>\n\n<script>\n  let input = document.querySelector('input');\n\n  // atribut => xossa (ishlaydi)\n  input.setAttribute('value', 'matn');\n  alert(input.value); // matn\n\n  // xossa => atribut (ISHLAMAYDI)\n  input.value = 'yangi';\n  alert(input.getAttribute('value')); // matn (o'zgarmadi!)\n</script>" },
        { note: "Yuqoridagi \"xususiyat\" aslida foydali: foydalanuvchi <code>&lt;input&gt;</code> qiymatini o'zgartirsa (yozsa), <code>value</code> xossasi yangilanadi, ammo <code>value</code> atributi HTML'dagi ASL (dastlabki, default) qiymatni saqlab qoladi. Bu esa \"formani asl holatiga qaytarish\" (reset) kabi vazifalarda qo'l keladi." },

        { h2: "DOM xossalari tur (type) bo'yicha farqlanadi" },
        { p: "DOM xossalari har doim satr emas! Ular turli tiplarda bo'lishi mumkin, atributlar esa har doim satr. Bir necha misol:" },
        { p: "1. <code>input.checked</code> — checkbox uchun — <strong>mantiqiy (boolean)</strong> qiymat:" },
        { code: "<input id=\"input\" type=\"checkbox\" checked>\n\n<script>\n  alert(input.getAttribute('checked')); // atribut: '' (bo'sh satr)\n  alert(input.checked); // xossa: true (boolean)\n</script>" },
        { p: "2. <code>style</code> atributi satr, ammo <code>style</code> xossasi — obyekt:" },
        { code: "<div id=\"div\" style=\"color:red;font-size:120%\">Salom</div>\n\n<script>\n  // atribut — satr\n  alert(div.getAttribute('style')); // color:red;font-size:120%\n\n  // xossa — obyekt\n  alert(div.style); // [object CSSStyleDeclaration]\n  alert(div.style.color); // red\n</script>" },
        { p: "3. Ba'zi hollarda atribut va xossa qiymatlari <strong>farq qiladi</strong>. Masalan, <code>href</code> atributi HTML'da yozilgan qiymatni saqlaydi, <code>href</code> xossasi esa har doim TO'LIQ URL manzilini qaytaradi:" },
        { code: "<a id=\"a\" href=\"#salom\">havola</a>\n\n<script>\n  // atribut: HTML'da yozilgani\n  alert(a.getAttribute('href')); // #salom\n\n  // xossa: to'liq URL\n  alert(a.href); // http://site.com/page#salom (to'liq)\n</script>" },
        { tip: "Agar atributdagi AYNAN yozilgan qiymat kerak bo'lsa — <code>getAttribute</code> ishlating. Agar odatiy, qulay talqin (masalan to'liq URL yoki boolean) kerak bo'lsa — DOM xossasidan foydalaning." },

        { h2: "Nostandart atributlar va dataset" },
        { p: "Ba'zan JavaScript'dan HTML'ga ma'lumot uzatish yoki elementlarni \"belgilash\" uchun nostandart atributlar ishlatiladi. Masalan:" },
        { code: "<div show-info=\"name\"></div>\n<div show-info=\"age\"></div>\n\n<script>\n  // show-info atributi bo'yicha elementlarni topib,\n  // ularga ma'lumot joylaymiz\n  for (let div of document.querySelectorAll('[show-info]')) {\n    let field = div.getAttribute('show-info');\n    div.innerHTML = field; // name yoki age\n  }\n</script>" },
        { warn: "Nostandart atributlarni ishlatish xavfli: bugun ular standart emas, ammo ertaga HTML standartiga qo'shilishi mumkin. Shunda bizning nostandart atributimiz standart atribut bilan to'qnashib, kutilmagan xatti-harakat keltirib chiqaradi. Bunday to'qnashuvlarning oldini olish uchun maxsus yechim bor: <code>data-*</code> atributlar." },
        { h3: "data-* atributlar va dataset" },
        { p: "<code>data-</code> bilan boshlanadigan barcha atributlar dasturchilar foydalanishi uchun ZAXIRALANGAN. Ular <code>elem.dataset</code> obyekti orqali qulay o'qiladi:" },
        { code: "<body data-about=\"Fillar\">\n  <script>\n    // data-about => dataset.about\n    alert(document.body.dataset.about); // Fillar\n  </script>\n</body>" },
        { p: "Bir nechta so'zdan iborat <code>data-order-state</code> kabi atributlar <strong>camelCase</strong> shaklga aylanadi: <code>dataset.orderState</code>:" },
        { code: "<style>\n  .order[data-order-state=\"new\"] { color: green; }\n  .order[data-order-state=\"pending\"] { color: blue; }\n</style>\n\n<div id=\"order\" class=\"order\" data-order-state=\"new\">\n  Yangi buyurtma\n</div>\n\n<script>\n  // o'qish\n  alert(order.dataset.orderState); // new\n\n  // yozish (CSS ham avtomatik yangilanadi!)\n  order.dataset.orderState = 'pending'; // rang ko'kga o'zgaradi\n</script>" },
        { tip: "<code>data-*</code> atributlaridan foydalanish HTML'da maxsus ma'lumot saqlashning to'g'ri va xavfsiz usuli. Ular hech qachon standart HTML atributi bilan to'qnashmaydi (standart hech qachon <code>data-</code> bilan boshlanmaydi). Bundan tashqari, <code>dataset</code> ularni o'qish va yozishni juda qulay qiladi, hamda CSS ham <code>[data-...]</code> selektorlar orqali ular bilan ishlay oladi." },

        { h2: "Xulosa" },
        { p: "Atributlar va xossalar — ikki xil narsa, ularni ajratish muhim:" },
        { ul: [
          "<strong>Atributlar</strong> — HTML'da yozilgani. DOM metodlari orqali boshqariladi: <code>hasAttribute</code>, <code>getAttribute</code>, <code>setAttribute</code>, <code>removeAttribute</code> hamda <code>attributes</code> to'plami;",
          "Atributlar: nomi katta-kichik harfga befarq, qiymati har doim satr;",
          "<strong>Xossalar (properties)</strong> — DOM obyektining maydonlari. Nomi katta-kichik harfga sezgir, qiymati istalgan tur (satr, boolean, obyekt) bo'lishi mumkin;",
          "Standart atribut va mos xossa ko'p hollarda sinxronlashadi (istisnolar bor, masalan <code>value</code>);",
          "Aksariyat hollarda DOM xossalarini ishlatish qulayroq. Atributlarni faqat quyidagi hollarda ishlating: nostandart atribut kerak bo'lganda, yoki AYNAN HTML'dagi qiymatni (masalan, <code>href</code>) olish kerak bo'lganda;",
          "Foydalanuvchi ma'lumotini saqlash uchun <code>data-*</code> atributlaridan foydalaning va ularni <code>elem.dataset</code> orqali o'qing/yozing."
        ] }
      ]
    }
  ]
};
