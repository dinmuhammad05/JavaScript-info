"use strict";

module.exports = {
  part: "5-qism: Backend dasturlash",
  chapter: "NestJS",
  lessons: [
    {
      slug: "nestjs-nima",
      title: "NestJS nima?",
      blurb: "TypeScript uchun yaratilgan zamonaviy backend framework: Express ustida ishlaydigan, modulli va Angular'dan ilhomlangan arxitektura, nega u kerak va uni qanday o'rnatish mumkin.",
      body: [
        { lead: "Agar siz Node.js va Express bilan bir necha loyiha yozgan bo'lsangiz, ehtimol bitta muammoga duch kelgansiz: loyiha kattalashgani sari kod tartibsiz bo'lib boradi. Route'lar, biznes-logika va ma'lumotlar bazasi so'rovlari bir joyga aralashib ketadi. <strong>NestJS</strong> aynan shu muammoni hal qilish uchun yaratilgan — u sizga qat'iy va tushunarli arxitektura, TypeScript'ning to'liq kuchi va tayyor infratuzilma beradi." },

        { note: "Ushbu bob siz allaqachon <strong>Node.js</strong>, <strong>Express</strong> va <strong>TypeScript</strong> asoslarini bilasiz deb faraz qiladi. NestJS bularning ustiga qurilgan, shuning uchun ularni tushunmasangiz, oldingi boblarga qaytib o'tishni tavsiya qilamiz." },

        { h2: "NestJS nima va u qanday muammoni hal qiladi?" },
        { p: "<strong>NestJS</strong> (odatda shunchaki <em>Nest</em> deb ataladi) — bu Node.js muhitida server tomonidagi ilovalarni yaratish uchun mo'ljallangan framework. U TypeScript'da yozilgan va TypeScript bilan ishlashga to'liq moslashtirilgan (garchi sof JavaScript'da ham yozish mumkin bo'lsa-da)." },
        { p: "Express o'zi juda <em>minimalist</em> — u sizga faqat route va middleware beradi, qolgani sizning ixtiyoringizda. Bu erkinlik kichik loyihalar uchun yaxshi, lekin katta jamoada har kim o'z uslubida yozsa, loyiha boshqarib bo'lmas holga keladi. NestJS esa qarama-qarshi yondashuvni tanlaydi: u <strong>fikrli</strong> (opinionated) framework — ya'ni kodni qanday tashkil qilishni aniq belgilaydi." },
        { ul: [
          "<strong>Modulli arxitektura:</strong> kod mantiqiy modullarga bo'linadi, har biri o'z mas'uliyat sohasiga ega;",
          "<strong>Dependency Injection (DI):</strong> obyektlar orasidagi bog'liqliklar avtomatik boshqariladi;",
          "<strong>Dekoratorlar:</strong> <code>@Controller</code>, <code>@Get</code>, <code>@Injectable</code> kabi qulay belgilar orqali kod deklarativ yoziladi;",
          "<strong>Tayyor infratuzilma:</strong> validatsiya, guard, interceptor, exception filter, testlash — hammasi qutidan chiqadi;",
          "<strong>Platformadan mustaqillik:</strong> ostida Express yoki Fastify ishlashi mumkin, kodingiz o'zgarmaydi."
        ] },

        { h2: "NestJS Express ustida qanday ishlaydi?" },
        { p: "Bu tushunish uchun juda muhim nuqta: NestJS Express'ni <strong>almashtirmaydi</strong>, balki uning ustiga qurilgan qatlamdir. Standart holatda NestJS ichida haqiqiy Express ilovasi ishlaydi. Ya'ni siz yozgan controller'lar oxir-oqibat Express route'lariga aylanadi, guard'lar va interceptor'lar esa Express middleware'lariga o'xshab ishlaydi." },
        { p: "Bu shuni anglatadiki, Express ekotizimidagi ko'plab paketlar (masalan, <code>helmet</code>, <code>cookie-parser</code>) NestJS bilan ham ishlaydi. Kerak bo'lsa, siz hatto asosiy Express <code>request</code> va <code>response</code> obyektlariga to'g'ridan-to'g'ri kirishingiz mumkin." },
        { p: "NestJS shuningdek Express o'rniga <strong>Fastify</strong> adapterini ishlatishga imkon beradi — bu tezroq HTTP kutubxona. Muhimi: sizning controller va service kodingiz o'zgarmaydi, faqat pastdagi \"dvigatel\" almashadi. Bu abstraksiya NestJS'ning kuchli tomonlaridan biri." },
        { note: "Shunday qilib NestJS'ni Express uchun <strong>tuzilma va qoidalar to'plami</strong> deb tasavvur qiling. U sizga \"qanday yozish kerak\"ligini aytadi, lekin ostida siz bilgan Express texnologiyasi ishlaydi." },

        { h2: "Angular'dan ilhom: nega bu muhim?" },
        { p: "NestJS'ning arxitekturasi <strong>Angular</strong> (frontend framework) ta'sirida shakllangan. Agar siz Angular bilan tanish bo'lsangiz, NestJS'dagi modul, servis, dekorator va Dependency Injection tushunchalari juda tanish tuyuladi." },
        { p: "Bu tanlov tasodifiy emas. Angular yirik jamoalarda katta ilovalarni yillar davomida barqaror tarzda rivojlantirish uchun mo'ljallangan. Xuddi shu maqsad NestJS oldida ham turadi — backend tomonda uzoq muddatli, kengaytiriladigan va sinovdan o'tkaziladigan kod yozish. Frontend va backend bir xil arxitektura tamoyillariga tayangani jamoa uchun bilim almashishni osonlashtiradi." },

        { h2: "Node.js CLI orqali o'rnatish" },
        { p: "NestJS bilan ishlashning eng qulay yo'li — uning rasmiy buyruq qatori vositasi, ya'ni <strong>Nest CLI</strong> orqali. U yangi loyihani tayyor tuzilma bilan yaratadi va kod generatsiya qilishni osonlashtiradi. Uni global o'rnatamiz:" },
        { code: "# Nest CLI'ni global o'rnatish:\nnpm install -g @nestjs/cli\n\n# O'rnatilganini tekshirish:\nnest --version" },
        { p: "Endi yangi loyiha yaratamiz. <code>nest new</code> buyrug'i papka yaratadi, barcha kerakli paketlarni o'rnatadi va boshlang'ich kodni tayyorlaydi:" },
        { code: "# Yangi loyiha yaratish:\nnest new mening-ilovam\n\n# CLI paket menejerini so'raydi (npm, yarn yoki pnpm) — birini tanlang.\n\n# Loyiha papkasiga o'tib, uni ishga tushirish:\ncd mening-ilovam\nnpm run start:dev" },
        { p: "<code>start:dev</code> rejimi <strong>watch</strong> bilan ishlaydi: siz faylni saqlagan zahoti server avtomatik qayta yuklanadi. Ilova standart holatda <code>http://localhost:3000</code> manzilida ochiladi. Brauzerda ushbu manzilni ochsangiz, oddiy \"Hello World!\" javobini ko'rasiz." },
        { tip: "Nest CLI faqat loyiha yaratish uchun emas. Keyingi darslarda ko'ramizki, u <code>nest generate</code> (qisqacha <code>nest g</code>) orqali modul, controller, service kabi qismlarni bir buyruq bilan yaratib beradi va ularni loyihaga avtomatik ulaydi." },

        { h2: "Loyihaning boshlang'ich tuzilishi" },
        { p: "<code>nest new</code> yaratgan loyihada eng muhim fayllar <code>src/</code> papkasida joylashadi. Ular bilan keyingi darslarda batafsil tanishamiz, lekin hozircha umumiy manzarani ko'ramiz:" },
        { code: "mening-ilovam/\n  src/\n    app.controller.ts       # Oddiy controller (route'lar)\n    app.controller.spec.ts  # Controller uchun test\n    app.service.ts          # Biznes-logika (service)\n    app.module.ts           # Ildiz modul — hammani bog'laydi\n    main.ts                 # Kirish nuqtasi (ilova shu yerdan boshlanadi)\n  test/                     # e2e testlar\n  package.json\n  tsconfig.json\n  nest-cli.json" },
        { p: "Kirish nuqtasi — bu <code>main.ts</code>. Uni ochsak, NestJS ilovasi qanday boshlanishini ko'ramiz. Bu Express'dagi <code>app.listen()</code> ga o'xshaydi, lekin biroz boshqacharoq:" },
        { code: "// src/main.ts\nimport { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  // Ildiz moduldan ilova yaratamiz:\n  const app = await NestFactory.create(AppModule);\n\n  // 3000-portda tinglashni boshlaymiz:\n  await app.listen(3000);\n}\nbootstrap();" },
        { p: "E'tibor bering: Express'da biz <code>express()</code> chaqirib, so'ng route'larni qo'lda qo'shardik. NestJS'da esa biz faqat <strong>ildiz modul</strong>ni (<code>AppModule</code>) beramiz, qolgani avtomatik yig'iladi. Bu modulli arxitekturaning birinchi ko'rinishi." },

        { h2: "NestJS qachon kerak va qachon ortiqcha?" },
        { p: "NestJS kuchli vosita, lekin har bir loyiha uchun to'g'ri tanlov emas. Uni tanlashda quyidagilarni hisobga oling:" },
        { h3: "NestJS mos keladigan holatlar" },
        { ul: [
          "Katta yoki o'sib boradigan loyihalar — ko'p modul, ko'p endpoint;",
          "Jamoa bilan ishlash — qat'iy tuzilma har kimga bir xil qoidalar beradi;",
          "Murakkab biznes-logika, ma'lumotlar bazasi, autentifikatsiya, mikroservislar;",
          "TypeScript'ni to'liq ishlatmoqchi bo'lganingizda;",
          "Uzoq muddatli qo'llab-quvvatlanadigan korporativ ilovalar."
        ] },
        { h3: "NestJS ortiqcha bo'lishi mumkin bo'lgan holatlar" },
        { ul: [
          "Bir-ikki endpoint'li juda kichik skript yoki prototip;",
          "Tez sinab ko'rish uchun yozilgan bir martalik kod;",
          "Jamoa Express'ni yaxshi biladi va qo'shimcha o'rganishga vaqt yo'q bo'lganda."
        ] },
        { warn: "NestJS'da o'rganish egri chizig'i (learning curve) mavjud: dekoratorlar, DI va modullar tushunchalarini o'zlashtirish vaqt oladi. Kichik loyiha uchun bu ortiqcha murakkablik bo'lishi mumkin. Lekin loyiha o'sishi ehtimoli bo'lsa, boshidanoq NestJS tanlash keyinchalik qayta yozishdan qutqaradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>NestJS</strong> — Node.js uchun modulli va fikrli backend framework, TypeScript uchun mo'ljallangan;",
          "U <strong>Express ustida</strong> ishlaydi (yoki Fastify), lekin qat'iy arxitektura va tayyor infratuzilma qo'shadi;",
          "Arxitekturasi <strong>Angular'dan ilhomlangan</strong>: modullar, service'lar, dekoratorlar, Dependency Injection;",
          "O'rnatish <code>npm install -g @nestjs/cli</code> va <code>nest new</code> orqali amalga oshadi;",
          "Kirish nuqtasi <code>main.ts</code>, ildiz modul esa <code>AppModule</code>;",
          "NestJS <strong>katta va o'sib boradigan</strong> loyihalar uchun ideal, juda kichik skriptlar uchun esa ortiqcha bo'lishi mumkin."
        ] }
      ]
    },

    {
      slug: "nestjs-struktura",
      title: "Loyiha tuzilishi: Module, Controller, Service",
      blurb: "NestJS'ning uch asosiy qurilish bloki: @Module modullarni tashkil qiladi, @Controller so'rovlarni qabul qiladi, @Injectable service biznes-logikani saqlaydi. Nest CLI bilan ularni generatsiya qilish.",
      body: [
        { lead: "NestJS'da har qanday ilova uch xil qurilish blokidan yig'iladi: <strong>Module</strong> (modul), <strong>Controller</strong> (kontroller) va <strong>Service</strong> (servis). Bu uchlik NestJS falsafasining yuragi. Ularni bir marta yaxshi tushunib olsangiz, butun framework tushunarli bo'lib qoladi. Keling, har birini alohida ko'rib chiqamiz." },

        { h2: "Mas'uliyatlarni ajratish tamoyili" },
        { p: "NestJS arxitekturasi <strong>Separation of Concerns</strong> (mas'uliyatlarni ajratish) tamoyiliga tayanadi. Buning ma'nosi: har bir qism faqat bitta ishga javob berishi kerak. Uchlikda vazifalar shunday taqsimlanadi:" },
        { ul: [
          "<strong>Controller</strong> — HTTP so'rovlarini <em>qabul qiladi</em> va javob <em>qaytaradi</em>. U \"qaysi manzilga qaysi funksiya\"ni belgilaydi, ammo biznes-logikani o'zi bajarmaydi;",
          "<strong>Service</strong> — asosiy <em>biznes-logika</em> shu yerda. Ma'lumotni hisoblash, bazaga saqlash, tashqi API'ga so'rov — bularning hammasi service'da;",
          "<strong>Module</strong> — controller va service'larni <em>bir joyga bog'laydi</em> va ularni tashkil qiladi."
        ] },
        { note: "Oddiy qoida: Controller <strong>ingichka</strong> (thin) bo'lishi kerak — u faqat so'rovni qabul qiladi va service'ga uzatadi. Barcha \"og'ir\" ish service ichida bajariladi. Bu kodni testlash va qayta ishlatishni osonlashtiradi." },

        { h2: "@Module — modul nima?" },
        { p: "Modul — bu bir-biriga bog'liq kodni birlashtiruvchi konteyner. Masalan, foydalanuvchilar bilan bog'liq barcha kod (controller, service) <code>UsersModule</code> ichida, mahsulotlar esa <code>ProductsModule</code> ichida bo'ladi. Har bir NestJS ilovada kamida bitta modul bo'ladi — bu <strong>ildiz modul</strong> (<code>AppModule</code>)." },
        { p: "Modul <code>@Module</code> dekoratori bilan belgilangan oddiy klass. Dekorator argument sifatida to'rt xossali obyekt qabul qiladi:" },
        { code: "// src/app.module.ts\nimport { Module } from '@nestjs/common';\nimport { AppController } from './app.controller';\nimport { AppService } from './app.service';\n\n@Module({\n  imports: [],            // Boshqa modullarni import qilish\n  controllers: [AppController],  // Bu moduldagi controller'lar\n  providers: [AppService],       // Bu moduldagi service'lar (provayderlar)\n  exports: [],           // Boshqa modullar uchun ochiq provayderlar\n})\nexport class AppModule {}" },
        { p: "To'rt xossaning ma'nosi:" },
        { ul: [
          "<code>controllers</code> — shu modulga tegishli controller'lar ro'yxati;",
          "<code>providers</code> — shu modulda ishlaydigan service'lar va boshqa injektsiya qilinadigan obyektlar;",
          "<code>imports</code> — boshqa modullarni ulash (masalan, <code>UsersModule</code> ichida <code>DatabaseModule</code>);",
          "<code>exports</code> — ushbu modul provayderlarining qaysi biri boshqa modullarga ko'rinishi kerakligi."
        ] },
        { tip: "Modulni <strong>dastur bo'limi</strong> deb tasavvur qiling. Har bir bo'lim mustaqil, o'z ichida to'liq. Bu yondashuv katta ilovada har bir xususiyatni (feature) alohida modulda saqlashga imkon beradi — bu <strong>feature module</strong> deb ataladi." },

        { h2: "@Controller — so'rovlarni qabul qilish" },
        { p: "Controller HTTP so'rovlarini qabul qiladi va tegishli javobni qaytaradi. U <code>@Controller</code> dekoratori bilan belgilanadi. Dekoratorga berilgan satr — bu <strong>marshrut prefiksi</strong> (route prefix), ya'ni ushbu controller'dagi barcha manzillarning boshi:" },
        { code: "// src/users/users.controller.ts\nimport { Controller, Get } from '@nestjs/common';\n\n@Controller('users')   // Barcha manzillar /users bilan boshlanadi\nexport class UsersController {\n\n  @Get()               // GET /users\n  findAll() {\n    return 'Barcha foydalanuvchilar';\n  }\n\n  @Get('active')       // GET /users/active\n  findActive() {\n    return 'Faol foydalanuvchilar';\n  }\n}" },
        { p: "Bu yerda <code>@Get()</code> — HTTP metod dekoratori. U funksiyani ma'lum bir GET manziliga bog'laydi. Express'da biz <code>app.get('/users', handler)</code> yozardik; NestJS'da esa route va uni bajaradigan funksiya dekorator orqali bir-biriga ulanadi. Bu kodni ancha o'qishli qiladi." },
        { note: "Controller metodidan qaytgan qiymat avtomatik javobga aylanadi. Agar obyekt yoki massiv qaytarsangiz, NestJS uni avtomatik <strong>JSON</strong>'ga o'giradi. Express'dagidek <code>res.json()</code> chaqirish shart emas." },

        { h2: "@Injectable — service (biznes-logika)" },
        { p: "Service — bu haqiqiy ish bajariladigan joy. U <code>@Injectable</code> dekoratori bilan belgilangan klass. Bu dekorator NestJS'ga \"bu klassni boshqa joylarga injektsiya qilish mumkin\" deb aytadi (buni keyingi darsda Dependency Injection mavzusida chuqurroq ko'ramiz):" },
        { code: "// src/users/users.service.ts\nimport { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class UsersService {\n  private users = [\n    { id: 1, ism: 'Ali' },\n    { id: 2, ism: 'Vali' },\n  ];\n\n  findAll() {\n    return this.users;\n  }\n\n  findOne(id: number) {\n    return this.users.find(u => u.id === id);\n  }\n}" },
        { p: "Endi controller service'ni ishlatishi kerak. Buning uchun service controller'ning <strong>konstruktoriga</strong> qo'shiladi — bu Dependency Injection deb ataladi. NestJS <code>UsersService</code> nusxasini avtomatik yaratadi va controller'ga uzatadi:" },
        { code: "// src/users/users.controller.ts\nimport { Controller, Get, Param } from '@nestjs/common';\nimport { UsersService } from './users.service';\n\n@Controller('users')\nexport class UsersController {\n  // Service konstruktor orqali injektsiya qilinadi:\n  constructor(private readonly usersService: UsersService) {}\n\n  @Get()\n  findAll() {\n    return this.usersService.findAll();  // Ishni service'ga topshiramiz\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this.usersService.findOne(Number(id));\n  }\n}" },
        { p: "E'tibor bering: controller <strong>hech qanday biznes-logikani o'zi bajarmaydi</strong>. U faqat so'rovni qabul qiladi va <code>usersService</code>'ga uzatadi. Bu ideal ajratish: controller HTTP bilan, service esa ma'lumot bilan shug'ullanadi." },

        { h2: "Hamma narsani modulga bog'lash" },
        { p: "Controller va service yaratganingizdan keyin ularni modulda ro'yxatdan o'tkazishingiz kerak. Aks holda NestJS ularni topolmaydi:" },
        { code: "// src/users/users.module.ts\nimport { Module } from '@nestjs/common';\nimport { UsersController } from './users.controller';\nimport { UsersService } from './users.service';\n\n@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n})\nexport class UsersModule {}" },
        { p: "So'ng ushbu yangi modulni ildiz modulga import qilamiz, aks holda u ilovaning bir qismi bo'lmaydi:" },
        { code: "// src/app.module.ts\nimport { Module } from '@nestjs/common';\nimport { UsersModule } from './users/users.module';\n\n@Module({\n  imports: [UsersModule],   // UsersModule'ni ilovaga ulaymiz\n})\nexport class AppModule {}" },
        { warn: "Eng ko'p uchraydigan boshlang'ich xato — service'ni <code>providers</code> ro'yxatiga qo'shishni unutish. Bunda NestJS ishga tushganda <em>\"Nest can't resolve dependencies\"</em> xatosini beradi. Har doim tekshiring: service <code>providers</code>'da, controller <code>controllers</code>'da bo'lishi shart." },

        { h2: "Nest CLI bilan avtomatik generatsiya" },
        { p: "Bu qismlarning hammasini qo'lda yozish zerikarli. Nest CLI'ning <code>generate</code> (qisqasi <code>g</code>) buyrug'i barcha fayllarni yaratib, ularni modulga avtomatik bog'lab beradi:" },
        { code: "# To'liq resurs yaratish (modul + controller + service + testlar):\nnest generate resource users\n\n# Yoki alohida:\nnest generate module users       # nest g module users\nnest generate controller users    # nest g controller users\nnest generate service users       # nest g service users" },
        { p: "<code>nest g resource users</code> buyrug'i ayniqsa qulay — u CRUD (yaratish, o'qish, yangilash, o'chirish) uchun tayyor shablon bilan to'liq modul yaratadi. CLI hatto REST API yoki GraphQL kabi turni ham so'raydi. Bu bir necha daqiqalik qo'l ishini bir buyruqqa qisqartiradi." },
        { tip: "CLI generatsiya qilgan fayllar avtomatik ravishda tegishli modulning <code>controllers</code> va <code>providers</code> ro'yxatiga qo'shiladi. Ya'ni yuqoridagi \"modulga bog'lash\" bosqichini CLI siz uchun bajaradi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Controller</strong> — HTTP so'rovlarini qabul qiladi va javob qaytaradi, biznes-logikasiz ingichka bo'lishi kerak;",
          "<strong>Service</strong> (<code>@Injectable</code>) — biznes-logika, hisob-kitob, ma'lumotlar bilan ishlash shu yerda;",
          "<strong>Module</strong> (<code>@Module</code>) — controller va service'larni birlashtiradi, <code>imports</code>/<code>controllers</code>/<code>providers</code>/<code>exports</code> xossalari bilan;",
          "Service controller'ga <strong>konstruktor orqali injektsiya</strong> qilinadi;",
          "Har bir yangi modulni <code>AppModule</code>ning <code>imports</code>'iga qo'shish shart;",
          "<code>nest g resource</code> va <code>nest g</code> buyruqlari fayllarni avtomatik yaratib, modulga bog'laydi."
        ] }
      ]
    },

    {
      slug: "nestjs-routing",
      title: "Routing va DTO",
      blurb: "HTTP metod dekoratorlari (@Get, @Post, @Put, @Delete), parametrlarni olish (@Param, @Query, @Body), DTO klasslari orqali ma'lumot shakli, class-validator va ValidationPipe bilan avtomatik validatsiya.",
      body: [
        { lead: "Har qanday REST API'ning yuragi — bu <strong>routing</strong>, ya'ni turli manzil va HTTP metodlarini tegishli funksiyalarga bog'lash. NestJS routing'ni juda tushunarli qiladi: har bir metod uchun alohida dekorator, parametrlarni olish uchun alohida dekorator. Bundan tashqari, kiruvchi ma'lumotni <strong>DTO</strong> klasslari va avtomatik validatsiya bilan xavfsiz qilishni o'rganamiz." },

        { h2: "HTTP metod dekoratorlari" },
        { p: "REST API'da har bir amal o'z HTTP metodiga ega bo'ladi. NestJS har bir metod uchun dekorator beradi. Ular controller metodini ma'lum bir marshrut va metodga bog'laydi:" },
        { ul: [
          "<code>@Get()</code> — ma'lumot o'qish (masalan, ro'yxatni olish);",
          "<code>@Post()</code> — yangi ma'lumot yaratish;",
          "<code>@Put()</code> — mavjud ma'lumotni to'liq yangilash;",
          "<code>@Patch()</code> — ma'lumotning bir qismini yangilash;",
          "<code>@Delete()</code> — ma'lumotni o'chirish."
        ] },
        { code: "// src/users/users.controller.ts\nimport { Controller, Get, Post, Put, Delete } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n\n  @Get()          // GET    /users\n  findAll() { return 'ro\\'yxat'; }\n\n  @Post()         // POST   /users\n  create() { return 'yaratildi'; }\n\n  @Put(':id')     // PUT    /users/5\n  update() { return 'yangilandi'; }\n\n  @Delete(':id')  // DELETE /users/5\n  remove() { return 'o\\'chirildi'; }\n}" },
        { note: "Marshrut prefiksi (<code>@Controller('users')</code>) va metod yo'li (<code>@Get(':id')</code>) birlashadi. Ya'ni <code>@Get(':id')</code> aslida <code>GET /users/:id</code> manzilini bildiradi." },

        { h2: "@Param — marshrut parametrlari" },
        { p: "Marshrutda <code>:id</code> kabi qism <strong>marshrut parametri</strong> deb ataladi. Uning qiymatini olish uchun <code>@Param</code> dekoratoridan foydalanamiz. Masalan, <code>GET /users/42</code> so'rovida <code>id</code> qiymati <code>42</code> bo'ladi:" },
        { code: "import { Controller, Get, Param } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    // Diqqat: parametr doim satr (string) sifatida keladi\n    return 'Foydalanuvchi ID: ' + id;\n  }\n}" },
        { warn: "Marshrut parametrlari <strong>har doim satr</strong> ko'rinishida keladi, hatto ular raqamga o'xshasa ham. <code>id</code>'ni son sifatida ishlatish uchun uni <code>Number(id)</code> bilan aylantiring yoki keyinroq ko'radigan <code>ParseIntPipe</code>'dan foydalaning." },

        { h2: "@Query — so'rov parametrlari" },
        { p: "URL'dagi <code>?</code> dan keyingi qism — bu <strong>query string</strong> (so'rov parametrlari). Masalan <code>/users?page=2&limit=10</code>. Ularni <code>@Query</code> dekoratori bilan olamiz. Bu odatda filtrlash, saralash va sahifalash uchun ishlatiladi:" },
        { code: "import { Controller, Get, Query } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n\n  // GET /users?page=2&limit=10\n  @Get()\n  findAll(@Query('page') page: string, @Query('limit') limit: string) {\n    return 'Sahifa: ' + page + ', limit: ' + limit;\n  }\n}" },

        { h2: "@Body — so'rov tanasi" },
        { p: "POST va PUT so'rovlarida ma'lumot odatda so'rov <strong>tanasida</strong> (body) JSON ko'rinishida yuboriladi. Uni olish uchun <code>@Body</code> dekoratoridan foydalanamiz. NestJS JSON'ni avtomatik o'qiydi (Express'dagi <code>express.json()</code> ichkarida allaqachon yoqilgan):" },
        { code: "import { Controller, Post, Body } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n\n  @Post()\n  create(@Body() body: any) {\n    // body — bu mijoz yuborgan JSON obyekti\n    return 'Yaratildi: ' + body.ism;\n  }\n}" },
        { p: "Lekin <code>body: any</code> yozish yomon amaliyot: bu tipni yo'qotadi va ma'lumot shaklini nazorat qilmaydi. Aynan shu yerda <strong>DTO</strong> tushunchasi kirib keladi." },

        { h2: "DTO — ma'lumot uzatish obyekti" },
        { p: "<strong>DTO</strong> (Data Transfer Object — ma'lumot uzatish obyekti) — bu so'rov tanasi qanday ko'rinishda bo'lishini belgilaydigan klass. U ma'lumotning <em>shakli</em>ni (qaysi maydonlar, qaysi tiplar) rasmiylashtiradi. DTO odatda alohida faylda yoziladi:" },
        { code: "// src/users/dto/create-user.dto.ts\nexport class CreateUserDto {\n  ism: string;\n  email: string;\n  yosh: number;\n}" },
        { p: "Endi controller'da <code>any</code> o'rniga DTO tipini ishlatamiz. Bu tahrirlovchida avtomatik to'ldirish (autocomplete) va tip xavfsizligini beradi:" },
        { code: "import { Controller, Post, Body } from '@nestjs/common';\nimport { CreateUserDto } from './dto/create-user.dto';\n\n@Controller('users')\nexport class UsersController {\n\n  @Post()\n  create(@Body() createUserDto: CreateUserDto) {\n    // Endi createUserDto.ism, .email, .yosh tip bilan mavjud\n    return 'Yaratildi: ' + createUserDto.ism;\n  }\n}" },
        { note: "DTO va <code>interface</code> orasidagi farq muhim: DTO <strong>klass</strong> bo'lishi kerak, interface emas. Sababi — validatsiya dekoratorlari (keyingi bo'lim) faqat klasslarda ishlaydi. TypeScript interface'lari kompilyatsiya vaqtida yo'qoladi, klasslar esa ishga tushish paytida ham mavjud bo'ladi." },

        { h2: "class-validator bilan validatsiya" },
        { p: "DTO'ning eng katta kuchi — u <strong>avtomatik validatsiya</strong>ga imkon beradi. Buning uchun ikki paket kerak: <code>class-validator</code> va <code>class-transformer</code>. Ularni o'rnatamiz:" },
        { code: "npm install class-validator class-transformer" },
        { p: "Endi DTO maydonlariga validatsiya dekoratorlarini qo'shamiz. Har bir dekorator ma'lum bir qoidani tekshiradi:" },
        { code: "// src/users/dto/create-user.dto.ts\nimport { IsString, IsEmail, IsInt, Min, Max, MinLength } from 'class-validator';\n\nexport class CreateUserDto {\n  @IsString()\n  @MinLength(2, { message: 'Ism kamida 2 harf bo\\'lsin' })\n  ism: string;\n\n  @IsEmail({}, { message: 'Email formati noto\\'g\\'ri' })\n  email: string;\n\n  @IsInt()\n  @Min(18)\n  @Max(120)\n  yosh: number;\n}" },
        { p: "Ko'p ishlatiladigan validatsiya dekoratorlari:" },
        { ul: [
          "<code>@IsString()</code>, <code>@IsInt()</code>, <code>@IsBoolean()</code> — tip tekshiruvi;",
          "<code>@IsEmail()</code>, <code>@IsUrl()</code> — format tekshiruvi;",
          "<code>@MinLength(n)</code>, <code>@MaxLength(n)</code> — satr uzunligi;",
          "<code>@Min(n)</code>, <code>@Max(n)</code> — sonlar chegarasi;",
          "<code>@IsOptional()</code> — maydon ixtiyoriy ekanligini bildiradi;",
          "<code>@IsNotEmpty()</code> — bo'sh bo'lmasligi kerak."
        ] },

        { h2: "ValidationPipe — validatsiyani yoqish" },
        { p: "Dekoratorlarni yozishning o'zi yetarli emas — NestJS'ga ularni tekshirishni buyurish kerak. Buni <strong>ValidationPipe</strong> global tarzda yoqib qilamiz. Buni <code>main.ts</code>'da bir marta sozlaymiz:" },
        { code: "// src/main.ts\nimport { NestFactory } from '@nestjs/core';\nimport { ValidationPipe } from '@nestjs/common';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n\n  // Global validatsiyani yoqamiz:\n  app.useGlobalPipes(new ValidationPipe({\n    whitelist: true,             // DTO'da yo'q maydonlarni tashlab yuborish\n    forbidNonWhitelisted: true,  // Ortiqcha maydon bo'lsa xato berish\n    transform: true,             // Kelgan ma'lumotni DTO tipiga aylantirish\n  }));\n\n  await app.listen(3000);\n}\nbootstrap();" },
        { p: "Endi agar mijoz noto'g'ri ma'lumot yuborsa (masalan, <code>yosh</code> o'rniga 15 yoki email o'rniga axlat), NestJS avtomatik <strong>400 Bad Request</strong> xatosini qaytaradi. Siz controller'da hech qanday <code>if</code> tekshiruvi yozishingiz shart emas:" },
        { code: "// Mijoz shu ma'lumotni yuborsa:\n// { \"ism\": \"A\", \"email\": \"xato\", \"yosh\": 15 }\n\n// NestJS avtomatik 400 xato qaytaradi:\n// {\n//   \"statusCode\": 400,\n//   \"message\": [\n//     \"Ism kamida 2 harf bo'lsin\",\n//     \"Email formati noto'g'ri\",\n//     \"yosh must not be less than 18\"\n//   ],\n//   \"error\": \"Bad Request\"\n// }" },
        { tip: "<code>whitelist: true</code> juda foydali xavfsizlik sozlamasi: u DTO'da e'lon qilinmagan barcha maydonlarni avtomatik olib tashlaydi. Bu mijoz ortiqcha maydonlar (masalan, <code>isAdmin: true</code>) yuborib, tizimni chalg'itishining oldini oladi." },

        { h2: "ParseIntPipe — parametr aylantirish" },
        { p: "Yodingizda bo'lsa, marshrut parametrlari doim satr keladi. NestJS'ning tayyor <strong>Pipe</strong>'lari qiymatni avtomatik aylantirib, tekshirib beradi. Masalan <code>ParseIntPipe</code> satrni songa aylantiradi va agar bu mumkin bo'lmasa, 400 xato beradi:" },
        { code: "import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n\n  @Get(':id')\n  findOne(@Param('id', ParseIntPipe) id: number) {\n    // id endi haqiqiy son (number), aylantirish shart emas\n    // Agar /users/abc so'ralsa, avtomatik 400 xato qaytadi\n    return 'ID: ' + id;\n  }\n}" },

        { h2: "Xulosa" },
        { ul: [
          "HTTP metodlari uchun <code>@Get</code>, <code>@Post</code>, <code>@Put</code>, <code>@Patch</code>, <code>@Delete</code> dekoratorlari mavjud;",
          "<code>@Param</code> marshrut parametrini, <code>@Query</code> so'rov parametrini, <code>@Body</code> so'rov tanasini oladi;",
          "<strong>DTO</strong> — so'rov tanasi shaklini belgilaydigan <em>klass</em> (interface emas);",
          "<code>class-validator</code> dekoratorlari (<code>@IsString</code>, <code>@IsEmail</code>, <code>@Min</code>) validatsiya qoidalarini beradi;",
          "<strong>ValidationPipe</strong> global yoqilganda ma'lumotni avtomatik tekshiradi va noto'g'ri bo'lsa 400 qaytaradi;",
          "<code>whitelist: true</code> ortiqcha maydonlarni olib tashlab, xavfsizlikni oshiradi;",
          "<code>ParseIntPipe</code> kabi pipe'lar parametrlarni avtomatik aylantirib tekshiradi."
        ] }
      ]
    },

    {
      slug: "nestjs-di",
      title: "Provider va Dependency Injection",
      blurb: "Dependency Injection nima va u NestJS'da qanday ishlaydi, provayderlar, konstruktor injektsiyasi, IoC konteyner, modullararo import/export orqali service'larni ulashish.",
      body: [
        { lead: "Agar NestJS'ning bitta eng muhim g'oyasini tanlash kerak bo'lsa, bu <strong>Dependency Injection</strong> (bog'liqliklarni injektsiya qilish, qisqacha DI) bo'lardi. Bu tushuncha boshida sehrli tuyulishi mumkin, lekin aslida u juda oddiy va kuchli. Ushbu darsda DI qanday ishlashini, provayderlar nima ekanligini va service'larni modullar orasida qanday ulashishni to'liq o'rganamiz." },

        { h2: "Muammo: bog'liqliklarni qo'lda boshqarish" },
        { p: "Avval DI <em>nima uchun</em> kerakligini tushunamiz. Faraz qilaylik, <code>UsersService</code> ma'lumotlar bazasi bilan ishlash uchun <code>DatabaseService</code>'ga bog'liq. DI'siz biz uni qo'lda yaratamiz:" },
        { code: "// DI SIZ (yomon usul):\nclass UsersService {\n  private db: DatabaseService;\n\n  constructor() {\n    // Bog'liqlikni o'zimiz yaratamiz — bu qattiq bog'lanish:\n    this.db = new DatabaseService('localhost', 5432, 'parol');\n  }\n}" },
        { p: "Bu yondashuvning muammolari:" },
        { ul: [
          "<code>UsersService</code> <code>DatabaseService</code>'ni qanday yaratishni <em>bilishi</em> kerak (host, port, parol) — bu ortiqcha bog'liqlik;",
          "Testlashda haqiqiy bazani soxta (mock) bilan almashtirib bo'lmaydi;",
          "Agar 10 ta service <code>DatabaseService</code>'ni ishlatsa, 10 ta alohida nusxa yaratiladi — bu isrof;",
          "Bir joyni o'zgartirish uchun barcha service'larni qayta yozish kerak bo'ladi."
        ] },

        { h2: "Yechim: Dependency Injection" },
        { p: "DI g'oyasi juda oddiy: <strong>obyekt o'ziga kerakli bog'liqliklarni o'zi yaratmaydi, balki ularni tashqaridan qabul qiladi.</strong> Kim yaratadi? NestJS'ning maxsus tizimi — <strong>IoC konteyner</strong> (Inversion of Control — nazoratni teskari qilish)." },
        { p: "DI bilan yuqoridagi kod shunday bo'ladi. E'tibor bering, <code>UsersService</code> endi <code>DatabaseService</code>'ni qanday yaratishni bilmaydi — u shunchaki so'raydi:" },
        { code: "@Injectable()\nclass UsersService {\n  // Bog'liqlikni tashqaridan qabul qilamiz, o'zimiz yaratmaymiz:\n  constructor(private readonly db: DatabaseService) {}\n\n  // NestJS db'ni avtomatik topib, shu yerga uzatadi\n}" },
        { note: "Bu \"nazoratni teskari qilish\" nomining ma'nosi: odatda kod o'z bog'liqliklarini <em>o'zi</em> nazorat qiladi (yaratadi). DI'da esa bu nazorat teskari yo'nalishga o'tadi — framework bog'liqliklarni yaratib, kodga <em>beradi</em>." },

        { h2: "Konstruktor injektsiyasi qanday ishlaydi?" },
        { p: "NestJS'da eng keng tarqalgan usul — <strong>konstruktor injektsiyasi</strong>. Siz service'ni konstruktor argumenti sifatida e'lon qilasiz, NestJS uning tipini ko'radi va tegishli nusxani avtomatik uzatadi. Jarayon quyidagicha:" },
        { ol: [
          "Siz konstruktorda <code>private readonly db: DatabaseService</code> yozasiz;",
          "NestJS TypeScript metama'lumotlari orqali <code>db</code>ning tipi <code>DatabaseService</code> ekanligini biladi;",
          "IoC konteyner o'z ichida <code>DatabaseService</code> nusxasi bor-yo'qligini tekshiradi;",
          "Agar bor bo'lsa, o'shani uzatadi; yo'q bo'lsa — yangi yaratib, keyingi safar uchun eslab qoladi."
        ] },
        { code: "@Injectable()\nexport class UsersService {\n  constructor(\n    private readonly db: DatabaseService,\n    private readonly logger: LoggerService,\n  ) {}\n  // Ikkala bog'liqlik ham avtomatik injektsiya qilinadi\n\n  async findAll() {\n    this.logger.log('Foydalanuvchilar so\\'raldi');\n    return this.db.query('SELECT * FROM users');\n  }\n}" },
        { tip: "<code>private readonly</code> yozuvi TypeScript'ning qulay xususiyati: u argumentni avtomatik ravishda klass xossasiga aylantiradi. Ya'ni <code>this.db = db</code> deb qo'lda yozish shart emas. Bu NestJS'da konstruktor injektsiyasi juda ixcham ko'rinishining sababi." },

        { h2: "Provider nima?" },
        { p: "<strong>Provider</strong> — bu NestJS injektsiya qila oladigan har qanday narsa. Ko'pincha bu <code>@Injectable</code> service, lekin u qiymat, funksiya yoki tashqi kutubxona ham bo'lishi mumkin. Provider modulning <code>providers</code> massivida ro'yxatdan o'tishi kerak:" },
        { code: "@Module({\n  providers: [UsersService, DatabaseService, LoggerService],\n})\nexport class UsersModule {}" },
        { p: "Standart holatda har bir provider <strong>singleton</strong> — ya'ni butun ilova bo'ylab uning faqat bitta nusxasi mavjud bo'ladi. <code>DatabaseService</code>'ni 100 ta joyda ishlatsangiz ham, xotirada bitta nusxa bo'ladi va u barcha service'lar orasida ulashiladi. Bu resurslarni tejaydi." },
        { note: "Singleton — bu NestJS DI'ning muhim afzalligi. Masalan, bazaga ulanish (connection pool) bir marta yaratilib, butun ilova bo'ylab qayta ishlatiladi. Bu Express'da qo'lda global o'zgaruvchilar bilan qilinadigan ishni avtomatlashtiradi." },

        { h2: "Maxsus provayderlar (custom providers)" },
        { p: "Ba'zan siz oddiy klassni emas, balki maxsus qiymat yoki fabrikani injektsiya qilmoqchi bo'lasiz. NestJS buning uchun maxsus provayder sintaksisini beradi. Masalan, konfiguratsiya qiymatini token orqali berish:" },
        { code: "@Module({\n  providers: [\n    // Oddiy service:\n    UsersService,\n\n    // Qiymat provayderi (masalan, konfiguratsiya):\n    {\n      provide: 'API_KALIT',\n      useValue: 'maxfiy-kalit-12345',\n    },\n\n    // Fabrika provayderi (dinamik qiymat):\n    {\n      provide: 'DB_ULANISH',\n      useFactory: () => {\n        return new DatabaseService('localhost', 5432);\n      },\n    },\n  ],\n})\nexport class UsersModule {}" },
        { p: "Token orqali berilgan provayderni olish uchun <code>@Inject</code> dekoratori ishlatiladi (chunki string token'ni TypeScript tipi orqali aniqlab bo'lmaydi):" },
        { code: "import { Injectable, Inject } from '@nestjs/common';\n\n@Injectable()\nexport class UsersService {\n  constructor(\n    @Inject('API_KALIT') private readonly apiKalit: string,\n  ) {}\n}" },

        { h2: "Modullararo import va export" },
        { p: "Endi eng muhim mavzuga o'tamiz: bir modulning service'ini boshqa modulda qanday ishlatish mumkin? Standart holatda modulning provayderlari <strong>faqat o'sha modul ichida</strong> ko'rinadi. Ularni tashqariga chiqarish uchun ikki bosqich bor." },
        { p: "<strong>1-bosqich:</strong> service'ni beruvchi modulda uni <code>exports</code> massiviga qo'shamiz. Masalan, <code>DatabaseModule</code> o'z <code>DatabaseService</code>'ini eksport qiladi:" },
        { code: "// src/database/database.module.ts\nimport { Module } from '@nestjs/common';\nimport { DatabaseService } from './database.service';\n\n@Module({\n  providers: [DatabaseService],\n  exports: [DatabaseService],   // Boshqa modullar uchun ochamiz\n})\nexport class DatabaseModule {}" },
        { p: "<strong>2-bosqich:</strong> service'ni ishlatmoqchi bo'lgan modulda <code>DatabaseModule</code>'ni <code>imports</code>'ga qo'shamiz:" },
        { code: "// src/users/users.module.ts\nimport { Module } from '@nestjs/common';\nimport { UsersService } from './users.service';\nimport { DatabaseModule } from '../database/database.module';\n\n@Module({\n  imports: [DatabaseModule],   // DatabaseService'ni olish uchun\n  providers: [UsersService],\n})\nexport class UsersModule {}" },
        { p: "Endi <code>UsersService</code> ichida <code>DatabaseService</code>'ni bemalol injektsiya qilishimiz mumkin. NestJS uni <code>DatabaseModule</code>'dan topadi:" },
        { code: "@Injectable()\nexport class UsersService {\n  // DatabaseService boshqa moduldan keladi, lekin bemalol ishlaydi:\n  constructor(private readonly db: DatabaseService) {}\n}" },
        { warn: "Agar service'ni <code>exports</code>'ga qo'shmasangiz, uni boshqa modulda ishlatib bo'lmaydi — NestJS <em>\"Nest can't resolve dependencies\"</em> xatosini beradi. Ikki qoidani yodda tuting: beruvchi modul <strong>exports</strong> qilishi, oluvchi modul esa uni <strong>imports</strong> qilishi shart." },

        { h2: "Global modullar" },
        { p: "Ba'zi modullar (masalan, konfiguratsiya yoki logger) deyarli hamma joyda kerak bo'ladi. Ularni har bir modulga alohida import qilish zerikarli. Bunday holatda modulni <code>@Global()</code> deb belgilash mumkin — shunda uni faqat bir marta import qilib, hamma joyda ishlatish mumkin:" },
        { code: "import { Module, Global } from '@nestjs/common';\nimport { ConfigService } from './config.service';\n\n@Global()   // Bu modul global bo'ladi\n@Module({\n  providers: [ConfigService],\n  exports: [ConfigService],\n})\nexport class ConfigModule {}" },
        { warn: "<code>@Global()</code>'ni ehtiyotkorlik bilan ishlating. Hamma narsani global qilish modullararo bog'liqliklarni yashirin qiladi va kodni tushunish qiyinlashadi. Uni faqat haqiqatan ham hamma joyda kerak bo'ladigan (config, logger) modullar uchun ishlating." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Dependency Injection</strong> — obyekt bog'liqliklarni o'zi yaratmaydi, tashqaridan qabul qiladi;",
          "<strong>IoC konteyner</strong> bog'liqliklarni yaratib, konstruktorga avtomatik uzatadi;",
          "<strong>Konstruktor injektsiyasi</strong> — <code>constructor(private readonly x: XService) {}</code> eng keng tarqalgan usul;",
          "<strong>Provider</strong> — injektsiya qilinadigan narsa, odatda <code>@Injectable</code> service, <code>providers</code>'da ro'yxatdan o'tadi;",
          "Provayderlar standart holatda <strong>singleton</strong> — butun ilovada bitta nusxa;",
          "Service'ni boshqa modulda ishlatish uchun: beruvchi modul <code>exports</code>, oluvchi modul <code>imports</code> qiladi;",
          "<code>@Global()</code> modulni hamma joyda ochadi, lekin uni ehtiyotkorlik bilan ishlatish kerak."
        ] }
      ]
    },

    {
      slug: "nestjs-database",
      title: "Ma'lumotlar bazasi (TypeORM)",
      blurb: "NestJS'da ma'lumotlar bazasi bilan ishlash: TypeORM integratsiyasi, @Entity bilan jadval e'loni, Repository shabloni, to'liq CRUD service misoli va Prisma bilan qisqacha taqqoslash.",
      body: [
        { lead: "Haqiqiy ilovalar ma'lumotni doimiy saqlashi kerak — bu esa ma'lumotlar bazasini talab qiladi. NestJS eng mashhur <strong>ORM</strong> (Object-Relational Mapping) kutubxonalari bilan chuqur integratsiyaga ega. Ushbu darsda <strong>TypeORM</strong> orqali bazaga ulanishni, <code>@Entity</code> bilan jadval yaratishni, <strong>Repository</strong> shablonini va to'liq CRUD servisni yozishni o'rganamiz." },

        { h2: "ORM nima va nega TypeORM?" },
        { p: "<strong>ORM</strong> — bu ma'lumotlar bazasidagi jadvallarni kodingizdagi obyektlar bilan bog'lovchi qatlam. U sizni SQL so'rovlarini qo'lda yozishdan qutqaradi: siz obyektlar bilan ishlaysiz, ORM esa ularni SQL'ga o'giradi. <strong>TypeORM</strong> — TypeScript uchun eng mashhur ORM'lardan biri va NestJS bilan rasmiy integratsiyaga ega." },
        { ul: [
          "SQL o'rniga TypeScript klasslari va metodlar bilan ishlaysiz;",
          "PostgreSQL, MySQL, SQLite, MariaDB va boshqalarni qo'llab-quvvatlaydi;",
          "Migratsiyalar orqali baza sxemasini boshqarish imkoni;",
          "TypeScript tiplari bilan to'liq mos ishlaydi."
        ] },
        { note: "Ushbu darsda misollar uchun <strong>PostgreSQL</strong>ni ishlatamiz, lekin sozlamada bazani almashtirish orqali istalgan bazaga o'tish mumkin. TypeORM'ning kuchli tomoni — kodingiz baza turidan deyarli mustaqil bo'ladi." },

        { h2: "O'rnatish va ulanish" },
        { p: "Avval kerakli paketlarni o'rnatamiz: NestJS'ning TypeORM adapteri, TypeORM'ning o'zi va PostgreSQL drayveri:" },
        { code: "npm install @nestjs/typeorm typeorm pg" },
        { p: "Endi bazaga ulanishni ildiz modulda sozlaymiz. <code>TypeOrmModule.forRoot()</code> ulanish parametrlarini qabul qiladi:" },
        { code: "// src/app.module.ts\nimport { Module } from '@nestjs/common';\nimport { TypeOrmModule } from '@nestjs/typeorm';\n\n@Module({\n  imports: [\n    TypeOrmModule.forRoot({\n      type: 'postgres',\n      host: 'localhost',\n      port: 5432,\n      username: 'postgres',\n      password: 'parol',\n      database: 'mening_bazam',\n      entities: [__dirname + '/**/*.entity{.ts,.js}'],\n      synchronize: true,  // Faqat ishlab chiqish (development) uchun!\n    }),\n  ],\n})\nexport class AppModule {}" },
        { warn: "<code>synchronize: true</code> baza sxemasini entity'laringizga qarab avtomatik yangilaydi. Bu ishlab chiqishda qulay, lekin <strong>ishlab chiqarishda (production) hech qachon ishlatmang</strong> — u ma'lumotni yo'q qilishi mumkin. Production'da <strong>migratsiyalar</strong>dan foydalaning." },

        { h2: "@Entity — jadval e'loni" },
        { p: "<strong>Entity</strong> — bu ma'lumotlar bazasidagi jadvalni ifodalovchi klass. Har bir entity nusxasi jadvalning bir qatoriga, har bir xossa esa ustunga mos keladi. Entity'ni <code>@Entity</code> dekoratori bilan belgilaymiz:" },
        { code: "// src/users/user.entity.ts\nimport {\n  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,\n} from 'typeorm';\n\n@Entity('users')   // 'users' nomli jadval\nexport class User {\n  @PrimaryGeneratedColumn()   // Avtomatik o'suvchi asosiy kalit (id)\n  id: number;\n\n  @Column({ length: 100 })\n  ism: string;\n\n  @Column({ unique: true })   // Takrorlanmas email\n  email: string;\n\n  @Column({ default: true })\n  faol: boolean;\n\n  @CreateDateColumn()   // Yaratilgan sana avtomatik qo'yiladi\n  yaratilganSana: Date;\n}" },
        { p: "Asosiy ustun dekoratorlari:" },
        { ul: [
          "<code>@PrimaryGeneratedColumn()</code> — avtomatik o'suvchi asosiy kalit;",
          "<code>@Column()</code> — oddiy ustun, parametrlarga <code>length</code>, <code>unique</code>, <code>default</code>, <code>nullable</code> berish mumkin;",
          "<code>@CreateDateColumn()</code> — qator yaratilgan vaqtni avtomatik saqlaydi;",
          "<code>@UpdateDateColumn()</code> — oxirgi yangilanish vaqtini avtomatik saqlaydi."
        ] },

        { h2: "Repository shabloni" },
        { p: "<strong>Repository</strong> — bu ma'lum bir entity bilan ishlash uchun tayyor obyekt. U <code>find</code>, <code>save</code>, <code>delete</code> kabi metodlar orqali bazaga so'rov yuboradi. TypeORM har bir entity uchun avtomatik repository yaratadi." },
        { p: "Repository'ni service ichida ishlatish uchun ikki bosqich kerak. Avval feature modulda entity'ni ro'yxatdan o'tkazamiz — <code>TypeOrmModule.forFeature()</code> orqali:" },
        { code: "// src/users/users.module.ts\nimport { Module } from '@nestjs/common';\nimport { TypeOrmModule } from '@nestjs/typeorm';\nimport { User } from './user.entity';\nimport { UsersService } from './users.service';\nimport { UsersController } from './users.controller';\n\n@Module({\n  imports: [TypeOrmModule.forFeature([User])],  // User repository'sini ochadi\n  providers: [UsersService],\n  controllers: [UsersController],\n})\nexport class UsersModule {}" },
        { p: "So'ng service ichida repository'ni <code>@InjectRepository</code> dekoratori orqali injektsiya qilamiz:" },
        { code: "// src/users/users.service.ts\nimport { Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { User } from './user.entity';\n\n@Injectable()\nexport class UsersService {\n  constructor(\n    @InjectRepository(User)\n    private readonly usersRepo: Repository<User>,\n  ) {}\n}" },
        { note: "<code>Repository&lt;User&gt;</code> — bu generik tip. U repository aynan <code>User</code> entity bilan ishlashini bildiradi. Shu tufayli <code>find</code> yoki <code>save</code> chaqirganingizda TypeScript sizga to'g'ri tiplarni ko'rsatadi." },

        { h2: "To'liq CRUD service misoli" },
        { p: "Endi barcha CRUD amallarini (Create, Read, Update, Delete) o'z ichiga olgan to'liq servisni yozamiz. Repository metodlariga e'tibor bering — ular deyarli SQL yozmasdan hamma ishni bajaradi:" },
        { code: "// src/users/users.service.ts\nimport { Injectable, NotFoundException } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { User } from './user.entity';\nimport { CreateUserDto } from './dto/create-user.dto';\n\n@Injectable()\nexport class UsersService {\n  constructor(\n    @InjectRepository(User)\n    private readonly repo: Repository<User>,\n  ) {}\n\n  // CREATE — yangi foydalanuvchi yaratish\n  async create(dto: CreateUserDto): Promise<User> {\n    const user = this.repo.create(dto);  // Obyekt tayyorlaydi\n    return this.repo.save(user);         // Bazaga yozadi\n  }\n\n  // READ (barchasi)\n  async findAll(): Promise<User[]> {\n    return this.repo.find();\n  }\n\n  // READ (bittasi)\n  async findOne(id: number): Promise<User> {\n    const user = await this.repo.findOne({ where: { id } });\n    if (!user) {\n      throw new NotFoundException('Foydalanuvchi topilmadi: ' + id);\n    }\n    return user;\n  }\n\n  // UPDATE\n  async update(id: number, dto: Partial<CreateUserDto>): Promise<User> {\n    const user = await this.findOne(id);   // Avval borligini tekshiramiz\n    Object.assign(user, dto);              // Yangi qiymatlarni qo'shamiz\n    return this.repo.save(user);\n  }\n\n  // DELETE\n  async remove(id: number): Promise<void> {\n    const user = await this.findOne(id);\n    await this.repo.remove(user);\n  }\n}" },
        { p: "Eng ko'p ishlatiladigan repository metodlari:" },
        { ul: [
          "<code>create(dto)</code> — entity nusxasini tayyorlaydi (hali saqlamaydi);",
          "<code>save(entity)</code> — bazaga yozadi (yangi bo'lsa INSERT, mavjud bo'lsa UPDATE);",
          "<code>find()</code> / <code>findOne({ where })</code> — o'qish;",
          "<code>remove(entity)</code> — o'chirish;",
          "<code>count()</code>, <code>update()</code>, <code>delete()</code> — qo'shimcha amallar."
        ] },
        { tip: "<code>findOne</code> topa olmasa <code>null</code> qaytaradi. Shuning uchun yuqoridagi kodda biz uni tekshirib, <code>NotFoundException</code> tashladik. NestJS bu istisnoni avtomatik <strong>404 Not Found</strong> javobiga o'giradi — bu qulay tayyor mexanizm." },

        { h2: "Controller bilan bog'lash" },
        { p: "Endi servisni controller'ga ulaymiz. Controller ingichka qoladi — u faqat so'rovni qabul qilib, servisga uzatadi:" },
        { code: "// src/users/users.controller.ts\nimport {\n  Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe,\n} from '@nestjs/common';\nimport { UsersService } from './users.service';\nimport { CreateUserDto } from './dto/create-user.dto';\n\n@Controller('users')\nexport class UsersController {\n  constructor(private readonly service: UsersService) {}\n\n  @Post()\n  create(@Body() dto: CreateUserDto) {\n    return this.service.create(dto);\n  }\n\n  @Get()\n  findAll() {\n    return this.service.findAll();\n  }\n\n  @Get(':id')\n  findOne(@Param('id', ParseIntPipe) id: number) {\n    return this.service.findOne(id);\n  }\n\n  @Delete(':id')\n  remove(@Param('id', ParseIntPipe) id: number) {\n    return this.service.remove(id);\n  }\n}" },

        { h2: "Prisma bilan qisqacha taqqoslash" },
        { p: "TypeORM yagona tanlov emas. So'nggi yillarda <strong>Prisma</strong> juda mashhur bo'ldi. U boshqacha yondashuvni tanlaydi: entity klasslari o'rniga alohida <code>schema.prisma</code> faylida sxema e'lon qilinadi va undan tiplar avtomatik generatsiya qilinadi." },
        { code: "// schema.prisma faylida sxema (TypeScript emas):\nmodel User {\n  id    Int     @id @default(autoincrement())\n  ism   String\n  email String  @unique\n  faol  Boolean @default(true)\n}" },
        { ul: [
          "<strong>TypeORM:</strong> dekoratorlar bilan ishlaydi, NestJS uslubiga tabiiy mos keladi, moslashuvchan;",
          "<strong>Prisma:</strong> alohida sxema fayli, avtomatik generatsiya qilingan mustahkam tiplar, ajoyib developer tajribasi;",
          "Ikkalasi ham NestJS bilan yaxshi ishlaydi — tanlov jamoa afzalligiga bog'liq."
        ] },
        { note: "Yangi loyihalarda ko'p jamoalar Prisma'ni tanlaydi, chunki uning tip xavfsizligi va migratsiya tizimi kuchli. TypeORM esa NestJS bilan tabiiy uyg'unligi va rasmiy integratsiyasi tufayli hali ham juda mashhur. Ikkovi ham to'g'ri tanlov." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>ORM</strong> baza jadvallarini kod obyektlariga bog'laydi, SQL yozishni kamaytiradi;",
          "<code>TypeOrmModule.forRoot()</code> ildiz modulda ulanishni sozlaydi;",
          "<strong>@Entity</strong> jadvalni, <code>@PrimaryGeneratedColumn</code>/<code>@Column</code> ustunlarni belgilaydi;",
          "<code>TypeOrmModule.forFeature([Entity])</code> feature modulda repository'ni ochadi;",
          "<strong>Repository</strong> <code>find</code>, <code>save</code>, <code>remove</code> metodlari bilan CRUD amallarini bajaradi;",
          "Topilmagan yozuv uchun <code>NotFoundException</code> tashlansa, NestJS avtomatik 404 qaytaradi;",
          "<code>synchronize: true</code> faqat development uchun; production'da migratsiyalar ishlating;",
          "<strong>Prisma</strong> — TypeORM'ga zamonaviy muqobil, kuchli tip xavfsizligi bilan."
        ] }
      ]
    },

    {
      slug: "nestjs-guard",
      title: "Middleware, Guard, Interceptor, Exception filter",
      blurb: "NestJS so'rovni qayta ishlash quvuri: Middleware, autentifikatsiya uchun Guard (@UseGuards), ma'lumotni o'zgartiruvchi Pipe, javobni boyituvchi Interceptor va xatolarni tutuvchi Exception filter.",
      body: [
        { lead: "NestJS'da so'rov controller'ga yetib borishidan oldin va javob mijozga qaytishdan oldin bir necha bosqichdan o'tadi. Bu bosqichlar — <strong>Middleware</strong>, <strong>Guard</strong>, <strong>Pipe</strong>, <strong>Interceptor</strong> va <strong>Exception filter</strong>. Har biri o'z vazifasiga ega. Ushbu yakuniy darsda ushbu quvurni (pipeline) va uning har bir bo'g'inini o'rganamiz." },

        { h2: "So'rovni qayta ishlash quvuri" },
        { p: "Avval umumiy manzarani ko'ramiz. So'rov kelganda u quyidagi tartibda o'tadi. Bu tartibni bilish qaysi vositani qayerda ishlatishni tushunish uchun muhim:" },
        { ol: [
          "<strong>Middleware</strong> — eng birinchi, xom so'rov ustida (Express middleware kabi);",
          "<strong>Guard</strong> — so'rovni <em>o'tkazish yoki rad etish</em> to'g'risida qaror qabul qiladi (masalan, autentifikatsiya);",
          "<strong>Interceptor</strong> (kirish) — controller'gacha qo'shimcha logika;",
          "<strong>Pipe</strong> — parametrlar va tanani o'zgartirish/tekshirish (masalan, ValidationPipe);",
          "<strong>Controller</strong> — asosiy ish;",
          "<strong>Interceptor</strong> (chiqish) — javobni o'zgartirish;",
          "<strong>Exception filter</strong> — biror joyda xato yuz bersa, uni tutadi."
        ] },
        { note: "Har bir bo'g'inning aniq vazifasi bor. Umumiy qoida: <strong>Guard</strong> — \"kirishga ruxsat bormi?\", <strong>Pipe</strong> — \"ma'lumot to'g'rimi?\", <strong>Interceptor</strong> — \"kirish/chiqishni o'zgartiraymi?\", <strong>Exception filter</strong> — \"xatoni qanday ko'rsataymi?\"." },

        { h2: "Middleware" },
        { p: "<strong>Middleware</strong> Express'dagi middleware bilan bir xil g'oyaga ega: u so'rov controller'ga yetishidan oldin ishlaydigan funksiya. Odatda logging, so'rovni tayyorlash yoki umumiy tekshiruvlar uchun ishlatiladi. NestJS'da middleware klass ko'rinishida yoziladi:" },
        { code: "// src/logger.middleware.ts\nimport { Injectable, NestMiddleware } from '@nestjs/common';\nimport { Request, Response, NextFunction } from 'express';\n\n@Injectable()\nexport class LoggerMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    console.log(req.method + ' ' + req.originalUrl);\n    next();   // Keyingi bosqichga o'tkazish (Express'dagidek)\n  }\n}" },
        { p: "Middleware'ni modulda ro'yxatdan o'tkazamiz — modul <code>NestModule</code>'ni amalga oshirib, <code>configure</code> metodida uni qaysi marshrutlarga qo'llashni belgilaydi:" },
        { code: "import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';\nimport { LoggerMiddleware } from './logger.middleware';\n\n@Module({})\nexport class AppModule implements NestModule {\n  configure(consumer: MiddlewareConsumer) {\n    consumer\n      .apply(LoggerMiddleware)\n      .forRoutes('*');   // Barcha marshrutlarga qo'llash\n  }\n}" },

        { h2: "Guard — autentifikatsiya va avtorizatsiya" },
        { p: "<strong>Guard</strong> bitta savolga javob beradi: <em>\"Bu so'rovga ruxsat bermi?\"</em>. U <code>true</code> qaytarsa, so'rov davom etadi; <code>false</code> qaytarsa yoki istisno tashlasa, NestJS <strong>403 Forbidden</strong> qaytaradi. Guard'lar autentifikatsiya (kimligini aniqlash) va avtorizatsiya (huquqini tekshirish) uchun ideal." },
        { p: "Guard <code>CanActivate</code> interfeysini amalga oshiradi. <code>canActivate</code> metodi <code>true</code>/<code>false</code> yoki ularni beruvchi Promise qaytaradi:" },
        { code: "// src/auth/auth.guard.ts\nimport {\n  Injectable, CanActivate, ExecutionContext, UnauthorizedException,\n} from '@nestjs/common';\n\n@Injectable()\nexport class AuthGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    // So'rov obyektini olamiz:\n    const request = context.switchToHttp().getRequest();\n    const token = request.headers['authorization'];\n\n    if (!token) {\n      throw new UnauthorizedException('Token topilmadi');\n    }\n\n    // Bu yerda token haqiqiyligini tekshirish logikasi bo'ladi\n    // (masalan, JWT'ni tekshirish)\n    return true;   // Ruxsat berilsa\n  }\n}" },
        { p: "Guard'ni marshrut yoki controller'ga <code>@UseGuards</code> dekoratori orqali qo'llaymiz:" },
        { code: "import { Controller, Get, UseGuards } from '@nestjs/common';\nimport { AuthGuard } from '../auth/auth.guard';\n\n@Controller('profil')\nexport class ProfilController {\n\n  @Get()\n  @UseGuards(AuthGuard)   // Bu marshrut himoyalangan\n  getProfil() {\n    return 'Maxfiy profil ma\\'lumoti';\n  }\n}" },
        { tip: "<code>@UseGuards</code>'ni metodga qo'ysangiz — faqat o'sha metod himoyalanadi. Controller klassiga qo'ysangiz — undagi barcha metodlar himoyalanadi. Global qilish uchun esa <code>app.useGlobalGuards()</code>'dan foydalaning." },

        { h2: "Pipe — o'zgartirish va tekshirish" },
        { p: "<strong>Pipe</strong>ni oldingi darsda ko'rgan edik (<code>ValidationPipe</code>, <code>ParseIntPipe</code>). Uning ikki vazifasi bor: <strong>o'zgartirish</strong> (masalan, satrni songa) va <strong>tekshirish</strong> (masalan, DTO validatsiyasi). O'zingizning maxsus pipe'ingizni ham yozishingiz mumkin:" },
        { code: "// src/pipes/bosh-harf.pipe.ts\nimport { PipeTransform, Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class BoshHarfPipe implements PipeTransform {\n  transform(value: string): string {\n    // Kelgan satrni bosh harflarga o'giradi:\n    return value.toUpperCase();\n  }\n}" },
        { p: "Bu pipe'ni parametrga qo'llaganda kelgan qiymat controller'ga yetguncha o'zgaradi:" },
        { code: "@Get(':nom')\nfindByName(@Param('nom', BoshHarfPipe) nom: string) {\n  // Agar /ali so'ralsa, nom = 'ALI'\n  return nom;\n}" },

        { h2: "Interceptor — kirish va chiqishni boyitish" },
        { p: "<strong>Interceptor</strong> so'rov <em>oldida</em> ham, javob <em>keyin</em> ham logika qo'shishga imkon beradi. U ayniqsa quyidagilar uchun foydali: barcha javoblarni yagona formatga o'rash, so'rov davomiyligini o'lchash (logging), javobni kesh qilish. Interceptor RxJS'ning <code>Observable</code>'idan foydalanadi:" },
        { code: "// src/interceptors/transform.interceptor.ts\nimport {\n  Injectable, NestInterceptor, ExecutionContext, CallHandler,\n} from '@nestjs/common';\nimport { Observable } from 'rxjs';\nimport { map } from 'rxjs/operators';\n\n@Injectable()\nexport class TransformInterceptor implements NestInterceptor {\n  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {\n    return next.handle().pipe(\n      // Har bir javobni yagona formatga o'raymiz:\n      map(data => ({ muvaffaqiyat: true, malumot: data })),\n    );\n  }\n}" },
        { p: "Endi controller <code>[{...}]</code> qaytarsa ham, mijoz shu ko'rinishda javob oladi:" },
        { code: "// Controller qaytargan: [{ id: 1, ism: 'Ali' }]\n// Mijoz oladigan javob:\n// {\n//   \"muvaffaqiyat\": true,\n//   \"malumot\": [{ \"id\": 1, \"ism\": \"Ali\" }]\n// }" },
        { p: "Interceptor'ni ham <code>@UseInterceptors</code> dekoratori bilan qo'llaymiz:" },
        { code: "import { Controller, Get, UseInterceptors } from '@nestjs/common';\nimport { TransformInterceptor } from '../interceptors/transform.interceptor';\n\n@Controller('users')\n@UseInterceptors(TransformInterceptor)   // Barcha metodlarga\nexport class UsersController {\n  @Get()\n  findAll() {\n    return [{ id: 1, ism: 'Ali' }];\n  }\n}" },

        { h2: "Exception filter — xatolarni boshqarish" },
        { p: "<strong>Exception filter</strong> ilovada yuz bergan xatolarni tutadi va mijozga qanday ko'rsatishni nazorat qiladi. NestJS'da tayyor istisnolar mavjud: <code>NotFoundException</code> (404), <code>BadRequestException</code> (400), <code>UnauthorizedException</code> (401), <code>ForbiddenException</code> (403). Ularni shunchaki tashlaysiz:" },
        { code: "import { NotFoundException, BadRequestException } from '@nestjs/common';\n\n// Service ichida:\nif (!user) {\n  throw new NotFoundException('Foydalanuvchi topilmadi');\n}\nif (yosh < 18) {\n  throw new BadRequestException('Yosh 18 dan katta bo\\'lsin');\n}" },
        { p: "Xatoni butun ilova bo'ylab yagona formatda ko'rsatish uchun maxsus filter yozamiz. U <code>ExceptionFilter</code>'ni amalga oshiradi va <code>@Catch</code> dekoratori qaysi xatoni tutishni belgilaydi:" },
        { code: "// src/filters/http-exception.filter.ts\nimport {\n  ExceptionFilter, Catch, ArgumentsHost, HttpException,\n} from '@nestjs/common';\nimport { Response } from 'express';\n\n@Catch(HttpException)   // Barcha HTTP istisnolarini tutamiz\nexport class HttpExceptionFilter implements ExceptionFilter {\n  catch(exception: HttpException, host: ArgumentsHost) {\n    const ctx = host.switchToHttp();\n    const response = ctx.getResponse<Response>();\n    const status = exception.getStatus();\n\n    // Yagona xato formati:\n    response.status(status).json({\n      muvaffaqiyat: false,\n      kod: status,\n      xabar: exception.message,\n      vaqt: new Date().toISOString(),\n    });\n  }\n}" },
        { p: "Filter'ni <code>@UseFilters</code> bilan yoki global tarzda qo'llash mumkin:" },
        { code: "// Global qo'llash (main.ts):\napp.useGlobalFilters(new HttpExceptionFilter());\n\n// Yoki bitta controller/metodga:\n// @UseFilters(HttpExceptionFilter)" },
        { warn: "Exception filter faqat xatoni <em>ko'rsatish</em> uchun. Xatoni <em>oldini olish</em> uchun validatsiya (Pipe) va tekshiruvlar (Guard) ishlating. Filter — bu oxirgi himoya qatlami: kutilmagan xato yuz berganda ham mijozga chiroyli va bir xil javob berish uchun." },

        { h2: "Barchasini birlashtirish" },
        { p: "Amalda bu vositalar birgalikda qo'llaniladi. Quyidagi controller himoyalangan, validatsiyalangan va yagona javob formatiga ega:" },
        { code: "import {\n  Controller, Post, Body, UseGuards, UseInterceptors, UseFilters,\n} from '@nestjs/common';\nimport { AuthGuard } from '../auth/auth.guard';\nimport { TransformInterceptor } from '../interceptors/transform.interceptor';\nimport { HttpExceptionFilter } from '../filters/http-exception.filter';\nimport { CreateUserDto } from './dto/create-user.dto';\n\n@Controller('users')\n@UseGuards(AuthGuard)                    // Autentifikatsiya\n@UseInterceptors(TransformInterceptor)   // Javob formati\n@UseFilters(HttpExceptionFilter)         // Xato formati\nexport class UsersController {\n\n  @Post()\n  create(@Body() dto: CreateUserDto) {   // Pipe DTO'ni tekshiradi\n    return { id: 1, ism: dto.ism };\n  }\n}" },
        { note: "E'tibor bering: bitta controller ustida to'rt xil qatlam ishlaydi — Guard ruxsatni, Pipe ma'lumotni, Interceptor javobni, Filter xatoni boshqaradi. Har biri mustaqil, qayta ishlatiladigan va testlanadigan. Bu NestJS arxitekturasining kuchi — murakkab logika kichik, aniq bo'laklarga bo'linadi." },

        { h2: "Xulosa" },
        { ul: [
          "So'rov quvuri tartibi: <strong>Middleware</strong> &rarr; <strong>Guard</strong> &rarr; <strong>Interceptor</strong> &rarr; <strong>Pipe</strong> &rarr; <strong>Controller</strong> &rarr; <strong>Interceptor</strong> &rarr; (xato bo'lsa) <strong>Exception filter</strong>;",
          "<strong>Middleware</strong> — Express uslubidagi umumiy oldindan qayta ishlash (logging va h.k.);",
          "<strong>Guard</strong> (<code>@UseGuards</code>) — kirishga ruxsat bor-yo'qligini hal qiladi, autentifikatsiya uchun;",
          "<strong>Pipe</strong> — parametr va tanani o'zgartiradi hamda tekshiradi (ValidationPipe, ParseIntPipe);",
          "<strong>Interceptor</strong> (<code>@UseInterceptors</code>) — kirish/chiqish logikasi, javobni yagona formatga o'rash;",
          "<strong>Exception filter</strong> (<code>@Catch</code>, <code>@UseFilters</code>) — xatolarni tutib, yagona formatda ko'rsatadi;",
          "Bu vositalar mustaqil, qayta ishlatiladigan qatlamlar bo'lib, birgalikda ishonchli API quradi."
        ] }
      ]
    }
  ]
};
