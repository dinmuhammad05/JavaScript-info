"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Tarmoq va tizim xavfsizligi",
  lessons: [
    {
      slug: "xavfsizlik-sarlavhalari",
      title: "HTTP xavfsizlik sarlavhalari (CSP, HSTS...)",
      blurb: "Brauzerga xavfsiz xatti-harakatni buyuruvchi HTTP sarlavhalari: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy va Permissions-Policy; ularni nginx va Express'da sozlash hamda cookie bayroqlari.",
      body: [
        { lead: "Server brauzerga javob qaytarganda, u nafaqat HTML sahifani, balki bir qator <strong>HTTP sarlavhalarini</strong> ham yuboradi. Bu sarlavhalar orqali biz brauzerga: \"faqat shu manbalarga ishon\", \"meni doim shifrlangan ulanish orqali och\", \"meni ramka ichiga qo'yma\" kabi buyruqlar bera olamiz. Bir necha qator sozlama qo'shish bilan biz butun bir sinf hujumlarni oldindan yopamiz. Ushbu darsda asosiy xavfsizlik sarlavhalarini va ularni haqiqiy serverda qanday yoqishni o'rganamiz." },

        { note: "Bu bob to'liq <strong>himoya</strong> yo'nalishida yozilgan. Maqsad — serveringizni va tarmog'ingizni qanday mustahkamlashni o'rganish. Hech qanday hujum vositasi yoki yo'riqnomasi berilmaydi." },

        { h2: "Nega xavfsizlik sarlavhalari muhim?" },
        { p: "Zamonaviy brauzer — bu juda kuchli, ammo ayni paytda xavfli muhit. U sizning saytingizdagi skriptlarni ishga tushiradi, boshqa saytlarga so'rov yuboradi, ma'lumotni saqlaydi. Agar biror joyda nazorat zaif bo'lsa, niyati buzuq kishi foydalanuvchi brauzerida zararli kod ishga tushirishga urinishi mumkin." },
        { p: "Xavfsizlik sarlavhalari — bu <strong>brauzerga beriladigan qat'iy ko'rsatmalar</strong>. Ular hujum yuzasini (attack surface) kamaytiradi: brauzer o'zi allaqachon himoya mexanizmlariga ega, biz shunchaki ularni yoqamiz va to'g'ri sozlaymiz." },
        { ul: [
          "Ular arzon: ko'pincha bir necha qator konfiguratsiya;",
          "Ular kuchli: butun bir sinf hujumlarni (XSS, clickjacking, protokol pasaytirish) qiyinlashtiradi;",
          "Ular <em>chuqurlashtirilgan himoyaning</em> (defense in depth) bir qatlami: boshqa himoyalar ustiga qo'shiladi."
        ] },

        { h2: "Content-Security-Policy (CSP)" },
        { p: "<strong>CSP</strong> — bu eng kuchli va ayni paytda eng nozik sarlavha. U brauzerga sahifa qaysi manbalardan skript, stil, rasm va boshqa resurslarni yuklashi mumkinligini aytadi. Agar zararli skript sahifaga qandaydir tarzda kirib qolsa ham, CSP uni ishga tushirishga yo'l qo'ymasligi mumkin." },
        { p: "Masalan, siz brauzerga: \"skriptlarni faqat mening domenimdan yukla, tashqi <em>inline</em> skriptlarni umuman ishga tushirma\" deb ayta olasiz. Bu XSS hujumlarining ta'sirini keskin kamaytiradi." },
        { code: [
          "# CSP misoli: faqat o'z domenimizdan resurs yuklash",
          "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'",
          "",
          "# default-src 'self'  -> standart holatda faqat o'z domen",
          "# script-src 'self'   -> skriptlar faqat o'z domendan",
          "# object-src 'none'   -> <object>/<embed> umuman taqiqlangan"
        ].join("\n") },
        { warn: "CSP'ni <code>'unsafe-inline'</code> yoki <code>'unsafe-eval'</code> bilan bo'shashtirmang — bu himoyaning aksariyat qiymatini yo'qotadi. Siyosatni qat'iy boshlab, kerak bo'lganda ehtiyotkorlik bilan yumshating." },

        { h2: "Strict-Transport-Security (HSTS)" },
        { p: "<strong>HSTS</strong> brauzerga: \"bundan buyon meni faqat HTTPS orqali och, agar kimdir HTTP'ga tushirmoqchi bo'lsa — rad et\" deb aytadi. Bu foydalanuvchi tasodifan yoki hujum natijasida shifrlanmagan HTTP ulanishga tushib qolishining oldini oladi." },
        { code: [
          "# HSTS: bir yil davomida faqat HTTPS, barcha subdomenlar bilan",
          "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
          "",
          "# max-age=31536000  -> bir yil (soniyalarda)",
          "# includeSubDomains -> barcha subdomenlarga ham amal qiladi",
          "# preload           -> brauzerlarning oldindan yuklangan ro'yxatiga"
        ].join("\n") },
        { note: "HSTS'ni yoqishdan oldin saytingiz to'liq HTTPS'da ishonchli ishlayotganiga amin bo'ling. <code>max-age</code> katta bo'lgani uchun xato sozlama foydalanuvchilarni uzoq vaqt qiynashi mumkin — avval kichik <code>max-age</code> bilan sinab ko'ring." },

        { h2: "X-Content-Type-Options va X-Frame-Options" },
        { p: "<strong>X-Content-Type-Options: nosniff</strong> — brauzerga fayl turini o'zicha \"taxmin qilishni\" (MIME sniffing) taqiqlaydi. Bu, masalan, rasm sifatida yuklangan faylni brauzer skript deb ishga tushirib yuborishining oldini oladi." },
        { p: "<strong>X-Frame-Options</strong> — clickjacking hujumidan himoya qiladi. Clickjacking'da hujumchi sizning saytingizni ko'rinmas ramka (iframe) ichiga joylab, foydalanuvchini aldab \"boshqa narsani bosayapman\" deb o'ylatgan holda sizning saytingizdagi tugmani bostiradi. Bu sarlavha saytingizni ramkaga qo'yishni taqiqlaydi." },
        { code: [
          "# Faylni brauzer o'zicha talqin qilmasin",
          "X-Content-Type-Options: nosniff",
          "",
          "# Saytni umuman ramka (iframe) ichiga qo'yishni taqiqlash",
          "X-Frame-Options: DENY",
          "",
          "# yoki faqat o'z domeningizga ruxsat berish:",
          "# X-Frame-Options: SAMEORIGIN"
        ].join("\n") },
        { p: "Zamonaviy yondashuvda <code>X-Frame-Options</code> o'rniga (yoki u bilan birga) CSP'ning <code>frame-ancestors</code> ko'rsatmasi ham ishlatiladi: <code>Content-Security-Policy: frame-ancestors 'none'</code>." },

        { h2: "Referrer-Policy va Permissions-Policy" },
        { p: "<strong>Referrer-Policy</strong> — foydalanuvchi sizning saytingizdan boshqa saytga o'tganda, qancha ma'lumot (qaysi sahifadan kelgani) uzatilishini boshqaradi. Bu maxfiylikni himoya qiladi: ba'zan URL'da nozik ma'lumot bo'lishi mumkin." },
        { p: "<strong>Permissions-Policy</strong> — sahifa qaysi qurilma imkoniyatlaridan (kamera, mikrofon, geolokatsiya) foydalana olishini cheklaydi. Agar saytingizga kamera kerak bo'lmasa, uni butunlay o'chirib qo'ying." },
        { code: [
          "# Boshqa saytga faqat cheklangan referrer ma'lumoti yuborish",
          "Referrer-Policy: strict-origin-when-cross-origin",
          "",
          "# Kamera, mikrofon va geolokatsiyani butunlay o'chirish",
          "Permissions-Policy: camera=(), microphone=(), geolocation=()"
        ].join("\n") },

        { h2: "Sarlavhalarni serverda qo'shish" },
        { p: "Endi bu sarlavhalarni haqiqiy serverga qanday joylashni ko'raylik. Avval <strong>nginx</strong> misoli. Sarlavhalar server yoki location blokida <code>add_header</code> orqali qo'shiladi:" },
        { code: [
          "# nginx: server bloki ichida",
          "server {",
          "    listen 443 ssl;",
          "    server_name misol.uz;",
          "",
          "    add_header Content-Security-Policy \"default-src 'self'\" always;",
          "    add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;",
          "    add_header X-Content-Type-Options \"nosniff\" always;",
          "    add_header X-Frame-Options \"DENY\" always;",
          "    add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;",
          "    add_header Permissions-Policy \"camera=(), microphone=(), geolocation=()\" always;",
          "}"
        ].join("\n") },
        { p: "Node.js/Express ilovasida esa xuddi shu ishni <code>helmet</code> kutubxonasi bir qatorda bajaradi. U yaxshi standart qiymatlarni o'rnatadi va kerakli joyni moslashtirishga ruxsat beradi:" },
        { code: [
          "const express = require('express');",
          "const helmet = require('helmet');",
          "const app = express();",
          "",
          "// helmet asosiy xavfsizlik sarlavhalarini o'rnatadi",
          "app.use(helmet());",
          "",
          "// CSP'ni aniqroq sozlash",
          "app.use(helmet.contentSecurityPolicy({",
          "  directives: {",
          "    defaultSrc: [\"'self'\"],",
          "    scriptSrc: [\"'self'\"],",
          "    objectSrc: [\"'none'\"]",
          "  }",
          "}));"
        ].join("\n") },

        { h2: "Cookie bayroqlari" },
        { p: "Sarlavhalar bilan bir qatorda, sessiya <strong>cookie</strong>'larini ham to'g'ri belgilash muhim. Uch muhim bayroq bor:" },
        { ul: [
          "<strong>HttpOnly:</strong> cookie'ga JavaScript orqali kirib bo'lmaydi. Bu XSS hujumida sessiya cookie'sining o'g'irlanishini qiyinlashtiradi;",
          "<strong>Secure:</strong> cookie faqat HTTPS orqali yuboriladi, shifrlanmagan HTTP'da emas;",
          "<strong>SameSite:</strong> cookie'ning boshqa saytdan kelgan so'rovlarda yuborilishini cheklaydi — bu CSRF hujumidan himoya qiladi."
        ] },
        { code: [
          "// Express'da sessiya cookie'sini xavfsiz sozlash",
          "res.cookie('sessiya', token, {",
          "  httpOnly: true,   // JS o'qiy olmaydi",
          "  secure: true,     // faqat HTTPS",
          "  sameSite: 'strict', // boshqa saytdan yuborilmaydi",
          "  maxAge: 1000 * 60 * 60 // 1 soat",
          "});"
        ].join("\n") },
        { tip: "Saytingizni yozib bo'lgach, uni <code>securityheaders.com</code> saytida tekshiring: u sarlavhalaringizni tahlil qilib, baho beradi va nima yetishmayotganini ko'rsatadi. Bu tez va bepul o'zini-o'zi tekshirish usuli." },

        { h2: "SameSite qiymatlarini tushunish" },
        { p: "<code>SameSite</code> bayrog'ining uch qiymati bor va ular xatti-harakatni sezilarli o'zgartiradi. Kerak bo'lmasa, eng qat'iysini tanlang:" },
        { ul: [
          "<strong>Strict:</strong> cookie faqat saytning o'zidan kelgan so'rovlarda yuboriladi — eng xavfsiz, ammo ba'zan noqulay (boshqa saytdan havola orqali kirganda sessiya ko'rinmaydi);",
          "<strong>Lax:</strong> asosiy navigatsiyada (havola bosish) yuboriladi, ammo fon so'rovlarida yo'q — ko'p sayt uchun oqilona standart;",
          "<strong>None:</strong> har doim yuboriladi, ammo majburan <code>Secure</code> bilan birga bo'lishi kerak — faqat haqiqatan zarur bo'lganda ishlating."
        ] },
        { p: "Amalda ko'pchilik sessiya cookie'lari uchun <code>Lax</code> yoki <code>Strict</code> to'g'ri tanlov bo'ladi. <code>None</code> ni faqat saytlararo integratsiya majbur qilganda ishlating." },

        { h2: "Sarlavhalarni sinash va nazorat qilish" },
        { p: "Sarlavhalarni sozlaganingizdan so'ng, ular haqiqatan javobda kelayotganini tekshirish muhim. Buni <code>curl</code> bilan tez ko'rish mumkin — u faqat sarlavhalarni chiqaradi:" },
        { code: [
          "# Serverdan qaytgan sarlavhalarni ko'rish (-I: faqat sarlavhalar)",
          "curl -I https://misol.uz",
          "",
          "# Natijada quyidagilarni ko'rishingiz kerak:",
          "# Content-Security-Policy: default-src 'self'",
          "# Strict-Transport-Security: max-age=31536000; includeSubDomains",
          "# X-Content-Type-Options: nosniff",
          "# X-Frame-Options: DENY"
        ].join("\n") },
        { note: "Sarlavhalarni bir marta qo'yib qo'yish yetarli emas. Ilova o'zgargani sayin (yangi domendan skript, yangi rasm manbasi) CSP siyosatini yangilash kerak bo'lishi mumkin. Uni deploy jarayonining bir qismi sifatida muntazam tekshiring." },

        { h2: "Xulosa" },
        { p: "Xavfsizlik sarlavhalari — bu eng arzon va samarali himoya qatlamlaridan biri. Bir necha qator konfiguratsiya bilan siz XSS, clickjacking, protokol pasaytirish va cookie o'g'irlash kabi bir qancha hujumni qiyinlashtirasiz." },
        { p: "Eslab qoling: bu sarlavhalar <strong>boshqa himoyalarni almashtirmaydi</strong>, balki ular ustiga qo'shiladi. Server tomonidagi validatsiya, HTTPS va to'g'ri autentifikatsiya baribir zarur. Keyingi darsda tarmoq darajasidagi himoyaga — firewall, portlar va VPN mavzusiga o'tamiz." }
      ]
    },

    {
      slug: "firewall-vpn-portlar",
      title: "Firewall, portlar va VPN",
      blurb: "Portlar va xizmatlar nima, ochiq port nega xavf; firewall bilan kirish/chiqish qoidalarini boshqarish (ufw misoli), eng kam ochiq port tamoyili, VPN va tarmoq segmentatsiyasi.",
      body: [
        { lead: "Serveringiz tarmoqqa ulangan zahoti u <strong>portlar</strong> orqali dunyoga ochiladi. Har bir ochiq port — bu bir eshik: kimdir o'sha eshikni taqillatib, ichkariga kirishga urinishi mumkin. Ushbu darsda portlar nima ekanini, firewall qanday qilib keraksiz eshiklarni yopishini, VPN nima uchun kerakligini va tarmoqni bo'laklarga ajratish g'oyasini o'rganamiz — barchasi himoya nuqtai nazaridan." },

        { h2: "Portlar va xizmatlar" },
        { p: "Tarmoqda har bir xizmat ma'lum bir <strong>port</strong>da \"tinglaydi\". Port — bu tarmoq ulanishining raqamli manzili. Masalan, web server odatda 80 (HTTP) va 443 (HTTPS) portlarida, SSH esa 22-portda ishlaydi." },
        { ul: [
          "<strong>22</strong> — SSH (masofaviy boshqaruv);",
          "<strong>80</strong> — HTTP (shifrlanmagan web);",
          "<strong>443</strong> — HTTPS (shifrlangan web);",
          "<strong>5432</strong> — PostgreSQL ma'lumotlar bazasi;",
          "<strong>3306</strong> — MySQL ma'lumotlar bazasi;",
          "<strong>6379</strong> — Redis."
        ] },
        { p: "Muammo shundaki: <strong>har bir ochiq port — bu potensial kirish nuqtasi</strong>. Agar port ortidagi xizmatda zaiflik bo'lsa yoki u parolsiz ochiq qolsa, u orqali serverga kirib olishga urinish mumkin. Shu bois asosiy tamoyil: <em>faqat haqiqatan kerak bo'lgan portlar ochiq bo'lsin</em>." },
        { warn: "Ma'lumotlar bazasi portlarini (5432, 3306, 6379) hech qachon to'g'ridan-to'g'ri internetga ochmang. Ular faqat ichki tarmoqda yoki <code>localhost</code>da tinglashi kerak." },

        { h2: "Firewall nima?" },
        { p: "<strong>Firewall</strong> (xavfsizlik devori) — bu tarmoq trafigini qoidalar asosida boshqaruvchi tizim. U server oldida turadi va: \"bu ulanishga ruxsat bor, bunisiga yo'q\" degan qarorlarni qabul qiladi." },
        { p: "Firewall ikki yo'nalishdagi trafikni boshqaradi:" },
        { ul: [
          "<strong>Kirish (inbound):</strong> tashqaridan serverga keladigan ulanishlar — bu eng muhim yo'nalish;",
          "<strong>Chiqish (outbound):</strong> serverdan tashqariga ketadigan ulanishlar — ba'zan buni ham cheklash foydali."
        ] },
        { p: "Eng yaxshi amaliyot — <strong>oq ro'yxat (allowlist)</strong> tamoyili: standart holatda hamma narsani taqiqlab, faqat kerakli portlarni ochish. Bu \"qora ro'yxat\"dan (bittalab taqiqlash) ancha xavfsizroq, chunki siz nimani ochayotganingizni aniq bilasiz." },

        { h2: "ufw bilan sodda qoidalar" },
        { p: "Linux'da eng oson firewall vositalaridan biri — <strong>ufw</strong> (Uncomplicated Firewall). U murakkab <code>iptables</code> qoidalarini oddiy buyruqlar bilan yozishga imkon beradi. Quyida tipik web server uchun sozlash:" },
        { code: [
          "# 1) Standart holatda: barcha kirishni taqiqlash, chiqishga ruxsat",
          "sudo ufw default deny incoming",
          "sudo ufw default allow outgoing",
          "",
          "# 2) Faqat kerakli portlarni ochish",
          "sudo ufw allow 22/tcp    # SSH (boshqaruv)",
          "sudo ufw allow 80/tcp    # HTTP",
          "sudo ufw allow 443/tcp   # HTTPS",
          "",
          "# 3) Firewall'ni yoqish",
          "sudo ufw enable",
          "",
          "# 4) Holatni tekshirish",
          "sudo ufw status verbose"
        ].join("\n") },
        { p: "Bu sozlamada faqat uch port ochiq: SSH, HTTP va HTTPS. Qolgan barcha portlar tashqaridan yopiq. Agar biror xizmat kerak bo'lmay qolsa, uning portini yopish oson: <code>sudo ufw delete allow 80/tcp</code>." },
        { tip: "SSH portini ochishni <em>unutmang</em> — aks holda firewall'ni yoqqaningizdan so'ng serverga masofadan kira olmay qolasiz. Har doim <code>allow 22</code> qoidasini avval qo'shing." },

        { h2: "Eng kam ochiq port tamoyili" },
        { p: "Xavfsizlikning oltin qoidasi — <strong>eng kam imtiyoz</strong> (least privilege). Portlar borasida bu shunday jaranglaydi: <em>faqat mutlaqo zarur bo'lgan portlar ochiq bo'lsin, boshqa hammasi yopiq</em>." },
        { p: "Vaqti-vaqti bilan serverdagi ochiq portlarni tekshirib turing. Qaysi xizmatlar tinglayotganini bilish muhim — ba'zan siz bilmagan holda o'rnatilgan dastur portni ochib qo'ygan bo'lishi mumkin:" },
        { code: [
          "# Qaysi xizmatlar qaysi portda tinglayotganini ko'rish",
          "sudo ss -tulpn",
          "",
          "# -t: TCP,  -u: UDP,  -l: tinglayotgan,",
          "# -p: jarayon nomi,  -n: raqamli ko'rinish",
          "",
          "# Natijada har bir tinglayotgan port va uning xizmati ko'rinadi.",
          "# Notanish yoki keraksiz xizmat topilsa — uni o'chiring."
        ].join("\n") },

        { h2: "VPN nima va nega kerak?" },
        { p: "<strong>VPN</strong> (Virtual Private Network) — bu ikki nuqta orasida <strong>shifrlangan tunnel</strong> yaratuvchi texnologiya. Uning ichidan o'tgan trafik tashqaridan ko'rinmaydi, go'yo ular bitta yopiq ichki tarmoqda joylashgandek." },
        { p: "VPN ikki asosiy holatda foydali:" },
        { ul: [
          "<strong>Masofaviy xavfsiz kirish:</strong> administratorlar boshqaruv panellariga yoki ichki xizmatlarga internetga ochmasdan, faqat VPN orqali kiradi;",
          "<strong>Xizmatlararo shifrlash:</strong> ma'lumotlar bazasi kabi nozik xizmatlar internetga ochilmasdan, VPN tunnel ichidan bog'lanadi."
        ] },
        { p: "Amaliy g'oya: boshqaruv paneli yoki ma'lumotlar bazasini butun internetga ochish o'rniga, uni faqat VPN tarmog'idan kirish mumkin qilib qo'ying. Shunda hujumchi avval VPN'ni yorib o'tishi kerak — bu himoyaning yana bir qatlami." },

        { h2: "Tarmoqni segmentlarga ajratish" },
        { p: "<strong>Tarmoq segmentatsiyasi</strong> (network segmentation) — tarmoqni bir-biridan ajratilgan bo'laklarga bo'lish g'oyasi. Maqsad: agar bir qism buzilsa ham, hujumchi butun tizimga bemalol tarqala olmasin." },
        { p: "Tipik misol — uch qatlamli ajratish:" },
        { ul: [
          "<strong>Ochiq qatlam:</strong> faqat web server, internetga ko'rinadi;",
          "<strong>Ilova qatlami:</strong> biznes-mantiq, faqat web serverdan kirish mumkin;",
          "<strong>Ma'lumot qatlami:</strong> ma'lumotlar bazasi, faqat ilova qatlamidan kirish mumkin, internetga umuman ochiq emas."
        ] },
        { note: "Segmentatsiya <strong>zararni cheklash</strong> tamoyiliga asoslanadi: bitta buzilish butun tizimni qulatmasligi kerak. Bu kemadagi suv o'tkazmas bo'lmalarga o'xshaydi — bir bo'lma suvga to'lsa ham, kema cho'kmaydi." },

        { h2: "Chiqish trafigini cheklash" },
        { p: "Ko'pchilik faqat <em>kirish</em> trafigi haqida o'ylaydi, ammo <strong>chiqish</strong> (outbound) trafigini cheklash ham foydali. Agar server buzilib qolsa, hujumchi ko'pincha ma'lumotni tashqariga uzatishga yoki tashqi buyruq serveriga ulanishga urinadi. Chiqishni cheklab, bunga to'sqinlik qilish mumkin." },
        { p: "Masalan, faqat web server bo'lgan mashinaga tashqariga faqat 443 (HTTPS) va DNS orqali chiqishga ruxsat berib, qolganini yopish mumkin. Bu buzilgan serverning \"uyga qo'ng'iroq qilishini\" qiyinlashtiradi." },
        { code: [
          "# ufw: chiqishni standart holatda taqiqlab, faqat kerakligini ochish",
          "sudo ufw default deny outgoing",
          "sudo ufw allow out 443/tcp    # HTTPS chiqishi",
          "sudo ufw allow out 53         # DNS so'rovlari",
          "sudo ufw allow out 80/tcp     # yangilanishlar uchun HTTP",
          "",
          "# Diqqat: chiqishni cheklash ilovani buzishi mumkin —",
          "# avval nima kerakligini aniqlab, keyin cheklang."
        ].join("\n") },

        { h2: "SSH portini himoyalash" },
        { p: "SSH — eng ko'p hujumga uchraydigan xizmat, shu bois uni alohida himoyalash muhim. Firewall darajasida SSH'ni faqat ma'lum, ishonchli IP manzillardan ochish mumkin:" },
        { code: [
          "# SSH'ni faqat ishonchli ofis IP manzilidan ochish",
          "sudo ufw allow from 203.0.113.5 to any port 22 proto tcp",
          "",
          "# Bu qoida bilan boshqa hech qaysi IP 22-portga ula olmaydi.",
          "# Doimiy IP bo'lmasa, VPN orqali kirishni ko'rib chiqing."
        ].join("\n") },
        { warn: "SSH'ni himoyalashda parol emas, <strong>kalit autentifikatsiyasi</strong>dan foydalaning. Parol taxmin qilinishi mumkin, uzun kriptografik kalit esa amalda taxmin qilib bo'lmaydi. Buni keyingi darsda batafsil ko'ramiz." },

        { h2: "Xulosa" },
        { p: "Tarmoq xavfsizligining asosi — <strong>kamroq eshik, ko'proq nazorat</strong>. Firewall bilan faqat kerakli portlarni oching, eng kam ochiq port tamoyiliga amal qiling, nozik xizmatlarni VPN ortiga yashiring va tarmoqni segmentlarga ajrating." },
        { p: "Keyingi darsda serverning o'zini ichkaridan mustahkamlashga — Linux serverni <em>qattiqlashtirish</em> (hardening) mavzusiga o'tamiz. Bunda SSH, foydalanuvchilar va avtomatik himoya vositalarini sozlaymiz." }
      ]
    },

    {
      slug: "server-hardening",
      title: "Linux serverni qattiqlashtirish (hardening)",
      blurb: "Serverni ichkaridan mustahkamlash: tizimni yangilash, keraksiz xizmatlarni o'chirish, kuchli SSH (kalit autentifikatsiya, root login o'chirish), sudo foydalanuvchi, fail2ban, avtomatik yangilanish va fayl ruxsatlari.",
      body: [
        { lead: "Firewall serverni tashqaridan himoya qiladi. Ammo eshiklar yopilganidan keyin ham serverning <strong>ichki sozlamalari</strong> zaif bo'lishi mumkin: ochiq qolgan standart parollar, root sifatida kirish imkoniyati, eskirgan dasturlar. <strong>Hardening</strong> (qattiqlashtirish) — bu serverni ichkaridan mustahkamlash jarayoni. Ushbu darsda tipik Linux serverni bosqichma-bosqich qanday himoyalashni o'rganamiz." },

        { h2: "Hardening nima?" },
        { p: "<strong>Hardening</strong> — bu tizimning hujum yuzasini kamaytirish va standart, zaif sozlamalarni xavfsizroq holatga keltirish jarayoni. Yangi o'rnatilgan server odatda <em>qulaylik</em> uchun sozlangan bo'ladi — xavfsizlik uchun emas." },
        { warn: "Standart (default) sozlama deyarli hech qachon xavfsiz emas. Yangi server — bu himoyalanmagan server; birinchi ishingiz uni qattiqlashtirish bo'lishi kerak." },
        { p: "Hardening — bu bir martalik amal emas, balki tekshirilishi lozim bo'lgan qadamlar ro'yxati. Quyida asosiy qadamlarni ko'rib chiqamiz." },

        { h2: "1. Tizimni yangilab turish" },
        { p: "Eng oddiy, ammo eng muhim qadam — tizim va dasturlarni doim so'nggi versiyada saqlash. Ko'p hujumlar allaqachon tuzatilgan, ma'lum zaifliklardan foydalanadi. Yangilash — ularni yopadi." },
        { code: [
          "# Debian/Ubuntu tizimida paketlar ro'yxatini yangilash",
          "sudo apt update",
          "",
          "# Mavjud yangilanishlarni o'rnatish",
          "sudo apt upgrade -y",
          "",
          "# Vaqti-vaqti bilan bu buyruqlarni takrorlang.",
          "# Muhim: yadro yangilanishidan so'ng serverni qayta yuklash kerak bo'lishi mumkin."
        ].join("\n") },

        { h2: "2. Keraksiz xizmatlarni o'chirish" },
        { p: "Har bir ishlab turgan xizmat — bu potensial zaiflik. Agar biror xizmat kerak bo'lmasa, uni o'chiring: kamroq ishlaydigan dastur — kamroq hujum yuzasi degani." },
        { code: [
          "# Ishlab turgan xizmatlarni ko'rish",
          "systemctl list-units --type=service --state=running",
          "",
          "# Keraksiz xizmatni to'xtatish va o'chirish",
          "sudo systemctl stop keraksiz-xizmat",
          "sudo systemctl disable keraksiz-xizmat"
        ].join("\n") },

        { h2: "3. Kuchli SSH sozlamasi" },
        { p: "SSH — bu serverga masofadan kirishning asosiy eshigi, shu bois eng ko'p hujumga uchraydigan xizmat. Uni mustahkamlashning uch muhim qadami bor: <strong>kalit autentifikatsiyasiga o'tish</strong>, <strong>parol bilan kirishni o'chirish</strong> va <strong>root sifatida kirishni taqiqlash</strong>." },
        { p: "Parol o'rniga <strong>SSH kalit</strong> ishlatiladi: bu juda uzun, taxmin qilib bo'lmas kriptografik kalit juftligi. Ochiq kalit serverda saqlanadi, maxfiy kalit esa faqat sizda qoladi." },
        { code: [
          "# /etc/ssh/sshd_config faylidagi muhim sozlamalar",
          "",
          "# Root sifatida to'g'ridan-to'g'ri kirishni taqiqlash",
          "PermitRootLogin no",
          "",
          "# Parol bilan kirishni o'chirish (faqat kalit)",
          "PasswordAuthentication no",
          "PubkeyAuthentication yes",
          "",
          "# Bo'sh parollarni taqiqlash",
          "PermitEmptyPasswords no",
          "",
          "# Sozlamani qo'llash uchun SSH xizmatini qayta ishga tushiring:",
          "# sudo systemctl restart sshd"
        ].join("\n") },
        { warn: "SSH sozlamasini o'zgartirishdan oldin kalit autentifikatsiyasi ishlayotganiga amin bo'ling va joriy sessiyani yopmang. Yangi terminal oynasida ulanishni sinab ko'rgach, eskisini yoping — aks holda o'zingizni serverdan qulflab qo'yishingiz mumkin." },

        { h2: "4. Oddiy foydalanuvchi + sudo" },
        { p: "Doimiy ishni <strong>root</strong> sifatida bajarmang. Root — cheksiz huquqqa ega; uning nomidan qilingan xato yoki buzilish halokatli bo'ladi. Buning o'rniga oddiy foydalanuvchi yarating va zarur bo'lganda <code>sudo</code> orqali administrator huquqini oling." },
        { code: [
          "# Yangi foydalanuvchi yaratish",
          "sudo adduser dilnoza",
          "",
          "# Unga sudo huquqini berish (Ubuntu'da sudo guruhi)",
          "sudo usermod -aG sudo dilnoza",
          "",
          "# Endi kundalik ishni shu foydalanuvchi bilan bajaring,",
          "# root faqat zarur amallar uchun sudo orqali chaqiriladi."
        ].join("\n") },

        { h2: "5. fail2ban bilan brute-force himoyasi" },
        { p: "<strong>fail2ban</strong> — SSH va boshqa xizmatlarga qayta-qayta noto'g'ri parol kiritishga urinishlarni kuzatib, shubhali IP manzillarni vaqtincha bloklaydigan vosita. Bu <em>brute-force</em> (parolni ketma-ket taxmin qilish) hujumlariga qarshi juda samarali." },
        { code: [
          "# fail2ban'ni o'rnatish",
          "sudo apt install fail2ban -y",
          "",
          "# Sozlama fayli: /etc/fail2ban/jail.local",
          "[sshd]",
          "enabled = true",
          "maxretry = 5        # 5 marta xato urinishdan so'ng",
          "bantime = 1h        # 1 soatga bloklash",
          "findtime = 10m      # 10 daqiqa ichida hisoblanadi",
          "",
          "# Xizmatni ishga tushirish",
          "# sudo systemctl enable --now fail2ban"
        ].join("\n") },

        { h2: "6. Avtomatik yangilanish va minimal huquqlar" },
        { p: "Xavfsizlik yangilanishlarini qo'lda kutib o'tirmaslik uchun ularni avtomatlashtirish mumkin. Ubuntu'da buni <code>unattended-upgrades</code> paketi bajaradi:" },
        { code: [
          "# Avtomatik xavfsizlik yangilanishlarini o'rnatish",
          "sudo apt install unattended-upgrades -y",
          "sudo dpkg-reconfigure --priority=low unattended-upgrades",
          "",
          "# Endi muhim xavfsizlik yamoqlari avtomatik o'rnatiladi."
        ].join("\n") },
        { p: "Bularning barchasi bitta katta tamoyilga bo'ysunadi — <strong>eng kam imtiyoz</strong> (least privilege): har bir foydalanuvchi, jarayon va xizmat faqat o'z ishi uchun zarur bo'lgan huquqqa ega bo'lsin, undan ortiq emas." },

        { h2: "7. Fayl ruxsatlari" },
        { p: "Linux'da har bir faylning egasi va ruxsatlari bor. Nozik fayllarni (masalan, maxfiy kalitlar, konfiguratsiya) faqat egasi o'qiy oladigan qilib qo'ying. Buni <code>chmod</code> (ruxsatlar) va <code>chown</code> (egalik) buyruqlari bajaradi." },
        { code: [
          "# Maxfiy SSH kalitini faqat egasi o'qiy oladigan qilish",
          "chmod 600 ~/.ssh/id_ed25519",
          "",
          "# .ssh papkasini faqat egasiga ochiq qilish",
          "chmod 700 ~/.ssh",
          "",
          "# Fayl egasini o'zgartirish",
          "sudo chown dilnoza:dilnoza /home/dilnoza/muhim.conf",
          "",
          "# 600 -> egasi o'qiy/yozadi, boshqalar hech narsa",
          "# 700 -> egasi to'liq, boshqalar hech narsa"
        ].join("\n") },
        { tip: "Ruxsatlarni belgilashda ochko'z bo'lmang: <code>chmod 777</code> (hammaga to'liq ruxsat) — deyarli har doim xato. Faylga faqat zarur bo'lgan minimal ruxsatni bering." },

        { h2: "8. SSH portini o'zgartirish va cheklovlar" },
        { p: "SSH sozlamasida yana bir necha foydali cheklov bor. Ular hujum yuzasini yanada kamaytiradi. Masalan, SSH orqali kimlar kira olishini aniq belgilash va urinishlar sonini cheklash:" },
        { code: [
          "# /etc/ssh/sshd_config qo'shimcha sozlamalari",
          "",
          "# Faqat ma'lum foydalanuvchilarga SSH ruxsati",
          "AllowUsers dilnoza",
          "",
          "# Bir ulanishda maksimal autentifikatsiya urinishlari",
          "MaxAuthTries 3",
          "",
          "# Kirmasdan turgan sessiyalarni avtomatik yopish",
          "ClientAliveInterval 300",
          "ClientAliveCountMax 2"
        ].join("\n") },
        { p: "<code>AllowUsers</code> orqali faqat ruxsat berilgan foydalanuvchilar kira oladi. <code>MaxAuthTries</code> bir ulanishdagi taxmin urinishlarini cheklaydi. Bu sozlamalar fail2ban bilan birga brute-force hujumini juda qiyinlashtiradi." },

        { h2: "9. Hardening — tekshirish ro'yxati" },
        { p: "Hardening'ni bir marta \"qilib qo'yib\" bo'lmaydi — uni muntazam tekshirib turish kerak. Quyida qisqa tekshirish ro'yxati, uni har yangi serverda va vaqti-vaqti bilan takrorlang:" },
        { ol: [
          "Tizim va paketlar yangilanganmi?",
          "Keraksiz xizmatlar o'chirilganmi?",
          "SSH kalit bilan ishlaydi, root login va parol o'chirilganmi?",
          "Kundalik ish oddiy foydalanuvchi (sudo bilan) ostida bajariladimi?",
          "fail2ban ishlab turibdimi?",
          "Avtomatik xavfsizlik yangilanishlari yoqilganmi?",
          "Nozik fayllarning ruxsatlari to'g'rimi?"
        ] },
        { note: "Hardening — bu <strong>chuqurlashtirilgan himoyaning</strong> tizim darajasidagi qatlami. Uning har bir qadami mustaqil himoya beradi: biri o'tkazib yuborilsa, boshqalari baribir ushlab qoladi." },

        { h2: "Xulosa" },
        { p: "Server hardening — bu bir necha oddiy, ammo muhim qadamdan iborat: yangilash, keraksiz xizmatlarni o'chirish, kuchli SSH, oddiy foydalanuvchi, fail2ban va to'g'ri fayl ruxsatlari. Ularning har biri hujum yuzasini kamaytiradi." },
        { p: "Keyingi darsda ilova ichidagi eng nozik ma'lumotlar — <strong>sirlar</strong> (API kalitlar, parollar, tokenlar) bilan xavfsiz ishlashni o'rganamiz." }
      ]
    },

    {
      slug: "secrets-boshqaruv",
      title: "Sirlarni boshqarish (secrets management)",
      blurb: "Sir nima (API kalit, parol, token); eng katta xato — sirlarni kodga va gitga yozish; .env fayli va uni gitignore qilish; sir tasodifan gitga tushsa rotatsiya qilish; ishlab chiqarishda sir boshqaruvchilar.",
      body: [
        { lead: "Har bir jiddiy ilovada <strong>sirlar</strong> bor: ma'lumotlar bazasi paroli, tashqi xizmat API kaliti, sessiya tokeni imzolash kaliti. Bu qiymatlar ochilib qolsa, butun ilova xavf ostida qoladi. Ushbu darsda sirlarni qanday to'g'ri saqlash, ularni kodga aralashtirmaslik va tasodifan ochilib qolganda nima qilishni o'rganamiz." },

        { h2: "Sir nima?" },
        { p: "<strong>Sir</strong> (secret) — bu ochiq bo'lmasligi kerak bo'lgan har qanday maxfiy qiymat. Tipik misollar:" },
        { ul: [
          "<strong>API kalitlar:</strong> tashqi xizmatlarga (to'lov, email, xarita) kirish uchun;",
          "<strong>Ma'lumotlar bazasi parollari:</strong> bazaga ulanish uchun;",
          "<strong>Tokenlar:</strong> JWT imzolash kaliti, OAuth maxfiy kalitlari;",
          "<strong>Shifrlash kalitlari:</strong> ma'lumotni shifrlash uchun ishlatiladigan kalitlar."
        ] },
        { p: "Bu qiymatlarning umumiy xususiyati: <strong>ular kodni ko'rgan har kimga ko'rinmasligi kerak</strong>. Ular parolga o'xshaydi — bir marta ochilsa, uni almashtirish shart." },

        { h2: "Eng katta xato: sirlarni kodga yozish" },
        { p: "Yangi dasturchilar tez-tez qiladigan eng xavfli xato — sirni to'g'ridan-to'g'ri kod ichiga yozib qo'yish (<em>hardcoding</em>):" },
        { code: [
          "// YOMON: sir kod ichida ochiq yozilgan",
          "const db = connect({",
          "  host: 'localhost',",
          "  password: 'SuperMaxfiy123!'  // <-- katta xato!",
          "});",
          "",
          "// Bu parol endi:",
          "// - git tarixida abadiy qoladi",
          "// - koddan nusxa olgan har kimga ko'rinadi",
          "// - kodni ochiq joyga qo'ysangiz — dunyoga ochiladi"
        ].join("\n") },
        { warn: "Sirni kodga yozib, keyin uni git repozitoriyasiga yubormang. Git — bu <strong>tarix</strong>: keyin o'chirsangiz ham, sir eski commitlarda qolaveradi va uni topish mumkin." },

        { h2: ".env fayli va muhit o'zgaruvchilari" },
        { p: "To'g'ri yechim — sirlarni kod<em>dan tashqarida</em>, <strong>muhit o'zgaruvchilarida</strong> (environment variables) saqlash. Odatda buning uchun <code>.env</code> fayli ishlatiladi. Kod sirni o'zgaruvchidan o'qiydi, lekin sirning o'zi kodga tushmaydi." },
        { code: [
          "# .env fayli (bu fayl HECH QACHON gitga tushmasligi kerak)",
          "DATABASE_PASSWORD=SuperMaxfiy123!",
          "API_KEY=sk_live_abc123xyz",
          "JWT_SECRET=juda-uzun-tasodifiy-satr"
        ].join("\n") },
        { code: [
          "// Kodda: sirni to'g'ridan o'qish o'rniga muhitdan olamiz",
          "require('dotenv').config();",
          "",
          "const db = connect({",
          "  host: 'localhost',",
          "  password: process.env.DATABASE_PASSWORD  // koddan tashqarida",
          "});",
          "",
          "// Endi kod ochiq bo'lsa ham, sirning o'zi ko'rinmaydi."
        ].join("\n") },

        { h2: ".env faylini gitignore qilish" },
        { p: "<code>.env</code> faylining git tarixiga tushmasligi juda muhim. Buning uchun uni <code>.gitignore</code> fayliga qo'shamiz — shunda git bu faylni butunlay e'tiborsiz qoldiradi:" },
        { code: [
          "# .gitignore fayli",
          "",
          "# Muhit fayllari — sirlar shu yerda, gitga tushmasin",
          ".env",
          ".env.local",
          ".env.*.local",
          "",
          "# Node bog'liqliklari",
          "node_modules/"
        ].join("\n") },
        { tip: "Loyihada <code>.env.example</code> nomli fayl saqlash foydali — unda sirlarning o'zi emas, balki faqat <em>nomlari</em> bo'ladi (masalan, <code>DATABASE_PASSWORD=</code>). Bu boshqa dasturchilarga qaysi o'zgaruvchilar kerakligini ko'rsatadi, ammo hech qanday maxfiy qiymat ochmaydi." },

        { h2: "Sir tasodifan gitga tushsa nima qilish?" },
        { p: "Aytaylik, xato bo'ldi: kimdir sirni koddan yoki <code>.env</code>ni gitga yuborib yubordi. Ko'pchilikning birinchi o'yi — \"commitni o'chiraman va tugadi\". Bu <strong>yetarli emas</strong>." },
        { warn: "Sirni git tarixidan o'chirish — uni <strong>almashtirmaydi</strong>. Sir allaqachon ochilgan bo'lishi mumkin: kimdir koddan nusxa olgan, avtomatik skript uni topib olgan bo'lishi mumkin. Yagona ishonchli yechim — <strong>rotatsiya</strong>: eski sirni bekor qilib, yangisini yaratish." },
        { p: "To'g'ri qadamlar tartibi:" },
        { ol: [
          "<strong>Sirni darhol almashtiring (rotatsiya):</strong> masalan, API kalitni bekor qilib, xizmat panelida yangisini yarating;",
          "<strong>Yangi sirni</strong> faqat <code>.env</code> orqali joylang, kodga emas;",
          "<strong>Git tarixidan tozalang:</strong> bu ikkilamchi qadam — asosiysi baribir rotatsiya;",
          "<strong>Sabab ustida ishlang:</strong> <code>.gitignore</code>ni to'g'rilang, jamoani ogohlantiring."
        ] },
        { p: "Eslab qoling: eski sir bekor qilingandan so'ng, u ochilgan bo'lsa ham, endi hech narsaga yaramaydi. Rotatsiya — bu haqiqiy himoya." },

        { h2: "Ishlab chiqarishda sir boshqaruvchilar" },
        { p: "<code>.env</code> fayli kichik loyihalar uchun yaxshi. Ammo katta, ishlab chiqarish tizimlarida maxsus <strong>sir boshqaruvchi</strong> (secrets manager) vositalari ishlatiladi. Ular sirlarni markazlashgan, shifrlangan holda saqlaydi va kimga qachon berilganini nazorat qiladi." },
        { ul: [
          "<strong>HashiCorp Vault:</strong> sirlarni markazlashgan saqlash va boshqarish uchun mashhur ochiq vosita;",
          "<strong>AWS Secrets Manager / GCP Secret Manager:</strong> bulut platformalarining o'z sir xizmatlari;",
          "<strong>Azure Key Vault:</strong> Microsoft bulutining sir va kalit boshqaruvchisi."
        ] },
        { p: "Bu vositalarning umumiy afzalligi: sirlar bir joyda shifrlangan holda saqlanadi, <strong>rotatsiya</strong> osonlashadi, va har bir kirish qayd etiladi (audit). Ilova sirni ishga tushish paytida xavfsiz kanal orqali oladi, uni diskda ochiq saqlamaydi." },
        { note: "Sir boshqaruvda ham asosiy tamoyil o'zgarmaydi — <strong>eng kam kirish</strong>: har bir xizmat faqat o'ziga kerakli sirga kira olsin, boshqasiga emas. Bir sirning ochilishi qolganlarini xavf ostiga qo'ymasligi kerak." },

        { h2: "Sirlarni muhitlar bo'yicha ajratish" },
        { p: "Yana bir muhim amaliyot — turli <strong>muhitlar</strong> (development, staging, production) uchun turli sirlar ishlatish. Ishlab chiqish muhitidagi sir tasodifan ochilib qolsa ham, u ishlab chiqarish tizimini xavf ostiga qo'ymasligi kerak." },
        { ul: [
          "<strong>Development:</strong> mahalliy ishlab chiqish, alohida test sirlari;",
          "<strong>Staging:</strong> ishlab chiqarishga o'xshash sinov muhiti, o'z sirlari bilan;",
          "<strong>Production:</strong> haqiqiy foydalanuvchilar — eng qat'iy himoyalangan, alohida sirlar."
        ] },
        { p: "Hech qachon ishlab chiqarish sirini ishlab chiqish muhitida ishlatmang. Dasturchining noutbuki serverga qaraganda ancha zaif himoyalangan — u yerdagi sir osonroq ochiladi." },

        { h2: "Sirlarni kod bazasida qidirish" },
        { p: "Loyihada tasodifan qolib ketgan sirlarni topish uchun maxsus vositalar bor. Ular kod bazasini skanerlab, sirga o'xshash naqshlarni (uzun tasodifiy satrlar, kalit shakllari) topadi. Buni deploy jarayoniga qo'shish foydali:" },
        { code: [
          "# Sirlarni qidiruvchi vositalar (misol nomlari):",
          "#   git-secrets   -> commit paytida sirni bloklaydi",
          "#   truffleHog    -> git tarixini sir uchun skanerlaydi",
          "#   gitleaks      -> kod bazasi va tarixni tekshiradi",
          "",
          "# Ular CI quvuriga qo'shilsa, sir gitga tushishidan",
          "# oldin uni ushlab, ogohlantiradi.",
          "gitleaks detect --source ."
        ].join("\n") },
        { tip: "Sir qidiruvchi vositani <em>commit</em> yoki CI bosqichiga qo'shing — bu sirni git tarixiga tushishidan <strong>oldin</strong> to'sadi. Oldini olish, keyin tozalashdan ancha oson." },

        { h2: "Xulosa" },
        { p: "Sirlarni boshqarishning oltin qoidalari: <strong>hech qachon kodga yoki gitga yozmang</strong>, ularni muhit o'zgaruvchilarida saqlang, <code>.env</code>ni <code>.gitignore</code>ga qo'shing, va sir ochilib qolsa — o'chirish emas, <strong>rotatsiya</strong> qiling." },
        { p: "Keyingi va bobning yakuniy darsida biz nima sodir bo'layotganini <em>ko'rish</em> haqida gaplashamiz — loglar, monitoring va hodisalarni aniqlash mavzusiga o'tamiz." }
      ]
    },

    {
      slug: "log-monitoring",
      title: "Loglar, monitoring va aniqlash",
      blurb: "Nega log muhim, nima loglanadi va nima loglanmaydi (parol, token); markazlashgan log va SIEM g'oyasi; anomaliyani aniqlash asoslari, ogohlantirish (alerting) va oddiy audit log namunasi.",
      body: [
        { lead: "Xavfsizlikda achchiq haqiqat shu: <strong>hech qanday himoya yuz foizli emas</strong>. Ertami-kechmi biror shubhali hodisa sodir bo'lishi mumkin. Savol shundaki — siz buni <em>ko'rasizmi</em>? Loglar va monitoring bo'lmasa, buzilganingizni ham bilmay qolishingiz mumkin. Ushbu yakuniy darsda nima sodir bo'layotganini kuzatish, anomaliyani aniqlash va o'z vaqtida ogohlantirilishni o'rganamiz." },

        { h2: "Nega log muhim?" },
        { p: "<strong>Log</strong> — bu tizimda sodir bo'lgan hodisalarning yozma qaydi: kim kirdi, qachon, qanday amal bajardi, qanday xato yuz berdi. Loglar ikki muhim vazifani bajaradi:" },
        { ul: [
          "<strong>Real vaqtda aniqlash:</strong> hujum yoki nosozlik sodir bo'layotganini o'sha zahoti sezish;",
          "<strong>Hodisadan keyin tergov:</strong> nimadir buzilganda, \"aynan nima bo'ldi, qachon va qanday\" degan savollarga javob berish."
        ] },
        { tip: "Xavfsizlikda oddiy haqiqat bor: <strong>log bo'lmasa, buzilganingizni ham bilmaysan</strong>. Loglar — bu tizimingizning \"xotirasi\"; usiz siz ko'r holatdasiz." },

        { h2: "Nima loglanadi?" },
        { p: "Hamma narsani loglash shart emas — bu shovqin yaratadi. Ammo xavfsizlik nuqtai nazaridan muhim hodisalarni albatta yozib borish kerak:" },
        { ul: [
          "<strong>Kirish urinishlari:</strong> muvaffaqiyatli va, ayniqsa, <em>muvaffaqiyatsiz</em> login urinishlari;",
          "<strong>Autentifikatsiya hodisalari:</strong> parol o'zgartirish, huquq berish, sessiya yaratish;",
          "<strong>Muhim amallar:</strong> ma'lumot o'chirish, to'lov, sozlama o'zgartirish;",
          "<strong>Xatolar:</strong> kutilmagan xatolar, ruxsatsiz kirish urinishlari (403/401);",
          "<strong>Tizim hodisalari:</strong> xizmatning ishga tushishi, to'xtashi, resurs tanqisligi."
        ] },
        { p: "Har bir log yozuvida foydali kontekst bo'lishi kerak: <strong>qachon</strong> (vaqt belgisi), <strong>kim</strong> (foydalanuvchi yoki IP), <strong>nima</strong> (amal) va <strong>natija</strong> (muvaffaqiyat yoki xato)." },

        { h2: "Nima LOGLANMAYDI" },
        { p: "Bu — juda muhim va ko'pincha unutiladigan nuqta. Loglar odatda ko'p joyda saqlanadi va ko'p odamga ko'rinadi. Shu bois <strong>nozik ma'lumotlarni hech qachon log'ga yozmang</strong>:" },
        { ul: [
          "<strong>Parollar</strong> — hatto xato kiritilgan parolni ham yozmang;",
          "<strong>Tokenlar va API kalitlar</strong> — sessiya tokeni, JWT, maxfiy kalitlar;",
          "<strong>To'lov ma'lumotlari</strong> — karta raqami, CVV;",
          "<strong>Shaxsiy ma'lumotlar</strong> — zarur bo'lmasa, to'liq shaxsiy ma'lumotni yozmang."
        ] },
        { warn: "Parol yoki token log'ga tushib qolsa — bu sirning ochilishiga tenglashadi, chunki log fayllari ko'pincha kamroq himoyalangan bo'ladi. Log yozishdan oldin nozik maydonlarni doim niqoblang yoki olib tashlang." },

        { h2: "Oddiy audit log namunasi" },
        { p: "Keling, muhim hodisalarni tuzilgan (structured) shaklda yozadigan oddiy <strong>audit log</strong> misolini ko'raylik. E'tibor bering: parol maydoni umuman yozilmaydi." },
        { code: [
          "// Oddiy audit log yozuvi",
          "function auditLog(hodisa) {",
          "  const yozuv = {",
          "    vaqt: new Date().toISOString(),  // qachon",
          "    amal: hodisa.amal,               // nima qilindi",
          "    foydalanuvchi: hodisa.userId,    // kim",
          "    ip: hodisa.ip,                   // qayerdan",
          "    natija: hodisa.natija            // muvaffaqiyat/xato",
          "    // DIQQAT: parol, token bu yerga YOZILMAYDI",
          "  };",
          "  console.log(JSON.stringify(yozuv));",
          "}",
          "",
          "// Ishlatilishi:",
          "auditLog({",
          "  amal: 'login',",
          "  userId: 42,",
          "  ip: req.ip,",
          "  natija: 'muvaffaqiyatsiz'  // xato parol urinishi",
          "});"
        ].join("\n") },
        { p: "Log'ni <strong>JSON</strong> kabi tuzilgan formatda yozish muhim: keyin uni avtomatik qidirish, filtrlash va tahlil qilish osonlashadi. \"Erkin matn\" loglarni mashina o'qishi qiyin." },

        { h2: "Markazlashgan log va SIEM" },
        { p: "Bir nechta server bo'lsa, loglar har birida alohida yotishi noqulay. Yechim — <strong>markazlashgan log</strong> (centralized logging): barcha serverlarning loglari bitta joyga oqib keladi. Shunda siz butun tizimni bir oynadan kuzatasiz." },
        { p: "Bundan yuqori bosqich — <strong>SIEM</strong> (Security Information and Event Management). Bu tizimlar turli manbalardan loglarni yig'ib, ular orasidagi bog'liqlikni tahlil qiladi va shubhali naqshlarni aniqlaydi." },
        { ul: [
          "<strong>ELK to'plami</strong> (Elasticsearch, Logstash, Kibana) — mashhur ochiq log tahlil to'plami;",
          "<strong>Splunk</strong> — kuchli tijorat SIEM va log tahlil platformasi;",
          "<strong>Grafana Loki</strong> — yengil, ochiq markazlashgan log yechimi."
        ] },
        { note: "SIEM'ning asosiy g'oyasi — <strong>bog'liqlikni ko'rish</strong>: bitta serverda ma'nosiz ko'ringan hodisa (masalan, bir necha xato login) butun tizim bo'ylab birga ko'rilganda hujum naqshiga aylanishi mumkin." },

        { h2: "Anomaliyani aniqlash va ogohlantirish" },
        { p: "Loglarni yig'ish — bu yarim ish. Ularni kimdir yoki nimadir <em>kuzatishi</em> kerak. Bu yerda ikki tushuncha muhim: <strong>anomaliyani aniqlash</strong> va <strong>ogohlantirish</strong>." },
        { p: "<strong>Anomaliya</strong> — bu odatiy holatdan keskin farq qiluvchi xatti-harakat. Masalan:" },
        { ul: [
          "Bir daqiqada bir IP'dan yuzlab login urinishi (brute-force belgisi);",
          "Yarim tunda, odatda bo'sh bo'ladigan vaqtda katta ma'lumot yuklab olish;",
          "Bir foydalanuvchining birdaniga g'ayrioddiy joydan kirishi;",
          "Xatolar sonining keskin ko'payishi (xizmatga hujum belgisi bo'lishi mumkin)."
        ] },
        { p: "<strong>Ogohlantirish (alerting)</strong> — anomaliya aniqlanganda tegishli odamni darhol xabardor qilish: email, SMS yoki xabar orqali. Muhimi shundaki, ogohlantirish <em>o'z vaqtida</em> kelsin — hodisadan bir hafta keyin kelgan xabar foydasiz." },
        { code: [
          "// Oddiy anomaliya tekshiruvi: qisqa vaqtda ko'p xato login",
          "function loginXatoTekshir(ip, xatoSoni) {",
          "  const CHEGARA = 10;   // 10 ta xato",
          "",
          "  if (xatoSoni > CHEGARA) {",
          "    ogohlantir({",
          "      daraja: 'yuqori',",
          "      xabar: `Shubhali: ${ip} dan ${xatoSoni} ta xato login`,",
          "      vaqt: new Date().toISOString()",
          "    });",
          "  }",
          "}",
          "",
          "// ogohlantir() — email yoki xabar yuboruvchi funksiya"
        ].join("\n") },
        { tip: "Ogohlantirishlarni ehtiyotkorlik bilan sozlang: agar juda ko'p \"bo'sh\" ogohlantirish kelsa, jamoa ularga e'tibor bermay qo'yadi (alert fatigue). Faqat haqiqatan muhim hodisalar odamni bezovta qilsin." },

        { h2: "Loglarni himoyalash va saqlash" },
        { p: "Loglarning o'zi ham himoyaga muhtoj. Agar hujumchi serverga kirsa, u ko'pincha izlarni yashirish uchun loglarni o'chirishga yoki o'zgartirishga urinadi. Shu bois loglarni <strong>server tashqarisiga</strong> uzatib turish muhim." },
        { ul: [
          "<strong>Faqat qo'shish (append-only):</strong> loglar o'zgartirilmasin, faqat yangi yozuv qo'shilsin;",
          "<strong>Markazlashgan saqlash:</strong> loglar ishlab turgan serverdan boshqa, himoyalangan joyda ham saqlansin;",
          "<strong>Saqlash muddati:</strong> loglar tergov uchun yetarlicha uzoq (masalan, bir necha oy) saqlansin, ammo cheksiz emas."
        ] },
        { p: "Loglarni boshqa joyga uzatish oddiy, ammo muhim g'oya: hujumchi bir serverni buzsa ham, u yerdagi loglarni o'chirib, markazlashgan nusxadagi izni yo'q qila olmaydi." },

        { h2: "Hodisaga javob berish (incident response)" },
        { p: "Loglar va ogohlantirishlar — bu hodisani <em>aniqlash</em>ning bir qismi. Ammo hodisa aniqlangach, nima qilish kerak? Bu yerda oldindan tayyorlangan <strong>javob rejasi</strong> yordam beradi. Umumiy bosqichlar:" },
        { ol: [
          "<strong>Aniqlash:</strong> log va ogohlantirish orqali hodisani sezish;",
          "<strong>Cheklash:</strong> zararni to'xtatish — masalan, buzilgan hisobni bloklash, xizmatni ajratish;",
          "<strong>Yo'qotish:</strong> sababni bartaraf qilish — zaiflikni yopish, sirni rotatsiya qilish;",
          "<strong>Tiklash:</strong> tizimni normal holatga qaytarish, zaxira nusxalardan foydalanish;",
          "<strong>Saboq:</strong> nima bo'lganini tahlil qilib, kelajakda oldini olish choralarini ko'rish."
        ] },
        { note: "Javob rejasini hodisa <em>sodir bo'lishidan oldin</em> tayyorlang. Muammo yuz bergan paytda vahima ichida reja tuzish — eng yomon vaqt. Oldindan yozilgan qadamlar ro'yxati vaqtni va asablarni tejaydi." },

        { h2: "Bobni yakunlash" },
        { p: "Ushbu bobda biz tarmoq va tizim xavfsizligining asosiy qatlamlarini ko'rib chiqdik: xavfsizlik sarlavhalari, firewall va VPN, server hardening, sirlarni boshqarish va nihoyat loglar bilan aniqlash. Bularning barchasi bitta g'oyaga bog'lanadi — <strong>chuqurlashtirilgan himoya</strong>: bir necha mustaqil qatlam, biri buzilsa ikkinchisi ushlab qoladi." },
        { p: "Eng muhim xulosa: xavfsizlik — bu <em>jarayon</em>, bir martalik ish emas. Serverni qattiqlashtiring, sirlarni ehtiyotlang, va doimo kuzatib turing. Loglar sizga tizimingiz haqida \"gapiradi\" — uni tinglashni o'rganing." }
      ]
    }
  ]
};
