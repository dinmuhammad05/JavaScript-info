"use strict";

module.exports = {
  part: "5-qism: Backend dasturlash",
  chapter: "Web xavfsizligi va autentifikatsiya",
  lessons: [
    {
      slug: "web-xavfsizlik",
      title: "Web xavfsizligi asoslari",
      blurb: "Nega xavfsizlik muhim, CIA triadasi, \"foydalanuvchiga hech qachon ishonma\" tamoyili, HTTPS va OWASP asosidagi umumiy tahdidlar ro'yxati.",
      body: [
        { lead: "Web ilova tarmoqqa ochilgan zahoti u nafaqat foydalanuvchilarga, balki niyati buzuq kishilarga ham ochiladi. Xavfsizlik — bu \"keyin qo'shiladigan\" xususiyat emas, balki ilovani loyihalashning ajralmas qismidir. Ushbu darsda biz xavfsizlik nima uchun muhimligini, uni baholashning asosiy ramkasini (CIA triadasi) va zamonaviy web ilovalarga tahdid soladigan asosiy zaifliklarni <strong>faqat himoya nuqtai nazaridan</strong> o'rganamiz." },

        { note: "Ushbu bob to'liq ta'lim maqsadida yozilgan. Maqsad — sizni <strong>himoyachi</strong> dasturchi qilib tayyorlash: zaiflik qanday paydo bo'lishini tushunib, undan qanday himoyalanishni bilishingiz uchun. Hech qanday hujum qilish yo'riqnomasi berilmaydi." },

        { h2: "Nega xavfsizlik muhim?" },
        { p: "Har qanday jiddiy web ilova foydalanuvchilarning ma'lumotlari bilan ishlaydi: parollar, email manzillari, to'lov kartalari, shaxsiy yozishmalar. Bir marta yo'l qo'yilgan xatolik minglab foydalanuvchining ma'lumotini xavf ostiga qo'yishi mumkin." },
        { ul: [
          "<strong>Foydalanuvchilarga zarar:</strong> o'g'irlangan parollar, moliyaviy yo'qotishlar, shaxsiy ma'lumotning ochilishi;",
          "<strong>Biznesga zarar:</strong> obro'ning yo'qolishi, jarimalar (masalan, GDPR kabi qonunlar buzilganda), mijozlarning ketishi;",
          "<strong>Texnik zarar:</strong> serverning ishdan chiqishi, ma'lumotlar bazasining buzilishi, xizmatning to'xtashi."
        ] },
        { p: "Muhim tushuncha: xavfsizlikda <strong>hujumchi doim bitta zaiflikni topsa yetadi</strong>, himoyachi esa <em>barcha</em> zaifliklarni yopishi kerak. Shu sabab xavfsizlik ustma-ust qatlamlardan iborat bo'lishi lozim — buni <strong>chuqurlashtirilgan himoya</strong> (defense in depth) deyiladi." },

        { h2: "CIA triadasi" },
        { p: "Axborot xavfsizligining klassik uchligi — bu <strong>CIA triadasi</strong>. Bu Markaziy Razvedka Boshqarmasi emas, balki uchta tamoyilning inglizcha bosh harflari:" },
        { h3: "1. Maxfiylik (Confidentiality)" },
        { p: "Ma'lumotni faqat unga huquqi bor kishilar ko'ra olishi kerak. Foydalanuvchining paroli, xabarlari, kartasi begonaga ko'rinmasligi shart. Maxfiylikni ta'minlash vositalari: shifrlash (HTTPS, ma'lumotni bazada shifrlash), to'g'ri avtorizatsiya, ma'lumotga kirishni cheklash." },
        { h3: "2. Butunlik (Integrity)" },
        { p: "Ma'lumot ruxsatsiz o'zgartirilmasligi kerak. Masalan, foydalanuvchi bankdagi balansini o'zboshimchalik bilan o'zgartira olmasligi lozim. Butunlikni himoya qiluvchi vositalar: raqamli imzolar, hash-tekshirishlar, server tomonida qat'iy tekshiruvlar." },
        { h3: "3. Mavjudlik (Availability)" },
        { p: "Xizmat unga muhtoj bo'lgan foydalanuvchilar uchun ishlab turishi kerak. Server yuklama hujumlari (masalan, xizmatni rad etish hujumlari) tufayli ishdan chiqmasligi lozim. Vositalar: yuklama muvozanati, so'rov chastotasini cheklash (rate limiting), zaxira nusxalar." },
        { note: "Har qanday xavfsizlik qarorini qabul qilayotganda o'zingizga savol bering: \"Bu qaror maxfiylik, butunlik va mavjudlikning qaysi biriga xizmat qiladi?\" Bu uch tamoyil sizga tizimli fikrlash ramkasini beradi." },

        { h2: "Asosiy tamoyil: foydalanuvchiga hech qachon ishonmang" },
        { p: "Web xavfsizligining eng muhim aqli — <strong>\"Never trust user input\"</strong> (foydalanuvchi kiritmasiga hech qachon ishonmang). Brauzerdan, mobil ilovadan yoki boshqa mijozdan kelgan <em>har qanday</em> ma'lumot potensial ravishda soxta yoki zararli bo'lishi mumkin." },
        { p: "Mijoz tomonidagi kod (JavaScript, HTML forma) foydalanuvchi to'liq nazorat qiladigan muhitda ishlaydi. Foydalanuvchi brauzer developer vositalarini ochib, so'rovni istagancha o'zgartirishi mumkin. Shuning uchun:" },
        { ul: [
          "Mijoz tomonidagi validatsiya — bu faqat <em>qulaylik</em> (foydalanuvchiga tez javob berish uchun), xavfsizlik emas;",
          "Haqiqiy tekshiruv <strong>doim server tomonida</strong> takrorlanishi shart;",
          "Foydalanuvchi \"faqat men ko'ra olaman\" deb o'ylagan har qanday cheklovni server qayta tekshirishi kerak."
        ] },
        { code: "// YOMON: faqat mijoz tomonida tekshiruv\n// Frontend'da narxni hisoblab, serverga jo'natish\nfetch('/api/buyurtma', {\n  method: 'POST',\n  body: JSON.stringify({ mahsulotId: 42, narx: 1 }) // foydalanuvchi narxni o'zgartirdi!\n});\n\n// Bunday holatda foydalanuvchi 'narx' ni o'zi belgilashi mumkin.\n// Server unga ishonib qolsa — pul yo'qotiladi." },
        { code: "// YAXSHI: server narxni O'ZI ma'lumotlar bazasidan oladi\napp.post('/api/buyurtma', async (req, res) => {\n  const { mahsulotId } = req.body;\n\n  // Narxni mijozdan EMAS, bazadan olamiz\n  const mahsulot = await db.mahsulotTop(mahsulotId);\n  if (!mahsulot) {\n    return res.status(404).json({ xato: 'Mahsulot topilmadi' });\n  }\n\n  const haqiqiyNarx = mahsulot.narx; // ishonchli manba\n  // ... buyurtmani haqiqiyNarx bilan yaratamiz\n});" },
        { warn: "Mijozdan kelgan hech qanday narxni, huquqni, foydalanuvchi identifikatorini ko'r-ko'rona qabul qilmang. Har doim server tomonidagi ishonchli manbadan (ma'lumotlar bazasi, sessiya) qayta tasdiqlang." },

        { h2: "HTTPS — tarmoq qatlamidagi himoya" },
        { p: "<strong>HTTP</strong> protokoli ma'lumotni ochiq matnda uzatadi. Ya'ni foydalanuvchi va server orasidagi yo'lda (masalan, umumiy Wi-Fi tarmog'ida) o'tirgan har kim parol va ma'lumotni ko'ra oladi. <strong>HTTPS</strong> esa TLS shifrlashi orqali bu ma'lumotni himoyalaydi." },
        { ul: [
          "<strong>Shifrlash:</strong> yo'ldagi ma'lumot o'qib bo'lmaydigan holatga keltiriladi (maxfiylik);",
          "<strong>Butunlik:</strong> ma'lumot yo'lda o'zgartirilsa, buni aniqlash mumkin;",
          "<strong>Autentifikatsiya:</strong> sertifikat orqali siz haqiqatan ham to'g'ri serverga ulanayotganingizga ishonch hosil qilasiz."
        ] },
        { p: "Zamonaviy web ilovada HTTPS majburiy. Bepul sertifikatlar (masalan, Let's Encrypt) mavjud. Express ilovasida foydalanuvchilarni HTTPS'ga yo'naltirish va xavfsizlik sarlavhalarini qo'shish odat tusiga kirgan:" },
        { code: "const express = require('express');\nconst helmet = require('helmet');\nconst app = express();\n\n// helmet xavfsizlik bilan bog'liq HTTP sarlavhalarini o'rnatadi\napp.use(helmet());\n\n// HTTP so'rovlarni HTTPS'ga yo'naltirish (proxy orqasida)\napp.use((req, res, next) => {\n  if (req.headers['x-forwarded-proto'] === 'http') {\n    return res.redirect('https://' + req.headers.host + req.url);\n  }\n  next();\n});" },
        { tip: "<code>helmet</code> — bu Express uchun mashhur kutubxona bo'lib, u xavfsizlik bilan bog'liq bir qancha HTTP sarlavhalarini (masalan, <code>X-Content-Type-Options</code>, <code>Strict-Transport-Security</code>) avtomatik o'rnatadi. Uni ishlatish — arzon va samarali himoya qadamidir." },

        { h2: "Umumiy tahdidlar: OWASP qisqacha" },
        { p: "<strong>OWASP</strong> (Open Worldwide Application Security Project) — web xavfsizligi bo'yicha nufuzli notijorat tashkilot. Ular muntazam ravishda eng xavfli zaifliklar ro'yxatini (<strong>OWASP Top 10</strong>) chiqaradi. Quyida ushbu ro'yxatning asosiy qismlari va ular qaysi darsda o'rganilishi:" },
        { ul: [
          "<strong>Buzilgan kirish nazorati (Broken Access Control):</strong> foydalanuvchi o'ziga tegishli bo'lmagan ma'lumotga kira oladi — avtorizatsiya darsida;",
          "<strong>Kriptografik xatolar:</strong> parolni ochiq saqlash, zaif shifrlash — autentifikatsiya darsida;",
          "<strong>Injection (kiritish hujumlari):</strong> SQL injection, buyruq kiritish — alohida darsda;",
          "<strong>Xavfsiz bo'lmagan dizayn:</strong> arxitektura darajasidagi kamchiliklar;",
          "<strong>Noto'g'ri konfiguratsiya:</strong> ochiq qoldirilgan sozlamalar, standart parollar;",
          "<strong>XSS (Cross-Site Scripting):</strong> zararli skript kiritish — alohida darsda;",
          "<strong>Autentifikatsiya buzilishi:</strong> zaif sessiya boshqaruvi, brute-force himoyasining yo'qligi;",
          "<strong>Ma'lumot butunligining buzilishi:</strong> ishonchsiz manbalardan yangilanishlar."
        ] },
        { note: "OWASP Top 10 — bu qat'iy imtihon ro'yxati emas, balki e'tibor qaratish uchun ustuvorlik ro'yxati. Amaliyotda bularning ko'pchiligi bitta oddiy tamoyilga bog'lanadi: kiritmaga ishonmaslik va har qatlamda tekshirish." },

        { h2: "Xavfsizlik — jarayon, bir martalik ish emas" },
        { p: "Xavfsizlikni bir marta \"qilib qo'yib\" bo'lmaydi. Bu doimiy jarayon:" },
        { ul: [
          "<strong>Bog'liqliklarni yangilab turing:</strong> <code>npm audit</code> orqali zaif paketlarni tekshiring;",
          "<strong>Eng kam imtiyoz tamoyili:</strong> har bir komponent faqat zarur bo'lgan huquqqa ega bo'lsin;",
          "<strong>Loglar va monitoring:</strong> shubhali harakatlarni kuzatib boring;",
          "<strong>Xatoni tan olish:</strong> mukammal xavfsiz tizim yo'q; muammoni tez aniqlab, tuzatish qobiliyati muhim."
        ] },
        { code: "// Loyihadagi zaif bog'liqliklarni tekshirish\n// $ npm audit\n//\n// Avtomatik tuzatishga urinish (ehtiyotkorlik bilan)\n// $ npm audit fix\n//\n// Bu buyruqlar ma'lum zaifliklarga ega paketlar haqida\n// ogohlantiradi va yangilash yo'llarini taklif qiladi." },

        { h2: "Xulosa" },
        { ul: [
          "Xavfsizlik loyihaning ajralmas qismi bo'lishi kerak, keyin qo'shiladigan xususiyat emas;",
          "<strong>CIA triadasi</strong> (maxfiylik, butunlik, mavjudlik) xavfsizlikni baholash ramkasidir;",
          "Eng muhim tamoyil — <strong>foydalanuvchi kiritmasiga hech qachon ishonmaslik</strong>; haqiqiy tekshiruv doim server tomonida bo'ladi;",
          "<strong>HTTPS</strong> tarmoq qatlamida maxfiylik va butunlikni ta'minlaydi — u majburiy;",
          "<strong>OWASP Top 10</strong> eng keng tarqalgan zaifliklarga e'tibor qaratishga yordam beradi;",
          "Xavfsizlik — bu chuqurlashtirilgan himoya (defense in depth): ustma-ust qatlamlar."
        ] }
      ]
    },

    {
      slug: "auth-asoslar",
      title: "Autentifikatsiya va avtorizatsiya",
      blurb: "Autentifikatsiya va avtorizatsiya farqi, parolni hech qachon ochiq saqlamaslik, bcrypt bilan hashlash va salt, sessiya (cookie) va token yondashuvlari, xavfsiz cookie.",
      body: [
        { lead: "Deyarli har bir ilova foydalanuvchini taniydi (autentifikatsiya) va unga nima qilishga ruxsat berilganini hal qiladi (avtorizatsiya). Ushbu darsda biz bu ikki tushunchani ajratamiz, parollarni xavfsiz saqlashni (hashlash va salt), hamda foydalanuvchi holatini saqlashning ikki asosiy usulini — sessiya va tokenlarni — ko'rib chiqamiz." },

        { h2: "Autentifikatsiya va avtorizatsiya farqi" },
        { p: "Bu ikki so'z ko'pincha aralashtiriladi, lekin ular butunlay boshqa narsani anglatadi:" },
        { ul: [
          "<strong>Autentifikatsiya (Authentication)</strong> — \"Sen kimsan?\" degan savolga javob. Foydalanuvchining shaxsini tasdiqlash (login va parol, tokendan orqali);",
          "<strong>Avtorizatsiya (Authorization)</strong> — \"Senga nima qilishga ruxsat bor?\" degan savolga javob. Tasdiqlangan foydalanuvchining huquqlarini tekshirish."
        ] },
        { p: "Oddiy misol: mehmonxonaga kirganingizda pasportingizni ko'rsatasiz — bu <em>autentifikatsiya</em>. Sizga berilgan kalit faqat o'z xonangizni ochadi, boshqa xonalarni emas — bu <em>avtorizatsiya</em>." },
        { code: "// Autentifikatsiya: foydalanuvchi kimligini aniqlaymiz\nfunction authMiddleware(req, res, next) {\n  const foydalanuvchi = tokendanFoydalanuvchiOl(req);\n  if (!foydalanuvchi) {\n    return res.status(401).json({ xato: 'Tizimga kiring' }); // 401 = kim ekaning noma'lum\n  }\n  req.foydalanuvchi = foydalanuvchi;\n  next();\n}\n\n// Avtorizatsiya: bu foydalanuvchiga ruxsat bormi?\nfunction faqatAdmin(req, res, next) {\n  if (req.foydalanuvchi.rol !== 'admin') {\n    return res.status(403).json({ xato: 'Ruxsat yo\\'q' }); // 403 = kimligi ma'lum, lekin ruxsat yo'q\n  }\n  next();\n}" },
        { note: "HTTP status kodlarini eslab qoling: <strong>401 Unauthorized</strong> — \"kimligingiz noma'lum, tizimga kiring\" (aslida autentifikatsiya haqida); <strong>403 Forbidden</strong> — \"kimligingiz ma'lum, lekin bu amalga ruxsatingiz yo'q\" (avtorizatsiya haqida)." },

        { h2: "Parolni HECH QACHON ochiq saqlamang" },
        { p: "Bu — autentifikatsiyadagi eng muhim qoida. Parolni ma'lumotlar bazasida <strong>o'qish mumkin bo'lgan holatda</strong> saqlash — jiddiy xato. Agar bazangiz o'g'irlansa (bu tez-tez sodir bo'ladi), barcha foydalanuvchilar parollari ochiladi. Bundan ham yomoni: odamlar ko'pincha bir parolni bir necha saytda ishlatadi." },
        { warn: "Parolni hech qachon <strong>ochiq matnda</strong> saqlamang. Uni <strong>oddiy shifrlash</strong> bilan ham saqlamang (shifrni ochish mumkin). To'g'ri yechim — <strong>bir tomonlama hashlash</strong> (hashing): natijadan asl parolni tiklab bo'lmaydi." },

        { h2: "Hashlash, salt va bcrypt" },
        { p: "<strong>Hash funksiyasi</strong> — bu istalgan matndan qat'iy uzunlikdagi \"barmoq izi\" yaratadigan bir tomonlama funksiya. Asosiy g'oya: parolni saqlamaymiz, uning hashini saqlaymiz. Foydalanuvchi kirganda, kiritgan parolining hashini hisoblab, saqlangan hash bilan solishtiramiz." },
        { p: "Lekin oddiy hash (masalan, SHA-256) parollar uchun yetarli emas, chunki:" },
        { ul: [
          "Bir xil parol doim bir xil hash beradi — hujumchi oldindan tayyorlangan jadvallardan foydalanishi mumkin;",
          "Oddiy hash funksiyalari juda <em>tez</em> ishlaydi — bu parolni topishga urinishlarni osonlashtiradi."
        ] },
        { p: "Yechim ikki qismdan iborat:" },
        { ul: [
          "<strong>Salt (tuz):</strong> har bir parolga tasodifiy, noyob qiymat qo'shiladi. Shu sabab bir xil ikki parol ham turli hashga ega bo'ladi;",
          "<strong>Sekin hash algoritmi:</strong> <code>bcrypt</code>, <code>scrypt</code> yoki <code>argon2</code> ataylab sekin ishlaydi, bu topishga urinishlarni juda qimmatga tushiradi."
        ] },
        { p: "<code>bcrypt</code> — eng ko'p ishlatiladigan yechimlardan biri. U saltni avtomatik yaratadi va uni hashning ichiga joylashtiradi:" },
        { code: "const bcrypt = require('bcrypt');\n\n// Ro'yxatdan o'tishda: parolni hashlaymiz\nasync function royxatdanOtish(email, parol) {\n  const saltDarajasi = 12; // 'cost factor' — qancha katta bo'lsa, shuncha sekin (xavfsiz)\n  const hash = await bcrypt.hash(parol, saltDarajasi);\n\n  // Bazaga FAQAT hashni saqlaymiz, asl parolni EMAS\n  await db.foydalanuvchiYarat({ email, parolHash: hash });\n}" },
        { code: "// Tizimga kirishda: kiritilgan parolni saqlangan hash bilan solishtiramiz\nasync function tizimgaKirish(email, parol) {\n  const foydalanuvchi = await db.foydalanuvchiTop({ email });\n\n  // Foydalanuvchi topilmasa ham, mavhum javob beramiz (quyida tushuntiriladi)\n  if (!foydalanuvchi) {\n    return { muvaffaqiyat: false, xato: 'Email yoki parol xato' };\n  }\n\n  // bcrypt saltni hashdan o'zi ajratib oladi va solishtiradi\n  const togri = await bcrypt.compare(parol, foydalanuvchi.parolHash);\n  if (!togri) {\n    return { muvaffaqiyat: false, xato: 'Email yoki parol xato' };\n  }\n\n  return { muvaffaqiyat: true, foydalanuvchi };\n}" },
        { tip: "Diqqat qiling: xato xabari doim bir xil — \"Email yoki parol xato\". Agar \"Bunday email yo'q\" va \"Parol xato\" deb alohida javob bersangiz, bu qaysi emaillar ro'yxatdan o'tganini fosh qiladi. Bir xil, mavhum xabar berish — bu <strong>foydalanuvchi ro'yxatga olinganini fosh qilmaslik</strong> himoyasidir." },
        { note: "<code>bcrypt.compare</code> ni ishlatishga majburmiz — hashlarni <code>===</code> bilan solishtirish ishlamaydi, chunki har safar yangi salt tufayli hash boshqacha bo'ladi. <code>compare</code> saltni hashning ichidan o'qib, to'g'ri solishtiradi." },

        { h2: "Foydalanuvchi holatini saqlash: HTTP holatsiz" },
        { p: "HTTP protokoli <strong>holatsiz</strong> (stateless): har bir so'rov mustaqil, server oldingi so'rovni \"eslamaydi\". Unda foydalanuvchi bir marta login qilgach, keyingi so'rovlarda uni qanday taniymiz? Ikki asosiy yondashuv bor: <strong>sessiya (cookie)</strong> va <strong>token</strong>." },

        { h2: "1-yondashuv: Sessiya (cookie asosida)" },
        { p: "Sessiya yondashuvida holat <strong>serverda</strong> saqlanadi:" },
        { ol: [
          "Foydalanuvchi login qiladi, server uni tekshiradi;",
          "Server tasodifiy, taxmin qilib bo'lmaydigan <strong>sessiya ID</strong> yaratadi va uni o'z xotirasida (yoki Redis, bazada) foydalanuvchi bilan bog'lab saqlaydi;",
          "Sessiya ID cookie sifatida brauzerga yuboriladi;",
          "Brauzer keyingi har bir so'rovda bu cookie'ni avtomatik jo'natadi;",
          "Server cookie'dagi ID orqali foydalanuvchini topadi."
        ] },
        { code: "const session = require('express-session');\n\napp.use(session({\n  secret: process.env.SESSION_SECRET, // sirni .env dan olamiz\n  resave: false,\n  saveUninitialized: false,\n  cookie: {\n    httpOnly: true,  // JavaScript cookie'ni o'qiy olmaydi (XSS'dan himoya)\n    secure: true,    // faqat HTTPS orqali yuboriladi\n    sameSite: 'lax', // CSRF'dan himoya (keyingi darsda)\n    maxAge: 1000 * 60 * 60 // 1 soat\n  }\n}));" },
        { p: "<strong>Afzalligi:</strong> server sessiyani istagan vaqtda bekor qila oladi (masalan, \"barcha qurilmalardan chiqish\"). <strong>Kamchiligi:</strong> server har bir sessiyani xotirada saqlashi kerak, bu ko'p serverli tizimlarda qo'shimcha muvofiqlashtirishni talab qiladi." },

        { h2: "2-yondashuv: Token (masalan JWT)" },
        { p: "Token yondashuvida holat <strong>mijozda</strong> saqlanadi. Server imzolangan token beradi, mijoz uni har so'rovda qaytaradi, server esa imzoni tekshirib, tokenga ishonadi (bazaga qaramasdan). JWT — keyingi darsning to'liq mavzusi." },
        { ul: [
          "<strong>Afzalligi:</strong> server holatni saqlamaydi (stateless), bu masshtablashni osonlashtiradi;",
          "<strong>Kamchiligi:</strong> tokenni muddatidan oldin bekor qilish qiyinroq (server holatni saqlamaydi)."
        ] },
        { note: "Qaysi biri to'g'ri? Bu bahsli mavzu. An'anaviy server-render qilingan veb-saytlar uchun sessiya-cookie ko'pincha soddaroq va xavfsizroq. Turli mijozlar (mobil ilova + web) xizmat qiladigan API uchun tokenlar qulayroq. Ikkalasini ham to'g'ri sozlash mumkin." },

        { h2: "Xavfsiz cookie: HttpOnly, Secure, SameSite" },
        { p: "Agar cookie ishlatsangiz (sessiya yoki tokenni cookie'da saqlash), uni to'g'ri sozlash muhim. Uch asosiy atribut:" },
        { h3: "HttpOnly" },
        { p: "<code>HttpOnly</code> belgilangan cookie'ni <strong>JavaScript o'qiy olmaydi</strong> (<code>document.cookie</code> orqali ko'rinmaydi). Bu XSS hujumida cookie o'g'irlanishining oldini oladi: hattoki sahifaga zararli skript kirsa ham, u sessiya cookie'ni o'qiy olmaydi." },
        { h3: "Secure" },
        { p: "<code>Secure</code> belgilangan cookie faqat <strong>HTTPS</strong> orqali yuboriladi. Bu cookie'ning shifrlanmagan tarmoqda ochiq holda o'tishining oldini oladi." },
        { h3: "SameSite" },
        { p: "<code>SameSite</code> cookie'ning boshqa saytlardan kelgan so'rovlarda yuborilishini boshqaradi. Bu <strong>CSRF hujumidan himoyaning</strong> asosiy qismidir (keyingi darsda batafsil):" },
        { ul: [
          "<code>SameSite=Strict</code> — cookie faqat o'z saytimizdan kelgan so'rovlarda yuboriladi (eng qattiq);",
          "<code>SameSite=Lax</code> — asosiy navigatsiyalarda yuboriladi, lekin ko'pchilik o'zaro-sayt so'rovlarida yuborilmaydi (yaxshi standart);",
          "<code>SameSite=None</code> — barcha holatlarda yuboriladi (faqat <code>Secure</code> bilan birga; ehtiyotkorlik talab qilinadi)."
        ] },
        { code: "// Cookie'ni to'g'ri sozlash misoli (Express)\nres.cookie('sessionId', sessionId, {\n  httpOnly: true,   // JS o'qiy olmaydi\n  secure: true,     // faqat HTTPS\n  sameSite: 'lax',  // CSRF himoyasi\n  maxAge: 3600000,  // 1 soat (millisekundda)\n  path: '/'\n});" },
        { warn: "Bu uch atribut birga ishlaganda kuchli himoya beradi, ammo hech biri o'zicha yetarli emas. <code>HttpOnly</code> XSS ta'sirini kamaytiradi, lekin XSS'ning o'zini oldini olmaydi — kirishni tozalash (keyingi dars) baribir zarur." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Autentifikatsiya</strong> — \"kimsan?\", <strong>avtorizatsiya</strong> — \"nimaga ruxsating bor?\";",
          "Parolni hech qachon ochiq yoki oddiy shifrlangan holda saqlamang — <code>bcrypt</code> kabi sekin, salt qo'shadigan algoritm bilan hashlang;",
          "Login xatosida har doim bir xil, mavhum xabar bering (foydalanuvchi mavjudligini fosh qilmaslik uchun);",
          "Holatni saqlashning ikki yo'li: server tomonidagi <strong>sessiya</strong> va mijoz tomonidagi <strong>token</strong>;",
          "Cookie ishlatsangiz, <code>HttpOnly</code>, <code>Secure</code> va <code>SameSite</code> atributlarini albatta o'rnating."
        ] }
      ]
    },

    {
      slug: "jwt",
      title: "JWT (JSON Web Token)",
      blurb: "JWT tuzilishi (header.payload.signature), imzolash va tekshirish, Express'da login → token → himoyalangan route middleware, token muddati, afzallik va kamchiliklari.",
      body: [
        { lead: "<strong>JWT</strong> (JSON Web Token) — bu ma'lumotni imzolangan, ixcham va o'zini-o'zi tavsiflaydigan token sifatida uzatish standarti. U zamonaviy API'larda autentifikatsiya uchun keng qo'llaniladi. Ushbu darsda JWT tuzilishini, uning imzo orqali qanday himoyalanishini va Express'da login'dan himoyalangan route'gacha bo'lgan to'liq oqimni ko'rib chiqamiz." },

        { h2: "JWT nima va u nimani hal qiladi?" },
        { p: "Oldingi darsda ko'rgan edik: HTTP holatsiz, shuning uchun har so'rovda foydalanuvchini qayta taniymiz. JWT bu muammoni <strong>imzolangan token</strong> orqali hal qiladi. Server login vaqtida foydalanuvchi ma'lumotini o'z ichiga olgan tokenni <em>imzolaydi</em> va mijozga beradi. Mijoz uni har so'rovda qaytaradi. Server imzoni tekshiradi — agar imzo to'g'ri bo'lsa, token ichidagi ma'lumotga ishonadi." },
        { p: "Muhim jihat: token ichidagi ma'lumot <strong>shifrlanmagan</strong>, lekin <strong>imzolangan</strong>. Ya'ni har kim token ichini o'qiy oladi, ammo <em>uni server sirini bilmasdan o'zgartira olmaydi</em> — o'zgartirilsa, imzo mos kelmaydi." },
        { warn: "JWT payload'iga <strong>maxfiy ma'lumot</strong> (parol, karta raqami) qo'ymang. Payload oddiy kodlash bilan yozilgan, shifrlanmagan — uni har kim ochib o'qiy oladi. Payload'da faqat identifikator va rol kabi maxfiy bo'lmagan ma'lumot bo'lsin." },

        { h2: "JWT tuzilishi: uch qism" },
        { p: "JWT nuqta bilan ajratilgan uchta qismdan iborat: <code>header.payload.signature</code>. Har bir qism alohida kodlangan matndir:" },
        { code: "// JWT quyidagicha ko'rinadi (uch qism nuqta bilan ajratilgan):\n// xxxxx.yyyyy.zzzzz\n//   |     |     |\n// header payload signature\n\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJyb2wiOiJ1c2VyIn0.aBcDeFg..." },
        { h3: "1. Header (sarlavha)" },
        { p: "Qanday algoritm bilan imzolanganini ko'rsatadi:" },
        { code: "{\n  \"alg\": \"HS256\",\n  \"typ\": \"JWT\"\n}" },
        { h3: "2. Payload (foydali yuk)" },
        { p: "Token ichidagi ma'lumot — \"claims\" deb ataladi. Bu foydalanuvchi identifikatori, roli va muddati kabi maydonlar:" },
        { code: "{\n  \"sub\": \"123\",        // foydalanuvchi ID (subject)\n  \"rol\": \"user\",\n  \"iat\": 1719800000,    // yaratilgan vaqt (issued at)\n  \"exp\": 1719803600     // amal qilish muddati (expiration)\n}" },
        { h3: "3. Signature (imzo)" },
        { p: "Header va payload'ni maxfiy kalit bilan birga hashlashdan hosil bo'ladi. Imzo — bu tokenning butunligini kafolatlaydigan qism. Agar biror bayt o'zgartirilsa, imzo mos kelmay qoladi:" },
        { code: "// Kontseptual tarzda imzo shunday hisoblanadi:\n// HMACSHA256(\n//   base64url(header) + '.' + base64url(payload),\n//   MAXFIY_KALIT\n// )\n//\n// MAXFIY_KALIT faqat serverda bo'ladi. Shuning uchun\n// hech kim to'g'ri imzoni server sirisiz yasay olmaydi." },
        { note: "\"Kodlash\" (base64url) — bu shifrlash EMAS. U shunchaki ma'lumotni matn ko'rinishiga o'tkazadi, uni istagan kishi qaytarib o'qiy oladi. Tokenni himoya qiladigan yagona narsa — bu <strong>imzo</strong>, chunki uni yasash uchun maxfiy kalit kerak." },

        { h2: "Express'da JWT: login → token" },
        { p: "Endi to'liq oqimni ko'ramiz. Avval foydalanuvchi login qiladi, biz parolni tekshiramiz va muvaffaqiyatli bo'lsa, imzolangan token beramiz. Bu yerda <code>jsonwebtoken</code> kutubxonasi ishlatiladi:" },
        { code: "const jwt = require('jsonwebtoken');\nconst bcrypt = require('bcrypt');\n\n// Maxfiy kalit .env faylidan olinadi, kodga yozilmaydi!\nconst JWT_SIR = process.env.JWT_SECRET;\n\napp.post('/login', async (req, res) => {\n  const { email, parol } = req.body;\n\n  const foydalanuvchi = await db.foydalanuvchiTop({ email });\n  // Bir xil mavhum xato (foydalanuvchi mavjudligini fosh qilmaslik)\n  if (!foydalanuvchi || !(await bcrypt.compare(parol, foydalanuvchi.parolHash))) {\n    return res.status(401).json({ xato: 'Email yoki parol xato' });\n  }\n\n  // Tokenni imzolaymiz. Payload'ga MAXFIY ma'lumot qo'ymaymiz.\n  const token = jwt.sign(\n    { sub: foydalanuvchi.id, rol: foydalanuvchi.rol },\n    JWT_SIR,\n    { expiresIn: '1h' } // token 1 soatdan keyin amal qilmaydi\n  );\n\n  res.json({ token });\n});" },
        { tip: "<code>expiresIn</code> ni albatta belgilang. Muddatsiz token o'g'irlansa, u abadiy yaroqli qoladi. Qisqa muddat (masalan, 15 daqiqa - 1 soat) o'g'irlangan tokenning zarar oynasini kichraytiradi." },

        { h2: "Tokenni tekshirish: himoyalangan route middleware" },
        { p: "Endi himoyalangan route'larni yaratamiz. Har bir himoyalangan so'rovda mijoz tokenni odatda <code>Authorization</code> sarlavhasida <code>Bearer</code> sxemasi bilan yuboradi. Middleware uni tekshiradi:" },
        { code: "function tokenTekshir(req, res, next) {\n  const sarlavha = req.headers['authorization'];\n\n  // 'Bearer <token>' formatidan tokenni ajratib olamiz\n  if (!sarlavha || !sarlavha.startsWith('Bearer ')) {\n    return res.status(401).json({ xato: 'Token topilmadi' });\n  }\n  const token = sarlavha.slice(7); // 'Bearer ' dan keyingi qism\n\n  try {\n    // verify imzoni VA muddatni tekshiradi. Xato bo'lsa, exception tashlaydi.\n    const payload = jwt.verify(token, JWT_SIR);\n    req.foydalanuvchi = payload; // { sub, rol, iat, exp }\n    next();\n  } catch (e) {\n    // TokenExpiredError yoki JsonWebTokenError\n    return res.status(401).json({ xato: 'Token yaroqsiz yoki muddati o\\'tgan' });\n  }\n}" },
        { code: "// Himoyalangan route: faqat yaroqli token bilan kirish mumkin\napp.get('/api/profil', tokenTekshir, async (req, res) => {\n  // req.foydalanuvchi.sub — tokendan olingan foydalanuvchi ID\n  const foydalanuvchi = await db.foydalanuvchiTopById(req.foydalanuvchi.sub);\n  res.json({ email: foydalanuvchi.email, rol: foydalanuvchi.rol });\n});\n\n// Avtorizatsiya bilan: faqat admin\nfunction faqatAdmin(req, res, next) {\n  if (req.foydalanuvchi.rol !== 'admin') {\n    return res.status(403).json({ xato: 'Ruxsat yo\\'q' });\n  }\n  next();\n}\napp.delete('/api/foydalanuvchi/:id', tokenTekshir, faqatAdmin, async (req, res) => {\n  await db.foydalanuvchiOchir(req.params.id);\n  res.json({ muvaffaqiyat: true });\n});" },
        { warn: "<code>jwt.verify</code> ni doim <code>try/catch</code> ichida chaqiring. Muddati o'tgan yoki soxta token exception tashlaydi. Agar <code>verify</code> o'rniga <code>decode</code> ishlatsangiz — bu <strong>xato</strong>: <code>decode</code> imzoni <em>tekshirmaydi</em>, shunchaki payload'ni o'qiydi. Har doim <code>verify</code> ishlating." },

        { h2: "Muddat va tokenni yangilash (refresh)" },
        { p: "Qisqa muddatli access token xavfsizroq, lekin har soatda foydalanuvchini qayta login qildirish noqulay. Amaliyotda ko'pincha ikki tokenli sxema ishlatiladi:" },
        { ul: [
          "<strong>Access token:</strong> qisqa muddatli (masalan, 15 daqiqa), har so'rovda ishlatiladi;",
          "<strong>Refresh token:</strong> uzoqroq muddatli, xavfsiz saqlanadi (masalan, <code>HttpOnly</code> cookie'da) va faqat yangi access token olish uchun ishlatiladi."
        ] },
        { p: "Access token muddati tugaganda, mijoz refresh token bilan yangi access token so'raydi. Refresh tokenni serverda kuzatib borish uni bekor qilish (masalan, chiqishda) imkonini beradi." },
        { note: "Bu bilan JWT'ning \"holatsizlik\" afzalligining bir qismidan voz kechamiz (refresh tokenlarni bazada kuzatamiz), lekin buning evaziga xavfsizlikni oshiramiz. Xavfsizlik va qulaylik o'rtasidagi bu muvozanat — amaliy loyihalarda odatiy holdir." },

        { h2: "JWT: afzallik va kamchiliklari" },
        { p: "JWT sehrli tayoqcha emas. Uni to'g'ri joyda ishlatish uchun kuchli va zaif tomonlarini biling:" },
        { h3: "Afzalliklari" },
        { ul: [
          "<strong>Holatsizlik:</strong> server har so'rovda bazaga murojaat qilmasdan tokenni tekshiradi — masshtablash oson;",
          "<strong>Turli mijozlar:</strong> web, mobil ilova va boshqa xizmatlar bir xil token bilan ishlaydi;",
          "<strong>O'zini-o'zi tavsiflaydi:</strong> foydalanuvchi ID va roli tokenning ichida."
        ] },
        { h3: "Kamchiliklari" },
        { ul: [
          "<strong>Bekor qilish qiyin:</strong> imzolangan token muddati tugaguncha yaroqli qoladi; uni majburan bekor qilish uchun qo'shimcha mexanizm (qora ro'yxat yoki qisqa muddat) kerak;",
          "<strong>O'g'irlanish xavfi:</strong> token o'g'irlansa, uni ishlatgan har kim foydalanuvchi bo'lib ko'rinadi — shuning uchun HTTPS va xavfsiz saqlash zarur;",
          "<strong>Hajmi:</strong> token cookie yoki sessiya ID'dan kattaroq, har so'rovda yuboriladi."
        ] },
        { warn: "Tokenni <code>localStorage</code>'da saqlash keng tarqalgan, lekin xavfli: XSS bo'lsa, zararli skript <code>localStorage</code>'ni o'qiy oladi va tokenni o'g'irlaydi. Xavfsizroq variant — tokenni <code>HttpOnly</code> cookie'da saqlash (JS o'qiy olmaydi), ammo bu holda CSRF himoyasini (keyingi darsda) qo'shish kerak. Har ikki yondashuvning o'ziga xos xavfi bor." },

        { h2: "Xulosa" },
        { ul: [
          "JWT — imzolangan, uch qismli (<code>header.payload.signature</code>) token; imzo uning butunligini kafolatlaydi;",
          "Payload shifrlanmagan — unga maxfiy ma'lumot qo'ymang, faqat identifikator va rol;",
          "Login'da <code>jwt.sign</code> bilan token yasaymiz, himoyalangan route'da <code>jwt.verify</code> bilan tekshiramiz (hech qachon <code>decode</code> bilan emas);",
          "Maxfiy kalit <code>.env</code>da saqlanadi, kodga yozilmaydi;",
          "<code>expiresIn</code> ni albatta belgilang; qisqa access + uzoq refresh token sxemasi xavfsizlikni oshiradi;",
          "Tokenni <code>HttpOnly</code> cookie'da yoki xavfsiz saqlang; <code>localStorage</code> XSS'ga zaif."
        ] }
      ]
    },

    {
      slug: "xss-csrf",
      title: "XSS va CSRF",
      blurb: "XSS nima va undan himoya (kirishni eskeyplash, CSP, textContent va innerHTML), CSRF nima va undan himoya (CSRF token, SameSite cookie). Himoya kodlari bilan.",
      body: [
        { lead: "XSS va CSRF — web ilovalarga eng ko'p tahdid soladigan ikki hujum turi. Ular bir-biriga o'xshab ketadi, lekin butunlay boshqacha ishlaydi. Ushbu darsda biz har birini <strong>faqat himoya nuqtai nazaridan</strong> tushunamiz: zaiflik qanday paydo bo'ladi va undan qanday himoyalanish kerak." },

        { h2: "XSS nima?" },
        { p: "<strong>XSS (Cross-Site Scripting)</strong> — bu hujumchi sizning sahifangizga <strong>zararli JavaScript kod</strong> \"joylashtira\" olishi natijasida yuzaga keladigan zaiflik. Bu ko'pincha shunday sodir bo'ladi: ilova foydalanuvchi kiritgan matnni HTML sifatida, uni tozalamasdan sahifaga chiqaradi." },
        { p: "Masalan, izohlar bo'limi foydalanuvchi yozgan matnni to'g'ridan-to'g'ri HTML'ga qo'ysa va foydalanuvchi matn o'rniga <code>&lt;script&gt;</code> tegi yozsa, brauzer uni oddiy matn emas, <em>bajariladigan kod</em> deb qabul qiladi. Natijada boshqa foydalanuvchilar sahifani ochganda o'sha kod ularning brauzerida ishlaydi." },
        { p: "Nima uchun bu xavfli? Chunki zararli skript foydalanuvchining brauzerida, sizning saytingiz nomidan ishlaydi:" },
        { ul: [
          "U cookie'larni o'qib olishi mumkin (agar ular <code>HttpOnly</code> bo'lmasa);",
          "U foydalanuvchi nomidan so'rovlar yuborishi mumkin;",
          "U sahifa mazmunini o'zgartirib, foydalanuvchini aldashi mumkin."
        ] },
        { note: "XSS'ning uch asosiy turi bor: <strong>saqlangan</strong> (zararli matn bazaga saqlanib, keyin boshqalarga ko'rsatiladi), <strong>aks etuvchi</strong> (URL orqali kelib, javobga aks etadi) va <strong>DOM asosidagi</strong> (mijoz tomonidagi JS xavfsiz ishlov bermaganda). Himoya tamoyillari uchalasi uchun ham deyarli bir xil." },

        { h2: "XSS himoyasi 1: chiqishni eskeyplash" },
        { p: "Eng asosiy himoya: foydalanuvchi ma'lumotini sahifaga chiqarishda uni HTML sifatida emas, <strong>oddiy matn</strong> sifatida ko'rsatish. Buning uchun maxsus HTML belgilarini \"qochirish\" (escaping) kerak:" },
        { code: "// Foydalanuvchi kiritmasidagi xavfli belgilarni eskeyplash\nfunction htmlEskeyp(matn) {\n  return String(matn)\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#39;');\n}\n\n// Endi foydalanuvchi '<script>...' yozsa ham,\n// u matn sifatida ko'rinadi, kod sifatida BAJARILMAYDI.\nconst xavfsiz = htmlEskeyp(foydalanuvchiIzohi);" },
        { p: "Amaliyotda ko'pchilik shablon tizimlari (masalan, <code>EJS</code>, <code>Pug</code>, <code>Handlebars</code>) o'zgaruvchilarni <strong>avtomatik eskeyplaydi</strong>. Muhimi: avtomatik eskeyplashni o'chirmaslik. Masalan, EJS'da <code>&lt;%= x %&gt;</code> eskeyplaydi, <code>&lt;%- x %&gt;</code> esa eskeyplamaydi — ikkinchisi xavfli:" },
        { code: "// EJS shablonida:\n// XAVFSIZ (avtomatik eskeyplanadi):\n// <%= foydalanuvchi.ismi %>\n//\n// XAVFLI (eskeyplanmaydi, xom HTML chiqadi):\n// <%- foydalanuvchi.ismi %>   <-- foydalanuvchi ma'lumotiga BUNI ishlatmang!" },
        { warn: "Eskeyplashni <strong>chiqish vaqtida</strong> (ma'lumotni ko'rsatayotganda) qiling, kontekstga qarab. HTML matnida, HTML atributida, JavaScript ichida va URL'da eskeyplash qoidalari farq qiladi. Ishonchli shablon tizimiga tayaning va uning avtomatik himoyasini o'chirmang." },

        { h2: "XSS himoyasi 2: textContent va innerHTML" },
        { p: "Mijoz tomonidagi JavaScript'da eng ko'p uchraydigan XSS sababi — <code>innerHTML</code> ni foydalanuvchi ma'lumoti bilan ishlatish. <code>innerHTML</code> berilgan matnni <strong>HTML sifatida talqin qiladi</strong>, ya'ni ichidagi teglar ishga tushadi:" },
        { code: "// XAVFLI: innerHTML foydalanuvchi ma'lumotini HTML deb talqin qiladi\nconst izoh = olinganFoydalanuvchiIzohi; // masalan '<img src=x onerror=...>'\nelement.innerHTML = izoh; // zararli kod ishga tushishi mumkin!\n\n// XAVFSIZ: textContent hamma narsani ODDIY MATN deb qo'yadi\nelement.textContent = izoh; // teglar matn sifatida ko'rinadi, bajarilmaydi" },
        { p: "Qoida oddiy: foydalanuvchi ma'lumotini ko'rsatishda deyarli har doim <code>textContent</code> ishlating, <code>innerHTML</code> emas. Agar HTML tuzilmasi yaratishingiz kerak bo'lsa, elementlarni <code>createElement</code> bilan yarating va matnni <code>textContent</code> orqali qo'ying:" },
        { code: "// HTML tuzilmasini xavfsiz yaratish\nconst div = document.createElement('div');\ndiv.className = 'izoh';\n\nconst nom = document.createElement('strong');\nnom.textContent = foydalanuvchi.ismi; // xavfsiz\n\nconst matn = document.createElement('p');\nmatn.textContent = foydalanuvchi.izohi; // xavfsiz\n\ndiv.append(nom, matn);\nkonteyner.append(div);" },
        { tip: "Agar foydalanuvchidan cheklangan HTML (masalan, izohlarda qalin matn) qabul qilishingiz <em>shart</em> bo'lsa, uni o'zingiz eskeyplashga urinmang — bu juda xato bo'ladi. <code>DOMPurify</code> kabi sinovdan o'tgan kutubxonadan foydalaning: u xavfli teg va atributlarni olib tashlaydi." },

        { h2: "XSS himoyasi 3: Content Security Policy (CSP)" },
        { p: "<strong>CSP</strong> — bu qo'shimcha himoya qatlami. U HTTP sarlavhasi orqali brauzerga aytadi: \"faqat shu manbalardagi skriptlarni ishga tushir\". Agar XSS'ga yo'l qo'yilgan bo'lsa ham, CSP ruxsat bermagan skript ishga tushmaydi." },
        { code: "// CSP sarlavhasini o'rnatish (Express, helmet orqali)\nconst helmet = require('helmet');\n\napp.use(helmet.contentSecurityPolicy({\n  directives: {\n    defaultSrc: [\"'self'\"],              // faqat o'z domenimizdan\n    scriptSrc: [\"'self'\"],               // inline skript va tashqi skriptlar taqiqlanadi\n    styleSrc: [\"'self'\"],\n    imgSrc: [\"'self'\", 'data:'],\n    objectSrc: [\"'none'\"]                // <object>, <embed> taqiqlanadi\n  }\n}));" },
        { p: "CSP'ning kuchli tomoni: <code>scriptSrc 'self'</code> bo'lsa, HTML ichiga joylashtirilgan (inline) skriptlar ishlamaydi. Bu esa ko'plab XSS hujumlarini avtomatik to'xtatadi, chunki hujumchi joylashtirgan skript aynan inline bo'ladi." },
        { note: "CSP — bu \"chuqurlashtirilgan himoya\" misoli: u XSS'ni oldini olmaydi, balki agar XSS bo'lsa, uning ta'sirini keskin kamaytiradi. Eskeyplash birinchi mudofaa chizig'i bo'lsa, CSP — ikkinchi. Ikkalasi ham kerak." },

        { h2: "CSRF nima?" },
        { p: "<strong>CSRF (Cross-Site Request Forgery)</strong> — bu foydalanuvchining <em>allaqachon login qilgan</em> holatidan foydalanib, uni bilmagan holda biror amalni bajartirishga aldash zaifligi. XSS'dan farqi: bu yerda hujumchi sizning saytingizga kod joylashtirmaydi — u foydalanuvchi brauzerining cookie'ni avtomatik yuborish odatidan foydalanadi." },
        { p: "Muammoning ildizi: brauzer sizning saytingizga so'rov yuborilganda, u <strong>saytingiz cookie'larini avtomatik qo'shadi</strong> — hattoki so'rov boshqa (zararli) saytdan kelib chiqqan bo'lsa ham. Agar server faqat cookie'ning mavjudligiga ishonsa, u bu so'rovni haqiqiy foydalanuvchining so'rovi deb qabul qiladi." },
        { p: "Masalan, foydalanuvchi bank saytiga login qilgan, cookie'si bor. So'ng u boshqa zararli sahifani ochsa, o'sha sahifa foydalanuvchi bilmagan holda bank saytiga so'rov jo'natishga urinishi mumkin — va brauzer avtomatik ravishda bank cookie'sini biriktiradi." },
        { warn: "CSRF asosan <strong>holatni o'zgartiruvchi</strong> so'rovlarga (pul o'tkazish, parol o'zgartirish, o'chirish) tahdid soladi. Shuning uchun bunday amallar hech qachon oddiy <code>GET</code> so'rov bilan bajarilmasligi kerak — ular <code>POST</code>/<code>PUT</code>/<code>DELETE</code> bo'lishi va CSRF himoyasiga ega bo'lishi lozim." },

        { h2: "CSRF himoyasi 1: SameSite cookie" },
        { p: "Eng oddiy va samarali zamonaviy himoya — cookie'ga <code>SameSite</code> atributini qo'yish. Bu brauzerga aytadi: bu cookie'ni boshqa saytdan kelgan so'rovlarda yuborma. Shu bilan CSRF hujumining asosiy mexanizmi (cookie'ning avtomatik yuborilishi) buziladi:" },
        { code: "// SameSite bilan cookie: boshqa saytdan kelgan so'rovlarda\n// cookie yuborilmaydi -> CSRF ning asosiy yo'li yopiladi\nres.cookie('sessionId', sessionId, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'lax'  // yoki 'strict' — undan ham qattiqroq\n});" },
        { p: "<code>SameSite=Lax</code> ko'pchilik holatlar uchun yaxshi standart: u oddiy navigatsiyani buzmaydi, lekin xavfli o'zaro-sayt so'rovlarida cookie'ni yubormaydi. <code>SameSite=Strict</code> yanada qattiqroq, lekin ba'zan foydalanuvchi tajribasiga ta'sir qilishi mumkin." },

        { h2: "CSRF himoyasi 2: CSRF token" },
        { p: "An'anaviy va ishonchli himoya — <strong>CSRF token</strong> (yoki \"anti-forgery token\"). G'oya shunday: server har bir forma uchun tasodifiy, taxmin qilib bo'lmaydigan token yaratadi. Bu token formaga yashirin maydon sifatida qo'yiladi. So'rov kelganda, server tokenning to'g'riligini tekshiradi." },
        { p: "Nima uchun bu ishlaydi? Chunki boshqa (zararli) sayt bu tokenni <em>bila olmaydi</em> — u faqat sizning saytingizdagi haqiqiy formada mavjud. Cookie avtomatik yuborilsa ham, to'g'ri CSRF token yuborilmasa, so'rov rad etiladi." },
        { code: "// Kontseptual CSRF himoya oqimi (Express)\nconst crypto = require('crypto');\n\n// 1. Forma sahifasini berishda token yaratamiz\napp.get('/parol-ozgartirish', (req, res) => {\n  const csrfToken = crypto.randomBytes(32).toString('hex');\n  req.session.csrfToken = csrfToken; // serverda saqlaymiz\n  res.render('parol-forma', { csrfToken });\n});\n\n// Formada yashirin maydon:\n// <input type=\"hidden\" name=\"_csrf\" value=\"...token...\">\n\n// 2. So'rov kelganda tokenni tekshiruvchi middleware\nfunction csrfTekshir(req, res, next) {\n  const yuborilgan = req.body._csrf;\n  const saqlangan = req.session.csrfToken;\n  if (!yuborilgan || yuborilgan !== saqlangan) {\n    return res.status(403).json({ xato: 'CSRF token yaroqsiz' });\n  }\n  next();\n}\n\napp.post('/parol-ozgartirish', csrfTekshir, (req, res) => {\n  // Bu yerga faqat to'g'ri CSRF token bilan yetib kelinadi\n  // ... parolni o'zgartiramiz\n});" },
        { note: "Amaliyotda bularni o'zingiz yozish o'rniga sinovdan o'tgan middleware'lardan (masalan, <code>csurf</code> yoki freymvorkning o'z himoyasidan) foydalaning. Yuqoridagi kod tamoyilni ko'rsatish uchun soddalashtirilgan." },
        { tip: "Eng yaxshi amaliyot — bir necha qatlamni birlashtirish: <code>SameSite</code> cookie (birinchi mudofaa) + CSRF token (ishonchli ikkinchi qatlam). API'lar uchun, agar autentifikatsiya cookie'da emas, <code>Authorization</code> sarlavhasidagi tokenda bo'lsa, CSRF tabiiy ravishda kamroq muammo bo'ladi (chunki sarlavha avtomatik yuborilmaydi)." },

        { h2: "XSS va CSRF: farqni eslab qolish" },
        { ul: [
          "<strong>XSS</strong> — hujumchi sizning saytingizda <em>kod ishga tushiradi</em>; himoya: kirishni eskeyplash, <code>textContent</code>, CSP;",
          "<strong>CSRF</strong> — hujumchi foydalanuvchining <em>login holatidan foydalanib so'rov yuboradi</em>; himoya: <code>SameSite</code> cookie, CSRF token;",
          "XSS aslida CSRF himoyasini ham buzishi mumkin (chunki u sahifada CSRF tokenni o'qiy oladi) — shuning uchun XSS'ni oldini olish birlamchi."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<strong>XSS</strong> — foydalanuvchi ma'lumoti kod sifatida bajarilishi; birlamchi himoya — chiqishni eskeyplash va <code>textContent</code> ishlatish;",
          "<code>innerHTML</code> ni foydalanuvchi ma'lumoti bilan ishlatmang; kerak bo'lsa <code>DOMPurify</code>dan foydalaning;",
          "<strong>CSP</strong> — qo'shimcha qatlam: inline skriptlarni bloklab, XSS ta'sirini kamaytiradi;",
          "<strong>CSRF</strong> — foydalanuvchining login holatidan noqonuniy foydalanish; himoya — <code>SameSite</code> cookie va CSRF token;",
          "Holatni o'zgartiruvchi amallar hech qachon <code>GET</code> bilan bo'lmasin;",
          "Eng yaxshi yondashuv — bir necha himoya qatlamini birlashtirish (defense in depth)."
        ] }
      ]
    },

    {
      slug: "sql-injection",
      title: "SQL injection va boshqa himoyalar",
      blurb: "SQL injection qanday yuzaga keladi va undan himoya (parametrlangan so'rovlar, ORM), hamda boshqa muhim amaliyotlar: validatsiya, eng kam imtiyoz, sirlarni .env, rate limiting, xatolarni yashirish.",
      body: [
        { lead: "Injection (kiritish) hujumlari OWASP ro'yxatida yillar davomida yuqori o'rinda turadi. Ular orasida eng mashhuri — <strong>SQL injection</strong>. Ushbu yakuniy darsda biz SQL injection qanday paydo bo'lishini va undan qanday himoyalanishni ko'rib chiqamiz, so'ng backend xavfsizligini mustahkamlaydigan bir qator muhim amaliyotlarni jamlaymiz." },

        { h2: "SQL injection qanday yuzaga keladi?" },
        { p: "SQL injection zaifligi <strong>foydalanuvchi kiritmasi SQL so'rovi matniga to'g'ridan-to'g'ri qo'shilganda</strong> paydo bo'ladi. Muammoning ildizi shu: agar kiritma so'rov <em>matniga</em> aralashsa, brauzer/ma'lumotlar bazasi qayerda ma'lumot tugab, qayerda buyruq boshlanishini farqlay olmaydi." },
        { p: "Xavfli naqsh — bu so'rovni satrlarni ulash (string concatenation) orqali qurish:" },
        { code: "// XAVFLI: foydalanuvchi kiritmasi so'rov MATNIGA ulanmoqda\nconst email = req.body.email; // foydalanuvchi nazoratidagi qiymat\nconst sorov = \"SELECT * FROM users WHERE email = '\" + email + \"'\";\ndb.query(sorov);\n\n// Agar 'email' oddiy matn bo'lmasa, balki SQL sintaksisini\n// o'z ichiga olsa, so'rovning ma'nosi butunlay o'zgarib ketishi mumkin.\n// Server buni ODDIY MATN emas, BUYRUQ deb talqin qiladi." },
        { p: "Xuddi XSS singari, bu yerdagi asosiy muammo bir xil: <strong>ma'lumot bilan kod aralashib ketmoqda</strong>. Himoyaning kaliti — ma'lumotni doim ma'lumot sifatida, koddan qat'iy ajratib ishlatish." },
        { warn: "Foydalanuvchi kiritmasini hech qachon SQL so'rovi matniga (yoki har qanday buyruq matniga: shell buyrug'i, NoSQL so'rovi, LDAP filtri) satr ulash orqali qo'shmang. Bu injection zaifligining asosiy sababidir." },

        { h2: "Himoya 1: Parametrlangan so'rovlar (prepared statements)" },
        { p: "Eng ishonchli himoya — <strong>parametrlangan so'rovlar</strong> (prepared statements). Bunda siz so'rov <em>tuzilmasini</em> alohida, <em>qiymatlarni</em> alohida beraytasiz. Ma'lumotlar bazasi qiymatlarni <strong>doim faqat ma'lumot deb qabul qiladi</strong>, hech qachon SQL buyruq deb emas — ular so'rov matniga aralashmaydi." },
        { code: "// XAVFSIZ: parametrlangan so'rov (?, $1 kabi placeholder'lar)\n// mysql2 kutubxonasi bilan misol:\nconst email = req.body.email;\n\nconst [natijalar] = await db.execute(\n  'SELECT * FROM users WHERE email = ?', // so'rov tuzilmasi\n  [email]                               // qiymatlar ALOHIDA beriladi\n);\n\n// 'email' ichida nima bo'lishidan qat'i nazar, u faqat\n// email QIYMATI sifatida ishlatiladi, buyruq sifatida emas." },
        { code: "// PostgreSQL (node-postgres / pg) bilan: $1, $2 placeholder'lar\nconst natija = await pool.query(\n  'SELECT * FROM users WHERE email = $1 AND rol = $2',\n  [email, rol]\n);" },
        { note: "Placeholder (<code>?</code> yoki <code>$1</code>) — bu shunchaki matn almashtirish EMAS. Ma'lumotlar bazasi so'rov rejasini avval qiymatsiz tayyorlaydi, keyin qiymatlarni xavfsiz bog'laydi. Aynan shu ajratish injection'ni imkonsiz qiladi." },

        { h2: "Himoya 2: ORM va so'rov quruvchilar" },
        { p: "Zamonaviy loyihalarda ko'pincha <strong>ORM</strong> (Object-Relational Mapping) yoki so'rov quruvchi (query builder) ishlatiladi — masalan, <code>Prisma</code>, <code>Sequelize</code>, <code>Knex</code>, <code>TypeORM</code>. Ular so'rovlarni ichki tarzda <em>parametrlashtiradi</em>, shu sabab injection'dan tabiiy himoya beradi:" },
        { code: "// Prisma bilan: qiymatlar avtomatik xavfsiz parametrlanadi\nconst foydalanuvchi = await prisma.user.findUnique({\n  where: { email: req.body.email }\n});\n\n// Sequelize bilan:\nconst foydalanuvchi2 = await User.findOne({\n  where: { email: req.body.email }\n});\n\n// Ikkalasida ham 'email' xom SQL matniga aralashmaydi." },
        { warn: "ORM ham panatseya emas. Agar ORM ichida <strong>xom SQL</strong> yozish imkoniyatidan foydalansangiz (masalan, <code>sequelize.query</code> yoki raw so'rov), o'sha yerda satr ulashdan qoching — parametrlangan variantini ishlating. ORM sizni faqat to'g'ri ishlatilgandagina himoya qiladi." },

        { h2: "Boshqa himoya 1: Kiritishni validatsiya qilish" },
        { p: "Injection'dan tashqari ham, har bir kiruvchi ma'lumotni <strong>server tomonida</strong> tekshiring: kutilgan turdami, formatdami, chegaradami? Bu \"foydalanuvchiga ishonma\" tamoyilining amaliy ko'rinishi. Validatsiya kutilmagan ma'lumotni erta rad etadi." },
        { code: "// Validatsiya kutubxonasi (masalan, zod) bilan misol\nconst { z } = require('zod');\n\nconst royxatSxemasi = z.object({\n  email: z.string().email(),\n  parol: z.string().min(8).max(128),\n  yosh: z.number().int().min(0).max(150)\n});\n\napp.post('/royxat', (req, res) => {\n  const natija = royxatSxemasi.safeParse(req.body);\n  if (!natija.success) {\n    return res.status(400).json({ xato: 'Kiritma noto\\'g\\'ri' });\n  }\n  const malumot = natija.data; // endi bu ma'lumot tekshirilgan va toza\n  // ...\n});" },
        { tip: "Validatsiyada <strong>ruxsat berilganlar ro'yxati</strong> (allowlist) yondashuvini afzal ko'ring: \"faqat shu qiymatlarga ruxsat\" degan qoida \"bu yomon qiymatlarni taqiqlayman\" degandan ishonchliroq, chunki barcha yomon qiymatlarni oldindan bilib bo'lmaydi." },

        { h2: "Boshqa himoya 2: Eng kam imtiyoz tamoyili" },
        { p: "<strong>Eng kam imtiyoz</strong> (least privilege) — har bir komponent faqat o'z ishini bajarishga yetadigan huquqqa ega bo'lsin, ortiqchasiga emas. Bu zaiflik yuz berganda ham zararni cheklaydi:" },
        { ul: [
          "Ilova ulanadigan ma'lumotlar bazasi foydalanuvchisiga faqat kerakli jadval va amallarga ruxsat bering (masalan, faqat <code>SELECT/INSERT</code>, agar <code>DROP</code> kerak bo'lmasa);",
          "Har bir xizmat faqat o'ziga kerakli sirlar va resurslarga kirsin;",
          "Admin huquqlarini faqat haqiqatan kerak bo'lganda bering."
        ] },
        { note: "Eng kam imtiyoz — bu chuqurlashtirilgan himoyaning bir qismi. Agar bitta qatlam buzilsa ham (masalan, injection yuz bersa), cheklangan huquqlar tufayli zarar kichik bo'ladi." },

        { h2: "Boshqa himoya 3: Sirlarni .env'da saqlash" },
        { p: "Maxfiy kalitlar (JWT siri, ma'lumotlar bazasi paroli, API kalitlari) hech qachon kodga yozilmasligi va git tarixiga tushmasligi kerak. Ularni muhit o'zgaruvchilarida saqlang va <code>.env</code> faylini <code>.gitignore</code>'ga qo'shing:" },
        { code: "// .env fayli (BU FAYL git'ga QO'SHILMAYDI)\n// DATABASE_URL=postgres://user:parol@host:5432/baza\n// JWT_SECRET=juda-uzun-tasodifiy-maxfiy-qiymat\n// API_KEY=...\n\n// Kodda sirlarni process.env orqali o'qiymiz\nrequire('dotenv').config();\n\nconst JWT_SIR = process.env.JWT_SECRET;\nif (!JWT_SIR) {\n  throw new Error('JWT_SECRET o\\'rnatilmagan!'); // ishga tushishda tekshiramiz\n}" },
        { code: "# .gitignore faylida albatta bo'lsin:\n.env\n.env.local\nnode_modules/" },
        { warn: "Agar sir bir marta git tarixiga tushib qolgan bo'lsa, uni <code>.gitignore</code>'ga qo'shish yetarli emas — u tarixda qoladi. Bunday holatda sirni <strong>darhol yangilang</strong> (rotate qiling), chunki uni fosh bo'lgan deb hisoblash kerak." },

        { h2: "Boshqa himoya 4: Rate limiting" },
        { p: "<strong>Rate limiting</strong> (so'rov chastotasini cheklash) — bir manbadan kelgan so'rovlar sonini vaqt oralig'ida cheklaydi. Bu parolni takror-takror urinib topishga urinishlar va xizmatni yuklama bilan bostirishga qarshi himoya (mavjudlik va autentifikatsiya himoyasi):" },
        { code: "const rateLimit = require('express-rate-limit');\n\n// Login uchun qattiqroq cheklov\nconst loginCheklovi = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 daqiqa\n  max: 5,                   // har IP dan 15 daqiqada 5 urinish\n  message: { xato: 'Juda ko\\'p urinish. Birozdan keyin qayta urining.' },\n  standardHeaders: true,\n  legacyHeaders: false\n});\n\napp.post('/login', loginCheklovi, loginHandler);\n\n// Umumiy API uchun yumshoqroq cheklov\nconst umumiyCheklov = rateLimit({ windowMs: 60 * 1000, max: 100 });\napp.use('/api/', umumiyCheklov);" },
        { tip: "Login, parol tiklash va ro'yxatdan o'tish kabi maxsus endpointlarga qattiqroq cheklov qo'ying. Bu avtomatlashtirilgan parol topish urinishlarini samarasiz qiladi." },

        { h2: "Boshqa himoya 5: Xatoliklarni yashirish" },
        { p: "Batafsil xato xabarlari — ayniqsa stack trace, SQL xatosi matni, fayl yo'llari — foydalanuvchiga ko'rsatilsa, ular tizim tuzilishi haqida keraksiz ma'lumot beradi. Ishlab chiqarish (production) muhitida foydalanuvchiga umumiy xabar bering, batafsil xatoni esa faqat serverning ichki loglariga yozing:" },
        { code: "// Markazlashtirilgan xato ishlovchi (Express)\napp.use((err, req, res, next) => {\n  // Batafsil xatoni faqat SERVER loglariga yozamiz\n  console.error(err.stack);\n\n  // Foydalanuvchiga UMUMIY xabar (ichki tafsilotlarni yashiramiz)\n  res.status(500).json({ xato: 'Serverda xatolik yuz berdi' });\n});" },
        { warn: "Production'da <code>NODE_ENV=production</code> o'rnating. Ba'zi freymvorklar development rejimida batafsil xato sahifalarini ko'rsatadi — bu sahifalar tizim ichki tuzilishini fosh qilishi mumkin. Foydalanuvchiga hech qachon xom stack trace ko'rsatmang." },

        { h2: "Yakuniy nazorat ro'yxati" },
        { p: "Ushbu bobni yakunlab, backend xavfsizligining amaliy nazorat ro'yxatini jamlaymiz:" },
        { ul: [
          "Barcha so'rovlar parametrlangan yoki ishonchli ORM orqali — <strong>satr ulash yo'q</strong>;",
          "Har bir kiruvchi ma'lumot server tomonida validatsiya qilinadi;",
          "Parollar <code>bcrypt</code> bilan hashlanadi, ochiq saqlanmaydi;",
          "Sirlar <code>.env</code>'da, git'ga tushmaydi;",
          "Cookie'lar <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code> bilan;",
          "Chiqish eskeyplanadi (XSS), CSP o'rnatiladi;",
          "Holatni o'zgartiruvchi so'rovlar CSRF'dan himoyalangan;",
          "Login va boshqa muhim endpointlarda rate limiting;",
          "Xato xabarlari yashiriladi, faqat loglarga yoziladi;",
          "HTTPS majburiy, <code>helmet</code> sarlavhalari o'rnatilgan;",
          "Bog'liqliklar <code>npm audit</code> bilan muntazam tekshiriladi;",
          "Eng kam imtiyoz tamoyili har qatlamda qo'llaniladi."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<strong>SQL injection</strong> foydalanuvchi kiritmasi so'rov matniga aralashganda paydo bo'ladi; birlamchi himoya — <strong>parametrlangan so'rovlar</strong>;",
          "ORM'lar tabiiy himoya beradi, lekin xom SQL yozganda ehtiyot bo'ling;",
          "Injection, XSS va CSRF'ning umumiy ildizi bitta: <strong>ma'lumot bilan kodni aralashtirmaslik</strong> va <strong>kiritmaga ishonmaslik</strong>;",
          "Qo'shimcha amaliyotlar: validatsiya, eng kam imtiyoz, sirlarni <code>.env</code>'da, rate limiting, xatolarni yashirish;",
          "Xavfsizlik — bir emas, ko'p qatlamli himoya (defense in depth); har qatlam boshqasini mustahkamlaydi."
        ] }
      ]
    }
  ]
};
