"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Brauzerda ma'lumot saqlash",
  lessons: [
    {
      slug: "cookie",
      title: "Cookie",
      blurb: "document.cookie orqali cookie'larni o'qish va yozish, path/domain/expires/max-age, secure va samesite bayroqlari, httpOnly, cheklovlar va yordamchi funksiyalar.",
      body: [
        { lead: "Cookie'lar — brauzer tomonidan saqlanadigan kichik matnli ma'lumot bo'laklaridir. Ular HTTP protokolining bir qismi bo'lib, aksar hollarda foydalanuvchini <em>tanib olish</em> (autentifikatsiya) uchun ishlatiladi. Cookie odatda server tomonidan <code>Set-Cookie</code> sarlavhasi orqali o'rnatiladi, keyin brauzer har bir so'rovda ularni <code>Cookie</code> sarlavhasida serverga qaytaradi." },

        { h2: "Cookie nima va qanday ishlaydi" },
        { p: "Cookie <code> nom=qiymat</code> ko'rinishidagi juftlik bo'lib, brauzerda saqlanadi. U ma'lum bir domenga bog'langan holda saqlanadi va o'sha domenga yuborilgan har bir HTTP so'rovda avtomatik ravishda serverga qaytariladi. Aynan shu avtomatik qaytish xususiyati cookie'ni sessiyalarni saqlash uchun qulay qiladi." },
        { p: "Odatiy senariy quyidagicha: foydalanuvchi tizimga kiradi, server autentifikatsiya sessiya identifikatorini <code>Set-Cookie</code> sarlavhasi bilan o'rnatadi, keyin brauzer har bir so'rovda o'sha sessiya cookie'sini yuboradi va server foydalanuvchini tanib oladi." },
        { note: "Cookie'lar <strong>brauzerga xos</strong> mexanizmdir. Ularni faqat brauzer muhitida ishlaydigan JavaScript koddan o'qish/yozish mumkin. Node.js yoki playground muhitida <code>document</code> obyekti bo'lmaydi, shu sabab quyidagi misollarni faqat brauzer konsolida sinab ko'ring." },

        { h2: "document.cookie orqali o'qish" },
        { p: "Brauzer JavaScript koddan cookie'ga <code>document.cookie</code> xususiyati orqali kirish mumkin. Uni o'qishimiz barcha cookie'larni bitta satr ko'rinishida beradi, bunda juftliklar <code>; </code> (nuqta-vergul va probel) bilan ajratiladi:" },
        { code: "// Brauzerda:\nlet all = document.cookie;\nconsole.log(all);\n// masalan: \"user=Ali; theme=dark; sessionId=abc123\"" },
        { p: "Ko'rib turganingizdek, <code>document.cookie</code> — bu oddiy obyekt emas, balki maxsus formatdagi satr. Bitta cookie qiymatini olish uchun satrni ajratib olishimiz kerak. Quyida ma'lum nom bo'yicha qiymatni topuvchi funksiya:" },
        { code: "function getCookie(name) {\n  let matches = document.cookie.match(new RegExp(\n    '(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\/+^])/g, '\\\\$1') + '=([^;]*)'\n  ));\n  return matches ? decodeURIComponent(matches[1]) : undefined;\n}\n\n// ishlatish:\nlet user = getCookie('user');\nconsole.log(user); // \"Ali\" (agar mavjud bo'lsa)" },
        { note: "Cookie nomi va qiymatida maxsus belgilar (probel, <code>;</code>, kirill harflar va h.k.) bo'lishi mumkin emas. Shu sabab qiymatni yozishda <code>encodeURIComponent</code>, o'qishda esa <code>decodeURIComponent</code> ishlatiladi." },

        { h2: "document.cookie orqali yozish" },
        { p: "<code>document.cookie</code>ga yozish alohida xususiyatga ega: u <em>o'zgartiruvchi</em> (writable) bo'lsa-da, unga qiymat berish barcha cookie'larni <strong>almashtirmaydi</strong>, balki faqat siz ko'rsatgan bitta cookie'ni o'rnatadi yoki yangilaydi:" },
        { code: "// Brauzerda:\ndocument.cookie = 'user=Ali';\n// endi document.cookie ichida user=Ali paydo bo'ladi,\n// boshqa cookie'lar o'chib ketmaydi" },
        { p: "Qiymatda maxsus belgilar bo'lsa, uni kodlash shart:" },
        { code: "let name = 'user';\nlet value = 'Ali Valiyev'; // probel bor\ndocument.cookie = name + '=' + encodeURIComponent(value);" },
        { warn: "<code>document.cookie = ...</code> texnik jihatdan xususiyat bo'lsa ham, u <em>maxsus aksessor</em> (accessor) sifatida ishlaydi. Har bir yozish faqat bitta cookie'ni ta'sirlaydi — bu odatiy obyekt xususiyatidan farqli xatti-harakat. Butun ro'yxatni bir marta yozib bo'lmaydi." },

        { h2: "path — cookie'ning yo'l ko'lami" },
        { p: "<code>path=/...</code> parametri cookie ko'rinadigan URL yo'lini belgilaydi. Cookie faqat shu yo'l va uning ostki yo'llari uchun brauzerdan serverga yuboriladi:" },
        { code: "document.cookie = 'user=Ali; path=/admin';\n// bu cookie faqat /admin, /admin/panel kabi\n// yo'llarda serverga yuboriladi, /shop'da yuborilmaydi" },
        { p: "Odatda <code>path=/</code> ishlatiladi — bu cookie'ni butun sayt bo'ylab ko'rinadigan qiladi. Agar <code>path</code> ko'rsatilmasa, u joriy sahifaning yo'liga sozlanadi, bu ko'pincha kutilmagan cheklovlarga olib keladi." },
        { tip: "Deyarli har doim <code>path=/</code> qo'ying — shunda cookie saytning barcha sahifalarida ishlaydi." },

        { h2: "domain — cookie qaysi domenda ko'rinadi" },
        { p: "<code>domain</code> parametri cookie qaysi domenda serverga yuborilishini belgilaydi. Standart holatda cookie faqat o'zi o'rnatilgan aniq domenda ko'rinadi va <strong>subdomen'larda ko'rinmaydi</strong>:" },
        { code: "// site.com'da o'rnatilgan cookie standart holatda\n// forum.site.com'da KO'RINMAYDI\ndocument.cookie = 'user=Ali';" },
        { p: "Subdomen'larga ham cookie'ni ulashish uchun asosiy domenni ko'rsatamiz:" },
        { code: "// site.com'da:\ndocument.cookie = 'user=Ali; domain=site.com';\n// endi cookie forum.site.com, shop.site.com'da ham ko'rinadi" },
        { warn: "Xavfsizlik sababli cookie'ni <strong>begona domenga</strong> berib bo'lmaydi. Faqat joriy domen yoki uning yuqori (asosiy) domenini ko'rsatishingiz mumkin. Masalan <code>other.com</code>ni <code>site.com</code>dan o'rnatolmaysiz." },

        { h2: "expires va max-age — amal qilish muddati" },
        { p: "Standart holatda cookie <em>sessiya cookie'si</em> bo'ladi — brauzer yopilganda o'chib ketadi. Cookie'ni uzoqroq saqlash uchun <code>expires</code> yoki <code>max-age</code> ishlatiladi." },
        { h3: "expires — aniq sana" },
        { p: "<code>expires</code> cookie tugash sanasini GMT formatida (<code>toUTCString()</code>) belgilaydi:" },
        { code: "let date = new Date(Date.now() + 86400e3); // +1 kun\ndate = date.toUTCString();\ndocument.cookie = 'user=Ali; expires=' + date + '; path=/';" },
        { p: "O'tmishdagi sanani berish cookie'ni <strong>o'chiradi</strong>:" },
        { code: "// cookie'ni o'chirish:\ndocument.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';" },
        { h3: "max-age — soniyalardagi muddat" },
        { p: "<code>max-age</code> — hozirgi vaqtdan boshlab soniyalarda ifodalangan muddat. U <code>expires</code>ga qulay muqobil:" },
        { code: "// 1 soatga:\ndocument.cookie = 'user=Ali; max-age=3600; path=/';\n\n// darhol o'chirish (0 yoki manfiy qiymat):\ndocument.cookie = 'user=Ali; max-age=0; path=/';" },
        { note: "<code>max-age=0</code> yoki manfiy qiymat cookie'ni zudlik bilan o'chiradi. Cookie'ni o'chirishning eng ishonchli yo'li — uni bo'sh qiymat va o'tgan muddat bilan qayta o'rnatish, bunda <code>path</code> va <code>domain</code> asl o'rnatishdagidek bo'lishi kerak." },

        { h2: "secure va samesite — xavfsizlik bayroqlari" },
        { p: "<code>secure</code> bayrog'i cookie'ni faqat HTTPS ulanishida yuborishga majbur qiladi. Bu cookie'ning shifrlanmagan HTTP orqali oshkor bo'lishining oldini oladi:" },
        { code: "// faqat HTTPS orqali yuboriladi:\ndocument.cookie = 'user=Ali; secure; path=/';" },
        { p: "<code>samesite</code> bayrog'i — CSRF (cross-site request forgery) hujumlaridan himoya qiluvchi muhim mexanizm. U cookie'ning boshqa saytdan kelgan so'rovlarda yuborilishini boshqaradi:" },
        { ul: [
          "<code>samesite=strict</code> — cookie boshqa saytdan kelgan har qanday so'rovda umuman yuborilmaydi. Hatto foydalanuvchi tashqi havoladan saytga kirsa ham, birinchi so'rovda cookie ketmaydi;",
          "<code>samesite=lax</code> — muvozanatli rejim (aksar brauzerlarda standart). Cookie xavfsiz, yuqori darajali navigatsiya so'rovlarida (masalan havolaga bosishda, GET metodida) yuboriladi, ammo tashqi saytdagi POST forma yoki rasm/iframe kabi ichki so'rovlarda yuborilmaydi;",
          "<code>samesite=none</code> — cookie barcha holatlarda yuboriladi. Bu qiymat faqat <code>secure</code> bilan birga ishlaydi."
        ] },
        { code: "document.cookie = 'sessionId=abc123; samesite=strict; secure; path=/';" },
        { tip: "Autentifikatsiya cookie'lari uchun <code>samesite=lax</code> yoki <code>strict</code> va <code>secure</code>ni birga qo'llash tavsiya etiladi — bu CSRF hujumlaridan jiddiy himoya beradi." },

        { h2: "httpOnly — faqat serverdan" },
        { p: "<code>httpOnly</code> bayrog'i — bu <strong>JavaScript orqali emas, faqat server tomonidan</strong> <code>Set-Cookie</code> sarlavhasida o'rnatiladigan xususiyat. U cookie'ga JavaScript koddan (<code>document.cookie</code> orqali) kirishni butunlay taqiqlaydi:" },
        { code: "// Bu server sarlavhasi (JavaScript emas!):\n// Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict\n\n// Brauzerda:\nconsole.log(document.cookie);\n// httpOnly cookie bu yerda KO'RINMAYDI" },
        { warn: "<code>httpOnly</code> XSS (cross-site scripting) hujumlariga qarshi muhim himoya. Agar sahifaga zararli skript kirsa ham, u <code>httpOnly</code> cookie'ni o'g'irlay olmaydi, chunki JavaScript uni umuman o'qiy olmaydi. Sessiya token'larini doim <code>httpOnly</code> qilish tavsiya etiladi." },

        { h2: "Cookie cheklovlari" },
        { p: "Cookie'lar hajm va son jihatidan qattiq cheklangan:" },
        { ul: [
          "Bitta cookie'ning <code>nom=qiymat</code> juftligi taxminan <strong>4 KB</strong>dan oshmasligi kerak;",
          "Bitta domen uchun cookie'lar soni cheklangan (brauzerga qarab ~20-50 ta atrofida);",
          "Cookie har bir HTTP so'rovda serverga yuboriladi — ko'p yoki katta cookie'lar tarmoq trafigini oshiradi;",
          "Cookie faqat matn saqlaydi — obyekt saqlash uchun uni <code>JSON.stringify</code> bilan satrsizlantirish kerak."
        ] },
        { note: "Katta hajmdagi ma'lumotni saqlash uchun cookie mos emas — buning uchun <code>localStorage</code> yoki <code>IndexedDB</code> ancha qulay. Cookie'ning asosiy vazifasi — <em>autentifikatsiya</em>, ya'ni foydalanuvchini serverda tanib olish." },

        { h2: "To'liq yordamchi funksiyalar" },
        { p: "Amalda cookie bilan ishlashni osonlashtirish uchun uchta funksiya to'plami odatda yetarli: o'qish, yozish (parametrlar bilan) va o'chirish." },
        { code: "// O'qish\nfunction getCookie(name) {\n  let matches = document.cookie.match(new RegExp(\n    '(?:^|; )' + name.replace(/([.$?*|{}()\\[\\]\\\\/+^])/g, '\\\\$1') + '=([^;]*)'\n  ));\n  return matches ? decodeURIComponent(matches[1]) : undefined;\n}\n\n// Yozish (options bilan)\nfunction setCookie(name, value, options = {}) {\n  options = {\n    path: '/',\n    ...options\n  };\n\n  if (options.expires instanceof Date) {\n    options.expires = options.expires.toUTCString();\n  }\n\n  let updated = encodeURIComponent(name) + '=' + encodeURIComponent(value);\n\n  for (let key in options) {\n    updated += '; ' + key;\n    let val = options[key];\n    if (val !== true) {\n      updated += '=' + val;\n    }\n  }\n\n  document.cookie = updated;\n}\n\n// O'chirish\nfunction deleteCookie(name) {\n  setCookie(name, '', { 'max-age': -1 });\n}" },
        { code: "// ishlatish:\nsetCookie('user', 'Ali', { 'max-age': 3600, samesite: 'strict' });\nconsole.log(getCookie('user')); // \"Ali\"\ndeleteCookie('user');" },
        { tip: "Cookie'ni o'chirishda o'sha <code>path</code> va <code>domain</code>ni ko'rsatish muhim — aks holda brauzer boshqa cookie'ni nazarda tutayapti deb hisoblab, o'chirmasligi mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "Cookie — brauzerda saqlanadigan kichik matnli juftliklar bo'lib, har bir HTTP so'rovda avtomatik serverga yuboriladi;",
          "<code>document.cookie</code> orqali o'qiladi (satr) va yoziladi (bir vaqtda bitta cookie);",
          "<code>path</code> va <code>domain</code> cookie'ning ko'rinish ko'lamini belgilaydi;",
          "<code>expires</code> yoki <code>max-age</code> amal qilish muddatini beradi; bularsiz cookie sessiya bilan o'chadi;",
          "<code>secure</code>, <code>samesite</code> va <code>httpOnly</code> — xavfsizlik uchun kalit bayroqlar (<code>httpOnly</code> faqat serverdan);",
          "Cookie hajmi ~4 KB, uning asosiy vazifasi — autentifikatsiya, katta ma'lumot uchun <code>localStorage</code> qulayroq."
        ] }
      ]
    },

    {
      slug: "localstorage",
      title: "localStorage va sessionStorage",
      blurb: "Web Storage: setItem/getItem/removeItem/clear metodlari, kalitlar bo'yicha aylanish, obyektlarni JSON orqali saqlash, storage hodisasi va ikkalasining farqi.",
      body: [
        { lead: "<code>localStorage</code> va <code>sessionStorage</code> — brauzerda kalit-qiymat (key/value) ko'rinishida ma'lumot saqlash uchun ob'yektlardir. Ular cookie'dan farqli o'laroq serverga yuborilmaydi, ancha katta hajmga (odatda ~5 MB) ega va foydalanish uchun ancha qulay. Ularni birgalikda <em>Web Storage</em> deb ataladi." },

        { h2: "Web Storage nima" },
        { p: "Ikkala ob'yekt ham bir xil metod va xususiyatlarga ega. Farqi — <em>ma'lumot qancha vaqt saqlanishida</em> va <em>qaysi oynalar orasida ulashilishida</em>:" },
        { ul: [
          "<code>localStorage</code> — ma'lumot brauzer yopilib qayta ochilsa ham saqlanadi. Bitta domenning barcha tab va oynalari orasida ulashiladi;",
          "<code>sessionStorage</code> — ma'lumot faqat joriy brauzer tab'i uchun saqlanadi va tab yopilganda o'chadi. Har bir tab o'z alohida <code>sessionStorage</code>iga ega."
        ] },
        { note: "Web Storage <strong>brauzerga xos</strong>. Node.js yoki playground muhitida <code>localStorage</code> mavjud emas, shu sabab bu misollarni brauzer konsolida sinang." },

        { h2: "Asosiy metodlar" },
        { p: "Web Storage quyidagi metod va xususiyatlarni beradi (misolda <code>localStorage</code>, lekin <code>sessionStorage</code> aynan bir xil):" },
        { ul: [
          "<code>setItem(key, value)</code> — kalit/qiymat juftligini saqlaydi;",
          "<code>getItem(key)</code> — kalit bo'yicha qiymatni oladi;",
          "<code>removeItem(key)</code> — kalit bo'yicha juftlikni o'chiradi;",
          "<code>clear()</code> — barcha juftliklarni o'chiradi;",
          "<code>key(index)</code> — indeks bo'yicha kalit nomini beradi;",
          "<code>length</code> — saqlangan juftliklar soni."
        ] },
        { code: "// Brauzerda:\nlocalStorage.setItem('user', 'Ali');\nconsole.log(localStorage.getItem('user')); // \"Ali\"\n\nlocalStorage.removeItem('user');\nconsole.log(localStorage.getItem('user')); // null\n\nlocalStorage.setItem('a', '1');\nlocalStorage.setItem('b', '2');\nlocalStorage.clear();\nconsole.log(localStorage.length); // 0" },
        { note: "Mavjud bo'lmagan kalit uchun <code>getItem</code> <code>null</code> qaytaradi (cookie'dagi <code>undefined</code>dan farqli)." },

        { h2: "Obyekt kabi murojaat" },
        { p: "Web Storage'ga oddiy obyekt kabi ham murojaat qilish mumkin — nuqta yoki kvadrat qavs orqali:" },
        { code: "// bular ishlaydi, lekin tavsiya etilmaydi:\nlocalStorage.user = 'Ali';\nconsole.log(localStorage.user); // \"Ali\"\ndelete localStorage.user;" },
        { warn: "Obyekt sintaksisi qulay ko'rinsa-da, <strong>metodlardan foydalanish tavsiya etiladi</strong>. Sabab: agar kalit <code>length</code>, <code>setItem</code> kabi ichki nom bilan to'qnashsa, xatti-harakat buziladi. <code>setItem</code>/<code>getItem</code> esa har doim ishonchli ishlaydi." },

        { h2: "Faqat satr saqlanadi" },
        { p: "Web Storage'da <strong>faqat satr (string)</strong> saqlash mumkin. Kalit ham, qiymat ham satr bo'lishi shart. Boshqa turdagi qiymat berilsa, u avtomatik satrga aylantiriladi, bu ko'pincha kutilmagan natija beradi:" },
        { code: "localStorage.setItem('num', 123);\nconsole.log(localStorage.getItem('num')); // \"123\" (satr!)\nconsole.log(typeof localStorage.getItem('num')); // \"string\"\n\nlocalStorage.setItem('obj', { a: 1 });\nconsole.log(localStorage.getItem('obj')); // \"[object Object]\" — buzilgan!" },
        { warn: "Obyektni to'g'ridan-to'g'ri saqlashga urinish <code>[object Object]</code> satriga aylantiradi — ma'lumot yo'qoladi. Obyektlarni doim JSON orqali saqlang (keyingi bo'lim)." },

        { h2: "Obyektlarni JSON orqali saqlash" },
        { p: "Obyekt yoki massiv saqlash uchun ularni <code>JSON.stringify</code> bilan satrga, o'qishda esa <code>JSON.parse</code> bilan qayta obyektga aylantiramiz:" },
        { code: "let user = { name: 'Ali', age: 25, roles: ['admin', 'user'] };\n\n// saqlash:\nlocalStorage.setItem('user', JSON.stringify(user));\n\n// o'qish:\nlet stored = JSON.parse(localStorage.getItem('user'));\nconsole.log(stored.name); // \"Ali\"\nconsole.log(stored.roles[0]); // \"admin\"" },
        { p: "Xavfsiz o'qish uchun <code>null</code> holatini hisobga olgan yordamchi funksiya foydali:" },
        { code: "function saveJSON(key, value) {\n  localStorage.setItem(key, JSON.stringify(value));\n}\n\nfunction loadJSON(key) {\n  let raw = localStorage.getItem(key);\n  return raw === null ? null : JSON.parse(raw);\n}\n\nsaveJSON('settings', { theme: 'dark', lang: 'uz' });\nlet s = loadJSON('settings');\nconsole.log(s.theme); // \"dark\"" },
        { tip: "<code>JSON.parse</code> noto'g'ri formatdagi satr uchun xatolik tashlaydi. Ishonchsiz ma'lumotni o'qishda <code>try...catch</code> ishlatish yoki <code>loadJSON</code>ni himoyalash foydali." },

        { h2: "Kalitlar bo'yicha aylanish" },
        { p: "Web Storage — <em>iterable emas</em>, ya'ni uni to'g'ridan-to'g'ri <code>for..of</code> bilan aylantirib bo'lmaydi. Barcha kalitlarni ko'rish uchun <code>length</code> va <code>key(i)</code> ishlatiladi:" },
        { code: "// barcha juftliklarni chiqarish:\nfor (let i = 0; i < localStorage.length; i++) {\n  let key = localStorage.key(i);\n  console.log(key + ' = ' + localStorage.getItem(key));\n}" },
        { p: "Yoki barcha kalitlarni bir vaqtda olish uchun <code>Object.keys</code> ishlatish mumkin — bu faqat o'z (own) kalitlarni beradi, ichki metodlarni chetlab o'tadi:" },
        { code: "let keys = Object.keys(localStorage);\nfor (let key of keys) {\n  console.log(key + ' = ' + localStorage.getItem(key));\n}" },
        { warn: "<code>for..in</code> tsiklini ishlatmang — u <code>setItem</code>, <code>length</code> kabi ichki maydonlarni ham aylantirib chiqadi. <code>Object.keys</code> yoki <code>key(i)</code> usuli xavfsizroq." },

        { h2: "storage hodisasi" },
        { p: "<code>localStorage</code> yoki <code>sessionStorage</code> o'zgarganda <code>storage</code> hodisasi ishga tushadi. Muhim jihat: bu hodisa <strong>o'zgarishni amalga oshirgan oynada emas, boshqa oynalarda</strong> ishlaydi. Bu bir domenning turli tab'lari orasida ma'lumot almashishga imkon beradi:" },
        { code: "// Brauzerda, bir tab'da:\nwindow.addEventListener('storage', function(event) {\n  console.log('Kalit: ' + event.key);\n  console.log('Eski qiymat: ' + event.oldValue);\n  console.log('Yangi qiymat: ' + event.newValue);\n  console.log('URL: ' + event.url);\n  console.log('Storage: ', event.storageArea);\n});\n\n// boshqa tab'da:\n// localStorage.setItem('user', 'Vali');\n// yuqoridagi handler birinchi tab'da ishga tushadi" },
        { p: "<code>event</code> ob'yektining foydali xususiyatlari:" },
        { ul: [
          "<code>event.key</code> — o'zgargan kalit (<code>clear()</code> chaqirilsa <code>null</code>);",
          "<code>event.oldValue</code> — eski qiymat;",
          "<code>event.newValue</code> — yangi qiymat (o'chirilsa <code>null</code>);",
          "<code>event.url</code> — yangilanish sodir bo'lgan hujjat URL'i;",
          "<code>event.storageArea</code> — o'zgargan storage obyekti (<code>localStorage</code> yoki <code>sessionStorage</code>)."
        ] },
        { tip: "<code>storage</code> hodisasi tab'lar orasida oddiy \"xabar almashish\" mexanizmi sifatida ishlatilishi mumkin: bir tab <code>localStorage</code>ga yozadi, boshqalari hodisa orqali xabar oladi." },

        { h2: "localStorage va sessionStorage farqi" },
        { p: "Ikkalasining amaliy farqlari quyidagicha:" },
        { ul: [
          "<strong>Umr ko'rish</strong>: <code>localStorage</code> — brauzer yopilib qayta ochilsa ham saqlanadi; <code>sessionStorage</code> — tab yopilganda o'chadi;",
          "<strong>Ulashish ko'lami</strong>: <code>localStorage</code> — bir domenning barcha tab/oynalari orasida ulashiladi; <code>sessionStorage</code> — faqat bitta tab ichida (hatto ayni domenning ikkinchi tab'i alohida <code>sessionStorage</code>iga ega);",
          "<strong>Sahifa yangilanishi</strong>: <code>sessionStorage</code> sahifa yangilanganda (F5) saqlanadi, lekin yangi tab ochilganda yo'q;",
          "<strong>storage hodisasi</strong>: har ikkalasi ham hodisa chiqaradi, lekin <code>sessionStorage</code> alohida tab'ga tegishli bo'lgani uchun uning hodisasi kamroq foyda beradi."
        ] },
        { note: "Doimiy sozlamalar (masalan interfeys mavzusi) uchun <code>localStorage</code>, vaqtinchalik forma holatini bitta tab uchun saqlashda esa <code>sessionStorage</code> mos keladi." },

        { h2: "Cheklovlar" },
        { ul: [
          "Hajm odatda ~5 MB (brauzerga qarab o'zgaradi) — cookie'dan ancha katta;",
          "Faqat satr saqlanadi — obyektlar uchun JSON kerak;",
          "Sinxron API — juda katta ma'lumotni yozish/o'qish interfeysni sekinlashtiradi;",
          "Ma'lumot serverga yuborilmaydi (bu ko'pincha afzallik);",
          "Yashirin (private/incognito) rejimda ma'lumot tab yopilganda o'chishi mumkin."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "Web Storage — brauzerda kalit-qiymat saqlashning oddiy va katta hajmli usuli (~5 MB);",
          "<code>setItem</code>/<code>getItem</code>/<code>removeItem</code>/<code>clear</code> asosiy metodlar; <code>key(i)</code> va <code>length</code> aylanish uchun;",
          "Faqat satr saqlanadi — obyektni <code>JSON.stringify</code>/<code>JSON.parse</code> bilan o'ramoq kerak;",
          "Aylanish uchun <code>Object.keys</code> yoki <code>key(i)</code> ishlating, <code>for..in</code>dan qoching;",
          "<code>storage</code> hodisasi o'zgarishlarni boshqa tab'larga xabar qiladi;",
          "<code>localStorage</code> — barqaror va tab'lar orasida ulashiladi; <code>sessionStorage</code> — vaqtinchalik va bitta tab uchun."
        ] }
      ]
    },

    {
      slug: "indexeddb",
      title: "IndexedDB",
      blurb: "Brauzerdagi kuchli ma'lumotlar bazasi: obyekt ombori, versiyalar, transaksiyalar, qo'shish/o'qish, indekslar, promise o'ramchisi va uni qachon ishlatish.",
      body: [
        { lead: "<code>IndexedDB</code> — brauzer ichiga o'rnatilgan kuchli ma'lumotlar bazasi. U <code>localStorage</code>dan ancha kuchliroq: katta hajmli ma'lumot saqlaydi, murakkab so'rovlar va indekslarni qo'llab-quvvatlaydi, hamda deyarli har qanday turdagi qiymatni (obyektlar, fayllar, <code>Blob</code>lar) saqlay oladi. U tranzaksiyalar asosida ishlaydi va katta oflayn ilovalar uchun mo'ljallangan." },

        { h2: "IndexedDB nima uchun kerak" },
        { p: "<code>localStorage</code> oddiy, ammo cheklangan: faqat satr saqlaydi, ~5 MB bilan chegaralangan va sinxron. <code>IndexedDB</code> esa quyidagilarni beradi:" },
        { ul: [
          "Katta hajmli saqlash (yuzlab megabayt yoki undan ko'p);",
          "Deyarli har qanday tur — obyektlar, massivlar, <code>Blob</code>, <code>File</code>, hattoki <code>Date</code>;",
          "Kalit bo'yicha tez qidiruv va <em>indekslar</em> orqali boshqa maydonlar bo'yicha qidiruv;",
          "Tranzaksiyalar — ma'lumot izchilligini kafolatlaydi;",
          "Asinxron API — interfeys qotib qolmaydi."
        ] },
        { note: "IndexedDB <strong>brauzerga xos</strong> va asinxron. Node.js/playground muhitida <code>indexedDB</code> ob'yekti mavjud emas — quyidagi barcha misollar faqat brauzerda ishlaydi." },

        { h2: "Bazani ochish va versiya" },
        { p: "Ish <code>indexedDB.open(nom, versiya)</code> bilan boshlanadi. U bazani ochadi (yo'q bo'lsa yaratadi) va so'rov (request) obyektini qaytaradi:" },
        { code: "// Brauzerda:\nlet openRequest = indexedDB.open('shop', 1);\n\nopenRequest.onsuccess = function() {\n  let db = openRequest.result;\n  console.log('Baza ochildi:', db.name);\n};\n\nopenRequest.onerror = function() {\n  console.error('Xato:', openRequest.error);\n};" },
        { p: "Ikkinchi argument — <strong>versiya raqami</strong> (musbat butun son). Sxema (obyekt omborlari, indekslar) faqat versiya oshirilganda o'zgartiriladi. Versiya oshirilganda <code>upgradeneeded</code> hodisasi ishga tushadi — sxemani aynan shu yerda quramiz:" },
        { code: "let openRequest = indexedDB.open('shop', 1);\n\nopenRequest.onupgradeneeded = function() {\n  let db = openRequest.result;\n  // sxema o'zgarishlari shu yerda:\n  if (!db.objectStoreNames.contains('books')) {\n    db.createObjectStore('books', { keyPath: 'id' });\n  }\n};" },
        { warn: "Sxemani o'zgartirish (obyekt ombori yoki indeks yaratish) <strong>faqat <code>upgradeneeded</code> ichida</strong> mumkin. Oddiy <code>onsuccess</code> ichida buni qilib bo'lmaydi. Sxema o'zgarganda versiya raqamini oshirishingiz kerak." },

        { h2: "Obyekt ombori (object store)" },
        { p: "<em>Obyekt ombori</em> — IndexedDB'da ma'lumot saqlanadigan asosiy tuzilma, xuddi SQL'dagi \"jadval\"ga o'xshaydi. U kalit bo'yicha qiymatlarni saqlaydi. Har bir omborda kalit qanday aniqlanishini belgilaymiz:" },
        { code: "openRequest.onupgradeneeded = function() {\n  let db = openRequest.result;\n\n  // keyPath: obyektning maydoni kalit bo'ladi\n  db.createObjectStore('books', { keyPath: 'id' });\n\n  // yoki avtomatik oshib boruvchi kalit:\n  // db.createObjectStore('logs', { autoIncrement: true });\n};" },
        { ul: [
          "<code>keyPath</code> — saqlanadigan obyektning qaysi maydoni kalit bo'lishini ko'rsatadi (masalan <code>'id'</code>);",
          "<code>autoIncrement: true</code> — har bir yozuvga avtomatik oshib boradigan raqam kalit sifatida beriladi;",
          "Ikkalasini ham ko'rsatmasa, kalit har <code>put/add</code>da alohida beriladi."
        ] },
        { note: "Kalit — noyob bo'lishi kerak. Bir xil kalitli obyektni <code>put</code> bilan saqlash mavjudini almashtiradi, <code>add</code> bilan esa xatolik beradi." },

        { h2: "Tranzaksiya (transaction)" },
        { p: "IndexedDB'da <strong>har qanday</strong> o'qish yoki yozish tranzaksiya ichida bajariladi. Tranzaksiya — bu bir yoki bir nechta amalni <em>atomar</em> (butun holda muvaffaqiyatli yoki butun holda bekor) bajaruvchi guruh. <code>db.transaction(omborlar, rejim)</code> bilan yaratiladi:" },
        { code: "// faqat o'qish uchun:\nlet tx = db.transaction('books', 'readonly');\n\n// o'qish va yozish uchun:\nlet tx = db.transaction('books', 'readwrite');\n\n// omborni olamiz:\nlet store = tx.objectStore('books');" },
        { ul: [
          "<code>'readonly'</code> — faqat o'qish (standart). Bir vaqtda ko'p o'qish tranzaksiyalari parallel ishlashi mumkin;",
          "<code>'readwrite'</code> — o'qish va yozish. Bir ombor uchun bir vaqtda faqat bitta yozish tranzaksiyasi ishlaydi."
        ] },
        { code: "// tranzaksiya tugashini kuzatish:\ntx.oncomplete = function() {\n  console.log('Tranzaksiya tugadi');\n};\ntx.onabort = function() {\n  console.log('Tranzaksiya bekor qilindi:', tx.error);\n};" },
        { tip: "<code>readwrite</code>ni faqat kerak bo'lganda ishlating. Ortiqcha <code>readwrite</code> tranzaksiyalar boshqa yozishlarni bloklab, ilovani sekinlashtiradi." },

        { h2: "Qo'shish va o'qish" },
        { p: "Ombor obyektini olganimizdan so'ng, unga <code>add</code>/<code>put</code> bilan yozamiz va <code>get</code> bilan o'qiymiz. Har bir amal so'rov (request) qaytaradi:" },
        { code: "let tx = db.transaction('books', 'readwrite');\nlet store = tx.objectStore('books');\n\nlet book = { id: 1, title: 'JavaScript', price: 100 };\n\nlet request = store.add(book);\n\nrequest.onsuccess = function() {\n  console.log('Qo\\'shildi, kalit:', request.result);\n};\nrequest.onerror = function() {\n  console.log('Xato:', request.error);\n};" },
        { p: "O'qish kalit bo'yicha amalga oshiriladi:" },
        { code: "let tx = db.transaction('books', 'readonly');\nlet store = tx.objectStore('books');\n\nlet request = store.get(1);\n\nrequest.onsuccess = function() {\n  let book = request.result;\n  if (book) {\n    console.log(book.title); // \"JavaScript\"\n  } else {\n    console.log('Topilmadi');\n  }\n};" },
        { p: "Foydali metodlar:" },
        { ul: [
          "<code>add(value)</code> — qo'shadi (kalit mavjud bo'lsa xatolik);",
          "<code>put(value)</code> — qo'shadi yoki mavjudini almashtiradi;",
          "<code>get(key)</code> — kalit bo'yicha bittasini oladi;",
          "<code>getAll()</code> — barcha yozuvlarni oladi;",
          "<code>delete(key)</code> — kalit bo'yicha o'chiradi;",
          "<code>clear()</code> — omborni butunlay bo'shatadi."
        ] },

        { h2: "Indekslar" },
        { p: "Standart holatda IndexedDB'da faqat <em>kalit</em> bo'yicha qidirish mumkin. Boshqa maydon bo'yicha qidirish uchun <strong>indeks</strong> yaratamiz. Indeks — bu ma'lum maydon bo'yicha saralangan qo'shimcha \"jadval\":" },
        { code: "openRequest.onupgradeneeded = function() {\n  let db = openRequest.result;\n  let store = db.createObjectStore('books', { keyPath: 'id' });\n\n  // 'price' maydoni bo'yicha indeks:\n  store.createIndex('price_idx', 'price', { unique: false });\n};" },
        { p: "Endi indeks orqali narx bo'yicha qidirish mumkin:" },
        { code: "let tx = db.transaction('books', 'readonly');\nlet store = tx.objectStore('books');\nlet index = store.index('price_idx');\n\n// narxi aynan 100 bo'lganlarni olish:\nlet request = index.getAll(100);\nrequest.onsuccess = function() {\n  console.log(request.result); // narxi 100 bo'lgan kitoblar\n};" },
        { ul: [
          "Ikkinchi argument (<code>'price'</code>) — indekslanadigan maydon (<em>keyPath</em>);",
          "<code>unique: true</code> — bu maydon qiymatlari noyob bo'lishi shart;",
          "Indeks <code>IDBKeyRange</code> bilan oraliq so'rovlarni ham qo'llab-quvvatlaydi (masalan narxi 50-150 orasida)."
        ] },
        { note: "Indekslar ham obyekt omborlari kabi <strong>faqat <code>upgradeneeded</code> ichida</strong> yaratiladi." },

        { h2: "getAll va IDBKeyRange" },
        { p: "Ko'p yozuvni bir vaqtda olish uchun <code>getAll</code> juda qulay. Oraliq bo'yicha filtrlash uchun <code>IDBKeyRange</code> ishlatiladi:" },
        { code: "let index = store.index('price_idx');\n\n// narxi 50 dan 150 gacha (chegaralar bilan):\nlet range = IDBKeyRange.bound(50, 150);\nlet request = index.getAll(range);\n\nrequest.onsuccess = function() {\n  console.log(request.result);\n};\n\n// boshqa oraliqlar:\n// IDBKeyRange.lowerBound(100)  -> 100 va undan katta\n// IDBKeyRange.upperBound(100)  -> 100 va undan kichik\n// IDBKeyRange.only(100)        -> aynan 100" },

        { h2: "Promise o'ramchisi" },
        { p: "IndexedDB'ning tabiiy API'si hodisalarga (<code>onsuccess</code>/<code>onerror</code>) asoslangan bo'lib, bu kodni murakkablashtiradi. Har bir so'rovni <code>Promise</code>ga o'rab, <code>async/await</code> bilan ishlatish ancha qulay. Quyida oddiy o'ramchi:" },
        { code: "function promisify(request) {\n  return new Promise(function(resolve, reject) {\n    request.onsuccess = function() {\n      resolve(request.result);\n    };\n    request.onerror = function() {\n      reject(request.error);\n    };\n  });\n}\n\n// ishlatish (async funksiya ichida):\nasync function getBook(db, id) {\n  let tx = db.transaction('books', 'readonly');\n  let store = tx.objectStore('books');\n  let book = await promisify(store.get(id));\n  return book;\n}" },
        { p: "Bazani ochishni ham Promise'ga o'rash mumkin:" },
        { code: "function openDB(name, version, onUpgrade) {\n  return new Promise(function(resolve, reject) {\n    let request = indexedDB.open(name, version);\n    request.onupgradeneeded = function() {\n      onUpgrade(request.result);\n    };\n    request.onsuccess = function() {\n      resolve(request.result);\n    };\n    request.onerror = function() {\n      reject(request.error);\n    };\n  });\n}" },
        { tip: "Amalda ko'p loyihalar Jake Archibald'ning <code>idb</code> kutubxonasini ishlatadi — u aynan shunday Promise o'ramchisini tayyor holda beradi va IndexedDB bilan ishlashni sezilarli soddalashtiradi." },

        { h2: "O'chirish va bazani tozalash" },
        { code: "// bitta yozuvni o'chirish:\nlet tx = db.transaction('books', 'readwrite');\ntx.objectStore('books').delete(1);\n\n// omborni butunlay bo'shatish:\ntx.objectStore('books').clear();\n\n// butun bazani o'chirish:\nlet delReq = indexedDB.deleteDatabase('shop');\ndelReq.onsuccess = function() {\n  console.log('Baza o\\'chirildi');\n};" },

        { h2: "Qachon IndexedDB kerak" },
        { p: "IndexedDB kuchli, lekin murakkab. Uni tanlashda quyidagilarni hisobga oling:" },
        { ul: [
          "<strong>Katta hajm</strong> — <code>localStorage</code>ning ~5 MB chegarasidan oshadigan ma'lumot bo'lsa;",
          "<strong>Murakkab qidiruv</strong> — indekslar va oraliq so'rovlar kerak bo'lsa;",
          "<strong>Oflayn ilovalar</strong> — PWA'lar, oflayn ishlaydigan ilovalar, keshlar;",
          "<strong>Turli xil ma'lumot</strong> — fayllar, <code>Blob</code>, katta obyektlar saqlash kerak bo'lsa."
        ] },
        { p: "Aksincha, oddiy holatlar uchun soddaroq vositalar mos:" },
        { ul: [
          "Bir nechta sozlama saqlash — <code>localStorage</code>;",
          "Serverga yuboriladigan sessiya identifikatori — cookie;",
          "Vaqtinchalik, bitta tab'ga tegishli holat — <code>sessionStorage</code>."
        ] },
        { note: "Katta va murakkab ma'lumot uchun IndexedDB tanlang; oddiy kalit-qiymat uchun <code>localStorage</code> yetarli va ancha sodda." },

        { h2: "Xulosa" },
        { ul: [
          "IndexedDB — brauzerdagi kuchli, asinxron, tranzaksiyaga asoslangan ma'lumotlar bazasi;",
          "<code>indexedDB.open(nom, versiya)</code> bilan ochiladi; sxema faqat <code>upgradeneeded</code> ichida quriladi;",
          "Ma'lumot <em>obyekt omborlari</em>da saqlanadi; kalit <code>keyPath</code> yoki <code>autoIncrement</code> orqali aniqlanadi;",
          "Har bir amal <em>tranzaksiya</em> ichida bajariladi (<code>readonly</code> yoki <code>readwrite</code>);",
          "<code>add</code>/<code>put</code>/<code>get</code>/<code>getAll</code>/<code>delete</code> asosiy amallar;",
          "<em>Indekslar</em> boshqa maydonlar bo'yicha qidiruvni beradi;",
          "Hodisali API'ni <code>Promise</code>ga o'rab <code>async/await</code> bilan ishlatish qulay (yoki <code>idb</code> kutubxonasi);",
          "IndexedDB katta va murakkab ma'lumot uchun; oddiy holatda <code>localStorage</code> yoki cookie yetarli."
        ] }
      ]
    }
  ]
};
