"use strict";
module.exports = {
  part: "8-qism: Algoritmlar va ma'lumotlar tuzilmalari",
  chapter: "Algoritm asoslari",
  lessons: [
    {
      slug: "algoritm-nima",
      title: "Algoritm nima va nega o'rganamiz",
      blurb: "Algoritm tushunchasi, kundalik hayotdan misollar, yaxshi algoritm mezonlari, ma'lumotlar tuzilmasi bilan bog'liqligi va nega intervyularda so'raladi.",
      body: [
        { lead: "Har kuni, hatto sezmagan holda, biz algoritmlar bilan yashaymiz. Ertalab choy damlash, uyga eng qisqa yo'lni tanlash, telefon kontaktlaridan kerakli ismni topish - bularning hammasi ortida aniq qadamlar ketma-ketligi turadi. Dasturlashda ham xuddi shunday: kompyuterga masalani yechishni o'rgatish uchun unga aniq, tushunarli va tugaydigan ko'rsatmalar berishimiz kerak. Ana shu ko'rsatmalar to'plami <strong>algoritm</strong> deb ataladi. Bu darsda algoritm nima ekanini, uni nima yaxshi qilishini va nega har bir dasturchi buni chuqur o'rganishi kerakligini ko'rib chiqamiz." },

        { h2: "Algoritm nima?" },
        { p: "<strong>Algoritm</strong> (algorithm) - bu biror masalani yechish yoki maqsadga erishish uchun bajariladigan aniq qadamlar ketma-ketligi. Har bir qadam tushunarli, bir ma'noli va bajarilishi mumkin bo'lishi shart. Algoritm biror kirish ma'lumotini (input) oladi, uni qayta ishlaydi va natija (output) qaytaradi." },
        { p: "Bu so'z IX asrda yashagan buyuk matematik Muhammad al-Xorazmiy nomidan kelib chiqqan. Uning asarlari Yevropaga tarjima qilinganda, hisoblash usullari \"algorizmi\" deb atalgan va vaqt o'tib bu so'z \"algoritm\" shakliga kelgan." },
        { p: "Muhim narsa shuki, algoritm faqat kompyuterlarga tegishli emas. Algoritm - bu fikrlash usuli. Biz avval masalani miyamizda qadamlarga ajratamiz, keyin uni kodga aylantiramiz." },

        { h2: "Kundalik hayotdan misollar" },
        { p: "Algoritmni tushunishning eng oson yo'li - uni oddiy hayotiy misollar orqali ko'rish. Masalan, choy damlash retseptini olaylik. Bu ham algoritm:" },
        { ol: [
          "Choynakka suv quy.",
          "Suvni qaynat.",
          "Choynakka choy barglarini sol.",
          "Ustiga qaynagan suv quy.",
          "Besh daqiqa kutib, damlanishini kut.",
          "Piyolaga quyib, ich."
        ] },
        { p: "E'tibor bering: qadamlar aniq tartibda joylashgan. Agar tartibni buzsak (masalan, suvni qaynatmasdan choy solsak), natija boshqacha bo'ladi. Algoritmda <strong>tartib muhim</strong>." },
        { p: "Yana bir misol - noma'lum manzilga borish. Navigator sizga: \"To'g'riga yur, ikkinchi chorrahadan o'ngga bur, 200 metr yur, manzil o'ng tomonda\" deydi. Bu ham qadamma-qadam ko'rsatma, ya'ni algoritm." },
        { tip: "Agar biror ishni boshqa odamga tushuntirib bera olsangiz - \"avval buni qil, keyin buni\" - demak siz o'sha ish uchun algoritm tuza olasiz. Dasturlash aynan shu ko'nikmani kompyuter tiliga ko'chirishdir." },

        { h2: "Algoritmning asosiy xossalari" },
        { p: "Har qanday to'g'ri algoritm bir nechta muhim xossaga ega bo'lishi kerak. Bu xossalar algoritmni oddiy \"tavsiya\"dan ajratib turadi:" },
        { ul: [
          "<strong>Aniqlik (definiteness)</strong> - har bir qadam bir ma'noli va tushunarli bo'lishi kerak. \"Bir ozgina tuz sol\" - bu aniq emas; \"5 gramm tuz sol\" - bu aniq.",
          "<strong>Cheklilik (finiteness)</strong> - algoritm cheklangan qadamlardan keyin albatta tugashi kerak. Cheksiz davom etadigan narsa algoritm emas.",
          "<strong>Kirish (input)</strong> - algoritm nol yoki undan ko'p kirish ma'lumotini oladi.",
          "<strong>Chiqish (output)</strong> - algoritm kamida bitta natija qaytaradi.",
          "<strong>Bajarilishi mumkinligi (effectiveness)</strong> - har bir qadam amalda bajarib bo'ladigan bo'lishi kerak."
        ] },
        { note: "Cheklilik juda muhim. Agar sikl (loop) hech qachon to'xtamasa, dastur \"muzlab\" qoladi. Har doim algoritmingiz qachon va qanday tugashini bilishingiz kerak." },

        { h2: "Bir masala - ko'p yechim" },
        { p: "Eng qiziq tomoni shuki, bitta masalani turli algoritmlar bilan yechish mumkin. Ular bir xil natija beradi, lekin har xil yo'l bilan, har xil tezlikda ishlaydi." },
        { p: "Misol qilib, 1 dan n gacha bo'lgan sonlarning yig'indisini hisoblashni olaylik. Buni ikki xil yo'l bilan yechamiz. Birinchisi - oddiy sikl bilan har bir sonni birma-bir qo'shish:" },
        { pg: "function yigindiSikl(n) {\n  let yigindi = 0;\n  for (let i = 1; i <= n; i++) {\n    yigindi += i;\n  }\n  return yigindi;\n}\n\nconsole.log(yigindiSikl(5));   // 1+2+3+4+5\nconsole.log(yigindiSikl(100)); // 1 dan 100 gacha", file: "yigindi-sikl.js" },
        { p: "Bu ishlaydi, lekin n ta qadamni bajaradi. Agar n million bo'lsa, million marta qo'shish kerak. Endi ikkinchi yo'lni ko'raylik - matematik formula orqali. Kichik Gauss kashf etgan formula: yig'indi = n * (n + 1) / 2." },
        { pg: "function yigindiFormula(n) {\n  return n * (n + 1) / 2;\n}\n\nconsole.log(yigindiFormula(5));   // 15\nconsole.log(yigindiFormula(100)); // 5050\nconsole.log(yigindiFormula(1000000)); // bir zumda!", file: "yigindi-formula.js" },
        { p: "Ikkala funksiya ham bir xil to'g'ri javob beradi. Lekin birinchisi n ta qadam bajaradi, ikkinchisi esa - <strong>doim faqat bitta</strong> qadam (bitta ko'paytirish, bitta qo'shish, bitta bo'lish). n qancha katta bo'lmasin, formula bir zumda javob qaytaradi." },
        { p: "Mana shu farq - algoritmlarni o'rganishning asl mohiyati. Ikkala yechim ham \"to'g'ri\", lekin biri boshqasidan ancha <strong>samaraliroq</strong>." },
        { p: "Keling, ikkala usulni bitta joyda taqqoslab ko'raylik. Katta son uchun ikkalasi bir xil javob berishini, lekin formula sikldan tamomila boshqacha ishlashini his qiling:" },
        { pg: "function sikl(n) {\n  let s = 0;\n  for (let i = 1; i <= n; i++) s += i;\n  return s;\n}\nfunction formula(n) {\n  return n * (n + 1) / 2;\n}\n\nconst n = 1000;\nconsole.log(\"Sikl:\", sikl(n));       // 500500\nconsole.log(\"Formula:\", formula(n)); // 500500\n// Ikkovi ham to'g'ri - lekin formula 1 qadamda!", file: "taqqoslash.js" },
        { note: "Bu yerda muhim saboq bor: ba'zan eng yaxshi \"algoritm\" - umuman sikl ishlatmaslik, balki masalaning matematik naqshini payqashdir. Yaxshi dasturchi kod yozishdan oldin biroz o'ylaydi." },

        { h2: "\"To'g'ri\" va \"samarali\" farqi" },
        { p: "Ko'p yangi dasturchilar shunday o'ylaydi: \"Kodim ishlayaptimi? Demak bo'ldi.\" Bu qisman to'g'ri, lekin kifoya emas. Kod ikki mezon bilan baholanadi:" },
        { ul: [
          "<strong>To'g'rilik (correctness)</strong> - kod barcha holatlarda kutilgan to'g'ri natijani beradimi?",
          "<strong>Samaradorlik (efficiency)</strong> - kod buni qanchalik tez va kam resurs bilan bajaradi?"
        ] },
        { p: "Kichik ma'lumotlarda ikkala algoritm ham bir xil tez ishlayotgandek tuyuladi. Lekin ma'lumot hajmi o'sganda farq keskin ko'rinadi. Millionlab foydalanuvchisi bor ilovada sekin algoritm ilovani ishlamaydigan qilib qo'yishi mumkin." },
        { warn: "\"Avval ishlaydigan qil, keyin tezlashtir\" degan yaxshi maslahat bor. Lekin \"tez\" haqida hech o'ylamaslik - keyin katta muammoga aylanadi. Samaradorlikni boshidanoq his qilib turish kerak." },

        { h2: "Ma'lumotlar tuzilmasi nima?" },
        { p: "Algoritmlar ma'lumotlar bilan ishlaydi. Bu ma'lumotlarni qanday saqlash va tartibga solish esa <strong>ma'lumotlar tuzilmasi</strong> (data structure) deyiladi. Massiv (array), obyekt (object), stek (stack), navbat (queue), daraxt (tree) - bularning barchasi ma'lumotlar tuzilmalari." },
        { p: "Algoritm va ma'lumotlar tuzilmasi bir-biriga chambarchas bog'liq. To'g'ri tuzilma tanlash algoritmni bir necha barobar tezlashtirishi mumkin. Masalan, biror elementni topish uchun:" },
        { ul: [
          "Oddiy massivda qidirish - har bir elementni tekshirish kerak bo'lishi mumkin (sekin).",
          "Obyekt (yoki hash-jadval) da kalit orqali topish - deyarli bir zumda (tez)."
        ] },
        { p: "Shuning uchun dasturchi nafaqat \"qanday yechish\"ni, balki \"ma'lumotni qanday saqlash\"ni ham o'ylashi kerak. Bu ikkalasi birgalikda dasturning yuragini tashkil qiladi." },

        { h2: "Nega buni o'rganish muhim?" },
        { p: "Algoritmlarni o'rganishning ikki katta sababi bor:" },
        { p: "<strong>Birinchisi - samarali kod yozish.</strong> Zamonaviy ilovalar katta hajmdagi ma'lumot bilan ishlaydi. Qidiruv, saralash, filtrlash - bularning tez ishlashi foydalanuvchi tajribasini belgilaydi. Algoritmik fikrlash sizga sekin kodni tez kodga aylantirishni o'rgatadi." },
        { p: "<strong>Ikkinchisi - ishga qabul intervyulari.</strong> Deyarli barcha yaxshi texnologiya kompaniyalari texnik intervyularda algoritmik masalalar beradi. Ular sizning kodni yodlaganingizni emas, <strong>fikrlash usulingizni</strong> ko'rmoqchi. Masalani qanday qismlarga bo'lasiz, qaysi yechimni tanlaysiz, murakkabligini bahalay olasizmi - bularning barchasi shu bilim orqali sinaladi." },
        { tip: "Algoritmlar - bu \"matematika olimpiadasi\" emas. Bu - fikrlash mashqi. Har bir yechilgan masala miyangizni yangi naqshlarni ko'rishga o'rgatadi va vaqt o'tib bu tabiiy ko'nikmaga aylanadi." },

        { h2: "Bu bo'limda nimalarni o'rganamiz" },
        { p: "Keyingi darslarda quyidagilarni qadamma-qadam ko'rib chiqamiz:" },
        { ol: [
          "<strong>Big O notatsiyasi</strong> - algoritm tezligini o'lchashning universal tili.",
          "<strong>Keng tarqalgan murakkabliklar</strong> - O(1) dan O(n!) gacha, har birini misol bilan.",
          "<strong>Rekursiya</strong> - funksiya o'zini chaqirishi va u bilan masala yechish."
        ] },
        { p: "Bu asoslarni o'zlashtirsangiz, kelgusi bo'limlardagi qidiruv, saralash va ma'lumotlar tuzilmalari mavzulari siz uchun ancha oson va tushunarli bo'ladi. Keling, yo'lni boshlaymiz." }
      ]
    },

    {
      slug: "big-o",
      title: "Big O notatsiyasi: vaqt murakkabligi",
      blurb: "Algoritm tezligini o'lchash, Big O g'oyasi, o'sish tartibi, eng yomon holat va asosiy murakkabliklar bilan tanishuv.",
      body: [
        { lead: "\"Bu algoritm tezmi?\" degan savolga qanday javob berish mumkin? Soniyada o'lchaymizmi? Lekin bir xil kod kuchli kompyuterda tez, eski telefonda sekin ishlaydi. Demak soniya ishonchli o'lchov emas. Dasturchilarga universal, mashinadan mustaqil o'lchov kerak edi. Ana shunday o'lchov - <strong>Big O notatsiyasi</strong>. Bu darsda Big O nima ekanini, u algoritm tezligini qanday ifodalashini va uni qanday o'qishni o'rganamiz. Bu - algoritmlar dunyosining eng muhim tili." },

        { h2: "Nega soniya emas, amallar sonini sanaymiz?" },
        { p: "Faraz qiling, kodingiz bir kompyuterda 2 soniyada ishladi. Bu ko'pmi yoki ozmi? Buni ayta olmaymiz, chunki:" },
        { ul: [
          "Boshqa, tezroq kompyuterda xuddi shu kod 0.5 soniyada ishlashi mumkin.",
          "Kompyuter band bo'lsa, vaqt yana o'zgaradi.",
          "Dasturlash tili va uning versiyasi ham ta'sir qiladi."
        ] },
        { p: "Shuning uchun biz vaqtni soniyada emas, algoritm bajaradigan <strong>asosiy amallar sonida</strong> o'lchaymiz. Amal deganda - taqqoslash, qo'shish, o'zlashtirish kabi oddiy qadamlar tushuniladi. Bu son mashinaga bog'liq emas, faqat algoritmning o'ziga bog'liq. Aynan shu bizga kerak." },

        { h2: "Kirish hajmi - n" },
        { p: "Algoritm qancha ishlashi ko'pincha unga berilgan ma'lumot hajmiga bog'liq. Bu hajmni biz odatda <strong>n</strong> harfi bilan belgilaymiz. Masalan:" },
        { ul: [
          "Massivni saralashda n - massivdagi elementlar soni.",
          "Matnda so'z qidirishda n - matndagi belgilar soni.",
          "Foydalanuvchilar ro'yxatini qayta ishlashda n - foydalanuvchilar soni."
        ] },
        { p: "Big O aynan shu savolga javob beradi: <strong>n o'sganda, amallar soni qanday o'sadi?</strong> Ma'lumot ikki barobar ko'paysa, ish ham ikki barobar ko'payadimi, yoki to'rt barobar, yoki umuman o'zgarmaydimi? Mana shu \"o'sish tezligi\" algoritmning asl xarakterini ko'rsatadi." },

        { h2: "Big O g'oyasi: o'sish tartibi" },
        { p: "<strong>Big O notatsiyasi</strong> (Big O notation) - bu algoritmning ishlash vaqti yoki xotira sarfi kirish hajmi n ga qarab qanday o'sishini ifodalaydigan matematik yozuv. U aniq amallar sonini emas, <strong>o'sish tartibini</strong> (order of growth) ko'rsatadi." },
        { p: "Big O ni yozishda ikkita muhim soddalashtirish qoidasi bor. Bular boshda g'alati tuyulishi mumkin, lekin ular mantiqli:" },
        { h3: "1. Konstantalar tashlab yuboriladi" },
        { p: "Agar algoritm 2n amal bajarsa, biz uni <code>O(2n)</code> emas, <code>O(n)</code> deb yozamiz. Nega? Chunki bizni aniq raqam emas, o'sish <strong>xarakteri</strong> qiziqtiradi. 2n ham, 5n ham, 100n ham - hammasi n ga to'g'ri proporsional o'sadi. Ikkovi ham \"chiziqli\" o'sish tartibiga ega." },
        { code: "O(2n)   ->  O(n)\nO(500n) ->  O(n)\nO(n/2)  ->  O(n)" },
        { h3: "2. Kichik qo'shiluvchilar tashlab yuboriladi" },
        { p: "Agar algoritm n + 5 amal bajarsa, biz uni <code>O(n)</code> deb yozamiz. Yoki n² + n bo'lsa - <code>O(n²)</code>. Chunki n juda katta bo'lganda, eng katta tezlik bilan o'sadigan qism hamma narsani belgilaydi. Kichik qo'shiluvchilar unga nisbatan ahamiyatsiz bo'lib qoladi." },
        { code: "O(n + 5)     ->  O(n)\nO(n² + n)    ->  O(n²)\nO(n² + 1000) ->  O(n²)" },
        { note: "Big O ni \"n cheksizga intilganda nima bo'ladi?\" degan savol sifatida tasavvur qiling. Katta ko'lamda faqat eng tez o'sadigan qism ahamiyatli bo'ladi. Aynan shuning uchun konstantalar va kichik qismlar tushib qoladi." },

        { h2: "Eng yomon, o'rtacha va eng yaxshi holat" },
        { p: "Algoritm har doim bir xil ishlamaydi. Ba'zan omadingiz keladi, ba'zan yo'q. Massivda biror sonni qidirayotganingizni tasavvur qiling:" },
        { ul: [
          "<strong>Eng yaxshi holat (best case)</strong> - qidirilayotgan son birinchi elementda turibdi. Bir marta tekshirdik - topdik. Bu <code>O(1)</code>.",
          "<strong>O'rtacha holat (average case)</strong> - son o'rtalarda. Taxminan yarim massivni tekshiramiz.",
          "<strong>Eng yomon holat (worst case)</strong> - son oxirgi elementda yoki umuman yo'q. Butun massivni tekshiramiz. Bu <code>O(n)</code>."
        ] },
        { p: "Big O da biz odatda <strong>eng yomon holatni</strong> hisoblaymiz. Nega? Chunki u kafolat beradi: \"Bu algoritm bundan yomonroq ishlamaydi\". Eng yomon holatni bilsak, hech qachon yoqimsiz kutilmagan holatga tushmaymiz." },

        { h2: "Amallarni sanash misoli" },
        { p: "Keling, oddiy funksiyada amallarni sanashni ko'raylik. Bu funksiya massivning barcha elementlari yig'indisini hisoblaydi:" },
        { pg: "function yigindi(massiv) {\n  let jami = 0;              // 1 amal\n  for (let i = 0; i < massiv.length; i++) {\n    jami += massiv[i];       // n marta bajariladi\n  }\n  return jami;               // 1 amal\n}\n\nconsole.log(yigindi([10, 20, 30, 40]));", file: "amal-sanash.js" },
        { p: "Bu yerda: boshida 1 amal (jami = 0), sikl ichida n marta qo'shish, oxirida 1 amal (return). Jami taxminan n + 2 amal. Big O qoidalariga ko'ra konstantalarni tashlaymiz: <strong>O(n)</strong>. Ya'ni bu algoritm chiziqli, massiv o'sgani sari ish ham shunga mos o'sadi." },

        { h2: "Uch xil asosiy misol" },
        { p: "Keling, uchta asosiy murakkablikni jonli kodda ko'raylik. Bular eng ko'p uchraydigani." },
        { h3: "O(1) - bitta amal (konstanta)" },
        { p: "Massivning birinchi elementini olish uchun uzunligi qanday bo'lishidan qat'i nazar - bitta amal kifoya. Massiv 10 ta ham, million ta ham element bo'lsin - farqi yo'q:" },
        { pg: "function birinchisi(massiv) {\n  return massiv[0]; // n qanaqa bo'lishidan qat'i nazar 1 amal\n}\n\nconsole.log(birinchisi([5, 8, 12, 99])); // 5\n// Bu O(1) - konstanta vaqt", file: "o1-misol.js" },
        { h3: "O(n) - bitta sikl (chiziqli)" },
        { p: "Barcha elementlarni bir marta ko'rib chiqadigan bitta sikl - bu O(n). Elementlar soni ikki barobar ko'paysa, ish ham ikki barobar ko'payadi:" },
        { pg: "function engKatta(massiv) {\n  let max = massiv[0];\n  for (let i = 1; i < massiv.length; i++) {\n    if (massiv[i] > max) {\n      max = massiv[i];\n    }\n  }\n  return max;\n}\n\nconsole.log(engKatta([3, 7, 2, 9, 4])); // 9\n// Bu O(n) - chiziqli", file: "on-misol.js" },
        { h3: "O(n²) - ichma-ich ikki sikl (kvadratik)" },
        { p: "Sikl ichida yana sikl bo'lsa - bu O(n²). Tashqi sikl n marta aylanadi, uning har bir aylanishida ichki sikl yana n marta aylanadi. Jami n * n = n² amal. Bu misolda barcha juftliklarni chiqaramiz:" },
        { pg: "function juftliklar(massiv) {\n  for (let i = 0; i < massiv.length; i++) {\n    for (let j = 0; j < massiv.length; j++) {\n      console.log(massiv[i] + \" - \" + massiv[j]);\n    }\n  }\n}\n\njuftliklar([1, 2, 3]);\n// 9 ta juftlik chiqadi (3 * 3)\n// Bu O(n²) - kvadratik", file: "on2-misol.js" },
        { warn: "n² juda tez o'sadi. n = 1000 bo'lsa, n² = 1,000,000. n = 100000 bo'lsa, n² = 10,000,000,000 - bu deyarli har qanday kompyuterni tiz cho'ktiradi. Ichma-ich sikllardan ehtiyot bo'ling." },

        { h2: "n o'sganda amallar qanday o'sadi" },
        { p: "Big O ning kuchini his qilish uchun turli murakkabliklar n o'sganda qancha amal bajarishini taqqoslaymiz. Quyidagi jadval hammasini oydinlashtiradi:" },
        { code: ["n          O(1)   O(log n)   O(n)       O(n²)",
                 "--------------------------------------------------",
                 "10         1      ~3         10         100",
                 "100        1      ~7         100        10,000",
                 "1,000      1      ~10        1,000      1,000,000",
                 "1,000,000  1      ~20        1,000,000  1,000,000,000,000"].join("\n") },
        { p: "Diqqat qiling: O(1) hech o'zgarmaydi. O(log n) juda sekin o'sadi. O(n) tekis, mutanosib o'sadi. O(n²) esa portlaydi. Aynan shu jadval sizga qaysi algoritm katta ma'lumotda yashaydi-yu, qaysi biri o'ladi degan savolga javob beradi." },
        { tip: "Big O ni o'qishda oddiy qoida: kodingizda nechta ichma-ich sikl bor? Bitta sikl - odatda O(n). Ikkita ichma-ich - O(n²). Hech qanday sikl yo'q, faqat to'g'ridan-to'g'ri amal - O(1). Bu qoida ko'p hollarda to'g'ri ishlaydi." },

        { h2: "Xotira murakkabligi (space complexity)" },
        { p: "Big O faqat vaqtni emas, <strong>xotira sarfini</strong> (space complexity) ham o'lchaydi. Ya'ni algoritm n hajmdagi ma'lumot uchun qancha qo'shimcha xotira ishlatadi?" },
        { ul: [
          "Agar algoritm faqat bir nechta o'zgaruvchi ishlatsa (n ga bog'liq bo'lmagan) - bu <strong>O(1) xotira</strong>.",
          "Agar algoritm kirishga teng hajmdagi yangi massiv yaratsa - bu <strong>O(n) xotira</strong>."
        ] },
        { p: "Masalan, yuqoridagi <code>engKatta</code> funksiyasi faqat bitta <code>max</code> o'zgaruvchisini saqlaydi - u O(1) xotira ishlatadi. Lekin agar biz massivning nusxasini olsak, O(n) xotira kerak bo'ladi." },
        { note: "Ko'pincha vaqt va xotira o'rtasida murosaga borishga to'g'ri keladi: ko'proq xotira sarflab, tezroq ishlash mumkin (yoki aksincha). Bu \"vaqt-xotira almashuvi\" (time-space tradeoff) deb ataladi va real muhandislikda tez-tez uchraydi." },

        { h2: "Xulosa" },
        { p: "Big O - bu algoritm tezligining universal tili. U bizga mashinadan mustaqil ravishda \"bu kod katta ma'lumotda qanday ishlaydi?\" degan savolga javob beradi. Asosiy g'oyalar:" },
        { ul: [
          "Vaqtni soniyada emas, amallar sonida (n ga bog'liq) o'lchaymiz.",
          "Konstantalar va kichik qismlar tashlab yuboriladi - faqat o'sish tartibi qoladi.",
          "Odatda eng yomon holatni hisoblaymiz - u kafolat beradi.",
          "Xotira sarfi ham xuddi shunday Big O bilan o'lchanadi."
        ] },
        { p: "Keyingi darsda har bir asosiy murakkablikni - O(1) dan O(n!) gacha - alohida-alohida, jonli misollar bilan chuqurroq o'rganamiz." }
      ]
    },

    {
      slug: "big-o-amaliy",
      title: "Keng tarqalgan murakkabliklar: O(1) dan O(n!) gacha",
      blurb: "O(1), O(log n), O(n), O(n log n), O(n²), O(2^n), O(n!) - har birini misol va taqqoslash bilan tushunish.",
      body: [
        { lead: "O'tgan darsda Big O ning umumiy g'oyasini o'rgandik. Endi eng ko'p uchraydigan murakkabliklar oilasi bilan birma-bir tanishamiz - eng tezidan (O(1)) eng dahshatlisiga (O(n!)) qadar. Har birini jonli kod, hayotiy o'xshatish va amallar soni bilan ko'ramiz. Bu darsni tugatganingizda, har qanday kodga qarab uning taxminiy murakkabligini ayta olasiz - bu esa yaxshi dasturchining asosiy ko'nikmalaridan biri." },

        { h2: "Murakkabliklar zinapoyasi" },
        { p: "Barcha asosiy murakkabliklarni tezlikdan sekinlikka qarab tartiblab qo'yaylik. Bu \"zinapoya\" ni yodda tutish juda foydali:" },
        { code: ["O(1)       - eng tez     (a'lo)",
                 "O(log n)   - juda tez    (juda yaxshi)",
                 "O(n)       - tez         (yaxshi)",
                 "O(n log n) - o'rtacha    (yaxshi)",
                 "O(n²)      - sekin       (ehtiyot bo'l)",
                 "O(2^n)     - juda sekin  (yomon)",
                 "O(n!)      - dahshatli   (deyarli ishlatilmaydi)"].join("\n") },
        { p: "Yuqoridagilar qanchalik pastga tushsak, shunchalik yomonlashadi. Endi har birini alohida ko'rib chiqamiz." },

        { h2: "O(1) - konstanta vaqt" },
        { p: "<strong>O(1)</strong> - eng ideal murakkablik. Bu \"kirish hajmi qanday bo'lishidan qat'i nazar, doim bir xil vaqt\" degani. Ma'lumot million ta ham, milliard ta ham bo'lsin - ish vaqti o'zgarmaydi." },
        { p: "Misollar: massivning ma'lum indeksidagi elementini olish, obyektdan kalit orqali qiymat olish, ikki sonni qo'shish. Bularning barchasi bir zumda bajariladi:" },
        { pg: "const massiv = [10, 20, 30, 40, 50];\nconsole.log(massiv[2]); // indeks orqali - O(1)\n\nconst foydalanuvchi = { ism: \"Ali\", yosh: 25 };\nconsole.log(foydalanuvchi.ism); // kalit orqali - O(1)\n\n// Massiv million element bo'lsa ham,\n// indeks orqali olish baribir O(1) bo'lib qoladi", file: "o1-amaliy.js" },
        { tip: "Obyekt (yoki Map) da kalit orqali qidirish O(1) bo'lishi - ma'lumotlar tuzilmalarini o'rganishda eng muhim tushunchalardan biri. Agar bir narsani tez-tez qidirsangiz, uni massivda emas, obyektda saqlash algoritmingizni keskin tezlashtiradi." },

        { h2: "O(log n) - logaritmik vaqt" },
        { p: "<strong>O(log n)</strong> - juda kuchli murakkablik. Bu \"har qadamda muammoni yarmiga qisqartirish\" degani. Ma'lumot ikki barobar ko'paysa, ish faqat bir qadamga ko'payadi. Bu aql bovar qilmas darajada samarali." },
        { p: "Eng mashhur misol - <strong>ikkilik qidiruv</strong> (binary search). Tasavvur qiling, saralangan (tartiblangan) 1000 ta sonli massivdan biror sonni izlayapsiz. O'rtadagi elementga qaraysiz: agar izlayotganingiz undan kichik bo'lsa, o'ng yarmni butunlay tashlab yuborasiz. Har qadamda yarim ma'lumot yo'qoladi:" },
        { pg: "function ikkilikQidiruv(massiv, qidirilayotgan) {\n  let chap = 0;\n  let ong = massiv.length - 1;\n  while (chap <= ong) {\n    let orta = Math.floor((chap + ong) / 2);\n    if (massiv[orta] === qidirilayotgan) {\n      return orta; // topildi\n    } else if (massiv[orta] < qidirilayotgan) {\n      chap = orta + 1; // o'ng yarmda izla\n    } else {\n      ong = orta - 1;  // chap yarmda izla\n    }\n  }\n  return -1; // topilmadi\n}\n\nconst sonlar = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];\nconsole.log(ikkilikQidiruv(sonlar, 23)); // 5\nconsole.log(ikkilikQidiruv(sonlar, 7));  // -1", file: "log-n-qidiruv.js" },
        { p: "1000 ta elementdan qidirish uchun oddiy usulda 1000 ta tekshirish kerak bo'lardi. Ikkilik qidiruvda esa faqat ~10 ta! Chunki 1000 ni yarmiga bo'lib borsak: 1000 -> 500 -> 250 -> 125 -> ... -> 1 ga yetish uchun atigi ~10 qadam kerak. Million element uchun ham - atigi ~20 qadam." },
        { note: "Logaritm - bu \"nechta marta ikkiga bo'lsak, 1 ga yetamiz?\" degan savolning javobi. log(1000) taxminan 10, log(1,000,000) taxminan 20. Shuning uchun ikkilik qidiruv shunchalik tez. Lekin bir shart bor: ma'lumot oldindan saralangan bo'lishi kerak." },

        { h2: "O(n) - chiziqli vaqt" },
        { p: "<strong>O(n)</strong> - juda keng tarqalgan va yaxshi murakkablik. Bu \"har bir elementni bir marta ko'rib chiqish\" degani. Ma'lumot ikki barobar ko'paysa, ish ham ikki barobar ko'payadi - to'g'ri, mutanosib bog'liqlik." },
        { p: "Bitta sikl bilan massivni bir marta aylanib chiqish - bu tipik O(n). Masalan, massivdagi barcha sonlar yig'indisini topish yoki biror elementni oddiy izlash:" },
        { pg: "function summa(massiv) {\n  let jami = 0;\n  for (let i = 0; i < massiv.length; i++) {\n    jami += massiv[i]; // har element bir marta\n  }\n  return jami;\n}\n\nconsole.log(summa([5, 10, 15, 20])); // 50\n// n ta element = n ta amal = O(n)", file: "on-amaliy.js" },
        { p: "O(n) - bu ko'p masalalar uchun tabiiy va qabul qilinadigan yechim. Agar barcha ma'lumotni ko'rib chiqishingiz kerak bo'lsa, O(n) dan tezroq bo'lishning iloji yo'q - chunki hech bo'lmaganda har birini bir marta ko'rish shart." },

        { h2: "O(n log n) - chiziqli-logaritmik vaqt" },
        { p: "<strong>O(n log n)</strong> - O(n) dan biroz sekinroq, lekin baribir juda yaxshi murakkablik. Bu asosan <strong>samarali saralash algoritmlari</strong>da uchraydi: birlashtirib saralash (merge sort), tez saralash (quick sort) va boshqalar." },
        { p: "Intuitsiya: siz n ta elementni ko'rib chiqasiz (bu O(n) qism), lekin buni log n marta takrorlaysiz (ma'lumotni yarmiga bo'lib ishlash sababli). n * log n = O(n log n)." },
        { p: "JavaScript ning o'z <code>sort</code> metodi ham aynan O(n log n) da ishlaydi:" },
        { pg: "const sonlar = [42, 7, 19, 3, 88, 15, 60];\n\n// JavaScript sort metodi O(n log n) da ishlaydi\nconst saralangan = [...sonlar].sort((a, b) => a - b);\n\nconsole.log(saralangan); // [3, 7, 15, 19, 42, 60, 88]\n// n ta element uchun taxminan n * log(n) amal", file: "nlogn-amaliy.js" },
        { p: "n = 1000 uchun: O(n²) bo'lsa 1,000,000 amal, O(n log n) bo'lsa esa faqat ~10,000 amal. Farq juda katta! Shuning uchun katta ma'lumotni saralashda har doim O(n log n) algoritmlar ishlatiladi." },

        { h2: "O(n²) - kvadratik vaqt" },
        { p: "<strong>O(n²)</strong> - ehtiyot bo'lish kerak bo'lgan murakkablik. Bu odatda <strong>ichma-ich ikki sikl</strong>dan kelib chiqadi. Ma'lumot ikki barobar ko'paysa, ish to'rt barobar ko'payadi. Kichik ma'lumotda muammo emas, lekin katta ma'lumotda halokatli." },
        { p: "Klassik misol - barcha element juftliklarini solishtirish. Masalan, massivda takrorlangan sonlar bor-yo'qligini ikkita ichma-ich sikl bilan tekshirish:" },
        { pg: "function takrorBormi(massiv) {\n  for (let i = 0; i < massiv.length; i++) {\n    for (let j = i + 1; j < massiv.length; j++) {\n      if (massiv[i] === massiv[j]) {\n        return true; // takror topildi\n      }\n    }\n  }\n  return false;\n}\n\nconsole.log(takrorBormi([1, 2, 3, 4])); // false\nconsole.log(takrorBormi([1, 2, 3, 2])); // true\n// Ichma-ich sikl = O(n²)", file: "on2-amaliy.js" },
        { p: "Bu yechim to'g'ri ishlaydi, lekin O(n²). Qizig'i shuki, xuddi shu masalani obyekt (Set) yordamida O(n) da ham yechish mumkin - ko'rgan sonlarni eslab qolib, har yangi sonni bir zumda tekshirib. Bu - algoritmik fikrlashning kuchi: sekin yechimni tez yechimga aylantirish." },
        { warn: "O(n²) kodni ko'rsangiz, doim so'rang: \"Buni O(n) yoki O(n log n) da yechib bo'ladimi?\" Ko'pincha - ha. Ichma-ich sikl - bu \"to'xta va o'yla\" signali." },

        { h2: "O(2^n) - eksponensial vaqt" },
        { p: "<strong>O(2^n)</strong> - juda yomon murakkablik. Bu \"har bir qo'shimcha element ishni ikki barobar oshiradi\" degani. Bunday algoritmlar juda tez portlab ketadi va faqat kichik n uchun ishlatsa bo'ladi." },
        { p: "Klassik misol - <strong>naive (sodda) rekursiv Fibonacci</strong>. Har bir chaqiruv o'zini ikki marta chaqiradi, natijada chaqiruvlar daraxti eksponensial o'sadi:" },
        { pg: "function fib(n) {\n  if (n <= 1) return n; // bazaviy holat\n  return fib(n - 1) + fib(n - 2); // ikki marta chaqiradi\n}\n\nconsole.log(fib(10)); // 55\nconsole.log(fib(20)); // 6765 - hali tez\n// fib(50) ni hisoblash yillar davom etishi mumkin!\n// Bu O(2^n) - eksponensial", file: "eksponensial-fib.js" },
        { p: "<code>fib(50)</code> ni bu usulda hisoblash uchun taxminan 2^50 = 1,125,899,906,842,624 (kvadrilliondan ortiq) amal kerak! Bu deyarli imkonsiz. Shuning uchun bunday masalalarni keshlash (memoization) yoki iteratsiya bilan O(n) ga tushirish kerak." },
        { note: "Eksponensial algoritmlar odatda \"barcha mumkin bo'lgan variantlarni sinab ko'rish\" masalalarida paydo bo'ladi. Ular to'g'ri javob beradi, lekin katta n da amalda foydasiz. Ularni optimallashtirish - alohida san'at." },

        { h2: "O(n!) - faktorial vaqt" },
        { p: "<strong>O(n!)</strong> - eng yomon amaliy murakkablik. Faktorial (n! = n * (n-1) * ... * 2 * 1) shu qadar tez o'sadiki, hatto kichik n uchun ham amallar soni astronomik bo'ladi." },
        { p: "Bu murakkablik odatda <strong>barcha o'rin almashtirishlarni (permutations)</strong> topish masalalarida uchraydi. Masalan, n ta elementni necha xil tartibda joylashtirish mumkin? Javob - n! xil." },
        { code: ["3 ta element  -> 3!  = 6 ta tartib",
                 "5 ta element  -> 5!  = 120 ta tartib",
                 "10 ta element -> 10! = 3,628,800 ta tartib",
                 "15 ta element -> 15! = 1,307,674,368,000 ta tartib!"].join("\n") },
        { p: "Ko'rib turibsizki, 15 ta element uchun ham triliondan ortiq variant paydo bo'ladi. Klassik \"kommivoyajyor masalasi\" (sayohatchi eng qisqa yo'lni tanlashi) sodda ko'rinishda aynan O(n!) bo'ladi va shuning uchun katta shaharlar uchun uni to'g'ridan-to'g'ri yechib bo'lmaydi." },

        { h2: "Barchasini bir jadvalda taqqoslash" },
        { p: "Endi eng muhim jadval - turli n qiymatlarida har bir murakkablik taxminan qancha amal talab qilishini ko'raylik. Bu jadval sizga qaysi algoritm qaysi ma'lumot hajmida yashay olishini ko'rsatadi:" },
        { code: ["n          O(1)  O(log n)  O(n)        O(n log n)   O(n²)",
                 "-----------------------------------------------------------------",
                 "10         1     ~3        10          ~33          100",
                 "100        1     ~7        100         ~700         10,000",
                 "1,000      1     ~10       1,000       ~10,000      1,000,000",
                 "1,000,000  1     ~20       1,000,000   ~20,000,000  10^12 (juda katta)"].join("\n") },
        { p: "Eksponensial (2^n) va faktorial (n!) ni bu jadvalga qo'shmadik, chunki n = 100 da ular shunchalik katta bo'ladiki, koinotdagi atomlar sonidan ham oshib ketadi. Ular faqat juda kichik n uchun mos." },
        { p: "<strong>Amaliy qoida:</strong> O(1), O(log n), O(n), O(n log n) - bularni \"yaxshi\" deb bilsa bo'ladi, ular millionlab elementda ham ishlaydi. O(n²) - o'rtacha (minglab elementgacha yaxshi). O(2^n) va O(n!) - faqat kichik ma'lumot uchun." },

        { h2: "Ehtiyot: ichma-ich sikl har doim O(n²) emas" },
        { warn: "Umumiy xato: \"ikkita sikl ko'rdim - demak O(n²)\". Bu har doim to'g'ri emas! Muhimi - har bir sikl necha marta aylanadi." },
        { p: "Masalan, quyidagi kodda ikkita sikl bor, lekin ikkinchisi <strong>doim 3 marta</strong> aylanadi, n ga bog'liq emas. Shuning uchun bu O(n * 3) = O(n), ya'ni chiziqli:" },
        { pg: "function ranglar(mahsulotlar) {\n  const ranglar = [\"qizil\", \"yashil\", \"ko'k\"];\n  for (let i = 0; i < mahsulotlar.length; i++) { // n marta\n    for (let j = 0; j < ranglar.length; j++) {    // doim 3 marta\n      console.log(mahsulotlar[i] + \": \" + ranglar[j]);\n    }\n  }\n}\n\nranglar([\"koylak\", \"shim\"]);\n// Ichki sikl n ga bog'liq emas => O(n), O(n²) emas!", file: "sikl-tuzoq.js" },
        { p: "Aksincha, ikkita sikl ketma-ket (biri tugab, keyin ikkinchisi) bo'lsa - bu O(n) + O(n) = O(2n) = O(n), n² emas. Faqat sikllar <strong>ichma-ich</strong> bo'lib, ikkalasi ham n ga bog'liq bo'lgandagina O(n²) bo'ladi." },

        { h2: "Real kodda murakkablikni qanday aniqlash" },
        { tip: "Kodning murakkabligini baholash uchun oddiy amaliy qadamlar:" },
        { ol: [
          "Kirish hajmiga bog'liq bo'lgan sikllarni toping. n ga bog'liq bitta sikl - odatda O(n).",
          "Ichma-ich sikllarni ko'ring. Ikkalasi ham n ga bog'liq bo'lsa - O(n²). Uchtasi - O(n³).",
          "Har qadamda ma'lumot yarmiga qisqarsa - bu O(log n) belgisi.",
          "O'rnatilgan (built-in) metodlarni unutmang: <code>sort</code> - O(n log n), massivda <code>includes</code> yoki <code>indexOf</code> - O(n), obyektda kalit qidirish - O(1).",
          "Eng katta o'sadigan qismni oling. O(n² + n) = O(n²). Faqat dominant qism qoladi."
        ] },
        { p: "Bu ko'nikma mashq bilan keladi. Har safar kod yozganingizda o'zingizga savol bering: \"Ma'lumot million marta ko'paysa, bu kod qanchaga sekinlashadi?\" Vaqt o'tib bu savol avtomatik ravishda miyangizda paydo bo'ladi - ana o'shanda haqiqiy algoritmik fikrlashga ega bo'lasiz." },
        { p: "Keyingi darsda esa algoritmlarning eng nafis va kuchli vositalaridan biri - rekursiya bilan tanishamiz. Ko'p tez algoritmlar aynan rekursiv fikrlashga asoslanadi." }
      ]
    },

    {
      slug: "rekursiya-algoritm",
      title: "Rekursiya algoritmlar tilida",
      blurb: "Rekursiv fikrlash, bazaviy holat, rekursiya daraxti, chaqiruvlar steki, murakkablikni hisoblash va rekursiyani siklga aylantirish.",
      body: [
        { lead: "Ba'zi masalalar o'z ichida o'zining kichraytirilgan nusxasini yashiradi. Matryoshka qo'g'irchoqni ochsangiz - ichidan yana bir xuddi shunday, lekin kichikroq qo'g'irchoq chiqadi. Aynan shunday masalalarni yechishning tabiiy va nafis usuli bor - <strong>rekursiya</strong>. Bu - funksiyaning o'zini-o'zi chaqirishi. Boshda bu sehrdek tuyuladi, lekin aslida ortida juda oddiy va chiroyli mantiq yotadi. Bu darsda rekursiv fikrlashni, uning qoidalarini va ko'plab algoritmlarda nega u shunchalik muhim ekanini o'rganamiz." },
        { note: "Rekursiya - algoritmlar bo'limining tayanch tushunchalaridan biri. Kelgusida ko'radigan ko'plab algoritmlar (ikkilik qidiruv, birlashtirib saralash, daraxtlarni aylanib chiqish) aynan rekursiv yoziladi. Shuning uchun bu darsni yaxshi o'zlashtirish juda muhim." },

        { h2: "Rekursiya nima?" },
        { p: "<strong>Rekursiya</strong> (recursion) - bu funksiyaning o'z ichida o'zini chaqirishi. Ya'ni funksiya masalani yechish uchun xuddi o'zini, lekin biroz kichikroq masala bilan yana ishga soladi. Bu jarayon masala shu qadar kichrayadiki, uni to'g'ridan-to'g'ri yechib bo'ladigan holatga yetguncha davom etadi." },
        { p: "Rekursiv fikrlashning asosiy g'oyasi: \"Katta masalani yechish uchun uni kichikroq, xuddi shunday masalaga aylantiraman, va shu kichikroq masalani yechishni o'zimga topshiraman.\"" },
        { p: "Har bir rekursiv funksiya ikki qismdan iborat bo'ladi:" },
        { ul: [
          "<strong>Bazaviy holat (base case)</strong> - rekursiya to'xtaydigan eng oddiy holat. Bu yerda funksiya o'zini chaqirmasdan, to'g'ridan-to'g'ri javob qaytaradi.",
          "<strong>Rekursiv holat (recursive case)</strong> - funksiya o'zini kichikroq masala bilan chaqiradigan qism."
        ] },

        { h2: "Bazaviy holat - eng muhim qism" },
        { p: "Bazaviy holat rekursiyaning \"to'xtash tugmasi\". Agar u bo'lmasa yoki noto'g'ri bo'lsa, funksiya o'zini cheksiz chaqiraveradi va dastur ishdan chiqadi. Shuning uchun har bir rekursiv funksiya yozganda birinchi savol shu bo'lishi kerak: <strong>\"Bu qachon to'xtaydi?\"</strong>" },
        { p: "Keling, eng klassik misol - <strong>faktorial</strong> hisoblashni ko'raylik. Faktorial n! = n * (n-1) * (n-2) * ... * 1. Masalan 5! = 5 * 4 * 3 * 2 * 1 = 120. Buni rekursiv qilib shunday ifodalash mumkin: n! = n * (n-1)!" },
        { pg: "function faktorial(n) {\n  if (n <= 1) {       // bazaviy holat\n    return 1;\n  }\n  return n * faktorial(n - 1); // rekursiv holat\n}\n\nconsole.log(faktorial(5)); // 120\nconsole.log(faktorial(3)); // 6\nconsole.log(faktorial(1)); // 1", file: "faktorial.js" },
        { p: "Bu qanday ishlaydi? <code>faktorial(5)</code> chaqirilganda: u 5 * faktorial(4) ni hisoblamoqchi bo'ladi. Buning uchun faktorial(4) ni chaqiradi, u esa 4 * faktorial(3) ni... va hokazo, faktorial(1) ga yetguncha. faktorial(1) bazaviy holat bo'lgani uchun 1 qaytaradi va zanjir orqaga qarab hisoblanib chiqadi." },
        { warn: "Bazaviy holatni unutmang! Agar <code>faktorial</code> da <code>if (n <= 1)</code> qismini olib tashlasak, funksiya faktorial(0), faktorial(-1), faktorial(-2) ni cheksiz chaqiraveradi va dastur \"stack overflow\" xatosi bilan qulaydi." },

        { h2: "Rekursiya qanday \"ochiladi\"" },
        { p: "Rekursiyani tushunishning eng yaxshi yo'li - uni qadamma-qadam \"ochib\" ko'rish. <code>faktorial(4)</code> qanday hisoblanishini yozib chiqaylik:" },
        { code: ["faktorial(4)",
                 "= 4 * faktorial(3)",
                 "= 4 * (3 * faktorial(2))",
                 "= 4 * (3 * (2 * faktorial(1)))",
                 "= 4 * (3 * (2 * 1))        <- bazaviy holatga yetdik",
                 "= 4 * (3 * 2)",
                 "= 4 * 6",
                 "= 24"].join("\n") },
        { p: "Ko'rib turibsizki, avval funksiya \"pastga\" tushadi (o'zini qayta-qayta chaqirib, masalani kichraytirib boradi), bazaviy holatga yetgach esa \"yuqoriga\" qaytadi (natijalarni birlashtirib, yakuniy javobni hosil qiladi). Bu \"tushish va qaytish\" harakati rekursiyaning yuragi." },

        { h2: "Ko'proq rekursiv misollar" },
        { p: "Rekursiyani his qilish uchun bir nechta misol ko'raylik. Har birida bazaviy holat va rekursiv holatni ajratib oling." },
        { h3: "1 dan n gacha sonlar yig'indisi" },
        { p: "Yig'indini ham rekursiv ifodalash mumkin: yigindi(n) = n + yigindi(n-1). Bazaviy holat - yigindi(0) = 0:" },
        { pg: "function yigindi(n) {\n  if (n === 0) return 0;      // bazaviy holat\n  return n + yigindi(n - 1);  // rekursiv holat\n}\n\nconsole.log(yigindi(5));  // 15 (1+2+3+4+5)\nconsole.log(yigindi(10)); // 55", file: "rekursiv-yigindi.js" },
        { h3: "Massivdagi sonlar yig'indisi" },
        { p: "Massiv bilan ham ishlash mumkin: birinchi elementni olib, qolgan qismning yig'indisiga qo'shamiz. Bazaviy holat - bo'sh massiv, uning yig'indisi 0:" },
        { pg: "function massivYigindi(massiv) {\n  if (massiv.length === 0) return 0; // bazaviy holat\n  // birinchi element + qolganlarning yig'indisi\n  return massiv[0] + massivYigindi(massiv.slice(1));\n}\n\nconsole.log(massivYigindi([10, 20, 30])); // 60\nconsole.log(massivYigindi([5]));          // 5", file: "massiv-yigindi.js" },
        { h3: "Matnni teskarilash" },
        { p: "Matnni ham rekursiv teskarilash mumkin: oxirgi belgini olib, qolganini teskarilaymiz. Bazaviy holat - bo'sh yoki bitta belgili matn:" },
        { pg: "function teskari(matn) {\n  if (matn.length <= 1) return matn; // bazaviy holat\n  // oxirgi belgi + qolgan qismning teskarisi\n  return matn[matn.length - 1] + teskari(matn.slice(0, -1));\n}\n\nconsole.log(teskari(\"salom\")); // molas\nconsole.log(teskari(\"kod\"));   // dok", file: "matn-teskari.js" },
        { tip: "Rekursiv funksiya yozishning oddiy retsepti: 1) \"Eng oddiy holat qaysi?\" - bu bazaviy holat. 2) \"Masalani bir pog'ona kichraytirsam, o'zimni qanday chaqiraman?\" - bu rekursiv holat. Shu ikki savolga javob topsangiz, funksiya deyarli tayyor." },

        { h2: "Rekursiya daraxti" },
        { p: "Ba'zi rekursiv funksiyalar o'zini bir marta emas, <strong>bir necha marta</strong> chaqiradi. Bunday holatda chaqiruvlar shoxlanib, <strong>rekursiya daraxti</strong> (recursion tree) hosil qiladi. Buni Fibonacci misolida yaqqol ko'rish mumkin, chunki fib(n) o'zini ikki marta chaqiradi: fib(n-1) va fib(n-2)." },
        { code: ["                 fib(4)",
                 "               /        \\",
                 "          fib(3)         fib(2)",
                 "         /     \\         /    \\",
                 "     fib(2)   fib(1)  fib(1)  fib(0)",
                 "     /    \\",
                 " fib(1)   fib(0)"].join("\n") },
        { p: "Diqqat qiling: fib(2) ikki marta, fib(1) uch marta hisoblanmoqda! Bir xil ish qayta-qayta bajarilyapti. Aynan shu takrorlanish tufayli sodda rekursiv Fibonacci o'tgan darsda ko'rganimizdek O(2^n) - eksponensial bo'lib qoladi. Rekursiya daraxti qanchalik keng shoxlansa, murakkablik shunchalik yomon bo'ladi." },

        { h2: "Chaqiruvlar steki va stek to'lib ketishi" },
        { p: "Kompyuter rekursiv chaqiruvlarni qanday eslab qoladi? Buning uchun <strong>chaqiruvlar steki</strong> (call stack) degan maxsus xotira bor. Har safar funksiya chaqirilganda, uning holati stekka \"taxlanadi\". Funksiya javob qaytarganda esa stekdan olib tashlanadi." },
        { p: "faktorial(4) misolida stek shunday to'ladi: faktorial(4) chaqiriladi va stekka qo'yiladi, u faktorial(3) ni chaqiradi - u ham stekka, so'ng faktorial(2), faktorial(1). Bazaviy holatga yetgach, stek teskari tartibda bo'shab boradi." },
        { code: ["Stek to'lishi:        Stek bo'shashi:",
                 "faktorial(1)  <- eng ustida",
                 "faktorial(2)          faktorial(2) natija qaytaradi",
                 "faktorial(3)          faktorial(3) natija qaytaradi",
                 "faktorial(4)          faktorial(4) natija qaytaradi"].join("\n") },
        { p: "Bu stekning hajmi cheklangan. Agar rekursiya juda chuqur ketsa (masalan bazaviy holat noto'g'ri bo'lib, chaqiruvlar to'xtamasa), stek to'lib ketadi va dastur <strong>\"stack overflow\"</strong> xatosi bilan to'xtaydi." },
        { pg: "function cheksiz(n) {\n  // bazaviy holat yo'q - bu XATO!\n  return cheksiz(n + 1);\n}\n\ntry {\n  cheksiz(1);\n} catch (xato) {\n  console.log(\"Xatolik: \" + xato.message);\n  // \"Maximum call stack size exceeded\"\n}", file: "stack-overflow.js" },
        { warn: "Stek to'lib ketishi - rekursiyadagi eng ko'p uchraydigan xato. Sabablari: 1) bazaviy holat umuman yo'q; 2) bazaviy holatga hech qachon yetmaydi (masala kichraymayapti). Har doim tekshiring: har bir rekursiv chaqiruv masalani bazaviy holatga <strong>yaqinlashtiryaptimi?</strong>" },

        { h2: "Rekursiya murakkabligini baholash" },
        { p: "Rekursiv algoritmning Big O sini hisoblash uchun ikki narsani ko'paytiramiz:" },
        { ul: [
          "<strong>Chaqiruvlar soni</strong> - funksiya jami necha marta chaqiriladi?",
          "<strong>Har bir chaqiruvdagi ish</strong> - bitta chaqiruvda rekursiv chaqiruvdan tashqari qancha ish bajariladi?"
        ] },
        { p: "Masalan, <code>faktorial(n)</code>: u n marta chaqiriladi (faktorial(n) dan faktorial(1) gacha), va har chaqiruvda faqat bitta ko'paytirish - O(1) ish. Demak jami: n * O(1) = <strong>O(n)</strong>." },
        { p: "Fibonacci esa boshqacha: rekursiya daraxti har qadamda ikkiga shoxlanadi, shuning uchun chaqiruvlar soni taxminan 2^n bo'ladi. Har chaqiruvda O(1) ish. Jami: <strong>O(2^n)</strong> - eksponensial." },
        { note: "Rekursiv algoritmning xotira murakkabligi ham muhim. Chaqiruvlar steki eng chuqur nuqtada qancha chaqiruv saqlaydi - o'sha xotira sarfi bo'ladi. faktorial(n) uchun stek chuqurligi n ta, demak O(n) xotira. Oddiy sikl esa O(1) xotira ishlatadi - bu rekursiyaning bir kamchiligi." },

        { h2: "Rekursiya va iteratsiya - qaysi biri qachon?" },
        { p: "Har bir rekursiv yechimni <strong>iteratsiya</strong> (oddiy sikl) bilan ham yozish mumkin, va aksincha. Masalan, faktorialni siklsiz-rekursiv ham, sikl bilan ham yozsa bo'ladi:" },
        { pg: "// Rekursiv usul\nfunction faktorialR(n) {\n  if (n <= 1) return 1;\n  return n * faktorialR(n - 1);\n}\n\n// Iterativ usul (sikl bilan)\nfunction faktorialI(n) {\n  let natija = 1;\n  for (let i = 2; i <= n; i++) {\n    natija *= i;\n  }\n  return natija;\n}\n\nconsole.log(faktorialR(5)); // 120\nconsole.log(faktorialI(5)); // 120 - bir xil natija", file: "rekursiya-vs-iteratsiya.js" },
        { p: "Ikkalasi ham to'g'ri, lekin farqlari bor:" },
        { ul: [
          "<strong>Rekursiya</strong> - kod ko'pincha qisqaroq va tabiiyroq, ayniqsa masala o'zi rekursiv tuzilishga ega bo'lsa (daraxtlar, bo'lib-yechish masalalari). Lekin chaqiruvlar steki tufayli qo'shimcha xotira sarflaydi va stek to'lib ketishi xavfi bor.",
          "<strong>Iteratsiya</strong> - odatda tezroq va kam xotira ishlatadi (O(1) xotira). Lekin ba'zi murakkab masalalarda kodi chalkashroq bo'lishi mumkin."
        ] },
        { tip: "Amaliy qoida: agar masala tabiiy ravishda kichikroq bir xil masalalarga bo'linsa (daraxt tuzilmalari, birlashtirib saralash, bo'lib-hukmronlik masalalari) - rekursiya chiroyliroq. Agar oddiy takrorlanuvchi hisoblash bo'lsa (yig'indi, faktorial) - iteratsiya samaraliroq va xavfsizroq." },

        { h2: "Bo'lib tashla va hukmronlik qil" },
        { p: "Rekursiyaning eng kuchli qo'llanilishi - <strong>\"bo'lib tashla va hukmronlik qil\"</strong> (divide and conquer) g'oyasi. Bu yondashuvda katta masala uchun quyidagi qadamlar bajariladi:" },
        { ol: [
          "<strong>Bo'lish (divide)</strong> - masalani ikki yoki undan ortiq kichikroq, xuddi shunday qism-masalalarga bo'lamiz.",
          "<strong>Hukmronlik (conquer)</strong> - har bir qism-masalani rekursiya bilan yechamiz.",
          "<strong>Birlashtirish (combine)</strong> - qism-yechimlarni birlashtirib, yakuniy javobni hosil qilamiz."
        ] },
        { p: "O'tgan darslarda ko'rgan <strong>ikkilik qidiruv</strong> aynan shu g'oyaga asoslangan: har qadamda masalani (izlash oralig'ini) yarmiga bo'lib, faqat kerakli yarmda davom etamiz. Shu tufayli u O(log n) da ishlaydi." },
        { p: "Xuddi shunday, kelgusida o'rganadigan <strong>birlashtirib saralash</strong> (merge sort) massivni ikki yarmga bo'lib, har birini alohida saralaydi, keyin ikki saralangan yarmni birlashtiradi - va O(n log n) tezlikka erishadi. Bu yondashuv juda ko'p tez algoritmlarning asosini tashkil qiladi." },
        { note: "\"Bo'lib tashla va hukmronlik qil\" - bu shunchaki texnika emas, balki fikrlash usuli. Katta muammoga duch kelganda: \"Buni ikkita kichikroq, o'xshash muammoga bo'lib bo'ladimi?\" degan savolni bering. Ko'p hollarda javob - ha, va bu sizni nafis, tez yechimga olib keladi." },

        { h2: "Xulosa" },
        { p: "Rekursiya - dasturchining eng nafis va kuchli vositalaridan biri. Uni o'zlashtirish uchun asosiy nuqtalarni yodda tuting:" },
        { ul: [
          "Rekursiya - bu funksiyaning o'zini kichikroq masala bilan chaqirishi.",
          "Har bir rekursiv funksiyada <strong>bazaviy holat</strong> (to'xtash sharti) bo'lishi shart.",
          "Har bir chaqiruv masalani bazaviy holatga <strong>yaqinlashtirishi</strong> kerak, aks holda stek to'lib ketadi.",
          "Murakkablik = chaqiruvlar soni * har chaqiruvdagi ish. Rekursiya daraxti keng shoxlansa, murakkablik yomonlashadi.",
          "Rekursiya qo'shimcha xotira (call stack) sarflaydi; iteratsiya odatda tejamkorroq.",
          "\"Bo'lib tashla va hukmronlik qil\" - rekursiyaga asoslangan eng kuchli algoritmik g'oyalardan biri."
        ] },
        { p: "Bu bilan \"Algoritm asoslari\" bobini yakunlaymiz. Endi sizda algoritm nima ekani, uni Big O bilan qanday o'lchash va rekursiv fikrlash haqida mustahkam poydevor bor. Kelgusi boblarda bu bilimlarni haqiqiy algoritmlar - qidiruv, saralash va ma'lumotlar tuzilmalari - ustida qo'llaymiz. Omad tilaymiz!" }
      ]
    }
  ]
};
