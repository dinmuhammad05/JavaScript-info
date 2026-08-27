"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Amaliy himoya va DevSecOps",
  lessons: [
    {
      slug: "xavfsiz-kod-yozish",
      title: "Xavfsiz kod yozish tamoyillari",
      blurb: "Xavfsizlik dasturchining o'z ishi ekanligi, asosiy tamoyillar, kirish validatsiyasi, sirlarni saqlash va xavfsizlik nuqtai nazaridan kod sharhi.",
      body: [
        { lead: "Ko'pincha dasturchilar shunday o'ylaydi: \"Xavfsizlik — bu xavfsizlik jamoasining ishi, mening vazifam esa faqat funksiyalarni ishlashga majbur qilish\". Bu — eng keng tarqalgan va eng qimmatga tushadigan yanglishuv. Aslida har bir yozgan qatoringiz — himoyaning bir bo'lagi. Zaiflik biror ekzotik joyda emas, aynan oddiy, e'tibordan chetda qolgan kodda tug'iladi. Shu bois xavfsiz kod yozishni o'rganish — sizning kasbiy mahoratingizning ajralmas qismi." },

        { h2: "Nega bu aynan sizning ishingiz" },
        { p: "Tasavvur qiling: siz forma yaratdingiz, u ishlaydi, ma'lumotni bazaga yozadi. Test o'tdi, hamma xursand. Ammo siz foydalanuvchi kiritmasini tekshirmadingiz — va oradan bir oy o'tib o'sha forma orqali butun baza o'g'irlanadi. Kod \"ishlaydi\" degani \"xavfsiz\" degani emas. Funksionallik — bu ilovaning nima qilishi; xavfsizlik — bu ilovaning <em>qila olmasligi kerak bo'lgan</em> narsalar. Ikkalasi ham dasturchining zimmasida." },
        { p: "Yaxshi xabar shuki, xavfsiz kod yozish sehr emas. U bir nechta oddiy, ammo doimiy amal qilinadigan tamoyillarga tayanadi. Ularni bir marta yodda mustahkamlab olsangiz, refleksga aylanadi." },

        { h2: "Asosiy tamoyillar" },
        { p: "Quyidagi tamoyillar deyarli har qanday tilda va har qanday loyihada amal qiladi. Bularni devoringizga osib qo'ysangiz arziydi:" },
        { ul: [
          "<strong>Hech qanday kirishga ishonmang</strong> — foydalanuvchidan, tashqi API'dan, URL'dan, hatto o'z bazangizdan kelgan har qanday ma'lumotni potensial xavfli deb hisoblang va uni validatsiya qiling;",
          "<strong>Chiqishni escape qiling</strong> — ma'lumotni HTML'ga, SQL'ga yoki buyruq qatoriga joylashdan oldin, o'sha kontekstga mos ravishda \"zararsizlantiring\" (escaping);",
          "<strong>Eng kam imtiyoz (least privilege)</strong> — har bir komponent, foydalanuvchi va jarayon faqat o'z ishi uchun zarur bo'lgan minimal huquqqa ega bo'lsin, undan ortig'iga emas;",
          "<strong>Chuqur himoya (defense in depth)</strong> — bitta himoya qatoriga tayanmang; agar bittasi buzilsa, ortidagi ikkinchi, uchinchi qator ushlab qolsin;",
          "<strong>Xavfsiz standart (secure by default)</strong> — sozlamalarning boshlang'ich holati eng xavfsiz variant bo'lsin; foydalanuvchi xohlasa himoyani bo'shatsin, aksincha emas;",
          "<strong>Xatolarni xavfsiz boshqaring</strong> — xatolik yuz berganda tizim ochilib qolmasin (fail securely), va xatoning ichki tafsilotlari (stack, so'rov, yo'l) foydalanuvchiga ko'rsatilmasin."
        ] },

        { h2: "Barcha kirishni validatsiya qiling" },
        { p: "Validatsiyaning ikki uslubi bor: <strong>bloklist</strong> (\"mana bu yomon qiymatlarni rad et\") va <strong>allowlist</strong> (\"faqat mana bu yaxshi qiymatlarga ruxsat ber, qolganini rad et\"). Bloklist deyarli har doim yomon: yomonlarning hammasini oldindan bilib bo'lmaydi. Allowlist esa ishonchli: agar qiymat ruxsat etilganlar ro'yxatida bo'lmasa, u o'tmaydi." },
        { p: "Quyida allowlist yondashuviga misol. Foydalanuvchi qaysi maydon bo'yicha saralashni tanlaydi, lekin biz faqat oldindan belgilangan maydonlarga ruxsat beramiz:" },
        { pg: "// Foydalanuvchi kiritmasini to'g'ridan-to'g'ri ishlatish XAVFLI.\n// Buning o'rniga allowlist ishlatamiz.\n\nconst RUXSAT_ETILGAN_MAYDONLAR = [\"nom\", \"sana\", \"narx\"];\n\nfunction saralashMaydonini_tekshir(kirish) {\n  if (RUXSAT_ETILGAN_MAYDONLAR.includes(kirish)) {\n    return kirish; // xavfsiz, ma'lum qiymat\n  }\n  // Ro'yxatda yo'q — xavfsiz standartga qaytamiz\n  return \"nom\";\n}\n\nconsole.log(saralashMaydonini_tekshir(\"narx\"));\n// narx\n\nconsole.log(saralashMaydonini_tekshir(\"parol; DROP TABLE users\"));\n// nom  (zararli kiritma rad etildi)\n\nconsole.log(saralashMaydonini_tekshir(\"__proto__\"));\n// nom  (kutilmagan qiymat ham to'sildi)", file: "allowlist.js" },
        { p: "E'tibor bering: biz \"yomon\"ni topishga urinmadik. Biz shunchaki \"yaxshi\"ning ro'yxatini tuzdik va qolganini rad etdik. Bu yondashuv soddaligi bilan kuchli." },
        { tip: "Validatsiyani doim <em>serverda</em> bajaring. Brauzerdagi (klient tomondagi) tekshiruv — bu foydalanuvchi qulayligi uchun, xavfsizlik uchun emas: hujumchi brauzerni chetlab o'tib, serverga to'g'ridan-to'g'ri so'rov yubora oladi." },

        { h2: "Sirlarni kodda saqlamang" },
        { p: "Parollar, API kalitlari, tokenlar, bazaga ulanish satrlari — bularning hech biri kod ichida yozilmasligi kerak. Manba kodiga yozilgan sir bir marta git tarixiga tushsa, uni o'chirish deyarli imkonsiz: u forklarda, klonlarda, backuplarda qoladi." },
        { p: "Sirlar muhit o'zgaruvchilari (<code>environment variables</code>) yoki maxsus sir menejerlari orqali beriladi. Kod esa faqat o'sha o'zgaruvchini o'qiydi:" },
        { code: "// YOMON — sir kodda:\nconst kalit = \"sk_live_9f2a...\";  // hech qachon bunday qilmang!\n\n// YAXSHI — sir muhitdan o'qiladi:\nconst kalit = process.env.API_KALIT;\nif (!kalit) {\n  throw new Error(\"API_KALIT o'rnatilmagan\");\n}" },
        { warn: "Sirlarni saqlaydigan <code>.env</code> faylini har doim <code>.gitignore</code>ga qo'shing. Aks holda u tasodifan repozitoriyga tushib qoladi. Agar sir bir marta oshkor bo'lsa — uni darhol bekor qiling (revoke) va yangisini yarating; \"kim ko'ribdi\" deb umid qilib qo'yib bo'lmaydi." },

        { h2: "Xavfsizlikni yodda tutgan kod sharhi" },
        { p: "Kod sharhi (code review) — nafaqat sifat, balki xavfsizlik uchun ham eng arzon va eng samarali vositalardan biri. Sherigingizning ko'zi siz ko'rmagan zaiflikni ilg'aydi. Sharh paytida quyidagi savollarni bering:" },
        { ul: [
          "Bu funksiyaga qaysi ma'lumot tashqaridan kiradi va u validatsiya qilinganmi?",
          "Ma'lumot chiqishga (HTML, SQL, log, buyruq) joylashdan oldin escape qilinganmi?",
          "Bu yerda biror sir yoki maxfiy ma'lumot kodga yoki logga tushib qolmayaptimi?",
          "Xatolik yuz berganda tizim xavfsiz holatda qoladimi yoki ochilib qoladimi?",
          "Bu foydalanuvchiga haqiqatan shu amalni bajarishga ruxsat bormi (avtorizatsiya tekshirilganmi)?"
        ] },
        { p: "Bu savollarni har bir Pull Request'da takrorlash — jamoa madaniyatiga aylansa, zaifliklarning katta qismi kodga umuman kirmaydi." },

        { h2: "Xulosa" },
        { p: "Xavfsiz kod yozish — alohida bosqich emas, balki har bir qatorni yozishdagi fikrlash tarzidir. Kirishga ishonmaslik, chiqishni escape qilish, eng kam imtiyoz va chuqur himoya — bu to'rt tayanch sizni zaifliklarning aksariyatidan asraydi." },
        { tip: "Xavfsizlik — bu \"keyin qo'shiladigan xususiyat\" emas. Uni loyiha oxirida yamoq sifatida yopishtirib bo'lmaydi. U birinchi qatordan boshlab, arxitekturaning bir qismi bo'lishi kerak. Boshidan xavfsiz o'ylagan kod — keyin qayta yozishga to'g'ri kelmaydigan kod." }
      ]
    },
    {
      slug: "dependency-xavfsizlik",
      title: "Bog'liqliklar xavfsizligi (npm audit, SCA)",
      blurb: "Uchinchi tomon paketlaridagi ma'lum zaifliklar, npm audit, SCA g'oyasi, avtomatik yangilash va supply chain hujumlaridan himoya.",
      body: [
        { lead: "Zamonaviy JavaScript loyihasini oching-da, <code>node_modules</code> jildiga qarang. U yerda yuzlab, ba'zan minglab paket bor — va ularning aksariyatini siz atayin o'rnatmagansiz. Ular sizning bir nechta paketingizning bog'liqliklari (dependencies). Har bir paket — bu kimdir yozgan, sizning ilovangiz ichida ishlaydigan begona kod. Demak, har biri — potensial xavf manbai. Kodingiz qanchalik xavfsiz bo'lmasin, agar u ishonadigan paketda zaiflik bo'lsa, siz ham zaifsiz." },

        { h2: "Ma'lum zaifliklar (CVE)" },
        { p: "Xavfsizlik olamida topilgan har bir jiddiy zaiflikka rasmiy raqam beriladi — <code>CVE</code> (Common Vulnerabilities and Exposures). Masalan, mashhur bir paketda \"maxsus tuzilgan kiritma orqali serverni qotirib qo'yish mumkin\" degan zaiflik topilsa, u <code>CVE-2024-XXXXX</code> shaklida ro'yxatga olinadi va ommaga e'lon qilinadi." },
        { p: "Bu ikki tomonlama qilich. Bir tomondan — zaiflik oshkor bo'lgani yaxshi, endi uni tuzatish mumkin. Boshqa tomondan — hujumchilar ham o'sha ro'yxatni o'qiydi va eski, yangilanmagan ilovalarni qidiradi. Shu bois zaiflik e'lon qilinishi bilan yangilanish — poyga masalasiga aylanadi." },

        { h2: "npm audit — birinchi qadam" },
        { p: "Node.js ekotizimida sizda tayyor vosita bor: <code>npm audit</code>. U loyihangizdagi barcha paketlarni ma'lum zaifliklar bazasi bilan solishtiradi va hisobot beradi:" },
        { code: "# Loyihadagi zaifliklarni tekshirish:\nnpm audit\n\n# Namuna chiqishi:\n# found 3 vulnerabilities (1 low, 1 moderate, 1 high)\n#   To address them, run: npm audit fix" },
        { p: "Topilgan muammolarni ko'pincha bir buyruq bilan tuzatish mumkin — <code>npm audit</code> mos yangi (xavfsiz) versiyalarni topib o'rnatadi:" },
        { code: "# Xavfsiz yangilanishlarni avtomatik qo'llash:\nnpm audit fix\n\n# Agar katta (mos kelmaydigan) yangilanish kerak bo'lsa,\n# u xavfni tushunib turib majburlash mumkin:\nnpm audit fix --force\n#   diqqat: --force buzilishlarga olib kelishi mumkin,\n#   shuning uchun keyin testlarni albatta ishga tushiring." },
        { warn: "<code>--force</code> katta versiya sakrashlarini majburlaydi va ilovangizni buzishi mumkin. Uni faqat testlaringiz mavjud bo'lganda va natijani tekshirish imkoni borida ishlating. \"Yashil\" audit deb ko'r-ko'rona <code>--force</code> bosaverish — o'zi bir xavf." },

        { h2: "SCA — bog'liqliklar tahlili" },
        { p: "<code>npm audit</code> — <strong>SCA</strong> (<em>Software Composition Analysis</em>, dasturiy ta'minot tarkibini tahlil qilish) deb ataladigan kengroq g'oyaning oddiy ko'rinishidir. SCA'ning maqsadi — loyihangizdagi barcha uchinchi tomon komponentlarini ro'yxatga olish va ularning har birida ma'lum zaiflik yoki muammoli litsenziya bor-yo'qligini kuzatib borish." },
        { p: "Yirik loyihalarda maxsus SCA vositalari CI quvuriga ulanadi: har bir kod yuborilganda bog'liqliklar avtomatik skanerlanadi, va yangi zaiflik topilsa, jamoa darhol xabardor qilinadi. G'oya oddiy: siz ishlatayotgan kutubxonaning ichida nima borligini bilib turing." },

        { h2: "Avtomatik yangilash: Dependabot va Renovate" },
        { p: "Qo'lda har hafta <code>npm audit</code> yugurtirish charchatadi va unutiladi. Shu bois avtomatlashtiruvchi vositalar mavjud:" },
        { ul: [
          "<strong>Dependabot</strong> — GitHub'ga o'rnatilgan; bog'liqliklaringizni kuzatib turadi va yangi (xususan xavfsizlik) versiya chiqqanda avtomatik Pull Request ochadi;",
          "<strong>Renovate</strong> — shunga o'xshash, ammo yanada moslashuvchan; qaysi paketni qanchalik tez-tez yangilashni batafsil sozlash mumkin."
        ] },
        { p: "Ikkalasining ham g'oyasi bir xil: yangilanishni odam esidan chiqaradigan vazifadan — mashina bajaradigan avtomatik jarayonga aylantirish. Sizga esa faqat kelgan PR'ni ko'rib, testlar o'tganini tekshirib, tasdiqlash qoladi." },

        { h2: "Supply chain hujumlari" },
        { p: "Eng ayyor hujumlardan biri — <strong>ta'minot zanjiri (supply chain)</strong> hujumi. Bunda hujumchi sizning kodingizga emas, balki siz <em>ishonadigan</em> paketga hujum qiladi. Bir necha ko'rinishi bor:" },
        { ul: [
          "<strong>Typosquatting</strong> — mashhur paket nomiga o'xshash, bir harf farqli zararli paket joylash (masalan, haqiqiy nom o'rniga chalg'ituvchi nom). Xato yozib o'rnatgan odam zararli kodni yuklab oladi;",
          "<strong>Zararli yangilanish</strong> — hujumchi haqiqiy paketni egallab olib (masalan, muallif hisobini buzib), unga yangi \"yangilanish\"da zararli kod qo'shadi;",
          "<strong>Tashlab ketilgan paket</strong> — egasi qarovsiz qoldirgan paketni boshqa birov o'z qo'liga olib, zararli o'zgarish kiritishi."
        ] },
        { p: "Himoya konseptual jihatdan oddiy, ammo intizom talab qiladi: paket nomini o'rnatishdan oldin diqqat bilan tekshiring; paketning yuklab olinishlar soni, oxirgi yangilanishi va manba kodiga qarang; kerak bo'lmagan bog'liqlikni umuman o'rnatmang — har bir qo'shimcha paket sizning hujum yuzangizni kengaytiradi." },
        { warn: "Noma'lum yoki kam ishlatiladigan paketni tekshirmasdan o'rnatmang. Bir daqiqalik e'tibor — kutilmagan zararli koddan yaxshiroq. \"Bir paketgina-ku\" deb o'rnatilgan narsa butun tizimingizga eshik ochishi mumkin." },

        { h2: "Lock fayl nega muhim" },
        { p: "<code>package-lock.json</code> (yoki <code>yarn.lock</code>) faylining vazifasi — har bir paketning <em>aniq</em> versiyasi va hatto uning kriptografik xesh (integrity) qiymatini qayd etib qo'yish. Bu ikki narsani kafolatlaydi: siz, sherigingiz va serveringiz hammasi <em>bir xil</em> kod ustida ishlaydi; hamda o'rnatilayotgan paket yo'lda o'zgartirilmaganini xesh orqali tekshirish mumkin." },
        { p: "Shu bois lock faylni doim git'ga qo'shing va uni \"shunchaki avtomatik fayl\" deb yengil qaramang. U — sizning bog'liqliklaringiz haqiqatining muhrlangan surati." },
        { note: "Bog'liqliklar xavfsizligi bir martalik ish emas, balki doimiy jarayon. Bugun xavfsiz paket ertaga zaif deb topilishi mumkin. Shu bois audit va yangilashni loyihaning muntazam \"gigienasi\"ga aylantiring." }
      ]
    },
    {
      slug: "sast-dast-testlash",
      title: "Xavfsizlik testlash: SAST, DAST va pentest",
      blurb: "Statik va dinamik xavfsizlik tahlili, penetratsion testning etik chegaralari, mas'uliyatli oshkor qilish va legal mashq muhitlari.",
      body: [
        { lead: "Kodni xavfsiz yozishga harakat qildingiz. Ammo qaydan bilasiz — u haqiqatan xavfsizmi? Umid — strategiya emas. Xavfsizlikni ham xuddi funksionallik kabi <em>test qilish</em> kerak. Buning bir necha bosqichi bor: kodni o'qib tekshirish, ishlayotgan ilovani sinash, va tayyor tizimga hujum qilib ko'rish. Har biri o'z o'rniga ega, va ular bir-birini to'ldiradi." },

        { h2: "Ikki katta yondashuv" },
        { p: "Avtomatlashtirilgan xavfsizlik testlashning ikki asosiy turi bor, ular kodga ikki xil nuqtai nazardan qaraydi:" },
        { ul: [
          "<strong>SAST</strong> (Static Application Security Testing) — <em>statik</em> tahlil: ilovani ishga tushirmasdan, kodning o'zini o'qib tahlil qiladi;",
          "<strong>DAST</strong> (Dynamic Application Security Testing) — <em>dinamik</em> tahlil: ishlayotgan ilovaga tashqaridan so'rovlar yuborib, uning xatti-harakatini sinaydi."
        ] },
        { p: "Sodda o'xshatish: SAST — bu binoning chizmasini stol ustida ko'zdan kechirib, \"mana bu yerda devor yupqa\" deyish. DAST — bu qurilgan binoning eshiklarini itarib ko'rib, qaysi biri ochiq qolganini topish." },

        { h2: "SAST — kodni ichidan tahlil qilish" },
        { p: "SAST vositasi manba kodini o'qib, xavfli naqshlarni qidiradi: validatsiyasiz ishlatilgan foydalanuvchi kiritmasi, kodga yozib qo'yilgan parol, xavfli funksiya chaqiruvi va shu kabilar. Bu — kuchaytirilgan, xavfsizlikka ixtisoslashgan linter desak bo'ladi." },
        { p: "G'oyani tushunish uchun oddiy misol: quyidagi \"o'yinchoq\" tekshiruvchi kodda shubhali naqshlarni qidiradi. Haqiqiy vositalar (masalan, <code>semgrep</code> kabi qoidaga asoslangan tahlilchilar) ancha murakkab, ammo mohiyati shu:" },
        { pg: "// Oddiylashtirilgan \"SAST\" g'oyasi:\n// kodda xavfli naqshlarni qidiramiz.\n\nconst xavfliNaqshlar = [\n  { naqsh: /password\\s*=\\s*[\"']/i, sabab: \"Kodga yozilgan parol\" },\n  { naqsh: /eval\\s*\\(/,            sabab: \"eval() xavfli chaqiruvi\" },\n  { naqsh: /api[_-]?key\\s*=\\s*[\"']/i, sabab: \"Kodga yozilgan API kalit\" }\n];\n\nfunction skaner(kod) {\n  const topildi = [];\n  const qatorlar = kod.split(\"\\n\");\n  qatorlar.forEach((qator, i) => {\n    for (const q of xavfliNaqshlar) {\n      if (q.naqsh.test(qator)) {\n        topildi.push(\"Qator \" + (i + 1) + \": \" + q.sabab);\n      }\n    }\n  });\n  return topildi;\n}\n\nconst namunaKod = [\n  'const user = getUser();',\n  'const password = \"12345\";',\n  'eval(kirish);'\n].join(\"\\n\");\n\nconsole.log(skaner(namunaKod));\n// [ 'Qator 2: Kodga yozilgan parol', 'Qator 3: eval() xavfli chaqiruvi' ]", file: "sast-goya.js" },
        { p: "SAST'ning kuchi — u kodni to'liq ko'radi va ilovani ishga tushirishdan oldin, hatto CI bosqichidayoq ogohlantiradi. Kamchiligi — u ba'zan \"yolg'on signal\" (false positive) beradi: shubhali ko'ringan, aslida xavfsiz kodni ham belgilashi mumkin." },

        { h2: "DAST — ishlayotgan ilovani sinash" },
        { p: "DAST kodni umuman ko'rmaydi. U ilovaga xuddi hujumchi kabi tashqaridan qaraydi: turli so'rovlar, g'ayrioddiy kiritmalar yuboradi va javobga qarab zaiflik borligini aniqlashga urinadi. Masalan, formaga maxsus belgilar yuborib, ilova ularni to'g'ri qayta ishlayaptimi yoki xato beryaptimi kuzatadi." },
        { p: "DAST'ning kuchi — u haqiqiy, ishlayotgan tizimning haqiqiy xulq-atvorini sinaydi; kod qanday yozilganidan qat'i nazar, natijani ko'radi. Kamchiligi — u ilova ishga tushib turishini talab qiladi va faqat tashqaridan yetib boradigan qismlarni sinay oladi." },

        { h2: "Qaysi biri, qachon" },
        { p: "To'g'ri javob — ikkalasi ham. Ular bir-birini almashtirmaydi, to'ldiradi:" },
        { ul: [
          "SAST'ni <em>erta</em> ishlating — kod yozilishi bilan, CI'da, muammoni arzon paytida ushlash uchun;",
          "DAST'ni ilova ishga tushgach ishlating — real muhitda qoladigan zaifliklarni topish uchun;",
          "Eng yaxshi natija — ikkalasini birga, doimiy jarayon sifatida qo'llaganda beriladi."
        ] },

        { h2: "Penetratsion test (etik va ruxsat bilan)" },
        { p: "<strong>Penetratsion test</strong> (qisqacha pentest) — bu vakolatli mutaxassisning, egasining <em>yozma ruxsati bilan</em>, tizimga xuddi haqiqiy hujumchidek bostirib kirishga urinishi. Maqsad — zaiflikni yomon niyatli odamdan oldin topib, uni tuzatish. Bu — himoyaning eng ilg'or shakllaridan biri." },
        { p: "Ammo bu yerda eng muhim so'z — <strong>ruxsat</strong>. Pentest'ni etik qiladigan narsa — texnikasi emas, balki ruxsati. Aynan bir xil harakat: ruxsat bilan bo'lsa — qadrli kasb; ruxsatsiz bo'lsa — jinoyat. Chegara mana shu yerda o'tadi." },
        { warn: "Faqat o'zingizga tegishli yoki egasidan yozma ruxsat olingan tizimni test qiling. Boshqaning tizimiga ruxsatsiz kirishga urinish — hatto \"yordam bermoqchi edim\" niyatida bo'lsa ham — ko'p mamlakatlarda jinoyat hisoblanadi. Niyat sizni himoya qilmaydi; ruxsat qiladi." },

        { h2: "Mas'uliyatli oshkor qilish" },
        { p: "Aytaylik, siz biror saytda tasodifan zaiflikni sezib qoldingiz. To'g'ri yo'l — <strong>mas'uliyatli oshkor qilish</strong> (responsible disclosure): zaiflikni ommaga e'lon qilmasdan, avval sekin va maxfiy tarzda tizim egasiga xabar berish, ularga tuzatish uchun vaqt berish. Ko'p kompaniyalar buning uchun maxsus dastur (bug bounty) va aloqa kanaliga ega." },
        { p: "Zaiflikni ijtimoiy tarmoqda maqtanib e'lon qilish yoki suiiste'mol qilish — hujumchining yo'li. Uni tinchgina egasiga yetkazish — himoyachining yo'li. Farq — niyat va usulda." },

        { h2: "Legal mashq muhitlari" },
        { p: "Xavfsizlikni o'rganish uchun sizga mashq maydoni kerak — lekin uni birovning tizimida emas, <em>maxsus shu maqsad uchun yaratilgan</em> muhitlarda topasiz. Bor-yo'g'i \"ataylab zaif\" ilovalar bor: ular sizning kompyuteringizda, lokal, o'zingiznikida ishlaydi va o'rganish uchun qonuniy:" },
        { ul: [
          "<strong>DVWA</strong> (Damn Vulnerable Web Application) — o'rganish maqsadida ataylab zaif qilingan veb-ilova; lokal o'rnatib, xavfsizlik texnikalarini xavfsiz sinash mumkin;",
          "<strong>OWASP Juice Shop</strong> — zamonaviy, ataylab zaif ilova; ko'plab zaiflik turlarini o'z laboratoriyangizda mashq qilish uchun."
        ] },
        { p: "Bu ilovalarning butun mohiyati shundaki, ular <em>sizniki</em> va <em>lokal</em> ishlaydi. Ularda topgan har bir zaiflik — hech kimga zarar bermaydigan, sof ta'limiy mashq. Aynan shu — o'rganishning to'g'ri va qonuniy yo'li." },

        { h2: "Xavfsizlikni CI'ga qo'shish" },
        { p: "Xavfsizlik testlashning eng samarali joyi — CI/CD quvuri. Har bir kod yuborilganda avtomatik ravishda <code>npm audit</code>, SAST va boshqa tekshiruvlar ishga tushsa, muammo hali kichik va arzon paytida ushlanadi. Bu — \"DevSecOps\" g'oyasining yuragi: xavfsizlikni alohida bosqich emas, balki jarayonning har qadamidagi avtomatik odat qilish." },
        { note: "Bu bobdagi barcha texnikalar bir maqsadga xizmat qiladi: zaiflikni yomon niyatli odamdan oldin, o'zingiz topib tuzatish. Bu — hujum emas, himoya san'atidir." }
      ]
    },
    {
      slug: "ctf-mashq-kasb",
      title: "CTF, mashq platformalari va kasb yo'li",
      blurb: "Capture The Flag musobaqalari, kategoriyalari, qonuniy o'rganish platformalari va kiberxavfsizlik sohasida kasb yo'l xaritasi.",
      body: [
        { lead: "Xavfsizlikni kitobdan o'qib o'rganish mumkin, ammo uni haqiqatan his qilish uchun — qo'l bilan ishlash kerak. Muammo shundaki, mashq qilishga \"nishon\" kerak, birovning tizimini esa sinab bo'lmaydi. Bu jumboqning yechimi allaqachon topilgan: maxsus, qonuniy o'rganish maydonlari. Ular ichida eng qiziqarlisi — CTF musobaqalari. Bu — o'ynab turib o'rganishning eng yaxshi usuli." },

        { h2: "CTF nima" },
        { p: "<strong>CTF</strong> (Capture The Flag — \"bayroqni qo'lga kirit\") — bu xavfsizlik boshqotirmalari musobaqasi. Har bir topshiriqda yashirin \"bayroq\" (odatda maxsus formatdagi matn) bo'ladi. Vazifa — o'sha bayroqni topish uchun tizimning zaifligini aniqlash yoki boshqotirmani yechish. Bayroqni topsangiz — ball olasiz." },
        { p: "CTF'ning ajoyibligi shundaki, u to'liq <em>qonuniy va xavfsiz</em>. Topshiriqlar maxsus shu maqsad uchun yaratilgan izolyatsiya qilingan muhitda ishlaydi. Siz haqiqiy hujum texnikalarini o'rganasiz, ammo hech kimga zarar bermaysiz. Bu — laboratoriya sharoitidagi mashg'ulot." },

        { h2: "Nega bu ajoyib o'rganish usuli" },
        { p: "CTF quruq nazariyani jonli mahoratga aylantiradi. Uning bir necha ustunligi bor:" },
        { ul: [
          "<strong>Amaliy</strong> — o'qib emas, qilib o'rganasiz; bilim qo'lingizda qoladi;",
          "<strong>Bosqichma-bosqich</strong> — topshiriqlar oson'dan qiyinga qarab tuzilgan, o'sib borasiz;",
          "<strong>Zudlik bilan qaytim</strong> — bayroqni topganingizda darhol \"topdim!\" degan mamnunlik, bu motivatsiyani ushlab turadi;",
          "<strong>Xavfsiz</strong> — xato qilishdan qo'rqmaysiz, hech narsa buzilmaydi."
        ] },

        { h2: "Asosiy kategoriyalar" },
        { p: "CTF topshiriqlari bir necha yo'nalishga bo'linadi. Har biri sohaning boshqa qirrasini o'rgatadi:" },
        { ul: [
          "<strong>Web</strong> — veb-ilovalardagi zaifliklar (validatsiya, sessiya, avtorizatsiya muammolari); web dasturchilari uchun eng foydali boshlang'ich nuqta;",
          "<strong>Crypto</strong> — kriptografiya boshqotirmalari: zaif shifrlash, noto'g'ri ishlatilgan algoritmlarni tahlil qilish;",
          "<strong>Forensics</strong> — raqamli kriminalistika: fayllar, tarmoq trafigi yoki xotira ichidan yashirin ma'lumotni topish;",
          "<strong>Reverse</strong> — teskari muhandislik: kompilyatsiya qilingan dasturning ishlash mantig'ini ochib tahlil qilish."
        ] },
        { p: "Hammasini birdan qamrab olishga urinmang. Bittasidan — masalan, web'dan — boshlang, chunki u siz allaqachon bilgan bilimlarga eng yaqin." },

        { h2: "Qonuniy platformalar" },
        { p: "Yolg'iz mashq qilish uchun bir nechta ajoyib, qonuniy platforma bor. Ular tayyor topshiriqlar, izoh va bosqichma-bosqich yo'l bilan ta'minlaydi:" },
        { ul: [
          "<strong>TryHackMe</strong> — mutlaqo yangi boshlovchilar uchun eng qulay; qo'ldan yetaklaydigan, izohli \"yo'l\"lar (learning paths) bilan asoslarni o'rgatadi;",
          "<strong>Hack The Box</strong> — amaliyroq va murakkabroq; real muhitga yaqin mashinalarni yechish orqali mahoratni chuqurlashtiradi;",
          "<strong>PortSwigger Web Security Academy</strong> — bepul va nihoyatda sifatli; ayni web xavfsizligiga bag'ishlangan, nazariya va amaliy laboratoriyani birlashtiradi;",
          "<strong>OverTheWire</strong> — asosan buyruq qatori va tizim asoslarini o'rgatadigan \"wargame\"lar; Linux va terminalni his qilishga zo'r."
        ] },
        { p: "Bularning barchasi — o'rganish uchun mo'ljallangan, qonuniy muhitlar. Ular ichida qilgan har bir harakatingiz ruxsat etilgan va xavfsiz." },

        { h2: "Qanday boshlash: yo'l xaritasi" },
        { p: "Sohaga kirish chalkash tuyulishi mumkin. Mana sodda, bosqichli yo'l xaritasi:" },
        { ol: [
          "Asoslarni mustahkamlang — bu bobning oldingi darslaridagi HTTPS, autentifikatsiya, keng tarqalgan zaifliklar mavzularini yaxshi bilib oling;",
          "Bitta yumshoq platformadan boshlang — masalan TryHackMe'ning yangi boshlovchilar yo'lidan;",
          "Bitta kategoriyaga chuqurlashing — o'zingizga eng yaqinini (web dasturchi bo'lsangiz — Web) tanlang;",
          "Muntazam mashq qiling — kuniga oz bo'lsa ham, uzoq tanaffuslardan ko'ra yaxshiroq;",
          "Yechimlaringizni yozib boring — har bir topshiriqni qanday yechganingizni qayd qiling; bu ham xotira, ham portfolio;",
          "Jamoaga qo'shiling — CTF jamoasi yoki hamjamiyatda boshqalardan o'rganing va tajriba almashing."
        ] },

        { h2: "Portfolio va jamoa" },
        { p: "Yechgan topshiriqlaringiz haqidagi izohlaringizni (write-up) omma bilan ulashish — ikki tomonlama foydali. Bir tomondan, yozish jarayonida bilim mustahkamlanadi. Boshqa tomondan, bu sizning ochiq portfolioingizga aylanadi: bo'lajak ish beruvchi sizning haqiqiy mahoratingizni ko'radi, quruq CV emas." },
        { p: "Jamoa esa o'sishni tezlashtiradi. CTF ko'pincha jamoaviy o'ynaladi — kimdir web'da, kimdir crypto'da kuchli. Bir-biringizdan o'rganasiz va yolg'iz yecholmaydiganingizni birga yechasiz." },

        { h2: "Sertifikatlar va sabr" },
        { p: "Sohada tan olingan kasbiy sertifikatlar mavjud — ular bilim va mahoratni rasmiy tasdiqlaydi va ish topishda yordam beradi. Ammo ular — maqsadning o'zi emas, natijasidir. Avval haqiqiy mahorat, keyin uni tasdiqlovchi qog'oz." },
        { note: "Kiberxavfsizlik — bir kechada egallanadigan soha emas. U sabr, muntazamlik va doimiy qiziqish talab qiladi. Har kuni ozgina o'rganish — haftada bir marta uzoq o'tirishdan ko'ra ancha samarali." },
        { tip: "Har kuni oz-ozdan, qonuniy muhitda mashq qiling. Bir yil davomida kuniga bir topshiriq — bu 365 ta yechilgan boshqotirma va sezilarli o'sish demakdir. Muhimi — to'xtamaslik." }
      ]
    },
    {
      slug: "incident-response",
      title: "Hodisaga javob (Incident Response) va cheklist",
      blurb: "Buzilishga tayyorgarlik, incident response bosqichlari, backup, buzilgandagi birinchi qadamlar va butun kiberxavfsizlik bo'limining yakuniy amaliy cheklisti.",
      body: [
        { lead: "Kiberxavfsizlikda achchiq, ammo halol haqiqat bor: yetarlicha uzoq ishlasangiz, ertami-kechmi biror hodisa yuz beradi. Eng kuchli himoya ham 100% kafolat bermaydi. Shu sabab yetuk jamoalar savolni \"agar buzilsa?\" emas, \"buzilganda nima qilamiz?\" tarzida qo'yadi. Tayyorgarlik — bu qo'rqoqlik emas, yetuklik belgisidir. Hodisa yuz berganda vahima emas, reja kerak bo'ladi." },

        { h2: "Nega tayyorgarlik hal qiluvchi" },
        { p: "Hodisa sodir bo'lgan payt — reja tuzadigan payt emas. O'sha daqiqada bosim baland, vaqt tig'iz, va har bir noto'g'ri qadam zararni kattalashtiradi. Agar oldindan reja bo'lsa, jamoa vahimaga tushmasdan, aniq qadamlar bo'yicha harakat qiladi. Farq — tartibli javob bilan tartibsizlik orasidagi farq." },

        { h2: "Incident Response bosqichlari" },
        { p: "<strong>Incident Response</strong> (IR — hodisaga javob) sohada oltita bosqichli standart aylanaga ega. Bu ketma-ketlikni yodda tutish — hodisa paytida yo'l ko'rsatuvchi xarita bo'lib xizmat qiladi:" },
        { ol: [
          "<strong>Tayyorgarlik (preparation)</strong> — hodisadan oldin: reja, aloqa ro'yxati, backup va vositalarni tayyorlab qo'yish;",
          "<strong>Aniqlash (identification)</strong> — biror g'ayrioddiy narsa yuz berayotganini sezish va uni haqiqiy hodisa deb tasdiqlash;",
          "<strong>Ushlab qolish (containment)</strong> — zararning tarqalishini to'xtatish; buzilgan qismni izolyatsiya qilib, qolganini asrash;",
          "<strong>Yo'q qilish (eradication)</strong> — hodisaning asl sababini (masalan, zararli kod yoki ochiq eshikni) tizimdan butunlay olib tashlash;",
          "<strong>Tiklash (recovery)</strong> — tizimni xavfsiz, toza holatda qayta ishga tushirish va normal ishlashni tekshirish;",
          "<strong>Saboqlar (lessons learned)</strong> — hammasi tinchigach: nima bo'ldi, nega bo'ldi, kelajakda qanday oldini olamiz — yozib, jarayonni yaxshilash."
        ] },
        { p: "Diqqat qiling: birinchi bosqich — tayyorgarlik — hodisadan <em>oldin</em> bajariladi. Va oxirgi bosqich — saboqlar — keyingi hodisaning tayyorgarligini kuchaytiradi. Shu tariqa aylana yopiladi: har bir hodisa jamoani kuchliroq qiladi." },

        { h2: "Backup — va uni sinash" },
        { p: "Ko'p hodisalarda (ayniqsa ma'lumot yo'qolishi yoki shifrlanishida) yagona najot — <strong>backup</strong> (zaxira nusxa). Ammo backup borligi yetarli emas. Muhimi — u <em>ishlashi</em>." },
        { warn: "Sinalmagan backup — backup emas, umid. Ko'plab jamoalar backup olib turishgan, ammo kerak bo'lganda u buzuq yoki chala ekanini bilib qolishgan. Backupdan tiklashni muntazam <em>mashq qiling</em>: nusxadan haqiqatan tizimni tiklab, hammasi ishlashiga ishonch hosil qiling." },
        { p: "Yaxshi qoida — <strong>3-2-1</strong>: ma'lumotning kamida 3 nusxasi bo'lsin, 2 xil turdagi saqlagichda, va 1 nusxa boshqa joyda (masalan, boshqa fizik manzilda) turibsin. Shunda bitta falokat hamma nusxani birdan yo'q qilolmaydi." },

        { h2: "Buzilganda birinchi qadamlar" },
        { p: "Hodisani sezdingiz. Vahimaga tushmasdan, quyidagi tartibda harakat qiling:" },
        { ol: [
          "Vahimaga tushmang va hech narsani shoshib o'chirmang — dalillar (loglar, izlar) keyingi tahlil uchun kerak bo'ladi;",
          "Ushlab qoling — buzilgan tizimni tarmoqdan izolyatsiya qilib, zararning tarqalishini to'xtating;",
          "Hujjatlashtiring — nima, qachon, qanday sezilganini yozib boring; vaqt muhr bilan;",
          "Xabar bering — javobgar shaxslar va zarur bo'lsa mas'ul organlarga ma'lum qiling;",
          "Sirlarni almashtiring — buzilishga aloqador bo'lishi mumkin bo'lgan barcha parol, kalit va tokenlarni bekor qilib, yangilang."
        ] },

        { h2: "Foydalanuvchilarni ogohlantirish" },
        { p: "Agar hodisa foydalanuvchilar ma'lumotiga taalluqli bo'lsa, ularni ogohlantirish — nafaqat qonuniy majburiyat (ko'p mamlakatlarda), balki ishonchni saqlashning yagona halol yo'lidir. Yashirishga urinish deyarli har doim vaziyatni yomonlashtiradi: haqiqat baribir ochiladi, va o'shanda yashirgan tomon eng ko'p yo'qotadi." },
        { p: "To'g'ri ogohlantirish — o'z vaqtida, halol va aniq bo'ladi: nima bo'ldi, qaysi ma'lumot ta'sirlangan, foydalanuvchi nima qilishi kerak (masalan, parolini o'zgartirishi), va siz muammoni hal qilish uchun nima qilayotganingiz." },

        { h2: "Yakuniy yaxlit xavfsizlik cheklisti" },
        { p: "Endi butun 9-qism — kiberxavfsizlik bo'limi — bo'ylab o'rganganlarimizni bitta amaliy ro'yxatga jamlaymiz. Bu cheklistni har bir loyihangizda ishga tushirishdan oldin ko'zdan kechiring. U — nazariyani amaliy odatga aylantiruvchi ko'prik:" },
        { ul: [
          "<strong>HTTPS hamma joyda</strong> — barcha trafik shifrlangan (TLS); HTTP so'rovlari HTTPS'ga yo'naltiriladi;",
          "<strong>Parollar xesh + tuz bilan</strong> — parollar hech qachon ochiq saqlanmaydi; kuchli algoritm bilan xeshlanadi va har biriga alohida tuz (salt) qo'shiladi;",
          "<strong>Barcha kirish validatsiya qilinadi</strong> — serverda, allowlist yondashuvi bilan; hech qanday tashqi ma'lumotga ishonilmaydi;",
          "<strong>Chiqish escape qilinadi</strong> — ma'lumot HTML, SQL yoki buyruqqa joylashdan oldin kontekstga mos zararsizlantiriladi;",
          "<strong>Xavfsizlik sarlavhalari o'rnatilgan</strong> — kerakli HTTP xavfsizlik sarlavhalari (masalan, kontent siyosati) sozlangan;",
          "<strong>Sirlar kodda emas</strong> — parol, kalit, token muhit o'zgaruvchilarida; <code>.env</code> git'ga tushmaydi;",
          "<strong>Bog'liqliklar auditdan o'tgan</strong> — <code>npm audit</code> toza; lock fayl git'da; avtomatik yangilash sozlangan;",
          "<strong>Ikki bosqichli autentifikatsiya (2FA)</strong> — hech bo'lmaganda muhim va admin hisoblar uchun yoqilgan;",
          "<strong>Eng kam imtiyoz</strong> — har bir hisob va jarayon faqat zarur huquqqa ega;",
          "<strong>Xatolar xavfsiz</strong> — foydalanuvchiga ichki tafsilot (stack, so'rov) chiqmaydi; tizim xato holatda ochilib qolmaydi;",
          "<strong>Backup mavjud va sinalgan</strong> — 3-2-1 qoidasi; tiklash muntazam mashq qilinadi;",
          "<strong>Loglash va kuzatuv</strong> — muhim hodisalar qayd etiladi (sirlarsiz); g'ayrioddiy faollik sezilishi mumkin;",
          "<strong>Muntazam yangilanish</strong> — tizim, kutubxona va bog'liqliklar yangilanib turadi; ma'lum zaifliklar yopiladi;",
          "<strong>Hodisaga javob rejasi tayyor</strong> — kim, nima qiladi — hodisadan oldin belgilangan."
        ] },
        { note: "Bu cheklist — butun kiberxavfsizlik bo'limining amaliy xulosasidir. Uni ko'zdan kechirib chiqish har bir loyihangizning yakuniy odatiga aylansin. Xavfsizlik — bir marta bajarib qo'yiladigan vazifa emas, balki har bir loyihada takrorlanadigan intizom." },
        { h2: "Yo'l davom etadi" },
        { p: "Siz endi xavfsizlikning asosiy tamoyillarini bilasiz: kirishga ishonmaslik, chuqur himoya, eng kam imtiyoz, bog'liqliklarni kuzatish, test qilish va hodisaga tayyor turish. Bu — mustahkam poydevor. Soha esa doim rivojlanib boradi, shu bois eng muhim mahorat — o'rganishni to'xtatmaslikdir." },
        { tip: "Xavfsizlik — manzil emas, yo'l. Har kuni ozgina o'rganib, har loyihada shu cheklistni qo'llab, siz nafaqat yaxshi dasturchi, balki ishonchli, mas'uliyatli muhandis bo'lib yetishasiz. Omad tilaymiz — endi bilimni amaliyotga aylantirish navbati sizniki." }
      ]
    }
  ]
};
