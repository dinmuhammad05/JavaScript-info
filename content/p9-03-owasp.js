"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Web ilova xavfsizligi (OWASP Top 10)",
  lessons: [
    {
      slug: "owasp-top10-kirish",
      title: "OWASP Top 10 bilan tanishuv",
      blurb: "OWASP nima, Top 10 nima uchun sanoat standarti, 2021 ro'yxatining sharhi, \"shift left\", tahdid modellashtirish va himoyachi fikrlash tarzi.",
      body: [
        { lead: "Web ilova internetga chiqqan zahoti u faqat foydalanuvchilarga emas, balki niyati buzuq kishilarga ham eshigini ochadi. Ushbu bobda biz zamonaviy web ilovalarga tahdid soladigan eng keng tarqalgan zaifliklarni <strong>faqat himoya nuqtai nazaridan</strong> o'rganamiz. Maqsad — sizni o'z kodini himoya qila oladigan, ehtiyotkor dasturchi qilib tarbiyalash. Keling, avval bu sohada nufuzli manba bo'lgan OWASP va uning mashhur Top 10 ro'yxati bilan tanishaylik." },

        { note: "Ushbu bob to'liq ta'lim maqsadida yozilgan. Har bir zaiflik uchun biz uning <strong>qanday paydo bo'lishini</strong> tushuntiramiz, keyin eng muhimi — undan <strong>qanday himoyalanishni</strong> o'rgatamiz. Hech qanday hujum yo'riqnomasi yoki tayyor \"exploit\" berilmaydi." },

        { h2: "OWASP nima?" },
        { p: "<strong>OWASP</strong> (Open Worldwide Application Security Project) — dasturiy ta'minot xavfsizligini yaxshilashga bag'ishlangan nufuzli notijorat tashkilotdir. U 2001-yilda tashkil etilgan bo'lib, butun dunyodagi mutaxassislar hissa qo'shadigan ochiq hamjamiyatdir." },
        { p: "OWASP tekin qo'llanmalar, tekshirish ro'yxatlari va ochiq kodli vositalar chiqaradi. Ularning eng mashhur mahsuloti — bu <strong>OWASP Top 10</strong>, ya'ni web ilovalarga eng ko'p va eng jiddiy zarar keltiradigan o'nta zaiflik toifasi ro'yxati." },
        { p: "Bu ro'yxat bir necha yilda bir marta yangilanadi va u haqiqiy hodisalar, xavfsizlik hisobotlari va mutaxassislar tahliliga asoslanadi. Aynan shu sabab u sanoatda amaldagi standartga aylangan." },

        { h2: "Nega Top 10 standart hisoblanadi?" },
        { p: "OWASP Top 10 ni ko'plab kompaniyalar, auditorlar va hatto ba'zi qonunchilik talablari asos sifatida ishlatadi. Buning bir necha sababi bor:" },
        { ul: [
          "<strong>Ustuvorlik beradi:</strong> cheksiz ko'p zaiflik turlari orasidan aynan eng ko'p uchraydigan va eng zararlilariga e'tibor qaratadi;",
          "<strong>Umumiy til yaratadi:</strong> \"bu Injection zaifligi\" deganda butun jamoa nima haqida gap ketayotganini birdek tushunadi;",
          "<strong>Amaliy:</strong> har bir band uchun oldini olish bo'yicha aniq tavsiyalar bilan birga keladi;",
          "<strong>Mustaqil:</strong> u biror kompaniya mahsulotini sotmaydi, shuning uchun tavsiyalari xolis."
        ] },

        { h2: "2021 ro'yxatining sharhi" },
        { p: "Quyida OWASP Top 10 (2021-yil nashri) toifalari va ularning qisqacha ma'nosi keltirilgan. Ushbu bobning keyingi darslarida biz shulardan eng muhimlarini chuqurroq ko'rib chiqamiz:" },
        { ul: [
          "<strong>A01 — Buzilgan kirish nazorati (Broken Access Control):</strong> foydalanuvchi o'ziga ruxsat etilmagan ma'lumot yoki amalga kira oladi;",
          "<strong>A02 — Kriptografik xatolar (Cryptographic Failures):</strong> maxfiy ma'lumot zaif shifrlangan yoki umuman shifrlanmagan;",
          "<strong>A03 — Injection:</strong> ishonchsiz kiritma kod sifatida bajariladi (SQL, buyruq va boshqalar);",
          "<strong>A04 — Xavfsiz bo'lmagan dizayn (Insecure Design):</strong> muammo kodda emas, balki arxitektura darajasida;",
          "<strong>A05 — Xavfsizlik noto'g'ri sozlangani (Security Misconfiguration):</strong> standart parollar, ochiq sozlamalar, ortiqcha ruxsatlar;",
          "<strong>A06 — Zaif va eskirgan komponentlar (Vulnerable Components):</strong> yangilanmagan kutubxonalar va paketlar;",
          "<strong>A07 — Identifikatsiya va autentifikatsiya xatolari:</strong> zaif parol siyosati, buzuq sessiya boshqaruvi;",
          "<strong>A08 — Ma'lumot va dastur butunligining buzilishi:</strong> ishonchsiz manbadan yangilanish, tekshirilmagan deserializatsiya;",
          "<strong>A09 — Xavfsizlik loglari va monitoring yetishmovchiligi:</strong> hujumni sezmaslik va kech aniqlash;",
          "<strong>A10 — Server tomonidan so'rov soxtalashtirish (SSRF):</strong> server aldab ichki resurslarga so'rov yuborishga majburlanadi."
        ] },

        { h2: "Shift left: xavfsizlikni erta o'ylash" },
        { p: "\"<strong>Shift left</strong>\" (chapga siljish) — bu xavfsizlik tekshiruvlarini dasturlash jarayonining <em>boshiga</em>, ya'ni loyihalash va kod yozish bosqichiga surish g'oyasi. Nomi shundan kelib chiqqanki, ishlab chiqish jarayonini chapdan (rejalashtirish) o'ngga (chiqarish) qarab chiziq deb tasavvur qilsangiz, xavfsizlikni imkon qadar chap tomonga surish kerak." },
        { p: "Nima uchun bu muhim? Chunki zaiflik qanchalik kech topilsa, uni tuzatish shunchalik qimmat va og'riqli bo'ladi. Loyihalash bosqichida sezilgan xato — bir necha soatlik ish; ishga tushgan mahsulotda topilgan xato — ma'lumot buzilishi va obro'ning yo'qolishi bilan tugashi mumkin." },
        { ul: [
          "Xavfsizlikni \"keyin qo'shamiz\" degan xususiyat emas, dizayn qismi deb ko'ring;",
          "Kod ko'rigi (code review) paytida xavfsizlik savollarini ham bering;",
          "Avtomatik tekshiruvlarni (masalan, <code>npm audit</code>) CI quvuriga qo'shing."
        ] },

        { h2: "Tahdid modellashtirish asoslari" },
        { p: "<strong>Tahdid modellashtirish</strong> (threat modeling) — bu \"tizimim qanday hujumga uchrashi mumkin?\" degan savolni tizimli ravishda berish jarayoni. Bu murakkab narsa emas; oddiy holatda unga to'rtta savol bilan yondashish mumkin:" },
        { ol: [
          "<strong>Biz nima quryapmiz?</strong> — tizimning tuzilishini va ma'lumot oqimini chizib chiqing;",
          "<strong>Nima noto'g'ri ketishi mumkin?</strong> — har bir qismda qanday tahdid borligini o'ylang;",
          "<strong>Bu haqda nima qilamiz?</strong> — har bir tahdidga qarshi himoya chorasini belgilang;",
          "<strong>Yaxshi ish qildikmi?</strong> — chora yetarli ekanini tekshiring va qayta ko'rib chiqing."
        ] },
        { p: "Masalan, oddiy login formasi uchun: \"Kimdir parolni son-sanoqsiz marta taxmin qilishga urinsa-chi?\" degan savol sizni <em>rate limiting</em> qo'shishga olib keladi. Bu — tahdid modellashtirishning eng sodda ko'rinishi." },

        { h2: "Himoyachi fikrlash tarzi" },
        { p: "Xavfsizlikda muhim bir haqiqat bor: <strong>hujumchi bitta zaiflikni topsa yetadi, himoyachi esa barcha zaifliklarni yopishi kerak</strong>. Shu sabab yagona himoya qatlamiga tayanish xato — buni <strong>chuqurlashtirilgan himoya</strong> (defense in depth) deyiladi." },
        { p: "Himoyachi dasturchi doim shu tamoyilni yodda tutadi:" },
        { ul: [
          "<strong>Kiritmaga ishonma:</strong> tashqaridan kelgan har qanday ma'lumot soxta bo'lishi mumkin;",
          "<strong>Xavfsiz standart:</strong> tizim sozlanmagan holatda ham xavfsiz bo'lsin, ochiq emas;",
          "<strong>Eng kam imtiyoz:</strong> har bir qism faqat zarur bo'lgan huquqqa ega bo'lsin;",
          "<strong>Qatlamli himoya:</strong> bitta qatlam yiqilsa, ikkinchisi ushlab qolsin."
        ] },

        { p: "Keling, himoyachi fikrlashning eng sodda amaliy ko'rinishini — eng kam imtiyoz tamoyilini kod bilan modellashtiraylik. Quyidagi demoda foydalanuvchining roliga qarab unga faqat zarur amallar ruxsat etiladi:" },
        { pg: [
          "// Har bir rolga faqat ZARUR amallar beriladi (eng kam imtiyoz)",
          "const ruxsatlar = {",
          "  oquvchi: ['korish'],",
          "  muharrir: ['korish', 'tahrirlash'],",
          "  admin: ['korish', 'tahrirlash', 'ochirish']",
          "};",
          "",
          "// Standart holatda RAD et: ruxsat aniq berilmagan bo'lsa, yo'q",
          "function amalRuxsatmi(rol, amal) {",
          "  const royxat = ruxsatlar[rol] || [];",
          "  return royxat.includes(amal);",
          "}",
          "",
          "console.log('oquvchi korishi:', amalRuxsatmi('oquvchi', 'korish'));",
          "console.log('oquvchi ochirishi:', amalRuxsatmi('oquvchi', 'ochirish'));",
          "console.log('admin ochirishi:', amalRuxsatmi('admin', 'ochirish'));",
          "// Noma'lum rol — standart holatda hamma narsa rad etiladi",
          "console.log('mehmon korishi:', amalRuxsatmi('mehmon', 'korish'));"
        ].join("\n"), file: "eng-kam-imtiyoz.js" },
        { p: "E'tibor bering: noma'lum rol uchun ro'yxat bo'sh bo'lgani sabab har qanday amal avtomatik rad etiladi. Bu — \"standart holatda rad et\" (deny by default) tamoyilining amaliy ko'rinishi." },

        { h2: "Muhim ogohlantirish: ruxsatsiz test qonunga xilof" },
        { warn: "Ushbu bobda o'rgangan bilimlaringizni faqat <strong>o'zingizga tegishli</strong> yoki <strong>egasidan yozma ruxsat olingan</strong> tizimlarda qo'llang. Boshqa birovning saytini yoki tizimini ruxsatsiz \"tekshirish\", zaiflik izlash yoki hujum qilish — ko'plab mamlakatlarda jinoyat hisoblanadi va jiddiy javobgarlikka olib keladi. Bu bilim himoya uchun, hujum uchun emas." },

        { note: "Keyingi darslarda biz ro'yxatning eng muhim va eng ko'p uchraydigan bandlarini — kirish nazorati, Injection, XSS, CSRF/SSRF va noto'g'ri sozlashni — batafsil, zaif kod va uning xavfsiz muqobili bilan birga ko'rib chiqamiz." }
      ]
    },

    {
      slug: "broken-access-control",
      title: "Buzilgan kirish nazorati va IDOR",
      blurb: "Autentifikatsiya va avtorizatsiya farqi, Broken Access Control (2021 #1), IDOR konsepti, zaif va xavfsiz kod, eng kam imtiyoz va himoya cheklisti.",
      body: [
        { lead: "Foydalanuvchi tizimga kirdi — bu uni hamma narsaga haqli qiladimi? Yo'q. Aynan shu savolga noto'g'ri javob berish OWASP Top 10 ning 2021-yil ro'yxatida <strong>birinchi o'rinni</strong> egallagan zaiflikni — buzilgan kirish nazoratini keltirib chiqaradi. Bu darsda biz kirish nazorati nima ekanini, u qanday buzilishini va har so'rovda uni to'g'ri tekshirishni o'rganamiz." },

        { h2: "Autentifikatsiya vs avtorizatsiya" },
        { p: "Ko'p dasturchi bu ikki tushunchani chalkashtiradi, holbuki ular butunlay boshqa vazifani bajaradi:" },
        { ul: [
          "<strong>Autentifikatsiya (authentication):</strong> \"Sen kimsan?\" degan savolga javob. Foydalanuvchining kimligini tasdiqlash — login va parol, token orqali;",
          "<strong>Avtorizatsiya (authorization):</strong> \"Senga nima qilishga ruxsat bor?\" degan savolga javob. Aniqlangan foydalanuvchining biror amalga yoki ma'lumotga huquqi borligini tekshirish."
        ] },
        { p: "Xavfsizlik xatolarining aksariyati aynan <strong>ikkinchisi unutilgani</strong> uchun sodir bo'ladi. Dasturchi \"foydalanuvchi kirgan, demak ishonamiz\" deb o'ylaydi va har bir amalda uning huquqini qayta tekshirishni unutadi." },

        { h2: "Broken Access Control nima?" },
        { p: "<strong>Kirish nazorati</strong> (access control) — bu \"kim nimaga kira oladi\" qoidalarini amalga oshiruvchi mexanizm. U <em>buzilgan</em> deyilsa, demak foydalanuvchi o'ziga ruxsat etilmagan ma'lumotni ko'ra oladi yoki amalni bajara oladi." },
        { p: "Bunga misollar:" },
        { ul: [
          "Oddiy foydalanuvchi administrator sahifasiga (masalan, <code>/admin</code>) kira oladi;",
          "Foydalanuvchi boshqa birovning shaxsiy ma'lumotini ko'radi;",
          "Foydalanuvchi o'zining rolini yoki huquqini so'rov orqali o'zgartira oladi."
        ] },

        { h2: "IDOR — obyektga to'g'ridan-to'g'ri havola zaifligi" },
        { p: "<strong>IDOR</strong> (Insecure Direct Object Reference) — kirish nazorati buzilishining eng klassik ko'rinishidir. Konseptual g'oyasi oddiy: agar ma'lumotga URL yoki so'rovdagi identifikator (<code>id</code>) orqali murojaat qilinsa va server bu ma'lumot <em>so'rayotgan foydalanuvchiga tegishli ekanini tekshirmasa</em>, muammo tug'iladi." },
        { p: "Tasavvur qiling, foydalanuvchi o'z hisobvarag'ini <code>/api/hisob/1005</code> manzilida ko'radi. Agar u shunchaki raqamni <code>1006</code> ga o'zgartirsa va server \"bu hisob senikimi?\" deb tekshirmasa, u begona odamning ma'lumotini ko'radi. Bu — IDOR." },
        { note: "Diqqat qiling: bu yerda hech qanday \"buzish\" yoki murakkab hujum yo'q. Muammoning butun mohiyati — <strong>serverning bitta tekshiruvni tashlab ketgani</strong>. Xavfsizlik ko'pincha aynan shunday oddiy, unutilgan tekshiruvdan buziladi." },

        { h2: "Zaif kod: server egalikni tekshirmaydi" },
        { p: "Quyidagi kod aynan IDOR zaifligini o'zida saqlaydi — u <code>id</code> bo'yicha ma'lumotni oladi, lekin uning so'rovchiga tegishli ekanini tekshirmaydi:" },
        { code: [
          "// ZAIF: egalik tekshirilmaydi",
          "app.get('/api/hisob/:id', async (req, res) => {",
          "  const hisob = await db.hisobTop(req.params.id);",
          "  // Muammo: bu hisob req.user ga tegishlimi? Tekshirilmadi!",
          "  res.json(hisob);",
          "});"
        ].join("\n") },

        { h2: "Xavfsiz kod: har so'rovda egalik va rolni tekshirish" },
        { p: "To'g'ri yechim — ma'lumotni qaytarishdan oldin uning aynan shu foydalanuvchiga tegishli ekanini (yoki foydalanuvchida yetarli rol borligini) tekshirish:" },
        { code: [
          "// XAVFSIZ: egalik server tomonida tekshiriladi",
          "app.get('/api/hisob/:id', async (req, res) => {",
          "  const hisob = await db.hisobTop(req.params.id);",
          "  if (!hisob) {",
          "    return res.status(404).json({ xato: 'Topilmadi' });",
          "  }",
          "  // Asosiy himoya: hisob egasi so'rayotgan foydalanuvchimi?",
          "  if (hisob.egaId !== req.user.id && req.user.rol !== 'admin') {",
          "    return res.status(403).json({ xato: 'Ruxsat yo'q' });",
          "  }",
          "  res.json(hisob);",
          "});"
        ].join("\n") },
        { p: "E'tibor bering: biz begona ma'lumotni so'raganda <code>404</code> yoki <code>403</code> qaytaramiz, lekin \"bu hisob mavjud, ammo senga ruxsat yo'q\" deb ortiqcha ma'lumot bermaymiz. Bu ham himoyaning bir qismi." },

        { h2: "Egalikni tekshirish g'oyasini modellashtirish" },
        { p: "Quyidagi interaktiv misolda biz sof mantiqni — foydalanuvchi o'ziga tegishli bo'lmagan resursga murojaat qilganda ruxsatni rad etishni — soddalashtirilgan ko'rinishda ko'rsatamiz:" },
        { pg: [
          "// Soddalashtirilgan resurslar bazasi",
          "const hujjatlar = [",
          "  { id: 1, egaId: 'aziz', matn: 'Azizning eslatmasi' },",
          "  { id: 2, egaId: 'bobur', matn: 'Boburning eslatmasi' }",
          "];",
          "",
          "// Egalikni tekshiruvchi xavfsiz funksiya",
          "function hujjatOl(soralganId, joriyFoydalanuvchi) {",
          "  const h = hujjatlar.find(function (d) {",
          "    return d.id === soralganId;",
          "  });",
          "  if (!h) return { holat: 404, xabar: 'Topilmadi' };",
          "  if (h.egaId !== joriyFoydalanuvchi) {",
          "    return { holat: 403, xabar: \"Ruxsat yo'q\" };",
          "  }",
          "  return { holat: 200, matn: h.matn };",
          "}",
          "",
          "// Aziz o'z hujjatini so'raydi — ruxsat bor",
          "console.log(hujjatOl(1, 'aziz'));",
          "// Aziz Boburning hujjatini so'raydi — rad etiladi",
          "console.log(hujjatOl(2, 'aziz'));"
        ].join("\n"), file: "egalik-tekshirish.js" },
        { p: "Ko'rib turganingizdek, butun himoya bitta shartda — <code>h.egaId !== joriyFoydalanuvchi</code> — jamlangan. Aynan shu qatorni tushirib qoldirish IDOR zaifligini yaratadi." },

        { h2: "Eng kam imtiyoz tamoyili" },
        { p: "<strong>Eng kam imtiyoz</strong> (principle of least privilege) — har bir foydalanuvchi, rol yoki komponent faqat o'z vazifasini bajarish uchun <em>zarur bo'lgan minimal</em> huquqqa ega bo'lishi kerak degan tamoyildir." },
        { ul: [
          "Yangi foydalanuvchiga standart holatda eng kam huquq bering, keyin kerak bo'lsa qo'shing;",
          "Administrator huquqini faqat haqiqatan zarur bo'lganlarga bering;",
          "Rollarni aniq belgilang: o'quvchi, muharrir, admin — har biriga faqat kerakli amallar."
        ] },
        { p: "Bu tamoyil zaiflik yuzaga kelganda ham zararni cheklaydi: agar oddiy foydalanuvchi hisobi buzilsa, hujumchi faqat oz huquqqa ega bo'ladi, butun tizimga emas." },

        { h2: "Himoya cheklisti" },
        { p: "Kirish nazoratini to'g'ri tashkil qilish uchun quyidagilarni tekshiring:" },
        { ul: [
          "<strong>Standart holatda rad et:</strong> ruxsat aniq berilmagan bo'lsa, kirishni taqiqla;",
          "<strong>Server tomonida tekshir:</strong> har bir maxfiy so'rovda huquqni qayta tasdiqla;",
          "<strong>Egalikni tekshir:</strong> <code>id</code> bo'yicha ma'lumot berishdan oldin egalikni tekshir;",
          "<strong>Rollarni markazlashtir:</strong> ruxsat mantiqini bir joyda saqlab, takrorlanishni kamaytir;",
          "<strong>Test qil:</strong> \"boshqa foydalanuvchi bu ma'lumotni ko'ra oladimi?\" degan holatlarni tekshir."
        ] },
        { warn: "Hech qachon faqat frontendga (masalan, tugmani yashirishga) ishonmang. Frontend — bu foydalanuvchi to'liq nazorat qiladigan muhit; u so'rovni istagancha o'zgartirishi mumkin. Haqiqiy kirish nazorati <strong>doim server tomonida</strong> amalga oshirilishi shart." }
      ]
    },

    {
      slug: "injection-himoya",
      title: "Injection: SQL va buyruq inyeksiyasi",
      blurb: "Injection g'oyasi, SQL injection va parametrlangan so'rovlar, buyruq inyeksiyasi himoyasi, NoSQL eslatma va umumiy himoya tamoyillari.",
      body: [
        { lead: "Injection — o'nlab yillardan beri OWASP ro'yxatining yuqori qismidan tushmayotgan zaiflik toifasi. Uning butun mohiyati bitta jumlada: <strong>ishonchsiz kiritma kod sifatida bajarilib qolganda</strong> muammo tug'iladi. Bu darsda biz eng mashhur turi — SQL inyeksiyasini, shuningdek buyruq inyeksiyasini ko'rib chiqamiz va, eng muhimi, ularning ishonchli himoyasini — parametrlashni o'rganamiz." },

        { h2: "Injection g'oyasi" },
        { p: "Deyarli har qanday dastur ma'lumot va buyruqni birga ishlatadi. Masalan, SQL so'rovida <em>buyruq</em> (SELECT, WHERE) va <em>ma'lumot</em> (foydalanuvchi kiritgan qiymat) aralashadi. Agar dastur bularni to'g'ri ajratmasa, hujumchi o'z ma'lumotini shunday tuzadiki, u <strong>ma'lumot emas, buyruq</strong> sifatida talqin qilinadi." },
        { p: "Injection bir necha muhitda uchraydi: SQL ma'lumotlar bazasida (SQL injection), operatsion tizim buyruqlarida (command injection), NoSQL bazalarda, hatto LDAP va boshqa joylarda. Umumiy sabab bitta — kiritma va kodning aralashib ketishi." },

        { h2: "SQL injection konsepti" },
        { p: "SQL injectionda hujumchi so'rovga o'z SQL bo'lagini \"suqib\" kiritadi. Buning yagona sababi — dasturchining foydalanuvchi kiritmasini to'g'ridan-to'g'ri so'rov satriga <strong>ulab qo'ygani</strong>." },
        { p: "Quyidagi zaif kodni ko'ring — u foydalanuvchi nomini oddiy satr birlashtirish orqali so'rovga qo'shadi:" },
        { code: [
          "// ZAIF: satr birlashtirish orqali so'rov qurish",
          "const nom = req.body.foydalanuvchiNomi;",
          "const sorov =",
          "  \"SELECT * FROM foydalanuvchilar WHERE nom = '\" + nom + \"'\";",
          "db.query(sorov);",
          "",
          "// Muammo: 'nom' ichidagi maxsus belgilar so'rovning",
          "// tuzilishini o'zgartirib yuborishi mumkin. Kiritma",
          "// bu yerda ma'lumot emas, KOD qismiga aylanib qoladi."
        ].join("\n") },
        { note: "Biz bu yerda ataylab hech qanday ishlaydigan hujum satrini ko'rsatmaymiz. Muhimi — <em>sabab</em>ni tushunish: kiritma so'rov matniga bevosita ulanganda, u so'rovning mantiqini o'zgartirishi mumkin bo'lib qoladi." },

        { h2: "Xavfsiz yechim: parametrlangan so'rovlar" },
        { p: "To'g'ri himoya — <strong>parametrlangan so'rovlar</strong> (parameterized queries), ya'ni <em>prepared statements</em>. Bu usulda so'rovning tuzilishi va unga uzatiladigan qiymatlar <strong>alohida</strong> yuboriladi. Ma'lumotlar bazasi qiymatni faqat ma'lumot deb qabul qiladi — u hech qachon buyruq sifatida bajarilmaydi." },
        { code: [
          "// XAVFSIZ: parametrlangan so'rov",
          "const nom = req.body.foydalanuvchiNomi;",
          "// So'rov tuzilishi va qiymat ALOHIDA uzatiladi",
          "db.query(",
          "  'SELECT * FROM foydalanuvchilar WHERE nom = $1',",
          "  [nom]",
          ");",
          "",
          "// $1 — bu joy egasi (placeholder). 'nom' ichida nima",
          "// bo'lishidan qat'i nazar, u faqat qiymat sifatida",
          "// ishlatiladi, so'rov tuzilishiga ta'sir qilolmaydi."
        ].join("\n") },
        { p: "Ko'plab ORM kutubxonalari (masalan, Prisma, Sequelize, TypeORM) so'rovlarni ichkarida parametrlab beradi — bu ham yaxshi himoya qatlami. Ammo ORM ishlatganingizda ham xom (raw) so'rov yozsangiz, uni albatta parametrlang." },
        { tip: "Qoidani yodda saqlang: <strong>foydalanuvchi kiritmasini hech qachon so'rov matniga ulamang</strong>. Har doim parametr (placeholder) orqali uzating. Bu SQL injectiondan himoyaning eng ishonchli usulidir." },

        { h2: "Buyruq inyeksiyasi (command injection)" },
        { p: "<strong>Buyruq inyeksiyasi</strong> — bu SQL injectionga o'xshash, lekin bu safar foydalanuvchi kiritmasi <em>operatsion tizim buyrug'iga</em> aralashadi. Bu ko'pincha dastur foydalanuvchi kiritmasini olib, uni tizim buyrug'i (masalan, fayl bilan ishlash) ichiga qo'shganda yuzaga keladi." },
        { p: "Himoya tamoyillari:" },
        { ul: [
          "<strong>Iloji boricha tizim buyrug'ini chaqirmang:</strong> ko'p vazifani buyruq qatorisiz, tilning o'z kutubxonalari bilan bajarish mumkin;",
          "<strong>Qobiqni chetlab o'ting:</strong> agar tashqi dastur chaqirish zarur bo'lsa, argumentlarni massiv sifatida uzating (masalan, Node.js da <code>execFile</code> yoki <code>spawn</code>), qobiq satrini (<code>exec</code>) qurmang;",
          "<strong>Kiritmani qat'iy tekshiring:</strong> faqat kutilgan qiymatlarga (masalan, oldindan belgilangan ro'yxat) ruxsat bering."
        ] },
        { code: [
          "const { execFile } = require('child_process');",
          "",
          "// XAVFSIZ g'oya: argument ALOHIDA massivda uzatiladi,",
          "// qobiq satri qurilmaydi",
          "execFile('convert', [faylNomi, 'chiqish.png'], (xato) => {",
          "  if (xato) console.error('Xatolik:', xato.message);",
          "});",
          "",
          "// Bu yerda 'faylNomi' argument sifatida beriladi,",
          "// shuning uchun u buyruq tuzilishiga aralasholmaydi."
        ].join("\n") },

        { h2: "NoSQL injection eslatmasi" },
        { p: "Injection faqat SQL bilan cheklanmaydi. NoSQL bazalarda (masalan, MongoDB) ham o'xshash muammo bor: agar foydalanuvchi kiritmasi so'rov obyektiga tekshirilmasdan qo'shilsa, hujumchi so'rov mantiqini o'zgartira oladigan maxsus tuzilma yubora oladi." },
        { ul: [
          "Kiritmaning <strong>turini tekshiring:</strong> string kutilgan joyda obyekt kelmasligini ta'minlang;",
          "So'rovga foydalanuvchi obyektini <em>butunligicha</em> qo'shmang; kerakli maydonlarni aniq ajratib oling;",
          "Sxema validatsiyasidan (masalan, Zod, Joi) foydalaning."
        ] },

        { h2: "Xavfsiz validatsiya g'oyasini modellashtirish" },
        { p: "Quyidagi misolda biz himoyaning ikki qatlamini — kiritmani ruxsat etilgan qiymatlar ro'yxatiga tekshirish (allowlist) va parametrlashni taqlid qiluvchi ajratishni — ko'rsatamiz:" },
        { pg: [
          "// 1-qatlam: kiritmani allowlist orqali tekshirish",
          "function statusValidmi(status) {",
          "  const ruxsatEtilgan = ['faol', 'kutish', 'yopilgan'];",
          "  return ruxsatEtilgan.includes(status);",
          "}",
          "",
          "// 2-qatlam: so'rov va qiymatni ALOHIDA saqlash g'oyasi",
          "function xavfsizSorovTayyorla(status) {",
          "  if (!statusValidmi(status)) {",
          "    return { xato: 'Notogri status qiymati' };",
          "  }",
          "  // Tuzilma va qiymat aralashmaydi:",
          "  return {",
          "    shablon: 'SELECT * FROM buyurtmalar WHERE status = ?',",
          "    qiymatlar: [status]",
          "  };",
          "}",
          "",
          "console.log(xavfsizSorovTayyorla('faol'));",
          "console.log(xavfsizSorovTayyorla('boshqacha'));"
        ].join("\n"), file: "xavfsiz-validatsiya.js" },
        { p: "Diqqat qiling: <code>shablon</code> va <code>qiymatlar</code> alohida turadi. Aynan shu ajratish — parametrlangan so'rovlarning asosidir. Bunga qo'shimcha allowlist tekshiruvi esa faqat kutilgan qiymatlarga yo'l ochadi." },

        { h2: "Umumiy himoya tamoyillari" },
        { ul: [
          "<strong>Kiritmaga ishonma:</strong> tashqaridan kelgan har qanday ma'lumotni potensial zararli deb qara;",
          "<strong>Validatsiya qil:</strong> ma'lumotning turi, uzunligi va formatini kutilganiga solishtir;",
          "<strong>Parametrlang:</strong> so'rov tuzilishini va qiymatlarni hech qachon aralashtirma;",
          "<strong>Eng kam huquq:</strong> ma'lumotlar bazasi foydalanuvchisiga faqat zarur amallar (masalan, o'qish/yozish) uchun ruxsat ber;",
          "<strong>Xatolarni yashir:</strong> baza xatolarini foydalanuvchiga to'liq ko'rsatma — ular hujumchiga ma'lumot beradi."
        ] },
        { note: "Injectionga qarshi himoyaning eng samarali usuli — foydalanuvchi kiritmasini <em>hech qachon</em> bajariladigan kod (so'rov, buyruq) bilan aralashtirmaslikdir. Parametrlash va argumentlarni ajratish aynan shu vazifani bajaradi." }
      ]
    },

    {
      slug: "xss-chuqur",
      title: "XSS (Cross-Site Scripting) chuqur",
      blurb: "XSS nima, reflected/stored/DOM-based turlari, xavfliligi, escaping, textContent vs innerHTML, CSP, sanitizatsiya va HttpOnly cookie.",
      body: [
        { lead: "Foydalanuvchi kiritgan matn brauzerda oddiy yozuv sifatida ko'rinishi kerak edi — lekin u to'satdan <em>kod</em> sifatida ishga tushib ketsa-chi? Aynan shu XSS — Cross-Site Scripting zaifligining mohiyati. Bu darsda biz begona skript brauzerda qanday paydo bo'lishini konseptual tushunamiz va, eng muhimi, uni to'xtatuvchi himoya usullarini — escaping, CSP va to'g'ri DOM ishlatishni — o'rganamiz." },

        { h2: "XSS nima?" },
        { p: "<strong>XSS</strong> (Cross-Site Scripting) — bu zaiflik bo'lib, unda hujumchi web sahifaga o'z JavaScript kodini kiritishga muvaffaq bo'ladi va bu kod boshqa foydalanuvchilarning brauzerida bajariladi. Muammoning ildizi bitta — <strong>ishonchsiz ma'lumot sahifaga kod sifatida joylashtirilishi</strong>." },
        { p: "Masalan, dastur foydalanuvchi kiritgan izohni to'g'ridan-to'g'ri HTMLga qo'ysa va bu izoh ichida skript bo'lsa, u skript sahifani ochgan har bir kishining brauzerida ishlaydi." },

        { h2: "XSS turlari" },
        { p: "XSS uch asosiy ko'rinishda uchraydi:" },
        { h3: "1. Reflected XSS (aks etuvchi)" },
        { p: "Zararli kiritma so'rov bilan serverga boradi va server javobida <em>darhol</em> qaytariladi (masalan, qidiruv natijasi sahifasida). Bu odatda maxsus tayyorlangan havola orqali qurbonga yetkaziladi." },
        { h3: "2. Stored XSS (saqlanuvchi)" },
        { p: "Eng xavfli turi. Zararli kiritma serverda <strong>saqlanadi</strong> (masalan, izoh yoki profil maydonida) va uni ko'rgan <em>har bir</em> foydalanuvchi zarar ko'radi. Bitta joylashtirilgan kod ko'plab qurbonga ta'sir qiladi." },
        { h3: "3. DOM-based XSS" },
        { p: "Bu holatda muammo server emas, <strong>mijoz tomonidagi JavaScript</strong>da. Sahifadagi skript URL yoki boshqa manbadan olingan ma'lumotni tekshirmasdan DOMga yozganda yuzaga keladi. Server javobi o'zgarmasa ham zaiflik mavjud bo'ladi." },

        { h2: "Nima uchun XSS xavfli?" },
        { p: "Begona skript qurbonning brauzerida, uning nomidan ishlagani uchun jiddiy zarar keltirishi mumkin:" },
        { ul: [
          "<strong>Sessiya o'g'irlash:</strong> agar cookie himoyalanmagan bo'lsa, skript uni o'qib, foydalanuvchi hisobiga kirishga imkon berishi mumkin;",
          "<strong>Soxta amallar:</strong> foydalanuvchi nomidan so'rovlar yuborish (masalan, sozlamani o'zgartirish);",
          "<strong>Fishing:</strong> sahifaga soxta forma qo'yib, parol so'rash;",
          "<strong>Sahifani buzish:</strong> mazmunni o'zgartirish, foydalanuvchini boshqa saytga yo'naltirish."
        ] },

        { h2: "Asosiy himoya: chiqishni escape qilish" },
        { p: "XSSga qarshi eng muhim himoya — <strong>chiqishni (output) escape qilish</strong>. Bu shuni anglatadiki, ma'lumotni sahifaga chiqarishdan oldin uning ichidagi maxsus HTML belgilarini (<code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, tirnoqlar) xavfsiz ko'rinishga aylantirasiz. Shunda brauzer ularni belgi (matn) deb qabul qiladi, teg deb emas." },
        { p: "Muhim nuqta — escaping <strong>kontekstga bog'liq</strong> (context-aware) bo'lishi kerak. HTML matni ichida, HTML atributida, JavaScript ichida va URLda escaping qoidalari boshqacha. Shu sabab ishonchli shablon dvigatellari (masalan, React JSX) buni avtomatik va kontekstga mos bajaradi." },

        { h2: "textContent vs innerHTML" },
        { p: "DOM bilan ishlaganda XSSning eng ko'p uchraydigan sababi — foydalanuvchi ma'lumotini <code>innerHTML</code> orqali yozish. <code>innerHTML</code> berilgan satrni <strong>HTML sifatida talqin qiladi</strong>, ya'ni undagi teglar va skriptlar ishlaydi." },
        { p: "Yechim oddiy: matn ko'rsatish kerak bo'lsa, <code>textContent</code> ishlating. U berilgan qiymatni <strong>faqat matn</strong> deb qabul qiladi va hech qanday HTMLni bajarmaydi:" },
        { code: [
          "// ZAIF: innerHTML kiritmani HTML deb talqin qiladi",
          "element.innerHTML = foydalanuvchiIzohi; // xavfli!",
          "",
          "// XAVFSIZ: textContent kiritmani faqat matn deb oladi",
          "element.textContent = foydalanuvchiIzohi; // xavfsiz"
        ].join("\n") },
        { warn: "Foydalanuvchi kiritmasini hech qachon <code>innerHTML</code> ga (yoki xom HTML quruvchi boshqa usulga) to'g'ridan-to'g'ri qo'ymang. Agar matn kerak bo'lsa — <code>textContent</code>; agar boyitilgan HTML kerak bo'lsa — ishonchli sanitizatsiya kutubxonasidan o'tkazing." },

        { h2: "HTML escaping va xavfsiz DOM yozishni modellashtirish" },
        { p: "Quyidagi misolda biz oddiy HTML escaping funksiyasini yozamiz va xavfli hamda xavfsiz yondashuvni solishtiramiz. Bu sof mantiqiy misol — u brauzersiz, satrlar ustida ishlaydi:" },
        { pg: [
          "// Kontekst: HTML matni ichida escaping",
          "function htmlEscape(matn) {",
          "  return String(matn)",
          "    .replace(/&/g, '&amp;')",
          "    .replace(/</g, '&lt;')",
          "    .replace(/>/g, '&gt;')",
          "    .replace(/\"/g, '&quot;')",
          "    .replace(/'/g, '&#39;');",
          "}",
          "",
          "const foydalanuvchiKiritmasi = '<b>salom</b> & \"xayr\"';",
          "",
          "// XAVFLI g'oya: kiritmani xom holda HTMLga qo'yish",
          "const xavfli = '<p>' + foydalanuvchiKiritmasi + '</p>';",
          "console.log('Xavfli:', xavfli);",
          "",
          "// XAVFSIZ g'oya: kiritmani avval escape qilish",
          "const xavfsiz = '<p>' + htmlEscape(foydalanuvchiKiritmasi) + '</p>';",
          "console.log('Xavfsiz:', xavfsiz);"
        ].join("\n"), file: "html-escape.js" },
        { p: "Natijaga qarang: xavfsiz variantda <code>&lt;b&gt;</code> teg emas, oddiy matn bo'lib qoladi. Brauzer uni ko'rsatganda foydalanuvchi <code>&lt;b&gt;salom&lt;/b&gt;</code> degan yozuvni ko'radi, skript esa ishlamaydi." },
        { note: "Amaliyotda o'z escaping funksiyangizni yozishdan ko'ra sinovdan o'tgan kutubxonalarga (yoki React kabi avtomatik escaping qiladigan freymvorklarga) tayanish afzal. Yuqoridagi misol tamoyilni <em>tushunish</em> uchun keltirilgan." },

        { h2: "CSP — Content Security Policy" },
        { p: "<strong>CSP</strong> (Content Security Policy) — bu qo'shimcha himoya qatlami bo'lib, brauzerga qaysi manbalardan skript, stil va boshqa resurslar yuklashga ruxsat borligini aytadi. Maxsus HTTP sarlavhasi orqali o'rnatiladi." },
        { p: "CSP to'g'ri sozlansa, hatto XSS zaifligi qolib ketgan taqdirda ham, u begona skriptning bajarilishiga to'sqinlik qilishi mumkin:" },
        { ul: [
          "<strong>Inline skriptni cheklaydi:</strong> sahifaga bevosita joylangan <code>&lt;script&gt;</code> bloklarini bloklash mumkin;",
          "<strong>Manbalarni cheklaydi:</strong> faqat ishonchli domenlardan resurs yuklashga ruxsat berish;",
          "<strong>Chuqurlashtirilgan himoya:</strong> CSP — asosiy himoya emas, balki qo'shimcha qatlam; escaping baribir shart."
        ] },
        { tip: "CSPni \"yagona yechim\" deb qaramang. U kuchli qatlam, lekin uni to'g'ri escaping va sanitizatsiya bilan <strong>birga</strong> ishlatish kerak. Bitta qatlamga tayanmang." },

        { h2: "Qo'shimcha himoya qatlamlari" },
        { ul: [
          "<strong>Input sanitizatsiya:</strong> agar foydalanuvchidan boyitilgan HTML qabul qilish zarur bo'lsa (masalan, matn muharriri), uni ishonchli sanitizatsiya kutubxonasidan o'tkazib, faqat xavfsiz teglarga ruxsat bering;",
          "<strong>HttpOnly cookie:</strong> sessiya cookie'sini <code>HttpOnly</code> bilan belgilang — shunda JavaScript unga umuman kira olmaydi, bu sessiya o'g'irlanishini qiyinlashtiradi;",
          "<strong>Secure va SameSite:</strong> cookie'ni <code>Secure</code> (faqat HTTPS) va <code>SameSite</code> bilan qo'shimcha himoyalang;",
          "<strong>Freymvorkka ishoning:</strong> React, Vue, Angular kabi zamonaviy freymvorklar standart holatda chiqishni escape qiladi — ularning himoyasini <code>dangerouslySetInnerHTML</code> kabi usullar bilan chetlab o'tmang."
        ] },
        { p: "Yakuniy fikr: XSSga qarshi kurashning kaliti — <strong>ma'lumotni doim ma'lumot deb ushlab turish</strong> va uni hech qachon kod sifatida talqin qilinishiga yo'l qo'ymaslikdir." }
      ]
    },

    {
      slug: "csrf-ssrf",
      title: "CSRF va SSRF",
      blurb: "CSRF konsepti va himoyasi (token, SameSite, qayta tasdiq), SSRF konsepti va himoyasi (allowlist, ichki manzil bloklash), ikkalasining farqi.",
      body: [
        { lead: "Ikkala zaiflik ham nomida \"soxta so'rov\" g'oyasini olib yuradi, lekin ular butunlay boshqa tomonga qaratilgan. <strong>CSRF</strong>da foydalanuvchining brauzeri aldanadi; <strong>SSRF</strong>da esa serverning o'zi aldanadi. Bu darsda biz har ikkalasini konseptual tushunamiz, aniq farqini ajratamiz va tegishli himoya usullarini o'rganamiz." },

        { h2: "CSRF nima?" },
        { p: "<strong>CSRF</strong> (Cross-Site Request Forgery) — bu zaiflikda hujumchi foydalanuvchining <em>brauzerini</em> uning nomidan soxta so'rov yuborishga aldaydi. G'oyaning ildizi shundaki, brauzer ba'zi so'rovlarga cookie'ni (jumladan sessiya cookie'sini) <strong>avtomatik</strong> qo'shib yuboradi." },
        { p: "Tasavvur qiling: foydalanuvchi biror saytga kirgan (sessiyasi faol). Keyin u boshqa, zararli sahifani ochsa va o'sha sahifa yashirin ravishda birinchi saytga so'rov yuborsa, brauzer sessiya cookie'sini avtomatik qo'shadi — server esa buni haqiqiy foydalanuvchi so'rovi deb qabul qiladi." },
        { note: "CSRFning mohiyati — <strong>hujumchi javobni ko'rmaydi</strong>, u faqat biror <em>amal</em>ni (masalan, sozlamani o'zgartirish yoki pul o'tkazish) foydalanuvchi nomidan bajartiradi. Shuning uchun himoya \"bu so'rov haqiqatan foydalanuvchining ongli xohishimi?\" degan savolga qaratiladi." },

        { h2: "CSRF himoyasi" },
        { p: "CSRFga qarshi bir necha samarali himoya qatlami mavjud:" },
        { h3: "1. CSRF token" },
        { p: "Server har bir forma yoki sessiya uchun tasodifiy, oldindan aytib bo'lmaydigan <strong>token</strong> yaratadi va uni sahifaga joylashtiradi. Har bir muhim so'rovda bu token qaytib kelishi shart. Zararli sayt bu tokenni bilmaydi, shuning uchun soxta so'rov rad etiladi." },
        { h3: "2. SameSite cookie" },
        { p: "<code>SameSite</code> atributi cookie'ning boshqa saytdan kelgan so'rovlarga qo'shilishini cheklaydi. <code>SameSite=Lax</code> yoki <code>Strict</code> qo'yilsa, brauzer begona saytdan yuborilgan so'rovga sessiya cookie'sini qo'shmaydi — bu CSRFning asosini yo'q qiladi." },
        { h3: "3. Muhim amallar uchun qayta tasdiq" },
        { p: "Eng jiddiy amallar (parol o'zgartirish, pul o'tkazish) uchun parolni qayta so'rash yoki qo'shimcha tasdiq (masalan, ikki bosqichli) talab qilish qo'shimcha himoya beradi." },
        { code: [
          "// XAVFSIZ g'oya: SameSite va HttpOnly bilan cookie o'rnatish",
          "res.cookie('sessiya', sessiyaId, {",
          "  httpOnly: true,   // JavaScript o'qiy olmaydi",
          "  secure: true,     // faqat HTTPS orqali",
          "  sameSite: 'lax'   // begona saytdan so'rovga qo'shilmaydi",
          "});"
        ].join("\n") },

        { h2: "SSRF nima?" },
        { p: "<strong>SSRF</strong> (Server-Side Request Forgery) — bu zaiflikda hujumchi <em>serverni</em> aldab, uni o'zi tanlagan manzilga so'rov yuborishga majburlaydi. Bu odatda dastur foydalanuvchidan URL qabul qilib, o'sha manzilga so'rov yuboradigan joylarda yuzaga keladi (masalan, \"URL orqali rasm yuklash\" funksiyasi)." },
        { p: "SSRF nima uchun xavfli? Chunki server ko'pincha <strong>ichki tarmoqda</strong> joylashgan bo'lib, tashqi olamga ko'rinmaydigan resurslarga (ichki xizmatlar, ma'lumotlar bazasi, bulut metadata xizmati) kira oladi. Hujumchi serverni shu ichki manzillarga so'rov yuborishga majburlab, ma'lumotga yetib olishi mumkin." },

        { h2: "SSRF himoyasi" },
        { p: "SSRFga qarshi himoya foydalanuvchi bergan manzilga ishonmaslikka asoslanadi:" },
        { ul: [
          "<strong>URL allowlist:</strong> faqat oldindan belgilangan, ishonchli domenlarga so'rov yuborishga ruxsat bering — qora ro'yxat (blocklist) emas, oq ro'yxat (allowlist);",
          "<strong>Ichki manzillarni bloklang:</strong> <code>localhost</code>, <code>127.0.0.1</code>, xususiy IP diapazonlariga va boshqa ichki manzillarga so'rovni taqiqlang;",
          "<strong>Metadata endpointini himoyalang:</strong> bulut muhitidagi metadata xizmatiga (maxfiy ma'lumot beruvchi ichki manzil) kirishni alohida bloklang;",
          "<strong>Yo'naltirishlarni cheklang:</strong> so'rov ichki manzilga qayta yo'naltirilib ketmasligini tekshiring."
        ] },
        { warn: "SSRF himoyasida qora ro'yxat (masalan, faqat <code>127.0.0.1</code> ni bloklash) yetarli emas — ichki manzilni ifodalash usullari juda ko'p. Ishonchli yechim — <strong>allowlist</strong>: faqat aniq ruxsat berilgan manzillarga yo'l ochish." },

        { h2: "Himoya g'oyasini modellashtirish" },
        { p: "Quyidagi misolda biz ikki himoyani — CSRF token tekshiruvi va SSRF uchun URL allowlist — sof mantiq sifatida ko'rsatamiz:" },
        { pg: [
          "// --- CSRF: token tekshirish g'oyasi ---",
          "function csrfTekshir(sessiyaToken, sorovToken) {",
          "  if (!sessiyaToken || !sorovToken) return false;",
          "  return sessiyaToken === sorovToken;",
          "}",
          "",
          "const serverToken = 'a1b2c3-tasodifiy';",
          "console.log('Togri token:', csrfTekshir(serverToken, 'a1b2c3-tasodifiy'));",
          "console.log('Soxta token:', csrfTekshir(serverToken, 'soxta'));",
          "",
          "// --- SSRF: URL allowlist g'oyasi ---",
          "function hostRuxsatmi(host) {",
          "  const oqRoyxat = ['api.ishonchli.uz', 'cdn.ishonchli.uz'];",
          "  return oqRoyxat.includes(host);",
          "}",
          "",
          "console.log('Ishonchli host:', hostRuxsatmi('api.ishonchli.uz'));",
          "console.log('Ichki host:', hostRuxsatmi('localhost'));"
        ].join("\n"), file: "csrf-ssrf-himoya.js" },
        { p: "E'tibor bering: CSRF himoyasida biz \"so'rovda kelgan token serverdagi bilan mos keladimi?\" degan savolga javob beramiz. SSRF himoyasida esa \"bu manzil oq ro'yxatda bormi?\" degan savolga. Ikkalasi ham — ishonchsiz kiritmani tekshirishning ko'rinishlari." },

        { h2: "CSRF va SSRFning farqi" },
        { p: "Nomlari o'xshash bo'lgani uchun bu ikkisi tez-tez chalkashtiriladi. Asosiy farqi — <strong>kim aldanadi va so'rov qayerdan boshlanadi</strong>:" },
        { ul: [
          "<strong>CSRF:</strong> aldangani — foydalanuvchining <em>brauzeri</em>. So'rov qurbonning brauzeridan chiqadi. Hujumchi foydalanuvchi <em>nomidan</em> amal bajartiradi;",
          "<strong>SSRF:</strong> aldangani — <em>server</em>. So'rov serverdan chiqadi. Hujumchi serverni ichki resurslarga so'rov yuborishga majburlaydi;",
          "<strong>Maqsad farqi:</strong> CSRF — foydalanuvchi nomidan amal; SSRF — server orqali ichki tarmoqqa kirish;",
          "<strong>Himoya farqi:</strong> CSRF — token va SameSite cookie; SSRF — URL allowlist va ichki manzil bloklash."
        ] },
        { note: "Ikkalasining umumiy sababi bir xil: <strong>ishonchsiz kiritma yoki so'rov to'g'riligini yetarli tekshirmaslik</strong>. Himoya ham shu tamoyilga — har bir so'rovni tasdiqlash va tekshirishga — asoslanadi." }
      ]
    },

    {
      slug: "xavfsizlik-nosozliklari",
      title: "Security Misconfiguration, XXE va boshqalar",
      blurb: "Xavfsizlik noto'g'ri sozlangani, maxfiy ma'lumot oshkorligi, XXE, ishonchsiz deserializatsiya, xavfsizlik sarlavhalari va xavfsiz standart sozlama cheklisti.",
      body: [
        { lead: "Ba'zan zaiflik kodning o'zida emas, balki tizim <em>qanday sozlanganida</em> yashiringan bo'ladi. Standart parol o'zgartirilmagan, xato xabari haddan ziyod ko'p ma'lumot beryapti, eskirgan paket yamalmagan — bularning barchasi hujumchiga eshik ochadi. Bu yakuniy darsda biz konfiguratsiya va sozlash bilan bog'liq zaifliklarni hamda ularning himoyasini ko'rib chiqamiz." },

        { h2: "Security Misconfiguration" },
        { p: "<strong>Xavfsizlik noto'g'ri sozlangani</strong> (Security Misconfiguration) — OWASP Top 10ning eng keng tarqalgan bandlaridan biri. U kodda emas, balki tizim, server yoki freymvork sozlamalarida qoldirilgan kamchiliklardan iborat." },
        { p: "Eng ko'p uchraydigan ko'rinishlari:" },
        { ul: [
          "<strong>Standart parollar:</strong> admin panel yoki ma'lumotlar bazasi standart login/parol bilan qolgan;",
          "<strong>Ochiq portlar va xizmatlar:</strong> kerak bo'lmagan xizmatlar tashqi olamga ochiq;",
          "<strong>Batafsil xato xabarlari:</strong> foydalanuvchiga to'liq xato izi (stack trace), fayl yo'llari yoki baza tuzilishi ko'rsatiladi;",
          "<strong>Yangilanmagan paketlar:</strong> ma'lum zaiflikka ega eski kutubxonalar ishlatilmoqda;",
          "<strong>Ortiqcha ruxsatlar:</strong> katalog ro'yxati ochiq, debug rejimi ishga tushirilgan holda qolgan."
        ] },
        { p: "Himoyasi — har bir sozlamani ongli tekshirish:" },
        { ul: [
          "Barcha standart parollarni o'zgartiring va kuchli parollar qo'ying;",
          "Ishlatmaydigan xizmat va portlarni o'chiring;",
          "Foydalanuvchiga umumiy, qisqa xato xabari ko'rsating; to'liq tafsilotni faqat serverda logga yozing;",
          "Debug rejimini ishlab chiqarish (production) muhitida o'chiring."
        ] },

        { h2: "Sezgir ma'lumotni oshkor qilish" },
        { p: "Maxfiy ma'lumot — parollar, API kalitlari, tokenlar, shaxsiy ma'lumot — noto'g'ri joyda saqlansa yoki tashqariga chiqib ketsa jiddiy muammo. Ikki keng tarqalgan xato:" },
        { ul: [
          "<strong>Kodda yashirin sirlar (secrets):</strong> API kaliti yoki parolni to'g'ridan-to'g'ri kodga yozib, uni versiya nazorati (git) ga jo'natish;",
          "<strong>Logda maxfiy ma'lumot:</strong> parol, token yoki karta raqamini logga yozib qo'yish."
        ] },
        { code: [
          "// ZAIF: sir to'g'ridan-to'g'ri kodda",
          "const apiKalit = 'sk_live_123456789maxfiy';",
          "",
          "// XAVFSIZ: sir muhit o'zgaruvchisidan olinadi",
          "const apiKalit2 = process.env.API_KALIT;",
          "// .env fayli git'ga JO'NATILMAYDI (.gitignore ga qo'shiladi)"
        ].join("\n") },
        { ul: [
          "Sirlarni <strong>muhit o'zgaruvchilarida</strong> (environment variables) yoki maxsus sir-boshqaruv tizimida saqlang;",
          "<code>.env</code> faylini <code>.gitignore</code>ga qo'shing — u hech qachon repozitoriyga tushmasin;",
          "Logga yozishdan oldin maxfiy maydonlarni (parol, token) niqoblang yoki olib tashlang;",
          "Agar sir tasodifan oshkor bo'lsa, uni darhol <strong>bekor qilib, yangisini yarating</strong>."
        ] },
        { warn: "Bir marta git tarixiga tushgan sir \"o'chirib tashladim\" desangiz ham tarixda qolaveradi. Yagona to'g'ri javob — o'sha sirni darhol bekor qilib (revoke), yangi kalit yaratishdir." },

        { p: "Log yozishdan oldin maxfiy maydonlarni niqoblash g'oyasini kod bilan ko'raylik. Quyidagi demo obyektdan sezgir maydonlarni logga chiqishdan avval yashiradi:" },
        { pg: [
          "// Logga tushmasligi kerak bo'lgan maydonlar",
          "const maxfiyMaydonlar = ['parol', 'token', 'karta'];",
          "",
          "function logUchunTozala(obyekt) {",
          "  const natija = {};",
          "  for (const kalit in obyekt) {",
          "    if (maxfiyMaydonlar.includes(kalit)) {",
          "      natija[kalit] = '***niqoblangan***';",
          "    } else {",
          "      natija[kalit] = obyekt[kalit];",
          "    }",
          "  }",
          "  return natija;",
          "}",
          "",
          "const sorov = {",
          "  foydalanuvchi: 'aziz',",
          "  parol: 'juda-maxfiy-123',",
          "  token: 'abc.def.ghi'",
          "};",
          "",
          "// Xavfsiz: logga tozalangan nusxa yoziladi",
          "console.log('Log:', logUchunTozala(sorov));"
        ].join("\n"), file: "log-tozalash.js" },
        { p: "Endi log faylida parol yoki token ko'rinmaydi. Bu — maxfiy ma'lumot oshkorligining oldini olishning oddiy, ammo samarali usulidir." },

        { h2: "XXE — XML External Entity" },
        { p: "<strong>XXE</strong> (XML External Entity) — XMLni qayta ishlovchi dasturlarda uchraydigan zaiflik. XML formati \"tashqi obyekt\" (external entity) degan xususiyatni qo'llab-quvvatlaydi, bu esa hujjat tashqi manbaga murojaat qilishga imkon beradi." },
        { p: "Agar XML tahlilchisi (parser) tashqi obyektlarni yoqilgan holda ishlasa, hujumchi maxsus tuzilgan XML orqali serverni tashqi yoki ichki resurslarni o'qishga majburlashi mumkin — bu SSRFga o'xshash natijaga olib keladi." },
        { p: "Himoyasi konseptual jihatdan oddiy — <strong>tashqi obyektlarni o'chirish</strong>:" },
        { ul: [
          "XML tahlilchisida tashqi obyekt (external entity) va DTD qayta ishlashni o'chirib qo'ying;",
          "Iloji bo'lsa, XML o'rniga soddaroq va xavfsizroq format (masalan, JSON) ishlating;",
          "XML tahlilchisini xavfsiz standart sozlamada ishga tushiring."
        ] },
        { note: "Zamonaviy ko'plab XML kutubxonalari tashqi obyektlarni standart holatda o'chirib qo'ygan. Ammo bunga ishonch hosil qilish — sizning zimmangizda. \"Standart xavfsiz\" degan taxminni har doim tekshiring." },

        { h2: "Ishonchsiz deserializatsiya" },
        { p: "<strong>Deserializatsiya</strong> — saqlangan yoki uzatilgan ma'lumotni (masalan, matn) qaytadan dastur obyektiga aylantirish jarayoni. Agar dastur <em>ishonchsiz manbadan</em> kelgan ma'lumotni tekshirmasdan deserializatsiya qilsa, hujumchi maxsus tuzilgan ma'lumot orqali dasturning kutilmagan tarzda ishlashiga sabab bo'lishi mumkin." },
        { ul: [
          "Ishonchsiz manbadan kelgan ma'lumotni <strong>hech qachon</strong> ko'r-ko'rona deserializatsiya qilmang;",
          "Ma'lumot butunligini tekshiring (masalan, imzo yoki tekshiruv summasi bilan);",
          "Iloji bo'lsa, faqat ma'lumot tashuvchi oddiy formatdan (JSONni sxema validatsiyasi bilan) foydalaning, ijro etuvchi formatlardan emas."
        ] },

        { h2: "Xavfsizlik sarlavhalari" },
        { p: "HTTP javob sarlavhalari brauzerga qo'shimcha himoya ko'rsatmalari berishda muhim rol o'ynaydi. Ular arzon, ammo samarali qatlam:" },
        { ul: [
          "<strong>Content-Security-Policy:</strong> resurslar qayerdan yuklanishini cheklaydi (XSSga qarshi);",
          "<strong>Strict-Transport-Security:</strong> brauzerni faqat HTTPS ishlatishga majburlaydi;",
          "<strong>X-Content-Type-Options:</strong> brauzerni kontent turini \"taxmin qilishdan\" to'xtatadi;",
          "<strong>X-Frame-Options:</strong> sahifani begona freymda ochilishdan himoya qiladi (clickjackingga qarshi)."
        ] },
        { tip: "Express ilovasida <code>helmet</code> kabi kutubxonalar bu xavfsizlik sarlavhalarini avtomatik o'rnatib beradi. Bir qator kod bilan bir necha himoya qatlamini qo'shish mumkin — bu arzon va foydali odat." },

        { h2: "Xavfsiz standart sozlama cheklisti" },
        { p: "Yakunda, konfiguratsiya bilan bog'liq zaifliklardan himoyalanish uchun umumiy cheklist:" },
        { ul: [
          "<strong>Standart parollarni o'zgartiring:</strong> hech bir tizim zavod sozlamasida qolmasin;",
          "<strong>Keraksiz narsani o'chiring:</strong> ishlatmaydigan xizmat, port, funksiya va debug rejimini o'chiring;",
          "<strong>Sirlarni ajrating:</strong> API kalit va parollarni koddan emas, muhit o'zgaruvchisidan oling;",
          "<strong>Xato xabarini cheklang:</strong> foydalanuvchiga qisqa xabar, logga to'liq tafsilot;",
          "<strong>Paketlarni yangilab turing:</strong> <code>npm audit</code> orqali zaif bog'liqliklarni muntazam tekshiring;",
          "<strong>Xavfsizlik sarlavhalarini qo'shing:</strong> <code>helmet</code> yoki teng vositalar bilan;",
          "<strong>Tashqi obyektni o'chiring:</strong> XML ishlatsangiz, external entityni yoqmang;",
          "<strong>Xavfsiz standartni tanlang:</strong> tizimni eng cheklangan holatda ishga tushirib, keyin kerak bo'lsa oching."
        ] },
        { tip: "Bitta oltin qoida bilan yakunlaymiz: <strong>standart sozlamalar ko'pincha xavfsiz emas</strong> — ular qulaylik uchun ochiq qilib qo'yilgan bo'ladi. Har bir tizimni ishga tushirganda uni ongli ravishda qattiqlashtiring (harden), \"ishlayapti\" degani \"xavfsiz\" degani emasligini unutmang." },
        { note: "Ushbu bob davomida biz OWASP Top 10ning eng muhim bandlarini — kirish nazorati, Injection, XSS, CSRF/SSRF va noto'g'ri sozlashni — himoya nuqtai nazaridan ko'rib chiqdik. Esda tuting: xavfsizlik — bir martalik ish emas, balki doimiy jarayon. Kiritmaga ishonmang, har qatlamda tekshiring va tizimlaringizni muntazam yangilab, qattiqlashtirib turing." }
      ]
    }
  ]
};
