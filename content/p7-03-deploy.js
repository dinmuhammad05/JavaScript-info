"use strict";

module.exports = {
  part: "7-qism: Testlash va yetkazib berish",
  chapter: "Loyihani deploy qilish",
  lessons: [
    {
      slug: "deploy-nima",
      title: "Deploy nima?",
      blurb: "Ishlab chiqarish (production) muhiti, lokalxost va server farqi, server turlari (VPS va PaaS/bulut), domen va DNS haqida umumiy tushuncha hamda deploy jarayonining bosqichlari.",
      body: [
        { lead: "Siz ilovani yozdingiz, u <strong>o'z kompyuteringizda</strong> mukammal ishlaydi. Lekin sizdan boshqa hech kim uni ochib ko'ra olmaydi. <strong>Deploy</strong> — bu ilovani o'z kompyuteringizdan olib, internetdagi doimo ishlab turadigan serverga joylashtirish jarayoni. Shundan so'ng har kim brauzerda manzilni yozib, ilovangizga kira oladi. Ushbu darsda deploy nima ekanligini, u qanday muhitlarda amalga oshirilishini va jarayonning umumiy bosqichlarini o'rganamiz." },

        { note: "Bu bob — <strong>server</strong> muhitiga oid. Bu yerdagi buyruqlar terminalda, Linux serverida ishlaydi. Ularni brauzerda ishga tushirib bo'lmaydi, shuning uchun barcha misollar <strong>statik</strong> — tushunib o'qish uchun keltirilgan. Har bir buyruqni mazmunini anglagan holda o'rganing." },

        { h2: "Deploy so'zining ma'nosi" },
        { p: "<strong>Deploy</strong> (deployment, o'zbekcha \"joylashtirish\", \"yetkazib berish\") — bu tayyor dasturiy ta'minotni foydalanuvchilar foydalana oladigan muhitga o'rnatish va ishga tushirish jarayoni. Ya'ni kod endi faqat sizning kompyuteringizda emas, balki <strong>haqiqiy, internetga ulangan mashinada</strong> ishlaydi." },
        { p: "Deploy — bu bir martalik hodisa emas. Odatda siz kodni ko'p marta yangilaysiz: yangi imkoniyat qo'shasiz, xatoni tuzatasiz. Har safar bu o'zgarishni serverga yetkazish ham deploy deb ataladi. Shuning uchun deploy jarayonini <strong>iloji boricha oddiy va takrorlanadigan</strong> qilish muhim." },

        { h2: "Lokalxost va server farqi" },
        { p: "<strong>Lokalxost</strong> (localhost) — bu sizning o'z kompyuteringiz. Node.js serverini ishga tushirganingizda u odatda <code>http://localhost:3000</code> manzilida ochiladi. Bu manzil faqat <strong>shu kompyuterda</strong> ishlaydi — internetning boshqa qismidan unga kirib bo'lmaydi." },
        { p: "<strong>Server</strong> (yoki ishlab chiqarish serveri) — bu internetga doimo ulangan, o'chirilmaydigan mashina. Uning <strong>ommaviy IP manzili</strong> (masalan, <code>203.0.113.10</code>) yoki domeni (masalan, <code>mening-saytim.uz</code>) bo'ladi, va dunyoning istalgan nuqtasidan unga kirish mumkin." },
        { ul: [
          "<strong>Lokalxost</strong> — sizning kompyuteringiz; ilova siz uni ishga tushirganingizda ishlaydi; faqat siz ko'rasiz;",
          "<strong>Server</strong> — masofadagi mashina; ilova 24/7 ishlaydi; har kim ko'radi."
        ] },
        { p: "Ular orasidagi farqlar shunchaki manzil bilan cheklanmaydi. Serverda muhit boshqacha bo'ladi: operatsion tizim (odatda Linux), o'zgaruvchilar, fayllar joylashuvi, ruxsatlar. Kod lokalxostda ishlab, serverda ishlamasligi mumkin — masalan, portlar band bo'lsa, kutubxona o'rnatilmagan bo'lsa yoki fayl yo'llari boshqacha bo'lsa." },
        { note: "Ko'p tarqalgan ibora bor: \"menda ishlayapti-ku\" (\"works on my machine\"). Bu aynan lokalxost va server farqidan kelib chiqadi. Shuning uchun ilovani muhitga bog'liq bo'lmagan qilib yozish — masalan, sozlamalarni <code>.env</code> orqali berish — juda muhim. Bu haqida VPS darsida batafsil to'xtalamiz." },

        { h2: "Ishlab chiqarish (production) muhiti" },
        { p: "Dasturchilar odatda bir necha <strong>muhit</strong> (environment) bilan ishlashadi. Muhit — bu ilova ishlaydigan alohida sozlangan makon. Uchta eng ko'p uchraydigani:" },
        { ul: [
          "<strong>Development</strong> (ishlab chiqish, dev) — sizning lokalxostingiz. Bu yerda kod tez-tez o'zgaradi, xatolar to'liq ko'rsatiladi, tez qayta yuklanadi;",
          "<strong>Staging</strong> (sinov, oldingi bosqich) — productionga o'xshash, lekin foydalanuvchilar uchun emas. Bu yerda oxirgi sinov o'tkaziladi;",
          "<strong>Production</strong> (ishlab chiqarish, prod) — haqiqiy foydalanuvchilar ishlatadigan muhit. Bu yerda barqarorlik, tezlik va xavfsizlik eng muhim."
        ] },
        { p: "Production muhitida ilova <em>development</em>dan farqli sozlanadi. Masalan, xato xabarlari foydalanuvchiga to'liq ko'rsatilmaydi (xavfsizlik uchun), kodlar kichraytiriladi (minify), keshlash yoqiladi. Node.js'da bu ko'pincha <code>NODE_ENV=production</code> o'zgaruvchisi orqali boshqariladi." },
        { code: "# Development rejimida ishga tushirish:\nNODE_ENV=development node server.js\n\n# Production rejimida ishga tushirish:\nNODE_ENV=production node server.js" },
        { tip: "Express kabi freymvorklar <code>NODE_ENV=production</code> bo'lganda avtomatik ravishda ba'zi optimizatsiyalarni yoqadi (masalan, shablonlarni keshlaydi, batafsil xato izlarini yashiradi). Shu sababli productionda bu o'zgaruvchini o'rnatishni unutmang." },

        { h2: "Server turlari: VPS va PaaS" },
        { p: "Ilovani joylashtirish uchun serverga ega bo'lish kerak. Buning ikki asosiy yondashuvi bor va ular bir-biridan tubdan farq qiladi." },

        { h3: "VPS (virtual xususiy server)" },
        { p: "<strong>VPS</strong> (Virtual Private Server) — bu sizga to'liq nazorat beriladigan virtual Linux mashinasi. Siz unga <strong>SSH</strong> orqali ulanasiz, kerakli dasturlarni o'zingiz o'rnatasiz (Node.js, Nginx, ma'lumotlar bazasi), va hamma narsani o'zingiz sozlaysiz." },
        { ul: [
          "<strong>Ustunligi:</strong> to'liq erkinlik va nazorat — istalgan dasturni o'rnatishingiz mumkin; ko'pincha arzonroq;",
          "<strong>Kamchiligi:</strong> hamma narsani o'zingiz sozlashingiz kerak — xavfsizlik, yangilanishlar, monitoring sizning zimmangizda."
        ] },
        { p: "Mashhur VPS provayderlar: <strong>DigitalOcean</strong>, <strong>Hetzner</strong>, <strong>Linode</strong>, <strong>Vultr</strong>, <strong>AWS EC2</strong>. Ularda oyiga bir necha dollardan boshlanadigan tariflar bor. VPS'ga deploy qilishni keyingi darsda amalda ko'ramiz." },

        { h3: "PaaS (platforma xizmat sifatida)" },
        { p: "<strong>PaaS</strong> (Platform as a Service) — bu server boshqaruvining ko'p qismini o'z zimmasiga oladigan bulut xizmati. Siz faqat kodni beryapsiz, qolganini (server, tarmoq, masshtablash) platforma o'zi bajaradi." },
        { ul: [
          "<strong>Ustunligi:</strong> juda oson — ko'pincha git push qilib deploy qilasiz; server boshqaruvi bilan ovora bo'lmaysiz;",
          "<strong>Kamchiligi:</strong> kamroq nazorat; katta hajmda qimmatroq bo'lishi mumkin."
        ] },
        { p: "Backend uchun mashhur PaaS platformalar: <strong>Render</strong>, <strong>Railway</strong>, <strong>Fly.io</strong>, <strong>Heroku</strong>. Frontend/statik saytlar uchun esa <strong>Netlify</strong>, <strong>Vercel</strong>, <strong>GitHub Pages</strong> — bularni frontend darsida ko'ramiz." },
        { note: "Qaysi birini tanlash kerak? Agar siz Linux, SSH va Nginx bilan tanish bo'lsangiz va nazoratni xohlasangiz — <strong>VPS</strong>. Agar tez va oson yechim kerak bo'lsa, server boshqaruvi bilan shug'ullanishni istamasangiz — <strong>PaaS</strong>. Ko'p dasturchilar ikkalasidan ham foydalanadi: mayda loyihalar uchun PaaS, jiddiy nazorat kerak bo'lganda VPS." },

        { h2: "Domen va DNS haqida umumiy tushuncha" },
        { p: "Server IP manzilga ega bo'ladi, masalan <code>203.0.113.10</code>. Lekin foydalanuvchilar raqamlarni emas, <strong>domen nomini</strong> (masalan, <code>mening-saytim.uz</code>) yodda tutadi. <strong>Domen</strong> — bu insonlarga qulay, o'qiladigan manzil." },
        { p: "<strong>DNS</strong> (Domain Name System) — bu domen nomlarini IP manzillarga o'giradigan internetning \"telefon kitobi\". Foydalanuvchi brauzerda <code>mening-saytim.uz</code> yozganda, brauzer avval DNS'dan so'raydi: \"bu domen qaysi IP'ga tegishli?\" — javob olgach, o'sha IP'ga ulanadi." },
        { code: "# Domen qaysi IP'ga ko'rsatayotganini ko'rish (statik misol):\n$ nslookup mening-saytim.uz\n\nName:    mening-saytim.uz\nAddress: 203.0.113.10" },
        { p: "Ya'ni deploy zanjiri quyidagicha ishlaydi: <strong>domen → DNS → server IP → Nginx → ilovangiz</strong>. Domenni sotib olish, DNS yozuvlarini sozlash va uni serverga ulash — bularni oxirgi (domen va HTTPS) darsida batafsil ko'ramiz." },
        { tip: "Domensiz ham deploy qilish mumkin — foydalanuvchilar to'g'ridan-to'g'ri IP manzil (<code>http://203.0.113.10</code>) orqali kirishadi. Lekin bu chiroyli emas va HTTPS'ni to'g'ri sozlash uchun ham domen kerak bo'ladi. Jiddiy loyiha uchun domen deyarli har doim olinadi." },

        { h2: "Deploy jarayonining bosqichlari" },
        { p: "Har xil platforma va texnologiyada tafsilotlar farq qilsa-da, deploy jarayoni umumiy bosqichlarga ega. Backend ilovasini VPS'ga joylashtirishning tipik bosqichlari:" },
        { ol: [
          "<strong>Server tayyorlash</strong> — VPS olish, unga SSH orqali ulanish, kerakli dasturlarni o'rnatish (Node.js, Git, Nginx);",
          "<strong>Kodni yetkazish</strong> — kodni serverga olib borish, odatda <code>git clone</code> orqali;",
          "<strong>Bog'liqliklarni o'rnatish</strong> — <code>npm install</code> bilan kutubxonalarni o'rnatish;",
          "<strong>Muhitni sozlash</strong> — <code>.env</code> faylida maxfiy ma'lumotlar (parollar, kalitlar) va sozlamalarni berish;",
          "<strong>Ilovani ishga tushirish</strong> — uni doimo ishlab turadigan qilish (PM2 kabi vosita bilan);",
          "<strong>Reverse proxy sozlash</strong> — Nginx orqali 80/443 portidan ilovaga trafikni yo'naltirish;",
          "<strong>Domen va HTTPS</strong> — domenni ulash, SSL sertifikat o'rnatish."
        ] },
        { p: "Frontend/statik sayt uchun jarayon soddaroq: kodni <strong>build</strong> qilasiz (<code>npm run build</code>), natijadagi statik fayllarni hosting platformasiga yuklaysiz — tamom. Bu bosqichlar frontend darsida ko'riladi." },
        { note: "Zamonaviy loyihalarda bu bosqichlarni qo'lda emas, <strong>avtomatik</strong> bajarish odat tusiga kirgan — bunga <strong>CI/CD</strong> deyiladi. Masalan, GitHub'ga kodni push qilasiz, GitHub Actions esa avtomatik testlarni ishga tushiradi, build qiladi va serverga deploy qiladi. Lekin buni tushunish uchun avval qo'lda deploy qilishni bilish shart." },

        { h2: "Docker bilan bog'liqlik" },
        { p: "Agar siz Docker darsidan o'tgan bo'lsangiz, deploy jarayonini yanada ishonchli qilishning yana bir yo'lini bilasiz: ilovani <strong>konteynerga</strong> joylash. Docker ilovani barcha bog'liqliklari bilan bir \"qutiga\" o'raydi, shu tufayli u lokalxostda ham, serverda ham <strong>bir xil</strong> ishlaydi." },
        { p: "Bu aynan \"menda ishlayapti-ku\" muammosini hal qiladi: konteyner ichidagi muhit hamma joyda bir xil. Ko'p zamonaviy deploy quvurlari (pipeline) Docker image yaratib, uni serverda ishga tushiradi. Bu bobda biz Docker'siz, klassik yondashuvni ko'ramiz — lekin ikkala yo'lni ham bilish foydali." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Deploy</strong> — ilovani lokalxostdan internetdagi serverga joylashtirib, foydalanuvchilarga ochish jarayoni;",
          "<strong>Lokalxost</strong> faqat sizda ishlaydi, <strong>server</strong> esa 24/7 internetda; muhitlar farqi \"menda ishlayapti-ku\" muammosini keltirib chiqaradi;",
          "Uchta muhit bor: <strong>development</strong>, <strong>staging</strong>, <strong>production</strong>; productionda <code>NODE_ENV=production</code> o'rnatiladi;",
          "<strong>VPS</strong> — to'liq nazorat, hamma narsani o'zingiz sozlaysiz; <strong>PaaS</strong> — oson, platforma serverni boshqaradi;",
          "<strong>Domen → DNS → IP → server</strong> zanjiri foydalanuvchini ilovaga ulaydi;",
          "Deploy bosqichlari: server tayyorlash, kod, bog'liqliklar, muhit, ishga tushirish, reverse proxy, domen/HTTPS."
        ] }
      ]
    },

    {
      slug: "deploy-vps",
      title: "VPS serverga deploy qilish",
      blurb: "VPS olish (DigitalOcean/Hetzner), SSH bilan ulanish, Node.js o'rnatish, kodni git clone qilish, muhit o'zgaruvchilari (.env), PM2 bilan doimiy ishga tushirish va Nginx reverse proxy sozlash.",
      body: [
        { lead: "Endi eng amaliy qismga o'tamiz: Node.js ilovasini haqiqiy <strong>VPS serverga</strong> deploy qilamiz. Bu darsda toza Linux serverdan boshlab, ilovangiz internetda domen orqali ochiladigan holatga qadar barcha bosqichlarni ketma-ket ko'ramiz. Siz SSH, Git va Node.js bilan tanish bo'lganingiz uchun har bir qadam mantiqiy ravishda ulanadi." },

        { note: "Bu darsdagi barcha buyruqlar <strong>Linux serverida</strong>, terminalda ishlaydi. Ular statik misollar sifatida keltirilgan — siz ularni o'z serveringizda ketma-ket bajarasiz. Serverning IP manzili misollarda <code>203.0.113.10</code>, foydalanuvchi esa <code>deploy</code> deb olinadi." },

        { h2: "1-bosqich: VPS olish" },
        { p: "Avvalo VPS provayderdan server ijaraga olasiz. Eng mashhurlari — <strong>DigitalOcean</strong> (u yerda server \"Droplet\" deb ataladi) va <strong>Hetzner</strong> (arzon narxlari bilan mashhur). Ro'yxatdan o'tib, quyidagi tanlovlarni qilasiz:" },
        { ul: [
          "<strong>Operatsion tizim:</strong> Ubuntu (masalan, 22.04 LTS yoki 24.04 LTS) — eng keng tarqalgan va hujjatlari ko'p;",
          "<strong>Resurs:</strong> boshlang'ich loyiha uchun 1 GB RAM, 1 CPU yetarli (eng arzon tarif);",
          "<strong>Hudud (region):</strong> foydalanuvchilaringizga eng yaqin joy — masalan, Yevropa (Germaniya) O'zbekiston uchun yaxshi variant;",
          "<strong>Autentifikatsiya:</strong> parol o'rniga <strong>SSH kalit</strong> tanlash tavsiya etiladi (ancha xavfsizroq)."
        ] },
        { p: "Server yaratilgach, provayder sizga <strong>ommaviy IP manzil</strong> beradi — masalan <code>203.0.113.10</code>. Ana shu manzil orqali serverga ulanamiz." },
        { tip: "Agar SSH kalitingiz bo'lmasa, uni lokalxostda yaratasiz: <code>ssh-keygen -t ed25519 -C \"email@example.com\"</code>. Bu ikki fayl hosil qiladi — maxfiy kalit (<code>~/.ssh/id_ed25519</code>) va ommaviy kalit (<code>~/.ssh/id_ed25519.pub</code>). Ommaviy kalitni provayder paneliga qo'shasiz, maxfiysini esa <strong>hech kimga bermaysiz</strong>." },

        { h2: "2-bosqich: SSH bilan ulanish" },
        { p: "Serverga <strong>SSH</strong> (Secure Shell) orqali ulanasiz. Bu — masofadagi serverning terminaliga xavfsiz kirish protokoli. Birinchi ulanish odatda <code>root</code> foydalanuvchi sifatida bo'ladi:" },
        { code: "# Lokalxostdan serverga ulanish:\n$ ssh root@203.0.113.10" },
        { p: "Xavfsizlik uchun <code>root</code> bilan doimiy ishlash tavsiya etilmaydi. Buning o'rniga alohida foydalanuvchi yaratib, unga <code>sudo</code> (administrator) huquqini beramiz:" },
        { code: "# Root sifatida yangi foydalanuvchi yaratish:\n$ adduser deploy\n$ usermod -aG sudo deploy\n\n# Endi shu foydalanuvchi bilan ulanamiz:\n$ ssh deploy@203.0.113.10" },
        { warn: "Serverni olgach, birinchi ishlardan biri — uni yangilash va oddiy xavfsizlik choralari. Kamida <code>sudo apt update && sudo apt upgrade -y</code> bajaring va faqat kerakli portlarni oching (SSH uchun 22, veb uchun 80 va 443). Ochiq qolgan port — xavfsizlik teshigidir." },

        { h2: "3-bosqich: Node.js o'rnatish" },
        { p: "Yangi serverda Node.js o'rnatilmagan bo'ladi. Uni o'rnatishning ishonchli usuli — <strong>NodeSource</strong> ombori orqali. Bu sizga kerakli versiyani (masalan, LTS 20 yoki 22) beradi:" },
        { code: "# NodeSource ombori orqali Node.js 20 LTS o'rnatish:\n$ curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\n$ sudo apt install -y nodejs\n\n# O'rnatilganini tekshirish:\n$ node -v\nv20.11.0\n$ npm -v\n10.2.4" },
        { note: "Bir necha Node.js versiyasini boshqarish kerak bo'lsa, <strong>nvm</strong> (Node Version Manager) yaxshi vosita. U turli versiyalarni o'rnatib, ular orasida almashish imkonini beradi. Bitta ilova uchun esa NodeSource yondashuvi soddaroq." },

        { h2: "4-bosqich: Kodni git clone qilish" },
        { p: "Kodni serverga yetkazishning eng qulay yo'li — <strong>Git</strong>. Kodingiz GitHub yoki boshqa Git xostingida bo'lsa, uni serverga <code>git clone</code> bilan tortib olasiz. Avval Git o'rnatilganiga ishonch hosil qiling:" },
        { code: "# Git o'rnatish (ko'pincha oldindan mavjud):\n$ sudo apt install -y git\n\n# Kodni klonlash:\n$ cd ~\n$ git clone https://github.com/foydalanuvchi/mening-loyiham.git\n$ cd mening-loyiham\n\n# Bog'liqliklarni o'rnatish (faqat production uchun):\n$ npm ci --omit=dev" },
        { p: "Bu yerda <code>npm ci</code> — <code>npm install</code>ning ishonchli varianti. U <code>package-lock.json</code> asosida aniq versiyalarni o'rnatadi va serverda oldindan mavjud <code>node_modules</code>ni tozalab, toza o'rnatadi. Serverda deploy uchun aynan shu tavsiya etiladi." },
        { tip: "Xususiy (private) repozitoriy uchun HTTPS o'rniga <strong>SSH kalit</strong> yoki <strong>deploy token</strong> ishlatiladi. GitHub'da \"Deploy keys\" bo'limi orqali serverning ommaviy kalitini faqat shu repozitoriyaga o'qish huquqi bilan qo'shish mumkin — bu xavfsiz yechim." },

        { h2: "5-bosqich: Muhit o'zgaruvchilari (.env)" },
        { p: "Ilovaning maxfiy ma'lumotlari — ma'lumotlar bazasi paroli, API kalitlari, sessiya siri — <strong>hech qachon</strong> kodga yozilmaydi va Git'ga yuklanmaydi. Ular <strong>muhit o'zgaruvchilari</strong>da saqlanadi. Serverda ular odatda <code>.env</code> faylida bo'ladi:" },
        { code: "# Serverda .env faylini yaratish (loyiha papkasida):\n$ nano .env" },
        { code: "# .env fayli mazmuni (misol):\nNODE_ENV=production\nPORT=3000\nDATABASE_URL=postgres://user:parol@localhost:5432/mydb\nJWT_SECRET=juda-maxfiy-tasodifiy-satr\nAPI_KEY=sk_live_1234567890" },
        { p: "Node.js'da bu qiymatlarni o'qish uchun <code>dotenv</code> kutubxonasi ishlatiladi. U <code>.env</code> faylini o'qib, qiymatlarni <code>process.env</code>ga joylaydi:" },
        { code: "// Ilova boshida — eng yuqorida:\nrequire('dotenv').config();\n\nconst port = process.env.PORT || 3000;\nconst dbUrl = process.env.DATABASE_URL;\n\nconsole.log('Port:', port);" },
        { warn: "<code>.env</code> faylini <strong>doim</strong> <code>.gitignore</code>ga qo'shing! Aks holda maxfiy parollaringiz GitHub'ga ochiq yuklanadi. Bu eng ko'p uchraydigan va xavfli xatolardan biri — bir marta yuklangan sir butun tarixda qoladi va uni darhol almashtirish kerak bo'ladi." },
        { note: "Repozitoriyaga faqat namuna sifatida <code>.env.example</code> faylini qo'shish odat: unda qiymatlarsiz kalitlar ro'yxati bo'ladi (masalan, <code>DATABASE_URL=</code>). Shunda boshqa dasturchi qaysi o'zgaruvchilar kerakligini biladi, lekin haqiqiy sirlarni ko'rmaydi." },

        { h2: "6-bosqich: PM2 bilan doimiy ishga tushirish" },
        { p: "Ilovani shunchaki <code>node server.js</code> bilan ishga tushirsangiz, u faqat SSH sessiyasi ochiq turgunicha ishlaydi — siz terminaldan chiqishingiz bilan to'xtaydi. Bundan tashqari, ilova xato bilan qulasa, o'zi qayta ishga tushmaydi. Buni hal qilish uchun <strong>PM2</strong> — Node.js jarayon menejeridan foydalanamiz." },
        { p: "PM2 ilovani fonda ishlatadi, qulasa avtomatik qayta ishga tushiradi, loglarni saqlaydi va server qayta yuklanganda ilovani o'zi qayta boshlaydi. Uni global o'rnatamiz:" },
        { code: "# PM2'ni global o'rnatish:\n$ sudo npm install -g pm2\n\n# Ilovani PM2 bilan ishga tushirish (nom berib):\n$ pm2 start server.js --name mening-ilova\n\n# Holatni ko'rish:\n$ pm2 list\n$ pm2 logs mening-ilova" },
        { p: "Server qayta yuklanganda (masalan, tizim yangilanishidan keyin) ilova avtomatik qayta ishga tushishi uchun PM2'ni tizimga bog'laymiz:" },
        { code: "# PM2'ni tizim ishga tushishida avtomatik yoqilishini sozlash:\n$ pm2 startup\n# (chiqqan buyruqni nusxalab bajaring)\n\n# Hozirgi jarayonlar ro'yxatini saqlash:\n$ pm2 save" },
        { p: "Kodni yangilaganda deploy shunday bo'ladi: yangi kodni tortasiz va PM2'ga ilovani qayta yuklashni buyurasiz:" },
        { code: "# Kodni yangilash va qayta yuklash:\n$ cd ~/mening-loyiham\n$ git pull\n$ npm ci --omit=dev\n$ pm2 reload mening-ilova" },
        { tip: "<code>pm2 reload</code> — <code>pm2 restart</code>dan yaxshiroq: u ilovani \"nol vaqt uzilishi\" (zero-downtime) bilan yangilashga harakat qiladi, ya'ni foydalanuvchilar uchun uzilish sezilmaydi. Katta trafikli loyihalarda bu muhim." },
        { note: "PM2 ilovani bir necha nusxada (cluster rejimida) ham ishga tushira oladi — bu Node.js'ning bir oqimli tabiatini yengib, serverdagi barcha yadrolardan foydalanish imkonini beradi: <code>pm2 start server.js -i max</code>." },

        { h2: "7-bosqich: Nginx reverse proxy" },
        { p: "Hozir ilovangiz <code>localhost:3000</code>da ishlayapti, lekin foydalanuvchilar odatiy <strong>80</strong> (HTTP) va <strong>443</strong> (HTTPS) portlariga kirishadi. Node.js ilovasini to'g'ridan-to'g'ri 80-portga qo'yish yaxshi amaliyot emas. Buning o'rniga <strong>Nginx</strong>ni <em>reverse proxy</em> sifatida oldinga qo'yamiz." },
        { p: "Nginx darsidan eslasangiz, <strong>reverse proxy</strong> brauzerdan kelgan so'rovni qabul qilib, uni orqadagi ilovaga (bizning holatda <code>localhost:3000</code>ga) uzatadi. Bu bizga statik fayllarni tez uzatish, HTTPS'ni bir joyda boshqarish va ilovani tashqi dunyodan yashirish imkonini beradi." },
        { code: "# Nginx o'rnatish:\n$ sudo apt install -y nginx\n\n# Sayt uchun config yaratish:\n$ sudo nano /etc/nginx/sites-available/mening-ilova" },
        { code: "# /etc/nginx/sites-available/mening-ilova\nserver {\n    listen 80;\n    server_name mening-saytim.uz www.mening-saytim.uz;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        proxy_cache_bypass $http_upgrade;\n    }\n}" },
        { p: "Bu config'da <code>proxy_pass</code> — barcha so'rovlarni <code>localhost:3000</code>dagi Node.js ilovasiga uzatadi. <code>proxy_set_header</code> qatorlari esa ilovaga foydalanuvchining haqiqiy IP'si va boshqa muhim ma'lumotlarni yetkazadi (aks holda ilova hamma so'rovni Nginx'dan kelayotgandek ko'radi)." },
        { p: "Config'ni faollashtiramiz va Nginx'ni qayta yuklaymiz:" },
        { code: "# Config'ni yoqish (symbolic link):\n$ sudo ln -s /etc/nginx/sites-available/mening-ilova /etc/nginx/sites-enabled/\n\n# Config sintaksisini tekshirish (MUHIM!):\n$ sudo nginx -t\nnginx: configuration file /etc/nginx/nginx.conf test is successful\n\n# Nginx'ni qayta yuklash:\n$ sudo systemctl reload nginx" },
        { warn: "Nginx'ni qayta yuklashdan oldin <strong>doimo</strong> <code>sudo nginx -t</code> bilan config'ni tekshiring. Xato config bilan qayta yuklasangiz, Nginx ishga tushmay qolishi va butun saytingiz o'chib qolishi mumkin. <code>nginx -t</code> muvaffaqiyatli bo'lsagina qayta yuklang." },
        { p: "Endi <code>proxy_pass</code> qatoridagi <code>$http_upgrade</code> va <code>Connection 'upgrade'</code> sarlavhalari <strong>WebSocket</strong> ulanishlarini ham qo'llab-quvvatlaydi — agar ilovangizda real vaqtli aloqa (chat, bildirishnomalar) bo'lsa, bu kerak bo'ladi." },
        { note: "Hozircha bu HTTP (80-port) orqali ishlaydi. HTTPS (443-port) va domen ulashni oxirgi darsda ko'ramiz — u yerda aynan shu config'ni Let's Encrypt sertifikati bilan kengaytiramiz." },

        { h2: "To'liq deploy zanjiri" },
        { p: "Barcha bosqichlarni bir joyga jamlaymiz. Toza Ubuntu serverdan ishlaydigan ilovagacha bo'lgan yo'l:" },
        { ol: [
          "VPS olish va SSH kalit sozlash;",
          "<code>ssh deploy@203.0.113.10</code> bilan ulanish, tizimni yangilash;",
          "Node.js, Git, Nginx o'rnatish;",
          "<code>git clone</code> va <code>npm ci --omit=dev</code>;",
          "<code>.env</code> faylini yaratish (Git'ga qo'shmasdan);",
          "<code>pm2 start</code> va <code>pm2 startup</code> + <code>pm2 save</code>;",
          "Nginx reverse proxy config'ini yozib, <code>nginx -t</code> va <code>reload</code>;",
          "(Keyingi dars) domen va HTTPS."
        ] },
        { tip: "Bu bosqichlarni har safar qo'lda takrorlash zerikarli. Ularni bitta <strong>deploy skript</strong>iga (masalan, <code>deploy.sh</code>) yig'ib qo'yish yoki keyinchalik <strong>GitHub Actions</strong> orqali avtomatlashtirish mumkin. Lekin avtomatlashtirishdan oldin har bir bosqichni qo'lda tushunib chiqish shart." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>VPS</strong> olib, unga <strong>SSH</strong> orqali ulaniladi; root o'rniga <code>sudo</code>li alohida foydalanuvchi yaxshi amaliyot;",
          "Node.js NodeSource orqali, kod esa <code>git clone</code> bilan serverga yetkaziladi; <code>npm ci --omit=dev</code> ishlatiladi;",
          "Maxfiy sozlamalar <strong><code>.env</code></strong> faylida saqlanadi va <strong>hech qachon Git'ga yuklanmaydi</strong> (<code>.gitignore</code>ga qo'shiladi);",
          "<strong>PM2</strong> ilovani fonda, doimiy va avtomatik qayta ishga tushiriladigan qiladi; <code>pm2 startup</code> + <code>save</code> serverni qayta yuklashda tiklaydi;",
          "<strong>Nginx reverse proxy</strong> 80/443 portidan <code>localhost:3000</code>dagi Node.js ilovasiga trafikni uzatadi;",
          "Har bir Nginx o'zgarishidan keyin <code>nginx -t</code> bilan tekshirib, keyin <code>reload</code> qilinadi."
        ] }
      ]
    },

    {
      slug: "deploy-frontend",
      title: "Frontend/statik saytni deploy qilish",
      blurb: "Build jarayoni (npm run build), statik hosting platformalari (Netlify, Vercel, GitHub Pages), SPA marshrutlash (routing) sozlamalari va frontend uchun muhit o'zgaruvchilari.",
      body: [
        { lead: "Backend serverni VPS'ga qo'yishni ko'rdik. Frontend — ya'ni React, Vue, Angular yoki oddiy statik sayt — ancha soddaroq deploy qilinadi. Chunki natija oxir-oqibat shunchaki <strong>statik fayllar</strong> (HTML, CSS, JS) bo'ladi, va ularni maxsus statik hosting platformalari deyarli bepul, juda oson joylashtiradi. Ushbu darsda build jarayonini, mashhur platformalarni va SPA'ga xos sozlamalarni o'rganamiz." },

        { note: "Bu darsdagi buyruqlar (<code>npm run build</code> kabi) lokalxostda ham, platforma serverida ham ishlaydi. Platforma sozlamalari esa statik config fayllar orqali beriladi — ular ham tushunib o'qish uchun keltirilgan." },

        { h2: "Build jarayoni nima?" },
        { p: "Zamonaviy frontend loyihalari brauzer to'g'ridan-to'g'ri tushunmaydigan narsalar bilan yoziladi: JSX (React), <code>.vue</code> fayllar, TypeScript, SCSS, ES modullar. <strong>Build</strong> — bu shu manba kodni brauzer tushunadigan oddiy HTML, CSS va JavaScript'ga aylantirish jarayoni." },
        { p: "Build vositasi (Vite, webpack, esbuild va boshqalar) kodni qayta ishlaydi, birlashtiradi (bundle), kichraytiradi (minify) va tayyor natijani odatda <code>dist/</code> yoki <code>build/</code> papkasiga joylaydi:" },
        { code: "# Frontend loyihasini build qilish:\n$ npm run build\n\n# Natija dist/ papkasida hosil bo'ladi:\ndist/\n  index.html\n  assets/\n    index-a1b2c3.js\n    index-d4e5f6.css" },
        { p: "Ana shu <code>dist/</code> papkasidagi fayllar — deploy qilinadigan yakuniy natija. Bu fayllar hech qanday Node.js talab qilmaydi; ularni istalgan oddiy veb-server (Nginx, GitHub Pages) yoki statik hosting uzata oladi." },
        { note: "<code>npm run build</code> aslida <code>package.json</code>dagi <code>scripts.build</code> buyrug'ini ishga tushiradi. Aynan qaysi vosita ishlashini shu yerda ko'rasiz — masalan, <code>\"build\": \"vite build\"</code>." },

        { h2: "Statik hosting nima?" },
        { p: "<strong>Statik hosting</strong> — bu HTML/CSS/JS fayllarni internetga chiqarish uchun maxsus sozlangan xizmat. Ular server boshqaruvini talab qilmaydi: siz faqat fayllarni (yoki Git repozitoriyani) berasiz, platforma qolganini o'zi bajaradi — global keshlash (CDN), HTTPS, avtomatik build." },
        { p: "Uchta eng mashhur bepul (yoki bepul rejasi bor) platforma: <strong>Netlify</strong>, <strong>Vercel</strong> va <strong>GitHub Pages</strong>. Ularning umumiy ishlash printsipi bir xil: Git repozitoriyaga ulanasiz, platforma har push'da avtomatik build qilib, natijani chiqaradi." },

        { h2: "Netlify" },
        { p: "<strong>Netlify</strong> — statik saytlar uchun eng mashhur platformalardan biri. GitHub repozitoriyangizni ulaysiz, build buyrug'i va chiqish papkasini ko'rsatasiz — tamom. Har git push'da avtomatik qayta deploy bo'ladi." },
        { p: "Sozlamalarni panel orqali ham, loyiha ildizidagi <code>netlify.toml</code> fayli orqali ham berish mumkin:" },
        { code: "# netlify.toml\n[build]\n  command = \"npm run build\"\n  publish = \"dist\"\n\n[[redirects]]\n  from = \"/*\"\n  to = \"/index.html\"\n  status = 200" },
        { p: "Bu yerda <code>command</code> — build buyrug'i, <code>publish</code> — chiqish papkasi. Pastdagi <code>redirects</code> qismi SPA marshrutlash uchun kerak — buni quyida batafsil ko'ramiz." },
        { tip: "Netlify sizga tekin subdomen beradi (masalan, <code>mening-loyiham.netlify.app</code>). O'z domeningizni ham panel orqali bir necha bosishda ulash mumkin, HTTPS esa avtomatik yoqiladi — sertifikat bilan ovora bo'lmaysiz." },

        { h2: "Vercel" },
        { p: "<strong>Vercel</strong> — Netlify'ga juda o'xshash, ayniqsa <strong>Next.js</strong> loyihalari uchun optimallashgan platforma (Next.js'ni aynan Vercel yaratgan). Ish printsipi bir xil: GitHub'ni ulaysiz, u avtomatik freymvorkni aniqlaydi va build sozlamalarini o'zi taxmin qiladi." },
        { p: "Ko'p hollarda hech qanday config kerak emas — Vercel Vite, Create React App, Next.js kabi loyihalarni avtomatik taniydi. Kerak bo'lsa, <code>vercel.json</code> faylida sozlaysiz:" },
        { code: "# vercel.json (SPA marshrutlash uchun)\n{\n  \"rewrites\": [\n    { \"source\": \"/(.*)\", \"destination\": \"/index.html\" }\n  ]\n}" },
        { note: "Netlify va Vercel'ning kuchli tomoni — <strong>oldindan ko'rish (preview) deploy</strong>lari. Har bir Pull Request uchun alohida vaqtinchalik URL yaratiladi, shunda o'zgarishni birlashtirishdan oldin haqiqiy holatda ko'rib olish mumkin. Bu jamoada ishlashda juda qulay." },

        { h2: "GitHub Pages" },
        { p: "<strong>GitHub Pages</strong> — GitHub'ning bepul statik hosting xizmati. To'g'ridan-to'g'ri repozitoriyadan sayt chiqaradi. Oddiy statik saytlar, hujjatlar va portfolio uchun ideal. Odatda <strong>GitHub Actions</strong> bilan birga ishlatiladi — u avtomatik build qilib, natijani Pages'ga chiqaradi:" },
        { code: "# .github/workflows/deploy.yml\nname: Deploy to GitHub Pages\n\non:\n  push:\n    branches: [main]\n\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/deploy-pages@v4\n        with:\n          path: dist" },
        { warn: "GitHub Pages'da sayt ko'pincha ildizda emas, balki <code>/repo-nomi/</code> pastki yo'lida ochiladi (masalan, <code>foydalanuvchi.github.io/loyiha/</code>). Shu sababli build vositasida <strong>base yo'l</strong>ni sozlash kerak, aks holda CSS/JS fayllari topilmaydi. Vite'da bu <code>base: '/loyiha/'</code> orqali beriladi." },
        { code: "// vite.config.js — GitHub Pages uchun base yo'l\nexport default {\n  base: '/loyiha/',\n};" },

        { h2: "SPA marshrutlash muammosi" },
        { p: "<strong>SPA</strong> (Single Page Application — bir sahifali ilova) — React, Vue kabi loyihalarda odatiy holat. Bunda sayt aslida <strong>bitta</strong> <code>index.html</code> faylidan iborat, marshrutlash (routing) esa brauzerda JavaScript orqali bajariladi. Foydalanuvchi <code>/haqida</code> yoki <code>/mahsulotlar</code> sahifasiga o'tganda, brauzer serverga bormaydi — JS'ning o'zi to'g'ri komponentni ko'rsatadi." },
        { p: "Muammo shu yerda paydo bo'ladi: agar foydalanuvchi to'g'ridan-to'g'ri <code>mening-saytim.uz/haqida</code> manzilini <strong>ochsa</strong> yoki sahifani yangilasa (refresh), brauzer serverdan <code>/haqida</code> faylini so'raydi. Lekin bunday fayl yo'q — faqat <code>index.html</code> bor. Natijada server <strong>404</strong> qaytaradi." },
        { p: "Yechim: serverni shunday sozlash kerakki, u <strong>mavjud bo'lmagan har qanday yo'l</strong> uchun <code>index.html</code>ni qaytarsin. Keyin brauzerdagi JS marshrutlash to'g'ri sahifani ko'rsatadi. Har platformada bu boshqacha yoziladi:" },
        { ul: [
          "<strong>Netlify:</strong> <code>netlify.toml</code>dagi <code>redirects</code> (yuqorida ko'rdik) yoki <code>_redirects</code> fayli;",
          "<strong>Vercel:</strong> <code>vercel.json</code>dagi <code>rewrites</code>;",
          "<strong>Nginx</strong> (o'z serveringizda): <code>try_files</code> direktivasi."
        ] },
        { p: "Agar SPA'ni o'z Nginx serveringizda joylashtirsangiz, config quyidagicha bo'ladi:" },
        { code: "# Nginx'da SPA marshrutlash\nserver {\n    listen 80;\n    server_name mening-saytim.uz;\n    root /var/www/mening-sayt/dist;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n}" },
        { note: "<code>try_files $uri $uri/ /index.html;</code> — kalit qator. U shunday ishlaydi: avval so'ralgan faylni (<code>$uri</code>) qidiradi, topilmasa papkani, u ham bo'lmasa <code>index.html</code>ni qaytaradi. Shu tufayli har qanday yo'l ishlaydi va SPA marshrutlash buzilmaydi." },

        { h2: "Frontend muhit o'zgaruvchilari" },
        { p: "Frontend'da ham muhit o'zgaruvchilari kerak bo'ladi — masalan, API manzili. Lekin bu yerda muhim farq bor: <strong>build vaqtida</strong> o'zgaruvchilar kodga \"qotib\" qoladi va oxir-oqibat brauzerga yuklanadi. Ya'ni ular <strong>maxfiy emas</strong> — har kim ko'rishi mumkin." },
        { p: "Vite'da muhit o'zgaruvchilari <code>VITE_</code> prefiksi bilan boshlanishi shart, aks holda ular kodga qo'shilmaydi. Ular <code>.env</code> fayliga yoziladi va <code>import.meta.env</code> orqali o'qiladi:" },
        { code: "# .env (Vite loyihasida)\nVITE_API_URL=https://api.mening-saytim.uz\nVITE_APP_NAME=Mening Ilovam" },
        { code: "// Kodda o'qish:\nconst apiUrl = import.meta.env.VITE_API_URL;\nfetch(apiUrl + '/users')\n  .then(r => r.json())\n  .then(data => console.log(data));" },
        { warn: "Frontend muhit o'zgaruvchilariga <strong>hech qachon maxfiy ma'lumot</strong> (ma'lumotlar bazasi paroli, maxfiy API kaliti) yozmang! Ular build natijasida brauzer koduga kiradi va istalgan foydalanuvchi ularni ko'ra oladi. Maxfiy narsalar faqat <strong>backend</strong>da qoladi." },
        { tip: "Netlify va Vercel panellarida muhit o'zgaruvchilarini alohida kiritish mumkin (Settings → Environment Variables). Bu <code>.env</code> faylini Git'ga qo'shmasdan, build vaqtida qiymatlarni yetkazishning toza yo'li." },

        { h2: "Backend qayerda qoladi?" },
        { p: "Statik hosting faqat frontend'ni chiqaradi — u Node.js serverni ishlata olmaydi. Odatda zamonaviy loyiha ikkiga bo'linadi:" },
        { ul: [
          "<strong>Frontend</strong> (React/Vue) → Netlify yoki Vercel'da statik joylashadi;",
          "<strong>Backend</strong> (Node.js/Express API) → VPS'da (oldingi dars) yoki Render/Railway kabi PaaS'da ishlaydi."
        ] },
        { p: "Frontend backend'ga <code>fetch</code> orqali murojaat qiladi, manzil esa yuqorida ko'rgan <code>VITE_API_URL</code> muhit o'zgaruvchisidan olinadi. Shu tarzda ikki qism mustaqil deploy qilinadi va bir-biriga bog'lanadi." },
        { note: "Bunday ikki domenli tuzilishda <strong>CORS</strong> (Cross-Origin Resource Sharing) muammosiga duch kelishingiz mumkin — backend frontend domeniga ruxsat berishi kerak. Bu backend tomonida (masalan, Express'da <code>cors</code> middleware bilan) hal qilinadi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Build</strong> (<code>npm run build</code>) manba kodni brauzer tushunadigan statik fayllarga aylantiradi (<code>dist/</code>);",
          "<strong>Netlify</strong> va <strong>Vercel</strong> — Git'ga ulanib, har push'da avtomatik build va deploy qiladi; HTTPS avtomatik;",
          "<strong>GitHub Pages</strong> — GitHub Actions bilan bepul hosting; pastki yo'l uchun <code>base</code>ni sozlash kerak;",
          "<strong>SPA marshrutlash</strong> uchun barcha yo'llarni <code>index.html</code>ga yo'naltirish shart (Netlify redirects, Vercel rewrites, Nginx <code>try_files</code>);",
          "Frontend muhit o'zgaruvchilari (Vite'da <code>VITE_</code>) <strong>maxfiy emas</strong> — ularga hech qachon sir yozmang;",
          "Odatda frontend statik hostingda, backend esa VPS yoki PaaS'da alohida deploy qilinadi."
        ] }
      ]
    },

    {
      slug: "deploy-domain-ssl",
      title: "Domen ulash va HTTPS",
      blurb: "Domen sotib olish, DNS yozuvlari (A va CNAME), domenni serverga ulash, Let's Encrypt/certbot bilan bepul SSL sertifikat olish va HTTP dan HTTPS ga avtomatik yo'naltirish.",
      body: [
        { lead: "Ilovamiz serverda ishlayapti, lekin unga hali <code>203.0.113.10</code> kabi IP orqali kirilyapti va ulanish shifrlanmagan (HTTP). Bu darsda ikki muhim qadamni bajaramiz: <strong>domenni</strong> serverga ulaymiz (chiroyli manzil), va <strong>HTTPS</strong>ni yoqamiz (xavfsiz, shifrlangan ulanish) — bepul <strong>Let's Encrypt</strong> sertifikati bilan. Shundan so'ng saytingiz <code>https://mening-saytim.uz</code> orqali qulflangan brauzer belgisi bilan ochiladi." },

        { note: "Bu dars oldingi VPS darsining davomi. Biz o'sha yerda yozgan Nginx reverse proxy config'ini domen va SSL bilan kengaytiramiz. Serverning IP'si — <code>203.0.113.10</code>, domen — <code>mening-saytim.uz</code>." },

        { h2: "1-bosqich: Domen sotib olish" },
        { p: "<strong>Domen</strong> — yillik ijara asosida olinadi. Uni <strong>registrator</strong> (domen sotuvchisi) orqali olasiz. Mashhur xalqaro registratorlar: <strong>Namecheap</strong>, <strong>Cloudflare Registrar</strong>, <strong>Porkbun</strong>, <strong>GoDaddy</strong>. <code>.uz</code> domenlari uchun mahalliy registratorlar ham bor." },
        { ul: [
          "Domen nomini tanlaysiz (masalan, <code>mening-saytim.com</code> yoki <code>.uz</code>);",
          "Uning bo'shligini tekshirasiz (band bo'lmasa);",
          "Yillik to'lovni amalga oshirasiz (odatda 10-15 dollar/yil, ba'zi zonalar qimmatroq);",
          "Domen sizning hisobingizga bog'lanadi va uni DNS orqali sozlaysiz."
        ] },
        { tip: "<strong>Cloudflare</strong>ni faqat registrator sifatida emas, balki bepul DNS boshqaruvi, DDoS himoyasi va CDN sifatida ham ishlatish mashhur. Domenni istalgan joydan olib, DNS'ni Cloudflare'ga o'tkazish keng tarqalgan amaliyot." },

        { h2: "2-bosqich: DNS yozuvlarini tushunish" },
        { p: "Domenni serverga ulash — bu <strong>DNS yozuvlari</strong>ni to'g'ri sozlash demakdir. DNS yozuvlari domen nomini IP manzil yoki boshqa manzillar bilan bog'laydi. Eng muhim ikki tur:" },
        { ul: [
          "<strong>A yozuvi</strong> (A record) — domenni to'g'ridan-to'g'ri <strong>IPv4 manzilga</strong> bog'laydi. Masalan, <code>mening-saytim.uz → 203.0.113.10</code>;",
          "<strong>CNAME yozuvi</strong> — bir domenni <strong>boshqa domenga</strong> (nomga) bog'laydi. Masalan, <code>www.mening-saytim.uz → mening-saytim.uz</code>."
        ] },
        { p: "Boshqa yozuvlar ham bor — <code>AAAA</code> (IPv6 uchun), <code>MX</code> (elektron pochta uchun), <code>TXT</code> (tekshiruv va sozlamalar uchun) — lekin sayt ulash uchun asosan <strong>A</strong> va <strong>CNAME</strong> yetadi." },
        { code: "# Registrator panelida sozlanadigan DNS yozuvlari (misol):\n\n# Turi   Nom    Qiymat            TTL\n# A      @      203.0.113.10      3600\n# CNAME  www    mening-saytim.uz  3600" },
        { p: "Bu yerda <code>@</code> — asosiy domenni (<code>mening-saytim.uz</code>) bildiradi, <code>www</code> esa <code>www.mening-saytim.uz</code> pastki domenini. Ikkinchi qator <code>www</code>li variantni asosiy domenga yo'naltiradi." },
        { note: "<strong>TTL</strong> (Time To Live) — yozuvning necha soniya keshlanishini bildiradi. Kichik qiymat (masalan, 300) o'zgarishlar tez tarqalishini ta'minlaydi, lekin DNS'ga ko'proq yuk beradi. Odatda 3600 (bir soat) yaxshi muvozanat." },

        { h2: "3-bosqich: Domenni serverga ulash" },
        { p: "DNS'da A yozuvini serveringiz IP'siga sozlaganingizdan so'ng, o'zgarish internet bo'ylab tarqalishi kerak. Bu <strong>tarqalish (propagation)</strong> deb ataladi va bir necha daqiqadan bir necha soatgacha davom etishi mumkin. Domen serverga ulanganini tekshirish uchun:" },
        { code: "# Domen qaysi IP'ga ko'rsatayotganini tekshirish:\n$ dig +short mening-saytim.uz\n203.0.113.10\n\n# yoki:\n$ nslookup mening-saytim.uz" },
        { p: "Agar chiqqan IP sizning serveringiznikiga to'g'ri kelsa — domen ulandi. Endi brauzerda <code>http://mening-saytim.uz</code> yozib, saytingizni ochib ko'rishingiz mumkin (VPS darsida Nginx config'ida <code>server_name</code> allaqachon shu domenga sozlangan edi)." },
        { warn: "Agar domen ochilmasa, avval DNS tarqalishini kuting va <code>dig</code> bilan tekshiring. Keyin serverda <strong>xavfsizlik devori</strong> (firewall) 80 va 443 portlarini ochganiga ishonch hosil qiling: <code>sudo ufw allow 'Nginx Full'</code>. Ko'p muammolar aynan yopiq portlardan kelib chiqadi." },

        { h2: "4-bosqich: HTTPS nima uchun kerak?" },
        { p: "<strong>HTTPS</strong> — bu shifrlangan HTTP. Foydalanuvchi va server orasidagi barcha ma'lumot (parollar, shaxsiy ma'lumotlar, to'lovlar) shifrlangan holda uzatiladi, shuning uchun uni oraliqda o'g'irlab bo'lmaydi. HTTPS <strong>SSL/TLS sertifikat</strong>i orqali ishlaydi." },
        { ul: [
          "<strong>Xavfsizlik</strong> — ma'lumot shifrlangani uchun oraliqda o'qib bo'lmaydi;",
          "<strong>Ishonch</strong> — brauzer qulf belgisini ko'rsatadi; HTTP'da esa \"xavfli\" ogohlantirishi chiqadi;",
          "<strong>SEO va imkoniyatlar</strong> — qidiruv tizimlari HTTPS'ni afzal ko'radi; ko'p zamonaviy brauzer imkoniyatlari (masalan, geolokatsiya, servis-worker) faqat HTTPS'da ishlaydi."
        ] },
        { p: "Ilgari SSL sertifikat pullik va murakkab edi. Endi esa <strong>Let's Encrypt</strong> — bepul, avtomatik sertifikatlar beruvchi hokim organ (CA) tufayli HTTPS'ni bir necha buyruq bilan yoqish mumkin." },

        { h2: "5-bosqich: Let's Encrypt va certbot" },
        { p: "<strong>certbot</strong> — Let's Encrypt sertifikatlarini avtomatik oladigan va Nginx'ga o'rnatadigan vosita. U sizning domeningizga egaligingizni tekshiradi, sertifikat oladi va Nginx config'ini <strong>o'zi</strong> HTTPS uchun sozlaydi. Avval uni o'rnatamiz:" },
        { code: "# certbot va Nginx plaginini o'rnatish:\n$ sudo apt install -y certbot python3-certbot-nginx" },
        { p: "Endi certbot'ni ishga tushiramiz. U Nginx config'ingizdagi <code>server_name</code>ni o'qib, domenlarni topadi va sertifikat oladi:" },
        { code: "# Domen uchun sertifikat olish va Nginx'ni sozlash:\n$ sudo certbot --nginx -d mening-saytim.uz -d www.mening-saytim.uz" },
        { p: "certbot bir necha savol beradi: elektron pochtangiz (muhim ogohlantirishlar uchun), shartlarga rozilik, va — eng muhimi — <strong>HTTP'ni HTTPS'ga yo'naltirishni</strong> xohlaysizmi degan savol. \"Ha\" deb javob bersangiz, u buni avtomatik sozlaydi." },
        { code: "# certbot muvaffaqiyatli tugagach ko'rsatadi:\nCongratulations! You have successfully enabled HTTPS on\nhttps://mening-saytim.uz and https://www.mening-saytim.uz\n\nCertificate saved at: /etc/letsencrypt/live/mening-saytim.uz/fullchain.pem" },
        { note: "certbot ishlashi uchun 80-port ochiq bo'lishi va domen allaqachon serveringiz IP'siga ko'rsatayotgan bo'lishi shart — chunki Let's Encrypt domenga egaligingizni aynan shu domen orqali serverga ulanib tekshiradi. Shuning uchun avval DNS'ni sozlab, keyin certbot'ni ishga tushiring." },

        { h2: "6-bosqich: HTTP dan HTTPS ga yo'naltirish" },
        { p: "certbot HTTP'ni HTTPS'ga yo'naltirishni avtomatik sozlaganida, Nginx config'ingizga taxminan quyidagicha o'zgarishlar qo'shiladi. Natijadagi config ikki <code>server</code> blokidan iborat bo'ladi:" },
        { code: "# certbot tomonidan yangilangan config (soddalashtirilgan)\n\n# 1-blok: HTTP (80) — HTTPS'ga yo'naltiradi\nserver {\n    listen 80;\n    server_name mening-saytim.uz www.mening-saytim.uz;\n    return 301 https://$host$request_uri;\n}\n\n# 2-blok: HTTPS (443) — asosiy ish shu yerda\nserver {\n    listen 443 ssl;\n    server_name mening-saytim.uz www.mening-saytim.uz;\n\n    ssl_certificate /etc/letsencrypt/live/mening-saytim.uz/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/mening-saytim.uz/privkey.pem;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}" },
        { p: "Muhim qator — birinchi blokdagi <code>return 301 https://$host$request_uri;</code>. U 80-portga (HTTP) kelgan har qanday so'rovni <strong>301 (doimiy yo'naltirish)</strong> bilan HTTPS versiyasiga jo'natadi. Shu tufayli foydalanuvchi <code>http://</code> yozsa ham, avtomatik <code>https://</code>ga o'tadi." },
        { note: "Ikkinchi blokdagi <code>proxy_pass http://localhost:3000</code> — bu VPS darsidagi reverse proxy'ning aynan o'zi. Ya'ni HTTPS Nginx darajasida hal qilinadi (SSL termination), orqadagi Node.js ilova esa oddiy HTTP bilan ishlayveradi. Ilovaga shifrlash bilan shug'ullanish shart emas." },
        { tip: "Node.js ilovangizda foydalanuvchi HTTP yoki HTTPS bilan kelganini bilish uchun <code>X-Forwarded-Proto</code> sarlavhasidan foydalaning (config'da uni uzatyapmiz). Express'da <code>app.set('trust proxy', 1)</code> qo'shsangiz, <code>req.secure</code> to'g'ri ishlaydi." },

        { h2: "7-bosqich: Sertifikatni avtomatik yangilash" },
        { p: "Let's Encrypt sertifikatlari <strong>90 kun</strong> amal qiladi — bu qisqa muddat ataylab tanlangan (xavfsizlik uchun). Yaxshi xabar: certbot yangilanishni avtomatik bajaradi. O'rnatishda u tizim taymeri (systemd timer yoki cron) qo'shadi. Uning ishlashini tekshirish uchun:" },
        { code: "# Yangilashni sinov rejimida tekshirish (haqiqiy yangilamaydi):\n$ sudo certbot renew --dry-run\n\n# Avtomatik yangilash taymeri holatini ko'rish:\n$ sudo systemctl status certbot.timer" },
        { p: "Agar <code>--dry-run</code> muvaffaqiyatli o'tsa — hech narsa qilishingiz shart emas, certbot muddati tugashiga yaqin sertifikatni o'zi yangilaydi va Nginx'ni qayta yuklaydi." },
        { warn: "Sertifikat avtomatik yangilanishiga tayaning, lekin certbot ishlab turgan pochtangizdagi ogohlantirishlarni e'tiborsiz qoldirmang. Agar biror sabab (masalan, 80-port yopilib qolishi) tufayli yangilash muvaffaqiyatsiz bo'lsa, sertifikat muddati tugab, sayt HTTPS ogohlantirishi bilan ochiladi. Bu foydalanuvchilarni qo'rqitadi." },

        { h2: "Yakuniy tekshiruv" },
        { p: "Hammasi to'g'ri sozlanganini quyidagicha tekshiring:" },
        { ol: [
          "Brauzerda <code>http://mening-saytim.uz</code> ochib — u avtomatik <code>https://</code>ga o'tishini ko'ring;",
          "Manzil satridagi <strong>qulf belgisi</strong> paydo bo'lganini tasdiqlang;",
          "<code>www</code>li va <code>www</code>siz variantlar ham ishlashini tekshiring;",
          "Terminalda: <code>curl -I http://mening-saytim.uz</code> — javobda <code>301</code> va <code>Location: https://...</code> bo'lishi kerak."
        ] },
        { code: "# HTTP yo'naltirishini terminalda tekshirish:\n$ curl -I http://mening-saytim.uz\n\nHTTP/1.1 301 Moved Permanently\nLocation: https://mening-saytim.uz/" },
        { tip: "SSL sozlamangiz sifatini <strong>SSL Labs</strong> (ssllabs.com/ssltest) kabi bepul xizmatda tekshirishingiz mumkin. U sertifikat, shifrlash usullari va sozlamalarga baho (A dan F gacha) beradi. Standart certbot sozlamalari odatda yaxshi baho oladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Domen</strong> registrator orqali yillik ijaraga olinadi (Namecheap, Cloudflare, Porkbun);",
          "<strong>A yozuvi</strong> domenni server IP'siga, <strong>CNAME</strong> esa bir domenni boshqasiga bog'laydi;",
          "DNS o'zgarishi <strong>tarqalishi</strong> vaqt oladi; <code>dig</code> yoki <code>nslookup</code> bilan tekshiriladi;",
          "<strong>HTTPS</strong> ulanishni shifrlaydi; bepul sertifikatni <strong>Let's Encrypt + certbot</strong> beradi;",
          "<code>sudo certbot --nginx -d domen</code> sertifikat oladi va Nginx'ni avtomatik sozlaydi;",
          "<strong>HTTP → HTTPS</strong> yo'naltirish <code>return 301 https://...</code> orqali; certbot buni avtomatik qo'shadi;",
          "Sertifikat 90 kun amal qiladi va certbot uni <strong>avtomatik yangilaydi</strong> — <code>certbot renew --dry-run</code> bilan tekshiring."
        ] }
      ]
    }
  ]
};
