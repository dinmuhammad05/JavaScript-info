"use strict";

module.exports = {
  part: "2-qism: Brauzer — hujjat, hodisalar, interfeyslar",
  chapter: "Hodisalarga kirish",
  lessons: [
    {
      slug: "hodisalar-kirish",
      title: "Brauzer hodisalariga kirish",
      blurb: "Hodisa nima, uni tinglashning uch usuli: HTML atribut (onclick), DOM xossa (elem.onclick), addEventListener/removeEventListener; event obyekti, this va handleEvent bilan obyekt-ishlovchi.",
      body: [
        { lead: "<strong>Hodisa</strong> (event) — bu biror voqea sodir bo'lgani haqidagi \"signal\". Barcha DOM tugunlari bunday signallarni yuboradi (garchi hodisalar faqat DOM bilan cheklanmasa ham). Ushbu darsda hodisalarning umumiy tamoyillari va ularga qanday ishlov berishni chuqur o'rganamiz." },

        { h2: "Hodisa nima?" },
        { p: "Foydalanuvchi sahifa bilan o'zaro aloqada bo'lganda yoki brauzer ichida biror voqea yuz berganda hodisa <em>ishga tushadi</em> (fire/trigger). Eng ko'p uchraydigan DOM hodisalarining ba'zilari:" },
        { p: "<strong>Sichqoncha hodisalari:</strong>" },
        { ul: [
          "<code>click</code> — element ustida sichqoncha bosilganda (yoki sensorli ekranda tegilganda);",
          "<code>contextmenu</code> — element ustida o'ng tugma bosilganda;",
          "<code>mouseover</code> / <code>mouseout</code> — sichqoncha element ustiga kelganda / ketganda;",
          "<code>mousedown</code> / <code>mouseup</code> — sichqoncha tugmasi bosilganda / qo'yib yuborilganda;",
          "<code>mousemove</code> — sichqoncha harakatlanganda."
        ] },
        { p: "<strong>Klaviatura hodisalari:</strong>" },
        { ul: [
          "<code>keydown</code> / <code>keyup</code> — tugma bosilganda / qo'yib yuborilganda."
        ] },
        { p: "<strong>Forma elementi hodisalari:</strong>" },
        { ul: [
          "<code>submit</code> — foydalanuvchi <code>&lt;form&gt;</code>ni yuborganda;",
          "<code>focus</code> — foydalanuvchi elementga (masalan, <code>&lt;input&gt;</code>ga) fokuslanganda."
        ] },
        { p: "<strong>Hujjat hodisalari:</strong>" },
        { ul: [
          "<code>DOMContentLoaded</code> — HTML yuklanib, DOM to'liq qurilganda."
        ] },
        { p: "<strong>CSS hodisalari:</strong>" },
        { ul: [
          "<code>transitionend</code> — CSS-animatsiya tugaganda."
        ] },
        { note: "Bu ro'yxat to'liq emas — hodisalar juda ko'p. Hozircha eng muhimi shuni tushunish: har qanday voqeaga <strong>ishlovchi</strong> (handler) — ya'ni hodisa sodir bo'lganda ishga tushadigan funksiya biriktirish mumkin." },

        { h2: "Ishlovchi (handler) nima?" },
        { p: "Hodisalarga ishlov berish uchun <strong>ishlovchi</strong> — hodisa sodir bo'lganda ishlaydigan funksiya biriktiramiz. Ishlovchilar foydalanuvchi harakatiga JavaScript kodi bilan javob berishning asosiy usulidir. Ishlovchini biriktirishning bir necha yo'li bor. Ularni oddiydan murakkabga qarab ko'rib chiqamiz." },

        { h2: "1-usul: HTML atributi (onclick)" },
        { p: "Ishlovchini to'g'ridan-to'g'ri HTML ichida <code>on&lt;hodisa&gt;</code> ko'rinishidagi atribut bilan berish mumkin. Masalan, <code>click</code> hodisasi uchun <code>onclick</code> atributini yozamiz:" },
        { code: "&lt;input value=\"Bosing!\" onclick=\"alert('Salom!')\" type=\"button\"&gt;" },
        { p: "Sichqoncha bosilganda <code>onclick</code> ichidagi kod ishga tushadi. Atribut ichiga to'g'ridan-to'g'ri kod yozilganiga e'tibor bering — bu yerda <code>alert('Salom!')</code> chaqiriladi." },
        { warn: "HTML atributi ichida <strong>ikki tirnoq</strong> ishlatib bo'lmaydi, chunki atribut o'zi ikki tirnoq bilan o'ralgan: <code>onclick=\"...\"</code>. Shu sabab ichida bitta tirnoq ishlatiladi: <code>onclick=\"alert('Salom!')\"</code>. Agar ikki tirnoq zarur bo'lsa, <code>&amp;quot;</code> HTML-entitisidan foydalaniladi." },
        { p: "Kod uzun bo'lsa, uni funksiyaga o'rab, atributdan chaqirish maqsadga muvofiq:" },
        { code: "&lt;script&gt;\n  function countRabbits() {\n    for (let i = 1; i <= 3; i++) {\n      alert('Quyoncha raqami ' + i);\n    }\n  }\n&lt;/script&gt;\n\n&lt;input type=\"button\" onclick=\"countRabbits()\" value=\"Quyonchalarni sana!\"&gt;" },
        { warn: "HTML atributlari harf katta-kichikligiga sezgir emas, shuning uchun <code>ONCLICK</code> ham, <code>onClick</code> ham, <code>onclick</code> ham ishlaydi. Lekin odatda atributlar kichik harflar bilan yoziladi: <code>onclick</code>." },
        { note: "HTML atributi orqali ishlov berish qulay ko'rinsa-da, kamdan-kam ishlatiladi. Sababi: HTML va JavaScript aralashib ketadi, kod uzun bo'lsa o'qib bo'lmaydigan holga keladi. Odatda ishlovchilar JavaScript ichida biriktiriladi." },

        { h2: "2-usul: DOM xossasi (elem.onclick)" },
        { p: "Ishlovchini DOM xossasi <code>on&lt;hodisa&gt;</code> orqali ham biriktirish mumkin. Masalan, <code>elem.onclick</code>ga funksiya tayinlaymiz:" },
        { code: "&lt;input id=\"elem\" type=\"button\" value=\"Bosing!\"&gt;\n\n&lt;script&gt;\n  elem.onclick = function() {\n    alert('Rahmat');\n  };\n&lt;/script&gt;" },
        { p: "Endi element bosilsa, funksiya ishga tushadi. Diqqat: ishlovchi <code>elem.onclick = ...</code> ko'rinishida <strong>tayinlanadi</strong>, chaqirilmaydi. Ya'ni funksiyaning o'zini beramiz (nomidan keyin qavs qo'ymaymiz), uni brauzerning o'zi kerakli paytda chaqiradi." },
        { p: "Agar ishlovchi HTML atributi orqali berilsa, brauzer atribut mazmunidan avtomatik funksiya yaratib, uni <code>elem.onclick</code>ga tayinlaydi. Ya'ni bu ikki usul aslida bir xil natijaga olib keladi." },

        { h3: "onclick faqat bitta bo'la oladi" },
        { p: "DOM xossasi orqali biriktirilganda <strong>faqat bitta</strong> ishlovchi bo'lishi mumkin. Yangi ishlovchi tayinlansa, u eskisini o'chirib tashlaydi (ustidan yozadi):" },
        { code: "elem.onclick = function() { alert(1); };\n// ...\nelem.onclick = function() { alert(2); }; // eski ishlovchi almashtiriladi\n// endi faqat 2 ko'rsatiladi" },
        { p: "Ishlovchini olib tashlash uchun <code>elem.onclick = null</code> qilamiz." },
        { tip: "Ishlovchini tashqarida e'lon qilingan nomli funksiyaga ham tayinlash mumkin: <code>elem.onclick = sayThanks;</code>. Bu yerda ham funksiya nomidan keyin qavs qo'yilmaydi — aks holda (<code>sayThanks()</code>) funksiyaning natijasi tayinlanadi, funksiyaning o'zi emas." },

        { h2: "3-usul: addEventListener" },
        { p: "HTML atributi va DOM xossasining asosiy kamchiligi — bitta hodisaga <strong>bir nechta</strong> ishlovchi biriktirib bo'lmasligi. Masalan, bir kod tugma bosilganda reklamani yoritmoqchi, boshqasi esa xabar chiqarmoqchi bo'lsa, ikkovi ham kerak. Lekin yangi <code>onclick</code> eskisini o'chiradi." },
        { p: "Shu muammoni hal qilish uchun maxsus <code>addEventListener</code> va <code>removeEventListener</code> metodlari mavjud. Ular DOM xossasining cheklovlaridan xoli va zamonaviy amaliyotda <strong>afzal</strong> ko'riladi." },
        { p: "Sintaksis:" },
        { code: "element.addEventListener(event, handler, options);" },
        { ul: [
          "<code>event</code> — hodisa nomi, masalan <code>'click'</code>;",
          "<code>handler</code> — ishlovchi funksiya;",
          "<code>options</code> — ixtiyoriy qo'shimcha obyekt, quyidagi xossalar bilan: <code>once</code> (ishlovchi bir marta ishlaydi va o'chiriladi), <code>capture</code> (qaysi fazada ishlashi — keyingi darslarda), <code>passive</code> (ishlovchi <code>preventDefault</code>ni chaqirmasligini bildiradi)."
        ] },
        { code: "elem.addEventListener('click', function() {\n  alert('Rahmat!');\n});" },
        { p: "Ishlovchini olib tashlash uchun <code>removeEventListener</code> ishlatamiz:" },
        { code: "element.removeEventListener(event, handler, options);" },
        { warn: "Ishlovchini olib tashlash uchun <strong>aynan o'sha funksiya</strong> uzatilishi kerak. Anonim (nomsiz) funksiya tayinlangan bo'lsa, uni o'chirib bo'lmaydi:" },
        { code: "// bunday qilib bo'lmaydi — o'chirish uchun funksiyaga havola yo'q:\nelem.addEventListener('click', () => alert('Rahmat!'));\n// ...\nelem.removeEventListener('click', () => alert('Rahmat!')); // ISHLAMAYDI\n// (bu boshqa funksiya, garchi kodi bir xil bo'lsa ham)" },
        { p: "To'g'ri yo'l — funksiyani o'zgaruvchida saqlab, o'sha havolani uzatish:" },
        { code: "function handler() {\n  alert('Rahmat!');\n}\n\nelem.addEventListener('click', handler);\n// ...\nelem.removeEventListener('click', handler); // endi ishlaydi" },

        { h3: "Bir nechta ishlovchi" },
        { p: "<code>addEventListener</code>ning asosiy kuchi — bir hodisaga ko'p ishlovchi biriktirish imkoni:" },
        { code: "&lt;input id=\"elem\" type=\"button\" value=\"Bosing!\"&gt;\n\n&lt;script&gt;\n  function handler1() {\n    alert('Rahmat!');\n  }\n\n  function handler2() {\n    alert('Yana rahmat!');\n  }\n\n  elem.onclick = () => alert('Salom');\n  elem.addEventListener('click', handler1); // Rahmat!\n  elem.addEventListener('click', handler2); // Yana rahmat!\n&lt;/script&gt;" },
        { p: "Yuqoridagi misolda bosish natijasida uchala ishlovchi ham ishga tushadi: <code>onclick</code> orqali biriktirilgani va <code>addEventListener</code> orqali biriktirilgan ikkitasi. Ya'ni <code>onclick</code> va <code>addEventListener</code> bir-biriga xalaqit bermaydi." },
        { note: "Ba'zi hodisalarni <strong>faqat</strong> <code>addEventListener</code> orqali biriktirish mumkin, DOM xossasi orqali emas. Masalan, <code>DOMContentLoaded</code> hodisasi (hujjat yuklanib, DOM tayyor bo'lganda ishga tushadi). Uning <code>document.onDOMContentLoaded</code> degan xossasi yo'q — faqat <code>document.addEventListener('DOMContentLoaded', ...)</code> ishlaydi." },

        { h2: "Hodisa obyekti (event object)" },
        { p: "Hodisani to'g'ri qayta ishlash uchun ko'pincha nima sodir bo'lgani haqida ko'proq ma'lumot kerak: qaysi tugma bosildi, sichqoncha koordinatalari qanaqa va hokazo. Hodisa sodir bo'lganda brauzer <strong>hodisa obyektini</strong> (event object) yaratib, uni ishlovchiga birinchi argument sifatida uzatadi." },
        { code: "&lt;input type=\"button\" value=\"Meni bosing\" id=\"elem\"&gt;\n\n&lt;script&gt;\n  elem.onclick = function(event) {\n    // hodisa turini va elementni ko'rsatamiz\n    alert(event.type + ' element ' + event.currentTarget);\n    // sichqoncha koordinatalari\n    alert(event.clientX + ':' + event.clientY);\n  };\n&lt;/script&gt;" },
        { p: "Hodisa obyektining eng ko'p ishlatiladigan xossalari:" },
        { ul: [
          "<code>event.type</code> — hodisa turi, bu yerda <code>'click'</code>;",
          "<code>event.currentTarget</code> — hodisaga ishlov berayotgan element. Bu odatda <code>this</code> bilan bir xil, lekin ishlovchi strelka funksiyasi (arrow) bo'lsa yoki <code>bind</code> qilingan bo'lsa foydali;",
          "<code>event.clientX</code> / <code>event.clientY</code> — sichqoncha hodisalari uchun kursorning oynadagi (window) koordinatalari."
        ] },
        { tip: "Hodisa obyektining boshqa ko'plab xossalari ham bor va ular hodisa turiga bog'liq. Masalan, klaviatura hodisalarida bosilgan tugma haqida ma'lumot, sichqoncha hodisalarida koordinatalar bo'ladi. Ularni keyinroq maxsus darslarda o'rganamiz. Hozircha muhimi: <strong>ishlovchi birinchi argument sifatida hodisa obyektini oladi.</strong>" },
        { note: "HTML atribut orqali berilgan ishlovchida ham hodisa obyekti <code>event</code> nomi bilan mavjud: <code>&lt;input onclick=\"alert(event.type)\"&gt;</code>. Brauzer atributdan funksiya yaratganda, uning birinchi argumentini <code>event</code> deb nomlaydi." },

        { h2: "this ishlovchi ichida" },
        { p: "Ishlovchi ichida <code>this</code> — bu ishlovchi biriktirilgan elementga havola qiladi. Quyidagi misolda tugma bosilganda o'zining <code>value</code>si (matni) ko'rsatiladi:" },
        { code: "&lt;button onclick=\"alert(this.innerHTML)\"&gt;Meni bosing&lt;/button&gt;" },
        { p: "Bu yerda <code>this.innerHTML</code> — tugmaning ichidagi matn, ya'ni <code>'Meni bosing'</code>. Xuddi shu narsa DOM xossasi va <code>addEventListener</code> orqali biriktirilgan oddiy funksiyalarda ham ishlaydi." },
        { warn: "<strong>Strelka funksiyalarida</strong> (arrow functions) o'z <code>this</code>si yo'q — u tashqi ko'lamdan olinadi. Shuning uchun ishlovchida <code>this</code> orqali elementga murojaat qilmoqchi bo'lsangiz, strelka funksiya emas, oddiy funksiya ishlating. Strelka ishlatilsa, <code>this</code> element emas, tashqi (masalan, global) qiymat bo'ladi. Bunday holda <code>event.currentTarget</code>dan foydalaning." },

        { h2: "Obyekt-ishlovchi va handleEvent" },
        { p: "<code>addEventListener</code> ishlovchi sifatida nafaqat funksiya, balki <strong>obyekt</strong> ham qabul qila oladi. Hodisa sodir bo'lganda, obyektning <code>handleEvent</code> metodi chaqiriladi:" },
        { code: "&lt;button id=\"elem\"&gt;Meni bosing&lt;/button&gt;\n\n&lt;script&gt;\n  let obj = {\n    handleEvent(event) {\n      alert(event.type + ' element ustida ' + event.currentTarget.tagName);\n    }\n  };\n\n  elem.addEventListener('click', obj);\n&lt;/script&gt;" },
        { p: "Ya'ni <code>addEventListener</code> obyekt olsa, hodisa yuz berganda uning <code>handleEvent(event)</code> metodini chaqiradi. Bu metod istagancha ishlovni bajarishi mumkin." },
        { p: "<code>handleEvent</code> metodi obyektning o'zida bo'lishi shart emas — uni klass orqali ham amalga oshirish mumkin. Bu bir nechta hodisani bitta obyektda boshqarish uchun qulay:" },
        { code: "&lt;button id=\"elem\"&gt;Meni bosing&lt;/button&gt;\n\n&lt;script&gt;\n  class Menu {\n    handleEvent(event) {\n      switch (event.type) {\n        case 'mousedown':\n          elem.innerHTML = 'Sichqoncha tugmasi bosildi';\n          break;\n        case 'mouseup':\n          elem.innerHTML += ' ...va qo'yib yuborildi.';\n          break;\n      }\n    }\n  }\n\n  let menu = new Menu();\n  elem.addEventListener('mousedown', menu);\n  elem.addEventListener('mouseup', menu);\n&lt;/script&gt;" },
        { p: "Bu yerda bitta <code>menu</code> obyekti ikki xil hodisaga ishlov beradi. <code>handleEvent</code> ichida <code>event.type</code> orqali qaysi hodisa kelganini ajratamiz." },
        { note: "<code>handleEvent</code> metodi ishlovni to'liq o'zi bajarishi shart emas — u faqat boshqa metodlarni chaqirishi ham mumkin. Bu hodisalarga obyektga yo'naltirilgan (OOP) usulda ishlov berish imkonini beradi." },

        { h2: "Xulosa" },
        { p: "Ishlovchi biriktirishning uch usuli:" },
        { ul: [
          "HTML atributi: <code>onclick=\"...\"</code> — kamdan-kam ishlatiladi (HTML va JS aralashib ketadi);",
          "DOM xossasi: <code>elem.onclick = function</code> — sodda, lekin faqat bitta ishlovchi bo'la oladi;",
          "<code>elem.addEventListener('click', handler, options)</code> — eng zamonaviy va moslashuvchan usul; bir nechta ishlovchi biriktirsa bo'ladi; o'chirish uchun <code>removeEventListener</code> aynan o'sha funksiyani talab qiladi."
        ] },
        { ul: [
          "Ishlovchi birinchi argument sifatida <strong>hodisa obyektini</strong> (<code>event</code>) oladi. Undan hodisa turi (<code>event.type</code>), element (<code>event.currentTarget</code>) va boshqa ma'lumotlar olinadi;",
          "Oddiy funksiya ishlovchisida <code>this</code> — hodisa biriktirilgan elementga havola qiladi (strelka funksiyada emas);",
          "Ishlovchi funksiya o'rniga <code>handleEvent</code> metodli <strong>obyekt</strong> ham berish mumkin."
        ] }
      ]
    },
    {
      slug: "bubbling-capturing",
      title: "Ko'tarilish va tutish (bubbling va capturing)",
      blurb: "Bubbling tamoyili, event.target va currentTarget farqi, stopPropagation va stopImmediatePropagation, capturing fazasi va hodisaning uch fazasi.",
      body: [
        { lead: "Hodisalar tarqalishini (propagation) tushunmasdan haqiqiy hodisalar bilan ishlab bo'lmaydi. Bu darsda hodisaning uch fazasini, ayniqsa eng muhim <strong>bubbling</strong> (ko'tarilish) tamoyilini chuqur o'rganamiz." },

        { h2: "Bubbling tamoyili" },
        { p: "Bubbling tamoyili sodda: <strong>elementda hodisa sodir bo'lganda, avval o'sha elementning ishlovchilari, keyin uning ota-elementiniki, so'ng eng yuqorigacha barcha ota-elementlarniki ishga tushadi.</strong>" },
        { p: "Quyidagicha uch ichma-ich element bor deylik: <code>FORM &gt; DIV &gt; P</code>. Har biriga ishlovchi biriktirilgan:" },
        { code: "&lt;style&gt;\n  body * { margin: 10px; border: 1px solid blue; }\n&lt;/style&gt;\n\n&lt;form onclick=\"alert('form')\"&gt;FORM\n  &lt;div onclick=\"alert('div')\"&gt;DIV\n    &lt;p onclick=\"alert('p')\"&gt;P&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/form&gt;" },
        { p: "Endi ichkaridagi <code>&lt;p&gt;</code> ustiga bossak, ketma-ket quyidagilar ishlaydi:" },
        { ol: [
          "avval <code>&lt;p&gt;</code>dagi <code>onclick</code>: <code>alert('p')</code>;",
          "keyin tashqaridagi <code>&lt;div&gt;</code>dagi: <code>alert('div')</code>;",
          "so'ng eng tashqaridagi <code>&lt;form&gt;</code>dagi: <code>alert('form')</code>."
        ] },
        { p: "Hodisa ichki elementdan boshlanib, tepaga — ota-elementlar bo'ylab \"ko'tariladi\" — huddi suvdagi havo pufakchasi yuqoriga ko'tarilgandek. Shu sababdan bu jarayon <strong>bubbling</strong> (ko'tarilish, ba'zan \"pufaklanish\") deb ataladi." },
        { note: "Ko'p hodisalar ko'tariladi, lekin hammasi emas. Masalan, <code>focus</code> hodisasi ko'tarilmaydi. Bunday istisnolar kam va biz ularni maxsus holatlarda ko'ramiz. Umumiy qoida: <strong>deyarli barcha hodisalar ko'tariladi.</strong>" },

        { h2: "event.target — asl manba" },
        { p: "Ko'tarilishda muhim savol: <strong>hodisa aslida qaysi elementda boshlangan?</strong> Bunga <code>event.target</code> javob beradi — bu hodisani boshlagan, eng ichkaridagi (chuqurdagi) element." },
        { p: "Buni <code>this</code> (yoki <code>event.currentTarget</code>) bilan solishtiring:" },
        { ul: [
          "<code>event.target</code> — hodisa <strong>boshlangan</strong> asl element. Ko'tarilish davomida u <strong>o'zgarmaydi</strong>;",
          "<code>this</code> = <code>event.currentTarget</code> — <strong>hozir</strong> ishlov berayotgan element (ishlovchi biriktirilgan element). Ko'tarilish har bir ota-elementga o'tganda bu <strong>o'zgaradi</strong>."
        ] },
        { p: "Masalan, faqat <code>&lt;form&gt;</code>ga bitta ishlovchi qo'ysak, formaning istalgan joyiga bosilganda hodisa unga ko'tarilib keladi:" },
        { code: "form.onclick = function(event) {\n  // this = event.currentTarget = form (ishlovchi shu yerda)\n  // event.target = haqiqatan bosilgan ichki element\n  event.target.style.backgroundColor = 'yellow';\n\n  alert('target = ' + event.target.tagName + ', this = ' + this.tagName);\n};" },
        { p: "Agar <code>&lt;p&gt;</code>ga bossak: <code>event.target</code> — <code>P</code> bo'ladi, lekin <code>this</code> (currentTarget) doim <code>FORM</code> bo'ladi. Agar to'g'ridan-to'g'ri formaning bo'sh joyiga bossak, u holda <code>event.target === this</code> (ikkovi ham <code>FORM</code>)." },
        { tip: "Bu ikki xossaning farqi hodisa delegatsiyasi (keyingi dars) uchun juda muhim: <code>this</code> orqali ishlovchi joyi, <code>event.target</code> orqali esa aynan qayerda voqea yuz berganini bilamiz." },

        { h2: "Ko'tarilishni to'xtatish: stopPropagation" },
        { p: "Ko'tarilish eng tepaga — <code>&lt;html&gt;</code>, so'ng <code>document</code> obyektiga, ba'zan hatto <code>window</code>gacha davom etadi: har bir ishlovchi navbat bilan ishga tushadi." },
        { p: "Ammo istalgan ishlovchi \"hodisa to'liq qayta ishlandi\" deb qaror qilib, ko'tarilishni <strong>to'xtata oladi</strong>. Buning uchun <code>event.stopPropagation()</code> metodi ishlatiladi:" },
        { code: "&lt;body onclick=\"alert('Bu ishlamaydi.')\"&gt;\n  &lt;button onclick=\"event.stopPropagation()\"&gt;Meni bosing&lt;/button&gt;\n&lt;/body&gt;" },
        { p: "Endi tugma bosilsa, <code>&lt;body&gt;</code>dagi <code>onclick</code> ishlamaydi, chunki ko'tarilish tugma darajasida to'xtatildi." },

        { h3: "stopPropagation va stopImmediatePropagation farqi" },
        { p: "<code>event.stopPropagation()</code> yuqoriga ko'tarilishni to'xtatadi, <strong>lekin joriy elementdagi boshqa ishlovchilarni to'xtatmaydi.</strong> Agar bir elementda bir nechta ishlovchi bo'lsa, ular baribir ishlaydi." },
        { p: "Joriy elementdagi <strong>qolgan barcha ishlovchilarni ham</strong> to'xtatish va ko'tarilishni ham bekor qilish uchun <code>event.stopImmediatePropagation()</code> ishlatiladi:" },
        { code: "elem.addEventListener('click', (e) => {\n  alert('Birinchi ishlovchi');\n  e.stopImmediatePropagation();\n});\n\nelem.addEventListener('click', () => {\n  // Bu ISHLAMAYDI, chunki stopImmediatePropagation chaqirilgan\n  alert('Ikkinchi ishlovchi');\n});" },
        { warn: "Ko'tarilishni asossiz to'xtatmang! <code>stopPropagation</code> \"o'lik zonalar\" (dead zone) yaratishi mumkin. Masalan, sahifadagi barcha kliklarni hisoblaydigan analitika tizimi hujjat darajasida <code>click</code>ni tinglaydi. Agar biror element ko'tarilishni to'xtatib qo'ysa, o'sha element ustidagi kliklar analitikaga tushmaydi — natijada \"o'lik\" hisoblanmaydigan joylar paydo bo'ladi. Odatda ko'tarilishni to'xtatishga real ehtiyoj yo'q; agar ehtiyoj bo'lsa, muqobil yechim (masalan, maxsus hodisa yoki <code>event</code>ga qo'shimcha belgi qo'yish) yaxshiroq bo'lishi mumkin." },

        { h2: "Capturing (tutish) fazasi" },
        { p: "Bubbling — hodisalar tarqalishining bir qismi. Aslida standart hodisa tarqalishining <strong>uch fazasi</strong> bor:" },
        { ol: [
          "<strong>Capturing (tutish) fazasi</strong> — hodisa yuqoridan (<code>window</code>dan) pastga, elementga qadar tushadi;",
          "<strong>Target (nishon) fazasi</strong> — hodisa asl elementga (target) yetib keladi;",
          "<strong>Bubbling (ko'tarilish) fazasi</strong> — hodisa elementdan yuqoriga qaytadi."
        ] },
        { p: "Ya'ni <code>&lt;td&gt;</code>ga bosilsa, hodisa avval yuqoridan (<code>&lt;html&gt; &gt; &lt;body&gt; &gt; &lt;table&gt; &gt; ...</code>) elementgacha \"tushadi\" (capturing), so'ng elementga yetib, keyin yana yuqoriga \"ko'tariladi\" (bubbling), yo'lda ishlovchilarni ishga tushiradi." },
        { p: "Bugungacha biz faqat bubblingdan foydalandik, chunki capturing fazasi kamdan-kam kerak bo'ladi va odatda ko'rinmaydi. Odatiy usulda (<code>onclick</code>, oddiy <code>addEventListener</code>) qo'yilgan ishlovchilar <strong>capturing fazasini bilmaydi</strong> — ular faqat target va bubbling fazalarida ishlaydi." },
        { p: "Capturing fazasida ishlovchi ushlash uchun <code>addEventListener</code>ning uchinchi argumenti <code>capture</code>ni <code>true</code> qilish kerak:" },
        { code: "// ikkala ko'rinish teng:\nelem.addEventListener('click', handler, true);\nelem.addEventListener('click', handler, { capture: true });" },
        { p: "Agar <code>capture: false</code> (yoki umuman berilmasa — bu standart), ishlovchi <strong>bubbling</strong> fazasida ishlaydi. Quyidagi misolda har bir elementga ikkita ishlovchi qo'yilgan — biri capturingda, biri bubblingda:" },
        { code: "for (let elem of document.querySelectorAll('*')) {\n  // capturing fazasi\n  elem.addEventListener('click', (e) => alert('Capturing: ' + elem.tagName), true);\n  // bubbling fazasi\n  elem.addEventListener('click', (e) => alert('Bubbling: ' + elem.tagName));\n}" },
        { p: "Eng ichki elementga bosilsa, avval barcha ota-elementlar <em>tepadan pastga</em> capturing ishlovchilarini ishga tushiradi, so'ng elementga yetib, keyin <em>pastdan tepaga</em> bubbling ishlovchilari ishlaydi." },
        { note: "<code>event.eventPhase</code> xossasi hodisa qaysi fazada ekanligini bildiradi: 1 — capturing, 2 — target, 3 — bubbling. Amalda kamdan-kam ishlatiladi, chunki odatda fazani ishlovchini biriktirish paytida bilamiz." },
        { warn: "Ishlovchini olib tashlashda (<code>removeEventListener</code>) <code>capture</code> qiymati ham <strong>mos kelishi</strong> kerak. Ya'ni <code>addEventListener('click', h, true)</code> bilan qo'yilgan ishlovchi <code>removeEventListener('click', h, true)</code> bilan olinadi — <code>true</code>ni tushirib qoldirsangiz, boshqa ishlovchi olib tashlanadi (yoki hech narsa)." },

        { h2: "Xulosa" },
        { ul: [
          "Elementda hodisa sodir bo'lsa, ishlovchilar avval o'sha elementda, keyin ota-elementlarda tepaga qarab ishlaydi — bu <strong>bubbling</strong> (ko'tarilish);",
          "Hodisa tarqalishining uch fazasi bor: <strong>capturing</strong> (tepadan pastga) &rarr; <strong>target</strong> (nishon) &rarr; <strong>bubbling</strong> (pastdan tepaga);",
          "<code>event.target</code> — hodisa <strong>boshlangan</strong> asl (eng chuqur) element, ko'tarilishda o'zgarmaydi;",
          "<code>event.currentTarget</code> (= <code>this</code>) — <strong>hozir</strong> ishlov berayotgan element;",
          "<code>event.stopPropagation()</code> — yuqoriga ko'tarilishni to'xtatadi (joriy elementdagi boshqa ishlovchilar baribir ishlaydi);",
          "<code>event.stopImmediatePropagation()</code> — ko'tarilishni ham, joriy elementdagi qolgan ishlovchilarni ham to'xtatadi;",
          "Capturing fazasida tinglash uchun: <code>addEventListener(event, handler, true)</code> yoki <code>{ capture: true }</code>."
        ] }
      ]
    },
    {
      slug: "event-delegation",
      title: "Hodisa delegatsiyasi",
      blurb: "Bubbling va targetdan foydalanib, bitta ishlovchi bilan ko'p elementni boshqarish; data-atributlar bilan delegatsiya; 'behavior' patterni va afzalliklari.",
      body: [
        { lead: "Bubbling va targeting bir kuchli hodisa qayta ishlash naqshiga — <strong>hodisa delegatsiyasiga</strong> (event delegation) imkon beradi. Bu naqsh yordamida bir xil tarzda ishlov beriladigan ko'plab elementlarga har biriga alohida ishlovchi biriktirish o'rniga, <strong>bitta ishlovchi</strong> qo'yamiz." },

        { h2: "Delegatsiya g'oyasi" },
        { p: "Agar bizda umumiy usulda ishlov beriladigan ko'plab element bo'lsa, har biriga alohida ishlovchi biriktirish o'rniga, ularning umumiy ota-elementiga bitta ishlovchi qo'yamiz." },
        { p: "Bu ishlovchida <code>event.target</code> orqali aynan qaysi element bosilganini aniqlaymiz va shunga qarab ishlov beramiz. Bubbling tufayli ichki elementlardagi kliklar ota-elementga ko'tarilib keladi, shuning uchun bitta ishlovchi barchasini \"tutadi\"." },
        { p: "G'oyaning oddiy misoli — jadval (<code>&lt;table&gt;</code>). Uning ko'p kataklari (<code>&lt;td&gt;</code>) bor va biz bosilgan katakni belgilamoqchimiz. Har bir <code>&lt;td&gt;</code>ga ishlovchi qo'yish o'rniga, bitta ishlovchini <code>&lt;table&gt;</code>ga qo'yamiz:" },
        { code: "let selectedTd;\n\ntable.onclick = function(event) {\n  let target = event.target; // qayerga bosildi?\n\n  if (target.tagName != 'TD') return; // TD emas? — e'tibor bermaymiz\n\n  highlight(target); // katakni yoritamiz\n};\n\nfunction highlight(td) {\n  if (selectedTd) {\n    selectedTd.classList.remove('highlight'); // eski belgini olib tashlaymiz\n  }\n  selectedTd = td;\n  selectedTd.classList.add('highlight'); // yangi katakni belgilaymiz\n}" },
        { p: "Bu ishlovchi <strong>necha katak bo'lishidan qat'i nazar</strong> — 10 ta ham, 10 000 ta ham — ishlaydi. Bundan tashqari, kataklar dinamik qo'shilib/olib tashlansa ham (masalan, <code>innerHTML</code> orqali) qo'shimcha ishlovchi biriktirish shart emas." },
        { warn: "<code>event.target</code> aniq bosilgan element bo'lgani uchun, u <code>&lt;td&gt;</code> ichidagi teg (masalan, <code>&lt;strong&gt;</code>) bo'lishi mumkin. Bunday holatlarda faqat <code>target.tagName == 'TD'</code> tekshiruvi yetmasligi mumkin — kerak bo'lsa, <code>target.closest('td')</code> orqali eng yaqin <code>&lt;td&gt;</code>ni topish to'g'riroq bo'ladi." },

        { h2: "Amaliy misol: data-atributlar bilan" },
        { p: "Delegatsiyaning kuchli tomoni — <code>data-*</code> atributlaridan foydalanib, harakatlarni deklarativ qilish. Bir nechta tugma bo'lib, har biri boshqa amalni bajarsin. Har biriga alohida ishlovchi qo'yish o'rniga, ularning konteynerida bitta ishlovchi bilan hammasi boshqariladi:" },
        { code: "&lt;div id=\"menu\"&gt;\n  &lt;button data-action=\"save\"&gt;Saqlash&lt;/button&gt;\n  &lt;button data-action=\"load\"&gt;Yuklash&lt;/button&gt;\n  &lt;button data-action=\"search\"&gt;Qidirish&lt;/button&gt;\n&lt;/div&gt;\n\n&lt;script&gt;\n  class Menu {\n    constructor(elem) {\n      this._elem = elem;\n      elem.onclick = this.onClick.bind(this); // (*) this bog'lanadi\n    }\n\n    save() { alert('saqlanmoqda'); }\n    load() { alert('yuklanmoqda'); }\n    search() { alert('qidirilmoqda'); }\n\n    onClick(event) {\n      let action = event.target.dataset.action;\n      if (action) {\n        this[action](); // masalan, this.save()\n      }\n    }\n  }\n\n  new Menu(menu);\n&lt;/script&gt;" },
        { p: "Bu yerda <code>data-action</code> atributi tugma qaysi metodni chaqirishi kerakligini belgilaydi. Ishlovchida <code>event.target.dataset.action</code> orqali o'sha nomni olib, tegishli metodni chaqiramiz. Yangi tugma qo'shish uchun faqat HTML'ga <code>data-action</code> bilan bitta qator yozish yetarli — JavaScriptga tegmaymiz." },
        { note: "<code>(*)</code> qatordagi <code>bind(this)</code> muhim: ishlovchi ichida <code>this</code> <code>Menu</code> nusxasini ko'rsatishi kerak (chunki <code>this.save()</code> chaqiramiz). Agar <code>bind</code> qilmasak, <code>this</code> bosilgan DOM element bo'lib qolardi va <code>this.save</code> topilmasdi." },

        { h2: "\"Behavior\" (xatti-harakat) patterni" },
        { p: "Delegatsiyani nafaqat \"boshqarish\" uchun, balki elementlarga <strong>deklarativ xatti-harakatlar</strong> (behaviors) qo'shish uchun ham ishlatish mumkin. Naqsh ikki qismdan iborat:" },
        { ol: [
          "Elementga uning xatti-harakatini bildiruvchi maxsus atribut qo'shamiz (masalan, <code>data-counter</code>);",
          "Butun hujjat (<code>document</code>) darajasida bitta ishlovchi hodisalarni tinglaydi va agar hodisa shunday atributli elementda bo'lsa, kerakli amalni bajaradi."
        ] },
        { p: "Masalan, <code>data-counter</code> atributi bo'lgan har qanday tugma bosilganda o'z qiymatini oshirsin:" },
        { code: "Hisoblagich: &lt;input type=\"button\" value=\"1\" data-counter&gt;\nBoshqasi: &lt;input type=\"button\" value=\"2\" data-counter&gt;\n\n&lt;script&gt;\n  document.addEventListener('click', function(event) {\n    if (event.target.dataset.counter != undefined) { // agar atribut bo'lsa\n      event.target.value++;\n    }\n  });\n&lt;/script&gt;" },
        { p: "Endi <code>data-counter</code> atributli <strong>istalgan</strong> tugma avtomatik \"hisoblagich\" bo'ladi — hatto sahifaga dinamik qo'shilgani ham. Bu naqshning kuchi: bir elementga bir nechta mustaqil xatti-harakat qo'yish mumkin, ular bir-biriga xalaqit bermaydi." },
        { p: "Yana bir misol — <code>data-toggle-id</code> atributi bilan boshqa elementni ko'rsatish/yashirish:" },
        { code: "&lt;button data-toggle-id=\"subscribe-mail\"&gt;Xat ro'yxatini ko'rsat&lt;/button&gt;\n\n&lt;form id=\"subscribe-mail\" hidden&gt;\n  Elektron pochtangiz: &lt;input type=\"email\"&gt;\n&lt;/form&gt;\n\n&lt;script&gt;\n  document.addEventListener('click', function(event) {\n    let id = event.target.dataset.toggleId;\n    if (!id) return;\n\n    let elem = document.getElementById(id);\n    elem.hidden = !elem.hidden;\n  });\n&lt;/script&gt;" },
        { tip: "Behavior patterni HTML'ni deklarativ qiladi: element o'zining xatti-harakatini atribut orqali \"e'lon qiladi\", JavaScript esa umumiy mantiqni bir joyda saqlaydi. Bu murakkab ilovalarni yig'ishda ajoyib ishlaydi — komponentni sahifaga qo'yish uchun faqat kerakli atributlar bilan HTML yozasiz." },

        { h2: "Delegatsiyaning afzalliklari" },
        { ul: [
          "<strong>Xotira tejaladi:</strong> minglab elementlar o'rniga bitta ishlovchi — DOM'da har biriga ishlovchi qo'shish shart emas;",
          "<strong>Kod qisqaradi:</strong> element qo'shish/o'chirishda ishlovchilarni qo'lda biriktirish/olib tashlash kerak emas;",
          "<strong>Dinamik elementlar:</strong> keyinroq qo'shilgan elementlar ham avtomatik ishlaydi (<code>innerHTML</code> va hokazo bilan);",
          "<strong>Kamroq kod, kamroq xato:</strong> <code>innerHTML</code> yoki shunga o'xshash usullar bilan DOM'ni erkin o'zgartirish mumkin — hodisalar buzilmaydi."
        ] },

        { h2: "Delegatsiyaning kamchiliklari" },
        { ul: [
          "Hodisa <strong>ko'tarilishi</strong> (bubbling) shart. Ba'zi hodisalar ko'tarilmaydi. Shuningdek, past darajadagi ishlovchilar <code>event.stopPropagation()</code> chaqirmasligi kerak, aks holda hodisa yuqoriga yetib bormaydi;",
          "Konteyner darajasidagi ishlovchi <strong>barcha</strong> hodisalarga javob berishi kerak — hatto bizni qiziqtirmaydiganlariga ham. Bu odatda arzon (yengil), lekin juda faol hodisalarda (masalan, <code>mousemove</code>) hisobga olish kerak;",
          "Ba'zan qo'shimcha tekshiruv kerak: <code>event.target</code> aniq kerakli element ekanini (yoki <code>closest</code> orqali eng yaqin mos elementni) aniqlash lozim."
        ] },

        { h2: "Xulosa" },
        { p: "Hodisa delegatsiyasi haqiqatan ham ajoyib naqsh. Uni qo'llash algoritmi:" },
        { ol: [
          "Konteynerga bitta ishlovchi qo'yamiz;",
          "Ishlovchi ichida <code>event.target</code> orqali hodisa qaysi elementda boshlanganini aniqlaymiz;",
          "Agar bizni qiziqtirgan element bo'lsa (masalan, mos <code>tagName</code>, <code>class</code> yoki <code>data-*</code> atribut), hodisani qayta ishlaymiz."
        ] },
        { p: "Bu naqsh xotira va kod jihatidan tejamkor, dinamik elementlar bilan ajoyib ishlaydi va \"behavior\" naqshi orqali HTML'ni deklarativ qilishga imkon beradi." }
      ]
    },
    {
      slug: "default-actions",
      title: "Brauzerning standart harakatlari",
      blurb: "preventDefault bilan standart harakatni to'xtatish; onclick uchun return false; passive; event.defaultPrevented; havola va forma misollari.",
      body: [
        { lead: "Ko'p hodisalar avtomatik ravishda brauzerning <strong>standart harakatiga</strong> (default action) olib keladi. Masalan, havolaga bosish yangi manzilga o'tkazadi, forma tugmasi ma'lumotni yuboradi. Ba'zan bu harakatni to'xtatib, o'zimiz JavaScript bilan boshqarmoqchi bo'lamiz." },

        { h2: "Standart harakatlar" },
        { p: "Brauzerning standart harakatlariga misollar:" },
        { ul: [
          "Havolaga (<code>&lt;a&gt;</code>) bosish — <code>href</code>dagi URL manziliga o'tishga olib keladi;",
          "Forma yuborish tugmasini bosish — serverga so'rov yuborishni boshlaydi;",
          "Matn ustida sichqonchani bosib sudrash — matn belgilanadi (selection);",
          "<code>&lt;input&gt;</code>da o'ng tugma bosish — kontekst menyusini ochadi."
        ] },
        { p: "Ba'zan bu harakatlar kerak emas — biz o'z mantig'imizni ishlatmoqchimiz. Standart harakatni <strong>to'xtatish</strong> mumkin." },

        { h2: "event.preventDefault()" },
        { p: "Brauzer harakatini to'xtatishning asosiy usuli — hodisa obyektidagi <code>event.preventDefault()</code> metodini chaqirish. Masalan, havolani \"harakatsiz\" qilamiz:" },
        { code: "&lt;a href=\"/\" onclick=\"event.preventDefault()\"&gt;Bu yerga bosing&lt;/a&gt;" },
        { p: "Endi havolaga bossak, brauzer <code>/</code> manziliga o'tmaydi — standart harakat bekor qilinadi. <code>addEventListener</code> orqali ham xuddi shunday:" },
        { code: "menuLink.addEventListener('click', function(event) {\n  event.preventDefault();\n  // o'rniga o'z mantig'imizni bajaramiz:\n  showCustomMenu();\n});" },
        { note: "Odatda standart harakati bor hodisalar <strong>ko'tariladi</strong> (bubble). Agar biror element ustidagi ishlovchida <code>preventDefault()</code> chaqirilsa, standart harakat butunlay to'xtaydi — hatto ko'tarilish davomida boshqa ishlovchilar bo'lsa ham." },

        { h2: "onclick uchun return false" },
        { p: "HTML atributi yoki DOM xossasi (<code>on&lt;hodisa&gt;</code>) orqali biriktirilgan ishlovchida standart harakatni to'xtatishning yana bir usuli — <code>false</code> qaytarish:" },
        { code: "&lt;a href=\"/\" onclick=\"return false\"&gt;Bu yerga bosing&lt;/a&gt;\n\n&lt;!-- yoki funksiyada: --&gt;\n&lt;a href=\"/\" onclick=\"handler()\"&gt;havola&lt;/a&gt;\n&lt;script&gt;\n  function handler() {\n    alert('...');\n    return false; // brauzer /  ga o'tmaydi\n  }\n&lt;/script&gt;" },
        { p: "<code>on&lt;hodisa&gt;</code> ishlovchisidan <code>false</code> qaytarilsa, bu <code>event.preventDefault()</code> chaqirilgandek ta'sir qiladi — standart harakat to'xtaydi." },
        { warn: "<code>return false</code> faqat <code>on&lt;hodisa&gt;</code> (atribut yoki DOM xossasi) ishlovchilarida ishlaydi. <code>addEventListener</code> bilan biriktirilgan ishlovchida <code>return false</code>ning hech qanday ta'siri <strong>yo'q</strong> — u shunchaki e'tiborsiz qoldiriladi. <code>addEventListener</code>da doim <code>event.preventDefault()</code> ishlating." },
        { warn: "Ishlovchidan qaytariladigan qiymat odatda e'tiborga olinmaydi. Yagona istisno — <code>on&lt;hodisa&gt;</code> ishlovchisidan qaytarilgan <code>false</code>. Boshqa har qanday qiymat (jumladan <code>true</code>, <code>undefined</code>) hech narsaga ta'sir qilmaydi." },

        { h2: "event.defaultPrevented" },
        { p: "Standart harakat to'xtatilganini tekshirish uchun <code>event.defaultPrevented</code> xossasi bor. Agar <code>preventDefault()</code> chaqirilgan bo'lsa, u <code>true</code> bo'ladi:" },
        { code: "elem.oncontextmenu = function(event) {\n  event.preventDefault();\n  alert('Elementning o'z menyusi');\n};" },
        { p: "Bu xossa bir hodisaga bir necha darajada ishlov berilganda foydali. Masalan, ichki element o'z kontekst menyusini ko'rsatib, standart menyuni to'xtatgan bo'lsin. Tashqi element (yoki <code>document</code>) buni bilib, o'z ishini o'tkazib yuborishi mumkin:" },
        { code: "document.oncontextmenu = function(event) {\n  // agar quyi darajadagi ishlovchi allaqachon preventDefault qilgan bo'lsa,\n  // biz o'z menyumizni ko'rsatmaymiz\n  if (event.defaultPrevented) return;\n\n  event.preventDefault();\n  alert('Hujjatning umumiy menyusi');\n};" },
        { tip: "<code>event.defaultPrevented</code> ba'zan <code>event.stopPropagation()</code>ga muqobil bo'la oladi. <code>stopPropagation()</code> ko'tarilishni butunlay to'xtatib, boshqa ishlovchilarga \"bu yerda hech narsa bo'lmagan\" degandek ko'rsatadi va \"o'lik zonalar\" yaratishi mumkin. <code>defaultPrevented</code> esa hodisani to'xtatmasdan, boshqa ishlovchilarga \"standart harakat allaqachon boshqa joyda qayta ishlangan\" degan xabarni beradi — bu ko'pincha xavfsizroq yondashuv." },

        { h2: "passive ishlovchilar" },
        { p: "<code>addEventListener</code>ning <code>passive: true</code> opsiyasi brauzerga ishlovchi <code>preventDefault()</code>ni <strong>chaqirmasligini</strong> oldindan aytadi." },
        { p: "Nega bu kerak? Mobil qurilmalarda <code>touchmove</code> kabi hodisalar bor (barmoq ekranda harakatlanganda) — ular sahifani aylantirishga (scroll) olib keladi. Odatda brauzer aylantirishni <em>boshlashdan avval</em> ishlovchi <code>preventDefault()</code> chaqiradimi-yo'qmi, kutishi kerak. Bu kutish sahifa aylanishida sezilarli kechikish (lag) beradi." },
        { code: "elem.addEventListener('touchmove', function(event) {\n  // aylantirishni to'xtatib bo'lmaydi (preventDefault e'tiborsiz)\n}, { passive: true });" },
        { p: "<code>passive: true</code> bilan brauzer bilib turadiki, aylantirish to'xtatilmaydi — shuning uchun u darhol silliq aylantiradi, ishlovchini kutmaydi. Natijada sahifa ravon ishlaydi." },
        { warn: "Ba'zi brauzerlarda <code>touchstart</code> va <code>touchmove</code> hodisalari uchun <code>passive</code> <strong>standart bo'yicha <code>true</code></strong>. Ya'ni bunday ishlovchida <code>preventDefault()</code> chaqirsangiz, u ishlamaydi (ba'zan konsolda ogohlantirish chiqadi). Agar rostdan <code>preventDefault()</code> kerak bo'lsa, aniq <code>{ passive: false }</code> bering." },

        { h2: "Muhim: qaysi hodisalar to'xtatiladi?" },
        { p: "Standart harakati bor hodisalarni to'xtatish mumkin, lekin hodisaning o'zi baribir sodir bo'ladi. Masalan, havolaga bosganda <code>click</code> hodisasi ishlaydi, biz faqat <em>navigatsiyani</em> (o'tishni) to'xtatamiz." },
        { note: "Standart harakatni to'xtatib, o'rniga o'z mantig'ini qo'yish — juda keng tarqalgan. Masalan, JavaScript bilan boshqariladigan formalar (AJAX orqali yuborish), o'z navigatsiya tizimlari, maxsus kontekst menyular — barchasi <code>preventDefault()</code>ga tayanadi." },

        { h2: "Xulosa" },
        { ul: [
          "Ko'p hodisalarning <strong>standart brauzer harakati</strong> bor: havola o'tishi, forma yuborilishi va hokazo;",
          "Standart harakatni to'xtatish uchun <code>event.preventDefault()</code> chaqiriladi;",
          "<code>on&lt;hodisa&gt;</code> ishlovchisida <code>return false</code> ham xuddi shunday ishlaydi (lekin <code>addEventListener</code>da emas!);",
          "<code>event.defaultPrevented</code> — standart harakat to'xtatilgan-to'xtatilmaganini bildiradi (<code>true</code>/<code>false</code>);",
          "<code>passive: true</code> — brauzerga ishlovchi <code>preventDefault()</code> chaqirmasligini bildiradi, aylantirish (scroll) ravonligini oshiradi."
        ] }
      ]
    },
    {
      slug: "custom-events",
      title: "Maxsus hodisalar",
      blurb: "new Event, CustomEvent (detail bilan), dispatchEvent, bubbles/cancelable, ichma-ich hodisalar va o'z komponentlaringda maxsus hodisalar bilan ishlash.",
      body: [
        { lead: "Nafaqat brauzer, biz ham o'z <strong>maxsus hodisalarimizni</strong> (custom events) yaratib, ularni istalgan elementda ishga tushira olamiz. Bu, ayniqsa, o'z komponentlaringni yozganda foydali: komponent \"tashqi dunyoga\" biror voqea yuz berganini hodisa orqali xabar qiladi." },

        { h2: "Event konstruktori" },
        { p: "Yangi hodisa obyekti <code>Event</code> ichki (built-in) konstruktori orqali yaratiladi:" },
        { code: "let event = new Event(type, options);" },
        { ul: [
          "<code>type</code> — hodisa turi, string. Bu standart (<code>'click'</code>) yoki o'zimiz o'ylab topgan (<code>'my-event'</code>) bo'lishi mumkin;",
          "<code>options</code> — ikki ixtiyoriy xossaga ega obyekt: <code>bubbles: true/false</code> (agar <code>true</code> bo'lsa, hodisa ko'tariladi) va <code>cancelable: true/false</code> (agar <code>true</code> bo'lsa, standart harakatni <code>preventDefault()</code> bilan to'xtatib bo'ladi)."
        ] },
        { note: "Standart bo'yicha ikkovi ham <code>false</code>: <code>{ bubbles: false, cancelable: false }</code>. Ya'ni maxsus hodisa aytmasangiz ko'tarilmaydi va bekor qilinmaydi." },

        { h2: "dispatchEvent" },
        { p: "Hodisa obyektini yaratgach, uni elementda \"ishga tushirish\" (fire) uchun <code>elem.dispatchEvent(event)</code> chaqiriladi. So'ng ishlovchilar go'yo bu haqiqiy brauzer hodisasidek javob beradi:" },
        { code: "&lt;button id=\"elem\" onclick=\"alert('Klik!');\"&gt;Avtoklik&lt;/button&gt;\n\n&lt;script&gt;\n  let event = new Event('click');\n  elem.dispatchEvent(event);\n&lt;/script&gt;" },
        { p: "Bu yerda hech kim tugmani bosmasa ham, biz <code>'click'</code> hodisasini dasturiy tarzda yaratib yubordik — shuning uchun <code>onclick</code> ishlovchisi ishga tushadi va \"Klik!\" ko'rsatiladi." },
        { note: "<code>event.isTrusted</code> xossasi hodisa haqiqiy foydalanuvchi harakatidanmi (<code>true</code>) yoki skript orqali yaratilganmi (<code>false</code>) ekanini ajratadi. Skript orqali <code>dispatchEvent</code> qilingan hodisalarda u <code>false</code> bo'ladi." },

        { h2: "Maxsus hodisalar ham ko'tariladi" },
        { p: "O'z nomi bilan hodisa yaratib, uni ko'tariladigan qilishimiz mumkin. Buning uchun <code>bubbles: true</code> beramiz:" },
        { code: "&lt;h1 id=\"elem\"&gt;Salom, dunyodan&lt;/h1&gt;\n\n&lt;script&gt;\n  // hujjat darajasida maxsus 'hello' hodisasini tinglaymiz\n  document.addEventListener('hello', function(event) {\n    alert('Salom, ' + event.target.tagName); // Salom, H1\n  });\n\n  // ...va uni elementda ishga tushiramiz:\n  let event = new Event('hello', { bubbles: true });\n  elem.dispatchEvent(event);\n&lt;/script&gt;" },
        { p: "Muhim jihatlar:" },
        { ul: [
          "Maxsus hodisalar ko'tarilishi uchun <code>{ bubbles: true }</code> aniq berilishi shart;",
          "Standart hodisalar (<code>click</code>) va maxsus hodisalarni bir xil tarzda — <code>addEventListener</code> bilan tinglaymiz. Nom istalgancha bo'lishi mumkin (<code>'hello'</code>, <code>'my-event'</code> va hokazo)."
        ] },
        { note: "Yangi hodisa nomlarini o'ylab topsak ham, standart hodisa nomlaridan (masalan, <code>'click'</code>) foydalanmaslik yaxshi — chalkashlik va kutilmagan xatti-harakatlar oldini olish uchun ko'pincha o'z prefiksli nomlar (masalan, <code>'menu-open'</code>) ishlatiladi." },

        { h2: "CustomEvent va detail" },
        { p: "Maxsus hodisaga <strong>qo'shimcha ma'lumot</strong> biriktirish uchun <code>Event</code> o'rniga maxsus <code>CustomEvent</code> konstruktori ishlatiladi. Uning <code>detail</code> degan qo'shimcha xossasi bor — istalgan ma'lumotni shu orqali uzatamiz:" },
        { code: "&lt;h1 id=\"elem\"&gt;Salom Ali uchun&lt;/h1&gt;\n\n&lt;script&gt;\n  elem.addEventListener('hello', function(event) {\n    alert(event.detail.name); // Ali\n  });\n\n  elem.dispatchEvent(new CustomEvent('hello', {\n    detail: { name: 'Ali' }\n  }));\n&lt;/script&gt;" },
        { p: "<code>detail</code> xossasi istalgan turdagi qiymat bo'lishi mumkin: string, obyekt, massiv va hokazo. Ishlovchi ichida u <code>event.detail</code> orqali olinadi." },
        { tip: "Texnik jihatdan <code>CustomEvent</code> deyarli <code>Event</code> bilan bir xil, bitta farqi bor: ikkinchi argumentda <code>detail</code> xossasini qabul qiladi. Nima uchun oddiy <code>Event</code>ga o'z xossalarini qo'shmaymiz? Chunki <code>CustomEvent</code> nomi kodni o'qiganlarga bu maxsus hodisa ekanini va unda qanaqadir qo'shimcha ma'lumot borligini <strong>aniq bildiradi</strong> — bu yaxshi kelishuv (konvensiya)." },

        { h2: "Maxsus hodisalarni bekor qilish" },
        { p: "Maxsus hodisalarda ham \"standart harakat\" tushunchasini yaratish mumkin. Buning uchun hodisani <code>cancelable: true</code> bilan yaratamiz, ishlovchi <code>preventDefault()</code> chaqirsa, <code>dispatchEvent</code> <code>false</code> qaytaradi:" },
        { code: "&lt;pre id=\"rabbit\"&gt;Quyoncha&lt;/pre&gt;\n&lt;button onclick=\"hide()\"&gt;Yashir()&lt;/button&gt;\n\n&lt;script&gt;\n  function hide() {\n    let event = new CustomEvent('hide', {\n      cancelable: true // preventDefault ishlashi uchun zarur\n    });\n\n    if (!rabbit.dispatchEvent(event)) {\n      alert('Harakat ishlovchi tomonidan bekor qilindi');\n    } else {\n      rabbit.hidden = true;\n    }\n  }\n\n  rabbit.addEventListener('hide', function(event) {\n    if (confirm('preventDefault chaqiraymi?')) {\n      event.preventDefault();\n    }\n  });\n&lt;/script&gt;" },
        { p: "Bu yerda \"hide\" hodisasini tinglagan kod uni bekor qila oladi. <code>dispatchEvent</code> agar biror ishlovchi <code>preventDefault()</code> chaqirgan bo'lsa <code>false</code>, aks holda <code>true</code> qaytaradi — shu orqali harakatni davom ettirish yoki to'xtatishni hal qilamiz." },
        { warn: "<code>preventDefault()</code> faqat hodisa <code>cancelable: true</code> bilan yaratilgan bo'lsa ishlaydi. Aks holda uni chaqirish e'tiborsiz qoldiriladi." },

        { h2: "Ichma-ich hodisalar sinxrondir" },
        { p: "Odatda hodisalar navbatda (queue) qayta ishlanadi. Masalan, brauzer <code>onclick</code>ni ishlab turgan payt yangi <code>mousemove</code> yuz bersa, uning ishlovchisi <code>onclick</code> tugagach chaqiriladi." },
        { p: "Ammo bir istisno bor: agar hodisa boshqa hodisa ichida <code>dispatchEvent</code> bilan ishga tushirilsa, u <strong>navbatni kutmaydi</strong>, balki darhol <strong>sinxron</strong> qayta ishlanadi. Ya'ni yangi hodisa ishlovchisi bajarilib bo'lgach, boshqaruv tashqi kodga qaytadi." },
        { code: "&lt;button id=\"menu\"&gt;Menyu (chertib ko'ring)&lt;/button&gt;\n\n&lt;script&gt;\n  menu.onclick = function() {\n    alert(1);\n\n    // menu-open hodisasi darhol (sinxron) qayta ishlanadi\n    menu.dispatchEvent(new CustomEvent('menu-open', { bubbles: true }));\n\n    alert(2);\n  };\n\n  document.addEventListener('menu-open', () => alert('ichki'));\n&lt;/script&gt;" },
        { p: "Chiqish tartibi: <strong>1 &rarr; ichki &rarr; 2</strong>. Ya'ni <code>dispatchEvent</code> ichma-ich hodisani darhol, tashqi kod davom etishidan <em>oldin</em> ishlab bo'ladi." },
        { tip: "Agar ichma-ich hodisa sinxron bo'lishini istamasangiz (masalan, cheksiz aylanish yoki chalkashlikni oldini olish uchun), uni <code>dispatchEvent</code>dan keyin nol-kechikishli <code>setTimeout(() =&gt; elem.dispatchEvent(event), 0)</code> ichida chaqirish mumkin — shunda u navbatga tushib, joriy kod tugagach ishlaydi." },

        { h2: "O'z komponentlaringda maxsus hodisalar" },
        { p: "Maxsus hodisalar mustaqil komponentlar yaratishda juda foydali. Komponent \"tashqariga\" o'z ichki holatidagi o'zgarishlarni maxsus hodisa orqali xabar qiladi, tashqi kod esa unga obuna bo'ladi. Bu komponentni tashqi koddan <strong>ajratib</strong> (decoupling) turadi — komponent kim tinglayotganini bilmaydi." },
        { code: "// Komponent ichida (masalan, o'z galereyangiz):\nfunction goNext(slider) {\n  // ... slaydni almashtiramiz ...\n\n  // tashqi dunyoga xabar beramiz:\n  slider.elem.dispatchEvent(new CustomEvent('slide-changed', {\n    bubbles: true,\n    detail: { index: slider.current }\n  }));\n}\n\n// Tashqi kod komponent ichini bilmasdan tinglaydi:\nsliderElem.addEventListener('slide-changed', function(event) {\n  console.log('Yangi slayd: ' + event.detail.index);\n});" },
        { note: "Bu naqsh brauzerning o'zi ishlatadigan usulga o'xshaydi: <code>&lt;input&gt;</code> <code>input</code>/<code>change</code> hodisalarini, <code>&lt;video&gt;</code> <code>play</code>/<code>pause</code> hodisalarini yuboradi. Siz ham o'z komponentlaringni shu uslubda yozib, uni \"ekotizimga\" tabiiy moslashtira olasiz." },

        { h2: "Xulosa" },
        { ul: [
          "Maxsus hodisa <code>new Event(type, { bubbles, cancelable })</code> yoki qo'shimcha ma'lumotli <code>new CustomEvent(type, { detail, bubbles, cancelable })</code> bilan yaratiladi;",
          "Uni <code>elem.dispatchEvent(event)</code> orqali elementda ishga tushiramiz;",
          "<code>bubbles: true</code> — hodisa ko'tariladi; <code>cancelable: true</code> — <code>preventDefault()</code> orqali bekor qilinishi mumkin;",
          "Qo'shimcha ma'lumot <code>CustomEvent</code>ning <code>detail</code> xossasida uzatiladi va ishlovchida <code>event.detail</code> orqali olinadi;",
          "<code>dispatchEvent</code> ichida ishga tushgan hodisalar <strong>sinxron</strong> qayta ishlanadi (navbatni kutmaydi);",
          "Maxsus hodisalar mustaqil, bir-biridan ajralgan komponentlar yaratishda — komponent tashqi dunyoga voqealarni xabar qilishida juda foydali."
        ] }
      ]
    }
  ]
};
