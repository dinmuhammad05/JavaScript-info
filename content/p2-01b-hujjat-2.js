"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Hujjat (DOM)",
  lessons: [

    // ===================================================================
    // 1-DARS: HUJJATNI O'ZGARTIRISH
    // ===================================================================
    {
      slug: "dom-ozgartirish",
      title: "Hujjatni o'zgartirish",
      blurb: "Yangi elementlarni yaratish (createElement, createTextNode), ularni sahifaga qo'shish (append/prepend/before/after/replaceWith), insertAdjacentHTML, elementni o'chirish, nusxalash (cloneNode), eski usullar va DocumentFragment.",
      body: [
        { lead: "DOM'ni o'zgartirish — bu \"jonli\" sahifalar yaratishning kalitidir. Ushbu darsda biz sahifaga yangi elementlarni qanday yaratish va joylashtirishni, mavjudlarini o'chirish yoki almashtirishni chuqur o'rganamiz. Barcha zamonaviy va eski usullarni birma-bir ko'rib chiqamiz." },

        { note: "DOM bilan bog'liq kod faqat haqiqiy brauzerda ishlaydi. Ushbu kursning interaktiv maydonchasi Node.js muhitida ishlaganligi sababli bu bobdagi barcha misollar <strong>statik</strong> — ularni brauzeringizda o'zingiz sinab ko'rishingiz mumkin. Har bir misolni tushunish uchun kod bilan birga izohlarni diqqat bilan o'qing." },

        { h2: "Misol uchun HTML" },
        { p: "Ushbu darsdagi ko'p misollar quyidagi oddiy HTML tuzilmasi bilan ishlaydi — bu bizga xabar (\"ziravor\", ya'ni yordamchi eslatma) ko'rsatuvchi element yaratish vazifasini bajaradi:" },
        { code: "<style>\n  .alert {\n    padding: 15px;\n    border: 1px solid #d6e9c6;\n    border-radius: 4px;\n    color: #3c763d;\n    background-color: #dff0d8;\n  }\n</style>\n\n<div id=\"div\">\n  <p>Bu sahifada muhim xabar ko'rsatiladi.</p>\n</div>" },

        { h2: "Element yaratish: createElement va createTextNode" },
        { p: "Yangi DOM tugunlarini (node) yaratish uchun ikkita asosiy usul mavjud." },
        { h3: "document.createElement(tag)" },
        { p: "Berilgan teg bilan yangi <strong>element tugunini</strong> (element node) yaratadi:" },
        { code: "let div = document.createElement('div');" },
        { h3: "document.createTextNode(text)" },
        { p: "Berilgan matn bilan yangi <strong>matn tugunini</strong> (text node) yaratadi:" },
        { code: "let textNode = document.createTextNode('Bu yerda matn.');" },
        { p: "Ko'pincha element yaratib, unga to'g'ridan-to'g'ri HTML yoki matn kiritish qulayroq bo'ladi. Masalan, xabar elementini quyidagicha tayyorlaymiz:" },
        { code: "let div = document.createElement('div');\ndiv.className = 'alert';\ndiv.innerHTML = \"<strong>Salom!</strong> Siz muhim xabarni o'qidingiz.\";" },
        { p: "Biz element yaratdik, unga <code>alert</code> klassini berdik va <code>innerHTML</code> orqali ichki HTML'ini to'ldirdik. Ammo bu element hozircha faqat <code>div</code> o'zgaruvchisida turibdi — u hali sahifada emas. Uni sahifaga qo'shishimiz kerak." },
        { note: "Element yaratish va uni hujjatga qo'shish — bu ikki alohida bosqich. Yaratilgan element sahifada ko'rinishi uchun uni DOM daraxtiga joylashtirish shart." },

        { h2: "Kiritish usullari: append, prepend, before, after, replaceWith" },
        { p: "Yaratilgan elementni sahifaga qo'shish uchun zamonaviy usullardan foydalanamiz. Aytaylik, <code>ol</code> ro'yxatimiz bor:" },
        { code: "<ol id=\"ol\">\n  <li>0</li>\n  <li>1</li>\n  <li>2</li>\n</ol>" },
        { p: "Quyidagi usullar keng qamrovga ega bo'lib, bir vaqtning o'zida bir nechta tugunlarni yoki matn qatorlarini qo'sha oladi:" },
        { ul: [
          "<code>node.append(...bolalar)</code> — <code>node</code>ning <strong>oxiriga</strong> (ichiga) qo'shadi;",
          "<code>node.prepend(...bolalar)</code> — <code>node</code>ning <strong>boshiga</strong> (ichiga) qo'shadi;",
          "<code>node.before(...bolalar)</code> — <code>node</code>dan <strong>oldin</strong> qo'shadi;",
          "<code>node.after(...bolalar)</code> — <code>node</code>dan <strong>keyin</strong> qo'shadi;",
          "<code>node.replaceWith(...bolalar)</code> — <code>node</code>ni yangilar bilan <strong>almashtiradi</strong>."
        ] },
        { p: "Quyidagi misol bu usullarning barchasini bir joyda ko'rsatadi:" },
        { code: "let ol = document.getElementById('ol');\n\nol.before('before');   // ol dan oldin 'before' matnini qo'yadi\nol.after('after');     // ol dan keyin 'after' matnini qo'yadi\n\nlet liFirst = document.createElement('li');\nliFirst.innerHTML = 'prepend';\nol.prepend(liFirst);   // ol boshiga liFirst qo'yadi\n\nlet liLast = document.createElement('li');\nliLast.innerHTML = 'append';\nol.append(liLast);     // ol oxiriga liLast qo'yadi" },
        { p: "Natijada sahifa quyidagi tuzilmaga ega bo'ladi:" },
        { code: "before\n<ol id=\"ol\">\n  <li>prepend</li>\n  <li>0</li>\n  <li>1</li>\n  <li>2</li>\n  <li>append</li>\n</ol>\nafter" },
        { p: "Bu usullar bir vaqtning o'zida ixtiyoriy sonli tugun va matn qatorlarini qabul qila oladi. Masalan, matn qatori va element birgalikda:" },
        { code: "let div = document.createElement('div');\nlet p = document.createElement('p');\n\ndiv.append(p, 'salom', document.createElement('hr'));\n// div ichiga: <p>, 'salom' matni va <hr> qo'shildi" },
        { tip: "E'tibor bering: matn qatorlari <strong>matn sifatida</strong> (xavfsiz) kiritiladi, ya'ni <code>&lt;</code> va <code>&gt;</code> belgilar HTML sifatida talqin qilinmaydi, balki ekranga <code>&amp;lt;</code>, <code>&amp;gt;</code> kabi eskeyplangan holda chiqadi. Bu XSS hujumlaridan himoya qiladi." },

        { h2: "insertAdjacentHTML / Text / Element" },
        { p: "Yuqoridagi usullar tugun va matnlarni kiritadi, ammo HTML qatorini <strong>xom holda</strong> (teglar bilan) kiritish uchun <code>insertAdjacentHTML</code> ishlatiladi." },
        { code: "let div = document.getElementById('div');\n\ndiv.insertAdjacentHTML('beforebegin', '<p>Salom</p>');\ndiv.insertAdjacentHTML('afterend', '<p>Xayr</p>');" },
        { p: "Birinchi argument — joylashuv (position) qatori bo'lib, quyidagi to'rt qiymatdan biri bo'lishi mumkin:" },
        { ul: [
          "<code>'beforebegin'</code> — <code>elem</code>dan bevosita <strong>oldin</strong>;",
          "<code>'afterbegin'</code> — <code>elem</code> ichida, <strong>eng boshiga</strong>;",
          "<code>'beforeend'</code> — <code>elem</code> ichida, <strong>eng oxiriga</strong>;",
          "<code>'afterend'</code> — <code>elem</code>dan bevosita <strong>keyin</strong>."
        ] },
        { p: "Ikkinchi argument — kiritiladigan HTML qatori bo'lib, u aynan HTML sifatida talqin qilinadi." },
        { p: "Metodning ikkita \"birodari\" ham mavjud:" },
        { ul: [
          "<code>elem.insertAdjacentText(position, text)</code> — sintaksisi bir xil, lekin argument <strong>matn</strong> bo'lib, xavfsiz (eskeyplab) kiritiladi;",
          "<code>elem.insertAdjacentElement(position, elem)</code> — sintaksisi bir xil, lekin <strong>element tuguni</strong>ni kiritadi."
        ] },
        { p: "Amaliyotda esa deyarli har doim <code>insertAdjacentHTML</code> ishlatiladi. Elementlar va matn uchun yuqorida ko'rilgan <code>append/prepend/before/after</code> qulayroq va o'qilishi osonroq." },
        { note: "<code>insertAdjacentHTML</code> mavjud elementlarni qayta yaratmaydi — u yangi HTML'ni parslash orqali kiritadi. Bu <code>innerHTML +=</code> dan afzalroq, chunki <code>innerHTML +=</code> butun ichki tarkibni o'chirib qayta yaratadi (obyekt havolalari va hodisalar yo'qoladi)." },

        { h2: "Tugunlarni o'chirish: remove" },
        { p: "Tugunni o'chirish uchun eng oddiy zamonaviy usul <code>node.remove()</code>:" },
        { code: "let div = document.getElementById('div');\ndiv.remove(); // div sahifadan olib tashlanadi" },
        { p: "E'tibor bering — agar elementni <strong>boshqa joyga ko'chirmoqchi</strong> bo'lsak, avval uni o'chirishning hojati yo'q. Kiritish usullari (append, before va h.k.) elementni avtomatik ravishda eski o'rnidan olib, yangi o'ringa qo'yadi:" },
        { code: "let first = document.getElementById('first');\nlet second = document.getElementById('second');\n\n// second ni first dan keyinga ko'chiradi:\n// (avval o'chirish shart emas — u eski o'rnidan avtomatik olinadi)\nfirst.after(second);" },
        { p: "Bir xil tugun ikki joyda bir vaqtda tura olmaydi, shuning uchun u har doim eski o'rnidan olib ko'chiriladi." },

        { h2: "Nusxalash: cloneNode" },
        { p: "Bir xil elementdan yana bir nechtasini yaratmoqchi bo'lsak, uni qo'lda qayta yasash o'rniga <strong>nusxalash</strong> qulayroq." },
        { ul: [
          "<code>elem.cloneNode(true)</code> — elementning <strong>\"chuqur\"</strong> nusxasini yaratadi: barcha atributlari va barcha ichki bolalari bilan birga;",
          "<code>elem.cloneNode(false)</code> — <strong>\"sayoz\"</strong> nusxa: element o'zi, atributlari bilan, lekin bolalarsiz."
        ] },
        { code: "let div = document.getElementById('div');\n\nlet div2 = div.cloneNode(true); // chuqur nusxa\ndiv2.querySelector('strong').innerHTML = 'Salom yana!'; // nusxani o'zgartiramiz\n\ndiv.after(div2); // nusxani asl div'dan keyin ko'rsatamiz" },
        { note: "Chuqur nusxa (<code>true</code>) — bir xil ko'rinishdagi elementlarni tez ko'paytirish uchun juda foydali. Masalan, jadval qatorini bir marta yaratib, uni ko'p marta nusxalab qo'shish mumkin." },

        { h2: "Eski maktab usullari" },
        { p: "Tarixiy sabablarga ko'ra DOM'ni o'zgartirishning eski usullari ham mavjud. Ular hozir ham ishlaydi va eski kodlarda tez-tez uchraydi, shuning uchun ularni bilish muhim." },
        { ul: [
          "<code>parent.appendChild(node)</code> — <code>node</code>ni <code>parent</code>ning oxirgi bolasi qilib qo'shadi;",
          "<code>parent.insertBefore(node, nextSibling)</code> — <code>node</code>ni <code>parent</code> ichiga, <code>nextSibling</code>dan oldin qo'shadi;",
          "<code>parent.replaceChild(newElem, oldElem)</code> — <code>oldElem</code>ni <code>newElem</code>ga almashtiradi;",
          "<code>parent.removeChild(node)</code> — <code>node</code>ni <code>parent</code>dan o'chiradi (<code>node</code> <code>parent</code>ning bolasi bo'lishi kerak)."
        ] },
        { p: "Masalan, yangi <code>li</code>ni ro'yxat oxiriga qo'shish:" },
        { code: "let ol = document.getElementById('ol');\n\nlet newLi = document.createElement('li');\nnewLi.innerHTML = 'Salom, dunyo!';\n\nol.appendChild(newLi); // eski usul\n// zamonaviy ekvivalenti: ol.append(newLi);" },
        { p: "<code>insertBefore</code> yordamida ro'yxatning boshiga qo'shish:" },
        { code: "let ol = document.getElementById('ol');\nlet newLi = document.createElement('li');\nnewLi.innerHTML = 'Birinchi!';\n\nol.insertBefore(newLi, ol.firstChild); // eski usul\n// zamonaviy ekvivalenti: ol.prepend(newLi);" },
        { p: "Elementni o'chirish:" },
        { code: "let div = document.getElementById('div');\ndiv.parentNode.removeChild(div); // eski usul\n// zamonaviy ekvivalenti: div.remove();" },
        { warn: "Eski usullar biroz noqulay: masalan, <code>removeChild</code> uchun ota-elementga (<code>parentNode</code>) murojaat qilish kerak, garchi biz allaqachon o'chiriladigan elementni bilsak ham. Zamonaviy usullar (<code>remove</code>, <code>append</code> va h.k.) qisqaroq va tushunarliroq. Yangi kodda ularni ishlatishga harakat qiling." },

        { h2: "DocumentFragment" },
        { p: "<code>DocumentFragment</code> — bu tugunlar ro'yxatini o'z ichiga oluvchi maxsus DOM tugunidir. Uni tugunlar guruhi uchun \"idish\" (o'rovchi) deb tasavvur qilish mumkin. Uni biror joyga kiritganimizda, uning <strong>o'zi emas</strong>, balki ichidagi <strong>bolalari</strong> kiritiladi." },
        { code: "function getListContent() {\n  let fragment = new DocumentFragment();\n\n  for (let i = 1; i <= 3; i++) {\n    let li = document.createElement('li');\n    li.append(i);\n    fragment.append(li);\n  }\n\n  return fragment;\n}\n\nlet ul = document.getElementById('ul');\nul.append(getListContent()); // (*) fragmentning bolalari qo'shiladi" },
        { p: "<code>(*)</code> qatorida biz fragmentni qo'shdik, lekin u \"eriydi\" — natijada <code>ul</code> ichida shunday tuzilma hosil bo'ladi:" },
        { code: "<ul id=\"ul\">\n  <li>1</li>\n  <li>2</li>\n  <li>3</li>\n</ul>" },
        { note: "<code>DocumentFragment</code> kamdan-kam ishlatiladi, chunki uning o'rniga oddiy massiv ham qaytarish mumkin: <code>ul.append(...arrayOfLi)</code>. Biroq fragment ma'lum stsenariylarda, ayniqsa ko'p elementlarni bir marta qo'shishda unumdorlik uchun foydali bo'lishi mumkin." },

        { h2: "Xulosa" },
        { p: "Tugunlar yaratish usullari:" },
        { ul: [
          "<code>document.createElement(tag)</code> — teg bilan element tuguni;",
          "<code>document.createTextNode(text)</code> — matn tuguni;",
          "<code>elem.cloneNode(deep)</code> — elementni nusxalash (<code>deep=true</code> — bolalari bilan)."
        ] },
        { p: "Kiritish va o'chirish (zamonaviy):" },
        { ul: [
          "<code>append</code>, <code>prepend</code>, <code>before</code>, <code>after</code>, <code>replaceWith</code> — tugun va matnlarni kiritish/almashtirish;",
          "<code>remove</code> — tugunni o'chirish;",
          "<code>insertAdjacentHTML/Text/Element</code> — HTML qatori yoki tugunni ma'lum joyga kiritish."
        ] },
        { p: "Eski usullar: <code>appendChild</code>, <code>insertBefore</code>, <code>replaceChild</code>, <code>removeChild</code> — ular hamon ishlaydi, ammo zamonaviy usullar afzalroq. <code>DocumentFragment</code> esa tugunlar guruhini birgalikda kiritish uchun maxsus \"o'rovchi\" vazifasini bajaradi." }
      ]
    },

    // ===================================================================
    // 2-DARS: USLUBLAR VA KLASSLAR
    // ===================================================================
    {
      slug: "style-class",
      title: "Uslublar va klasslar",
      blurb: "className va classList (add/remove/toggle/contains), element.style bilan inline uslublar, cssText, getComputedStyle orqali yakuniy uslublarni o'qish va muhim uslub qoidalari.",
      body: [
        { lead: "Elementga uslub berishning ikki asosiy yo'li bor: CSS klassi qo'shish yoki <code>style</code> orqali to'g'ridan-to'g'ri uslub yozish. Deyarli har doim <strong>klasslar</strong> afzal, <code>style</code> esa faqat klass \"ojiz\" bo'lgan holatlarda ishlatiladi. Ushbu darsda ikkalasini ham chuqur o'rganamiz." },

        { note: "Umumiy qoida: elementga qanday ko'rinishda bo'lishini xohlasangiz — buni <strong>CSS klasslari</strong> orqali qiling, JavaScript esa faqat klasslarni qo'shib-olib turadi. <code>elem.style</code> ni faqat klasslar bilan hal qilib bo'lmaydigan, dinamik hisoblangan qiymatlar uchun ishlating (masalan, koordinatalar)." },

        { h2: "className va classList" },
        { p: "Klasslarni o'zgartirish — dasturlashda eng ko'p uchraydigan amallardan biridir." },
        { h3: "elem.className" },
        { p: "\"class\" atributiga to'liq mos keladi. Unga qiymat berish <strong>butun klasslar qatorini</strong> almashtiradi:" },
        { code: "// <body class=\"main page\">\nlet body = document.body;\nalert(body.className); // main page\n\nbody.className = 'yangi';\n// endi class=\"yangi\", eski klasslar yo'qoldi" },
        { p: "Eslatma: JavaScript'da <code>class</code> — bu zaxiralangan (reserved) kalit so'z, shuning uchun atribut nomi <code>className</code> deb o'zgartirilgan. Agar bittagina klassni almashtirsak yoki qo'shib-olib tursak, <code>className</code> noqulay — buning uchun <code>classList</code> bor." },
        { h3: "elem.classList" },
        { p: "<code>classList</code> — bu klasslarni birma-bir boshqarish uchun maxsus obyekt. Uning metodlari:" },
        { ul: [
          "<code>elem.classList.add('klass')</code> — klass qo'shadi;",
          "<code>elem.classList.remove('klass')</code> — klassni o'chiradi;",
          "<code>elem.classList.toggle('klass')</code> — klass bo'lsa o'chiradi, bo'lmasa qo'shadi;",
          "<code>elem.classList.contains('klass')</code> — klass bor-yo'qligini tekshiradi, <code>true/false</code> qaytaradi."
        ] },
        { code: "// <body class=\"main page\">\nlet body = document.body;\n\nbody.classList.add('article');\n// endi class=\"main page article\"\n\nbody.classList.remove('page');\n// endi class=\"main article\"\n\nalert(body.classList.contains('main')); // true\n\nbody.classList.toggle('active');\n// 'active' yo'q edi, endi qo'shildi" },
        { p: "Bundan tashqari, <code>classList</code> — bu <strong>iteratsiya qilinadigan</strong> (iterable) obyekt, shuning uchun barcha klasslarni <code>for..of</code> bilan aylanib chiqish mumkin:" },
        { code: "// <body class=\"main page\">\nfor (let name of document.body.classList) {\n  alert(name); // avval 'main', keyin 'page'\n}" },
        { tip: "<code>toggle</code>ga ikkinchi argument sifatida mantiqiy qiymat berish mumkin: <code>elem.classList.toggle('klass', force)</code>. Agar <code>force = true</code> bo'lsa — har doim qo'shadi, <code>false</code> bo'lsa — har doim o'chiradi. Bu shartga qarab klassni yoqish/o'chirishda qulay." },

        { h2: "element.style" },
        { p: "<code>elem.style</code> — bu <code>\"style\"</code> atributiga mos keluvchi obyekt bo'lib, uning yordamida <strong>inline</strong> (satr ichidagi) uslublarni o'qish va yozish mumkin. Xususiyat nomi CSS'dan biroz farq qiladi." },
        { p: "Ko'p so'zli CSS xususiyatlari <strong>camelCase</strong> ko'rinishida yoziladi:" },
        { code: "background-color  =>  elem.style.backgroundColor\nz-index           =>  elem.style.zIndex\nborder-left-width =>  elem.style.borderLeftWidth" },
        { code: "let doc = document.documentElement;\ndoc.style.background = 'red'; // <html> foni qizil bo'ladi\n\nlet elem = document.getElementById('elem');\nelem.style.width = '150px';\nelem.style.display = 'none'; // elementni yashiradi" },
        { warn: "Prefiksli xususiyatlar ham camelCase qoidasiga bo'ysunadi. Masalan, <code>-moz-border-radius</code> quyidagicha bo'ladi: <code>elem.style.MozBorderRadius</code> (defis o'rniga bosh harf, birinchi harf ham katta)." },
        { h3: "Xususiyatni tozalash" },
        { p: "Ba'zan biror uslub xususiyatini olib tashlash kerak bo'ladi. Uni yashirish o'rniga, bo'sh qator berib to'liq tozalash mumkin:" },
        { code: "// document.body.style.display = 'none' berilgan bo'lsin\ndocument.body.style.display = ''; // xususiyat o'chiriladi\n// endi element o'zining oddiy CSS holatiga qaytadi" },
        { p: "Agar <code>display</code>ga bo'sh qator bersak, brauzer <code>display</code> uslubini xuddi hech qachon o'rnatilmagandek CSS klasslari bo'yicha qo'llaydi." },

        { h2: "style.cssText bilan to'liq qayta yozish" },
        { p: "Odatda <code>style.*</code> bilan alohida xususiyatlarni beramiz, chunki bu boshqalarini o'chirmaydi. Agar butun uslub qatorini <strong>bir vaqtda</strong> berish kerak bo'lsa, <code>style.cssText</code> ishlatiladi:" },
        { code: "let div = document.getElementById('div');\n\n// bu yerda butun style atributini bir qatorda yozamiz\ndiv.style.cssText = 'color: red !important;\\n                    background-color: yellow;\\n                    width: 100px;\\n                    text-align: center;';" },
        { p: "<code>cssText</code>ga qiymat berish avvalgi barcha inline uslublarni <strong>butunlay almashtiradi</strong>, faqat qo'shmaydi. Shuning uchun undan mavjud muhim uslublarni tasodifan o'chirib yubormaslikka ehtiyot bo'ling." },
        { note: "Xuddi shu natijaga <code>div.setAttribute('style', '...')</code> orqali ham erishish mumkin — u ham butun style atributini almashtiradi." },

        { h2: "O'lchov birliklarini unutmang" },
        { p: "JavaScript'da CSS uslub qiymatlarini o'rnatishda o'lchov <strong>birliklarini</strong> qo'shishni unutmaslik kerak. Masalan, <code>elem.style.top</code>ga <code>'10'</code> berish ishlamaydi — <code>'10px'</code> deyish kerak, aks holda qiymat e'tiborga olinmaydi:" },
        { code: "let elem = document.getElementById('elem');\n\nelem.style.top = 10;    // ISHLAMAYDI! (birlik yo'q)\nelem.style.top = '10px'; // to'g'ri\nelem.style.margin = '20px'; // to'g'ri" },
        { warn: "Bu juda ko'p uchraydigan xato. Brauzer noto'g'ri qiymatni jimgina e'tiborsiz qoldiradi, shuning uchun xato darrov ko'rinmasligi mumkin. Har doim birlik (<code>px</code>, <code>%</code>, <code>em</code> va h.k.) qo'shing." },

        { h2: "getComputedStyle bilan hisoblangan uslublarni o'qish" },
        { p: "<code>style</code> faqat <strong>inline</strong> uslublar bilan ishlaydi. U CSS klasslaridan kelgan uslublarni ko'rmaydi:" },
        { code: "<style> body { color: red; } </style>\n<script>\n  alert(document.body.style.color); // bo'sh! (klassdagi uslub ko'rinmaydi)\n</script>" },
        { p: "Elementga <strong>haqiqatan qo'llanilgan</strong> yakuniy uslubni (CSS + inline + irsiy hisoblab) o'qish uchun <code>getComputedStyle</code> ishlatiladi:" },
        { code: "let computedStyle = getComputedStyle(element, [pseudo]);" },
        { ul: [
          "<code>element</code> — qiymatlari o'qiladigan element;",
          "<code>pseudo</code> — psevdo-element kerak bo'lsa, masalan <code>'::before'</code> (ixtiyoriy)."
        ] },
        { code: "<style> body { color: red; margin: 5px; } </style>\n<script>\n  let computedStyle = getComputedStyle(document.body);\n\n  alert(computedStyle.marginTop); // 5px\n  alert(computedStyle.color);     // rgb(255, 0, 0)\n</script>" },
        { p: "Ikki muhim jihat mavjud:" },
        { ul: [
          "<strong>Hisoblangan (computed)</strong> qiymat — CSS qoidalari va irsiyat qo'llangandan keyingi qiymat, masalan <code>height: 1em</code> yoki <code>font-size: 125%</code>;",
          "<strong>Yechilgan (resolved)</strong> qiymat — nihoyat aniq birlikda qat'iy qilingan qiymat, masalan <code>height: 20px</code>, <code>font-size: 16px</code>. Zamonaviy brauzerlar odatda yechilgan (pikselli) qiymatlarni qaytaradi."
        ] },
        { warn: "<code>getComputedStyle</code>ga <strong>to'liq</strong> (aniq) xususiyat nomi kerak: <code>paddingLeft</code>, <code>marginTop</code>, <code>borderTopWidth</code> kabi. Qisqartma xususiyatlar (masalan, faqat <code>padding</code> yoki <code>margin</code>) turli brauzerlarda noaniq natija berishi mumkin — ulardan qochish tavsiya etiladi." },
        { note: "<code>getComputedStyle</code> qaytargan qiymatlar <strong>faqat o'qish</strong> uchundir — ularni o'zgartirib bo'lmaydi. Element uslubini o'zgartirish uchun <code>elem.style</code> yoki klasslar ishlatiladi." },
        { note: "<code>:visited</code> psevdo-klassidan olingan uslublar (masalan, tashrif buyurilgan havolaning rangi) <code>getComputedStyle</code> orqali <strong>yashiriladi</strong> — bu maxfiylik (privacy) himoyasidir, foydalanuvchi qaysi saytlarga kirganini JavaScript aniqlay olmasin uchun." },

        { h2: "Xulosa" },
        { p: "Klasslarni boshqarish:" },
        { ul: [
          "<code>className</code> — butun klass qatori (string sifatida);",
          "<code>classList</code> — bitta klass bilan ishlash: <code>add</code>, <code>remove</code>, <code>toggle</code>, <code>contains</code>; u iterable."
        ] },
        { p: "Uslublarni boshqarish:" },
        { ul: [
          "<code>elem.style</code> — inline uslublar obyekti (xususiyatlar camelCase);",
          "<code>elem.style.cssText</code> — butun inline uslubni bir qatorda o'qish/yozish;",
          "<code>getComputedStyle(elem)</code> — yakuniy, haqiqatda qo'llangan uslublarni <strong>o'qish</strong> (faqat o'qish uchun)."
        ] },
        { p: "Amaliy maslahat: imkon qadar <strong>klasslar</strong> orqali uslub bering, <code>style</code>ni esa faqat dinamik, hisoblab topiladigan qiymatlar uchun ishlating. O'lchov birliklarini unutmang!" }
      ]
    },

    // ===================================================================
    // 3-DARS: ELEMENT O'LCHAMI VA SKROLL
    // ===================================================================
    {
      slug: "element-olcham",
      title: "Element o'lchami va skroll",
      blurb: "offsetWidth/Height, clientWidth/Height, scrollWidth/Height, scrollTop/Left, offsetParent va getBoundingClientRect qisqacha — elementning geometrik xossalari.",
      body: [
        { lead: "JavaScript bizga elementlarning kengligi, balandligi va boshqa geometrik xossalari haqida ma'lumot beruvchi ko'plab xususiyatlarni taqdim etadi. Ular elementlarni ko'chirish, joylashtirish yoki skroll holatini aniqlashda zarur. Ushbu darsda asosiy geometrik xossalarni chuqur o'rganamiz." },

        { note: "Barcha o'lcham xossalari <strong>sonlar</strong> (piksellarda, birliksiz) qaytaradi. Bu ulardan matematik amallarda foydalanishni osonlashtiradi. Bu geometrik kod faqat brauzerda ishlaydi, shuning uchun quyidagi misollar statik." },

        { h2: "Namuna element" },
        { p: "Xossalarni tushuntirish uchun quyidagi namuna elementdan foydalanamiz. Uning ramkasi (border), otstupi (padding) va skrolli bor:" },
        { code: "<div id=\"example\">\n  ...Matn...\n</div>\n\n<style>\n  #example {\n    width: 300px;\n    height: 200px;\n    border: 25px solid #E8C48F; /* ramka */\n    padding: 20px;              /* ichki otstup */\n    overflow: auto;             /* skroll paydo bo'ladi */\n  }\n</style>" },
        { p: "Bu element ichida skroll paydo bo'lguncha matn bor. Ushbu \"quti modeli\" (box model) asosida geometrik xossalarni ko'rib chiqamiz: ramka, padding va skroll paneli (scrollbar)." },

        { h2: "offsetParent, offsetLeft, offsetTop" },
        { p: "<code>offsetParent</code> — elementning eng yaqin CSS-joylashtirilgan (positioned) ajdodini qaytaradi. Bu quyidagilardan biri bo'lishi mumkin: eng yaqin <code>position</code> (absolute, relative, fixed, sticky) berilgan ajdod, yoki <code>&lt;td&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;table&gt;</code>, yoki <code>&lt;body&gt;</code>." },
        { p: "<code>offsetLeft</code> va <code>offsetTop</code> esa elementning <code>offsetParent</code>ga nisbatan gorizontal va vertikal x/y koordinatalarini beradi:" },
        { code: "<main style=\"position: relative\" id=\"main\">\n  <article>\n    <div id=\"example\" style=\"position: absolute; left: 180px; top: 180px\">...</div>\n  </article>\n</main>\n\n<script>\n  let example = document.getElementById('example');\n\n  alert(example.offsetParent.id); // main\n  alert(example.offsetLeft); // 180 (son, 'px' emas)\n  alert(example.offsetTop);  // 180\n</script>" },
        { note: "<code>offsetParent</code> bir necha holatda <code>null</code> bo'ladi: element ko'rsatilmayotgan bo'lsa (<code>display: none</code> yoki hujjatda emas), yoki <code>&lt;body&gt;</code> va <code>&lt;html&gt;</code> uchun, yoki elementda <code>position: fixed</code> bo'lsa." },

        { h2: "offsetWidth va offsetHeight" },
        { p: "Bu ikki xossa elementning <strong>to'liq tashqi</strong> o'lchamini beradi: kenglik va balandlik, <strong>ramka (border) bilan birga</strong>." },
        { ul: [
          "<code>offsetWidth = content + padding + border</code> (butun ko'rinadigan kenglik);",
          "<code>offsetHeight = content + padding + border</code> (butun ko'rinadigan balandlik)."
        ] },
        { code: "let example = document.getElementById('example');\n\n// width:300 + padding:20*2 + border:25*2 = 390\nalert(example.offsetWidth);  // 390\n\n// height:200 + padding:20*2 + border:25*2 = 290\nalert(example.offsetHeight); // 290" },
        { warn: "Yashirilgan elementlar (<code>display: none</code> yoki hujjatda bo'lmagan) uchun barcha geometrik xossalar <strong>nol</strong> (yoki <code>null</code> — <code>offsetParent</code> uchun) bo'ladi. Buni elementning ko'rinadigan-ko'rinmasligini tekshirish uchun ishlatish mumkin: agar <code>offsetWidth</code> va <code>offsetHeight</code> nol bo'lsa, element yashirin." },

        { h2: "clientTop, clientLeft" },
        { p: "Bu xossalar elementning ramka (border) qalinliklarini beradi — aniqrog'i, ichki tomondan ramka chegarasigacha bo'lgan masofa. Odatda ular yuqori va chap ramka kengligiga teng:" },
        { code: "// yuqorida border: 25px berilgan edi\nalert(example.clientTop);  // 25\nalert(example.clientLeft); // 25" },
        { note: "Aniqrog'i, bular ramka o'lchami emas, balki ichki (content + padding) qismning tashqi qirrasidan elementning tashqi qirrasigacha bo'lgan masofa. Chapdan o'ngga yoziladigan tillar uchun ular chap/yuqori ramka kengligiga teng." },

        { h2: "clientWidth va clientHeight" },
        { p: "Bu xossalar ramka <strong>ichidagi</strong> maydon o'lchamini beradi — ya'ni <strong>content + padding</strong>, lekin skroll paneli (scrollbar) hisobga olinmaydi:" },
        { ul: [
          "<code>clientWidth = content kengligi + chap va o'ng padding</code> (skrollbar chiqmasa);",
          "<code>clientHeight = content balandligi + yuqori va pastki padding</code>."
        ] },
        { code: "let example = document.getElementById('example');\n\n// width:300 + padding:20*2 = 340\n// (border qo'shilmaydi, skrollbar chiqmasa)\nalert(example.clientWidth);  // 340\n\n// height:200 + padding:20*2 = 240\nalert(example.clientHeight); // 240" },
        { warn: "Agar elementda vertikal skroll paneli mavjud bo'lsa, u <code>clientWidth</code>dan o'zining kengligini (odatda ~16px) \"o'g'irlaydi\", chunki skrollbar content uchun mavjud joyni egallaydi. Shuning uchun skrollbar chiqqanda <code>clientWidth</code> kutilganidan kichikroq bo'lishi mumkin." },
        { tip: "Ba'zan <code>clientWidth/Height</code> bo'sh maydonni o'lchash uchun ishlatiladi. <code>offsetWidth</code>dan farqi — u ramkani hisobga olmaydi va skrollbardan tashqari content'ga tegishli maydonni beradi." },

        { h2: "scrollWidth va scrollHeight" },
        { p: "Bu xossalar <code>clientWidth/clientHeight</code> kabidir, ammo skroll tufayli <strong>yashiringan (ko'rinmaydigan) qismni ham hisobga oladi</strong>:" },
        { ul: [
          "<code>scrollWidth</code> — content'ning to'liq ichki kengligi (skrollangan qism bilan);",
          "<code>scrollHeight</code> — content'ning to'liq ichki balandligi (skrollangan qism bilan)."
        ] },
        { code: "let example = document.getElementById('example');\n\n// element ichidagi to'liq content balandligi\nalert(example.scrollHeight); // masalan, 723 (barcha matn)\nalert(example.clientHeight); // 240 (faqat ko'rinadigan qism)" },
        { p: "Bu xossalar yordamida elementni to'liq balandligacha \"kengaytirish\" mumkin — masalan, matn maydonini (textarea) content sig'adigan qilib kattalashtirish:" },
        { code: "let element = document.getElementById('element');\n\n// element balandligini to'liq content sig'adigan qilib kengaytiramiz\nelement.style.height = element.scrollHeight + 'px';" },
        { note: "Agar <code>scrollHeight</code> <code>clientHeight</code>dan katta bo'lsa, demak elementda vertikal skroll bor — content ko'rinadigan maydondan uzun." },

        { h2: "scrollTop va scrollLeft" },
        { p: "<code>scrollLeft</code> va <code>scrollTop</code> — elementning yashiringan, skroll qilib o'tkazilgan qismining kengligi/balandligini beradi. Boshqacha aytganda, <code>scrollTop</code> — bu \"yuqoriga qancha skroll qilinganini\" bildiradi." },
        { code: "let element = document.getElementById('element');\n\nalert(element.scrollTop); // masalan, 150 (150px yuqoriga skroll qilingan)" },
        { p: "Ko'pgina geometrik xossalar <strong>faqat o'qish uchun</strong> bo'lsa-da, <code>scrollTop</code> va <code>scrollLeft</code>ni <strong>o'zgartirish mumkin</strong> — brauzer elementni shu holatga skroll qiladi:" },
        { code: "let element = document.getElementById('element');\n\nelement.scrollTop = 0;   // elementni eng yuqoriga skroll qiladi\nelement.scrollTop = 1e9; // katta son bersak — eng pastga skroll qiladi\n// (brauzer maksimal mumkin bo'lgan qiymatni oladi)" },
        { tip: "<code>scrollTop</code>ga juda katta son (masalan, <code>1e9</code> = milliard) berish — elementni eng pastgacha skroll qilishning ishonchli usuli. Brauzer bu qiymatni maksimal ruxsat etilgan darajaga qisqartiradi." },

        { h2: "getBoundingClientRect — qisqacha" },
        { p: "Yuqoridagi <code>offset*</code>/<code>client*</code>/<code>scroll*</code> xossalari elementning o'z ichki geometriyasi bilan ishlaydi. Elementning <strong>ekrandagi (oyna)</strong> joylashuvini aniq bilish uchun esa <code>getBoundingClientRect()</code> ishlatiladi:" },
        { code: "let example = document.getElementById('example');\nlet rect = example.getBoundingClientRect();\n\nalert(rect.top);    // elementning yuqori qirrasi (oyna tepasidan)\nalert(rect.left);   // elementning chap qirrasi (oyna chapidan)\nalert(rect.width);  // elementning kengligi\nalert(rect.height); // elementning balandligi\nalert(rect.right);  // o'ng qirra (oyna chapidan)\nalert(rect.bottom); // pastki qirra (oyna tepasidan)" },
        { p: "U <code>DOMRect</code> obyektini qaytaradi — bu obyekt elementni o'rab turgan minimal to'rtburchakning oynaga (viewport) nisbatan koordinatalarini o'z ichiga oladi. Bu haqda batafsil \"Koordinatalar\" darsida gaplashamiz." },
        { note: "Muhim farq: <code>offsetTop/Left</code> — <code>offsetParent</code>ga nisbatan, o'zgarmas (skrolldan mustaqil). <code>getBoundingClientRect</code> esa — <strong>oynaga (viewport)</strong> nisbatan, shuning uchun sahifani skroll qilsangiz, uning qiymatlari o'zgaradi." },

        { h2: "Xulosa" },
        { p: "Elementning asosiy geometrik xossalari:" },
        { ul: [
          "<code>offsetParent</code> — eng yaqin joylashtirilgan ajdod (yoki td/th/table/body);",
          "<code>offsetLeft/offsetTop</code> — <code>offsetParent</code> ichidagi x/y koordinata;",
          "<code>offsetWidth/offsetHeight</code> — elementning \"tashqi\" o'lchami (border bilan);",
          "<code>clientTop/clientLeft</code> — ramka qalinliklari (yuqori/chap);",
          "<code>clientWidth/clientHeight</code> — content + padding o'lchami (border va scrollbarsiz);",
          "<code>scrollWidth/scrollHeight</code> — content'ning to'liq o'lchami (yashiringan qismi bilan);",
          "<code>scrollLeft/scrollTop</code> — skroll qilib o'tkazilgan qismning kengligi/balandligi (o'zgartirsa bo'ladi)."
        ] },
        { p: "Barcha xossalar sonlarda (piksel) qaytadi. Ekrandagi joylashuvni aniqlash uchun esa <code>getBoundingClientRect()</code>." }
      ]
    },

    // ===================================================================
    // 4-DARS: OYNA O'LCHAMLARI VA SKROLL
    // ===================================================================
    {
      slug: "oyna-olcham",
      title: "Oyna o'lchamlari va skroll",
      blurb: "document.documentElement orqali oyna (viewport) o'lchamini olish, hujjatning to'liq o'lchami, pageYOffset/scrollY joriy skroll, scrollTo/scrollBy va scrollIntoView bilan skroll boshqarish.",
      body: [
        { lead: "Elementlarnigina emas, butun sahifa (oyna) o'lchamlari va uning skroll holatini ham bilishimiz kerak — masalan, sahifani ma'lum joyga skroll qilish yoki qanchalik skroll qilinganini aniqlash uchun. Ushbu darsda oyna geometriyasini chuqur ko'rib chiqamiz." },

        { warn: "Bu yerda muhim nozik nuqta bor: brauzer oynasi o'lchamlarini olish uchun <code>document.documentElement</code> (ya'ni <code>&lt;html&gt;</code>) ishlatiladi, <code>document.body</code> emas. Sabab — <code>body</code> hujjatning to'liq balandligini emas, faqat content'ini o'lchashi mumkin. Quyidagi kodlar faqat brauzerda ishlaydi (statik misollar)." },

        { h2: "Oyna kengligi/balandligi: clientWidth/clientHeight" },
        { p: "Oynaning (viewport — content ko'rinadigan maydon) kengligi va balandligini olish uchun <code>document.documentElement</code>ning <code>clientWidth</code> va <code>clientHeight</code> xossalari ishlatiladi:" },
        { code: "// oynaning kengligi va balandligi (skrollbardan tashqari)\nalert(document.documentElement.clientWidth);  // masalan, 1024\nalert(document.documentElement.clientHeight); // masalan, 768" },
        { warn: "Diqqat! <code>window.innerWidth</code>/<code>innerHeight</code> ham bor, lekin ular <strong>skroll panelini ham</strong> hisobga oladi. Agar sahifada skrollbar bo'lsa, <code>innerWidth</code> content maydonidan kengroq bo'ladi. Content sig'adigan haqiqiy joyni bilish uchun <code>documentElement.clientWidth</code> aniqroq." },
        { note: "Muhim: <code>&lt;!DOCTYPE HTML&gt;</code> HTML boshida bo'lishi shart. Aks holda geometrik xossalar (masalan, <code>documentElement.clientHeight</code>) noto'g'ri ishlashi mumkin, chunki brauzer eski (quirks) rejimga o'tadi." },

        { h2: "Hujjatning to'liq o'lchami: scrollHeight/scrollWidth" },
        { p: "Nazariy jihatdan hujjatning to'liq balandligini (skroll qilinadigan joy bilan birga) <code>documentElement.scrollHeight</code>dan olsak bo'ladi. Ammo brauzerlar o'rtasidagi nomuvofiqliklar tufayli ishonchli natija olish uchun <strong>bir nechta</strong> xossaning maksimumini olish kerak:" },
        { code: "let scrollHeight = Math.max(\n  document.body.scrollHeight, document.documentElement.scrollHeight,\n  document.body.offsetHeight, document.documentElement.offsetHeight,\n  document.body.clientHeight, document.documentElement.clientHeight\n);\n\nalert('Hujjatning to\\'liq balandligi: ' + scrollHeight + 'px');" },
        { note: "Nega bu murakkab? Chunki turli brauzerlar hujjat balandligini turlicha hisoblaydi. Barcha ehtimoliy qiymatlarning <strong>maksimumini</strong> olish — barcha brauzerlarda ishonchli ishlaydigan universal usul." },

        { h2: "Joriy skroll: pageXOffset / pageYOffset" },
        { p: "Oddiy DOM elementlarining joriy skroll holati <code>elem.scrollTop</code>/<code>scrollLeft</code>da bo'ladi. Butun sahifaning joriy skrolli esa <code>window</code> obyektining maxsus xossalarida turadi:" },
        { ul: [
          "<code>window.pageYOffset</code> — vertikal skroll (yuqoridan qancha o'tkazilgan);",
          "<code>window.pageXOffset</code> — gorizontal skroll (chapdan qancha o'tkazilgan)."
        ] },
        { code: "alert('Joriy vertikal skroll: ' + window.pageYOffset);\nalert('Joriy gorizontal skroll: ' + window.pageXOffset);" },
        { p: "Bularning zamonaviy taxalluslari (alias) ham bor — <code>window.scrollY</code> (= <code>pageYOffset</code>) va <code>window.scrollX</code> (= <code>pageXOffset</code>). Ular bir xil qiymatni beradi:" },
        { code: "alert(window.scrollY); // pageYOffset bilan bir xil\nalert(window.scrollX); // pageXOffset bilan bir xil" },
        { note: "<code>window</code> — global obyekt bo'lgani uchun uni tushirib qoldirib, shunchaki <code>pageYOffset</code>, <code>scrollY</code> deb yozish ham mumkin. Bu xossalar faqat o'qish uchun." },

        { h2: "Skrollni boshqarish: scrollTo va scrollBy" },
        { p: "Sahifani DOM tuzilmasi to'liq yaratilgandan keyin JavaScript orqali skroll qilish mumkin. Ikki asosiy metod bor:" },
        { h3: "window.scrollBy(x, y)" },
        { p: "Sahifani joriy holatiga <strong>nisbatan</strong> (<code>x</code>, <code>y</code>) piksel skroll qiladi — ya'ni surib qo'yadi:" },
        { code: "window.scrollBy(0, 10); // sahifani 10px pastga suradi (joriy holatdan)\nwindow.scrollBy(0, -10); // 10px yuqoriga suradi" },
        { h3: "window.scrollTo(pageX, pageY)" },
        { p: "Sahifani <strong>mutlaq</strong> (absolute) koordinataga skroll qiladi — hujjat boshiga nisbatan aniq joyga o'tadi:" },
        { code: "window.scrollTo(0, 0);     // sahifani eng yuqoriga qaytaradi\nwindow.scrollTo(0, 500);   // hujjat boshidan 500px pastga o'tadi" },
        { p: "Yaqqol taqqoslash: <code>scrollBy</code> — \"joriy o'rindan qancha suramiz\", <code>scrollTo</code> — \"qaysi aniq koordinataga boramiz\"." },
        { tip: "Ikkala metod ham silliq (smooth) skroll uchun obyekt shaklidagi argument qabul qiladi: <code>window.scrollTo({ top: 500, behavior: 'smooth' })</code>. Bu foydalanuvchiga yoqimliroq, animatsiyali skroll beradi." },

        { h2: "scrollIntoView bilan elementga skroll qilish" },
        { p: "<code>elem.scrollIntoView(top)</code> metodi sahifani <code>elem</code> <strong>ko'rinadigan</strong> bo'ladigan darajada skroll qiladi. Bitta mantiqiy argument oladi:" },
        { ul: [
          "<code>elem.scrollIntoView(true)</code> yoki argumentsiz — element oyna <strong>yuqorisida</strong> ko'rinadigan qilib skroll qilinadi (element yuqori qirrasi oyna tepasiga tekislanadi);",
          "<code>elem.scrollIntoView(false)</code> — element oyna <strong>pastida</strong> ko'rinadigan qilib skroll qilinadi (pastki qirra oyna pastiga tekislanadi)."
        ] },
        { code: "let elem = document.getElementById('elem');\n\nelem.scrollIntoView();       // elementni oyna tepasiga keltiradi\nelem.scrollIntoView(false);  // elementni oyna pastiga keltiradi" },
        { p: "Bu metod ham silliq skroll va aniq tekislash uchun obyekt qabul qiladi:" },
        { code: "elem.scrollIntoView({\n  behavior: 'smooth', // silliq animatsiyali skroll\n  block: 'center'     // element vertikal markazga keladi\n});" },
        { note: "<code>scrollIntoView</code> — sahifadagi ma'lum elementga (masalan, izoh yoki bo'limga) foydalanuvchi diqqatini qaratish uchun juda qulay. Aniq koordinatalarni hisoblash shart emas — brauzer o'zi kerakli joyga suradi." },

        { h2: "Skrollni butunlay to'xtatish" },
        { p: "Ba'zan sahifani \"muzlatib\" qo'yish kerak bo'ladi — masalan, ustidan modal oyna (dialog) chiqqanda, orqa fon skroll qilinmasligi uchun. Buning uchun <code>document.body.style.overflow = 'hidden'</code> beriladi:" },
        { code: "// sahifa skrollini to'xtatish:\ndocument.body.style.overflow = 'hidden';\n\n// skrollni qaytarish:\ndocument.body.style.overflow = '';" },
        { warn: "Bu usulning kamchiligi — skrollbar yo'qolganda content biroz \"sakrab\" ketishi mumkin (skrollbar egallagan joy bo'shab qoladi). Buni kompensatsiya qilish uchun body'ga skrollbar kengligiga teng padding qo'shish mumkin, shunda content joyida qoladi." },

        { h2: "Xulosa" },
        { p: "Oyna o'lchamlari:" },
        { ul: [
          "<code>document.documentElement.clientWidth/clientHeight</code> — oyna (viewport) o'lchami, skrollbarsiz;",
          "To'liq hujjat balandligi — bir nechta <code>scrollHeight/offsetHeight/clientHeight</code> qiymatlaridan <code>Math.max</code>."
        ] },
        { p: "Joriy skroll: <code>window.pageYOffset</code>/<code>pageXOffset</code> (yoki <code>scrollY</code>/<code>scrollX</code>) — faqat o'qish uchun." },
        { p: "Skrollni boshqarish:" },
        { ul: [
          "<code>window.scrollBy(x, y)</code> — joriy holatdan nisbatan suradi;",
          "<code>window.scrollTo(x, y)</code> — mutlaq koordinataga o'tadi;",
          "<code>elem.scrollIntoView(top)</code> — elementni ko'rinadigan qiladi."
        ] }
      ]
    },

    // ===================================================================
    // 5-DARS: KOORDINATALAR
    // ===================================================================
    {
      slug: "koordinatalar",
      title: "Koordinatalar",
      blurb: "Ikki koordinata tizimi: oynaga nisbatan (clientX/clientY) va hujjatga nisbatan (pageX/pageY), getBoundingClientRect, elementFromPoint va koordinatalar orqali elementni joylashtirish.",
      body: [
        { lead: "Elementlarni ekranda aniq joyga qo'yish uchun (masalan, tooltip yoki kontekst menyu) ularning koordinatalarini bilishimiz kerak. JavaScript'da <strong>ikkita</strong> asosiy koordinata tizimi bor va ularni chalkashtirmaslik juda muhim. Ushbu darsda ikkalasini ham chuqur o'rganamiz." },

        { h2: "Ikki koordinata tizimi" },
        { p: "Har bir nuqtani (masalan, elementning qirrasini) ikki xil boshlanish nuqtasidan (koordinata boshi) o'lchash mumkin:" },
        { ul: [
          "<strong>Oynaga nisbatan (window / viewport):</strong> boshlanish nuqtasi — oynaning chap-yuqori burchagi. Bularni odatda <code>clientX</code>/<code>clientY</code> deb belgilaymiz. Sahifa skroll qilinganda o'zgaradi;",
          "<strong>Hujjatga nisbatan (document):</strong> boshlanish nuqtasi — hujjatning chap-yuqori burchagi. Bularni <code>pageX</code>/<code>pageY</code> deb belgilaymiz. Sahifa skroll qilinganda o'zgarmaydi."
        ] },
        { note: "Sahifa yuqoriga skroll qilinmagan (eng boshida) bo'lsa, oyna va hujjat koordinatalari <strong>bir xil</strong> bo'ladi. Ammo skroll qilingandan keyin ular farqlanadi: <code>pageY = clientY + skroll_balandligi</code>." },
        { p: "Ular o'rtasidagi bog'liqlik:" },
        { code: "// aniq formula (vertikal uchun):\npageY = clientY + window.pageYOffset;\n\n// gorizontal uchun:\npageX = clientX + window.pageXOffset;" },

        { h2: "Element koordinatalari: getBoundingClientRect" },
        { p: "<code>elem.getBoundingClientRect()</code> metodi elementni o'rab turgan minimal to'rtburchakning <strong>oynaga nisbatan</strong> (window) koordinatalarini <code>DOMRect</code> obyekti sifatida qaytaradi. Uning asosiy xossalari:" },
        { ul: [
          "<code>x</code>/<code>y</code> — to'rtburchak boshining (chap-yuqori burchak) oynaga nisbatan koordinatalari;",
          "<code>width</code>/<code>height</code> — to'rtburchakning kengligi va balandligi (manfiy bo'lishi mumkin);",
          "<code>top</code> — yuqori qirraning Y koordinatasi;",
          "<code>bottom</code> — pastki qirraning Y koordinatasi;",
          "<code>left</code> — chap qirraning X koordinatasi;",
          "<code>right</code> — o'ng qirraning X koordinatasi."
        ] },
        { code: "let elem = document.getElementById('elem');\nlet rect = elem.getBoundingClientRect();\n\nalert('Yuqori (top): ' + rect.top);\nalert('Chap (left): ' + rect.left);\nalert('Kenglik: ' + rect.width);\nalert('Balandlik: ' + rect.height);" },
        { p: "Muhim munosabatlar (odatda):" },
        { ul: [
          "<code>left = x</code>, <code>top = y</code>;",
          "<code>right = x + width</code>;",
          "<code>bottom = y + height</code>."
        ] },
        { warn: "Nega alohida <code>x/y</code> va <code>left/top</code>, ular bir xilku? Chunki <code>width</code>/<code>height</code> <strong>manfiy</strong> bo'lishi mumkin (masalan, o'ngdan chapga yozuvda). U holda <code>x/y</code> — to'rtburchak boshi, ammo <code>left</code> undan kichikroq bo'lishi mumkin. Amalda esa ko'p hollarda ular bir xil." },
        { note: "<code>getBoundingClientRect</code> koordinatalari <strong>oynaga nisbatan</strong>, hujjatga emas. Shuning uchun sahifani skroll qilsangiz, element joyida tursa ham, <code>top</code>/<code>left</code> o'zgaradi. Bu, masalan, <code>position: fixed</code> element qo'yish uchun aynan qulay." },
        { warn: "IE va Edge'ning eski versiyalarida <code>getBoundingClientRect</code> natijasida <code>x</code>/<code>y</code> xossalari bo'lmasligi mumkin edi. Agar shunday holatga duch kelsangiz, <code>left</code>/<code>top</code>dan foydalaning — ular hamma joyda mavjud." },

        { h2: "elementFromPoint(x, y)" },
        { p: "<code>document.elementFromPoint(x, y)</code> metodi berilgan oyna koordinatalaridagi (clientX, clientY) eng ichkarida, ustki qatlamda joylashgan elementni qaytaradi:" },
        { code: "// oyna markazidagi elementni topamiz:\nlet centerX = document.documentElement.clientWidth / 2;\nlet centerY = document.documentElement.clientHeight / 2;\n\nlet elem = document.elementFromPoint(centerX, centerY);\n\nalert(elem.tagName); // shu nuqtadagi element teg nomi\nelem.style.background = 'red'; // uni ajratib ko'rsatamiz" },
        { warn: "Koordinatalar <strong>oynaga nisbatan</strong> berilishi kerak (clientX/clientY), hujjatga emas. Bundan tashqari, oyna tashqarisidagi koordinatalar (manfiy yoki oyna o'lchamidan katta) uchun <code>elementFromPoint</code> <code>null</code> qaytaradi — bunday holatlarni tekshirmasangiz, <code>null.style</code> kabi xatolikka duch kelasiz." },

        { h2: "Koordinatalar orqali joylashtirish: position fixed" },
        { p: "Biror elementni ma'lum bir joyga (masalan, boshqa element yonига tooltip) qo'yish uchun ko'pincha <code>position: fixed</code> va <code>getBoundingClientRect</code> koordinatalari birga ishlatiladi, chunki <code>fixed</code> ham oynaga nisbatan joylashadi:" },
        { code: "function createTipUnder(anchor, html) {\n  let tip = document.createElement('div');\n  tip.style.cssText = 'position: fixed; padding: 5px; background: yellow;';\n  tip.innerHTML = html;\n\n  document.body.append(tip);\n\n  // anchor elementning oynaga nisbatan joyi:\n  let coords = anchor.getBoundingClientRect();\n\n  // tooltip'ni anchor ostiga qo'yamiz:\n  tip.style.left = coords.left + 'px';\n  tip.style.top = coords.bottom + 5 + 'px';\n}" },
        { warn: "<code>position: fixed</code> muammosi — sahifa skroll qilinganda tooltip <strong>joyida qotib qoladi</strong> (anchor bilan birga ketmaydi), chunki fixed oynaga bog'langan. Agar tooltip anchor bilan birga skroll qilinishini istasangiz, hujjat koordinatalari va <code>position: absolute</code> kerak bo'ladi." },

        { h2: "Hujjat koordinatalari: position absolute" },
        { p: "Tooltip sahifa bilan birga skroll qilinishi uchun uni <strong>hujjat koordinatalari</strong> asosida <code>position: absolute</code> bilan joylashtiramiz. Buning uchun oyna koordinatasiga joriy skrollni qo'shamiz:" },
        { code: "// element uchun hujjatga nisbatan koordinatalarni hisoblovchi funksiya\nfunction getCoords(elem) {\n  let box = elem.getBoundingClientRect();\n\n  return {\n    top: box.top + window.pageYOffset,\n    left: box.left + window.pageXOffset,\n    bottom: box.bottom + window.pageYOffset,\n    right: box.right + window.pageXOffset\n  };\n}" },
        { p: "Endi tooltip'ni <code>position: absolute</code> bilan hujjat koordinatalariga qo'ysak, u sahifa bilan birga skroll qilinadi:" },
        { code: "function createTipUnder(anchor, html) {\n  let tip = document.createElement('div');\n  tip.style.cssText = 'position: absolute; padding: 5px; background: yellow;';\n  tip.innerHTML = html;\n\n  document.body.append(tip);\n\n  let coords = getCoords(anchor); // hujjat koordinatalari\n\n  tip.style.left = coords.left + 'px';\n  tip.style.top = coords.bottom + 5 + 'px';\n}" },
        { note: "Xulosaviy tanlov: elementni oynaga bog'lash kerak bo'lsa (skrolldan qat'i nazar joyida qolsin) — <code>position: fixed</code> va oyna koordinatalari (<code>getBoundingClientRect</code>). Elementni sahifa content'iga bog'lash kerak bo'lsa (skroll bilan ketsin) — <code>position: absolute</code> va hujjat koordinatalari (skroll qo'shilgan)." },

        { h2: "Xulosa" },
        { p: "Nuqtaning ikkita koordinatasi bor:" },
        { ul: [
          "<strong>Oynaga (window) nisbatan</strong> — <code>clientX/clientY</code>. Skroll bilan o'zgaradi. <code>position: fixed</code> bilan mos;",
          "<strong>Hujjatga (document) nisbatan</strong> — <code>pageX/pageY</code>. Skroll bilan o'zgarmaydi. <code>position: absolute</code> bilan mos."
        ] },
        { p: "Asosiy vositalar:" },
        { ul: [
          "<code>elem.getBoundingClientRect()</code> — elementning oynaga nisbatan koordinatalari (<code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>, <code>width</code>, <code>height</code>);",
          "<code>document.elementFromPoint(x, y)</code> — oyna koordinatasidagi (client) eng ustki element;",
          "Hujjat koordinatasi = oyna koordinatasi + joriy skroll (<code>pageYOffset</code>/<code>pageXOffset</code>)."
        ] },
        { p: "Ushbu bilimlar bilan siz endi elementlarni ekranда aniq joylashtirishingiz, tooltip va menyular yaratishingiz mumkin. Bu — interaktiv interfeyslar qurishning poydevoridir." }
      ]
    }

  ]
};
