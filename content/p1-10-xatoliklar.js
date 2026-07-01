"use strict";

module.exports = {
  part: "1-qism: JavaScript tili",
  chapter: "Xatoliklarni boshqarish",
  lessons: [
    {
      slug: "try-catch",
      title: "Xatoliklarni boshqarish, try...catch",
      blurb: "try...catch...finally, Error obyekti, throw operatori va o'z xatoliklaringizni tashlash.",
      body: [
        { lead: "Kod qanchalik yaxshi yozilmasin, xatolar muqarrar. Sababi ko'p: bizning xatomiz, kutilmagan foydalanuvchi kiritmasi, noto'g'ri server javobi va yana minglab holatlar. Odatda xato bo'lganda skript \"o'ladi\" (to'xtaydi) va konsolga xato chiqadi. Ammo <code>try...catch</code> sintaksisi bunday xatolarni \"ushlab olib\", skriptni to'xtatmasdan, oqilona harakat qilishga imkon beradi." },

        { h2: "try...catch sintaksisi" },
        { p: "<code>try...catch</code> konstruksiyasi ikki asosiy blokdan iborat: <code>try</code> va so'ng <code>catch</code>:" },
        { code: "try {\n\n  // kod...\n\n} catch (err) {\n\n  // xatoni qayta ishlash\n\n}" },
        { p: "U quyidagicha ishlaydi:" },
        { ol: [
          "Avval <code>try {...}</code> ichidagi kod bajariladi;",
          "Agar xato bo'lmasa, <code>catch(err)</code> bloki e'tiborsiz qoldiriladi: bajarilish <code>try</code> oxiriga yetadi va <code>catch</code>dan sakrab o'tadi;",
          "Agar xato yuz bersa, <code>try</code> bajarilishi <em>o'sha joyda</em> to'xtaydi va boshqaruv <code>catch(err)</code> blokining boshiga o'tadi. <code>err</code> o'zgaruvchisi (istalgan nom bo'lishi mumkin) nima yuz berganini tavsiflovchi <em>xato obyektini</em> saqlaydi."
        ] },
        { p: "Shunday qilib, <code>try {...}</code> ichidagi xato skriptni o'ldirmaydi — bizda uni <code>catch</code> ichida qayta ishlash imkoni bor." },
        { p: "Xatosiz misol — <code>catch</code> umuman ishlamaydi:" },
        { pg: "try {\n  console.log(\"try blokining boshi\");    // (1)\n  // ... bu yerda xato yo'q ...\n  console.log(\"try blokining oxiri\");     // (2)\n} catch (err) {\n  console.log(\"catch e'tiborsiz qoldirildi, chunki xato yo'q\"); // (3)\n}\nconsole.log(\"...so'ng kod davom etadi\");", file: "xatosiz.js" },
        { p: "Endi xatoli misol:" },
        { pg: "try {\n  console.log(\"try blokining boshi\");         // (1)\n  qandaydirYoqNarsa;  // XATO: o'zgaruvchi aniqlanmagan!\n  console.log(\"try blokining oxiri (bajarilmaydi)\"); // (2)\n} catch (err) {\n  console.log(\"catch ishga tushdi, xatoni ushladik\"); // (3)\n}\nconsole.log(\"...so'ng skript o'lmasdan davom etadi\");", file: "xatoli.js" },
        { p: "E'tibor bering: xatodan keyingi <code>(2)</code> qatori umuman bajarilmadi. JavaScript darhol <code>catch</code>ga sakradi, skriptni butunlay to'xtatmadi." },

        { h2: "try...catch faqat runtime xatolar uchun ishlaydi" },
        { p: "<code>try...catch</code> ishlashi uchun kod bajarilayotgan (\"runnable\") bo'lishi shart. Ya'ni u to'g'ri JavaScript bo'lishi kerak." },
        { warn: "Agar kod sintaktik jihatdan noto'g'ri bo'lsa (masalan, yopilmagan qavs — <code>{{{{</code>), <code>try...catch</code> yordam bermaydi. JavaScript dvigateli avval kodni o'qiydi (parse qiladi), so'ng ishga tushiradi. Parse bosqichida topilgan xatolar \"parse-time\" xatolari deb ataladi va ular <code>try...catch</code> ichida ushlanmaydi — chunki dvigatel bu kodni tushunmaydi." },
        { p: "Demak, <code>try...catch</code> faqat to'g'ri kodda yuz beradigan xatolarni ushlaydi. Bunday xatolar <em>\"runtime errors\"</em> (ishga tushish paytidagi xatolar) yoki ba'zan <em>\"exceptions\"</em> (istisnolar) deb ataladi." },

        { h2: "try...catch sinxron ishlaydi" },
        { p: "Agar xato \"rejalashtirilgan\" kodda (masalan, <code>setTimeout</code> ichida) yuz bersa, uni <code>try...catch</code> ushlay olmaydi:" },
        { code: "try {\n  setTimeout(function() {\n    noSuchVariable; // skript bu yerda to'xtaydi\n  }, 1000);\n} catch (err) {\n  console.log(\"ushlanmaydi!\");\n}" },
        { p: "Chunki <code>setTimeout</code> ichidagi funksiya keyinroq, dvigatel <code>try...catch</code> konstruksiyasidan allaqachon chiqib ketgandan so'ng bajariladi. Xatoni ushlash uchun <code>try...catch</code> aynan o'sha funksiya ichida bo'lishi kerak:" },
        { code: "setTimeout(function() {\n  try {\n    noSuchVariable; // endi try...catch xatoni ushlaydi!\n  } catch (err) {\n    console.log(\"xato bu yerda ushlandi\");\n  }\n}, 1000);" },
        { note: "Asinxron kod (<code>async/await</code>) bilan ishlaganda ham xuddi shu qoida amal qiladi, u haqda keyingi boblarda batafsil to'xtalamiz." },

        { h2: "Error obyekti" },
        { p: "Xato yuz berganda, JavaScript uni tavsiflovchi <em>obyekt</em> yaratadi. So'ng bu obyekt <code>catch</code>ga argument sifatida uzatiladi:" },
        { code: "try {\n  // ...\n} catch (err) { // <-- \"xato obyekti\", boshqa nom ham berilsa bo'ladi\n  // ...\n}" },
        { p: "O'rnatilgan xatolar uchun error obyekti ikkita asosiy xususiyatga ega:" },
        { ul: [
          "<code>name</code> — xato nomi. Masalan, aniqlanmagan o'zgaruvchi uchun bu <code>\"ReferenceError\"</code> bo'ladi;",
          "<code>message</code> — xato tafsiloti haqidagi matnli xabar."
        ] },
        { p: "Ko'p muhitlarda yana bir standart bo'lmagan, lekin keng qo'llab-quvvatlanadigan xususiyat bor:" },
        { ul: [
          "<code>stack</code> — xatoga olib kelgan chaqiruvlar ketma-ketligi (call stack). Debugging uchun juda foydali."
        ] },
        { pg: "try {\n  noSuchVariable; // aniqlanmagan o'zgaruvchi\n} catch (err) {\n  console.log(\"name:\", err.name);       // ReferenceError\n  console.log(\"message:\", err.message); // noSuchVariable is not defined\n  // stack — chaqiruvlar zanjiri (uzun matn):\n  console.log(\"stack (birinchi qator):\", String(err.stack).split(\"\\n\")[0]);\n}", file: "error-obyekti.js" },
        { tip: "Xato obyektini butunicha ham chiqarish mumkin: <code>console.log(err)</code> yoki matn sifatida <code>console.log(err + \"\")</code> — u <code>name: message</code> ko'rinishida chiqadi." },

        { h2: "Amaliy misol: JSON.parse xatosi" },
        { p: "Amalda <code>try...catch</code> eng ko'p ma'lumotni o'qiyotganda kerak bo'ladi. Masalan, serverdan yoki foydalanuvchidan kelgan JSON matnini <code>JSON.parse</code> bilan tahlil qilamiz. Agar matn buzuq bo'lsa, <code>JSON.parse</code> xato tashlaydi va skript to'xtaydi. Buni oldini olamiz:" },
        { pg: "let json = \"{ buzuq json }\"; // noto'g'ri JSON\n\ntry {\n  let user = JSON.parse(json); // <-- bu yerda xato\n  console.log(user.name);      // bajarilmaydi\n} catch (err) {\n  console.log(\"Ma'lumotlarda xatolik bor, qayta urinib ko'ramiz.\");\n  console.log(\"Xato turi:\", err.name);\n  console.log(\"Tafsilot:\", err.message);\n}\nconsole.log(\"Skript o'lmadi — davom etyapmiz.\");", file: "json-parse.js" },
        { p: "Endi to'g'ri JSON bilan solishtiring — <code>catch</code> ishlamaydi:" },
        { pg: "let json = '{\"name\": \"Ali\", \"age\": 30}'; // to'g'ri JSON\n\ntry {\n  let user = JSON.parse(json);\n  console.log(\"Ism:\", user.name);\n  console.log(\"Yosh:\", user.age);\n} catch (err) {\n  console.log(\"Bu blok bajarilmaydi\");\n}", file: "json-togri.js" },

        { h2: "throw operatori — o'z xatolaringizni tashlash" },
        { p: "Yuqoridagi JSON misolida qiziq holat bor: JSON matni to'g'ri bo'lishi mumkin, lekin unda kerakli maydon (masalan, <code>name</code>) yo'q bo'lishi mumkin. Bunda <code>JSON.parse</code> xato tashlamaydi — chunki JSON o'zi haqiqiy. Lekin biz uchun bu <em>xato</em>. Bunday holatlarni o'zimiz aniqlab, <em>o'z xatomizni</em> tashlashimiz kerak. Buning uchun <code>throw</code> operatori ishlatiladi." },
        { code: "throw &lt;xato obyekti&gt;" },
        { p: "Texnik jihatdan istalgan qiymatni <code>throw</code> bilan tashlash mumkin (son, satr), lekin eng yaxshi amaliyot — <code>Error</code> yoki uning avlodlaridan foydalanish. JavaScriptda standart o'rnatilgan xato konstruktorlari bor:" },
        { ul: [
          "<code>Error</code> — umumiy xato;",
          "<code>SyntaxError</code> — sintaktik xato (masalan, buzuq JSON);",
          "<code>ReferenceError</code> — aniqlanmagan o'zgaruvchiga murojaat;",
          "<code>TypeError</code> — noto'g'ri turdagi qiymat bilan amal;",
          "<code>RangeError</code> — ruxsat etilgan diapazondan chiqib ketish."
        ] },
        { p: "Ularning barchasi bir xil chaqiriladi — argument sifatida <code>message</code> beriladi:" },
        { pg: "let error = new Error(\"Nimadir noto'g'ri ketdi o_O\");\n\nconsole.log(error.name);    // Error\nconsole.log(error.message); // Nimadir noto'g'ri ketdi o_O\n\nlet te = new TypeError(\"noto'g'ri tur\");\nconsole.log(te.name);       // TypeError\nconsole.log(te.message);    // noto'g'ri tur", file: "error-yaratish.js" },
        { p: "Endi <code>throw</code> yordamida to'liq misolni ko'ramiz — JSON to'g'ri, lekin <code>name</code> maydoni yo'q:" },
        { pg: "let json = '{\"age\": 30}'; // JSON to'g'ri, lekin \"name\" yo'q\n\ntry {\n  let user = JSON.parse(json); // xato yo'q — JSON haqiqiy\n\n  if (!user.name) {\n    throw new SyntaxError(\"Ma'lumot to'liq emas: name maydoni yo'q\"); // <-- o'zimiz tashlaymiz\n  }\n\n  console.log(user.name); // bajarilmaydi\n} catch (err) {\n  console.log(\"JSON Xato: \" + err.message);\n  // JSON Xato: Ma'lumot to'liq emas: name maydoni yo'q\n}", file: "throw-misol.js" },
        { p: "Diqqat qiling: <code>catch</code> bloki ikkala turdagi xatoni ham ushlaydi — <code>JSON.parse</code> tashlaganini ham, biz <code>throw</code> qilganimizni ham. Bu juda qulay: bitta joyda barcha xatolar bilan ishlaymiz." },

        { h2: "Qayta tashlash (rethrowing)" },
        { p: "Yuqoridagi <code>catch</code> hamma xatolarni ushlaydi. Lekin bu muammo tug'diradi: <code>catch(err)</code> <em>faqat</em> biz kutgan xatoni (to'liq emas ma'lumot) qayta ishlashi kerak edi. Agar u yerda kutilmagan boshqa xato bo'lsa-chi? Masalan, biz kod yozishda xato qilib, aniqlanmagan o'zgaruvchini chaqirsak — bu <code>ReferenceError</code>ni ham \"JSON Xato\" deb ko'rsatib qo'yamiz, bu esa debugging'ni qiyinlashtiradi." },
        { p: "Yechim <em>\"qayta tashlash\"</em> (rethrowing) texnikasi: <code>catch</code> faqat o'zi biladigan xatolarni qayta ishlaydi, qolganlarini esa <code>throw err</code> orqali \"yuqoriga\" uzatadi." },
        { ol: [
          "<code>catch</code> hamma xatoni oladi;",
          "<code>catch (err) {...}</code> blokida biz <code>err</code>ni tekshiramiz — bu qanday xato?;",
          "Agar biz uni qanday qayta ishlashni bilmasak — <code>throw err</code> qilamiz."
        ] },
        { p: "Odatda tur <code>instanceof</code> operatori bilan tekshiriladi:" },
        { pg: "let json = '{\"age\": 30}';\n\ntry {\n  let user = JSON.parse(json);\n\n  if (!user.name) {\n    throw new SyntaxError(\"Ma'lumot to'liq emas\");\n  }\n\n  blabla(); // kutilmagan xato (funksiya yo'q -> ReferenceError)\n\n  console.log(user.name);\n} catch (err) {\n  if (err instanceof SyntaxError) {\n    console.log(\"JSON Xato: \" + err.message);\n  } else {\n    console.log(\"Bu men kutmagan xato, uni qayta tashlayman.\");\n    throw err; // <-- xatoni yuqoriga uzatamiz\n  }\n}", file: "rethrow.js" },
        { p: "Yuqorida <code>blabla()</code> mavjud emas, shuning uchun <code>ReferenceError</code> yuz beradi. U <code>SyntaxError</code> emas, shuning uchun <code>throw err</code> ishga tushadi va xato \"yuqoriga\" tashlanadi. Agar bu <code>try...catch</code> tashqarisida yana bir <code>try...catch</code> bo'lsa, xatoni o'sha ushlaydi. Aks holda skript to'xtaydi." },
        { tip: "Rethrowing qoidasi: <code>catch</code> faqat o'zi tushunadigan xatolar bilan ishlashi, boshqalarini esa qayta tashlashi kerak. Bu \"begona\" xatolarni yashirib qo'yishning oldini oladi." },

        { h2: "try...catch...finally" },
        { p: "<code>try...catch</code>ning to'liq shakli yana bir ixtiyoriy blokka ega — <code>finally</code>. Agar u mavjud bo'lsa, u <em>har doim</em> bajariladi:" },
        { ul: [
          "<code>try</code> muvaffaqiyatli tugaganda — <code>finally</code> ishlaydi;",
          "<code>try</code>da xato bo'lganda va <code>catch</code> ishlaganda ham — <code>finally</code> ishlaydi."
        ] },
        { code: "try {\n  // ... kodni bajarishga urinamiz ...\n} catch (err) {\n  // ... xatolarni qayta ishlaymiz ...\n} finally {\n  // ... har doim bajariladi ...\n}" },
        { pg: "try {\n  console.log(\"try boshlandi\");\n  throw new Error(\"biror xato\");\n} catch (err) {\n  console.log(\"catch: xato ushlandi -> \" + err.message);\n} finally {\n  console.log(\"finally: bu HAR DOIM ishlaydi\");\n}\n// Tartib: try boshlandi -> catch -> finally", file: "finally.js" },
        { p: "<code>finally</code> odatda biror ishni boshlaganimizda va uni xato bo'ladimi-yo'qmi, baribir yakunlashimiz kerak bo'lganda ishlatiladi — masalan, o'lchashni to'xtatish, ulanishni yopish, yuklanish indikatorini o'chirish." },
        { pg: "let start = Date.now();\n\nfunction hisobla(n) {\n  if (n < 0) {\n    throw new RangeError(\"n manfiy bo'lmasligi kerak\");\n  }\n  let natija = 1;\n  for (let i = 1; i <= n; i++) natija *= i;\n  return natija;\n}\n\ntry {\n  console.log(\"Natija:\", hisobla(-5)); // xato tashlaydi\n} catch (err) {\n  console.log(\"Xato:\", err.message);\n} finally {\n  let end = Date.now();\n  console.log(\"O'lchash yakunlandi. Ish vaqti (ms):\", end - start);\n}", file: "finally-vaqt.js" },
        { note: "<code>finally</code> hatto <code>try</code> yoki <code>catch</code> ichida <code>return</code> bo'lsa ham ishlaydi! <code>return</code> qiymatni tayyorlaydi, lekin funksiya haqiqatan chiqishidan oldin <code>finally</code> bajariladi." },
        { pg: "function test() {\n  try {\n    console.log(\"try ichida\");\n    return \"try natijasi\";\n  } finally {\n    console.log(\"finally: return dan OLDIN ishladi\");\n  }\n}\n\nconsole.log(\"Qaytgan qiymat:\", test());\n// try ichida\n// finally: return dan OLDIN ishladi\n// Qaytgan qiymat: try natijasi", file: "finally-return.js" },
        { note: "<code>catch</code> blokini tushirib qoldirsa ham bo'ladi: <code>try...finally</code> shaklida. Bunda xatolar ushlanmaydi (yuqoriga tashlanadi), lekin <code>finally</code> baribir ishlaydi — masalan, tozalash uchun." },

        { h2: "Global catch (qisqacha)" },
        { p: "Agar <code>try...catch</code> tashqarisida o'lik xato yuz bersa, skript \"o'ladi\". Ba'zan bunday <em>ushlanmagan</em> xatolarni bir joyda umumiy tarzda ushlash foydali — masalan, jurnalga yozish (log) yoki foydalanuvchiga xabar berish uchun." },
        { p: "Muhitga qarab mexanizm boshqacha:" },
        { ul: [
          "<strong>Brauzer</strong>: <code>window.onerror = function(message, url, line, col, error) {...}</code> — global xato ishlovchisi;",
          "<strong>Node.js</strong>: <code>process.on(\"uncaughtException\", function(err) {...})</code> — ushlanmagan istisnolar uchun."
        ] },
        { warn: "Global ushlagich — <em>oxirgi chora</em>. U skriptni to'liq \"tuzatmaydi\": xato allaqachon yuz bergan, dastur holati buzuq bo'lishi mumkin. Uni asosan xatolarni qayd qilish (logging) va monitoring xizmatlariga (masalan, Sentry) yuborish uchun ishlating, dasturning oddiy oqimi uchun emas." },

        { h2: "Xulosa" },
        { ul: [
          "<code>try...catch</code> <em>runtime</em> xatolarni ushlaydi: <code>try</code>da xato bo'lsa, boshqaruv <code>catch</code>ga o'tadi va skript to'xtamaydi;",
          "U <em>sinxron</em> ishlaydi va <em>parse-time</em> (sintaktik) xatolarni ushlamaydi;",
          "<strong>Error obyekti</strong>ning asosiy xususiyatlari: <code>name</code>, <code>message</code>, <code>stack</code>;",
          "<code>throw</code> operatori bilan o'z xatolarimizni tashlaymiz — eng yaxshisi <code>new Error(...)</code> yoki uning turlari;",
          "<strong>Rethrowing</strong>: <code>catch</code> faqat o'zi biladigan xatolarni ishlatadi, boshqalarini <code>throw err</code> orqali qayta tashlaydi;",
          "<code>finally</code> bloki har doim (return bo'lsa ham) ishlaydi — tozalash uchun ideal;",
          "Ushlanmagan xatolar uchun <em>global</em> ishlovchi (brauzerda <code>window.onerror</code>, Node.js'da <code>uncaughtException</code>) mavjud."
        ] }
      ]
    },
    {
      slug: "custom-error",
      title: "Maxsus xatoliklar, Error'ni kengaytirish",
      blurb: "Error'dan extends qilish, o'z xato klasslari, instanceof, xatoliklar ierarxiyasi va wrapping.",
      body: [
        { lead: "Ilovamiz murakkablashgani sari, bizga o'z <em>maxsus xato turlari</em> kerak bo'ladi. Masalan, tarmoq operatsiyasida <code>HttpError</code>, ma'lumotlarni tekshirishda <code>ValidationError</code> va hokazo. Bunday xatolar HTTP status kodi yoki noto'g'ri maydon nomi kabi qo'shimcha ma'lumotlarni saqlashi kerak. JavaScriptda o'z xatolarimizni yaratish uchun ularni <code>Error</code>dan meros olib (<code>extends</code>) yasaymiz." },

        { h2: "Nega Error'ni kengaytiramiz?" },
        { p: "Faraz qilaylik, bizda <code>readUser(json)</code> funksiyasi bor — u JSON matnini o'qiydi. To'liq ishlashi uchun foydalanuvchida <code>name</code> va <code>age</code> maydonlari bo'lishi kerak. Agar ular bo'lmasa, bu <code>SyntaxError</code> emas — chunki JSON o'zi to'g'ri. Bu <em>boshqa</em> turdagi xato. Uni <code>ValidationError</code> deb ataymiz." },
        { p: "Bizning xato klassimiz standart xatolar kabi <code>message</code>, <code>name</code>, <code>stack</code> xususiyatlarini qo'llab-quvvatlashi kerak. Buning uchun eng oson yo'l — o'rnatilgan <code>Error</code> klassidan meros olish." },

        { h2: "Error'dan extends qilish" },
        { p: "<code>Error</code> klassini kengaytiramiz. <code>Error</code>ning tuzilishi taxminan shunday (soddalashtirilgan):" },
        { code: "// JavaScript'ning ichki o'rnatilgan Error klassi (taxminan)\nclass Error {\n  constructor(message) {\n    this.message = message;\n    this.name = \"Error\"; // o'rnatilgan xatolar uchun turli nomlar\n    this.stack = /* chaqiruvlar steki */;\n  }\n}" },
        { p: "Endi undan <code>ValidationError</code>ni meros olamiz:" },
        { pg: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);      // ota-klass konstruktorini chaqiramiz\n    this.name = \"ValidationError\"; // o'z nomimizni beramiz\n  }\n}\n\nfunction test() {\n  throw new ValidationError(\"Xatoli!\");\n}\n\ntry {\n  test();\n} catch (err) {\n  console.log(err.name);    // ValidationError\n  console.log(err.message); // Xatoli!\n}", file: "validation-error.js" },
        { p: "Muhim jihatlar:" },
        { ul: [
          "<code>super(message)</code>ni chaqirish shart — bu <code>Error</code> konstruktoriga <code>message</code>ni beradi va <code>this.message</code>ni to'g'ri o'rnatadi;",
          "<code>this.name</code>ni o'zimiz belgilaymiz — chunki <code>Error</code> konstruktori uni <code>\"Error\"</code> qilib qo'yadi. Odatda klass nomi bilan bir xil qilinadi."
        ] },

        { h2: "instanceof bilan tekshirish" },
        { p: "Endi <code>readUser</code>ni yozamiz va <code>ValidationError</code> tashlaymiz. Xatoni ushlaganda uning aynan qaysi tur ekanligini <code>instanceof</code> orqali aniqlaymiz:" },
        { pg: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"ValidationError\";\n  }\n}\n\nfunction readUser(json) {\n  let user = JSON.parse(json); // buzuq JSON bo'lsa -> SyntaxError\n\n  if (!user.age) {\n    throw new ValidationError(\"'age' maydoni yo'q\");\n  }\n  if (!user.name) {\n    throw new ValidationError(\"'name' maydoni yo'q\");\n  }\n  return user;\n}\n\ntry {\n  let user = readUser('{\"age\": 25}'); // name yo'q\n} catch (err) {\n  if (err instanceof ValidationError) {\n    console.log(\"Noto'g'ri ma'lumot: \" + err.message);\n  } else if (err instanceof SyntaxError) {\n    console.log(\"JSON Sintaksis xatosi: \" + err.message);\n  } else {\n    throw err; // noma'lum xato -> qayta tashlaymiz\n  }\n}", file: "instanceof.js" },
        { p: "<code>instanceof</code> nafaqat aynan klassni, balki uning barcha <em>ota-klasslarini</em> ham tan oladi. Ya'ni <code>ValidationError</code> ham <code>Error</code>ning avlodi bo'lgani uchun:" },
        { pg: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"ValidationError\";\n  }\n}\n\nlet err = new ValidationError(\"test\");\n\nconsole.log(err instanceof ValidationError); // true\nconsole.log(err instanceof Error);           // true — chunki meros olingan!\nconsole.log(err.name);                       // ValidationError", file: "instanceof-hierarchy.js" },
        { tip: "Xatoni tekshirishda odatda aniq (<code>ValidationError</code>) turdan umumiy (<code>Error</code>) tur tomon boradigan tartibda <code>instanceof</code> ishlatiladi. Aks holda umumiy tur birinchi bo'lib \"ushlab olib\", aniq shohobchalarga yetib bormaydi." },

        { h2: "Xatoliklar ierarxiyasi" },
        { p: "Ilova o'sgani sari, xatolar ham ko'payadi. Masalan, <code>PropertyRequiredError</code> — aynan qaysi maydon yetishmayotganini bildiradigan aniqroq xato. U <code>ValidationError</code>dan meros olishi mumkin. Shunday qilib <em>ierarxiya</em> (daraxt) hosil bo'ladi:" },
        { code: "Error\n └── ValidationError\n      └── PropertyRequiredError" },
        { pg: "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"ValidationError\";\n  }\n}\n\n// ValidationError'ni yanada aniqlashtiramiz\nclass PropertyRequiredError extends ValidationError {\n  constructor(property) {\n    super(\"Maydon yo'q: \" + property);\n    this.name = \"PropertyRequiredError\";\n    this.property = property; // qaysi maydon — qo'shimcha ma'lumot\n  }\n}\n\nfunction readUser(json) {\n  let user = JSON.parse(json);\n  if (!user.age) throw new PropertyRequiredError(\"age\");\n  if (!user.name) throw new PropertyRequiredError(\"name\");\n  return user;\n}\n\ntry {\n  readUser('{\"age\": 25}');\n} catch (err) {\n  if (err instanceof ValidationError) { // PropertyRequiredError HAM shu turga kiradi!\n    console.log(\"Noto'g'ri ma'lumot: \" + err.message);\n    console.log(\"Yetishmayotgan maydon: \" + err.property);\n    console.log(\"Xato nomi: \" + err.name);\n  } else if (err instanceof SyntaxError) {\n    console.log(\"JSON Sintaksis xatosi: \" + err.message);\n  } else {\n    throw err;\n  }\n}", file: "ierarxiya.js" },
        { p: "E'tibor bering: <code>catch</code>da biz <code>instanceof ValidationError</code> deb tekshirsak, u <code>PropertyRequiredError</code>ni ham qamrab oladi — chunki u <code>ValidationError</code>ning avlodi. Bu ierarxiyaning kuchi: bitta tekshiruv butun bir tarmoqni ushlaydi." },
        { note: "<code>this.name</code>ni har bir konstruktorda qo'lda yozib chiqish zerikarli. Buning o'rniga <em>asosiy</em> maxsus xato klassi yaratib, unda <code>this.name = this.constructor.name</code> deb yozish mumkin — shunda avlodlar nomni avtomatik oladi." },
        { pg: "class MyError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = this.constructor.name; // klass nomini avtomatik oladi\n  }\n}\n\nclass ValidationError extends MyError {} // name'ni yozish shart emas!\n\nclass PropertyRequiredError extends ValidationError {\n  constructor(property) {\n    super(\"Maydon yo'q: \" + property);\n    this.property = property;\n  }\n}\n\nconsole.log(new PropertyRequiredError(\"email\").name); // PropertyRequiredError", file: "auto-name.js" },

        { h2: "Xatolarni o'rash (Wrapping exceptions)" },
        { p: "Ierarxiya foydali, lekin muammosi bor. Faraz qilaylik, <code>readUser</code>ni chaqiruvchi kod turli-tuman xatolar (<code>ValidationError</code>, <code>SyntaxError</code>, kelajakda yana boshqalar) haqida qayg'urishi kerak. Har safar yangi xato turi qo'shilganda, uni chaqiruvchi <em>hamma</em> joyda tekshiruvni yangilashimiz kerak bo'ladi. Bu noqulay." },
        { p: "Yechim — <strong>wrapping</strong> (o'rash) texnikasi:" },
        { ol: [
          "Barcha \"quyi darajali\" xatolarni umumlashtiruvchi bitta klass yaratamiz — masalan, <code>ReadError</code>;",
          "<code>readUser</code> ichidagi <code>try...catch</code> quyi darajali xatolarni (<code>ValidationError</code>, <code>SyntaxError</code>) ushlaydi;",
          "So'ng ularni bitta umumiy <code>ReadError</code> ichiga \"o'rab\", uni tashlaydi. Asl xato esa <code>cause</code> (sabab) xususiyatida saqlanadi."
        ] },
        { p: "Endi chaqiruvchi kod faqat bitta <code>ReadError</code>ni tekshirsa kifoya. Tafsilot kerak bo'lsa, <code>err.cause</code>ni ochib ko'radi:" },
        { pg: "class ReadError extends Error {\n  constructor(message, cause) {\n    super(message);\n    this.cause = cause; // asl (o'ralgan) xato\n    this.name = \"ReadError\";\n  }\n}\n\nclass ValidationError extends Error {\n  constructor(message) { super(message); this.name = \"ValidationError\"; }\n}\n\nfunction validateUser(user) {\n  if (!user.age) throw new ValidationError(\"'age' yo'q\");\n  if (!user.name) throw new ValidationError(\"'name' yo'q\");\n}\n\nfunction readUser(json) {\n  let user;\n  try {\n    user = JSON.parse(json);\n  } catch (err) {\n    if (err instanceof SyntaxError) {\n      throw new ReadError(\"Sintaksis Xatosi\", err); // o'raymiz\n    } else {\n      throw err;\n    }\n  }\n\n  try {\n    validateUser(user);\n  } catch (err) {\n    if (err instanceof ValidationError) {\n      throw new ReadError(\"Validatsiya Xatosi\", err); // o'raymiz\n    } else {\n      throw err;\n    }\n  }\n  return user;\n}\n\n// Chaqiruvchi kod endi FAQAT ReadError'ni biladi:\ntry {\n  readUser(\"{buzuq json}\");\n} catch (err) {\n  if (err instanceof ReadError) {\n    console.log(\"Umumiy xato: \" + err.message);\n    console.log(\"Asl (cause) xato: \" + err.cause.name + \" -> \" + err.cause.message);\n  } else {\n    throw err;\n  }\n}", file: "wrapping.js" },
        { p: "Endi ikkinchi holatni — validatsiya xatosini — sinab ko'ring: JSON to'g'ri, lekin maydon yo'q:" },
        { pg: "class ReadError extends Error {\n  constructor(message, cause) {\n    super(message);\n    this.cause = cause;\n    this.name = \"ReadError\";\n  }\n}\nclass ValidationError extends Error {\n  constructor(message) { super(message); this.name = \"ValidationError\"; }\n}\n\nfunction readUser(json) {\n  let user = JSON.parse(json); // to'g'ri JSON\n  try {\n    if (!user.name) throw new ValidationError(\"'name' yo'q\");\n  } catch (err) {\n    if (err instanceof ValidationError) {\n      throw new ReadError(\"Validatsiya Xatosi\", err);\n    }\n    throw err;\n  }\n  return user;\n}\n\ntry {\n  readUser('{\"age\": 25}'); // name yo'q\n} catch (err) {\n  if (err instanceof ReadError) {\n    console.log(\"Tashqi xato: \" + err.name + \" (\" + err.message + \")\");\n    console.log(\"Ichki sabab: \" + err.cause.name + \" (\" + err.cause.message + \")\");\n  }\n}", file: "wrapping-2.js" },
        { note: "Zamonaviy JavaScriptda <code>Error</code> konstruktori ikkinchi argument sifatida <code>{ cause }</code> obyektini qabul qiladi: <code>new Error(\"...\", { cause: err })</code>. Bu <code>cause</code>ni saqlashning standart usuli. Yuqorida biz uni sodda ko'rinishda qo'lda o'rnatdik." },
        { tip: "Wrapping'ning asosiy foydasi — <em>abstraksiya darajasi</em>. Chaqiruvchi kod pastki qavatdagi barcha xato turlarini bilishi shart emas; u faqat \"o'qishda xato bo'ldi\" (<code>ReadError</code>) degan umumiy ma'lumotni oladi, kerak bo'lganda esa <code>cause</code> orqali chuqurroq kirib ko'radi." },

        { h2: "Xulosa" },
        { ul: [
          "O'z xatolarimizni <code>class MyError extends Error</code> ko'rinishida yasaymiz;",
          "Konstruktorda <code>super(message)</code>ni chaqirish va <code>this.name</code>ni belgilash shart;",
          "Xatolarni <code>err instanceof MyError</code> orqali tekshiramiz — u ota-klasslarni ham qamrab oladi;",
          "Xatolardan <strong>ierarxiya</strong> (daraxt) yasash mumkin: aniqroq xatolar umumiyroqlaridan meros oladi;",
          "<code>this.name = this.constructor.name</code> nomni avtomatik olishga yordam beradi;",
          "<strong>Wrapping</strong>: past darajali xatolarni bitta umumiy xatoga o'rab, aslini <code>cause</code>da saqlaymiz — bu chaqiruvchi kodni soddalashtiradi."
        ] }
      ]
    }
  ]
};
