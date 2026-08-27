"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Amaliy vositalar (lab muhitida)",
  lessons: [
    {
      slug: "lab-muhit",
      title: "Xavfsizlik laboratoriyasini qurish",
      blurb: "Nega o'z laboratoriyangiz kerak, virtualizatsiya, izolyatsiya qilingan host-only tarmoq, Kali Linux va nishon VM sxemasi, DVWA va Juice Shop'ni lokal ko'tarish, snapshotlar hamda TryHackMe/HackTheBox legal muqobillari.",
      body: [
        { lead: "Xavfsizlikni kitobdan o'qib emas, qo'l bilan ushlab o'rganiladi. Ammo bu yerda katta bir shart bor: mashq qilish uchun sizga o'zingizga tegishli, dunyodan ajratilgan maydon kerak. Boshqaning tizimida \"sinab ko'rish\" — o'rganish emas, jinoyat. Shu bois birinchi darsimiz hech qanday hujum haqida emas, balki xavfsiz, qonuniy va nazorat qilinadigan mashq laboratoriyasini qurish haqida. Bu — butun bobning poydevori." },

        { h2: "Nega aynan o'z laboratoriyangiz" },
        { p: "Xavfsizlik vositalari — kuchli asboblar. Aynan shu kuch tufayli ular xavfli ham. <code>nmap</code>, <code>Metasploit</code> yoki <code>Burp Suite</code>ni begona tizimga qaratish — real zarar keltirishi va sizni javobgarlikka tortishi mumkin. Laboratoriya esa bu vositalarni xavfsiz, hech kimga ziyon yetkazmasdan o'rganish imkonini beradi." },
        { p: "Laboratoriya sizga uch narsani beradi: <strong>qonuniylik</strong> (barcha nishon o'zingizniki), <strong>xavfsizlik</strong> (xato qilsangiz ham faqat o'z virtual mashinangiz shikastlanadi) va <strong>takrorlanuvchanlik</strong> (istalgan holatni qayta tiklab, mashqni yana boshlashingiz mumkin). Real ishlaydigan xavfsizlik mutaxassislari ham yangi texnikani avval o'z labida sinaydi." },
        { warn: "Ruxsatsiz tizimni skanerlash yoki test qilish — JINOYAT. Faqat o'zingizga tegishli yoki yozma ruxsat berilgan tizimni test qiling. Bu qoida butun bob davomida amal qiladi va uni buzishning hech qanday oqlanadigan sababi yo'q." },

        { h2: "Virtualizatsiya nima" },
        { p: "Virtualizatsiya — bitta jismoniy kompyuteringiz ichida bir nechta \"soxta\" kompyuterlarni ishga tushirish imkoniyati. Har bir bunday soxta kompyuter <strong>virtual mashina</strong> (VM, <em>virtual machine</em>) deb ataladi. U alohida operatsion tizimga, o'z diskiga va o'z tarmog'iga ega bo'ladi, lekin aslida sizning asosiy kompyuteringiz (<code>host</code>) resurslaridan foydalanadi." },
        { p: "Buning uchun ikkita mashhur bepul/tekin dasturdan biri ishlatiladi: <strong>VirtualBox</strong> (Oracle, to'liq bepul) yoki <strong>VMware Workstation Player</strong>. Ular <code>hypervisor</code> deb ataladi — ya'ni virtual mashinalarni yaratadigan va boshqaradigan qatlam. Yangi boshlovchilar uchun VirtualBox eng qulay tanlov." },
        { p: "VM'ning eng muhim afzalligi — <strong>izolyatsiya</strong>. Nishon virtual mashinasi \"sindirilsa\" yoki zararli dastur bilan zararlansa ham, sizning asosiy kompyuteringizga tegmaydi. VM'ni shunchaki o'chirib, toza holatidan qayta tiklaysiz." },

        { h2: "Eng muhim qoida: izolyatsiya qilingan tarmoq" },
        { p: "Laboratoriyani qurishdagi eng kritik qadam — uni internetdan uzib qo'yish. Nishon VM'lar (masalan, <code>Metasploitable</code>) ataylab zaif qilib yaratilgan. Agar ular internetga chiqsa, bir necha daqiqada tashqi hujumchilarga yem bo'ladi va sizning tarmog'ingiz orqali boshqalarga zarar yetkazishi mumkin." },
        { p: "Yechim — VirtualBox'dagi maxsus tarmoq rejimlaridan foydalanish:" },
        { ul: [
          "<strong>Host-only tarmoq</strong> — VM'lar faqat bir-biri bilan va sizning host kompyuteringiz bilan gaplashadi, internetga umuman chiqmaydi. Lab uchun eng xavfsiz variant;",
          "<strong>Internal tarmoq</strong> — VM'lar faqat o'zaro gaplashadi, host ham, internet ham ko'rinmaydi. Yanada qattiqroq izolyatsiya;",
          "<strong>NAT</strong> — VM internetga chiqadi, lekin tashqaridan ko'rinmaydi. Zaif nishon uchun ISHLATMANG, faqat yangilanish kerak bo'lganda vaqtincha."
        ] },
        { warn: "Zaif nishon VM'ni HECH QACHON \"Bridged\" yoki ochiq internetli tarmoqqa ulamang. Uni har doim host-only yoki internal tarmoqda ushlang. Bu — laboratoriyangiz va boshqalar xavfsizligining kafolati." },
        { code: [
          "# VirtualBox host-only tarmoq odatda quyidagi diapazonni beradi:",
          "#   192.168.56.0/24",
          "#",
          "# Ya'ni sizning lab mashinalaringiz shunday IP oladi:",
          "#   Kali (hujumchi)      -> 192.168.56.101",
          "#   Metasploitable       -> 192.168.56.102",
          "#   DVWA / Juice Shop    -> 192.168.56.103",
          "#",
          "# Bu tarmoq internetga chiqmaydi — mashqlar shu 'devor' ichida qoladi."
        ].join("\n") },

        { h2: "Kali Linux — vositalar to'plami" },
        { p: "<strong>Kali Linux</strong> — xavfsizlik tekshiruvchilari uchun maxsus yig'ilgan Linux distributivi. Uning asosiy qadr-qimmati shundaki, unda yuzlab xavfsizlik vositalari (jumladan biz o'rganadigan <code>nmap</code>, <code>Wireshark</code>, <code>Burp Suite</code>, <code>Metasploit</code>) allaqachon o'rnatilgan holda keladi. Ya'ni har birini alohida o'rnatib o'tirmaysiz." },
        { p: "Kali'ni ham virtual mashina sifatida o'rnatasiz. Rasmiy saytda tayyor VirtualBox tasviri (image) bor — uni yuklab, VirtualBox'ga import qilasiz. Kali sizning laboratoriyangizdagi <strong>hujumchi mashinasi</strong> vazifasini bajaradi: barcha vositalarni shu yerdan ishga tushirasiz." },
        { note: "Kali — bu shunchaki vositalar to'plamli Linux. Uning o'zi \"sehrli\" emas: xuddi shu vositalarni oddiy Ubuntu'ga ham qo'lda o'rnatish mumkin. Kali faqat ishni tezlashtiradi, chunki hammasi tayyor keladi." },

        { h2: "Hujumchi va nishon sxemasi" },
        { p: "Klassik laboratoriya ikki qismdan iborat: bitta <strong>hujumchi VM</strong> (Kali) va bir yoki bir nechta <strong>nishon VM</strong>. Nishon sifatida ataylab zaif qilib yaratilgan mashq mashinalari ishlatiladi:" },
        { ul: [
          "<strong>Metasploitable</strong> — ataylab ko'plab zaiflik bilan to'ldirilgan Linux VM, Metasploit mashqi uchun ideal;",
          "<strong>DVWA</strong> (<em>Damn Vulnerable Web Application</em>) — web zaifliklarini (SQL Injection, XSS va h.k.) o'rganish uchun maxsus zaif web ilova;",
          "<strong>OWASP Juice Shop</strong> — zamonaviy, JavaScript'da yozilgan zaif web ilova, o'nlab bosqichli mashqlar bilan;",
          "<strong>VulnHub</strong> — jamiyat tuzgan, yuklab olib ishlatiladigan tayyor zaif VM'lar to'plami."
        ] },
        { p: "Har bir vosita FAQAT quyidagilarda ishlatiladi: (a) o'z kompyuteringizdagi virtual mashinalar, (b) ataylab zaif qilib yaratilgan mashq ilovalari (DVWA, Juice Shop, Metasploitable, VulnHub), (c) rasman ruxsat bergan legal platformalar (TryHackMe, HackTheBox). Boshqa hech qayerda emas." },

        { h2: "DVWA yoki Juice Shop'ni Docker bilan ko'tarish" },
        { p: "Alohida VM o'rnatishga vaqtingiz bo'lmasa, zaif web ilovani <code>Docker</code> yordamida bir buyruq bilan lokal ravishda ko'tarishingiz mumkin. Docker — ilovani barcha bog'liqliklari bilan \"quti\" (konteyner) ichida ishga tushiradigan vosita. OWASP Juice Shop'ni ko'tarish:" },
        { code: [
          "# Juice Shop'ni lokal (o'z kompyuteringizda) ko'tarish:",
          "docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop",
          "",
          "# Endi brauzerda oching:  http://127.0.0.1:3000",
          "#",
          "# Diqqat: -p 127.0.0.1:3000:3000 dagi 127.0.0.1 qismi",
          "# ilovani FAQAT o'z kompyuteringizga ochadi, tashqi tarmoqqa emas."
        ].join("\n") },
        { p: "DVWA uchun ham tayyor tasvir bor. U odatda ma'lumotlar bazasini talab qiladi, shuning uchun ko'proq sozlash kerak, lekin g'oya bir xil — lokal, izolyatsiya qilingan, o'zingizniki:" },
        { code: [
          "# DVWA'ni lokal ko'tarish (soddalashtirilgan misol):",
          "docker run --rm -p 127.0.0.1:8080:80 vulnerables/web-dvwa",
          "",
          "# Brauzerda:  http://127.0.0.1:8080",
          "# Birinchi kirishda 'Setup Database' tugmasini bosing."
        ].join("\n") },
        { tip: "127.0.0.1 (localhost) ga bog'lash — zaif ilovani faqat o'z mashinangizda ochadi. Uni tashqi IP'ga (0.0.0.0) ochish tarmog'ingizdagi boshqalarga ham ko'rsatadi — zaif ilova uchun buni qilmang." },

        { h2: "Qadamma-qadam sozlash" },
        { p: "Birinchi laboratoriyangizni quyidagi tartibda quring:" },
        { ol: [
          "VirtualBox'ni (yoki VMware Player'ni) o'rnating;",
          "Sozlamalarda host-only tarmoq yarating (<code>192.168.56.0/24</code>);",
          "Kali Linux VM tasvirini import qiling va uni host-only tarmoqqa ulang;",
          "Nishon VM'ni (Metasploitable yoki DVWA) yuklab, import qiling va o'sha host-only tarmoqqa ulang;",
          "Ikkala VM'ni ishga tushiring va IP manzillarini yozib oling;",
          "Kali'dan nishonga <code>ping</code> yuborib, ular bir-birini ko'rayotganini tekshiring;",
          "Har ikkala VM'ning toza holatidan <strong>snapshot</strong> oling."
        ] },

        { h2: "Snapshot — vaqtni orqaga qaytarish" },
        { p: "<strong>Snapshot</strong> — virtual mashinaning ayni ondagi holatini muzlatib saqlash. Bu — laboratoriyaning eng qulay xususiyati. Mashq davomida nishonni butunlay buzib qo'ysangiz yoki zararli dastur o'rnatib yuborsangiz ham, bir tugma bilan snapshot'ga qaytasiz — VM bir zumda toza holatiga tiklanadi." },
        { p: "Har bir yangi mashqdan oldin toza snapshot'dan boshlang. Bu sizga cheksiz \"qayta urinish\" imkonini beradi va real hayotda juda qimmatga tushadigan xatolarni bu yerda bemalol qilib ko'rishga ruxsat beradi." },

        { h2: "Nishonlarni bir-biridan farqlash" },
        { p: "Laboratoriyangizda ikki xil rol bor va ularni aralashtirmaslik muhim. <strong>Hujumchi mashinasi</strong> (Kali) — siz vositalarni ishga tushiradigan joy; u ishonchli va yangilangan bo'lishi kerak. <strong>Nishon mashinasi</strong> (Metasploitable, DVWA) — ataylab zaif; u hech qachon internetga tegmasligi shart. Bu ikki rolni doim alohida ushlab turing." },
        { p: "Boshlovchilar ko'p qiladigan xato — nishon VM'ni internetga ulab qo'yish. Zaif VM bir necha daqiqada tashqi hujumga uchraydi. Shuning uchun har bir VM'ni ishga tushirishdan oldin uning tarmoq sozlamasi host-only ekanini tekshirib oling." },

        { h2: "Legal muqobil: TryHackMe va HackTheBox" },
        { p: "Agar o'z laboratoriyangizni qurish murakkab tuyulsa yoki kuchli kompyuteringiz bo'lmasa, brauzer orqali ishlaydigan legal platformalar bor: <strong>TryHackMe</strong> va <strong>HackTheBox</strong>. Bular sizga bulutda tayyor turgan, rasman ruxsat berilgan zaif mashinalarni beradi." },
        { p: "Ularning katta afzalligi — hamma narsa qonuniy va tayyor. Siz faqat brauzeringiz orqali ulanib, mashq qilasiz. TryHackMe boshlovchilar uchun bosqichma-bosqich yo'l-yo'riqli darslar bilan ayniqsa qulay. Bu platformalardagi mashinalar rasman test uchun ochilgan, shuning uchun ularni ishlatish to'liq etik." },
        { tip: "Hammasini izolyatsiya qilingan tarmoqda ushlang. Laboratoriyangiz internetdan qanchalik ajratilgan bo'lsa, o'zingiz uchun ham, atrofingizdagilar uchun ham shunchalik xavfsiz. Toza snapshot va host-only tarmoq — ikki eng yaxshi do'stingiz." },

        { h2: "Xulosa" },
        { p: "Xavfsizlikni o'rganish laboratoriyadan boshlanadi. Virtualizatsiya, host-only tarmoq, hujumchi (Kali) va nishon (Metasploitable/DVWA/Juice Shop) sxemasi hamda snapshotlar sizga qonuniy, xavfsiz va cheksiz qayta urinish mumkin bo'lgan mashq maydonini beradi. Endi barcha vositalarni aynan shu maydonda o'rganamiz." },
        { note: "Keyingi darslardagi har bir buyruq ana shu laboratoriya kontekstida — o'z VM'laringiz yoki rasman ruxsat berilgan nishonlarga qarshi bajariladi. Boshqa nishon yo'q." }
      ]
    },
    {
      slug: "nmap",
      title: "Nmap bilan tarmoqni kashf qilish",
      blurb: "Nmap nima va nega kerak, host discovery, port skanerlash, xizmat va versiya aniqlash, OS taxmini, NSE skriptlari hamda chiqishni himoyachi nuqtai nazaridan o'qish.",
      body: [
        { lead: "Tarmoqni himoya qilish uchun avvalo u yerda nima borligini bilishingiz kerak: qaysi kompyuterlar ishlayapti, ularda qaysi xizmatlar ochiq, qaysi portlar tashqariga qarab turibdi. <strong>Nmap</strong> — aynan shu savollarga javob beradigan klassik vosita. Uni ham himoyachilar (o'z tarmog'ini tekshirish uchun), ham auditorlar ishlatadi. Bu darsda uni o'z laboratoriyangizda va rasman ruxsat berilgan test xostida ishlatishni o'rganamiz." },

        { h2: "Nmap nima" },
        { p: "<strong>Nmap</strong> (<em>Network Mapper</em>) — tarmoq va port skaneri. U tarmoqqa maxsus paketlar yuborib, javoblarni tahlil qiladi va shu asosda \"xaritachi\" kabi tarmoq manzarasini chizadi: qaysi xostlar tirik, qaysi portlar ochiq, ular ortida qanday xizmat ishlayotgani." },
        { p: "Nmap — neytral vosita. Uni tizim administratori o'z serverlarini nazorat qilish uchun, xavfsizlik jamoasi esa keraksiz ochiq portlarni topib yopish uchun ishlatadi. Biz uni himoyachi va o'rganuvchi ko'zi bilan qo'llaymiz." },
        { warn: "Ruxsatsiz tizimni skanerlash — JINOYAT. Faqat o'z tarmog'ingizni yoki <code>scanme.nmap.org</code> kabi Nmap rasman test uchun ochgan xostni skanerlang. Boshqa hech qanday domen yoki IP'ni nishon qilmang." },

        { h2: "Nega bu kerak" },
        { p: "Tasavvur qiling, siz kichik serveringizni boshqaryapsiz. Vaqt o'tishi bilan unda turli dasturlar o'rnatilgan, ba'zilari portni ochiq qoldirgan bo'lishi mumkin — siz esa buni bilmaysiz. Har bir keraksiz ochiq port — potensial kirish nuqtasi. Nmap bilan o'z serveringizni skanerlab, \"tashqaridan qanday ko'rinaman?\" degan savolga aniq javob olasiz." },
        { p: "Himoyaning oltin qoidasi: <strong>keraksiz narsani yoping</strong>. Nmap sizga nima ochiqligini ko'rsatadi, siz esa kerak bo'lmaganini yopib, hujum yuzasini (attack surface) qisqartirasiz." },

        { h2: "Xostlarni topish (host discovery)" },
        { p: "Skanerlashni har doim tirik xostlarni topishdan boshlang. <code>-sn</code> bayrog'i \"ping skanerlash\" bajaradi: portlarga tegmaydi, faqat qaysi manzillar javob berayotganini aniqlaydi. Bu tez va \"shovqinsiz\" birinchi qadam:" },
        { code: [
          "# Butun lab tarmog'idagi tirik xostlarni topish:",
          "nmap -sn 192.168.56.0/24",
          "",
          "# Namuna chiqishi:",
          "# Nmap scan report for 192.168.56.101",
          "# Host is up (0.00042s latency).",
          "# Nmap scan report for 192.168.56.102",
          "# Host is up (0.00061s latency).",
          "# Nmap done: 256 IP addresses (2 hosts up) scanned"
        ].join("\n") },
        { p: "Bu yerda <code>192.168.56.0/24</code> — butun lab tarmog'i (256 ta manzil). Nmap ularning barchasini so'roqlab, faqat ikkitasi tirik ekanini ko'rsatdi: bizning Kali va nishon mashinalarimiz." },
        { tip: "Avval doim <code>-sn</code> bilan xostlarni toping. Butun tarmoqning har bir portini skanerlashdan ko'ra, avval kim tirik ekanini bilib, keyin faqat o'shalarni chuqurroq tekshirish tezroq va mantiqiyroq." },

        { h2: "Portlarni skanerlash" },
        { p: "Tirik xostni topgach, uning qaysi portlari ochiq ekanini ko'rasiz. Eng oddiy skanerlash — shunchaki IP'ni berish. Nmap eng ko'p ishlatiladigan 1000 ta portni tekshiradi:" },
        { code: [
          "# Nishon xostning ochiq portlarini skanerlash:",
          "nmap 192.168.56.101",
          "",
          "# Namuna chiqishi:",
          "# PORT     STATE    SERVICE",
          "# 22/tcp   open     ssh",
          "# 80/tcp   open     http",
          "# 443/tcp  closed   https",
          "# 3306/tcp filtered mysql"
        ].join("\n") },
        { p: "Boshqa test uchun Nmap o'zi ruxsat bergan xostdan foydalanishingiz mumkin — bu internetdagi yagona nishon bo'lib, uni skanerlash rasman ruxsat etilgan:" },
        { code: [
          "# Nmap rasman ochgan test xostini skanerlash:",
          "nmap scanme.nmap.org",
          "",
          "# Eslatma: scanme.nmap.org — Nmap loyihasi mashq uchun",
          "# maxsus ochgan yagona ochiq test xosti. Uni skanerlash legal."
        ].join("\n") },

        { h2: "Chiqishni o'qish: port holatlari" },
        { p: "Nmap chiqishidagi eng muhim ustun — <code>STATE</code> (holat). Uni to'g'ri o'qishni bilish — vositani tushunishning yarmi:" },
        { ul: [
          "<strong>open</strong> — port ochiq, ortida biror xizmat javob bermoqda. Diqqat markazi shu portlar;",
          "<strong>closed</strong> — port yopiq, xost javob berdi lekin bu portda xizmat yo'q;",
          "<strong>filtered</strong> — Nmap javob ololmadi, ehtimol oldida <code>firewall</code> paketni to'sib turibdi. Ochiqmi yoki yopiqmi — noaniq."
        ] },
        { p: "Himoyachi uchun mantiq oddiy: har bir <code>open</code> port — javob berilishi kerak bo'lgan savol. \"Bu port haqiqatan ochiq bo'lishi kerakmi? Ortidagi xizmat yangilanganmi? U tashqariga qarab turishi shartmi?\" Kerak bo'lmagani — yopiladi." },

        { h2: "Xizmat va versiyani aniqlash" },
        { p: "Port ochiqligini bilish yetarli emas — ortida qanday dastur va qaysi versiyasi ishlayotgani ham muhim. <code>-sV</code> bayrog'i aynan shuni aniqlaydi. Versiya axboroti muhim, chunki eski versiyalarda ko'pincha ma'lum zaifliklar bo'ladi:" },
        { code: [
          "# Xizmat va versiyalarini aniqlash:",
          "nmap -sV 192.168.56.102",
          "",
          "# Namuna chiqishi:",
          "# PORT   STATE SERVICE VERSION",
          "# 21/tcp open  ftp     vsftpd 2.3.4",
          "# 22/tcp open  ssh     OpenSSH 4.7p1",
          "# 80/tcp open  http    Apache httpd 2.2.8"
        ].join("\n") },
        { p: "Bu chiqish himoyachi uchun oltin: <code>vsftpd 2.3.4</code> — bu juda eski versiya. Himoyachi darhol \"bu versiyada ma'lum zaiflik bormi, yangilash kerakmi?\" degan savolni beradi va patch (yamoq) prioritetini belgilaydi." },

        { h2: "OS taxmini va port tanlash" },
        { p: "<code>-O</code> bayrog'i operatsion tizimni taxmin qilishga urinadi (paketlarning o'ziga xos xususiyatlariga qarab). <code>-p</code> bayrog'i esa qaysi portlarni tekshirishni aniq belgilaydi:" },
        { code: [
          "# Operatsion tizimni taxmin qilish (root huquqi kerak):",
          "sudo nmap -O 192.168.56.102",
          "",
          "# Faqat aniq portlarni tekshirish:",
          "nmap -p 22,80,443 192.168.56.101",
          "",
          "# Barcha 65535 portni tekshirish (sekinroq, to'liqroq):",
          "nmap -p- 192.168.56.101"
        ].join("\n") },
        { note: "Odatiy skan faqat ommabop 1000 portni ko'radi. Xizmat noodatiy (yuqori) portda yashirilgan bo'lsa, uni topish uchun <code>-p-</code> bilan to'liq skan kerak. Bu sekinroq, lekin hech narsani o'tkazib yubormaydi." },

        { h2: "NSE skriptlari — qisqacha" },
        { p: "Nmap'da <strong>NSE</strong> (<em>Nmap Scripting Engine</em>) degan kuchli qism bor: bu — turli qo'shimcha tekshiruvlarni bajaradigan tayyor skriptlar to'plami. Eng oddiy va foydali variant — <code>-sC</code>, ya'ni standart, xavfsiz skriptlar to'plamini ishga tushirish:" },
        { code: [
          "# Standart skriptlar + versiya aniqlash birga:",
          "nmap -sC -sV 192.168.56.101",
          "",
          "# -sC skriptlari qo'shimcha ma'lumot beradi, masalan:",
          "# | http-title: Welcome to DVWA",
          "# | ssh-hostkey: 2048 ... (kalit izi)"
        ].join("\n") },
        { p: "NSE skriptlari xizmat haqida ko'proq kontekst beradi. Boshlovchi uchun <code>-sC</code> yetarli — u \"xavfsiz\" toifadagi, tizimga zarar yetkazmaydigan skriptlarni ishga tushiradi." },

        { h2: "Himoyachi nuqtai nazari" },
        { p: "Nmap'ning eng qadrli tomoni — u sizga tizimingiz \"tashqaridan qanday ko'rinishini\" ko'rsatadi. Skan natijasini qo'lingizga olib, quyidagilarni qiling:" },
        { ol: [
          "Har bir <code>open</code> port ro'yxatini ko'zdan kechiring;",
          "\"Bu port kerakmi?\" deb so'rang — kerak bo'lmasa, xizmatni o'chiring yoki firewall bilan yoping;",
          "<code>-sV</code> ko'rsatgan versiyalarni tekshiring — eskilarini yangilang;",
          "Faqat ishonchli manzillardan kirish kerak bo'lgan portlarni firewall bilan cheklang."
        ] },
        { p: "Shu tarzda Nmap hujum vositasi emas, balki mudofaa vositasiga aylanadi: siz zaiflikni hujumchidan oldin topib, uni yopasiz." },

        { h2: "Skan tezligi va \"shovqin\"" },
        { p: "Nmap turli tezlikda skanerlashi mumkin. Tez skan darrov natija beradi, lekin ko'proq \"shovqin\" chiqaradi — ya'ni tarmoqni kuzatayotgan tizimlarga sezilarli bo'ladi. Sekinroq skan esa e'tiborni kamroq tortadi. O'z laboratoriyangizda tezlik erkin, chunki hech kimga xalaqit bermaysiz." },
        { p: "Amaliy maslahat: avval tez, yuzaki skan bilan umumiy manzarani oling, so'ng faqat qiziqarli xostlarga chuqurroq skan (<code>-sV</code>, <code>-sC</code>) qiling. Bu vaqtni tejaydi va natijani boshqarish osonroq bo'ladi." },

        { h2: "Xulosa" },
        { p: "Nmap — tarmoqni kashf qilishning asosiy vositasi. <code>-sn</code> bilan xostlarni toping, oddiy skan bilan portlarni ko'ring, <code>-sV</code> bilan versiyalarni aniqlang, <code>-sC</code> bilan qo'shimcha kontekst oling. Eng muhimi — chiqishni himoyachi ko'zi bilan o'qing va topilgan har bir ochiq portni savol ostiga qo'ying." },
        { warn: "Yana bir bor: faqat o'z tarmog'ingiz yoki <code>scanme.nmap.org</code>. Nmap — kuchli asbob, uni faqat o'zingizga tegishli yoki rasman ruxsat berilgan nishonga qarating." }
      ]
    },
    {
      slug: "wireshark",
      title: "Wireshark bilan trafik tahlili",
      blurb: "Wireshark nima va nega kerak, paket ushlash asoslari, interfeys tanlash, displey filtrlar, TCP oqimni kuzatish hamda HTTP va HTTPS farqi orqali TLS nega zarurligini isbotlash.",
      body: [
        { lead: "Tarmoq bo'ylab har soniyada minglab paket uchib o'tadi, lekin ular ko'zga ko'rinmaydi. <strong>Wireshark</strong> — aynan shu ko'rinmas trafikni ko'zga ko'rinadigan qiladigan vosita. U tarmoqda nima ketayotganini paketma-paket ochib beradi. Bu darsda uni o'z laboratoriya trafigingizni tahlil qilish uchun ishlatamiz va nima uchun har doim <code>HTTPS</code> kerakligini o'z ko'zimiz bilan ko'ramiz." },

        { h2: "Wireshark nima" },
        { p: "<strong>Wireshark</strong> — paket tahlilchisi (<em>packet analyzer</em>). U tarmoq interfeysingizdan o'tayotgan paketlarni ushlaydi (capture) va ularning har birini eng mayda tafsilotigacha ochib ko'rsatadi: qaysi manzildan qaysi manzilga, qaysi protokol bilan, qanday ma'lumot ketmoqda." },
        { p: "Wireshark — tarmoq muhandislari, tizim administratorlari va xavfsizlik mutaxassislarining kundalik asbobi. U bilan tarmoq muammolarini tuzatish, protokollarni o'rganish va trafikni tahlil qilish mumkin. Biz uni o'rganuvchi sifatida — \"tarmoqda aslida nima ketyapti?\" degan savolga javob topish uchun ishlatamiz." },
        { warn: "Faqat o'z trafigingizni yoki o'z laboratoriyangiz trafigini tahlil qiling. Boshqalarning tarmoq trafigini ularning roziligisiz ushlash va o'qish — JINOYAT va shaxsiy hayotga tajovuz. Bu qoidani hech qachon buzmang." },

        { h2: "Nega bu kerak" },
        { p: "Wireshark uch narsaga xizmat qiladi. Birinchidan, <strong>muammo tuzatish</strong>: ilova serverga ulanolmasa, paketlarga qarab, so'rov qayerda \"qotib qolayotganini\" aniqlaysiz. Ikkinchidan, <strong>o'rganish</strong>: protokollar (TCP, DNS, HTTP) qanday ishlashini kitobdan emas, jonli misolda ko'rasiz. Uchinchidan, <strong>xavfsizlik</strong>: ma'lumot shifrlanganmi yoki ochiq matnda ketyaptimi — buni o'z ko'zingiz bilan tekshirasiz." },

        { h2: "Interfeys tanlash va paket ushlash" },
        { p: "Wireshark'ni ishga tushirganingizda birinchi ko'radigan narsangiz — tarmoq interfeyslari ro'yxati (masalan, <code>eth0</code>, <code>wlan0</code>, yoki lab uchun <code>vboxnet0</code> host-only interfeysi). Trafikni ushlash uchun qaysi interfeysdan tinglashni tanlaysiz." },
        { p: "Kerakli interfeysni ikki marta bosish bilan ushlash boshlanadi. Ekran paketlar bilan to'lib boradi — har bir qator bitta paket. Ushlashni to'xtatgach, ularni bemalol ko'zdan kechirishingiz mumkin. Lab uchun host-only interfeysini (masalan <code>vboxnet0</code>) tanlang — shunda faqat lab mashinalari orasidagi trafikni ko'rasiz." },
        { note: "Paketlarni ushlash uchun odatda administrator (root) huquqi kerak, chunki bu tarmoq kartasiga past darajada murojaat qiladi. Kali'da Wireshark shu huquq bilan ishlashga sozlangan holda keladi." },

        { h2: "Displey filtrlar — Wireshark'ning kuchi" },
        { p: "Bir necha soniyada minglab paket to'planadi — bularning hammasini qo'lda ko'rib bo'lmaydi. Aynan shu yerda <strong>displey filtrlar</strong> ish beradi: siz faqat qiziqtirgan paketlarni ko'rsatasiz, qolganini yashirasiz. Filtrni yuqoridagi maxsus qatorga yozasiz:" },
        { code: [
          "# Faqat HTTP trafigini ko'rsatish:",
          "http",
          "",
          "# Faqat aniq bir lab xosti bilan bog'liq trafik:",
          "ip.addr == 192.168.56.101",
          "",
          "# Faqat 80-portdagi (web) TCP trafigi:",
          "tcp.port == 80",
          "",
          "# Faqat DNS so'rovlari:",
          "dns"
        ].join("\n") },
        { p: "Filtrlarni birlashtirish ham mumkin — mantiqiy operatorlar bilan aniqroq tanlab olasiz:" },
        { code: [
          "# Faqat shu xostga borayotgan HTTP trafigi:",
          "ip.addr == 192.168.56.101 and http",
          "",
          "# HTTP yoki DNS (ikkovidan biri):",
          "http or dns",
          "",
          "# HTTP so'rovlari, lekin rasm fayllaridan tashqari:",
          "http.request and not http.request.uri contains \".png\""
        ].join("\n") },
        { tip: "Filtr — Wireshark'ning eng kuchli tomoni. \"Hamma narsani ko'rish\" o'rniga \"aynan kerakli narsani ko'rish\"ni o'rganing. Yaxshi filtr minglab paketni bir nechtaga qisqartiradi va tahlilni oson qiladi." },

        { h2: "TCP oqimni kuzatish" },
        { p: "Bitta so'rov ko'pincha bir nechta paketga bo'linadi. Ularni birma-bir ko'rish o'rniga, Wireshark'ning <strong>Follow TCP Stream</strong> (\"TCP oqimni kuzatish\") xususiyatidan foydalaning. Paketga o'ng tugma bilan bosib, shu buyruqni tanlaganingizda, Wireshark barcha bog'liq paketlarni yig'ib, butun suhbatni bir oynada ko'rsatadi." },
        { p: "Bu ayniqsa <code>HTTP</code> uchun foydali: klient nima so'raganini va server nima javob berganini xuddi matn sifatida to'liq o'qiysiz. So'rov sarlavhalari, javob kodi, hatto uzatilgan ma'lumot — barchasi bir joyda." },

        { h2: "HTTP: ochiq matnli login" },
        { p: "Endi eng muhim tajribaga o'tamiz. O'z laboratoriyangizdagi <code>HTTP</code> (shifrlanmagan) web ilovaga — masalan DVWA'ga — login qiling va o'sha paytda trafikni ushlang. So'ng <code>http</code> filtri bilan login so'rovini toping va TCP oqimni kuzating. Quyidagicha manzarani ko'rasiz:" },
        { code: [
          "# HTTP login so'rovi (Follow TCP Stream ichida):",
          "POST /login.php HTTP/1.1",
          "Host: 192.168.56.101",
          "Content-Type: application/x-www-form-urlencoded",
          "",
          "username=admin&password=parol123",
          "",
          "# DIQQAT: username va password OCHIQ MATNDA ko'rinmoqda!",
          "# HTTP shifrlanmagani uchun har kim buni o'qiy oladi."
        ].join("\n") },
        { p: "Mana, xavfsizlikning eng jonli darsi: <code>HTTP</code> orqali yuborilgan login va parol tarmoqda ochiq matnda uchadi. Trafikni ushlagan har qanday odam uni bemalol o'qiy oladi. Bu — nazariya emas, o'z ko'zingiz bilan ko'rgan haqiqat." },
        { warn: "Bu tajribani FAQAT o'z laboratoriya trafigingizda, o'zingiz kiritgan soxta login bilan bajaring. Boshqa birovning login-parolini ushlash — jinoyat. Bu yerda maqsad — himoya tamoyilini tushunish, hujum emas." },

        { h2: "HTTPS: shifrlangan va o'qib bo'lmaydigan" },
        { p: "Endi xuddi shu tajribani <code>HTTPS</code> (masalan, <code>https://127.0.0.1:3000</code> dagi Juice Shop) bilan takrorlang. Trafikni ushlab, TCP oqimni kuzatsangiz, butunlay boshqa manzara ko'rasiz:" },
        { code: [
          "# HTTPS trafigi (Follow TCP Stream ichida):",
          "16 03 03 00 45 a1 f2 9c 3b ...  (tushunarsiz baytlar)",
          "e7 4d 1a 88 c0 5f 2e 91 ...     (shifrlangan ma'lumot)",
          "",
          "# Login va parol YO'Q — hammasi shifrlangan.",
          "# TLS ularni o'qib bo'lmaydigan holga keltirgan."
        ].join("\n") },
        { p: "Farq keskin: <code>HTTP</code>da parol ochiq ko'rinardi, <code>HTTPS</code>da esa faqat tushunarsiz shifrlangan baytlar. <code>TLS</code> (<em>Transport Layer Security</em> — <code>HTTPS</code>dagi \"S\") ma'lumotni uzatishdan oldin shifrlaydi, shuning uchun trafikni ushlagan odam ham hech narsani o'qiy olmaydi." },

        { h2: "Himoya sabog'i: har doim TLS" },
        { p: "Ushbu ikki tajriba butun bir ma'ruzaga arziydigan xulosani beradi: <strong>har doim HTTPS/TLS ishlating</strong>. Login sahifasi, forma, API — foydalanuvchi ma'lumoti ketadigan har qanday joy shifrlangan ulanish orqali bo'lishi shart." },
        { ul: [
          "Web ilovangiz uchun har doim <code>HTTPS</code>ni yoqing va <code>HTTP</code>'ni <code>HTTPS</code>'ga yo'naltiring;",
          "Maxfiy ma'lumotni hech qachon shifrlanmagan kanal orqali yubormang;",
          "Ochiq Wi-Fi kabi ishonchsiz tarmoqlarda ayniqsa ehtiyot bo'ling — u yerda trafik ushlanishi oson."
        ] },
        { p: "Wireshark bu saboqni kitobdagi jumla emas, balki o'z ko'zingiz bilan ko'rgan dalilga aylantiradi. Aynan shuning uchun u shu qadar kuchli o'quv vositasi." },

        { h2: "Protokollarni jonli o'rganish" },
        { p: "Wireshark shunchaki xavfsizlik asbobi emas — u protokollarni o'rganishning eng yaxshi usullaridan biri. Masalan, brauzerda bir sahifa ochib, <code>dns</code> filtri bilan DNS so'rov-javobini ko'rasiz; keyin <code>tcp</code> filtri bilan TCP ulanish qanday o'rnatilishini (uch qadamli \"qo'l berish\") kuzatasiz. Kitobdagi sxemalar birdan jonli manzaraga aylanadi." },
        { p: "Har bir paketni bosganingizda, Wireshark uni qatlamma-qatlam ochib beradi: Ethernet, IP, TCP, va yuqoridagi protokol. Bu tarmoq qanday qavatlardan iboratligini his qilishning eng aniq yo'li." },

        { h2: "Xulosa" },
        { p: "Wireshark tarmoqning ko'rinmas trafigini ko'rinadigan qiladi. Interfeys tanlab paket ushlaysiz, displey filtrlar bilan kerakligini ajratasiz, Follow TCP Stream bilan butun suhbatni o'qiysiz. Eng muhim saboq — <code>HTTP</code>da parol ochiq, <code>HTTPS</code>da shifrlangan: shuning uchun har doim TLS." },
        { tip: "Filtr — Wireshark'ning kuchi. Yaxshi filtr yozishni mashq qiling: <code>http</code>, <code>ip.addr == ...</code>, <code>tcp.port == ...</code> — bu uchtasi eng ko'p ishlatiladigan va eng foydali filtrlardir." }
      ]
    },
    {
      slug: "burp-suite",
      title: "Burp Suite bilan web ilova o'rganish",
      blurb: "Burp Suite nima, brauzer-proxy-ilova sxemasi, proxy va sertifikat sozlash, Proxy/Intercept va Repeater modullari hamda o'z lab ilovangizdagi so'rovlarni ushlab o'rganish.",
      body: [
        { lead: "Web ilova bilan brauzer o'rtasida ko'plab so'rov va javob almashiladi — lekin brauzer bularni bizdan yashiradi. <strong>Burp Suite</strong> — aynan shu almashinuvni to'xtatib, ko'rib, hatto o'zgartirib ko'rish imkonini beruvchi vosita. U web ilova xavfsizligini o'rganishning asosiy asbobi. Bu darsda uni o'zingiz ko'targan zaif mashq ilovasida (Juice Shop yoki DVWA) ishlatishni o'rganamiz." },

        { h2: "Burp Suite nima" },
        { p: "<strong>Burp Suite</strong> — web ilovalarni tekshirish uchun mo'ljallangan <code>proxy</code> asosidagi vosita to'plami. Uning yuragi — brauzer bilan web server o'rtasida turadigan proxy: barcha so'rovlar Burp orqali o'tadi, siz esa ularni ushlab, ko'rib, tahlil qilishingiz mumkin." },
        { p: "Burp Suite ikki asosiy versiyada keladi: pullik <strong>Professional</strong> va bepul <strong>Community</strong>. O'rganish uchun Community versiyasi to'liq yetarli — undagi asosiy modullar (Proxy, Repeater) barcha muhim tushunchalarni qamrab oladi." },
        { warn: "Burp Suite'ni FAQAT o'zingiz ko'targan lab ilovasiga (Juice Shop, DVWA) yoki rasman ruxsat berilgan nishonga qarating. Boshqa birovning web ilovasi so'rovlarini ushlash yoki o'zgartirish — JINOYAT. Faqat o'z lab ilovangiz." },

        { h2: "Brauzer - Burp - ilova sxemasi" },
        { p: "Burp'ning ish tamoyilini tushunish uchun sxemani tasavvur qiling. Odatda brauzer to'g'ridan-to'g'ri serverga ulanadi. Burp bilan esa oradaga qo'shimcha bir halqa qo'shiladi:" },
        { code: [
          "# Oddiy holat:",
          "Brauzer  ---------------->  Web server",
          "",
          "# Burp bilan (u orada 'proxy' bo'lib turadi):",
          "Brauzer  --->  Burp Proxy  --->  Web server",
          "               (127.0.0.1:8080)",
          "",
          "# Endi har bir so'rov Burp orqali o'tadi —",
          "# siz uni ushlashingiz, ko'rishingiz va o'zgartirishingiz mumkin."
        ].join("\n") },
        { p: "Ya'ni Burp — brauzer va server o'rtasida turgan \"oraliq nazoratchi\". Barcha trafik u orqali o'tgani uchun, siz web ilova bilan brauzer qanday gaplashayotganini to'liq ko'rasiz." },

        { h2: "Proxy va sertifikatni sozlash" },
        { p: "Burp'ni ishlatish uchun ikki narsani sozlaysiz. Birinchidan, brauzerni Burp proxysi orqali yuboradigan qilib moslaysiz. Burp odatda <code>127.0.0.1:8080</code> manzilida tinglaydi:" },
        { code: [
          "# Brauzer proxy sozlamalari:",
          "#   HTTP Proxy:  127.0.0.1",
          "#   Port:        8080",
          "#",
          "# Endi brauzer barcha so'rovlarini shu manzilga —",
          "# ya'ni Burp'ga yuboradi."
        ].join("\n") },
        { p: "Ikkinchidan, <code>HTTPS</code> saytlarni ushlash uchun Burp'ning sertifikatini brauzerga ishonchli deb qo'shasiz. <code>HTTPS</code> shifrlangani uchun, Burp trafikni ko'ra olishi kerak bo'lsa, brauzer Burp sertifikatiga ishonishi shart:" },
        { code: [
          "# Burp sertifikatini o'rnatish qadamlari:",
          "#  1. Brauzerda oching:  http://burpsuite",
          "#  2. 'CA Certificate' tugmasini bosib sertifikatni yuklab oling",
          "#  3. Brauzer sozlamalarida uni 'ishonchli' sifatida import qiling",
          "#",
          "# Bu FAQAT o'z brauzeringizda, o'z lab ilovangiz uchun."
        ].join("\n") },
        { note: "Bu sertifikat mexanizmi aynan HTTPS'ni ushlash uchun kerak — u brauzerga \"Burp'ga ishon\" deydi. Aynan shu sabab ham begona kompyuterga bunday sertifikat o'rnatish xavfli; siz buni faqat o'z mashinangizda, o'rganish uchun qilasiz." },

        { h2: "Nishon: o'zingiz ko'targan ilova" },
        { p: "Burp bilan ishlashdan oldin nishoningiz tayyor bo'lsin. Oldingi darsda o'rgangan usulda Juice Shop yoki DVWA'ni lokal ko'taring:" },
        { code: [
          "# Juice Shop'ni lokal ko'tarish (nishon sifatida):",
          "docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop",
          "",
          "# Brauzerda:  http://127.0.0.1:3000",
          "# Endi shu ilova bilan Burp orqali ishlaymiz."
        ].join("\n") },
        { p: "Bu ilova ataylab zaif qilib yaratilgan va aynan o'rganish uchun mo'ljallangan. Uni o'z kompyuteringizda ko'targaningiz uchun, uni Burp bilan tekshirish to'liq qonuniy va etik." },

        { h2: "Proxy / Intercept moduli" },
        { p: "Burp'ning eng asosiy moduli — <strong>Proxy</strong>, uning ichida esa <strong>Intercept</strong> (ushlash) rejimi. <code>Intercept is on</code> holatida har bir so'rov serverga borishdan oldin Burp'da to'xtaydi — siz uni ko'rasiz, o'rganasiz va istasangiz o'zgartirasiz, keyin <code>Forward</code> bilan davom ettirasiz." },
        { p: "Masalan, Juice Shop'da login qilsangiz, so'rov Burp'da to'xtaydi va siz uning ichini ko'rasiz:" },
        { code: [
          "# Intercept ushlagan login so'rovi:",
          "POST /rest/user/login HTTP/1.1",
          "Host: 127.0.0.1:3000",
          "Content-Type: application/json",
          "",
          "{\"email\":\"test@lab.local\",\"password\":\"parol123\"}",
          "",
          "# Endi ko'rinadi: qaysi manzilga, qanday maydonlar bilan",
          "# so'rov yuborilmoqda. Bu — ilovani tushunishning kaliti."
        ].join("\n") },
        { p: "Intercept sizga so'rovning ichki tuzilishini ochib beradi: qanday maydonlar bor, ma'lumot qanday formatda (bu yerda <code>JSON</code>), qaysi endpoint'ga boradi. Bu — web ilova qanday ishlashini tushunishning eng to'g'ridan-to'g'ri yo'li." },

        { h2: "Repeater moduli" },
        { p: "<strong>Repeater</strong> — ikkinchi muhim modul. U bitta so'rovni qayta-qayta yuborib, har safar javobni o'rganish imkonini beradi. Ushlagan so'rovni Repeater'ga jo'natasiz (o'ng tugma → <code>Send to Repeater</code>), so'ng uni istagancha o'zgartirib, qayta yuborasiz." },
        { p: "Repeater — o'rganishning ideal maydoni: so'rovni bir maydonini o'zgartirib yuborasiz, server javobi qanday o'zgarishini ko'rasiz, xulosalar chiqarasiz. Bu — web ilovaning \"o'zini qanday tutishini\" tekshirishning tinch, nazorat ostidagi usuli." },

        { h2: "Target va Sitemap" },
        { p: "<strong>Target</strong> moduli ichidagi <strong>Sitemap</strong> — siz ko'rgan ilovaning \"xaritasi\". Ilovada yurar ekansiz, Burp barcha ko'rilgan manzillar, endpointlar va resurslarni avtomatik yig'ib boradi. Natijada ilovaning tuzilishini bir joyda ko'rasiz: qaysi sahifalar, qaysi API endpointlari bor." },
        { note: "Burp'da <strong>Intruder</strong> va <strong>Scanner</strong> nomli kuchliroq modullar ham bor (avtomatlashtirilgan tekshiruv uchun). Boshlovchi uchun ularni faqat nomini bilish yetarli — asosiy tushunchalar Proxy va Repeater orqali o'zlashtiriladi." },

        { h2: "Namuna ish oqimi" },
        { p: "Burp bilan birinchi mashqingiz quyidagi tartibda bo'lsin:" },
        { ol: [
          "Juice Shop'ni lokal ko'taring va Burp proxysini sozlang;",
          "Intercept'ni yoqing va ilovada login qilishga urinib ko'ring;",
          "Ushlangan login so'rovini diqqat bilan o'qing — qanday maydonlar borligini tushuning;",
          "So'rovni Repeater'ga jo'nating;",
          "Repeater'da uni qayta yuboring va server javobini o'rganing;",
          "Bir maydonni o'zgartirib, javob qanday o'zgarishini kuzating."
        ] },
        { p: "Bu oddiy oqim OWASP darslaridagi zaifliklarni (masalan, autentifikatsiya yoki kirish validatsiyasi muammolarini) amalda ko'rishga yordam beradi: siz endi so'rovni to'g'ridan-to'g'ri ko'rib, ilova ma'lumotni qanday qabul qilishini tushunasiz." },

        { h2: "Burp'ni himoyachi sifatida ishlatish" },
        { p: "Burp faqat tekshiruvchining asbobi emas — u dasturchi va himoyachi uchun ham foydali. O'z ilovangizni Burp orqali kuzatib, uning haqiqatan qanday so'rovlar yuborayotganini ko'rasiz: ehtimol maxfiy ma'lumot kutilmagan joyga ketyapti yoki keraksiz sarlavha uzatilyapti." },
        { p: "Shu tarzda Burp \"mening ilovam tashqariga aslida nima yuboryapti?\" degan savolga aniq javob beradi. Ilovangizni ishga topshirishdan oldin uni Burp bilan ko'zdan kechirish — arzon va samarali xavfsizlik odati." },

        { h2: "Xulosa" },
        { p: "Burp Suite — web ilova bilan brauzer o'rtasidagi trafikni ochib beruvchi proxy. Proxy/Intercept bilan so'rovlarni ushlab ko'rasiz, Repeater bilan qayta yuborib o'rganasiz, Sitemap bilan ilova tuzilishini yig'asiz. Bularning barchasi web ilova qanday ishlashini chuqur tushunish uchun." },
        { tip: "Community (bepul) versiyasi o'rganish uchun to'liq yetarli. Uni faqat o'z lab ilovangizda ishlating va har doim yodda tuting: maqsad — ilovani tushunish va himoyani yaxshilash, boshqaning tizimiga zarar yetkazish emas." }
      ]
    },
    {
      slug: "metasploit",
      title: "Metasploit asoslari (lab)",
      blurb: "Metasploit Framework nima, etik ramka, modullar tuzilishi (exploit, payload, auxiliary, post), msfconsole ish oqimi hamda natijani himoyachi nuqtai nazaridan o'qish — barchasi o'z lab VM kontekstida.",
      body: [
        { lead: "Zaiflik topilgani bilan uning naqadar jiddiy ekanini har doim ham aniq baholab bo'lmaydi. \"Bu port ochiq\" degan ma'lumot bilan \"bu zaiflik orqali tizimni to'liq egallash mumkin\" degan xulosa o'rtasida katta farq bor. <strong>Metasploit Framework</strong> — aynan shu farqni ko'rsatadigan vosita: zaiflikning real ta'sirini nazorat ostida sinab ko'rish imkonini beradi. Bu darsda uni faqat o'z laboratoriyangizdagi ataylab zaif VM kontekstida, konseptual darajada o'rganamiz." },

        { h2: "Metasploit nima" },
        { p: "<strong>Metasploit Framework</strong> — ekspluatatsiya va tekshiruv freymvorki. U ma'lum zaifliklarni sinab ko'rish uchun tayyor modullar to'plamini beradi. Professional xavfsizlik mutaxassislari uni <strong>ruxsat berilgan</strong> penetratsiya testlarida — mijoz yozma ruxsat bergan tizimlarda — ishlatadi." },
        { p: "Bizning kontekstimizda esa Metasploit — o'rganish vositasi. Uni faqat o'zingiz ko'targan, ataylab zaif qilib yaratilgan VM'da (masalan, <code>Metasploitable</code>) ishlatamiz. Maqsad — vositani tushunish, ish oqimini bilish va natijani himoyachi ko'zi bilan o'qish." },
        { warn: "Metasploit'ni FAQAT o'zingiz ko'targan, ataylab zaif qilingan VM'da (Metasploitable kabi) ishlating. Ruxsatsiz tizimga qarshi ekspluatatsiya vositasini ishlatish — OG'IR JINOYAT. Faqat o'zingizniki yoki yozma ruxsat berilgani. Bundan istisno yo'q." },

        { h2: "Adabiy va etik ramka" },
        { p: "Metasploit — kuchli vosita, shu sababli uni ishlatishning etik ramkasi qat'iy. Uni ishlatishdan oldin o'zingizga uch savolni bering: \"Bu tizim menikimi? Yozma ruxsatim bormi? Zarar yetkazmasdan, faqat o'rganish uchun ishlatyapmanmi?\" Uchala savolga \"ha\" bo'lmasa — to'xtang." },
        { p: "Shu bois ushbu darsdagi barcha misollar YUQORI DARAJADA (konseptual) berilgan. Biz real nishon uchun tayyor hujum ketma-ketligini emas, balki vositaning umumiy tuzilishi va mantiqini o'rganamiz — o'z lab VM'ingiz kontekstida." },

        { h2: "Modullar tuzilishi" },
        { p: "Metasploit'ning kuchi — uning modullar tizimida. Har bir modul aniq bir vazifani bajaradi. To'rt asosiy tur bor:" },
        { ul: [
          "<strong>exploit</strong> — muayyan zaiflikdan foydalanadigan kod;",
          "<strong>payload</strong> — ekspluatatsiya muvaffaqiyatli bo'lgach ishga tushadigan \"foydali yuk\" (masalan, ulanish ochish);",
          "<strong>auxiliary</strong> — yordamchi modullar: skanerlash, versiya aniqlash, ma'lumot yig'ish (hujum emas);",
          "<strong>post</strong> — ekspluatatsiyadan keyingi bosqich modullari."
        ] },
        { p: "Boshlovchi va himoyachi uchun eng foydali va eng xavfsiz tur — <strong>auxiliary</strong>. Bu modullar hech narsani buzmaydi, faqat ma'lumot yig'adi. Aynan shulardan boshlash tavsiya etiladi." },

        { h2: "msfconsole — asosiy interfeys" },
        { p: "Metasploit bilan ishlashning asosiy yo'li — <code>msfconsole</code> nomli buyruq qatori interfeysi. U Kali'da tayyor keladi. Ishga tushirganingizdan so'ng, buyruqlar orqali modullarni qidirasiz, tanlaysiz va ularning sozlamalarini belgilaysiz:" },
        { code: [
          "# Metasploit konsolini ishga tushirish:",
          "msfconsole",
          "",
          "# Konsol ochilgach, asosiy buyruqlar:",
          "#   search  — modul qidirish",
          "#   use     — modulni tanlash",
          "#   info    — modul haqida ma'lumot",
          "#   show options — modul sozlamalarini ko'rish",
          "#   set     — sozlama qiymatini belgilash",
          "#   run     — modulni ishga tushirish"
        ].join("\n") },

        { h2: "Konseptual ish oqimi" },
        { p: "Metasploit'da tipik ish oqimi bir necha oddiy qadamdan iborat. Quyida — o'z lab Metasploitable nishoningizga qarshi, konseptual (soddalashtirilgan) misol. Bu real nishon uchun tayyor ketma-ketlik EMAS, balki vositaning mantiqini ko'rsatuvchi namuna:" },
        { code: [
          "# 1) Kerakli modulni qidirish:",
          "search vsftpd",
          "",
          "# 2) Modulni tanlash (o'rnak sifatida):",
          "use auxiliary/scanner/ftp/ftp_version",
          "",
          "# 3) Modul qanday sozlamalar so'rashini ko'rish:",
          "show options",
          "",
          "# 4) Nishon manzilini belgilash (o'z lab VM'ingiz):",
          "set RHOSTS 192.168.56.102",
          "",
          "# 5) Modulni ishga tushirish:",
          "run"
        ].join("\n") },
        { p: "E'tibor bering: bu yerda tanlangan modul — <code>auxiliary/scanner</code>, ya'ni faqat versiya aniqlaydigan, hech narsani buzmaydigan yordamchi modul. <code>RHOSTS</code> esa — nishon manzili, u har doim o'z lab VM'ingiz IP'si (<code>192.168.56.102</code>)." },

        { h2: "Natijani o'qish" },
        { p: "Modul ishga tushgach, natijani o'qiy bilish — eng muhim mahorat. Auxiliary skaner, masalan, quyidagicha natija berishi mumkin:" },
        { code: [
          "# 'run' natijasi (auxiliary skaner):",
          "[+] 192.168.56.102:21 - FTP Banner: vsftpd 2.3.4",
          "[*] Scanned 1 of 1 hosts (100% complete)",
          "[*] Auxiliary module execution completed",
          "",
          "# Xulosa: nishonda vsftpd 2.3.4 ishlayapti —",
          "# bu eski, ma'lum zaifligi bo'lgan versiya."
        ].join("\n") },
        { p: "Bu natija himoyachiga aniq signal beradi: <code>vsftpd 2.3.4</code> — eskirgan versiya. Endi himoyachi \"bu versiyada qanday zaifliklar bor, ularni patch qilish qanchalik shoshilinch?\" degan savolga o'tadi." },

        { h2: "Nega bu himoyachiga foydali" },
        { p: "Metasploit'ni himoyachi nuqtai nazaridan ko'rish uni butunlay boshqacha tushunishga olib keladi. U hujum vositasi emas, balki <strong>prioritet belgilash</strong> vositasi:" },
        { ul: [
          "U zaiflikning <strong>real jiddiyligini</strong> ko'rsatadi — \"nazariy xavf\" bilan \"amalda foydalanish mumkin\" o'rtasidagi farqni;",
          "Shu asosda himoyachi <strong>patch prioritetini</strong> belgilaydi: qaysi zaiflikni birinchi navbatda yopish kerak;",
          "Auxiliary modullar bilan o'z tarmog'idagi zaif nuqtalarni hujumchidan oldin topadi;",
          "Ekspluatatsiya muvaffaqiyatli bo'lsa, bu — \"bu zaiflik jiddiy, darhol tuzatilsin\" degan aniq dalil."
        ] },
        { p: "Ya'ni Metasploit himoyachiga \"qaysi eshik haqiqatan ochiq va xavfli?\" degan savolga aniq javob beradi, va u shu javobga qarab resurslarini to'g'ri taqsimlaydi." },

        { h2: "Mas'uliyatli ishlatish" },
        { p: "Ushbu darsda ekspluatatsiya qadamlari ataylab yuqori darajada — konseptual berildi. Biz auxiliary (skaner) modullariga urg'u berdik, chunki ular xavfsiz va o'rganish uchun ideal. Real, buzadigan exploit modullarini ishlatish — faqat o'z lab VM'ingizda va faqat o'rganish maqsadida, tizim tuzilishini tushunish uchun bo'lishi kerak." },
        { p: "Vositani \"tushunish\" bilan \"suiiste'mol qilish\" o'rtasidagi chegara — ruxsat va maqsadda. Sizning maqsadingiz — himoyachi va o'rganuvchi bo'lish: zaiflik qanday ishlashini bilib, uni yopishni o'rganish." },
        { warn: "Yana bir bor: Metasploit faqat Metasploitable kabi o'zingiz ko'targan, ataylab zaif VM'da. Ruxsatsiz tizimni test qilish — jinoyat. Bu vositaning kuchi uni yanada javobgarlik bilan ishlatishni talab qiladi." },

        { h2: "Auxiliary'dan boshlang" },
        { p: "Agar Metasploit'ni endi o'rganayotgan bo'lsangiz, birinchi mashqlaringizni faqat <code>auxiliary/scanner</code> modullari bilan qiling. Ular nishonni buzmaydi, faqat ma'lumot yig'adi: versiya, ochiq xizmat, banner. Shu bilan siz <code>use</code>, <code>show options</code>, <code>set</code>, <code>run</code> oqimini xavfsiz o'zlashtirasiz." },
        { p: "Faqat bu oqim qo'lingizga tushib, natijani ishonch bilan o'qiy boshlaganingizdan so'ng, murakkabroq modullarga o'tishingiz mumkin — albatta o'sha o'z lab VM'ingizda va toza snapshot'dan boshlab." },

        { h2: "Xulosa" },
        { p: "Metasploit Framework — modullar (exploit, payload, auxiliary, post) va <code>msfconsole</code> asosidagi tekshiruv freymvorki. Uni o'z lab VM'ingizda ishlatib, <code>search</code>, <code>use</code>, <code>show options</code>, <code>set RHOSTS</code>, <code>run</code> oqimini o'rganasiz. Eng muhimi — natijani himoyachi ko'zi bilan o'qib, zaiflik jiddiyligini va patch prioritetini baholaysiz." },
        { tip: "Metasploitable + Kali bilan xavfsiz mashq qiling. Auxiliary skanerlardan boshlang — ular hech narsani buzmaydi va vositaning mantiqini o'rgatadi. Har doim toza snapshot'dan boshlab, izolyatsiya qilingan tarmoqda ishlang." }
      ]
    }
  ]
};
