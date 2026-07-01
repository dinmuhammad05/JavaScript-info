"use strict";

module.exports = {
  part: "4-qism: Amaliy vositalar",
  chapter: "Docker",
  lessons: [
    {
      slug: "docker-nima",
      title: "Docker nima? Konteynerlar",
      blurb: "Docker qanday muammoni hal qiladi, konteyner nima, virtual mashina bilan farqi, image va container tushunchalari, Docker Hub va nega Docker foydali.",
      body: [
        { lead: "Tasavvur qiling: siz ilovangizni yozdingiz, o'z kompyuteringizda mukammal ishlaydi. Ammo uni hamkasbingizga yoki serverga jo'natsangiz — ishlamaydi. <strong>Docker</strong> aynan shu muammoni hal qiladi: u ilovani barcha kerakli narsalari bilan birga <strong>konteyner</strong> ichiga o'raydi, shunda u har qanday joyda bir xil ishlaydi. Ushbu darsda Docker nima ekanini, konteyner va virtual mashina farqini hamda asosiy tushunchalarni chuqur o'rganamiz." },

        { note: "Docker — bu JavaScript kutubxonasi emas, balki alohida <strong>vosita</strong> (dastur). Shu sababli bu bobdagi barcha misollar <strong>statik</strong> — ular sahifada ishga tushmaydi. Ularni tushunib o'qing va o'z kompyuteringizdagi terminalda sinab ko'ring." },

        { h2: "Muammo: 'mening kompyuterimda ishlaydi'" },
        { p: "Dasturchilar orasida mashhur ibora bor: <em>'It works on my machine'</em> — ya'ni <em>'mening kompyuterimda ishlaydi'</em>. Bu shunchaki hazil emas, balki real muammo. Nega bir xil kod bir joyda ishlab, boshqa joyda ishlamaydi?" },
        { ul: [
          "Sizda Node.js 20-versiyasi, serverda esa 16-versiyasi bo'lishi mumkin;",
          "Sizda ma'lumotlar bazasi o'rnatilgan, serverda esa yo'q;",
          "Operatsion tizim boshqacha (siz macOS, server Linux);",
          "Muhit o'zgaruvchilari (environment variables) yoki kutubxona versiyalari farq qiladi."
        ] },
        { p: "Har bir kompyuter — bu o'ziga xos, boshqacha sozlangan muhit. Ilovani yangi joyga ko'chirganda, uni yana qo'lda sozlash kerak bo'ladi. Bu vaqt oladi va xatolarga to'la." },

        { h2: "Yechim: konteyner" },
        { p: "<strong>Konteyner (container)</strong> — bu ilova va uning ishlashi uchun zarur bo'lgan <strong>hamma narsa</strong> (kod, kutubxonalar, ishga tushirish muhiti, sozlamalar) birga o'ralgan yengil, izolyatsiyalangan paket. Konteyner o'z ichida to'liq muhitni olib yuradi." },
        { p: "Yuk tashish konteynerini tasavvur qiling: ichida nima borligidan qat'i nazar, u standart o'lchamda va har qanday kema, poyezd yoki yuk mashinasiga mos keladi. Docker konteyneri ham xuddi shunday — ichidagi ilovadan qat'i nazar, u Docker o'rnatilgan har qanday kompyuterda bir xil ishlaydi." },
        { tip: "Konteynerning asosiy g'oyasi: <strong>'bir marta o'ra, hamma joyda ishga tushir'</strong>. Ilovani konteynerga o'raganingizdan so'ng, u sizning noutbukingizda ham, hamkasbingiznikida ham, bulutli serverda ham aynan bir xil xatti-harakat qiladi." },

        { h2: "Virtual mashina va konteyner farqi" },
        { p: "Ko'pchilik <strong>virtual mashina (VM)</strong> haqida eshitgan. VM ham izolyatsiyalangan muhit yaratadi, ammo u butunlay boshqa yondashuv. Farqni tushunish muhim." },
        { p: "<strong>Virtual mashina</strong> — bu haqiqiy kompyuter ichida ishlaydigan <em>to'liq</em> boshqa kompyuter. Uning o'z operatsion tizimi (mehmon OS), o'z virtual xotirasi va disklari bor. Bir VM bir necha gigabayt joy egallaydi va yuklanishi bir necha daqiqa vaqt oladi." },
        { p: "<strong>Konteyner</strong> esa asosiy operatsion tizimning <em>o'zagini (kernel)</em> baham ko'radi. U alohida OS ko'tarib yurmaydi — faqat ilova va uning bog'liqliklarini o'raydi. Shu sababli konteyner o'nlab megabaytdan iborat bo'lishi va soniyalarda ishga tushishi mumkin." },
        { ul: [
          "<strong>VM:</strong> og'ir (GB'larda), sekin yuklanadi (daqiqalar), har biri to'liq OS'ga ega;",
          "<strong>Konteyner:</strong> yengil (MB'larda), tez ishga tushadi (soniyalar), asosiy OS o'zagini baham ko'radi;",
          "Bitta kompyuterda bir vaqtning o'zida bir nechta VM ishlatish qiyin, ammo o'nlab konteynerni bemalol ishga tushirish mumkin."
        ] },
        { note: "Konteyner VM'ni butunlay almashtirmaydi — ular turli maqsadlar uchun. Amalda ko'pincha konteynerlar VM ichida ishlaydi (masalan, bulutli serverda). Ammo dasturchilar uchun kundalik ishda konteyner ancha yengil va qulay." },

        { h2: "Image (obraz) va container (konteyner) farqi" },
        { p: "Docker'da eng chalkash, ammo eng muhim tushunchalar — <strong>image</strong> va <strong>container</strong>. Ular bir-biriga bog'liq, lekin bir xil narsa emas." },
        { p: "<strong>Image (obraz)</strong> — bu shablon, ya'ni 'qolip'. U ilovaning muzlatilgan holati: kod, kutubxonalar va sozlamalarning o'zgarmas nusxasi. Image'ni disк fayl (masalan, dastur o'rnatuvchisi) deb tasavvur qiling — u shunchaki turadi va o'zi ishlamaydi." },
        { p: "<strong>Container (konteyner)</strong> — bu image'dan ishga tushirilgan <em>tirik nusxa</em>. Image'ni ishga tushirganingizda undan konteyner tug'iladi. Bitta image'dan bir nechta konteyner yaratish mumkin — xuddi bitta o'rnatuvchi fayldan dasturni bir necha marta o'rnatgandek." },
        { ul: [
          "<strong>Image</strong> — o'zgarmas shablon (retseptga o'xshaydi);",
          "<strong>Container</strong> — ishlab turgan nusxa (retsept bo'yicha pishirilgan taomga o'xshaydi);",
          "Bitta image'dan → ko'p konteyner yaratish mumkin;",
          "Image diskда saqlanadi, konteyner esa xotirada ishlaydi."
        ] },
        { tip: "Osongina eslash uchun: <strong>image</strong> — bu klass (class), <strong>container</strong> — bu shu klassdan yaratilgan obyekt (instance). JavaScript'dagi <code>class</code> va <code>new</code> bilan yaratilgan obyektga o'xshaydi." },

        { h2: "Docker Hub — image'lar ombori" },
        { p: "<strong>Docker Hub</strong> — bu tayyor image'lar saqlanadigan ulkan onlayn ombor (registry). Bu xuddi npm (JavaScript kutubxonalari uchun) yoki App Store (ilovalar uchun) kabi. U yerda minglab tayyor image'lar bor." },
        { ul: [
          "<code>node</code> — Node.js o'rnatilgan tayyor muhit;",
          "<code>nginx</code> — mashhur veb-server;",
          "<code>postgres</code>, <code>mysql</code>, <code>mongo</code> — ma'lumotlar bazalari;",
          "<code>ubuntu</code>, <code>alpine</code> — asosiy operatsion tizim image'lari."
        ] },
        { p: "Bu image'larni <code>docker pull</code> buyrug'i bilan yuklab olib, darhol ishlatishingiz mumkin. Ya'ni PostgreSQL ma'lumotlar bazasini o'rnatish uchun uni qo'lda sozlashingiz shart emas — Docker Hub'dan tayyor image'ni olib, bitta buyruq bilan ishga tushirasiz." },
        { note: "Docker Hub manzili — <a href=\"https://hub.docker.com\">hub.docker.com</a>. U yerdan image nomlarini qidirib topishingiz mumkin. Ko'pchilik image'lar bepul va ochiq." },

        { h2: "Nega Docker foydali?" },
        { p: "Endi Docker qanday amaliy foyda berishini umumlashtiraylik:" },
        { ul: [
          "<strong>Bir xillik:</strong> ilova har qanday joyda (noutbuk, server, bulut) bir xil ishlaydi — 'mening kompyuterimda ishlaydi' muammosi yo'qoladi;",
          "<strong>Tez sozlash:</strong> yangi loyihaga qo'shilgan hamkasb bitta buyruq bilan butun muhitni ishga tushira oladi;",
          "<strong>Izolyatsiya:</strong> har bir ilova o'z konteynerida — biri ikkinchisiga xalaqit bermaydi, versiyalar to'qnashmaydi;",
          "<strong>Yengillik:</strong> konteynerlar VM'dan ancha yengil va tez;",
          "<strong>Tozalik:</strong> konteynerni o'chirsangiz, hech qanday iz qolmaydi — kompyuteringiz 'iflos' bo'lmaydi."
        ] },
        { p: "Ayniqsa veb-dasturlashda Docker keng qo'llaniladi: backend, ma'lumotlar bazasi, kesh va boshqa xizmatlar — hammasi alohida konteynerlarda ishga tushiriladi va bir-biri bilan bog'lanadi." },

        { h2: "Xulosa" },
        { ul: [
          "Docker 'mening kompyuterimda ishlaydi' muammosini hal qiladi — ilovani hamma joyda bir xil ishlashini ta'minlaydi;",
          "<strong>Konteyner</strong> — ilova va uning barcha bog'liqliklarini o'z ichiga olgan yengil, izolyatsiyalangan paket;",
          "Konteyner asosiy OS o'zagini baham ko'radi, VM esa to'liq alohida OS ko'taradi — shuning uchun konteyner yengilroq va tezroq;",
          "<strong>Image</strong> — o'zgarmas shablon (klass kabi), <strong>container</strong> — undan ishga tushirilgan tirik nusxa (obyekt kabi);",
          "<strong>Docker Hub</strong> — tayyor image'lar ombori (npm yoki App Store kabi);",
          "Docker bir xillik, tez sozlash, izolyatsiya va tozalik keltiradi."
        ] }
      ]
    },

    {
      slug: "docker-ornatish",
      title: "Docker o'rnatish va birinchi konteyner",
      blurb: "Docker'ni o'rnatish (Desktop va Linux engine), versiyani tekshirish, hello-world, nginx va ubuntu bilan birinchi konteynerlar hamda -d, -p, --name bayroqlari.",
      body: [
        { lead: "Nazariyani bildik — endi amalga o'tamiz. Ushbu darsda Docker'ni kompyuteringizga o'rnatishni, uning ishlayotganini tekshirishni va birinchi konteynerlaringizni ishga tushirishni o'rganamiz. Barcha buyruqlarni o'z terminalingizda sinab ko'ring." },

        { h2: "Docker'ni o'rnatish" },
        { p: "O'rnatish operatsion tizimga bog'liq. Ikkita asosiy yo'l bor:" },
        { ul: [
          "<strong>Windows va macOS:</strong> <strong>Docker Desktop</strong> dasturini o'rnatasiz. Bu grafik interfeysli qulay dastur bo'lib, Docker'ning barcha imkoniyatlarini o'z ichiga oladi. Uni <a href=\"https://www.docker.com/products/docker-desktop\">docker.com</a> saytidan yuklab olasiz.",
          "<strong>Linux:</strong> odatda <strong>Docker Engine</strong> to'g'ridan-to'g'ri paket menejeri orqali o'rnatiladi (Desktop ham mavjud, ammo shart emas)."
        ] },
        { p: "Ubuntu/Debian kabi Linux tizimlarida rasmiy skript orqali o'rnatish eng oson usul:" },
        { code: "# Rasmiy o'rnatish skriptini yuklab, ishga tushirish\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh\n\n# O'zingizni docker guruhiga qo'shish (sudo'siz ishlatish uchun)\nsudo usermod -aG docker $USER" },
        { note: "Linux'da <code>usermod</code> buyrug'idan so'ng tizimdan chiqib, qayta kirishingiz (yoki qayta yuklashingiz) kerak — shundagina docker buyruqlarini <code>sudo</code>siz ishlatasiz. Windows/macOS'da Docker Desktop'ni o'rnatib, ishga tushirish kifoya." },

        { h2: "Docker ishlayotganini tekshirish" },
        { p: "O'rnatilgach, birinchi ish — Docker to'g'ri o'rnatilganini tekshirish. Buning uchun versiyasini so'raymiz:" },
        { code: "docker --version" },
        { p: "Agar hammasi joyida bo'lsa, taxminan shunday javob ko'rasiz:" },
        { code: "Docker version 27.3.1, build ce12230" },
        { p: "Batafsilroq ma'lumot uchun <code>docker info</code> buyrug'ini ham ishlatish mumkin — u o'rnatilgan Docker haqidagi to'liq holatni ko'rsatadi." },
        { warn: "Agar <em>'Cannot connect to the Docker daemon'</em> kabi xatolik chiqsa, bu Docker fon xizmati (daemon) ishlamayotganini bildiradi. Windows/macOS'da Docker Desktop dasturini ishga tushiring; Linux'da <code>sudo systemctl start docker</code> buyrug'ini bering." },

        { h2: "Birinchi konteyner: hello-world" },
        { p: "Docker o'rnatilganini tekshirishning rasmiy usuli — maxsus <code>hello-world</code> image'ini ishga tushirish. Bu kichkina image faqat bitta xabar chiqarib, tugaydi:" },
        { code: "docker run hello-world" },
        { p: "Bu buyruq quyidagilarni bajaradi: avval mahalliy kompyuterda <code>hello-world</code> image'ini qidiradi, topilmasa Docker Hub'dan avtomatik yuklab oladi, so'ng undan konteyner yaratib ishga tushiradi. Natijada shunday xabar ko'rasiz:" },
        { code: "Hello from Docker!\nThis message shows that your installation appears to be working correctly.\n..." },
        { tip: "<code>docker run</code> — Docker'dagi eng muhim buyruq. U ikki ishni birga bajaradi: agar kerak bo'lsa image'ni yuklab oladi (<code>pull</code>) va undan konteyner yaratib ishga tushiradi (<code>create</code> + <code>start</code>)." },

        { h2: "Ubuntu konteynerini ishga tushirish" },
        { p: "Endi haqiqiy operatsion tizim konteynerini sinab ko'ramiz. Ubuntu image'ini ishga tushirib, uning ichiga kirib, buyruqlar bera olamiz. Buning uchun <code>-it</code> bayroqlaridan foydalanamiz (interaktiv terminal):" },
        { code: "docker run -it ubuntu bash" },
        { p: "Bu buyruq Ubuntu konteynerini ishga tushiradi va sizni uning ichidagi <code>bash</code> terminaliga olib kiradi. Endi siz konteyner <em>ichida</em>siz — bu izolyatsiyalangan alohida Linux muhiti:" },
        { code: "root@a1b2c3d4:/# ls\nbin  boot  dev  etc  home  lib  ...\nroot@a1b2c3d4:/# cat /etc/os-release\nNAME=\"Ubuntu\"\n...\nroot@a1b2c3d4:/# exit" },
        { p: "<code>exit</code> buyrug'i konteynerdan chiqadi va konteyner to'xtaydi. Diqqat: bu Ubuntu asosiy kompyuteringizdan butunlay ajratilgan — unda o'zgartirilgan narsalar sizning tizimingizga ta'sir qilmaydi." },

        { h2: "Nginx veb-serverini ishga tushirish" },
        { p: "Endi haqiqiy foydali misol — <code>nginx</code> veb-serverini konteynerda ishga tushiramiz. Bunda bir nechta muhim bayroqlarni ishlatamiz:" },
        { code: "docker run -d -p 8080:80 --name mening-serverim nginx" },
        { p: "Bu buyruqni bo'laklarga ajratamiz:" },
        { ul: [
          "<code>-d</code> — konteynerni <strong>fonda</strong> (detached) ishga tushiradi, terminalni band qilmaydi;",
          "<code>-p 8080:80</code> — <strong>portni bog'laydi</strong>: kompyuteringizning 8080-portini konteynerning 80-portiga ulaydi;",
          "<code>--name mening-serverim</code> — konteynerga <strong>nom</strong> beradi (aks holda tasodifiy nom beriladi);",
          "<code>nginx</code> — ishlatiladigan image nomi."
        ] },
        { p: "Endi brauzeringizda <code>http://localhost:8080</code> manzilini ochsangiz, nginx'ning standart sahifasini ko'rasiz. Konteyner fonda ishlab turadi. Uni to'xtatish uchun:" },
        { code: "docker stop mening-serverim" },

        { h2: "Asosiy bayroqlar: -d, -p, --name" },
        { p: "Yuqorida ishlatgan uchta bayroq amalda eng ko'p uchraydi. Ularni yaxshi eslab qoling:" },
        { ul: [
          "<code>-d</code> (detached) — konteyner fonda ishlaydi. Bu bayroqsiz konteyner terminalni egallab turadi va uni yopsangiz konteyner ham to'xtaydi;",
          "<code>-p host:container</code> (publish) — konteyner ichidagi portni tashqi dunyoga ochadi. Chapdagi raqam — kompyuteringiz porti, o'ngdagi — konteyner porti;",
          "<code>--name nom</code> — konteynerga tushunarli nom beradi. Keyinchalik unga shu nom orqali murojaat qilasiz (to'xtatish, o'chirish va h.k.)."
        ] },
        { note: "Port bog'lash (<code>-p</code>) muhim tushuncha: konteyner izolyatsiyalangani sababli, uning ichidagi xizmatga tashqaridan kirish uchun portni maxsus 'ochish' kerak. <code>-p 8080:80</code> degani — <em>'kompyuterimning 8080-portiga kelgan so'rovni konteynerning 80-portiga yubor'</em>." },

        { h2: "Xulosa" },
        { ul: [
          "Windows/macOS uchun <strong>Docker Desktop</strong>, Linux uchun <strong>Docker Engine</strong> o'rnatiladi;",
          "<code>docker --version</code> — o'rnatilganini tekshiradi, <code>docker run hello-world</code> — ishlashini sinaydi;",
          "<code>docker run -it ubuntu bash</code> — konteyner ichiga interaktiv kirish imkonini beradi;",
          "<code>docker run -d -p 8080:80 --name nom nginx</code> — nginx serverini fonda, port bog'lab ishga tushiradi;",
          "<code>-d</code> — fonda ishlash, <code>-p</code> — port bog'lash, <code>--name</code> — nom berish."
        ] }
      ]
    },

    {
      slug: "docker-buyruqlar",
      title: "Asosiy Docker buyruqlari",
      blurb: "Kundalik ishda kerak bo'ladigan buyruqlar: ps, images, pull, run bayroqlari (-d -p -e -v --name), stop/start/rm, rmi, exec -it va logs.",
      body: [
        { lead: "Docker bilan samarali ishlash uchun bir nechta asosiy buyruqni bilish kifoya. Ushbu darsda konteyner va image'larni ko'rish, ishga tushirish, to'xtatish va o'chirish uchun kerak bo'ladigan barcha buyruqlarni misollar bilan o'rganamiz. Bu darsni ko'proq amaliyot bilan mustahkamlang." },

        { h2: "docker ps — ishlab turgan konteynerlar" },
        { p: "<code>docker ps</code> buyrug'i ayni paytda <strong>ishlab turgan</strong> konteynerlar ro'yxatini ko'rsatadi:" },
        { code: "docker ps" },
        { code: "CONTAINER ID   IMAGE   COMMAND                  STATUS         PORTS                  NAMES\na1b2c3d4e5f6   nginx   \"/docker-entrypoint.\"   Up 5 minutes   0.0.0.0:8080->80/tcp   mening-serverim" },
        { p: "Har bir konteyner haqida ID, image nomi, holati, portlari va nomi ko'rsatiladi. Ammo bu faqat ishlab turgan konteynerlarni beradi. To'xtatilganlarini ham ko'rish uchun <code>-a</code> (all) bayrog'ini qo'shamiz:" },
        { code: "docker ps -a" },
        { p: "<code>-a</code> bilan barcha konteynerlar ko'rinadi — ishlab turganlari ham, to'xtaganlari ham. Bu ayniqsa xatoliklarni topishda foydali: konteyner darhol to'xtab qolган bo'lsa, uni faqat <code>-a</code> bilan ko'rasiz." },

        { h2: "docker images — mavjud image'lar" },
        { p: "Kompyuteringizga yuklab olingan image'lar ro'yxatini ko'rish uchun:" },
        { code: "docker images" },
        { code: "REPOSITORY   TAG       IMAGE ID       CREATED        SIZE\nnginx        latest    a1b2c3d4e5f6   2 weeks ago    187MB\nnode         20        f6e5d4c3b2a1   3 weeks ago    1.1GB\nubuntu       latest    1a2b3c4d5e6f   1 month ago    77.9MB" },
        { p: "Bu yerda image nomi (REPOSITORY), versiyasi (TAG), noyob ID'si, yaratilgan vaqti va hajmi ko'rinadi. <code>TAG</code> — bu versiya belgisi. Agar tag ko'rsatilmasa, standart holatda <code>latest</code> ishlatiladi." },

        { h2: "docker pull — image yuklab olish" },
        { p: "Image'ni oldindan yuklab olish uchun <code>docker pull</code> ishlatiladi. Odatda <code>docker run</code> buni avtomatik qiladi, ammo ba'zan image'ni oldindan tayyorlab qo'yish qulay:" },
        { code: "# Standart (latest) versiyasini yuklash\ndocker pull nginx\n\n# Aniq versiyasini yuklash\ndocker pull node:20\ndocker pull postgres:16" },
        { tip: "Ishlab chiqarishda (production) doim <strong>aniq versiya</strong> (tag) ko'rsating, masalan <code>node:20</code>, <code>latest</code> emas. Chunki <code>latest</code> vaqt o'tishi bilan o'zgaradi va ilovangiz kutilmaganda buzilishi mumkin." },

        { h2: "docker run — konteyner ishga tushirish va bayroqlari" },
        { p: "<code>docker run</code> — asosiy buyruq. Uning eng muhim bayroqlari:" },
        { ul: [
          "<code>-d</code> — fonda (detached) ishga tushirish;",
          "<code>-p host:container</code> — port bog'lash;",
          "<code>-e KALIT=qiymat</code> — muhit o'zgaruvchisi (environment variable) berish;",
          "<code>-v host_yo'l:container_yo'l</code> — papka yoki volume ulash (ma'lumotni saqlash);",
          "<code>--name nom</code> — konteynerga nom berish;",
          "<code>--rm</code> — konteyner to'xtagach, uni avtomatik o'chirish."
        ] },
        { p: "Barcha bayroqlarni birlashtirgan to'liq misol — PostgreSQL ma'lumotlar bazasini ishga tushirish:" },
        { code: "docker run -d \\\n  --name mening-bazam \\\n  -e POSTGRES_PASSWORD=maxfiy123 \\\n  -e POSTGRES_DB=dukon \\\n  -p 5432:5432 \\\n  -v baza-malumoti:/var/lib/postgresql/data \\\n  postgres:16" },
        { p: "Bu yerda: <code>-e</code> orqali parol va baza nomi beriladi, <code>-p</code> orqali port ochiladi, <code>-v</code> orqali ma'lumot saqlanadigan volume ulanadi. Endi PostgreSQL fonda ishlab turadi." },
        { note: "<code>-e</code> (environment) juda muhim: ko'plab image'lar o'z sozlamalarini muhit o'zgaruvchilari orqali oladi. Masalan, <code>postgres</code> image'i parolni <code>POSTGRES_PASSWORD</code> orqali kutadi. Har bir image hujjatida qanday o'zgaruvchilar kerakligi yozilgan." },

        { h2: "docker stop / start / rm — boshqarish" },
        { p: "Konteynerlarni to'xtatish, qayta ishga tushirish va o'chirish uchun quyidagi buyruqlar ishlatiladi:" },
        { code: "# Konteynerni to'xtatish\ndocker stop mening-serverim\n\n# To'xtatilgan konteynerni qayta ishga tushirish\ndocker start mening-serverim\n\n# Konteynerni butunlay o'chirish (avval to'xtatilgan bo'lishi kerak)\ndocker rm mening-serverim\n\n# Ishlab turgan konteynerni majburan o'chirish\ndocker rm -f mening-serverim" },
        { p: "Muhim farq: <code>stop</code> konteynerni <em>to'xtatadi</em>, ammo o'chirmaydi — u <code>docker ps -a</code>da qoladi va qayta ishga tushirilishi mumkin. <code>rm</code> esa konteynerni <em>butunlay</em> yo'q qiladi." },
        { warn: "<code>docker rm</code> bilan o'chirilgan konteyner ichidagi ma'lumotlar (agar volume ishlatilmagan bo'lsa) <strong>butunlay yo'qoladi</strong>. Muhim ma'lumotni doim volume orqali saqlang — bu haqda alohida darsda gaplashamiz." },

        { h2: "docker rmi — image o'chirish" },
        { p: "Endi keraksiz image'ni o'chirish. Diqqat: bu <code>rm</code> emas, <code>rmi</code> (remove image):" },
        { code: "# Image'ni nomi bilan o'chirish\ndocker rmi nginx\n\n# Image'ni ID orqali o'chirish\ndocker rmi a1b2c3d4e5f6" },
        { warn: "Agar image'dan foydalanayotgan konteynerlar mavjud bo'lsa, <code>docker rmi</code> xatolik beradi. Avval o'sha konteynerlarni o'chirishingiz kerak. Keraksiz image'lar diskda ko'p joy egallaydi, shuning uchun vaqti-vaqti bilan tozalab turing." },

        { h2: "docker exec -it — ishlab turgan konteynerga kirish" },
        { p: "Ba'zan ishlab turgan konteyner ichiga kirib, buyruq berish kerak bo'ladi (masalan, xatolikni tekshirish yoki fayllarni ko'rish uchun). Buning uchun <code>docker exec</code> ishlatiladi:" },
        { code: "docker exec -it mening-serverim bash" },
        { p: "Bu buyruq ishlab turgan <code>mening-serverim</code> konteyneri ichida interaktiv <code>bash</code> terminalini ochadi. Endi siz konteyner ichidasiz va uning fayl tizimini ko'rishingiz mumkin. Chiqish uchun <code>exit</code> yozing." },
        { p: "<code>-it</code> ikkita bayroqning birlashmasi: <code>-i</code> (interactive) — kiritishga imkon beradi, <code>-t</code> (tty) — terminal muhitini yaratadi. Ular deyarli doim birga ishlatiladi." },
        { tip: "Ba'zi yengil image'larda (masalan, <code>alpine</code>) <code>bash</code> bo'lmaydi. Bunday holatda <code>sh</code> ishlatiladi: <code>docker exec -it konteyner sh</code>." },

        { h2: "docker logs — konteyner jurnallari" },
        { p: "Fonda ishlab turgan konteyner nima qilayotganini, xatolar bor-yo'qligini ko'rish uchun uning jurnallarini (logs) o'qiymiz:" },
        { code: "# Barcha jurnallarni ko'rsatish\ndocker logs mening-serverim\n\n# Jonli kuzatish (yangi loglar chiqishi bilan ko'rsatiladi)\ndocker logs -f mening-serverim\n\n# Faqat oxirgi 50 qatorni ko'rsatish\ndocker logs --tail 50 mening-serverim" },
        { p: "<code>-f</code> (follow) bayrog'i jurnalni jonli kuzatadi — bu ilova ishlashini real vaqtda kuzatish uchun juda foydali. Kuzatishni to'xtatish uchun <code>Ctrl+C</code> bosing (bu konteynerni to'xtatmaydi, faqat kuzatishni tugatadi)." },
        { note: "<code>docker logs</code> — nosozliklarni tuzatishda (debugging) birinchi murojaat qiladigan buyruqingiz bo'lishi kerak. Konteyner darhol to'xtab qolsa, sababini deyarli har doim loglarda topasiz." },

        { h2: "Xulosa" },
        { ul: [
          "<code>docker ps</code> — ishlab turgan, <code>docker ps -a</code> — barcha konteynerlar;",
          "<code>docker images</code> — mavjud image'lar, <code>docker pull</code> — image yuklab olish;",
          "<code>docker run</code> bayroqlari: <code>-d</code> (fon), <code>-p</code> (port), <code>-e</code> (muhit), <code>-v</code> (volume), <code>--name</code> (nom);",
          "<code>docker stop/start</code> — to'xtatish/qayta ishga tushirish, <code>docker rm</code> — konteyner o'chirish, <code>docker rmi</code> — image o'chirish;",
          "<code>docker exec -it konteyner bash</code> — ishlab turgan konteynerga kirish;",
          "<code>docker logs -f</code> — jurnallarni jonli kuzatish, nosozliklarni topishda birinchi vosita."
        ] }
      ]
    },

    {
      slug: "dockerfile",
      title: "Dockerfile va o'z image'ingizni yaratish",
      blurb: "Dockerfile nima, asosiy ko'rsatmalar (FROM, WORKDIR, COPY, RUN, EXPOSE, CMD, ENV), docker build, qatlamlar va kesh, .dockerignore hamda Node.js ilova uchun namuna.",
      body: [
        { lead: "Shu paytgacha biz tayyor image'lardan foydalandik. Endi o'z ilovamiz uchun <strong>o'zimizning image</strong>'imizni yaratishni o'rganamiz. Buning uchun <strong>Dockerfile</strong> deb ataladigan maxsus matnli fayl yoziladi. Ushbu dars — Docker'ni real loyihada ishlatishning eng muhim qismi." },

        { h2: "Dockerfile nima?" },
        { p: "<strong>Dockerfile</strong> — bu image qanday yaratilishini bosqichma-bosqich tavsiflovchi matnli fayl. Uni retsept deb tasavvur qiling: 'avval bunday asos oling, so'ng bu fayllarni qo'shing, keyin bu buyruqni bajaring...'. Docker shu retseptni o'qib, image yaratadi." },
        { p: "Fayl aynan <code>Dockerfile</code> deb nomlanadi (kengaytmasiz) va loyiha papkasining ildizida joylashadi. Ichida har bir qatorda bitta <strong>ko'rsatma (instruction)</strong> — katta harflar bilan yozilgan buyruq va uning argumentlari bo'ladi." },

        { h2: "FROM — asos image" },
        { p: "Har bir Dockerfile <code>FROM</code> ko'rsatmasidan boshlanadi. U qaysi <strong>asos image</strong>'dan foydalanishni belgilaydi — ya'ni nol nuqta o'rniga tayyor muhitdan boshlaymiz:" },
        { code: "FROM node:20" },
        { p: "Bu qator: 'Node.js 20 o'rnatilgan tayyor image'ni asos qilib ol' degani. Endi bizda Node.js ishlaydigan muhit bor va uning ustiga o'z kodimizni qo'shamiz. Har doim <code>FROM</code> birinchi ko'rsatma bo'lishi kerak." },
        { tip: "Yengilroq image'lar uchun ko'pincha <code>alpine</code> variantini tanlashadi, masalan <code>FROM node:20-alpine</code>. Alpine — juda ixcham Linux distributivi bo'lib, image hajmini bir necha barobar kamaytiradi." },

        { h2: "WORKDIR — ish papkasi" },
        { p: "<code>WORKDIR</code> konteyner ichidagi <strong>ishchi papka</strong>ni belgilaydi. Undan keyingi barcha buyruqlar shu papkada bajariladi. Agar papka mavjud bo'lmasa, avtomatik yaratiladi:" },
        { code: "WORKDIR /app" },
        { p: "Endi barcha keyingi <code>COPY</code>, <code>RUN</code> va boshqa ko'rsatmalar <code>/app</code> papkasida ishlaydi. Bu tartibni saqlaydi — kod har doim ma'lum bir joyda bo'ladi." },

        { h2: "COPY — fayllarni ko'chirish" },
        { p: "<code>COPY</code> ko'rsatmasi fayllarni sizning kompyuteringizdan (host) konteyner ichiga ko'chiradi:" },
        { code: "# package.json fayllarini ko'chirish\nCOPY package.json package-lock.json ./\n\n# Barcha loyiha fayllarini ko'chirish\nCOPY . ." },
        { p: "Sintaksis: <code>COPY manba maqsad</code>. Birinchi argument — kompyuteringizdagi yo'l, ikkinchisi — konteyner ichidagi yo'l (odatda <code>WORKDIR</code>'ga nisbatan). <code>COPY . .</code> degani — joriy papkadagi hamma narsani konteynerning ish papkasiga ko'chir." },

        { h2: "RUN — buyruq bajarish (build vaqtida)" },
        { p: "<code>RUN</code> image <em>yaratilayotganda</em> (build vaqtida) biror buyruqni bajaradi. Odatda kutubxonalarni o'rnatish uchun ishlatiladi:" },
        { code: "RUN npm install" },
        { p: "Bu ko'rsatma image quriladigan payt <code>npm install</code>ni ishga tushirib, barcha bog'liqliklarni o'rnatadi. Natija image ichida saqlanadi — ya'ni konteyner ishga tushganda kutubxonalar allaqachon o'rnatilgan bo'ladi." },
        { warn: "<code>RUN</code> va <code>CMD</code>ni chalkashtirmang! <code>RUN</code> — image <strong>yaratilayotganda</strong> (bir marta) bajariladi. <code>CMD</code> — konteyner <strong>ishga tushganda</strong> bajariladi. <code>RUN npm install</code> — o'rnatish, <code>CMD npm start</code> — ilovani ishga tushirish." },

        { h2: "ENV — muhit o'zgaruvchilari" },
        { p: "<code>ENV</code> image ichida muhit o'zgaruvchilarini o'rnatadi:" },
        { code: "ENV NODE_ENV=production\nENV PORT=3000" },
        { p: "Bu o'zgaruvchilar konteyner ichidagi ilova uchun mavjud bo'ladi. Node.js'da ularni <code>process.env.NODE_ENV</code> orqali o'qishingiz mumkin. Bu sozlamalarni koddan ajratib olishning qulay usuli." },

        { h2: "EXPOSE — portni e'lon qilish" },
        { p: "<code>EXPOSE</code> konteyner qaysi portda ishlashini <strong>hujjatlashtiradi</strong>:" },
        { code: "EXPOSE 3000" },
        { note: "Muhim nozik nuqta: <code>EXPOSE</code> o'zi portni ochmaydi! U shunchaki hujjat sifatida 'bu ilova 3000-portda ishlaydi' deb belgilaydi. Portni haqiqatan ochish uchun konteynerni ishga tushirganda <code>-p 3000:3000</code> bayrog'ini berishingiz kerak." },

        { h2: "CMD — konteyner ishga tushganda bajariladigan buyruq" },
        { p: "<code>CMD</code> — konteyner ishga tushganda bajariladigan <strong>asosiy buyruq</strong>. Odatda ilovani ishga tushirish buyrug'i:" },
        { code: "CMD [\"npm\", \"start\"]" },
        { p: "Bu ko'rsatma konteyner har safar ishga tushganda <code>npm start</code>ni bajaradi. Dockerfile'da odatda faqat <strong>bitta</strong> <code>CMD</code> bo'ladi — u konteynerning asosiy vazifasini belgilaydi." },

        { h2: "To'liq Dockerfile namunasi (Node.js ilova)" },
        { p: "Endi barcha ko'rsatmalarni birlashtirib, oddiy Node.js ilova uchun to'liq Dockerfile yozamiz:" },
        { code: "# 1. Asos image — Node.js 20\nFROM node:20-alpine\n\n# 2. Ish papkasini belgilash\nWORKDIR /app\n\n# 3. Avval faqat package fayllarini ko'chirish (kesh uchun)\nCOPY package.json package-lock.json ./\n\n# 4. Kutubxonalarni o'rnatish\nRUN npm install\n\n# 5. Qolgan barcha kodni ko'chirish\nCOPY . .\n\n# 6. Muhit o'zgaruvchisi\nENV NODE_ENV=production\n\n# 7. Ilova ishlaydigan port\nEXPOSE 3000\n\n# 8. Konteyner ishga tushganda ishlaydigan buyruq\nCMD [\"npm\", \"start\"]" },
        { tip: "Diqqat qiling: biz avval faqat <code>package.json</code>ni ko'chirib, <code>npm install</code>ni bajaramiz, <strong>keyin</strong> qolgan kodni ko'chiramiz. Bu keshdan foydalanish uchun ataylab qilingan — buni quyida tushuntiramiz." },

        { h2: "docker build — image yaratish" },
        { p: "Dockerfile tayyor bo'lgach, undan image yaratish uchun <code>docker build</code> ishlatiladi:" },
        { code: "docker build -t mening-ilovam:1.0 ." },
        { ul: [
          "<code>-t mening-ilovam:1.0</code> — image'ga nom (tag) beradi: nomi <code>mening-ilovam</code>, versiyasi <code>1.0</code>;",
          "<code>.</code> (nuqta) — <strong>build konteksti</strong>, ya'ni Dockerfile va fayllar joylashgan joriy papka."
        ] },
        { p: "Yaratilgach, image'ni ishga tushirasiz:" },
        { code: "docker run -d -p 3000:3000 --name ilova mening-ilovam:1.0" },

        { h2: "Qatlamlar (layers) va kesh" },
        { p: "Docker image <strong>qatlamlardan (layers)</strong> tashkil topadi. Dockerfile'dagi har bir ko'rsatma (<code>FROM</code>, <code>COPY</code>, <code>RUN</code>...) alohida qatlam yaratadi. Docker bu qatlamlarni <strong>keshlaydi</strong> — ya'ni saqlab qoladi." },
        { p: "Qayta build qilganda, agar biror ko'rsatma va undan oldingi hamma narsa o'zgarmagan bo'lsa, Docker uni qayta bajarmaydi — keshdagi tayyor qatlamdan foydalanadi. Bu build'ni ancha tezlashtiradi." },
        { p: "Aynan shu sababli biz <code>package.json</code>ni alohida ko'chirdik: agar faqat kodni o'zgartirsangiz (lekin kutubxonalar o'zgarmasa), Docker <code>npm install</code> qatlamini keshdan oladi va uni qaytadan bajarmaydi. Bu vaqtni sezilarli tejaydi." },
        { note: "Kesh qoidasi: Docker Dockerfile'ni yuqoridan pastga bajaradi. Biror qatlam o'zgarsa, undan <strong>keyingi barcha</strong> qatlamlar qayta bajariladi. Shuning uchun kam o'zgaradigan narsalarni (bog'liqliklar) yuqoriga, tez-tez o'zgaradiganlarni (kod) pastga qo'yish maqsadga muvofiq." },

        { h2: ".dockerignore fayli" },
        { p: "<code>COPY . .</code> hamma narsani ko'chiradi — shu jumladan keraksiz fayllarni ham (masalan, <code>node_modules</code>, git fayllari). Ularni chetlab o'tish uchun loyiha ildizida <code>.dockerignore</code> fayli yaratiladi:" },
        { code: "node_modules\nnpm-debug.log\n.git\n.gitignore\n.env\nDockerfile\n*.md" },
        { p: "Bu <code>.gitignore</code>ga o'xshaydi: bu yerda ko'rsatilgan fayllar <code>COPY</code> vaqtida e'tiborga olinmaydi. Bu image hajmini kamaytiradi va build'ni tezlashtiradi. <code>node_modules</code>ni chetlab o'tish ayniqsa muhim — chunki u konteyner ichida <code>npm install</code> orqali qayta o'rnatiladi." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Dockerfile</strong> — image qanday yaratilishini tavsiflovchi matnli retsept;",
          "<code>FROM</code> — asos image, <code>WORKDIR</code> — ish papkasi, <code>COPY</code> — fayl ko'chirish;",
          "<code>RUN</code> — build vaqtida buyruq (o'rnatish), <code>CMD</code> — konteyner ishga tushganda buyruq (ishga tushirish);",
          "<code>ENV</code> — muhit o'zgaruvchilari, <code>EXPOSE</code> — portni hujjatlashtirish (o'zi ochmaydi);",
          "<code>docker build -t nom:versiya .</code> — Dockerfile'dan image yaratadi;",
          "Image <strong>qatlamlardan</strong> iborat va Docker ularni keshlaydi — kam o'zgaradigan narsalarni yuqoriga qo'ying;",
          "<code>.dockerignore</code> — keraksiz fayllarni ko'chirmaydi (image'ni kichraytiradi)."
        ] }
      ]
    },

    {
      slug: "docker-compose",
      title: "Docker Compose",
      blurb: "Bir nechta konteynerni birga boshqarish, docker-compose.yml tuzilishi (services, ports, volumes, environment, depends_on), compose up/down va Node + Postgres namunasi.",
      body: [
        { lead: "Real loyihalar odatda bir nechta xizmatdan iborat: veb-ilova, ma'lumotlar bazasi, kesh va boshqalar. Ularning har birini alohida <code>docker run</code> uzun buyruqlari bilan ishga tushirish noqulay va xatolarga to'la. <strong>Docker Compose</strong> aynan shu muammoni hal qiladi — bir nechta konteynerni bitta fayl orqali boshqaradi." },

        { h2: "Muammo: bir nechta konteynerni boshqarish" },
        { p: "Tasavvur qiling, loyihangizda Node.js ilova va PostgreSQL ma'lumotlar bazasi bor. Ularni Docker'da ishga tushirish uchun ikkita uzun buyruq yozishingiz kerak:" },
        { code: "docker run -d --name baza -e POSTGRES_PASSWORD=parol -v data:/var/lib/postgresql/data postgres:16\ndocker run -d --name ilova -p 3000:3000 -e DB_HOST=baza mening-ilovam" },
        { p: "Bu buyruqlar uzun, eslab qolish qiyin va har safar qo'lda yozish kerak. Bundan tashqari, ularni to'g'ri tartibda ishga tushirish, tarmoqni sozlash kabi qo'shimcha ishlar bor. Xizmatlar ko'paygan sari bu boshqarib bo'lmas holga keladi." },

        { h2: "Yechim: docker-compose.yml" },
        { p: "<strong>Docker Compose</strong> — barcha xizmatlarni bitta <code>docker-compose.yml</code> fayli (YAML formatida) da tavsiflashga imkon beradi. So'ng bitta buyruq bilan hammasini birga ishga tushirasiz." },
        { note: "<strong>YAML</strong> — bu sozlamalar uchun ishlatiladigan oddiy matn formati. Unda <strong>chekinish (indentation, bo'sh joylar)</strong> juda muhim — u tuzilmani belgilaydi. Tab emas, <strong>bo'sh joy (probel)</strong> ishlating. Odatda ikki probel bilan chekinadi." },

        { h2: "docker-compose.yml tuzilishi" },
        { p: "Fayl asosan <code>services</code> (xizmatlar) bo'limidan iborat. Har bir xizmat — bu bitta konteyner. Sodda misol:" },
        { code: "services:\n  web:\n    image: nginx\n    ports:\n      - \"8080:80\"" },
        { p: "Bu <code>web</code> nomli xizmatni belgilaydi: u <code>nginx</code> image'idan yaratiladi va 8080-port 80-portga bog'lanadi. Bu <code>docker run -p 8080:80 nginx</code> buyrug'ining fayldagi ko'rinishi." },

        { h2: "Asosiy sozlamalar" },
        { p: "Har bir xizmat uchun ishlatiladigan asosiy sozlamalar:" },
        { ul: [
          "<code>image</code> — ishlatiladigan tayyor image (masalan <code>postgres:16</code>);",
          "<code>build</code> — image'ni yaratish uchun Dockerfile yo'li (image o'rniga);",
          "<code>ports</code> — port bog'lash ro'yxati (<code>-p</code> bayrog'iga teng);",
          "<code>environment</code> — muhit o'zgaruvchilari (<code>-e</code> bayrog'iga teng);",
          "<code>volumes</code> — ma'lumot saqlash uchun ulanishlar (<code>-v</code> bayrog'iga teng);",
          "<code>depends_on</code> — bu xizmat qaysi boshqa xizmatlarga bog'liqligini bildiradi (ishga tushirish tartibi)."
        ] },

        { h2: "To'liq namuna: Node + Postgres" },
        { p: "Endi haqiqiy misol — Node.js ilova va PostgreSQL bazasidan iborat loyiha uchun to'liq <code>docker-compose.yml</code>:" },
        { code: "services:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=production\n      - DB_HOST=db\n      - DB_USER=admin\n      - DB_PASSWORD=maxfiy123\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16\n    environment:\n      - POSTGRES_USER=admin\n      - POSTGRES_PASSWORD=maxfiy123\n      - POSTGRES_DB=dukon\n    volumes:\n      - baza-malumoti:/var/lib/postgresql/data\n    ports:\n      - \"5432:5432\"\n\nvolumes:\n  baza-malumoti:" },
        { p: "Bu faylni bo'laklarga ajratamiz:" },
        { ul: [
          "<strong>web</strong> xizmati: joriy papkadagi Dockerfile'dan yaratiladi (<code>build: .</code>), 3000-port ochiladi, muhit o'zgaruvchilari beriladi va u <code>db</code> xizmatiga bog'liq;",
          "<strong>db</strong> xizmati: <code>postgres:16</code> image'idan, parol va baza nomi bilan, ma'lumot volume'da saqlanadi;",
          "pastdagi <code>volumes:</code> bo'limi — nomli volume'ni e'lon qiladi (bu haqda keyingi darsda)."
        ] },
        { tip: "Diqqat qiling: <code>web</code> xizmatida <code>DB_HOST=db</code> deb yozdik — <strong>db</strong>! Bu ma'lumotlar bazasi xizmatining nomi. Compose xizmatlarni bir tarmoqqa ulaydi va ularni <strong>nomi orqali</strong> topish mumkin. IP manzil kerak emas — shunchaki xizmat nomini yozasiz." },

        { h2: "compose up va down buyruqlari" },
        { p: "Fayl tayyor bo'lgach, barcha xizmatlarni <strong>birga</strong> ishga tushirish uchun:" },
        { code: "docker compose up -d" },
        { p: "Bu buyruq <code>docker-compose.yml</code>ni o'qib, barcha xizmatlarni to'g'ri tartibda ishga tushiradi. <code>-d</code> — fonda ishlash uchun. Compose kerak bo'lgan image'larni yuklaydi, tarmoqni yaratadi va konteynerlarni ishga tushiradi — hammasi bitta buyruq bilan." },
        { p: "Ishlab turgan xizmatlarni ko'rish va jurnallarni kuzatish:" },
        { code: "# Xizmatlar holatini ko'rish\ndocker compose ps\n\n# Barcha xizmatlar jurnalini kuzatish\ndocker compose logs -f" },
        { p: "Hammasini to'xtatib, o'chirish uchun:" },
        { code: "# Konteynerlarni to'xtatib, o'chirish\ndocker compose down\n\n# Volume'lar bilan birga o'chirish (ma'lumot ham o'chadi!)\ndocker compose down -v" },
        { warn: "<code>docker compose down -v</code> — <code>-v</code> bayrog'i volume'larni ham o'chiradi, ya'ni ma'lumotlar bazasidagi <strong>barcha ma'lumot yo'qoladi</strong>. Oddiy <code>down</code> volume'ga tegmaydi. Ishlab turgan loyihada <code>-v</code>ni ehtiyotkorlik bilan ishlating." },

        { h2: "docker compose va docker-compose" },
        { note: "Ikki xil yozuv uchraydi: yangi versiyalarda <code>docker compose</code> (ikki so'z, bo'sh joy bilan), eski versiyalarda <code>docker-compose</code> (chiziqcha bilan) ishlatiladi. Ikkalasi ham deyarli bir xil ishlaydi; zamonaviy tavsiya — <code>docker compose</code> (bo'sh joyli)." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Docker Compose</strong> bir nechta konteynerni bitta fayl orqali boshqaradi;",
          "<code>docker-compose.yml</code> — YAML formatidagi fayl, unda chekinish (bo'sh joy) muhim;",
          "Har bir <code>services</code> ostidagi element — bitta konteyner (xizmat);",
          "Asosiy sozlamalar: <code>image</code>/<code>build</code>, <code>ports</code>, <code>environment</code>, <code>volumes</code>, <code>depends_on</code>;",
          "Xizmatlar bir-birini <strong>nomi orqali</strong> topadi (IP kerak emas) — masalan <code>DB_HOST=db</code>;",
          "<code>docker compose up -d</code> — hammasini ishga tushiradi, <code>docker compose down</code> — to'xtatib o'chiradi."
        ] }
      ]
    },

    {
      slug: "docker-volume-network",
      title: "Volume va tarmoq (network)",
      blurb: "Konteyner ma'lumoti yo'qolishi muammosi, volume va bind mount, docker volume buyruqlari, konteynerlararo tarmoq va xizmat nomi orqali ulanish.",
      body: [
        { lead: "Konteynerlar vaqtinchalik (ephemeral) — ularni o'chirsangiz, ichidagi ma'lumot ham yo'qoladi. Ma'lumotlar bazasi uchun bu falokat! Bu darsda ma'lumotni doimiy saqlash uchun <strong>volume</strong>'larni va konteynerlarni bir-biriga bog'lash uchun <strong>tarmoq (network)</strong>'ni o'rganamiz." },

        { h2: "Muammo: konteyner ma'lumoti yo'qoladi" },
        { p: "Konteyner ichida yozilgan har qanday ma'lumot konteynerning o'ziga tegishli. Konteynerni <code>docker rm</code> bilan o'chirsangiz — u ma'lumot bilan birga <strong>butunlay yo'qoladi</strong>." },
        { p: "Buni tasavvur qiling: PostgreSQL konteynerida foydalanuvchilar bazasi bor. Konteynerni yangilash yoki qayta yaratish uchun o'chirdingiz — va barcha foydalanuvchilar ma'lumoti ketdi. Bu qabul qilib bo'lmas holat." },
        { warn: "Konteyner ichidagi fayl tizimi <strong>vaqtinchalik</strong>. Ma'lumotlar bazasi, yuklangan fayllar, foydalanuvchi kontenti kabi <em>doimiy</em> saqlanishi kerak bo'lgan narsalarni hech qachon shunchaki konteyner ichida qoldirmang." },

        { h2: "Yechim: volume (hajm)" },
        { p: "<strong>Volume</strong> — bu Docker boshqaradigan, konteynerdan <em>tashqarida</em> saqlanadigan ma'lumot ombori. Konteynerni o'chirsangiz ham, volume va undagi ma'lumot saqlanib qoladi. Yangi konteyner o'sha volume'ga ulanib, avvalgi ma'lumotni davom ettira oladi." },
        { p: "Volume'ni konteynerga ulash uchun <code>-v</code> bayrog'i ishlatiladi:" },
        { code: "docker run -d \\\n  --name baza \\\n  -e POSTGRES_PASSWORD=parol \\\n  -v baza-malumoti:/var/lib/postgresql/data \\\n  postgres:16" },
        { p: "Bu yerda <code>-v baza-malumoti:/var/lib/postgresql/data</code> degani: <code>baza-malumoti</code> nomli volume'ni konteynerning <code>/var/lib/postgresql/data</code> papkasiga ula. PostgreSQL o'z ma'lumotini shu papkaga yozadi — endi u volume'da, xavfsiz saqlanadi. Konteynerni o'chirib, qayta yaratsangiz ham ma'lumot joyida qoladi." },

        { h2: "Volume va bind mount farqi" },
        { p: "Ma'lumot saqlashning ikki asosiy usuli bor:" },
        { ul: [
          "<strong>Nomli volume (named volume):</strong> Docker boshqaradi, maxsus joyda saqlanadi. Masalan <code>-v baza-malumoti:/data</code>. Ma'lumotlar bazasi uchun ideal;",
          "<strong>Bind mount:</strong> kompyuteringizdagi aniq papkani konteynerga ulaydi. Masalan <code>-v /home/user/loyiha:/app</code>. Dasturlash paytida kodni jonli tahrirlash uchun qulay."
        ] },
        { p: "Farqni sintaksisdan bilish mumkin: agar chap tomonda <strong>oddiy nom</strong> bo'lsa — bu volume; agar <strong>yo'l (/ bilan boshlanadi)</strong> bo'lsa — bu bind mount:" },
        { code: "# Nomli volume (Docker boshqaradi)\ndocker run -v mening-volumeim:/app/data ...\n\n# Bind mount (kompyuterdagi aniq papka)\ndocker run -v /home/user/loyiha:/app ...\n\n# Joriy papkani ulash ($(pwd) — joriy papka yo'li)\ndocker run -v $(pwd):/app ..." },
        { tip: "Dasturlash paytida bind mount juda foydali: kompyuteringizda kodni o'zgartirasiz, u darhol konteynerda aks etadi — image'ni qayta build qilish shart emas. Ishlab chiqarish (production) va ma'lumotlar bazalari uchun esa nomli volume afzal." },

        { h2: "docker volume buyruqlari" },
        { p: "Volume'larni boshqarish uchun quyidagi buyruqlar bor:" },
        { code: "# Barcha volume'lar ro'yxati\ndocker volume ls\n\n# Yangi volume yaratish\ndocker volume create mening-volumeim\n\n# Volume haqida batafsil ma'lumot\ndocker volume inspect mening-volumeim\n\n# Volume'ni o'chirish\ndocker volume rm mening-volumeim\n\n# Ishlatilmayotgan barcha volume'larni tozalash\ndocker volume prune" },
        { warn: "<code>docker volume rm</code> va <code>docker volume prune</code> volume'dagi ma'lumotni <strong>butunlay o'chiradi</strong> va uni tiklab bo'lmaydi. Muhim ma'lumot volume'larini o'chirishdan oldin ikki marta tekshiring." },

        { h2: "Muammo: konteynerlar bir-birini qanday topadi?" },
        { p: "Endi tarmoqqa o'tamiz. Web-ilova konteyneri ma'lumotlar bazasi konteyneriga qanday ulanadi? Ular alohida, izolyatsiyalangan. IP manzillar esa konteyner har qayta ishga tushganda o'zgaradi — shuning uchun IP'ga tayanish ishonchsiz." },
        { p: "Yechim — konteynerlarni bitta <strong>tarmoq (network)</strong>ga ulash. Bir tarmoqdagi konteynerlar bir-birini <strong>nomi orqali</strong> topa oladi." },

        { h2: "docker network — tarmoq yaratish" },
        { p: "Maxsus tarmoq yaratib, konteynerlarni unga ulaymiz:" },
        { code: "# Yangi tarmoq yaratish\ndocker network create mening-tarmogim\n\n# Barcha tarmoqlarni ko'rish\ndocker network ls" },
        { p: "Endi ikkala konteynerni shu tarmoqqa ulab ishga tushiramiz. Bunda <code>--network</code> bayrog'i ishlatiladi:" },
        { code: "# Ma'lumotlar bazasini tarmoqqa ulash\ndocker run -d \\\n  --name baza \\\n  --network mening-tarmogim \\\n  -e POSTGRES_PASSWORD=parol \\\n  postgres:16\n\n# Web-ilovani o'sha tarmoqqa ulash\ndocker run -d \\\n  --name web \\\n  --network mening-tarmogim \\\n  -e DB_HOST=baza \\\n  -p 3000:3000 \\\n  mening-ilovam" },

        { h2: "Xizmat nomi orqali ulanish" },
        { p: "Diqqat qiling: web-ilovaga <code>DB_HOST=baza</code> deb berdik — bu ma'lumotlar bazasi konteynerining <strong>nomi</strong>. Bir tarmoqdagi konteynerlar bir-birini nomi orqali topa oladi." },
        { p: "Ya'ni web-ilova kodi ichida ma'lumotlar bazasiga <code>baza:5432</code> manzili orqali ulanadi — IP manzil kerak emas! Docker ichki DNS xizmati konteyner nomini avtomatik uning joriy IP manziliga tarjima qiladi." },
        { code: "// Node.js ilovada ma'lumotlar bazasiga ulanish (misol)\nconst pool = new Pool({\n  host: 'baza',      // konteyner nomi — IP emas!\n  port: 5432,\n  user: 'admin',\n  password: 'parol',\n  database: 'dukon'\n});" },
        { note: "Aynan shu mexanizmni oldingi darsda Docker Compose ichida ko'rgan edik. Compose barcha xizmatlarni avtomatik bir tarmoqqa ulaydi va ularni xizmat nomi orqali topish mumkin bo'ladi. Ya'ni Compose bu tarmoq ishini siz uchun avtomatik qiladi — bu qulaylikning asosiy sababi." },

        { h2: "Xulosa" },
        { ul: [
          "Konteyner ma'lumoti <strong>vaqtinchalik</strong> — konteynerni o'chirsangiz yo'qoladi;",
          "<strong>Volume</strong> — konteynerdan tashqarida, doimiy saqlanadigan ma'lumot ombori (<code>-v nom:/yo'l</code>);",
          "<strong>Nomli volume</strong> — Docker boshqaradi (baza uchun); <strong>bind mount</strong> — kompyuterdagi aniq papka (kod tahrirlash uchun);",
          "<code>docker volume ls/create/rm/prune</code> — volume'larni boshqaradi;",
          "<code>docker network create</code> bilan tarmoq yaratib, konteynerlarni <code>--network</code> orqali ulaysiz;",
          "Bir tarmoqdagi konteynerlar bir-birini <strong>nomi orqali</strong> topadi (IP kerak emas) — Docker Compose buni avtomatik qiladi."
        ] }
      ]
    }
  ]
};
