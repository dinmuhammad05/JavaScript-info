"use strict";

module.exports = {
  part: "9-qism: Kiberxavfsizlik",
  chapter: "Kiberxavfsizlik asoslari",
  lessons: [
    {
      slug: "kiberxavfsizlik-nima",
      title: "Kiberxavfsizlik nima va nega muhim",
      blurb: "CIA triadasi, asosiy atamalar (zaiflik, tahdid, xavf, hujum yuzasi), chuqurlashtirilgan himoya tamoyili va sohaga qisqacha kirish.",
      body: [
        { lead: "Kiberxavfsizlik — bu kompyuter tizimlarini, tarmoqlarni va ma'lumotlarni ruxsatsiz kirish, buzilish yoki yo'qolishdan himoya qilish san'ati va fanidir. Ushbu birinchi darsda biz xavfsizlikning asosiy tushunchalarini — nima uchun u bugungi kunda kritik ahamiyatga ega ekanini, uni baholash uchun ishlatiladigan asosiy ramkani va sohada uchraydigan kalit atamalarni <strong>faqat himoya nuqtai nazaridan</strong> o'rganamiz." },

        { note: "Ushbu butun bob to'liq ta'lim va <strong>himoya</strong> maqsadida yozilgan. Maqsad — sizni tahdidni tushunadigan va undan himoyalana oladigan mutaxassis qilib tayyorlash. Hech qanday hujum qilish yo'riqnomasi yoki zararli kod berilmaydi." },

        { h2: "Kiberxavfsizlik nima?" },
        { p: "Har bir zamonaviy tashkilot — bankdan tortib maktabgacha — o'z ishini raqamli tizimlarga tayanib olib boradi. Bu tizimlarda foydalanuvchilarning parollari, to'lov ma'lumotlari, tibbiy yozuvlari va shaxsiy yozishmalari saqlanadi. <strong>Kiberxavfsizlik</strong> ana shu qimmatli ma'lumotni va uni saqlaydigan tizimlarni himoya qilish bilan shug'ullanadi." },
        { p: "Muhim tushuncha shundaki, xavfsizlik — bu <em>mahsulot</em> emas, balki <em>jarayon</em>. Uni bir marta \"o'rnatib\" bo'lmaydi. Tahdidlar doim o'zgaradi, shuning uchun himoya ham doimiy yangilanib turishi kerak." },
        { ul: [
          "<strong>Ma'lumotni himoya qilish:</strong> parollar, kartalar, shaxsiy hujjatlar;",
          "<strong>Tizimlarni himoya qilish:</strong> serverlar, ma'lumotlar bazalari, tarmoqlar;",
          "<strong>Xizmatni saqlab qolish:</strong> foydalanuvchilar tizimdan uzluksiz foydalana olishi."
        ] },

        { h2: "Nega bugun bu kritik?" },
        { p: "Yigirma yil oldin kompyuter faqat ish stolida turardi. Bugun esa deyarli har bir narsa — telefon, mashina, sovutgich, tibbiy asboblar — internetga ulangan. Bu qulaylik keltirdi, lekin ayni paytda <strong>hujum yuzasini</strong> ham keskin kengaytirdi." },
        { ul: [
          "<strong>Ma'lumotning qiymati oshdi:</strong> shaxsiy ma'lumotlar qora bozorda sotiladigan tovarga aylandi;",
          "<strong>Hujumlar ko'paydi va arzonlashdi:</strong> avtomatlashtirilgan vositalar tufayli hujumlar ommalashdi;",
          "<strong>Bog'liqlik ortdi:</strong> bitta xizmatning ishdan chiqishi minglab boshqa xizmatga ta'sir qiladi;",
          "<strong>Oqibatlar og'irlashdi:</strong> ma'lumot sizib chiqishi obro'ni, pulni va odamlarning ishonchini yo'qotadi."
        ] },
        { p: "Shu sabab kiberxavfsizlik endi faqat \"IT bo'limining ishi\" emas. Har bir dasturchi, dizayner va oddiy foydalanuvchi ham o'z ulushiga mas'ul." },

        { h2: "CIA triadasi" },
        { p: "Axborot xavfsizligining klassik uchligi — bu <strong>CIA triadasi</strong>. Bu razvedka boshqarmasi emas, balki uchta tamoyilning inglizcha bosh harflari: Confidentiality, Integrity, Availability. Har qanday xavfsizlik qarorini shu uch tamoyil orqali baholash mumkin." },
        { h3: "1. Maxfiylik (Confidentiality)" },
        { p: "Ma'lumotni faqat unga huquqi bor kishilar ko'ra olishi kerak. Masalan, foydalanuvchining paroli, xabarlari va kartasi begonaga ko'rinmasligi shart. Maxfiylikni ta'minlash vositalari: shifrlash, to'g'ri avtorizatsiya va ma'lumotga kirishni cheklash." },
        { p: "<em>Misol:</em> shifokor bemorning tashxisini ko'ra oladi, lekin qo'shni palatadagi hamshira uni ko'ra olmaydi — chunki unga bu ma'lumotga ruxsat yo'q." },
        { h3: "2. Butunlik (Integrity)" },
        { p: "Ma'lumot ruxsatsiz o'zgartirilmasligi kerak. Butunlik buzilsa, biz ma'lumotga ishona olmaymiz." },
        { p: "<em>Misol:</em> talaba o'z bahosini elektron jurnalda o'zgartira olmasligi kerak. Agar u \"3\" ni \"5\" ga aylantira olsa — ma'lumotning butunligi buzilgan bo'ladi. Vositalar: raqamli imzolar, hash-tekshirishlar va server tomonidagi qat'iy tekshiruvlar." },
        { h3: "3. Mavjudlik (Availability)" },
        { p: "Xizmat unga muhtoj bo'lgan foydalanuvchilar uchun ishlab turishi kerak." },
        { p: "<em>Misol:</em> imtihon kuni universitet sayti ishlamay qolsa, minglab talaba ro'yxatdan o'ta olmaydi — bu mavjudlikning buzilishi. Vositalar: zaxira nusxalar, yuklama muvozanati va so'rov chastotasini cheklash." },
        { note: "Har qanday xavfsizlik qarorini qabul qilayotganda o'zingizga savol bering: \"Bu qaror maxfiylik, butunlik va mavjudlikning qaysi biriga xizmat qiladi?\" Bu ramka sizga tizimli fikrlash imkonini beradi." },

        { h2: "Asosiy atamalar" },
        { p: "Xavfsizlik sohasida ba'zi so'zlar kundalik nutqdagidan boshqacha, aniq ma'noda ishlatiladi. Ularni chalkashtirmaslik muhim:" },
        { h3: "Zaiflik (vulnerability)" },
        { p: "Tizimdagi kamchilik yoki xato — undan foydalanish mumkin bo'lgan \"teshik\". Masalan, yangilanmagan dastur yoki oddiy parol — bu zaiflik." },
        { h3: "Tahdid (threat)" },
        { p: "Zaiflikdan zarar keltirish uchun foydalanishi mumkin bo'lgan potensial voqea yoki manba. Masalan, ma'lumot o'g'irlashni istagan hujumchi — bu tahdid." },
        { h3: "Xavf (risk)" },
        { p: "Tahdid zaiflikdan foydalanib zarar keltirish <em>ehtimoli</em> va uning oqibati. Xavf = tahdid + zaiflik + qiymat. Agar zaiflik bo'lsa-yu, unga hech qanday tahdid bo'lmasa, xavf past bo'ladi." },
        { h3: "Hujum yuzasi (attack surface)" },
        { p: "Hujumchi tizimga kirishga urinishi mumkin bo'lgan barcha nuqtalar yig'indisi. Har bir ochiq port, har bir forma, har bir API — bu hujum yuzasining bir qismi. Yaxshi himoya hujum yuzasini iloji boricha kichraytirishga intiladi." },
        { tip: "Bu atamalarni misol bilan eslab qoling: <strong>zaiflik</strong> — ochiq eshik; <strong>tahdid</strong> — o'g'ri; <strong>xavf</strong> — o'g'ri kirib ketish ehtimoli; <strong>hujum yuzasi</strong> — uydagi barcha eshik va derazalar." },

        { h2: "Chuqurlashtirilgan himoya" },
        { p: "Xavfsizlikda muhim haqiqat bor: <strong>hujumchi doim bitta zaiflikni topsa yetadi</strong>, himoyachi esa <em>barcha</em> zaifliklarni yopishi kerak. Shu sabab bitta himoya qatliga tayanish xato. Yechim — <strong>chuqurlashtirilgan himoya</strong> (defense in depth): ustma-ust bir necha himoya qatlamini qo'yish." },
        { p: "Buni qal'aga o'xshating: atrofda handaq, so'ng devor, so'ng darvoza soqchisi, so'ng ichki qulf. Biror qatlam yorib o'tilsa ham, keyingisi hujumni to'xtatadi." },
        { ul: [
          "<strong>Tarmoq qatlami:</strong> xavfsizlik devori (firewall), HTTPS shifrlash;",
          "<strong>Ilova qatlami:</strong> kiritmani tekshirish, avtorizatsiya;",
          "<strong>Ma'lumot qatlami:</strong> shifrlash, zaxira nusxalar;",
          "<strong>Inson qatlami:</strong> xodimlarni o'qitish, kuchli parol siyosati."
        ] },

        { h2: "Amaliyot: parol kuchini baholash" },
        { p: "Kuchli parol — himoyaning eng asosiy qatlamlaridan biri. Quyidagi xavfsiz misol parolning kuchini baholaydi. Bu hujum emas — aksincha, foydalanuvchiga kuchliroq parol tanlashga yordam beruvchi himoya vositasi. Uni ishga tushiring va turli parollarni sinab ko'ring:" },
        { pg: "function parolKuchi(parol) {\n  let ball = 0;\n\n  if (parol.length >= 8) ball++;\n  if (parol.length >= 12) ball++;\n  if (/[a-z]/.test(parol) && /[A-Z]/.test(parol)) ball++;\n  if (/[0-9]/.test(parol)) ball++;\n  if (/[^a-zA-Z0-9]/.test(parol)) ball++;\n\n  const darajalar = [\"Juda zaif\", \"Zaif\", \"O'rtacha\", \"Yaxshi\", \"Kuchli\", \"Juda kuchli\"];\n  return darajalar[ball];\n}\n\nconsole.log(\"12345:\", parolKuchi(\"12345\"));\nconsole.log(\"salom123:\", parolKuchi(\"salom123\"));\nconsole.log(\"Salom_2026!:\", parolKuchi(\"Salom_2026!\"));", file: "parol-kuchi.js" },
        { p: "E'tibor bering: parol uzunligi, harflar aralashligi va maxsus belgilar mavjudligi — barchasi kuchni oshiradi. Haqiqiy tizimlarda bunga qo'shimcha ravishda \"eng ko'p ishlatiladigan parollar\" ro'yxati bilan solishtirish ham qo'shiladi." },
        { p: "Quyidagi ikkinchi misol aynan shu qadamni ko'rsatadi: parol juda mashhur (va shu sabab oson taxmin qilinadigan) ro'yxatda bo'lsa, uni rad etadi. Bu ham himoya vositasi — foydalanuvchini zaif tanlovdan saqlaydi:" },
        { pg: "const mashhurParollar = [\"123456\", \"parol\", \"qwerty\", \"12345678\", \"password\"];\n\nfunction parolXavfsizmi(parol) {\n  const kichik = parol.toLowerCase();\n  if (mashhurParollar.includes(kichik)) {\n    return \"RAD ETILDI: bu parol juda mashhur va oson taxmin qilinadi.\";\n  }\n  if (parol.length < 8) {\n    return \"RAD ETILDI: parol kamida 8 belgidan iborat bo'lsin.\";\n  }\n  return \"Qabul qilindi: parol asosiy tekshiruvlardan o'tdi.\";\n}\n\nconsole.log(parolXavfsizmi(\"123456\"));\nconsole.log(parolXavfsizmi(\"qwerty\"));\nconsole.log(parolXavfsizmi(\"Tulki_2026!\"));", file: "mashhur-parol.js" },
        { tip: "Eng kuchli parol — bu uzun parol. \"To'rt-tasodifiy-so'z-birga\" kabi uzun ibora ko'pincha qisqa lekin murakkab paroldan xavfsizroq va eslab qolish osonroq." },

        { h2: "Kiberxavfsizlik kasbiga qisqa kirish" },
        { p: "Kiberxavfsizlik — bu bitta kasb emas, balki butun bir soha. Unda turli yo'nalishlar bor va deyarli har qanday texnik qiziqishga mos ish topiladi:" },
        { ul: [
          "<strong>Himoyachilar (Blue team):</strong> tizimlarni kuzatib, hujumni aniqlab, to'xtatadi;",
          "<strong>Etik hujumchilar (Red team):</strong> ruxsat asosida zaifliklarni topib beradi;",
          "<strong>Xavfsizlik muhandislari:</strong> himoyani loyihalash va qurish bilan shug'ullanadi;",
          "<strong>Tahlilchilar:</strong> tahdidlarni o'rganib, hodisalarga javob beradi."
        ] },
        { p: "Bu yo'nalishlarni keyingi darslarda batafsil ko'rib chiqamiz. Hozircha eng muhimi shu: yaxshi himoyachi bo'lish uchun avvalo <em>tahdid qanday ishlashini</em> tushunish kerak — buni biz keyingi darsda o'rganamiz." },
        { note: "Kiberxavfsizlikka kirish uchun \"tug'ma iste'dod\" shart emas. Bu — o'rganiladigan ko'nikma. Sabr, qiziquvchanlik va etik mas'uliyat — eng muhim sifatlar." }
      ]
    },

    {
      slug: "tahdidlar-turlari",
      title: "Tahdidlar: malware, phishing, ijtimoiy injeneriya",
      blurb: "Zararli dastur turlarini tanib olish, phishing hujumlarini fosh qilish, ijtimoiy injeneriyadan himoya, parol menejeri va 2FA foydasi.",
      body: [
        { lead: "Himoyachi bo'lish uchun avvalo tahdidni tanib olishni bilish kerak. Ushbu darsda biz eng keng tarqalgan tahdidlarni — zararli dasturlar, phishing va ijtimoiy injeneriyani <strong>faqat tanib olish va ulardan himoyalanish</strong> maqsadida o'rganamiz. Hech qanday zararli kod yoki hujum yo'riqnomasi berilmaydi." },

        { warn: "Ushbu darsning maqsadi — sizga phishing yoki zararli dastur <em>yaratishni</em> emas, balki ularni <strong>tanib olish va o'zingizni himoya qilishni</strong> o'rgatish. Bunday narsalarni ruxsatsiz yaratish yoki tarqatish — jinoyat." },

        { h2: "Zararli dastur (malware) nima?" },
        { p: "<strong>Malware</strong> (malicious software) — foydalanuvchiga zarar keltirish yoki ruxsatsiz harakat qilish uchun yozilgan dasturlar umumiy nomi. Himoyachi sifatida bizga ularning <em>turlarini tanib olish</em> muhim, chunki har biri o'zicha tarqaladi va o'zicha davolanadi." },
        { h3: "Asosiy turlar (faqat tanib olish uchun)" },
        { ul: [
          "<strong>Virus:</strong> boshqa fayllarga \"yopishib\", ular ochilganda tarqaladi;",
          "<strong>Trojan (troyan oti):</strong> foydali dastur qiyofasida keladi, lekin ichida zararli maqsad yashiringan;",
          "<strong>Ransomware (to'lov talab qiluvchi):</strong> fayllarni shifrlab, ochish uchun pul talab qiladi;",
          "<strong>Spyware (josuslik dasturi):</strong> foydalanuvchini yashirin kuzatib, ma'lumot yig'adi;",
          "<strong>Worm (qurt):</strong> odam aralashuvisiz o'zi tarmoq bo'ylab ko'payadi."
        ] },
        { note: "Biz bu turlarni faqat <strong>tanib olish</strong> darajasida o'rganamiz. Har biri qanday yozilishini emas, balki qanday belgilar orqali payqash va undan qanday himoyalanishni bilamiz." },

        { h2: "Zararli dasturdan himoya" },
        { p: "Malware qanday ishlashini bilgach, undan himoyalanish oddiy odatlarga bog'lanadi:" },
        { ul: [
          "<strong>Yangilanishlarni o'rnating:</strong> operatsion tizim va dasturlarni doim yangilab turing;",
          "<strong>Ishonchli manbadan yuklang:</strong> dasturlarni faqat rasmiy do'kon yoki saytdan oling;",
          "<strong>Antivirus ishlating:</strong> u ma'lum tahdidlarni aniqlaydi;",
          "<strong>Zaxira nusxa saqlang:</strong> ransomware'dan eng yaxshi himoya — muntazam zaxira;",
          "<strong>Noma'lum ilovalarni ochmang:</strong> emaildagi kutilmagan ilova — eng keng tarqalgan tarqalish yo'li."
        ] },
        { tip: "Muntazam zaxira nusxa — bu eng arzon va eng kuchli himoya. Agar fayllaringiz shifrlansa ham, zaxirangiz bo'lsa, siz hech narsa yo'qotmaysiz va hech kimga pul to'lashingiz shart emas." },

        { h2: "Phishing nima?" },
        { p: "<strong>Phishing</strong> — foydalanuvchini aldab, uning maxfiy ma'lumotini (parol, karta raqami) o'zi ixtiyoriy berishga majburlash usuli. Hujumchi ishonchli tashkilot (bank, ijtimoiy tarmoq, ish beruvchi) nomidan soxta xabar jo'natadi." },
        { p: "Phishing texnik zaiflikdan emas, balki <em>insonning ishonchidan</em> foydalanadi. Shuning uchun undan himoya ham asosan diqqat va shubha bilan bog'liq." },

        { h2: "Phishingni tanib olish belgilar" },
        { p: "Shubhali xatni tanib olish uchun quyidagi belgilarga e'tibor bering. Ular birga uchrasa — ehtiyot bo'ling:" },
        { ul: [
          "<strong>Shoshirish:</strong> \"Hoziroq bosing yoki hisobingiz o'chiriladi!\" — bosim o'tkazish odatiy hiyla;",
          "<strong>Soxta manzil:</strong> yuboruvchi manzili biroz o'zgartirilgan (masalan, rasmiyga o'xshash lekin bir harfi boshqa);",
          "<strong>Umumiy murojaat:</strong> ismingiz o'rniga \"Hurmatli mijoz\" deb yozilgan;",
          "<strong>Kutilmagan ilova yoki havola:</strong> siz kutmagan fayl yoki tugma;",
          "<strong>Grammatik xatolar:</strong> rasmiy tashkilotlar odatda puxta yozadi;",
          "<strong>Ma'lumot so'rash:</strong> haqiqiy bank hech qachon email orqali parolingizni so'ramaydi."
        ] },
        { p: "Eng muhim qoida: <strong>havolaga bosishdan oldin uning ustiga sichqonchani olib boring</strong> va haqiqiy manzilni ko'ring. Ko'rinadigan matn va haqiqiy manzil boshqacha bo'lishi mumkin." },

        { h2: "Amaliyot: soxta domenni tekshirish" },
        { p: "Hujumchilar ko'pincha haqiqiy saytga o'xshash, lekin sal o'zgartirilgan domen ishlatadi. Masalan, <code>paypal.com</code> o'rniga <code>paypa1.com</code> (oxirida \"l\" harfi emas, \"1\" raqami). Quyidagi xavfsiz misol berilgan domenni ishonchli ro'yxat bilan solishtirib, shubhaliligini ogohlantiradi. Bu himoya vositasi — hujum emas:" },
        { pg: "const ishonchli = [\"paypal.com\", \"google.com\", \"bank.uz\"];\n\nfunction domenTekshir(domen) {\n  if (ishonchli.includes(domen)) {\n    return \"Xavfsiz: rasmiy domen.\";\n  }\n\n  // Har bir ishonchli domenga o'xshashligini tekshiramiz\n  for (const rasmiy of ishonchli) {\n    if (domen !== rasmiy && domen.length === rasmiy.length) {\n      let farq = 0;\n      for (let i = 0; i < domen.length; i++) {\n        if (domen[i] !== rasmiy[i]) farq++;\n      }\n      if (farq <= 2) {\n        return \"OGOHLANTIRISH! '\" + domen + \"' rasmiy '\" + rasmiy + \"' ga juda o'xshash. Bu soxta bo'lishi mumkin!\";\n      }\n    }\n  }\n  return \"Notanish domen. Ehtiyot bo'ling.\";\n}\n\nconsole.log(domenTekshir(\"paypal.com\"));\nconsole.log(domenTekshir(\"paypa1.com\"));\nconsole.log(domenTekshir(\"g00gle.com\"));", file: "domen-tekshir.js" },
        { p: "Ko'ryapsizmi, <code>paypa1.com</code> haqiqiy <code>paypal.com</code> dan atigi bir belgi bilan farq qiladi. Inson ko'zi buni ilg'amasligi mumkin, lekin bunday tekshiruv ogohlantirish beradi. Aynan shu tamoyilda brauzerlar va antivirus dasturlari soxta saytlarni aniqlaydi." },
        { p: "Ikkinchi xavfsiz misol — bu xat matnidagi shubha belgilarini sanaydigan oddiy \"phishing baholovchi\". U hech kimga hujum qilmaydi; aksincha, kelgan xatning qanchalik shubhali ekanini foydalanuvchiga ko'rsatadi:" },
        { pg: "function phishingBaho(matn) {\n  const belgilar = [\n    { kalit: \"hoziroq\", izoh: \"shoshirish\" },\n    { kalit: \"parolingizni\", izoh: \"parol so'rash\" },\n    { kalit: \"g'olib\", izoh: \"soxta sovg'a\" },\n    { kalit: \"bloklanadi\", izoh: \"qo'rqitish\" }\n  ];\n  const kichik = matn.toLowerCase();\n  const topilgan = [];\n  for (const b of belgilar) {\n    if (kichik.includes(b.kalit)) topilgan.push(b.izoh);\n  }\n  if (topilgan.length === 0) return \"Aniq shubha belgisi topilmadi.\";\n  return \"OGOHLANTIRISH! Shubha belgilari: \" + topilgan.join(\", \");\n}\n\nconsole.log(phishingBaho(\"Salom, ertaga uchrashamizmi?\"));\nconsole.log(phishingBaho(\"Hoziroq bosing, aks holda hisobingiz bloklanadi va parolingizni tasdiqlang!\"));", file: "phishing-baho.js" },

        { h2: "Ijtimoiy injeneriya" },
        { p: "<strong>Ijtimoiy injeneriya</strong> — bu insonni psixologik ta'sir orqali aldab, xavfsizlik qoidalarini o'zi buzishga undash. Bunda hech qanday texnik hujum bo'lmaydi — hujumchi shunchaki ishonch, qo'rquv yoki yordam istagidan foydalanadi." },
        { p: "Xavfsizlik dunyosida taniqli gap bor: <strong>\"inson — eng zaif bo'g'in\"</strong>. Eng kuchli shifrlash ham, agar xodim parolni telefonda \"tizim administratori\"ga aytib qo'ysa, foydasiz bo'ladi." },
        { h3: "Keng tarqalgan usullar" },
        { ul: [
          "<strong>Bahona (pretexting):</strong> hujumchi soxta hikoya to'qiydi (\"men IT bo'limidanman\");",
          "<strong>Yem (baiting):</strong> qiziqarli narsa taklif qiladi (\"bepul sovg'a\", tashlab ketilgan USB);",
          "<strong>Shoshirish:</strong> o'ylashga vaqt qoldirmaslik uchun tazyiq;",
          "<strong>Vakolatga tayanish:</strong> \"rahbar so'radi\" deb bosim o'tkazish."
        ] },
        { p: "Himoya — bu shubha va tasdiqlash. Kutilmagan so'rov kelsa, to'g'ridan-to'g'ri, ma'lum va ishonchli kanal orqali (masalan, rasmiy raqamga o'zingiz qo'ng'iroq qilib) tekshiring." },

        { h2: "Parol menejeri va 2FA" },
        { p: "Ikki oddiy vosita himoyangizni jiddiy kuchaytiradi:" },
        { h3: "Parol menejeri" },
        { p: "Har bir sayt uchun boshqacha, uzun va murakkab parol eslab qolish imkonsiz. <strong>Parol menejeri</strong> shu muammoni hal qiladi: u har bir sayt uchun kuchli parolni yaratadi va shifrlab saqlaydi. Sizga faqat bitta asosiy parolni eslab qolish kifoya." },
        { ul: [
          "Har bir sayt uchun noyob parol — bitta sayt buzilsa, qolganlari xavfsiz qoladi;",
          "Kuchli, tasodifiy parollar — inson o'ylab topganidan mustahkamroq;",
          "Soxta saytlarni fosh qiladi — menejer domen mos kelmasa, parolni to'ldirmaydi."
        ] },
        { h3: "Ikki bosqichli tasdiqlash (2FA)" },
        { p: "<strong>2FA</strong> (two-factor authentication) — kirishda parolga qo'shimcha ikkinchi tasdiq talab qiladi. Bu odatda telefondagi ilova beradigan bir martalik kod bo'ladi." },
        { p: "Ahamiyati katta: hujumchi parolingizni bilib olsa ham, ikkinchi omil (sizning telefoningiz) yo'qligi sabab kira olmaydi. Bu — chuqurlashtirilgan himoyaning yaqqol namunasi." },
        { tip: "Muhim hisoblaringizda — email, bank, ijtimoiy tarmoq — bugunoq 2FA'ni yoqing. Bu bir necha daqiqalik ish, ammo hisobingizni o'g'irlashdan himoya qiladigan eng samarali qadamlardan biri." },

        { h2: "Xulosa: tahdidni tanib olish — birinchi himoya" },
        { p: "Ushbu darsda uchta asosiy tahdid oilasini ko'rib chiqdik. Ularning barchasida umumiy jihat bor: ko'pincha eng zaif nuqta — texnologiya emas, balki inson e'tibori. Shu sabab eng yaxshi himoya — bilim va shubha." },
        { ul: [
          "<strong>Malware:</strong> ishonchli manba, yangilanish va zaxira nusxa;",
          "<strong>Phishing:</strong> havolani tekshirish, shoshirishga berilmaslik;",
          "<strong>Ijtimoiy injeneriya:</strong> kutilmagan so'rovni ishonchli kanal orqali tasdiqlash;",
          "<strong>Umumiy:</strong> parol menejeri va 2FA — har bir hisob uchun."
        ] },
        { note: "Yodda tuting: tahdidlarni o'rganish maqsadi — ulardan himoyalanish. Bu bilimni faqat o'zingizni va o'zgalarni himoya qilish uchun ishlating." }
      ]
    },

    {
      slug: "hujum-himoya-jamoalari",
      title: "Red team, Blue team va hujum hayotiy tsikli",
      blurb: "Etik hujumchi va himoyachi jamoalari, hujumning umumiy bosqichlari (yuqori darajada), har bosqichdagi himoya, \"buzilgan deb faraz qilish\" tafakkuri.",
      body: [
        { lead: "Yaxshi himoyachi hujumchi qanday fikrlashini tushunishi kerak — lekin buni hujum qilish uchun emas, balki hujumni oldindan kutib, to'xtatish uchun. Ushbu darsda biz xavfsizlik jamoalarini, hujumning umumiy bosqichlarini <strong>yuqori darajada, yo'riqnomasiz</strong> va har bosqichda himoyachi nima qilishi kerakligini o'rganamiz." },

        { note: "Ushbu darsdagi barcha bilim <strong>himoyani kuchaytirish</strong> uchun beriladi. Hujum bosqichlari faqat umumiy tushuncha darajasida, aniq vosita yoki buyruqsiz tavsiflanadi — himoyachi nimani kutishini bilishi uchun." },

        { h2: "Xavfsizlik jamoalari" },
        { p: "Tashkilotlarni himoya qilishda turli rollar bir-birini to'ldiradi. Ular ko'pincha ranglar bilan nomlanadi:" },
        { h3: "Red team (qizil jamoa)" },
        { p: "<strong>Red team</strong> — bu <em>etik hujumchilar</em>, ya'ni <strong>pentester</strong>lar (penetration tester). Ular tashkilotning <strong>yozma ruxsati bilan</strong> uning himoyasini sinaydi: zaifliklarni topib, ular haqida hisobot beradi. Maqsad — yomon niyatli hujumchidan oldin kamchilikni topib, tuzatish." },
        { h3: "Blue team (ko'k jamoa)" },
        { p: "<strong>Blue team</strong> — bu <em>himoyachilar</em>. Ular tizimlarni kuzatadi, hujum belgilarini aniqlaydi va hodisalarga javob beradi. Ko'pincha ular <strong>SOC</strong> (Security Operations Center — xavfsizlik operatsiyalari markazi) deb ataladigan bo'limda ishlaydi va kunu-tun tizimni nazorat qiladi." },
        { h3: "Purple team (binafsha jamoa)" },
        { p: "<strong>Purple team</strong> — qizil va ko'k ranglar aralashmasidek, bu ikki jamoa o'rtasidagi <em>hamkorlik</em>. Red team topgan zaifliklardan Blue team darhol o'rganadi va himoyani yaxshilaydi. Maqsad — raqobat emas, birgalikda kuchli himoya qurish." },
        { tip: "Ko'pchilik kiberxavfsizlik karyerasini Blue team'dan boshlaydi. Tizimni himoya qilish, loglarni tahlil qilish va hodisalarga javob berish — bu ko'nikmalar deyarli har qanday tashkilotga kerak." },

        { h2: "Nega hujum bosqichlarini bilish kerak?" },
        { p: "Sport murabbiyi raqib jamoaning taktikasini o'rganganidek, himoyachi ham hujumning odatiy bosqichlarini bilishi kerak. Bu unga har bosqichda hujumni to'xtatish uchun \"nima kutishni\" o'rgatadi." },
        { warn: "Quyidagi bosqichlar faqat <strong>umumiy va nazariy</strong> tarzda tavsiflanadi. Bu — hujum qo'llanmasi emas, balki himoyachi tafakkurini shakllantiruvchi ramka. Ruxsatsiz har qanday sinov — qonunga xilof." },

        { h2: "Hujumning umumiy bosqichlari" },
        { p: "Ko'pchilik hujumlar taxminan bir xil bosqichlardan o'tadi. Biz ularni yuqori darajada, himoyachi nuqtai nazaridan ko'rib chiqamiz:" },
        { h3: "1. Razvedka (reconnaissance)" },
        { p: "Hujumchi nishon haqida ochiq ma'lumot yig'adi: qanday texnologiyalar ishlatiladi, kimlar ishlaydi, qanday xizmatlar ochiq. Bu bosqichda hali hech narsaga tegilmaydi." },
        { p: "<strong>Himoya:</strong> keraksiz ma'lumotni oshkor qilmaslik, ochiq portlarni kamaytirish, xodimlarni ijtimoiy tarmoqlarda ehtiyot bo'lishga o'rgatish." },
        { h3: "2. Kirish (initial access)" },
        { p: "Hujumchi topilgan zaiflik yoki phishing orqali tizimga birinchi qadam qo'yadi." },
        { p: "<strong>Himoya:</strong> yangilanishlarni o'rnatish, kuchli autentifikatsiya (2FA), phishingga qarshi tayyorgarlik, kiritmani tekshirish." },
        { h3: "3. Mustahkamlanish (persistence)" },
        { p: "Hujumchi tizimda uzoqroq qolish uchun \"o'rnashib\" olishga urinadi — masalan, yashirin kirish yo'llarini yaratadi." },
        { p: "<strong>Himoya:</strong> tizim o'zgarishlarini kuzatish, ruxsatlarni cheklash, muntazam tekshiruv, g'ayrioddiy jarayonlarni aniqlash." },
        { h3: "4. Maqsadga erishish (objective)" },
        { p: "Hujumchi asosiy maqsadiga urinadi: ma'lumot o'g'irlash, tizimni buzish yoki to'lov talab qilish." },
        { p: "<strong>Himoya:</strong> ma'lumotni shifrlash, ma'lumot chiqib ketishini kuzatish (DLP), zaxira nusxalar, tez javob rejasi." },
        { note: "Ko'ryapsizmi: <strong>har bir bosqichda himoya imkoniyati bor</strong>. Hujum bir necha bosqichdan iborat bo'lgani uchun, himoyachiga uni to'xtatish uchun bir necha imkon beriladi. Bu — chuqurlashtirilgan himoyaning kuchi." },

        { h2: "\"Buzilgan deb faraz qilish\" tafakkuri" },
        { p: "Zamonaviy xavfsizlikda muhim aqliy o'zgarish bor: <strong>\"assume breach\"</strong> — ya'ni \"biz allaqachon buzilganmiz deb faraz qilaylik\". Eski yondashuv faqat \"devor qurish\"ga tayanardi. Yangi yondashuv esa savol beradi: \"Agar hujumchi ichkariga kirib bo'lgan bo'lsa-chi? Uni qanday aniqlaymiz va zararni qanday cheklaymiz?\"" },
        { ul: [
          "<strong>Eng kam imtiyoz:</strong> har bir foydalanuvchi va tizim faqat zarur huquqqa ega bo'lsin;",
          "<strong>Segmentatsiya:</strong> tarmoqni bo'laklarga ajratib, bir bo'lakdagi buzilish boshqasiga o'tmasin;",
          "<strong>Doimiy kuzatuv:</strong> g'ayrioddiy harakatni tezda aniqlash;",
          "<strong>Tez javob:</strong> buzilish yuz berganda zararni cheklash rejasi tayyor bo'lsin."
        ] },
        { p: "Bu tafakkur bizni mukammal himoya izlashdan (bu imkonsiz) tez aniqlash va tez javob berishga o'tkazadi." },

        { h2: "Amaliyot: kirishlarni kuzatish" },
        { p: "Blue team ishining muhim qismi — loglarni tahlil qilib, g'ayrioddiy harakatni aniqlash. Quyidagi xavfsiz misol kirish urinishlarini ko'rib, bitta hisobga qisqa vaqtda juda ko'p muvaffaqiyatsiz urinish bo'lsa, ogohlantiradi. Bu — himoyaviy monitoring vositasi:" },
        { pg: "const kirishlar = [\n  { foydalanuvchi: \"ali\", muvaffaqiyat: false },\n  { foydalanuvchi: \"ali\", muvaffaqiyat: false },\n  { foydalanuvchi: \"vali\", muvaffaqiyat: true },\n  { foydalanuvchi: \"ali\", muvaffaqiyat: false },\n  { foydalanuvchi: \"ali\", muvaffaqiyat: false },\n  { foydalanuvchi: \"ali\", muvaffaqiyat: false }\n];\n\nfunction shubhaliTekshir(loglar, chegara) {\n  const xatolar = {};\n  for (const log of loglar) {\n    if (!log.muvaffaqiyat) {\n      xatolar[log.foydalanuvchi] = (xatolar[log.foydalanuvchi] || 0) + 1;\n    }\n  }\n  for (const [foydalanuvchi, soni] of Object.entries(xatolar)) {\n    if (soni >= chegara) {\n      console.log(\"OGOHLANTIRISH: '\" + foydalanuvchi + \"' hisobiga \" + soni + \" ta muvaffaqiyatsiz kirish. Bloklashni ko'rib chiqing.\");\n    }\n  }\n}\n\nshubhaliTekshir(kirishlar, 3);", file: "kirish-kuzat.js" },
        { p: "Ko'p sonli muvaffaqiyatsiz urinish — bu \"brute-force\" (parolni ketma-ket taxmin qilish) belgisi bo'lishi mumkin. Bunday holatda himoya odatda hisobni vaqtincha bloklaydi yoki qo'shimcha tekshiruv talab qiladi." },
        { p: "Blue team ishining yana bir qismi — \"eng kam imtiyoz\" tamoyilini tekshirish: foydalanuvchi faqat o'ziga ruxsat berilgan amalni bajara olishini ta'minlash. Quyidagi xavfsiz misol foydalanuvchining roliga qarab amalga ruxsat berilganini tekshiradi:" },
        { pg: "const ruxsatlar = {\n  mehmon: [\"korish\"],\n  muharrir: [\"korish\", \"tahrirlash\"],\n  admin: [\"korish\", \"tahrirlash\", \"ochirish\"]\n};\n\nfunction ruxsatBormi(rol, amal) {\n  const royxat = ruxsatlar[rol] || [];\n  if (royxat.includes(amal)) {\n    return \"Ruxsat berildi: '\" + rol + \"' '\" + amal + \"' amalini bajara oladi.\";\n  }\n  return \"RAD ETILDI: '\" + rol + \"' uchun '\" + amal + \"' amaliga ruxsat yo'q.\";\n}\n\nconsole.log(ruxsatBormi(\"mehmon\", \"korish\"));\nconsole.log(ruxsatBormi(\"mehmon\", \"ochirish\"));\nconsole.log(ruxsatBormi(\"admin\", \"ochirish\"));", file: "ruxsat-tekshir.js" },
        { p: "Har bir muhim amaldan oldin shunday tekshiruv o'tkazish — buzilgan hisob orqali keladigan zararni cheklaydi. Bu \"assume breach\" tafakkurining amaliy ko'rinishidir." },

        { h2: "Log va monitoring nega muhim?" },
        { p: "Loglar — bu tizimda nima sodir bo'lganining yozuvi. Ularsiz himoyachi ko'r bo'ladi: buzilishni na aniqlay oladi, na tekshira oladi." },
        { ul: [
          "<strong>Aniqlash:</strong> g'ayrioddiy harakat log orqali ko'rinadi;",
          "<strong>Tekshiruv (forensics):</strong> hodisadan keyin nima bo'lganini qayta tiklash;",
          "<strong>Javob:</strong> qaysi tizim ta'sirlanganini aniqlab, tez chora ko'rish;",
          "<strong>Muvofiqlik:</strong> ko'p qonunlar loglarni saqlashni talab qiladi."
        ] },
        { p: "Muhim nuqta: log <em>faqat yozib qo'yilsa</em> yetarli emas. Kimdir uni <em>kuzatib turishi</em> yoki avtomatik tizim ogohlantirishi kerak. Yozilgan, lekin hech kim ko'rmagan log — foydasiz." },
        { tip: "Loglarni markazlashtiring va o'zgarmas qiling. Agar hujumchi tizimga kirsa, u ko'pincha o'z izini yashirish uchun loglarni o'chirishga urinadi. Loglar alohida, himoyalangan joyda saqlansa, bu qiyinlashadi." },
        { note: "Yakuniy fikr: hujumni tushunish — himoyani kuchaytirish uchun. Bu bilim sizni tizimni yaxshiroq himoya qiladigan, hujumni oldindan ko'radigan mutaxassisga aylantiradi." }
      ]
    },

    {
      slug: "etika-qonun-kasb",
      title: "Etika, qonun va kiberxavfsizlik kasbi",
      blurb: "Etik xakerlik va ruxsat tushunchasi, qonuniy tamoyillar, mas'uliyatli oshkor qilish va bug bounty, kasb yo'llari, sertifikatlar va boshlash yo'l xaritasi.",
      body: [
        { lead: "Kiberxavfsizlikdagi bilim — kuchli qurol. Har qanday kuch kabi, uni faqat mas'uliyat va etika bilan ishlatish kerak. Ushbu yakuniy darsda biz etik xakerlik nima ekanini, ruxsat va qonun tamoyillarini, mas'uliyatli oshkor qilishni va kiberxavfsizlik kasbiga qanday kirishni o'rganamiz." },

        { h2: "Etik xakerlik nima?" },
        { p: "\"Xaker\" so'zi ko'pincha noto'g'ri tushuniladi. Aslida u — tizimni chuqur tushunadigan va uni g'ayrioddiy tarzda ishlata oladigan odam. Muhimi — bu bilim <em>qanday</em> ishlatilishida:" },
        { ul: [
          "<strong>Etik xaker (oq shlyapa):</strong> ruxsat bilan zaiflik topib, tuzatishga yordam beradi;",
          "<strong>Yomon niyatli (qora shlyapa):</strong> ruxsatsiz, zarar keltirish yoki foyda uchun buzadi;",
          "<strong>Kulrang shlyapa:</strong> ruxsatsiz izlaydi, lekin zarar niyatisiz — bu ham qonuniy jihatdan xavfli."
        ] },
        { p: "Etik xakerlikni yomon niyatlidan ajratib turadigan yagona narsa — bu <strong>ruxsat</strong> va <strong>niyat</strong>. Bir xil harakat ruxsat bilan — ish, ruxsatsiz — jinoyat." },

        { h2: "Ruxsat (authorization) — eng muhim tushuncha" },
        { p: "Kiberxavfsizlik etikasining markazida bitta oddiy, ammo mutlaq qoida turadi: <strong>yozma ruxsatsiz hech qachon boshqaning tizimini sinamang</strong>. \"Men shunchaki qiziqib ko'rdim\" yoki \"zarar qilmadim-ku\" degan uzr qonun oldida ishlamaydi." },
        { warn: "Boshqa birovning saytini, tarmog'ini yoki tizimini <strong>aniq yozma ruxsatsiz</strong> tekshirish — ko'p mamlakatlarda jinoyat. Buni hazil yoki \"o'rganish\" deb o'ylash katta xato. Doim faqat o'zingizga tegishli yoki sizga ochiq ruxsat berilgan tizimlarda mashq qiling." },
        { p: "Professional pentesterlar ish boshlashdan oldin doim yozma shartnoma (\"scope\" — nima sinash mumkin, nima yo'qligini aniq belgilaydigan hujjat) imzolaydi. Ruxsatning chegarasi ham muhim: bitta serverga ruxsat — boshqasiga ruxsat degani emas." },
        { p: "Quyidagi xavfsiz misol aynan shu tamoyilni ko'rsatadi: har qanday sinovdan oldin nishon ruxsat berilgan ro'yxatda (\"scope\") ekanini tekshiradi. Ro'yxatda bo'lmasa — hech qanday amal bajarilmaydi. Bu — etik ish tartibining eng birinchi qadami:" },
        { pg: "// Faqat mana shu nishonlarni sinashga yozma ruxsat bor\nconst ruxsatBerilgan = [\"test.mysite.uz\", \"staging.mysite.uz\"];\n\nfunction sinovgaRuxsat(nishon) {\n  if (ruxsatBerilgan.includes(nishon)) {\n    return \"Ruxsat mavjud: '\" + nishon + \"' ni sinash mumkin.\";\n  }\n  return \"TO'XTANG: '\" + nishon + \"' ruxsat ro'yxatida yo'q. Sinov qonunga xilof!\";\n}\n\nconsole.log(sinovgaRuxsat(\"test.mysite.uz\"));\nconsole.log(sinovgaRuxsat(\"boshqa-sayt.uz\"));", file: "sinov-ruxsat.js" },
        { p: "E'tibor bering: kod ruxsat ro'yxatida yo'q har qanday nishonni qat'iy rad etadi. Professional vositalar ham aynan shunday ishlaydi — chegaradan tashqariga chiqishga yo'l qo'ymaydi." },

        { h2: "Qonun: umumiy tamoyillar" },
        { p: "Deyarli barcha mamlakatlarda kompyuter jinoyatlariga qarshi qonunlar bor. Biz aniq moddalarga emas, balki umumiy <em>tamoyillarga</em> e'tibor qaratamiz, chunki tamoyillar hamma joyda o'xshash:" },
        { ul: [
          "<strong>Ruxsatsiz kirish:</strong> begona tizimga ruxsatsiz kirish — jinoyat;",
          "<strong>Ma'lumotni o'g'irlash yoki buzish:</strong> ruxsatsiz ma'lumot olish yoki o'zgartirish jazolanadi;",
          "<strong>Xizmatga xalaqit:</strong> tizim ishini ataylab to'xtatish qonunga xilof;",
          "<strong>Vositalarni tarqatish:</strong> zararli dastur yaratish yoki tarqatish jazolanadi."
        ] },
        { p: "O'zbekistonda ham, xalqaro miqyosda ham bu tamoyillar amal qiladi. Aniq javobgarlikni bilish uchun mahalliy qonunchilikka murojaat qilish kerak, lekin oltin qoida oddiy: <strong>ruxsatingiz bo'lmasa — tegmang</strong>." },
        { note: "Qonun mamlakatdan mamlakatga farq qiladi va o'zgarib turadi. Bu dars huquqiy maslahat emas. Aniq vaziyatda malakali yurist yoki rasmiy manbaga murojaat qiling. Ammo tamoyil hamma joyda bir xil: ruxsat — hamma narsa." },

        { h2: "Mas'uliyatli oshkor qilish" },
        { p: "Faraz qiling, siz ochiq foydalanadigan xizmatda tasodifan zaiflik topib qoldingiz. To'g'ri yo'l qanday? Javob — <strong>mas'uliyatli oshkor qilish</strong> (responsible disclosure):" },
        { ol: [
          "Zaiflikdan foydalanmang va ma'lumotga tegmang;",
          "Xizmat egasiga xususiy, xavfsiz kanal orqali xabar bering;",
          "Muammoni tuzatishga oqilona vaqt bering;",
          "Faqat tuzatilgach (va ruxsat bilan) ommaga e'lon qiling."
        ] },
        { p: "Bu yondashuv zaiflikni foydalanuvchilarga zarar keltirmasdan tuzatishga imkon beradi. Bu — etik xakerning obro'sini ham himoya qiladi." },
        { p: "Quyidagi xavfsiz misol mas'uliyatli oshkor qilish qadamlarini oddiy tekshiruv sifatida ko'rsatadi — tadqiqotchi to'g'ri tartibga amal qilganini tasdiqlaydi:" },
        { pg: "function oshkorTogrimi(holat) {\n  const shartlar = [];\n  if (holat.zaiflikdanFoydalanmadi) shartlar.push(\"ma'lumotga tegilmadi\");\n  if (holat.egasigaXabarBerdi) shartlar.push(\"egasiga xabar berildi\");\n  if (holat.vaqtBerdi) shartlar.push(\"tuzatishga vaqt berildi\");\n\n  if (shartlar.length === 3) {\n    return \"To'g'ri: mas'uliyatli oshkor qilish tartibiga amal qilindi (\" + shartlar.join(\", \") + \").\";\n  }\n  return \"Diqqat: barcha shartlar bajarilmagan. Faqat \" + shartlar.length + \"/3 qadam bajarildi.\";\n}\n\nconsole.log(oshkorTogrimi({ zaiflikdanFoydalanmadi: true, egasigaXabarBerdi: true, vaqtBerdi: true }));\nconsole.log(oshkorTogrimi({ zaiflikdanFoydalanmadi: false, egasigaXabarBerdi: true, vaqtBerdi: false }));", file: "oshkor-tekshir.js" },
        { h3: "Bug bounty" },
        { p: "Ko'p yirik kompaniyalar <strong>bug bounty</strong> dasturlarini yuritadi: ular <em>o'z tizimlarida</em> zaiflik topib, mas'uliyatli xabar bergan tadqiqotchilarga <em>rasmiy ruxsat</em> va mukofot beradi. Bu — etik xakerlik ko'nikmalarini <strong>qonuniy va foydali</strong> tarzda qo'llashning ajoyib yo'li." },
        { tip: "Bug bounty — mahoratni qonuniy sinash uchun eng yaxshi joylardan biri. Ammo har bir dasturning o'z qoidalari (\"scope\") bor. Boshlashdan oldin qoidalarni diqqat bilan o'qing va faqat ruxsat berilgan chegarada ishlang." },

        { h2: "Kasb yo'llari" },
        { p: "Kiberxavfsizlik — keng soha. Turli qiziqishga mos turli rollar bor. Mana asosiylari va ular nima qilishi:" },
        { ul: [
          "<strong>Pentester (etik hujumchi):</strong> ruxsat bilan tizimlarni sinab, zaifliklarni topadi va hisobot yozadi;",
          "<strong>SOC tahlilchisi:</strong> loglarni kuzatib, hujumlarni aniqlaydi va hodisalarga birinchi javob beradi;",
          "<strong>Xavfsizlik muhandisi (security engineer):</strong> himoya tizimlarini quradi va sozlaydi;",
          "<strong>AppSec mutaxassisi:</strong> dasturlarni yozilish bosqichida xavfsiz qiladi, kodni tekshiradi;",
          "<strong>DevSecOps muhandisi:</strong> xavfsizlikni dasturlash va yetkazish jarayoniga avtomatik singdiradi."
        ] },
        { p: "Ko'pchilik bitta rolda boshlab, tajriba orttirgach boshqasiga o'tadi. Masalan, dasturchi AppSec'ga, tizim administratori esa SOC yoki security engineer yo'nalishiga o'tishi tabiiy." },

        { h2: "Sertifikatlar" },
        { p: "Sertifikatlar — bilimingizni tasdiqlash va ish topishda yordam beruvchi vositalar. Ular majburiy emas, lekin ko'p ish beruvchilar qadrlaydi. Mashhurlaridan:" },
        { ul: [
          "<strong>CompTIA Security+:</strong> boshlang'ich daraja, keng asoslarni qamraydi — yangi boshlovchilar uchun yaxshi start;",
          "<strong>CEH (Certified Ethical Hacker):</strong> etik xakerlik tushunchalarini qamrab oladi;",
          "<strong>OSCP (Offensive Security Certified Professional):</strong> amaliy va qiyin, pentesting ko'nikmalarini chuqur sinaydi."
        ] },
        { note: "Sertifikat — maqsad emas, vosita. Haqiqiy qiymat — undagi bilim va amaliy ko'nikmada. Sertifikatsiz ham kuchli mutaxassis bo'lish mumkin; asosiysi — doimiy o'rganish va halol amaliyot." },

        { h2: "Qanday boshlash: yo'l xaritasi" },
        { p: "Kiberxavfsizlikka kirishni istasangiz, quyidagi bosqichli yo'l xaritasi yordam beradi:" },
        { ol: [
          "<strong>Asoslarni o'rganing:</strong> tarmoqlar, operatsion tizimlar (ayniqsa Linux), dasturlash asoslari;",
          "<strong>Xavfsizlik asoslarini o'zlashtiring:</strong> CIA triadasi, tahdidlar, himoya tamoyillari (aynan shu bob kabi);",
          "<strong>Bitta yo'nalish tanlang:</strong> himoya (Blue) yoki hujum (Red) — qiziqishingizga qarab;",
          "<strong>Qonuniy platformalarda mashq qiling:</strong> maxsus o'quv laboratoriyalari va \"capture the flag\" (CTF) o'yinlari;",
          "<strong>Jamoaga qo'shiling:</strong> forumlar, mahalliy uchrashuvlar, ochiq loyihalar."
        ] },
        { p: "Muhim: mashqni <strong>faqat qonuniy, sizga ruxsat berilgan platformalarda</strong> qiling. Maxsus o'quv laboratoriyalari (masalan, o'rgatish uchun ataylab zaif qilib qurilgan mashq muhitlari va CTF musobaqalari) aynan shu maqsad uchun mavjud — ularda hech kimga zarar bermasdan, qonuniy tarzda o'rganasiz." },
        { warn: "Hech qachon o'z ko'nikmalaringizni haqiqiy, ruxsat berilmagan tizimlarda \"sinab ko'rish\" vasvasasiga berilmang. Bu karyerangizni ham, kelajagingizni ham vayron qilishi mumkin. Sabr bilan qonuniy yo'ldan boring." },
        { h2: "Bobning yakuniy so'zi" },
        { p: "Ushbu bobda biz kiberxavfsizlikning asoslarini — CIA triadasidan tortib kasb yo'llarigacha — himoya nuqtai nazaridan o'rgandik. Endi siz tahdid qanday ishlashini tushunasiz va undan himoyalanishning asosiy tamoyillarini bilasiz." },
        { p: "Eng muhimi shundaki, bu soha doimiy o'rganishni talab qiladi. Tahdidlar o'zgaradi, texnologiyalar rivojlanadi — yaxshi mutaxassis hech qachon o'rganishni to'xtatmaydi. Ammo bitta narsa doim o'zgarmaydi: etika va mas'uliyat." },
        { tip: "Oltin qoida — butun bu bobning yakuni: <strong>bilimingizni faqat o'zingizga tegishli yoki aniq ruxsat berilgan tizimlarda qo'llang</strong>. Kiberxavfsizlikda mahorat qanchalik muhim bo'lsa, etika va mas'uliyat undan ham muhimroqdir." }
      ]
    }
  ]
};
