"use strict";

module.exports = {
  part: "6-qism: Frontend asoslari",
  chapter: "HTML",
  lessons: [
    {
      slug: "html-nima",
      title: "HTML nima?",
      blurb: "HTML — veb-sahifalarni belgilash tili. Teg, element va atribut tushunchalari, HTML hujjatining skeleti (DOCTYPE, html, head, body), title va meta teglari, hamda birinchi sahifani yozish.",
      body: [
        { lead: "<strong>HTML</strong> — bu har bir veb-sahifaning poydevori. Internetda ko'rgan har bir sayt, matn, rasm, tugma va havola aynan HTML yordamida yaratilgan. Ushbu darsda HTML nima ekanligini mutlaqo noldan o'rganamiz: teg, element va atribut nima, HTML hujjati qanday tuzilishga ega va o'z qo'lingiz bilan birinchi veb-sahifani qanday yozish mumkin." },

        { note: "Bu bob — <strong>frontend</strong> (brauzerda ko'rinadigan qism) asoslariga bag'ishlangan. Bu yerdagi barcha kod misollari brauzerda ishlaydi. Ularni sinab ko'rish uchun oddiy matn muharririda (masalan, VS Code) fayl yaratib, uni <code>.html</code> kengaytmasi bilan saqlang va brauzerda oching." },

        { h2: "HTML nima va u nima uchun kerak?" },
        { p: "HTML — bu <strong>HyperText Markup Language</strong> so'zlarining qisqartmasi, ya'ni \"Gipermatnli Belgilash Tili\". Nomdagi har bir so'zni ajratib tushunaylik:" },
        { ul: [
          "<strong>HyperText (Gipermatn)</strong> — bu oddiy matndan farqli, ichida bir sahifadan boshqasiga o'tadigan <strong>havolalar</strong> bo'lgan matn. Aynan havolalar butun internetni bir-biriga bog'lab turadi;",
          "<strong>Markup (Belgilash)</strong> — matnni maxsus <strong>belgilar (teglar)</strong> bilan o'rab, brauzerga \"bu — sarlavha\", \"bu — paragraf\", \"bu — rasm\" deb aytish;",
          "<strong>Language (Til)</strong> — bularning barchasi aniq qoidalarga ega bo'lgan til orqali yoziladi."
        ] },
        { p: "Muhim tushuncha: HTML — bu <strong>dasturlash tili emas</strong>. Unda shartlar, sikllar yoki hisob-kitob yo'q. HTML faqat sahifaning <strong>tuzilishini</strong> va <strong>mazmunini</strong> tasvirlaydi. U brauzerga nimani ko'rsatishni aytadi, lekin qanday harakat qilishni emas. Boshqacha aytganda, HTML — bu sahifaning \"skeleti\" yoki \"suyaklari\"." },
        { p: "Bir sahifani odam tanasiga qiyoslasak: <strong>HTML</strong> — suyaklar va a'zolar (tuzilish), <strong>CSS</strong> — tashqi ko'rinish, kiyim va bezak (ranglar, o'lchamlar), <strong>JavaScript</strong> — mushaklar va harakat (bosilganda nima bo'lishi). Biz hozir eng birinchisi — suyaklarni o'rganamiz." },

        { h2: "Teg nima?" },
        { p: "HTML'ning eng asosiy birligi — <strong>teg</strong> (tag). Teg — bu burchakli qavslar <code>&lt;</code> va <code>&gt;</code> ichiga yozilgan maxsus so'z. Masalan, paragraf uchun teg <code>&lt;p&gt;</code> ko'rinishida bo'ladi." },
        { p: "Teglar odatda <strong>juft</strong> bo'lib keladi: <strong>ochuvchi teg</strong> va <strong>yopuvchi teg</strong>. Yopuvchi teg ochuvchisiga o'xshaydi, faqat oldida qiya chiziq (<code>/</code>) turadi:" },
        { code: '<p>Bu — bitta paragraf.</p>' },
        { p: "Bu yerda <code>&lt;p&gt;</code> — ochuvchi teg (paragraf boshlandi), <code>&lt;/p&gt;</code> — yopuvchi teg (paragraf tugadi). Ular orasidagi \"Bu — bitta paragraf.\" matni esa — paragrafning <strong>mazmuni</strong>." },
        { p: "Ba'zi teglar mazmunni o'rab olmaydi, chunki ularning ichida matn bo'lmaydi. Bunday teglar <strong>bo'sh (yakka)</strong> teglar deyiladi va ularda yopuvchi teg bo'lmaydi. Masalan, satrni yangi qatordan boshlaydigan <code>&lt;br&gt;</code> yoki rasm qo'yadigan <code>&lt;img&gt;</code>:" },
        { code: '<br>' },
        { note: "Eski HTML uslubida bo'sh teglarni <code>&lt;br /&gt;</code> ko'rinishida oxiriga qiya chiziq qo'yib yozishardi. Zamonaviy HTML5'da bu shart emas — oddiy <code>&lt;br&gt;</code> yetarli. Ikkalasi ham to'g'ri ishlaydi." },

        { h2: "Element nima?" },
        { p: "<strong>Element</strong> — bu ochuvchi teg, mazmun va yopuvchi tegdan iborat <strong>to'liq birlik</strong>. Ya'ni teg — bu shunchaki belgi, element esa — belgi bilan o'ralgan butun bo'lak." },
        { code: [
          '<h1>Salom, dunyo!</h1>',
          '<p>Bu mening birinchi veb-sahifam.</p>'
        ].join("\n") },
        { p: "Yuqorida ikkita element bor: birinchisi — <code>h1</code> elementi (katta sarlavha), ikkinchisi — <code>p</code> elementi (paragraf). Har biri ochuvchi teg, matn va yopuvchi tegdan tashkil topgan." },
        { p: "Elementlar bir-birining <strong>ichiga joylashtirilishi</strong> (ichma-ich) mumkin. Masalan, paragraf ichida biror so'zni qalin qilib ajratmoqchi bo'lsak:" },
        { code: '<p>Men <strong>HTML</strong> o\'rganyapman.</p>' },
        { p: "Bu yerda <code>strong</code> elementi <code>p</code> elementining <strong>ichida</strong> joylashgan. Muhim qoida: ichma-ich joylangan teglar <strong>to'g'ri tartibda</strong> yopilishi kerak. Oxirgi ochilgan teg birinchi bo'lib yopiladi. Ya'ni <code>&lt;p&gt;&lt;strong&gt;...&lt;/strong&gt;&lt;/p&gt;</code> to'g'ri, lekin <code>&lt;p&gt;&lt;strong&gt;...&lt;/p&gt;&lt;/strong&gt;</code> noto'g'ri." },

        { h2: "Atribut nima?" },
        { p: "<strong>Atribut</strong> — bu tegga qo'shimcha <strong>ma'lumot</strong> beruvchi maxsus qism. Atributlar ochuvchi teg ichiga yoziladi va elementga qo'shimcha xususiyat qo'shadi. Atribut ikki qismdan iborat: <strong>nomi</strong> va <strong>qiymati</strong>, ular orasida teng belgisi (<code>=</code>) turadi. Qiymat esa qo'shtirnoq ichiga olinadi." },
        { p: "Eng ko'p ishlatiladigan misol — havola. Havola <code>&lt;a&gt;</code> tegi bilan yaratiladi, lekin qayerga o'tishni <code>href</code> atributi belgilaydi:" },
        { code: '<a href="https://example.com">Saytga o\'tish</a>' },
        { p: "Bu yerda:" },
        { ul: [
          "<code>a</code> — teg nomi (havola);",
          "<code>href</code> — atribut nomi (\"qayerga o'tadi\" degani);",
          "<code>\"https://example.com\"</code> — atribut qiymati (havola manzili);",
          "<code>Saytga o'tish</code> — foydalanuvchi ko'radigan matn (havola ko'rinishi)."
        ] },
        { p: "Bir elementda bir nechta atribut bo'lishi mumkin, ular bir-biridan bo'sh joy (probel) bilan ajratiladi. Masalan, rasm elementi ikkita atributga ega:" },
        { code: '<img src="rasm.jpg" alt="Chiroyli manzara">' },
        { p: "Bu yerda <code>src</code> — rasm fayli manzili, <code>alt</code> — rasm ko'rinmasa yoki ekranni o'quvchi dastur uchun matnli tavsif." },
        { tip: "Atribut qiymatlarini har doim <strong>qo'shtirnoq</strong> ichiga oling: <code>href=\"...\"</code>. Texnik jihatdan tirnoqsiz ham ishlaydi, lekin qiymatda bo'sh joy bo'lsa xato beradi. Shuning uchun har doim tirnoq qo'yish — yaxshi odat." },

        { h2: "HTML hujjatining skeleti" },
        { p: "Har bir to'liq HTML sahifasi ma'lum bir <strong>standart tuzilishga</strong> ega. Bu — sahifaning \"skeleti\", ya'ni har safar takrorlanadigan asosiy karkas. Mana to'liq bo'sh sahifa qanday ko'rinadi:" },
        { code: [
          '<!DOCTYPE html>',
          '<html lang="uz">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>Mening sahifam</title>',
          '</head>',
          '<body>',
          '  <h1>Salom, dunyo!</h1>',
          '  <p>Bu mening birinchi veb-sahifam.</p>',
          '</body>',
          '</html>'
        ].join("\n") },
        { p: "Bu tuzilish dastlab murakkab tuyulishi mumkin, lekin har bir qismini alohida ko'rib chiqsak, hammasi tushunarli bo'ladi." },

        { h3: "1. <!DOCTYPE html> — hujjat turi" },
        { p: "Fayilning eng birinchi qatori — <code>&lt;!DOCTYPE html&gt;</code>. Bu brauzerga \"bu hujjat zamonaviy HTML5 standartida yozilgan\" deb aytadi. Bu teg emas, balki <strong>e'lon (deklaratsiya)</strong>. U doim eng yuqorida, boshqa hamma narsadan oldin turishi kerak." },
        { warn: "Agar <code>&lt;!DOCTYPE html&gt;</code> ni tushirib qoldirsangiz, brauzer eski, mos kelmaydigan (\"quirks\") rejimga o'tishi mumkin va sahifangiz kutilmaganda noto'g'ri ko'rinadi. Shuning uchun uni hech qachon unutmang." },

        { h3: "2. <html> — ildiz element" },
        { p: "<code>&lt;html&gt;</code> — butun hujjatni o'rab turadigan <strong>eng asosiy (ildiz)</strong> element. Boshqa hamma teglar shu elementning ichida joylashadi. Uning <code>lang</code> atributi sahifa qaysi tilda ekanini bildiradi: <code>lang=\"uz\"</code> — o'zbek tili, <code>lang=\"en\"</code> — ingliz tili. Bu qidiruv tizimlari va ekran o'quvchilari uchun muhim." },

        { h3: "3. <head> — texnik ma'lumotlar bo'limi" },
        { p: "<code>&lt;head&gt;</code> (\"bosh\") bo'limi — sahifa haqidagi <strong>ko'rinmaydigan</strong> texnik ma'lumotlarni saqlaydi. Bu yerdagi narsalar sahifada to'g'ridan-to'g'ri chiqmaydi, lekin brauzer va qidiruv tizimlari uchun juda muhim. Bu yerga sahifa sarlavhasi, kodlash usuli, CSS va JavaScript havolalari joylashadi." },

        { h3: "4. <body> — ko'rinadigan mazmun" },
        { p: "<code>&lt;body&gt;</code> (\"tana\") bo'limi — foydalanuvchi ekranda <strong>ko'radigan</strong> hamma narsani saqlaydi: sarlavhalar, matnlar, rasmlar, tugmalar, havolalar. Sahifaning butun mazmuni aynan shu yerga yoziladi." },
        { note: "Oddiy qoida: agar biror narsa <strong>ko'rinishi</strong> kerak bo'lsa — u <code>&lt;body&gt;</code> ichida bo'ladi. Agar u sahifa haqidagi <strong>ma'lumot</strong> (sozlama) bo'lsa — u <code>&lt;head&gt;</code> ichida bo'ladi." },

        { h2: "title va meta teglari" },
        { p: "<code>&lt;head&gt;</code> ichidagi eng muhim ikki narsa — <code>title</code> va <code>meta</code> teglari." },
        { p: "<strong>&lt;title&gt;</strong> — sahifaning sarlavhasi. U sahifada emas, balki brauzer <strong>yorlig'ida (tab)</strong> va qidiruv natijalarida ko'rinadi. Yaxshi title yozish — SEO (qidiruv tizimida yaxshi joy olish) uchun juda muhim:" },
        { code: '<title>Bosh sahifa — Mening saytim</title>' },
        { p: "<strong>&lt;meta&gt;</strong> teglari — sahifa haqidagi turli xil qo'shimcha ma'lumotlar (metama'lumot). Ular bo'sh teglar (yopuvchisi yo'q). Eng muhim ikkitasi:" },
        { code: [
          '<meta charset="UTF-8">',
          '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        ].join("\n") },
        { ul: [
          "<code>&lt;meta charset=\"UTF-8\"&gt;</code> — belgilar kodlashini o'rnatadi. UTF-8 barcha tillardagi harflarni (jumladan o'zbekcha <em>o', g', sh, ch</em>) to'g'ri ko'rsatadi. Busiz matn \"krakozyabra\" bo'lib ketishi mumkin;",
          "<code>&lt;meta name=\"viewport\"...&gt;</code> — sahifaning telefon va planshetlarda to'g'ri ko'rinishini ta'minlaydi. Zamonaviy saytlar uchun bu shart."
        ] },
        { tip: "Sahifada matn o'rniga tushunarsiz belgilar (masalan, <em>Ð¡Ð°Ð»Ð¾Ð¼</em>) chiqsa — deyarli har doim sabab <code>&lt;meta charset=\"UTF-8\"&gt;</code> ning yo'qligi. Uni <code>&lt;head&gt;</code> ning eng boshiga qo'ying." },

        { h2: "Birinchi sahifani yozish" },
        { p: "Endi hamma bilimni birlashtirib, o'z qo'lingiz bilan haqiqiy sahifa yasaymiz. Quyidagi qadamlarni bajaring:" },
        { ol: [
          "Kompyuteringizda yangi papka yarating (masalan, <code>birinchi-sayt</code>);",
          "Matn muharririda (VS Code tavsiya etiladi) yangi fayl yarating;",
          "Uni <code>index.html</code> nomi bilan saqlang (kengaytma aynan <code>.html</code> bo'lishi shart);",
          "Quyidagi kodni ko'chiring va faylni saqlang;",
          "Faylni brauzerda oching (ustiga ikki marta bosing yoki brauzerga tashlang)."
        ] },
        { code: [
          '<!DOCTYPE html>',
          '<html lang="uz">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>Men haqimda</title>',
          '</head>',
          '<body>',
          '  <h1>Salom! Mening ismim Ali.</h1>',
          '  <p>Men veb-dasturlashni endigina o\'rganyapman.</p>',
          '  <p>Bu — mening birinchi veb-sahifam!</p>',
          '</body>',
          '</html>'
        ].join("\n") },
        { p: "Brauzerda katta sarlavha va ikkita paragraf ko'rinadi. Yorliqda esa \"Men haqimda\" yozuvi turadi. Tabriklaymiz — siz endigina o'z birinchi veb-sahifangizni yaratdingiz!" },
        { note: "HTML fayllar oddiy matn fayllari. Ularni o'zgartirish uchun hech qanday maxsus dastur shart emas — hatto oddiy \"Bloknot\" (Notepad) ham yetarli. Lekin <strong>VS Code</strong> kabi muharrirlar rang berish, avtomatik yakunlash va xatoni ko'rsatish bilan ishni ancha osonlashtiradi." },

        { h2: "Bo'shliqlar va yangi qatorlar haqida" },
        { p: "HTML kodida qancha bo'shliq (probel) yoki yangi qator qo'ymang, brauzer ularni <strong>bittaga</strong> qisqartiradi. Ya'ni kodda chiroyli tartib uchun bo'shliq qo'ysangiz ham, u sahifaga ta'sir qilmaydi:" },
        { code: '<p>Bir     ikki       uch</p>' },
        { p: "Bu kod brauzerda \"Bir ikki uch\" bo'lib, bitta bo'shliq bilan chiqadi. Agar matnni haqiqatan yangi qatordan boshlamoqchi bo'lsangiz, <code>&lt;br&gt;</code> tegini ishlating:" },
        { code: [
          '<p>Birinchi qator<br>',
          'Ikkinchi qator</p>'
        ].join("\n") },
        { tip: "Kodni <strong>chekinishlar (otступ, indentatsiya)</strong> bilan yozing — ichma-ich elementlarni ikki yoki to'rt bo'shliq bilan surib qo'ying. Bu sahifaga ta'sir qilmaydi, lekin kodni o'qishni juda osonlashtiradi va xatolarni kamaytiradi." },

        { h2: "Kommentariylar (izohlar)" },
        { p: "HTML'da kodga <strong>izoh</strong> qoldirish mumkin — bu matn sahifada ko'rinmaydi, faqat kodni o'qiyotgan dasturchi uchun. Izoh <code>&lt;!--</code> bilan boshlanib, <code>--&gt;</code> bilan tugaydi:" },
        { code: [
          '<!-- Bu — sarlavha qismi -->',
          '<h1>Xush kelibsiz</h1>',
          '<!-- Quyida asosiy matn -->',
          '<p>Saytimizga xush kelibsiz.</p>'
        ].join("\n") },
        { p: "Izohlar kodning qaysi qismi nima uchun ekanini eslatib turish yoki vaqtincha biror qatorni \"o'chirib turish\" (izohga o'rab qo'yish) uchun ishlatiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>HTML</strong> — veb-sahifalarning tuzilishini tasvirlaydigan belgilash tili (dasturlash tili emas);",
          "<strong>Teg</strong> — burchakli qavsdagi belgi (<code>&lt;p&gt;</code>), ular odatda ochuvchi va yopuvchi bo'lib juft keladi;",
          "<strong>Element</strong> — ochuvchi teg + mazmun + yopuvchi tegdan iborat to'liq birlik;",
          "<strong>Atribut</strong> — tegga qo'shimcha ma'lumot beradi (<code>href=\"...\"</code>), ochuvchi teg ichiga yoziladi;",
          "Har bir sahifa skeleti: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> (ko'rinmaydigan sozlamalar) va <code>&lt;body&gt;</code> (ko'rinadigan mazmun);",
          "<code>&lt;title&gt;</code> — yorliqdagi sarlavha; <code>&lt;meta charset=\"UTF-8\"&gt;</code> — barcha harflar to'g'ri ko'rinishi uchun majburiy;",
          "Fayl <code>.html</code> kengaytmasi bilan saqlanadi va brauzerda ochiladi."
        ] }
      ]
    },

    {
      slug: "html-teglar",
      title: "Asosiy teglar",
      blurb: "Eng ko'p ishlatiladigan HTML teglari: sarlavhalar (h1-h6), paragraflar, qalin va kursiv matn (strong/em), ro'yxatlar (ul/ol/li), havolalar (a), rasmlar (img), div va span konteynerlari, hamda br va hr.",
      body: [
        { lead: "HTML skeletini o'rganganimizdan so'ng, endi <code>&lt;body&gt;</code> ichini to'ldiradigan <strong>asosiy teglar</strong> bilan tanishamiz. Bu teglar — har bir sahifada takrorlanadigan \"g'ishtlar\". Ularni yaxshi bilsangiz, deyarli har qanday oddiy sahifani yasay olasiz." },

        { h2: "Sarlavhalar: h1 dan h6 gacha" },
        { p: "Sarlavhalar matnni <strong>bo'limlarga</strong> ajratadi. HTML'da olti darajali sarlavha bor: <code>&lt;h1&gt;</code> dan <code>&lt;h6&gt;</code> gacha. <code>h1</code> — eng katta va eng muhim, <code>h6</code> — eng kichigi:" },
        { code: [
          '<h1>Eng katta sarlavha</h1>',
          '<h2>Ikkinchi daraja</h2>',
          '<h3>Uchinchi daraja</h3>',
          '<h4>To\'rtinchi daraja</h4>',
          '<h5>Beshinchi daraja</h5>',
          '<h6>Eng kichik sarlavha</h6>'
        ].join("\n") },
        { p: "Sarlavhalar nafaqat matnni kattalashtiradi, balki sahifaning <strong>mantiqiy tuzilishini</strong> ham bildiradi — xuddi kitobning bob va bo'limlari kabi. Qidiruv tizimlari ular yordamida sahifa nima haqida ekanini tushunadi." },
        { warn: "Har bir sahifada <strong>faqat bitta</strong> <code>&lt;h1&gt;</code> bo'lishi kerak — u sahifaning bosh sarlavhasi. Sarlavhalarni <strong>tartib bilan</strong> ishlating: <code>h1</code> dan keyin <code>h2</code>, undan keyin <code>h3</code>. Faqat matnni kattalashtirish uchun <code>h1</code> ni tanlamang — buning uchun keyinroq CSS bor." },

        { h2: "Paragraf: p tegi" },
        { p: "<code>&lt;p&gt;</code> tegi (paragraph — paragraf) — oddiy matn bloklari uchun ishlatiladi. Har bir paragraf alohida qatordan boshlanadi va oldingi/keyingi bloklardan bo'sh joy bilan ajraladi:" },
        { code: [
          '<p>Bu — birinchi paragraf. U bir necha jumladan iborat bo\'lishi mumkin.</p>',
          '<p>Bu — ikkinchi paragraf. U avtomatik ravishda yangi qatordan boshlanadi.</p>'
        ].join("\n") },
        { note: "Yodda tuting: brauzer matndagi ortiqcha bo'shliq va yangi qatorlarni e'tiborsiz qoldiradi. Matnni bir necha paragrafga bo'lish uchun har birini alohida <code>&lt;p&gt;</code> ichiga oling, klaviaturada Enter bosish yetarli emas." },

        { h2: "Qalin va kursiv matn" },
        { p: "Matn ichidagi ayrim so'zlarni ajratib ko'rsatish uchun quyidagi teglar ishlatiladi:" },
        { ul: [
          "<code>&lt;strong&gt;</code> — matnni <strong>qalin</strong> qiladi va \"bu muhim\" degan ma'no beradi;",
          "<code>&lt;em&gt;</code> — matnni <em>kursiv</em> qiladi va \"bu so'zga urg'u ber\" degan ma'no beradi;",
          "<code>&lt;b&gt;</code> — shunchaki qalin (ma'nosiz, faqat ko'rinish uchun);",
          "<code>&lt;i&gt;</code> — shunchaki kursiv (ma'nosiz, faqat ko'rinish uchun)."
        ] },
        { code: [
          '<p>Bu juda <strong>muhim</strong> ogohlantirish.</p>',
          '<p>Men buni <em>rostdan ham</em> nazarda tutyapman.</p>'
        ].join("\n") },
        { tip: "Amalda <code>&lt;strong&gt;</code> va <code>&lt;em&gt;</code> ni afzal ko'ring. Ular nafaqat ko'rinishni o'zgartiradi, balki <strong>ma'no</strong> ham beradi — ekran o'quvchi dasturlar bunday so'zlarni alohida ohang bilan o'qiydi, bu esa nogironligi bor foydalanuvchilar uchun foydali." },

        { h2: "Ro'yxatlar: ul, ol va li" },
        { p: "Ro'yxatlar ma'lumotni tartibli ko'rsatish uchun ishlatiladi. Ikki asosiy turi bor." },
        { h3: "Tartibsiz ro'yxat: ul" },
        { p: "<code>&lt;ul&gt;</code> (unordered list) — har bir band oldida <strong>nuqta (marker)</strong> turadigan ro'yxat. Har bir band <code>&lt;li&gt;</code> (list item) ichiga yoziladi:" },
        { code: [
          '<ul>',
          '  <li>Olma</li>',
          '  <li>Banan</li>',
          '  <li>Uzum</li>',
          '</ul>'
        ].join("\n") },
        { h3: "Tartibli ro'yxat: ol" },
        { p: "<code>&lt;ol&gt;</code> (ordered list) — har bir band oldida <strong>raqam</strong> turadigan ro'yxat. Tartib muhim bo'lganda ishlatiladi (masalan, retsept qadamlari):" },
        { code: [
          '<ol>',
          '  <li>Suvni qaynating</li>',
          '  <li>Choyni soling</li>',
          '  <li>Besh daqiqa kutib turing</li>',
          '</ol>'
        ].join("\n") },
        { p: "Ro'yxatlar bir-birining <strong>ichiga</strong> ham joylashtirilishi mumkin (ichma-ich ro'yxat):" },
        { code: [
          '<ul>',
          '  <li>Mevalar',
          '    <ul>',
          '      <li>Olma</li>',
          '      <li>Nok</li>',
          '    </ul>',
          '  </li>',
          '  <li>Sabzavotlar</li>',
          '</ul>'
        ].join("\n") },

        { h2: "Havolalar: a tegi" },
        { p: "Havola — internetning asosi. U bir sahifadan boshqasiga o'tish imkonini beradi. Havola <code>&lt;a&gt;</code> (anchor — langar) tegi bilan yaratiladi, manzil esa <code>href</code> atributida ko'rsatiladi:" },
        { code: '<a href="https://google.com">Google saytiga o\'tish</a>' },
        { p: "Havolalar bir necha xil bo'ladi:" },
        { ul: [
          "<strong>Tashqi havola</strong> — boshqa saytga: <code>href=\"https://example.com\"</code>;",
          "<strong>Ichki havola</strong> — o'z saytingizning boshqa sahifasiga: <code>href=\"about.html\"</code>;",
          "<strong>Elektron pochta</strong>: <code>href=\"mailto:info@example.com\"</code>;",
          "<strong>Telefon</strong>: <code>href=\"tel:+998901234567\"</code>."
        ] },
        { p: "Havolani <strong>yangi yorliqda</strong> ochish uchun <code>target=\"_blank\"</code> atributi qo'shiladi:" },
        { code: '<a href="https://example.com" target="_blank" rel="noopener">Yangi oynada ochish</a>' },
        { note: "<code>target=\"_blank\"</code> bilan birga <code>rel=\"noopener\"</code> ni qo'shish tavsiya etiladi — bu ochilgan yangi sahifa sizning sahifangizga xavfsizlik jihatidan zarar yetkaza olmasligini ta'minlaydi." },

        { h2: "Rasmlar: img tegi" },
        { p: "Rasm qo'yish uchun <code>&lt;img&gt;</code> tegi ishlatiladi. Bu — bo'sh teg (yopuvchisi yo'q). Uning ikkita muhim atributi bor: <code>src</code> (rasm manzili) va <code>alt</code> (matnli tavsif):" },
        { code: '<img src="mushuk.jpg" alt="Oq mushuk derazada o\'tiribdi">' },
        { ul: [
          "<code>src</code> (source — manba) — rasm faylining yo'li. Bu o'z papkangizdagi fayl (<code>src=\"rasm.jpg\"</code>) yoki internetdagi manzil (<code>src=\"https://...\"</code>) bo'lishi mumkin;",
          "<code>alt</code> (alternative text — muqobil matn) — rasm yuklanmasa ko'rsatiladigan va ekran o'quvchi dasturlar o'qiydigan tavsif."
        ] },
        { p: "Rasm o'lchamini <code>width</code> va <code>height</code> atributlari bilan belgilash mumkin (piksellarda):" },
        { code: '<img src="logo.png" alt="Kompaniya logotipi" width="200" height="100">' },
        { warn: "<code>alt</code> atributini <strong>doimo</strong> yozing. U ko'rlar uchun rasmni \"o'qib\" beradi (a11y — foydalanish qulayligi) va rasm yuklanmaganda nima ekanini bildiradi. SEO uchun ham foydali. Bo'sh <code>alt=\"\"</code> faqat bezak rasmlar uchun ruxsat etiladi." },

        { h2: "Konteynerlar: div va span" },
        { p: "Ba'zan bir necha elementni <strong>guruhlab</strong>, ularni birgalikda boshqarish (masalan, CSS bilan bezash) kerak bo'ladi. Buning uchun ikkita \"neytral\" teg bor:" },
        { h3: "div — blok konteyner" },
        { p: "<code>&lt;div&gt;</code> — o'zining hech qanday ma'nosi yo'q, katta bloklarni guruhlash uchun \"quti\". U har doim yangi qatordan boshlanadi va butun kenglikni egallaydi:" },
        { code: [
          '<div>',
          '  <h2>Mahsulot nomi</h2>',
          '  <p>Mahsulot tavsifi shu yerda.</p>',
          '</div>'
        ].join("\n") },
        { h3: "span — satr ichidagi konteyner" },
        { p: "<code>&lt;span&gt;</code> — <code>div</code>'ga o'xshaydi, lekin u <strong>matn ichida</strong> ishlatiladi va yangi qatordan boshlanmaydi. Bir so'zni ajratib olish uchun qulay:" },
        { code: '<p>Narxi: <span>150 000 so\'m</span></p>' },
        { note: "<code>div</code> — <strong>blok</strong> element (butun qatorni egallaydi), <code>span</code> — <strong>satriy (inline)</strong> element (faqat o'z mazmuni qadar joy oladi). Bu farqni CSS o'rganishda yanada aniqroq tushunasiz. Hozircha: <code>div</code> katta bo'laklar uchun, <code>span</code> matn ichidagi kichik bo'laklar uchun." },

        { h2: "br va hr teglari" },
        { p: "Ikkita foydali bo'sh teg:" },
        { ul: [
          "<code>&lt;br&gt;</code> (break) — matnni <strong>yangi qatordan</strong> boshlaydi (paragraf ochmasdan);",
          "<code>&lt;hr&gt;</code> (horizontal rule) — sahifa bo'ylab <strong>gorizontal ajratuvchi chiziq</strong> chizadi."
        ] },
        { code: [
          '<p>Toshkent shahri<br>',
          'Amir Temur ko\'chasi, 5-uy</p>',
          '<hr>',
          '<p>Yangi bo\'lim shu yerdan boshlanadi.</p>'
        ].join("\n") },
        { tip: "<code>&lt;br&gt;</code> ni faqat manzil yoki she'r kabi haqiqatan yangi qator kerak bo'lgan joyda ishlating. Paragraflar orasidagi bo'shliq uchun uni ishlatmang — buning uchun alohida <code>&lt;p&gt;</code> teglari to'g'riroq." },

        { h2: "Barchasini birlashtirish" },
        { p: "Mana o'rganilgan teglarning barchasi bir sahifada:" },
        { code: [
          '<body>',
          '  <h1>Mening blogim</h1>',
          '  <p>Xush kelibsiz! Quyida <strong>eng yangi</strong> maqolalar.</p>',
          '  <hr>',
          '  <h2>Sevimli mevalarim</h2>',
          '  <ul>',
          '    <li>Olma</li>',
          '    <li>Uzum</li>',
          '  </ul>',
          '  <p>Batafsil ma\'lumot uchun <a href="mevalar.html">bu yerni bosing</a>.</p>',
          '  <img src="meva.jpg" alt="Turli mevalar savatda">',
          '</body>'
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Sarlavhalar</strong> — <code>h1</code> dan <code>h6</code> gacha; har sahifada bitta <code>h1</code>, tartib bilan ishlating;",
          "<strong>Paragraf</strong> — <code>&lt;p&gt;</code>, matn bloklari uchun;",
          "<strong>strong</strong> (qalin, muhim) va <strong>em</strong> (kursiv, urg'u) matnni ajratadi;",
          "<strong>Ro'yxatlar</strong>: <code>ul</code> (nuqtali) va <code>ol</code> (raqamli), bandlar <code>&lt;li&gt;</code> ichida;",
          "<strong>Havola</strong> — <code>&lt;a href=\"...\"&gt;</code>; <strong>rasm</strong> — <code>&lt;img src=\"...\" alt=\"...\"&gt;</code>, <code>alt</code> majburiy;",
          "<strong>div</strong> (blok guruh) va <strong>span</strong> (matn ichidagi guruh) — neytral konteynerlar;",
          "<code>&lt;br&gt;</code> — yangi qator, <code>&lt;hr&gt;</code> — ajratuvchi chiziq."
        ] }
      ]
    },

    {
      slug: "html-form",
      title: "Formalar",
      blurb: "Foydalanuvchidan ma'lumot yig'ish uchun formalar: form tegi (action, method), input turlari (text, password, email, checkbox, radio, number, date), label, select/option, textarea, tugmalar hamda required va boshqa validatsiya atributlari.",
      body: [
        { lead: "<strong>Formalar</strong> — foydalanuvchidan ma'lumot olishning asosiy usuli. Ro'yxatdan o'tish, tizimga kirish, qidiruv, izoh qoldirish — bularning barchasi formalar orqali amalga oshadi. Ushbu darsda formani qanday qurish, turli maydonlar (input) yaratish va ularni tekshirish (validatsiya)ni o'rganamiz." },

        { h2: "form tegi" },
        { p: "Barcha kiritish maydonlari <code>&lt;form&gt;</code> tegi ichiga joylashadi. Bu teg — foydalanuvchi to'ldiradigan ma'lumotlarni birlashtiruvchi \"idish\". Uning ikkita muhim atributi bor:" },
        { ul: [
          "<code>action</code> — forma yuborilganda ma'lumotlar <strong>qayerga</strong> jo'natilishini bildiradi (server manzili);",
          "<code>method</code> — ma'lumot <strong>qanday</strong> yuborilishini bildiradi: <code>GET</code> yoki <code>POST</code>."
        ] },
        { code: [
          '<form action="/royxatdan-otish" method="POST">',
          '  <!-- Bu yerga maydonlar joylashadi -->',
          '</form>'
        ].join("\n") },
        { note: "<strong>GET</strong> — ma'lumotni URL manzili orqali yuboradi (masalan, qidiruv uchun, ma'lumot maxfiy bo'lmaganda). <strong>POST</strong> — ma'lumotni yashirin (URL'da ko'rinmasdan) yuboradi. Parol yoki shaxsiy ma'lumot uchun har doim <strong>POST</strong> ishlatiladi." },

        { h2: "input tegi va uning turlari" },
        { p: "<code>&lt;input&gt;</code> — formaning eng ko'p ishlatiladigan tegi. Bu bitta teg <code>type</code> atributiga qarab butunlay boshqacha maydonga aylanadi. <code>input</code> — bo'sh teg (yopuvchisi yo'q)." },

        { h3: "Matn maydoni: text" },
        { p: "Eng oddiy tur — oddiy matn kiritish maydoni:" },
        { code: '<input type="text" name="ism" placeholder="Ismingizni kiriting">' },
        { ul: [
          "<code>type=\"text\"</code> — maydon turi (oddiy matn);",
          "<code>name</code> — maydon nomi (serverga yuborilganda shu nom bilan boradi, majburiy);",
          "<code>placeholder</code> — maydon bo'sh turганda ko'rinadigan namuna matn (\"maslahat\")."
        ] },

        { h3: "Parol: password" },
        { p: "Parol maydoni — kiritilgan belgilar nuqta yoki yulduzcha bilan yashiriladi:" },
        { code: '<input type="password" name="parol" placeholder="Parolingiz">' },

        { h3: "Elektron pochta: email" },
        { p: "Bu tur brauzerga \"bu maydon email bo'lishi kerak\" deb aytadi. Brauzer avtomatik ravishda <code>@</code> belgisi borligini tekshiradi:" },
        { code: '<input type="email" name="email" placeholder="pochta@example.com">' },

        { h3: "Raqam: number" },
        { p: "Faqat raqam kiritish uchun. Ko'pincha eng kichik va eng katta qiymat ham belgilanadi:" },
        { code: '<input type="number" name="yosh" min="18" max="100">' },
        { p: "<code>min</code> — eng kichik ruxsat etilgan qiymat, <code>max</code> — eng katta qiymat." },

        { h3: "Sana: date" },
        { p: "Sana tanlash uchun. Brauzer avtomatik ravishda kalendar ko'rsatadi:" },
        { code: '<input type="date" name="tugilgan-sana">' },

        { h3: "Belgilash katakchasi: checkbox" },
        { p: "<code>checkbox</code> — foydalanuvchi bir yoki bir nechta variantni belgilashi mumkin bo'lgan katakcha:" },
        { code: [
          '<input type="checkbox" name="qoidalar" id="qoidalar">',
          '<label for="qoidalar">Men qoidalarga roziman</label>'
        ].join("\n") },

        { h3: "Yakka tanlov: radio" },
        { p: "<code>radio</code> — bir nechta variantdan <strong>faqat bittasini</strong> tanlash uchun. Bir guruhga tegishli radiolar bir xil <code>name</code> ga ega bo'lishi kerak:" },
        { code: [
          '<input type="radio" name="jins" id="erkak" value="erkak">',
          '<label for="erkak">Erkak</label>',
          '<input type="radio" name="jins" id="ayol" value="ayol">',
          '<label for="ayol">Ayol</label>'
        ].join("\n") },
        { warn: "Radiolar bir xil <code>name</code> ga ega bo'lganda, ular <strong>bitta guruh</strong> hisoblanadi — foydalanuvchi ulardan faqat bittasini tanlay oladi. Agar <code>name</code> har xil bo'lsa, har biri alohida tanlanadi va bu xato bo'ladi." },

        { h2: "label tegi" },
        { p: "<code>&lt;label&gt;</code> — kiritish maydoniga <strong>izoh (yorliq)</strong> qo'shadi. Bu shunchaki matn emas: label maydonga bog'lanadi va uni bosganda maydon avtomatik faollashadi. Bu ayniqsa checkbox va radiolar uchun qulay." },
        { p: "Bog'lash ikki xil usulda bo'ladi. <strong>Birinchi usul</strong> — <code>label</code>ning <code>for</code> atributini <code>input</code>ning <code>id</code> atributiga tenglashtirish:" },
        { code: [
          '<label for="ism">Ismingiz:</label>',
          '<input type="text" id="ism" name="ism">'
        ].join("\n") },
        { p: "<strong>Ikkinchi usul</strong> — <code>input</code>ni <code>label</code>ning ichiga joylash:" },
        { code: [
          '<label>',
          '  Ismingiz:',
          '  <input type="text" name="ism">',
          '</label>'
        ].join("\n") },
        { tip: "Har bir kiritish maydoniga <strong>label</strong> qo'shishni odat qiling. Bu foydalanish qulayligi (a11y) uchun juda muhim — ekran o'quvchi dasturlar maydonning nima uchun ekanini aynan label orqali biladi. Bosish sohasi ham kengayadi, bu telefonlarda qulay." },

        { h2: "Ochiluvchi ro'yxat: select va option" },
        { p: "<code>&lt;select&gt;</code> — bosilganda ochiladigan variantlar ro'yxati (dropdown). Har bir variant <code>&lt;option&gt;</code> tegi bilan yoziladi:" },
        { code: [
          '<label for="shahar">Shahringiz:</label>',
          '<select name="shahar" id="shahar">',
          '  <option value="toshkent">Toshkent</option>',
          '  <option value="samarqand">Samarqand</option>',
          '  <option value="buxoro">Buxoro</option>',
          '</select>'
        ].join("\n") },
        { p: "Har bir <code>&lt;option&gt;</code>ning <code>value</code> atributi — serverga yuboriladigan qiymat, teglar orasidagi matn esa — foydalanuvchi ko'radigan yozuv. Boshlang'ich (namuna) variant qo'shish uchun birinchi optionni <code>disabled selected</code> qilib qo'yish mumkin:" },
        { code: [
          '<select name="shahar">',
          '  <option value="" disabled selected>Shaharni tanlang</option>',
          '  <option value="toshkent">Toshkent</option>',
          '  <option value="samarqand">Samarqand</option>',
          '</select>'
        ].join("\n") },

        { h2: "Katta matn maydoni: textarea" },
        { p: "<code>&lt;input type=\"text\"&gt;</code> bitta qatorli. Agar foydalanuvchi <strong>uzun matn</strong> (izoh, xabar) yozishi kerak bo'lsa, <code>&lt;textarea&gt;</code> ishlatiladi. Bu — juft teg:" },
        { code: [
          '<label for="izoh">Izohingiz:</label>',
          '<textarea id="izoh" name="izoh" rows="5" cols="30" placeholder="Fikringizni yozing..."></textarea>'
        ].join("\n") },
        { p: "<code>rows</code> — ko'rinadigan qatorlar soni (balandlik), <code>cols</code> — ko'rinadigan ustunlar soni (kenglik)." },
        { warn: "<code>textarea</code>da boshlang'ich matn <code>value</code> atributida emas, balki ochuvchi va yopuvchi teg <strong>orasida</strong> yoziladi. Shu sababli ochuvchi va yopuvchi teg orasiga ortiqcha bo'shliq qo'ymang — u ham matn hisoblanadi." },

        { h2: "Tugmalar: button" },
        { p: "Formani <strong>yuborish</strong> uchun tugma kerak. Uni ikki xil usulda yasash mumkin:" },
        { code: [
          '<button type="submit">Yuborish</button>',
          '<input type="submit" value="Yuborish">'
        ].join("\n") },
        { p: "<code>&lt;button&gt;</code> tegining <code>type</code> atributi uch xil bo'ladi:" },
        { ul: [
          "<code>type=\"submit\"</code> — formani yuboradi (standart qiymat);",
          "<code>type=\"reset\"</code> — barcha maydonlarni tozalaydi (boshlang'ich holatga qaytaradi);",
          "<code>type=\"button\"</code> — hech narsa qilmaydi (JavaScript bilan boshqariladigan oddiy tugma)."
        ] },
        { tip: "<code>&lt;button&gt;</code> ni afzal ko'ring, chunki uning ichiga matn, rasm yoki boshqa teglarni joylash mumkin. <code>&lt;input type=\"submit\"&gt;</code> esa faqat oddiy matn qabul qiladi." },

        { h2: "Validatsiya atributlari" },
        { p: "HTML formani <strong>o'zi tekshira</strong> oladi — foydalanuvchi noto'g'ri ma'lumot kiritsa yoki majburiy maydonni bo'sh qoldirsa, forma yuborilmaydi. Buning uchun maxsus atributlar bor:" },
        { ul: [
          "<code>required</code> — maydonni to'ldirish <strong>majburiy</strong>. Bo'sh bo'lsa forma yuborilmaydi;",
          "<code>minlength</code> / <code>maxlength</code> — eng kam / eng ko'p belgilar soni;",
          "<code>min</code> / <code>max</code> — raqam va sana uchun eng kichik / eng katta qiymat;",
          "<code>pattern</code> — matn ma'lum bir namunaga (regexp shabloniga) mos kelishi kerak."
        ] },
        { code: [
          '<form action="/kirish" method="POST">',
          '  <label for="email">Email:</label>',
          '  <input type="email" id="email" name="email" required>',
          '',
          '  <label for="parol">Parol:</label>',
          '  <input type="password" id="parol" name="parol" required minlength="8">',
          '',
          '  <button type="submit">Kirish</button>',
          '</form>'
        ].join("\n") },
        { p: "Bu misolda: email maydoni to'ldirilishi shart va <code>@</code> belgisi bo'lishi kerak; parol maydoni to'ldirilishi shart va kamida 8 ta belgidan iborat bo'lishi kerak. Bu shartlar bajarilmasa, brauzer ogohlantirish ko'rsatadi va formani yubormaydi." },
        { warn: "HTML validatsiyasi — <strong>birinchi himoya qatlami</strong>, lekin u yetarli emas! Tajribali foydalanuvchi uni chetlab o'tishi mumkin. Shuning uchun serverda ham ma'lumotni <strong>albatta</strong> qayta tekshirish shart. HTML validatsiyasi — bu qulaylik, xavfsizlik emas." },

        { h2: "To'liq forma misoli" },
        { p: "Barcha o'rganilganlarni birlashtirgan ro'yxatdan o'tish formasi:" },
        { code: [
          '<form action="/royxat" method="POST">',
          '  <h2>Ro\'yxatdan o\'tish</h2>',
          '',
          '  <label for="ism">Ism:</label>',
          '  <input type="text" id="ism" name="ism" required>',
          '',
          '  <label for="email">Email:</label>',
          '  <input type="email" id="email" name="email" required>',
          '',
          '  <label for="yosh">Yosh:</label>',
          '  <input type="number" id="yosh" name="yosh" min="18" max="100">',
          '',
          '  <label for="shahar">Shahar:</label>',
          '  <select id="shahar" name="shahar">',
          '    <option value="toshkent">Toshkent</option>',
          '    <option value="samarqand">Samarqand</option>',
          '  </select>',
          '',
          '  <label>',
          '    <input type="checkbox" name="rozilik" required>',
          '    Men shartlarga roziman',
          '  </label>',
          '',
          '  <button type="submit">Ro\'yxatdan o\'tish</button>',
          '</form>'
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<code>&lt;form&gt;</code> — maydonlarni birlashtiradi; <code>action</code> (qayerga), <code>method</code> (GET/POST) atributlari bilan;",
          "<code>&lt;input&gt;</code> — <code>type</code> ga qarab har xil: <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>date</code>, <code>checkbox</code>, <code>radio</code>;",
          "<code>name</code> — serverga yuborishda maydon nomi (majburiy); <code>placeholder</code> — namuna matn;",
          "<code>&lt;label&gt;</code> — maydon yorlig'i, <code>for</code> orqali <code>id</code> ga bog'lanadi (a11y uchun muhim);",
          "<code>&lt;select&gt;</code>/<code>&lt;option&gt;</code> — ochiluvchi ro'yxat; <code>&lt;textarea&gt;</code> — ko'p qatorli matn;",
          "<code>&lt;button type=\"submit\"&gt;</code> — formani yuboradi;",
          "<code>required</code>, <code>minlength</code>, <code>min</code>/<code>max</code>, <code>pattern</code> — brauzer validatsiyasi (lekin serverda ham tekshiring!)."
        ] }
      ]
    },

    {
      slug: "html-semantik",
      title: "Semantik HTML",
      blurb: "Nega semantik teglar muhim; sahifa tuzilishi teglari (header, nav, main, section, article, aside, footer); foydalanish qulayligi (a11y) asoslari; SEO uchun foydasi va \"div sho'rvasi\"dan qochish.",
      body: [
        { lead: "Endi teglarni bilamiz. Lekin ularni <strong>to'g'ri</strong> ishlatish ham muhim. <strong>Semantik HTML</strong> — bu har bir teg o'zining <strong>ma'nosiga</strong> mos ishlatilishi. Ushbu darsda semantik teglar nima, nega ular muhim va sahifani qanday to'g'ri tuzishni o'rganamiz." },

        { h2: "Semantika nima va nega muhim?" },
        { p: "\"Semantika\" — bu <strong>ma'no</strong> degani. Semantik HTML — bu teglarni faqat ko'rinishi uchun emas, balki <strong>mazmuniga qarab</strong> tanlash. Masalan, sarlavha uchun <code>&lt;h1&gt;</code> ishlatiladi, chunki u <strong>sarlavha</strong> ma'nosini bildiradi — nafaqat matnni kattalashtiradi." },
        { p: "Taqqoslash uchun ikkita variantni ko'ring. Birinchisi — <strong>nosemantik</strong> (hamma joyda <code>div</code>):" },
        { code: [
          '<div class="header">',
          '  <div class="logo">Mening saytim</div>',
          '  <div class="menu">...</div>',
          '</div>',
          '<div class="main">',
          '  <div class="article">Maqola matni...</div>',
          '</div>',
          '<div class="footer">© 2026</div>'
        ].join("\n") },
        { p: "Ikkinchisi — <strong>semantik</strong> (har bir bo'lak o'z tegi bilan):" },
        { code: [
          '<header>',
          '  <div class="logo">Mening saytim</div>',
          '  <nav>...</nav>',
          '</header>',
          '<main>',
          '  <article>Maqola matni...</article>',
          '</main>',
          '<footer>© 2026</footer>'
        ].join("\n") },
        { p: "Ikkala variant ekranda <strong>bir xil</strong> ko'rinadi. Lekin ikkinchisi — brauzerga, qidiruv tizimlariga va ekran o'quvchi dasturlarga har bir bo'lak <strong>nima ekanini</strong> aytadi. Bu — katta farq." },

        { h2: "Asosiy semantik teglar" },
        { p: "HTML5 sahifaning turli qismlari uchun maxsus teglar taqdim etadi. Ular bir sahifaning odatiy tuzilishini tasvirlaydi:" },

        { h3: "header — sahifa yoki bo'lim boshi" },
        { p: "<code>&lt;header&gt;</code> — sahifaning yoki alohida bo'limning yuqori qismi. Odatda logotip, sayt nomi va asosiy menyu shu yerda bo'ladi:" },
        { code: [
          '<header>',
          '  <h1>Mening blogim</h1>',
          '  <p>Dasturlash haqida maqolalar</p>',
          '</header>'
        ].join("\n") },

        { h3: "nav — navigatsiya (menyu)" },
        { p: "<code>&lt;nav&gt;</code> — sahifadagi asosiy <strong>navigatsiya havolalari</strong> (menyu) uchun. Ekran o'quvchi dasturlar foydalanuvchiga to'g'ridan-to'g'ri menyuga o'tish imkonini beradi:" },
        { code: [
          '<nav>',
          '  <a href="/">Bosh sahifa</a>',
          '  <a href="/about">Biz haqimizda</a>',
          '  <a href="/contact">Aloqa</a>',
          '</nav>'
        ].join("\n") },

        { h3: "main — asosiy mazmun" },
        { p: "<code>&lt;main&gt;</code> — sahifaning <strong>asosiy, noyob</strong> mazmuni. Har bir sahifada <strong>faqat bitta</strong> <code>&lt;main&gt;</code> bo'lishi kerak. Unga menyu, footer kabi har sahifada takrorlanadigan narsalar kirmaydi:" },
        { code: [
          '<main>',
          '  <h1>Maqola sarlavhasi</h1>',
          '  <p>Sahifaning asosiy matni shu yerda.</p>',
          '</main>'
        ].join("\n") },

        { h3: "section — mantiqiy bo'lim" },
        { p: "<code>&lt;section&gt;</code> — mazmunning bir <strong>mantiqiy bo'limi</strong>. Har bir section odatda o'z sarlavhasiga ega bo'ladi:" },
        { code: [
          '<section>',
          '  <h2>Bizning xizmatlarimiz</h2>',
          '  <p>Xizmatlar tavsifi...</p>',
          '</section>',
          '<section>',
          '  <h2>Mijozlar fikri</h2>',
          '  <p>Sharhlar...</p>',
          '</section>'
        ].join("\n") },

        { h3: "article — mustaqil kontent" },
        { p: "<code>&lt;article&gt;</code> — <strong>mustaqil</strong>, o'zicha ma'noga ega kontent bo'lagi. Uni kontekstdan ajratib olsa ham mantiqiy bo'ladi. Masalan: blog posti, yangilik, mahsulot kartochkasi, foydalanuvchi izohi:" },
        { code: [
          '<article>',
          '  <h2>HTML nima?</h2>',
          '  <p>HTML — bu belgilash tili...</p>',
          '  <p>Muallif: Ali Valiyev</p>',
          '</article>'
        ].join("\n") },
        { note: "<strong>section</strong> va <strong>article</strong> farqi: <em>article</em> — o'zicha to'liq ma'noga ega (yolg'iz o'zi ham tushunarli, masalan bitta yangilik). <em>section</em> — kattaroq narsaning bir qismi (masalan, saytning \"Biz haqimizda\" bo'limi). Agar bo'lakni RSS'ga qo'shsa yoki boshqa joyga ko'chirsa mantiqli bo'lsa — bu article." },

        { h3: "aside — yon mazmun" },
        { p: "<code>&lt;aside&gt;</code> — asosiy mazmun bilan bog'liq, lekin <strong>ikkinchi darajali</strong> kontent: yon panel (sidebar), reklama, tegishli havolalar:" },
        { code: [
          '<aside>',
          '  <h3>Tegishli maqolalar</h3>',
          '  <ul>',
          '    <li><a href="#">CSS asoslari</a></li>',
          '    <li><a href="#">JavaScript kirish</a></li>',
          '  </ul>',
          '</aside>'
        ].join("\n") },

        { h3: "footer — sahifa yoki bo'lim oxiri" },
        { p: "<code>&lt;footer&gt;</code> — sahifaning yoki bo'limning pastki qismi. Odatda mualliflik huquqi, aloqa ma'lumotlari va qo'shimcha havolalar shu yerda bo'ladi:" },
        { code: [
          '<footer>',
          '  <p>© 2026 Mening saytim. Barcha huquqlar himoyalangan.</p>',
          '</footer>'
        ].join("\n") },

        { h2: "To'liq semantik sahifa tuzilishi" },
        { p: "Barcha semantik teglar birlashganda, tipik sahifa quyidagicha ko'rinadi:" },
        { code: [
          '<body>',
          '  <header>',
          '    <h1>Mening saytim</h1>',
          '    <nav>',
          '      <a href="/">Bosh sahifa</a>',
          '      <a href="/blog">Blog</a>',
          '    </nav>',
          '  </header>',
          '',
          '  <main>',
          '    <article>',
          '      <h2>Birinchi maqola</h2>',
          '      <p>Maqola matni shu yerda...</p>',
          '    </article>',
          '',
          '    <aside>',
          '      <h3>Reklama</h3>',
          '      <p>Yon paneldagi qo\'shimcha ma\'lumot.</p>',
          '    </aside>',
          '  </main>',
          '',
          '  <footer>',
          '    <p>© 2026 Mening saytim</p>',
          '  </footer>',
          '</body>'
        ].join("\n") },

        { h2: "Foydalanish qulayligi (a11y) asoslari" },
        { p: "<strong>A11y</strong> — bu \"accessibility\" so'zining qisqartmasi (a + 11 harf + y). U saytni <strong>nogironligi bor</strong> odamlar ham qulay ishlata olishini anglatadi. Masalan, ko'zi ojiz foydalanuvchilar <strong>ekran o'quvchi (screen reader)</strong> dasturlar orqali saytni \"eshitadi\"." },
        { p: "Semantik teglar a11y'ga bevosita yordam beradi:" },
        { ul: [
          "Ekran o'quvchi <code>&lt;nav&gt;</code> ni topib, foydalanuvchini to'g'ridan-to'g'ri menyuga o'tkazadi;",
          "<code>&lt;main&gt;</code> yordamida foydalanuvchi menyularni tashlab, darrov asosiy matnga o'tadi;",
          "To'g'ri sarlavhalar (<code>h1</code>-<code>h6</code>) sahifa tuzilishini \"eshitib\" tushunish imkonini beradi."
        ] },
        { p: "Boshqa muhim a11y qoidalari:" },
        { ul: [
          "Har bir <code>&lt;img&gt;</code> ga mazmunli <code>alt</code> yozing;",
          "Har bir forma maydoniga <code>&lt;label&gt;</code> bog'lang;",
          "Havola matni tushunarli bo'lsin (\"bu yerni bosing\" emas, \"narxlar ro'yxatini yuklab olish\");",
          "Ranglar orasida yetarli kontrast bo'lsin (bu ko'proq CSS bilan bog'liq)."
        ] },
        { tip: "A11y — bu nafaqat nogironlar uchun. Yaxshi a11y hamma uchun saytni qulayroq qiladi: klaviatura bilan navigatsiya, sekin internetda ham ishlaydigan alt matnlar va aniq tuzilish barcha foydalanuvchilarga foyda keltiradi." },

        { h2: "SEO uchun foydasi" },
        { p: "<strong>SEO</strong> (Search Engine Optimization) — saytni qidiruv tizimlarida (Google, Yandex) yuqori o'ringa chiqarish. Google robotlari sahifani o'qiganda, semantik teglar ularga mazmunni <strong>tushunishga</strong> yordam beradi:" },
        { ul: [
          "<code>&lt;h1&gt;</code> — sahifaning asosiy mavzusi nima ekanini bildiradi;",
          "<code>&lt;article&gt;</code> — bu yerda mustaqil, qimmatli kontent borligini ko'rsatadi;",
          "<code>&lt;nav&gt;</code> va <code>&lt;main&gt;</code> — sayt tuzilishini aniq ajratib beradi."
        ] },
        { p: "Natijada semantik jihatdan yaxshi tuzilgan sahifa qidiruv natijalarida yuqoriroq chiqishi mumkin. Nosemantik, faqat <code>div</code>'lardan iborat sahifada esa robot mazmunni tushunishga qiynaladi." },

        { h2: "\"div sho'rvasi\"dan qochish" },
        { p: "<strong>\"Div sho'rvasi\" (div soup)</strong> — bu butun sahifa faqat <code>&lt;div&gt;</code> teglaridan iborat bo'lgan holat. Bunday kodni o'qish qiyin, u a11y va SEO uchun yomon:" },
        { code: [
          '<div class="page">',
          '  <div class="top">',
          '    <div class="brand">Sayt</div>',
          '    <div class="links">',
          '      <div class="link">Bosh sahifa</div>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join("\n") },
        { p: "Bu kod ishlaydi, lekin hech qanday <strong>ma'no</strong> tashimaydi — barcha <code>div</code>'lar bir xil. To'g'ri yondashuv — ma'noga mos semantik teglarni ishlatish:" },
        { code: [
          '<header>',
          '  <div class="brand">Sayt</div>',
          '  <nav>',
          '    <a href="/">Bosh sahifa</a>',
          '  </nav>',
          '</header>'
        ].join("\n") },
        { warn: "<code>&lt;div&gt;</code> yomon teg emas! U hali ham kerak — <strong>sof bezak yoki joylashuv</strong> uchun (masalan, CSS bilan bir necha elementni guruhlash). Lekin agar bo'lak uchun <strong>mos semantik teg mavjud</strong> bo'lsa (header, nav, article...), o'shani ishlating. <code>div</code> — bu \"boshqa hech narsa mos kelmaganda\" tanlanadigan zaxira variant." },

        { h2: "Amaliy maslahatlar" },
        { p: "Sahifa yozayotganda o'zingizga savol bering: \"Bu bo'lak <strong>nima</strong>?\":" },
        { ul: [
          "Bu — sahifa boshi (logotip, menyu)? → <code>&lt;header&gt;</code>;",
          "Bu — havolalar to'plami (menyu)? → <code>&lt;nav&gt;</code>;",
          "Bu — sahifaning asosiy mazmuni? → <code>&lt;main&gt;</code>;",
          "Bu — mustaqil maqola yoki post? → <code>&lt;article&gt;</code>;",
          "Bu — mantiqiy bo'lim? → <code>&lt;section&gt;</code>;",
          "Bu — yordamchi/yon mazmun? → <code>&lt;aside&gt;</code>;",
          "Bu — sahifa oxiri (mualliflik, aloqa)? → <code>&lt;footer&gt;</code>;",
          "Hech biri mos kelmasa (faqat guruhlash kerak)? → <code>&lt;div&gt;</code>."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Semantik HTML</strong> — teglarni ko'rinishi uchun emas, <strong>ma'nosiga</strong> qarab tanlash;",
          "<code>&lt;header&gt;</code> (bosh), <code>&lt;nav&gt;</code> (menyu), <code>&lt;main&gt;</code> (asosiy mazmun, bittadan), <code>&lt;footer&gt;</code> (oxir);",
          "<code>&lt;section&gt;</code> (mantiqiy bo'lim), <code>&lt;article&gt;</code> (mustaqil kontent), <code>&lt;aside&gt;</code> (yon mazmun);",
          "Semantik teglar <strong>a11y</strong> (ekran o'quvchilar) va <strong>SEO</strong> (qidiruv tizimlari) uchun bevosita foyda beradi;",
          "\"<strong>Div sho'rvasi</strong>\"dan qoching — mos semantik teg bo'lsa, o'shani ishlating;",
          "<code>&lt;div&gt;</code> hali ham kerak, lekin faqat sof guruhlash/bezak uchun zaxira variant sifatida."
        ] }
      ]
    }
  ]
};
