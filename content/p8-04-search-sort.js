"use strict";
module.exports = {
  part: "8-qism: Algoritmlar va ma'lumotlar tuzilmalari",
  chapter: "Qidiruv va saralash",
  lessons: [
    {
      slug: "binary-search",
      title: "Ikkilik qidiruv (Binary Search)",
      blurb: "Saralangan massivda O(log n) da qidirish, chap/o'ng chegaralar, klassik xatolar va binary search ustidagi variatsiyalar.",
      body: [
        { lead: "Tasavvur qiling, qo'lingizda ming sahifalik lug'at bor va siz \"salom\" so'zini qidiryapsiz. Hech kim lug'atni birinchi sahifadan boshlab, so'z-ba-so'z varaqlamaydi. Aksincha, taxminan o'rtasini ochamiz, harfga qaraymiz va \"chapdami yoki o'ngda\" degan qarorni bir zumda qabul qilamiz. Aynan shu oddiy odat — kompyuter fanidagi eng nafis algoritmlardan biri: ikkilik qidiruv. Bu darsda uni noldan quramiz, Big O bilan tahlil qilamiz va professional dasturchilar ham qiladigan klassik xatolardan qochishni o'rganamiz." },

        { h2: "Muammo: chiziqli qidiruv sekin" },
        { p: "Massivda biror qiymatni topishning eng sodda usuli — <strong>chiziqli qidiruv</strong> (linear search): birinchi elementdan boshlab, oxirigacha bittalab tekshirib chiqamiz." },
        { pg: "function chiziqliQidiruv(massiv, nishon) {\n  for (let i = 0; i < massiv.length; i++) {\n    if (massiv[i] === nishon) {\n      return i;  // topildi, indeksni qaytaramiz\n    }\n  }\n  return -1;  // topilmadi\n}\n\nconst sonlar = [3, 8, 12, 17, 25, 31, 40];\nconsole.log(chiziqliQidiruv(sonlar, 25));  // 4\nconsole.log(chiziqliQidiruv(sonlar, 100)); // -1", file: "linear-search.js" },
        { p: "Bu ishlaydi, lekin sekin. Agar massivda million element bo'lsa va qidirayotgan qiymatimiz oxirida (yoki umuman yo'q) bo'lsa, million marta taqqoslash qilamiz. Bu <strong>O(n)</strong> — elementlar soni ortishi bilan ish vaqti ham chiziqli o'sadi." },
        { p: "Chiziqli qidiruvning kuchli tomoni bor: u massiv <em>qanday</em> tartibda bo'lishidan qat'i nazar ishlaydi. Ammo agar massivimiz allaqachon <strong>saralangan</strong> bo'lsa, biz bu tartibdan foydalanib, qidiruvni bir necha barobar tezlashtira olamiz." },

        { h2: "G'oya: har qadamda yarmini tashla" },
        { p: "Ikkilik qidiruvning butun sehri bitta kuzatuvda: agar massiv saralangan bo'lsa, o'rtadagi elementga qarab, javob qayerda bo'lishi <em>mumkin emasligini</em> aniqlay olamiz." },
        { ul: [
          "Massivning o'rtasidagi elementni olamiz.",
          "Agar u nishonga teng bo'lsa — topdik, tamom.",
          "Agar o'rtadagi element nishondan <strong>katta</strong> bo'lsa — nishon faqat chap yarmda bo'lishi mumkin, o'ng yarmni butunlay tashlaymiz.",
          "Agar o'rtadagi element nishondan <strong>kichik</strong> bo'lsa — nishon faqat o'ng yarmda, chap yarmni tashlaymiz."
        ] },
        { p: "Har bir taqqoslashda qidiruv maydonini yarmiga qisqartiramiz. Millionlik massiv taxminan 20 qadamda tugaydi — million emas, 20 ta!" },
        { note: "Diqqat qiling: bu \"yarmini tashlash\" faqat massiv saralangan bo'lsagina ishlaydi. Saralanmagan massivda o'rtadagi element bizga chap yoki o'ng haqida hech narsa aytmaydi." },

        { h2: "Iterativ algoritm: low, high, mid" },
        { p: "Amalda biz qidiruv maydonini ikkita chegara bilan belgilaymiz: <code>low</code> (chap chegara) va <code>high</code> (o'ng chegara). Boshida ular butun massivni qamrab oladi. Har qadamda o'rtani (<code>mid</code>) hisoblab, chegaralarni siljitamiz." },
        { pg: "function ikkilikQidiruv(massiv, nishon) {\n  let low = 0;\n  let high = massiv.length - 1;\n\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n\n    if (massiv[mid] === nishon) {\n      return mid;              // topildi\n    } else if (massiv[mid] < nishon) {\n      low = mid + 1;           // o'ng yarmga o'tamiz\n    } else {\n      high = mid - 1;          // chap yarmga o'tamiz\n    }\n  }\n  return -1;                   // topilmadi\n}\n\nconst sonlar = [3, 8, 12, 17, 25, 31, 40, 55, 60];\nconsole.log(ikkilikQidiruv(sonlar, 25));  // 4\nconsole.log(ikkilikQidiruv(sonlar, 3));   // 0\nconsole.log(ikkilikQidiruv(sonlar, 60));  // 8\nconsole.log(ikkilikQidiruv(sonlar, 100)); // -1", file: "binary-search.js" },
        { p: "Sikldagi uchta holatni yana bir bor ko'zdan kechiring. <code>while (low &lt;= high)</code> — qidiruv maydoni bo'sh bo'lmaguncha davom etamiz. <code>mid</code> topilsa qaytaramiz; nishon kattaroq bo'lsa <code>low</code> ni <code>mid + 1</code> ga suramiz; kichikroq bo'lsa <code>high</code> ni <code>mid - 1</code> ga suramiz. Har safar maydonimiz yarmiga qisqaradi." },
        { tip: "Har qadamda qanday qadam bosilayotganini ko'rish uchun sikl ichiga <code>console.log(low, mid, high)</code> qo'shib sinab ko'ring — algoritmning \"yarmni tashlash\" ritmini ko'zingiz bilan ko'rasiz." },

        { h2: "Nega O(log n)?" },
        { p: "Ikkilik qidiruvning ish vaqti — <strong>O(log n)</strong>. Bu \"logaritm\" so'zidan qo'rqmang, mohiyati juda oddiy: <em>n ni necha marta 2 ga bo'lib, 1 ga yetkazish mumkin?</em> — javob shu qadamlar soni." },
        { pg: "// n ni necha marta yarimga bo'lsak 1 ga tushadi?\nfunction nechaQadam(n) {\n  let qadam = 0;\n  while (n > 1) {\n    n = Math.floor(n / 2);\n    qadam++;\n  }\n  return qadam;\n}\n\nconsole.log(nechaQadam(8));        // 3\nconsole.log(nechaQadam(1000));     // 9\nconsole.log(nechaQadam(1000000)); // 19\n// Millionlik massiv bor-yo'g'i ~20 qadamda tugaydi!", file: "log-qadamlar.js" },
        { p: "Elementlar sonini <strong>ikki barobar</strong> oshirsangiz, ikkilik qidiruvga faqat <strong>bitta</strong> qo'shimcha qadam kerak bo'ladi. Chiziqli qidiruv esa ikki barobar ko'p vaqt talab qiladi. Aynan shu farq katta ma'lumotlarda o'lchovga sig'maydigan tezlik beradi." },
        { h3: "Big O xulosasi" },
        { ul: [
          "<strong>Eng yaxshi holat:</strong> O(1) — nishon aynan o'rtada bo'lsa, birinchi taqqoslashda topamiz.",
          "<strong>O'rtacha holat:</strong> O(log n).",
          "<strong>Eng yomon holat:</strong> O(log n) — element yo'q yoki chetda bo'lsa.",
          "<strong>Xotira:</strong> O(1) — faqat bir nechta o'zgaruvchi (low, high, mid), qo'shimcha massiv yaratmaymiz."
        ] },

        { h2: "Rekursiv versiya" },
        { p: "Xuddi shu g'oyani rekursiya bilan ham yozish mumkin. Bunda chegaralarni funksiya argumenti sifatida uzatamiz va har chaqiruvda maydonni yarmiga qisqartiramiz." },
        { pg: "function ikkilikRekursiv(massiv, nishon, low = 0, high = massiv.length - 1) {\n  if (low > high) {\n    return -1;  // maydon bo'sh — topilmadi\n  }\n\n  const mid = Math.floor((low + high) / 2);\n\n  if (massiv[mid] === nishon) {\n    return mid;\n  } else if (massiv[mid] < nishon) {\n    return ikkilikRekursiv(massiv, nishon, mid + 1, high);\n  } else {\n    return ikkilikRekursiv(massiv, nishon, low, mid - 1);\n  }\n}\n\nconst sonlar = [3, 8, 12, 17, 25, 31, 40];\nconsole.log(ikkilikRekursiv(sonlar, 17)); // 3\nconsole.log(ikkilikRekursiv(sonlar, 8));  // 1\nconsole.log(ikkilikRekursiv(sonlar, 99)); // -1", file: "binary-recursive.js" },
        { p: "Rekursiv versiya ko'pincha tushunarliroq ko'rinadi, ammo har chaqiruv uchun stekda joy egallaydi — shuning uchun xotira O(log n) bo'ladi. Iterativ versiya esa O(1) xotira ishlatadi. Amalda ikkalasi ham to'g'ri, tanlov did masalasi." },

        { h2: "Klassik xatolar" },
        { p: "Ikkilik qidiruv oddiy ko'rinadi, lekin uni to'g'ri yozish tarixan qiyin bo'lgan. Mana eng ko'p uchraydigan tuzoqlar." },
        { h3: "1. mid ni hisoblashda ehtiyotkorlik" },
        { p: "Biz <code>mid = Math.floor((low + high) / 2)</code> yozdik. Katta sonlar bilan ishlaydigan ba'zi tillarda (masalan Java, C++) <code>low + high</code> son sig'imidan oshib ketishi (overflow) mumkin. Xavfsizroq shakl:" },
        { code: [
          "// Overflow xavfini oldini oluvchi klassik shakl:",
          "const mid = low + Math.floor((high - low) / 2);",
          "",
          "// (high - low) hech qachon massiv uzunligidan oshmaydi,",
          "// shuning uchun qo'shishda toshib ketish bo'lmaydi."
        ].join("\n") },
        { note: "JavaScript'da <code>Number</code> juda katta bo'lgani uchun bu overflow amalda deyarli uchramaydi. Ammo bu shaklni bilish muhim — intervyularda va boshqa tillarda bu \"to'g'ri\" javob hisoblanadi." },
        { h3: "2. Sikl sharti: <= yoki <" },
        { p: "<code>while (low &lt;= high)</code> va <code>while (low &lt; high)</code> — bir belgi farq, ammo natija butunlay boshqacha. Bizning versiyamizda <code>&lt;=</code> to'g'ri: chunki <code>low === high</code> bo'lganda ham tekshirilishi kerak bo'lgan bitta element qoladi. Agar <code>&lt;</code> ishlatsak, oxirgi elementni umuman ko'rmay o'tkazib yuborishimiz mumkin." },
        { warn: "Chegara shartlari (<code>&lt;=</code> vs <code>&lt;</code>, <code>mid + 1</code> vs <code>mid</code>) — ikkilik qidiruvdagi cheksiz sikl va topilmagan elementlarning asosiy sababi. Yangi variatsiya yozganingizda, doim kichik massivda (1, 2, 3 elementli) qo'lda yurib chiqing." },

        { h2: "Variatsiya: birinchi va oxirgi uchrash" },
        { p: "Massivda takrorlanuvchi qiymatlar bo'lsa-chi? Masalan <code>[1, 2, 2, 2, 3]</code> da <code>2</code> ning <strong>birinchi</strong> yoki <strong>oxirgi</strong> indeksini topmoqchimiz. Oddiy ikkilik qidiruv har qanday <code>2</code> ni qaytaradi. Kerakli chetni topish uchun, topgach ham to'xtamay, kerakli tomonga qidiruvni davom ettiramiz." },
        { pg: "function birinchiUchrash(massiv, nishon) {\n  let low = 0;\n  let high = massiv.length - 1;\n  let natija = -1;\n\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n\n    if (massiv[mid] === nishon) {\n      natija = mid;       // eslab qolamiz...\n      high = mid - 1;     // ...lekin chapda yana bormi deb qidiramiz\n    } else if (massiv[mid] < nishon) {\n      low = mid + 1;\n    } else {\n      high = mid - 1;\n    }\n  }\n  return natija;\n}\n\nconst massiv = [1, 2, 2, 2, 2, 3, 4];\nconsole.log(birinchiUchrash(massiv, 2)); // 1 (birinchi 2 ning indeksi)\nconsole.log(birinchiUchrash(massiv, 5)); // -1", file: "first-occurrence.js" },
        { p: "Hiyla shundaki: <code>2</code> ni topganimizda darrov qaytarmaymiz, balki indeksni eslab qolib, <code>high = mid - 1</code> qilib <em>yana chaproqda</em> qidirishda davom etamiz. Oxirgi uchrashni topish uchun esa aksincha <code>low = mid + 1</code> qilib o'ng tomonga suriladi." },

        { h2: "Variatsiya: javobni \"qidirish maydoni\"da izlash" },
        { p: "Ikkilik qidiruvning eng kuchli qo'llanishi — u faqat massivda emas, balki <strong>javoblar oralig'ida</strong> ham ishlaydi. Klassik misol: butun kvadrat ildizni topish. Javob 0 dan n gacha bo'lgan sonlar oralig'ida yotadi va bu oraliq \"saralangan\" — shuning uchun uni ham yarmga bo'lib qidirsa bo'ladi." },
        { pg: "// n ning butun kvadrat ildizini ikkilik qidiruv bilan topamiz\nfunction butunIldiz(n) {\n  if (n < 2) return n;\n\n  let low = 1;\n  let high = n;\n  let javob = 0;\n\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    const kvadrat = mid * mid;\n\n    if (kvadrat === n) {\n      return mid;\n    } else if (kvadrat < n) {\n      javob = mid;      // mos keladigan eng katta qiymatni eslaymiz\n      low = mid + 1;\n    } else {\n      high = mid - 1;\n    }\n  }\n  return javob;         // aniq ildiz bo'lmasa, pastga yaxlitlangan qiymat\n}\n\nconsole.log(butunIldiz(16)); // 4\nconsole.log(butunIldiz(25)); // 5\nconsole.log(butunIldiz(20)); // 4 (chunki 4*4=16 <= 20 < 25=5*5)\nconsole.log(butunIldiz(1));  // 1", file: "binary-sqrt.js" },
        { p: "Bu yerda massiv umuman yo'q! Biz shunchaki 1 dan n gacha bo'lgan tasavvuriy \"saralangan\" oraliqni yarimlab qidiryapmiz. Bu — ikkilik qidiruvni chinakam tushunganingizning belgisi: g'oya massivga emas, <strong>monoton (bir tomonga o'sadigan) qidiruv maydoniga</strong> bog'liq." },

        { h2: "Asosiy shart: massiv saralangan bo'lishi kerak" },
        { p: "Butun algoritm bitta shartga tayanadi: <strong>massiv saralangan</strong>. Agar u saralanmagan bo'lsa, o'rtadagi element bizga \"chapdami yoki o'ngda\" haqida hech narsa aytmaydi va natija xato bo'ladi." },
        { pg: "// Saralanmagan massivda ikkilik qidiruv YOLG'ON javob berishi mumkin:\nfunction ikkilikQidiruv(massiv, nishon) {\n  let low = 0, high = massiv.length - 1;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (massiv[mid] === nishon) return mid;\n    else if (massiv[mid] < nishon) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n\nconst saralanmagan = [8, 3, 40, 12, 25];\nconsole.log(ikkilikQidiruv(saralanmagan, 40)); // -1 (mavjud, ammo topilmadi!)\n\n// Avval saralaymiz:\nconst saralangan = [...saralanmagan].sort((a, b) => a - b);\nconsole.log(ikkilikQidiruv(saralangan, 40));   // to'g'ri topadi", file: "sorted-required.js" },
        { warn: "Ikkilik qidiruvdan oldin massiv saralangan ekaniga ishonch hosil qiling. Agar massivni bir marta saralab, keyin ko'p marta qidirsangiz — bu ajoyib kelishuv (saralash O(n log n), keyin har qidiruv O(log n)). Ammo agar faqat bir marta qidirsangiz, saralash uchun sarflangan vaqt chiziqli qidiruvdan qimmatroqqa tushishi mumkin." },
        { tip: "Amaliy qoida: masala matnida \"<strong>saralangan massiv</strong>\" yoki \"<strong>saralangan ro'yxatda toping</strong>\" degan so'zlarni ko'rsangiz, birinchi navbatda ikkilik qidiruv haqida o'ylang. Bu deyarli har doim kutilayotgan yechim." },

        { h2: "Xulosa" },
        { ul: [
          "Ikkilik qidiruv saralangan massivda O(log n) da qidiradi — chiziqli O(n) dan tubdan tez.",
          "G'oya: <code>low</code>, <code>high</code>, <code>mid</code> bilan har qadamda qidiruv maydonining yarmini tashlab yuborish.",
          "Xotira O(1) (iterativ) yoki O(log n) (rekursiv).",
          "Klassik xatolar: mid ni overflow'siz hisoblash va chegara shartlari (<code>&lt;=</code> vs <code>&lt;</code>).",
          "Variatsiyalar: birinchi/oxirgi uchrash, va javobni monoton qidiruv maydonida izlash (masalan butun ildiz).",
          "Asosiy shart: massiv saralangan bo'lishi shart."
        ] }
      ]
    },

    {
      slug: "sorting-oddiy",
      title: "Oddiy saralashlar: Bubble, Selection, Insertion",
      blurb: "Uch klassik O(n²) saralash algoritmi — ishlash prinsipi, qadamba-qadam kod, taqqoslash va qachon foydali ekani.",
      body: [
        { lead: "Saralash — kompyuter fanidagi eng ko'p o'rganilgan masala, va bejiz emas: telefon kontaktlaringizdan tortib qidiruv natijalarigacha hamma joyda saralash bor. Bu darsda uchta \"oddiy\" saralash algoritmini quramiz: Bubble, Selection va Insertion sort. Ular tez emas, lekin g'oyasi tiniq va aynan shu tiniqlik ularni saralash tafakkurini o'rganish uchun eng yaxshi boshlanish nuqtasiga aylantiradi." },

        { h2: "Saralash nima va nega kerak?" },
        { p: "<strong>Saralash</strong> — elementlarni ma'lum tartibga (odatda o'sish yoki kamayish bo'yicha) keltirish. Nega bu muhim? Chunki saralangan ma'lumot ustida boshqa amallar ancha arzon bo'ladi:" },
        { ul: [
          "Saralangan massivda ikkilik qidiruv (O(log n)) ishlatish mumkin.",
          "Eng kichik/eng katta elementni topish oson (chekkalarda turadi).",
          "Takrorlanuvchi qiymatlarni topish oson (ular yonma-yon keladi).",
          "Odamlar uchun saralangan ro'yxatni o'qish osonroq (ismlar, sanalar, narxlar)."
        ] },
        { p: "Bu darsdagi uchala algoritm ham <strong>joyida saralash</strong> (in-place) qiladi: qo'shimcha katta massiv yaratmasdan, elementlarni bir massivning ichida joyma-joy almashtiradi. Shuning uchun ularning xotira sarfi O(1)." },
        { note: "Ikki elementni almashtirish (swap) — saralashning asosiy amali. JavaScript'da buni destrukturizatsiya bilan chiroyli yozamiz: <code>[a[i], a[j]] = [a[j], a[i]]</code>." },

        { h2: "Bubble Sort: eng kattani yuqoriga ko'tarish" },
        { p: "<strong>Bubble sort</strong> (pufakcha saralash) nomini shundan olgan: har o'tishda katta elementlar suvdagi pufakchadek yuqoriga (massiv oxiriga) \"suzib chiqadi\". G'oya juda sodda: qo'shni juftlarni taqqoslaymiz va agar chapdagi kattaroq bo'lsa, ularni almashtiramiz." },
        { pg: "function bubbleSort(massiv) {\n  const n = massiv.length;\n\n  for (let i = 0; i < n - 1; i++) {\n    // Har o'tishda eng katta element o'z joyiga \"ko'tariladi\"\n    for (let j = 0; j < n - 1 - i; j++) {\n      if (massiv[j] > massiv[j + 1]) {\n        // qo'shni juftni almashtiramiz\n        [massiv[j], massiv[j + 1]] = [massiv[j + 1], massiv[j]];\n      }\n    }\n  }\n  return massiv;\n}\n\nconsole.log(bubbleSort([5, 2, 9, 1, 5, 6]));\n// [1, 2, 5, 5, 6, 9]", file: "bubble-sort.js" },
        { p: "Ichki sikldagi <code>n - 1 - i</code> ga e'tibor bering: har tashqi o'tishdan keyin oxirdagi <code>i</code> ta element allaqachon o'z joyida bo'ladi, shuning uchun ularni qayta tekshirmaymiz." },
        { h3: "Qadamba-qadam kuzatuv" },
        { p: "Massivning har bir tashqi o'tishdan keyingi holatini ko'rib chiqaylik — pufakchalar qanday \"ko'tarilishini\" ko'rasiz:" },
        { pg: "function bubbleSortKuzatuv(massiv) {\n  const n = massiv.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - 1 - i; j++) {\n      if (massiv[j] > massiv[j + 1]) {\n        [massiv[j], massiv[j + 1]] = [massiv[j + 1], massiv[j]];\n      }\n    }\n    console.log(`O'tish ${i + 1}:`, massiv.join(\" \"));\n  }\n  return massiv;\n}\n\nbubbleSortKuzatuv([5, 2, 9, 1, 5, 6]);\n// Har o'tishda eng katta qolgan son o'ng chetga suriladi", file: "bubble-trace.js" },
        { h3: "Optimallashtirish: erta to'xtash" },
        { p: "Agar bir to'liq o'tishda <em>bironta ham</em> almashtirish bo'lmasa, demak massiv allaqachon saralangan va davom etishning ma'nosi yo'q. Buni bayroq (flag) bilan aniqlaymiz:" },
        { pg: "function bubbleSortTez(massiv) {\n  const n = massiv.length;\n\n  for (let i = 0; i < n - 1; i++) {\n    let almashtirildi = false;\n\n    for (let j = 0; j < n - 1 - i; j++) {\n      if (massiv[j] > massiv[j + 1]) {\n        [massiv[j], massiv[j + 1]] = [massiv[j + 1], massiv[j]];\n        almashtirildi = true;\n      }\n    }\n    // Agar almashtirish bo'lmasa — saralangan, to'xtaymiz\n    if (!almashtirildi) break;\n  }\n  return massiv;\n}\n\nconsole.log(bubbleSortTez([1, 2, 3, 4, 5])); // deyarli darrov tugaydi\nconsole.log(bubbleSortTez([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]", file: "bubble-optimized.js" },
        { p: "Bu optimallashtirish tufayli allaqachon saralangan massivda bubble sort O(n) da tugaydi — bu uning \"eng yaxshi holat\" natijasi." },

        { h2: "Selection Sort: har qadamda eng kichikni tanlash" },
        { p: "<strong>Selection sort</strong> (tanlab saralash) boshqa strategiya ishlatadi: har o'tishda <em>saralanmagan qismdagi eng kichik elementni topib</em>, uni oldinga qo'yamiz. Xuddi qo'lingizdagi kartalarni saralaganingizda har safar eng kichigini tanlab, chapga terib chiqqandek." },
        { pg: "function selectionSort(massiv) {\n  const n = massiv.length;\n\n  for (let i = 0; i < n - 1; i++) {\n    let engKichikIndeks = i;\n\n    // i dan keyingi qismdan eng kichik elementni qidiramiz\n    for (let j = i + 1; j < n; j++) {\n      if (massiv[j] < massiv[engKichikIndeks]) {\n        engKichikIndeks = j;\n      }\n    }\n\n    // topilgan eng kichikni joriy pozitsiyaga qo'yamiz\n    if (engKichikIndeks !== i) {\n      [massiv[i], massiv[engKichikIndeks]] = [massiv[engKichikIndeks], massiv[i]];\n    }\n  }\n  return massiv;\n}\n\nconsole.log(selectionSort([64, 25, 12, 22, 11]));\n// [11, 12, 22, 25, 64]", file: "selection-sort.js" },
        { p: "Selection sortning o'ziga xos xususiyati: u har o'tishda ko'pi bilan <strong>bitta</strong> almashtirish qiladi. Shuning uchun agar almashtirish amali qimmat bo'lsa (masalan katta obyektlar), selection sort boshqa oddiy algoritmlarga qaraganda kamroq almashtirish bilan ishlaydi. Ammo taqqoslashlar soni har doim O(n²) bo'lib qoladi." },
        { note: "Selection sort massiv \"deyarli saralangan\" bo'lsa ham ishini qisqartira olmaydi — u har doim to'liq ichki qidiruvni bajaradi. Shuning uchun uning eng yaxshi va eng yomon holati bir xil: O(n²)." },

        { h2: "Insertion Sort: kartani joyiga qo'ygandek" },
        { p: "<strong>Insertion sort</strong> (qo'yib saralash) — inson qo'lidagi o'yin kartalarini saralashiga eng o'xshash algoritm. Chap tarafda saralangan qismni ushlab turamiz, keyingi elementni olib, uni saralangan qismning <em>to'g'ri joyiga suqib qo'yamiz</em>, kerak bo'lsa kattalarni bir qadam o'ngga suramiz." },
        { pg: "function insertionSort(massiv) {\n  for (let i = 1; i < massiv.length; i++) {\n    const joriy = massiv[i];   // joylashtiriladigan element\n    let j = i - 1;\n\n    // saralangan qismdagi kattalarni o'ngga suramiz\n    while (j >= 0 && massiv[j] > joriy) {\n      massiv[j + 1] = massiv[j];\n      j--;\n    }\n    // joriy elementni bo'shagan joyga qo'yamiz\n    massiv[j + 1] = joriy;\n  }\n  return massiv;\n}\n\nconsole.log(insertionSort([5, 2, 4, 6, 1, 3]));\n// [1, 2, 3, 4, 5, 6]", file: "insertion-sort.js" },
        { p: "Ichki <code>while</code> siklga diqqat qiling: u faqat <code>joriy</code> dan kattalarni suradi va to'g'ri joy topilishi bilanoq to'xtaydi. Aynan shu tufayli insertion sort <strong>deyarli saralangan</strong> massivlarda juda tez ishlaydi." },
        { h3: "Nega deyarli saralangan massivda tez?" },
        { p: "Agar massiv allaqachon deyarli tartibda bo'lsa, ichki <code>while</code> deyarli hech qachon ishga tushmaydi — har element bir-ikki taqqoslashdanoq o'z joyida qoladi. Bu holatda insertion sort <strong>O(n)</strong> ga yaqinlashadi." },
        { pg: "function insertionSortKuzatuv(massiv) {\n  for (let i = 1; i < massiv.length; i++) {\n    const joriy = massiv[i];\n    let j = i - 1;\n    while (j >= 0 && massiv[j] > joriy) {\n      massiv[j + 1] = massiv[j];\n      j--;\n    }\n    massiv[j + 1] = joriy;\n    console.log(`${i}-qadam:`, massiv.join(\" \"));\n  }\n  return massiv;\n}\n\n// Deyarli saralangan massiv — juda kam siljish bo'ladi\ninsertionSortKuzatuv([1, 2, 4, 3, 5, 6]);", file: "insertion-trace.js" },
        { tip: "Insertion sort — kichik yoki deyarli saralangan massivlarda amalda eng tez oddiy algoritmlardan biri. Shu sababli ko'plab tez saralash kutubxonalari kichik bo'laklarga yetganda insertion sortga o'tib ketadi." },

        { h2: "Big O jadvali va barqarorlik" },
        { p: "Uchala algoritmni bir joyda taqqoslaymiz. \"Barqaror\" (stable) degani — teng qiymatli elementlarning boshlang'ich tartibi saralashdan keyin ham saqlanadi." },
        { code: [
          "Algoritm       | Eng yaxshi | O'rtacha | Eng yomon | Xotira | Barqaror?",
          "---------------|-----------|----------|-----------|--------|----------",
          "Bubble sort    | O(n)      | O(n^2)   | O(n^2)    | O(1)   | Ha",
          "Selection sort | O(n^2)    | O(n^2)   | O(n^2)    | O(1)   | Yo'q",
          "Insertion sort | O(n)      | O(n^2)   | O(n^2)    | O(1)   | Ha"
        ].join("\n") },
        { ul: [
          "<strong>Bubble</strong> — eng yaxshi O(n) (optimallashtirilgan, saralangan massivda), barqaror.",
          "<strong>Selection</strong> — har doim O(n²) (deyarli saralangan bo'lsa ham), barqaror emas, chunki uzoq almashtirishlar teng elementlar tartibini buzishi mumkin.",
          "<strong>Insertion</strong> — eng yaxshi O(n) (deyarli saralangan), barqaror.",
          "Uchalasi ham joyida ishlaydi — xotira O(1)."
        ] },
        { note: "Barqarorlik amalda muhim bo'ladi: masalan ro'yxatni avval ism bo'yicha, keyin yosh bo'yicha saralasangiz — barqaror saralash bir xil yoshdagi odamlarni ismlar tartibida saqlab qoladi. Barqaror bo'lmagan saralash bu tartibni buzishi mumkin." },

        { h2: "Qaysi biri qachon?" },
        { p: "Nazariy jihatdan uchalasi ham O(n²), lekin amalda tanlash ba'zi nuanslarga bog'liq:" },
        { ul: [
          "<strong>Insertion sort</strong> — kichik massivlar va deyarli saralangan ma'lumot uchun eng yaxshi tanlov; sodda va tez.",
          "<strong>Selection sort</strong> — almashtirish amali juda qimmat bo'lganda (u eng kam almashtirish qiladi), aks holda kamdan-kam foydali.",
          "<strong>Bubble sort</strong> — asosan o'quv maqsadida; amalda deyarli ishlatilmaydi, lekin g'oyasi eng oson tushuniladi."
        ] },
        { warn: "Bularning hammasi O(n²): elementlar soni 10 barobar oshsa, ish vaqti ~100 barobar oshadi. 10 000 elementli massivda bu sekinlashishni sezasiz, million elementda esa bu algoritmlar amalda yaroqsiz. Katta ma'lumot uchun keyingi darsdagi O(n log n) algoritmlari kerak bo'ladi." },
        { tip: "Amaliy dasturchi sifatida siz odatda bu algoritmlarni qo'lda yozmaysiz — o'rnatilgan <code>sort()</code> dan foydalanasiz. Ammo ularning g'oyasini bilish saralash qanday ishlashini, nega Big O muhimligini va intervyu savollarini tushunish uchun zarur." },

        { h2: "Xulosa" },
        { ul: [
          "Bubble sort — qo'shni juftlarni almashtirib, kattalarni yuqoriga ko'taradi; optimallashtirilsa eng yaxshi holat O(n).",
          "Selection sort — har qadamda eng kichikni tanlab oldinga qo'yadi; har doim O(n²), eng kam almashtirish.",
          "Insertion sort — elementni saralangan qismning to'g'ri joyiga qo'yadi; deyarli saralangan massivda tez, O(n).",
          "Uchalasi joyida ishlaydi (xotira O(1)); Bubble va Insertion barqaror, Selection barqaror emas.",
          "Hammasi o'rtacha O(n²) — katta massivlar uchun sekin."
        ] }
      ]
    },

    {
      slug: "sorting-tez",
      title: "Tez saralashlar: Merge Sort va Quick Sort",
      blurb: "O(n log n) saralash — bo'lib tashla va hukmronlik qil, merge/quick sort ishlashi, pivot tanlash va JS'ning sort() metodi.",
      body: [
        { lead: "O'tgan darsda oddiy saralashlar O(n²) devoriga urilib to'xtadi — million element ular uchun juda ko'p. Endi bu devorni buzamiz. Merge sort va Quick sort — O(n log n) da ishlaydigan ikkita klassik algoritm bo'lib, ikkalasi ham bitta chiroyli g'oyaga tayanadi: <em>bo'lib tashla va hukmronlik qil</em>. Bu darsda ularni noldan quramiz, taqqoslaymiz va nihoyat kundalik kodda ishlatiladigan JavaScript'ning o'rnatilgan <code>sort()</code> metodini o'rganamiz." },

        { h2: "Bo'lib tashla va hukmronlik qil" },
        { p: "<strong>Divide and conquer</strong> (bo'lib tashla va hukmronlik qil) — muammoni yechishning kuchli usuli. Uch qadamdan iborat:" },
        { ol: [
          "<strong>Bo'l (divide):</strong> katta masalani kichikroq bir xil turdagi masalalarga bo'lamiz.",
          "<strong>Yech (conquer):</strong> kichik masalalarni rekursiv ravishda yechamiz (juda kichkinasi darrov yechiladi).",
          "<strong>Birlashtir (combine):</strong> kichik yechimlarni birlashtirib, katta masalaning yechimini quramiz."
        ] },
        { p: "Nega bu tezlik beradi? Chunki masalani har safar teng ikkiga bo'lish — bu bizga tanish O(log n) chuqurlikni beradi, va har darajada jami O(n) ish bajariladi. Ko'paytirsak: O(n log n)." },
        { note: "Ikkilik qidiruvda ham xuddi shu \"yarmga bo'lish\" g'oyasini ko'rgandik. Divide and conquer — o'sha g'oyaning umumlashtirilgan, saralashga ham qo'llaniladigan shakli." },

        { h2: "Merge Sort: bo'l, sarala, birlashtir" },
        { p: "<strong>Merge sort</strong> massivni ikkita yarmga bo'ladi, har yarmni rekursiv saralaydi, so'ng ikkita saralangan yarmni bitta saralangan massivga <strong>birlashtiradi</strong> (merge). Rekursiya massiv bir elementga qisqarguncha davom etadi — bitta element esa allaqachon \"saralangan\"." },
        { pg: "function mergeSort(massiv) {\n  // Asos holati: 1 yoki 0 element — allaqachon saralangan\n  if (massiv.length <= 1) {\n    return massiv;\n  }\n\n  // 1. Bo'l\n  const orta = Math.floor(massiv.length / 2);\n  const chap = massiv.slice(0, orta);\n  const ong = massiv.slice(orta);\n\n  // 2. Har yarmni rekursiv saralaymiz, 3. so'ng birlashtiramiz\n  return merge(mergeSort(chap), mergeSort(ong));\n}\n\nfunction merge(chap, ong) {\n  const natija = [];\n  let i = 0, j = 0;\n\n  // Ikkala saralangan massivdan kichigini navbat bilan olamiz\n  while (i < chap.length && j < ong.length) {\n    if (chap[i] <= ong[j]) {\n      natija.push(chap[i]);\n      i++;\n    } else {\n      natija.push(ong[j]);\n      j++;\n    }\n  }\n\n  // Qolganlarini qo'shamiz (biri allaqachon tugagan)\n  return natija.concat(chap.slice(i)).concat(ong.slice(j));\n}\n\nconsole.log(mergeSort([5, 2, 9, 1, 5, 6, 3]));\n// [1, 2, 3, 5, 5, 6, 9]", file: "merge-sort.js" },
        { h3: "Birlashtirish (merge) qanday ishlaydi?" },
        { p: "<code>merge</code> funksiyasi — algoritmning yuragi. Bizda ikkita <em>allaqachon saralangan</em> massiv bor. Har ikkalasining boshiga barmoq qo'yamiz (<code>i</code> va <code>j</code>), kichigini natijaga olamiz va o'sha barmoqni bir qadam suramiz. Ikkala massiv saralangani uchun bu bir marta o'tishda (O(n)) yangi saralangan massivni beradi." },
        { pg: "function merge(chap, ong) {\n  const natija = [];\n  let i = 0, j = 0;\n  while (i < chap.length && j < ong.length) {\n    if (chap[i] <= ong[j]) natija.push(chap[i++]);\n    else natija.push(ong[j++]);\n  }\n  return natija.concat(chap.slice(i)).concat(ong.slice(j));\n}\n\n// Ikkita saralangan massivni birlashtiramiz:\nconsole.log(merge([1, 4, 7], [2, 3, 8, 9]));\n// [1, 2, 3, 4, 7, 8, 9]", file: "merge-step.js" },
        { p: "Diqqat: <code>chap[i] &lt;= ong[j]</code> dagi <code>&lt;=</code> muhim — u tenglik holatida chap tomondagi elementni oldin oladi, bu esa merge sortni <strong>barqaror</strong> (stable) qiladi." },
        { h3: "Merge Sort Big O" },
        { ul: [
          "<strong>Eng yaxshi / o'rtacha / eng yomon:</strong> O(n log n) — har uch holatda ham bir xil, chunki massiv doim teng yarmga bo'linadi.",
          "<strong>Xotira:</strong> O(n) — birlashtirish uchun qo'shimcha massivlar yaratiladi.",
          "<strong>Barqaror:</strong> ha (to'g'ri yozilganda)."
        ] },
        { tip: "Merge sortning kafolatlangan O(n log n) va barqarorligi uni katta ma'lumot va tashqi saralash (fayllarni saralash) uchun ishonchli tanlov qiladi. To'lovi — qo'shimcha O(n) xotira." },

        { h2: "Quick Sort: pivot va partition" },
        { p: "<strong>Quick sort</strong> ham bo'lib-hukmronlik qiladi, ammo boshqacha. U bitta element — <strong>pivot</strong> (tayanch) — tanlaydi va massivni shunday ajratadiki: pivotdan kichiklar chapga, kattalar o'ngga tushadi. Bu amal <strong>partition</strong> deyiladi. So'ng chap va o'ng qismlarni rekursiv saralaydi." },
        { pg: "function quickSort(massiv) {\n  // Asos holati\n  if (massiv.length <= 1) {\n    return massiv;\n  }\n\n  const pivot = massiv[massiv.length - 1]; // oxirgi elementni pivot qilamiz\n  const kichik = [];\n  const katta = [];\n\n  // Partition: pivotga qarab ajratamiz\n  for (let i = 0; i < massiv.length - 1; i++) {\n    if (massiv[i] < pivot) {\n      kichik.push(massiv[i]);\n    } else {\n      katta.push(massiv[i]);\n    }\n  }\n\n  // Rekursiv: [kichiklar] + pivot + [kattalar]\n  return [...quickSort(kichik), pivot, ...quickSort(katta)];\n}\n\nconsole.log(quickSort([5, 2, 9, 1, 5, 6, 3]));\n// [1, 2, 3, 5, 5, 6, 9]", file: "quick-sort.js" },
        { p: "Bu versiya o'qish uchun soddalashtirilgan (yangi massivlar yaratadi). Amaliy quick sort odatda massiv ichida joyida (in-place) ajratib, kamroq xotira sarflaydi. Ammo g'oya bir xil: pivot tanla, ajrat, rekursiv saralash." },
        { h3: "Pivot tanlash muhim" },
        { p: "Quick sortning tezligi to'g'ridan-to'g'ri <strong>pivot tanlash</strong>ga bog'liq. Ideal pivot massivni teng ikkiga bo'ladi — o'shanda O(n log n) olamiz. Ammo agar pivot doim eng kichik yoki eng katta element bo'lib chiqsa, ajratish notekis bo'ladi va algoritm sekinlashadi." },
        { pg: "// Yaxshiroq: tasodifiy pivot yomon holatlar ehtimolini kamaytiradi\nfunction quickSortTasodifiy(massiv) {\n  if (massiv.length <= 1) return massiv;\n\n  const pivotIndeks = Math.floor(Math.random() * massiv.length);\n  const pivot = massiv[pivotIndeks];\n  const kichik = [], teng = [], katta = [];\n\n  for (const x of massiv) {\n    if (x < pivot) kichik.push(x);\n    else if (x > pivot) katta.push(x);\n    else teng.push(x);\n  }\n\n  return [...quickSortTasodifiy(kichik), ...teng, ...quickSortTasodifiy(katta)];\n}\n\nconsole.log(quickSortTasodifiy([8, 3, 8, 1, 9, 2, 8]));\n// [1, 2, 3, 8, 8, 8, 9]", file: "quick-random-pivot.js" },
        { warn: "Eng yomon holat O(n²): agar massiv allaqachon saralangan bo'lsa va siz doim birinchi (yoki oxirgi) elementni pivot qilib olsangiz, har partition faqat bitta elementni ajratadi va rekursiya n darajaga chuqurlashadi. Aynan shuning uchun amalda tasodifiy yoki \"o'rta uchtaning medianasi\" (median-of-three) pivot ishlatiladi." },
        { h3: "Quick Sort Big O" },
        { ul: [
          "<strong>Eng yaxshi / o'rtacha:</strong> O(n log n) — pivot massivni yaxshi bo'lganda.",
          "<strong>Eng yomon:</strong> O(n²) — yomon pivot (masalan saralangan massivda chekka pivot).",
          "<strong>Xotira:</strong> O(log n) — rekursiya steki (joyida versiyada).",
          "<strong>Barqaror:</strong> yo'q — uzoq masofaga almashtirishlar teng elementlar tartibini buzadi."
        ] },
        { note: "Merge sortdan farqli, joyida yozilgan quick sort qo'shimcha katta massiv talab qilmaydi — shuning uchun u amalda ko'pincha merge sortdan tezroq ishlaydi, garchi ikkalasi ham o'rtacha O(n log n) bo'lsa-da. \"Konstanta koeffitsientlar\" muhim: bir xil Big O ichida ham amaliy tezlik farq qiladi." },

        { h2: "Merge vs Quick: taqqoslash jadvali" },
        { code: [
          "Xususiyat          | Merge Sort       | Quick Sort",
          "-------------------|------------------|------------------",
          "Eng yaxshi         | O(n log n)       | O(n log n)",
          "O'rtacha           | O(n log n)       | O(n log n)",
          "Eng yomon          | O(n log n)       | O(n^2)",
          "Xotira             | O(n)             | O(log n)",
          "Barqaror?          | Ha               | Yo'q",
          "Joyida (in-place)? | Yo'q             | Ha (odatda)"
        ].join("\n") },
        { ul: [
          "<strong>Merge sort</strong>ni tanlang: kafolatlangan O(n log n) va barqarorlik kerak bo'lsa (masalan bir xil kalitli yozuvlar tartibi muhim bo'lsa).",
          "<strong>Quick sort</strong>ni tanlang: xotira cheklangan bo'lsa va o'rtacha tezlik muhim bo'lsa; yomon holatdan tasodifiy pivot bilan qochiladi."
        ] },

        { h2: "JavaScript'ning o'rnatilgan sort() metodi" },
        { p: "Yaxshi xabar: kundalik kodda siz bu algoritmlarni qo'lda yozmaysiz. JavaScript'da <code>Array.prototype.sort()</code> bor va zamonaviy dvigatellar uni juda tez, barqaror algoritm (odatda <em>Timsort</em> — merge va insertion sort aralashmasi) bilan amalga oshiradi." },
        { p: "Ammo bitta muhim tuzoq bor. Standart <code>sort()</code> elementlarni <strong>satr sifatida</strong>, leksikografik (lug'at) tartibda solishtiradi. Bu sonlar uchun kutilmagan natija beradi:" },
        { pg: "const sonlar = [10, 2, 1, 20, 3];\n\n// XATO: standart sort sonlarni satrga aylantirib solishtiradi\nconsole.log([...sonlar].sort());\n// [1, 10, 2, 20, 3]  -- \"10\" < \"2\" chunki '1' < '2' (satr taqqoslash!)\n\n// TO'G'RI: taqqoslash funksiyasini beramiz\nconsole.log([...sonlar].sort((a, b) => a - b));\n// [1, 2, 3, 10, 20]  -- o'sish tartibida\n\n// Kamayish tartibi uchun:\nconsole.log([...sonlar].sort((a, b) => b - a));\n// [20, 10, 3, 2, 1]", file: "js-sort.js" },
        { warn: "Bu — JavaScript'dagi eng ko'p uchraydigan xatolardan biri. <code>[10, 2, 1].sort()</code> sizga <code>[1, 10, 2]</code> beradi, chunki sonlar avval satrga aylantiriladi. Sonlarni saralaganda <strong>doim</strong> taqqoslash funksiyasi bering: o'sish uchun <code>(a, b) => a - b</code>." },
        { h3: "Taqqoslash funksiyasi qanday ishlaydi?" },
        { p: "<code>sort(compareFn)</code> ikkita elementni oladi va son qaytaradi: <strong>manfiy</strong> bo'lsa <code>a</code> oldinga, <strong>musbat</strong> bo'lsa <code>b</code> oldinga, <strong>0</strong> bo'lsa tartib o'zgarmaydi. Shu qoida bilan obyektlarni ham istalgan maydon bo'yicha saralash mumkin:" },
        { pg: "const odamlar = [\n  { ism: \"Ali\", yosh: 30 },\n  { ism: \"Vali\", yosh: 25 },\n  { ism: \"Guli\", yosh: 35 }\n];\n\n// Yosh bo'yicha o'sish tartibida\nodamlar.sort((a, b) => a.yosh - b.yosh);\nconsole.log(odamlar.map(o => `${o.ism}: ${o.yosh}`));\n// [ 'Vali: 25', 'Ali: 30', 'Guli: 35' ]\n\n// Ism bo'yicha (satrlar uchun localeCompare)\nodamlar.sort((a, b) => a.ism.localeCompare(b.ism));\nconsole.log(odamlar.map(o => o.ism));\n// [ 'Ali', 'Guli', 'Vali' ]", file: "sort-objects.js" },
        { note: "ES2019 dan boshlab <code>Array.prototype.sort()</code> spetsifikatsiya bo'yicha <strong>barqaror</strong> bo'lishi kafolatlangan. Ya'ni teng kalitli elementlarning boshlang'ich tartibi saqlanadi — bu ko'p bosqichli saralashlar uchun juda foydali." },

        { h2: "Amaliyot: real hayotda nima ishlatiladi?" },
        { p: "Real loyihalarda deyarli har doim tilning o'rnatilgan <code>sort()</code> metodini ishlatasiz. U ko'p yillar davomida optimallashtirilgan, barqaror, va sizning qo'lda yozgan versiyangizdan tez hamda ishonchliroq." },
        { ul: [
          "<strong>Kundalik kod:</strong> o'rnatilgan <code>sort()</code> — hech qachon o'z quick sortingizni yozmang.",
          "<strong>O'rganish va intervyu:</strong> merge/quick sortni qo'lda yoza olish va Big O ni tushuntira olish muhim ko'nikma.",
          "<strong>Maxsus holatlar:</strong> tashqi saralash (juda katta fayllar) yoki maxsus xotira cheklovlari bo'lsagina qo'lda algoritm kerak bo'lishi mumkin."
        ] },
        { tip: "Intervyularda merge sort va quick sortni tushuntira olish, ularning Big O va barqarorlik farqini bilish talab qilinadi. Real ish kodida esa deyarli har doim built-in <code>sort()</code> — bu ikki dunyoni ajrata bilish yetuk dasturchining belgisi." },

        { h2: "Xulosa" },
        { ul: [
          "Divide and conquer — masalani teng bo'lib, yechib, birlashtirish; O(n log n) ga olib keladi.",
          "Merge sort — bo'l, rekursiv sarala, birlashtir; doim O(n log n), xotira O(n), barqaror.",
          "Quick sort — pivot tanla, partition qil, rekursiv sarala; o'rtacha O(n log n), eng yomon O(n²), xotira O(log n), barqaror emas.",
          "Pivot tanlash quick sort tezligini belgilaydi — tasodifiy pivot yomon holatdan himoya qiladi.",
          "JS'ning <code>sort()</code> barqaror va tez; sonlarda doim <code>(a, b) => a - b</code> bering, aks holda leksikografik xato bo'ladi.",
          "Real kodda built-in sort, intervyuda esa merge/quick sortni tushuntira olish kerak."
        ] }
      ]
    }
  ]
};
