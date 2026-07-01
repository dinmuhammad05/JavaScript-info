"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Promise, async/await",
  lessons: [
    {
      slug: "callback",
      title: "Kirish: callback'lar",
      blurb: "Asinxron harakatlar, callback g'oyasi, xatolik-birinchi (error-first) uslub va \"callback jahannami\" muammosi.",
      body: [
        { lead: "JavaScript'da ko'p funksiyalar <em>asinxron</em> harakatlarni — ya'ni hozir boshlanib, keyinroq tugaydigan ishlarni — rejalashtiradi. Bunday harakatlar tugaganda natijani qanday qabul qilamiz? Eng qadimiy va sodda usul — <strong>callback</strong> funksiyalar. Ushbu darsda callback g'oyasini, uning kuchli va zaif tomonlarini ko'rib chiqamiz." },

        { h2: "Asinxron harakat nima?" },
        { p: "<strong>Asinxron</strong> harakat — bu hozir boshlanadigan, ammo kelajakda (keyinroq) yakunlanadigan ish. Masalan:" },
        { ul: [
          "Serverdan ma'lumot yuklab olish (tarmoq so'rovi);",
          "Ma'lum vaqt kutish (<code>setTimeout</code>);",
          "Diskdan fayl o'qish (Node.js);",
          "Tashqi skript yoki modulni yuklash."
        ] },
        { p: "Bunday harakatlar sekin bo'lishi mumkin, shuning uchun JavaScript ularni kutib turmaydi — kod bajarilishda davom etadi, natija esa tayyor bo'lganda alohida yetkaziladi." },
        { note: "JavaScript <em>bir oqimli</em> (single-threaded) tildir. Ya'ni u bir vaqtda faqat bitta ishni bajaradi. Asinxron mexanizmlar aynan shu tufayli muhim: sekin ishlarni kutib turmasdan, dastur bloklanmasligini ta'minlaydi." },

        { h2: "setTimeout — eng sodda asinxron misol" },
        { p: "Keling, biror kodni ma'lum vaqtdan keyin ishga tushiruvchi <code>setTimeout</code> misolidan boshlaymiz. Uning ikkinchi argumenti — millisekundlardagi kutish vaqti:" },
        { code: "console.log(\"Boshlandi\");\n\nsetTimeout(function () {\n  console.log(\"1 sekunddan keyin\");\n}, 1000);\n\nconsole.log(\"Tugadi\");\n\n// Konsolda tartib:\n// Boshlandi\n// Tugadi\n// 1 sekunddan keyin   <- eng oxirida, 1 sekunddan so'ng" },
        { p: "E'tibor bering: <code>\"Tugadi\"</code> so'zi <code>\"1 sekunddan keyin\"</code>dan <strong>oldin</strong> chiqdi. Chunki <code>setTimeout</code> ichidagi funksiya darhol bajarilmaydi — u keyinroq chaqiriladi. Kod esa uni kutib turmaydi, pastga davom etadi." },
        { p: "Mana bu funksiya — <code>setTimeout</code>ga uzatilgan va \"keyin chaqirib qo'ying\" deb topshirilgan funksiya — <strong>callback</strong> deb ataladi." },

        { h2: "Callback g'oyasi" },
        { p: "<strong>Callback</strong> (so'zma-so'z \"qayta chaqirish\") — bu boshqa funksiyaga <em>argument sifatida</em> uzatiladigan va asinxron harakat tugaganda chaqiriladigan funksiya. G'oya sodda: \"Sen ishingni bajar, tugatgach mana bu funksiyani chaqir\"." },
        { p: "Faraz qilaylik, biror skriptni yuklab, so'ng u yuklangach biror ish qilmoqchimiz. Yuklash asinxron bo'lgani uchun, \"yuklangandan keyin\"gi kodni callback shaklida uzatamiz:" },
        { code: "function loadScript(src, callback) {\n  const script = document.createElement(\"script\");\n  script.src = src;\n\n  // Skript yuklanib bo'lganda brauzer callback'ni chaqiradi\n  script.onload = function () {\n    callback(script);\n  };\n\n  document.head.append(script);\n}\n\n// Foydalanish:\nloadScript(\"/my/script.js\", function (script) {\n  console.log(\"Skript yuklandi: \" + script.src);\n  // Endi skript ichidagi funksiyalardan foydalanishimiz mumkin\n});" },
        { p: "Bu yerda <code>loadScript</code> ikkinchi argument sifatida funksiya (callback) qabul qiladi va skript yuklangach uni chaqiradi. Shunday qilib, biz asinxron harakat <em>tugaganidan keyin</em> bajariladigan kodni belgilay oldik." },
        { tip: "Callback'ning asosiy afzalligi: u sodda va tushunarli. Kichik, bir bosqichli asinxron ishlar uchun bu yechim juda qulay." },

        { h2: "Xatolik-birinchi (error-first) callback" },
        { p: "Yuqoridagi misolda hammasi yaxshi ketishini nazarda tutdik. Ammo real hayotda xatolik bo'lishi mumkin — skript topilmasligi, tarmoq uzilishi va hokazo. Callback bunday holatni ham qabul qila olishi kerak." },
        { p: "JavaScript va ayniqsa Node.js hamjamiyatida bu muammo uchun <strong>error-first callback</strong> (xatolik-birinchi callback) uslubi qabul qilingan. Uning qoidalari:" },
        { ul: [
          "Callback'ning <strong>birinchi argumenti</strong> — xatolik uchun ajratiladi. Agar xatolik bo'lsa, u shu yerga uzatiladi;",
          "<strong>Keyingi argumentlar</strong> — muvaffaqiyatli natijalar uchun;",
          "Agar xatolik bo'lmasa, birinchi argument <code>null</code> bo'ladi."
        ] },
        { code: "function loadScript(src, callback) {\n  const script = document.createElement(\"script\");\n  script.src = src;\n\n  script.onload = function () {\n    // Xatolik yo'q: birinchi argument null, ikkinchisi natija\n    callback(null, script);\n  };\n\n  script.onerror = function () {\n    // Xatolik bor: uni birinchi argumentga uzatamiz\n    callback(new Error(\"Skript yuklanmadi: \" + src));\n  };\n\n  document.head.append(script);\n}\n\n// Foydalanish:\nloadScript(\"/my/script.js\", function (error, script) {\n  if (error) {\n    console.log(\"Xatolik yuz berdi: \" + error.message);\n  } else {\n    console.log(\"Muvaffaqiyat: \" + script.src);\n  }\n});" },
        { p: "Endi bitta callback ikki xil vaziyatni ham boshqaradi: avval <code>error</code>ni tekshiramiz, xatolik bo'lmasa natija bilan ishlaymiz. Bu uslub juda keng tarqalgan va uni bilish shart." },
        { note: "\"Error-first\" nomi shundan: xatolik doim <strong>birinchi</strong> argumentda turadi. Node.js'ning ko'pgina o'rnatilgan funksiyalari (masalan, <code>fs.readFile</code>) aynan shu qoidaga amal qiladi." },

        { h2: "Callback jahannami (pyramid of doom)" },
        { p: "Callback bitta asinxron harakat uchun ajoyib. Lekin ketma-ket bir nechta asinxron ishni bajarishimiz kerak bo'lsa-chi? Masalan: bitta skriptni yuklab, u yuklangach ikkinchisini, keyin uchinchisini yuklashimiz kerak. Har biri oldingisining callback'i ichida yozilishi kerak:" },
        { code: "loadScript(\"1.js\", function (error, script) {\n  if (error) {\n    handleError(error);\n  } else {\n    // ...\n    loadScript(\"2.js\", function (error, script) {\n      if (error) {\n        handleError(error);\n      } else {\n        // ...\n        loadScript(\"3.js\", function (error, script) {\n          if (error) {\n            handleError(error);\n          } else {\n            // ...uchala skript ham yuklandi\n          }\n        });\n      }\n    });\n  }\n});" },
        { p: "Har bir yangi asinxron harakat qo'shilgani sayin kod o'ngga qarab, ichkariga chuqurroq \"tishlab\" boradi. Chaqiruvlar bir-birining ichiga joylashib, uchburchak (piramida) hosil qiladi. Har birida yana <code>if (error)</code> shoxlanishi bor." },
        { warn: "Bu holat <strong>\"callback jahannami\"</strong> (callback hell) yoki <strong>\"pyramid of doom\"</strong> (halokat piramidasi) deb ataladi. Kod o'qish qiyinlashadi, xatolikni boshqarish takrorlanaveradi, o'zgartirish esa qo'rqinchli bo'lib qoladi." },
        { p: "Ichma-ich joylashuv chuqurlashgani sayin kod \"tortmaga sig'maydigan\" holatga keladi. Buni funksiyalarni alohida ajratib biroz yumshatish mumkin, lekin muammo tubdan hal bo'lmaydi — kod baribir tarqoq bo'lib qoladi." },
        { p: "Aynan shu muammoni chiroyli hal qilish uchun JavaScript'ga <strong>Promise</strong> (va'da) tushunchasi kiritilgan. Keyingi darslarda uni o'rganamiz — u asinxron kodni tekis va tushunarli yozishga imkon beradi." },

        { h2: "Sodda amaliy misol" },
        { p: "Callback shunchaki \"boshqa funksiyaga uzatilgan funksiya\" ekanini yaxshi anglash uchun, sinxron (darhol ishlaydigan) sodda misolni ko'ramiz:" },
        { pg: "function amalBajar(a, b, callback) {\n  const natija = a + b;\n  callback(natija);\n}\n\namalBajar(3, 4, function (natija) {\n  console.log(\"Yig'indi: \" + natija);\n});\n\namalBajar(10, 20, function (natija) {\n  console.log(\"Yana yig'indi: \" + natija);\n});", file: "callback.js" },
        { p: "Bu misolda callback darhol (sinxron) chaqiriladi, shuning uchun natija konsolda ko'rinadi. Real asinxron misollarda esa (setTimeout, tarmoq so'rovi) callback keyinroq chaqiriladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Asinxron harakat</strong> — hozir boshlanib, keyin tugaydigan ish (setTimeout, tarmoq, fayl);",
          "<strong>Callback</strong> — asinxron harakat tugaganda chaqirilishi uchun boshqa funksiyaga uzatilgan funksiya;",
          "<strong>Error-first uslub</strong> — callback'ning birinchi argumenti xatolik uchun, keyingilari natija uchun;",
          "Ketma-ket ko'p asinxron ish callback'lar ichma-ich joylashuviga — <strong>callback jahannami</strong>ga olib keladi;",
          "Bu muammoni <strong>Promise</strong> chiroyli hal qiladi — keyingi darsda o'rganamiz."
        ] }
      ]
    },

    {
      slug: "promise",
      title: "Promise",
      blurb: "new Promise(executor), resolve/reject, holatlar (pending/fulfilled/rejected) va .then/.catch/.finally metodlari.",
      body: [
        { lead: "<strong>Promise</strong> (\"va'da\") — asinxron harakat natijasini chiroyli boshqarish uchun maxsus obyekt. U callback jahannamining oldini oladi va kodni tekis, o'qilishi oson qiladi. Ushbu darsda Promise nima ekani, uning holatlari va asosiy metodlari bilan tanishamiz." },

        { h2: "Analogiya: qo'shiqchi va muxlislar" },
        { p: "Promise'ni tushunish uchun oddiy analogiya. Faraz qiling, mashhur qo'shiqchi bor. Muxlislar undan yangi qo'shig'i qachon chiqishini so'rab turishadi. Qo'shiqchi ularga <em>va'da</em> beradi: \"Qo'shiq chiqqach, hammangizga xabar beraman\". Muxlislar esa ro'yxatga yozilib qo'yishadi." },
        { p: "Bu yerda ikki ishtirokchi bor:" },
        { ul: [
          "<strong>Ijodkor kod</strong> (qo'shiqchi) — biror vaqt oladigan ishni bajaradi. Bu — <em>\"producing code\"</em>;",
          "<strong>Iste'mol kod</strong> (muxlislar) — natijani kutadi va u tayyor bo'lganda foydalanadi. Bu — <em>\"consuming code\"</em>."
        ] },
        { p: "<strong>Promise</strong> — ularni bog'lovchi maxsus obyekt (ro'yxat kabi). U ijodkor kod tayyor bo'lganda barcha yozilgan iste'molchilarga natijani yetkazadi." },

        { h2: "new Promise(executor) sintaksisi" },
        { p: "Promise obyekti <code>new Promise</code> konstruktori bilan yaratiladi. Unga <em>executor</em> (bajaruvchi) deb ataluvchi funksiya uzatiladi:" },
        { code: "const promise = new Promise(function (resolve, reject) {\n  // Bu yerda ijodkor (asinxron) kod turadi\n  // ... ish tugaganda:\n  //   resolve(natija)  -> muvaffaqiyat\n  //   reject(xato)     -> xatolik\n});" },
        { p: "Executor funksiya <code>new Promise</code> yaratilishi bilan <strong>darhol va avtomatik</strong> ishga tushadi. Unga JavaScript'ning o'zi ikkita funksiya-argument beradi:" },
        { ul: [
          "<code>resolve(value)</code> — ish <strong>muvaffaqiyatli</strong> tugaganda chaqiriladi, natija <code>value</code>;",
          "<code>reject(error)</code> — <strong>xatolik</strong> yuz berganda chaqiriladi, xato obyekti <code>error</code>."
        ] },
        { note: "<code>resolve</code> va <code>reject</code> funksiyalarini biz o'zimiz yozmaymiz — ularni JavaScript tayyor holda executor'ga beradi. Bizning vazifamiz — ish natijasiga qarab shulardan birini chaqirish." },

        { h2: "Promise holatlari" },
        { p: "Har bir Promise obyekti ichida ikkita muhim ichki xususiyat bor: <code>state</code> (holat) va <code>result</code> (natija). Promise uch holatdan birida bo'ladi:" },
        { ul: [
          "<strong>pending</strong> (kutilmoqda) — boshlang'ich holat. Ish hali tugamagan, natija yo'q;",
          "<strong>fulfilled</strong> (bajarilgan) — <code>resolve(value)</code> chaqirildi. Ish muvaffaqiyatli tugadi;",
          "<strong>rejected</strong> (rad etilgan) — <code>reject(error)</code> chaqirildi. Xatolik yuz berdi."
        ] },
        { p: "Muhim jihat: Promise dastlab <code>pending</code> holatda bo'ladi, so'ng <strong>bir marta</strong> — yo <code>fulfilled</code>, yo <code>rejected</code> holatiga o'tadi. Bu o'tish <em>qaytmas</em>: bir marta hal bo'lgan Promise'ni o'zgartirib bo'lmaydi." },
        { code: "// Muvaffaqiyatli Promise:\nconst yaxshi = new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(\"Bajarildi!\"); // 1 sekunddan keyin fulfilled\n  }, 1000);\n});\n\n// Rad etilgan Promise:\nconst yomon = new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    reject(new Error(\"Nimadir noto'g'ri ketdi\")); // 1 sekunddan keyin rejected\n  }, 1000);\n});" },
        { warn: "<code>resolve</code> yoki <code>reject</code>dan faqat <strong>bittasi</strong> hisobga olinadi — birinchi chaqiruv. Keyingi barcha chaqiruvlar e'tiborsiz qoldiriladi. Shuningdek, <code>resolve</code> va <code>reject</code> faqat bitta argument qabul qiladi, qolganlari inobatga olinmaydi." },

        { h2: ".then — natijani qabul qilish" },
        { p: "Promise'ni <em>yaratdik</em>, endi uning natijasini <em>qabul qilish</em> kerak (iste'mol kod). Buning eng asosiy metodi — <code>.then</code>. U ikkita callback qabul qiladi:" },
        { code: "promise.then(\n  function (result) {\n    // Promise fulfilled bo'lsa: bu funksiya natija bilan chaqiriladi\n    console.log(result);\n  },\n  function (error) {\n    // Promise rejected bo'lsa: bu funksiya xato bilan chaqiriladi\n    console.log(error);\n  }\n);" },
        { p: "Ya'ni: birinchi funksiya — muvaffaqiyat uchun, ikkinchisi — xatolik uchun. Amaliy misol:" },
        { code: "const promise = new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(\"Salom, dunyo!\");\n  }, 1000);\n});\n\npromise.then(\n  function (result) {\n    console.log(\"Natija: \" + result); // 1 sekunddan keyin: Natija: Salom, dunyo!\n  },\n  function (error) {\n    console.log(\"Xato: \" + error);\n  }\n);" },
        { p: "Agar bizni faqat muvaffaqiyat qiziqtirsa, <code>.then</code>ga faqat bitta funksiya uzatishimiz mumkin:" },
        { code: "promise.then(function (result) {\n  console.log(result); // faqat muvaffaqiyatni boshqaradi\n});" },

        { h2: ".catch — faqat xatolikni boshqarish" },
        { p: "Agar bizni faqat xatolik qiziqtirsa, <code>.then(null, funksiya)</code> yozish mumkin. Ammo buning uchun qulayroq va o'qilishi oson metod bor — <code>.catch</code>:" },
        { code: "const promise = new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    reject(new Error(\"Voy, xatolik!\"));\n  }, 1000);\n});\n\n// .catch(f) — bu .then(null, f) bilan bir xil\npromise.catch(function (error) {\n  console.log(\"Ushlangan xato: \" + error.message); // Ushlangan xato: Voy, xatolik!\n});" },
        { note: "<code>.catch(f)</code> — bu <code>.then(null, f)</code>ning qisqacha yozuvi. Faqat xatolikni boshqarish uchun ishlatiladi va kodni ancha o'qilishi oson qiladi." },

        { h2: ".finally — yakuniy tozalash" },
        { p: "<code>.finally</code> — Promise <strong>qanday tugashidan qat'i nazar</strong> (muvaffaqiyat yoki xatolik) doim chaqiriladigan metod. U ko'pincha tozalash ishlari uchun ishlatiladi: masalan, yuklanish indikatorini (spinner) o'chirish." },
        { code: "new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(\"Ma'lumot\");\n  }, 1000);\n})\n  .finally(function () {\n    // Doim ishlaydi: indikatorni o'chirish va h.k.\n    console.log(\"Ish tugadi (muvaffaqiyat yoki xato — farqi yo'q)\");\n  })\n  .then(function (result) {\n    console.log(\"Natija: \" + result);\n  });" },
        { p: "<code>.finally</code>ning muhim xususiyatlari:" },
        { ul: [
          "U <strong>argumentsiz</strong> funksiya qabul qiladi — natija yoki xatoni bilmaydi, chunki uning vazifasi — umumiy tugatish ishlari;",
          "U natijani <strong>o'zgartirmaydi</strong> — natija yoki xato keyingi <code>.then</code>/<code>.catch</code>ga o'zgarishsiz o'tadi;",
          "Har ikki holatda ham (fulfilled/rejected) ishlaydi."
        ] },
        { tip: "<code>.finally</code>ni sinf-metodlaridagi <code>try...finally</code> bilan solishtiring: ikkalasi ham \"nima bo'lishidan qat'i nazar bu kodni bajar\" degan g'oyani ifodalaydi." },

        { h2: "Promise'ning callback'dan afzalligi" },
        { p: "Callback bilan solishtirganda Promise nima yutuq beradi?" },
        { ul: [
          "<strong>Tabiiy tartib</strong> — avval asinxron ishni yozamiz, keyin natija bilan nima qilishni. Callback'da esa avval \"keyin nima qilish\"ni yozib, keyin ishni chaqirardik;",
          "<strong>Ko'p iste'molchi</strong> — bitta Promise'ga <code>.then</code>ni bir necha marta ulash mumkin;",
          "<strong>Zanjirlash</strong> — <code>.then</code>larni ketma-ket ulab, tekis kod yozish mumkin (keyingi darsda);",
          "<strong>Xatoliklarni yagona joyda</strong> boshqarish — <code>.catch</code> orqali."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Promise</strong> — asinxron natijani boshqaruvchi obyekt, <code>new Promise(executor)</code> bilan yaratiladi;",
          "Executor darhol ishga tushadi va <code>resolve(value)</code> yoki <code>reject(error)</code> chaqiradi;",
          "Holatlar: <strong>pending</strong> &rarr; <strong>fulfilled</strong> yoki <strong>rejected</strong> (qaytmas o'tish);",
          "<code>.then(f1, f2)</code> — natija va xatoni qabul qiladi;",
          "<code>.catch(f)</code> — faqat xatoni boshqaradi (= <code>.then(null, f)</code>);",
          "<code>.finally(f)</code> — natijadan qat'i nazar doim ishlaydigan tozalash."
        ] }
      ]
    },

    {
      slug: "promise-chaining",
      title: "Promise zanjiri",
      blurb: ".then zanjiri, qiymatni bosqichma-bosqich uzatish, then ichida promise qaytarish va zanjirning tekis bo'lishi.",
      body: [
        { lead: "Ko'pincha bir nechta asinxron ishni <em>ketma-ket</em> bajarishimiz kerak bo'ladi: masalan, ma'lumot yuklab, uni qayta ishlab, so'ng saqlash. Promise buni <strong>zanjir</strong> (chaining) orqali chiroyli hal qiladi — callback jahannamisiz, tekis kod bilan. Ushbu darsda Promise zanjirini o'rganamiz." },

        { h2: "Zanjirning asosiy g'oyasi" },
        { p: "Promise zanjiri quyidagi g'oyaga asoslanadi: <code>promise.then(...)</code> chaqiruvi <strong>yangi Promise qaytaradi</strong>. Demak, uning ustiga yana <code>.then</code> ulashimiz mumkin. Va yana. Va yana — natijada zanjir hosil bo'ladi:" },
        { code: "new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(1);\n  }, 1000);\n})\n  .then(function (result) {\n    console.log(result); // 1\n    return result * 2;\n  })\n  .then(function (result) {\n    console.log(result); // 2\n    return result * 2;\n  })\n  .then(function (result) {\n    console.log(result); // 4\n    return result * 2;\n  });\n\n// Konsolda: 1, keyin 2, keyin 4" },
        { p: "G'oya shunda: har bir <code>.then</code>dan <code>return</code> qilingan qiymat <strong>keyingi <code>.then</code>ga</strong> uzatiladi. Shunday qilib, natija zanjir bo'ylab bosqichma-bosqich \"oqib\" boradi." },
        { note: "Bu ishlashining sababi: <code>.then</code> har doim yangi Promise qaytaradi. Uning callback'idan qaytgan qiymat esa shu yangi Promise'ning natijasiga aylanadi." },

        { h2: "Xato: zanjir emas, ko'p mustaqil .then" },
        { p: "Yangi boshlovchilar ko'p qiladigan xato — bitta Promise'ga bir nechta <code>.then</code>ni <em>alohida</em> ulash va uni zanjir deb o'ylash. Bu butunlay boshqa narsa:" },
        { code: "const promise = new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(1);\n  }, 1000);\n});\n\n// BU ZANJIR EMAS! Uch mustaqil .then bitta promise'ga ulangan\npromise.then(function (result) {\n  console.log(result); // 1\n  return result * 2;\n});\npromise.then(function (result) {\n  console.log(result); // 1  (2 emas!)\n  return result * 2;\n});\npromise.then(function (result) {\n  console.log(result); // 1  (4 emas!)\n});\n\n// Konsolda: 1, 1, 1" },
        { warn: "Bu yerda uchala <code>.then</code> ham <strong>bitta va o'sha</strong> Promise'ni mustaqil qayta ishlaydi, natijani bir-biriga uzatmaydi. Shuning uchun uchalasi ham <code>1</code> chiqaradi. Zanjir bo'lishi uchun <code>.then</code>lar bir-birining <em>natijasiga</em> ulanishi kerak (nuqta orqali ketma-ket)." },

        { h2: ".then ichida Promise qaytarish" },
        { p: "Zanjirning eng kuchli jihati: <code>.then</code>ning callback'idan oddiy qiymat emas, balki <strong>yangi Promise</strong> qaytarish mumkin. Bunday holda zanjir shu yangi Promise <em>hal bo'lguncha kutadi</em>, so'ng uning natijasi bilan davom etadi." },
        { code: "new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    resolve(1);\n  }, 1000);\n})\n  .then(function (result) {\n    console.log(result); // 1\n\n    // Oddiy qiymat emas, YANGI Promise qaytaramiz:\n    return new Promise(function (resolve, reject) {\n      setTimeout(function () {\n        resolve(result * 2);\n      }, 1000);\n    });\n  })\n  .then(function (result) {\n    // Bu .then yuqoridagi yangi Promise hal bo'lgach ishlaydi\n    console.log(result); // 2\n\n    return new Promise(function (resolve, reject) {\n      setTimeout(function () {\n        resolve(result * 2);\n      }, 1000);\n    });\n  })\n  .then(function (result) {\n    console.log(result); // 4\n  });\n\n// Har bosqich 1 sekund kutadi: 1 (1s), 2 (2s), 4 (3s)" },
        { p: "Aynan shu imkoniyat — <code>.then</code>dan Promise qaytarish — bizga <strong>ketma-ket asinxron</strong> ishlarni tekis yozishga imkon beradi. Har bir bosqich oldingisi tugagach boshlanadi." },
        { tip: "Agar <code>.then</code>dan Promise qaytarsangiz, JavaScript uni \"kutib\" beradi. Agar oddiy qiymat qaytarsangiz — u darhol keyingi bosqichga uzatiladi. Ikkala holat ham bir xil sintaksis bilan ishlaydi." },

        { h2: "Amaliy misol: ketma-ket skript yuklash" },
        { p: "Oldingi darslarda callback bilan uch skriptni ketma-ket yuklaganimizni eslang — piramida hosil bo'lgandi. Promise bilan ayni ishni tekis yozamiz. <code>loadScript</code> endi Promise qaytaradi deb faraz qilaylik:" },
        { code: "// loadScript(src) endi Promise qaytaradi deb faraz qilaylik\n\nloadScript(\"1.js\")\n  .then(function () {\n    return loadScript(\"2.js\");\n  })\n  .then(function () {\n    return loadScript(\"3.js\");\n  })\n  .then(function () {\n    console.log(\"Uchala skript ham ketma-ket yuklandi!\");\n  });" },
        { p: "Callback varianti bilan solishtiring: u yerda kod o'ngga qarab chuqurlashardi (piramida). Bu yerda esa zanjir <strong>tekis</strong> — har bir <code>.then</code> bir xil chuqurlikda, pastga qarab o'qiladi. Bu Promise zanjirining asosiy yutug'i." },
        { note: "Aynan shu \"tekislik\" tufayli Promise callback jahannamini yechadi. Kod chapdan o'ngga emas, yuqoridan pastga o'qiladi — xuddi oddiy sinxron kod kabi." },

        { h2: "Zanjirda qiymatlarni uzatishni tushunish" },
        { p: "Sodda sinxron misol bilan \"qiymat zanjir bo'ylab uzatiladi\" g'oyasini mustahkamlaymiz. Bu yerda darhol hal bo'lgan Promise ishlatilgan, shuning uchun natijalar konsolda ko'rinadi:" },
        { pg: "Promise.resolve(5)\n  .then(function (x) {\n    console.log(\"Bosqich 1: \" + x); // 5\n    return x + 10;\n  })\n  .then(function (x) {\n    console.log(\"Bosqich 2: \" + x); // 15\n    return x * 2;\n  })\n  .then(function (x) {\n    console.log(\"Bosqich 3: \" + x); // 30\n  });", file: "chaining.js" },
        { p: "<code>Promise.resolve(5)</code> — darhol <code>5</code> qiymati bilan bajarilgan Promise yaratadi. So'ng har bosqich oldingisining natijasini oladi, o'zgartiradi va keyingisiga uzatadi: 5 &rarr; 15 &rarr; 30." },
        { note: "<code>Promise.resolve(value)</code> — tayyor (fulfilled) Promise yaratishning qisqa usuli. Zanjirni boshlash yoki qiymatni Promise ichiga \"o'rash\" uchun qulay." },

        { h2: "Xulosa" },
        { ul: [
          "<code>.then</code> har doim <strong>yangi Promise qaytaradi</strong> — shuning uchun zanjirlash mumkin;",
          "<code>.then</code>dan <code>return</code> qilingan qiymat <strong>keyingi</strong> <code>.then</code>ga uzatiladi;",
          "<code>.then</code>dan <strong>Promise</strong> qaytarilsa, zanjir uni kutadi va natijasi bilan davom etadi;",
          "Bir Promise'ga alohida bir necha <code>.then</code> ulash — bu <strong>zanjir emas</strong>, mustaqil qayta ishlashdir;",
          "Promise zanjiri <strong>tekis</strong> bo'ladi — callback piramidasi o'rniga yuqoridan pastga o'qiladi."
        ] }
      ]
    },

    {
      slug: "promise-error",
      title: "Promise bilan xatoliklarni boshqarish",
      blurb: ".catch bilan xatoliklarni ushlash, xatoning zanjir bo'ylab o'tishi, qayta tashlash va unhandledrejection hodisasi.",
      body: [
        { lead: "Asinxron ishlarda xatoliklar muqarrar: tarmoq uzilishi, noto'g'ri ma'lumot, server xatosi. Promise xatoliklarni boshqarishning ancha qulay yo'lini beradi. Ushbu darsda <code>.catch</code>, xatoning zanjir bo'ylab \"sakrashi\", qayta tashlash va e'tiborsiz qolgan rad etishlarni ko'rib chiqamiz." },

        { h2: ".catch xatolikni ushlaydi" },
        { p: "Promise zanjiri uzun bo'lsa ham, xatolikni boshqarish oson: zanjir oxiriga bitta <code>.catch</code> qo'yish kifoya. U zanjirning <strong>istalgan joyida</strong> yuz bergan xatolikni ushlaydi:" },
        { code: "new Promise(function (resolve, reject) {\n  setTimeout(function () {\n    reject(new Error(\"Ma'lumot yuklanmadi!\"));\n  }, 1000);\n})\n  .then(function (result) {\n    console.log(result); // ishlamaydi — xato bo'ldi\n  })\n  .catch(function (error) {\n    console.log(\"Xato ushlandi: \" + error.message); // Xato ushlandi: Ma'lumot yuklanmadi!\n  });" },
        { p: "Reject bo'lgan Promise'da natija <code>.then</code>dan \"sakrab o'tib\", to'g'ridan-to'g'ri eng yaqin <code>.catch</code>ga boradi." },

        { h2: "Xatolik zanjir bo'ylab o'tishi" },
        { p: "Xatoliklarni boshqarishdagi eng muhim tamoyil: <strong>reject (yoki tashlangan xato) zanjir bo'ylab eng yaqin <code>.catch</code>gacha \"sakraydi\"</strong>. Oradagi barcha <code>.then</code>lar o'tkazib yuboriladi." },
        { code: "new Promise(function (resolve, reject) {\n  resolve(1);\n})\n  .then(function (result) {\n    console.log(\"Bosqich 1: \" + result); // 1\n    throw new Error(\"Bosqich 1'da xato!\"); // xato tashlaymiz\n  })\n  .then(function (result) {\n    console.log(\"Bosqich 2\"); // O'TKAZIB YUBORILADI\n  })\n  .then(function (result) {\n    console.log(\"Bosqich 3\"); // O'TKAZIB YUBORILADI\n  })\n  .catch(function (error) {\n    console.log(\"Ushlandi: \" + error.message); // Ushlandi: Bosqich 1'da xato!\n  });" },
        { note: "<code>.then</code> ichida <code>throw</code> qilingan xato ham, <code>reject</code> ham bir xil yo'l bilan boshqariladi — ikkalasi ham Promise'ni rejected qiladi va keyingi <code>.catch</code>ga uzatiladi. Ya'ni Promise ichidagi <code>throw new Error(...)</code> avtomatik <code>reject(...)</code>ga aylanadi." },
        { p: "Bu — juda qulay xususiyat. Uzun zanjirda xatolik qayerda bo'lishidan qat'i nazar, uni bitta joyda — oxirgi <code>.catch</code>da ushlaymiz. Callback'dagi kabi har bosqichda <code>if (error)</code> yozish shart emas." },

        { h2: ".catch'dan keyin zanjir davom etadi" },
        { p: "<code>.catch</code> xatoni ushlab, uni \"tuzatgach\", zanjir <strong>normal (fulfilled) holatda davom etadi</strong>. Chunki <code>.catch</code> ham Promise qaytaradi, va agar u xato tashlamasa, natija muvaffaqiyatli hisoblanadi:" },
        { code: "new Promise(function (resolve, reject) {\n  reject(new Error(\"Boshlang'ich xato\"));\n})\n  .catch(function (error) {\n    console.log(\"Xato tuzatildi: \" + error.message);\n    return \"zaxira qiymat\"; // xatoni \"yamab\", normal qiymat qaytaramiz\n  })\n  .then(function (result) {\n    // Zanjir davom etadi — endi normal holatda\n    console.log(\"Davom: \" + result); // Davom: zaxira qiymat\n  });" },
        { tip: "Bu \"xatodan tiklanish\" (recovery) namunasi: xatolikni ushlab, o'rniga zaxira (fallback) qiymat berib, dasturni to'xtatmasdan davom ettirish mumkin." },

        { h2: "Xatoni qayta tashlash (rethrowing)" },
        { p: "Ba'zan <code>.catch</code> ichida xatoni ushlaymiz-u, lekin uni <em>bartaraf eta olmaymiz</em> — masalan, kutilmagan boshqa turdagi xato. Bunday holda uni <strong>qayta tashlash</strong> (rethrow) mumkin, shunda u keyingi <code>.catch</code>ga o'tadi:" },
        { code: "new Promise(function (resolve, reject) {\n  reject(new Error(\"Tarmoq xatosi\"));\n})\n  .catch(function (error) {\n    if (error.message === \"Tarmoq xatosi\") {\n      console.log(\"Tarmoq xatosini boshqaramiz...\");\n      // bu xatoni hal qila olamiz — davom etamiz\n    } else {\n      // hal qila olmaymiz — qayta tashlaymiz\n      throw error;\n    }\n  })\n  .then(function () {\n    console.log(\"Tarmoq xatosi hal qilingach bu ishlaydi\");\n  })\n  .catch(function (error) {\n    // Faqat qayta tashlangan (hal qilinmagan) xatolar bu yerga keladi\n    console.log(\"Hal qilinmagan xato: \" + error.message);\n  });" },
        { p: "Qoida sodda: agar <code>.catch</code> ichida <code>throw</code> qilsangiz — nazorat <strong>keyingi</strong> <code>.catch</code>ga o'tadi. Agar oddiy qaytsa (throw qilmasa) — zanjir <strong>normal</strong> davom etadi. Bu <code>try...catch</code>ning \"agar hal qila olmasam, yuqoriga uzataman\" tamoyiliga o'xshaydi." },

        { h2: "Ishlov berilmagan rad etishlar (unhandledrejection)" },
        { p: "Agar Promise reject bo'lsa-yu, uni ushlaydigan <strong>hech qanday <code>.catch</code> bo'lmasa</strong> nima bo'ladi? Xato \"tiqilib\" qoladi — dastur bu haqda bilmay qoladi. Buni sezish uchun maxsus global hodisa bor: <code>unhandledrejection</code>." },
        { code: "// Bu Promise reject bo'ladi, ammo .catch YO'Q!\nnew Promise(function (resolve, reject) {\n  reject(new Error(\"E'tiborsiz qolgan xato\"));\n});\n// .then/.catch qo'shilmagan\n\n// Brauzerda global hodisa ishga tushadi:\nwindow.addEventListener(\"unhandledrejection\", function (event) {\n  console.log(\"Ishlov berilmagan rad etish!\");\n  console.log(event.promise); // muammoli Promise obyekti\n  console.log(event.reason);  // xato obyekti (Error)\n});" },
        { p: "<code>unhandledrejection</code> hodisasi — brauzer standartining bir qismi. U <em>hech qayerda ushlanmagan</em> Promise xatosi bo'lganda ishga tushadi. Hodisa obyektining ikki muhim xususiyati bor:" },
        { ul: [
          "<code>event.promise</code> — xatolik yuz bergan Promise obyekti;",
          "<code>event.reason</code> — rad etish sababi (odatda <code>Error</code> obyekti)."
        ] },
        { note: "Node.js'da bu hodisa <code>process.on(\"unhandledRejection\", handler)</code> orqali ushlanadi. Nomlanishi ozgina farq qiladi (bosh harflar), lekin g'oya bir xil." },
        { warn: "Ishlov berilmagan rad etishlar — jiddiy xato belgisidir. Ular odatda kodda unutilgan <code>.catch</code>ni bildiradi. Har bir asinxron zanjir oxirida <strong>albatta</strong> <code>.catch</code> bo'lishini ta'minlang — bu xatoni \"yashirin\" qolishidan saqlaydi." },

        { h2: "Amaliy misol: xatoni ushlab, tiklanish" },
        { p: "Sodda sinxron-o'xshash misol bilan \"xato &rarr; catch &rarr; davom\" oqimini mustahkamlaymiz. Bu yerda darhol reject bo'lgan Promise ishlatilgan, natija konsolda ko'rinadi:" },
        { pg: "Promise.reject(new Error(\"Birinchi xato\"))\n  .catch(function (err) {\n    console.log(\"Ushlandi: \" + err.message);\n    return 42; // zaxira qiymat qaytaramiz\n  })\n  .then(function (val) {\n    console.log(\"Tiklandik, qiymat: \" + val); // 42\n    return val + 8;\n  })\n  .then(function (val) {\n    console.log(\"Yakuniy: \" + val); // 50\n  })\n  .catch(function (err) {\n    console.log(\"Bu ishlamaydi, chunki xato allaqachon hal qilingan\");\n  });", file: "promise-error.js" },
        { p: "E'tibor bering: birinchi <code>.catch</code> xatoni ushlab, <code>42</code> qaytardi. Shundan so'ng zanjir normal davom etdi (42 &rarr; 50). Oxirgi <code>.catch</code> esa ishlamaydi, chunki hech qanday hal qilinmagan xato qolmadi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>.catch</code> zanjirning istalgan joyidagi xatolikni ushlaydi — uni oxiriga qo'yish kifoya;",
          "Reject yoki <code>throw</code> qilingan xato eng yaqin <code>.catch</code>gacha <strong>sakraydi</strong>, oradagi <code>.then</code>lar o'tkazib yuboriladi;",
          "Promise ichidagi <code>throw</code> avtomatik <code>reject</code>ga aylanadi;",
          "<code>.catch</code> xatoni \"yamab\" bo'lgach, zanjir <strong>normal</strong> davom etadi;",
          "<code>.catch</code> ichida <code>throw</code> qilsangiz — xato <strong>keyingi</strong> <code>.catch</code>ga uzatiladi (qayta tashlash);",
          "Ushlanmagan xato <strong>unhandledrejection</strong> hodisasini keltirib chiqaradi — har zanjirda <code>.catch</code> bo'lsin."
        ] }
      ]
    }
  ]
};
