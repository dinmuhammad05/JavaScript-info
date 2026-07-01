"use strict";

module.exports = {
  part: "5-qism: Backend dasturlash",
  chapter: "Ma'lumotlar bazalari",
  lessons: [
    {
      slug: "db-nima",
      title: "Ma'lumotlar bazasi nima?",
      blurb: "Ma'lumotlar bazasi nima uchun kerak, DBMS (ma'lumotlar bazasini boshqarish tizimi) nima, relatsion (SQL) va NoSQL bazalar farqi, jadval/qator/ustun tushunchalari, mashhur bazalar (PostgreSQL, MySQL, MongoDB) va qachon qaysi birini tanlash.",
      body: [
        { lead: "Har qanday jiddiy dastur ma'lumotni <strong>saqlashi</strong> kerak: foydalanuvchilar, buyurtmalar, xabarlar, rasmlar haqidagi ma'lumot. Dastur o'chib qayta ishga tushganda ham bu ma'lumot yo'qolmasligi shart. Aynan shu vazifani <em>ma'lumotlar bazasi</em> (database) bajaradi. Ushbu darsda ma'lumotlar bazasi nima ekanligini, nima uchun oddiy faylda saqlashdan yaxshiroq ekanligini va qanday turlari borligini o'rganamiz." },

        { h2: "Nima uchun ma'lumotlar bazasi kerak?" },
        { p: "Aytaylik, siz kichik dastur yozdingiz va foydalanuvchilar ro'yxatini oddiy matnli faylda saqlamoqchisiz. Boshida bu ishlaydi. Lekin dastur o'sgani sayin muammolar paydo bo'ladi:" },
        { ul: [
          "<strong>Qidiruv sekin</strong> — 1 million foydalanuvchi orasidan bittasini topish uchun butun faylni boshdan-oxir o'qib chiqishga to'g'ri keladi;",
          "<strong>Bir vaqtda yozish xavfli</strong> — ikki foydalanuvchi bir vaqtda faylni o'zgartirsa, ma'lumot buzilishi mumkin;",
          "<strong>Butunlikni tekshirish qiyin</strong> — masalan, bir email ikki marta ro'yxatdan o'tmasligini kafolatlash uchun har safar butun faylni tekshirish kerak;",
          "<strong>Qisman yozuv</strong> — fayl yozilayotganda dastur o'chib qolsa, yarim yozilgan buzuq ma'lumot qoladi;",
          "<strong>Murakkab so'rovlar</strong> — \"eng ko'p buyurtma bergan 10 mijozni topish\" kabi so'rovlarni faylga qo'llash deyarli imkonsiz."
        ] },
        { p: "Ma'lumotlar bazasi bu muammolarning barchasini hal qilish uchun maxsus yaratilgan. U ma'lumotni tez qidirish, xavfsiz saqlash, bir vaqtda ko'plab foydalanuvchilarga xizmat qilish va murakkab so'rovlarni bajarish uchun optimallashtirilgan." },

        { h2: "DBMS — ma'lumotlar bazasini boshqarish tizimi" },
        { p: "Aslida \"ma'lumotlar bazasi\" deganda biz ikki narsani nazarda tutamiz. Birinchisi — ma'lumotning o'zi (jadvallar, yozuvlar). Ikkinchisi — <strong>DBMS</strong> (Database Management System, ma'lumotlar bazasini boshqarish tizimi) — bu ma'lumotni saqlaydigan, o'qiydigan va boshqaradigan dastur." },
        { p: "PostgreSQL, MySQL, MongoDB — bularning barchasi aslida DBMS'lardir. Ular alohida dastur (ko'pincha <em>server</em>) sifatida ishlaydi. Sizning dasturingiz DBMS'ga <strong>so'rov</strong> (query) yuboradi, DBMS esa javob qaytaradi:" },
        { code: "Sizning dasturingiz  ---so'rov--->  DBMS (server)  <--->  Disk (ma'lumot)\n(Node.js)            <---javob----  (PostgreSQL)" },
        { note: "Bu arxitektura muhim: DBMS odatda alohida jarayon (ba'zan alohida kompyuter) sifatida ishlaydi. Sizning Node.js dasturingiz unga tarmoq orqali ulanadi. Shuning uchun bitta bazaga bir nechta dastur bir vaqtda ulanishi mumkin." },

        { h2: "Ikki katta oila: SQL va NoSQL" },
        { p: "Ma'lumotlar bazalari ikki katta guruhga bo'linadi:" },
        { ul: [
          "<strong>Relatsion (SQL) bazalar</strong> — ma'lumotni <em>jadvallar</em> ko'rinishida saqlaydi. Har bir jadval qat'iy tuzilishga (sxemaga) ega. Ular bilan ishlash uchun <strong>SQL</strong> tili ishlatiladi. Misollar: PostgreSQL, MySQL, SQLite, Oracle, SQL Server;",
          "<strong>NoSQL bazalar</strong> — ma'lumotni jadval emas, boshqa ko'rinishlarda (hujjatlar, kalit-qiymat juftliklari, graflar) saqlaydi. Tuzilish erkinroq. Misollar: MongoDB (hujjatli), Redis (kalit-qiymat), Cassandra."
        ] },
        { p: "\"SQL\" so'zi <em>Structured Query Language</em> (tuzilgan so'rovlar tili) ma'nosini bildiradi. Bu — relatsion bazalar bilan gaplashish uchun standart til. \"NoSQL\" esa \"SQL emas\" degani, ya'ni SQL tilidan foydalanmaydigan bazalarning umumiy nomi." },

        { h2: "Relatsion baza: jadval, qator, ustun" },
        { p: "Relatsion bazani tushunish uchun Excel jadvalini tasavvur qiling. Ma'lumot <strong>jadval</strong> (table) ko'rinishida saqlanadi. Masalan, <code>users</code> (foydalanuvchilar) jadvali:" },
        { code: "users jadvali:\n\n  id  |   name   |        email         | age\n ---- + -------- + -------------------- + -----\n   1  |  Ali     |  ali@mail.com        |  25\n   2  |  Vali    |  vali@mail.com       |  30\n   3  |  Guli    |  guli@mail.com       |  22" },
        { p: "Bu jadvalning asosiy qismlari:" },
        { ul: [
          "<strong>Ustun</strong> (column) — vertikal to'plam. Yuqorida <code>id</code>, <code>name</code>, <code>email</code>, <code>age</code> — bular ustunlar. Har bir ustunning nomi va turi bor (masalan, <code>age</code> — butun son);",
          "<strong>Qator</strong> (row) yoki yozuv (record) — gorizontal to'plam. Bitta qator bitta obyektni tasvirlaydi. Yuqoridagi 1-qator — bu \"Ali\" ismli foydalanuvchi;",
          "<strong>Katak</strong> (cell) — ustun va qator kesishmasidagi bitta qiymat (masalan, 1-qator, <code>name</code> ustuni = \"Ali\");",
          "<strong>Sxema</strong> (schema) — jadvalning tuzilishi: qanday ustunlar bor, ularning turlari qanday. Sxema oldindan belgilanadi."
        ] },
        { note: "Relatsion baza \"relatsion\" deb atalishining sababi — jadvallar bir-biri bilan <em>bog'lana</em> (relation) oladi. Masalan, <code>orders</code> (buyurtmalar) jadvali <code>users</code> jadvaliga bog'lanib, qaysi buyurtma qaysi foydalanuvchiga tegishli ekanligini ko'rsatishi mumkin. Bu haqda JOIN darsida batafsil gaplashamiz." },

        { h2: "NoSQL baza: hujjat ko'rinishi" },
        { p: "NoSQL bazalarning eng mashhuri — MongoDB. U ma'lumotni jadval emas, <strong>hujjat</strong> (document) ko'rinishida saqlaydi. Hujjat — bu JSON obyektiga juda o'xshash tuzilma:" },
        { code: "{\n  \"_id\": 1,\n  \"name\": \"Ali\",\n  \"email\": \"ali@mail.com\",\n  \"age\": 25,\n  \"hobbies\": [\"futbol\", \"kitob\"],\n  \"address\": { \"city\": \"Toshkent\", \"street\": \"Amir Temur\" }\n}" },
        { p: "E'tibor bering: hujjat ichida massiv (<code>hobbies</code>) va ichma-ich obyekt (<code>address</code>) bemalol saqlanishi mumkin. Bu SQL jadvalida murakkab bo'lardi. Bundan tashqari, bir hujjatda bir maydon bo'lsa, boshqasida bo'lmasligi mumkin — tuzilish qat'iy emas (bu \"schemaless\" deyiladi)." },
        { p: "Bir turdagi hujjatlar to'plami <strong>collection</strong> (kolleksiya) deb ataladi. SQL bilan taqqoslaganda:" },
        { code: "SQL              NoSQL (MongoDB)\n----------       ----------------\njadval (table)   kolleksiya (collection)\nqator (row)      hujjat (document)\nustun (column)   maydon (field)" },

        { h2: "Mashhur bazalar" },
        { h3: "PostgreSQL" },
        { p: "Kuchli, ochiq kodli relatsion baza. Ilg'or imkoniyatlari, ishonchliligi va standartlarga rioya qilishi bilan mashhur. JSON ma'lumotini ham qo'llaydi, ya'ni ham relatsion, ham qisman NoSQL vazifasini bajaradi. Ko'p tajribali backend dasturchilar birinchi tanlov sifatida PostgreSQL'ni tavsiya qiladi." },
        { h3: "MySQL" },
        { p: "Yana bir mashhur ochiq kodli relatsion baza. Uzoq tarixga ega, sozlash oson, veb-hostinglarda keng tarqalgan (WordPress kabi tizimlar undan foydalanadi). PostgreSQL bilan juda o'xshash, farqlari asosan ilg'or imkoniyatlarda." },
        { h3: "MongoDB" },
        { p: "Eng mashhur hujjatli NoSQL baza. Ma'lumot JSON-simon ko'rinishda saqlanadi, tuzilish erkin. Tez prototip yasash va tuzilishi tez o'zgaradigan loyihalar uchun qulay. Node.js dunyosida keng ishlatiladi, chunki ma'lumot ko'rinishi JavaScript obyektlariga juda o'xshaydi." },
        { note: "Yana ba'zi bazalar: <strong>SQLite</strong> — server talab qilmaydigan, bitta faylga saqlaydigan yengil relatsion baza (mobil ilovalar va kichik loyihalar uchun). <strong>Redis</strong> — juda tez, xotirada ishlaydigan kalit-qiymat bazasi (kesh va navbatlar uchun)." },

        { h2: "Qachon qaysi birini tanlash?" },
        { p: "Universal javob yo'q, lekin umumiy tavsiyalar quyidagicha:" },
        { ul: [
          "Ma'lumotingiz aniq tuzilishga ega bo'lsa (foydalanuvchilar, buyurtmalar, to'lovlar) va ular orasida ko'p bog'lanishlar bo'lsa — <strong>relatsion baza (PostgreSQL)</strong> tanlang;",
          "Pul, buyurtma, moliyaviy operatsiyalar bilan ishlasangiz, ya'ni ma'lumot butunligi juda muhim bo'lsa — <strong>relatsion baza</strong> (u \"tranzaksiyalar\" orqali ma'lumot butunligini kafolatlaydi);",
          "Ma'lumot tuzilishi noaniq yoki tez o'zgaradigan bo'lsa, ichma-ich murakkab obyektlar ko'p bo'lsa — <strong>MongoDB</strong> qulayroq bo'lishi mumkin;",
          "Juda tez o'qish/yozish kerak bo'lsa (kesh, sessiyalar) — <strong>Redis</strong> kabi xotira bazasi."
        ] },
        { tip: "Yangi boshlovchi uchun eng yaxshi maslahat: <strong>relatsion baza (PostgreSQL yoki MySQL) va SQL</strong> tilini o'rganishdan boshlang. SQL — bu 50 yildan beri ishlatilayotgan, deyarli barcha kompaniyalarda kerak bo'ladigan asosiy ko'nikma. Uni bilsangiz, boshqa bazalarni ham osonroq tushunasiz." },

        { h2: "Xulosa" },
        { ul: [
          "Ma'lumotlar bazasi — ma'lumotni tez, xavfsiz va ishonchli saqlash uchun maxsus tizim; oddiy fayldan ancha ustun;",
          "<strong>DBMS</strong> — ma'lumotni boshqaradigan dastur (server); dasturingiz unga so'rov yuboradi;",
          "<strong>Relatsion (SQL)</strong> bazalar ma'lumotni jadvallarda saqlaydi (qator, ustun, sxema) va <strong>SQL</strong> tilida boshqariladi;",
          "<strong>NoSQL</strong> bazalar (masalan MongoDB) ma'lumotni hujjatlar (JSON-simon) ko'rinishida, erkin tuzilishda saqlaydi;",
          "Mashhur bazalar: PostgreSQL, MySQL (relatsion), MongoDB (hujjatli), Redis (kalit-qiymat);",
          "Boshlovchi uchun eng foydali yo'l — PostgreSQL/MySQL va SQL tilini o'rganish."
        ] }
      ]
    },

    {
      slug: "sql-asoslar",
      title: "SQL asoslari",
      blurb: "SQL tilining asosiy buyruqlari: CREATE TABLE (ma'lumot turlari INT, VARCHAR va boshqalar), INSERT INTO, SELECT, WHERE (shartlar, AND/OR, LIKE), UPDATE, DELETE, ORDER BY va LIMIT. Real misollar bilan.",
      body: [
        { lead: "SQL (Structured Query Language) — relatsion bazalar bilan gaplashish tili. U bilan siz jadval yaratasiz, ma'lumot qo'shasiz, o'qiysiz, o'zgartirasiz va o'chirasiz. Ushbu darsda eng muhim SQL buyruqlarini o'rganamiz. Barcha misollar PostgreSQL/MySQL uslubida yozilgan (ular deyarli bir xil)." },

        { note: "SQL buyruqlari odatda BOSH HARFLAR bilan yoziladi (SELECT, FROM, WHERE), lekin bu majburiy emas — SQL katta-kichik harfga sezgir emas (kalit so'zlar uchun). An'ana bo'yicha kalit so'zlar bosh harfda, jadval va ustun nomlari kichik harfda yoziladi. Har bir buyruq oxirida nuqta-vergul <code>;</code> qo'yiladi." },

        { h2: "CREATE TABLE — jadval yaratish" },
        { p: "Har qanday ish jadval yaratishdan boshlanadi. <code>CREATE TABLE</code> buyrug'i jadval nomi va ustunlar ro'yxatini oladi. Har bir ustun uchun <strong>nom</strong> va <strong>tur</strong> ko'rsatiladi:" },
        { code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE,\n  age INT,\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMP DEFAULT NOW()\n);" },
        { p: "Bu yerda nima yuz berdi? <code>users</code> nomli jadval yaratildi va unda 6 ta ustun belgilandi. Endi turlarni va cheklovlarni ko'rib chiqamiz." },

        { h3: "Asosiy ma'lumot turlari" },
        { ul: [
          "<code>INT</code> (yoki <code>INTEGER</code>) — butun son (masalan, 25, -3, 1000);",
          "<code>VARCHAR(n)</code> — o'zgaruvchan uzunlikdagi matn, ko'pi bilan <code>n</code> ta belgi (masalan, <code>VARCHAR(100)</code>);",
          "<code>TEXT</code> — uzunligi cheklanmagan matn (uzun izohlar, maqolalar uchun);",
          "<code>BOOLEAN</code> — mantiqiy qiymat: <code>true</code> yoki <code>false</code>;",
          "<code>DECIMAL(p, s)</code> yoki <code>NUMERIC</code> — aniq kasrli son (pul uchun ideal, masalan <code>DECIMAL(10, 2)</code> — 2 kasr xonasi);",
          "<code>DATE</code> — sana (2026-07-01);",
          "<code>TIMESTAMP</code> — sana va vaqt birga;",
          "<code>SERIAL</code> — avtomatik o'suvchi butun son (PostgreSQL'da). Har yangi qatorda o'zi 1, 2, 3... bo'lib ortadi, odatda <code>id</code> uchun ishlatiladi."
        ] },
        { h3: "Cheklovlar (constraints)" },
        { ul: [
          "<code>PRIMARY KEY</code> — asosiy kalit: qatorni yagona aniqlaydigan ustun (takrorlanmaydi, bo'sh bo'lmaydi);",
          "<code>NOT NULL</code> — bu ustun bo'sh (NULL) bo'lishi mumkin emas;",
          "<code>UNIQUE</code> — qiymat takrorlanmasligi kerak (masalan, email);",
          "<code>DEFAULT qiymat</code> — agar qiymat berilmasa, shu standart qiymat qo'yiladi."
        ] },
        { note: "<code>NULL</code> — bu \"qiymat yo'q\", \"noma'lum\" degani. U 0 yoki bo'sh matndan farq qiladi. Masalan, foydalanuvchi yoshini ko'rsatmasa, <code>age</code> ustuni NULL bo'lishi mumkin." },

        { h2: "INSERT INTO — ma'lumot qo'shish" },
        { p: "Jadval tayyor bo'lgach, unga qator qo'shamiz. <code>INSERT INTO</code> buyrug'i jadval nomini, ustunlarni va qiymatlarni oladi:" },
        { code: "INSERT INTO users (name, email, age)\nVALUES ('Ali', 'ali@mail.com', 25);" },
        { p: "E'tibor bering: matn qiymatlar <strong>bitta tirnoq</strong> (<code>'Ali'</code>) ichida yoziladi, sonlar esa tirnoqsiz (<code>25</code>). Biz <code>id</code>, <code>is_active</code> va <code>created_at</code>ni ko'rsatmadik — ular avtomatik (SERIAL va DEFAULT) to'ldiriladi." },
        { p: "Bir necha qatorni bir vaqtda qo'shish uchun vergul bilan ajratiladi:" },
        { code: "INSERT INTO users (name, email, age) VALUES\n  ('Vali', 'vali@mail.com', 30),\n  ('Guli', 'guli@mail.com', 22),\n  ('Hasan', 'hasan@mail.com', 28);" },

        { h2: "SELECT — ma'lumot o'qish" },
        { p: "<code>SELECT</code> — eng ko'p ishlatiladigan buyruq. U jadvaldan ma'lumot o'qiydi. Barcha ustunlarni olish uchun yulduzcha <code>*</code> ishlatiladi:" },
        { code: "SELECT * FROM users;" },
        { p: "Faqat kerakli ustunlarni olish uchun ularning nomlarini sanab o'tamiz (bu tezroq va toza):" },
        { code: "SELECT name, email FROM users;" },
        { tip: "Amaliyotda <code>SELECT *</code> emas, balki aniq kerakli ustunlarni sanab o'tish yaxshi odat. Bu tarmoqdan kamroq ma'lumot uzatadi va kod nima olayotgani aniq ko'rinadi." },

        { h2: "WHERE — shart bo'yicha filtrlash" },
        { p: "Ko'pincha bizga hamma qator emas, faqat ma'lum shartga mos qatorlar kerak. <code>WHERE</code> shu uchun ishlatiladi:" },
        { code: "SELECT * FROM users WHERE age > 25;" },
        { p: "Solishtirish operatorlari: <code>=</code> (teng), <code>&lt;&gt;</code> yoki <code>!=</code> (teng emas), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Matn bilan solishtirish:" },
        { code: "SELECT * FROM users WHERE name = 'Ali';" },
        { h3: "AND va OR — bir necha shart" },
        { p: "Bir necha shartni birlashtirish uchun <code>AND</code> (va) hamda <code>OR</code> (yoki) ishlatiladi:" },
        { code: "-- yoshi 25 dan katta VA faol bo'lganlar\nSELECT * FROM users WHERE age > 25 AND is_active = true;\n\n-- ismi Ali YOKI Vali bo'lganlar\nSELECT * FROM users WHERE name = 'Ali' OR name = 'Vali';" },
        { h3: "LIKE — matn ichida qidirish" },
        { p: "<code>LIKE</code> operatori matn namunasi (pattern) bo'yicha qidiradi. Ikki maxsus belgi ishlatiladi: <code>%</code> — istalgan (nol yoki ko'p) belgilar, <code>_</code> — aniq bitta belgi:" },
        { code: "-- ismi 'A' harfi bilan boshlanadiganlar\nSELECT * FROM users WHERE name LIKE 'A%';\n\n-- emailida 'mail' so'zi qatnashadiganlar\nSELECT * FROM users WHERE email LIKE '%mail%';\n\n-- ismi aynan 4 harfli va 'A' bilan boshlananuvchi\nSELECT * FROM users WHERE name LIKE 'A___';" },
        { h3: "Boshqa foydali shartlar" },
        { code: "-- ma'lum ro'yxatdagi qiymatlar\nSELECT * FROM users WHERE age IN (22, 25, 30);\n\n-- oraliqda (chegaralar kiradi)\nSELECT * FROM users WHERE age BETWEEN 20 AND 30;\n\n-- qiymati yo'q (NULL) bo'lganlar\nSELECT * FROM users WHERE age IS NULL;" },
        { warn: "NULL bilan solishtirishda <code>=</code> ishlatilmaydi! <code>age = NULL</code> hech qachon <code>true</code> bermaydi. To'g'ri usul — <code>IS NULL</code> yoki <code>IS NOT NULL</code>." },

        { h2: "ORDER BY — saralash" },
        { p: "Natijani tartiblash uchun <code>ORDER BY</code> ishlatiladi. <code>ASC</code> — o'sish bo'yicha (standart), <code>DESC</code> — kamayish bo'yicha:" },
        { code: "-- yosh bo'yicha o'sish tartibida\nSELECT * FROM users ORDER BY age ASC;\n\n-- yosh bo'yicha kamayish (kattadan kichikka)\nSELECT * FROM users ORDER BY age DESC;\n\n-- avval yosh bo'yicha, keyin ism bo'yicha\nSELECT * FROM users ORDER BY age DESC, name ASC;" },

        { h2: "LIMIT — natijani cheklash" },
        { p: "<code>LIMIT</code> qaytariladigan qatorlar sonini cheklaydi. Bu \"eng katta 5 ta\" kabi so'rovlar uchun juda foydali:" },
        { code: "-- eng yosh 3 ta foydalanuvchi\nSELECT * FROM users ORDER BY age ASC LIMIT 3;\n\n-- 5-qatordan boshlab 10 ta olish (sahifalash uchun)\nSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 5;" },
        { tip: "<code>LIMIT</code> va <code>OFFSET</code> birgalikda \"sahifalash\" (pagination) uchun ishlatiladi. Masalan, har sahifada 10 ta natija ko'rsatsangiz: 1-sahifa <code>LIMIT 10 OFFSET 0</code>, 2-sahifa <code>LIMIT 10 OFFSET 10</code> va hokazo." },

        { h2: "UPDATE — ma'lumotni o'zgartirish" },
        { p: "<code>UPDATE</code> mavjud qatorlarni o'zgartiradi. <code>SET</code> qaysi ustunni qanday qiymatga o'zgartirishni, <code>WHERE</code> esa qaysi qatorlarni belgilaydi:" },
        { code: "-- id = 1 bo'lgan foydalanuvchining yoshini o'zgartirish\nUPDATE users SET age = 26 WHERE id = 1;\n\n-- bir vaqtda bir necha ustun\nUPDATE users SET age = 26, is_active = false WHERE id = 1;" },
        { warn: "<strong>Juda muhim:</strong> <code>UPDATE</code>da <code>WHERE</code>ni unutmang! Agar <code>WHERE</code>siz yozsangiz — <code>UPDATE users SET age = 0;</code> — bu <strong>barcha</strong> qatorlarning yoshini o'zgartiradi. Bu ko'p yangi boshlovchilarning eng katta xatosi." },

        { h2: "DELETE — ma'lumotni o'chirish" },
        { p: "<code>DELETE</code> qatorlarni o'chiradi. Bu ham <code>WHERE</code> bilan ishlatiladi:" },
        { code: "-- id = 3 bo'lgan foydalanuvchini o'chirish\nDELETE FROM users WHERE id = 3;\n\n-- 18 yoshdan kichiklarni o'chirish\nDELETE FROM users WHERE age < 18;" },
        { warn: "<code>DELETE FROM users;</code> — <code>WHERE</code>siz yozilsa, jadvaldagi BARCHA qatorlarni o'chiradi! Har doim avval <code>SELECT</code> bilan qaysi qatorlar o'chishini tekshirib ko'ring, keyin xuddi shu <code>WHERE</code> bilan <code>DELETE</code> qiling." },

        { h2: "Xulosa" },
        { ul: [
          "<code>CREATE TABLE</code> — jadval yaratadi, har ustun uchun tur (INT, VARCHAR, BOOLEAN...) va cheklov (PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT) beriladi;",
          "<code>INSERT INTO ... VALUES</code> — yangi qator(lar) qo'shadi; matn bitta tirnoqda;",
          "<code>SELECT ustunlar FROM jadval</code> — ma'lumot o'qiydi; <code>*</code> barcha ustun;",
          "<code>WHERE</code> — shart bo'yicha filtrlaydi; <code>AND</code>, <code>OR</code>, <code>LIKE</code>, <code>IN</code>, <code>BETWEEN</code>, <code>IS NULL</code>;",
          "<code>ORDER BY</code> — saralaydi (ASC/DESC); <code>LIMIT</code>/<code>OFFSET</code> — natijani cheklaydi;",
          "<code>UPDATE ... SET ... WHERE</code> — o'zgartiradi; <code>DELETE FROM ... WHERE</code> — o'chiradi;",
          "<strong>WHERE'ni unutmaslik</strong> — UPDATE va DELETE'da eng muhim ehtiyot chorasi."
        ] }
      ]
    },

    {
      slug: "sql-join",
      title: "SQL: bog'lanishlar va JOIN",
      blurb: "Jadvallarni bog'lash: PRIMARY KEY va FOREIGN KEY, munosabatlar (1:N), JOIN turlari (INNER, LEFT, RIGHT), GROUP BY va agregat funksiyalar (COUNT, SUM, AVG), HAVING orqali guruhlarni filtrlash.",
      body: [
        { lead: "Relatsion bazaning eng kuchli tomoni — jadvallarni bir-biriga <strong>bog'lash</strong> qobiliyatidir. Ma'lumot bir joyda takrorlanmasligi uchun uni bir necha jadvalga bo'lamiz, so'ng <code>JOIN</code> orqali birlashtirib o'qiymiz. Ushbu darsda kalitlar, munosabatlar, JOIN turlari va guruhlash bilan tanishamiz." },

        { h2: "Nima uchun ma'lumotni bo'lamiz?" },
        { p: "Aytaylik, foydalanuvchilar va ularning buyurtmalarini bitta jadvalda saqlamoqchimiz. Har buyurtma qatorida foydalanuvchi ismini takrorlashga to'g'ri keladi:" },
        { code: "Yomon usul (hamma narsa bitta jadvalda):\n\n order_id |  user_name | product   | price\n -------- + ---------- + --------- + -----\n    1     |   Ali      | Kitob     | 50\n    2     |   Ali      | Ruchka    | 5\n    3     |   Vali     | Daftar    | 10" },
        { p: "Bu yerda \"Ali\" ikki marta yozilgan. Agar Ali ismini o'zgartirsak, ikkala qatorni ham yangilashimiz kerak. Ma'lumot ko'p bo'lsa, bu chalkashlik va xatolikka olib keladi. To'g'ri yechim — ma'lumotni ikki jadvalga bo'lish:" },
        { code: "users jadvali:            orders jadvali:\n id |  name              id | user_id | product | price\n -- + -----             -- + ------- + ------- + -----\n  1 |  Ali               1 |    1    | Kitob   |  50\n  2 |  Vali              2 |    1    | Ruchka  |   5\n                        3 |    2    | Daftar  |  10" },
        { p: "Endi \"Ali\" faqat bir marta saqlanadi. <code>orders</code> jadvalidagi <code>user_id</code> ustuni qaysi foydalanuvchiga tegishli ekanligini ko'rsatadi. Bu — jadvallar orasidagi <strong>bog'lanish</strong>." },

        { h2: "PRIMARY KEY — asosiy kalit" },
        { p: "Har bir jadvalda odatda <strong>asosiy kalit</strong> (primary key) bo'ladi — bu qatorni yagona aniqlaydigan ustun. Uning qiymati takrorlanmaydi va hech qachon NULL bo'lmaydi. Odatda bu <code>id</code> ustuni:" },
        { code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);" },
        { p: "Yuqorida <code>id</code> — asosiy kalit. Bazadagi har bir foydalanuvchining o'ziga xos <code>id</code>si bor: 1, 2, 3... Ana shu <code>id</code> orqali biz uni boshqa jadvallardan aniq topa olamiz." },

        { h2: "FOREIGN KEY — tashqi kalit" },
        { p: "<strong>Tashqi kalit</strong> (foreign key) — bir jadvaldagi ustun boshqa jadvalning asosiy kalitiga ishora qiladi. <code>orders</code> jadvalidagi <code>user_id</code> — bu tashqi kalit, u <code>users</code> jadvalining <code>id</code>siga bog'langan:" },
        { code: "CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  product VARCHAR(100),\n  price DECIMAL(10, 2)\n);" },
        { p: "<code>REFERENCES users(id)</code> qismi bazaga aytadi: \"bu <code>user_id</code> ustuni <code>users</code> jadvalining <code>id</code>siga ishora qiladi\". Bu bog'lanish ma'lumot butunligini kafolatlaydi." },
        { note: "Tashqi kalit tufayli baza mavjud bo'lmagan foydalanuvchiga buyurtma qo'shishga ruxsat bermaydi. Masalan, agar <code>users</code>da <code>id = 99</code> yo'q bo'lsa, <code>orders</code>ga <code>user_id = 99</code> qo'sha olmaysiz — baza xatolik beradi. Bu \"ma'lumot butunligi\" (referential integrity) deyiladi." },

        { h2: "Munosabatlar: 1:N" },
        { p: "Jadvallar orasida turli munosabatlar bo'ladi. Eng keng tarqalgani — <strong>bir-ko'p</strong> (one-to-many, 1:N):" },
        { ul: [
          "<strong>1:N (bir-ko'p)</strong> — bir foydalanuvchining ko'p buyurtmasi bo'lishi mumkin, lekin har buyurtma faqat bitta foydalanuvchiga tegishli. Yuqoridagi misol shunday;",
          "<strong>1:1 (bir-bir)</strong> — bir foydalanuvchining bitta profili (kamroq uchraydi);",
          "<strong>N:M (ko'p-ko'p)</strong> — masalan, bir talaba ko'p kursga yozilishi, bir kursda ko'p talaba bo'lishi mumkin. Bu holatda oraliq (bog'lovchi) jadval kerak bo'ladi."
        ] },

        { h2: "JOIN — jadvallarni birlashtirish" },
        { p: "Endi eng qiziq qismi. Bizga \"har buyurtma qaysi foydalanuvchiniki\" degan savolga javob kerak — ya'ni ikki jadvalni birlashtirib o'qishimiz kerak. Buning uchun <code>JOIN</code> ishlatiladi." },
        { h3: "INNER JOIN" },
        { p: "<code>INNER JOIN</code> ikki jadvaldagi <strong>mos keluvchi</strong> qatorlarni birlashtiradi. Faqat ikkala tomonda ham mosligi bor qatorlar natijaga tushadi:" },
        { code: "SELECT users.name, orders.product, orders.price\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;" },
        { p: "<code>ON orders.user_id = users.id</code> — bu bog'lanish sharti: buyurtmadagi <code>user_id</code> foydalanuvchining <code>id</code>siga teng bo'lgan qatorlarni birlashtir. Natija:" },
        { code: " name  | product | price\n ----- + ------- + -----\n Ali   | Kitob   |  50\n Ali   | Ruchka  |   5\n Vali  | Daftar  |  10" },
        { tip: "Jadval nomlarini har safar yozish uzun bo'ladi. Shuning uchun <em>taxallus</em> (alias) beriladi: <code>FROM orders o INNER JOIN users u ON o.user_id = u.id</code>. Endi <code>o</code> va <code>u</code> deb qisqartirasiz." },
        { h3: "LEFT JOIN" },
        { p: "<code>LEFT JOIN</code> chap jadvaldagi (FROM'dan keyingi) <strong>barcha</strong> qatorlarni oladi, o'ng jadvalda mos kelmasa ham. Mos kelmagan joylar NULL bilan to'ldiriladi:" },
        { code: "-- barcha foydalanuvchilar, buyurtmasi bo'lmaganlar ham\nSELECT users.name, orders.product\nFROM users\nLEFT JOIN orders ON orders.user_id = users.id;" },
        { p: "Agar biror foydalanuvchining hech qanday buyurtmasi bo'lmasa, u baribir natijada ko'rinadi, lekin <code>product</code> ustuni NULL bo'ladi. Bu \"buyurtma bermagan foydalanuvchilarni topish\" kabi savollar uchun juda foydali." },
        { h3: "RIGHT JOIN" },
        { p: "<code>RIGHT JOIN</code> — LEFT JOIN'ning aksi: o'ng jadvaldagi barcha qatorlarni oladi. Amaliyotda kamroq ishlatiladi, chunki jadvallar o'rnini almashtirib LEFT JOIN qilish mumkin." },
        { note: "Farqni eslab qolish oson: <strong>INNER</strong> — faqat ikkala tomonda mosligi bor qatorlar; <strong>LEFT</strong> — chap jadvalning hammasi; <strong>RIGHT</strong> — o'ng jadvalning hammasi. Ko'p hollarda sizga INNER yoki LEFT JOIN yetarli bo'ladi." },

        { h2: "GROUP BY va agregat funksiyalar" },
        { p: "Ko'pincha bizga alohida qatorlar emas, <strong>umumlashtirilgan</strong> ma'lumot kerak: \"nechta buyurtma bor?\", \"jami summa qancha?\", \"o'rtacha narx?\". Buning uchun <em>agregat funksiyalar</em> ishlatiladi:" },
        { ul: [
          "<code>COUNT(*)</code> — qatorlar sonini sanaydi;",
          "<code>SUM(ustun)</code> — qiymatlar yig'indisi;",
          "<code>AVG(ustun)</code> — o'rtacha qiymat;",
          "<code>MIN(ustun)</code> / <code>MAX(ustun)</code> — eng kichik / eng katta qiymat."
        ] },
        { p: "Oddiy agregat (butun jadval bo'yicha):" },
        { code: "-- jami nechta buyurtma bor?\nSELECT COUNT(*) FROM orders;\n\n-- barcha buyurtmalar summasi va o'rtacha narxi\nSELECT SUM(price), AVG(price) FROM orders;" },
        { p: "Endi eng muhimi. <code>GROUP BY</code> qatorlarni guruhlarga bo'ladi va agregatni <strong>har bir guruh uchun</strong> hisoblaydi. Masalan, \"har bir foydalanuvchi nechta buyurtma bergan?\":" },
        { code: "SELECT user_id, COUNT(*) AS buyurtmalar_soni\nFROM orders\nGROUP BY user_id;" },
        { p: "Natija — har bir <code>user_id</code> uchun bitta qator, va uning yonida buyurtmalar soni. <code>AS</code> kalit so'zi natija ustuniga nom (taxallus) beradi." },
        { p: "GROUP BY'ni JOIN bilan birlashtirib, ismlar bilan chiroyliroq natija olamiz:" },
        { code: "SELECT u.name, COUNT(o.id) AS buyurtmalar_soni, SUM(o.price) AS jami\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.name;" },
        { warn: "<code>GROUP BY</code> ishlatilganda <code>SELECT</code>dagi har bir ustun yo <code>GROUP BY</code>da bo'lishi, yoki agregat funksiya ichida bo'lishi kerak. Masalan, <code>SELECT product, COUNT(*) FROM orders GROUP BY user_id</code> xato — <code>product</code> guruhlanmagan va agregatda ham emas." },

        { h2: "HAVING — guruhlarni filtrlash" },
        { p: "<code>WHERE</code> alohida qatorlarni filtrlaydi, lekin u <strong>guruhlashdan oldin</strong> ishlaydi. Guruhlangan natijani (agregatni) filtrlash uchun <code>HAVING</code> ishlatiladi:" },
        { code: "-- 2 tadan ortiq buyurtma bergan foydalanuvchilar\nSELECT user_id, COUNT(*) AS soni\nFROM orders\nGROUP BY user_id\nHAVING COUNT(*) > 2;" },
        { note: "Farqni yaxshi eslab qoling: <strong>WHERE</strong> — guruhlashdan oldin, alohida qatorlarga qo'llanadi; <strong>HAVING</strong> — guruhlashdan keyin, guruhlarga (agregat natijalarga) qo'llanadi. Ular birga ham ishlatiladi." },
        { p: "To'liq tartibda SQL so'rovi quyidagi ketma-ketlikda yoziladi:" },
        { code: "SELECT ustunlar\nFROM jadval\nJOIN boshqa_jadval ON shart\nWHERE qatorlar_sharti\nGROUP BY ustun\nHAVING guruh_sharti\nORDER BY ustun\nLIMIT n;" },

        { h2: "Xulosa" },
        { ul: [
          "<strong>PRIMARY KEY</strong> — qatorni yagona aniqlaydigan kalit (odatda <code>id</code>);",
          "<strong>FOREIGN KEY</strong> (<code>REFERENCES</code>) — boshqa jadvalning kalitiga ishora, bog'lanishni yaratadi;",
          "Munosabatlar: eng keng tarqalgani <strong>1:N</strong> (bir foydalanuvchi — ko'p buyurtma);",
          "<code>INNER JOIN</code> — faqat mos qatorlar; <code>LEFT JOIN</code> — chap jadvalning hammasi (mos kelmagani NULL bilan);",
          "Agregat funksiyalar: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>;",
          "<code>GROUP BY</code> — guruhlaydi, agregatni har guruh uchun hisoblaydi; <code>HAVING</code> — guruhlarni filtrlaydi (WHERE'dan farqli)."
        ] }
      ]
    },

    {
      slug: "mongodb",
      title: "MongoDB (NoSQL)",
      blurb: "MongoDB asoslari: kolleksiya va hujjat (JSON-simon), insertOne/insertMany, find/findOne (filtrlar), updateOne ($set), deleteOne, so'rov operatorlari ($gt, $in, $lt), va SQL bilan bosqichma-bosqich taqqoslash.",
      body: [
        { lead: "MongoDB — eng mashhur hujjatli NoSQL baza. U ma'lumotni jadval emas, JSON-simon <strong>hujjatlar</strong> ko'rinishida saqlaydi. Node.js dasturchilari uni yaxshi ko'radi, chunki hujjatlar JavaScript obyektlariga juda o'xshaydi. Ushbu darsda MongoDB'ning asosiy amallarini o'rganamiz va ularni SQL bilan solishtiramiz." },

        { h2: "Kolleksiya va hujjat" },
        { p: "MongoDB'da ma'lumot ikki darajali tuzilishda saqlanadi:" },
        { ul: [
          "<strong>Hujjat</strong> (document) — bitta yozuv, JSON obyektiga o'xshash. SQL'dagi \"qator\" (row) ga to'g'ri keladi;",
          "<strong>Kolleksiya</strong> (collection) — bir turdagi hujjatlar to'plami. SQL'dagi \"jadval\" (table) ga to'g'ri keladi;",
          "<strong>Baza</strong> (database) — kolleksiyalar to'plami."
        ] },
        { p: "Hujjat quyidagicha ko'rinadi (BSON, ya'ni JSON'ning ichki formati):" },
        { code: "{\n  \"_id\": ObjectId(\"64a1f...\"),\n  \"name\": \"Ali\",\n  \"email\": \"ali@mail.com\",\n  \"age\": 25,\n  \"hobbies\": [\"futbol\", \"kitob\"]\n}" },
        { note: "Har bir hujjat avtomatik <code>_id</code> maydoniga ega bo'ladi — bu SQL'dagi PRIMARY KEY'ga o'xshaydi. Agar siz <code>_id</code> bermasangiz, MongoDB o'zi <code>ObjectId</code> — takrorlanmaydigan maxsus identifikator yaratadi." },

        { h2: "SQL bilan atamalar taqqosi" },
        { p: "MongoDB'ga o'tishdan oldin atamalarni SQL bilan solishtirib olaylik:" },
        { code: "SQL              MongoDB\n-------------    ----------------------\ndatabase         database\ntable (jadval)   collection (kolleksiya)\nrow (qator)      document (hujjat)\ncolumn (ustun)   field (maydon)\nPRIMARY KEY id   _id\nINSERT           insertOne / insertMany\nSELECT           find / findOne\nUPDATE           updateOne / updateMany\nDELETE           deleteOne / deleteMany\nWHERE            filtr obyekti { ... }" },

        { h2: "Hujjat qo'shish: insertOne va insertMany" },
        { p: "Yangi hujjat qo'shish uchun <code>insertOne</code> ishlatiladi. Buyruqlar JavaScript obyekti sifatida yoziladi:" },
        { code: "db.users.insertOne({\n  name: \"Ali\",\n  email: \"ali@mail.com\",\n  age: 25\n});" },
        { p: "Bu yerda <code>db.users</code> — <code>users</code> kolleksiyasi (agar mavjud bo'lmasa, avtomatik yaratiladi). Bir necha hujjatni birdaniga qo'shish uchun <code>insertMany</code> massiv qabul qiladi:" },
        { code: "db.users.insertMany([\n  { name: \"Vali\", email: \"vali@mail.com\", age: 30 },\n  { name: \"Guli\", email: \"guli@mail.com\", age: 22 }\n]);" },
        { p: "SQL bilan solishtiring: SQL'da avval <code>CREATE TABLE</code> bilan tuzilishni belgilash kerak edi. MongoDB'da esa hujjatni to'g'ridan-to'g'ri qo'shasiz — tuzilish oldindan belgilanmaydi." },

        { h2: "Ma'lumot o'qish: find va findOne" },
        { p: "Hujjatlarni o'qish uchun <code>find</code> ishlatiladi. Bo'sh <code>{}</code> filtr barcha hujjatlarni qaytaradi (SQL'dagi <code>SELECT *</code> kabi):" },
        { code: "db.users.find({});          // barcha foydalanuvchilar\ndb.users.findOne({});       // faqat bitta (birinchi) hujjat" },
        { p: "Filtrlash uchun <code>find</code> ichiga obyekt beriladi. Bu obyekt SQL'dagi <code>WHERE</code> vazifasini bajaradi:" },
        { code: "// SQL:     SELECT * FROM users WHERE name = 'Ali';\ndb.users.find({ name: \"Ali\" });\n\n// SQL:     SELECT * FROM users WHERE age = 25;\ndb.users.find({ age: 25 });" },
        { p: "Agar obyektda bir necha maydon bo'lsa, ular <strong>VA</strong> (AND) bilan birlashadi:" },
        { code: "// SQL:  ... WHERE name = 'Ali' AND age = 25;\ndb.users.find({ name: \"Ali\", age: 25 });" },
        { tip: "Faqat kerakli maydonlarni olish uchun <code>find</code>ning ikkinchi argumenti (projection) beriladi: <code>db.users.find({}, { name: 1, email: 1 })</code> — bu faqat <code>name</code> va <code>email</code> (hamda <code>_id</code>) qaytaradi. Bu SQL'dagi <code>SELECT name, email</code> ga o'xshaydi." },

        { h2: "So'rov operatorlari: $gt, $lt, $in va boshqalar" },
        { p: "\"Katta\", \"kichik\", \"ro'yxatda\" kabi shartlar uchun MongoDB maxsus operatorlardan foydalanadi. Ular <code>$</code> belgisi bilan boshlanadi va obyekt ichida yoziladi:" },
        { ul: [
          "<code>$gt</code> — katta (greater than), <code>$gte</code> — katta yoki teng;",
          "<code>$lt</code> — kichik (less than), <code>$lte</code> — kichik yoki teng;",
          "<code>$ne</code> — teng emas (not equal);",
          "<code>$in</code> — ro'yxatdagi qiymatlardan biri;",
          "<code>$nin</code> — ro'yxatda yo'q."
        ] },
        { code: "// SQL:  ... WHERE age > 25;\ndb.users.find({ age: { $gt: 25 } });\n\n// SQL:  ... WHERE age >= 20 AND age <= 30;\ndb.users.find({ age: { $gte: 20, $lte: 30 } });\n\n// SQL:  ... WHERE age IN (22, 25, 30);\ndb.users.find({ age: { $in: [22, 25, 30] } });" },
        { p: "<code>OR</code> shartini yozish uchun <code>$or</code> operatori ishlatiladi (u shartlar massivini oladi):" },
        { code: "// SQL:  ... WHERE name = 'Ali' OR name = 'Vali';\ndb.users.find({\n  $or: [\n    { name: \"Ali\" },\n    { name: \"Vali\" }\n  ]\n});" },
        { note: "Saralash va cheklash ham bor: <code>db.users.find().sort({ age: -1 }).limit(3)</code> — yosh bo'yicha kamayish tartibida (<code>-1</code>) 3 ta hujjat. Bu SQL'dagi <code>ORDER BY age DESC LIMIT 3</code> ga teng. <code>1</code> — o'sish, <code>-1</code> — kamayish." },

        { h2: "Ma'lumotni o'zgartirish: updateOne va $set" },
        { p: "Hujjatni o'zgartirish uchun <code>updateOne</code> ikki argument oladi: (1) qaysi hujjat(lar)ni topish (filtr), (2) qanday o'zgartirish. O'zgartirishda <code>$set</code> operatori ishlatiladi:" },
        { code: "// SQL:  UPDATE users SET age = 26 WHERE name = 'Ali';\ndb.users.updateOne(\n  { name: \"Ali\" },        // qaysi hujjat\n  { $set: { age: 26 } }   // nimani o'zgartirish\n);" },
        { warn: "<code>$set</code>ni unutmang! Agar shunchaki <code>db.users.updateOne({ name: \"Ali\" }, { age: 26 })</code> yozsangiz, MongoDB butun hujjatni <code>{ age: 26 }</code> bilan <strong>almashtiradi</strong> — <code>name</code>, <code>email</code> va boshqa maydonlar yo'qoladi! <code>$set</code> esa faqat ko'rsatilgan maydonni o'zgartiradi." },
        { p: "Bir necha hujjatni bir vaqtda o'zgartirish uchun <code>updateMany</code> ishlatiladi:" },
        { code: "// 25 yoshdan kichiklarning hammasini faolsizlantirish\ndb.users.updateMany(\n  { age: { $lt: 25 } },\n  { $set: { is_active: false } }\n);" },
        { tip: "Boshqa foydali o'zgartirish operatorlari: <code>$inc</code> — sonni oshiradi/kamaytiradi (<code>{ $inc: { age: 1 } }</code> — yoshni 1ga oshiradi), <code>$push</code> — massivga element qo'shadi, <code>$unset</code> — maydonni o'chiradi." },

        { h2: "Hujjatni o'chirish: deleteOne va deleteMany" },
        { p: "O'chirish uchun <code>deleteOne</code> (birinchi mos hujjatni) yoki <code>deleteMany</code> (barcha mos hujjatlarni) ishlatiladi:" },
        { code: "// SQL:  DELETE FROM users WHERE name = 'Guli';\ndb.users.deleteOne({ name: \"Guli\" });\n\n// SQL:  DELETE FROM users WHERE age < 18;\ndb.users.deleteMany({ age: { $lt: 18 } });" },
        { warn: "<code>db.users.deleteMany({})</code> — bo'sh filtr bilan chaqirilsa, kolleksiyadagi BARCHA hujjatlarni o'chiradi! SQL'dagi <code>DELETE FROM users;</code> kabi ehtiyot bo'ling." },

        { h2: "MongoDB'ning kuchli va zaif tomonlari" },
        { p: "MongoDB har doim ham eng yaxshi tanlov emas. Uni tanlashdan oldin farqlarni bilish muhim:" },
        { ul: [
          "<strong>Kuchli:</strong> erkin tuzilish (tez o'zgaradigan ma'lumot uchun qulay), ichma-ich murakkab obyektlarni bemalol saqlaydi, JavaScript bilan tabiiy ishlaydi, katta hajmda gorizontal kengayadi;",
          "<strong>Zaif:</strong> murakkab bog'lanishlar (JOIN) uchun SQL kabi qulay emas, ma'lumot ko'pincha takrorlanadi, moliyaviy operatsiyalar uchun (tranzaksiyalar) SQL bazalar kuchliroq va sinovdan o'tgan."
        ] },
        { note: "Ko'p JOIN va murakkab hisobotlar kerak bo'lsa — SQL bazani tanlang. Ma'lumot tuzilishi tez o'zgarsa yoki hujjat ko'rinishi tabiiy bo'lsa (masalan, mahsulot katalogi turli xususiyatlar bilan) — MongoDB qulay bo'lishi mumkin." },

        { h2: "Xulosa" },
        { ul: [
          "MongoDB ma'lumotni <strong>kolleksiya</strong> (jadval) va <strong>hujjat</strong> (qator) ko'rinishida saqlaydi; hujjat JSON-simon;",
          "<code>insertOne</code>/<code>insertMany</code> — qo'shadi; tuzilish oldindan belgilanmaydi;",
          "<code>find</code>/<code>findOne</code> — o'qiydi; filtr obyekti <code>WHERE</code> vazifasini bajaradi;",
          "Operatorlar: <code>$gt</code>, <code>$lt</code>, <code>$gte</code>, <code>$lte</code>, <code>$in</code>, <code>$ne</code>, <code>$or</code>;",
          "<code>updateOne</code> + <code>$set</code> — o'zgartiradi (<code>$set</code>ni unutmang!); <code>deleteOne</code>/<code>deleteMany</code> — o'chiradi;",
          "MongoDB erkin tuzilish uchun qulay, lekin murakkab bog'lanish va tranzaksiyalarda SQL bazalar kuchliroq."
        ] }
      ]
    },

    {
      slug: "node-db",
      title: "Node.js bilan bazaga ulanish",
      blurb: "Node.js'dan PostgreSQL'ga pg kutubxonasi orqali ulanish, so'rov yuborish, parametrlangan so'rovlar bilan SQL injection'dan himoyalanish, async/await bilan to'liq CRUD misoli, connection pool va MongoDB uchun mongoose'ga qisqacha nazar.",
      body: [
        { lead: "Endi eng amaliy qismga keldik: bazani Node.js dasturingizdan qanday ishlatish. Buning uchun maxsus kutubxona (driver) kerak. PostgreSQL uchun eng mashhuri — <code>pg</code>. Ushbu darsda ulanish, so'rov yuborish, xavfsizlik va to'liq CRUD amallarini o'rganamiz." },

        { h2: "pg kutubxonasini o'rnatish" },
        { p: "PostgreSQL bilan ishlash uchun <code>pg</code> paketini npm orqali o'rnatamiz:" },
        { code: "npm install pg" },
        { p: "Bu kutubxona Node.js'dan PostgreSQL serveriga ulanish, so'rov yuborish va natijani JavaScript obyektlari sifatida olish imkonini beradi." },

        { h2: "Oddiy ulanish: Client" },
        { p: "Eng oddiy usul — bitta <code>Client</code> yaratish. Unga ulanish ma'lumotlarini beramiz:" },
        { code: "const { Client } = require(\"pg\");\n\nconst client = new Client({\n  host: \"localhost\",\n  port: 5432,\n  user: \"postgres\",\n  password: \"parol\",\n  database: \"mydb\"\n});\n\nasync function main() {\n  await client.connect();               // bazaga ulanish\n  const res = await client.query(\"SELECT NOW()\"); // so'rov\n  console.log(res.rows);                // natija\n  await client.end();                   // ulanishni yopish\n}\n\nmain();" },
        { p: "Bu yerda muhim jihatlar: <code>connect()</code> ulanadi, <code>query()</code> so'rov yuboradi, <code>end()</code> ulanishni yopadi. Barchasi <code>async/await</code> bilan ishlaydi, chunki baza bilan aloqa vaqt oladi (asinxron)." },
        { warn: "Haqiqiy loyihada parol va boshqa maxfiy ma'lumotlarni kodga to'g'ridan-to'g'ri yozmang! Ularni muhit o'zgaruvchilarida (<code>process.env.DB_PASSWORD</code>) yoki <code>.env</code> faylda saqlang. Aks holda parol kod tarixida (git) ochiq qoladi." },

        { h2: "So'rov natijasi bilan ishlash" },
        { p: "<code>client.query()</code> obyekt qaytaradi. Uning eng muhim xususiyati — <code>rows</code>, ya'ni natija qatorlari massivi. Har bir qator oddiy JavaScript obyekti:" },
        { code: "const res = await client.query(\"SELECT id, name FROM users\");\n\nconsole.log(res.rows);\n// [ { id: 1, name: 'Ali' }, { id: 2, name: 'Vali' } ]\n\nconsole.log(res.rows.length); // qatorlar soni\nconsole.log(res.rows[0].name); // 'Ali'" },
        { p: "Ko'rib turganingizdek, SQL natijasi to'g'ridan-to'g'ri JavaScript obyektlariga aylanadi — ustun nomlari obyekt kalitlariga aylanadi. Bu bilan ishlash juda qulay." },

        { h2: "SQL injection — jiddiy xavf" },
        { p: "Endi eng muhim mavzu — xavfsizlik. Aytaylik, foydalanuvchidan kelgan ism bo'yicha qidirmoqchisiz. Vasvasaga tushib, so'rovni shunday yozishingiz mumkin:" },
        { code: "// XAVFLI! Hech qachon bunday qilmang!\nconst name = req.query.name; // foydalanuvchidan kelgan\nconst res = await client.query(\n  \"SELECT * FROM users WHERE name = '\" + name + \"'\"\n);" },
        { p: "Muammo shundaki, foydalanuvchi <code>name</code> o'rniga SQL kodini yuborishi mumkin. Masalan, u quyidagi qiymatni yuborsa:" },
        { code: "'; DROP TABLE users; --" },
        { p: "Unda so'rov shunday bo'ladi va butun jadval o'chib ketadi:" },
        { code: "SELECT * FROM users WHERE name = ''; DROP TABLE users; --'" },
        { warn: "Bu — <strong>SQL injection</strong> hujumi, veb-xavfsizlikdagi eng mashhur va xavfli zaifliklardan biri. Foydalanuvchi ma'lumotini hech qachon to'g'ridan-to'g'ri SQL matniga qo'shmang. Hujumchi ma'lumotni o'g'irlashi, o'zgartirishi yoki butun bazani yo'q qilishi mumkin." },

        { h2: "Yechim: parametrlangan so'rovlar" },
        { p: "To'g'ri yechim — <strong>parametrlangan so'rovlar</strong> (parameterized queries). Qiymatlarni matnga qo'shish o'rniga, so'rovda <code>$1</code>, <code>$2</code> kabi joy egallovchilar (placeholder) qo'yamiz, qiymatlarni esa alohida massivda beramiz:" },
        { code: "// TO'G'RI va XAVFSIZ usul\nconst name = req.query.name;\nconst res = await client.query(\n  \"SELECT * FROM users WHERE name = $1\",\n  [name]\n);" },
        { p: "Bu yerda <code>$1</code> — birinchi parametr uchun joy, <code>[name]</code> esa uning qiymati. Kutubxona qiymatni <strong>xavfsiz</strong> tarzda joylashtiradi — u har doim oddiy qiymat sifatida qaraladi, hech qachon SQL kod sifatida bajarilmaydi. SQL injection imkonsiz bo'ladi." },
        { code: "// Bir necha parametr bilan\nconst res = await client.query(\n  \"SELECT * FROM users WHERE age > $1 AND is_active = $2\",\n  [25, true]\n);" },
        { tip: "Qoidani eslab qoling: <strong>foydalanuvchidan kelgan har qanday ma'lumot parametr orqali berilishi kerak</strong>, hech qachon satrni birlashtirish (<code>+</code>) orqali emas. Bu backend xavfsizligining eng asosiy qoidalaridan biri." },

        { h2: "To'liq CRUD misoli" },
        { p: "Endi to'rtta asosiy amalni (CREATE, READ, UPDATE, DELETE — CRUD) parametrlangan so'rovlar bilan yozamiz. Bular real loyihada ishlatiladigan funksiyalar:" },
        { code: "const { Client } = require(\"pg\");\nconst client = new Client({ /* sozlamalar */ });\n\n// CREATE — yangi foydalanuvchi qo'shish\nasync function createUser(name, email, age) {\n  const res = await client.query(\n    \"INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *\",\n    [name, email, age]\n  );\n  return res.rows[0]; // qo'shilgan qator\n}\n\n// READ — id bo'yicha o'qish\nasync function getUser(id) {\n  const res = await client.query(\n    \"SELECT * FROM users WHERE id = $1\",\n    [id]\n  );\n  return res.rows[0]; // topilgan qator (yoki undefined)\n}\n\n// UPDATE — yoshni yangilash\nasync function updateAge(id, age) {\n  const res = await client.query(\n    \"UPDATE users SET age = $1 WHERE id = $2 RETURNING *\",\n    [age, id]\n  );\n  return res.rows[0];\n}\n\n// DELETE — o'chirish\nasync function deleteUser(id) {\n  const res = await client.query(\n    \"DELETE FROM users WHERE id = $1\",\n    [id]\n  );\n  return res.rowCount; // o'chirilgan qatorlar soni\n}" },
        { note: "<code>RETURNING *</code> — bu PostgreSQL'ning foydali imkoniyati. INSERT/UPDATE/DELETE'dan keyin o'zgargan qatorni qaytaradi. Masalan, <code>INSERT ... RETURNING *</code> avtomatik yaratilgan <code>id</code>ni ham qaytaradi, shuning uchun uni alohida so'rov bilan olishga hojat yo'q." },
        { p: "Bu funksiyalarni ishlatish:" },
        { code: "async function main() {\n  await client.connect();\n\n  const yangi = await createUser(\"Ali\", \"ali@mail.com\", 25);\n  console.log(\"Yaratildi:\", yangi);\n\n  const topilgan = await getUser(yangi.id);\n  console.log(\"Topildi:\", topilgan);\n\n  await updateAge(yangi.id, 26);\n  await deleteUser(yangi.id);\n\n  await client.end();\n}\n\nmain().catch(err => console.error(\"Xato:\", err));" },
        { tip: "Har bir baza so'rovi xatolik berishi mumkin (ulanish uzilishi, noto'g'ri so'rov). Shuning uchun ularni <code>try/catch</code> yoki <code>.catch()</code> bilan o'rab, xatolarni to'g'ri qayta ishlash muhim. Yuqorida <code>.catch()</code> butun <code>main</code>ni himoya qiladi." },

        { h2: "Connection Pool — ulanishlar havzasi" },
        { p: "Yuqorida bitta <code>Client</code> ishlatdik. Lekin veb-serverda bir vaqtda yuzlab so'rov keladi. Har so'rov uchun yangi ulanish ochish sekin va samarasiz. Yechim — <strong>Pool</strong> (ulanishlar havzasi):" },
        { code: "const { Pool } = require(\"pg\");\n\nconst pool = new Pool({\n  host: \"localhost\",\n  user: \"postgres\",\n  password: process.env.DB_PASSWORD,\n  database: \"mydb\",\n  max: 20 // eng ko'pi 20 ta ulanish\n});\n\n// query'ni to'g'ridan-to'g'ri pool'dan chaqiramiz\nasync function getUsers() {\n  const res = await pool.query(\"SELECT * FROM users\");\n  return res.rows;\n}" },
        { p: "Pool oldindan bir nechta ulanishni ochib qo'yadi va ularni qayta ishlatadi. So'rov kelganda tayyor ulanishni beradi, tugagach uni havzaga qaytaradi. Bu ancha tez va samarali." },
        { tip: "Real loyihalarda deyarli har doim <code>Client</code> emas, <code>Pool</code> ishlatiladi. <code>pool.query()</code> avtomatik ulanish oladi va qaytaradi — siz <code>connect</code>/<code>end</code> haqida o'ylashingiz shart emas." },

        { h2: "MongoDB uchun: mongoose (qisqacha)" },
        { p: "Agar MongoDB ishlatsangiz, Node.js'da eng mashhur kutubxona — <code>mongoose</code>. U ulanishni va ma'lumot bilan ishlashni osonlashtiradi:" },
        { code: "npm install mongoose" },
        { code: "const mongoose = require(\"mongoose\");\n\nawait mongoose.connect(\"mongodb://localhost:27017/mydb\");\n\n// Sxema va model\nconst User = mongoose.model(\"User\", new mongoose.Schema({\n  name: String,\n  email: String,\n  age: Number\n}));\n\n// CRUD\nconst yangi = await User.create({ name: \"Ali\", age: 25 });\nconst hammasi = await User.find({ age: { $gt: 20 } });\nawait User.updateOne({ name: \"Ali\" }, { $set: { age: 26 } });\nawait User.deleteOne({ name: \"Ali\" });" },
        { note: "Mongoose'da parametrlangan so'rovlar haqida qayg'urish shart emas — siz filtrlarni obyekt sifatida berasiz, kutubxona ularni xavfsiz qayta ishlaydi. Bu MongoDB'ning ma'lumot bilan ishlash uslubining tabiiy afzalligi." },

        { h2: "Xulosa" },
        { ul: [
          "PostgreSQL uchun <code>pg</code> kutubxonasi ishlatiladi: <code>connect</code>, <code>query</code>, <code>end</code>;",
          "So'rov natijasi <code>res.rows</code> massivida keladi — har qator oddiy JavaScript obyekti;",
          "<strong>SQL injection</strong> — foydalanuvchi ma'lumotini SQL matniga to'g'ridan-to'g'ri qo'shishdan kelib chiqadigan jiddiy xavf;",
          "Yechim — <strong>parametrlangan so'rovlar</strong>: <code>query(\"... WHERE id = $1\", [id])</code>;",
          "To'liq CRUD funksiyalari <code>async/await</code> bilan yoziladi; <code>RETURNING *</code> o'zgargan qatorni qaytaradi;",
          "Real loyihada <strong>Pool</strong> (ulanishlar havzasi) ishlatiladi — tez va samarali;",
          "MongoDB uchun <code>mongoose</code> — sxema, model va oson CRUD imkoniyatlarini beradi."
        ] }
      ]
    }
  ]
};
