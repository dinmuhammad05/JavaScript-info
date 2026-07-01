"use strict";

module.exports = {
  part: "4-qism: Amaliy vositalar",
  chapter: "Linux va terminal",
  lessons: [
    {
      slug: "linux-nima",
      title: "Linux va terminal nima?",
      blurb: "Operatsion tizim nima, Linux va uning distributivlari (Ubuntu, Debian, Fedora), shell va bash, terminal, GUI va CLI o'rtasidagi farq hamda nega dasturchiga terminal shart.",
      body: [
        { lead: "Har bir dasturchi ertami-kechmi <strong>terminal</strong> bilan yuzma-yuz keladi: server sozlash, loyihani ishga tushirish, <code>git</code> bilan ishlash, paket o'rnatish — bularning barchasi ko'pincha qora ekranda, matnli buyruqlar orqali bajariladi. Ushbu bobda biz Linux operatsion tizimi va uning buyruq qatorini (terminalni) noldan o'rganamiz. Bu darsda esa asosiy tushunchalarni — <em>operatsion tizim</em>, <em>Linux</em>, <em>shell</em>, <em>terminal</em> — oydinlashtiramiz." },

        { h2: "Operatsion tizim nima?" },
        { p: "<strong>Operatsion tizim</strong> (OT, ingliz tilida <em>operating system</em>, qisqacha OS) — bu kompyuter apparatlari (protsessor, xotira, disk, tarmoq kartasi) bilan dasturlar o'rtasida vositachi bo'lib turadigan asosiy dastur. U diskdagi fayllarni boshqaradi, xotirani taqsimlaydi, jarayonlarni ishga tushiradi va foydalanuvchiga kompyuter bilan muloqot qilish imkonini beradi." },
        { p: "Eng mashhur operatsion tizimlar:" },
        { ul: [
          "<strong>Windows</strong> — Microsoft ishlab chiqaradi, uy va ofis kompyuterlarida keng tarqalgan;",
          "<strong>macOS</strong> — Apple kompyuterlarida (MacBook, iMac) ishlaydi, Unix asosida qurilgan;",
          "<strong>Linux</strong> — bepul va ochiq kodli tizim; serverlar, bulut, Android telefonlar va dasturchilar orasida hukmron;"
        ] },
        { p: "Dasturchilar dunyosida <strong>Linux</strong> alohida o'rin tutadi: internetdagi serverlarning katta qismi, Docker konteynerlari, bulutli platformalar (AWS, Google Cloud) — deyarli hammasi Linuxda ishlaydi. Shu sabab terminal va Linux buyruqlarini bilish — dasturchi uchun asosiy ko'nikma." },

        { h2: "Linux nima va u qayerdan kelib chiqqan?" },
        { p: "<strong>Linux</strong> — 1991-yilda finlandiyalik talaba <em>Linus Torvalds</em> tomonidan yaratilgan operatsion tizim <strong>yadrosi</strong> (kernel). Yadro — bu OTning eng markaziy qismi bo'lib, u apparat bilan bevosita muloqot qiladi. Linux <strong>bepul</strong> va <strong>ochiq kodli</strong> (open source): uning ichki tuzilishini istalgan odam ko'rishi, o'zgartirishi va tarqatishi mumkin." },
        { note: "Aslida \"Linux\" so'zi qat'iy ma'noda faqat <strong>yadroni</strong> bildiradi. To'liq ishlaydigan tizim esa yadro ustiga qo'shilgan ko'plab dasturlar (masalan, GNU vositalar) bilan birgalikda hosil bo'ladi. Shu bois ba'zan uni to'liqroq \"GNU/Linux\" deb ham atashadi. Amalda esa hamma qisqacha \"Linux\" deb qo'ya qoladi." },

        { h2: "Distributivlar (distros)" },
        { p: "Linux yadrosi o'zicha to'liq operatsion tizim emas. Odatda uni dasturlar to'plami, o'rnatuvchi (installer) va grafik muhit bilan birga <strong>distributiv</strong> (qisqacha <em>distro</em>) shaklida tarqatishadi. Distributiv — bu \"ishga tayyor to'plam\": yadro + kerakli dasturlar + paket menejeri." },
        { p: "Eng ko'p uchraydigan distributivlar:" },
        { ul: [
          "<strong>Ubuntu</strong> — yangi boshlovchilar uchun eng mashhur, do'stona; server va ish stoli versiyalari bor;",
          "<strong>Debian</strong> — juda barqaror, Ubuntu ham aynan shuning asosida qurilgan;",
          "<strong>Fedora</strong> — eng yangi texnologiyalarni birinchi bo'lib sinaydi, Red Hat kompaniyasi homiylik qiladi;",
          "<strong>CentOS / Rocky Linux / AlmaLinux</strong> — serverlar uchun, korxonalarda keng ishlatiladi;",
          "<strong>Arch Linux</strong> — tajribali foydalanuvchilar uchun, hamma narsani qo'lda sozlaydigan;",
          "<strong>Linux Mint</strong> — Windowsdan o'tayotganlar uchun qulay, Ubuntu asosida."
        ] },
        { tip: "Yangi boshlovchi uchun eng yaxshi tanlov — <strong>Ubuntu</strong>. Uning buyruqlari, paket menejeri (<code>apt</code>) va hujjatlari internet forumlarida keng muhokama qilingan, muammoni izlab topish oson. Shu bobdagi barcha misollar Ubuntu/Debian oilasiga mo'ljallangan." },

        { h2: "Shell va bash" },
        { p: "<strong>Shell</strong> (qobiq) — bu siz yozgan matnli buyruqlarni qabul qilib, operatsion tizimga yetkazadigan dastur. Siz \"faylni ko'chir\", \"papkaga kir\", \"dasturni ishga tushir\" deb yozasiz — shell bu buyruqni tushunib, yadroga bajarishni topshiradi. Shell — foydalanuvchi bilan tizim o'rtasidagi <em>tarjimon</em>." },
        { p: "Linuxda bir necha xil shell mavjud, eng mashhurlari:" },
        { ul: [
          "<strong>bash</strong> (Bourne Again SHell) — eng keng tarqalgan, aksariyat distributivlarda standart;",
          "<strong>zsh</strong> — bashning kuchaytirilgan varianti, macOSda standart bo'lib qolgan;",
          "<strong>sh</strong> — eng eski, sodda shell; skriptlarda mosligini saqlash uchun ishlatiladi;",
          "<strong>fish</strong> — do'stona, aqlli avto-to'ldirishli zamonaviy shell."
        ] },
        { p: "Biz butun bob davomida <strong>bash</strong> bilan ishlaymiz, chunki u eng keng tarqalgan. Qaysi shellda ekaningizni bilish uchun quyidagi buyruqni tering:" },
        { code: "echo $SHELL" },
        { p: "Bu buyruq joriy shellning yo'lini chiqaradi, masalan <code>/bin/bash</code>. Bu yerda <code>echo</code> — ekranga matn chiqaruvchi buyruq, <code>$SHELL</code> esa joriy shellni saqlaydigan <em>muhit o'zgaruvchisi</em>." },

        { h2: "Terminal nima?" },
        { p: "<strong>Terminal</strong> (yoki terminal-emulyator) — bu shell ishlaydigan <em>oyna</em>, ya'ni siz buyruqlarni yozadigan va natijalarni ko'radigan dastur. Ko'pincha \"terminal\", \"konsol\", \"buyruq qatori\" (command line) so'zlari bir-birining o'rnida ishlatiladi." },
        { p: "Munosabatni sodda qilib aytsak:" },
        { ul: [
          "<strong>Terminal</strong> — oyna (ekran), unda siz yozasiz va o'qiysiz;",
          "<strong>Shell</strong> (masalan, bash) — o'sha oyna ichida ishlaydigan, buyruqlaringizni tushunadigan dastur;",
          "<strong>Yadro</strong> (kernel) — shell topshiriqni yetkazadigan eng past qatlam."
        ] },
        { p: "Terminalni ochganingizda odatda quyidagiga o'xshash yozuv (<strong>prompt</strong>) ko'rasiz:" },
        { code: "aziz@ubuntu:~$" },
        { p: "Buni o'qib olaylik: <code>aziz</code> — foydalanuvchi nomi, <code>ubuntu</code> — kompyuter (host) nomi, <code>~</code> — joriy papka (bu yerda uy papkasi), <code>$</code> — oddiy foydalanuvchi belgisi. Agar <code>$</code> o'rniga <code>#</code> tursa, siz <em>root</em> (bosh administrator) sifatida ishlayapsiz degani (bu haqda \"Ruxsatlar\" darsida gaplashamiz)." },

        { h2: "GUI va CLI: ikki xil muloqot usuli" },
        { p: "Kompyuter bilan ikki xil usulda muloqot qilish mumkin:" },
        { ul: [
          "<strong>GUI</strong> (Graphical User Interface) — grafik interfeys: sichqoncha, tugmalar, oynalar, ikonkalar. Windows ish stoli, brauzer — hammasi GUI;",
          "<strong>CLI</strong> (Command Line Interface) — buyruq qatori: hamma narsani matnli buyruqlar bilan bajarasiz."
        ] },
        { p: "Boshda GUI qulayroq tuyuladi, lekin CLIning katta afzalliklari bor:" },
        { ul: [
          "<strong>Tezlik</strong> — bir buyruq bilan minglab faylni bir zumda o'zgartirish mumkin;",
          "<strong>Avtomatlashtirish</strong> — buyruqlarni skriptga yozib, takrorlanuvchi ishlarni avtomatlashtirasiz;",
          "<strong>Masofadan boshqarish</strong> — serverlarda odatda grafik interfeys umuman bo'lmaydi, faqat terminal orqali kirasiz (<code>ssh</code>);",
          "<strong>Aniqlik va kuch</strong> — ba'zi imkoniyatlar faqat CLIda mavjud."
        ] },
        { tip: "Grafik interfeysda \"1000 ta faylni qayta nomlash\" — soatlab qo'l ishi. Terminalda esa bu bitta qatorlik buyruq. Aynan shuning uchun tajribali dasturchilar terminalni afzal ko'radi." },

        { h2: "Nega dasturchiga terminal kerak?" },
        { p: "Zamonaviy dasturchilikda terminalsiz yashab bo'lmaydi. Mana amaliy sabablar:" },
        { ul: [
          "<code>git</code> bilan versiyalarni boshqarish — commit, push, pull, branch;",
          "<code>npm</code>, <code>node</code>, <code>python</code> kabi vositalarni ishga tushirish;",
          "Server sozlash: Nginx, PostgreSQL, Docker — hammasi terminaldan;",
          "Loyihani ishga tushirish, log'larni kuzatish, xatolarni tekshirish;",
          "Bulutli xizmatlar (AWS, DigitalOcean) bilan ishlash;",
          "Katta hajmdagi fayllarni tez qidirish, filtrlash, qayta ishlash."
        ] },
        { warn: "Terminalda ko'p buyruqlar tasdiq so'ramasdan darhol bajariladi va \"Savatga\" (Recycle Bin) tushmaydi. Masalan, <code>rm</code> bilan o'chirilgan fayl butunlay yo'qoladi. Shu bois har bir buyruqni yozishdan oldin uni yaxshilab o'qing. Keyingi darslarda bu haqda alohida ogohlantiramiz." },

        { h2: "Windows foydalanuvchisi nima qiladi?" },
        { p: "Linux o'rnatishingiz shart emas. Windowsda ham Linux buyruqlarini o'rganish yo'llari bor:" },
        { ul: [
          "<strong>WSL</strong> (Windows Subsystem for Linux) — Windows ichida to'liq Ubuntu ishga tushiradi, eng qulay yo'l;",
          "<strong>Virtual mashina</strong> — VirtualBox yoki VMware orqali Linuxni alohida oynada;",
          "<strong>Git Bash</strong> — Git bilan birga o'rnatiladigan, ko'p Linux buyruqlarini qo'llab-quvvatlaydigan mini-terminal;",
          "<strong>Onlayn terminallar</strong> — brauzerda Linuxni sinash uchun (masalan, o'quv maqsadida)."
        ] },
        { tip: "Agar Windows 10/11 ishlatsangiz, PowerShellda <code>wsl --install</code> buyrug'i bir zumda Ubuntuni o'rnatib beradi. Bu — dasturchilar uchun eng ommabop yo'l." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Operatsion tizim</strong> — apparat bilan dasturlar o'rtasidagi vositachi (Windows, macOS, Linux);",
          "<strong>Linux</strong> — bepul, ochiq kodli tizim; serverlar va dasturchilar dunyosida hukmron;",
          "<strong>Distributiv</strong> — ishga tayyor Linux to'plami (Ubuntu, Debian, Fedora va boshqalar);",
          "<strong>Shell</strong> (bash) — buyruqlaringizni tushunib tizimga yetkazadigan tarjimon;",
          "<strong>Terminal</strong> — shell ishlaydigan oyna, buyruq yozadigan joy;",
          "<strong>CLI</strong> tezlik, avtomatlashtirish va masofadan boshqarish imkonini beradi;",
          "Dasturchiga terminal git, npm, server va bulut bilan ishlash uchun shart."
        ] }
      ]
    },

    {
      slug: "fayl-tizimi",
      title: "Fayl tizimi va navigatsiya",
      blurb: "Linux fayl tizimi tuzilishi (/, /home, /etc), pwd, ls flaglari bilan, cd, mkdir, rmdir; mutlaq va nisbiy yo'llar; ~, . va .. belgilari.",
      body: [
        { lead: "Terminalda ishlashning birinchi ko'nikmasi — <strong>navigatsiya</strong>, ya'ni papkalar orasida yurish va nima qayerda joylashganini bilish. Bu darsda Linux fayl tizimining tuzilishini, joriy joyni aniqlash, papkalarni ko'rish, ular ichiga kirish va yangi papka yaratishni o'rganamiz." },

        { h2: "Linux fayl tizimi tuzilishi" },
        { p: "Windowsda disklar <code>C:</code>, <code>D:</code> kabi harflar bilan ajratiladi. Linuxda esa <strong>bitta</strong> daraxt bor: eng tepada <code>/</code> (root, ildiz) turadi, qolgan hamma narsa uning ichiga joylashadi. Barcha disklar, papkalar, hatto USB fleshka ham shu yagona daraxtga \"ulanadi\"." },
        { p: "Ildizdagi asosiy papkalar va ularning vazifasi:" },
        { ul: [
          "<code>/</code> — ildiz (root), butun tizimning boshi;",
          "<code>/home</code> — foydalanuvchilar papkalari; masalan <code>/home/aziz</code> — Azizning shaxsiy papkasi;",
          "<code>/root</code> — bosh administrator (root) foydalanuvchining uy papkasi;",
          "<code>/etc</code> — tizim va dasturlar sozlamalari (konfiguratsiya fayllari);",
          "<code>/bin</code> va <code>/usr/bin</code> — bajariladigan dasturlar (buyruqlar shu yerda yashaydi);",
          "<code>/var</code> — o'zgaruvchan ma'lumot: log'lar (<code>/var/log</code>), bazalar, kesh;",
          "<code>/tmp</code> — vaqtinchalik fayllar, qayta yuklanganda tozalanadi;",
          "<code>/opt</code> — qo'shimcha (ixtiyoriy) dasturlar;",
          "<code>/dev</code> — qurilmalar (disk, terminal, klaviatura) fayl ko'rinishida;",
          "<code>/mnt</code> va <code>/media</code> — tashqi disklar va fleshkalar ulanadigan joy."
        ] },
        { note: "Linuxda \"hamma narsa — fayl\" degan falsafa bor. Nafaqat hujjatlar, balki qurilmalar, jarayonlar va hatto tarmoq ulanishlari ham fayl kabi ko'rinishi mumkin. Bu tizimni juda mustahkam va yaxlit qiladi." },

        { h2: "pwd — joriy joyni aniqlash" },
        { p: "Terminalda har doim biror papka \"ichida\" turasiz — bu <strong>joriy ish papkasi</strong> (current working directory). Qayerda ekaningizni bilish uchun <code>pwd</code> (print working directory) buyrug'ini tering:" },
        { code: "pwd" },
        { p: "Natija sifatida to'liq yo'l chiqadi, masalan:" },
        { code: "/home/aziz/loyihalar" },
        { p: "Bu — siz hozir <code>loyihalar</code> papkasida turganingizni bildiradi, u esa <code>aziz</code> ichida, u ham <code>home</code> ichida, u esa ildizda." },

        { h2: "ls — papka mazmunini ko'rish" },
        { p: "<code>ls</code> (list) buyrug'i joriy papkadagi fayl va papkalar ro'yxatini chiqaradi:" },
        { code: "ls" },
        { p: "Bu qisqacha ro'yxatni beradi. Lekin <code>ls</code> ning <strong>flaglari</strong> (qo'shimcha sozlamalari) bilan ko'proq ma'lumot olish mumkin. Flaglar buyruqdan keyin <code>-</code> bilan yoziladi:" },
        { code: "ls -l" },
        { p: "<code>-l</code> (long) — batafsil ro'yxat: har bir fayl alohida qatorda, ruxsatlari, egasi, hajmi va o'zgartirilgan sanasi bilan chiqadi. Masalan:" },
        { code: "-rw-r--r-- 1 aziz aziz 2048 Jul  1 10:30 hujjat.txt\ndrwxr-xr-x 2 aziz aziz 4096 Jun 28 09:15 rasmlar" },
        { p: "Boshidagi harf turini bildiradi: <code>d</code> — papka (directory), <code>-</code> — oddiy fayl. Ruxsatlar (<code>rw-r--r--</code>) haqida keyingi darsda batafsil gaplashamiz." },
        { p: "Boshqa foydali flaglar:" },
        { ul: [
          "<code>-a</code> (all) — <em>yashirin</em> fayllarni ham ko'rsatadi (nomi <code>.</code> bilan boshlanadigan fayllar, masalan <code>.bashrc</code>);",
          "<code>-h</code> (human-readable) — hajmni odam o'qiy oladigan ko'rinishda: <code>2K</code>, <code>5M</code>, <code>1G</code> (odatda <code>-l</code> bilan birga);",
          "<code>-t</code> — o'zgartirilgan vaqti bo'yicha saralaydi (eng yangisi tepada);",
          "<code>-R</code> — ichki papkalarni ham rekursiv ko'rsatadi."
        ] },
        { p: "Flaglarni birlashtirish mumkin. Eng ko'p ishlatiladigan kombinatsiya:" },
        { code: "ls -lah" },
        { p: "Bu — batafsil (<code>l</code>) + yashirin fayllar bilan (<code>a</code>) + o'qishga qulay hajmda (<code>h</code>). Amalda deyarli har doim shu ko'rinishda ishlatiladi." },
        { tip: "Buyruq oxiriga papka nomini qo'shsangiz, o'sha papkaning ichini ko'rasiz — kirmasdan turib: <code>ls -l /etc</code>. Bu <code>/etc</code> papkasi mazmunini ko'rsatadi, lekin joriy joyingiz o'zgarmaydi." },

        { h2: "cd — papkalar orasida yurish" },
        { p: "<code>cd</code> (change directory) buyrug'i joriy papkani o'zgartiradi. Papka nomini yozib, ichiga kirasiz:" },
        { code: "cd loyihalar" },
        { p: "Bu \"loyihalar\" papkasiga kiradi. Bir necha muhim maxsus shakllari bor:" },
        { ul: [
          "<code>cd ..</code> — bitta yuqoriga (ota-papkaga) chiqish;",
          "<code>cd</code> yoki <code>cd ~</code> — uy papkasiga qaytish (istalgan joydan);",
          "<code>cd /</code> — ildizga o'tish;",
          "<code>cd -</code> — oldingi turgan papkaga qaytish (\"orqaga\" tugmasi kabi)."
        ] },
        { p: "Bir necha papkani ketma-ket o'tish uchun yo'lni <code>/</code> bilan yozasiz:" },
        { code: "cd loyihalar/veb-sayt/src" },
        { note: "Papka yoki fayl nomini to'liq yozmang — bir-ikki harfini yozib <strong>Tab</strong> tugmasini bosing, shell qolganini avtomatik to'ldiradi. Bu <em>avto-to'ldirish</em> (autocomplete) — terminalda tezlikning kaliti. Agar bir necha mos variant bo'lsa, Tabni ikki marta bosing — hammasi ro'yxat bo'lib chiqadi." },

        { h2: "Mutlaq va nisbiy yo'llar" },
        { p: "Yo'l (path) ikki xil bo'ladi:" },
        { ul: [
          "<strong>Mutlaq yo'l</strong> (absolute) — ildizdan (<code>/</code>) boshlanadi, to'liq manzil. Masalan: <code>/home/aziz/loyihalar</code>. U qayerda turishingizdan qat'i nazar bir xil ishlaydi;",
          "<strong>Nisbiy yo'l</strong> (relative) — <code>/</code>siz boshlanadi, <em>joriy papkaga</em> nisbatan hisoblanadi. Masalan, <code>loyihalar/src</code> — joriy papkadagi \"loyihalar\" ichidagi \"src\"."
        ] },
        { p: "Misol bilan tushunaylik. Aytaylik, siz <code>/home/aziz</code> da turibsiz:" },
        { code: "cd /home/aziz/loyihalar    # mutlaq yo'l\ncd loyihalar               # nisbiy yo'l (natija bir xil)" },
        { p: "Ikkalasi ham bir xil joyga olib boradi, chunki joriy papka <code>/home/aziz</code> edi." },

        { h2: "Maxsus belgilar: ~ . .." },
        { p: "Yo'llarda uch qisqartma juda tez-tez ishlatiladi:" },
        { ul: [
          "<code>~</code> (tilda) — <strong>uy papkangiz</strong>, ya'ni <code>/home/aziz</code>. Masalan, <code>cd ~/loyihalar</code> = <code>cd /home/aziz/loyihalar</code>;",
          "<code>.</code> (bitta nuqta) — <strong>joriy papka</strong>. Masalan, <code>./skript.sh</code> — shu papkadagi skriptni ishga tushirish;",
          "<code>..</code> (ikki nuqta) — <strong>ota-papka</strong> (bitta yuqori). <code>cd ..</code> yuqoriga chiqaradi, <code>cd ../..</code> ikki pog'ona yuqoriga."
        ] },
        { code: "cd ~/loyihalar     # uy papkasidagi loyihalar\ncd ../boshqa       # yuqoriga chiqib, boshqa papkaga kirish\nls ..              # ota-papka mazmunini ko'rish (o'zi kirmasdan)" },

        { h2: "mkdir — papka yaratish" },
        { p: "<code>mkdir</code> (make directory) yangi papka yaratadi:" },
        { code: "mkdir yangi-loyiha" },
        { p: "Bir vaqtning o'zida bir necha papka yaratish ham mumkin:" },
        { code: "mkdir hujjatlar rasmlar videolar" },
        { p: "Agar ichma-ich (bir vaqtning o'zida ota va bola) papkalar yaratmoqchi bo'lsangiz, <code>-p</code> (parents) flagini ishlating:" },
        { code: "mkdir -p loyiha/src/komponentlar" },
        { p: "Bu \"loyiha\" bo'lmasa ham, uni va ichidagi barcha papkalarni bir yo'la yaratadi. <code>-p</code> siz esa \"ota-papka topilmadi\" xatosi chiqardi." },

        { h2: "rmdir — bo'sh papkani o'chirish" },
        { p: "<code>rmdir</code> (remove directory) papkani o'chiradi, lekin faqat u <strong>bo'sh</strong> bo'lsa:" },
        { code: "rmdir eski-papka" },
        { p: "Agar papka ichida fayl yoki boshqa papka bo'lsa, <code>rmdir</code> \"papka bo'sh emas\" degan xatolik beradi va o'chirmaydi." },
        { warn: "Ichida fayllari bor papkani o'chirish uchun <code>rm -r</code> ishlatiladi, lekin u juda xavfli — hamma narsani so'roqsiz o'chiradi. Buni keyingi darsda ehtiyotkorlik bilan o'rganamiz. Hozircha bo'sh papkalar uchun <code>rmdir</code> — xavfsiz tanlov." },

        { h2: "Xulosa" },
        { ul: [
          "Linuxda yagona daraxt bor, ildizi — <code>/</code>; muhim papkalar: <code>/home</code>, <code>/etc</code>, <code>/var</code>, <code>/tmp</code>;",
          "<code>pwd</code> — qayerda turganingizni ko'rsatadi;",
          "<code>ls -lah</code> — papka mazmunini batafsil, yashirin fayllar bilan, qulay hajmda ko'rsatadi;",
          "<code>cd</code> — papkalar orasida yuradi; <code>cd ..</code> yuqoriga, <code>cd ~</code> uyga, <code>cd -</code> orqaga;",
          "<strong>Mutlaq yo'l</strong> <code>/</code>dan boshlanadi, <strong>nisbiy yo'l</strong> joriy papkaga nisbatan;",
          "<code>~</code> — uy papkasi, <code>.</code> — joriy, <code>..</code> — ota-papka;",
          "<code>mkdir -p</code> — ichma-ich papka yaratadi, <code>rmdir</code> — faqat bo'sh papkani o'chiradi;",
          "<strong>Tab</strong> tugmasi bilan nomlarni avtomatik to'ldiring."
        ] }
      ]
    },

    {
      slug: "fayl-buyruqlar",
      title: "Fayllar bilan ishlash",
      blurb: "touch, cp, mv, rm (ehtiyotkorlik bilan), cat, less, head, tail, nano/vim, find, grep, wc va oqimlarni yo'naltirish (>, >>, |).",
      body: [
        { lead: "Endi papkalar ichida navigatsiya qilishni bilamiz. Bu darsda fayllarning o'zi bilan ishlashni o'rganamiz: yaratish, nusxalash, ko'chirish, o'chirish, mazmunini o'qish, qidirish va — eng qizig'i — buyruqlarni bir-biriga ulash (oqimlarni yo'naltirish)." },

        { h2: "touch — bo'sh fayl yaratish" },
        { p: "<code>touch</code> buyrug'i bo'sh fayl yaratadi (yoki mavjud faylning vaqt belgisini yangilaydi):" },
        { code: "touch hujjat.txt" },
        { p: "Bir necha faylni birdaniga yaratish mumkin:" },
        { code: "touch a.txt b.txt c.txt" },
        { note: "<code>touch</code> asosan test uchun tez bo'sh fayl yaratishga ishlatiladi. Ichiga matn yozadigan fayl kerak bo'lsa, matn muharriri (nano) yoki oqim yo'naltirish (<code>&gt;</code>) qulayroq — ular haqida quyida gaplashamiz." },

        { h2: "cp — fayl nusxalash" },
        { p: "<code>cp</code> (copy) fayl nusxasini yaratadi. Sintaksis: <code>cp manba maqsad</code>:" },
        { code: "cp hujjat.txt nusxa.txt" },
        { p: "Faylni boshqa papkaga nusxalash:" },
        { code: "cp hujjat.txt ~/zaxira/" },
        { p: "<strong>Papkani</strong> (ichidagi hamma narsa bilan) nusxalash uchun <code>-r</code> (recursive) flagi kerak:" },
        { code: "cp -r loyiha loyiha-zaxira" },
        { p: "Bu \"loyiha\" papkasini butun mazmuni bilan \"loyiha-zaxira\" nomi ostida nusxalaydi." },

        { h2: "mv — ko'chirish va qayta nomlash" },
        { p: "<code>mv</code> (move) faylni boshqa joyga ko'chiradi. Qiziq jihati: agar manba va maqsad bir papkada bo'lsa, bu aslida <strong>qayta nomlash</strong>ga aylanadi:" },
        { code: "mv eski-nom.txt yangi-nom.txt    # qayta nomlash\nmv hujjat.txt ~/arxiv/            # ko'chirish" },
        { p: "<code>cp</code> dan farqli, <code>mv</code> papkalar uchun <code>-r</code> talab qilmaydi — u har qanday narsani (fayl yoki papka) bir joydan ikkinchisiga bemalol ko'chiradi:" },
        { code: "mv eski-papka yangi-papka" },
        { tip: "Nusxa qoldirmasdan faqat nomini o'zgartirmoqchi bo'lsangiz — <code>mv</code> ishlating (<code>cp</code> emas). <code>cp</code> ikkita nusxa qoldiradi, <code>mv</code> esa bittani ko'chiradi/nomlaydi." },

        { h2: "rm — fayl o'chirish (ehtiyotkorlik bilan!)" },
        { p: "<code>rm</code> (remove) faylni o'chiradi:" },
        { code: "rm keraksiz.txt" },
        { p: "Papkani ichidagi hamma narsa bilan o'chirish uchun <code>-r</code> (recursive):" },
        { code: "rm -r eski-loyiha" },
        { p: "Yozishdan himoyalangan fayllar uchun so'roqsiz majburiy o'chirish <code>-f</code> (force) bilan bo'ladi:" },
        { code: "rm -rf vaqtinchalik" },
        { warn: "<code>rm</code> bilan o'chirilgan fayl <strong>Savatga tushmaydi</strong> — u butunlay yo'qoladi va qaytarib bo'lmaydi! Ayniqsa <code>rm -rf /</code> kabi buyruq butun tizimni o'chirib yuborishi mumkin. Har doim yo'lni ikki-uch marta tekshiring. Xavfsizlik uchun <code>rm -i</code> (interaktiv) har bir fayldan oldin tasdiq so'raydi." },
        { code: "rm -i muhim.txt    # 'o'chirilsinmi?' deb so'raydi" },

        { h2: "cat, less — fayl mazmunini o'qish" },
        { p: "<code>cat</code> (concatenate) fayl mazmunini to'liq ekranga chiqaradi:" },
        { code: "cat hujjat.txt" },
        { p: "Kichik fayllar uchun qulay. Lekin fayl katta bo'lsa, hammasi ekrandan o'tib ketadi. Bunday holatda <code>less</code> ishlatiladi — u faylni sahifalab, aylantirib ko'rish imkonini beradi:" },
        { code: "less katta-log.txt" },
        { p: "<code>less</code> ichida boshqaruv: strelkalar bilan aylantirasiz, <code>/</code> bilan qidirasiz, <code>q</code> tugmasi bilan chiqasiz. Bu — katta fayllarni o'qishning eng qulay usuli." },

        { h2: "head, tail — boshi va oxiri" },
        { p: "Katta faylning butunini emas, faqat boshini yoki oxirini ko'rish kerak bo'lganda:" },
        { code: "head hujjat.txt        # birinchi 10 qator\ntail hujjat.txt        # oxirgi 10 qator" },
        { p: "Qatorlar sonini <code>-n</code> bilan belgilash mumkin:" },
        { code: "head -n 5 hujjat.txt   # birinchi 5 qator\ntail -n 20 hujjat.txt  # oxirgi 20 qator" },
        { p: "<code>tail</code> ning eng foydali flagi — <code>-f</code> (follow). U faylni \"jonli\" kuzatadi: fayl oxiriga yangi qatorlar qo'shilsa, ular darhol ekranda paydo bo'ladi. Bu server log'larini real vaqtda kuzatishda bebaho:" },
        { code: "tail -f /var/log/nginx/access.log" },
        { tip: "Web-server yoki dasturingiz log'ini <code>tail -f</code> bilan kuzatib turing — har bir so'rov yoki xato darhol ko'rinadi. To'xtatish uchun <strong>Ctrl+C</strong> bosing." },

        { h2: "nano va vim — matn muharrirlari" },
        { p: "Terminalda faylni tahrirlash uchun matn muharriri kerak. Ikki mashhur variant bor:" },
        { p: "<strong>nano</strong> — yangi boshlovchi uchun eng oson. Ochish:" },
        { code: "nano hujjat.txt" },
        { p: "Ichida oddiy yozasiz. Pastda yordamchi tugmalar ko'rinadi (<code>^</code> belgisi Ctrlni bildiradi): saqlash — <strong>Ctrl+O</strong>, chiqish — <strong>Ctrl+X</strong>." },
        { p: "<strong>vim</strong> — juda kuchli, lekin o'rganish qiyinroq muharrir. Ochish:" },
        { code: "vim hujjat.txt" },
        { p: "vimning eng muhim tugmalari (yangi boshlovchi uchun minimum):" },
        { ul: [
          "<code>i</code> — yozish rejimiga o'tish (insert);",
          "<strong>Esc</strong> — yozish rejimidan chiqish (buyruq rejimiga);",
          "<code>:w</code> — saqlash (write);",
          "<code>:q</code> — chiqish (quit);",
          "<code>:wq</code> — saqlab chiqish;",
          "<code>:q!</code> — o'zgarishlarni saqlamay majburan chiqish."
        ] },
        { note: "Ko'plab yangi foydalanuvchilar vimdan \"chiqolmay\" qoladi — bu mashhur hazil. Agar qamalib qolsangiz: <strong>Esc</strong> bosing, keyin <code>:q!</code> yozib Enter bosing. Boshda esa nanodan foydalaning — u ancha oson." },

        { h2: "find — fayllarni qidirish" },
        { p: "<code>find</code> berilgan papka ichidan (rekursiv) fayllarni qidiradi. Sintaksis: <code>find qayerda -shart</code>:" },
        { code: "find . -name hujjat.txt" },
        { p: "Bu joriy papkadan (<code>.</code>) boshlab \"hujjat.txt\" nomli faylni qidiradi. Namunalar bilan qidirish uchun tirnoq ichida <code>*</code> ishlatiladi:" },
        { code: "find . -name '*.js'          # barcha .js fayllar\nfind /home -name '*.log'     # /home ichidagi barcha log fayllar\nfind . -type d -name src     # 'src' nomli faqat papkalar" },
        { p: "Foydali shartlar: <code>-type f</code> — faqat fayllar, <code>-type d</code> — faqat papkalar, <code>-size +10M</code> — 10 megabaytdan katta fayllar." },

        { h2: "grep — matn ichidan qidirish" },
        { p: "<code>grep</code> fayl(lar) ichidan berilgan matnni o'z ichiga olgan qatorlarni topadi. Bu — dasturchining eng ko'p ishlatadigan vositalaridan biri:" },
        { code: "grep 'xato' log.txt" },
        { p: "Bu \"xato\" so'zi bor barcha qatorlarni chiqaradi. Muhim flaglar:" },
        { ul: [
          "<code>-i</code> — katta-kichik harfni farqlamaydi;",
          "<code>-r</code> — papka ichidagi barcha fayllarni rekursiv qidiradi;",
          "<code>-n</code> — mos qator raqamini ham ko'rsatadi;",
          "<code>-v</code> — teskarisi: matn <em>bo'lmagan</em> qatorlarni chiqaradi;",
          "<code>-c</code> — nechta qator mos kelganini sanaydi."
        ] },
        { code: "grep -rn 'TODO' .        # loyihadagi barcha TODO izohlarni topish\ngrep -i 'error' log.txt  # 'error', 'Error', 'ERROR' — hammasini" },
        { tip: "<code>grep -rn</code> — kod ichidan biror funksiya yoki o'zgaruvchi qayerda ishlatilganini topishning eng tez usuli. Masalan, <code>grep -rn 'getUserData' src/</code> shu funksiya nomi uchraydigan barcha joyni qator raqami bilan ko'rsatadi." },

        { h2: "wc — sanash" },
        { p: "<code>wc</code> (word count) fayldagi qatorlar, so'zlar va belgilar sonini sanaydi:" },
        { code: "wc hujjat.txt" },
        { p: "Natija: <code>qatorlar so'zlar belgilar fayl-nomi</code> tartibida chiqadi. Alohida ko'rsatkichlar:" },
        { code: "wc -l hujjat.txt    # faqat qatorlar soni\nwc -w hujjat.txt    # faqat so'zlar soni\nwc -c hujjat.txt    # faqat belgilar (baytlar) soni" },

        { h2: "Oqimlarni yo'naltirish: > >> |" },
        { p: "Bu — terminalning eng kuchli imkoniyati. Odatda buyruq natijasi ekranga chiqadi. Lekin uni <strong>faylga</strong> yozish yoki <strong>boshqa buyruqqa</strong> uzatish mumkin." },
        { p: "<strong>&gt;</strong> — natijani faylga yozadi (fayl <em>ustiga</em> yozadi, eski mazmun o'chadi):" },
        { code: "ls -l > royxat.txt        # ls natijasini faylga saqlash\necho 'Salom' > salom.txt  # matnni faylga yozish" },
        { p: "<strong>&gt;&gt;</strong> — natijani fayl <em>oxiriga qo'shadi</em> (eski mazmun saqlanadi):" },
        { code: "echo 'Yangi qator' >> royxat.txt" },
        { p: "<strong>|</strong> (quvur, pipe) — bir buyruq natijasini ikkinchi buyruqning kirishiga uzatadi. Bu — buyruqlarni zanjirga ulash:" },
        { code: "cat log.txt | grep 'xato'          # faylni o'qib, ichidan 'xato'ni topish\nls -l | wc -l                     # papkadagi fayllar sonini sanash\ncat log.txt | grep 'xato' | wc -l # 'xato' bor qatorlar sonini sanash" },
        { p: "Oxirgi misolni o'qib chiqaylik: <code>cat</code> faylni o'qiydi, natijani <code>grep</code>ga uzatadi (u faqat \"xato\"li qatorlarni qoldiradi), keyin <code>wc -l</code> ularni sanaydi. Uch buyruq bitta zanjirda ishladi." },
        { warn: "<code>&gt;</code> va <code>&gt;&gt;</code> ni aralashtirib yubormang! <code>&gt;</code> mavjud faylni butunlay <strong>o'chirib</strong>, ustiga yozadi. Muhim faylga <code>&gt;</code> yozib yuborsangiz, uning eski mazmuni yo'qoladi. Qo'shimcha yozish uchun <strong>doim</strong> <code>&gt;&gt;</code> ishlating." },

        { h2: "Xulosa" },
        { ul: [
          "<code>touch</code> — bo'sh fayl yaratish; <code>cp</code> — nusxalash (papka uchun <code>-r</code>); <code>mv</code> — ko'chirish yoki qayta nomlash;",
          "<code>rm</code> — o'chirish (Savatga tushmaydi!); <code>rm -r</code> papka uchun, <code>rm -i</code> tasdiq so'rab;",
          "<code>cat</code> — kichik fayl, <code>less</code> — katta fayl; <code>head</code>/<code>tail</code> — boshi/oxiri, <code>tail -f</code> — jonli kuzatish;",
          "<code>nano</code> — oson muharrir, <code>vim</code> — kuchli (chiqish: <code>:q!</code>);",
          "<code>find</code> — nom bo'yicha fayl qidirish; <code>grep -rn</code> — matn ichidan qidirish;",
          "<code>wc -l</code> — qatorlarni sanash;",
          "<code>&gt;</code> faylga yozadi (ustiga), <code>&gt;&gt;</code> qo'shadi, <code>|</code> buyruqlarni zanjirga ulaydi."
        ] }
      ]
    },

    {
      slug: "huquqlar",
      title: "Ruxsatlar va egalik",
      blurb: "rwx ruxsatlar, chmod (raqamli va belgili), chown, foydalanuvchi va guruh tushunchasi, sudo va root, su buyrug'i.",
      body: [
        { lead: "Linux — ko'p foydalanuvchili tizim. Shu bois har bir faylning kim o'qiy oladi, kim o'zgartira oladi, kim ishga tushira oladi degan qat'iy qoidalari bor. Bu darsda <strong>ruxsatlar</strong> (permissions) va <strong>egalik</strong> (ownership) tizimini, hamda administrator huquqlari bilan ishlashni o'rganamiz." },

        { h2: "Ruxsatlarni ko'rish" },
        { p: "<code>ls -l</code> natijasining eng chapidagi belgilar aynan ruxsatlarni bildiradi:" },
        { code: "-rw-r--r-- 1 aziz dasturchilar 2048 Jul  1 10:30 hujjat.txt" },
        { p: "Boshidagi 10 belgini bo'lib olaylik: <code>-</code> <code>rw-</code> <code>r--</code> <code>r--</code>." },
        { ul: [
          "1-belgi (<code>-</code>) — <strong>tur</strong>: <code>-</code> oddiy fayl, <code>d</code> papka, <code>l</code> havola (link);",
          "keyingi 3 (<code>rw-</code>) — <strong>egasi</strong> (owner) uchun ruxsatlar;",
          "keyingi 3 (<code>r--</code>) — <strong>guruh</strong> (group) uchun ruxsatlar;",
          "oxirgi 3 (<code>r--</code>) — <strong>boshqalar</strong> (others) uchun ruxsatlar."
        ] },

        { h2: "rwx — uch xil ruxsat" },
        { p: "Har bir uchlikda uchta harf bo'lishi mumkin:" },
        { ul: [
          "<code>r</code> (read) — <strong>o'qish</strong>: fayl mazmunini ko'rish; papka uchun — ichidagilar ro'yxatini olish;",
          "<code>w</code> (write) — <strong>yozish</strong>: fayl mazmunini o'zgartirish; papka uchun — ichida fayl yaratish/o'chirish;",
          "<code>x</code> (execute) — <strong>bajarish</strong>: faylni dastur sifatida ishga tushirish; papka uchun — ichiga <code>cd</code> bilan kirish."
        ] },
        { p: "Agar ruxsat bo'lmasa, o'sha o'rinda <code>-</code> turadi. Masalan, <code>rw-</code> — o'qish va yozish bor, bajarish yo'q. <code>r-x</code> — o'qish va bajarish bor, yozish yo'q." },
        { p: "Demak, <code>-rw-r--r--</code> shuni bildiradi: egasi o'qiy va yoza oladi, guruh faqat o'qiy oladi, boshqalar ham faqat o'qiy oladi." },

        { h2: "chmod — ruxsatlarni o'zgartirish (raqamli usul)" },
        { p: "<code>chmod</code> (change mode) ruxsatlarni o'zgartiradi. Eng ko'p ishlatiladigan <strong>raqamli</strong> (octal) usulda har bir ruxsatga son beriladi:" },
        { ul: [
          "<code>r</code> = <strong>4</strong>",
          "<code>w</code> = <strong>2</strong>",
          "<code>x</code> = <strong>1</strong>"
        ] },
        { p: "Har uchlik uchun kerakli ruxsatlar yig'indisi hisoblanadi. Masalan: <code>rwx</code> = 4+2+1 = <strong>7</strong>; <code>rw-</code> = 4+2 = <strong>6</strong>; <code>r-x</code> = 4+1 = <strong>5</strong>; <code>r--</code> = <strong>4</strong>. Uch uchlik uchun uch raqam yoziladi (egasi, guruh, boshqalar):" },
        { code: "chmod 644 hujjat.txt    # rw-r--r-- (egasi o'qi/yoz, qolganlar o'qi)\nchmod 755 skript.sh     # rwxr-xr-x (egasi hammasi, qolganlar o'qi/bajar)\nchmod 600 maxfiy.txt    # rw------- (faqat egasi o'qiy/yoza oladi)\nchmod 777 hamma.txt     # rwxrwxrwx (hamma hamma narsa qila oladi)" },
        { p: "Eng ko'p uchraydigan qiymatlar: <code>644</code> — oddiy fayllar uchun, <code>755</code> — papkalar va skriptlar uchun, <code>600</code> — maxfiy fayllar (parollar, kalitlar) uchun." },
        { warn: "<code>chmod 777</code> — \"hamma hamma narsa qila oladi\" degani. Bu <strong>xavfsizlik uchun juda yomon</strong>! Boshqa foydalanuvchilar faylingizni o'zgartira, o'chira oladi. Muammoni hal qildim deb <code>777</code> qo'yish — yangi boshlovchining eng ko'p qiladigan xatosi. Aniq kerakli minimal ruxsatni bering." },

        { h2: "chmod — belgili usul" },
        { p: "Ruxsatlarni harflar bilan ham o'zgartirish mumkin. Bu usulda kimga (<code>u</code>=egasi, <code>g</code>=guruh, <code>o</code>=boshqalar, <code>a</code>=hammasi), qanday amal (<code>+</code>=qo'shish, <code>-</code>=olib tashlash, <code>=</code>=aniq belgilash) va qaysi ruxsat (<code>r</code>/<code>w</code>/<code>x</code>) ko'rsatiladi:" },
        { code: "chmod +x skript.sh       # hammaga bajarish ruxsatini qo'shish\nchmod u+x skript.sh      # faqat egasiga bajarish ruxsati\nchmod g-w hujjat.txt     # guruhdan yozish ruxsatini olib tashlash\nchmod o-r maxfiy.txt     # boshqalardan o'qish ruxsatini olib tashlash\nchmod a+r ochiq.txt      # hammaga o'qish ruxsati" },
        { tip: "Skriptni ishga tushirib bo'lmayotgan bo'lsa (\"Permission denied\"), deyarli har doim sabab — bajarish ruxsati yo'qligi. Yechim: <code>chmod +x skript.sh</code>. Buni bash skriptlari darsida yana ko'ramiz." },

        { h2: "Foydalanuvchi va guruh" },
        { p: "Har bir faylning bir <strong>egasi</strong> (user) va bir <strong>guruhi</strong> (group) bo'ladi. Guruh — bir necha foydalanuvchini birlashtiradigan tushuncha. Masalan, \"dasturchilar\" guruhidagi hamma a'zo shu guruhga tegishli fayllarga birdek ruxsat oladi." },
        { p: "Joriy foydalanuvchi va uning guruhlarini ko'rish:" },
        { code: "whoami    # joriy foydalanuvchi nomi\nid        # foydalanuvchi va guruh ID'lari\ngroups    # a'zo bo'lgan guruhlar ro'yxati" },

        { h2: "chown — egani o'zgartirish" },
        { p: "<code>chown</code> (change owner) faylning egasini va/yoki guruhini o'zgartiradi. Sintaksis: <code>chown egasi:guruh fayl</code>:" },
        { code: "chown aziz hujjat.txt              # egasini 'aziz' qilish\nchown aziz:dasturchilar hujjat.txt # egasi va guruhni birga\nchown :dasturchilar hujjat.txt     # faqat guruhni o'zgartirish" },
        { p: "Papka va ichidagi hamma narsani birdaniga o'zgartirish uchun <code>-R</code> (rekursiv):" },
        { code: "chown -R aziz:aziz /home/aziz/loyiha" },
        { note: "Egalikni o'zgartirish odatda administrator (root) huquqini talab qiladi, chunki boshqa birovning faylini o'zlashtirib olish xavfli bo'lardi. Shu bois <code>chown</code> ko'pincha <code>sudo</code> bilan ishlatiladi (quyida)." },

        { h2: "root va sudo" },
        { p: "<strong>root</strong> — Linuxdagi bosh administrator, cheksiz huquqli \"super foydalanuvchi\". U istalgan faylni o'zgartira, o'chira, tizim sozlamalarini o'zgartira oladi. Kundalik ishda root sifatida ishlash <strong>xavfli</strong> — bitta xato butun tizimni buzishi mumkin." },
        { p: "Shu sabab odatda oddiy foydalanuvchi sifatida ishlaymiz, faqat administrator huquqi kerak bo'lganda <strong>sudo</strong> (superuser do) buyrug'ini oldiga qo'shamiz:" },
        { code: "sudo apt update              # paket ro'yxatini yangilash\nsudo chown aziz fayl.txt     # egalikni o'zgartirish\nsudo nano /etc/hosts         # tizim faylini tahrirlash" },
        { p: "<code>sudo</code> yozganingizda tizim <strong>parolingizni</strong> so'raydi. To'g'ri kiritsangiz, buyruq administrator huquqi bilan bajariladi. Parol yozayotganda ekranda hech narsa ko'rinmaydi — bu normal, xavfsizlik uchun shunday." },
        { warn: "<code>sudo</code> — o'tkir pichoq: to'g'ri ishlatilsa foydali, ehtiyotsizlik esa tizimni buzadi. Internetdan ko'chirib olgan har qanday <code>sudo</code> buyrug'ini yaxshilab tushunmasdan ishga tushirmang. Ayniqsa <code>sudo rm -rf</code> kabi buyruqlardan ehtiyot bo'ling." },

        { h2: "su — foydalanuvchini almashtirish" },
        { p: "<code>su</code> (switch user) boshqa foydalanuvchiga o'tish imkonini beradi:" },
        { code: "su aziz        # 'aziz' foydalanuvchiga o'tish (uning parolini so'raydi)\nsu -           # root'ga to'liq o'tish (root parolini so'raydi)" },
        { p: "<code>su -</code> (chiziqcha bilan) — nafaqat foydalanuvchini, balki uning muhitini (uy papkasi, o'zgaruvchilar) ham to'liq oladi. Root sessiyasidan chiqish uchun <code>exit</code> yoki <strong>Ctrl+D</strong> bosiladi." },
        { note: "Ubuntuda root paroli odatda o'rnatilmagan, shuning uchun <code>su -</code> o'rniga <code>sudo -i</code> ishlatiladi — bu joriy foydalanuvchi paroli bilan root qobig'iga o'tkazadi. Amalda <code>sudo</code> yondashuvi <code>su</code>dan xavfsizroq hisoblanadi." },

        { h2: "Xulosa" },
        { ul: [
          "Har fayl uch guruh uchun ruxsatga ega: <strong>egasi</strong>, <strong>guruh</strong>, <strong>boshqalar</strong>;",
          "<code>r</code>=o'qish (4), <code>w</code>=yozish (2), <code>x</code>=bajarish (1);",
          "<code>chmod 644</code>/<code>755</code>/<code>600</code> — raqamli usul; <code>chmod +x</code> — belgili usul;",
          "<code>chmod 777</code>dan qoching — bu jiddiy xavfsizlik teshigi;",
          "<code>chown egasi:guruh fayl</code> — egalikni o'zgartiradi (odatda <code>sudo</code> bilan);",
          "<strong>root</strong> — cheksiz huquqli administrator; kundalik ishda undan foydalanmang;",
          "<code>sudo</code> — bitta buyruqni administrator huquqi bilan bajaradi (parol so'raydi);",
          "<code>su</code> — boshqa foydalanuvchiga o'tadi; Ubuntuda <code>sudo -i</code> afzal."
        ] }
      ]
    },

    {
      slug: "jarayon-tarmoq",
      title: "Jarayonlar va tarmoq",
      blurb: "ps, top/htop, kill, fon rejimi (&), jobs, systemctl; tarmoq buyruqlari ping, curl, wget; paket menejeri apt (install/update).",
      body: [
        { lead: "Har bir ishlab turgan dastur — bu <strong>jarayon</strong> (process). Bu darsda jarayonlarni ko'rish va boshqarishni, dasturlarni fon rejimida ishlatishni, tizim xizmatlarini boshqarishni hamda tarmoq va paketlar bilan ishlashni o'rganamiz." },

        { h2: "Jarayon nima?" },
        { p: "<strong>Jarayon</strong> — bu ishlab turgan dasturning bir nusxasi. Brauzer, matn muharriri, web-server — har biri bitta yoki bir necha jarayon. Har bir jarayonning noyob <strong>PID</strong> (Process ID) raqami bor, u orqali jarayonni aniqlaymiz va boshqaramiz." },

        { h2: "ps — jarayonlar ro'yxati" },
        { p: "<code>ps</code> (process status) ishlab turgan jarayonlarni ko'rsatadi. Odatda <code>aux</code> flaglari bilan barcha jarayonlarni chiqaramiz:" },
        { code: "ps aux" },
        { p: "Bu barcha foydalanuvchilarning barcha jarayonlarini PID, protsessor va xotira sarfini ko'rsatib chiqaradi. Ma'lum dasturni topish uchun <code>grep</code> bilan filtrlaymiz:" },
        { code: "ps aux | grep node    # 'node' bor jarayonlarni topish" },
        { p: "Bu qatorlar ichidan node dasturlarini va ularning PID raqamlarini topib beradi." },

        { h2: "top va htop — jonli kuzatuv" },
        { p: "<code>top</code> jarayonlarni <strong>real vaqtda</strong>, jonli yangilanib turadigan jadval sifatida ko'rsatadi — protsessor va xotira eng ko'p iste'mol qilayotgan dasturlar tepada bo'ladi:" },
        { code: "top" },
        { p: "Chiqish uchun <code>q</code> tugmasini bosing. <code>top</code> tizim yuklamasini, umumiy xotira sarfini va har bir jarayon holatini ko'rsatadi." },
        { p: "<strong>htop</strong> — <code>top</code>ning chiroyliroq, rangli va qulayroq varianti. U odatda alohida o'rnatiladi:" },
        { code: "sudo apt install htop\nhtop" },
        { tip: "<code>htop</code>da sichqoncha ishlaydi, jarayonlarni rang bilan ajratadi va bevosita ichidan jarayonni \"o'ldirish\" mumkin (F9 tugmasi). Server sekinlashsa, birinchi ish — <code>htop</code> ochib, nima resursni yeb turganini ko'rish." },

        { h2: "kill — jarayonni to'xtatish" },
        { p: "Osilib qolgan yoki keraksiz jarayonni <code>kill</code> buyrug'i bilan uning PID raqami orqali to'xtatamiz:" },
        { code: "kill 12345          # PID 12345 jarayonga to'xtash signali\nkill -9 12345       # majburiy to'xtatish (qaysar jarayonlar uchun)" },
        { p: "Oddiy <code>kill</code> jarayondan \"iltimos, ishni yakunlab to'xta\" deb so'raydi (yumshoq). <code>kill -9</code> esa \"darhol o'l\" degan qattiq signal — u faqat oddiy <code>kill</code> ishlamaganda ishlatiladi." },
        { p: "Nom bo'yicha to'xtatish uchun <code>pkill</code> qulay:" },
        { code: "pkill node          # barcha 'node' jarayonlarini to'xtatish" },
        { warn: "<code>kill -9</code> jarayonga ishini xotirjam yakunlash imkonini bermaydi — saqlanmagan ma'lumot yo'qolishi mumkin. Doim avval oddiy <code>kill</code>ni sinang, faqat u ishlamaganda <code>-9</code>ga o'ting." },

        { h2: "Fon rejimi: & va jobs" },
        { p: "Odatda buyruq ishlab bo'lguncha terminal band bo'ladi. Dasturni <strong>fonda</strong> (background) ishlatib, terminalni bo'shatish uchun buyruq oxiriga <code>&</code> qo'yiladi:" },
        { code: "node server.js &" },
        { p: "Endi server fonda ishlaydi, terminaldan boshqa buyruqlar berishingiz mumkin. Fondagi ishlarni ko'rish va boshqarish uchun:" },
        { ul: [
          "<code>jobs</code> — joriy terminalning fondagi ishlari ro'yxati;",
          "<code>fg</code> — fondagi ishni oldingi planga qaytarish (foreground);",
          "<code>bg</code> — to'xtatilgan ishni fonda davom ettirish;",
          "<strong>Ctrl+Z</strong> — joriy ishni vaqtincha to'xtatib fonga o'tkazish;",
          "<strong>Ctrl+C</strong> — joriy ishni butunlay to'xtatish."
        ] },
        { code: "jobs        # fondagi ishlar\nfg          # oxirgi ishni oldinga qaytarish\nfg %1       # 1-raqamli ishni oldinga qaytarish" },
        { note: "Terminalni yopsangiz, <code>&</code> bilan ishga tushirilgan jarayonlar ham to'xtaydi. Serverni doimiy ishlatish uchun <code>nohup</code>, <code>tmux</code> yoki keyingi bo'limdagi <code>systemctl</code> xizmatlaridan foydalaniladi." },

        { h2: "systemctl — tizim xizmatlarini boshqarish" },
        { p: "Web-serverlar, ma'lumotlar bazalari kabi doimiy ishlaydigan dasturlar <strong>xizmat</strong> (service) sifatida ishga tushiriladi. Ularni <code>systemctl</code> boshqaradi:" },
        { code: "sudo systemctl start nginx      # xizmatni ishga tushirish\nsudo systemctl stop nginx       # to'xtatish\nsudo systemctl restart nginx    # qayta ishga tushirish\nsudo systemctl status nginx     # holatini ko'rish" },
        { p: "Xizmatni kompyuter yoqilganda avtomatik ishga tushishini yoqish/o'chirish:" },
        { code: "sudo systemctl enable nginx     # avtoyuklashni yoqish\nsudo systemctl disable nginx    # avtoyuklashni o'chirish" },
        { tip: "<code>systemctl status</code> — muammoni tekshirishning birinchi qadami. U xizmat ishlayaptimi (active/failed), oxirgi log qatorlari va xato borligini bir joyda ko'rsatadi." },

        { h2: "ping — tarmoqni tekshirish" },
        { p: "<code>ping</code> berilgan server bilan aloqa bor-yo'qligini tekshiradi — unga kichik paketlar yuborib, javob vaqtini o'lchaydi:" },
        { code: "ping google.com" },
        { p: "Har soniyada javob kelib turadi, javob vaqti millisekundlarda ko'rsatiladi. To'xtatish uchun <strong>Ctrl+C</strong> bosing. Agar javob kelmasa — internet yo'q yoki server ishlamayapti." },

        { h2: "curl va wget — tarmoqdan ma'lumot olish" },
        { p: "<code>curl</code> — tarmoq orqali so'rov yuboradigan universal vosita. U API bilan ishlash, web-sahifani olish, fayl yuklab olishda ishlatiladi:" },
        { code: "curl https://example.com               # sahifa mazmunini ekranga chiqarish\ncurl -O https://example.com/fayl.zip   # faylni saqlab olish\ncurl -I https://example.com            # faqat javob sarlavhalarini ko'rish" },
        { p: "API bilan ishlashda ko'p qo'llaniladi. Masalan, JSON so'rov yuborish:" },
        { code: "curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{\"nom\": \"Aziz\"}'" },
        { p: "<code>wget</code> — asosan fayl yuklab olishga ixtisoslashgan, oddiyroq vosita:" },
        { code: "wget https://example.com/dastur.tar.gz" },
        { p: "Farqi: <code>curl</code> ko'p qirrali (API, so'rovlar), <code>wget</code> esa fayllarni, ayniqsa katta yuklamalarni (davom ettirish imkoni bilan) yuklab olishga qulay." },

        { h2: "apt — paket menejeri" },
        { p: "Linuxda dasturlar <strong>paket menejeri</strong> orqali o'rnatiladi — internetdan qidirib yuklab olishning hojati yo'q. Ubuntu/Debianda bu <code>apt</code>:" },
        { code: "sudo apt update            # paketlar ro'yxatini yangilash\nsudo apt upgrade           # o'rnatilgan paketlarni yangilash\nsudo apt install git       # 'git' paketini o'rnatish\nsudo apt remove git        # paketni o'chirish\napt search redis           # paketni qidirish" },
        { p: "Eng muhim qoida: yangi paket o'rnatishdan <strong>oldin</strong> doim <code>apt update</code> qiling — bu paketlar ro'yxatini eng yangi holatga keltiradi:" },
        { code: "sudo apt update && sudo apt install nodejs" },
        { p: "Bu yerda <code>&&</code> ikki buyruqni bog'laydi: birinchisi muvaffaqiyatli tugasa, ikkinchisi ishlaydi." },
        { note: "Boshqa distributivlarda boshqa paket menejerlari bor: Fedora/CentOSda <code>dnf</code> yoki <code>yum</code>, Arch Linuxda <code>pacman</code>. Buyruqlar o'xshash mantiqda ishlaydi, faqat nomi farq qiladi. Ubuntu bilan ishlaganingiz uchun biz <code>apt</code>ga e'tibor qaratamiz." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Jarayon</strong> — ishlab turgan dastur, uning <strong>PID</strong> raqami bor;",
          "<code>ps aux</code> — jarayonlar ro'yxati; <code>top</code>/<code>htop</code> — jonli kuzatuv;",
          "<code>kill PID</code> — to'xtatish, <code>kill -9</code> — majburiy (faqat zarur bo'lsa);",
          "<code>&</code> — fonda ishga tushirish; <code>jobs</code>, <code>fg</code>, <code>bg</code> — fon ishlarini boshqarish;",
          "<code>systemctl start/stop/status/enable</code> — tizim xizmatlarini boshqaradi;",
          "<code>ping</code> — tarmoqni tekshirish; <code>curl</code> — so'rovlar/API, <code>wget</code> — fayl yuklab olish;",
          "<code>apt update</code> + <code>apt install</code> — paketlarni yangilash va o'rnatish."
        ] }
      ]
    },

    {
      slug: "bash-skript",
      title: "Bash skript asoslari",
      blurb: "Shebang (#!/bin/bash), chmod +x bilan ishga tushirish, o'zgaruvchilar, echo va read, if/else shartlari, for/while sikllari, funksiyalar va to'liq skript misoli.",
      body: [
        { lead: "Bir necha buyruqni takror-takror yozish o'rniga, ularni bitta <strong>skript</strong> faylga yozib, bir buyruq bilan ishga tushirish mumkin. Bu — avtomatlashtirishning kaliti. Bu darsda bash skriptlarini yozishni: o'zgaruvchilar, shartlar, sikllar va funksiyalarni noldan o'rganamiz." },

        { h2: "Birinchi skript va shebang" },
        { p: "Bash skripti — bu shunchaki buyruqlar yozilgan matnli fayl (odatda <code>.sh</code> kengaytmasi bilan). Uning eng birinchi qatori maxsus — <strong>shebang</strong> deyiladi:" },
        { code: "#!/bin/bash\necho 'Salom, dunyo!'" },
        { p: "<code>#!/bin/bash</code> qatori tizimga \"bu faylni bash bilan ishga tushir\" deb aytadi. U <strong>albatta birinchi qator</strong> bo'lishi kerak. Undan keyingi qatorlar — oddiy buyruqlar, xuddi terminalda yozganingizdek." },
        { note: "<code>#</code> belgisi bilan boshlangan qatorlar — <strong>izoh</strong> (comment), ular bajarilmaydi. Faqat birinchi qatordagi <code>#!</code> maxsus ma'noga ega. Qolgan barcha <code>#</code> izohlar kodni tushuntirish uchun ishlatiladi." },

        { h2: "Skriptni ishga tushirish" },
        { p: "Skriptni <code>salom.sh</code> nomi bilan saqladingiz deylik. Uni ishga tushirishdan oldin unga <strong>bajarish ruxsati</strong> berish kerak (esingizdami — ruxsatlar darsi):" },
        { code: "chmod +x salom.sh    # bajarish ruxsatini berish\n./salom.sh           # skriptni ishga tushirish" },
        { p: "Diqqat: skript nomining oldiga <code>./</code> qo'yiladi. Bu \"joriy papkadagi skript\"ni bildiradi (chunki xavfsizlik uchun joriy papka avtomatik qidirilmaydi). Muqobil yo'l — bashga to'g'ridan-to'g'ri berish (ruxsat shart emas):" },
        { code: "bash salom.sh" },

        { h2: "O'zgaruvchilar" },
        { p: "O'zgaruvchi qiymat saqlaydi. Uni belgilashda <strong>tenglik atrofida bo'shliq bo'lmasligi</strong> shart:" },
        { code: "#!/bin/bash\nism=\"Aziz\"\nyosh=25" },
        { p: "O'zgaruvchi qiymatini o'qishda oldiga <code>$</code> qo'yiladi:" },
        { code: "#!/bin/bash\nism=\"Aziz\"\necho \"Ismim: $ism\"\necho \"Yoshim: $yosh yosh\"" },
        { warn: "Tenglik atrofida bo'shliq qo'ymang! <code>ism = \"Aziz\"</code> (bo'shliq bilan) xato — bash buni buyruq deb o'ylaydi. To'g'risi: <code>ism=\"Aziz\"</code> (bo'shliqsiz). Bu — yangi boshlovchilarning eng ko'p qiladigan xatosi." },
        { p: "Buyruq natijasini o'zgaruvchiga saqlash uchun <code>$(...)</code> ishlatiladi:" },
        { code: "#!/bin/bash\nsana=$(date)\npapka=$(pwd)\necho \"Hozir: $sana\"\necho \"Joriy papka: $papka\"" },

        { h2: "echo va read — chiqarish va o'qish" },
        { p: "<code>echo</code> ekranga matn chiqaradi (buni allaqachon ishlatdik). <code>read</code> esa foydalanuvchidan matn <strong>o'qib oladi</strong> va o'zgaruvchiga saqlaydi:" },
        { code: "#!/bin/bash\necho \"Ismingizni kiriting:\"\nread ism\necho \"Salom, $ism!\"" },
        { p: "Ishga tushganda skript to'xtab, foydalanuvchi yozguncha kutadi, keyin javobni <code>ism</code>ga saqlaydi. Savolni bir qatorda so'rash uchun <code>-p</code> flagi qulay:" },
        { code: "#!/bin/bash\nread -p \"Yoshingiz nechada? \" yosh\necho \"Siz $yosh yoshdasiz.\"" },

        { h2: "if/else — shartlar" },
        { p: "Shart tekshirish uchun <code>if</code> ishlatiladi. Bash sintaksisi biroz o'ziga xos — shart <code>[ ]</code> qavs ichida yoziladi, blok <code>then</code> bilan boshlanib <code>fi</code> bilan tugaydi:" },
        { code: "#!/bin/bash\nread -p \"Yoshingiz: \" yosh\n\nif [ $yosh -ge 18 ]; then\n  echo \"Siz voyaga yetgansiz.\"\nelse\n  echo \"Siz hali balog'atga yetmagansiz.\"\nfi" },
        { p: "Sonlarni solishtirish operatorlari (harfli yoziladi):" },
        { ul: [
          "<code>-eq</code> — teng (equal);",
          "<code>-ne</code> — teng emas (not equal);",
          "<code>-gt</code> — katta (greater than);",
          "<code>-lt</code> — kichik (less than);",
          "<code>-ge</code> — katta yoki teng;",
          "<code>-le</code> — kichik yoki teng."
        ] },
        { p: "Matnlarni solishtirish uchun oddiy <code>=</code> va <code>!=</code> ishlatiladi:" },
        { code: "#!/bin/bash\nread -p \"Parol: \" parol\n\nif [ \"$parol\" = \"maxfiy123\" ]; then\n  echo \"Kirish muvaffaqiyatli!\"\nelse\n  echo \"Noto'g'ri parol.\"\nfi" },
        { p: "Fayl mavjudligini tekshirish uchun maxsus operatorlar bor: <code>-f</code> (fayl bormi), <code>-d</code> (papka bormi):" },
        { code: "#!/bin/bash\nif [ -f config.txt ]; then\n  echo \"config.txt mavjud.\"\nelse\n  echo \"config.txt topilmadi!\"\nfi" },
        { tip: "O'zgaruvchini shart ichida doim <strong>ikki tirnoq</strong> ichida yozing: <code>[ \"$parol\" = ... ]</code>. Agar o'zgaruvchi bo'sh bo'lsa, tirnoqsiz yozuv xatolik beradi. Tirnoq bu muammoni oldini oladi." },

        { h2: "for va while — sikllar" },
        { p: "<code>for</code> sikli ro'yxat ustidan yuradi — har bir element uchun blokni takrorlaydi:" },
        { code: "#!/bin/bash\nfor mevа in olma nok uzum; do\n  echo \"Meva: $mevа\"\ndone" },
        { p: "Sonlar oralig'i bo'yicha yurish (1 dan 5 gacha):" },
        { code: "#!/bin/bash\nfor i in $(seq 1 5); do\n  echo \"Raqam: $i\"\ndone" },
        { p: "Papkadagi barcha fayllar ustidan yurish — juda amaliy:" },
        { code: "#!/bin/bash\nfor fayl in *.txt; do\n  echo \"Topildi: $fayl\"\ndone" },
        { p: "<code>while</code> sikli shart to'g'ri bo'lgani qadar takrorlaydi:" },
        { code: "#!/bin/bash\nson=1\nwhile [ $son -le 5 ]; do\n  echo \"Hisoblash: $son\"\n  son=$((son + 1))\ndone" },
        { p: "Bu yerda <code>$((...))</code> — bashda <strong>matematik amal</strong> bajarish usuli. <code>son=$((son + 1))</code> sonni birga oshiradi. Shart <code>[ $son -le 5 ]</code> yolg'onga aylanganda (son 6 bo'lganda) sikl to'xtaydi." },

        { h2: "Funksiyalar" },
        { p: "Takrorlanuvchi kodni <strong>funksiya</strong>ga o'rab, keyin nom bilan chaqirish mumkin:" },
        { code: "#!/bin/bash\n\nsalomlash() {\n  echo \"Salom, $1!\"\n}\n\nsalomlash Aziz\nsalomlash Dilnoza" },
        { p: "Funksiyaga argument <code>$1</code>, <code>$2</code> orqali uzatiladi — birinchi argument <code>$1</code>, ikkinchisi <code>$2</code> va hokazo. Yuqorida <code>Aziz</code> — <code>$1</code> bo'lib keldi. Natija:" },
        { code: "Salom, Aziz!\nSalom, Dilnoza!" },

        { h2: "To'liq skript misoli" },
        { p: "Endi o'rganganlarimizni birlashtiramiz. Quyidagi skript loyihaning zaxira nusxasini yaratadi — papka mavjudligini tekshiradi, zaxira papkasini yaratadi va fayllarni nusxalaydi:" },
        { code: "#!/bin/bash\n\n# Sozlamalar\nmanba=\"loyiha\"\nzaxira=\"zaxira-$(date +%Y-%m-%d)\"\n\n# Manba papka bor-yo'qligini tekshirish\nif [ ! -d \"$manba\" ]; then\n  echo \"Xato: '$manba' papkasi topilmadi!\"\n  exit 1\nfi\n\n# Zaxira papkasini yaratish\nmkdir -p \"$zaxira\"\necho \"Zaxira papkasi yaratildi: $zaxira\"\n\n# Fayllarni nusxalash\ncp -r \"$manba\"/* \"$zaxira\"/\n\n# Natijani sanash\nsoni=$(ls \"$zaxira\" | wc -l)\necho \"Tayyor! $soni ta element nusxalandi.\"" },
        { p: "Bu skriptni tahlil qilaylik:" },
        { ul: [
          "<code>zaxira=\"zaxira-$(date +%Y-%m-%d)\"</code> — zaxira papkasiga bugungi sanani qo'shadi;",
          "<code>if [ ! -d \"$manba\" ]</code> — <code>!</code> inkor: \"agar papka <em>yo'q</em> bo'lsa\";",
          "<code>exit 1</code> — skriptni xato kodi bilan to'xtatadi (0 — muvaffaqiyat, boshqa son — xato);",
          "<code>cp -r \"$manba\"/*</code> — manbadagi hamma narsani nusxalaydi;",
          "<code>ls ... | wc -l</code> — nusxalangan elementlar sonini sanaydi."
        ] },
        { tip: "Skriptlarni jiddiy ishlatishdan oldin sinab ko'ring. Boshiga <code>set -e</code> qo'shsangiz, birorta buyruq xato bersa skript darhol to'xtaydi — bu xavfsizroq. Yana <code>set -u</code> aniqlanmagan o'zgaruvchi ishlatilsa xato beradi." },

        { h2: "Xulosa" },
        { ul: [
          "Skript birinchi qatori — <strong>shebang</strong>: <code>#!/bin/bash</code>;",
          "Ishga tushirish: <code>chmod +x skript.sh</code>, keyin <code>./skript.sh</code>;",
          "O'zgaruvchi: <code>ism=\"Aziz\"</code> (bo'shliqsiz!), o'qish: <code>$ism</code>; buyruq natijasi: <code>$(...)</code>;",
          "<code>echo</code> — chiqarish, <code>read</code> — foydalanuvchidan o'qish;",
          "<code>if [ shart ]; then ... else ... fi</code>; sonlar uchun <code>-eq</code>/<code>-gt</code>/<code>-lt</code>, matn uchun <code>=</code>;",
          "<code>for ... do ... done</code> va <code>while ... do ... done</code> — sikllar; matematika: <code>$((...))</code>;",
          "Funksiyalar argumentni <code>$1</code>, <code>$2</code> orqali oladi;",
          "<code>exit</code>, <code>set -e</code>, <code>set -u</code> — skriptni ishonchli qiladi."
        ] }
      ]
    }
  ]
};
