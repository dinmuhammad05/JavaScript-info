"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Kriptografiya asoslari",
  lessons: [
    {
      slug: "shifrlash-asoslari",
      title: "Shifrlash: simmetrik va asimmetrik",
      blurb: "Shifrlash nima, plaintext va ciphertext, kalit tushunchasi; simmetrik (AES) va asimmetrik (RSA) shifrlash farqi; Caesar va XOR shifrlari faqat tushunish uchun; gibrid yondashuv va kalitlarni himoyalash.",
      body: [
        { lead: "Kriptografiya — bu ma'lumotni begonalar o'qiy olmaydigan holatga keltirish san'ati. Zamonaviy internetning deyarli har bir xavfsiz aloqasi — bank ilovasi, xabar almashish, HTTPS sahifasi — shifrlashga tayanadi. Ushbu darsda biz shifrlashning asosiy tushunchalarini, simmetrik va asimmetrik usullar farqini o'rganamiz. Maqsad — <strong>to'g'ri kriptografiyani to'g'ri ishlatishni</strong> o'rganish, uni o'zimiz ixtiro qilish emas." },

        { note: "Ushbu bob to'liq ta'lim maqsadida yozilgan. Biz sizni <strong>himoyachi</strong> dasturchi qilib tarbiyalaymiz: kriptografiya qanday ishlashini tushunib, uni ishonchli kutubxonalar orqali to'g'ri qo'llashni bilishingiz uchun." },

        { h2: "Shifrlash nima?" },
        { p: "Shifrlash — bu ochiq matnni (<strong>plaintext</strong>) tushunarsiz shaklga (<strong>ciphertext</strong>) o'girish jarayoni. Bu jarayon maxsus qiymat — <strong>kalit</strong> (key) yordamida bajariladi. Faqat to'g'ri kalitga ega bo'lgan tomon ciphertext'ni qaytadan o'qiladigan matnga aylantira oladi. Bunga <em>deshifrlash</em> deyiladi." },
        { ul: [
          "<strong>Plaintext</strong> — asl, o'qiladigan ma'lumot (masalan, \"Salom, dunyo\");",
          "<strong>Ciphertext</strong> — shifrlangan, tushunarsiz ma'lumot (masalan, \"9f2a...\");",
          "<strong>Kalit</strong> — shifrlash va deshifrlashni boshqaradigan maxfiy qiymat;",
          "<strong>Algoritm</strong> — shifrlash qoidasi (masalan, AES)."
        ] },
        { p: "Muhim tamoyil bor — bu <strong>Kerckhoffs prinsipi</strong>: tizimning xavfsizligi algoritmning maxfiyligiga emas, balki <em>faqat kalitning</em> maxfiyligiga tayanishi kerak. Ya'ni algoritm ochiq, hamma tomonidan tekshirilgan bo'lishi mumkin — muhimi kalitni sir saqlash." },
        { tip: "\"Yashirinlik orqali xavfsizlik\" (security through obscurity) — yomon g'oya. Ishonchli algoritmlar ochiq, minglab mutaxassislar tomonidan tekshirilgan bo'ladi. Sir tutilgan \"o'z\" algoritmingiz ko'pincha tez sinadi." },

        { h2: "Simmetrik shifrlash" },
        { p: "<strong>Simmetrik shifrlash</strong>da shifrlash va deshifrlash uchun <em>bitta bir xil kalit</em> ishlatiladi. Ikkala tomon ham shu bitta maxfiy kalitni bilishi kerak. Bu qulf va uning yagona kalitiga o'xshaydi: kim kalitga ega bo'lsa, u ochadi ham, yopadi ham." },
        { ul: [
          "<strong>Tezlik:</strong> simmetrik algoritmlar juda tez ishlaydi — katta hajmdagi ma'lumotni shifrlashga qulay;",
          "<strong>Eng mashhur algoritm:</strong> <strong>AES</strong> (Advanced Encryption Standard), zamonaviy standart;",
          "<strong>Muammo:</strong> kalitni ikkala tomonga qanday xavfsiz yetkazish kerak?"
        ] },
        { p: "Aynan mana shu <strong>kalit almashish muammosi</strong> — simmetrik shifrlashning eng katta kamchiligi. Agar men sizga xabar yubormoqchi bo'lsam, avval kalitni sizga yetkazishim kerak. Lekin kalitni internet orqali yuborsam, uni yo'ldagi hujumchi ushlab olishi mumkin. Unda esa butun himoya ma'nosini yo'qotadi." },

        { h2: "Caesar shifri — faqat tushunish uchun" },
        { p: "Simmetrik shifrlash <em>g'oyasini</em> his qilish uchun eng oddiy tarixiy misolni ko'raylik — <strong>Caesar shifri</strong>. Bunda har bir harf alifboda muayyan qadam (kalit) miqdorida siljitiladi. Bu shifr <strong>hech qachon</strong> real himoya uchun ishlatilmaydi — biz uni faqat \"kalit\" tushunchasini ko'rsatish uchun keltiramiz." },
        { pg: [
          "// Caesar shifri — FAQAT o'quv maqsadida, tushunish uchun.",
          "// Bu shifr real hayotda MUTLAQO ishlatilmaydi (sekundlarda sinadi).",
          "",
          "function caesarShifrla(matn, kalit) {",
          "  let natija = '';",
          "  for (const belgi of matn) {",
          "    const kod = belgi.charCodeAt(0);",
          "    // faqat a-z harflarini siljitamiz",
          "    if (kod >= 97 && kod <= 122) {",
          "      const siljigan = ((kod - 97 + kalit) % 26) + 97;",
          "      natija += String.fromCharCode(siljigan);",
          "    } else {",
          "      natija += belgi; // qolgan belgilar o'zgarmaydi",
          "    }",
          "  }",
          "  return natija;",
          "}",
          "",
          "function caesarDeshifrla(matn, kalit) {",
          "  // teskari siljish — 26 dan kalitni ayiramiz",
          "  return caesarShifrla(matn, 26 - (kalit % 26));",
          "}",
          "",
          "const asl = 'salom dunyo';",
          "const shifr = caesarShifrla(asl, 3);",
          "console.log('Ciphertext:', shifr);",
          "console.log('Deshifr:', caesarDeshifrla(shifr, 3));"
        ].join("\n"), file: "caesar.js" },
        { warn: "Caesar shifrida atigi 25 ta mumkin kalit bor — hujumchi hammasini bir soniyada sinab ko'radi. Undan tashqari, harflar chastotasi tahlili orqali kalitsiz ham ochiladi. Bu shifr xavfsizlik uchun <strong>umuman yaroqsiz</strong>." },

        { h2: "XOR shifri — yana bir soddalik" },
        { p: "Yana bir o'quv misoli — <strong>XOR shifri</strong>. Bunda har bir bayt kalit bilan bit darajasida <code>XOR</code> amaliga uchraydi. Qiziq xususiyati: bir xil amalni takrorlash asl matnni qaytaradi. Bu ham faqat <em>g'oyani</em> ko'rsatadi; qisqa yoki takrorlanuvchi kalit bilan XOR oson sinadi." },
        { pg: [
          "// XOR shifri — FAQAT tushunish uchun, real himoya EMAS.",
          "// XOR amali: bir xil kalit bilan ikki marta qo'llansa, asl matn qaytadi.",
          "",
          "function xorShifr(matn, kalit) {",
          "  let natija = '';",
          "  for (let i = 0; i < matn.length; i++) {",
          "    const m = matn.charCodeAt(i);",
          "    const k = kalit.charCodeAt(i % kalit.length);",
          "    natija += String.fromCharCode(m ^ k); // ^ — XOR amali",
          "  }",
          "  return natija;",
          "}",
          "",
          "const kalit = 'MAXFIY';",
          "const shifrlangan = xorShifr('Salom dunyo', kalit);",
          "",
          "// aynan shu funksiyani qayta qo'llaymiz — asl matn qaytadi",
          "const ochilgan = xorShifr(shifrlangan, kalit);",
          "console.log('Ochilgan matn:', ochilgan);",
          "",
          "// nega zaif: qisqa, takrorlanuvchi kalit chastota tahliliga beriladi.",
          "// To'g'ri usul: AES kabi sinovdan o'tgan algoritm."
        ].join("\n"), file: "xor.js" },
        { note: "Diqqat: yagona, matn uzunligidagi, tasodifiy va bir marta ishlatiladigan kalit bilan XOR (\"one-time pad\") nazariy jihatdan buzilmas. Lekin bunday kalitni xavfsiz yaratish va tarqatish amalda deyarli imkonsiz — shu bois real tizimlar AES ishlatadi." },

        { h2: "Asimmetrik shifrlash" },
        { p: "<strong>Asimmetrik shifrlash</strong> (ochiq kalitli kriptografiya) kalit almashish muammosini hal qiladi. Bu yerda bitta emas, <em>ikkita</em> bog'liq kalit bo'ladi:" },
        { ul: [
          "<strong>Ochiq kalit (public key)</strong> — hammaga ochiq berilishi mumkin; u bilan <em>shifrlanadi</em>;",
          "<strong>Maxfiy kalit (private key)</strong> — faqat egasida saqlanadi; u bilan <em>deshifrlanadi</em>."
        ] },
        { p: "Sehr shundaki: ochiq kalit bilan shifrlangan xabarni <em>faqat</em> mos maxfiy kalit ocha oladi. Demak, men sizning ochiq kalitingizni oldindan bilsam, xabarni shifrlab yubora olaman — va uni faqat siz (maxfiy kalit egasi) o'qiy olasiz. Endi hech qanday maxfiy kalitni internet orqali almashishga hojat yo'q!" },
        { p: "Eng mashhur asimmetrik algoritmlar — <strong>RSA</strong> va elliptik egri chiziqlarga asoslangan <strong>ECC</strong>. Ular yirik matematik masalalarga (masalan, katta sonlarni tub ko'paytuvchilarga ajratish qiyinligiga) tayanadi." },
        { warn: "Asimmetrik shifrlash simmetrikdan ancha <strong>sekin</strong> ishlaydi. Shuning uchun katta hajmdagi ma'lumotni to'g'ridan-to'g'ri RSA bilan shifrlash amaliy emas." },

        { h2: "Gibrid yondashuv — ikkalasining kuchi" },
        { p: "Amalda ikkala usul <strong>birgalikda</strong> ishlatiladi — bunga <strong>gibrid shifrlash</strong> deyiladi. Aynan shu tarzda <strong>TLS/HTTPS</strong> ishlaydi:" },
        { ol: [
          "Asimmetrik shifrlash yordamida tomonlar bir-biriga <em>bir martalik simmetrik kalitni</em> xavfsiz yetkazadi (sekin, lekin faqat kichik kalit uchun);",
          "So'ngra butun katta ma'lumot oqimi shu simmetrik kalit bilan (AES) tez shifrlanadi."
        ] },
        { p: "Natijada asimmetrik shifrlashning <em>xavfsiz kalit almashishi</em> va simmetrik shifrlashning <em>tezligi</em> birlashadi. Har bir usul o'z kuchli tomonini beradi." },

        { h2: "Kalitlarni himoyalash" },
        { p: "Butun kriptografiyaning ishonchliligi bitta narsaga — <strong>kalitning maxfiyligiga</strong> bog'liq. Eng kuchli AES ham kalit sizib ketsa, foydasiz bo'lib qoladi. Shuning uchun:" },
        { ul: [
          "Maxfiy kalitlarni <strong>hech qachon</strong> kod ichiga yozmang yoki Git'ga joylashtirmang;",
          "Kalitlarni muhit o'zgaruvchilari yoki maxsus kalit boshqaruv tizimlarida (masalan, Vault, cloud KMS) saqlang;",
          "Kalitlarni vaqti-vaqti bilan yangilab (rotatsiya qilib) turing;",
          "Har bir maqsad uchun alohida kalit ishlating."
        ] },
        { warn: "Eng muhim maslahat: <strong>o'zingiz shifrlash algoritmi o'ylab topmang va yozmang.</strong> Kriptografiya juda nozik soha; bitta kichik xato butun himoyani buzadi. Har doim keng sinovdan o'tgan kutubxonalardan foydalaning: Node.js'da o'rnatilgan <code>crypto</code> moduli, brauzerda <code>Web Crypto API</code>." },

        { h2: "Xulosa" },
        { ul: [
          "Shifrlash — plaintext'ni kalit yordamida ciphertext'ga o'girish; xavfsizlik <strong>faqat kalitga</strong> tayanadi (Kerckhoffs prinsipi);",
          "<strong>Simmetrik</strong> (AES): bitta kalit, tez, lekin kalit almashish muammosi bor;",
          "<strong>Asimmetrik</strong> (RSA): ochiq va maxfiy kalit juftligi, kalit almashishni hal qiladi, lekin sekin;",
          "Caesar va XOR shifrlari <strong>faqat o'quv maqsadida</strong> — real himoya uchun yaroqsiz;",
          "<strong>Gibrid</strong> yondashuv (TLS) ikkalasini birlashtiradi: asimmetrik bilan kalit almashib, simmetrik bilan tez shifrlaydi;",
          "Kalitlarni himoyalang va <strong>hech qachon</strong> o'z kriptografiyangizni yozmang — sinovdan o'tgan kutubxonadan foydalaning."
        ] }
      ]
    },

    {
      slug: "hashing-parol",
      title: "Hashing va parollarni xavfsiz saqlash",
      blurb: "Hash funksiyasi nima (bir tomonlama, deterministik, avalanche), shifrlashdan farqi; parolni ochiq saqlash falokati; nega oddiy hash yetarli emas; salt, sekin hash (bcrypt, argon2, scrypt); register va login oqimi.",
      body: [
        { lead: "Deyarli har bir ilova foydalanuvchi parolini saqlashi kerak. Lekin parolni <em>qanday</em> saqlash — xavfsizlikdagi eng ko'p xato qilinadigan joylardan biri. Ushbu darsda hash funksiyalari nima ekanini, nega oddiy hash parol uchun yetarli emasligini, hamda salt va sekin hash algoritmlari (bcrypt, argon2) qanday yordam berishini o'rganamiz." },

        { h2: "Hash funksiyasi nima?" },
        { p: "<strong>Hash funksiyasi</strong> — istalgan uzunlikdagi ma'lumotdan qat'iy uzunlikdagi \"barmoq izi\" (hash, digest) yaratadigan funksiya. Yaxshi kriptografik hash funksiyasi uch muhim xususiyatga ega:" },
        { ul: [
          "<strong>Bir tomonlama (one-way):</strong> hashdan asl ma'lumotni tiklab bo'lmaydi;",
          "<strong>Deterministik:</strong> bir xil kirish doim bir xil hash beradi;",
          "<strong>Avalanche effekti:</strong> kirishning bitta bitini o'zgartirish hashni butunlay o'zgartiradi;",
          "<strong>To'qnashuvga chidamli:</strong> ikki xil kirish uchun bir xil hash topish amalda imkonsiz."
        ] },
        { code: [
          "// Node.js'ning o'rnatilgan crypto moduli hash misoli.",
          "// (Bu demo — hash xususiyatlarini ko'rsatish uchun.)",
          "const crypto = require('crypto');",
          "",
          "function sha256(matn) {",
          "  return crypto.createHash('sha256').update(matn).digest('hex');",
          "}",
          "",
          "// Deterministik: bir xil kirish -> bir xil hash",
          "console.log(sha256('parol123'));",
          "console.log(sha256('parol123'));",
          "",
          "// Avalanche: bitta harf o'zgardi -> butunlay boshqa hash",
          "console.log(sha256('parol123'));",
          "console.log(sha256('parol124'));"
        ].join("\n") },
        { note: "Diqqat: bu yerda SHA-256 ni <em>parol</em> uchun emas, balki hash <em>xususiyatlarini ko'rsatish</em> uchun ishlatdik. Quyida nega SHA parollar uchun yetarli emasligini ko'ramiz." },

        { h2: "Hashing va shifrlash farqi" },
        { p: "Bu ikkisini aralashtirmaslik muhim:" },
        { ul: [
          "<strong>Shifrlash</strong> — ikki tomonlama: kalit bilan shifrlab, keyin <em>qaytarib</em> ochish mumkin;",
          "<strong>Hashing</strong> — bir tomonlama: hashdan asl matnni <em>qaytarib bo'lmaydi</em>."
        ] },
        { p: "Aynan shu \"qaytarib bo'lmaslik\" xususiyati hashni parollarni saqlash uchun ideal qiladi. Bizga parolning o'zi kerak emas — bizga faqat \"kiritilgan parol saqlangani bilan mos keladimi?\" degan savolga javob kerak. Buni esa hashlarni solishtirib bilsak bo'ladi, asl parolni bilmasdan." },

        { h2: "Parolni ochiq saqlash — falokat" },
        { p: "Eng jiddiy xato — parolni ma'lumotlar bazasida <strong>ochiq matnda</strong> (o'qiladigan holatda) saqlash. Nima uchun bu falokat?" },
        { ul: [
          "Ma'lumotlar bazasi o'g'irlansa (bu tez-tez sodir bo'ladi), <em>barcha</em> parollar darhol ochiladi;",
          "Odamlar ko'pincha bir parolni bir necha saytda ishlatadi — bitta sizish boshqa xizmatlarga ham xavf soladi;",
          "Ma'lumotlar bazasiga kirish huquqi bor xodim (yoki hujumchi) hamma parolni ko'ra oladi."
        ] },
        { warn: "Parolni <strong>ochiq matnda</strong> saqlamang. Uni <strong>oddiy shifrlash</strong> bilan ham saqlamang — shifr kaliti sizsa, hammasi ochiladi. To'g'ri yechim — parolni <strong>hashlab</strong> saqlash." },

        { h2: "Nega oddiy hash yetarli emas?" },
        { p: "\"Unda parolni SHA-256 bilan hashlaymiz-da?\" — deb o'ylashingiz mumkin. Afsuski, oddiy tez hash funksiyalari (MD5, SHA-1, SHA-256) parollar uchun <strong>yetarli emas</strong>. Ikkita katta muammo bor." },
        { h3: "1. Ular juda tez" },
        { p: "SHA-256 shu qadar tezki, zamonaviy kompyuter sekundiga milliardlab hashni hisoblay oladi. Bu \"barcha mumkin parollarni sinab ko'rish\" (brute-force) hujumini osonlashtiradi. Parollar uchun bizga aksincha — <strong>ataylab sekin</strong> funksiya kerak." },
        { h3: "2. Rainbow jadvallar" },
        { p: "Oddiy hash deterministik bo'lgani uchun, hujumchilar mashhur parollarning hashlarini oldindan hisoblab, ulkan jadvallar (<strong>rainbow tables</strong>) tuzib qo'yishgan. Bunday jadvaldan hashni izlab, asl parolni bir zumda topish mumkin." },
        { note: "MD5 va SHA-1 — bugungi kunda <strong>buzilgan</strong> hisoblanadi va yangi loyihalarda umuman ishlatilmasligi kerak. Ularni faqat nega yaroqsizligini bilish uchun eslaymiz, xolos." },

        { h2: "Yechim 1: salt (tuz)" },
        { p: "<strong>Salt</strong> (tuz) — bu har bir parolga hashlashdan oldin qo'shiladigan <em>tasodifiy</em>, noyob qiymat. Salt maxfiy emas — u parol yonida saqlanadi. Uning vazifasi:" },
        { ul: [
          "Har bir foydalanuvchi uchun salt farqli — demak bir xil parol ham <em>har xil</em> hash beradi;",
          "Rainbow jadvallar foydasiz bo'lib qoladi — oldindan hisoblab qo'yib bo'lmaydi;",
          "Ikki foydalanuvchi bir xil parol qo'ysa ham, bazada bu ko'rinmaydi."
        ] },
        { code: [
          "// Salt g'oyasini ko'rsatuvchi DEMO (o'quv maqsadida).",
          "// Diqqat: real loyihada bu qo'lbola usulni EMAS, bcrypt ishlating!",
          "const crypto = require('crypto');",
          "",
          "// har bir foydalanuvchi uchun tasodifiy salt",
          "function saltYarat() {",
          "  return crypto.randomBytes(16).toString('hex');",
          "}",
          "",
          "function saltliHash(parol, salt) {",
          "  return crypto.createHash('sha256').update(salt + parol).digest('hex');",
          "}",
          "",
          "const salt1 = saltYarat();",
          "const salt2 = saltYarat();",
          "",
          "// AYNI parol, lekin har xil salt -> har xil hash",
          "console.log('User1:', saltliHash('parol123', salt1));",
          "console.log('User2:', saltliHash('parol123', salt2));",
          "",
          "// bazada: { salt, hash } juftligini saqlaymiz.",
          "// Lekin bu hali ham TEZ hash — shuning uchun yetarli emas!"
        ].join("\n") },

        { h2: "Yechim 2: sekin hash (bcrypt, argon2)" },
        { p: "Salt rainbow jadvallarni yechadi, lekin \"tez hash\" muammosi qoladi. Buning yechimi — <strong>ataylab sekin</strong> ishlaydigan, parollar uchun maxsus yaratilgan algoritmlar:" },
        { ul: [
          "<strong>bcrypt</strong> — vaqt sinovidan o'tgan, keng qo'llaniladigan tanlov; ichida salt ham bor;",
          "<strong>argon2</strong> — zamonaviy tavsiya etilgan algoritm (Password Hashing Competition g'olibi);",
          "<strong>scrypt</strong> — ko'p xotira talab qiladigan yana bir ishonchli variant."
        ] },
        { p: "Bu algoritmlarda <strong>\"cost\" (narx) parametri</strong> bo'ladi — u qancha katta bo'lsa, hash shuncha sekin hisoblanadi. Bu qonuniy login uchun sezilmas (masalan, 0.2 soniya), lekin hujumchi uchun milliardlab sinovni deyarli imkonsiz qiladi. Kompyuterlar tezlashgani sari cost'ni oshirib borish mumkin." },
        { code: [
          "// bcrypt QANDAY ishlashini ko'rsatuvchi soddalashtirilgan DEMO.",
          "// Real bcrypt kutubxonasi emas — faqat 'cost' g'oyasini ko'rsatadi.",
          "const crypto = require('crypto');",
          "",
          "// 'cost' — necha marta takrorlab hashlaymiz (ataylab sekin)",
          "function sekinHash(parol, salt, cost) {",
          "  let h = salt + parol;",
          "  const takror = 2 ** cost; // cost oshsa, takror keskin oshadi",
          "  for (let i = 0; i < takror; i++) {",
          "    h = crypto.createHash('sha256').update(h).digest('hex');",
          "  }",
          "  return h;",
          "}",
          "",
          "// cost qancha katta bo'lsa, shuncha sekin (hujumchiga qiyin)",
          "console.time('cost=10');",
          "sekinHash('parol123', 'tasodifiy_salt', 10);",
          "console.timeEnd('cost=10');",
          "",
          "console.time('cost=14');",
          "sekinHash('parol123', 'tasodifiy_salt', 14);",
          "console.timeEnd('cost=14');",
          "",
          "// Real loyihada: bcrypt.hash(parol, 12) — kutubxona bularni to'g'ri qiladi."
        ].join("\n") },
        { warn: "Yuqoridagi kod — faqat g'oyani tushuntirish uchun. Real loyihada <strong>hech qachon</strong> o'z hash sxemangizni yozmang. <code>bcrypt</code> yoki <code>argon2</code> kutubxonasidan foydalaning — ular salt, cost va boshqa nozikliklarni to'g'ri hal qiladi." },

        { h2: "Register va login oqimi" },
        { p: "Salt va sekin hash bilan parolni saqlash va tekshirish oqimi qanday ko'rinadi:" },
        { h3: "Ro'yxatdan o'tish (register)" },
        { ol: [
          "Foydalanuvchi parol kiritadi;",
          "Server tasodifiy salt yaratadi va parolni sekin hash bilan hashlaydi (bcrypt buni bir qadamda qiladi);",
          "Bazaga <strong>faqat hash</strong> saqlanadi (bcrypt salt'ni hash ichiga qo'shib yuboradi). Asl parol hech qayerda saqlanmaydi."
        ] },
        { h3: "Tizimga kirish (login)" },
        { ol: [
          "Foydalanuvchi parolni qayta kiritadi;",
          "Server bazadagi hashni oladi va kiritilgan parolni <em>o'sha salt</em> bilan qayta hashlaydi;",
          "Ikki hashni solishtiradi — mos kelsa, parol to'g'ri (asl parolni hech qachon bilmasdan)."
        ] },
        { code: "// Konseptual misol (bcrypt kutubxonasi bilan)\nconst bcrypt = require('bcrypt');\n\n// Register: parolni hashlab saqlaymiz\nasync function royxat(parol) {\n  const hash = await bcrypt.hash(parol, 12); // 12 — cost darajasi\n  // bazaga faqat 'hash' ni saqlaymiz (salt uning ichida)\n  return hash;\n}\n\n// Login: kiritilgan parolni saqlangan hash bilan solishtiramiz\nasync function kirish(kiritilganParol, saqlanganHash) {\n  const mosKeladi = await bcrypt.compare(kiritilganParol, saqlanganHash);\n  return mosKeladi; // true yoki false\n}" },
        { tip: "Login muvaffaqiyatsiz bo'lganda \"login yoki parol noto'g'ri\" deb umumiy xabar bering — \"parol noto'g'ri\" demang. Aks holda hujumchi qaysi login mavjudligini bilib oladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Hash funksiyasi</strong> — bir tomonlama, deterministik, avalanche effektli; shifrlashdan farqli o'laroq qaytarib bo'lmaydi;",
          "Parolni <strong>ochiq matnda saqlash</strong> — falokat; shifrlash ham yechim emas, hash kerak;",
          "Oddiy tez hash (MD5, SHA) parol uchun <strong>yetarli emas</strong>: juda tez va rainbow jadvallarga beriladi;",
          "<strong>Salt</strong> — har parolga noyob tasodifiy qiymat; bir xil parollarni ajratadi va rainbow jadvalni foydasiz qiladi;",
          "<strong>Sekin hash</strong> (bcrypt, argon2, scrypt) — ataylab sekin, cost parametri bilan sozlanadi;",
          "Real loyihada <strong>o'z hashingizni yozmang</strong> — bcrypt yoki argon2 kutubxonasidan foydalaning."
        ] }
      ]
    },

    {
      slug: "tls-https-qanday",
      title: "TLS/HTTPS qanday ishlaydi",
      blurb: "HTTP va HTTPS farqi, nega HTTPS shart (MITM hujumi); TLS handshake yuqori darajada; sertifikat va sertifikat markazi (CA), ishonch zanjiri; HTTPS ni buzadigan xatolar; Let's Encrypt bilan bepul sertifikat.",
      body: [
        { lead: "Brauzer manzil qatorida yashil qulf belgisini ko'rganingizda, orqada murakkab va nafis kriptografik jarayon ishlab turadi. Ushbu darsda HTTP va HTTPS farqini, nega HTTPS bugungi kunda majburiy ekanini, TLS \"qo'l berib ko'rishish\" (handshake) qanday ishlashini va sertifikatlarga qanday ishonch qurilishini yuqori darajada o'rganamiz." },

        { h2: "HTTP va HTTPS" },
        { p: "<strong>HTTP</strong> (HyperText Transfer Protocol) — web'ning asosiy protokoli. Muammosi shundaki, u ma'lumotni <strong>ochiq matnda</strong> uzatadi. Ya'ni siz va server orasidagi yo'lda o'tirgan har kim — Wi-Fi egasi, internet-provayder, tarmoq uskunasi — barcha ma'lumotni (parollar, xabarlar, kartalar) o'qiy oladi." },
        { p: "<strong>HTTPS</strong> — bu \"HTTP over TLS\", ya'ni HTTP so'rovlari <strong>TLS</strong> (Transport Layer Security) qatlami bilan shifrlanadi. HTTPS uch narsani ta'minlaydi:" },
        { ul: [
          "<strong>Maxfiylik:</strong> ma'lumot shifrlanadi — yo'ldagi hech kim o'qiy olmaydi;",
          "<strong>Butunlik:</strong> ma'lumot yo'lda o'zgartirilsa, buni aniqlab bo'ladi;",
          "<strong>Autentifikatsiya:</strong> siz haqiqatan ham to'g'ri serverga ulanayotganingizga ishonch hosil qilasiz."
        ] },
        { note: "TLS — bu <strong>SSL</strong>ning zamonaviy davomchisi. SSL eski va buzilgan hisoblanadi; bugun aslida hamma joyda TLS ishlatiladi, lekin \"SSL sertifikat\" iborasi odat bo'yicha hali ham ishlatiladi." },

        { h2: "Nega HTTPS shart: MITM hujumi" },
        { p: "HTTP'ning xavfini eng yaxshi ko'rsatadigan tahdid — <strong>o'rtadagi odam hujumi</strong> (Man-in-the-Middle, MITM). Bunda hujumchi siz va server orasiga suqilib kiradi:" },
        { ol: [
          "Siz umumiy Wi-Fi'ga (masalan, kafeda) ulangansiz;",
          "Hujumchi o'sha tarmoqda sizning HTTP trafigingizni ushlab turadi;",
          "U parollaringizni, cookie'laringizni <em>o'qiy</em> oladi (maxfiylik buziladi);",
          "Undan ham yomoni — u sahifa mazmunini <em>o'zgartira</em> oladi (butunlik buziladi), masalan soxta forma qo'shib."
        ] },
        { p: "HTTPS bu hujumni to'xtatadi: ma'lumot shifrlangani uchun hujumchi uni o'qiy olmaydi, o'zgartira ham olmaydi (o'zgartirsa, aniqlanadi), hamda sertifikat orqali soxta serverni ham fosh qiladi." },
        { warn: "Ochiq (parolsiz) Wi-Fi tarmoqlarida HTTP saytlarga hech qachon maxfiy ma'lumot kiritmang. Faqat HTTPS (qulf belgisi bor) saytlarga ishoning." },

        { h2: "TLS handshake — yuqori darajada" },
        { p: "HTTPS aloqasi boshlanishidan oldin brauzer va server <strong>TLS handshake</strong> (qo'l berib ko'rishish) bosqichidan o'tadi. Uning maqsadi — xavfsiz aloqa uchun umumiy <em>simmetrik kalitni</em> kelishib olish. Bu yerda o'tgan darsdagi <strong>gibrid yondashuv</strong> namoyon bo'ladi:" },
        { ol: [
          "<strong>Salom (ClientHello):</strong> brauzer serverga qaysi TLS versiyalari va algoritmlarni qo'llab-quvvatlashini aytadi;",
          "<strong>Sertifikat:</strong> server o'z ochiq kaliti bo'lgan <em>sertifikatini</em> yuboradi;",
          "<strong>Tekshirish:</strong> brauzer sertifikat haqiqiy va ishonchli ekanini tekshiradi (quyida batafsil);",
          "<strong>Kalit kelishish:</strong> asimmetrik kriptografiya yordamida ikkala tomon bir martalik <em>simmetrik seans kalitini</em> xavfsiz hosil qiladi;",
          "<strong>Xavfsiz aloqa:</strong> shundan keyin barcha ma'lumot shu tez simmetrik kalit (AES) bilan shifrlanadi."
        ] },
        { p: "Nima uchun ikki bosqich? Chunki asimmetrik shifrlash xavfsiz, lekin sekin; simmetrik shifrlash tez, lekin kalitni almashish qiyin. Handshake asimmetrik bilan kalitni <em>bir marta</em> xavfsiz kelishib oladi, keyin butun trafik tez simmetrik bilan yuradi." },
        { tip: "Har bir yangi seans uchun yangi simmetrik kalit yaratiladi. Bu \"forward secrecy\" tamoyili: agar kelajakda serverning maxfiy kaliti sizsa ham, o'tgan seanslar shifrini ochib bo'lmaydi." },

        { h2: "Sertifikat va sertifikat markazi (CA)" },
        { p: "Handshake'da server o'z ochiq kalitini yuboradi. Lekin qanday ishonch hosil qilamizki, bu <em>haqiqatan ham</em> o'sha saytniki, hujumchining soxta kaliti emas? Bu yerda <strong>sertifikatlar</strong> va <strong>sertifikat markazlari</strong> (Certificate Authority, CA) yordamga keladi." },
        { ul: [
          "<strong>Sertifikat</strong> — bu \"bu ochiq kalit falon domenga tegishli\" degan raqamli hujjat;",
          "<strong>Sertifikat markazi (CA)</strong> — ishonchli tashkilot bo'lib, u domen egaligini tekshirib, sertifikatni <em>o'z maxfiy kaliti bilan imzolaydi</em>;",
          "Brauzer va operatsion tizimda ishonchli CA'lar ro'yxati oldindan o'rnatilgan bo'ladi."
        ] },
        { p: "Ya'ni CA sertifikatni raqamli imzolaydi (bu haqda keyingi darsda batafsil). Brauzer CA'ning ochiq kaliti bilan bu imzoni tekshiradi. Imzo to'g'ri chiqsa, sertifikatga ishonadi." },

        { h2: "Ishonch zanjiri" },
        { p: "Amalda sertifikatlar <strong>ishonch zanjiri</strong> (chain of trust) orqali bog'lanadi:" },
        { ol: [
          "<strong>Root CA</strong> — eng yuqoridagi ildiz sertifikat, brauzerga oldindan o'rnatilgan va so'zsiz ishoniladi;",
          "<strong>Intermediate CA</strong> — root tomonidan imzolangan oraliq sertifikatlar;",
          "<strong>Server sertifikati</strong> — sizning saytingizning sertifikati, intermediate tomonidan imzolangan."
        ] },
        { p: "Brauzer zanjirni pastdan tepaga tekshiradi: server sertifikatini intermediate imzolaganmi, uni root imzolaganmi, va root ishonchli ro'yxatdami. Agar zanjirning har bir bo'g'ini to'g'ri bo'lsa — ishonch o'rnatiladi." },

        { h2: "HTTPS ni buzadigan xatolar" },
        { p: "HTTPS o'rnatilgan bo'lsa ham, bir nechta keng tarqalgan xatolar himoyani zaiflashtiradi:" },
        { ul: [
          "<strong>Aralash kontent (mixed content):</strong> HTTPS sahifada HTTP orqali yuklangan skript yoki rasm — bu qism himoyasiz qoladi va butun sahifani xavf ostiga qo'yadi;",
          "<strong>Eskirgan TLS versiyalari:</strong> TLS 1.0 va 1.1 buzilgan — faqat TLS 1.2 va 1.3 ishlating;",
          "<strong>Muddati o'tgan sertifikat:</strong> yangilashni unutish saytni ishonchsiz qiladi;",
          "<strong>Zaif shifr to'plamlari:</strong> eski, zaif algoritmlarni o'chirib qo'yish kerak;",
          "<strong>HSTS yo'qligi:</strong> <code>Strict-Transport-Security</code> sarlavhasi brauzerni doim HTTPS'ga majburlaydi."
        ] },
        { warn: "Aralash kontent xavflidir: agar HTTPS sahifada bitta HTTP <code>&lt;script&gt;</code> bo'lsa, hujumchi shu skriptni almashtirib butun sahifani nazorat qilishi mumkin. Barcha resurslarni HTTPS orqali yuklang." },

        { h2: "Let's Encrypt — bepul sertifikat" },
        { p: "Ilgari sertifikatlar pullik va olish murakkab edi. Bugun <strong>Let's Encrypt</strong> — notijorat sertifikat markazi — sertifikatlarni <strong>bepul va avtomatik</strong> beradi. Bu HTTPS'ni hamma uchun ochdi." },
        { ul: [
          "Sertifikatlar <code>certbot</code> kabi vositalar bilan avtomatik olinadi va yangilanadi;",
          "Amal muddati qisqa (90 kun), lekin avtomatik yangilanadi — bu xavfsizroq;",
          "Ko'plab hosting va platformalar HTTPS'ni bir tugma bilan yoqadi."
        ] },
        { tip: "Har doim HTTPS ishlating — hatto oddiy, \"maxfiy ma'lumoti yo'q\" bloglar uchun ham. HTTPS bepul, brauzerlar HTTP saytlarni \"xavfsiz emas\" deb belgilaydi, va u SEO'ga ham ijobiy ta'sir qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>HTTP</strong> ma'lumotni ochiq uzatadi; <strong>HTTPS</strong> uni TLS bilan shifrlab, maxfiylik, butunlik va autentifikatsiyani beradi;",
          "HTTPS <strong>MITM hujumini</strong> to'xtatadi — yo'ldagi hujumchi ma'lumotni o'qiy ham, o'zgartira ham olmaydi;",
          "<strong>TLS handshake</strong> gibrid yondashuvni ishlatadi: asimmetrik bilan simmetrik kalitni kelishib, keyin AES bilan tez shifrlaydi;",
          "<strong>Sertifikat</strong> ochiq kalitni domenga bog'laydi; <strong>CA</strong> uni imzolaydi va <strong>ishonch zanjiri</strong> orqali tekshiriladi;",
          "Aralash kontent, eskirgan TLS, muddati o'tgan sertifikat — HTTPS'ni zaiflashtiradigan keng xatolar;",
          "<strong>Let's Encrypt</strong> bepul, avtomatik sertifikat beradi — har doim HTTPS ishlating."
        ] }
      ]
    },

    {
      slug: "raqamli-imzo",
      title: "Raqamli imzo va butunlik",
      blurb: "Ma'lumot butunligi muammosi; hash bilan butunlikni tekshirish (checksum); raqamli imzo (maxfiy kalit bilan imzolash, ochiq kalit bilan tekshirish); autentifikatsiya, butunlik, rad eta olmaslik; dastur imzolash, JWT, sertifikatlar.",
      body: [
        { lead: "Ba'zan ma'lumotni yashirish emas, uning <em>o'zgarmaganini</em> va <em>kimdan kelganini</em> isbotlash muhim. Dastur yangilanishi haqiqatan ishlab chiquvchidanmi? Yuklangan fayl yo'lda buzilmadimi? Ushbu darsda ma'lumot butunligi (integrity) muammosini, uni hash bilan tekshirishni va raqamli imzolar qanday ishlashini o'rganamiz." },

        { h2: "Ma'lumot butunligi muammosi" },
        { p: "<strong>Butunlik (integrity)</strong> — ma'lumot yaratilgandan beri o'zgarmagani kafolati. Shifrlash ma'lumotni <em>yashiradi</em>, lekin uning o'zgartirilmaganini o'zi kafolatlamaydi. Bir nechta vaziyatni ko'raylik:" },
        { ul: [
          "Siz internetdan dastur yuklab olyapsiz — u yo'lda o'zgartirilib, zararli kod qo'shilmaganmi?",
          "Fayl yuklanish paytida buzilmadimi (tarmoq xatosi tufayli)?",
          "Serverga kelgan buyruq haqiqatan ruxsati bor foydalanuvchidanmi?"
        ] },
        { p: "Bu savollarga javob berish uchun bizga ikki xil vosita kerak: oddiy <strong>xatolik/o'zgarishni aniqlash</strong> (hash/checksum) va <strong>kim yuborganini ham isbotlash</strong> (raqamli imzo)." },

        { h2: "Hash bilan butunlikni tekshirish: checksum" },
        { p: "Eng oddiy butunlik tekshiruvi — <strong>checksum</strong> (nazorat yig'indisi). Fayl uchun uning hashini (masalan, SHA-256) e'lon qilib qo'yiladi. Siz faylni yuklab olgach, o'zingiz hashini hisoblab, e'lon qilingani bilan solishtirasiz:" },
        { ul: [
          "Hashlar <strong>mos kelsa</strong> — fayl o'zgarmagan, butunligi saqlangan;",
          "Hashlar <strong>farq qilsa</strong> — fayl o'zgartirilgan yoki buzilgan (bitta bit ham avalanche effektidan hashni butunlay o'zgartiradi)."
        ] },
        { code: [
          "// Checksum g'oyasi: faylni yuklab, hashini solishtirish (DEMO).",
          "const crypto = require('crypto');",
          "",
          "function checksum(mazmun) {",
          "  return crypto.createHash('sha256').update(mazmun).digest('hex');",
          "}",
          "",
          "// nashr etuvchi tomon e'lon qilgan hash",
          "const eelonQilingan = checksum('dastur-v1.0');",
          "",
          "// 1-holat: fayl o'zgarmagan -> hashlar mos keladi",
          "const yuklangan1 = 'dastur-v1.0';",
          "console.log('O\\'zgarmagan:', checksum(yuklangan1) === eelonQilingan);",
          "",
          "// 2-holat: fayl o'zgartirilgan -> hashlar farq qiladi",
          "const yuklangan2 = 'dastur-v1.0-VIRUS';",
          "console.log('Buzilgan:', checksum(yuklangan2) === eelonQilingan);"
        ].join("\n") },
        { warn: "Checksum faqat <em>tasodifiy</em> buzilishni yaxshi aniqlaydi. Lekin agar hujumchi faylni ham, e'lon qilingan hashni ham o'zgartira olsa, oddiy checksum yordam bermaydi. Aynan shu yerda <strong>raqamli imzo</strong> kerak bo'ladi." },

        { h2: "Raqamli imzo g'oyasi" },
        { p: "<strong>Raqamli imzo</strong> — bu asimmetrik kriptografiyaning nafis qo'llanilishi. Eslang, shifrlashda ochiq kalit bilan shifrlab, maxfiy kalit bilan ochardik. Imzolashda esa <em>teskari</em> ishlatiladi:" },
        { ul: [
          "<strong>Imzolash:</strong> yuboruvchi ma'lumotni o'z <em>maxfiy</em> kaliti bilan imzolaydi;",
          "<strong>Tekshirish:</strong> har kim yuboruvchining <em>ochiq</em> kaliti bilan imzoni tekshira oladi."
        ] },
        { p: "Faqat maxfiy kalit egasi to'g'ri imzo yarata oladi, lekin uni <em>hamma</em> ochiq kalit bilan tekshira oladi. Bu \"faqat men yoza olaman, lekin hamma o'qiy va tasdiqlay oladi\" degani." },

        { h2: "Imzo qanday hosil bo'ladi" },
        { p: "Amalda butun ma'lumotni imzolash sekin bo'lgani uchun, jarayon hash bilan birlashtiriladi:" },
        { ol: [
          "Yuboruvchi ma'lumotning <strong>hashini</strong> hisoblaydi;",
          "Shu hashni o'z <strong>maxfiy kaliti</strong> bilan shifrlab, <em>imzoni</em> hosil qiladi;",
          "Ma'lumot va imzo birga yuboriladi;",
          "Qabul qiluvchi ma'lumotning hashini o'zi hisoblaydi;",
          "Imzoni yuboruvchining <strong>ochiq kaliti</strong> bilan ochib, undagi hashni oladi;",
          "Ikki hashni solishtiradi — mos kelsa, imzo haqiqiy va ma'lumot o'zgarmagan."
        ] },
        { note: "Agar ma'lumot yo'lda bir bit ham o'zgartirilsa, qabul qiluvchi hisoblagan hash imzodagi hashga mos kelmaydi — imzo darhol yaroqsiz bo'ladi. Hujumchi to'g'ri imzo yarata olmaydi, chunki maxfiy kalit unda yo'q." },

        { h2: "Raqamli imzo nima beradi" },
        { p: "Raqamli imzo bir vaqtning o'zida uch narsani kafolatlaydi:" },
        { ul: [
          "<strong>Autentifikatsiya:</strong> ma'lumot haqiqatan ham maxfiy kalit egasidan kelgan;",
          "<strong>Butunlik:</strong> ma'lumot yuborilgandan beri o'zgartirilmagan;",
          "<strong>Rad eta olmaslik (non-repudiation):</strong> yuboruvchi \"men bu ma'lumotni yubormaganman\" deb tona olmaydi — chunki imzo faqat uning maxfiy kaliti bilan yaratilishi mumkin edi."
        ] },
        { p: "Bu shifrlashdan farqli maqsad. Shifrlash <em>maxfiylikni</em> beradi (kim o'qiy oladi), raqamli imzo esa <em>autentiklik va butunlikni</em> beradi (kim yozgan va o'zgarmaganmi). Ular ko'pincha birga ishlatiladi." },

        { h2: "Qo'llanishlar" },
        { p: "Raqamli imzolar zamonaviy texnologiyaning ko'p joyida uchraydi:" },
        { ul: [
          "<strong>Dastur imzolash (code signing):</strong> operatsion tizim faqat ishonchli ishlab chiquvchi imzolagan dasturlarni ishga tushiradi;",
          "<strong>Dastur yangilanishlari:</strong> qurilma yangilanish haqiqatan ishlab chiqaruvchidan kelganini imzo orqali tekshiradi;",
          "<strong>TLS sertifikatlari:</strong> CA sertifikatni o'z maxfiy kaliti bilan imzolaydi (o'tgan dars);",
          "<strong>JWT (JSON Web Token):</strong> token imzosi uning serverdan kelgani va o'zgartirilmaganini isbotlaydi;",
          "<strong>Git commit'lari va paketlar:</strong> mualliflikni tasdiqlash uchun imzolanadi."
        ] },
        { note: "<strong>JWT imzosi</strong> aynan shu prinsipda ishlaydi: server token mazmunini o'z kaliti bilan imzolaydi. Foydalanuvchi token mazmunini o'zgartira olmaydi (masalan, o'zini admin qilib) — chunki u to'g'ri imzoni qayta yarata olmaydi. Server har so'rovda imzoni tekshiradi." },

        { h2: "Amaliy eslatma" },
        { p: "Node.js'da raqamli imzolar o'rnatilgan <code>crypto</code> moduli orqali ishlatiladi (<code>crypto.sign</code> va <code>crypto.verify</code>). JWT uchun esa <code>jsonwebtoken</code> kabi sinovdan o'tgan kutubxonalar bor. Bu yerda ham asosiy qoida amal qiladi:" },
        { warn: "Imzolash algoritmini o'zingiz yozmang. O'rnatilgan <code>crypto</code> modulidan yoki tekshirilgan kutubxonalardan foydalaning. Kalitlarni himoyalang — maxfiy kalit sizib ketsa, hujumchi sizning nomingizdan imzo qo'ya oladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Butunlik</strong> — ma'lumot o'zgarmagani kafolati; shifrlashdan alohida muammo;",
          "<strong>Checksum</strong> (hash) tasodifiy buzilishni aniqlaydi, lekin ataylab qilingan almashtirishdan himoya qilmaydi;",
          "<strong>Raqamli imzo</strong>: maxfiy kalit bilan imzolanadi, ochiq kalit bilan tekshiriladi — shifrlashning teskarisi;",
          "Imzo uch narsani beradi: <strong>autentifikatsiya</strong>, <strong>butunlik</strong> va <strong>rad eta olmaslik</strong>;",
          "Qo'llanishlar: dastur imzolash, yangilanishlar, TLS sertifikatlari, <strong>JWT imzosi</strong>, Git;",
          "Imzo algoritmini o'zingiz yozmang — <code>crypto</code> moduli yoki ishonchli kutubxonadan foydalaning."
        ] }
      ]
    },

    {
      slug: "ikki-faktor-mfa",
      title: "2FA, MFA va zamonaviy autentifikatsiya",
      blurb: "Nega parol yetarli emas; autentifikatsiya omillari (bilaman/bor/o'zimman); 2FA va MFA turlari (SMS, TOTP, apparat kalit/FIDO2, biometrika); TOTP qanday ishlaydi; passkey va parolsiz kelajak.",
      body: [
        { lead: "Parol qanchalik kuchli bo'lmasin, u yolg'iz o'zi ko'pincha yetarli emas. Fishing, ma'lumot sizishi, qayta ishlatilgan parollar — bularning barchasi bitta parolga tayanishni xavfli qiladi. Ushbu darsda nega parol yetarli emasligini, autentifikatsiya omillarini va 2FA/MFA, TOTP hamda passkey kabi zamonaviy yechimlarni o'rganamiz." },

        { h2: "Nega parol yetarli emas?" },
        { p: "Parol — bu \"biror narsani bilish\"ga asoslangan yagona to'siq. Uning zaif tomonlari:" },
        { ul: [
          "<strong>Fishing:</strong> soxta sahifa foydalanuvchini aldab parolini o'g'irlaydi;",
          "<strong>Ma'lumot sizishi:</strong> boshqa saytdan sizgan parolni odamlar ko'p joyda takrorlagani uchun ishlaydi;",
          "<strong>Zaif parollar:</strong> ko'p odamlar oson topiladigan parol tanlaydi;",
          "<strong>Sizish sezilmaydi:</strong> parol o'g'irlansa ham, egasi buni bilmasligi mumkin."
        ] },
        { p: "Yechim — bitta emas, <em>bir nechta mustaqil</em> to'siqni birlashtirish. Agar bittasi buzilsa, qolganlari himoyani ushlab turadi. Bu — <strong>ko'p faktorli autentifikatsiya</strong> g'oyasi." },

        { h2: "Autentifikatsiya omillari" },
        { p: "Autentifikatsiya omillari uch asosiy turga bo'linadi:" },
        { ul: [
          "<strong>Bilaman (something you know):</strong> parol, PIN-kod, maxfiy savol;",
          "<strong>Bor (something you have):</strong> telefon, apparat kalit, smart-karta;",
          "<strong>O'zimman (something you are):</strong> barmoq izi, yuz, ovoz — biometrika."
        ] },
        { p: "<strong>Ikki faktorli autentifikatsiya (2FA)</strong> — bu <em>ikki xil turdagi</em> omilni birlashtirish. Masalan, parol (bilaman) + telefondagi kod (bor). <strong>MFA</strong> (ko'p faktorli) — ikki yoki undan ortiq omil." },
        { note: "Muhim nozik jihat: ikkita <em>bir xil turdagi</em> narsa — masalan parol va maxfiy savol — bu haqiqiy 2FA emas, chunki ikkalasi ham \"bilaman\" toifasida. Haqiqiy 2FA <em>turlicha</em> omillarni talab qiladi." },

        { h2: "2FA/MFA turlari" },
        { p: "Ikkinchi omilni yetkazishning bir necha usuli bor, lekin ular <em>xavfsizlik darajasi bilan farq qiladi</em>:" },
        { h3: "SMS orqali kod — zaif" },
        { p: "Telefon raqamiga SMS kodi yuboriladi. Bu hech qanday 2FA'dan yaxshiroq, lekin eng zaif variant: SIM-karta o'g'irlash (SIM-swap) hujumlari va SMS'ni ushlab olish mumkin. Iloji bo'lsa, SMS'dan yaxshiroq usulga o'ting." },
        { h3: "TOTP ilovasi — yaxshi" },
        { p: "Google Authenticator, Authy kabi ilovalar har 30 soniyada yangilanadigan kod ko'rsatadi. Kodlar telefonda mahalliy hosil bo'ladi — internet yoki SMS shart emas, ushlab olish qiyin. Bu ko'pchilik uchun yaxshi tanlov." },
        { h3: "Apparat kalit (FIDO2) — eng kuchli" },
        { p: "YubiKey kabi jismoniy kalitlar (FIDO2/WebAuthn standarti) eng kuchli himoya beradi. Ular fishing'ga <em>chidamli</em>: kalit qaysi saytga ulanayotganini tekshiradi, shuning uchun soxta sahifa ishlamaydi." },
        { h3: "Biometrika" },
        { p: "Barmoq izi yoki yuz — qulay, lekin odatda qurilmani ochish uchun ishlatiladi. Biometrik ma'lumotni o'zgartirib bo'lmaydi (parolni almashtirasiz, lekin barmog'ingizni yo'q), shuning uchun u ko'pincha boshqa omillar bilan birga ishlatiladi." },

        { h2: "TOTP qanday ishlaydi" },
        { p: "<strong>TOTP</strong> (Time-based One-Time Password) juda nafis g'oyaga asoslanadi. Sozlashda server va sizning ilovangiz <em>bitta umumiy sirni</em> (secret) baham ko'radi (odatda QR-kod orqali). Keyin kod ikki narsadan hosil bo'ladi:" },
        { ul: [
          "<strong>Umumiy sir</strong> — faqat siz va serverda bor;",
          "<strong>Joriy vaqt</strong> — odatda 30 soniyalik oynalarga bo'linadi."
        ] },
        { p: "Sir va vaqt hash orqali qo'shilib, qisqa raqamli kod hosil qilinadi. Server ham o'zida <em>xuddi shu hisobni</em> bajaradi. Ikkalasi bir xil sir va bir xil vaqtga ega bo'lgani uchun bir xil kod chiqadi — internetda hech narsa almashmasdan! Vaqt o'tgani sari kod avtomatik o'zgaradi." },
        { code: [
          "// TOTP g'oyasini ko'rsatuvchi SODDA DEMO (o'quv maqsadida).",
          "// Real TOTP standarti (RFC 6238) murakkabroq — kutubxona ishlating!",
          "const crypto = require('crypto');",
          "",
          "// server va ilova baham ko'rgan umumiy sir",
          "const umumiySir = 'FOYDALANUVCHI_SIRI_123';",
          "",
          "function totpKod(sir, vaqt) {",
          "  // vaqtni 30 soniyalik oynaga bo'lamiz",
          "  const oyna = Math.floor(vaqt / 30);",
          "  const hash = crypto.createHash('sha256')",
          "    .update(sir + oyna)",
          "    .digest('hex');",
          "  // hashdan 6 xonali kod ajratamiz",
          "  const raqam = parseInt(hash.slice(0, 6), 16) % 1000000;",
          "  return String(raqam).padStart(6, '0');",
          "}",
          "",
          "const hozir = 1000; // soniyalarda (demo uchun soddalashtirilgan)",
          "// ilova va server AYNI sir + AYNI vaqtdan bir xil kod oladi",
          "console.log('Ilova kodi: ', totpKod(umumiySir, hozir));",
          "console.log('Server kodi:', totpKod(umumiySir, hozir));",
          "",
          "// vaqt o'tgach (boshqa oyna) -> kod o'zgaradi",
          "console.log('30s keyin: ', totpKod(umumiySir, hozir + 30));"
        ].join("\n") },
        { warn: "Bu demo faqat g'oyani ko'rsatadi. Real TOTP (RFC 6238) HMAC-SHA1, aniq bayt kodlash va vaqt oynasi bardoshini ishlatadi. O'zingiz yozmang — <code>otplib</code> kabi sinovdan o'tgan kutubxonadan foydalaning." },

        { h2: "Passkey va parolsiz kelajak" },
        { p: "Sohaning yo'nalishi — <strong>parollardan butunlay voz kechish</strong>. <strong>Passkey</strong>lar (FIDO2/WebAuthn asosidagi) shu yo'ldagi katta qadam. Ular asimmetrik kriptografiyaga tayanadi:" },
        { ul: [
          "Qurilmangizda maxfiy kalit yaratiladi va saqlanadi (ko'pincha xavfsiz apparat ichida);",
          "Sayt faqat sizning ochiq kalitingizni saqlaydi — sizadigan \"parol\" umuman yo'q;",
          "Kirish qurilmani ochish (barmoq izi, yuz, PIN) bilan tasdiqlanadi;",
          "Fishing'ga chidamli — passkey faqat to'g'ri domen bilan ishlaydi."
        ] },
        { p: "Passkey'da eslab qoladigan parol yo'q, sizadigan sir yo'q, fishing qilinadigan narsa yo'q. Shuning uchun ular kelajakning asosiy autentifikatsiya usuli bo'lib bormoqda." },

        { h2: "Amaliy maslahatlar" },
        { p: "<strong>Foydalanuvchi sifatida:</strong>" },
        { ul: [
          "Muhim akkauntlarga (email, bank, ish) 2FA'ni albatta yoqing;",
          "Iloji bo'lsa SMS o'rniga TOTP ilovasi yoki apparat kalit tanlang;",
          "Parol menejeridan foydalaning — har sayt uchun noyob, kuchli parol;",
          "Zaxira kodlarini xavfsiz joyda saqlang."
        ] },
        { p: "<strong>Dasturchi sifatida:</strong>" },
        { ul: [
          "2FA'ni imkoniyat sifatida taklif qiling, muhim tizimlarda majburiy qiling;",
          "TOTP va WebAuthn uchun sinovdan o'tgan kutubxonalardan foydalaning;",
          "Zaxira/tiklash kodlarini xavfsiz (hashlab) saqlang;",
          "Kirish urinishlarini cheklang (rate limiting) va shubhali kirishlarni loglang."
        ] },
        { tip: "Amaliy maslahat: eng muhim akkauntlaringizga — birinchi navbatda asosiy email va bank — <strong>TOTP ilovasi yoki apparat kalit</strong> yoqing. Email ko'pincha boshqa hammasini tiklash kaliti bo'lgani uchun, uni himoyalash birinchi darajali." },

        { h2: "Xulosa" },
        { ul: [
          "Parol yolg'iz o'zi yetarli emas: fishing, sizish, qayta ishlatish uni zaif qiladi;",
          "Autentifikatsiya omillari: <strong>bilaman</strong> (parol), <strong>bor</strong> (telefon/kalit), <strong>o'zimman</strong> (biometrika);",
          "<strong>2FA/MFA</strong> — turlicha omillarni birlashtiradi; bitta buzilsa, qolgani ushlab turadi;",
          "Turlar xavfsizlik bo'yicha: SMS (zaif) &lt; TOTP ilovasi (yaxshi) &lt; apparat kalit/FIDO2 (eng kuchli);",
          "<strong>TOTP</strong> umumiy sir va joriy vaqtdan mahalliy kod hosil qiladi — internetda hech narsa almashmaydi;",
          "<strong>Passkey</strong>lar parolsiz, fishing'ga chidamli kelajak; muhim akkauntlarga TOTP yoki apparat kalit yoqing."
        ] }
      ]
    }
  ]
};
