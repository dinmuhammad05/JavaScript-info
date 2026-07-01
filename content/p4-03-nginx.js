"use strict";

module.exports = {
  part: "4-qism: Amaliy vositalar",
  chapter: "Nginx",
  lessons: [
    {
      slug: "nginx-nima",
      title: "Nginx nima?",
      blurb: "Veb-server tushunchasi, Nginx tarixi va mashhurligi, uning asosiy vazifalari (statik fayl, reverse proxy, load balancer, SSL termination) va Apache bilan qisqa taqqoslash.",
      body: [
        { lead: "<strong>Nginx</strong> (o'qilishi: \"engine-x\") — bugungi kunda internetdagi eng ko'p ishlatiladigan veb-serverlardan biri. Deyarli har bir zamonaviy sayt yoki API uning ortida qandaydir tarzda Nginx'dan foydalanadi. Ushbu darsda veb-server nima ekanligini, Nginx qanday paydo bo'lganini va u qanday vazifalarni bajarishini chuqur o'rganamiz." },

        { note: "Bu bob — <strong>server</strong> muhitiga oid. Bu yerdagi buyruqlar va konfiguratsiya (config) misollari Linux serverida ishlaydi. Ularni brauzerda ishga tushirib bo'lmaydi, shuning uchun barcha misollar <strong>statik</strong> — ya'ni tushunib o'qish uchun keltirilgan. Har bir buyruq va direktivani mazmunini anglagan holda o'rganing." },

        { h2: "Veb-server nima?" },
        { p: "Veb-server — bu ikki ma'noga ega tushuncha. Birinchisi, <strong>jismoniy (yoki virtual) kompyuter</strong> — internetga ulangan va doimo ishlab turadigan mashina. Ikkinchisi — o'sha mashinada ishlaydigan <strong>dastur</strong>, u brauzerlardan (klientlardan) keladigan HTTP so'rovlarni qabul qiladi va javob qaytaradi." },
        { p: "Nginx — aynan ikkinchi ma'nodagi veb-server, ya'ni <strong>dastur</strong>. U tarmoqning ma'lum bir portini (odatda 80 va 443) \"tinglab\" turadi. Kimdir brauzerda saytingiz manzilini yozganda, brauzer o'sha portga HTTP so'rov yuboradi. Nginx bu so'rovni qabul qiladi, kerakli faylni topadi yoki boshqa dasturga uzatadi va natijani brauzerga qaytaradi." },
        { p: "Oddiy qilib aytganda: brauzer <strong>so'raydi</strong> (\"menga index.html sahifasini ber\"), Nginx esa <strong>javob beradi</strong> (o'sha faylning mazmunini yuboradi)." },

        { h2: "Nginx tarixi va nega mashhur" },
        { p: "Nginx'ni rus dasturchisi <strong>Igor Sysoev</strong> yaratgan va u birinchi marta 2004-yilda ommaga chiqarilgan. O'sha davrdagi mashhur veb-server Apache bir vaqtning o'zida juda ko'p ulanishni (masalan, o'n minglab) samarali boshqara olmasdi — bu <strong>C10k muammosi</strong> (ya'ni bir vaqtda 10 000 ulanishni ushlab turish muammosi) deb atalgan." },
        { p: "Nginx aynan shu muammoni hal qilish uchun yaratildi. U <strong>asinxron, hodisaga asoslangan (event-driven)</strong> arxitekturaga ega. Bu shuni anglatadiki, Nginx har bir ulanish uchun alohida jarayon (process) yoki oqim (thread) ochmaydi — buning o'rniga bitta jarayon minglab ulanishni bir vaqtda, kam xotira sarflab boshqaradi." },
        { ul: [
          "<strong>Tezkorlik</strong> — statik fayllarni juda tez uzatadi;",
          "<strong>Kam resurs</strong> — oz miqdorda operativ xotira (RAM) va protsessor (CPU) sarflaydi;",
          "<strong>Barqarorlik</strong> — yuqori yuklama ostida ham ishonchli ishlaydi;",
          "<strong>Moslashuvchanlik</strong> — veb-server, proxy, load balancer sifatida ishlata olinadi."
        ] },
        { note: "Aynan shu sabablarga ko'ra Nginx tez orada dunyodagi eng yuklama ko'radigan saytlar tomonidan qabul qilindi va hozirda internetdagi eng band saytlarning katta qismiga xizmat qiladi." },

        { h2: "Nginx qanday vazifalarni bajaradi" },
        { p: "Nginx ko'p qirrali vosita. U bir necha xil rolda ishlashi mumkin va ko'pincha bu rollarni bir vaqtda bajaradi. Asosiy vazifalari quyidagilar:" },

        { h3: "1. Statik fayllarga xizmat ko'rsatish" },
        { p: "Eng asosiy vazifasi — disk'da yotgan <strong>statik fayllarni</strong> (HTML, CSS, JavaScript, rasmlar, videolar) brauzerga uzatish. Nginx bu ishni juda samarali bajaradi, chunki u aynan shu maqsad uchun optimallashtirilgan." },

        { h3: "2. Reverse proxy (teskari proksi)" },
        { p: "Nginx brauzerdan kelgan so'rovni qabul qilib, uni orqa fonda ishlayotgan boshqa dasturga (masalan, Node.js, Python yoki PHP ilovasiga) uzatishi mumkin. Ilova javob berganda, Nginx uni brauzerga qaytaradi. Bunda brauzer orqadagi ilovani ko'rmaydi — u faqat Nginx bilan gaplashadi." },

        { h3: "3. Load balancer (yuk taqsimlagich)" },
        { p: "Agar sizda bir xil ilovaning bir nechta nusxasi (serveri) bo'lsa, Nginx kelayotgan so'rovlarni ular orasida <strong>taqsimlab</strong> beradi. Bu bitta serverga tushadigan yukni kamaytiradi va saytni sekinlashib qolishdan saqlaydi." },

        { h3: "4. SSL termination (SSL yakunlash)" },
        { p: "HTTPS (shifrlangan ulanish) uchun serverga sertifikat o'rnatiladi. Nginx shifrlangan trafikni <strong>ochib</strong> (deshifratsiya qilib), oddiy so'rovni orqadagi ilovaga uzatadi. Shu tarzda ilovaning o'zi shifrlash bilan ovora bo'lmaydi — bu og'ir ishni Nginx bajaradi." },

        { h2: "Apache bilan qisqa taqqoslash" },
        { p: "Apache HTTP Server (qisqacha Apache) — Nginx'dan oldin paydo bo'lgan va uzoq yillar hukmronlik qilgan veb-server. Ular bir-biriga raqib, lekin arxitekturasi jihatidan farq qiladi:" },
        { ul: [
          "<strong>Model:</strong> Apache an'anaviy ravishda har bir ulanishga alohida jarayon/oqim ajratadi; Nginx esa asinxron, hodisaga asoslangan modelda ishlaydi;",
          "<strong>Statik fayllar:</strong> statik kontentda Nginx odatda tezroq va kamroq xotira sarflaydi;",
          "<strong>Konfiguratsiya:</strong> Apache <code>.htaccess</code> fayllari orqali papka darajasida sozlashga imkon beradi; Nginx'da bunday mexanizm yo'q, barcha sozlash markaziy config'da bo'ladi (bu tezroq ishlaydi);",
          "<strong>Ko'p ulanish:</strong> juda katta miqdordagi bir vaqtli ulanishlarda Nginx sezilarli ustunlikka ega."
        ] },
        { tip: "Amalda ko'pincha ularni <strong>birgalikda</strong> ishlatishadi: Nginx oldinda turadi (statik fayllar va reverse proxy uchun), Apache esa orqada dinamik kontentni (masalan, eski PHP ilovalarini) qayta ishlaydi. Lekin zamonaviy loyihalarda ko'pincha faqat Nginx yetarli." },

        { h2: "Qayerda ishlatiladi" },
        { p: "Nginx quyidagi holatlarda keng qo'llaniladi:" },
        { ul: [
          "Statik saytlar va bir sahifali ilovalar (SPA — React, Vue, Angular) uchun fayl serveri;",
          "Node.js, Django, Laravel kabi ilovalar oldida reverse proxy sifatida;",
          "Yuqori trafikli saytlarda bir nechta server orasida yukni taqsimlash uchun;",
          "HTTPS'ni ta'minlash va SSL sertifikatlarni boshqarish uchun;",
          "API shlyuzi (gateway) va mikroservis arxitekturasida marshrutlash uchun;",
          "Media (rasm, video) fayllarni keshlash va tez uzatish uchun."
        ] },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Nginx</strong> — asinxron, tezkor va kam resurs sarflaydigan veb-server dasturi;",
          "U 2004-yilda C10k muammosini (ko'p bir vaqtli ulanish) hal qilish uchun yaratilgan;",
          "Asosiy vazifalari: statik fayllarga xizmat, reverse proxy, load balancing va SSL termination;",
          "Apache'dan farqli o'laroq, u hodisaga asoslangan modelda ishlaydi va statik kontentda samaraliroq;",
          "Zamonaviy veb-loyihalarning katta qismida shu yoki boshqa rolda ishlatiladi."
        ] }
      ]
    },

    {
      slug: "nginx-ornatish",
      title: "Nginx o'rnatish va boshqarish",
      blurb: "Nginx'ni apt/yum orqali o'rnatish, systemctl bilan boshqarish (start/stop/restart/status), config testi (nginx -t), qayta yuklash (reload), fayl/papka joylashuvi va loglar.",
      body: [
        { lead: "Nginx bilan ishlashning birinchi qadami — uni serverga o'rnatish va boshqarishni o'rganish. Ushbu darsda Nginx'ni turli Linux distributivlarida o'rnatishni, uni ishga tushirish/to'xtatish/qayta yuklashni, config'ni tekshirishni hamda uning fayllari qayerda joylashishini batafsil ko'rib chiqamiz." },

        { note: "Quyidagi buyruqlar Linux serverida terminal (buyruq qatori) orqali bajariladi. Ko'pchilik buyruqlar administrator huquqini talab qiladi, shuning uchun ular oldida <code>sudo</code> yoziladi." },

        { h2: "Nginx'ni o'rnatish" },
        { p: "O'rnatish usuli Linux distributividan bog'liq. Har bir distributivning o'z <strong>paket menejeri</strong> bor." },

        { h3: "Debian / Ubuntu (apt)" },
        { p: "Debian oilasidagi tizimlarda (Ubuntu shular jumlasidan) <code>apt</code> paket menejeri ishlatiladi. Avval paketlar ro'yxatini yangilab, keyin Nginx'ni o'rnatamiz:" },
        { code: "sudo apt update\nsudo apt install nginx" },
        { p: "O'rnatish tugagach, Nginx odatda avtomatik ishga tushadi. Buni brauzerda server IP manzilini ochib tekshirish mumkin — standart \"Welcome to nginx!\" sahifasi ko'rinishi kerak." },

        { h3: "CentOS / RHEL / Fedora (yum yoki dnf)" },
        { p: "Red Hat oilasidagi tizimlarda <code>yum</code> yoki uning yangi varianti <code>dnf</code> ishlatiladi:" },
        { code: "sudo yum install nginx\n# yoki yangiroq tizimlarda:\nsudo dnf install nginx" },
        { p: "Bu tizimlarda o'rnatishdan keyin Nginx'ni qo'lda ishga tushirish kerak bo'lishi mumkin (buni pastda ko'ramiz)." },

        { h2: "systemctl bilan boshqarish" },
        { p: "Zamonaviy Linux tizimlarida xizmatlar (servicelar) <strong>systemd</strong> orqali boshqariladi. Uning buyrug'i — <code>systemctl</code>. Nginx ham xizmat sifatida ro'yxatga olingani uchun uni shu buyruq bilan boshqaramiz." },

        { h3: "Ishga tushirish (start)" },
        { code: "sudo systemctl start nginx" },
        { p: "Bu buyruq Nginx'ni ishga tushiradi. U so'rovlarni tinglashni boshlaydi." },

        { h3: "To'xtatish (stop)" },
        { code: "sudo systemctl stop nginx" },
        { p: "Nginx'ni butunlay to'xtatadi. Bundan keyin sayt ochilmaydi, chunki so'rovlarni tinglaydigan hech kim qolmaydi." },

        { h3: "Qayta ishga tushirish (restart)" },
        { code: "sudo systemctl restart nginx" },
        { p: "Nginx'ni to'xtatib, keyin qaytadan ishga tushiradi. Bu barcha ulanishlarni uzadi. Config'da katta o'zgarish qilingan bo'lsa foydalidir, lekin kichik o'zgarishlarda <code>reload</code> yaxshiroq (pastga qarang)." },

        { h3: "Holatini ko'rish (status)" },
        { code: "sudo systemctl status nginx" },
        { p: "Nginx hozir ishlab turibdimi yoki yo'qmi — shuni ko'rsatadi. Chiqishida <code>active (running)</code> yozuvi bo'lsa, hammasi joyida. Xatolik bo'lsa, shu yerda dastlabki ma'lumot ko'rinadi." },

        { h3: "Avtoyuklashni yoqish (enable)" },
        { p: "Server qayta yuklanganda (reboot) Nginx avtomatik ishga tushishi uchun uni <strong>enable</strong> qilib qo'yamiz:" },
        { code: "sudo systemctl enable nginx" },
        { tip: "<code>enable</code> — server har qayta ishga tushganda xizmatni avtomatik yoqadi. <code>start</code> esa faqat hozir ishga tushiradi. Ikkalasini birga bajarish uchun <code>sudo systemctl enable --now nginx</code> ishlatish mumkin." },

        { h2: "Config'ni tekshirish: nginx -t" },
        { p: "Config'da xato qilib, keyin Nginx'ni qayta yuklash — xavfli. Agar config buzuq bo'lsa, Nginx ishga tushmay, saytingiz \"o'lib\" qolishi mumkin. Shuning uchun <strong>har doim</strong> avval config'ni sinab ko'ring:" },
        { code: "sudo nginx -t" },
        { p: "Agar hammasi to'g'ri bo'lsa, quyidagicha xabar ko'rinadi:" },
        { code: "nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful" },
        { p: "Agar xatolik bo'lsa, Nginx aynan qaysi faylning nechanchi qatorida muammo borligini aytadi." },
        { warn: "<strong>Muhim odat:</strong> config'ni o'zgartirgandan so'ng, uni ishga solishdan oldin doim <code>sudo nginx -t</code> ishlatib tekshiring. Bu ishlab turgan saytni kutilmagan uzilishdan asraydi." },

        { h2: "Qayta yuklash: nginx -s reload" },
        { p: "Config'ni o'zgartirdingiz va u sinovdan o'tdi. Endi o'zgarishni qo'llash kerak. Bunda <strong>reload</strong> ishlatiladi — bu Nginx'ni to'xtatmasdan, faqat yangi config'ni o'qib qayta yuklaydi:" },
        { code: "sudo nginx -s reload\n# yoki systemctl orqali:\nsudo systemctl reload nginx" },
        { p: "<code>reload</code> ning <code>restart</code> dan afzalligi — u ochiq ulanishlarni uzmaydi. Nginx eski jarayonlar joriy so'rovlarni tugatguncha kutadi, yangi so'rovlarni esa yangi config bilan qabul qiladi. Foydalanuvchi hech qanday uzilishni sezmaydi." },
        { tip: "Amaliy ketma-ketlik: <strong>(1)</strong> config'ni tahrirlash, <strong>(2)</strong> <code>sudo nginx -t</code> bilan tekshirish, <strong>(3)</strong> <code>sudo nginx -s reload</code> bilan qo'llash. Har doim shu tartibda ishlang." },

        { h2: "Fayl va papkalar joylashuvi" },
        { p: "Nginx'ning fayllari odatda quyidagi joylarda bo'ladi (Debian/Ubuntu misolida):" },
        { ul: [
          "<code>/etc/nginx/</code> — barcha konfiguratsiya fayllari shu papkada;",
          "<code>/etc/nginx/nginx.conf</code> — asosiy (bosh) config fayli;",
          "<code>/etc/nginx/sites-available/</code> — mavjud sayt konfiguratsiyalari (barchasi shu yerda saqlanadi);",
          "<code>/etc/nginx/sites-enabled/</code> — <strong>faol</strong> saytlar (bu yerda symbolik havolalar turadi);",
          "<code>/etc/nginx/conf.d/</code> — qo'shimcha config bo'laklari (ba'zi tizimlarda asosiy joy shu);",
          "<code>/var/www/html/</code> — saytning statik fayllari (HTML, CSS) uchun standart papka;",
          "<code>/var/log/nginx/</code> — log fayllar shu yerda."
        ] },
        { p: "<strong>sites-available</strong> va <strong>sites-enabled</strong> juftligi Debian/Ubuntu'ning qulay yondashuvi. Siz sayt config'ini <code>sites-available</code> ichida yaratasiz, keyin uni faollashtirish uchun <code>sites-enabled</code> ichida unga symbolik havola (symlink) hosil qilasiz:" },
        { code: "sudo ln -s /etc/nginx/sites-available/mening-saytim /etc/nginx/sites-enabled/" },
        { p: "Saytni vaqtincha o'chirmoqchi bo'lsangiz — config'ni o'chirmasdan, faqat <code>sites-enabled</code> dagi havolani olib tashlaysiz. Config esa <code>sites-available</code> da saqlanib qoladi." },
        { note: "CentOS/RHEL tizimlarida <code>sites-available</code>/<code>sites-enabled</code> odatda bo'lmaydi — u yerda config'lar to'g'ridan-to'g'ri <code>/etc/nginx/conf.d/</code> ichiga <code>.conf</code> kengaytmasi bilan joylashtiriladi." },

        { h2: "Loglar: access.log va error.log" },
        { p: "Nginx ikki asosiy log yuritadi, ikkalasi ham <code>/var/log/nginx/</code> papkasida:" },
        { ul: [
          "<code>access.log</code> — <strong>har bir so'rov</strong> shu yerga yoziladi: kim, qachon, qaysi sahifani so'radi, qaysi holat kodi qaytdi;",
          "<code>error.log</code> — <strong>xatoliklar</strong> va ogohlantirishlar shu yerga yoziladi: config muammolari, topilmagan fayllar, ilovaga ulanish xatolari."
        ] },
        { p: "Loglarni real vaqtda kuzatish uchun <code>tail -f</code> ishlatiladi (yangi qatorlar paydo bo'lishi bilan ekranda ko'rinadi):" },
        { code: "sudo tail -f /var/log/nginx/access.log\nsudo tail -f /var/log/nginx/error.log" },
        { tip: "Sayt ishlamay qolganda birinchi qaraydigan joyingiz — <code>error.log</code>. Ko'pincha muammoning aniq sababi (masalan, \"Permission denied\" yoki \"connection refused\") aynan shu yerda yoziladi." },

        { h2: "Xulosa" },
        { ul: [
          "Nginx <code>apt</code> (Debian/Ubuntu) yoki <code>yum</code>/<code>dnf</code> (CentOS/RHEL) orqali o'rnatiladi;",
          "Boshqarish <code>systemctl</code> orqali: <code>start</code>, <code>stop</code>, <code>restart</code>, <code>status</code>, <code>enable</code>;",
          "Config'ni o'zgartirgach, doim <code>nginx -t</code> bilan tekshiring, so'ng <code>nginx -s reload</code> bilan uzilishsiz qo'llang;",
          "Asosiy config — <code>/etc/nginx/nginx.conf</code>; saytlar <code>sites-available</code>/<code>sites-enabled</code> orqali boshqariladi;",
          "Loglar <code>/var/log/nginx/</code> da: <code>access.log</code> (so'rovlar) va <code>error.log</code> (xatolar)."
        ] }
      ]
    },

    {
      slug: "nginx-config",
      title: "Konfiguratsiya asoslari",
      blurb: "nginx.conf tuzilishi, kontekstlar (main, events, http, server, location), direktiva sintaksisi, server bloki (listen, server_name, root, index) va location bloki asoslari.",
      body: [
        { lead: "Nginx'ning kuchi uning <strong>konfiguratsiya fayli</strong> (config) da yashiringan. Nginx nima qilishini aynan shu fayl belgilaydi. Ushbu darsda config'ning tuzilishini, uning bo'limlarini (kontekstlarni), direktiva sintaksisini va eng muhim bloklarni — <code>server</code> hamda <code>location</code> ni batafsil o'rganamiz." },

        { h2: "nginx.conf tuzilishi" },
        { p: "Asosiy config fayli — <code>/etc/nginx/nginx.conf</code>. U ichma-ich joylashgan <strong>bloklar</strong> (kontekstlar) va <strong>direktivalar</strong> (buyruqlar) dan iborat. Umumiy ko'rinishi quyidagicha:" },
        { code: [
          "# main kontekst (fayl eng tashqi darajasi)",
          "user www-data;",
          "worker_processes auto;",
          "",
          "events {",
          "    worker_connections 1024;",
          "}",
          "",
          "http {",
          "    include       /etc/nginx/mime.types;",
          "    default_type  application/octet-stream;",
          "",
          "    server {",
          "        listen 80;",
          "        server_name example.com;",
          "",
          "        location / {",
          "            root /var/www/html;",
          "            index index.html;",
          "        }",
          "    }",
          "}"
        ].join("\n") },
        { p: "Diqqat qiling: bloklar bir-birining ichida joylashadi. <code>http</code> ichida <code>server</code>, <code>server</code> ichida <code>location</code>. Bu iyerarxiya (ichma-ichlik) Nginx'ni tushunishning kalitidir." },

        { h2: "Direktiva sintaksisi" },
        { p: "<strong>Direktiva</strong> — bu Nginx'ga beriladigan bitta ko'rsatma. Ikki turi bor:" },
        { ul: [
          "<strong>Oddiy direktiva:</strong> nom va qiymatlardan iborat, oxirida <code>;</code> (nuqta-vergul) qo'yiladi. Masalan: <code>listen 80;</code>",
          "<strong>Blokli direktiva:</strong> nomdan keyin <code>{ ... }</code> jingalak qavslar keladi va ichida boshqa direktivalar bo'ladi. Masalan: <code>server { ... }</code>"
        ] },
        { code: [
          "# Oddiy direktiva — oxirida nuqta-vergul shart:",
          "worker_processes auto;",
          "server_name example.com www.example.com;",
          "",
          "# Blokli direktiva — jingalak qavslar bilan:",
          "events {",
          "    worker_connections 1024;",
          "}"
        ].join("\n") },
        { warn: "Eng ko'p uchraydigan xato — oddiy direktiva oxiriga <code>;</code> qo'yishni unutish. Bunda <code>nginx -t</code> \"unexpected end of file\" yoki shunga o'xshash xatolik beradi. Har bir oddiy direktiva albatta nuqta-vergul bilan tugashi shart." },
        { p: "Izohlar <code>#</code> belgisi bilan boshlanadi — Nginx o'sha qatordagi <code>#</code> dan keyingi hamma narsani e'tiborsiz qoldiradi." },

        { h2: "Kontekstlar (bloklar)" },
        { p: "<strong>Kontekst</strong> — bu ma'lum bir soha uchun sozlamalarni birlashtirgan blok. Har bir direktiva o'ziga tegishli kontekstda yozilishi kerak. Asosiy kontekstlar:" },

        { h3: "main kontekst" },
        { p: "Bu fayl eng tashqi darajasi — hech qanday blok ichida bo'lmagan qism. Bu yerda umumiy, butun serverga ta'sir qiluvchi sozlamalar bo'ladi:" },
        { ul: [
          "<code>user www-data;</code> — Nginx qaysi tizim foydalanuvchisi nomidan ishlashini belgilaydi;",
          "<code>worker_processes auto;</code> — ishchi jarayonlar soni (<code>auto</code> — protsessor yadrolari soniga tenglashtiradi);",
          "<code>error_log /var/log/nginx/error.log;</code> — xatoliklar logi joyi."
        ] },

        { h3: "events kontekst" },
        { p: "Ulanishlarni qayta ishlash bilan bog'liq past darajali sozlamalar shu yerda:" },
        { code: [
          "events {",
          "    worker_connections 1024;",
          "}"
        ].join("\n") },
        { p: "<code>worker_connections</code> — bitta ishchi jarayon bir vaqtda nechta ulanishni ushlab tura olishini belgilaydi." },

        { h3: "http kontekst" },
        { p: "HTTP va HTTPS trafik bilan bog'liq hamma narsa shu blok ichida bo'ladi. Barcha saytlar (<code>server</code> bloklari) shu <code>http</code> ichida joylashadi. Bu yerda umumiy sozlamalar (masalan, MIME turlari, gzip, loglar) beriladi:" },
        { code: [
          "http {",
          "    include       /etc/nginx/mime.types;",
          "    default_type  application/octet-stream;",
          "    sendfile      on;",
          "    keepalive_timeout  65;",
          "",
          "    # bu yerda bir yoki bir nechta server bloki bo'ladi",
          "}"
        ].join("\n") },

        { h3: "server kontekst" },
        { p: "<strong>server</strong> bloki — bitta <strong>virtual serverni</strong> (ya'ni bitta saytni) tavsiflaydi. Bitta Nginx bir nechta <code>server</code> bloki bilan bir nechta saytga xizmat qilishi mumkin. Har biri o'z domeni va portiga ega." },

        { h3: "location kontekst" },
        { p: "<strong>location</strong> bloki — ma'lum URL yo'llari (path) uchun maxsus qoidalarni belgilaydi. U doim <code>server</code> ichida bo'ladi." },

        { h2: "server bloki asosiy direktivalari" },
        { p: "Har bir <code>server</code> blokida bir necha muhim direktiva bo'ladi:" },

        { h3: "listen" },
        { p: "Server qaysi <strong>portni</strong> tinglashini belgilaydi. HTTP uchun 80, HTTPS uchun 443:" },
        { code: "listen 80;\nlisten 443 ssl;   # HTTPS uchun" },

        { h3: "server_name" },
        { p: "Server qaysi <strong>domen nomiga</strong> javob berishini belgilaydi. Nginx kelgan so'rovdagi <code>Host</code> sarlavhasini shu bilan solishtiradi:" },
        { code: "server_name example.com www.example.com;" },
        { p: "Bir necha domenni bo'sh joy bilan ajratib yozish mumkin. Nginx aynan shu domenlar uchun kelgan so'rovlarni shu <code>server</code> blokiga yo'naltiradi." },

        { h3: "root" },
        { p: "Saytning fayllari qaysi papkada joylashganini bildiradi. Nginx so'ralgan faylni shu papkadan qidiradi:" },
        { code: "root /var/www/example.com;" },
        { p: "Masalan, brauzer <code>/about.html</code> so'rasa, Nginx <code>/var/www/example.com/about.html</code> faylini qaytaradi." },

        { h3: "index" },
        { p: "Papka so'ralganda (masalan, oddiygina <code>/</code>) qaysi faylni <strong>standart</strong> qilib qaytarishni belgilaydi:" },
        { code: "index index.html index.htm;" },
        { p: "Nginx birinchi topilgan faylni qaytaradi — avval <code>index.html</code> ni izlaydi, topmasa <code>index.htm</code> ni." },

        { h2: "location bloki asoslari" },
        { p: "<code>location</code> URL yo'liga qarab turli qoidalar qo'llash imkonini beradi. Eng oddiy shakli — prefiks bo'yicha mos kelish:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name example.com;",
          "    root /var/www/example.com;",
          "",
          "    # asosiy yo'l — hamma so'rovlar shu yerga tushadi",
          "    location / {",
          "        index index.html;",
          "    }",
          "",
          "    # /images/ bilan boshlanadigan so'rovlar uchun alohida qoida",
          "    location /images/ {",
          "        root /var/data;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Bu misolda <code>/images/logo.png</code> so'ralsa, Nginx uni <code>/var/data/images/logo.png</code> dan oladi (ikkinchi location root'i tufayli). Boshqa barcha so'rovlar esa birinchi <code>location /</code> ga tushadi." },
        { p: "<code>location</code> bir necha xil mos kelish turini qo'llab-quvvatlaydi:" },
        { ul: [
          "<code>location /</code> — prefiks bo'yicha (shu bilan boshlanadigan hamma yo'llar);",
          "<code>location = /aniq</code> — <strong>aniq</strong> mos kelish (faqat shu yo'l);",
          "<code>location ~ \\.php$</code> — regulyar ifoda bo'yicha (harf-registrga sezgir);",
          "<code>location ~* \\.(jpg|png)$</code> — regulyar ifoda (registrga sezgir emas)."
        ] },
        { note: "Nginx bir nechta <code>location</code> mos kelganda maxsus tartib bo'yicha eng mosini tanlaydi: avval aniq mos kelish (<code>=</code>), so'ng regulyar ifodalar, oxirida eng uzun prefiks. Boshlanishida buni chuqur bilish shart emas — asosiy prefiks va aniq mos kelishni tushunish yetarli." },

        { h2: "Xulosa" },
        { ul: [
          "Nginx config'i ichma-ich joylashgan <strong>kontekstlar</strong> va <strong>direktivalardan</strong> iborat;",
          "Oddiy direktiva <code>;</code> bilan tugaydi, blokli direktiva <code>{ }</code> ishlatadi;",
          "Asosiy kontekstlar: <code>main</code> &rarr; <code>events</code> / <code>http</code> &rarr; <code>server</code> &rarr; <code>location</code>;",
          "<code>server</code> bloki bitta saytni tavsiflaydi: <code>listen</code>, <code>server_name</code>, <code>root</code>, <code>index</code>;",
          "<code>location</code> URL yo'liga qarab maxsus qoidalar qo'llaydi (prefiks, aniq mos kelish, regulyar ifoda)."
        ] }
      ]
    },

    {
      slug: "nginx-static",
      title: "Statik saytga xizmat ko'rsatish",
      blurb: "Statik HTML/CSS/JS saytni Nginx orqali chiqarish: root va index, location bilan yo'llar, try_files, 404 sahifasi, gzip yoqish va kesh sarlavhalari. To'liq server bloki namunasi.",
      body: [
        { lead: "Nginx'ning eng asosiy va eng ko'p ishlatiladigan vazifasi — <strong>statik saytga xizmat ko'rsatish</strong>. Ya'ni disk'da yotgan HTML, CSS, JavaScript fayllar va rasmlarni brauzerga uzatish. Ushbu darsda oddiy statik saytni to'liq sozlashni, <code>try_files</code>, 404 sahifasi, gzip siqish va keshlashni batafsil o'rganamiz." },

        { h2: "Oddiy statik sayt uchun config" },
        { p: "Faraz qilaylik, saytimiz fayllari <code>/var/www/mysite</code> papkasida (ichida <code>index.html</code>, <code>style.css</code> va h.k.). Eng sodda config quyidagicha:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name mysite.com www.mysite.com;",
          "",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Bu config'ni <code>/etc/nginx/sites-available/mysite</code> fayliga saqlab, keyin uni faollashtiramiz:" },
        { code: "sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo nginx -s reload" },

        { h2: "root va index'ni tushunish" },
        { p: "<code>root</code> — bu saytning \"ildiz\" papkasi. Brauzerdan kelgan yo'l shu papkaga qo'shiladi:" },
        { ul: [
          "So'rov <code>/</code> &rarr; Nginx <code>/var/www/mysite/</code> papkasiga qaraydi;",
          "So'rov <code>/style.css</code> &rarr; Nginx <code>/var/www/mysite/style.css</code> faylini beradi;",
          "So'rov <code>/blog/post.html</code> &rarr; Nginx <code>/var/www/mysite/blog/post.html</code> faylini beradi."
        ] },
        { p: "<code>index</code> esa papka so'ralganda (fayl nomi ko'rsatilmaganda) qaysi faylni ochishni bildiradi. <code>index index.html;</code> bo'lsa, <code>/</code> so'ralganda <code>/var/www/mysite/index.html</code> qaytariladi." },
        { note: "<code>root</code> va <code>index</code> ni <code>server</code> darajasida bir marta yozsangiz, ular ichdagi barcha <code>location</code> bloklariga ta'sir qiladi. Bu takrorlashning oldini oladi." },

        { h2: "try_files direktivasi" },
        { p: "<code>try_files</code> — statik sayt uchun eng muhim direktivalardan biri. U Nginx'ga bir nechta variantni <strong>navbat bilan</strong> sinab ko'rishni buyuradi. Birinchi topilgan faylni qaytaradi:" },
        { code: "try_files $uri $uri/ =404;" },
        { p: "Bu qatordagi har bir bo'lak alohida ma'noga ega:" },
        { ul: [
          "<code>$uri</code> — avval so'ralgan yo'lga aniq mos fayl bor-yo'qligini tekshiradi (masalan, <code>/about.html</code>);",
          "<code>$uri/</code> — agar fayl topilmasa, o'sha nomdagi <strong>papka</strong> bormi tekshiradi (va ichidagi <code>index</code> faylni beradi);",
          "<code>=404</code> — agar ikkalasi ham topilmasa, 404 (topilmadi) xatoligini qaytaradi."
        ] },
        { p: "<code>$uri</code> — bu Nginx'ning <strong>ichki o'zgaruvchisi</strong>: u joriy so'rov yo'lini bildiradi. Nginx'da bunday o'zgaruvchilar <code>$</code> belgisi bilan boshlanadi (masalan, <code>$host</code>, <code>$remote_addr</code>)." },
        { tip: "Agar bu bir sahifali ilova (SPA — React/Vue) bo'lsa, marshrutlashni ilovaning o'zi boshqaradi. Bunda <code>try_files $uri $uri/ /index.html;</code> yoziladi — topilmagan har qanday yo'l uchun <code>index.html</code> qaytariladi, ilova esa sahifani o'zi ko'rsatadi." },

        { h2: "location bilan yo'llarni boshqarish" },
        { p: "Turli fayl turlariga turli qoidalar berish uchun <code>location</code> ishlatamiz. Masalan, rasm va statik resurslarni alohida ajratish:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name mysite.com;",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "",
          "    # rasm, css, js kabi statik fayllar uchun alohida qoida",
          "    location ~* \\.(jpg|jpeg|png|gif|css|js|ico|svg)$ {",
          "        expires 30d;",
          "        access_log off;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Bu yerda <code>~*</code> — registrga sezgir bo'lmagan regulyar ifoda mosligi. Ya'ni <code>.jpg</code> ham, <code>.JPG</code> ham mos keladi." },

        { h2: "Maxsus 404 sahifasi" },
        { p: "Foydalanuvchi mavjud bo'lmagan sahifani so'raganda standart, quruq 404 o'rniga o'zingizning chiroyli sahifangizni ko'rsatishingiz mumkin. Buning uchun <code>error_page</code> direktivasidan foydalanamiz:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name mysite.com;",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "",
          "    # 404 xatoligida maxsus sahifani ko'rsatish",
          "    error_page 404 /404.html;",
          "",
          "    location = /404.html {",
          "        internal;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Bu yerda <code>error_page 404 /404.html;</code> — 404 xatolik yuz berganda <code>/404.html</code> faylini ko'rsatishni buyuradi. <code>location = /404.html { internal; }</code> esa bu sahifaga faqat Nginx ichidan (foydalanuvchi to'g'ridan-to'g'ri emas) kirilishini ta'minlaydi." },
        { note: "Xuddi shu tarzda server xatoliklari (500, 502, 503, 504) uchun ham maxsus sahifa berish mumkin: <code>error_page 500 502 503 504 /50x.html;</code>" },

        { h2: "gzip siqishni yoqish" },
        { p: "<strong>gzip</strong> — matnli fayllarni (HTML, CSS, JS, JSON) brauzerga uzatishdan oldin siqib, hajmini kichraytiradigan mexanizm. Bu sahifa yuklanishini sezilarli tezlashtiradi, chunki tarmoq orqali kamroq ma'lumot yuboriladi. Odatda <code>http</code> kontekstida yoqiladi:" },
        { code: [
          "http {",
          "    gzip on;",
          "    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;",
          "    gzip_min_length 1000;",
          "    gzip_comp_level 5;",
          "}"
        ].join("\n") },
        { ul: [
          "<code>gzip on;</code> — siqishni yoqadi;",
          "<code>gzip_types</code> — qaysi fayl turlarini siqish kerakligini belgilaydi (rasmlar allaqachon siqilgan, ularni qayta siqish shart emas);",
          "<code>gzip_min_length 1000;</code> — faqat 1000 baytdan katta fayllar siqiladi (kichik fayllarni siqishning foydasi yo'q);",
          "<code>gzip_comp_level 5;</code> — siqish darajasi (1 dan 9 gacha; balandroq — kuchliroq siqish, lekin ko'proq CPU sarfi)."
        ] },
        { tip: "gzip'ni yoqish saytning tezligiga eng sodda va samarali ta'sir qiluvchi optimizatsiyalardan biri. Odatda HTML/CSS/JS fayllar hajmini 60-80% ga kamaytiradi." },

        { h2: "Kesh sarlavhalari" },
        { p: "Rasm, CSS va JS kabi <strong>kamdan-kam o'zgaradigan</strong> fayllarni brauzer o'z xotirasida (keshda) saqlab, keyingi tashriflarda serverdan qayta so'ramasligi mumkin. Buni <code>expires</code> direktivasi orqali sozlaymiz:" },
        { code: [
          "location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff2)$ {",
          "    expires 30d;",
          "    add_header Cache-Control \"public, no-transform\";",
          "}"
        ].join("\n") },
        { ul: [
          "<code>expires 30d;</code> — brauzerga bu faylni 30 kun davomida keshda saqlashni aytadi (mos <code>Expires</code> va <code>Cache-Control</code> sarlavhalarini avtomatik qo'shadi);",
          "<code>add_header Cache-Control \"public\";</code> — faylni har qanday kesh (brauzer, proxy) saqlashi mumkinligini bildiradi."
        ] },
        { warn: "Uzoq muddatli keshlashning bir muammosi bor: agar CSS/JS faylni yangilasangiz, brauzer eski nusxani ko'rsatishda davom etishi mumkin. Buning yechimi — fayl nomiga versiya qo'shish (masalan, <code>style.v2.css</code> yoki <code>style.css?v=2</code>). Zamonaviy qurish vositalari (build tools) buni avtomatik bajaradi." },

        { h2: "To'liq namuna" },
        { p: "Yuqoridagi barcha elementlarni birlashtirgan to'liq, ishlatishga tayyor <code>server</code> bloki:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name mysite.com www.mysite.com;",
          "",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    # asosiy marshrutlash",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "",
          "    # statik resurslarni uzoq muddat keshlash",
          "    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff2)$ {",
          "        expires 30d;",
          "        add_header Cache-Control \"public, no-transform\";",
          "        access_log off;",
          "    }",
          "",
          "    # maxsus xato sahifalari",
          "    error_page 404 /404.html;",
          "    error_page 500 502 503 504 /50x.html;",
          "",
          "    # gzip (agar http blokida yoqilmagan bo'lsa)",
          "    gzip on;",
          "    gzip_types text/css application/javascript application/json;",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "Statik sayt uchun asosiy sozlamalar: <code>root</code>, <code>index</code> va <code>location /</code>;",
          "<code>try_files $uri $uri/ =404;</code> faylni, so'ng papkani sinab ko'radi, topmasa 404 beradi;",
          "SPA uchun <code>try_files $uri $uri/ /index.html;</code> ishlatiladi;",
          "<code>error_page</code> maxsus 404 va boshqa xato sahifalarini beradi;",
          "<code>gzip on;</code> matnli fayllarni siqib, saytni tezlashtiradi;",
          "<code>expires</code> va <code>Cache-Control</code> statik resurslarni brauzer keshida saqlaydi."
        ] }
      ]
    },

    {
      slug: "nginx-reverse-proxy",
      title: "Reverse proxy va load balancing",
      blurb: "Reverse proxy tushunchasi, proxy_pass bilan Node.js ilovaga so'rov uzatish, proxy_set_header (Host, X-Real-IP), upstream bloki bilan load balancing va usullar (round-robin, least_conn).",
      body: [
        { lead: "Zamonaviy veb-ilovalar (Node.js, Python, Java) ko'pincha o'z ichki serveriga ega bo'lib, ma'lum portda (masalan, 3000) ishlaydi. Lekin bu ilovalarni to'g'ridan-to'g'ri internetga ochish yaxshi emas. Buning o'rniga oldiga <strong>Nginx</strong> qo'yiladi — bu <strong>reverse proxy</strong> deb ataladi. Ushbu darsda reverse proxy va load balancing'ni batafsil o'rganamiz." },

        { h2: "Reverse proxy nima?" },
        { p: "<strong>Reverse proxy</strong> (teskari proksi) — bu klient (brauzer) bilan orqa fondagi ilova o'rtasida turuvchi vositachi. Brauzer faqat Nginx bilan gaplashadi, Nginx esa so'rovni orqadagi ilovaga uzatib, javobni qaytaradi." },
        { p: "Jarayon quyidagicha kechadi:" },
        { ol: [
          "Brauzer <code>https://mysite.com</code> ga so'rov yuboradi;",
          "Nginx bu so'rovni 80/443 portida qabul qiladi;",
          "Nginx so'rovni ichki ilovaga uzatadi (masalan, <code>http://localhost:3000</code>);",
          "Node.js ilovasi javob tayyorlaydi;",
          "Nginx bu javobni brauzerga qaytaradi."
        ] },
        { p: "Reverse proxy'ning afzalliklari:" },
        { ul: [
          "Ilova internetga to'g'ridan-to'g'ri ochiq bo'lmaydi — <strong>xavfsizroq</strong>;",
          "Nginx statik fayllarni o'zi beradi, ilovani yuklamaydi;",
          "SSL/HTTPS'ni Nginx boshqaradi (ilova bilan ovora bo'lmaydi);",
          "Bir nechta ilovani (masalan, <code>/api</code> Node.js'ga, <code>/</code> statik saytga) bitta domenda birlashtirish mumkin;",
          "Load balancing (yukni taqsimlash) imkonini beradi."
        ] },

        { h2: "proxy_pass — so'rovni uzatish" },
        { p: "So'rovni orqadagi ilovaga uzatish uchun <code>proxy_pass</code> direktivasi ishlatiladi. Faraz qilaylik, Node.js ilovasi <code>localhost:3000</code> da ishlayapti:" },
        { code: [
          "server {",
          "    listen 80;",
          "    server_name mysite.com;",
          "",
          "    location / {",
          "        proxy_pass http://localhost:3000;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Endi <code>mysite.com</code> ga kelgan har bir so'rov <code>localhost:3000</code> da ishlayotgan Node.js ilovasiga uzatiladi. Brauzer buni sezmaydi — u faqat Nginx bilan ishlaydi." },
        { note: "<code>localhost:3000</code> — bu serverning o'zidagi 3000-port. Node.js ilovasini shu portda ishga tushirasiz (masalan, Express'da <code>app.listen(3000)</code>), Nginx esa unga so'rovlarni uzatadi." },

        { h2: "proxy_set_header — sarlavhalarni to'g'ri uzatish" },
        { p: "Nginx so'rovni uzatganda, orqadagi ilova <strong>haqiqiy klient haqidagi</strong> ma'lumotni yo'qotishi mumkin. Chunki ilova nazarida so'rov Nginx'dan (localhost'dan) kelmoqda. Buni tuzatish uchun maxsus sarlavhalarni qo'lda o'rnatamiz:" },
        { code: [
          "location / {",
          "    proxy_pass http://localhost:3000;",
          "",
          "    proxy_set_header Host $host;",
          "    proxy_set_header X-Real-IP $remote_addr;",
          "    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
          "    proxy_set_header X-Forwarded-Proto $scheme;",
          "}"
        ].join("\n") },
        { p: "Har bir sarlavhaning vazifasi:" },
        { ul: [
          "<code>Host $host;</code> — brauzer so'ragan asl domen nomini ilovaga yetkazadi (<code>$host</code> — kelgan so'rovdagi domen);",
          "<code>X-Real-IP $remote_addr;</code> — <strong>haqiqiy foydalanuvchi</strong> IP manzilini uzatadi (<code>$remote_addr</code> — klient IP'si);",
          "<code>X-Forwarded-For</code> — so'rov qaysi proksilardan o'tganini zanjir ko'rinishida saqlaydi;",
          "<code>X-Forwarded-Proto $scheme;</code> — asl so'rov HTTP mi yoki HTTPS mi — shuni bildiradi (<code>$scheme</code> — protokol nomi)."
        ] },
        { warn: "<code>X-Real-IP</code> ni uzatmasangiz, ilovangiz barcha so'rovlarni bir xil IP (localhost yoki Nginx IP'si) dan kelayotgandek ko'radi. Bu foydalanuvchi statistikasi, ban qilish yoki geolokatsiya kabi funksiyalarni buzadi. Shuning uchun reverse proxy'da bu sarlavhalar deyarli har doim o'rnatiladi." },

        { h2: "WebSocket'ni qo'llab-quvvatlash" },
        { p: "Agar ilovangiz WebSocket (real vaqtli ulanish, masalan chat) ishlatsa, qo'shimcha sarlavhalar kerak bo'ladi:" },
        { code: [
          "location / {",
          "    proxy_pass http://localhost:3000;",
          "",
          "    proxy_http_version 1.1;",
          "    proxy_set_header Upgrade $http_upgrade;",
          "    proxy_set_header Connection \"upgrade\";",
          "    proxy_set_header Host $host;",
          "}"
        ].join("\n") },
        { p: "Bu sarlavhalar oddiy HTTP ulanishini WebSocket ulanishiga \"ko'tarish\" (upgrade) imkonini beradi." },

        { h2: "Load balancing va upstream bloki" },
        { p: "Agar saytingizga juda ko'p trafik kelsa, bitta ilova serveri yetmasligi mumkin. Yechim — ilovaning <strong>bir nechta nusxasini</strong> (masalan, 3000, 3001, 3002 portlarida) ishga tushirib, so'rovlarni ular orasida taqsimlash. Buning uchun <code>upstream</code> bloki ishlatiladi:" },
        { code: [
          "# orqa fondagi serverlar guruhini e'lon qilamiz",
          "upstream backend {",
          "    server localhost:3000;",
          "    server localhost:3001;",
          "    server localhost:3002;",
          "}",
          "",
          "server {",
          "    listen 80;",
          "    server_name mysite.com;",
          "",
          "    location / {",
          "        proxy_pass http://backend;",
          "        proxy_set_header Host $host;",
          "        proxy_set_header X-Real-IP $remote_addr;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Bu yerda <code>upstream backend { ... }</code> — uchta server nusxasidan iborat guruh yaratadi. <code>proxy_pass http://backend;</code> esa so'rovni shu guruhga (aniq bir serverga emas) uzatadi. Nginx so'rovlarni serverlar orasida avtomatik taqsimlaydi." },

        { h2: "Load balancing usullari" },
        { p: "Nginx so'rovlarni serverlar orasida qanday taqsimlashini bir necha usulda sozlash mumkin:" },

        { h3: "round-robin (standart)" },
        { p: "Standart usul. So'rovlar serverlarga <strong>navbat bilan</strong> beriladi: birinchi so'rov 1-serverga, ikkinchisi 2-serverga, uchinchisi 3-serverga, keyin yana 1-serverga va h.k. Hech qanday qo'shimcha sozlash kerak emas:" },
        { code: [
          "upstream backend {",
          "    server localhost:3000;",
          "    server localhost:3001;",
          "    server localhost:3002;",
          "}"
        ].join("\n") },

        { h3: "least_conn (eng kam ulanish)" },
        { p: "So'rov ayni damda <strong>eng kam faol ulanishga</strong> ega bo'lgan serverga yuboriladi. Bu so'rovlar turli vaqt talab qilganda foydali — band serverlarga kamroq yuk tushadi:" },
        { code: [
          "upstream backend {",
          "    least_conn;",
          "    server localhost:3000;",
          "    server localhost:3001;",
          "}"
        ].join("\n") },

        { h3: "ip_hash (IP bo'yicha)" },
        { p: "Bir xil IP'dan kelgan so'rovlar <strong>doim bir xil serverga</strong> yuboriladi. Bu sessiya (login holati) serverda saqlanadigan holatlarda foydali:" },
        { code: [
          "upstream backend {",
          "    ip_hash;",
          "    server localhost:3000;",
          "    server localhost:3001;",
          "}"
        ].join("\n") },

        { h2: "Server vaznlari va zaxira" },
        { p: "Serverlar quvvati har xil bo'lsa, ularga <strong>vazn</strong> (weight) berish mumkin — kuchliroq serverga ko'proq so'rov tushadi:" },
        { code: [
          "upstream backend {",
          "    server localhost:3000 weight=3;   # 3 barobar ko'p so'rov oladi",
          "    server localhost:3001 weight=1;",
          "    server localhost:3002 backup;     # faqat boshqalar ishlamay qolsa ishlaydi",
          "}"
        ].join("\n") },
        { ul: [
          "<code>weight=3</code> — bu serverga uch barobar ko'proq so'rov yuboriladi;",
          "<code>backup</code> — bu server odatda ishlatilmaydi, faqat asosiy serverlar ishdan chiqsa faollashadi."
        ] },
        { tip: "Bir domende bir necha ilovani birlashtirish uchun turli <code>location</code> larda turli <code>proxy_pass</code> ishlatishingiz mumkin: <code>location /api/</code> ni Node.js'ga, <code>location /</code> ni esa statik saytga yo'naltirish." },

        { h2: "To'liq namuna: statik + API" },
        { p: "Amalda ko'p uchraydigan holat — statik fayllarni Nginx beradi, <code>/api/</code> so'rovlarini esa Node.js ilovasiga uzatadi:" },
        { code: [
          "upstream api_backend {",
          "    least_conn;",
          "    server localhost:3000;",
          "    server localhost:3001;",
          "}",
          "",
          "server {",
          "    listen 80;",
          "    server_name mysite.com;",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    # statik fayllar Nginx tomonidan beriladi",
          "    location / {",
          "        try_files $uri $uri/ /index.html;",
          "    }",
          "",
          "    # /api/ so'rovlari Node.js ilovasiga uzatiladi",
          "    location /api/ {",
          "        proxy_pass http://api_backend;",
          "        proxy_set_header Host $host;",
          "        proxy_set_header X-Real-IP $remote_addr;",
          "        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
          "        proxy_set_header X-Forwarded-Proto $scheme;",
          "    }",
          "}"
        ].join("\n") },

        { h2: "Xulosa" },
        { ul: [
          "<strong>Reverse proxy</strong> — Nginx orqadagi ilovaga (masalan, Node.js) so'rovlarni uzatuvchi vositachi;",
          "<code>proxy_pass http://localhost:3000;</code> so'rovni ilovaga yuboradi;",
          "<code>proxy_set_header</code> bilan <code>Host</code>, <code>X-Real-IP</code> kabi sarlavhalarni to'g'ri uzatish shart;",
          "<code>upstream</code> bloki bir nechta server guruhini yaratib, load balancing imkonini beradi;",
          "Usullar: <code>round-robin</code> (standart, navbat bilan), <code>least_conn</code> (eng kam ulanish), <code>ip_hash</code> (IP bo'yicha);",
          "<code>weight</code> va <code>backup</code> bilan serverlarga turli rol berish mumkin."
        ] }
      ]
    },

    {
      slug: "nginx-ssl",
      title: "SSL/HTTPS sozlash",
      blurb: "Nega HTTPS kerak, Let's Encrypt / certbot bilan bepul sertifikat, listen 443 ssl, ssl_certificate direktivalari, HTTP dan HTTPS ga yo'naltirish (return 301) va certbot --nginx.",
      body: [
        { lead: "Bugungi kunda har bir jiddiy sayt <strong>HTTPS</strong> orqali ishlashi shart. Bu ma'lumotni shifrlaydi va foydalanuvchi ishonchini oshiradi. Ushbu darsda nima uchun HTTPS zarurligini, bepul sertifikat olishni (Let's Encrypt / certbot), Nginx'da SSL sozlashni va HTTP'dan HTTPS'ga yo'naltirishni batafsil o'rganamiz." },

        { h2: "Nega HTTPS kerak?" },
        { p: "<strong>HTTP</strong> — oddiy, shifrlanmagan protokol. Uning kamchiligi: brauzer bilan server o'rtasidagi ma'lumot ochiq (matn ko'rinishida) uzatiladi. Buni yo'ldagi har qanday oraliq (masalan, ochiq Wi-Fi tarmog'idagi hujumchi) o'qishi mumkin — parollar, kredit karta ma'lumotlari va h.k." },
        { p: "<strong>HTTPS</strong> (HTTP + TLS/SSL shifrlash) esa bu muammoni hal qiladi:" },
        { ul: [
          "<strong>Maxfiylik:</strong> ma'lumot shifrlanadi, uni yo'lda hech kim o'qiy olmaydi;",
          "<strong>Yaxlitlik:</strong> ma'lumot yo'lda o'zgartirilmaganini kafolatlaydi;",
          "<strong>Autentifikatsiya:</strong> siz haqiqatan ham o'sha sayt bilan gaplashayotganingizni tasdiqlaydi;",
          "<strong>Ishonch:</strong> brauzerlar HTTP saytlarni \"xavfsiz emas\" deb belgilaydi, HTTPS esa qulf belgisini ko'rsatadi;",
          "<strong>SEO:</strong> qidiruv tizimlari HTTPS saytlarni afzal ko'radi."
        ] },
        { note: "HTTPS ishlashi uchun serverga <strong>SSL sertifikat</strong> kerak. Bu — ishonchli tashkilot (Certificate Authority, CA) tomonidan berilgan raqamli hujjat bo'lib, saytingiz haqiqiyligini tasdiqlaydi." },

        { h2: "Let's Encrypt va certbot" },
        { p: "Ilgari SSL sertifikatlar pullik edi. Endi <strong>Let's Encrypt</strong> degan bepul, avtomatlashtirilgan sertifikat markazi mavjud. Uni ishlatishning eng oson yo'li — <strong>certbot</strong> vositasi. Certbot sertifikatni oladi, Nginx config'ini avtomatik sozlaydi va sertifikatni yangilab turadi." },
        { p: "Certbot'ni o'rnatish (Ubuntu misolida):" },
        { code: "sudo apt update\nsudo apt install certbot python3-certbot-nginx" },
        { p: "Bu yerda <code>python3-certbot-nginx</code> — certbot'ning Nginx bilan avtomatik ishlash uchun qo'shimchasi (plugin)." },

        { h2: "certbot --nginx bilan avtomatik sozlash" },
        { p: "Eng oson usul — certbot'ga hamma ishni topshirish. U sertifikatni oladi va Nginx config'ini o'zi tahrirlaydi:" },
        { code: "sudo certbot --nginx -d mysite.com -d www.mysite.com" },
        { p: "Bu buyruq bajarilishida certbot quyidagilarni qiladi:" },
        { ol: [
          "Let's Encrypt'dan <code>mysite.com</code> va <code>www.mysite.com</code> uchun sertifikat so'raydi;",
          "Domen haqiqatan ham sizga tegishli ekanini tekshiradi;",
          "Sertifikat fayllarini serverga saqlaydi;",
          "Nginx config'iga <code>listen 443 ssl</code> va sertifikat yo'llarini avtomatik qo'shadi;",
          "HTTP'dan HTTPS'ga yo'naltirishni sozlashni taklif qiladi;",
          "Nginx'ni qayta yuklaydi."
        ] },
        { tip: "Ko'p hollarda <code>certbot --nginx</code> yetarli — u hammasini o'zi bajaradi. Lekin nima sodir bo'layotganini tushunish uchun quyida qo'lda sozlashni ham ko'rib chiqamiz." },

        { h2: "Sertifikatni qo'lda sozlash" },
        { p: "Certbot sertifikat olgach, uni olganda fayllar odatda <code>/etc/letsencrypt/live/mysite.com/</code> papkasida saqlanadi. Nginx config'ida ularni quyidagicha ko'rsatamiz:" },
        { code: [
          "server {",
          "    listen 443 ssl;",
          "    server_name mysite.com www.mysite.com;",
          "",
          "    ssl_certificate     /etc/letsencrypt/live/mysite.com/fullchain.pem;",
          "    ssl_certificate_key /etc/letsencrypt/live/mysite.com/privkey.pem;",
          "",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Asosiy direktivalar:" },
        { ul: [
          "<code>listen 443 ssl;</code> — 443-portni (HTTPS uchun standart) tinglaydi va SSL'ni yoqadi;",
          "<code>ssl_certificate</code> — sertifikat (ochiq kalit) faylining yo'li; <code>fullchain.pem</code> saytingiz sertifikati va oraliq sertifikatlarni o'z ichiga oladi;",
          "<code>ssl_certificate_key</code> — <strong>maxfiy kalit</strong> fayli yo'li; bu <code>privkey.pem</code> ni hech kimga bermang."
        ] },
        { warn: "<code>privkey.pem</code> — sizning <strong>maxfiy kalitingiz</strong>. U hech qachon ommaga oshkor bo'lmasligi kerak. Agar kimdir uni qo'lga kiritsa, u sizning nomingizdan shifrlangan trafikni o'qiy oladi. Fayl ruxsatlari faqat root uchun ochiq bo'lishi shart." },

        { h2: "HTTP'dan HTTPS'ga yo'naltirish" },
        { p: "Sayt HTTPS'da ishlashi kerak bo'lsa ham, kimdir hali ham <code>http://mysite.com</code> (80-port) ga kirishi mumkin. Bunday so'rovlarni avtomatik ravishda HTTPS'ga <strong>yo'naltirish</strong> (redirect) kerak. Buning uchun alohida <code>server</code> bloki yaratamiz:" },
        { code: [
          "# 80-portdagi (HTTP) barcha so'rovlarni HTTPS'ga yo'naltirish",
          "server {",
          "    listen 80;",
          "    server_name mysite.com www.mysite.com;",
          "",
          "    return 301 https://$host$request_uri;",
          "}",
          "",
          "# asosiy HTTPS server",
          "server {",
          "    listen 443 ssl;",
          "    server_name mysite.com www.mysite.com;",
          "",
          "    ssl_certificate     /etc/letsencrypt/live/mysite.com/fullchain.pem;",
          "    ssl_certificate_key /etc/letsencrypt/live/mysite.com/privkey.pem;",
          "",
          "    root /var/www/mysite;",
          "    index index.html;",
          "",
          "    location / {",
          "        try_files $uri $uri/ =404;",
          "    }",
          "}"
        ].join("\n") },
        { p: "Yo'naltirish qatorini batafsil ko'raylik:" },
        { code: "return 301 https://$host$request_uri;" },
        { ul: [
          "<code>return 301</code> — brauzerga \"bu manzil doimiy ravishda ko'chdi\" degan javob (301 — doimiy yo'naltirish);",
          "<code>https://</code> — yangi manzil HTTPS bilan boshlanadi;",
          "<code>$host</code> — so'ralgan domen nomi (masalan, <code>mysite.com</code>);",
          "<code>$request_uri</code> — so'ralgan to'liq yo'l va parametrlar (masalan, <code>/blog?id=5</code>)."
        ] },
        { p: "Natijada foydalanuvchi <code>http://mysite.com/blog</code> ga kirsa, avtomatik ravishda <code>https://mysite.com/blog</code> ga o'tkaziladi — aynan o'sha sahifaga, lekin xavfsiz protokolda." },
        { note: "<code>return 301</code> — doimiy yo'naltirish; brauzer va qidiruv tizimlari buni eslab qoladi. Vaqtinchalik yo'naltirish uchun <code>302</code> ishlatiladi, lekin HTTP&rarr;HTTPS uchun doim 301 to'g'ri variant." },

        { h2: "Qo'shimcha SSL sozlamalari" },
        { p: "Xavfsizlikni oshirish uchun ba'zi qo'shimcha direktivalar tavsiya etiladi (certbot ularni ko'pincha o'zi qo'shadi):" },
        { code: [
          "server {",
          "    listen 443 ssl;",
          "    server_name mysite.com;",
          "",
          "    ssl_certificate     /etc/letsencrypt/live/mysite.com/fullchain.pem;",
          "    ssl_certificate_key /etc/letsencrypt/live/mysite.com/privkey.pem;",
          "",
          "    # faqat zamonaviy, xavfsiz protokollarga ruxsat",
          "    ssl_protocols TLSv1.2 TLSv1.3;",
          "",
          "    # server tanlagan shifrlash usulini afzal ko'rish",
          "    ssl_prefer_server_ciphers on;",
          "",
          "    # SSL sessiyalarini keshlash (tezlik uchun)",
          "    ssl_session_cache shared:SSL:10m;",
          "    ssl_session_timeout 10m;",
          "}"
        ].join("\n") },
        { ul: [
          "<code>ssl_protocols TLSv1.2 TLSv1.3;</code> — faqat zamonaviy va xavfsiz protokollarga ruxsat (eski, zaif SSLv3/TLSv1.0 ni o'chiradi);",
          "<code>ssl_session_cache</code> — takroriy ulanishlarni tezlashtiradi (har safar SSL'ni qayta o'rnatmaydi)."
        ] },

        { h2: "Sertifikatni avtomatik yangilash" },
        { p: "Let's Encrypt sertifikatlari <strong>90 kun</strong> amal qiladi. Ularni muntazam yangilab turish kerak. Certbot buni avtomatlashtiradi — u odatda tizimga rejalashtirilgan vazifa (timer/cron) o'rnatadi. Yangilashni sinab ko'rish uchun:" },
        { code: "sudo certbot renew --dry-run" },
        { p: "<code>--dry-run</code> — haqiqiy yangilamasdan, jarayonni <strong>sinovdan</strong> o'tkazadi. Agar bu buyruq xatosiz ishlasa, avtomatik yangilash ham to'g'ri ishlaydi degani. Muddati yaqinlashgan sertifikatlarni haqiqatan yangilash uchun oddiy <code>sudo certbot renew</code> ishlatiladi." },
        { tip: "Sertifikat yangilangach, Nginx yangi sertifikatni o'qishi uchun qayta yuklanishi kerak. Certbot buni odatda avtomatik bajaradi, lekin qo'lda yangilaganda <code>sudo nginx -s reload</code> ni unutmang." },

        { h2: "Xulosa" },
        { ul: [
          "<strong>HTTPS</strong> ma'lumotni shifrlaydi, foydalanuvchini himoya qiladi va ishonch beradi;",
          "<strong>Let's Encrypt</strong> bepul sertifikat beradi, <strong>certbot</strong> uni o'rnatishni avtomatlashtiradi;",
          "<code>sudo certbot --nginx -d domen.com</code> — eng oson usul, hammasini o'zi sozlaydi;",
          "Qo'lda sozlashda: <code>listen 443 ssl;</code>, <code>ssl_certificate</code> va <code>ssl_certificate_key</code>;",
          "HTTP'dan HTTPS'ga yo'naltirish uchun alohida 80-port server bloki va <code>return 301 https://$host$request_uri;</code>;",
          "Sertifikatlar 90 kun amal qiladi; certbot ularni avtomatik yangilaydi (<code>certbot renew</code>)."
        ] }
      ]
    }
  ]
};
