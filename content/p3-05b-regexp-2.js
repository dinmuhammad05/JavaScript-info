"use strict";

module.exports = {
  part: "3-qism: Qo'shimcha bo'limlar",
  chapter: "Muntazam ifodalar (RegExp)",
  lessons: [
    {
      slug: "regexp-quantifiers",
      title: "Kvantorlar: +, *, ?, {n,m}",
      blurb: "Miqdor belgilari bilan belgilar nechta marta takrorlanishini boshqarish; ochko'z (greedy) va dangasa (lazy) rejimlar; raqam va HTML teglarni ajratish misollari.",
      body: [
        { lead: "<strong>Kvantor</strong> (quantifier) — muntazam ifodada biror belgi yoki guruh <em>necha marta</em> takrorlanishi kerakligini bildiruvchi maxsus belgi. Masalan, <code>\\d+</code> — \"bir yoki undan ko'p raqam\" degani. Kvantorlar RegExp'ni haqiqatan kuchli qiladi: aynan ular yordamida biz uzunligi oldindan noma'lum bo'lgan matnlarni — raqamlar, so'zlar, teglar — tuta olamiz." },

        { h2: "Aniq miqdor: {n}" },
        { p: "Eng oddiy kvantor — figurali qavs ichidagi aniq son. <code>{n}</code> — undan oldingi belgi <strong>roppa-rosa n marta</strong> takrorlanishini talab qiladi." },
        { p: "Masalan, <code>\\d{4}</code> — ketma-ket kelgan to'rtta raqam degani (masalan yil):" },
        { pg: "let str = \"Men 1995-yilda tug'ilganman, hozir 2026-yil.\";\nlet regexp = /\\d{4}/g;\n\nconsole.log(str.match(regexp));  // [ '1995', '2026' ]", file: "kvantor-n.js" },
        { p: "E'tibor bering: kvantor faqat <strong>o'zidan oldingi bitta belgi yoki guruhga</strong> ta'sir qiladi. <code>\\d{4}</code> da bu <code>\\d</code>, ya'ni bitta raqam sinfi." },

        { h2: "Oraliq: {n,m}" },
        { p: "<code>{n,m}</code> — takrorlanishlar soni <strong>n dan m gacha</strong> (ikkalasi ham kiritilgan) bo'lishi mumkin. Dvigatel iloji boricha ko'proq belgini olishga harakat qiladi (bu haqda pastda batafsil)." },
        { pg: "let str = \"1 12 123 1234 12345\";\nlet regexp = /\\d{2,4}/g;\n\n// 2 dan 4 tagacha raqam\nconsole.log(str.match(regexp));  // [ '12', '123', '1234', '1234' ]", file: "kvantor-nm.js" },
        { note: "Yuqoridagi <code>12345</code> dan atigi <code>1234</code> olindi: kvantor eng ko'pi bilan 4 ta raqamni oladi, oxirgi <code>5</code> esa keyingi mos kelishga qoladi (u yolg'iz bo'lgani uchun <code>{2,4}</code> ga yetmaydi va tashlab ketiladi)." },
        { p: "Yuqori chegarani tushirib qoldirish mumkin: <code>{n,}</code> — \"n yoki undan ko'p\". Masalan, <code>\\d{3,}</code> — kamida uchta raqam:" },
        { pg: "let str = \"a1 b22 c333 d4444\";\nlet regexp = /\\d{3,}/g;\n\nconsole.log(str.match(regexp));  // [ '333', '4444' ]", file: "kvantor-n-ochiq.js" },

        { h2: "Qisqartmalar: +, ?, *" },
        { p: "Amaliyotda uchta oraliq juda ko'p ishlatilgani uchun ularga qisqa belgilar berilgan:" },
        { ul: [
          "<code>+</code> — <code>{1,}</code> ma'nosini bildiradi: \"<strong>bir yoki undan ko'p</strong>\";",
          "<code>?</code> — <code>{0,1}</code> ma'nosini bildiradi: \"<strong>nol yoki bitta</strong>\", ya'ni belgi ixtiyoriy;",
          "<code>*</code> — <code>{0,}</code> ma'nosini bildiradi: \"<strong>nol yoki undan ko'p</strong>\"."
        ] },
        { p: "Mana <code>+</code> yordamida matndan barcha sonlarni (uzunligidan qat'i nazar) ajratamiz:" },
        { pg: "let str = \"Narxlar: 5, 50 va 500 so'm.\";\nlet regexp = /\\d+/g;\n\nconsole.log(str.match(regexp));  // [ '5', '50', '500' ]", file: "kvantor-plus.js" },
        { p: "<code>?</code> — belgini ixtiyoriy qiladi. Masalan, \"color\" va \"colour\" — ikkalasini ham tutamiz. <code>u?</code> degani <code>u</code> harfi bo'lishi ham, bo'lmasligi ham mumkin:" },
        { pg: "let regexp = /colou?r/g;\n\nconsole.log(\"color\".match(regexp));   // [ 'color' ]\nconsole.log(\"colour\".match(regexp));  // [ 'colour' ]", file: "kvantor-savol.js" },
        { p: "<code>*</code> — belgi umuman bo'lmasligi ham mumkin. Masalan, <code>-*</code> chiziqchalar ketma-ketligi (bo'sh ham) ni tutadi. Farqni ko'ramiz:" },
        { pg: "// + kamida bitta 0 talab qiladi, * esa 0 tasini ham qabul qiladi\nconsole.log(\"1000\".match(/10+/));  // [ '1000' ] (1 va uchta 0)\nconsole.log(\"1\".match(/10+/));     // null   (0 yo'q)\nconsole.log(\"1\".match(/10*/));     // [ '1' ]  (0 ta 0 ham bo'ladi)", file: "kvantor-yulduz.js" },
        { tip: "Eslab qolish oson: <code>+</code> = \"kamida bitta\", <code>?</code> = \"bor yoki yo'q\", <code>*</code> = \"bor bo'lsa mayli, yo'q bo'lsa ham mayli\"." },

        { h2: "Ochko'z rejim (greedy)" },
        { p: "Kvantorlar sukut bo'yicha <strong>ochko'z</strong> (greedy) ishlaydi: dvigatel iloji boricha <em>ko'proq</em> belgini olishga urinadi. Bu ba'zan kutilmagan natija beradi." },
        { p: "Klassik misol: qo'shtirnoq ichidagi matnni tutmoqchimiz. <code>\".+\"</code> deb yozsak nima bo'ladi?" },
        { pg: "let str = 'Bir \"kitob\" va \"daftar\" bor.';\nlet regexp = /\".+\"/g;\n\nconsole.log(str.match(regexp));\n// [ '\"kitob\" va \"daftar\"' ]  -- kutilgani ikkita alohida so'z edi!", file: "ochkoz.js" },
        { p: "Nega bunday bo'ldi? <code>.+</code> ochko'z bo'lgani uchun dvigatel birinchi qo'shtirnoqdan keyin <strong>matn oxirigacha</strong> hamma narsani \"yamlab\" oladi, so'ng oxirgi <code>\"</code> ni topish uchun orqaga qaytadi va eng oxirgi qo'shtirnoqni tanlaydi. Natijada ikkala qo'shtirnoq oralig'idagi hamma narsa bitta mos kelish bo'lib qoladi." },

        { h2: "Dangasa rejim (lazy)" },
        { p: "Ochko'zlikni to'xtatish uchun kvantordan keyin <code>?</code> qo'yamiz. Bu uni <strong>dangasa</strong> (lazy) qiladi: dvigatel endi iloji boricha <em>kamroq</em> belgini oladi, ya'ni birinchi mos kelishda to'xtaydi." },
        { p: "<code>.+?</code> — \"iloji boricha kam belgi, lekin kamida bitta\":" },
        { pg: "let str = 'Bir \"kitob\" va \"daftar\" bor.';\nlet regexp = /\".+?\"/g;\n\nconsole.log(str.match(regexp));\n// [ '\"kitob\"', '\"daftar\"' ]  -- endi to'g'ri!", file: "dangasa.js" },
        { note: "<code>?</code> belgisi ikki xil vazifada ishlaydi: agar u <strong>o'zi kvantor</strong> bo'lsa — \"0 yoki 1\" degani; agar <strong>boshqa kvantordan keyin</strong> kelsa — o'sha kvantorni dangasa qiladi. Masalan <code>+?</code>, <code>*?</code>, <code>{2,4}?</code>." },
        { p: "Dangasalik faqat o'zi qo'yilgan kvantorga ta'sir qiladi, boshqalari ochko'zligicha qoladi. Shuning uchun murakkab shablonlarda har bir kvantorni alohida sozlash mumkin." },

        { h2: "Amaliy misol: HTML teglarni ajratish" },
        { p: "Matndan barcha oddiy HTML teglarni ajratamiz. Ochko'z <code>&lt;.+&gt;</code> xato ishlaydi — u birinchi <code>&lt;</code> dan oxirgi <code>&gt;</code> gacha hammasini oladi. To'g'ri yechim — dangasa <code>&lt;.+?&gt;</code> yoki undan ham yaxshisi <code>&lt;[^&gt;]+&gt;</code>:" },
        { pg: "let str = \"<p>Salom</p> <b>dunyo</b>\";\n\n// Dangasa variant\nconsole.log(str.match(/<.+?>/g));\n// [ '<p>', '</p>', '<b>', '</b>' ]\n\n// Inkor sinfli variant (odatda tezroq va ishonchliroq)\nconsole.log(str.match(/<[^>]+>/g));\n// [ '<p>', '</p>', '<b>', '</b>' ]", file: "teg-ajratish.js" },
        { tip: "Ko'p hollarda dangasa kvantor o'rniga <strong>inkor belgilar sinfi</strong> (masalan <code>[^&gt;]+</code>) yaxshiroq: u tezroq ishlaydi va \"ortga qaytish\" (backtracking) muammolaridan xoli bo'ladi." },

        { h2: "Amaliy misol: kasr sonlar" },
        { p: "Butun va kasr sonlarni birga tutish uchun kvantorlarni birlashtiramiz. Nuqtadan keyingi qism ixtiyoriy bo'lishi kerak, shuning uchun butun bir guruhni <code>?</code> bilan ixtiyoriy qilamiz:" },
        { pg: "let str = \"Narx: 12 yoki 12.5 yoki 100.99 so'm\";\nlet regexp = /\\d+(\\.\\d+)?/g;\n\nconsole.log(str.match(regexp));  // [ '12', '12.5', '100.99' ]", file: "kasr-son.js" },
        { p: "Bu yerda <code>\\d+</code> — butun qism, <code>(\\.\\d+)?</code> — nuqta va undan keyingi raqamlar, ammo butun guruh <code>?</code> tufayli ixtiyoriy. Shu bois <code>12</code> ham, <code>12.5</code> ham tutiladi." },
        { warn: "Ochko'z kvantorlar juda uzun matnlarda \"katastrofik backtracking\"ga (dvigatel millionlab variantni sinab, qotib qolishi) olib kelishi mumkin. Ayniqsa <code>(a+)+</code> kabi ichma-ich kvantorlardan ehtiyot bo'ling." },

        { h2: "Xulosa" },
        { ul: [
          "<code>{n}</code> — roppa-rosa n marta; <code>{n,m}</code> — n dan m gacha; <code>{n,}</code> — kamida n marta;",
          "<code>+</code> = <code>{1,}</code>; <code>?</code> = <code>{0,1}</code>; <code>*</code> = <code>{0,}</code>;",
          "Kvantor faqat o'zidan oldingi bitta belgi yoki guruhga ta'sir qiladi;",
          "Sukut bo'yicha kvantorlar <strong>ochko'z</strong> — imkon qadar ko'p oladi;",
          "Kvantordan keyin <code>?</code> qo'yilsa, u <strong>dangasa</strong> bo'ladi — imkon qadar kam oladi;",
          "Teg va qo'shtirnoq ichidagi matnni tutishda dangasa rejim yoki inkor sinf (<code>[^x]+</code>) ishlatiladi."
        ] }
      ]
    },

    {
      slug: "regexp-groups",
      title: "Guruhlash va tutish",
      blurb: "Qavslar bilan qismlarni guruhlash; guruh natijalari (match) va nomli guruhlar (?<name>); replace da $1 va $<name>; tutmaydigan guruh (?:...).",
      body: [
        { lead: "Muntazam ifodada bir qism belgilarni yumaloq qavs <code>(...)</code> ichiga olsak, ular <strong>guruh</strong>ga aylanadi. Guruhlar ikki foyda beradi: birinchidan, kvantorni bir necha belgiga birdan qo'llash imkonini beradi; ikkinchidan, mos kelgan qismni alohida <strong>tutib olib</strong> (capture), keyinchalik ishlatish imkonini beradi." },

        { h2: "Guruhga kvantor qo'llash" },
        { p: "Qavssiz kvantor faqat bitta belgiga ta'sir qiladi. Qavs bilan esa butun ketma-ketlikni takrorlashimiz mumkin. Masalan, <code>(go)+</code> — bir yoki undan ko'p \"go\":" },
        { pg: "console.log(\"gogogo\".match(/(go)+/)[0]);  // gogogo\nconsole.log(\"go go\".match(/(go)+/)[0]);   // go  (bo'sh joy ketma-ketlikni uzadi)", file: "guruh-kvantor.js" },
        { p: "Amaliy misol — domen nomi. Domen nuqta bilan ajratilgan bo'laklardan iborat, masalan <code>mail.google.com</code>. \"So'z + nuqta\" bo'lagini <code>(\\w+\\.)+</code> deb guruhlab, keyin oxirgi bo'lakni qo'shamiz:" },
        { pg: "let regexp = /(\\w+\\.)+\\w+/g;\n\nconsole.log(\"site.com\".match(regexp));       // [ 'site.com' ]\nconsole.log(\"mail.google.com\".match(regexp)); // [ 'mail.google.com' ]", file: "guruh-domen.js" },

        { h2: "Guruh natijalari (tutib olish)" },
        { p: "Har bir <code>(...)</code> guruh mos kelgan qismni alohida saqlaydi. <code>str.match(regexp)</code> (bayroqsiz, <code>g</code> siz) chaqirilganda natija massivi qaytadi:" },
        { ul: [
          "<code>[0]</code> — butun mos kelish (to'liq topilgan matn);",
          "<code>[1]</code> — birinchi guruh mazmuni;",
          "<code>[2]</code> — ikkinchi guruh mazmuni, va hokazo.",
          "Guruhlar <strong>ochiluvchi qavs</strong> tartibida raqamlanadi."
        ] },
        { p: "Masalan, HTML tegdan uning nomini ajratamiz. <code>&lt;(\\w+)&gt;</code> — butun teg tutiladi, ichidagi <code>(\\w+)</code> esa tegning nomini alohida saqlaydi:" },
        { pg: "let str = \"<h1>Sarlavha</h1>\";\nlet match = str.match(/<(\\w+)>/);\n\nconsole.log(match[0]);  // <h1>  (butun mos kelish)\nconsole.log(match[1]);  // h1    (birinchi guruh)", file: "guruh-match.js" },
        { p: "Ichma-ich (ugniyalangan) guruhlar ham bo'lishi mumkin. Sana <code>2026-07-01</code> ni ajratamiz — butun sana bitta guruhda, yil/oy/kun esa alohida guruhlarda:" },
        { pg: "let str = \"Sana: 2026-07-01\";\nlet m = str.match(/((\\d{4})-(\\d{2})-(\\d{2}))/);\n\nconsole.log(m[1]);  // 2026-07-01  (tashqi guruh)\nconsole.log(m[2]);  // 2026        (yil)\nconsole.log(m[3]);  // 07          (oy)\nconsole.log(m[4]);  // 01          (kun)", file: "guruh-ichmaich.js" },
        { note: "Agar guruh ixtiyoriy (masalan <code>(...)?</code>) bo'lib, mos kelmasa, uning natijasi massivda <code>undefined</code> bo'ladi. Guruhning raqami esa o'zgarmaydi — u qavs tartibi bo'yicha aniqlanadi." },

        { h2: "matchAll bilan barcha guruhlar" },
        { p: "<code>g</code> bayrog'i bilan oddiy <code>match</code> guruhlarni yo'qotadi — u faqat butun mos kelishlar ro'yxatini qaytaradi. Barcha mos kelishlarni <em>va</em> ularning guruhlarini olish uchun <code>str.matchAll(regexp)</code> ishlatiladi (u iterator qaytaradi):" },
        { pg: "let str = \"<h1>Bosh</h1> <p>Matn</p>\";\nlet regexp = /<(\\w+)>/g;\n\nfor (let m of str.matchAll(regexp)) {\n  console.log(m[0] + \" -> nomi: \" + m[1]);\n}\n// <h1> -> nomi: h1\n// <p> -> nomi: p", file: "guruh-matchall.js" },
        { tip: "<code>matchAll</code> iterator qaytaradi. To'liq massiv kerak bo'lsa, <code>Array.from(str.matchAll(re))</code> yoki <code>[...str.matchAll(re)]</code> ishlatiladi." },

        { h2: "Nomli guruhlar (?<name>)" },
        { p: "Guruhlarni raqam bo'yicha eslab yurish noqulay. Ularga <strong>nom</strong> berish mumkin: qavs boshiga <code>?&lt;name&gt;</code> qo'yiladi. Natijada guruh <code>match.groups</code> obyektida nom bo'yicha ochiladi:" },
        { pg: "let str = \"Sana: 2026-07-01\";\nlet regexp = /(?<yil>\\d{4})-(?<oy>\\d{2})-(?<kun>\\d{2})/;\nlet m = str.match(regexp);\n\nconsole.log(m.groups.yil);  // 2026\nconsole.log(m.groups.oy);   // 07\nconsole.log(m.groups.kun);  // 01", file: "nomli-guruh.js" },
        { p: "Nomli guruhlar kod o'qilishini ancha yaxshilaydi: <code>m.groups.yil</code> deb yozish <code>m[1]</code> dan tushunarliroq va guruhlar tartibi o'zgarsa ham buzilmaydi." },
        { pg: "let regexp = /(?<yil>\\d{4})-(?<oy>\\d{2})-(?<kun>\\d{2})/g;\nlet str = \"2026-07-01, 1999-12-31\";\n\nfor (let m of str.matchAll(regexp)) {\n  console.log(m.groups.kun + \".\" + m.groups.oy + \".\" + m.groups.yil);\n}\n// 01.07.2026\n// 31.12.1999", file: "nomli-guruh-hammasi.js" },

        { h2: "replace da guruhlardan foydalanish" },
        { p: "<code>str.replace(regexp, o'rniga)</code> da almashtiruvchi matn ichida guruhlarga murojaat qilish mumkin:" },
        { ul: [
          "<code>$1</code>, <code>$2</code>, ... — mos raqamli guruh mazmuni;",
          "<code>$&lt;name&gt;</code> — nomli guruh mazmuni;",
          "<code>$&amp;</code> — butun mos kelish;",
          "<code>$$</code> — oddiy dollar belgisi (<code>$</code>)."
        ] },
        { p: "Sana formatini <code>yil-oy-kun</code> dan <code>kun.oy.yil</code> ga o'zgartiramiz. Raqamli guruhlar bilan:" },
        { pg: "let str = \"2026-07-01\";\nlet natija = str.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, \"$3.$2.$1\");\n\nconsole.log(natija);  // 01.07.2026", file: "replace-raqamli.js" },
        { p: "Xuddi shu ish nomli guruhlar bilan — ancha o'qilishli:" },
        { pg: "let str = \"2026-07-01\";\nlet regexp = /(?<yil>\\d{4})-(?<oy>\\d{2})-(?<kun>\\d{2})/;\nlet natija = str.replace(regexp, \"$<kun>.$<oy>.$<yil>\");\n\nconsole.log(natija);  // 01.07.2026", file: "replace-nomli.js" },

        { h2: "Tutmaydigan guruh (?:...)" },
        { p: "Ba'zan guruh faqat kvantor qo'llash uchun kerak, lekin uning mazmunini <em>saqlashni istamaymiz</em>. Bunday guruhni <code>?:</code> bilan boshlaymiz — u <strong>tutmaydigan</strong> (non-capturing) bo'ladi va natija massiviga tushmaydi." },
        { p: "Masalan, \"go\" takrorini tutamiz, lekin faqat oxirida qolgan so'z kerak. Oddiy guruh keraksiz <code>[1]</code> yaratadi:" },
        { pg: "// Oddiy guruh: keraksiz [1] paydo bo'ladi\nlet m1 = \"gogogo Ali\".match(/(go)+ (\\w+)/);\nconsole.log(m1[1]);  // go   (kerakmas)\nconsole.log(m1[2]);  // Ali\n\n// ?: bilan: 'go' guruhi tutilmaydi\nlet m2 = \"gogogo Ali\".match(/(?:go)+ (\\w+)/);\nconsole.log(m2[1]);  // Ali  (endi ism to'g'ri [1] da)", file: "tutmaydigan-guruh.js" },
        { note: "<code>(?:...)</code> ni ishlatish kod aniqligini oshiradi va katta shablonlarda ozgina tezlik beradi, chunki dvigatel keraksiz qismlarni saqlab yurmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>(...)</code> — qismni guruhlaydi va uning mazmunini <strong>tutib oladi</strong>;",
          "Guruhlar ochiluvchi qavs tartibida raqamlanadi: <code>match[1]</code>, <code>match[2]</code>, ...;",
          "<code>g</code> bilan barcha guruhlarni olish uchun <code>matchAll</code> ishlatiladi;",
          "Nomli guruh: <code>(?&lt;name&gt;...)</code> -> <code>match.groups.name</code>;",
          "<code>replace</code> da: <code>$1</code>, <code>$&lt;name&gt;</code>, <code>$&amp;</code>, <code>$$</code>;",
          "<code>(?:...)</code> — tutmaydigan guruh: faqat guruhlaydi, lekin natijaga tushmaydi."
        ] }
      ]
    },

    {
      slug: "regexp-alternation",
      title: "Alternatsiya (yoki) |",
      blurb: "Vertikal chiziq | bilan bir necha variantdan birini tanlash; qavs bilan chegaralash; sana va vaqt misollari; tez-tez uchraydigan tuzoqlar.",
      body: [
        { lead: "<strong>Alternatsiya</strong> (alternation) — muntazam ifodada \"buni <em>yoki</em> uni\" degan mantiqni ifodalash usuli. U vertikal chiziq <code>|</code> belgisi bilan yoziladi. Masalan, <code>gul|lola|atirgul</code> — uch guldan istalgan birini tutadi." },

        { h2: "Oddiy alternatsiya" },
        { p: "<code>|</code> chapdagi va o'ngdagi variantlardan <strong>birortasini</strong> tanlaydi. Dvigatel chapdan o'ngga tekshiradi va birinchi mos kelganini oladi:" },
        { pg: "let str = \"Menga lola va atirgul yoqadi\";\nlet regexp = /lola|atirgul|chinnigul/g;\n\nconsole.log(str.match(regexp));  // [ 'lola', 'atirgul' ]", file: "alt-oddiy.js" },
        { p: "Alternatsiyani belgilar sinfi <code>[...]</code> bilan chalkashtirmaslik kerak. Sinf faqat <strong>alohida belgilar</strong> orasidan tanlaydi, alternatsiya esa <strong>butun ifodalar</strong> (bir necha belgili so'zlar) orasidan tanlaydi:" },
        { pg: "// [ab] -> 'a' yoki 'b' (bitta belgi)\nconsole.log(\"a b c\".match(/[ab]/g));  // [ 'a', 'b' ]\n\n// gul|olma -> 'gul' yoki 'olma' (butun so'z)\nconsole.log(\"gul olma\".match(/gul|olma/g));  // [ 'gul', 'olma' ]", file: "alt-vs-sinf.js" },

        { h2: "Qavs bilan chegaralash" },
        { p: "Bu — alternatsiyaning eng muhim nozikligi. <code>|</code> ning \"ta'sir doirasi\" juda keng — u o'zidan chapdagi va o'ngdagi <strong>hamma narsani</strong> qamrab oladi. Variantni cheklash uchun uni qavsga olamiz." },
        { p: "Masalan, \"Toshkent shahri\" yoki \"Samarqand shahri\" ni tutmoqchimiz. Qavssiz xato bo'ladi:" },
        { pg: "let str = \"Samarqand shahri\";\n\n// XATO: bu 'Toshkent' YOKI 'Samarqand shahri' degani\nlet xato = /Toshkent|Samarqand shahri/;\nconsole.log(str.match(xato)[0]);  // Samarqand shahri (tasodifan to'g'ri)\nconsole.log(\"Toshkent shahri\".match(xato)[0]);  // Toshkent (shahri tushib qoldi!)", file: "alt-xato.js" },
        { p: "To'g'ri yechim — qavs bilan faqat shahar nomini alternatsiya qilamiz, \"shahri\" so'zi esa umumiy bo'lib qoladi:" },
        { pg: "let regexp = /(Toshkent|Samarqand) shahri/g;\n\nconsole.log(\"Toshkent shahri\".match(regexp)[0]);   // Toshkent shahri\nconsole.log(\"Samarqand shahri\".match(regexp)[0]);  // Samarqand shahri", file: "alt-qavs.js" },
        { warn: "Eng ko'p yo'l qo'yiladigan xato — <code>|</code> ni qavssiz ishlatish. Yodda tuting: <code>abc|def</code> = <code>abc</code> yoki <code>def</code>, lekin <code>a(bc|de)f</code> = <code>abcf</code> yoki <code>adef</code>." },

        { h2: "Tutmaydigan guruh bilan" },
        { p: "Agar alternatsiya uchun qavs kerak-u, lekin uning mazmunini saqlash shart bo'lmasa, tutmaydigan guruh <code>(?:...)</code> ni ishlatgan ma'qul:" },
        { pg: "let str = \"olma, banan va uzum\";\nlet regexp = /(?:olma|uzum)/g;\n\nconsole.log(str.match(regexp));  // [ 'olma', 'uzum' ]", file: "alt-tutmaydigan.js" },
        { note: "Tutmaydigan guruh <code>(?:...)</code> keraksiz tutib olishlarni oldini oladi. Bu, ayniqsa, keyin <code>match</code> guruhlarini raqam bo'yicha o'qiganda chalkashlikni kamaytiradi." },

        { h2: "Amaliy misol: vaqt (soat:daqiqa)" },
        { p: "Vaqtni <code>hh:mm</code> formatida tutamiz. Soat 00 dan 23 gacha, daqiqa 00 dan 59 gacha. Alternatsiya bilan soatning ikki holatini ifodalaymiz:" },
        { ul: [
          "<code>[01]\\d</code> — 00 dan 19 gacha (birinchi raqam 0 yoki 1, ikkinchisi istalgan);",
          "<code>2[0-3]</code> — 20 dan 23 gacha."
        ] },
        { pg: "// Soat: (00..19) yoki (20..23), keyin :, keyin daqiqa (00..59)\nlet regexp = /([01]\\d|2[0-3]):[0-5]\\d/g;\n\nlet str = \"Uchrashuv 09:30 da, tushlik 13:45 da, kechki 23:59 da.\";\nconsole.log(str.match(regexp));  // [ '09:30', '13:45', '23:59' ]", file: "alt-vaqt.js" },
        { p: "E'tibor bering, daqiqa qismi oddiy: <code>[0-5]\\d</code> — birinchi raqam 0..5, ikkinchisi istalgan, ya'ni 00..59." },

        { h2: "Amaliy misol: sanani tekshirish" },
        { p: "<code>kun.oy.yil</code> ko'rinishidagi sanani soddaroq tekshiramiz. Bu yerda alternatsiya kun va oy oralig'ini ifodalashda yordam beradi:" },
        { pg: "// kun: 01..31, oy: 01..12, yil: 4 raqam\nlet regexp = /(0[1-9]|[12]\\d|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}/g;\n\nlet str = \"01.07.2026 va 31.12.1999 va 40.13.2000\";\nconsole.log(str.match(regexp));  // [ '01.07.2026', '31.12.1999' ]", file: "alt-sana.js" },
        { p: "Bu shablon <code>40.13.2000</code> ni rad etadi, chunki 40 kun ham, 13 oy ham oraliqqa kirmaydi. E'tibor bering, nuqta <code>\\.</code> deb eskeyplangan — aks holda u \"istalgan belgi\" ma'nosini beradi." },
        { warn: "Bunday tekshiruv faqat <em>shakl</em>ni tekshiradi, mantiqni emas. Masalan, <code>31.02.2026</code> (fevralda 31-kun yo'q) shablon uchun to'g'ri ko'rinadi. Haqiqiy kalendar tekshiruvini <code>Date</code> obyekti bilan alohida qilish kerak." },

        { h2: "Alternatsiya tuzoqlari" },
        { p: "Bir necha nozik holatni bilib qo'ying:" },
        { ul: [
          "<strong>Tartib muhim</strong>: dvigatel chapdan o'ngga tekshiradi va birinchi mos kelganini oladi. <code>Jon|Jonon</code> \"Jonon\" so'zida faqat \"Jon\"ni tutadi — uzunroq variantni oldinga qo'ying: <code>Jonon|Jon</code>;",
          "<strong>Bo'sh variant</strong>: <code>(a|)</code> ikkinchi variant bo'sh, ya'ni \"a yoki hech nima\" — bu ba'zan kutilmagan bo'sh mos kelishlar beradi;",
          "<strong>Anchorlar bilan</strong>: <code>^gul|lola$</code> = (satr boshida \"gul\") yoki (satr oxirida \"lola\"). Butun satrni cheklash uchun <code>^(gul|lola)$</code> yozing."
        ] },
        { pg: "// Tartib muhim: uzun variant oldinda bo'lishi kerak\nconsole.log(\"Jonon\".match(/Jon|Jonon/)[0]);   // Jon   (qisqasi tutildi)\nconsole.log(\"Jonon\".match(/Jonon|Jon/)[0]);   // Jonon (to'g'ri)", file: "alt-tartib.js" },
        { tip: "Amaliy qoida: alternatsiya variantlarini yozishda <strong>eng uzun (aniqroq) variantni oldinga</strong> qo'ying, shunda dvigatel qisqa variantda erta to'xtab qolmaydi." },

        { h2: "Xulosa" },
        { ul: [
          "<code>|</code> — \"yoki\": bir necha variantdan birini tanlaydi;",
          "<code>|</code> ning ta'sir doirasi keng, shuning uchun variantni ko'pincha qavs bilan cheklash kerak;",
          "Mazmuni kerak bo'lmasa, <code>(?:...)</code> — tutmaydigan guruhni ishlating;",
          "Alternatsiya sana, vaqt, shaharlar ro'yxati kabi cheklangan variantlarni tutishda ideal;",
          "Tartib muhim — uzun/aniq variantni oldinga qo'ying;",
          "Anchor (<code>^</code>, <code>$</code>) bilan ishlashda butun ifodani <code>^(...)$</code> ga o'rang."
        ] }
      ]
    },

    {
      slug: "regexp-lookahead",
      title: "Lookahead va lookbehind",
      blurb: "Oldinga qarash x(?=y), x(?!y) va orqaga qarash (?<=y)x, (?<!y)x; narxni ajratish misoli; bu vositalar qachon kerak bo'ladi.",
      body: [
        { lead: "Ba'zan biror belgini <em>faqat undan oldin yoki keyin ma'lum narsa bo'lsa</em> tutmoqchi bo'lamiz — lekin o'sha \"kontekst\"ni natijaga qo'shmaymiz. Aynan shuning uchun <strong>lookahead</strong> (oldinga qarash) va <strong>lookbehind</strong> (orqaga qarash) mavjud. Ular \"nol kenglikdagi\" tekshiruvlar: shartni tekshiradi, lekin matnni \"yeb qo'ymaydi\"." },

        { h2: "Ijobiy lookahead: x(?=y)" },
        { p: "<code>x(?=y)</code> — <code>x</code> ni <strong>faqat undan keyin <code>y</code> kelsa</strong> tutadi. Muhimi: <code>y</code> natijaga <strong>kirmaydi</strong>, u faqat shart sifatida tekshiriladi." },
        { p: "Masalan, sonni <strong>faqat undan keyin \"so'm\" so'zi kelsa</strong> tutamiz:" },
        { pg: "let str = \"5 kg, 100 so'm, 3 dona, 250 so'm\";\nlet regexp = /\\d+(?= so'm)/g;\n\nconsole.log(str.match(regexp));  // [ '100', '250' ]", file: "lookahead-ijobiy.js" },
        { p: "Natijada faqat raqamlar bor — \" so'm\" qismi tutilmadi, u shunchaki shart bo'ldi. Agar oddiy <code>\\d+ so'm</code> yozganimizda, natijada \"so'm\" ham bo'lardi." },

        { h2: "Salbiy lookahead: x(?!y)" },
        { p: "<code>x(?!y)</code> — <code>x</code> ni <strong>faqat undan keyin <code>y</code> KELMASA</strong> tutadi. Bu ijobiy lookaheadning aksi." },
        { p: "Endi \"so'm\" kelmagan raqamlarni tutamiz (masalan, o'lchov birligisiz sonlar):" },
        { pg: "let str = \"5 kg, 100 so'm, 3 dona, 250 so'm\";\nlet regexp = /\\d+\\b(?! so'm)/g;\n\nconsole.log(str.match(regexp));  // [ '5', '3' ]", file: "lookahead-salbiy.js" },
        { note: "Yuqorida <code>\\b</code> (so'z chegarasi) qo'shildi, aks holda <code>100</code> dan <code>10</code> qismi tutilib qolardi (chunki <code>10</code> dan keyin \"0 so'm\" keladi, ya'ni \" so'm\" emas). <code>\\b</code> sonni to'liq oxiriga bog'laydi." },

        { h2: "Ijobiy lookbehind: (?<=y)x" },
        { p: "<code>(?&lt;=y)x</code> — <code>x</code> ni <strong>faqat undan oldin <code>y</code> kelsa</strong> tutadi. Bu lookaheadning \"orqaga qaragan\" varianti. <code>y</code> yana natijaga kirmaydi." },
        { p: "Masalan, dollar belgisidan keyingi summani tutamiz — <code>$</code> ni o'zini olmasdan:" },
        { pg: "let str = \"$30 va 50 EUR va $100\";\nlet regexp = /(?<=\\$)\\d+/g;\n\nconsole.log(str.match(regexp));  // [ '30', '100' ]", file: "lookbehind-ijobiy.js" },
        { p: "Bu yerda <code>\\$</code> eskeyplangan (dollar RegExp'da \"satr oxiri\" ma'nosini beradi), va u lookbehind ichida shart bo'lgani uchun natijaga <code>30</code> va <code>100</code> tushdi, <code>$</code> esa tushmadi." },

        { h2: "Salbiy lookbehind: (?<!y)x" },
        { p: "<code>(?&lt;!y)x</code> — <code>x</code> ni <strong>faqat undan oldin <code>y</code> KELMASA</strong> tutadi. Masalan, dollar belgisi bilan bog'lanmagan sonlarni ajratamiz:" },
        { pg: "let str = \"$30 va 50 EUR va $100\";\nlet regexp = /(?<!\\$)\\b\\d+/g;\n\nconsole.log(str.match(regexp));  // [ '50' ]", file: "lookbehind-salbiy.js" },
        { tip: "To'rt turni eslab qolish: <code>?=</code> va <code>?!</code> — <strong>oldinga</strong> (keyin nima keladi); <code>?&lt;=</code> va <code>?&lt;!</code> — <strong>orqaga</strong> (oldin nima kelgan). Undov <code>!</code> — inkor, teng <code>=</code> — tasdiq." },

        { h2: "Amaliy misol: narxni formatlash" },
        { p: "Kuchli misol — katta sonlarga uch xonadan ajratuvchi bo'sh joy qo'yish (<code>1234567</code> -> <code>1 234 567</code>). Buni lookahead bilan qilish mumkin: har bir raqam <strong>oldiga</strong> bo'sh joy qo'yamiz, agar undan keyin uchtalik guruhlar qolgan bo'lsa:" },
        { pg: "let son = \"1234567\";\n\n// Har uch raqamdan keyin (lekin son oxirida emas) bo'sh joy\nlet regexp = /\\d(?=(\\d{3})+$)/g;\nlet natija = son.replace(regexp, \"$& \");\n\nconsole.log(natija);  // 1 234 567", file: "narx-format.js" },
        { p: "Bu qanday ishlaydi? <code>\\d(?=(\\d{3})+$)</code> — shunday raqamni tanlaydiki, undan <strong>keyin</strong> to'liq uchtalik guruhlar (bir yoki ko'p) va satr oxiri kelsin. Bunday raqamdan keyin bo'sh joy o'rinli. <code>$&amp;</code> — topilgan raqamning o'zi." },
        { pg: "// Yana bir misol\nfunction ajrat(n) {\n  return String(n).replace(/\\d(?=(\\d{3})+$)/g, \"$& \");\n}\n\nconsole.log(ajrat(1000000));  // 1 000 000\nconsole.log(ajrat(500));      // 500\nconsole.log(ajrat(12345));    // 12 345", file: "narx-funksiya.js" },

        { h2: "Lookahead ichida guruhlar" },
        { p: "Lookahead va lookbehind ichida to'liq ifodalar, jumladan guruhlar va alternatsiya bo'lishi mumkin. Masalan, parol tekshiruvida bir necha shartni birdan qo'yish:" },
        { pg: "// Kamida bitta raqam VA kamida bitta katta harf borligini tekshirish\nlet regexp = /^(?=.*\\d)(?=.*[A-Z]).+$/;\n\nconsole.log(regexp.test(\"parol\"));    // false (raqam yo'q)\nconsole.log(regexp.test(\"Parol1\"));   // true  (raqam + katta harf)\nconsole.log(regexp.test(\"parol1\"));   // false (katta harf yo'q)", file: "lookahead-parol.js" },
        { p: "Bu yerda ikkita lookahead ketma-ket ishlatilgan. Ular \"nol kenglik\" bo'lgani uchun ikkalasi ham satr boshidan tekshiradi va bir-biriga xalal bermaydi — bu birdan bir necha shartni qo'yishning klassik usuli." },

        { h2: "Qachon kerak?" },
        { p: "Lookahead/lookbehind quyidagi holatlarda juda foydali:" },
        { ul: [
          "Biror belgini <strong>kontekst asosida</strong> tutish, lekin kontekstni natijaga qo'shmaslik (masalan, valyutadan oldingi/keyingi son);",
          "<code>replace</code> da faqat kerakli qismni almashtirish, atrofdagilarga tegmasdan;",
          "Bir necha shartni birdan tekshirish (parol murakkabligi kabi);",
          "\"Bunday emas\" mantig'i — masalan, ma'lum so'zdan keyin/oldin kelmagan holatlarni topish."
        ] },
        { note: "Zamonaviy JavaScript dvigatellari (Node.js, brauzerlar) lookbehind'ni to'liq qo'llab-quvvatlaydi. Ilgari u faqat lookahead uchun mavjud edi, endi ikkalasi ham ishlatilaveradi." },
        { warn: "Lookahead/lookbehind <strong>joy egallamaydi</strong> — ular kursorni oldinga su[u]rmaydi. Shuning uchun natijada faqat asosiy <code>x</code> qismi bo'ladi, shart qismidagi belgilar keyingi mos kelishlarda qayta ishlatilishi mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "<code>x(?=y)</code> — ijobiy lookahead: keyin <code>y</code> bo'lsa, <code>x</code> ni tut;",
          "<code>x(?!y)</code> — salbiy lookahead: keyin <code>y</code> BO'LMASA, <code>x</code> ni tut;",
          "<code>(?&lt;=y)x</code> — ijobiy lookbehind: oldin <code>y</code> bo'lsa, <code>x</code> ni tut;",
          "<code>(?&lt;!y)x</code> — salbiy lookbehind: oldin <code>y</code> BO'LMASA, <code>x</code> ni tut;",
          "Shart qismi (<code>y</code>) natijaga <strong>kirmaydi</strong> — bu \"nol kenglikli\" tekshiruv;",
          "Qo'llanilishi: kontekstga bog'liq tutish, narxni formatlash, parol tekshiruvi, aniq almashtirish."
        ] }
      ]
    }
  ]
};
